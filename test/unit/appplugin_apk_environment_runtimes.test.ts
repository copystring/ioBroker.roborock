import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it, vi } from "vitest";

import { ApkDarkModeRuntime } from "../../src/apppluginHost/apkDarkModeRuntime";
import { createApkGestureHandlerConstants } from "../../src/apppluginHost/apkCoreRuntimeConstants";
import { ApkGestureHandlerRuntime } from "../../src/apppluginHost/apkGestureHandlerRuntime";
import { ApkNetInfoRuntime } from "../../src/apppluginHost/apkNetInfoRuntime";
import {
	ApkPluginSdkEnvironmentRuntime,
	parseApkUserPluginAgreementsResponse,
	selectApkPluginAgreementsForDevice,
} from "../../src/apppluginHost/apkPluginSdkEnvironmentRuntime";
import { ApkPluginSdkPreferencesRuntime } from "../../src/apppluginHost/apkPluginSdkPreferencesRuntime";
import { ApkStatusBarRuntime } from "../../src/apppluginHost/apkStatusBarRuntime";
import { ApkV8WorkerRuntime } from "../../src/apppluginHost/apkV8WorkerRuntime";

describe("APK AppPlugin environment runtimes", () => {
	it("extracts plugin agreements from the authenticated APK response envelope", () => {
		const agreements = [{ deviceId: "device-1", type: "privacy", version: "3" }];

		expect(parseApkUserPluginAgreementsResponse(JSON.stringify({ result: {
			userPluginAgreementList: agreements,
		} }))).toEqual(agreements);
		expect(selectApkPluginAgreementsForDevice([
			...agreements,
			{ deviceId: "device-2", type: "terms", version: "9" },
		], "device-1")).toEqual([{ type: "privacy", version: 3 }]);
		expect(() => parseApkUserPluginAgreementsResponse("{}"))
			.toThrow(/userPluginAgreementList/u);
	});

	it("reproduces RRPluginSDK device SharedPreferences and callback shapes", () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-plugin-preferences-"));
		const filePath = path.join(root, "device.json");
		const runtime = new ApkPluginSdkPreferencesRuntime(filePath);
		const getCallback = vi.fn();
		const removeCallback = vi.fn();

		runtime.getValue("missing", getCallback);
		runtime.setValue("theme", "dark");
		runtime.saveInfo({
			count: 3.9,
			enabled: true,
			nested: { room: 7 },
			list: [1, "two"],
		});
		new ApkPluginSdkPreferencesRuntime(filePath).getValue("theme", getCallback);
		runtime.removeValue("theme", removeCallback);

		expect(getCallback).toHaveBeenNthCalledWith(1, "");
		expect(getCallback).toHaveBeenNthCalledWith(2, "dark");
		expect(removeCallback).toHaveBeenCalledWith(true);
		const persisted = new ApkPluginSdkPreferencesRuntime(filePath);
		const persistedCallback = vi.fn();
		persisted.getValue("count", persistedCallback);
		persisted.getValue("enabled", persistedCallback);
		persisted.getValue("nested", persistedCallback);
		expect(persistedCallback.mock.calls).toEqual([
			["3"],
			["true"],
			['{"room":7}'],
		]);
		const clearCallback = vi.fn();
		persisted.clearValues(clearCallback);
		expect(clearCallback).toHaveBeenCalledWith(true);
	});

	it("reproduces the APK gesture constants and handler lifecycle", () => {
		expect(createApkGestureHandlerConstants()).toEqual({
			RNGestureHandlerModule: {
				State: {
					UNDETERMINED: 0,
					FAILED: 1,
					BEGAN: 2,
					CANCELLED: 3,
					ACTIVE: 4,
					END: 5,
				},
				Direction: {
					RIGHT: 1,
					LEFT: 2,
					UP: 4,
					DOWN: 8,
				},
			},
		});

		const runtime = new ApkGestureHandlerRuntime();
		runtime.createGestureHandler("PanGestureHandler", 7, { minDist: 10 });
		runtime.attachGestureHandler(7, 42, 2);
		runtime.updateGestureHandler(7, { minDist: 12 });
		expect(runtime.snapshot()).toEqual([{
			tag: 7,
			handlerName: "PanGestureHandler",
			config: { minDist: 12 },
			viewTag: 42,
			actionType: 2,
		}]);
		expect(runtime.install()).toBe(true);
		expect(() => runtime.createGestureHandler("PanGestureHandler", 7, {})).toThrow(/existiert bereits/u);
		expect(() => runtime.createGestureHandler("ErfundenerHandler", 8, {})).toThrow(/Ungültiger/u);
		expect(() => runtime.attachGestureHandler(99, 1, 1)).toThrow(/existiert nicht/u);
		runtime.dropGestureHandler(7);
		expect(runtime.snapshot()).toEqual([]);
	});

	it("uses explicit agreement state and matches the APK empty-array failure behavior", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const agreementAndPolicy = {
			privacyProtocol: { version: "1", langUrl: "https://example.test/privacy" },
			userAgreement: { version: "2", langUrl: "https://example.test/terms" },
		};
		const productAgreements = { privacy: { version: "3" } };
		const runtime = new ApkPluginSdkEnvironmentRuntime({
			hasActivity: () => true,
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => agreementAndPolicy,
			loadProductAgreements: async () => productAgreements,
			loadPluginAgreements: async () => { throw new Error("Lesefehler"); },
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		});

		expect(await runtime.agreementAndPolicy()).toEqual(agreementAndPolicy);
		expect(await runtime.getProductAgreements()).toEqual(productAgreements);
		expect(await runtime.getPluginAgreements()).toEqual([]);
	});

	it("loads device properties only through the APK asynchronous methods", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const runtime = new ApkPluginSdkEnvironmentRuntime({
			hasActivity: () => true,
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({
				features: "feature-a",
				featuresNew: "feature-b",
				dockType: "8",
			}),
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		});

		expect(await runtime.getDeviceExtraInfoForKey("features")).toEqual({
			features: "feature-a",
		});
		expect(await runtime.getDeviceExtraInfoForKeyArray(["featuresNew", "dockType", "missing"]))
			.toEqual({
				featuresNew: "feature-b",
				dockType: "8",
				missing: "",
			});
	});

	it("uses account state and the APK-local product role catalog", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const runtime = new ApkPluginSdkEnvironmentRuntime({
			hasActivity: () => true,
			currentCountryInfo: () => ({ countryCode: "DE", serverCode: "eu" }),
			productRoles: [
				{
					role: "owner",
					products: [{ prodModel: "roborock.mower.s1", catCode: "MOWER" }],
				},
				{
					role: "operator",
					products: [{ prodModel: "all", catCode: "MOWER" }],
				},
			],
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		});
		const countryCallback = vi.fn();

		runtime.getCurrentCountryInfoCallback(countryCallback);
		expect(countryCallback).toHaveBeenCalledWith(true, {
			countryCode: "de",
			serverCode: "eu",
		});
		await expect(runtime.getUserRole("roborock.mower.s1", "MOWER")).resolves
			.toBe("owner,operator");
	});

	it("uses APK host state for operator and system-time-zone results", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const runtime = new ApkPluginSdkEnvironmentRuntime({
			hasActivity: () => true,
			mobileOperatorInfo: () => ({
				name: "Testnetz",
				simOperator: "26201",
				countryCode: "de",
			}),
			systemTimeZoneName: () => "Europe/Berlin",
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		});
		const callback = vi.fn();

		await expect(runtime.getOperatorsInfo()).resolves.toEqual({
			"1": {
				name: "Testnetz",
				simOperator: "26201",
				countryCode: "de",
			},
		});
		runtime.getSystemTimezoneNameWithCallback(callback);
		expect(callback).toHaveBeenCalledWith(true, "Europe/Berlin");
	});

	it("keeps absent account explicit and uses the APK's empty local role cache", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const options = {
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		};
		const runtime = new ApkPluginSdkEnvironmentRuntime({ ...options, hasActivity: () => true });
		const countryCallback = vi.fn();
		runtime.getCurrentCountryInfoCallback(countryCallback);
		expect(countryCallback).toHaveBeenCalledWith(true, {});
		await expect(runtime.getUserRole("model", "code")).resolves.toBe("");

		const inactive = new ApkPluginSdkEnvironmentRuntime({ ...options, hasActivity: () => false });
		const inactiveCallback = vi.fn();
		inactive.getCurrentCountryInfoCallback(inactiveCallback);
		expect(inactiveCallback).toHaveBeenCalledWith(false);
	});

	it("forwards the APK closeCurrentPage activity boundary without a missing-method rejection", () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const closeCurrentPage = vi.fn();
		const runtime = new ApkPluginSdkEnvironmentRuntime({
			hasActivity: () => true,
			closeCurrentPage,
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		});

		expect(runtime.closeCurrentPage()).toBeUndefined();
		expect(closeCurrentPage).toHaveBeenCalledOnce();
	});

	it("matches APK firmware lookup, fallback, and rejection behavior", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const loadOtaInfo = vi.fn()
			.mockResolvedValueOnce({
				currentVersion: "02.24.90",
				version: "02.26.80",
				updatable: true,
			})
			.mockResolvedValueOnce(null)
			.mockRejectedValueOnce(new Error("OTA nicht erreichbar"));
		const baseOptions = {
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		};
		const runtime = new ApkPluginSdkEnvironmentRuntime({
			...baseOptions,
			hasActivity: () => true,
		});

		expect(await runtime.getLastVersionInfo()).toEqual({
			currentVersion: "02.24.90",
			lastVersion: "02.26.80",
			mandatoryUpdate: true,
		});
		expect(await runtime.getLastVersionInfo()).toEqual({
			currentVersion: "02.24.90",
			lastVersion: "02.24.90",
			mandatoryUpdate: false,
		});
		expect(await runtime.getLastVersionInfo()).toEqual({
			currentVersion: "02.24.90",
			lastVersion: "02.24.90",
			mandatoryUpdate: false,
		});
		await expect(new ApkPluginSdkEnvironmentRuntime({
			...baseOptions,
			hasActivity: () => false,
		}).getLastVersionInfo()).rejects.toThrow("no context");
		await expect(new ApkPluginSdkEnvironmentRuntime({
			...baseOptions,
			hasActivity: () => true,
			isSharedDevice: () => true,
		}).getLastVersionInfo()).rejects.toThrow("device is shared,not support");
	});

	it("matches the APK firmware-progress result and rejection shapes", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const loadOtaProgress = vi.fn()
			.mockResolvedValueOnce({ status: "downloading" })
			.mockResolvedValueOnce(null)
			.mockRejectedValueOnce(new Error("SDK-Fehler"));
		const baseOptions = {
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo: async () => null,
			loadOtaProgress,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		};
		const runtime = new ApkPluginSdkEnvironmentRuntime({ ...baseOptions, hasActivity: () => true });

		expect(await runtime.getFirmwareUpdateState()).toEqual({ status: "downloading", errMsg: "0" });
		await expect(runtime.getFirmwareUpdateState()).rejects.toThrow("data is null");
		await expect(runtime.getFirmwareUpdateState()).rejects.toThrow("data is null");
		await expect(new ApkPluginSdkEnvironmentRuntime({
			...baseOptions,
			hasActivity: () => false,
		}).getFirmwareUpdateState()).rejects.toThrow("device is null");
		await expect(new ApkPluginSdkEnvironmentRuntime({
			...baseOptions,
			hasActivity: () => true,
			isSharedDevice: () => true,
		}).getFirmwareUpdateState()).rejects.toThrow("device is shared,not support");
	});

	it("matches the APK readFile callback contract and confines plugin storage", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		writeFileSync(path.join(root, "GuideConfigFilePath"), "{\"showGuidePage\":true}", "utf8");
		const runtime = new ApkPluginSdkEnvironmentRuntime({
			hasActivity: () => true,
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		});
		expect(await runtime.getDeviceExtraInfoForKeyArray(["clean_finish", "1766745097"])).toEqual({
			clean_finish: "",
			"1766745097": "",
		});

		const success = vi.fn();
		runtime.readFile("GuideConfigFilePath", success);
		await vi.waitFor(() => expect(success).toHaveBeenCalledWith(true, "{\"showGuidePage\":true}"));

		const missing = vi.fn();
		runtime.readFile("missing", missing);
		await vi.waitFor(() => expect(missing).toHaveBeenCalledWith(false, ""));

		const traversal = vi.fn();
		runtime.readFile("../outside", traversal);
		expect(traversal).toHaveBeenCalledWith(false, "");

		mkdirSync(path.join(root, "logs"));
		writeFileSync(path.join(root, "logs", "current.log"), "aktuell", "utf8");
		writeFileSync(path.join(root, "logs", "previous.log"), "vorher", "utf8");
		mkdirSync(path.join(root, "logs", "archive"));
		expect(await runtime.readFileListAtPath("logs/")).toEqual(expect.arrayContaining([
			{ name: "current.log" },
			{ name: "previous.log" },
		]));
		expect(await runtime.readFileListAtPath("logs/")).toHaveLength(2);
		await expect(runtime.readFileListAtPath("missing/")).rejects.toThrow(
			"filePath not exists or is not a directory",
		);
		await expect(runtime.readFileListAtPath("../outside")).rejects.toThrow(
			"filePath not exists or is not a directory",
		);
	});

	it("delegates worker execution without adding parser logic", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const workerPath = path.join(root, "worker.jx");
		writeFileSync(workerPath, "function original(value) { return value * 2; }");
		const runtime = new ApkPluginSdkEnvironmentRuntime({
			hasActivity: () => true,
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		});
		let executorId = "";
		runtime.startBackgroundJsExecutor(pathToFileURL(workerPath).href, value => {
			executorId = String(value);
		});
		const callback = vi.fn();
		runtime.callJsExecutorWithArray(executorId, "original", [4], callback);
		await vi.waitFor(() => expect(callback).toHaveBeenCalledWith(true, 8));
	});

	it("captures the APK status-bar request for a desktop shell", () => {
		const states: unknown[] = [];
		const statusBar = new ApkStatusBarRuntime({ onChange: state => states.push(state) });

		statusBar.setColor(0xff102030, false);
		statusBar.setStyle("dark-content");
		statusBar.setHidden(true);
		statusBar.setTranslucent(true);

		expect(statusBar.snapshot()).toEqual({
			color: 0xff102030,
			animated: false,
			hidden: true,
			style: "dark-content",
			translucent: true,
		});
		expect(states).toHaveLength(4);
		expect(() => statusBar.setStyle("invalid")).toThrow(/Statusleistenstil/u);
	});
	it("derives color and network state with the APK-visible shapes", () => {
		const events: unknown[] = [];
		const appliedActivityStyles: boolean[] = [];
		const requestedColorModels: string[] = [];
		const darkMode = new ApkDarkModeRuntime({
			storedColorModel: "default",
			systemColorScheme: "light",
			initialCardStyle: 2,
			emitDeviceEvent: (eventName, payload) => events.push({ eventName, payload }),
			applyActivityStyle: isDark => appliedActivityStyles.push(isDark),
			requestColorModel: mode => requestedColorModels.push(mode),
		});
		expect(darkMode.getColorScheme()).toBe("light");
		expect(darkMode.getCardStyle()).toBe(2);
		darkMode.setCardStyle(3.9);
		expect(darkMode.getCardStyle()).toBe(3);
		darkMode.setColorModel("dark");
		expect(darkMode.getColorModel()).toBe("dark");
		expect(requestedColorModels).toEqual(["dark"]);
		darkMode.updateSystemColorScheme("dark");
		expect(appliedActivityStyles).toEqual([true]);
		expect(events).toEqual([{ eventName: "themeDidChange", payload: { colorScheme: "dark" } }]);

		const netInfo = new ApkNetInfoRuntime({
			type: "wifi",
			isInternetReachable: true,
			isWifiEnabled: true,
			details: { isConnectionExpensive: false, ssid: "Probe" },
		});
		netInfo.addListener("netInfo.networkStatusDidChange");
		netInfo.addListener("netInfo.networkStatusDidChange");
		netInfo.removeListeners(1);
		expect(netInfo.listenerCount()).toBe(1);
		expect(netInfo.getCurrentState(null)).toEqual({
			isWifiEnabled: true,
			type: "wifi",
			isConnected: true,
			isInternetReachable: true,
			details: { isConnectionExpensive: false, ssid: "Probe" },
		});
		netInfo.removeListeners(99);
		expect(netInfo.listenerCount()).toBe(0);
		expect(() => netInfo.removeListeners(-1)).toThrow(/nichtnegative ganze Zahl/u);
	});
});
