import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it, vi } from "vitest";

import { ApkDarkModeRuntime } from "../../src/apppluginHost/apkDarkModeRuntime";
import { ApkNetInfoRuntime } from "../../src/apppluginHost/apkNetInfoRuntime";
import { ApkPluginSdkEnvironmentRuntime } from "../../src/apppluginHost/apkPluginSdkEnvironmentRuntime";
import { ApkV8WorkerRuntime } from "../../src/apppluginHost/apkV8WorkerRuntime";

describe("APK AppPlugin environment runtimes", () => {
	it("uses explicit agreement state and matches the APK empty-array failure behavior", async () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-environment-"));
		const agreementAndPolicy = {
			privacyProtocol: { version: "1", langUrl: "https://example.test/privacy" },
			userAgreement: { version: "2", langUrl: "https://example.test/terms" },
		};
		const runtime = new ApkPluginSdkEnvironmentRuntime({
			hasActivity: () => true,
			firmwareVersion: "02.24.90",
			storageBasePath: root,
			loadDeviceExtraInfo: async () => ({}),
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => agreementAndPolicy,
			loadPluginAgreements: async () => { throw new Error("Lesefehler"); },
			workerRuntime: new ApkV8WorkerRuntime({ pluginRootPath: root }),
		});

		expect(await runtime.agreementAndPolicy()).toEqual(agreementAndPolicy);
		expect(await runtime.getPluginAgreements()).toEqual([]);
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
		expect(netInfo.listenerCount()).toBe(1);
		expect(netInfo.getCurrentState(null)).toEqual({
			isWifiEnabled: true,
			type: "wifi",
			isConnected: true,
			isInternetReachable: true,
			details: { isConnectionExpensive: false, ssid: "Probe" },
		});
	});
});
