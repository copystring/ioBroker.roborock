import { createHash } from "node:crypto";
import {
	lstatSync,
	mkdirSync,
	realpathSync,
} from "node:fs";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

import {
	ApkAppStateRuntime,
	type ApkAppState,
} from "./apkAppStateRuntime";
import {
	ApkAppSysRuntime,
	type ApkAppSysRuntimeOptions,
} from "./apkAppSysRuntime";
import {
	ApkAppearanceRuntime,
	type ApkRequestedColorSchemeMode,
} from "./apkAppearanceRuntime";
import { ApkAsyncStorageRuntime } from "./apkAsyncStorageRuntime";
import { ApkBlobTransferAssembler } from "./apkBlobTransferAssembler";
import type { ApkNativeModuleConstants } from "./apkBridgeBootstrap";
import type { ApkAppPluginDeviceModelContext } from "./apkAppPluginDeviceSessionRuntime";
import type { ApkAppPluginNativeRuntimeComposition } from "./apkAppPluginNativeRuntimeComposition";
import type { ApkAppPluginSharedNativeModuleRuntimes } from "./apkAppPluginSharedNativeModules";
import type { ApkAppPluginHostContract } from "./apkContract";
import {
	createApkDeviceInfoConstants,
	createApkGestureHandlerConstants,
	createApkLocalizationConstants,
	createApkPlatformConstants,
	createApkPluginSdkConstants,
	createApkSafeAreaConstants,
	createApkToastConstants,
	type ApkDisplayMetrics,
	type ApkPlatformRuntimeState,
	type ApkSafeAreaMetrics,
} from "./apkCoreRuntimeConstants";
import {
	ApkDarkModeRuntime,
	type ApkDarkModeSnapshot,
	type ApkPluginDarkColorScheme,
	type ApkStoredColorModel,
} from "./apkDarkModeRuntime";
import { ApkDeviceFirmwareRuntime } from "./apkDeviceFirmwareRuntime";
import { ApkDeviceIngress } from "./apkDeviceIngress";
import { ApkPluginDeviceEventBridge } from "./apkDeviceEvents";
import { ApkDevicesRuntime } from "./apkDevicesRuntime";
import { ApkGestureHandlerRuntime } from "./apkGestureHandlerRuntime";
import type { ApkHermesHostSession } from "./apkHermesHostSession";
import { ApkI18nManagerRuntime } from "./apkI18nManagerRuntime";
import {
	ApkIntentRuntime,
	type ApkIntentHostPort,
} from "./apkIntentRuntime";
import {
	ApkLocalizationRuntime,
	type ApkLocalizationSnapshot,
} from "./apkLocalizationRuntime";
import { ApkNativeAnimatedRuntime } from "./apkNativeAnimatedRuntime";
import {
	ApkNetInfoRuntime,
	type ApkNetInfoRuntimeState,
} from "./apkNetInfoRuntime";
import {
	ApkOrientationRuntime,
	type ApkOrientation,
	type ApkOrientationRuntimeOptions,
} from "./apkOrientationRuntime";
import {
	ApkPlatformServicesRuntime,
	type ApkPlatformServicesPort,
} from "./apkPlatformServicesRuntime";
import {
	ApkPluginAnalyticsRuntime,
	type ApkPluginAnalyticsEvent,
} from "./apkPluginAnalyticsRuntime";
import {
	ApkPluginDeviceRuntime,
	type ApkPluginDeviceTransport,
} from "./apkPluginDeviceRuntime";
import {
	ApkPluginHttpRuntime,
	type ApkPluginHttpMap,
	type ApkPluginMallProductHttpService,
} from "./apkPluginHttpRuntime";
import {
	ApkPluginPermissionsRuntime,
	type ApkPluginPermissionsRuntimeOptions,
} from "./apkPluginPermissionsRuntime";
import {
	ApkHostServiceUnavailableError,
	ApkPluginSdkEnvironmentRuntime,
	type ApkAgreementAndPolicy,
	type ApkMobileOperatorInfo,
	type ApkOtaInfo,
} from "./apkPluginSdkEnvironmentRuntime";
import { ApkPluginSdkPreferencesRuntime } from "./apkPluginSdkPreferencesRuntime";
import {
	ApkPluginSdkRpcModule,
	type ApkPluginSdkStrategyState,
} from "./apkPluginSdkRpcModule";
import { ApkSoundManagerRuntime } from "./apkSoundManagerRuntime";
import { createApkSourceCodeConstants } from "./apkSourceCodeConstants";
import { ApkStatusBarRuntime } from "./apkStatusBarRuntime";
import { ApkTimingRuntime } from "./apkTimingRuntime";
import {
	createApkUiManagerConstants,
	type ApkUiManagerRuntime,
} from "./apkUiManagerRuntime";
import {
	ApkV8WorkerRuntime,
	type ApkV8WorkerDiagnostic,
} from "./apkV8WorkerRuntime";
import {
	ApkRpcRequestBroker,
	type ApkRpcBrokerOptions,
	type ApkRpcTransport,
} from "./apkRpcRequestBroker";

export interface ApkAppPluginDeviceNativeRuntimeInitialState {
	readonly appState: ApkAppState;
	readonly darkMode: Readonly<{
		storedColorModel: ApkStoredColorModel;
		systemColorScheme: ApkPluginDarkColorScheme;
		cardStyle: number;
	}>;
	readonly localization: Readonly<{
		language: string;
		localeIdentifier: string;
		systemLocaleIdentifier: string;
		isRTL: boolean;
		allowRTL: boolean;
		forceRTL: boolean;
		doLeftAndRightSwapInRTL: boolean;
	}>;
	readonly network: ApkNetInfoRuntimeState;
	readonly orientation: Readonly<{
		current: ApkOrientation;
		autoRotateEnabled?: boolean;
		device?: ApkOrientation | "";
	}>;
	readonly platform: Omit<ApkPlatformRuntimeState, "androidRelease" | "model">;
	readonly safeArea: ApkSafeAreaMetrics;
	readonly screenMetrics: ApkDisplayMetrics;
	readonly windowMetrics: ApkDisplayMetrics;
}

export interface ApkAppPluginDeviceSdkEnvironmentPorts {
	readonly firmwareVersion?: string;
	readonly closeCurrentPage?: () => void;
	readonly isSharedDevice?: () => boolean;
	readonly mobileOperatorInfo?: () => ApkMobileOperatorInfo | null;
	readonly systemTimeZoneName?: () => string;
	readonly loadOtaInfo: () => Promise<ApkOtaInfo | null>;
	readonly loadOtaProgress?: () => Promise<Readonly<{ status: string }> | null>;
	readonly loadAgreementAndPolicy: () => Promise<ApkAgreementAndPolicy>;
	readonly loadPluginAgreements: () => Promise<readonly unknown[]>;
}

export interface ApkAppPluginDeviceHttpPorts {
	readonly mallProduct?: ApkPluginMallProductHttpService;
	readonly loadHttpHeaders?: () => Readonly<Record<string, string>>
		| Promise<Readonly<Record<string, string>>>;
	readonly prepareUserImages?: (references: readonly string[]) => Promise<readonly unknown[]>;
	readonly postUserImages?: (
		path: string,
		params: ApkPluginHttpMap | null,
		images: readonly unknown[],
	) => Promise<string>;
	readonly nowMilliseconds?: () => number;
}

export interface ApkAppPluginDeviceRpcPorts {
	readonly brokerOptions?: ApkRpcBrokerOptions;
	readonly endpoint: string;
	readonly nonce: string;
	readonly strategy?: ApkPluginSdkStrategyState;
	readonly transport: ApkRpcTransport;
	readonly resolveOtherDeviceRpc?: (deviceId: string) => ApkPluginSdkRpcModule | undefined;
	readonly publishOtherDeviceDps?: (
		deviceId: string,
		dps: Readonly<Record<string, unknown>>,
	) => Promise<void>;
}

export interface ApkAppPluginDeviceNativeRuntimePorts {
	readonly appSys: ApkAppSysRuntimeOptions;
	readonly deviceTransport: ApkPluginDeviceTransport;
	readonly hasActivity: () => boolean;
	readonly http: ApkAppPluginDeviceHttpPorts;
	readonly installSkia: () => boolean;
	readonly intent: ApkIntentHostPort;
	readonly permissions: ApkPluginPermissionsRuntimeOptions;
	readonly platformServices: ApkPlatformServicesPort;
	readonly rpc: ApkAppPluginDeviceRpcPorts;
	readonly sdkEnvironment: ApkAppPluginDeviceSdkEnvironmentPorts;
	readonly emitAnalytics: (event: ApkPluginAnalyticsEvent) => void;
	readonly reportException: (method: string, arguments_: readonly unknown[]) => void;
	readonly emitHostError?: (error: Error) => void;
	readonly onAppearanceColorSchemeRequest?: (mode: ApkRequestedColorSchemeMode) => void;
	readonly onDarkModeStateChange?: (state: Readonly<ApkDarkModeSnapshot>) => void;
	readonly onLocalizationStateChange?: (state: Readonly<ApkLocalizationSnapshot>) => void;
	readonly onNativeAnimatedViewUpdate?: () => void;
	readonly onOrientationRequest?: NonNullable<ApkOrientationRuntimeOptions["requestHostOrientation"]>;
	readonly onStoredColorModelRequest?: (mode: ApkStoredColorModel) => void;
	readonly onWorkerDiagnostic?: (diagnostic: ApkV8WorkerDiagnostic) => void;
	readonly applyActivityStyle?: (isDark: boolean) => void;
	readonly playTouchSound?: () => void;
}

export interface ApkAppPluginDeviceNativeRuntimeEnvironmentOptions {
	readonly context: ApkAppPluginDeviceModelContext;
	readonly contract: ApkAppPluginHostContract;
	readonly dataDirectory: string;
	readonly initialState: ApkAppPluginDeviceNativeRuntimeInitialState;
	readonly ports: ApkAppPluginDeviceNativeRuntimePorts;
}

function nonEmpty(value: string | undefined, label: string): string {
	if (typeof value !== "string" || value.length === 0) {
		throw new Error(`${label} darf nicht leer sein`);
	}
	return value;
}

function secureDataDirectory(dataDirectoryValue: string, deviceId: string, model: string): string {
	if (!path.isAbsolute(dataDirectoryValue)) {
		throw new Error("AppPlugin-Laufzeitdatenverzeichnis muss absolut sein");
	}
	const dataDirectory = path.resolve(dataDirectoryValue);
	mkdirSync(dataDirectory, { recursive: true });
	const rootStats = lstatSync(dataDirectory);
	if (!rootStats.isDirectory() || rootStats.isSymbolicLink()) {
		throw new Error("AppPlugin-Laufzeitdatenverzeichnis muss ein reguläres Verzeichnis sein");
	}
	const key = createHash("sha256").update(`${model}\0${deviceId}`).digest("hex");
	const deviceDirectory = path.join(dataDirectory, "devices", key);
	mkdirSync(deviceDirectory, { recursive: true });
	const realRoot = realpathSync(dataDirectory);
	const realDeviceDirectory = realpathSync(deviceDirectory);
	const relative = path.relative(realRoot, realDeviceDirectory);
	if (relative.length === 0 || path.isAbsolute(relative) || relative.startsWith(`..${path.sep}`)) {
		throw new Error("AppPlugin-Gerätedatenverzeichnis verlässt die Laufzeitdatenwurzel");
	}
	return realDeviceDirectory;
}

function userHttpService(
	context: ApkAppPluginDeviceModelContext,
	http: Readonly<ApkAppPluginDeviceHttpPorts>,
) {
	const user = context.authenticatedHttpPorts.user;
	return {
		delete: (requestPath: string, params: ApkPluginHttpMap | null) =>
			user.delete(requestPath, params),
		get: (requestPath: string, params: ApkPluginHttpMap | null) =>
			user.get(requestPath, params),
		post: (requestPath: string, params: ApkPluginHttpMap | null) =>
			user.post(requestPath, params),
		postJson: (requestPath: string, data: ApkPluginHttpMap | string | null) =>
			user.postJson(requestPath, data),
		put: (requestPath: string, params: ApkPluginHttpMap | null) =>
			user.put(requestPath, params),
		putJson: (requestPath: string, data: ApkPluginHttpMap | null) =>
			user.putJson(requestPath, data),
		postImages: async (
			requestPath: string,
			params: ApkPluginHttpMap | null,
			images: readonly unknown[],
		) => {
			if (!http.postUserImages) throw new ApkHostServiceUnavailableError("user-image-upload");
			return http.postUserImages(requestPath, params, images);
		},
	};
}

/**
 * Owns one device-context generation of the shared APK native runtimes.
 * AppPlugin product behavior remains in the unchanged bundle; this class only
 * connects the APK's host contracts to explicit account, transport, platform
 * and filesystem ports and owns their bounded lifecycle.
 */
export class ApkAppPluginDeviceNativeRuntimeEnvironment {
	readonly #constantSources: readonly ApkNativeModuleConstants[];
	readonly #deviceDirectory: string;
	readonly #ports: ApkAppPluginDeviceNativeRuntimePorts;
	readonly #deviceIngress: ApkDeviceIngress;
	readonly #rpcBroker: ApkRpcRequestBroker;
	readonly #sharedWithoutAnimated: Omit<ApkAppPluginSharedNativeModuleRuntimes, "nativeAnimated">;
	readonly #timing: ApkTimingRuntime;
	readonly #workerRuntime: ApkV8WorkerRuntime;
	#composition?: Readonly<ApkAppPluginNativeRuntimeComposition>;
	#eventQueue: Promise<void> = Promise.resolve();
	#shared?: Readonly<ApkAppPluginSharedNativeModuleRuntimes>;
	#disposed = false;

	public constructor(options: Readonly<ApkAppPluginDeviceNativeRuntimeEnvironmentOptions>) {
		this.#ports = options.ports;
		const { context, contract, initialState } = options;
		const descriptor = context.session.descriptor;
		const device = descriptor.device;
		this.#deviceDirectory = secureDataDirectory(options.dataDirectory, device.deviceId, device.model);
		const storageBasePath = path.join(this.#deviceDirectory, "files");
		mkdirSync(storageBasePath, { recursive: true });
		const bundleDirectory = path.dirname(context.session.bundle.bundlePath);
		const basePath = `${pathToFileURL(path.join(bundleDirectory, "Resources")).href.replace(/\/$/u, "")}/`;
		const firmwareVersion = nonEmpty(
			device.firmwareVersion ?? options.ports.sdkEnvironment.firmwareVersion,
			"APK-Gerätefirmware",
		);
		const emitBestEffort = (eventName: string, payload: unknown): void => {
			void this.#emitDeviceEvent(eventName, payload).catch(error => this.#report(error));
		};
		const appState = new ApkAppStateRuntime({
			initialState: initialState.appState,
			emitDeviceEvent: emitBestEffort,
		});
		const darkMode = new ApkDarkModeRuntime({
			storedColorModel: initialState.darkMode.storedColorModel,
			systemColorScheme: initialState.darkMode.systemColorScheme,
			initialCardStyle: initialState.darkMode.cardStyle,
			emitDeviceEvent: emitBestEffort,
			applyActivityStyle: options.ports.applyActivityStyle,
			requestColorModel: options.ports.onStoredColorModelRequest,
			onStateChange: options.ports.onDarkModeStateChange,
		});
		const netInfo = new ApkNetInfoRuntime(initialState.network);
		this.#workerRuntime = new ApkV8WorkerRuntime({
			pluginRootPath: descriptor.pluginRoot,
			onDiagnostic: options.ports.onWorkerDiagnostic,
		});
		const rpcEndpoint = nonEmpty(options.ports.rpc.endpoint, "RPC-Endpunkt");
		this.#rpcBroker = new ApkRpcRequestBroker(
			options.ports.rpc.transport,
			rpcEndpoint,
			nonEmpty(options.ports.rpc.nonce, "RPC-Nonce"),
			options.ports.rpc.brokerOptions,
		);
		const deviceEvents = new ApkPluginDeviceEventBridge();
		deviceEvents.addListener("RRDeviceAppClientConnectEvent", payload =>
			emitBestEffort("RRDeviceAppClientConnectEvent", payload));
		deviceEvents.addListener("RRDeviceBlobPayloadUpdateEvent", payload =>
			emitBestEffort("RRDeviceBlobPayloadUpdateEvent", payload));
		deviceEvents.addListener("RRDeviceBlueOfflineEvent", payload =>
			emitBestEffort("RRDeviceBlueOfflineEvent", payload));
		deviceEvents.addListener("RRDeviceBlueStatusEvent", payload =>
			emitBestEffort("RRDeviceBlueStatusEvent", payload));
		deviceEvents.addListener("RRDeviceDpsPbUpdateEvent", payload =>
			emitBestEffort("RRDeviceDpsPbUpdateEvent", payload));
		deviceEvents.addListener("RRDeviceDpsUpdateEvent", payload =>
			emitBestEffort("RRDeviceDpsUpdateEvent", payload));
		deviceEvents.addListener("RRDeviceOnlineChangeEvent", payload =>
			emitBestEffort("RRDeviceOnlineChangeEvent", payload));
		this.#deviceIngress = new ApkDeviceIngress(
			device.deviceId,
			new ApkBlobTransferAssembler(device.deviceId, rpcEndpoint),
			this.#rpcBroker,
			deviceEvents,
		);
		const pluginSdkRpc = new ApkPluginSdkRpcModule(
			this.#rpcBroker,
			{ hasRnActivity: options.ports.hasActivity },
			options.ports.rpc.strategy,
		);
		const pluginDevice = new ApkPluginDeviceRuntime({
			hasActivity: options.ports.hasActivity,
			transport: options.ports.deviceTransport,
		});
		const devices = new ApkDevicesRuntime({
			hasActivity: options.ports.hasActivity,
			homeData: descriptor.homeData,
			installation: descriptor.installation,
			resolveRpc: deviceId => deviceId === device.deviceId
				? pluginSdkRpc
				: options.ports.rpc.resolveOtherDeviceRpc?.(deviceId),
			publishDps: async (deviceId, dps) => {
				if (deviceId === device.deviceId) {
					await options.ports.deviceTransport.publishDps(dps);
					return;
				}
				if (!options.ports.rpc.publishOtherDeviceDps) {
					throw new ApkHostServiceUnavailableError("multi-device-dps");
				}
				await options.ports.rpc.publishOtherDeviceDps(deviceId, dps);
			},
		});
		const pluginSdkEnvironment = new ApkPluginSdkEnvironmentRuntime({
			hasActivity: options.ports.hasActivity,
			closeCurrentPage: options.ports.sdkEnvironment.closeCurrentPage,
			isSharedDevice: options.ports.sdkEnvironment.isSharedDevice,
			currentCountryInfo: () => descriptor.account ?? null,
			mobileOperatorInfo: options.ports.sdkEnvironment.mobileOperatorInfo,
			systemTimeZoneName: options.ports.sdkEnvironment.systemTimeZoneName,
			productRoles: descriptor.productRepository?.userRoles,
			firmwareVersion,
			storageBasePath,
			loadOtaInfo: options.ports.sdkEnvironment.loadOtaInfo,
			loadOtaProgress: options.ports.sdkEnvironment.loadOtaProgress,
			loadDeviceExtraInfo: async () => Object.fromEntries(
				Object.entries(device.deviceProperties).map(([key, value]) => [
					key,
					value === null || value === undefined ? "" : String(value),
				]),
			),
			loadAgreementAndPolicy: options.ports.sdkEnvironment.loadAgreementAndPolicy,
			loadPluginAgreements: options.ports.sdkEnvironment.loadPluginAgreements,
			workerRuntime: this.#workerRuntime,
		});
		const pluginSdkPreferences = new ApkPluginSdkPreferencesRuntime(
			path.join(this.#deviceDirectory, "plugin-sdk-preferences.json"),
		);
		const pluginAnalytics = new ApkPluginAnalyticsRuntime({
			firmwareVersion,
			pluginVersion: descriptor.package.versionCode ?? 0,
			productModel: device.model,
			emit: options.ports.emitAnalytics,
		});
		const pluginHttp = new ApkPluginHttpRuntime({
			iot: context.authenticatedHttpPorts.iot,
			user: userHttpService(context, options.ports.http),
			mallProduct: options.ports.http.mallProduct,
			loadHttpHeaders: options.ports.http.loadHttpHeaders,
			prepareUserImages: options.ports.http.prepareUserImages,
			nowMilliseconds: options.ports.http.nowMilliseconds,
		});
		const pluginPermissions = new ApkPluginPermissionsRuntime(options.ports.permissions);
		this.#timing = new ApkTimingRuntime({
			emitTimers: timerIds => this.#session().callJsFunction("JSTimers", "callTimers", [timerIds]),
			onError: error => this.#report(error),
		});
		const localization = new ApkLocalizationRuntime({
			language: initialState.localization.language,
			localeIdentifier: initialState.localization.localeIdentifier,
			systemLocaleIdentifier: initialState.localization.systemLocaleIdentifier,
			emitDeviceEvent: (eventName, payload) => this.#emitDeviceEvent(eventName, payload),
			onStateChange: options.ports.onLocalizationStateChange,
		});
		const orientation = new ApkOrientationRuntime(initialState.orientation.current, {
			autoRotateEnabled: initialState.orientation.autoRotateEnabled,
			deviceOrientation: initialState.orientation.device,
			emitDeviceEvent: emitBestEffort,
			requestHostOrientation: options.ports.onOrientationRequest,
		});
		const platformServices = new ApkPlatformServicesRuntime(options.ports.platformServices);
		const intent = new ApkIntentRuntime(options.ports.intent);
		const appSys = new ApkAppSysRuntime(options.ports.appSys);
		const appearance = new ApkAppearanceRuntime({
			initialColorScheme: darkMode.getColorScheme(),
			requestColorScheme: mode => options.ports.onAppearanceColorSchemeRequest?.(mode),
			emitDeviceEvent: emitBestEffort,
		});
		const i18nManager = new ApkI18nManagerRuntime({
			allowRTL: initialState.localization.allowRTL,
			forceRTL: initialState.localization.forceRTL,
			doLeftAndRightSwapInRTL: initialState.localization.doLeftAndRightSwapInRTL,
		});
		const initialLocalization = localization.snapshot();
		const constantSources: ApkNativeModuleConstants[] = [
			createApkDeviceInfoConstants(initialState.windowMetrics, initialState.screenMetrics),
			createApkSafeAreaConstants(initialState.safeArea),
			createApkLocalizationConstants({
				language: initialLocalization.language,
				localeIdentifier: initialLocalization.localeIdentifier,
				isRTL: initialState.localization.isRTL,
				doLeftAndRightSwapInRTL: initialState.localization.doLeftAndRightSwapInRTL,
			}),
			createApkGestureHandlerConstants(),
			createApkToastConstants(),
			createApkPlatformConstants({
				...initialState.platform,
				androidRelease: descriptor.host.androidRelease,
				model: descriptor.host.mobileModel,
			}),
			createApkSourceCodeConstants(pathToFileURL(context.session.bundle.bundlePath).href),
			{ AppState: appState.constants() },
			{ Orientation: orientation.constants() },
			{ RRPluginDarkMode: darkMode.constants() },
			createApkUiManagerConstants(contract),
			createApkPluginSdkConstants(
				contract,
				{
					userId: device.userId,
					basePath,
					deviceId: device.deviceId,
					deviceSN: device.deviceSN,
					ownerId: device.ownerId,
					deviceModel: device.model,
					mobileModel: descriptor.host.mobileModel,
					androidRelease: descriptor.host.androidRelease,
					deviceName: device.name,
					storageBasePath,
					activeTime: device.activeTime,
					robotTimeZone: device.robotTimeZone,
					iotType: device.iotType,
					memoryMiB: descriptor.host.memoryMiB,
					iotOriginDevId: descriptor.host.iotOriginDevId,
					clientId: descriptor.host.clientId,
				},
			),
		];
		this.#constantSources = Object.freeze(constantSources);
		const exceptionsManager = {
			dismissRedbox: () => options.ports.reportException("dismissRedbox", []),
			reportException: (...arguments_: unknown[]) =>
				options.ports.reportException("reportException", arguments_),
			reportFatalException: (...arguments_: unknown[]) =>
				options.ports.reportException("reportFatalException", arguments_),
			reportSoftException: (...arguments_: unknown[]) =>
				options.ports.reportException("reportSoftException", arguments_),
			updateExceptionMessage: (...arguments_: unknown[]) =>
				options.ports.reportException("updateExceptionMessage", arguments_),
		};
		this.#sharedWithoutAnimated = {
			appState,
			appSys,
			appearance,
			asyncStorage: new ApkAsyncStorageRuntime(path.join(this.#deviceDirectory, "async-storage.json")),
			darkMode,
			deviceFirmware: new ApkDeviceFirmwareRuntime(),
			devices,
			exceptionsManager,
			gestureHandler: new ApkGestureHandlerRuntime(),
			i18nManager,
			intent,
			localization,
			netInfo,
			orientation,
			platformServices,
			pluginAnalytics,
			pluginDevice,
			pluginHttp,
			pluginPermissions,
			pluginSdkEnvironment,
			pluginSdkPreferences,
			pluginSdkRpc,
			skiaModule: { install: () => options.ports.installSkia() },
			soundManager: new ApkSoundManagerRuntime({ playTouchSound: options.ports.playTouchSound }),
			statusBar: new ApkStatusBarRuntime(),
			timing: this.#timing,
		};
	}

	public constantSources(): readonly ApkNativeModuleConstants[] {
		return this.#constantSources;
	}

	public createSharedNativeModules(
		uiManager: ApkUiManagerRuntime,
	): Readonly<ApkAppPluginSharedNativeModuleRuntimes> {
		if (this.#disposed) throw new Error("APK-Gerätelaufzeit wurde bereits beendet");
		if (this.#shared) throw new Error("APK-Gerätelaufzeit besitzt bereits einen UIManager");
		const nativeAnimated = new ApkNativeAnimatedRuntime({
			updateView: (tag, props) => uiManager.synchronouslyUpdateViewOnUiThread(tag, props),
			restoreDefaultViewProps: (tag, propNames) =>
				uiManager.restoreDefaultViewProps(tag, propNames),
			onViewUpdate: this.#ports.onNativeAnimatedViewUpdate,
		});
		this.#shared = Object.freeze({
			...this.#sharedWithoutAnimated,
			nativeAnimated,
		});
		return this.#shared;
	}

	public attachComposition(composition: Readonly<ApkAppPluginNativeRuntimeComposition>): void {
		if (this.#disposed) throw new Error("APK-Gerätelaufzeit wurde bereits beendet");
		if (this.#composition && this.#composition !== composition) {
			throw new Error("APK-Gerätelaufzeit ist bereits an eine Hermes-Sitzung gebunden");
		}
		this.#composition = composition;
	}

	public async dispose(): Promise<void> {
		if (this.#disposed) return;
		this.#disposed = true;
		this.#timing.dispose();
		this.#workerRuntime.stopAll();
		this.#rpcBroker.close();
		await this.#eventQueue.catch(() => undefined);
	}

	public rpcBroker(): ApkRpcRequestBroker {
		return this.#rpcBroker;
	}

	public deviceIngress(): ApkDeviceIngress {
		return this.#deviceIngress;
	}

	public dataDirectory(): string {
		return this.#deviceDirectory;
	}

	#session(): ApkHermesHostSession {
		const session = this.#composition?.session;
		if (!session) throw new Error("APK-Gerätelaufzeit ist noch nicht an Hermes gebunden");
		return session;
	}

	#emitDeviceEvent(eventName: string, payload: unknown): Promise<void> {
		const operation = this.#eventQueue.then(() => this.#session().emitDeviceEvent(eventName, payload));
		this.#eventQueue = operation.catch(() => undefined);
		return operation;
	}

	#report(error: unknown): void {
		this.#ports.emitHostError?.(error instanceof Error ? error : new Error(String(error)));
	}
}
