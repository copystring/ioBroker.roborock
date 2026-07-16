import { describe, expect, it, vi } from "vitest";

import { ApkAppStateRuntime } from "../../src/apppluginHost/apkAppStateRuntime";
import { ApkPluginDeviceRuntime } from "../../src/apppluginHost/apkPluginDeviceRuntime";

describe("APK AppState and RRPluginDevice environment", () => {
	it("returns the React Native AppState callback map and constants", () => {
		const runtime = new ApkAppStateRuntime({ initialState: "active" });
		const success = vi.fn();
		runtime.getCurrentAppState(success, vi.fn());
		expect(success).toHaveBeenCalledWith({ app_state: "active" });
		expect(runtime.constants()).toEqual({ initialAppState: "active" });
	});

	it("delegates shadow loading and DPS publication to the injected transport", async () => {
		const transport = {
			loadShadowDps: vi.fn(async () => "{\"101\":{}}"),
			publishDps: vi.fn(async () => undefined),
		};
		const runtime = new ApkPluginDeviceRuntime({ hasActivity: () => true, transport });
		expect(await runtime.loadDps()).toBe("{\"101\":{}}" );
		const callback = vi.fn();
		runtime.publishDps({ 101: { 6: 0 } }, callback);
		await vi.waitFor(() => expect(callback).toHaveBeenCalledWith(true));
		expect(transport.publishDps).toHaveBeenCalledWith({ 101: { 6: 0 } });
	});

	it("matches APK activity-null callback behavior", async () => {
		const runtime = new ApkPluginDeviceRuntime({
			hasActivity: () => false,
			transport: {
				loadShadowDps: async () => null,
				publishDps: async () => undefined,
			},
		});
		await expect(runtime.loadDps()).rejects.toThrow("activity is null");
		const callback = vi.fn();
		runtime.publishDps({}, callback);
		expect(callback).toHaveBeenCalledWith(false, { error: "null" });
	});
});
