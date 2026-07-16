const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class NativeCapabilityTrace {
	constructor() {
		this.entries = [];
	}

	record(kind, capability, args = []) {
		this.entries.push({
			kind,
			capability,
			args: args.map(value => summarizeValue(value))
		});
	}

	uniqueCapabilities(kind) {
		return [...new Set(this.entries.filter(entry => !kind || entry.kind === kind).map(entry => entry.capability))];
	}
}

function summarizeValue(value) {
	if (value === null || value === undefined) return value;
	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
	if (Array.isArray(value)) return `[array:${value.length}]`;
	if (typeof value === "function") return "[function]";
	return `[${Object.prototype.toString.call(value).slice(8, -1)}]`;
}

function unrefTimer(timerFactory) {
	return (...args) => {
		const timer = timerFactory(...args);
		timer?.unref?.();
		return timer;
	};
}

function createFallbackFunction(capability, trace) {
	return (...args) => {
		trace.record("fallback-call", capability, args);
		if (capability.endsWith(".addListener")) {
			return { remove() {} };
		}
		if (capability.endsWith(".getConstants")) return {};
		return null;
	};
}

function createNativeModule(name, implementation, trace) {
	const fallbackFunctions = new Map();
	return new Proxy(implementation ?? {}, {
		get(target, property, receiver) {
			if (property === "then") return undefined;
			if (typeof property === "symbol") return Reflect.get(target, property, receiver);
			if (Reflect.has(target, property)) {
				trace.record("implemented-access", `${name}.${property}`);
				return Reflect.get(target, property, receiver);
			}
			const capability = `${name}.${property}`;
			trace.record("fallback-access", capability);
			if (!fallbackFunctions.has(property)) {
				fallbackFunctions.set(property, createFallbackFunction(capability, trace));
			}
			return fallbackFunctions.get(property);
		}
	});
}

function createDefaultPluginSdk(bundlePath) {
	const basePath = path.dirname(path.resolve(bundlePath));
	return {
		basePath,
		apiLevel: 10_010,
		ownerId: "phase0-owner",
		userId: "phase0-user",
		devMode: false,
		deviceId: "phase0-device",
		deviceName: "Phase 0",
		deviceModel: "roborock.vacuum.t4v2",
		storageBasePath: basePath,
		activeTime: "0",
		robotTimeZone: "Europe/Berlin",
		systemInfo: { mobileModel: "node", systemVersion: process.version },
		deviceNameChangedEvent: "deviceNameChanged",
		audioPlayerDidFinishPlayingEvent: "audioPlayerDidFinishPlaying",
		clientID: "phase0-client",
		iotType: "roborock",
		memory: 1_024,
		userScope: "owner",
		safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 },
		productAgreements: [],
		pluginAgreements: [],
		readFileListAtPath: () => Promise.resolve([]),
		startBackgroundJsExecutor: () => null,
		addListener: () => {},
		removeListeners: () => {}
	};
}

function createDefaultDeviceModule(capturedDps, trace) {
	return {
		publishDps: payload => {
			capturedDps.push(structuredClone(payload));
			trace.record("publish-dps", "RRPluginDevice.publishDps", [payload]);
			return Promise.resolve(true);
		},
		addListener: () => {},
		removeListeners: () => {}
	};
}

function defaultNativeModules(bundlePath, trace, reportedExceptions, capturedDps, overrides = {}) {
	const pluginSdk = createDefaultPluginSdk(bundlePath);
	const pluginDevice = createDefaultDeviceModule(capturedDps, trace);
	const modules = {
		PlatformConstants: {
			getConstants: () => ({
				Version: 35,
				Release: "15",
				Serial: "unknown",
				Fingerprint: "phase0",
				Model: "phase0",
				isTesting: true,
				reactNativeVersion: { major: 0, minor: 73, patch: 0 },
				uiMode: "normal"
			})
		},
		SourceCode: {
			getConstants: () => ({ scriptURL: path.resolve(bundlePath) })
		},
		DeviceInfo: {
			getConstants: () => ({
				Dimensions: {
					windowPhysicalPixels: { width: 1080, height: 1920, scale: 3, fontScale: 1, densityDpi: 420 },
					screenPhysicalPixels: { width: 1080, height: 1920, scale: 3, fontScale: 1, densityDpi: 420 }
				}
			})
		},
		I18nManager: {
			getConstants: () => ({ isRTL: false, doLeftAndRightSwapInRTL: true, localeIdentifier: "de_DE" }),
			allowRTL: () => {},
			forceRTL: () => {},
			swapLeftAndRightInRTL: () => {}
		},
		UIManager: {
			getConstants: () => ({
				ViewManagerNames: [],
				LazyViewManagersEnabled: false,
				genericBubblingEventTypes: {},
				genericDirectEventTypes: {}
			}),
			getDefaultEventTypes: () => [],
			getConstantsForViewManager: () => ({}),
			createView: () => {},
			updateView: () => {},
			manageChildren: () => {},
			setChildren: () => {}
		},
		ExceptionsManager: {
			reportException: data => {
				reportedExceptions.push(data);
				trace.record("reported-exception", "ExceptionsManager.reportException", [data]);
			}
		},
		DevSettings: {
			reload: () => {},
			addMenuItem: () => {},
			setHotLoadingEnabled: () => {}
		},
		Timing: {
			createTimer: () => {},
			deleteTimer: () => {},
			setSendIdleEvents: () => {}
		},
		Appearance: {
			getColorScheme: () => "light"
		},
		AppState: {
			getConstants: () => ({ initialAppState: "active" }),
			getCurrentAppState: success => success?.({ app_state: "active" })
		},
		AccessibilityInfo: {
			getConstants: () => ({})
		},
		RNCNetInfo: {
			getCurrentState: () => Promise.resolve({
				type: "wifi",
				isConnected: true,
				isInternetReachable: true,
				details: {}
			}),
			addListener: () => {},
			removeListeners: () => {}
		},
		RRPluginSDK: pluginSdk,
		RRPluginSDKTurboModule: pluginSdk,
		RRPluginDevice: pluginDevice,
		RRPluginDeviceTurboModule: pluginDevice,
		RRPluginDarkMode: {
			getColorScheme: () => "light",
			addListener: () => {},
			removeListeners: () => {}
		},
		RRPluginDarkTurboModule: {
			getColorScheme: () => "light"
		},
		RRAppSysTurboModule: {
			info: pluginSdk.systemInfo
		},
		ReactLocalization: {
			language: "de",
			getLanguage: callback => callback?.("de")
		},
		...overrides
	};

	return new Map(Object.entries(modules).map(([name, implementation]) => [name, createNativeModule(name, implementation, trace)]));
}

function createAppRegistryFacade(context) {
	const directRegistry = context.RN$AppRegistry;
	if (directRegistry && typeof directRegistry.getAppKeys === "function") {
		return {
			kind: "direct",
			getAppKeys: () => directRegistry.getAppKeys(),
			runApplication: (appKey, appParameters, displayMode) =>
				directRegistry.runApplication(appKey, appParameters, displayMode)
		};
	}

	const bridge = context.__fbBatchedBridge;
	if (!bridge || typeof bridge.callFunctionReturnResultAndFlushedQueue !== "function") return undefined;

	const call = (method, args) => {
		const result = bridge.callFunctionReturnResultAndFlushedQueue("AppRegistry", method, args);
		return Array.isArray(result) ? result[0] : undefined;
	};

	try {
		if (!Array.isArray(call("getAppKeys", []))) return undefined;
	} catch {
		return undefined;
	}

	return {
		kind: "batched-bridge",
		getAppKeys: () => call("getAppKeys", []),
		runApplication: (appKey, appParameters, displayMode) =>
			call("runApplication", [appKey, appParameters, displayMode])
	};
}

class DirectMetroBundleRuntime {
	constructor(options) {
		if (!options?.bundlePath) throw new Error("bundlePath is required");
		this.bundlePath = path.resolve(options.bundlePath);
		this.timeoutMs = options.timeoutMs ?? 10_000;
		this.trace = new NativeCapabilityTrace();
		this.logs = [];
		this.reportedExceptions = [];
		this.capturedDps = [];
		this.nativeModules = defaultNativeModules(
			this.bundlePath,
			this.trace,
			this.reportedExceptions,
			this.capturedDps,
			options.nativeModules
		);
		this.context = vm.createContext(this.#createSandbox(options.globals ?? {}), {
			name: `direct-appplugin:${path.basename(path.dirname(this.bundlePath))}`
		});
	}

	#createSandbox(globals) {
		const getNativeModule = name => {
			this.trace.record("module-request", String(name));
			if (!this.nativeModules.has(name)) {
				this.nativeModules.set(name, createNativeModule(String(name), {}, this.trace));
			}
			return this.nativeModules.get(name);
		};
		const consoleBridge = {};
		for (const level of ["debug", "error", "info", "log", "warn"]) {
			consoleBridge[level] = (...args) => this.logs.push({ level, args: args.map(summarizeValue) });
		}
		const phase0SetImmediate = unrefTimer(setImmediate);
		const phase0SetInterval = unrefTimer(setInterval);
		const phase0SetTimeout = unrefTimer(setTimeout);
		const sandbox = {
			AbortController,
			ArrayBuffer,
			Blob,
			Buffer,
			DataView,
			Event,
			EventTarget,
			FormData,
			Headers,
			MessageChannel,
			Promise,
			ReadableStream,
			Request,
			Response,
			TextDecoder,
			TextEncoder,
			URL,
			URLSearchParams,
			Uint8Array,
			cancelAnimationFrame: clearTimeout,
			clearImmediate,
			clearInterval,
			clearTimeout,
			console: consoleBridge,
			fetch,
			nativeModuleProxy: new Proxy({}, { get: (_target, name) => getNativeModule(name) }),
			navigator: { product: "ReactNative" },
			performance,
			queueMicrotask,
			requestAnimationFrame: callback => phase0SetTimeout(() => callback(performance.now()), 16),
			setImmediate: phase0SetImmediate,
			setInterval: phase0SetInterval,
			setTimeout: phase0SetTimeout,
			structuredClone,
			__turboModuleProxy: name => getNativeModule(name),
			...globals
		};
		sandbox.global = sandbox;
		sandbox.self = sandbox;
		sandbox.window = sandbox;
		return sandbox;
	}

	load() {
		const before = fs.readFileSync(this.bundlePath);
		const sha256 = crypto.createHash("sha256").update(before).digest("hex");
		new vm.Script(before.toString("utf8"), { filename: this.bundlePath }).runInContext(this.context, {
			timeout: this.timeoutMs
		});
		const after = fs.readFileSync(this.bundlePath);
		const afterSha256 = crypto.createHash("sha256").update(after).digest("hex");
		if (sha256 !== afterSha256) throw new Error("Bundle changed while it was being executed");

		const appRegistry = createAppRegistryFacade(this.context);
		return {
			bundlePath: this.bundlePath,
			sha256,
			bundleBytes: before.length,
			appRegistry,
			appKeys: appRegistry?.getAppKeys?.() ?? [],
			registryKind: appRegistry?.kind,
			reportedExceptions: this.reportedExceptions,
			capturedDps: this.capturedDps,
			fallbackCapabilities: this.trace.uniqueCapabilities("fallback-access"),
			requestedNativeModules: this.trace.uniqueCapabilities("module-request"),
			trace: this.trace.entries,
			logs: this.logs
		};
	}
}

module.exports = {
	DirectMetroBundleRuntime,
	NativeCapabilityTrace,
	createAppRegistryFacade,
	createDefaultPluginSdk,
	createNativeModule
};
