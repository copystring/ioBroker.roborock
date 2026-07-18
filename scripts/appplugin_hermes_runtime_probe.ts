import { createHash, randomUUID } from "node:crypto";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

import contractJson from "../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import { createCanvasKitSkiaHost } from "../src/lib/appplugin/CanvasKitSkiaHost";
import {
	loadApkDeviceReplayManifest,
	matchesApkDeviceReplayPublish,
	resolveApkDeviceReplayFirmwareVersion,
	type ApkDeviceReplayEvent,
	type ApkDeviceReplayManifest,
} from "./lib/apkDeviceReplayManifest";
import {
	loadApkPointerReplayManifest,
	type ApkPointerReplayManifest,
} from "./lib/apkPointerReplayManifest";
import {
	loadApkInteractionReplayManifest,
	type ApkInteractionReplayManifest,
} from "./lib/apkInteractionReplayManifest";
import {
	resolveAppPluginIsRtl,
	selectedAppLanguageIsRtl,
	updateAppPluginDesktopSessionState,
} from "./lib/appPluginDesktopSessionState";
import {
	parseAppPluginDesktopProfile,
	parseAppPluginMapFamily,
	writeAppPluginDesktopProfileSwitch,
	type AppPluginDesktopProfile,
	type AppPluginMapFamily,
} from "./lib/appPluginDesktopProfiles";
import { resolveAppPluginDesktopStaticAsset } from "./lib/appPluginDesktopStaticAssets";
import {
	injectAppPluginSessionToken,
	isValidAppPluginSessionToken,
	requestHasAppPluginSessionToken,
	setAppPluginDesktopSecurityHeaders,
} from "./lib/appPluginDesktopHttpSession";
import {
	ApkAppearanceRuntime,
	APK_SEMANTIC_UI_ACTION_IDS,
	ApkAppStateRuntime,
	ApkAsyncStorageRuntime,
	ApkBlobTransferAssembler,
	ApkAppSysRuntime,
	ApkDarkModeRuntime,
	ApkDeviceFirmwareRuntime,
	ApkGestureHandlerRuntime,
	ApkHermesHostSession,
	ApkI18nManagerRuntime,
	ApkLocalizationRuntime,
	ApkNativeModuleDispatcher,
	ApkNativeAnimatedRuntime,
	ApkNetInfoRuntime,
	ApkPluginDeviceRuntime,
	ApkPluginSdkEnvironmentRuntime,
	ApkPointerInputBridge,
	ApkSkiaHostRuntime,
	ApkSoundManagerRuntime,
	ApkStatusBarRuntime,
	ApkTimingRuntime,
	ApkTextInputRuntime,
	ApkTouchEventDispatcher,
	ApkTouchEventRuntime,
	ApkUiExecutionRuntime,
	ApkUiManagerRuntime,
	exportApkNativeUiSnapshotPng,
	findApkSemanticUiAction,
	publicApkSemanticUiActions,
	renderApkNativeUiSnapshotToSvg,
	resolveApkSemanticUiActions,
	apkServedSurfaceViewport,
	selectApkServedSurfaceRoot,
	ApkV8WorkerRuntime,
	apkPluginSdkContextFromSession,
	createApkBridgeBootstrap,
	createApkCanvasKitTextLayoutBackend,
	decodeApkB01MqttFrameToSegment,
	createApkDeviceInfoConstants,
	createApkGestureHandlerConstants,
	createApkLocalizationConstants,
	createApkPluginSdkConstants,
	createApkRemoteModuleDefinitions,
	createApkSourceCodeConstants,
	createApkUiManagerConstants,
	mergeApkNativeModuleConstants,
	parseApkAppPluginSessionDescriptor,
	resolveEffectiveApkNativeModules,
	resolveApkAppPluginSession,
	StrictApkNativeModuleRegistry,
	type ApkAppPluginSessionDescriptor,
	type ApkAppPluginHostContract,
	type ApkSemanticUiActionId,
	type ApkUiManagerNodeSnapshot,
	type ApkV8WorkerDiagnostic,
} from "../src/apppluginHost";

interface ProbeOptions {
	bundlePath: string;
	hostExecutablePath: string;
	bootstrapPath: string;
	width: number;
	height: number;
	scale: number;
	densityDpi: number;
	fontScale: number;
	language: string;
	localeIdentifier: string;
	systemLocaleIdentifier: string;
	colorModel: "dark" | "default" | "light";
	systemColorScheme: "dark" | "light";
	cardStyle: number;
	allowRTL: boolean;
	forceRTL: boolean;
	doLeftAndRightSwapInRTL: boolean;
	deviceModel: string;
	deviceName: string | null;
	profileLabel: string;
	mobileModel: string;
	androidRelease: string;
	runApplication: boolean;
	reactStateProbe: boolean;
	servePort?: number;
	serveFullRoot: boolean;
	sessionStatePath?: string;
	staticRootPath?: string;
	httpSessionTokenFilePath?: string;
	httpSessionToken?: string;
	sessionDescriptor?: ApkAppPluginSessionDescriptor;
	profileId?: AppPluginDesktopProfile;
	fixtureMapFamily: AppPluginMapFamily;
	availableProfiles: AppPluginDesktopProfile[];
	profileSwitchPath?: string;
	b01FramePath?: string;
	b01LocalKey?: string;
	b01LocalKeyFilePath?: string;
	replayManifestPath?: string;
	pointerReplayManifestPath?: string;
	interactionReplayManifestPath?: string;
	duid: string;
	deviceSn: string;
	firmwareVersion?: string;
	activeTime: number;
}

function parsePositiveNumber(value: string | undefined, option: string): number {
	const number = Number(value);
	if (!Number.isFinite(number) || number <= 0) throw new Error(`${option} benötigt eine positive Zahl`);
	return number;
}

function parseNonNegativeNumber(value: string | undefined, option: string): number {
	const number = Number(value);
	if (!Number.isFinite(number) || number < 0) throw new Error(`${option} benötigt eine nichtnegative Zahl`);
	return number;
}

function parseBoolean(value: string | undefined, option: string): boolean {
	if (value === "true") return true;
	if (value === "false") return false;
	throw new Error(`${option} benötigt true oder false`);
}

function readSmallSecretFile(filePath: string, maximumBytes: number, label: string): string {
	const realPath = fs.realpathSync.native(filePath);
	const stats = fs.statSync(realPath);
	if (!stats.isFile()) throw new Error(`${label} ist keine Datei`);
	if (stats.size <= 0 || stats.size > maximumBytes) {
		throw new Error(`${label} muss zwischen 1 und ${maximumBytes} Bytes groß sein`);
	}
	return fs.readFileSync(realPath, "utf8").trim();
}

function parseArgs(args: string[]): ProbeOptions {
	const repositoryRoot = process.cwd();
	const options: Partial<ProbeOptions> = {
		bootstrapPath: path.join(repositoryRoot, "artifacts", "appplugin-poc", "runtime-probes", "ipc-bridge.js"),
		width: 1080,
		height: 2400,
		scale: 3,
		densityDpi: 480,
		fontScale: 1,
		language: "de",
		localeIdentifier: "de_DE",
		systemLocaleIdentifier: "de_DE",
		colorModel: "default",
		systemColorScheme: "light",
		cardStyle: 0,
		allowRTL: true,
		forceRTL: false,
		doLeftAndRightSwapInRTL: true,
		deviceName: "Roborock",
		mobileModel: "AppPlugin Hermes Runtime Probe",
		androidRelease: "runtime-probe",
		profileLabel: "Lokale AppPlugin-Aufzeichnung",
		runApplication: false,
		reactStateProbe: false,
		serveFullRoot: false,
		fixtureMapFamily: "unknown",
		availableProfiles: [],
		duid: "appplugin-runtime-probe-device",
		activeTime: 0,
	};
	let sessionDescriptorPath: string | undefined;
	for (let index = 0; index < args.length; index += 1) {
		const option = args[index];
		const value = args[index + 1];
		if (option === "--bundle" && value) options.bundlePath = path.resolve(args[++index]);
		else if (option === "--host" && value) options.hostExecutablePath = path.resolve(args[++index]);
		else if (option === "--bootstrap-output" && value) options.bootstrapPath = path.resolve(args[++index]);
		else if (option === "--width") options.width = parsePositiveNumber(args[++index], option);
		else if (option === "--height") options.height = parsePositiveNumber(args[++index], option);
		else if (option === "--scale") options.scale = parsePositiveNumber(args[++index], option);
		else if (option === "--density-dpi") options.densityDpi = parsePositiveNumber(args[++index], option);
		else if (option === "--font-scale") options.fontScale = parsePositiveNumber(args[++index], option);
		else if (option === "--language" && value) options.language = args[++index];
		else if (option === "--locale" && value) options.localeIdentifier = args[++index];
		else if (option === "--system-locale" && value) options.systemLocaleIdentifier = args[++index];
		else if (option === "--color-model" && (value === "dark" || value === "default" || value === "light")) {
			options.colorModel = value;
			index += 1;
		}
		else if (option === "--system-color-scheme" && (value === "dark" || value === "light")) {
			options.systemColorScheme = value;
			index += 1;
		}
		else if (option === "--card-style") options.cardStyle = parseNonNegativeNumber(args[++index], option);
		else if (option === "--allow-rtl") options.allowRTL = parseBoolean(args[++index], option);
		else if (option === "--force-rtl") options.forceRTL = parseBoolean(args[++index], option);
		else if (option === "--swap-left-right-in-rtl") {
			options.doLeftAndRightSwapInRTL = parseBoolean(args[++index], option);
		}
		else if (option === "--device-model" && value) options.deviceModel = args[++index];
		else if (option === "--device-name" && value) options.deviceName = args[++index];
		else if (option === "--profile-label" && value) options.profileLabel = args[++index];
		else if (option === "--mobile-model" && value) options.mobileModel = args[++index];
		else if (option === "--android-release" && value) options.androidRelease = args[++index];
		else if (option === "--run-application") options.runApplication = true;
		else if (option === "--react-state-probe") options.reactStateProbe = true;
		else if (option === "--b01-frame" && value) options.b01FramePath = path.resolve(args[++index]);
		else if (option === "--b01-local-key" && value) {
			throw new Error("--b01-local-key ist aus Sicherheitsgründen deaktiviert; verwende --b01-local-key-file");
		}
		else if (option === "--b01-local-key-file" && value) options.b01LocalKeyFilePath = path.resolve(args[++index]);
		else if (option === "--replay-manifest" && value) options.replayManifestPath = path.resolve(args[++index]);
		else if (option === "--pointer-replay" && value) options.pointerReplayManifestPath = path.resolve(args[++index]);
		else if (option === "--interaction-replay" && value) options.interactionReplayManifestPath = path.resolve(args[++index]);
		else if (option === "--serve-port" && value) options.servePort = parsePositiveNumber(args[++index], option);
		else if (option === "--serve-full-root") options.serveFullRoot = true;
		else if (option === "--session-state" && value) options.sessionStatePath = path.resolve(args[++index]);
		else if (option === "--static-root" && value) options.staticRootPath = path.resolve(args[++index]);
		else if (option === "--http-session-token-file" && value) {
			options.httpSessionTokenFilePath = path.resolve(args[++index]);
		}
		else if (option === "--session-descriptor" && value) {
			if (sessionDescriptorPath) throw new Error("--session-descriptor darf nur einmal angegeben werden");
			sessionDescriptorPath = path.resolve(args[++index]);
		}
		else if (option === "--profile-id" && value) {
			options.profileId = parseAppPluginDesktopProfile(args[++index]);
			if (!options.profileId) throw new Error("--profile-id enthält ein unbekanntes AppPlugin-Profil");
		}
		else if (option === "--fixture-map-family" && value) {
			const mapFamily = parseAppPluginMapFamily(args[++index]);
			if (!mapFamily) throw new Error("--fixture-map-family enthält eine unbekannte Kartenfamilie");
			options.fixtureMapFamily = mapFamily;
		}
		else if (option === "--available-profiles" && value) {
			options.availableProfiles = args[++index]
				.split(",")
				.map(profile => parseAppPluginDesktopProfile(profile))
				.filter((profile): profile is AppPluginDesktopProfile => profile !== undefined);
		}
		else if (option === "--profile-switch-file" && value) {
			options.profileSwitchPath = path.resolve(args[++index]);
		}

		else if (option === "--duid" && value) options.duid = args[++index];
		else if (option === "--device-sn" && value) options.deviceSn = args[++index];
		else if (option === "--firmware-version" && value) options.firmwareVersion = args[++index];
		else if (option === "--active-time") options.activeTime = parseNonNegativeNumber(args[++index], option);
		else throw new Error(`Unbekannte oder unvollständige Option: ${option}`);
	}
	if (sessionDescriptorPath) {
		const descriptorOwnedOptions = [
			"--bundle",
			"--device-model",
			"--device-name",
			"--mobile-model",
			"--android-release",
			"--duid",
			"--device-sn",
			"--firmware-version",
			"--active-time",
		];
		const conflicting = descriptorOwnedOptions.filter(option => args.includes(option));
		if (conflicting.length > 0) {
			throw new Error(
				`--session-descriptor darf nicht mit ${conflicting.join(", ")} kombiniert werden`,
			);
		}
		const descriptor = parseApkAppPluginSessionDescriptor(
			JSON.parse(fs.readFileSync(sessionDescriptorPath, "utf8")) as unknown,
			path.dirname(sessionDescriptorPath),
		);
		options.sessionDescriptor = descriptor;
		options.bundlePath = path.join(descriptor.pluginRoot, "index.android.bundle");
		options.deviceModel = descriptor.device.model;
		options.deviceName = descriptor.device.name;
		options.mobileModel = descriptor.host.mobileModel;
		options.androidRelease = descriptor.host.androidRelease;
		options.duid = descriptor.device.deviceId;
		options.deviceSn = descriptor.device.deviceSN;
		options.firmwareVersion = descriptor.device.firmwareVersion;
		options.activeTime = descriptor.device.activeTime;
	}
	if (!options.bundlePath || !options.hostExecutablePath || !options.deviceModel) {
		throw new Error(
			"Verwendung: --session-descriptor <json> --host <Hermes-Host> oder "
			+ "--bundle <index.android.bundle> --host <Hermes-Host> --device-model <HomeData-Modell> "
			+ "[--run-application --device-sn <Seriennummer> --firmware-version <Version>] "
			+ "[Display-, Sprach- und Probe-Geräteoptionen]",
		);
	}
	if (options.replayManifestPath && options.b01FramePath) {
		throw new Error("--replay-manifest und --b01-frame dürfen nicht gemeinsam verwendet werden");
	}
	if (options.b01LocalKeyFilePath) {
		options.b01LocalKey = readSmallSecretFile(
			options.b01LocalKeyFilePath,
			64,
			"--b01-local-key-file",
		);
		if (options.b01LocalKey.length !== 16) {
			throw new Error("--b01-local-key-file muss genau einen 16-stelligen Schlüssel enthalten");
		}
	}
	if (!options.replayManifestPath && Boolean(options.b01FramePath) !== Boolean(options.b01LocalKey)) {
		throw new Error("--b01-frame und --b01-local-key-file müssen gemeinsam angegeben werden");
	}
	if ((options.replayManifestPath || options.b01FramePath) && !options.runApplication) {
		throw new Error("Geräte-Replay benötigt --run-application");
	}
	if (options.servePort !== undefined && (!Number.isInteger(options.servePort) || options.servePort > 65_535)) {
		throw new Error("--serve-port benötigt eine ganze TCP-Portnummer bis 65535" );
	}
	if (options.servePort !== undefined && !options.runApplication) {
		throw new Error("Interaktiver Server benötigt --run-application" );
	}
	if (options.staticRootPath && options.servePort === undefined) {
		throw new Error("Statische Desktop-Dateien benötigen --serve-port");
	}
	if (options.servePort !== undefined) {
		if (!options.httpSessionTokenFilePath) {
			throw new Error("Interaktiver Server benötigt --http-session-token-file");
		}
		options.httpSessionToken = readSmallSecretFile(
			options.httpSessionTokenFilePath,
			256,
			"--http-session-token-file",
		);
		if (!isValidAppPluginSessionToken(options.httpSessionToken)) {
			throw new Error("--http-session-token-file enthält kein gültiges Sitzungstoken");
		}
	}
	const profileRoutingConfigured = options.profileId !== undefined
		|| options.availableProfiles.length > 0
		|| options.profileSwitchPath !== undefined;
	if (profileRoutingConfigured
		&& (!options.profileId
			|| options.availableProfiles.length === 0
			|| !options.availableProfiles.includes(options.profileId)
			|| !options.profileSwitchPath)) {
		throw new Error(
			"Profilrouting benötigt --profile-id, --available-profiles und --profile-switch-file",
		);
	}
	if (options.pointerReplayManifestPath && !options.runApplication) {
		throw new Error("Pointer-Replay benötigt --run-application");
	}
	if (options.interactionReplayManifestPath && !options.runApplication) {
		throw new Error("Interaktions-Replay benötigt --run-application");
	}
	if (options.pointerReplayManifestPath && options.interactionReplayManifestPath) {
		throw new Error("Pointer- und Interaktions-Replay dürfen nicht gleichzeitig verwendet werden");
	}
	if (options.runApplication && !options.deviceSn) {
		throw new Error("--run-application benötigt --device-sn");
	}
	options.deviceSn ??= "appplugin-runtime-probe-sn";
	return options as ProbeOptions;
}

function installedModule(contract: ApkAppPluginHostContract, moduleName: string) {
	const module = resolveEffectiveApkNativeModules(contract).find(candidate => candidate.moduleName === moduleName);
	if (!module) throw new Error(`APK-Modul ${moduleName} fehlt im Hostvertrag`);
	return module;
}

function createReactStateProbeBootstrap(): string {
	return `
(function installReactStateProbe(hostGlobal) {
"use strict";
var rendererId = 0;
var lastSignature = "";
var logProbeInstalled = false;
function installLogProbe() {
  if (logProbeInstalled || typeof hostGlobal.__r !== "function") return;
  try {
    var logger = hostGlobal.__r(447).default;
    if (!logger || typeof logger.log !== "function") return;
    var originalLog = logger.log;
    logger.log = function apkDiagnosticLogProbe() {
      var stage = arguments[0];
      if (typeof stage === "string" && (
        stage === "protobuf解析失败:"
        || stage === "当前图美化失败 err = "
        || stage === "非当前图美化失败 err = "
        || stage === "解析、美化失败:"
        || stage === "执行器方法调用失败 = "
      )) {
        var error = arguments[1];
        hostGlobal.nativeModuleProxy.RRAppSysTurboModule.info("apk-map-pipeline-error", JSON.stringify({
          stage: stage,
          errorName: error && typeof error.name === "string" ? error.name : null,
          errorMessage: error && typeof error.message === "string"
            ? error.message.slice(0, 240)
            : typeof error === "string" ? error.slice(0, 240) : null
        }));
      }
      return originalLog.apply(this, arguments);
    };
    logProbeInstalled = true;
  } catch (_error) {}
}
function collectSceneInventory(allData) {
  var allDataKeys = allData && typeof allData === "object"
    ? Object.keys(allData).sort()
    : [];
  var arrayCounts = {};
  var nestedArrayCounts = {};
  var objectKeys = [];
  for (var dataIndex = 0; dataIndex < allDataKeys.length; dataIndex += 1) {
    var dataKey = allDataKeys[dataIndex];
    var dataValue = allData[dataKey];
    if (Array.isArray(dataValue)) arrayCounts[dataKey] = dataValue.length;
    if (dataValue && typeof dataValue === "object" && !Array.isArray(dataValue)) {
      objectKeys.push(dataKey);
      var nestedKeys = Object.keys(dataValue).sort();
      var nestedCounts = {};
      for (var nestedIndex = 0; nestedIndex < nestedKeys.length; nestedIndex += 1) {
        var nestedKey = nestedKeys[nestedIndex];
        if (Array.isArray(dataValue[nestedKey])) nestedCounts[nestedKey] = dataValue[nestedKey].length;
      }
      if (Object.keys(nestedCounts).length > 0) nestedArrayCounts[dataKey] = nestedCounts;
    }
  }
  function arrayLike(value) {
    return Array.isArray(value) || (value && typeof value.length === "number");
  }
  function numericHistogram(value) {
    if (!arrayLike(value)) return null;
    var counts = {};
    for (var valueIndex = 0; valueIndex < value.length; valueIndex += 1) {
      var numericValue = Number(value[valueIndex]);
      var histogramKey = String(numericValue);
      counts[histogramKey] = (counts[histogramKey] || 0) + 1;
    }
    return counts;
  }
  var mapPixels = allData && allData.mapData && allData.mapData.mapData;
  var roomChains = allData && Array.isArray(allData.roomChain)
    ? allData.roomChain.map(function summarizeRoomChain(roomChain) {
      var points = roomChain && Array.isArray(roomChain.points) ? roomChain.points : [];
      return {
        roomId: roomChain && roomChain.roomId,
        pointCount: points.length,
        valueHistogram: numericHistogram(points.map(function mapPointValue(point) {
          return point && point.value;
        }))
      };
    })
    : [];
  var roomMatrix = allData && allData.roomMatrix && allData.roomMatrix.matrix;
  return {
    allDataKeys: allDataKeys,
    arrayCounts: arrayCounts,
    objectKeys: objectKeys,
    nestedArrayCounts: nestedArrayCounts,
    mapPixelCount: arrayLike(mapPixels) ? mapPixels.length : -1,
    mapPixelHistogram: numericHistogram(mapPixels),
    roomChains: roomChains,
    roomMatrixValues: arrayLike(roomMatrix) ? Array.prototype.slice.call(roomMatrix) : []
  };
}
function report(root) {
  installLogProbe();
  var fiber = root && root.current;
  var stack = fiber ? [fiber] : [];
  while (stack.length > 0) {
    var current = stack.pop();
    var instance = current && current.stateNode;
    var state = instance && instance.state;
    if (instance && Array.isArray(instance.allRooms) && Array.isArray(instance.selectRoomIDs)) {
      var selectedRoomIdSignature = "";
      for (var roomIdIndex = 0; roomIdIndex < instance.selectRoomIDs.length; roomIdIndex += 1) {
        if (roomIdIndex > 0) selectedRoomIdSignature += ",";
        selectedRoomIdSignature += String(instance.selectRoomIDs[roomIdIndex]);
      }
      var diagnostic = {
        isEmpty: state && state.isEmpty === true,
        mapLoading: state && state.mapLoading === true,
        loading: state && state.loading === true,
        showRenameCard: state && state.showRenameCard === true,
        hasMapView: instance.mapView != null,
        isRenderMap: instance.isRenderMap === true,
        allRoomsCount: instance.allRooms.length,
        selectedRoomCount: instance.selectRoomIDs.length,
        selectedRoomIdSignature: selectedRoomIdSignature,
        handleMark: typeof instance.handleMark === "number" ? instance.handleMark : null,
        mapIdPresent: instance.mapId != null
      };
      try {
        var parser = typeof hostGlobal.__r === "function" ? hostGlobal.__r(446).default : null;
        var mapInfo = parser && typeof parser.getMapInfo === "function" ? parser.getMapInfo() : null;
        var allData = parser && typeof parser.getAllData === "function" ? parser.getAllData() : null;
        var globalMapId = parser && typeof parser.getMapId === "function" ? parser.getMapId() : null;
        var rooms = parser && typeof parser.getMapRooms === "function" ? parser.getMapRooms() : null;
        var deviceState = typeof hostGlobal.__r === "function" ? hostGlobal.__r(524) : null;
        var mapModel = typeof hostGlobal.__r === "function" ? hostGlobal.__r(525).default : null;
        diagnostic.mapInfoPresent = mapInfo != null;
        diagnostic.mapHeadIdPresent = mapInfo != null && mapInfo.mapHeadId != null;
        diagnostic.globalMapIdPresent = globalMapId != null;
        diagnostic.routeMapIdMatchesGlobal = instance.mapId === globalMapId;
        diagnostic.stateCurrentMapIdPresent = deviceState != null && deviceState.deviceCurrentMapId != null;
        diagnostic.stateCurrentMapIdMatchesGlobal = deviceState != null
          && deviceState.deviceCurrentMapId === globalMapId;
        diagnostic.mapModelMapIdIsDefault = mapModel != null && mapModel.mapId === -1;
        diagnostic.mapModelMapIdMatchesGlobal = mapModel != null && mapModel.mapId === globalMapId;
        diagnostic.routeMapIdMatchesMapModel = mapModel != null && instance.mapId === mapModel.mapId;
        diagnostic.mapTypeIsRealtime = allData == null || allData.mapType == null || allData.mapType === 0;
        diagnostic.globalRoomCount = Array.isArray(rooms) ? rooms.length : -1;
        diagnostic.sceneInventory = collectSceneInventory(allData);
      } catch (_error) {
        diagnostic.moduleProbeError = true;
      }
      var signature = JSON.stringify(diagnostic);
      if (signature !== lastSignature) {
        lastSignature = signature;
        hostGlobal.nativeModuleProxy.RRAppSysTurboModule.info("apk-react-state-probe", signature);
      }
    }
    if (current && current.sibling) stack.push(current.sibling);
    if (current && current.child) stack.push(current.child);
  }
}
hostGlobal.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
  supportsFiber: true,
  renderers: new Map(),
  inject: function inject(renderer) {
    rendererId += 1;
    this.renderers.set(rendererId, renderer);
    return rendererId;
  },
  onCommitFiberRoot: function onCommitFiberRoot(_id, root) { report(root); },
  onCommitFiberUnmount: function onCommitFiberUnmount() {}
};
var sceneProbeAttempt = 0;
var sceneInventoryReported = false;
function pollSceneInventory() {
  if (sceneInventoryReported) return;
  installLogProbe();
  try {
    var parser = typeof hostGlobal.__r === "function" ? hostGlobal.__r(446).default : null;
    var allData = parser && typeof parser.getAllData === "function" ? parser.getAllData() : null;
    if (allData != null) {
      sceneInventoryReported = true;
      hostGlobal.nativeModuleProxy.RRAppSysTurboModule.info(
        "apk-map-scene-probe",
        JSON.stringify(collectSceneInventory(allData))
      );
      return;
    }
  } catch (_error) {}
  sceneProbeAttempt += 1;
  if (sceneProbeAttempt < 40 && typeof hostGlobal.setTimeout === "function") {
    hostGlobal.setTimeout(pollSceneInventory, 50);
  }
}
if (typeof hostGlobal.setTimeout === "function") {
  hostGlobal.setTimeout(pollSceneInventory, 0);
}
var sceneUiManager = hostGlobal.nativeModuleProxy.UIManager;
if (sceneUiManager && typeof sceneUiManager.createView === "function") {
  var originalCreateView = sceneUiManager.createView;
  sceneUiManager.createView = function sceneProbeCreateView() {
    var result = originalCreateView.apply(this, arguments);
    pollSceneInventory();
    return result;
  };
}
})(globalThis);
`;
}

function collectAppPluginRawText(root: ApkUiManagerNodeSnapshot): string[] {
	const result: string[] = [];
	const visit = (node: ApkUiManagerNodeSnapshot): void => {
		if (node.viewName === "RCTRawText" && typeof node.props.text === "string" && node.props.text.length > 0) {
			result.push(node.props.text);
		}
		for (const child of node.children) visit(child);
	};
	visit(root);
	return result;
}

function collectVisibleTextLayouts(
	root: ApkUiManagerNodeSnapshot,
	measure: (tag: number) => Readonly<{ x: number; y: number; width: number; height: number }> | undefined,
): Array<Readonly<Record<string, unknown>>> {
	const result: Array<Readonly<Record<string, unknown>>> = [];
	const visit = (node: ApkUiManagerNodeSnapshot): void => {
		if (node.viewName === "RCTText") {
			const text = collectAppPluginRawText(node).join("");
			const box = measure(node.tag);
			if (text && box && box.x < 360 && box.y < 800 && box.x + box.width > 0 && box.y + box.height > 0) {
				result.push({ tag: node.tag, text, box });
			}
		}
		for (const child of node.children) visit(child);
	};
	visit(root);
	return result.slice(-30);
}

function resolveVisibleTextCenter(
	root: ApkUiManagerNodeSnapshot,
	measure: (tag: number) => Readonly<{ x: number; y: number; width: number; height: number }> | undefined,
	text: string,
	occurrence: number,
): Readonly<{ x: number; y: number; tag: number; text: string }> {
	const uniqueLayouts = new Map<string, Readonly<{ x: number; y: number; tag: number; text: string }>>();
	const visit = (node: ApkUiManagerNodeSnapshot): void => {
		if (node.viewName === "RCTText" && collectAppPluginRawText(node).join("") === text) {
			const box = measure(node.tag);
			if (box && box.width > 0 && box.height > 0) {
				const key = [box.x, box.y, box.width, box.height].map(value => value.toFixed(6)).join(":");
				if (!uniqueLayouts.has(key)) {
					uniqueLayouts.set(key, {
						x: box.x + box.width / 2,
						y: box.y + box.height / 2,
						tag: node.tag,
						text,
					});
				}
			}
		}
		for (const child of node.children) visit(child);
	};
	visit(root);
	const matches = [...uniqueLayouts.values()].sort((left, right) =>
		left.y - right.y || left.x - right.x || left.tag - right.tag);
	const match = matches[occurrence];
	if (!match) {
		throw new Error(
			`Sichtbarer AppPlugin-Text ${JSON.stringify(text)} Vorkommen ${occurrence} fehlt; `
			+ `gefunden=${matches.length}`,
		);
	}
	return match;
}

interface PointerHttpRequest {
	kind: "down" | "move" | "up" | "cancel";
	pointerId?: number;
	x?: number;
	y?: number;
	timeMs?: number;
}

interface PointerSequenceHttpRequest {
	pointers: readonly PointerHttpRequest[];
}

interface WheelHttpRequest {
	x: number;
	y: number;
	deltaX: number;
	deltaY: number;
	timeMs: number;
}

interface ThemeHttpRequest {
	mode: "dark" | "light" | "system";
	systemColorScheme: "dark" | "light";
}

interface LanguageHttpRequest {
	language: string;
}

interface TextInputHttpRequest {
	tag?: number;
	text: string;
}

interface SemanticActionHttpRequest {
	id: ApkSemanticUiActionId;
}

const MAX_RUNTIME_DIAGNOSTIC_ENTRIES = 2_000;
const MAX_PUBLISHED_DPS_ENTRIES = 10_000;
const HTTP_REQUEST_BODY_TIMEOUT_MS = 5_000;

class AppPluginRuntimeUnavailableError extends Error {
	public readonly statusCode = 503;

	public constructor(message: string) {
		super(message);
		this.name = "AppPluginRuntimeUnavailableError";
	}
}

function appendBounded<T>(entries: T[], entry: T, maximum = MAX_RUNTIME_DIAGNOSTIC_ENTRIES): void {
	entries.push(entry);
	if (entries.length > maximum) entries.splice(0, entries.length - maximum);
}

function sendJson(response: ServerResponse, statusCode: number, payload: unknown): void {
	response.statusCode = statusCode;
	response.setHeader("Content-Type", "application/json; charset=utf-8");
	response.end(JSON.stringify(payload));
}

function serveAppPluginDesktopStaticRequest(
	staticRootPath: string,
	url: URL,
	response: ServerResponse,
	sessionToken: string,
): boolean {
	if (url.pathname === "/" || url.pathname === "/appplugin-lab.html") {
		const parameters = new URLSearchParams(url.search);
		parameters.delete("runtimePort");
		const search = parameters.size > 0 ? `?${parameters.toString()}` : "";
		response.statusCode = 302;
		response.setHeader("Location", `/appplugin-desktop.html${search}`);
		response.end();
		return true;
	}
	const asset = resolveAppPluginDesktopStaticAsset(staticRootPath, url.pathname);
	if (!asset) return false;
	void fs.promises.readFile(asset.filePath)
		.then(content => {
			const responseContent = asset.contentType.startsWith("text/html")
				? Buffer.from(
					injectAppPluginSessionToken(content.toString("utf8"), sessionToken),
					"utf8",
				)
				: content;
			response.statusCode = 200;
			response.setHeader("Content-Type", asset.contentType);
			response.end(responseContent);
		})
		.catch(error => {
			if ((error as NodeJS.ErrnoException).code === "ENOENT") {
				sendJson(response, 503, { error: `Desktop-Datei fehlt: ${path.basename(asset.filePath)}` });
				return;
			}
			response.destroy(error instanceof Error ? error : new Error(String(error)));
		});
	return true;
}

async function readJsonRequest(request: IncomingMessage): Promise<Readonly<Record<string, unknown>>> {
	const contentType = request.headers["content-type"]?.split(";", 1)[0]?.trim().toLowerCase();
	if (contentType !== "application/json") {
		throw new Error("Runtime-Anfragen müssen Content-Type application/json verwenden");
	}
	const declaredLength = Number(request.headers["content-length"] ?? "0");
	if (Number.isFinite(declaredLength) && declaredLength > 64 * 1024) {
		throw new Error("Runtime-Anfrage ist größer als 64 KiB");
	}
	const chunks: Buffer[] = [];
	let byteLength = 0;
	const timeout = setTimeout(() => {
		request.destroy(new Error(`Runtime-Anfrage überschritt ${HTTP_REQUEST_BODY_TIMEOUT_MS} ms`));
	}, HTTP_REQUEST_BODY_TIMEOUT_MS);
	timeout.unref();
	try {
		for await (const chunk of request) {
			const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
			byteLength += buffer.byteLength;
			if (byteLength > 64 * 1024) throw new Error("Runtime-Anfrage ist größer als 64 KiB");
			chunks.push(buffer);
		}
	} finally {
		clearTimeout(timeout);
	}
	const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw new Error("Pointer-Anfrage muss ein JSON-Objekt sein");
	}
	return parsed as Readonly<Record<string, unknown>>;
}

function parsePointerHttpRequest(record: Readonly<Record<string, unknown>>): PointerHttpRequest {
	const kind = record.kind;
	if (kind !== "down" && kind !== "move" && kind !== "up" && kind !== "cancel") {
		throw new Error("Pointer-Art muss down, move, up oder cancel sein");
	}
	if (kind === "cancel") {
		return { kind, timeMs: typeof record.timeMs === "number" ? record.timeMs : Date.now() };
	}
	const pointerId = record.pointerId;
	const x = record.x;
	const y = record.y;
	if (!Number.isInteger(pointerId) || typeof x !== "number" || !Number.isFinite(x)
		|| typeof y !== "number" || !Number.isFinite(y)) {
		throw new Error("Pointer-Anfrage benötigt ganzzahlige pointerId sowie endliche x/y-Koordinaten");
	}
	return {
		kind,
		pointerId: pointerId as number,
		x,
		y,
		timeMs: typeof record.timeMs === "number" && Number.isFinite(record.timeMs) ? record.timeMs : Date.now(),
	};
}
function parsePointerSequenceHttpRequest(record: Readonly<Record<string, unknown>>): PointerSequenceHttpRequest {
	if (!Array.isArray(record.pointers) || record.pointers.length === 0 || record.pointers.length > 64) {
		throw new Error("Pointer-Sequenz benötigt 1 bis 64 Ereignisse");
	}
	return {
		pointers: record.pointers.map((pointer, index) => {
			if (!pointer || typeof pointer !== "object" || Array.isArray(pointer)) {
				throw new Error(`Pointer-Sequenz enthält an Position ${index} kein JSON-Objekt`);
			}
			return parsePointerHttpRequest(pointer as Readonly<Record<string, unknown>>);
		}),
	};
}

function parseWheelHttpRequest(record: Readonly<Record<string, unknown>>): WheelHttpRequest {
	const values = {
		x: record.x,
		y: record.y,
		deltaX: record.deltaX,
		deltaY: record.deltaY,
	};
	for (const [name, value] of Object.entries(values)) {
		if (typeof value !== "number" || !Number.isFinite(value)) {
			throw new Error(`Scrollrad-Anfrage benötigt eine endliche Zahl für ${name}`);
		}
	}
	return {
		x: values.x as number,
		y: values.y as number,
		deltaX: values.deltaX as number,
		deltaY: values.deltaY as number,
		timeMs: typeof record.timeMs === "number" && Number.isFinite(record.timeMs)
			? record.timeMs
			: Date.now(),
	};
}

function parseThemeHttpRequest(record: Readonly<Record<string, unknown>>): ThemeHttpRequest {
	const mode = record.mode;
	if (mode !== "dark" && mode !== "light" && mode !== "system") {
		throw new Error("Theme-Modus muss dark, light oder system sein");
	}
	const systemColorScheme = record.systemColorScheme;
	if (systemColorScheme !== "dark" && systemColorScheme !== "light") {
		throw new Error("System-Farbschema muss dark oder light sein");
	}
	return { mode, systemColorScheme };
}
function parseLanguageHttpRequest(record: Readonly<Record<string, unknown>>): LanguageHttpRequest {
	if (typeof record.language !== "string" || record.language.length === 0) {
		throw new Error("Sprachwechsel benötigt einen Android-Sprachcode");
	}
	return { language: record.language };
}
function parseTextInputHttpRequest(record: Readonly<Record<string, unknown>>): TextInputHttpRequest {
	if (typeof record.text !== "string") throw new Error("TextInput-Anfrage benötigt Text");
	if (record.tag !== undefined && (!Number.isSafeInteger(record.tag) || Number(record.tag) < 1)) {
		throw new Error("TextInput-Anfrage enthält keinen gültigen React-Tag");
	}
	return record.tag === undefined
		? { text: record.text }
		: { text: record.text, tag: Number(record.tag) };
}
function parseSemanticActionHttpRequest(record: Readonly<Record<string, unknown>>): SemanticActionHttpRequest {
	const id = record.id;
	if (typeof id !== "string" || !APK_SEMANTIC_UI_ACTION_IDS.some(candidate => candidate === id)) {
		throw new Error("Unbekannte semantische AppPlugin-Aktion");
	}
	return { id: id as ApkSemanticUiActionId };
}
async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const contract = contractJson as ApkAppPluginHostContract;
	const resolvedDeviceSession = options.sessionDescriptor
		? resolveApkAppPluginSession(options.sessionDescriptor, contract)
		: undefined;
	const bundleSha256 = resolvedDeviceSession?.bundle.sha256
		?? createHash("sha256").update(fs.readFileSync(options.bundlePath)).digest("hex");
	const sessionId = randomUUID();
	const pointerReplay: ApkPointerReplayManifest | undefined = options.pointerReplayManifestPath
		? loadApkPointerReplayManifest(options.pointerReplayManifestPath)
		: undefined;
	const interactionReplay: ApkInteractionReplayManifest | undefined = options.interactionReplayManifestPath
		? loadApkInteractionReplayManifest(options.interactionReplayManifestPath)
		: undefined;
	if (interactionReplay) {
		const runtimeViewport = {
			width: Math.round(options.width / options.scale),
			height: Math.round(options.height / options.scale),
		};
		if (interactionReplay.viewport.width !== runtimeViewport.width
			|| interactionReplay.viewport.height !== runtimeViewport.height) {
			throw new Error(
				`Interaktions-Replay benötigt ${interactionReplay.viewport.width}x${interactionReplay.viewport.height}, `
				+ `Runtime besitzt ${runtimeViewport.width}x${runtimeViewport.height}`,
			);
		}
	}
	const deviceReplay: ApkDeviceReplayManifest = options.replayManifestPath
		? loadApkDeviceReplayManifest(options.replayManifestPath)
		: {
			version: 1,
			manifestPath: "<legacy-cli>",
			shadowDps: {},
			publishResponses: [],
			events: options.b01FramePath
				? [{ kind: "b01-frame", framePath: options.b01FramePath, waitAfterMs: 500 }]
				: [],
		};
	const firmwareVersion = options.runApplication
		? resolveApkDeviceReplayFirmwareVersion(deviceReplay, options.firmwareVersion)
		: options.firmwareVersion ?? "0.0.0";
	const replayNeedsB01Key = [
		...deviceReplay.events,
		...deviceReplay.publishResponses.flatMap(response => response.events),
	].some(event => event.kind === "b01-frame");
	if (replayNeedsB01Key && !options.b01LocalKey) {
		throw new Error("Replay mit B01-Frames benötigt --b01-local-key");
	}
	if (!replayNeedsB01Key && options.b01LocalKey) {
		throw new Error("--b01-local-key wurde ohne B01-Frame angegeben");
	}
	const shadowDpsJson = JSON.stringify(deviceReplay.shadowDps);
	const metrics = {
		width: options.width,
		height: options.height,
		scale: options.scale,
		fontScale: options.fontScale,
		densityDpi: options.densityDpi,
	};
	const bundleDirectory = path.dirname(options.bundlePath);
	const skiaHost = await createCanvasKitSkiaHost({
		bundleRoot: bundleDirectory,
		width: Math.round(options.width / options.scale),
		height: Math.round(options.height / options.scale),
	});
	const skiaRuntime = new ApkSkiaHostRuntime(skiaHost.api, skiaHost.viewApi);
	let skiaHostDisposed = false;
	const disposeSkiaHost = (): void => {
		if (skiaHostDisposed) return;
		skiaHostDisposed = true;
		skiaHost.dispose();
	};
	const basePathUrl = pathToFileURL(path.join(bundleDirectory, "Resources")).href.replace(/\/$/u, "") + "/";
	const storageBasePath = path.join(
		path.dirname(options.bootstrapPath),
		"device-data",
		options.deviceModel.replace(/[^A-Za-z0-9._-]/gu, "_"),
	);
	fs.mkdirSync(storageBasePath, { recursive: true });
	const sourceCodeUrl = pathToFileURL(options.bundlePath).href;
	const appStateEvents: Array<{ eventName: string; payload: unknown }> = [];
	const appState = new ApkAppStateRuntime({
		initialState: "active",
		emitDeviceEvent: (eventName, payload) => appendBounded(appStateEvents, { eventName, payload }),
	});
	const darkModeEvents: Array<{ eventName: string; payload: unknown }> = [];
	const appliedActivityStyles: boolean[] = [];
	const requestedColorModels: string[] = [];
	const persistSessionState = (
		patch: Parameters<typeof updateAppPluginDesktopSessionState>[1],
	): void => {
		if (options.sessionStatePath) updateAppPluginDesktopSessionState(options.sessionStatePath, patch);
	};
	const darkMode = new ApkDarkModeRuntime({
		storedColorModel: options.colorModel,
		systemColorScheme: options.systemColorScheme,
		initialCardStyle: options.cardStyle,
		emitDeviceEvent: (eventName, payload) => appendBounded(darkModeEvents, { eventName, payload }),
		applyActivityStyle: isDark => appendBounded(appliedActivityStyles, isDark),
		requestColorModel: mode => appendBounded(requestedColorModels, mode),
		onStateChange: state => persistSessionState({
			colorModel: state.colorModel,
			systemColorScheme: state.systemColorScheme,
			cardStyle: state.cardStyle,
		}),
	});
	const netInfo = new ApkNetInfoRuntime({
		type: "wifi",
		isInternetReachable: true,
		isWifiEnabled: true,
		details: {
			isConnectionExpensive: false,
			ssid: "AppPlugin-Hermes-Probe",
		},
	});
	const workerDiagnostics: ApkV8WorkerDiagnostic[] = [];
	const workerRuntime = new ApkV8WorkerRuntime({
		pluginRootPath: bundleDirectory,
		onDiagnostic: diagnostic => appendBounded(workerDiagnostics, diagnostic),
	});
	const agreementAndPolicy = {
		privacyProtocol: { version: "1", langUrl: "https://probe.invalid/privacy" },
		userAgreement: { version: "1", langUrl: "https://probe.invalid/agreement" },
	};
	const signedPluginAgreements = [
		{ type: "USER_AGREEMENT", version: 1 },
		{ type: "PRIVACY_POLICY", version: 1 },
	];
	const publishedDps: Array<Readonly<Record<string, unknown>>> = [];
	let publishedDpsRetainedFrom = 0;
	let publishedDpsCount = 0;
	let pageCloseRequestCount = 0;
	const publishReplayResponseErrors: string[] = [];
	let handlePublishedDps: ((dps: Readonly<Record<string, unknown>>, publishedIndex: number) => void) | undefined;
	const pluginDevice = new ApkPluginDeviceRuntime({
		hasActivity: () => true,
		transport: {
			loadShadowDps: async () => shadowDpsJson,
			publishDps: async dps => {
				const publishedIndex = publishedDpsCount;
				publishedDpsCount += 1;
				publishedDps.push(dps);
				if (publishedDps.length > MAX_PUBLISHED_DPS_ENTRIES) {
					const removed = publishedDps.length - MAX_PUBLISHED_DPS_ENTRIES;
					publishedDps.splice(0, removed);
					publishedDpsRetainedFrom += removed;
				}
				handlePublishedDps?.(dps, publishedIndex);
			},
		},
	});
	const pluginSdkEnvironment = new ApkPluginSdkEnvironmentRuntime({
		hasActivity: () => true,
		closeCurrentPage: () => {
			pageCloseRequestCount += 1;
		},
		firmwareVersion,
		storageBasePath,
		loadOtaInfo: async () => null,
		loadOtaProgress: async () => null,
		loadDeviceExtraInfo: async () => ({}),
		loadAgreementAndPolicy: async () => agreementAndPolicy,
		loadPluginAgreements: async () => signedPluginAgreements,
		workerRuntime,
	});
	let sessionForTimers: ApkHermesHostSession | undefined;
	let onTimerJsCompleted: (() => Promise<void>) | undefined;
	const timingErrors: string[] = [];
	const timing = new ApkTimingRuntime({
		emitTimers: timerIds => {
			if (!sessionForTimers) throw new Error("Hermes-Session für JSTimers fehlt");
			return sessionForTimers.callJsFunction("JSTimers", "callTimers", [timerIds])
				.then(() => onTimerJsCompleted?.());
		},
		onError: error => appendBounded(timingErrors, error.message),
	});
	let sessionForLocalization: ApkHermesHostSession | undefined;
	const localizationEvents: Array<{ eventName: "langDidChange"; payload: string }> = [];
	const localization = new ApkLocalizationRuntime({
		language: options.language,
		localeIdentifier: options.localeIdentifier,
		systemLocaleIdentifier: options.systemLocaleIdentifier,
		emitDeviceEvent: async (eventName, payload) => {
			if (!sessionForLocalization) throw new Error("Hermes-Session für ReactLocalization fehlt");
			appendBounded(localizationEvents, { eventName, payload });
			await sessionForLocalization.emitDeviceEvent(eventName, payload);
		},
		onStateChange: state => persistSessionState({
			language: state.language,
			localeIdentifier: state.localeIdentifier,
		}),
	});
	const initialLocalization = localization.snapshot();
	const initialIsRTL = resolveAppPluginIsRtl({
		language: options.language,
		systemLocaleIdentifier: options.systemLocaleIdentifier,
		allowRTL: options.allowRTL,
		forceRTL: options.forceRTL,
	});
	const pluginSdkContext = options.sessionDescriptor
		? apkPluginSdkContextFromSession(options.sessionDescriptor, basePathUrl, storageBasePath)
		: {
			userId: "",
			basePath: basePathUrl,
			deviceExtra: {},
			deviceId: options.duid,
			deviceSN: options.deviceSn,
			ownerId: "",
			deviceModel: options.deviceModel,
			mobileModel: options.mobileModel,
			androidRelease: options.androidRelease,
			deviceName: options.deviceName,
			storageBasePath,
			activeTime: options.activeTime,
			robotTimeZone: 0,
			iotType: 2 as const,
			memoryMiB: 4096,
			iotOriginDevId: "appplugin-runtime-probe-origin",
			clientId: "appplugin-hermes-runtime-probe",
		};
	const constants = mergeApkNativeModuleConstants(
		createApkDeviceInfoConstants(metrics, metrics),
		createApkLocalizationConstants({
			language: initialLocalization.language,
			localeIdentifier: initialLocalization.localeIdentifier,
			isRTL: initialIsRTL,
			doLeftAndRightSwapInRTL: options.doLeftAndRightSwapInRTL,
		}),
		createApkGestureHandlerConstants(),
		createApkSourceCodeConstants(sourceCodeUrl),
		{ AppState: appState.constants() },
		{ RRPluginDarkMode: darkMode.constants() },
		createApkUiManagerConstants(contract),
		createApkPluginSdkConstants(contract, pluginSdkContext),
	);
	fs.mkdirSync(path.dirname(options.bootstrapPath), { recursive: true });
	const bridgeBootstrap = createApkBridgeBootstrap(contract, constants)
		+ (options.reactStateProbe ? createReactStateProbeBootstrap() : "");
	fs.writeFileSync(options.bootstrapPath, bridgeBootstrap, "utf8");

	const registry = new StrictApkNativeModuleRegistry(contract);
	const asyncStorage = new ApkAsyncStorageRuntime(path.join(
		path.dirname(options.bootstrapPath),
		"app-data",
		"RKStorage.json",
	));
	registry.register(
		installedModule(contract, "RNCAsyncStorage").javaClass,
		asyncStorage as unknown as Record<string, unknown>,
	);
	const rootTag = 1;
	const uiManager = new ApkUiManagerRuntime(contract, rootTag);
	let revision = 0;
	let frameRevision = 0;
	let requestNativeAnimatedUiPump: (() => void) | undefined;
	const nativeAnimated = new ApkNativeAnimatedRuntime({
		updateView: (tag, props) => uiManager.synchronouslyUpdateViewOnUiThread(tag, props),
		restoreDefaultViewProps: (tag, propNames) => uiManager.restoreDefaultViewProps(tag, propNames),
		onViewUpdate: () => {
			revision += 1;
			frameRevision += 1;
			requestNativeAnimatedUiPump?.();
		},
	});
	registry.register(
		installedModule(contract, "NativeAnimatedModule").javaClass,
		nativeAnimated as unknown as Record<string, unknown>,
	);
	const i18nManager = new ApkI18nManagerRuntime({
		allowRTL: options.allowRTL,
		forceRTL: options.forceRTL,
		doLeftAndRightSwapInRTL: options.doLeftAndRightSwapInRTL,
	}, preferences => persistSessionState(preferences));
	registry.register(installedModule(contract, "I18nManager").javaClass, {
		allowRTL: i18nManager.allowRTL,
		forceRTL: i18nManager.forceRTL,
		swapLeftAndRightInRTL: i18nManager.swapLeftAndRightInRTL,
	});
	const appSysLogs: unknown[] = [];
	const appSys = new ApkAppSysRuntime({
		networkReachable: () => true,
		writeLog: entry => appendBounded(appSysLogs, entry),
	});
	registry.register(
		installedModule(contract, "RRAppSysTurboModule").javaClass,
		appSys as unknown as Record<string, unknown>,
	);
	const requestedColorSchemeModes: number[] = [];
	const appearanceEvents: Array<{ eventName: string; payload: unknown }> = [];
	const appearance = new ApkAppearanceRuntime({
		initialColorScheme: darkMode.getColorScheme(),
		requestColorScheme: mode => appendBounded(requestedColorSchemeModes, mode),
		emitDeviceEvent: (eventName, payload) => appendBounded(appearanceEvents, { eventName, payload }),
	});
	registry.register(installedModule(contract, "Appearance").javaClass, {
		addListener: appearance.addListener,
		removeListeners: appearance.removeListeners,
		getColorScheme: appearance.getColorScheme,
		setColorScheme: appearance.setColorScheme,
	});
	registry.register(installedModule(contract, "RNSkiaModule").javaClass, {
		install: () => true,
	});
	const gestureHandler = new ApkGestureHandlerRuntime();
	registry.register(
		installedModule(contract, "RNGestureHandlerModule").javaClass,
		gestureHandler as unknown as Record<string, unknown>,
	);
	registry.register(
		installedModule(contract, "UIManager").javaClass,
		uiManager as unknown as Record<string, unknown>,
	);
	registry.register(
		installedModule(contract, "RRPluginSDK").javaClass,
		pluginSdkEnvironment as unknown as Record<string, unknown>,
	);
	registry.register(
		installedModule(contract, "RRPluginDarkMode").javaClass,
		darkMode as unknown as Record<string, unknown>,
	);
	registry.register(
		installedModule(contract, "RNCNetInfo").javaClass,
		netInfo as unknown as Record<string, unknown>,
	);
	registry.register(
		installedModule(contract, "RRPluginDevice").javaClass,
		pluginDevice as unknown as Record<string, unknown>,
	);
	const deviceFirmware = new ApkDeviceFirmwareRuntime();
	registry.register(
		installedModule(contract, "RRPluginDeviceFirmware").javaClass,
		deviceFirmware as unknown as Record<string, unknown>,
	);
	const soundManager = new ApkSoundManagerRuntime();
	registry.register(
		installedModule(contract, "SoundManager").javaClass,
		soundManager as unknown as Record<string, unknown>,
	);
	const statusBar = new ApkStatusBarRuntime();
	registry.register(
		installedModule(contract, "StatusBarManager").javaClass,
		statusBar as unknown as Record<string, unknown>,
	);
	registry.register(
		installedModule(contract, "AppState").javaClass,
		appState as unknown as Record<string, unknown>,
	);
	registry.register(
		installedModule(contract, "Timing").javaClass,
		timing as unknown as Record<string, unknown>,
	);
	registry.register(installedModule(contract, "ReactLocalization").javaClass, {
		getLanguage: (callback: (...arguments_: unknown[]) => void) => localization.getLanguage(callback),
		setLanguage: async (nextLanguage: string) => {
			const previousLanguage = localization.snapshot().language;
			const result = await localization.setLanguage(nextLanguage);
			if (previousLanguage !== nextLanguage) revision += 1;
			return result;
		},
	});
	const reportedExceptions: Array<{ method: string; arguments: unknown[] }> = [];
	registry.register(installedModule(contract, "ExceptionsManager").javaClass, {
		dismissRedbox: () => undefined,
		reportException: (...arguments_: unknown[]) =>
			appendBounded(reportedExceptions, { method: "reportException", arguments: arguments_ }),
		reportFatalException: (...arguments_: unknown[]) =>
			appendBounded(reportedExceptions, { method: "reportFatalException", arguments: arguments_ }),
		reportSoftException: (...arguments_: unknown[]) =>
			appendBounded(reportedExceptions, { method: "reportSoftException", arguments: arguments_ }),
		updateExceptionMessage: (...arguments_: unknown[]) =>
			appendBounded(reportedExceptions, { method: "updateExceptionMessage", arguments: arguments_ }),
	});

	const definitions = createApkRemoteModuleDefinitions(contract, constants);
	const nativeInvocations: Array<{ moduleName: string; methodName: string; argumentCount: number; arguments: readonly unknown[] }> = [];
	const nativeInvocationRejections: Array<Readonly<Record<string, unknown>>> = [];
	const session = new ApkHermesHostSession({
		hostExecutablePath: options.hostExecutablePath,
		bundlePath: options.bundlePath,
		bootstrapPath: options.bootstrapPath,
		definitions,
		skiaRuntime,
		onInvocationRejection: rejection => appendBounded(nativeInvocationRejections, rejection),
		dispatcher: new ApkNativeModuleDispatcher(
			contract,
			registry,
			(moduleName, methodName, arguments_) => appendBounded(nativeInvocations, {
				moduleName,
				methodName,
				argumentCount: arguments_.length,
				arguments: [...arguments_],
			}),
		),
	});
	sessionForTimers = session;
	sessionForLocalization = session;
	let interactiveLayoutBoundary = false;
	const uiExecution = new ApkUiExecutionRuntime({
		uiManager,
		jsModuleCaller: session,
		textLayoutBackend: createApkCanvasKitTextLayoutBackend(skiaHost.api),
		width: options.width / options.scale,
		height: options.height / options.scale,
		density: options.scale,
		fontScale: options.fontScale,
		direction: initialIsRTL ? "rtl" : "ltr",
		doLeftAndRightSwapInRTL: options.doLeftAndRightSwapInRTL,
		afterLayoutEvents: async () => {
			if (interactiveLayoutBoundary) {
				await session.flushRuntimeBoundary();
				return;
			}
			await session.waitForRuntimeBoundaryIdle();
		},
	});
	const pointerInput = new ApkPointerInputBridge(
		uiExecution.hitTestRuntime(),
		new ApkTouchEventDispatcher(new ApkTouchEventRuntime(), session),
		uiExecution.scrollViewRuntime(),
	);
	const textInput = new ApkTextInputRuntime(uiManager, session);
	const uiExecutionSnapshots: unknown[] = [];
	const skiaVisualRevision = (): number => {
		const diagnostics = skiaHost.getDiagnostics();
		return diagnostics.pictureUpdates + diagnostics.redrawRequests;
	};
	let lastStabilizedOperationCount = uiManager.operationCount();
	let lastStabilizedVisualRevision = uiManager.visualMutationRevision();
	let lastStabilizedSkiaRevision = skiaVisualRevision();
	const applyUiLayout = async (): Promise<void> => {
		appendBounded(uiExecutionSnapshots, await uiExecution.stabilize());
		lastStabilizedOperationCount = uiManager.operationCount();
		lastStabilizedVisualRevision = uiManager.visualMutationRevision();
		lastStabilizedSkiaRevision = skiaVisualRevision();
	};
	const stabilizeUi = async (): Promise<void> => {
		await session.waitForRuntimeBoundaryIdle();
		await applyUiLayout();
	};
	const applyCompletedNativeUiTurn = async (): Promise<void> => {
		// Android führt den nativen Layout-Turn direkt nach einem bereits
		// abgeschlossenen JS-/NativeAnimated-Turn aus. Vor diesem Layout erneut
		// auf globale Hermes-Ruhe zu warten kann eine Bridge-Arbeit blockieren,
		// deren Callback erst durch genau diesen Layout-Turn aufgelöst wird.
		// Layout-Ereignisse erhalten innerhalb des Turns weiterhin jeweils eine
		// einzelne Hermes-Barriere, warten aber nicht auf zukünftige Timer.
		interactiveLayoutBoundary = true;
		try {
			await applyUiLayout();
		} finally {
			interactiveLayoutBoundary = false;
		}
	};
	const stabilizeInteractiveUi = async (): Promise<void> => {
		// Pointer-Eingaben dürfen zukünftige AppPlugin-Timer nicht künstlich abwarten.
		// Android liefert den Touch in einem nativen UI-Turn aus und wartet nicht,
		// bis eine davon unabhängige Animation die gesamte Bridge ruhig werden lässt.
		await session.flushRuntimeBoundary();
		if (
			uiManager.operationCount() === lastStabilizedOperationCount
			&& uiManager.pendingNativeMeasurementCount() === 0
		) {
			return;
		}
		await applyCompletedNativeUiTurn();
	};
	let imminentTimerCycles = 0;
	const settleImminentOneShotTimers = async (
		maximumDelayMs = 1_000,
		maximumCycles = 12,
	): Promise<number> => {
		let cycles = 0;
		while (cycles < maximumCycles) {
			const delayMs = timing.nextOneShotDelayMs(maximumDelayMs);
			if (delayMs === undefined) return cycles;
			await new Promise(resolve => setTimeout(resolve, delayMs + 25));
			await session.waitForRuntimeBoundaryIdle();
			cycles += 1;
		}
		if (timing.nextOneShotDelayMs(maximumDelayMs) !== undefined) {
			throw new Error(
				`APK-Runtime wurde nach ${maximumCycles} unmittelbar fälligen One-Shot-Timern nicht ruhig`,
			);
		}
		return cycles;
	};
	const settleActiveNativeAnimations = async (timeoutMs = 2_000): Promise<void> => {
		const deadline = Date.now() + timeoutMs;
		while (nativeAnimated.activeAnimationCount() > 0) {
			if (Date.now() >= deadline) {
				throw new Error(
					`APK-NativeAnimated wurde innerhalb von ${timeoutMs} ms nicht ruhig `
					+ `(${nativeAnimated.activeAnimationCount()} Animationen aktiv)`,
				);
			}
			await new Promise(resolve => setTimeout(resolve, 20));
			await session.waitForRuntimeBoundaryIdle();
		}
	};
	let operationQueue: Promise<unknown> = Promise.resolve();
	const enqueue = <T>(operation: () => Promise<T>): Promise<T> => {
		const pending = operationQueue.then(operation, operation);
		operationQueue = pending.then(() => undefined, () => undefined);
		return pending;
	};
	const waitForOperationQueueIdle = async (): Promise<void> => {
		for (;;) {
			const observedQueue = operationQueue;
			await observedQueue;
			if (operationQueue === observedQueue) return;
		}
	};
	let nativeAnimatedUiPump: Promise<void> | undefined;
	let nativeAnimatedUiPumpRequested = false;
	requestNativeAnimatedUiPump = () => {
		nativeAnimatedUiPumpRequested = true;
		if (nativeAnimatedUiPump) return;
		nativeAnimatedUiPump = enqueue(async () => {
			while (nativeAnimatedUiPumpRequested) {
				nativeAnimatedUiPumpRequested = false;
				await applyCompletedNativeUiTurn();
			}
		}).finally(() => {
			nativeAnimatedUiPump = undefined;
			if (nativeAnimatedUiPumpRequested) requestNativeAnimatedUiPump?.();
		});
		void nativeAnimatedUiPump.catch(error => {
			appendBounded(timingErrors, error instanceof Error ? error.message : String(error));
		});
	};
	let timerUiPump: Promise<void> | undefined;
	let timerUiPumpRequested = false;
	onTimerJsCompleted = () => {
		timerUiPumpRequested = true;
		if (timerUiPump) return timerUiPump;
		timerUiPump = enqueue(async () => {
			while (timerUiPumpRequested) {
				timerUiPumpRequested = false;
				const visualRevisionBeforeLayout = lastStabilizedVisualRevision;
				const skiaRevisionBeforeLayout = lastStabilizedSkiaRevision;
				const nativeWorkPending = uiManager.operationCount() !== lastStabilizedOperationCount
					|| uiManager.pendingNativeMeasurementCount() > 0;
				const visualWorkPending = uiManager.visualMutationRevision() !== visualRevisionBeforeLayout
					|| skiaVisualRevision() !== skiaRevisionBeforeLayout;
				if (!nativeWorkPending && !visualWorkPending) continue;
				await applyCompletedNativeUiTurn();
				if (
					lastStabilizedVisualRevision !== visualRevisionBeforeLayout
					|| lastStabilizedSkiaRevision !== skiaRevisionBeforeLayout
				) {
					revision += 1;
					frameRevision += 1;
				}
			}
		}).finally(() => {
			timerUiPump = undefined;
			if (timerUiPumpRequested) {
				void onTimerJsCompleted?.().catch(error => {
					appendBounded(timingErrors, error instanceof Error ? error.message : String(error));
				});
			}
		});
		return timerUiPump;
	};
	try {
		await session.start();
		let runtimeIdleRounds = 0;
		let timerRuntimeIdleRounds = 0;
		let b01Ingress: Readonly<Record<string, unknown>> | undefined;
		const replayEvents: Array<Readonly<Record<string, unknown>>> = [];
		const publishReplayEvents: Array<Readonly<Record<string, unknown>>> = [];
		const blobIngresses: Array<Readonly<Record<string, unknown>>> = [];
		const publishResponseStates = deviceReplay.publishResponses.map(response => ({
			response,
			matchCount: 0,
		}));
		const blobAssembler = new ApkBlobTransferAssembler(options.duid, "unused-for-b01");
		const emitBlobPayload = async (
			payload: Buffer,
			source: Readonly<Record<string, unknown>>,
		): Promise<Readonly<Record<string, unknown>>> => {
			if (payload.length === 0) throw new Error("Leerer Geräteblob kann nicht emittiert werden");
			const emittedEvent = "RRDeviceBlobPayloadUpdateEvent";
			await session.emitDeviceEvent(emittedEvent, {
				blob: payload.toString("base64"),
			});
			const ingress = {
				...source,
				payloadByteLength: payload.length,
				payloadSha256: createHash("sha256").update(payload).digest("hex"),
				blobType: payload[0],
				emittedEvents: [emittedEvent],
			};
			blobIngresses.push(ingress);
			return ingress;
		};
		const emitReplayEvent = async (
			event: ApkDeviceReplayEvent,
			context: Readonly<Record<string, unknown>>,
		): Promise<Readonly<Record<string, unknown>>> => {
			if (event.waitBeforeMs > 0) {
				await new Promise(resolve => setTimeout(resolve, event.waitBeforeMs));
			}
			let diagnostic: Readonly<Record<string, unknown>>;
			if (event.kind === "dps") {
				await session.emitDeviceEvent("RRDeviceDpsUpdateEvent", {
					dps: JSON.stringify(event.dps),
				});
				diagnostic = {
					kind: event.kind,
					emittedEvent: "RRDeviceDpsUpdateEvent",
					dpsKeys: Object.keys(event.dps),
				};
			} else if (event.kind === "blob") {
				const payload = fs.readFileSync(event.blobPath);
				const ingress = await emitBlobPayload(payload, {
					source: "blob-replay",
					blobPath: event.blobPath,
				});
				diagnostic = {
					kind: event.kind,
					blobPath: event.blobPath,
					payloadByteLength: ingress.payloadByteLength,
					payloadSha256: ingress.payloadSha256,
					blobType: ingress.blobType,
					emittedEvent: "RRDeviceBlobPayloadUpdateEvent",
				};
			} else {
				const frameData = fs.readFileSync(event.framePath);
				const segment = decodeApkB01MqttFrameToSegment(
					options.duid,
					frameData,
					options.b01LocalKey as string,
				);
				const assembled = blobAssembler.accept(segment);
				let emittedEvent: string | undefined;
				if (assembled?.kind === "b01-payload") {
					emittedEvent = "RRDeviceBlobPayloadUpdateEvent";
					const ingress = await emitBlobPayload(assembled.payload, {
						source: "b01-frame",
						framePath: event.framePath,
						frameByteLength: frameData.length,
						protocolVersion: segment.pv,
						nonce: segment.nonce,
						sequenceId: segment.sequenceId,
					});
					b01Ingress ??= ingress;
				}
				diagnostic = {
					kind: event.kind,
					framePath: event.framePath,
					frameByteLength: frameData.length,
					protocolVersion: segment.pv,
					nonce: segment.nonce,
					sequenceId: segment.sequenceId,
					isFirst: segment.isFirst,
					isLast: segment.isLast,
					assembledKind: assembled?.kind,
					payloadByteLength: assembled?.kind === "b01-payload" ? assembled.payload.length : undefined,
					blobType: assembled?.kind === "b01-payload" ? assembled.payload[0] : undefined,
					emittedEvent,
				};
			}
			if (event.waitAfterMs > 0) {
				await new Promise(resolve => setTimeout(resolve, event.waitAfterMs));
			}
			await session.waitForRuntimeBoundaryIdle();
			imminentTimerCycles += await settleImminentOneShotTimers();
			await stabilizeUi();
			return {
				...context,
				...diagnostic,
				waitBeforeMs: event.waitBeforeMs,
				waitAfterMs: event.waitAfterMs,
			};
		};
		if (!session.probe?.appKeys.includes("App")) {
			throw new Error(`Das unveränderte Bundle registrierte App nicht: ${JSON.stringify(session.probe)}`);
		}
		// Die APK verbindet den Gerätetransport vor RunApplication. AppPlugin-Aufrufe,
		// die bereits beim Mounten entstehen, dürfen deshalb nicht verloren gehen.
		// Insbesondere fordert Q7 seine Karte während des ersten Renderdurchlaufs an.
		handlePublishedDps = (dps, publishedIndex) => {
			for (const [responseIndex, state] of publishResponseStates.entries()) {
				if (state.matchCount >= state.response.maximumMatches) continue;
				if (!matchesApkDeviceReplayPublish(state.response, dps)) continue;
				state.matchCount += 1;
				const matchCount = state.matchCount;
				void enqueue(async () => {
					for (const [eventIndex, event] of state.response.events.entries()) {
						publishReplayEvents.push(await emitReplayEvent(event, {
							source: "publish-response",
							responseIndex,
							eventIndex,
							matchCount,
							publishedIndex,
						}));
					}
				}).catch(error => {
					publishReplayResponseErrors.push(error instanceof Error ? error.message : String(error));
				});
			}
		};
		if (options.runApplication) {
			await session.runApplication("App", {
				rootTag,
				initialProps: {
					colorMode: darkMode.getColorScheme(),
					concurrentRoot: true,
				},
			});
			runtimeIdleRounds = await session.waitForRuntimeBoundaryIdle();
			await new Promise(resolve => setTimeout(resolve, 350));
			timerRuntimeIdleRounds = await session.waitForRuntimeBoundaryIdle();
			imminentTimerCycles += await settleImminentOneShotTimers();
			await stabilizeUi();
		}
		for (const [eventIndex, event] of deviceReplay.events.entries()) {
			replayEvents.push(await emitReplayEvent(event, {
				source: "startup-replay",
				eventIndex,
			}));
		}
		// Publish-Antworten laufen wie im APK-Transport asynchron. Bevor Pointer-
		// oder Interaktionsreplays beginnen, muss die beim Mount ausgelöste
		// Antwort einschließlich ihrer AppPlugin-UI-Stabilisierung abgeschlossen sein.
		await waitForOperationQueueIdle();
		const observedInteractionRawText = new Set<string>();
		const observeInteractionRawText = (): void => {
			for (const text of collectAppPluginRawText(uiManager.snapshot())) observedInteractionRawText.add(text);
		};
		const settleReplayEvent = async (waitAfterMs: number): Promise<void> => {
			if (waitAfterMs > 0) await new Promise(resolve => setTimeout(resolve, waitAfterMs));
			observeInteractionRawText();
			// Pointer callbacks can synchronously enqueue APK transport responses or
			// timer-driven UI work. A quiet Hermes boundary alone does not prove that
			// this host-side queue has already handed the result back to the bundle.
			// Finish the complete APK/host round-trip before the next replay touch,
			// otherwise identical AppPlugins can observe different intermediate trees.
			await waitForOperationQueueIdle();
			observeInteractionRawText();
			await session.waitForRuntimeBoundaryIdle();
			observeInteractionRawText();
			imminentTimerCycles += await settleImminentOneShotTimers();
			observeInteractionRawText();
			await waitForOperationQueueIdle();
			await stabilizeUi();
			observeInteractionRawText();
			// React Native kann NativeAnimated erst während dieses ersten Layout-
			// Durchlaufs starten. Deshalb wird danach auf die unveränderte
			// AppPlugin-Animation gewartet und ihr finaler Frame erneut gelayoutet.
			await settleActiveNativeAnimations();
			observeInteractionRawText();
			await session.waitForRuntimeBoundaryIdle();
			await waitForOperationQueueIdle();
			await stabilizeUi();
			observeInteractionRawText();
			await waitForOperationQueueIdle();
		};
		const dispatchPointerReplayEvent = async (
			event: ApkPointerReplayManifest["events"][number],
			eventIndex: number,
			sink: Array<Readonly<Record<string, unknown>>>,
		): Promise<void> => {
			const dispatch = event.kind === "cancel"
				? await pointerInput.cancel(event.timeMs)
				: event.kind === "down"
					? await pointerInput.pointerDown(event.pointerId, event.x, event.y, event.timeMs)
					: event.kind === "move"
						? await pointerInput.pointerMove(event.pointerId, event.x, event.y, event.timeMs)
						: await pointerInput.pointerUp(event.pointerId, event.x, event.y, event.timeMs);
			sink.push({
				eventIndex,
				kind: event.kind,
				timeMs: event.timeMs,
				waitAfterMs: event.waitAfterMs,
				targets: dispatch.touches.map(touch => touch.target),
				changedIndices: dispatch.changedIndices,
			});
			await settleReplayEvent(event.waitAfterMs);
		};
		const pointerEvents: Array<Readonly<Record<string, unknown>>> = [];
		for (const [eventIndex, event] of (pointerReplay?.events ?? []).entries()) {
			await dispatchPointerReplayEvent(event, eventIndex, pointerEvents);
		}
		const interactionEvents: Array<Readonly<Record<string, unknown>>> = [];
		for (const [eventIndex, event] of (interactionReplay?.events ?? []).entries()) {
			if (event.kind === "tap-visible-text") {
				const target = resolveVisibleTextCenter(
					uiManager.snapshot(),
					tag => uiExecution.nativeHierarchyRuntime().measure(tag),
					event.text,
					event.occurrence,
				);
				const down = await pointerInput.pointerDown(event.pointerId, target.x, target.y, event.timeMs);
				const up = await pointerInput.pointerUp(event.pointerId, target.x, target.y, event.timeMs + 40);
				interactionEvents.push({
					eventIndex,
					kind: event.kind,
					text: event.text,
					occurrence: event.occurrence,
					timeMs: event.timeMs,
					waitAfterMs: event.waitAfterMs,
					resolvedFromOriginalUi: target,
					targets: [...down.touches, ...up.touches].map(touch => touch.target),
					changedIndices: [...down.changedIndices, ...up.changedIndices],
				});
				await settleReplayEvent(event.waitAfterMs);
				continue;
			}
			if (event.kind === "assert") {
				const rawText = collectAppPluginRawText(uiManager.snapshot());
				const missingText = event.rawTextIncludes.filter(expected => !rawText.includes(expected));
				const missingObservedText = event.rawTextObservedIncludes
					.filter(expected => !observedInteractionRawText.has(expected));
				const activeTextInputs = textInput.activeInputs();
				const activeTextInputCount = activeTextInputs.length;
				const activeTextInputTexts = activeTextInputs.map(input => input.text);
				const activeTextInputMaxLengths = activeTextInputs.flatMap(input =>
					input.maxLength === undefined ? [] : [input.maxLength]
				);
				const missingTextInputTexts = event.activeTextInputTextsInclude
					.filter(expected => !activeTextInputTexts.includes(expected));
				const missingTextInputMaxLengths = event.activeTextInputMaxLengthsInclude
					.filter(expected => !activeTextInputMaxLengths.includes(expected));
				if (missingText.length > 0
					|| missingObservedText.length > 0
					|| missingTextInputTexts.length > 0
					|| missingTextInputMaxLengths.length > 0
					|| (event.activeTextInputCount !== undefined && event.activeTextInputCount !== activeTextInputCount)) {
					const recentTrace = interactionEvents.slice(-6).map(entry => ({
						kind: entry.kind,
						targets: entry.targets,
					}));
					const visibleTextLayouts = collectVisibleTextLayouts(
						uiManager.snapshot(),
						tag => uiExecution.nativeHierarchyRuntime().measure(tag),
					);
					const assertionSnapshotPath = path.join(
						path.dirname(options.bootstrapPath),
						`interaction-assertion-${eventIndex}.png`,
					);
					await exportApkNativeUiSnapshotPng({
						shadowRoot: uiManager.snapshot(),
						nativeHierarchy: uiExecution.nativeHierarchyRuntime().snapshot(),
						rootTag,
						width: Math.round(options.width / options.scale),
						height: Math.round(options.height / options.scale),
						fontPaths: skiaHost.getDiagnostics().fontPaths,
						allowedFileRoots: [bundleDirectory, storageBasePath],
						direction: initialIsRTL ? "rtl" : "ltr",
					}, assertionSnapshotPath);
					throw new Error(
						`Interaktions-Replay event[${eventIndex}] Assertion fehlgeschlagen: `
						+ `fehlende Texte=${JSON.stringify(missingText)}, `
						+ `nicht beobachtete Texte=${JSON.stringify(missingObservedText)}, `
						+ `fehlende TextInput-Texte=${JSON.stringify(missingTextInputTexts)}, `
						+ `fehlende maxLength-Werte=${JSON.stringify(missingTextInputMaxLengths)}, `
						+ `TextInput-Texte=${JSON.stringify(activeTextInputTexts)}, `
						+ `TextInput-maxLength=${JSON.stringify(activeTextInputMaxLengths)}, `
						+ `aktive TextInputs=${activeTextInputCount}/${event.activeTextInputCount ?? "beliebig"}, `
						+ `sichtbare Texte=${JSON.stringify(rawText.slice(-20))}, `
						+ `letzte Ziele=${JSON.stringify(recentTrace)}, `
						+ `Textlayouts=${JSON.stringify(visibleTextLayouts)}, `
						+ `Snapshot=${assertionSnapshotPath}`,
					);
				}
				interactionEvents.push({
					eventIndex,
					kind: event.kind,
					waitAfterMs: event.waitAfterMs,
					rawTextIncludes: event.rawTextIncludes,
					rawTextObservedIncludes: event.rawTextObservedIncludes,
					activeTextInputCount,
					activeTextInputTexts,
					activeTextInputMaxLengths,
				});
				await settleReplayEvent(event.waitAfterMs);
				continue;
			}
			if (event.kind !== "text-input") {
				await dispatchPointerReplayEvent(event, eventIndex, interactionEvents);
				continue;
			}
			const dispatch = await textInput.replaceText(event.text, event.tag);
			interactionEvents.push({
				eventIndex,
				kind: event.kind,
				waitAfterMs: event.waitAfterMs,
				tag: dispatch.tag,
				eventCount: dispatch.eventCount,
				previousTextLength: dispatch.previousText.length,
				requestedTextLength: dispatch.requestedText.length,
				textLength: dispatch.text.length,
				maxLength: dispatch.maxLength,
				truncated: dispatch.truncated,
				replacementRange: dispatch.textInputPayload.range,
			});
			await settleReplayEvent(event.waitAfterMs);
		}
		const skiaDiagnostics = skiaHost.getDiagnostics();
		let skiaPng: unknown;
		if (skiaDiagnostics.viewIds.length > 0) {
			skiaPng = skiaHost.exportLatestPng(path.join(
				path.dirname(options.bootstrapPath),
				"q10-hermes-bundle-skia-host-raster.png",
			));
		}
		const containsViewName = (node: ApkUiManagerNodeSnapshot, viewName: string): boolean =>
			node.viewName === viewName || node.children.some(child => containsViewName(child, viewName));
		const shadowRoot = uiManager.snapshot();
		const hasNativeSvgView = containsViewName(shadowRoot, "RNSVGSvgViewAndroid");
		const nativeHierarchy = uiExecution.nativeHierarchyRuntime().snapshot();
		const nativeMeasurements = nativeHierarchy.layouts.flatMap(({ tag }) => {
			const box = uiExecution.nativeHierarchyRuntime().measure(tag);
			return box ? [{ tag, box }] : [];
		});
		const apkUiPng = options.runApplication && hasNativeSvgView
			? await exportApkNativeUiSnapshotPng({
				shadowRoot,
				nativeHierarchy,
				width: Math.round(options.width / options.scale),
				height: Math.round(options.height / options.scale),
				fontPaths: skiaDiagnostics.fontPaths,
				allowedFileRoots: [bundleDirectory, storageBasePath],
				direction: initialIsRTL ? "rtl" : "ltr",
			}, path.join(
				path.dirname(options.bootstrapPath),
				"q7-hermes-host-svg-diagnostic-ui.png",
			))
			: undefined;
		const servedSurfaceOptions = {
			fullRootTag: options.serveFullRoot ? rootTag : undefined,
			fallbackWidth: Math.round(options.width / options.scale),
			fallbackHeight: Math.round(options.height / options.scale),
		};
		const interactiveSurface = options.runApplication && (options.serveFullRoot || hasNativeSvgView)
			? selectApkServedSurfaceRoot(nativeHierarchy, servedSurfaceOptions)
			: undefined;
		const apkInteractiveSurfacePng = interactiveSurface
			? await exportApkNativeUiSnapshotPng({
				shadowRoot,
				nativeHierarchy,
				rootTag: interactiveSurface.tag,
				width: Math.round(options.width / options.scale),
				height: Math.round(options.height / options.scale),
				fontPaths: skiaDiagnostics.fontPaths,
				allowedFileRoots: [bundleDirectory, storageBasePath],
				direction: initialIsRTL ? "rtl" : "ltr",
			}, path.join(
				path.dirname(options.bootstrapPath),
				"q7-hermes-host-svg-diagnostic-map.png",
			))
			: undefined;
		const interactiveViewport = interactiveSurface
			? apkServedSurfaceViewport(interactiveSurface)
			: undefined;
		if (options.servePort !== undefined) {
			if (!interactiveSurface || !interactiveViewport) {
				throw new Error("Interaktive AppPlugin-Oberfläche oder Viewport fehlt" );
			}

			type ServedView = "map" | "full";
			const localizationHttpState = () => {
				const state = localization.snapshot();
				const i18nPreferences = i18nManager.snapshot();
				return {
					...state,
					isRTL: resolveAppPluginIsRtl({
						language: state.language,
						systemLocaleIdentifier: state.systemLocaleIdentifier,
						allowRTL: i18nPreferences.allowRTL,
						forceRTL: i18nPreferences.forceRTL,
					}),
					doLeftAndRightSwapInRTL: i18nPreferences.doLeftAndRightSwapInRTL,
					languageSwitching: true,
				};
			};
			const defaultServedView: ServedView = options.serveFullRoot ? "full" : "map";
			let requestInteractiveServerStop: (() => void) | undefined;
			let runtimeStopScheduled = false;
			const fatalRuntimeException = () => reportedExceptions.find(entry => {
				if (entry.method === "reportFatalException") return true;
				const details = entry.arguments[0];
				return details !== null
					&& typeof details === "object"
					&& (details as Readonly<Record<string, unknown>>).isFatal === true;
			});
			const assertInteractiveRuntimeHealthy = (): void => {
				const fatal = fatalRuntimeException();
				const rootMounted = uiManager.snapshot().children.length > 0;
				if (!fatal && rootMounted) return;
				if (!runtimeStopScheduled) {
					runtimeStopScheduled = true;
					setImmediate(() => requestInteractiveServerStop?.());
				}
				const reason = fatal
					? "Die unveränderte AppPlugin-Sitzung meldete eine fatale React-Native-Ausnahme"
					: "Die unveränderte AppPlugin-Sitzung hat ihre interaktive Hauptfläche ausgehängt";
				throw new AppPluginRuntimeUnavailableError(reason);
			};
			const resolveCurrentSurface = (view: ServedView = defaultServedView) => {
				assertInteractiveRuntimeHealthy();
				const currentHierarchy = uiExecution.nativeHierarchyRuntime().snapshot();
				const currentSurface = selectApkServedSurfaceRoot(currentHierarchy, {
					...servedSurfaceOptions,
					fullRootTag: view === "full" ? rootTag : undefined,
				});
				const viewport = apkServedSurfaceViewport(currentSurface);
				return { currentSurface, currentHierarchy, viewport, view };
			};
			const availableServedViews = (["map", "full"] as readonly ServedView[]).filter(view => {
				try {
					resolveCurrentSurface(view);
					return true;
				} catch {
					return false;
				}
			});
			if (!availableServedViews.includes(defaultServedView)) {
				throw new Error(`Die Standardansicht ${defaultServedView} des AppPlugins ist nicht auflösbar`);
			}
			const requestedView = (url: URL): ServedView => {
				const view = url.searchParams.get("view") ?? defaultServedView;
				if (view !== "map" && view !== "full") throw new Error(`Unbekannte AppPlugin-Ansicht: ${view}`);
				if (!availableServedViews.includes(view)) {
					throw new Error(`Das geladene AppPlugin bietet die Ansicht ${view} nicht an`);
				}
				return view;
			};
			const resolvedSemanticActions = () => resolveApkSemanticUiActions(
				uiManager.snapshot(),
				tag => uiExecution.nativeHierarchyRuntime().measure(tag),
				(x, y) => uiExecution.hitTestRuntime().findTouchTarget(x, y).target,
			);
			const semanticActionsHttpState = () => publicApkSemanticUiActions(resolvedSemanticActions());
			const currentFrame = (view: ServedView = defaultServedView) => {
				const { currentSurface, currentHierarchy, viewport } = resolveCurrentSurface(view);
				const artifact = renderApkNativeUiSnapshotToSvg({
					shadowRoot: uiManager.snapshot(),
					nativeHierarchy: currentHierarchy,
					rootTag: currentSurface.tag,
					viewport,
					width: viewport.width,
					height: viewport.height,
					fontPaths: skiaDiagnostics.fontPaths,
					allowedFileRoots: [bundleDirectory, storageBasePath],
					direction: localizationHttpState().isRTL ? "rtl" : "ltr",
				});
				return { currentSurface, viewport, artifact, view };
			};
			type ServedFrame = ReturnType<typeof currentFrame>;
			const frameCache = new Map<ServedView, { frameRevision: number; frame: ServedFrame }>();
			const cachedCurrentFrame = (view: ServedView = defaultServedView): ServedFrame => {
				const cached = frameCache.get(view);
				if (cached?.frameRevision === frameRevision) return cached.frame;
				const frame = currentFrame(view);
				frameCache.set(view, { frameRevision, frame });
				return frame;
			};
			const dispatchPointer = async (pointer: PointerHttpRequest) => pointer.kind === "cancel"
				? pointerInput.cancel(pointer.timeMs as number)
				: pointer.kind === "down"
					? pointerInput.pointerDown(pointer.pointerId as number, pointer.x as number, pointer.y as number, pointer.timeMs as number)
					: pointer.kind === "move"
						? pointerInput.pointerMove(pointer.pointerId as number, pointer.x as number, pointer.y as number, pointer.timeMs as number)
						: pointerInput.pointerUp(pointer.pointerId as number, pointer.x as number, pointer.y as number, pointer.timeMs as number);
			const dispatchInteractivePointers = async (pointers: readonly PointerHttpRequest[]) => {
				const uiVisualRevisionBefore = uiManager.visualMutationRevision();
				const nativeVisualRevisionBefore = uiExecution.nativeHierarchyRuntime().visualMutationRevision();
				const skiaRevisionBefore = skiaVisualRevision();
				const dispatches = [];
				// Android hält die Pointer-Sitzung über mehrere MotionEvents aktiv,
				// verarbeitet DOWN, POINTER_DOWN, MOVE und UP aber als getrennte
				// native Eingabeframes. Der Host muss deshalb zwischen zwei Frames
				// den JS-Turn und die dabei angeforderten nativen Messungen/Layout-
				// Operationen abschließen. Ohne diese Grenze sieht das Bundle
				// mehrere Zustandsübergänge im selben JS-Turn beziehungsweise wartet
				// auf ein Layout, das erst nach der gesamten Sequenz käme. Die
				// Pointer-Sitzung bleibt dabei aktiv; gleichzeitige MOVE-Koordinaten
				// bleiben ein gemeinsamer RCTEventEmitter-Frame.
				const flushBeforeNextTouchFrame = async (lastConsumedIndex: number): Promise<void> => {
					if (lastConsumedIndex + 1 >= pointers.length) return;
					// Einzelne HTTP-Pointerereignisse waren bereits korrekt, weil
					// Node zwischen zwei Requests automatisch einen neuen Host-Turn
					// beginnt. Eine transportseitig gebündelte Pointerfolge muss
					// dieselbe Grenze ausdrücklich herstellen; eine reine Hermes-
					// Barriere innerhalb der aktuellen Microtask reicht dafür nicht.
					await new Promise<void>(resolve => setImmediate(resolve));
					await stabilizeInteractiveUi();
				};
				for (let index = 0; index < pointers.length; index += 1) {
					const pointer = pointers[index];
					if (pointer.kind === "move") {
						const activePointerCount = pointerInput.activePointerIds().length;
						const moveFrame = [pointer];
						const identifiers = new Set([pointer.pointerId]);
						while (moveFrame.length < activePointerCount) {
							const next = pointers[index + 1];
							if (next?.kind !== "move" || identifiers.has(next.pointerId)) break;
							moveFrame.push(next);
							identifiers.add(next.pointerId);
							index += 1;
						}
						const dispatch = await pointerInput.pointerMoves(
							moveFrame.map(move => ({
								identifier: move.pointerId as number,
								pageX: move.x as number,
								pageY: move.y as number,
							})),
							Math.max(...moveFrame.map(move => move.timeMs as number)),
						);
						dispatches.push({
							kind: pointer.kind,
							targets: dispatch.touches.map(touch => touch.target),
							changedIndices: dispatch.changedIndices,
						});
						await flushBeforeNextTouchFrame(index);
						continue;
					}
					const dispatch = await dispatchPointer(pointer);
					dispatches.push({
						kind: pointer.kind,
						targets: dispatch.touches.map(touch => touch.target),
						changedIndices: dispatch.changedIndices,
					});
					await flushBeforeNextTouchFrame(index);
				}
				await stabilizeInteractiveUi();
				revision += 1;
				const frameChanged = uiManager.visualMutationRevision() !== uiVisualRevisionBefore
					|| uiExecution.nativeHierarchyRuntime().visualMutationRevision() !== nativeVisualRevisionBefore
					|| skiaVisualRevision() !== skiaRevisionBefore;
				if (frameChanged) frameRevision += 1;
				return { dispatches, frameChanged };
			};
			const dispatchInteractiveWheel = async (wheel: WheelHttpRequest) => {
				const uiVisualRevisionBefore = uiManager.visualMutationRevision();
				const nativeVisualRevisionBefore = uiExecution.nativeHierarchyRuntime().visualMutationRevision();
				const skiaRevisionBefore = skiaVisualRevision();
				const dispatch = await uiExecution.scrollViewRuntime().wheel(
					wheel.x,
					wheel.y,
					wheel.deltaX,
					wheel.deltaY,
					wheel.timeMs,
				);
				await stabilizeInteractiveUi();
				revision += 1;
				const frameChanged = uiManager.visualMutationRevision() !== uiVisualRevisionBefore
					|| uiExecution.nativeHierarchyRuntime().visualMutationRevision() !== nativeVisualRevisionBefore
					|| skiaVisualRevision() !== skiaRevisionBefore;
				if (frameChanged) frameRevision += 1;
				return { dispatch, frameChanged };
			};
			const httpSessionToken = options.httpSessionToken!;
			const expectedOrigin = `http://127.0.0.1:${options.servePort}`;
			const server = createServer((request, response) => {
				response.setHeader("Cache-Control", "no-store");
				setAppPluginDesktopSecurityHeaders(response);
				const url = new URL(request.url ?? "/", "http://127.0.0.1");
				if (request.method === "GET"
					&& options.staticRootPath
					&& serveAppPluginDesktopStaticRequest(options.staticRootPath, url, response, httpSessionToken)) {
					return;
				}
				if (!requestHasAppPluginSessionToken(request, url, httpSessionToken)) {
					sendJson(response, 401, { error: "AppPlugin-Runtime-Sitzung fehlt oder ist abgelaufen" });
					return;
				}
				if (request.method === "POST" && request.headers.origin !== expectedOrigin) {
					sendJson(response, 403, { error: "AppPlugin-Runtime akzeptiert nur gleichursprüngliche Änderungen" });
					return;
				}
				const requestBodyPromise = request.method === "POST"
					? readJsonRequest(request)
					: Promise.resolve(undefined);
				void requestBodyPromise.then(requestBody => enqueue(async () => {
					if (request.method === "GET" && url.pathname === "/health") {
						const { currentSurface, viewport, view } = resolveCurrentSurface(requestedView(url));
						sendJson(response, 200, {
							status: "appplugin-session-ready",
							sessionId,
							profileId: options.profileId,
							mapFamily: options.fixtureMapFamily,
							availableProfiles: options.availableProfiles,
							deviceModel: options.deviceModel,
							profileLabel: options.profileLabel,
							deviceSession: resolvedDeviceSession
								? {
									source: "apk-device-session-descriptor",
									compatibility: resolvedDeviceSession.compatibility,
									package: resolvedDeviceSession.descriptor.package,
									deviceExtraKeys: Object.keys(
										resolvedDeviceSession.descriptor.device.deviceExtra,
									).sort(),
								}
								: {
									source: "legacy-cli",
									compatibility: { status: "not-evaluated" },
								},
							revision,
							frameRevision,
							surface: currentSurface,
							bundleKind: session.bundleKind,
							bundleSha256,
							bundleProvenance: "unchanged-appplugin-bundle",
							renderProvenance: "host-svg-diagnostic",
							inputProvenance: "host-apk-contract-emulation",
							semanticActionProvenance: "host-heuristic-from-appplugin-tree",
							viewport,
							presentationFocus: view === "map"
								? apkInteractiveSurfacePng?.contentBounds
								: undefined,
							productFallbackAllowed: false,
							surfaceKind: view === "full" ? "host-diagnostic-full-tree" : "host-diagnostic-map-viewport",
							view,
							availableViews: availableServedViews,
							colorScheme: darkMode.getColorScheme(),
							colorModel: darkMode.getColorModel(),
							systemColorScheme: darkMode.snapshot().systemColorScheme,
							cardStyle: darkMode.getCardStyle(),
							themeSwitching: true,
							semanticActions: semanticActionsHttpState(),
							...localizationHttpState(),
							publishedDpsCount,
							pageCloseRequestCount,
						});
						return;
					}
					if (request.method === "POST" && url.pathname === "/profile") {
						if (!options.profileId || !options.profileSwitchPath) {
							throw new Error("Diese AppPlugin-Sitzung unterstützt keinen Profilwechsel");
						}
						const profile = parseAppPluginDesktopProfile(requestBody?.profile);
						if (!profile || !options.availableProfiles.includes(profile)) {
							throw new Error("Unbekanntes oder nicht verfügbares AppPlugin-Profil");
						}
						const sessionRestarting = profile !== options.profileId;
						if (sessionRestarting) {
							writeAppPluginDesktopProfileSwitch(options.profileSwitchPath, profile);
						}
						sendJson(response, 200, {
							sessionId,
							profile,
							sessionRestarting,
						});
						if (sessionRestarting) setImmediate(() => requestInteractiveServerStop?.());
						return;
					}
					if (request.method === "GET" && url.pathname === "/state") {
						sendJson(response, 200, {
							revision,
							rawText: collectAppPluginRawText(uiManager.snapshot()),
							publishedDpsCount,
							pageCloseRequestCount,
							startupReplayEvents: replayEvents,
							blobIngresses,
							publishReplayEvents,
							publishReplayEventsCount: publishReplayEvents.length,
							publishReplayResponseErrors,
							publishResponseMatches: publishResponseStates.map(({ response, matchCount }) => ({
								matchCount,
								maximumMatches: response.maximumMatches,
								dpsKey: response.match.dpsKey,
								payload: response.match.payload,
							})),
							activePointerIds: pointerInput.activePointerIds(),
							gestureHandlers: gestureHandler.snapshot(),
							jsResponder: uiManager.jsResponder(),
							uiManagerOperations: uiManager.operationJournal(),
							colorScheme: darkMode.getColorScheme(),
							colorModel: darkMode.getColorModel(),
							systemColorScheme: darkMode.snapshot().systemColorScheme,
							darkModeEvents,
							appearanceEvents,
							localization: localization.snapshot(),
							localizationEvents,
							activeTextInputs: textInput.activeInputs(),
							appliedActivityStyles,
							requestedColorModels,
							appSysLogs,
							reportedExceptions,
							workerDiagnostics,
							deviceNativeInvocations: nativeInvocations.filter(invocation =>
								invocation.moduleName === "RRPluginDevice"),
							sdkNativeInvocations: nativeInvocations
								.filter(invocation => invocation.moduleName === "RRPluginSDK")
								.map(invocation => ({
									methodName: invocation.methodName,
									argumentCount: invocation.argumentCount,
									argumentTypes: invocation.arguments.map(argument =>
										Array.isArray(argument) ? "array" : argument === null ? "null" : typeof argument),
								})),
						});
						return;
					}
					if (request.method === "POST" && url.pathname === "/theme") {
						const view = requestedView(url);
						const theme = parseThemeHttpRequest(requestBody!);
						const previousScheme = darkMode.getColorScheme();
						darkMode.setColorModel(theme.mode === "system" ? "default" : theme.mode);
						const nextScheme = theme.mode === "system" ? theme.systemColorScheme : theme.mode;
						darkMode.updateSystemColorScheme(nextScheme);
						appearance.onConfigurationChanged(nextScheme);
						if (previousScheme !== nextScheme) {
							await session.emitDeviceEvent("themeDidChange", { colorScheme: nextScheme });
							await session.emitDeviceEvent("appearanceChanged", { colorScheme: nextScheme });
							await session.waitForRuntimeBoundaryIdle();
							imminentTimerCycles += await settleImminentOneShotTimers();
							await stabilizeUi();
							revision += 1;
							frameRevision += 1;
						}
						const { currentSurface, viewport } = resolveCurrentSurface(view);
						sendJson(response, 200, {
							revision,
							frameRevision,
							surface: currentSurface,
							viewport,
							view,
							colorScheme: darkMode.getColorScheme(),
							colorModel: darkMode.getColorModel(),
							systemColorScheme: darkMode.snapshot().systemColorScheme,
							cardStyle: darkMode.getCardStyle(),
							themeSwitching: true,
							semanticActions: semanticActionsHttpState(),
							...localizationHttpState(),
						});
						return;
					}
					if (request.method === "POST" && url.pathname === "/locale") {
						const view = requestedView(url);
						const language = parseLanguageHttpRequest(requestBody!);
						const previousLanguage = localization.snapshot().language;
						const uiVisualRevisionBefore = uiManager.visualMutationRevision();
						const skiaRevisionBefore = skiaVisualRevision();
						await localization.setLanguage(language.language);
						await session.waitForRuntimeBoundaryIdle();
						imminentTimerCycles += await settleImminentOneShotTimers();
						await stabilizeUi();
						const frameChanged = uiManager.visualMutationRevision() !== uiVisualRevisionBefore
							|| skiaVisualRevision() !== skiaRevisionBefore;
						if (previousLanguage !== language.language) revision += 1;
						if (frameChanged) frameRevision += 1;
						const localizationState = localization.snapshot();
						const sessionRestarting = previousLanguage !== language.language
							&& options.sessionStatePath !== undefined;
						if (sessionRestarting) {
							updateAppPluginDesktopSessionState(options.sessionStatePath!, {
								language: localizationState.language,
								localeIdentifier: localizationState.localeIdentifier,
								forceRTL: selectedAppLanguageIsRtl(
									localizationState.language,
									localizationState.systemLocaleIdentifier,
								),
								restartRequested: true,
							});
						}
						const { currentSurface, viewport } = resolveCurrentSurface(view);
						sendJson(response, 200, {
							revision,
							frameRevision,
							frameChanged,
							sessionId,
							surface: currentSurface,
							viewport,
							view,
							semanticActions: semanticActionsHttpState(),
							...localizationHttpState(),
							sessionRestarting,
						});
						if (sessionRestarting) setImmediate(() => requestInteractiveServerStop?.());
						return;
					}
					if (request.method === "GET" && url.pathname === "/ui-state") {
						const jsResponder = uiManager.jsResponder();
						sendJson(response, 200, {
							revision,
							rawText: collectAppPluginRawText(uiManager.snapshot()),
							uiTree: uiManager.snapshot(),
							nativeHierarchy: uiExecution.nativeHierarchyRuntime().snapshot(),
							jsResponder,
							jsResponderMeasurement: jsResponder
								? uiExecution.nativeHierarchyRuntime().measure(jsResponder.tag)
								: undefined,
							pendingNativeMeasurementCount: uiManager.pendingNativeMeasurementCount(),
						});
						return;
					}
					if (request.method === "GET" && url.pathname === "/published-dps") {
						const after = Number(url.searchParams.get("after") ?? "0");
						if (!Number.isSafeInteger(after) || after < 0 || after > publishedDpsCount) {
							throw new Error("after muss zwischen 0 und der Anzahl veröffentlichter DPS liegen");
						}
						const retainedStart = Math.max(after, publishedDpsRetainedFrom);
						sendJson(response, 200, {
							revision,
							publishedDps: publishedDps.slice(retainedStart - publishedDpsRetainedFrom),
							publishedDpsCount,
							after,
							retainedFrom: publishedDpsRetainedFrom,
							truncated: after < publishedDpsRetainedFrom,
							publishReplayEvents,
							publishReplayResponseErrors,
							publishResponseMatches: publishResponseStates.map(({ response, matchCount }) => ({
								matchCount,
								maximumMatches: response.maximumMatches,
								dpsKey: response.match.dpsKey,
								payload: response.match.payload,
							})),
						});
						return;
					}
					if (request.method === "GET" && url.pathname === "/semantic-actions") {
						sendJson(response, 200, {
							revision,
							semanticActions: semanticActionsHttpState(),
						});
						return;
					}
					if (request.method === "POST" && url.pathname === "/semantic-action") {
						if (pointerInput.activePointerIds().length > 0) {
							throw new Error("Semantische AppPlugin-Aktion benötigt eine ruhende Pointer-Sitzung");
						}
						const view = requestedView(url);
						const requestedAction = parseSemanticActionHttpRequest(requestBody!);
						const action = findApkSemanticUiAction(resolvedSemanticActions(), requestedAction.id);
						const timestamp = Date.now();
						const { dispatches, frameChanged } = await dispatchInteractivePointers([
							{
								kind: "down",
								pointerId: 2_147_000_000,
								x: action.center.x,
								y: action.center.y,
								timeMs: timestamp,
							},
							{
								kind: "up",
								pointerId: 2_147_000_000,
								x: action.center.x,
								y: action.center.y,
								timeMs: timestamp + 40,
							},
						]);
						const lastDispatch = dispatches.at(-1);
						const { currentSurface, viewport } = resolveCurrentSurface(view);
						sendJson(response, 200, {
							revision,
							frameRevision,
							frameChanged,
							action: publicApkSemanticUiActions([action])[0],
							semanticActions: semanticActionsHttpState(),
							surface: currentSurface,
							viewport,
							view,
							targets: lastDispatch?.targets ?? [],
							changedIndices: lastDispatch?.changedIndices ?? [],
							dispatches,
							activePointerIds: pointerInput.activePointerIds(),
							jsResponder: uiManager.jsResponder(),
							pendingNativeMeasurementCount: uiManager.pendingNativeMeasurementCount(),
							publishedDpsCount,
							pageCloseRequestCount,
							...localizationHttpState(),
						});
						return;
					}
					if (request.method === "GET" && url.pathname === "/native-invocations") {
						sendJson(response, 200, {
							invocations: nativeInvocations.map(invocation => ({
								moduleName: invocation.moduleName,
								methodName: invocation.methodName,
								argumentCount: invocation.argumentCount,
								argumentTypes: invocation.arguments.map(argument =>
									Array.isArray(argument) ? "array" : argument === null ? "null" : typeof argument),
							})),
						});
						return;
					}
					if (request.method === "POST" && url.pathname === "/replay-publish-response") {
						const responseIndex = Number(url.searchParams.get("responseIndex") ?? "0");
						if (!Number.isSafeInteger(responseIndex) || responseIndex < 0) {
							throw new Error("responseIndex muss eine nichtnegative Ganzzahl sein");
						}
						const replayState = publishResponseStates[responseIndex];
						if (!replayState) throw new Error(`Publish-Replay ${responseIndex} existiert nicht`);
						const firstReplayEventIndex = publishReplayEvents.length;
						for (const [eventIndex, event] of replayState.response.events.entries()) {
							publishReplayEvents.push(await emitReplayEvent(event, {
								source: "manual-publish-response",
								responseIndex,
								eventIndex,
							}));
						}
						sendJson(response, 200, {
							responseIndex,
							emittedEventCount: publishReplayEvents.length - firstReplayEventIndex,
							publishReplayEventsCount: publishReplayEvents.length,
							blobIngressesCount: blobIngresses.length,
						});
						return;
					}
					if (request.method === "POST" && url.pathname === "/text-input") {
						const input = parseTextInputHttpRequest(requestBody!);
						const uiVisualRevisionBefore = uiManager.visualMutationRevision();
						const nativeVisualRevisionBefore = uiExecution.nativeHierarchyRuntime().visualMutationRevision();
						const skiaRevisionBefore = skiaVisualRevision();
						const dispatch = await textInput.replaceText(input.text, input.tag);
						await session.waitForRuntimeBoundaryIdle();
						imminentTimerCycles += await settleImminentOneShotTimers();
						await stabilizeUi();
						revision += 1;
						const frameChanged = uiManager.visualMutationRevision() !== uiVisualRevisionBefore
							|| uiExecution.nativeHierarchyRuntime().visualMutationRevision() !== nativeVisualRevisionBefore
							|| skiaVisualRevision() !== skiaRevisionBefore;
						if (frameChanged) frameRevision += 1;
						sendJson(response, 200, {
							revision,
							frameRevision,
							frameChanged,
							dispatch,
							activeTextInputs: textInput.activeInputs(),
						});
						return;
					}
					if (request.method === "GET" && url.pathname === "/native-animated-invocations") {
						sendJson(response, 200, {
							invocations: nativeInvocations.filter(invocation => invocation.moduleName === "NativeAnimatedModule"),
						});
						return;
					}
					if (request.method === "GET" && url.pathname === "/frame.svg") {
						const { artifact } = cachedCurrentFrame(requestedView(url));
						response.statusCode = 200;
						response.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
						response.setHeader("X-AppPlugin-Revision", String(revision));
						response.setHeader("X-AppPlugin-Frame-Revision", String(frameRevision));
						response.setHeader("X-AppPlugin-Render-Provenance", "host-svg-diagnostic");
						response.end(artifact.svg);
						return;
					}
					if (request.method === "POST" && url.pathname === "/wheel") {
						if (pointerInput.activePointerIds().length > 0) {
							throw new Error("Scrollrad-Eingabe benötigt eine ruhende Pointer-Sitzung");
						}
						const view = requestedView(url);
						const wheel = parseWheelHttpRequest(requestBody!);
						const { dispatch, frameChanged } = await dispatchInteractiveWheel(wheel);
						const { currentSurface, viewport } = resolveCurrentSurface(view);
						sendJson(response, 200, {
							revision,
							frameRevision,
							frameChanged,
							surface: currentSurface,
							viewport,
							view,
							targets: dispatch ? [dispatch.tag] : [],
							changedIndices: [],
							activePointerIds: pointerInput.activePointerIds(),
							jsResponder: uiManager.jsResponder(),
							pendingNativeMeasurementCount: uiManager.pendingNativeMeasurementCount(),
							publishedDpsCount,
							pageCloseRequestCount,
							semanticActions: semanticActionsHttpState(),
							scrollDispatch: dispatch,
							...localizationHttpState(),
						});
						return;
					}
					if (request.method === "POST" && url.pathname === "/pointer") {
						const view = requestedView(url);
						const pointer = parsePointerHttpRequest(requestBody!);
						const { dispatches, frameChanged } = await dispatchInteractivePointers([pointer]);
						const [dispatch] = dispatches;
						const { currentSurface, viewport } = resolveCurrentSurface(view);
						sendJson(response, 200, {
							revision,
							frameRevision,
							frameChanged,
							surface: currentSurface,
							viewport,
							view,
							targets: dispatch.targets,
							changedIndices: dispatch.changedIndices,
							activePointerIds: pointerInput.activePointerIds(),
							jsResponder: uiManager.jsResponder(),
							pendingNativeMeasurementCount: uiManager.pendingNativeMeasurementCount(),
							publishedDpsCount,
							pageCloseRequestCount,
							semanticActions: semanticActionsHttpState(),
							...localizationHttpState(),
						});
						return;
					}
					if (request.method === "POST" && url.pathname === "/pointer-sequence") {
						const view = requestedView(url);
						const sequence = parsePointerSequenceHttpRequest(requestBody!);
						const { dispatches, frameChanged } = await dispatchInteractivePointers(sequence.pointers);
						const lastDispatch = dispatches.at(-1);
						const { currentSurface, viewport } = resolveCurrentSurface(view);
						sendJson(response, 200, {
							revision,
							frameRevision,
							frameChanged,
							surface: currentSurface,
							viewport,
							view,
							targets: lastDispatch?.targets ?? [],
							changedIndices: lastDispatch?.changedIndices ?? [],
							dispatches,
							activePointerIds: pointerInput.activePointerIds(),
							jsResponder: uiManager.jsResponder(),
							pendingNativeMeasurementCount: uiManager.pendingNativeMeasurementCount(),
							publishedDpsCount,
							pageCloseRequestCount,
							semanticActions: semanticActionsHttpState(),
							...localizationHttpState(),
						});
						return;
					}
					sendJson(response, 404, { error: "Unbekannter AppPlugin-Runtime-Endpunkt" });
				})).catch(error => {
					if (!response.headersSent) {
						sendJson(
							response,
							error instanceof AppPluginRuntimeUnavailableError ? error.statusCode : 400,
							{ error: error instanceof Error ? error.message : String(error) },
						);
					} else {
						response.destroy(error instanceof Error ? error : new Error(String(error)));
					}
				});
			});
			server.headersTimeout = 5_000;
			server.requestTimeout = 10_000;
			server.keepAliveTimeout = 5_000;
			server.maxRequestsPerSocket = 100;
			await new Promise<void>((resolve, reject) => {
				server.once("error", reject);
				server.listen(options.servePort, "127.0.0.1", resolve);
			});
			process.stdout.write(`${JSON.stringify({
				status: "interactive-server-ready",
				sessionId,
				url: `http://127.0.0.1:${options.servePort}`,
				interactiveSurface,
				viewport: interactiveViewport,
				bundleKind: session.bundleKind,
				bundleSha256,
				mapFamily: options.fixtureMapFamily,
				deviceSessionCompatibility: resolvedDeviceSession?.compatibility,
				bundleProvenance: "unchanged-appplugin-bundle",
				renderProvenance: "host-svg-diagnostic",
				inputProvenance: "host-apk-contract-emulation",
				surfaceKind: options.serveFullRoot ? "host-diagnostic-full-tree" : "host-diagnostic-map-viewport",
				productFallbackAllowed: false,
			})}\n`);
			const stopRequested = new Promise<void>(resolve => {
				requestInteractiveServerStop = resolve;
				process.once("SIGINT", resolve);
				process.once("SIGTERM", resolve);
			});
			await Promise.race([
				stopRequested,
				session.waitForExit().then(() => undefined),
			]);
			requestInteractiveServerStop = undefined;
			await new Promise<void>((resolve, reject) => {
				server.close(error => error ? reject(error) : resolve());
			});
		}
		const renderStarted = options.runApplication
			&& reportedExceptions.length === 0
			&& uiManager.snapshot().children.length > 0;
		process.stdout.write(`${JSON.stringify({
			status: options.runApplication ? (renderStarted ? "render-started" : "render-failed") : "app-registered",
			bundlePath: options.bundlePath,
			bootstrapPath: options.bootstrapPath,
			bundleKind: session.bundleKind,
			bundleSha256,
			applicationStarted: options.runApplication,
			runtimeIdleRounds,
			timerRuntimeIdleRounds,
			imminentTimerCycles,
			uiExecutionSnapshots,
			b01Ingress,
			blobIngresses,
			deviceReplay: {
				manifestPath: deviceReplay.manifestPath,
				shadowDpsKeys: Object.keys(deviceReplay.shadowDps),
				events: replayEvents,
				publishReplayEvents,
				publishReplayResponseErrors,
				publishResponseMatches: publishResponseStates.map(({ response, matchCount }) => ({
					matchCount,
					maximumMatches: response.maximumMatches,
					dpsKey: response.match.dpsKey,
					payload: response.match.payload,
				})),
			},
			pointerReplay: pointerReplay ? {
				manifestPath: pointerReplay.manifestPath,
				events: pointerEvents,
				activePointerIds: pointerInput.activePointerIds(),
			} : undefined,
			interactionReplay: interactionReplay ? {
				manifestPath: interactionReplay.manifestPath,
				viewport: interactionReplay.viewport,
				events: interactionEvents,
				activePointerIds: pointerInput.activePointerIds(),
				activeTextInputs: textInput.activeInputs(),
			} : undefined,
			probe: session.probe,
			runtimeProfile: {
				kind: "synthetic-apk-host-probe",
				deviceModel: options.deviceModel,
				mobileModel: options.mobileModel,
				androidRelease: options.androidRelease,
				duid: options.duid,
				deviceSn: options.deviceSn,
				firmwareVersion,
				activeTime: options.activeTime,
				basePath: basePathUrl,
				storageBasePath,
				uiPipeline: "apk-legacy-ui-manager",
			},
			reportedExceptions,
			requestedColorSchemeModes,
			appearanceEvents,
			appStateEvents,
			darkModeEvents,
			netInfoListenerCount: netInfo.listenerCount(),
			workerDiagnostics,
			skiaDiagnostics,
			skiaPng,
			apkUiPng,
			interactiveSurface,
			apkInteractiveSurfacePng,
			publishedDps,
			timingErrors,
			activeTimerIds: timing.activeTimerIds(),
			activeTimers: timing.activeTimers(),
			i18nPreferences: i18nManager.snapshot(),
			localization: localization.snapshot(),
			localizationEvents,
			appSysLogs,
			touchSoundCount: soundManager.touchSoundCount(),
			statusBar: statusBar.snapshot(),
			nativeInvocations,
			nativeInvocationRejections,
			uiTree: options.runApplication ? uiManager.snapshot() : undefined,
			nativeHierarchy: options.runApplication ? nativeHierarchy : undefined,
			nativeMeasurements: options.runApplication ? nativeMeasurements : undefined,
			uiOperations: options.runApplication ? uiManager.operations() : undefined,
		})}\n`);
		nativeAnimated.dispose();
		timing.dispose();
		await session.stop();
		workerRuntime.stopAll();
		disposeSkiaHost();
		if (options.runApplication && !renderStarted) {
			throw new Error(
				`APK-Renderstart fehlgeschlagen: Ausnahmen=${reportedExceptions.length}, Root-Kinder=${uiManager.snapshot().children.length}`,
			);
		}
	} catch (error) {
		nativeAnimated.dispose();
		timing.dispose();
		if (session.state === "running") await session.stop();
		workerRuntime.stopAll();
		disposeSkiaHost();
		process.stderr.write(`${session.stderr}${session.stderr.endsWith("\n") || session.stderr.length === 0 ? "" : "\n"}`);
		throw error;
	}
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
