import { afterEach, describe, expect, it, vi } from "vitest";
import { BaseDeviceFeatures } from "../../src/lib/features/baseDeviceFeatures";
import { DeviceManager } from "../../src/lib/deviceManager";
import { isLegacyVacuumDevice, isLegacyVacuumDuid } from "../../src/lib/legacyDevicePolicy";
import { local_api } from "../../src/lib/localApi";
import { MockAdapter } from "../../src/lib/mock/MockAdapter";
import { mqtt_api } from "../../src/lib/mqttApi";
import { requestsHandler } from "../../src/lib/requestsHandler";

const products = {
	mower: { model: "roborock.mower.a266", category: "roborock.mower" },
	vacuum: { model: "roborock.vacuum.a288", category: "robot.vacuum.cleaner" },
};

function catalog() {
	return {
		getRobotModel: (duid: string) => products[duid as keyof typeof products]?.model ?? null,
		getProductCategory: (duid: string) => products[duid as keyof typeof products]?.category ?? null,
	};
}

afterEach(() => vi.restoreAllMocks());

describe("legacy vacuum device boundary", () => {
	it("uses product class and model evidence, including missing and conflicting product data", () => {
		expect(isLegacyVacuumDevice("roborock.vacuum.a288", "robot.vacuum.cleaner")).toBe(true);
		expect(isLegacyVacuumDevice("roborock.vacuum.new", null)).toBe(true);
		expect(isLegacyVacuumDevice("other.vacuum.new", "roborock.vacuum")).toBe(true);
		expect(isLegacyVacuumDevice("roborock.mower.a266", "roborock.mower")).toBe(false);
		expect(isLegacyVacuumDevice("roborock.mower.a266", "robot.vacuum.cleaner")).toBe(false);
		expect(isLegacyVacuumDevice("roborock.vacuum.a288", "roborock.mower")).toBe(false);
		expect(isLegacyVacuumDevice("unknown.device", null)).toBe(false);
		expect(isLegacyVacuumDevice(null, "robot.vacuum.cleaner")).toBe(false);
		expect(isLegacyVacuumDuid(catalog(), "mower")).toBe(false);
		expect(isLegacyVacuumDuid(catalog(), "vacuum")).toBe(true);
	});

	it.each(["L01", "B01"])("keeps a %s mower visible without creating vacuum features", async (pv) => {
		vi.spyOn(BaseDeviceFeatures.prototype, "initialize").mockResolvedValue(undefined);
		const devices = [
			{ duid: "mower", name: "Mower", online: true, pv },
			{ duid: "vacuum", name: "Vacuum", online: false, pv: "L01" },
		];
		const baseCatalog = catalog();
		const adapter = {
			config: {}, namespace: "roborock.0", log: { warn: vi.fn(), error: vi.fn() },
			rLog: vi.fn(), errorMessage: String,
			http_api: { ...baseCatalog, getDevices: () => devices, productInfo: null },
			getDeviceProtocolVersion: vi.fn(async (duid: string) => devices.find(d => d.duid === duid)?.pv ?? "1.0"),
			extendObject: vi.fn(async () => {}), ensureState: vi.fn(async () => {}), ensureFolder: vi.fn(async () => {}),
			setStateChanged: vi.fn(async () => {}), updateDeviceInfo: vi.fn(async () => {}),
			getDevicesAsync: vi.fn(async () => []),
		};
		const manager = new DeviceManager(adapter as never);
		await manager.initializeDevices();
		expect(manager.deviceFeatureHandlers.has("mower")).toBe(false);
		expect(manager.deviceFeatureHandlers.has("vacuum")).toBe(true);
		expect(adapter.getDeviceProtocolVersion).not.toHaveBeenCalledWith("mower");
		expect(adapter.extendObject).toHaveBeenCalledWith("Devices.mower", expect.objectContaining({ native: { duid: "mower", model: products.mower.model, category: products.mower.category } }));
		expect(adapter.setStateChanged).toHaveBeenCalledWith("Devices.mower.deviceInfo.online", { val: true, ack: true });
		expect(adapter.updateDeviceInfo).not.toHaveBeenCalledWith("mower", devices);
		await manager.initializeDevices();
		expect(adapter.rLog.mock.calls.filter(call => String(call[5]).includes("vacuum control is not supported"))).toHaveLength(1);
	});

	it("drops mower MQTT frames before the vacuum decoder while retaining vacuum frames", async () => {
		const decodeMsg = vi.fn(() => []);
		const adapter = {
			http_api: { ...catalog(), getDevices: () => [{ duid: "mower" }, { duid: "vacuum" }] },
			requestsHandler: { messageParser: { decodeMsg } }, rLog: vi.fn(), setInterval: vi.fn(),
		};
		const mqtt = new mqtt_api(adapter as never);
		let onMessage: ((topic: string, message: Buffer) => Promise<void>) | undefined;
		await mqtt.subscribe_mqtt_message({ on: (_event: string, callback: typeof onMessage) => { onMessage = callback; } });
		await onMessage!("rr/m/o/account/client/mower", Buffer.from("mower"));
		expect(decodeMsg).not.toHaveBeenCalled();
		await onMessage!("rr/m/o/account/client/vacuum", Buffer.from("vacuum"));
		expect(decodeMsg).toHaveBeenCalledOnce();
		expect(decodeMsg).toHaveBeenCalledWith(Buffer.from("vacuum"), "vacuum");
	});

	it("rejects mower endpoints, stale refresh and vacuum RPC egress", async () => {
		const adapter = new MockAdapter() as any;
		adapter.http_api = { ...catalog() };
		adapter.getDeviceProtocolVersion = vi.fn(async () => "L01");
		const local = new local_api(adapter);
		local.initiateClient = vi.fn(async () => {});
		expect(local.updateLocalEndpoint("mower", "10.0.0.8", "L01")).toBe(false);
		expect(local.localDevices.mower).toBeUndefined();
		local.localDevices.mower = { ip: "10.0.0.8", version: "L01" };
		local.localDevices.vacuum = { ip: "10.0.0.9", version: "L01" };
		local.refreshEndpoint = vi.fn(async () => true);
		await local.refreshStaleLocalEndpoints();
		expect(local.refreshEndpoint).toHaveBeenCalledWith("vacuum", "scheduled endpoint refresh");
		expect(local.refreshEndpoint).not.toHaveBeenCalledWith("mower", expect.anything());

		const requests = new requestsHandler(adapter);
		await expect(requests.sendRequest("mower", "get_prop", ["get_status"])).rejects.toThrow("not supported");
		await expect(requests.publishB01Dp("mower", { "102": 1 })).rejects.toThrow("not supported");
		expect(adapter.getDeviceProtocolVersion).not.toHaveBeenCalled();
	});

	it("updates passive mower metadata on a slow tick without interpreting vacuum status keys", async () => {
		let tick: (() => Promise<void>) | undefined;
		const devices = [
			{ duid: "mower", name: "Mower", online: true, pv: "L01", productId: "mower-product", deviceStatus: { "122": 75, "125": 90 } },
			{ duid: "vacuum", name: "Vacuum", online: false, pv: "L01", productId: "vacuum-product", deviceStatus: { "122": 80, "125": 70 } },
		];
		const adapter = {
			config: { updateInterval: 5 }, rLog: vi.fn(), errorMessage: String,
			http_api: { ...catalog(), getDevices: () => devices, updateHomeData: vi.fn(async () => {}) },
			local_api: { refreshStaleLocalEndpoints: vi.fn(async () => {}) },
			setInterval: vi.fn((callback: () => Promise<void>) => { tick = callback; return 1; }),
			getDeviceProtocolVersion: vi.fn(async () => "L01"),
			updateDeviceInfo: vi.fn(async () => {}),
			ensureState: vi.fn(async () => {}), setStateChanged: vi.fn(async () => {}),
		};
		const manager = new DeviceManager(adapter as never);
		manager.deviceFeatureHandlers.set("vacuum", { getCommonConsumable: () => ({ unit: "%" }), getCommonDeviceStates: () => ({ unit: "%" }) } as never);
		manager.startPolling();
		await tick!();
		expect(adapter.setStateChanged).toHaveBeenCalledWith("Devices.mower.deviceInfo.online", { val: true, ack: true });
		expect(adapter.setStateChanged).toHaveBeenCalledWith("Devices.mower.deviceInfo.productId", { val: "mower-product", ack: true });
		expect(adapter.setStateChanged).not.toHaveBeenCalledWith(expect.stringMatching(/^Devices\.mower\.(consumables|deviceStatus)\./), expect.anything());
		expect(adapter.setStateChanged).toHaveBeenCalledWith("Devices.vacuum.deviceStatus.battery", { val: 80, ack: true });
		expect(adapter.setStateChanged).toHaveBeenCalledWith("Devices.vacuum.consumables.main_brush_life", { val: 70, ack: true });
	});

	it("continues updating a vacuum if passive metadata storage fails", async () => {
		let tick: (() => Promise<void>) | undefined;
		const devices = [
			{ duid: "mower", online: true, pv: "L01" },
			{ duid: "vacuum", online: false, pv: "L01" },
		];
		const adapter = {
			config: { updateInterval: 5 }, rLog: vi.fn(), errorMessage: String,
			http_api: { ...catalog(), getDevices: () => devices, updateHomeData: vi.fn(async () => {}) },
			local_api: { refreshStaleLocalEndpoints: vi.fn(async () => {}) },
			setInterval: vi.fn((callback: () => Promise<void>) => { tick = callback; return 1; }),
			updateDeviceInfo: vi.fn(async () => {}),
			setStateChanged: vi.fn(async () => {}),
			ensureState: vi.fn(async (path: string) => { if (path.startsWith("Devices.mower.")) throw new Error("storage unavailable"); }),
		};
		const manager = new DeviceManager(adapter as never);
		manager.deviceFeatureHandlers.set("vacuum", {} as never);
		manager.startPolling();
		await tick!();
		expect(adapter.updateDeviceInfo).toHaveBeenCalledWith("vacuum", devices);
		expect(adapter.rLog).toHaveBeenCalledWith("System", "mower", "Warn", undefined, undefined, expect.stringContaining("Failed to update passive device info"), "warn");
	});

	it("rechecks the device class when a queued vacuum request reaches transport", async () => {
		const adapter = new MockAdapter() as any;
		let category = "robot.vacuum.cleaner";
		adapter.http_api = {
			getRobotModel: () => "roborock.vacuum.a288",
			getProductCategory: () => category,
		};
		adapter.getDeviceProtocolVersion = vi.fn(async () => "L01");
		const requests = new requestsHandler(adapter);
		const buildPayload = vi.spyOn(requests.messageParser, "buildPayload");
		(requests as any).globalManager.add = vi.fn(async (_id: string, task: (signal: AbortSignal) => Promise<unknown>) => {
			category = "roborock.mower";
			return task(new AbortController().signal);
		});
		await expect(requests.sendRequest("vacuum", "get_prop", ["get_status"])).rejects.toThrow("not supported");
		expect(buildPayload).not.toHaveBeenCalled();
	});
});
