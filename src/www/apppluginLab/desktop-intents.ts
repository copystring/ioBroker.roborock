export type AppPluginDesktopIntentName =
	| "clean.start"
	| "clean.pause"
	| "clean.dock"
	| "clean.locate"
	| "dock.empty"
	| "dock.wash"
	| "dock.dry"
	| "map.selection.clear"
	| "map.tool.change"
	| "navigation.open"
	| "language.change"
	| "clean.setting.change"
	| "schedule.toggle"
	| "history.open"
	| "device.setting.change";

export interface AppPluginDesktopIntent {
	name: AppPluginDesktopIntentName;
	arguments?: Record<string, unknown>;
}

export interface AppPluginOfflineEnvelope {
	schemaVersion: 1;
	source: "desktop-smarthome-shell";
	delivery: "offline-preview";
	target: "desktop-appplugin-host-adapter";
	intent: AppPluginDesktopIntent;
	bundleBoundary: {
		methodAndParametersResolvedBy: "unchanged-appplugin-bundle";
		nativeCallsObservedAt: readonly ["RRPluginSDK.callMethod", "RRPluginDevice.publishDps"];
	};
	sent: false;
}

export function createOfflineAppPluginEnvelope(intent: AppPluginDesktopIntent): AppPluginOfflineEnvelope {
	return {
		schemaVersion: 1,
		source: "desktop-smarthome-shell",
		delivery: "offline-preview",
		target: "desktop-appplugin-host-adapter",
		intent,
		bundleBoundary: {
			methodAndParametersResolvedBy: "unchanged-appplugin-bundle",
			nativeCallsObservedAt: ["RRPluginSDK.callMethod", "RRPluginDevice.publishDps"],
		},
		sent: false,
	};
}
