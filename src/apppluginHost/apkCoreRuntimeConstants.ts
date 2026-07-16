import type { ApkNativeModuleConstants } from "./apkBridgeBootstrap";
import type { ApkAppPluginHostContract, ApkNativeModuleContract } from "./apkContract";

export interface ApkDisplayMetrics {
	width: number;
	height: number;
	scale: number;
	fontScale: number;
	densityDpi: number;
}

export interface ApkLocalizationRuntimeState {
	language: string;
	localeIdentifier: string;
	isRTL: boolean;
	doLeftAndRightSwapInRTL: boolean;
}

function assertPositiveFinite(value: number, name: string): void {
	if (!Number.isFinite(value) || value <= 0) {
		throw new Error(`${name} muss eine positive endliche Zahl sein`);
	}
}

function displayMetrics(metrics: ApkDisplayMetrics, name: string): Record<string, number> {
	assertPositiveFinite(metrics.width, `${name}.width`);
	assertPositiveFinite(metrics.height, `${name}.height`);
	assertPositiveFinite(metrics.scale, `${name}.scale`);
	assertPositiveFinite(metrics.fontScale, `${name}.fontScale`);
	assertPositiveFinite(metrics.densityDpi, `${name}.densityDpi`);
	return {
		width: metrics.width,
		height: metrics.height,
		scale: metrics.scale,
		fontScale: metrics.fontScale,
		densityDpi: metrics.densityDpi,
	};
}

/**
 * Reproduces DeviceInfoModule.getTypedExportedConstants() from the APK.
 * The values remain host inputs because Android also obtains them from the
 * current window and physical display rather than from the AppPlugin bundle.
 */
export function createApkDeviceInfoConstants(
	window: ApkDisplayMetrics,
	screen: ApkDisplayMetrics,
): ApkNativeModuleConstants {
	return {
		DeviceInfo: {
			Dimensions: {
				windowPhysicalPixels: displayMetrics(window, "window"),
				screenPhysicalPixels: displayMetrics(screen, "screen"),
			},
		},
	};
}

/** Reproduces the constant maps exported by the APK localization modules. */
export function createApkLocalizationConstants(
	state: ApkLocalizationRuntimeState,
): ApkNativeModuleConstants {
	if (state.language.length === 0) throw new Error("language darf nicht leer sein");
	if (state.localeIdentifier.length === 0) throw new Error("localeIdentifier darf nicht leer sein");
	return {
		I18nManager: {
			isRTL: state.isRTL,
			doLeftAndRightSwapInRTL: state.doLeftAndRightSwapInRTL,
			localeIdentifier: state.localeIdentifier,
		},
		ReactLocalization: { language: state.language },
	};
}

export interface ApkPluginSdkRuntimeContext {
	userId: string;
	basePath: string;
	deviceId: string;
	deviceSN: string;
	ownerId: string;
	deviceModel: string;
	mobileModel: string;
	androidRelease: string;
	deviceName: string | null;
	storageBasePath: string;
	activeTime: number;
	robotTimeZone: number;
	iotType: 1 | 2;
	memoryMiB: number;
	iotOriginDevId?: string;
	clientId: string;
}

function pluginSdkContract(contract: ApkAppPluginHostContract): ApkNativeModuleContract {
	const matches = contract.nativeModules.filter(module =>
		module.moduleName === "RRPluginSDK" && module.installedByHost,
	);
	if (matches.length !== 1) {
		throw new Error(`Genau ein installiertes RRPluginSDK-Modul erwartet, gefunden: ${matches.length}`);
	}
	return matches[0];
}

function constantExpressions(module: ApkNativeModuleContract, name: string): string[] {
	const expressions = [...new Set(
		module.exportedConstants
			.filter(constant => constant.name === name)
			.map(constant => constant.valueExpression),
	)];
	if (expressions.length !== 1) {
		throw new Error(`RRPluginSDK-Konstante ${name} ist nicht eindeutig durch die APK belegt`);
	}
	return expressions;
}

function apkStringLiteral(module: ApkNativeModuleContract, name: string): string {
	const [expression] = constantExpressions(module, name);
	if (!/^"(?:[^"\\]|\\.)*"$/u.test(expression)) {
		throw new Error(`RRPluginSDK-Konstante ${name} ist kein String-Literal der APK: ${expression}`);
	}
	return JSON.parse(expression) as string;
}

function apkIntegerLiteral(module: ApkNativeModuleContract, name: string): number {
	const [expression] = constantExpressions(module, name);
	if (!/^-?\d+$/u.test(expression)) {
		throw new Error(`RRPluginSDK-Konstante ${name} ist kein Integer-Literal der APK: ${expression}`);
	}
	return Number(expression);
}

function assertFinite(value: number, name: string): void {
	if (!Number.isFinite(value)) throw new Error(`${name} muss eine endliche Zahl sein`);
}

function assertNonEmpty(value: string, name: string): void {
	if (value.length === 0) throw new Error(`${name} darf nicht leer sein`);
}

function assertExactPluginSdkConstantKeys(
	module: ApkNativeModuleContract,
	constants: Readonly<Record<string, unknown>>,
): void {
	const optional = new Set(["iotOriginDevId"]);
	const expected = [...new Set(module.exportedConstants.map(constant => constant.name))]
		.filter(name => !optional.has(name))
		.sort();
	const actual = Object.keys(constants).filter(name => !optional.has(name)).sort();
	if (JSON.stringify(actual) !== JSON.stringify(expected)) {
		throw new Error(
			`RRPluginSDK-Konstantensatz weicht vom APK-Vertrag ab: erwartet ${expected.join(", ")}, erhalten ${actual.join(", ")}`,
		);
	}
}

/**
 * Reproduces PluginSDKModule.getConstants() from the APK. Device-, user- and
 * host-specific values must be supplied by the embedding runtime; only literal
 * APK values are read from the generated contract.
 */
export function createApkPluginSdkConstants(
	contract: ApkAppPluginHostContract,
	context: ApkPluginSdkRuntimeContext,
): ApkNativeModuleConstants {
	const module = pluginSdkContract(contract);
	for (const [value, name] of [
		[context.basePath, "basePath"],
		[context.deviceId, "deviceId"],
		[context.deviceModel, "deviceModel"],
		[context.mobileModel, "mobileModel"],
		[context.androidRelease, "androidRelease"],
		[context.storageBasePath, "storageBasePath"],
		[context.clientId, "clientId"],
	] as const) {
		assertNonEmpty(value, name);
	}
	assertFinite(context.activeTime, "activeTime");
	assertFinite(context.robotTimeZone, "robotTimeZone");
	assertPositiveFinite(context.memoryMiB, "memoryMiB");
	if (!Number.isInteger(context.memoryMiB)) throw new Error("memoryMiB muss ganzzahlig sein");
	if (context.iotType !== 1 && context.iotType !== 2) throw new Error("iotType muss 1 oder 2 sein");
	if (context.iotOriginDevId !== undefined) assertNonEmpty(context.iotOriginDevId, "iotOriginDevId");
	if (constantExpressions(module, "devMode")[0] !== "Boolean.FALSE") {
		throw new Error("RRPluginSDK.devMode ist in der APK nicht Boolean.FALSE");
	}
	constantExpressions(module, "deviceExtra");
	constantExpressions(module, "systemInfo");
	constantExpressions(module, "iotType");
	constantExpressions(module, "memory");
	constantExpressions(module, "iotOriginDevId");
	constantExpressions(module, "clientID");

	const values: Record<string, unknown> = {
		userId: context.userId,
		apiLevel: apkIntegerLiteral(module, "apiLevel"),
		basePath: context.basePath,
		deviceExtra: {},
		deviceId: context.deviceId,
		deviceSN: context.deviceSN,
		ownerId: context.ownerId,
		deviceModel: context.deviceModel,
		systemInfo: {
			mobileModel: context.mobileModel,
			sysVersion: context.androidRelease,
			sysName: "Android",
		},
		devMode: false,
		mobileModel: context.mobileModel,
		deviceName: context.deviceName,
		storageBasePath: context.storageBasePath,
		deviceNameChangedEvent: apkStringLiteral(module, "deviceNameChangedEvent"),
		audioPlayerDidFinishPlayingEvent: apkStringLiteral(module, "audioPlayerDidFinishPlayingEvent"),
		activeTime: context.activeTime,
		robotTimeZone: context.robotTimeZone,
		iotType: context.iotType,
		appVersion: apkStringLiteral(module, "appVersion"),
		userScope: apkStringLiteral(module, "userScope"),
		deviceCategory: apkStringLiteral(module, "deviceCategory"),
		memory: context.memoryMiB,
		clientID: context.clientId,
	};
	if (context.iotOriginDevId !== undefined) values.iotOriginDevId = context.iotOriginDevId;
	assertExactPluginSdkConstantKeys(module, values);
	return { RRPluginSDK: values };
}

export function mergeApkNativeModuleConstants(
	...sources: readonly ApkNativeModuleConstants[]
): ApkNativeModuleConstants {
	const merged: Record<string, Readonly<Record<string, unknown>>> = {};
	for (const source of sources) {
		for (const [moduleName, constants] of Object.entries(source)) {
			if (moduleName in merged) throw new Error(`Doppelte APK-Konstanten für ${moduleName}`);
			merged[moduleName] = constants;
		}
	}
	return merged;
}
