import { access, constants, readFile, readdir } from "node:fs/promises";
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

export interface ApkCurrentCountryInfo {
	countryCode: string;
	serverCode: string;
}

export class ApkHostServiceUnavailableError extends Error {
	public override readonly name = "ApkHostServiceUnavailableError";

	public constructor(public readonly serviceName: string) {
		super(`APK-Host-Dienst ${serviceName} ist nicht verbunden`);
	}
}

export interface ApkPluginSdkEnvironmentRuntimeOptions {
	hasActivity(): boolean;
	closeCurrentPage?(): void;
	isSharedDevice?(): boolean;
	currentCountryInfo?(): ApkCurrentCountryInfo | null;
	loadUserRole?(model: string, code: string): Promise<string>;
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

	public async readFileListAtPath(directory: string): Promise<Array<{ name: string }>> {
		const targetPath = this.#resolveStoragePath(directory);
		if (!targetPath) throw new Error("filePath not exists or is not a directory");

		let entries;
		try {
			entries = await readdir(targetPath, { withFileTypes: true });
		} catch {
			throw new Error("filePath not exists or is not a directory");
		}

		const files = await Promise.all(entries
			.filter(entry => entry.isFile())
			.map(async entry => {
				try {
					await access(path.join(targetPath, entry.name), constants.R_OK);
					return { name: entry.name };
				} catch {
					return undefined;
				}
			}));
		return files.filter((entry): entry is { name: string } => entry !== undefined);
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

	/**
	 * Mirrors PluginSDKModule.getCurrentCountryInfoCallback(). Country and
	 * server are account state owned by the APK host, never product metadata
	 * inferred from a model or AppPlugin path.
	 */
	public getCurrentCountryInfoCallback(callback: (...arguments_: unknown[]) => void): void {
		if (!this.options.hasActivity()) {
			callback(false);
			return;
		}
		const info = this.options.currentCountryInfo?.();
		callback(true, info
			? {
				countryCode: info.countryCode.toLowerCase(),
				serverCode: info.serverCode,
			}
			: {});
	}

	/**
	 * The inspected APK delegates this lookup to its product repository. The
	 * host therefore exposes the same service boundary instead of inventing a
	 * role or embedding device-family knowledge.
	 */
	public async getUserRole(model: string, code: string): Promise<string> {
		if (!this.options.loadUserRole) throw new ApkHostServiceUnavailableError("product-user-role");
		return this.options.loadUserRole(model, code);
	}

	/**
	 * Mirrors PluginSDKModule.closeCurrentPage(): the APK finishes the current
	 * Android activity on the UI thread. The host owns that surrounding page
	 * lifecycle, so it receives the close request without putting navigation
	 * policy into the unchanged AppPlugin bundle.
	 */
	public closeCurrentPage(): void {
		if (!this.options.hasActivity()) return;
		this.options.closeCurrentPage?.();
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
