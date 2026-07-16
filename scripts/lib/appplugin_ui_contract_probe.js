const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { DirectMetroBundleRuntime, createDefaultPluginSdk } = require("./direct_metro_bundle_runtime.js");
const { createDiscoverySkiaApi } = require("./discovery_skia_api.js");
const { DirectJxWorkerHost } = require("./direct_jx_worker_host.js");
const { createOffscreenSkiaCapture } = require("./offscreen_skia_capture.js");

const VIEW_MANAGER_NAME_PATTERN = /(?:RCT|RNC|RNS|Android|Lottie|Skia|YX|RR[A-Z])[A-Za-z0-9_]{3,60}/gu;

const DIRECT_EVENT_REGISTRATION_NAMES = Object.freeze({
	topAccessibilityAction: "onAccessibilityAction",
	onGestureHandlerEvent: "onGestureHandlerEvent",
	onGestureHandlerStateChange: "onGestureHandlerStateChange",
	topContentSizeChange: "onContentSizeChange",
	topScrollBeginDrag: "onScrollBeginDrag",
	topMessage: "onMessage",
	topSelectionChange: "onSelectionChange",
	topLoadingFinish: "onLoadingFinish",
	topMomentumScrollEnd: "onMomentumScrollEnd",
	topLoadingStart: "onLoadingStart",
	topLoadingError: "onLoadingError",
	topMomentumScrollBegin: "onMomentumScrollBegin",
	topScrollEndDrag: "onScrollEndDrag",
	topScroll: "onScroll",
	topLayout: "onLayout"
});

const BUBBLING_EVENT_NAMES = Object.freeze([
	"Change",
	"Select",
	"TouchEnd",
	"TouchCancel",
	"TouchStart",
	"TouchMove",
	"PointerCancel",
	"PointerDown",
	"PointerEnter",
	"PointerLeave",
	"PointerMove",
	"PointerUp",
	"PointerOut",
	"PointerOver",
	"Click"
]);

function createReactNativeEventTypes() {
	const directEventTypes = Object.fromEntries(Object.entries(DIRECT_EVENT_REGISTRATION_NAMES).map(
		([eventType, registrationName]) => [eventType, { registrationName }]
	));
	const bubblingEventTypes = Object.fromEntries(BUBBLING_EVENT_NAMES.map(eventName => [
		`top${eventName}`,
		{
			phasedRegistrationNames: {
				captured: `on${eventName}Capture`,
				bubbled: `on${eventName}`
			},
			...(eventName === "PointerEnter" || eventName === "PointerLeave" ? { skipBubbling: true } : {})
		}
	]));
	return { bubblingEventTypes, directEventTypes };
}

function hashFile(filePath) {
	return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function summarizeUiValue(value, depth = 0) {
	if (value == null || ["string", "number", "boolean"].includes(typeof value)) return value;
	if (typeof value === "function") return "[function]";
	if (depth >= 3) return Array.isArray(value) ? `[array:${value.length}]` : "[object]";
	if (Array.isArray(value)) return value.slice(0, 50).map(item => summarizeUiValue(item, depth + 1));
	return Object.fromEntries(Object.entries(value).slice(0, 80).map(
		([key, item]) => [key, summarizeUiValue(item, depth + 1)]
	));
}

function extractViewManagerCandidates(bundleBuffer) {
	const text = Buffer.isBuffer(bundleBuffer) ? bundleBuffer.toString("utf8") : String(bundleBuffer);
	return [...new Set(text.match(VIEW_MANAGER_NAME_PATTERN) ?? [])].sort();
}

function extractViewCompositionOrder(operations, targetViewManager = "SkiaPictureView") {
	const managerByTag = new Map();
	const childrenByParent = new Map();
	const creationOrder = [];
	const integerArray = value => Array.isArray(value) ? value.filter(Number.isInteger) : [];

	for (const operation of operations) {
		if (operation.kind === "createView") {
			const [tag, manager] = operation.args;
			if (Number.isInteger(tag) && typeof manager === "string") {
				managerByTag.set(tag, manager);
				if (manager === targetViewManager) creationOrder.push(tag);
			}
			continue;
		}
		if (operation.kind === "setChildren") {
			const [parentTag, childTags] = operation.args;
			if (Number.isInteger(parentTag)) childrenByParent.set(parentTag, integerArray(childTags));
			continue;
		}
		if (operation.kind !== "manageChildren") continue;
		const [parentTag, moveFrom, moveTo, addTags, addAt, removeAt] = operation.args;
		if (!Number.isInteger(parentTag)) continue;
		const current = [...(childrenByParent.get(parentTag) ?? [])];
		const fromIndices = integerArray(moveFrom);
		const toIndices = integerArray(moveTo);
		const moved = fromIndices.map((fromIndex, index) => ({
			tag: current[fromIndex],
			at: toIndices[index],
		})).filter(item => Number.isInteger(item.tag) && Number.isInteger(item.at));
		const removedIndices = [...new Set([...fromIndices, ...integerArray(removeAt)])]
			.sort((left, right) => right - left);
		for (const index of removedIndices) {
			if (index >= 0 && index < current.length) current.splice(index, 1);
		}
		const additions = [
			...moved,
			...integerArray(addTags).map((tag, index) => ({ tag, at: integerArray(addAt)[index] })),
		].filter(item => Number.isInteger(item.at)).sort((left, right) => left.at - right.at);
		for (const { tag, at } of additions) current.splice(Math.max(0, Math.min(at, current.length)), 0, tag);
		childrenByParent.set(parentTag, current);
	}

	const allTags = new Set([...managerByTag.keys(), ...childrenByParent.keys()]);
	const childTags = new Set([...childrenByParent.values()].flat());
	const roots = [...allTags].filter(tag => !childTags.has(tag));
	if (allTags.has(1)) roots.sort((left, right) => left === 1 ? -1 : right === 1 ? 1 : left - right);
	else roots.sort((left, right) => left - right);
	const visited = new Set();
	const order = [];
	const visit = tag => {
		if (visited.has(tag)) return;
		visited.add(tag);
		if (managerByTag.get(tag) === targetViewManager) order.push(tag);
		for (const childTag of childrenByParent.get(tag) ?? []) visit(childTag);
	};
	for (const root of roots) visit(root);
	for (const tag of creationOrder) {
		if (!order.includes(tag)) order.push(tag);
	}
	return order;
}

function createDiscoveryUiManager(viewManagerNames, operations) {
	const { bubblingEventTypes, directEventTypes } = createReactNativeEventTypes();
	const defaultEventTypes = { bubblingEventTypes, directEventTypes };
	const viewConfig = {
		NativeProps: {},
		bubblingEventTypes,
		directEventTypes,
		Commands: { pause: 3, play: 1, reset: 2, resume: 4 }
	};
	const constants = {
		ViewManagerNames: viewManagerNames,
		LazyViewManagersEnabled: false,
		genericBubblingEventTypes: bubblingEventTypes,
		genericDirectEventTypes: directEventTypes
	};
	for (const name of viewManagerNames) constants[name] = viewConfig;
	const capture = kind => (...args) => operations.push({
		kind,
		args: args.map(value => summarizeUiValue(value))
	});
	return {
		...constants,
		getConstants: () => constants,
		getDefaultEventTypes: () => defaultEventTypes,
		getConstantsForViewManager: () => viewConfig,
		createView: capture("createView"),
		updateView: capture("updateView"),
		manageChildren: capture("manageChildren"),
		setChildren: capture("setChildren"),
		dispatchViewManagerCommand: capture("dispatchViewManagerCommand"),
		sendAccessibilityEvent: capture("sendAccessibilityEvent"),
		setJSResponder: capture("setJSResponder"),
		clearJSResponder: capture("clearJSResponder"),
		measure(tag, callback) {
			capture("measure")(tag);
			callback?.(0, 0, 360, 640, 0, 0);
		},
		measureInWindow(tag, callback) {
			capture("measureInWindow")(tag);
			callback?.(0, 0, 360, 640);
		},
		measureLayout(tag, ancestorTag, errorCallback, callback) {
			capture("measureLayout")(tag, ancestorTag);
			void errorCallback;
			callback?.(0, 0, 360, 640);
		}
	};
}

function dispatchTouchEvent(runtime, uiOperations, activeTouches, event) {
	const supportedEventTypes = new Set(["topTouchStart", "topTouchMove", "topTouchEnd", "topTouchCancel"]);
	if (!supportedEventTypes.has(event.eventType)) {
		throw new Error(`Unsupported touch event type: ${String(event.eventType)}`);
	}
	const targetViewManager = event.targetViewManager ?? "SkiaPictureView";
	const targetTag = event.targetTag ?? [...uiOperations].reverse().find(operation =>
		operation.kind === "createView" && operation.args[1] === targetViewManager
	)?.args[0];
	if (!Number.isInteger(targetTag)) {
		throw new Error(`Touch target view was not created: ${targetViewManager}`);
	}

	const identifier = Number.isInteger(event.identifier) ? event.identifier : 0;
	const existing = activeTouches.get(identifier);
	const touch = {
		identifier,
		target: targetTag,
		pageX: Number(event.x),
		pageY: Number(event.y),
		locationX: Number(event.locationX ?? event.x),
		locationY: Number(event.locationY ?? event.y),
		screenX: Number(event.screenX ?? event.x),
		screenY: Number(event.screenY ?? event.y),
		timestamp: Number(event.timestamp ?? Date.now()),
		force: Number(event.force ?? 1),
		...(existing ?? {})
	};
	touch.pageX = Number(event.x ?? touch.pageX);
	touch.pageY = Number(event.y ?? touch.pageY);
	touch.locationX = Number(event.locationX ?? event.x ?? touch.locationX);
	touch.locationY = Number(event.locationY ?? event.y ?? touch.locationY);
	touch.screenX = Number(event.screenX ?? event.x ?? touch.screenX);
	touch.screenY = Number(event.screenY ?? event.y ?? touch.screenY);
	touch.timestamp = Number(event.timestamp ?? Date.now());
	activeTouches.set(identifier, touch);

	const touches = [...activeTouches.values()].sort((left, right) => left.identifier - right.identifier);
	const changedIndex = touches.findIndex(item => item.identifier === identifier);
	runtime.context.__fbBatchedBridge.callFunctionReturnFlushedQueue(
		"RCTEventEmitter",
		"receiveTouches",
		[event.eventType, structuredClone(touches), [changedIndex]]
	);
	if (event.eventType === "topTouchEnd" || event.eventType === "topTouchCancel") {
		activeTouches.delete(identifier);
	}
	return { eventType: event.eventType, identifier, targetTag, x: touch.pageX, y: touch.pageY };
}

function createCaptureOnlyDeviceModule(options = {}) {
	const calls = options.calls ?? [];
	const listeners = new Map();
	const shadowDps = structuredClone(options.shadowDps ?? {});
	const capture = (method, args) => calls.push({
		method,
		args: args.map(value => summarizeUiValue(value))
	});
	return {
		calls,
		listeners,
		module: {
			publishDps(payload, callback) {
				capture("publishDps", [payload]);
				callback?.(true);
				return Promise.resolve(true);
			},
			loadDps() {
				capture("loadDps", []);
				return Promise.resolve(structuredClone(shadowDps));
			},
			getDeviceOnlineStatus() {
				capture("getDeviceOnlineStatus", []);
				return Promise.resolve(true);
			},
			addListener(eventType, listener) {
				capture("addListener", [eventType]);
				if (typeof listener === "function") {
					const registered = listeners.get(eventType) ?? new Set();
					registered.add(listener);
					listeners.set(eventType, registered);
				}
			},
			removeListeners(count) {
				capture("removeListeners", [count]);
			},
			removeListener(eventType, listener) {
				capture("removeListener", [eventType]);
				listeners.get(eventType)?.delete(listener);
			}
		},
		emit(eventType, payload) {
			capture("emit", [eventType]);
			for (const listener of listeners.get(eventType) ?? []) listener(payload);
		}
	};
}

function createAgreementAwarePluginSdk(bundlePath, overrides = {}) {
	const definedOverrides = Object.fromEntries(Object.entries(overrides).filter(([, value]) => value !== undefined));
	const agreements = [
		{ type: "USER_AGREEMENT", version: 1, url: "" },
		{ type: "PRIVACY_POLICY", version: 1, url: "" }
	];
	return {
		...createDefaultPluginSdk(bundlePath),
		...definedOverrides,
		deviceModel: overrides.deviceModel ?? "roborock.vacuum.ss09",
		getPluginAgreements: () => Promise.resolve(structuredClone(agreements)),
		agreementAndPolicy: () => Promise.resolve({
			privacyProtocol: { version: "1", langUrl: "" },
			userAgreement: { version: "1", langUrl: "" }
		}),
		getLanguage: () => Promise.resolve(overrides.language ?? "de")
	};
}

function createTimerDriver(errors) {
	const handles = new Map();
	let runtime;
	let dispatchCount = 0;
	function dispatch(timerId) {
		try {
			runtime?.context.__fbBatchedBridge.callFunctionReturnFlushedQueue("JSTimers", "callTimers", [[timerId]]);
			dispatchCount++;
		} catch (error) {
			errors.push(error instanceof Error ? error.message : String(error));
		}
	}
	function schedule(timerId, duration, repeats) {
		const delay = Math.max(0, Number(duration) || 0);
		const handle = setTimeout(() => {
			handles.delete(timerId);
			dispatch(timerId);
			if (repeats) schedule(timerId, delay, true);
		}, delay);
		handle.unref?.();
		handles.set(timerId, handle);
	}
	return {
		module: {
			createTimer: (timerId, duration, _jsSchedulingTime, repeats) => schedule(timerId, duration, repeats),
			deleteTimer: timerId => {
				const handle = handles.get(timerId);
				if (handle) clearTimeout(handle);
				handles.delete(timerId);
			},
			setSendIdleEvents: () => {}
		},
		attach(nextRuntime) {
			runtime = nextRuntime;
		},
		get dispatchCount() {
			return dispatchCount;
		},
		stop() {
			for (const handle of handles.values()) clearTimeout(handle);
			handles.clear();
		}
	};
}

function wait(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function probeMetroBundleUiContract(bundlePath, options = {}) {
	const absoluteBundlePath = path.resolve(bundlePath);
	const beforeHash = hashFile(absoluteBundlePath);
	const viewManagerCandidates = extractViewManagerCandidates(fs.readFileSync(absoluteBundlePath));
	const uiOperations = [];
	const device = createCaptureOnlyDeviceModule({ shadowDps: options.shadowDps });
	const timerErrors = [];
	const deviceEventErrors = [];
	const deviceEventHandles = [];
	const emittedDeviceEvents = [];
	const layoutEventErrors = [];
	const layoutedViewTags = new Set();
	const touchEventErrors = [];
	const touchEventHandles = [];
	const emittedTouchEvents = [];
	const activeTouches = new Map();
	const skiaCalls = [];
	const timerDriver = createTimerDriver(timerErrors);
	const backgroundWorkerHost = new DirectJxWorkerHost({
		bundlePath: absoluteBundlePath,
		loadTimeoutMs: options.workerLoadTimeoutMs,
		callTimeoutMs: options.workerCallTimeoutMs
	});
	const pluginSdk = createAgreementAwarePluginSdk(absoluteBundlePath, {
		deviceModel: options.deviceModel,
		language: options.language,
		...backgroundWorkerHost.sdk
	});
	const providedSkiaHost = options.skiaHost;
	const skiaCapture = providedSkiaHost || options.enableSkiaDiscovery === false
		? undefined
		: createOffscreenSkiaCapture(skiaCalls);
	const discoveryGlobals = providedSkiaHost
		? { SkiaApi: providedSkiaHost.api, SkiaViewApi: providedSkiaHost.viewApi }
		: options.enableSkiaDiscovery === false
			? {}
			: { SkiaApi: skiaCapture.api, SkiaViewApi: createDiscoverySkiaApi(skiaCalls) };
	const runtime = new DirectMetroBundleRuntime({
		bundlePath: absoluteBundlePath,
		timeoutMs: options.timeoutMs ?? 15_000,
		globals: discoveryGlobals,
		nativeModules: {
			UIManager: createDiscoveryUiManager(viewManagerCandidates, uiOperations),
			Timing: timerDriver.module,
			RRPluginSDK: pluginSdk,
			RRPluginSDKTurboModule: pluginSdk,
			RRPluginDevice: device.module,
			RRPluginDeviceTurboModule: device.module
		}
	});
	timerDriver.attach(runtime);

	let loadResult;
	let runError;
	let microtaskPump;
	let layoutPump;
	let microtaskPumps = 0;
	try {
		loadResult = runtime.load();
		if (!loadResult.appRegistry) throw new Error("Bundle did not expose an AppRegistry");
		loadResult.appRegistry.runApplication("App", { rootTag: 1, initialProps: options.initialProps ?? {} }, "visible");
		microtaskPump = setInterval(() => {
			try {
				runtime.context.__fbBatchedBridge?._reactNativeMicrotasksCallback?.();
				microtaskPumps++;
			} catch (error) {
				timerErrors.push(error instanceof Error ? error.message : String(error));
			}
		}, options.pumpIntervalMs ?? 10);
		layoutPump = setInterval(() => {
			for (const operation of uiOperations) {
				if (operation.kind !== "createView") continue;
				const tag = operation.args[0];
				if (typeof tag !== "number" || layoutedViewTags.has(tag)) continue;
				try {
					runtime.context.__fbBatchedBridge.callFunctionReturnFlushedQueue(
						"RCTEventEmitter",
						"receiveEvent",
						[tag, "topLayout", { layout: {
							x: 0,
							y: 0,
							width: options.layoutWidth ?? 360,
							height: options.layoutHeight ?? 640
						} }]
					);
					layoutedViewTags.add(tag);
				} catch (error) {
					layoutEventErrors.push(error instanceof Error ? error.message : String(error));
				}
			}
		}, options.layoutPumpIntervalMs ?? 25);
		for (const event of options.deviceEvents ?? []) {
			const handle = setTimeout(() => {
				try {
					if (event.channel === "device-module") {
						device.emit(event.eventType, event.payload);
					} else {
						runtime.context.__fbBatchedBridge.callFunctionReturnFlushedQueue(
							"RCTDeviceEventEmitter",
							"emit",
							[event.eventType, event.payload]
						);
					}
					emittedDeviceEvents.push(event.eventType);
				} catch (error) {
					deviceEventErrors.push(error instanceof Error ? error.message : String(error));
				}
			}, event.afterMs ?? 0);
			deviceEventHandles.push(handle);
		}
		for (const event of options.touchEvents ?? []) {
			const handle = setTimeout(() => {
				try {
					emittedTouchEvents.push(dispatchTouchEvent(runtime, uiOperations, activeTouches, event));
				} catch (error) {
					touchEventErrors.push(error instanceof Error ? error.message : String(error));
				}
			}, event.afterMs ?? 0);
			touchEventHandles.push(handle);
		}
		await wait(options.durationMs ?? 750);
	} catch (error) {
		runError = error instanceof Error ? error.message : String(error);
	} finally {
		if (microtaskPump) clearInterval(microtaskPump);
		if (layoutPump) clearInterval(layoutPump);
		for (const handle of deviceEventHandles) clearTimeout(handle);
		for (const handle of touchEventHandles) clearTimeout(handle);
		timerDriver.stop();
		backgroundWorkerHost.stopAll();
	}

	const viewCompositionOrder = extractViewCompositionOrder(uiOperations);
	providedSkiaHost?.setViewOrder?.(viewCompositionOrder);
	let pngArtifact;
	let pngArtifactError;
	if (options.pngOutputPath) {
		try {
			pngArtifact = providedSkiaHost?.exportLatestPng(options.pngOutputPath)
				?? skiaCapture?.exportFirstPng(options.pngOutputPath);
		} catch (error) {
			pngArtifactError = error instanceof Error ? error.message : String(error);
		}
	}
	const afterHash = hashFile(absoluteBundlePath);
	const createdViewManagers = [...new Set(uiOperations
		.filter(operation => operation.kind === "createView")
		.map(operation => operation.args[1])
		.filter(name => typeof name === "string"))];
	return {
		schemaVersion: 1,
		probeKind: "discovery-only-ui-contract",
		bundlePath: absoluteBundlePath,
		sha256: beforeHash,
		unchanged: beforeHash === afterHash,
		appKeys: loadResult?.appKeys ?? [],
		registryKind: loadResult?.registryKind,
		runError,
		reportedExceptions: runtime.reportedExceptions.map(exception => exception.originalMessage ?? exception.message ?? String(exception)),
		reportedExceptionDetails: runtime.reportedExceptions.map(exception => ({
			message: exception.message,
			originalMessage: exception.originalMessage,
			stack: exception.stack
		})),
		timerErrors,
		deviceEventErrors,
		layoutEventErrors,
		touchEventErrors,
		emittedLayoutEventCount: layoutedViewTags.size,
		emittedDeviceEvents,
		emittedTouchEvents,
		timerDispatchCount: timerDriver.dispatchCount,
		microtaskPumps,
		viewManagerCandidateCount: viewManagerCandidates.length,
		createdViewManagers,
		viewCompositionOrder,
		uiOperationCount: uiOperations.length,
		uiOperations,
		deviceCalls: device.calls,
		registeredDeviceEvents: [...device.listeners.keys()].sort(),
		skiaCalls,
		capturedSkiaImages: skiaCapture?.images ?? [],
		skiaHostDiagnostics: providedSkiaHost?.getDiagnostics(),
		pngArtifact,
		pngArtifactError,
		backgroundWorkerCalls: backgroundWorkerHost.calls,
		backgroundWorkerErrors: backgroundWorkerHost.errors,
		requestedNativeModules: runtime.trace.uniqueCapabilities("module-request"),
		fallbackCapabilities: runtime.trace.uniqueCapabilities("fallback-access"),
		logs: runtime.logs
	};
}

module.exports = {
	createAgreementAwarePluginSdk,
	createCaptureOnlyDeviceModule,
	createDiscoveryUiManager,
	createReactNativeEventTypes,
	dispatchTouchEvent,
	extractViewCompositionOrder,
	extractViewManagerCandidates,
	probeMetroBundleUiContract
};
