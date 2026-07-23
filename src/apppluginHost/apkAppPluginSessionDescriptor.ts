import { readFileSync, readdirSync } from "node:fs";
import * as path from "node:path";

import type { ApkAppPluginHostContract } from "./apkContract";
import {
	apkPluginSdkApiLevel,
	type ApkPluginSdkRuntimeContext,
} from "./apkCoreRuntimeConstants";
import {
	loadApkPluginBundle,
	type ApkPluginBundle,
} from "./apkPluginBundle";
import type { ApkHermesBundleKind } from "./apkHermesHostProtocol";
import {
	parseApkProductRoleDefinitions,
	type ApkProductRoleDefinition,
} from "./apkProductRoleCatalog";
import {
	parseApkProductAgreementsByModel,
	type ApkProductAgreementsByModel,
} from "./apkProductAgreementCatalog";

export interface ApkAppPluginPackageMetadata {
	models: readonly string[];
	developerId?: string;
	versionCode?: number;
	minSdkApiLevel?: number;
	packagePath?: string;
	productId?: string;
}

export interface ApkAppPluginDeviceContext {
	userId: string;
	ownerId: string;
	deviceId: string;
	deviceSN: string;
	model: string;
	name: string | null;
	firmwareVersion?: string;
	/**
	 * HomeData/SDK protocol version (`pv`) used by the APK transport listeners.
	 * It must not be inferred from a model or AppPlugin directory.
	 */
	protocolVersion: string;
	/**
	 * Dynamic values returned by RRPluginSDK.getDeviceExtraInfoForKey(Array).
	 * They are deliberately not exported through the static deviceExtra constant,
	 * because the inspected APK always exposes an empty map there.
	 */
	deviceProperties: Readonly<Record<string, unknown>>;
	activeTime: number;
	robotTimeZone: number;
	iotType: 1 | 2;
}

export interface ApkAppPluginHostIdentity {
	mobileModel: string;
	androidRelease: string;
	clientId: string;
	memoryMiB: number;
	iotOriginDevId?: string;
}

export interface ApkAppPluginAccountContext {
	/** ISO country selected for the signed-in APK account, for example DE. */
	countryCode: string;
	/** Roborock backend region selected by the APK account, for example eu. */
	serverCode: string;
}

export interface ApkAppPluginHomeDataContext {
	/** Raw RRDeviceBeanV2 deviceJsonStr values from the current APK home. */
	deviceJsonStrings: readonly string[];
	/** Raw ProductEntity jsonString values for products used in the current home. */
	productJsonStrings: readonly string[];
}

export interface ApkAppPluginInstallationContext {
	/**
	 * Successfully installed main-plugin download versions keyed by device
	 * model. The APK keeps this registry in MISC SharedPreferences, separate
	 * from HomeData and from the bundle's project.json metadata.
	 */
	mainPluginDownloadVersions: Readonly<Record<string, number>>;
}

export interface ApkAppPluginProductRepositoryContext {
	/** Raw ProductEntity.agreements values indexed by exact product model. */
	agreementsByModel: ApkProductAgreementsByModel;
	/** Parsed RoleBean values cached by the APK product repository. */
	userRoles: readonly ApkProductRoleDefinition[];
}

/**
 * Device-class-neutral input for one AppPlugin runtime. It mirrors the data
 * selected by the APK before React Native starts; map protocols and product UI
 * are deliberately absent because those remain owned by the AppPlugin.
 */
export interface ApkAppPluginSessionDescriptor {
	version: 1;
	pluginRoot: string;
	package: ApkAppPluginPackageMetadata;
	device: ApkAppPluginDeviceContext;
	host: ApkAppPluginHostIdentity;
	account?: ApkAppPluginAccountContext;
	homeData?: ApkAppPluginHomeDataContext;
	installation?: ApkAppPluginInstallationContext;
	productRepository?: ApkAppPluginProductRepositoryContext;
}

export type ApkAppPluginCompatibilityIssueCode =
	| "bundle-missing"
	| "bundle-format-unknown"
	| "device-model-mismatch"
	| "host-api-too-old";

export interface ApkAppPluginCompatibilityIssue {
	code: ApkAppPluginCompatibilityIssueCode;
	message: string;
}

export interface ApkAppPluginSessionCompatibility {
	status: "bootstrap-compatible" | "bootstrap-incompatible";
	hostApiLevel: number;
	bundleKind?: ApkHermesBundleKind;
	issues: readonly ApkAppPluginCompatibilityIssue[];
}

export interface ResolvedApkAppPluginSession {
	descriptor: ApkAppPluginSessionDescriptor;
	bundle: ApkPluginBundle;
	compatibility: ApkAppPluginSessionCompatibility & {
		status: "bootstrap-compatible";
		bundleKind: ApkHermesBundleKind;
	};
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value: unknown, name: string): string {
	if (typeof value !== "string" || value.trim().length === 0) {
		throw new Error(`${name} darf nicht leer sein`);
	}
	return value;
}

function optionalString(value: unknown, name: string): string | undefined {
	if (value === undefined) return undefined;
	return nonEmptyString(value, name);
}

function safeInteger(value: unknown, name: string): number | undefined {
	if (value === undefined) return undefined;
	if (!Number.isSafeInteger(value) || Number(value) < 0) {
		throw new Error(`${name} muss eine nichtnegative ganze Zahl sein`);
	}
	return Number(value);
}

function finiteNumber(value: unknown, name: string): number {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new Error(`${name} muss eine endliche Zahl sein`);
	}
	return value;
}

function parsePackageMetadata(value: unknown): ApkAppPluginPackageMetadata {
	if (!isRecord(value)) throw new Error("package muss ein Objekt sein");
	if (!Array.isArray(value.models) || value.models.length === 0) {
		throw new Error("package.models muss mindestens ein Modell enthalten");
	}
	const models = [...new Set(value.models.map((model, index) =>
		nonEmptyString(model, `package.models[${index}]`),
	))];
	return {
		models,
		developerId: optionalString(value.developerId, "package.developerId"),
		versionCode: safeInteger(value.versionCode, "package.versionCode"),
		minSdkApiLevel: safeInteger(value.minSdkApiLevel, "package.minSdkApiLevel"),
		packagePath: optionalString(value.packagePath, "package.packagePath"),
		productId: optionalString(value.productId, "package.productId"),
	};
}

function parseDeviceContext(value: unknown): ApkAppPluginDeviceContext {
	if (!isRecord(value)) throw new Error("device muss ein Objekt sein");
	if (value.deviceProperties !== undefined && value.deviceExtra !== undefined) {
		throw new Error("device darf nicht gleichzeitig deviceProperties und das veraltete deviceExtra enthalten");
	}
	const deviceProperties = value.deviceProperties ?? value.deviceExtra;
	if (!isRecord(deviceProperties)) {
		throw new Error("device.deviceProperties muss ein Objekt sein");
	}
	if (value.iotType !== 1 && value.iotType !== 2) throw new Error("device.iotType muss 1 oder 2 sein");
	if (typeof value.userId !== "string") throw new Error("device.userId muss ein String sein");
	if (typeof value.ownerId !== "string") throw new Error("device.ownerId muss ein String sein");
	if (typeof value.deviceSN !== "string") throw new Error("device.deviceSN muss ein String sein");
	const name = value.name === null ? null : nonEmptyString(value.name, "device.name");
	const activeTime = finiteNumber(value.activeTime, "device.activeTime");
	if (activeTime < 0) throw new Error("device.activeTime darf nicht negativ sein");
	return {
		userId: value.userId,
		ownerId: value.ownerId,
		deviceId: nonEmptyString(value.deviceId, "device.deviceId"),
		deviceSN: value.deviceSN,
		model: nonEmptyString(value.model, "device.model"),
		name,
		firmwareVersion: optionalString(value.firmwareVersion, "device.firmwareVersion"),
		protocolVersion: nonEmptyString(value.protocolVersion, "device.protocolVersion"),
		deviceProperties: { ...deviceProperties },
		activeTime,
		robotTimeZone: finiteNumber(value.robotTimeZone, "device.robotTimeZone"),
		iotType: value.iotType,
	};
}

function parseHostIdentity(value: unknown): ApkAppPluginHostIdentity {
	if (!isRecord(value)) throw new Error("host muss ein Objekt sein");
	const memoryMiB = safeInteger(value.memoryMiB, "host.memoryMiB");
	if (memoryMiB === undefined || memoryMiB === 0) {
		throw new Error("host.memoryMiB muss eine positive ganze Zahl sein");
	}
	return {
		mobileModel: nonEmptyString(value.mobileModel, "host.mobileModel"),
		androidRelease: nonEmptyString(value.androidRelease, "host.androidRelease"),
		clientId: nonEmptyString(value.clientId, "host.clientId"),
		memoryMiB,
		iotOriginDevId: optionalString(value.iotOriginDevId, "host.iotOriginDevId"),
	};
}

function parseAccountContext(value: unknown): ApkAppPluginAccountContext | undefined {
	if (value === undefined) return undefined;
	if (!isRecord(value)) throw new Error("account muss ein Objekt sein");
	return {
		countryCode: nonEmptyString(value.countryCode, "account.countryCode"),
		serverCode: nonEmptyString(value.serverCode, "account.serverCode"),
	};
}

function parseRawJsonStrings(value: unknown, name: string): string[] {
	if (!Array.isArray(value)) throw new Error(`${name} muss ein Array sein`);
	return value.map((entry, index) => {
		const json = nonEmptyString(entry, `${name}[${index}]`);
		let parsed: unknown;
		try {
			parsed = JSON.parse(json);
		} catch {
			throw new Error(`${name}[${index}] muss gültiges JSON enthalten`);
		}
		if (!isRecord(parsed)) throw new Error(`${name}[${index}] muss ein JSON-Objekt enthalten`);
		return json;
	});
}

function parseMainPluginDownloadVersions(value: unknown): Readonly<Record<string, number>> {
	if (!isRecord(value)) {
		throw new Error("installation.mainPluginDownloadVersions muss ein Objekt sein");
	}
	return Object.fromEntries(Object.entries(value).map(([model, version]) => {
		const parsed = safeInteger(version, `installation.mainPluginDownloadVersions.${model}`);
		if (parsed === undefined) {
			throw new Error(`installation.mainPluginDownloadVersions.${model} fehlt`);
		}
		return [nonEmptyString(model, "installation.mainPluginDownloadVersions model"), parsed];
	}));
}

function parseHomeDataContext(value: unknown): ApkAppPluginHomeDataContext | undefined {
	if (value === undefined) return undefined;
	if (!isRecord(value)) throw new Error("homeData muss ein Objekt sein");
	if (value.pluginDownloadVersions !== undefined) {
		throw new Error(
			"homeData.pluginDownloadVersions ist kein APK-HomeData-Feld; "
			+ "verwende installation.mainPluginDownloadVersions",
		);
	}
	return {
		deviceJsonStrings: parseRawJsonStrings(value.deviceJsonStrings, "homeData.deviceJsonStrings"),
		productJsonStrings: parseRawJsonStrings(value.productJsonStrings, "homeData.productJsonStrings"),
	};
}

function parseInstallationContext(value: unknown): ApkAppPluginInstallationContext | undefined {
	if (value === undefined) return undefined;
	if (!isRecord(value)) throw new Error("installation muss ein Objekt sein");
	return {
		mainPluginDownloadVersions: parseMainPluginDownloadVersions(
			value.mainPluginDownloadVersions,
		),
	};
}

function parseProductRepositoryContext(
	value: unknown,
): ApkAppPluginProductRepositoryContext | undefined {
	if (value === undefined) return undefined;
	if (!isRecord(value)) throw new Error("productRepository muss ein Objekt sein");
	return {
		agreementsByModel: parseApkProductAgreementsByModel(
			value.agreementsByModel,
		),
		userRoles: parseApkProductRoleDefinitions(
			value.userRoles,
			"productRepository.userRoles",
		),
	};
}

export function parseApkAppPluginSessionDescriptor(
	value: unknown,
	baseDirectory = process.cwd(),
): ApkAppPluginSessionDescriptor {
	if (!isRecord(value) || value.version !== 1) {
		throw new Error("AppPlugin-Sitzungsdeskriptor benötigt version 1");
	}
	return {
		version: 1,
		pluginRoot: path.resolve(baseDirectory, nonEmptyString(value.pluginRoot, "pluginRoot")),
		package: parsePackageMetadata(value.package),
		device: parseDeviceContext(value.device),
		host: parseHostIdentity(value.host),
		account: parseAccountContext(value.account),
		homeData: parseHomeDataContext(value.homeData),
		installation: parseInstallationContext(value.installation),
		productRepository: parseProductRepositoryContext(value.productRepository),
	};
}

export function parseApkAppPluginProjectMetadata(value: unknown): ApkAppPluginPackageMetadata {
	if (!isRecord(value)) throw new Error("AppPlugin-project.json muss ein Objekt sein");
	const rawModels = nonEmptyString(value.models, "models")
		.split(/[,\s]+/u)
		.filter(Boolean);
	return parsePackageMetadata({
		models: rawModels,
		developerId: value.developer_id,
		versionCode: value.version_code,
		minSdkApiLevel: value.min_sdk_api_level,
		packagePath: value.package_path,
	});
}

/**
 * Reads the APK package metadata without recursively interpreting plugin
 * assets. Official packages expose it either at the package root or as a
 * flattened Android raw resource such as raw/projects_*_project.json.
 */
export function loadApkAppPluginProjectMetadata(pluginRootValue: string): ApkAppPluginPackageMetadata {
	const pluginRoot = path.resolve(pluginRootValue);
	const candidates = [path.join(pluginRoot, "project.json")];
	try {
		const rawDirectory = path.join(pluginRoot, "raw");
		for (const entry of readdirSync(rawDirectory, { withFileTypes: true })
			.filter(entry => entry.isFile() && /(?:^|_)project\.json$/iu.test(entry.name))
			.sort((left, right) => left.name.localeCompare(right.name))) {
			candidates.push(path.join(rawDirectory, entry.name));
		}
	} catch {
		// A root project.json remains a valid package layout.
	}
	for (const candidate of candidates) {
		try {
			return parseApkAppPluginProjectMetadata(
				JSON.parse(readFileSync(candidate, "utf8")) as unknown,
			);
		} catch {
			// Only a valid project contract with models is authoritative.
		}
	}
	throw new Error("Das installierte AppPlugin besitzt kein gültiges project.json");
}

function detectBundleKind(bytes: Buffer): ApkHermesBundleKind | undefined {
	if (bytes.length >= 4 && bytes.subarray(0, 4).equals(Buffer.from([0xc6, 0x1f, 0xbc, 0x03]))) {
		return "hermes-bytecode";
	}
	if (/^\s*(?:var|global|__d\()/u.test(bytes.subarray(0, 256).toString("utf8"))) {
		return "javascript-source";
	}
	return undefined;
}

export function inspectApkAppPluginSessionCompatibility(
	descriptor: ApkAppPluginSessionDescriptor,
	contract: ApkAppPluginHostContract,
): ApkAppPluginSessionCompatibility {
	const hostApiLevel = apkPluginSdkApiLevel(contract);
	const issues: ApkAppPluginCompatibilityIssue[] = [];
	let bundleKind: ApkHermesBundleKind | undefined;
	try {
		const bundle = loadApkPluginBundle(descriptor.pluginRoot);
		bundleKind = detectBundleKind(bundle.bytes);
		if (!bundleKind) {
			issues.push({
				code: "bundle-format-unknown",
				message: "index.android.bundle ist weder Hermes-Bytecode noch ein erkennbares JavaScript-Bundle",
			});
		}
	} catch (error) {
		issues.push({
			code: "bundle-missing",
			message: error instanceof Error ? error.message : String(error),
		});
	}
	if (!descriptor.package.models.includes(descriptor.device.model)) {
		issues.push({
			code: "device-model-mismatch",
			message: `Gerätemodell ${descriptor.device.model} gehört nicht zu ${descriptor.package.models.join(", ")}`,
		});
	}
	if (descriptor.package.minSdkApiLevel !== undefined
		&& descriptor.package.minSdkApiLevel > hostApiLevel) {
		issues.push({
			code: "host-api-too-old",
			message: `AppPlugin benötigt API ${descriptor.package.minSdkApiLevel}, APK-Host bietet ${hostApiLevel}`,
		});
	}
	return {
		status: issues.length === 0 ? "bootstrap-compatible" : "bootstrap-incompatible",
		hostApiLevel,
		bundleKind,
		issues,
	};
}

export function resolveApkAppPluginSession(
	descriptor: ApkAppPluginSessionDescriptor,
	contract: ApkAppPluginHostContract,
): ResolvedApkAppPluginSession {
	const compatibility = inspectApkAppPluginSessionCompatibility(descriptor, contract);
	if (compatibility.status !== "bootstrap-compatible" || !compatibility.bundleKind) {
		throw new Error(
			`AppPlugin-Sitzung ist inkompatibel: ${compatibility.issues.map(issue => issue.message).join("; ")}`,
		);
	}
	return {
		descriptor,
		bundle: loadApkPluginBundle(descriptor.pluginRoot),
		compatibility: {
			...compatibility,
			status: "bootstrap-compatible",
			bundleKind: compatibility.bundleKind,
		},
	};
}

export function apkPluginSdkContextFromSession(
	descriptor: ApkAppPluginSessionDescriptor,
	basePath: string,
	storageBasePath: string,
): ApkPluginSdkRuntimeContext {
	return {
		userId: descriptor.device.userId,
		basePath,
		deviceId: descriptor.device.deviceId,
		deviceSN: descriptor.device.deviceSN,
		ownerId: descriptor.device.ownerId,
		deviceModel: descriptor.device.model,
		mobileModel: descriptor.host.mobileModel,
		androidRelease: descriptor.host.androidRelease,
		deviceName: descriptor.device.name,
		storageBasePath,
		activeTime: descriptor.device.activeTime,
		robotTimeZone: descriptor.device.robotTimeZone,
		iotType: descriptor.device.iotType,
		memoryMiB: descriptor.host.memoryMiB,
		iotOriginDevId: descriptor.host.iotOriginDevId,
		clientId: descriptor.host.clientId,
	};
}
