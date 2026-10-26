import { describe, expect, it, vi } from "vitest";

vi.mock("@iobroker/adapter-core", () => ({
	Adapter: class MockAdapter {}
}));

vi.mock("go2rtc-static", () => ({
	default: ""
}));

describe("startup state subscriptions", () => {
	it("subscribes to floor load buttons", async () => {
		const { Roborock } = await import("../../src/main");
		const subscribeStatesAsync = vi.fn().mockResolvedValue(undefined);
		const adapter = Object.assign(Object.create(Roborock.prototype), {
			config: {
				username: "test@example.com",
				enable_map_creation: false,
				updateInterval: 30,
				region: "eu",
				loginMethod: "password",
				map_theme: "default"
			},
			translationManager: { init: vi.fn() },
			getPluginInstance: vi.fn().mockReturnValue(undefined),
			loadAdminTranslations: vi.fn().mockReturnValue({}),
			getSceneExecutionMode: vi.fn().mockReturnValue("local"),
			rLog: vi.fn(),
			setupBasicObjects: vi.fn().mockResolvedValue(undefined),
			ensureClientID: vi.fn().mockResolvedValue("client-id"),
			http_api: {
				init: vi.fn().mockResolvedValue(undefined),
				updateHomeData: vi.fn().mockResolvedValue(undefined),
				getDevices: vi.fn().mockReturnValue([])
			},
			downloadAssetsForAccountModels: vi.fn().mockResolvedValue(undefined),
			local_api: {
				startUdpDiscovery: vi.fn().mockResolvedValue(undefined),
				startTcpKeepaliveInterval: vi.fn()
			},
			mqtt_api: { init: vi.fn().mockResolvedValue(undefined) },
			delay: vi.fn().mockResolvedValue(undefined),
			deviceManager: {
				initializeDevices: vi.fn().mockResolvedValue(undefined),
				startPolling: vi.fn()
			},
			deviceFeatureHandlers: new Map(),
			processScenes: vi.fn().mockResolvedValue(undefined),
			start_go2rtc: vi.fn().mockResolvedValue(undefined),
			subscribeStatesAsync,
			resumeSceneQueues: vi.fn().mockResolvedValue(undefined),
			setInterval: vi.fn(),
			catchError: vi.fn(),
			errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
			isInitializing: true
		});

		await adapter.onReady();

		expect(subscribeStatesAsync).toHaveBeenCalledWith("Devices.*.floors.*.load");
		expect(adapter.catchError).not.toHaveBeenCalled();
		expect(adapter.isInitializing).toBe(false);
	}, 10000);
});
