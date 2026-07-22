import type { ApkAppStateRuntime } from "./apkAppStateRuntime";
import type { ApkAppSysRuntime } from "./apkAppSysRuntime";
import type { ApkAppearanceRuntime } from "./apkAppearanceRuntime";
import type { ApkAsyncStorageRuntime } from "./apkAsyncStorageRuntime";
import type { ApkDarkModeRuntime } from "./apkDarkModeRuntime";
import type { ApkDeviceFirmwareRuntime } from "./apkDeviceFirmwareRuntime";
import type { ApkDevicesRuntime } from "./apkDevicesRuntime";
import type { ApkGestureHandlerRuntime } from "./apkGestureHandlerRuntime";
import type { ApkI18nManagerRuntime } from "./apkI18nManagerRuntime";
import type { ApkIntentRuntime } from "./apkIntentRuntime";
import type { ApkLocalizationRuntime } from "./apkLocalizationRuntime";
import type { ApkNativeAnimatedRuntime } from "./apkNativeAnimatedRuntime";
import type { ApkNetInfoRuntime } from "./apkNetInfoRuntime";
import type { ApkOrientationRuntime } from "./apkOrientationRuntime";
import {
	ApkNativeModuleBindingBuilder,
	type ApkNativeModuleBinding,
} from "./apkAppPluginNativeRuntimeComposition";
import { composeApkNativeModuleImplementation } from "./apkNativeModuleComposition";
import type { ApkPlatformServicesRuntime } from "./apkPlatformServicesRuntime";
import type { ApkPluginAnalyticsRuntime } from "./apkPluginAnalyticsRuntime";
import type { ApkPluginDeviceRuntime } from "./apkPluginDeviceRuntime";
import type { ApkPluginHttpRuntime } from "./apkPluginHttpRuntime";
import type { ApkPluginPermissionsRuntime } from "./apkPluginPermissionsRuntime";
import type { ApkPluginSdkEnvironmentRuntime } from "./apkPluginSdkEnvironmentRuntime";
import type { ApkPluginSdkPreferencesRuntime } from "./apkPluginSdkPreferencesRuntime";
import type { ApkPluginSdkRpcModule } from "./apkPluginSdkRpcModule";
import type { ApkSoundManagerRuntime } from "./apkSoundManagerRuntime";
import type { ApkStatusBarRuntime } from "./apkStatusBarRuntime";
import type { ApkTimingRuntime } from "./apkTimingRuntime";
import type { ApkNativeModuleImplementation } from "./strictNativeModuleRegistry";

export interface ApkAppPluginSharedNativeModuleRuntimes {
	readonly appState: ApkAppStateRuntime;
	readonly appSys: ApkAppSysRuntime;
	readonly appearance: ApkAppearanceRuntime;
	readonly asyncStorage: ApkAsyncStorageRuntime;
	readonly darkMode: ApkDarkModeRuntime;
	readonly deviceFirmware: ApkDeviceFirmwareRuntime;
	readonly devices: ApkDevicesRuntime;
	readonly exceptionsManager: ApkNativeModuleImplementation;
	readonly gestureHandler: ApkGestureHandlerRuntime;
	readonly i18nManager: ApkI18nManagerRuntime;
	readonly intent: ApkIntentRuntime;
	readonly localization: ApkLocalizationRuntime;
	readonly nativeAnimated: ApkNativeAnimatedRuntime;
	readonly netInfo: ApkNetInfoRuntime;
	readonly orientation: ApkOrientationRuntime;
	readonly platformServices: ApkPlatformServicesRuntime;
	readonly pluginAnalytics: ApkPluginAnalyticsRuntime;
	readonly pluginDevice: ApkPluginDeviceRuntime;
	readonly pluginHttp: ApkPluginHttpRuntime;
	readonly pluginPermissions: ApkPluginPermissionsRuntime;
	readonly pluginSdkEnvironment: ApkPluginSdkEnvironmentRuntime;
	readonly pluginSdkPreferences: ApkPluginSdkPreferencesRuntime;
	readonly pluginSdkRpc: ApkPluginSdkRpcModule;
	readonly skiaModule: ApkNativeModuleImplementation;
	readonly soundManager: ApkSoundManagerRuntime;
	readonly statusBar: ApkStatusBarRuntime;
	readonly timing: ApkTimingRuntime;
	readonly onLanguageChanged?: (previousLanguage: string, nextLanguage: string) => void;
}

function implementation(runtime: object): ApkNativeModuleImplementation {
	return runtime as ApkNativeModuleImplementation;
}

/**
 * APK-derived module-name composition shared by probes and productive model
 * runtimes. Device classes and AppPlugin bundles cannot alter this host-level
 * mapping; only the platform and transport implementations are injected.
 */
export function createApkAppPluginSharedNativeModuleBindings(
	runtimes: Readonly<ApkAppPluginSharedNativeModuleRuntimes>,
): readonly Readonly<ApkNativeModuleBinding>[] {
	const bindings = new ApkNativeModuleBindingBuilder();
	for (const moduleName of [
		"DeviceInfo",
		"FrescoModule",
		"RNCSafeAreaContext",
		"RNSModule",
		"SourceCode",
	] as const) {
		bindings.register(moduleName, {});
	}
	bindings.register("Clipboard", {
		getString: () => runtimes.platformServices.getString(),
		setString: (value: string) => runtimes.platformServices.setString(value),
	});
	bindings.register("DeviceEventManager", {
		invokeDefaultBackPressHandler: () =>
			runtimes.platformServices.invokeDefaultBackPressHandler(),
	});
	bindings.register("IntentAndroid", implementation(runtimes.intent));
	bindings.register("PlatformConstants", {
		getAndroidID: () => runtimes.platformServices.getAndroidID(),
	});
	bindings.register("ToastAndroid", {
		show: (message: string, duration: number) =>
			runtimes.platformServices.show(message, duration),
		showWithGravity: (message: string, duration: number, gravity: number) =>
			runtimes.platformServices.showWithGravity(message, duration, gravity),
		showWithGravityAndOffset: (
			message: string,
			duration: number,
			gravity: number,
			xOffset: number,
			yOffset: number,
		) => runtimes.platformServices.showWithGravityAndOffset(
			message,
			duration,
			gravity,
			xOffset,
			yOffset,
		),
	});
	bindings.register("Vibration", {
		cancel: () => runtimes.platformServices.cancel(),
		vibrate: (duration: number) => runtimes.platformServices.vibrate(duration),
		vibrateByPattern: (pattern: readonly unknown[], repeat: number) =>
			runtimes.platformServices.vibrateByPattern(pattern, repeat),
	});
	bindings.register("RNCAsyncStorage", implementation(runtimes.asyncStorage));
	bindings.register("NativeAnimatedModule", implementation(runtimes.nativeAnimated));
	bindings.register("I18nManager", {
		allowRTL: runtimes.i18nManager.allowRTL,
		forceRTL: runtimes.i18nManager.forceRTL,
		swapLeftAndRightInRTL: runtimes.i18nManager.swapLeftAndRightInRTL,
	});
	bindings.register("RRAppSysTurboModule", implementation(runtimes.appSys));
	bindings.register("Appearance", implementation(runtimes.appearance));
	bindings.register("RNSkiaModule", runtimes.skiaModule);
	bindings.register("RNGestureHandlerModule", implementation(runtimes.gestureHandler));
	bindings.register("Orientation", implementation(runtimes.orientation));
	bindings.register("RRPluginSDK", composeApkNativeModuleImplementation(
		runtimes.pluginAnalytics,
		runtimes.pluginSdkEnvironment,
		runtimes.pluginSdkPreferences,
		runtimes.pluginSdkRpc,
	));
	bindings.register("RRDevicesModule", implementation(runtimes.devices));
	bindings.register("RRPluginHttpTurboModule", implementation(runtimes.pluginHttp));
	bindings.register("RRPluginPermissions", implementation(runtimes.pluginPermissions));
	bindings.register("RRPluginDarkMode", implementation(runtimes.darkMode));
	bindings.register("RNCNetInfo", implementation(runtimes.netInfo));
	bindings.register("RRPluginDevice", implementation(runtimes.pluginDevice));
	bindings.register("RRPluginDeviceFirmware", implementation(runtimes.deviceFirmware));
	bindings.register("SoundManager", implementation(runtimes.soundManager));
	bindings.register("StatusBarManager", implementation(runtimes.statusBar));
	bindings.register("AppState", implementation(runtimes.appState));
	bindings.register("Timing", implementation(runtimes.timing));
	bindings.register("ReactLocalization", {
		getLanguage: (callback: (...arguments_: unknown[]) => void) =>
			runtimes.localization.getLanguage(callback),
		setLanguage: async (nextLanguage: string) => {
			const previousLanguage = runtimes.localization.snapshot().language;
			const result = await runtimes.localization.setLanguage(nextLanguage);
			if (previousLanguage !== nextLanguage) {
				runtimes.onLanguageChanged?.(previousLanguage, nextLanguage);
			}
			return result;
		},
	});
	bindings.register("ExceptionsManager", runtimes.exceptionsManager);
	return bindings.bindings();
}
