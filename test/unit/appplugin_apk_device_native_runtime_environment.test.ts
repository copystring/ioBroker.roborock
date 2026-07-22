import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import type { ApkAppPluginDeviceModelContext } from "../../src/apppluginHost/apkAppPluginDeviceSessionRuntime";
import {
	ApkAppPluginDeviceNativeRuntimeEnvironment,
	type ApkAppPluginDeviceNativeRuntimeEnvironmentOptions,
} from "../../src/apppluginHost/apkAppPluginDeviceNativeRuntimeEnvironment";
import type { ApkAppPluginNativeRuntimeComposition } from "../../src/apppluginHost/apkAppPluginNativeRuntimeComposition";
import type { ApkAppPluginHostContract } from "../../src/apppluginHost/apkContract";
import type { ApkPluginRestfulHttpService } from "../../src/apppluginHost/apkPluginHttpRuntime";
import type { ApkUiManagerRuntime } from "../../src/apppluginHost/apkUiManagerRuntime";

const contract = contractJson as ApkAppPluginHostContract;
const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { force: true, recursive: true });
	}
});

function restService(prefix: string): ApkPluginRestfulHttpService {
	return {
		delete: vi.fn(async requestPath => `${prefix}:DELETE:${requestPath}`),
		get: vi.fn(async requestPath => `${prefix}:GET:${requestPath}`),
		post: vi.fn(async requestPath => `${prefix}:POST:${requestPath}`),
		postJson: vi.fn(async requestPath => `${prefix}:POSTJSON:${requestPath}`),
		put: vi.fn(async requestPath => `${prefix}:PUT:${requestPath}`),
		putJson: vi.fn(async requestPath => `${prefix}:PUTJSON:${requestPath}`),
	};
}

function options(): {
	readonly options: ApkAppPluginDeviceNativeRuntimeEnvironmentOptions;
	readonly dataRoot: string;
	readonly iot: ApkPluginRestfulHttpService;
	readonly user: ApkPluginRestfulHttpService;
} {
	const pluginRoot = mkdtempSync(path.join(tmpdir(), "roborock-appplugin-root-"));
	const dataRoot = mkdtempSync(path.join(tmpdir(), "roborock-appplugin-data-"));
	temporaryDirectories.push(pluginRoot, dataRoot);
	const iot = restService("iot");
	const user = restService("user");
	const context = {
		authenticatedHttpPorts: { iot, user },
		session: {
			bundle: {
				bundlePath: path.join(pluginRoot, "index.android.bundle"),
				kind: "hermes-bytecode",
			},
			compatibility: {
				status: "bootstrap-compatible",
				bundleKind: "hermes-bytecode",
				hostApiLevel: 6,
				issues: [],
			},
			descriptor: {
				version: 1,
				pluginRoot,
				package: {
					models: ["roborock.test.model"],
					versionCode: 42,
				},
				device: {
					userId: "user-1",
					ownerId: "owner-1",
					deviceId: "device/with unsafe path",
					deviceSN: "serial-1",
					model: "roborock.test.model",
					name: "Testgerät",
					firmwareVersion: "02.01.00",
					protocolVersion: "1.0",
					deviceProperties: { featureSet: 123, nullable: null },
					activeTime: 1234,
					robotTimeZone: 2,
					iotType: 1,
				},
				host: {
					mobileModel: "Desktop Host",
					androidRelease: "15",
					clientId: "client-1",
					memoryMiB: 512,
					iotOriginDevId: "origin-1",
				},
				account: { countryCode: "DE", serverCode: "eu" },
				homeData: {
					deviceJsonStrings: ["{\"duid\":\"device-1\"}"],
					productJsonStrings: ["{\"model\":\"roborock.test.model\"}"],
				},
				installation: {
					mainPluginDownloadVersions: { "roborock.test.model": 42 },
				},
				productRepository: { userRoles: [] },
			},
		},
	} as unknown as ApkAppPluginDeviceModelContext;

	return {
		dataRoot,
		iot,
		user,
		options: {
			context,
			contract,
			dataDirectory: dataRoot,
			initialState: {
				appState: "active",
				darkMode: {
					storedColorModel: "default",
					systemColorScheme: "light",
					cardStyle: 0,
				},
				localization: {
					language: "de",
					localeIdentifier: "de_DE",
					systemLocaleIdentifier: "de_DE",
					isRTL: false,
					allowRTL: true,
					forceRTL: false,
					doLeftAndRightSwapInRTL: true,
				},
				network: {
					type: "wifi",
					isInternetReachable: true,
					isWifiEnabled: true,
					details: { strength: 100 },
				},
				orientation: {
					current: "PORTRAIT",
					autoRotateEnabled: true,
					device: "PORTRAIT",
				},
				platform: {
					apiLevel: 35,
					serial: "host-serial",
					fingerprint: "host/fingerprint",
					manufacturer: "ioBroker",
					brand: "ioBroker",
					isTesting: true,
					uiMode: "desk",
				},
				safeArea: {
					insets: { top: 0, right: 0, bottom: 0, left: 0 },
					frame: { x: 0, y: 0, width: 1200, height: 800 },
				},
				screenMetrics: {
					width: 1200, height: 800, scale: 1, fontScale: 1, densityDpi: 96,
				},
				windowMetrics: {
					width: 1200, height: 800, scale: 1, fontScale: 1, densityDpi: 96,
				},
			},
			ports: {
				appSys: {
					networkReachable: () => true,
					writeLog: vi.fn(),
				},
				deviceTransport: {
					connectLocalDeviceIfNeeded: () => 1,
					deviceOnline: async () => true,
					loadShadowDps: async () => "{}",
					publishDps: vi.fn(async () => undefined),
				},
				hasActivity: () => true,
				http: {},
				installSkia: () => true,
				intent: {
					initialUrl: () => null,
					canOpenUrl: async () => true,
					openUrl: async () => undefined,
					openApplicationSettings: async () => undefined,
					canSendIntent: async () => true,
					sendIntent: async () => undefined,
				},
				permissions: {
					isBluetoothEnabled: () => true,
					isLocationEnabled: () => true,
					isWifiEnabled: () => true,
				},
				platformServices: {
					androidId: "android-id",
					readClipboardText: async () => "",
					writeClipboardText: async () => undefined,
					invokeDefaultBackPressHandler: vi.fn(),
					showToast: vi.fn(),
					vibrate: vi.fn(),
				},
				rpc: {
					endpoint: "endpoint-1",
					nonce: "nonce-1",
					transport: {
						sendJson: vi.fn(async () => undefined),
						sendProtobuf: vi.fn(async () => undefined),
					},
				},
				sdkEnvironment: {
					loadOtaInfo: async () => null,
					loadAgreementAndPolicy: async () => ({
						privacyProtocol: { version: null, langUrl: null },
						userAgreement: { version: null, langUrl: null },
					}),
					loadPluginAgreements: async () => [],
				},
				emitAnalytics: vi.fn(),
				reportException: vi.fn(),
			},
		},
	};
}

function uiManager(): ApkUiManagerRuntime {
	return {
		restoreDefaultViewProps: vi.fn(),
		synchronouslyUpdateViewOnUiThread: vi.fn(),
	} as unknown as ApkUiManagerRuntime;
}

describe("APK AppPlugin device native runtime environment", () => {
	it("builds one generic module graph from the resolved APK session and explicit host ports", async () => {
		const fixture = options();
		const environment = new ApkAppPluginDeviceNativeRuntimeEnvironment(fixture.options);
		const constants = Object.assign({}, ...environment.constantSources()) as Record<string, unknown>;
		const runtimes = environment.createSharedNativeModules(uiManager());

		expect(constants).toMatchObject({
			PlatformConstants: {
				Model: "Desktop Host",
				Release: "15",
			},
			ReactLocalization: { language: "de" },
			RRPluginSDK: {
				deviceId: "device/with unsafe path",
				deviceModel: "roborock.test.model",
			},
		});
		expect(environment.dataDirectory()).toMatch(new RegExp(
			`^${fixture.dataRoot.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}[/\\\\]devices[/\\\\][a-f0-9]{64}$`,
		));
		expect(environment.dataDirectory()).not.toContain("unsafe path");
		expect(existsSync(path.join(environment.dataDirectory(), "files"))).toBe(true);

		await expect(runtimes.pluginHttp.iotGet("/iot", { id: 1 }, null)).resolves.toBe("iot:GET:/iot");
		await expect(runtimes.pluginHttp.userGet("/user", null, null)).resolves.toBe("user:GET:/user");
		expect(fixture.iot.get).toHaveBeenCalledWith("/iot", { id: 1 });
		expect(fixture.user.get).toHaveBeenCalledWith("/user", null);
		await expect(runtimes.devices.getDeviceListInfo()).resolves.toEqual([
			"{\"duid\":\"device-1\"}",
		]);
		await expect(runtimes.devices.getDeviceMainPluginDownloadVersion("roborock.test.model"))
			.resolves.toBe(42);
		await expect(runtimes.pluginSdkEnvironment.getDeviceExtraInfoForKeyArray([
			"featureSet",
			"nullable",
			"missing",
		])).resolves.toEqual({ featureSet: "123", nullable: "", missing: "" });
		const countryCallback = vi.fn();
		runtimes.pluginSdkEnvironment.getCurrentCountryInfoCallback(countryCallback);
		expect(countryCallback).toHaveBeenCalledWith(true, { countryCode: "de", serverCode: "eu" });

		expect(() => environment.createSharedNativeModules(uiManager())).toThrow(/bereits einen UIManager/u);
		await environment.dispose();
		await environment.dispose();
	});

	it("delivers AppPlugin-originated state events only through its attached Hermes session", async () => {
		const fixture = options();
		const hostErrors: Error[] = [];
		const environment = new ApkAppPluginDeviceNativeRuntimeEnvironment({
			...fixture.options,
			ports: { ...fixture.options.ports, emitHostError: error => hostErrors.push(error) },
		});
		const runtimes = environment.createSharedNativeModules(uiManager());
		const emitDeviceEvent = vi.fn(async () => undefined);
		const composition = {
			session: { emitDeviceEvent },
		} as unknown as ApkAppPluginNativeRuntimeComposition;
		environment.attachComposition(composition);

		await runtimes.localization.setLanguage("en");
		expect(emitDeviceEvent).toHaveBeenCalledWith("langDidChange", "en");
		expect(hostErrors).toEqual([]);
		expect(() => environment.attachComposition({
			session: { emitDeviceEvent },
		} as unknown as ApkAppPluginNativeRuntimeComposition)).toThrow(/bereits an eine Hermes-Sitzung/u);

		await environment.dispose();
		expect(() => environment.createSharedNativeModules(uiManager())).toThrow(/bereits beendet/u);
	});

	it("rejects a relative persistence root before constructing transport runtimes", () => {
		const fixture = options();
		expect(() => new ApkAppPluginDeviceNativeRuntimeEnvironment({
			...fixture.options,
			dataDirectory: "relative/appplugin-data",
		})).toThrow(/muss absolut sein/u);
	});
});
