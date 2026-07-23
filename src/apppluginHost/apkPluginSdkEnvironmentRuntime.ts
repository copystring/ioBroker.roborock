import { access, constants, readFile, readdir } from "node:fs/promises";
import * as path from "node:path";

import type { ApkWorkerCallback } from "./apkV8WorkerRuntime";
import { ApkV8WorkerRuntime } from "./apkV8WorkerRuntime";
import {
	ApkProductRoleCatalog,
	type ApkProductRoleDefinition,
} from "./apkProductRoleCatalog";

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

export interface ApkMobileOperatorInfo {
	name: string;
	simOperator: string;
	countryCode: string;
}

export interface ApkAgreementDiagnostic {
	readonly method: "getPluginAgreements" | "getPluginAgreementsV2" | "getProductAgreements";
	readonly outcome: "rejected" | "resolved";
	readonly value: Readonly<{
		kind: "array" | "bigint" | "boolean" | "function" | "null" | "number"
			| "object" | "string" | "symbol" | "undefined";
		count?: number;
		keys?: readonly string[];
	}>;
}

function record(value: unknown): Record<string, unknown> | undefined {
	return value !== null && typeof value === "object" && !Array.isArray(value)
		? value as Record<string, unknown>
		: undefined;
}

function summarizeAgreementValue(value: unknown): ApkAgreementDiagnostic["value"] {
	if (value === null) return { kind: "null" };
	if (value === undefined) return { kind: "undefined" };
	if (Array.isArray(value)) return { kind: "array", count: value.length };
	if (typeof value === "object") {
		return {
			kind: "object",
			keys: Object.keys(value).sort().slice(0, 32),
		};
	}
	return { kind: typeof value };
}

/** Extracts IUserPreferenceApi.checkAppAgreement without assuming one HTTP envelope variant. */
export function parseApkUserPluginAgreementsResponse(serialized: string): readonly unknown[] {
	let parsed: unknown;
	try {
		parsed = JSON.parse(serialized) as unknown;
	} catch (error) {
		throw new Error("APK-Einwilligungsantwort ist kein gültiges JSON", { cause: error });
	}
	const root = record(parsed);
	const result = record(root?.result);
	const data = record(root?.data);
	const resultData = record(result?.data);
	for (const candidate of [root, result, data, resultData]) {
		if (Array.isArray(candidate?.userPluginAgreementList)) {
			return structuredClone(candidate.userPluginAgreementList);
		}
	}
	throw new Error("APK-Einwilligungsantwort enthält keine userPluginAgreementList");
}

/** Mirrors legacy getPluginAgreements filtering and WritableMap projection for one device. */
export function selectApkPluginAgreementsForDevice(
	agreements: readonly unknown[],
	deviceId: string,
): readonly Readonly<Record<string, unknown>>[] {
	return agreements.flatMap(value => {
		const agreement = record(value);
		if (agreement?.deviceId !== deviceId) return [];
		const selected: Record<string, unknown> = {};
		if (typeof agreement.type === "string") selected.type = agreement.type;
		const version = typeof agreement.version === "number"
			? agreement.version
			: typeof agreement.version === "string" ? Number.parseInt(agreement.version, 10) : undefined;
		if (Number.isSafeInteger(version)) selected.version = version;
		if (typeof agreement.extra === "string") selected.extra = agreement.extra;
		return [Object.freeze(selected)];
	});
}

/** Mirrors getPluginAgreementsV2: retain complete JSON entries for one device. */
export function selectApkPluginAgreementsV2ForDevice(
	agreements: readonly unknown[],
	deviceId: string,
): readonly unknown[] {
	return agreements.flatMap(value => {
		const agreement = record(value);
		return agreement?.deviceId === deviceId ? [structuredClone(value)] : [];
	});
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
	mobileOperatorInfo?(): ApkMobileOperatorInfo | null;
	systemTimeZoneName?(): string;
	productRoles?: readonly ApkProductRoleDefinition[];
	firmwareVersion: string;
	storageBasePath: string;
	loadOtaInfo(): Promise<ApkOtaInfo | null>;
	loadOtaProgress?(): Promise<Readonly<{ status: string }> | null>;
	loadDeviceExtraInfo(): Promise<Readonly<Record<string, string>> | null>;
	loadAgreementAndPolicy(): Promise<ApkAgreementAndPolicy>;
	loadProductAgreements?(): unknown | Promise<unknown>;
	loadPluginAgreements(): Promise<readonly unknown[]>;
	loadPluginAgreementsV2?(): Promise<readonly unknown[]>;
	onAgreementDiagnostic?(diagnostic: Readonly<ApkAgreementDiagnostic>): void;
	workerRuntime: ApkV8WorkerRuntime;
}

/**
 * APK environment slice of RRPluginSDK. Remote agreement data and activity
 * state are explicit host inputs; worker code remains an unchanged AppPlugin
 * resource handled by ApkV8WorkerRuntime.
 */
export class ApkPluginSdkEnvironmentRuntime {
	readonly #storageBasePath: string;
	readonly #productRoles: ApkProductRoleCatalog;

	public constructor(private readonly options: ApkPluginSdkEnvironmentRuntimeOptions) {
		if (options.firmwareVersion.length === 0) throw new Error("firmwareVersion darf nicht leer sein");
		this.#storageBasePath = path.resolve(options.storageBasePath);
		this.#productRoles = new ApkProductRoleCatalog(options.productRoles);
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

	/** Mirrors PluginSDKModule.getProductAgreements(): product cache lookup by current model. */
	public async getProductAgreements(): Promise<unknown | null> {
		if (!this.options.hasActivity()) throw new Error("activity has finished");
		const agreements = await this.options.loadProductAgreements?.();
		const result = agreements === undefined || agreements === null
			? null
			: structuredClone(agreements);
		this.#reportAgreement("getProductAgreements", "resolved", result);
		return result;
	}

	public async getPluginAgreements(): Promise<unknown[]> {
		try {
			const result = structuredClone([...(await this.options.loadPluginAgreements())]);
			this.#reportAgreement("getPluginAgreements", "resolved", result);
			return result;
		} catch {
			const result: unknown[] = [];
			this.#reportAgreement("getPluginAgreements", "resolved", result);
			return result;
		}
	}

	public async getPluginAgreementsV2(): Promise<unknown[]> {
		try {
			const loader = this.options.loadPluginAgreementsV2;
			if (!loader) throw new Error("V2 agreement loader unavailable");
			const result = structuredClone([...(await loader())]);
			this.#reportAgreement("getPluginAgreementsV2", "resolved", result);
			return result;
		} catch (error) {
			this.#reportAgreement("getPluginAgreementsV2", "rejected", undefined);
			throw new Error("fetch data failed", { cause: error });
		}
	}

	#reportAgreement(
		method: ApkAgreementDiagnostic["method"],
		outcome: ApkAgreementDiagnostic["outcome"],
		value: unknown,
	): void {
		this.options.onAgreementDiagnostic?.({
			method,
			outcome,
			value: summarizeAgreementValue(value),
		});
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
	 * The inspected APK reads this result from ProductLocalSource. Its role data
	 * is refreshed from `/api/v1/user/roles` before plugin execution, indexed by
	 * role/category/model and then queried locally for every call.
	 */
	public async getUserRole(model: string, code: string): Promise<string> {
		return this.#productRoles.getUserRole(model, code);
	}

	/**
	 * Mirrors the current APK's single-slot TelephonyManager result. The mobile
	 * operator is Android host state; a desktop embedding may provide an empty
	 * slot, but it must not infer operator data from a robot model.
	 */
	public async getOperatorsInfo(): Promise<Record<"1", ApkMobileOperatorInfo>> {
		const operator = this.options.mobileOperatorInfo?.();
		if (!operator) throw new Error("no sim card");
		return { "1": { ...operator } };
	}

	/** Mirrors the APK callback shape: success flag followed by IANA time zone. */
	public getSystemTimezoneNameWithCallback(
		callback: (...arguments_: unknown[]) => void,
	): void {
		const timeZone = this.options.systemTimeZoneName?.()
			?? Intl.DateTimeFormat().resolvedOptions().timeZone;
		callback(true, timeZone);
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
