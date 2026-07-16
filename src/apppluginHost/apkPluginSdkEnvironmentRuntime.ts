import { readFile } from "node:fs/promises";
import * as path from "node:path";

import type { ApkWorkerCallback } from "./apkV8WorkerRuntime";
import { ApkV8WorkerRuntime } from "./apkV8WorkerRuntime";

export interface ApkAgreementDocument {
	version: string | null;
	langUrl: string | null;
}

export interface ApkAgreementAndPolicy {
	privacyProtocol: ApkAgreementDocument;
	userAgreement: ApkAgreementDocument;
}

export interface ApkOtaInfo {
	currentVersion: string;
	version: string;
	updatable: boolean;
}

export interface ApkFirmwareVersionInfo {
	currentVersion: string;
	lastVersion: string;
	mandatoryUpdate: boolean;
}

export interface ApkFirmwareUpdateState {
	status: string;
	errMsg: "0";
}

export interface ApkPluginSdkEnvironmentRuntimeOptions {
	hasActivity(): boolean;
	isSharedDevice?(): boolean;
	firmwareVersion: string;
	storageBasePath: string;
	loadOtaInfo(): Promise<ApkOtaInfo | null>;
	loadOtaProgress?(): Promise<Readonly<{ status: string }> | null>;
	loadDeviceExtraInfo(): Promise<Readonly<Record<string, string>> | null>;
	loadAgreementAndPolicy(): Promise<ApkAgreementAndPolicy>;
	loadPluginAgreements(): Promise<readonly unknown[]>;
	workerRuntime: ApkV8WorkerRuntime;
}

/**
 * APK environment slice of RRPluginSDK. Remote agreement data and activity
 * state are explicit host inputs; worker code remains an unchanged AppPlugin
 * resource handled by ApkV8WorkerRuntime.
 */
export class ApkPluginSdkEnvironmentRuntime {
	readonly #storageBasePath: string;

	public constructor(private readonly options: ApkPluginSdkEnvironmentRuntimeOptions) {
		if (options.firmwareVersion.length === 0) throw new Error("firmwareVersion darf nicht leer sein");
		this.#storageBasePath = path.resolve(options.storageBasePath);
	}

	public async getLastVersionInfo(): Promise<ApkFirmwareVersionInfo> {
		if (!this.options.hasActivity()) throw new Error("no context");
		if (this.options.isSharedDevice?.()) throw new Error("device is shared,not support");
		try {
			const otaInfo = await this.options.loadOtaInfo();
			if (otaInfo) {
				return structuredClone({
					currentVersion: otaInfo.currentVersion,
					lastVersion: otaInfo.version,
					mandatoryUpdate: otaInfo.updatable,
				});
			}
		} catch {
			// Die APK löst OTA-Fehler mit der installierten Firmware auf.
		}
		return {
			currentVersion: this.options.firmwareVersion,
			lastVersion: this.options.firmwareVersion,
			mandatoryUpdate: false,
		};
	}

	public async getFirmwareUpdateState(): Promise<ApkFirmwareUpdateState> {
		if (!this.options.hasActivity()) throw new Error("device is null");
		if (this.options.isSharedDevice?.()) throw new Error("device is shared,not support");
		try {
			const progress = await this.options.loadOtaProgress?.();
			if (progress) return { status: progress.status, errMsg: "0" };
		} catch {
			// Der APK-Callback verwirft den SDK-Fehlercode und lehnt einheitlich ab.
		}
		throw new Error("data is null");
	}

	public async getDeviceExtraInfoForKey(key: string): Promise<Record<string, string>> {
		return this.getDeviceExtraInfoForKeyArray([key]);
	}

	public async getDeviceExtraInfoForKeyArray(keys: readonly string[]): Promise<Record<string, string>> {
		const values = await this.options.loadDeviceExtraInfo();
		return Object.fromEntries(keys.map(key => [key, values?.[key] ?? ""]));
	}

	public readFile(file: string, callback: (...arguments_: unknown[]) => void): void {
		const targetPath = this.#resolveStoragePath(file);
		if (!targetPath) {
			callback(false, "");
			return;
		}
		void readFile(targetPath, "utf8").then(
			contents => callback(true, contents),
			() => callback(false, ""),
		);
	}

	public async agreementAndPolicy(): Promise<ApkAgreementAndPolicy> {
		if (!this.options.hasActivity()) throw new Error("activity has finished");
		return structuredClone(await this.options.loadAgreementAndPolicy());
	}

	public async getPluginAgreements(): Promise<unknown[]> {
		try {
			return structuredClone([...(await this.options.loadPluginAgreements())]);
		} catch {
			return [];
		}
	}

	public async getPluginAgreementsV2(): Promise<unknown[]> {
		return this.getPluginAgreements();
	}

	public startBackgroundJsExecutor(jsFile: string, callback: ApkWorkerCallback): void {
		this.options.workerRuntime.startBackgroundJsExecutor(jsFile, callback);
	}

	public callJsExecutor(
		executorId: string,
		functionName: string,
		argument: unknown,
		callback: ApkWorkerCallback,
	): void {
		this.options.workerRuntime.callJsExecutor(executorId, functionName, argument, callback);
	}

	public callJsExecutorWithArray(
		executorId: string,
		functionName: string,
		arguments_: unknown,
		callback: ApkWorkerCallback,
	): void {
		this.options.workerRuntime.callJsExecutorWithArray(executorId, functionName, arguments_, callback);
	}

	public stopBackground(executorId: string): void {
		this.options.workerRuntime.stopBackground(executorId);
	}

	public addListener(_eventName: string): void {}

	public removeListeners(_count: number): void {}

	#resolveStoragePath(file: string): string | undefined {
		const relativePath = file.replace(/^[\\/]+/u, "");
		const targetPath = path.resolve(this.#storageBasePath, relativePath);
		if (targetPath === this.#storageBasePath || targetPath.startsWith(`${this.#storageBasePath}${path.sep}`)) {
			return targetPath;
		}
		return undefined;
	}
}
