import { describe, expect, it, vi } from "vitest";
import { DeviceManager } from "../../src/lib/deviceManager";

describe("device online state sync from HomeData", () => {
	it("writes HomeData battery but not stale Q7 consumables on slow ticks before skipping polling", async () => {
		let tick: (() => Promise<void>) | undefined;

		const handler = {
			b01Variant: "Q7",
			updateStatus: vi.fn().mockResolvedValue(undefined),
			updateMap: vi.fn().mockResolvedValue(undefined),
			updateCleanSummary: vi.fn().mockResolvedValue(undefined),
			getCommonConsumable: vi.fn((id: string) => ({ type: "number", unit: "%", name: id })),
			getCommonDeviceStates: vi.fn((id: string) => ({ type: "number", unit: "%", name: id })),
		};

		const devices = [{
			duid: "duid-1",
			online: false,
			deviceStatus: {
				"122": 100,
				"125": 98,
				"126": 4294967249,
				"127": 97,
			},
		}];

		const adapter = {
			config: { updateInterval: 5 },
			rLog: vi.fn(),
			http_api: {
				updateHomeData: vi.fn().mockResolvedValue(undefined),
				getDevices: () => devices,
			},
			updateDeviceInfo: vi.fn().mockResolvedValue(undefined),
			getDeviceProtocolVersion: vi.fn().mockResolvedValue("B01"),
			catchError: vi.fn(),
			ensureState: vi.fn().mockResolvedValue(undefined),
			setStateChanged: vi.fn().mockResolvedValue(undefined),
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
		expect(adapter.updateDeviceInfo).toHaveBeenCalledWith("duid-1", devices);
		expect(adapter.setStateChanged).toHaveBeenCalledWith("Devices.duid-1.deviceStatus.battery", { val: 100, ack: true });
		expect(adapter.setStateChanged).not.toHaveBeenCalledWith("Devices.duid-1.consumables.side_brush_life", expect.anything());
		expect(adapter.setStateChanged).not.toHaveBeenCalledWith("Devices.duid-1.consumables.filter_life", expect.anything());
		expect(adapter.setStateChanged).not.toHaveBeenCalledWith("Devices.duid-1.consumables.main_brush_life", expect.anything());
		expect(adapter.setStateChanged).toHaveBeenCalledTimes(1);
		expect(handler.updateStatus).not.toHaveBeenCalled();
	});

	it("ignores textual and out-of-range HomeData status attributes because only valid numeric percentages are mapped", async () => {
		const handler = {
			b01Variant: "Q10",
			getCommonConsumable: vi.fn((id: string) => ({ type: "number", unit: "%", name: id })),
			getCommonDeviceStates: vi.fn((id: string) => ({ type: "number", unit: "%", name: id })),
		};
		const devices = [{
			duid: "duid-1",
			online: true,
			deviceStatus: {
				main_brush_life: "91",
				side_brush_life: 72,
				filter_life: "65%",
				ignored_life: 12,
				"122": 101,
				"125": 91,
				"126": 4294967249,
				"127": 101,
			},
		}];

		const adapter = {
			config: { updateInterval: 5 },
			http_api: {
				getDevices: () => devices,
			},
			ensureState: vi.fn().mockResolvedValue(undefined),
			setStateChanged: vi.fn().mockResolvedValue(undefined),
		};

		const manager = new DeviceManager(adapter as any);
		manager.deviceFeatureHandlers.set("duid-1", handler as any);

		await manager.updateHomeDataDeviceStatus("duid-1");

		expect(adapter.setStateChanged).toHaveBeenCalledWith("Devices.duid-1.consumables.main_brush_life", { val: 91, ack: true });
		expect(adapter.setStateChanged).toHaveBeenCalledTimes(1);
	});
});
