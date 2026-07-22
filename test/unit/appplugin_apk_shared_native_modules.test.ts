import { describe, expect, it, vi } from "vitest";

import {
	createApkAppPluginSharedNativeModuleBindings,
	type ApkAppPluginSharedNativeModuleRuntimes,
} from "../../src/apppluginHost/apkAppPluginSharedNativeModules";

function runtimes(): {
	readonly modules: ApkAppPluginSharedNativeModuleRuntimes;
	readonly onLanguageChanged: ReturnType<typeof vi.fn>;
	readonly platformServices: {
		readonly getString: ReturnType<typeof vi.fn>;
		readonly setString: ReturnType<typeof vi.fn>;
	};
} {
	let language = "de";
	const onLanguageChanged = vi.fn();
	const platformServices = {
		cancel: vi.fn(),
		getAndroidID: vi.fn(() => "android-id"),
		getString: vi.fn(async () => "Küche"),
		invokeDefaultBackPressHandler: vi.fn(),
		setString: vi.fn(async () => undefined),
		show: vi.fn(),
		showWithGravity: vi.fn(),
		showWithGravityAndOffset: vi.fn(),
		vibrate: vi.fn(),
		vibrateByPattern: vi.fn(),
	};
	return {
		modules: {
			appState: { getCurrentAppState: vi.fn() },
			appSys: { log: vi.fn() },
			appearance: { getColorScheme: vi.fn() },
			asyncStorage: { multiGet: vi.fn() },
			darkMode: { getColorScheme: vi.fn() },
			deviceFirmware: { checkProgress: vi.fn() },
			devices: { getDeviceListInfo: vi.fn() },
			exceptionsManager: { reportException: vi.fn() },
			gestureHandler: { install: vi.fn() },
			i18nManager: {
				allowRTL: vi.fn(),
				forceRTL: vi.fn(),
				swapLeftAndRightInRTL: vi.fn(),
			},
			intent: { openURL: vi.fn() },
			localization: {
				getLanguage: vi.fn((callback: (...arguments_: unknown[]) => void) =>
					callback(0, language)),
				setLanguage: vi.fn(async (nextLanguage: string) => {
					language = nextLanguage;
					return true;
				}),
				snapshot: vi.fn(() => ({ language })),
			},
			nativeAnimated: { createAnimatedNode: vi.fn() },
			netInfo: { getCurrentState: vi.fn() },
			orientation: { getOrientation: vi.fn() },
			platformServices,
			pluginAnalytics: { analyticsMethod: vi.fn() },
			pluginDevice: { loadDps: vi.fn() },
			pluginHttp: { iotGet: vi.fn() },
			pluginPermissions: { checkPermission: vi.fn() },
			pluginSdkEnvironment: { environmentMethod: vi.fn() },
			pluginSdkPreferences: { preferencesMethod: vi.fn() },
			pluginSdkRpc: { callMethod: vi.fn() },
			skiaModule: { install: vi.fn(() => true) },
			soundManager: { playTouchSound: vi.fn() },
			statusBar: { setStyle: vi.fn() },
			timing: { createTimer: vi.fn() },
			onLanguageChanged,
		} as unknown as ApkAppPluginSharedNativeModuleRuntimes,
		onLanguageChanged,
		platformServices,
	};
}

describe("APK AppPlugin shared native modules", () => {
	it("binds the APK-level shared module set without device-model branches", () => {
		const fixture = runtimes();
		const bindings = createApkAppPluginSharedNativeModuleBindings(fixture.modules);

		expect(bindings.map(binding => binding.moduleName)).toEqual([
			"DeviceInfo",
			"FrescoModule",
			"RNCSafeAreaContext",
			"RNSModule",
			"SourceCode",
			"Clipboard",
			"DeviceEventManager",
			"IntentAndroid",
			"PlatformConstants",
			"ToastAndroid",
			"Vibration",
			"RNCAsyncStorage",
			"NativeAnimatedModule",
			"I18nManager",
			"RRAppSysTurboModule",
			"Appearance",
			"RNSkiaModule",
			"RNGestureHandlerModule",
			"Orientation",
			"RRPluginSDK",
			"RRDevicesModule",
			"RRPluginHttpTurboModule",
			"RRPluginPermissions",
			"RRPluginDarkMode",
			"RNCNetInfo",
			"RRPluginDevice",
			"RRPluginDeviceFirmware",
			"SoundManager",
			"StatusBarManager",
			"AppState",
			"Timing",
			"ReactLocalization",
			"ExceptionsManager",
		]);
		expect(Object.isFrozen(bindings)).toBe(true);
	});

	it("adapts platform, combined SDK and localization behavior centrally", async () => {
		const fixture = runtimes();
		const bindings = createApkAppPluginSharedNativeModuleBindings(fixture.modules);
		const byName = new Map(bindings.map(binding => [binding.moduleName, binding.implementation]));

		expect(await Reflect.apply(
			byName.get("Clipboard")!.getString as (...arguments_: unknown[]) => unknown,
			byName.get("Clipboard"),
			[],
		)).toBe("Küche");
		expect(fixture.platformServices.getString).toHaveBeenCalledOnce();
		expect(byName.get("RRPluginSDK")).toEqual(expect.objectContaining({
			analyticsMethod: expect.any(Function),
			callMethod: expect.any(Function),
			environmentMethod: expect.any(Function),
			preferencesMethod: expect.any(Function),
		}));

		const localization = byName.get("ReactLocalization")!;
		await Reflect.apply(
			localization.setLanguage as (...arguments_: unknown[]) => unknown,
			localization,
			["en"],
		);
		expect(fixture.onLanguageChanged).toHaveBeenCalledWith("de", "en");
	});
});
