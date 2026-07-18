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
			connectLocalDeviceIfNeeded: vi.fn(() => 1),
			deviceOnline: vi.fn(async () => true),
			loadShadowDps: vi.fn(async () => "{\"101\":{}}"),
			publishDps: vi.fn(async () => undefined),
		};
		const runtime = new ApkPluginDeviceRuntime({ hasActivity: () => true, transport });
		expect(await runtime.loadDps()).toBe("{\"101\":{}}" );
		const callback = vi.fn();
		runtime.publishDps({ 101: { 6: 0 } }, callback);
		await vi.waitFor(() => expect(callback).toHaveBeenCalledWith(true));
		expect(transport.publishDps).toHaveBeenCalledWith({ 101: { 6: 0 } });
		const connectCallback = vi.fn();
		runtime.connectDeviceByLANIfNeeded(5, connectCallback);
		expect(connectCallback).toHaveBeenCalledWith(1);
		expect(await runtime.getDeviceOnlineStatus()).toBe(true);
	});

	it("matches APK activity-null callback behavior", async () => {
		const runtime = new ApkPluginDeviceRuntime({
			hasActivity: () => false,
			transport: {
				connectLocalDeviceIfNeeded: () => 0,
				deviceOnline: async () => false,
				loadShadowDps: async () => null,
				publishDps: async () => undefined,
			},
		});
		await expect(runtime.loadDps()).rejects.toThrow("activity is null");
		const callback = vi.fn();
		runtime.publishDps({}, callback);
		expect(callback).toHaveBeenCalledWith(false, { error: "null" });
		const connectCallback = vi.fn();
		runtime.connectDeviceByLANIfNeeded(0, connectCallback);
		expect(connectCallback).toHaveBeenCalledWith(0);
	});

	it("retries LAN connection once after the APK timeout when the first attempt is not connected", () => {
		vi.useFakeTimers();
		try {
			const connectLocalDeviceIfNeeded = vi.fn()
				.mockReturnValueOnce(0)
				.mockReturnValueOnce(1);
			const runtime = new ApkPluginDeviceRuntime({
				hasActivity: () => true,
				transport: {
					connectLocalDeviceIfNeeded,
					deviceOnline: async () => true,
					loadShadowDps: async () => null,
					publishDps: async () => undefined,
				},
			});
			const callback = vi.fn();
			runtime.connectDeviceByLANIfNeeded(2, callback);
			expect(callback).not.toHaveBeenCalled();
			vi.advanceTimersByTime(1_999);
			expect(callback).not.toHaveBeenCalled();
			vi.advanceTimersByTime(1);
			expect(callback).toHaveBeenCalledWith(1);
			expect(connectLocalDeviceIfNeeded).toHaveBeenCalledTimes(2);
		} finally {
			vi.useRealTimers();
		}
	});
});
