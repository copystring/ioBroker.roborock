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
	deviceExtra: Readonly<Record<string, unknown>>;
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
	status: "compatible" | "incompatible";
	hostApiLevel: number;
	bundleKind?: ApkHermesBundleKind;
	issues: readonly ApkAppPluginCompatibilityIssue[];
}

export interface ResolvedApkAppPluginSession {
	descriptor: ApkAppPluginSessionDescriptor;
	bundle: ApkPluginBundle;
	compatibility: ApkAppPluginSessionCompatibility & {
		status: "compatible";
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
	if (!isRecord(value.deviceExtra)) throw new Error("device.deviceExtra muss ein Objekt sein");
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
		deviceExtra: { ...value.deviceExtra },
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
		status: issues.length === 0 ? "compatible" : "incompatible",
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
	if (compatibility.status !== "compatible" || !compatibility.bundleKind) {
		throw new Error(
			`AppPlugin-Sitzung ist inkompatibel: ${compatibility.issues.map(issue => issue.message).join("; ")}`,
		);
	}
	return {
		descriptor,
		bundle: loadApkPluginBundle(descriptor.pluginRoot),
		compatibility: {
			...compatibility,
			status: "compatible",
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
		deviceExtra: descriptor.device.deviceExtra,
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
