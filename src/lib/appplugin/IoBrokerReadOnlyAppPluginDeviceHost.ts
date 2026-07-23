import type { Roborock } from "../../main";
import {
	createApkDeviceRepositoryRuntimePorts,
	createApkReadOnlyMethodAuthorizer,
	ApkReadOnlyDeviceRepository,
	type ApkAppPluginAdapterDeviceHostLeaseFactory,
	type ApkAppPluginAdapterDeviceRuntimePorts,
	type ApkAppPluginDeviceNativeRuntimeInitialState,
	type ApkAgreementDiagnostic,
	type ApkDeviceIngress,
	type ApkDeviceIngressRouter,
	type ApkReadOnlyDeviceTransportObserver,
	type ApkTimingDiagnostic,
	type ApkV8WorkerDiagnostic,
} from "../../apppluginHost";
import { IoBrokerAppPluginDeviceWire } from "./IoBrokerAppPluginDeviceWire";

export interface IoBrokerReadOnlyAppPluginDisplayOptions {
	readonly densityDpi?: number;
	readonly fontScale?: number;
	readonly height?: number;
	readonly scale?: number;
	readonly width?: number;
}

export interface IoBrokerReadOnlyAppPluginDeviceHostOptions {
	readonly adapter: Roborock;
	readonly allowedMethods: ReadonlySet<string> | readonly string[];
	readonly display?: Readonly<IoBrokerReadOnlyAppPluginDisplayOptions>;
	readonly ingressRouter: ApkDeviceIngressRouter;
	readonly language?: string;
	readonly localeIdentifier?: string;
	readonly loadPluginAgreements?: (deviceId: string) => Promise<readonly unknown[]>;
	readonly loadPluginAgreementsV2?: (deviceId: string) => Promise<readonly unknown[]>;
	readonly observeAgreements?: (diagnostic: Readonly<ApkAgreementDiagnostic>) => void;
	readonly observeTransport?: ApkReadOnlyDeviceTransportObserver;
	readonly observeTiming?: (diagnostic: Readonly<ApkTimingDiagnostic>) => void;
	readonly observeWorker?: (diagnostic: ApkV8WorkerDiagnostic) => void;
}

function positive(value: number | undefined, fallback: number, label: string): number {
	const selected = value ?? fallback;
	if (!Number.isFinite(selected) || selected <= 0) {
		throw new Error(`${label} muss eine positive endliche Zahl sein`);
	}
	return selected;
}

function initialState(
	options: Readonly<IoBrokerReadOnlyAppPluginDeviceHostOptions>,
	deviceId: string,
): ApkAppPluginDeviceNativeRuntimeInitialState {
	const width = positive(options.display?.width, 1_200, "AppPlugin-Fensterbreite");
	const height = positive(options.display?.height, 800, "AppPlugin-Fensterhöhe");
	const scale = positive(options.display?.scale, 1, "AppPlugin-Skalierung");
	const fontScale = positive(options.display?.fontScale, 1, "AppPlugin-Schriftfaktor");
	const densityDpi = positive(options.display?.densityDpi, 96, "AppPlugin-DPI");
	const language = options.language?.trim() || "de";
	const localeIdentifier = options.localeIdentifier?.trim() || "de_DE";
	const isRTL = /^(?:ar|fa|he|ur)(?:_|-|$)/iu.test(localeIdentifier);
	const cloudConnected = options.adapter.mqtt_api.isConnected();
	const localConnected = options.adapter.local_api.isConnected(deviceId);
	const metrics = Object.freeze({ densityDpi, fontScale, height, scale, width });

	return {
		appState: "active",
		darkMode: {
			storedColorModel: "default",
			systemColorScheme: "light",
			cardStyle: 0,
		},
		localization: {
			language,
			localeIdentifier,
			systemLocaleIdentifier: localeIdentifier,
			isRTL,
			allowRTL: true,
			forceRTL: false,
			doLeftAndRightSwapInRTL: true,
		},
		network: {
			type: "wifi",
			isInternetReachable: cloudConnected,
			isWifiEnabled: cloudConnected || localConnected,
			details: {},
		},
		orientation: {
			current: "LANDSCAPE-LEFT",
			autoRotateEnabled: false,
			device: "LANDSCAPE-LEFT",
		},
		platform: {
			apiLevel: 35,
			serial: "iobroker-appplugin-host",
			fingerprint: "iobroker/roborock/appplugin",
			manufacturer: "ioBroker",
			brand: "ioBroker",
			isTesting: false,
			uiMode: "desk",
		},
		safeArea: {
			insets: { top: 0, right: 0, bottom: 0, left: 0 },
			frame: { x: 0, y: 0, width, height },
		},
		screenMetrics: metrics,
		windowMetrics: metrics,
	};
}

/**
 * Creates the device-scoped ioBroker half of a real, strictly read-only
 * AppPlugin session. Product behavior and RPC construction stay in the
 * unchanged bundle; this host only supplies APK services and existing wire
 * connections. The external allow-list is the sole temporary probe policy.
 */
export function createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory(
	options: Readonly<IoBrokerReadOnlyAppPluginDeviceHostOptions>,
): ApkAppPluginAdapterDeviceHostLeaseFactory {
	const authorize = createApkReadOnlyMethodAuthorizer(options.allowedMethods);

	return async request => {
		const descriptor = request.context.session.descriptor;
		if (descriptor.device.deviceId !== request.deviceId) {
			throw new Error("AppPlugin-Gerätehost erhielt einen widersprüchlichen Gerätekontext");
		}
		const state = initialState(options, request.deviceId);
		const wire = new IoBrokerAppPluginDeviceWire({
			adapter: options.adapter,
			deviceId: request.deviceId,
		});
		let active = true;
		const repository = new ApkReadOnlyDeviceRepository(
			wire,
			requestValue => active && authorize(requestValue),
			options.observeTransport,
		);
		const transports = createApkDeviceRepositoryRuntimePorts(repository);
		const endpoint = await options.adapter.mqtt_api.ensureEndpoint();
		const nonce = options.adapter.nonce.toString("hex");
		if (!/^[0-9a-f]{32}$/u.test(nonce)) {
			throw new Error("AppPlugin-RPC-Nonce muss exakt 16 Byte lang sein");
		}

		let detachIngress: (() => void) | undefined;
		const attachDeviceIngress = (ingress: ApkDeviceIngress): (() => void) => {
			if (!active) throw new Error("AppPlugin-Gerätehost wurde bereits freigegeben");
			if (detachIngress) throw new Error("AppPlugin-Gerätehost besitzt bereits einen aktiven Ingress");
			detachIngress = options.ingressRouter.register({
				activeTime: request.activeTime,
				deviceId: request.deviceId,
				ingress,
			});
			return () => {
				detachIngress?.();
				detachIngress = undefined;
			};
		};
		const ports: ApkAppPluginAdapterDeviceRuntimePorts = {
			appSys: {
				networkReachable: () => wire.isCloudConnected() || wire.isLocalConnected(),
				writeLog: entry => options.adapter.rLog(
					"System",
					request.deviceId,
					entry.level === "error"
						? "Error"
						: entry.level === "warn"
							? "Warn"
							: entry.level === "debug" ? "Debug" : "Info",
					undefined,
					"AppPlugin",
					`${entry.tag ? `[${entry.tag}] ` : ""}${entry.message ?? ""}`,
					entry.level === "log" ? "debug" : entry.level,
				),
			},
			deviceTransport: transports.deviceTransport,
			hasActivity: () => active,
			http: {},
			intent: {
				initialUrl: () => null,
				canOpenUrl: async () => false,
				openUrl: async () => undefined,
				openApplicationSettings: async () => undefined,
				canSendIntent: async () => false,
				sendIntent: async () => undefined,
			},
			permissions: {
				isBluetoothEnabled: () => false,
				isLocationEnabled: () => false,
				isWifiEnabled: () => wire.isCloudConnected() || wire.isLocalConnected(),
			},
			platformServices: {
				androidId: descriptor.host.clientId,
				readClipboardText: async () => "",
				writeClipboardText: async () => undefined,
				invokeDefaultBackPressHandler: () => undefined,
				showToast: () => undefined,
				vibrate: () => undefined,
			},
			onAgreementDiagnostic: options.observeAgreements,
			onTimingDiagnostic: options.observeTiming,
			onWorkerDiagnostic: options.observeWorker,
			rpc: {
				endpoint,
				nonce,
				transport: transports.rpcTransport,
				strategy: {
					isInternetReachable: () => wire.isCloudConnected(),
					isLocalDeviceConnected: () => wire.isLocalConnected(),
					isBluetoothCommunicated: () => false,
					callBluetoothProtobuf: (_payload, callback) => callback(false, {
						error: "bluetooth transport unavailable",
					}),
				},
			},
			sdkEnvironment: {
				firmwareVersion: descriptor.device.firmwareVersion,
				systemTimeZoneName: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
				loadOtaInfo: async () => null,
				loadAgreementAndPolicy: async () => ({
					privacyProtocol: { version: null, langUrl: null },
					userAgreement: { version: null, langUrl: null },
				}),
				loadPluginAgreements: options.loadPluginAgreements
					? () => options.loadPluginAgreements!(request.deviceId)
					: async () => [],
				loadPluginAgreementsV2: options.loadPluginAgreementsV2
					? () => options.loadPluginAgreementsV2!(request.deviceId)
					: async () => [],
			},
			emitAnalytics: () => undefined,
			reportException: (method, arguments_) => options.adapter.rLog(
				"System",
				request.deviceId,
				"Error",
				undefined,
				"AppPlugin",
				`[${method}] ${JSON.stringify(arguments_)}`,
				"error",
			),
			emitHostError: error => options.adapter.rLog(
				"System",
				request.deviceId,
				"Error",
				undefined,
				"AppPlugin",
				error.message,
				"error",
			),
		};

		return Object.freeze({
			attachDeviceIngress,
			initialState: structuredClone(state),
			ports,
			release: () => {
				if (!active) return;
				active = false;
				detachIngress?.();
				detachIngress = undefined;
			},
		});
	};
}
