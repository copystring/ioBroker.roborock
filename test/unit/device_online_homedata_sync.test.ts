import { describe, expect, it, vi } from "vitest";
import { DeviceManager } from "../../src/lib/deviceManager";

describe("device online state sync from HomeData", () => {
	it("writes HomeData for offline devices on slow ticks before skipping polling", async () => {
		let tick: (() => Promise<void>) | undefined;

		const handler = {
			updateStatus: vi.fn().mockResolvedValue(undefined),
			updateMap: vi.fn().mockResolvedValue(undefined),
			updateCleanSummary: vi.fn().mockResolvedValue(undefined),
		};

		const adapter = {
			config: { updateInterval: 5 },
			rLog: vi.fn(),
			http_api: {
				updateHomeData: vi.fn().mockResolvedValue(undefined),
				getDevices: () => [{ duid: "duid-1", online: false }],
			},
			updateDeviceInfo: vi.fn().mockResolvedValue(undefined),
			getDeviceProtocolVersion: vi.fn().mockResolvedValue("1.0"),
			catchError: vi.fn(),
			setInterval: vi.fn((callback: () => Promise<void>) => {
				tick = callback;
				return 1 as any;
			}),
			clearInterval: vi.fn(),
			getStateAsync: vi.fn().mockResolvedValue({ val: 0 }),
		};

		const manager = new DeviceManager(adapter as any);
		manager.deviceFeatureHandlers.set("duid-1", handler as any);
		manager.startPolling();

		expect(tick).toBeDefined();

		await tick!();

		expect(adapter.http_api.updateHomeData).toHaveBeenCalledTimes(1);
		expect(adapter.updateDeviceInfo).toHaveBeenCalledWith("duid-1", [{ duid: "duid-1", online: false }]);
		expect(handler.updateStatus).not.toHaveBeenCalled();
	});
});
