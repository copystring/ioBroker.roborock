import { afterEach, describe, expect, it, vi } from "vitest";
import { BaseDeviceFeatures } from "../../src/lib/features/baseDeviceFeatures";
import { DeviceManager } from "../../src/lib/deviceManager";
import { messageParser } from "../../src/lib/messageParser";
import { MockAdapter } from "../../src/lib/mock/MockAdapter";
import { mqtt_api } from "../../src/lib/mqttApi";

vi.mock("@iobroker/adapter-core", () => ({ Adapter: class MockIoBrokerAdapter {} }));
vi.mock("go2rtc-static", () => ({ default: "" }));

const localKey = "0011223344556677";

async function setup() {
	const { Roborock } = await import("../../src/main");
	const adapter = new MockAdapter() as any;
	const devices = [
		{ duid: "mower", name: "S108", online: true, pv: "L01", productId: "mower-product" },
		{ duid: "vacuum", name: "Vacuum", online: false, pv: "L01", productId: "vacuum-product" },
	];
	let mowerCategory = "roborock.mower";
	adapter.http_api = {
		getDevices: () => devices,
		getRobotModel: (duid: string) => duid === "mower" ? "roborock.mower.a266" : "roborock.vacuum.a288",
		getProductCategory: (duid: string) => duid === "mower" ? mowerCategory : "robot.vacuum.cleaner",
		getMatchedLocalKeys: () => new Map([["mower", localKey], ["vacuum", localKey]]),
		get_rriot: () => ({ u: "account" }),
		productInfo: null,
	};
	adapter.ensureFolder = async (id: string) => { adapter.objects[id] = { type: "folder" }; };
	adapter.getObjectAsync = async (id: string) => adapter.objects[id.replace(/^roborock\.0\./, "")] ?? null;
	adapter.getDevicesAsync = async () => [];
	adapter.updateDeviceInfo = vi.fn(async () => {});
	adapter.getDeviceProtocolVersion = vi.fn(async () => "L01");
	adapter.catchError = vi.fn();
	adapter.requestsHandler = { messageParser: new messageParser(adapter) };
	adapter.mqtt_api = new mqtt_api(adapter);
	adapter.mqtt_api.connected = true;
	const published: Array<{ topic: string; frame: Buffer }> = [];
	let onMessage: ((topic: string, frame: Buffer) => Promise<void>) | undefined;
	adapter.mqtt_api.client = {
		publish: (topic: string, frame: Buffer) => { published.push({ topic, frame }); },
		on: (event: string, callback: typeof onMessage) => { if (event === "message") onMessage = callback; },
	};
	adapter.mqtt_api.mqttUser = "client";
	await adapter.mqtt_api.subscribe_mqtt_message(adapter.mqtt_api.client);
	adapter.deviceManager = new DeviceManager(adapter);
	adapter.mowerRuntime = adapter.deviceManager.mowerRuntime;
	adapter.deviceFeatureHandlers = adapter.deviceManager.deviceFeatureHandlers;
	vi.spyOn(BaseDeviceFeatures.prototype, "initialize").mockResolvedValue(undefined);
	await adapter.deviceManager.initializeDevices();
	return {
		adapter, devices, published,
		setMowerCategory: (category: string) => { mowerCategory = category; },
		onMessage: async (frame: Buffer) => { if (!onMessage) throw new Error("MQTT callback missing"); await onMessage("rr/m/o/account/client/mower", frame); },
		onStateChange: async (command: string) => Roborock.prototype.onStateChange.call(adapter, `roborock.0.Devices.mower.mowerCommands.${command}`, { val: true, ack: false } as ioBroker.State),
	};
}

afterEach(() => vi.restoreAllMocks());

describe("S108 mower runtime integration", () => {
	it("discovers separate mower states, sends an encrypted button frame and applies only a later status push", async () => {
		const fixture = await setup();
		const { adapter, published, onMessage, onStateChange } = fixture;
		try {
			expect(adapter.mowerRuntime.isRegistered("mower")).toBe(true);
			expect(adapter.deviceFeatureHandlers.has("mower")).toBe(false);
			expect(adapter.deviceFeatureHandlers.has("vacuum")).toBe(true);
			for (const command of ["start", "pause", "resume", "stop", "charge", "refresh"]) {
				expect(adapter.objects[`Devices.mower.mowerCommands.${command}`]).toMatchObject({ common: { role: "button", write: true } });
			}
			expect(Object.keys(adapter.objects).filter(id => id.startsWith("Devices.mower.consumables."))).toEqual([]);

			const command = onStateChange("start");
			await vi.waitFor(() => expect(published).toHaveLength(1));
			expect(published[0].topic).toBe("rr/m/i/account/client/mower");
			const [outgoing] = adapter.requestsHandler.messageParser.decodeMsg(published[0].frame, "mower");
			expect(outgoing.version).toBe("1.0");
			expect(outgoing.protocol).toBe(101);
			const request = JSON.parse(JSON.parse(outgoing.payload.toString("utf8")).dps["101"]);
			expect(request.method).toBe("remote_pb");
			const ack = await adapter.requestsHandler.messageParser.buildRoborockMessage("mower", 102, Math.floor(Date.now() / 1000), JSON.stringify({ dps: { "102": JSON.stringify({ id: request.id, result: "ok" }) } }), "1.0");
			if (!ack) throw new Error("Could not encode ACK fixture");
			await onMessage(ack);
			await command;
			expect(adapter.states["Devices.mower.mowerStatus.battery"]).toBeUndefined();

			const status = await adapter.requestsHandler.messageParser.buildRoborockMessage("mower", 702, Math.floor(Date.now() / 1000), Buffer.from("50422a0a087b10266a040a021055", "hex"), "1.0");
			if (!status) throw new Error("Could not encode status fixture");
			await onMessage(status);
			expect(adapter.states["Devices.mower.mowerStatus.battery"]).toBe(85);
			expect(adapter.states["Devices.mower.mowerStatus.messageId"]).toBe("123");
			expect(adapter.states["Devices.mower.deviceStatus.battery"]).toBeUndefined();
		} finally { adapter.mowerRuntime.stop(); }
	});

	it("prevents stale or offline commands and cancels an in-flight request on shutdown", async () => {
		const fixture = await setup();
		const { adapter, devices, published, onMessage, onStateChange, setMowerCategory } = fixture;
		try {
			devices[0].online = false;
			await adapter.mowerRuntime.syncDevice(devices[0]);
			await onStateChange("pause");
			expect(published).toHaveLength(0);
			devices[0].online = true;
			setMowerCategory("robot.vacuum.cleaner");
			await adapter.mowerRuntime.syncDevice(devices[0]);
			await onStateChange("pause");
			expect(adapter.mowerRuntime.isRegistered("mower")).toBe(false);
			expect(published).toHaveLength(0);
			const staleStatus = await adapter.requestsHandler.messageParser.buildRoborockMessage("mower", 702, Math.floor(Date.now() / 1000), Buffer.from("50422a0a087b10266a040a021055", "hex"), "1.0");
			if (!staleStatus) throw new Error("Could not encode stale status fixture");
			await onMessage(staleStatus);
			expect(adapter.states["Devices.mower.mowerStatus.battery"]).toBeUndefined();
			setMowerCategory("roborock.mower");
			await adapter.mowerRuntime.syncDevice(devices[0]);
			const pending = onStateChange("start");
			await vi.waitFor(() => expect(published).toHaveLength(1));
			adapter.mowerRuntime.stop();
			await pending;
			await onStateChange("start");
			expect(published).toHaveLength(1);
		} finally { adapter.mowerRuntime.stop(); }
	});
});
