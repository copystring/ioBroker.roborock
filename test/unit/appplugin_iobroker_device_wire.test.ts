import { describe, expect, it, vi } from "vitest";

import type { Roborock } from "../../src/main";
import { IoBrokerAppPluginDeviceWire } from "../../src/lib/appplugin/IoBrokerAppPluginDeviceWire";

function fixture() {
	const frame = Buffer.from("010203", "hex");
	const buildRoborockMessage = vi.fn(async () => frame);
	const adapter = {
		getDeviceProtocolVersion: vi.fn(async () => "B01"),
		http_api: {
			getDevices: vi.fn(() => [{ duid: "device-1", online: true }]),
		},
		local_api: {
			isConnected: vi.fn(() => true),
			localDevices: { "device-1": { version: "L01" } },
			sendMessageChecked: vi.fn(async () => undefined),
		},
		mqtt_api: {
			isConnected: vi.fn(() => true),
			sendMessageChecked: vi.fn(async () => undefined),
		},
		requestsHandler: { messageParser: { buildRoborockMessage } },
	} as unknown as Roborock;
	return { adapter, buildRoborockMessage, frame };
}

describe("ioBroker AppPlugin device wire", () => {
	it("frames an unchanged APK DPS for local TCP using the negotiated local protocol", async () => {
		const { adapter, buildRoborockMessage, frame } = fixture();
		const wire = new IoBrokerAppPluginDeviceWire({
			adapter,
			deviceId: "device-1",
			now: () => 1_717_171_717_999,
		});
		const dps = { "101": "{\"id\":7,\"method\":\"get_status\",\"params\":[]}" };

		await wire.sendJsonDps("local", dps);

		expect(buildRoborockMessage).toHaveBeenCalledWith(
			"device-1",
			4,
			1_717_171_717,
			JSON.stringify({ dps, t: 1_717_171_717 }),
			"L01",
		);
		const sent = vi.mocked(adapter.local_api.sendMessageChecked).mock.calls[0][1];
		expect(sent.readUInt32BE(0)).toBe(frame.length);
		expect(sent.subarray(4)).toEqual(frame);
		expect(adapter.mqtt_api.sendMessageChecked).not.toHaveBeenCalled();
	});

	it("uses protocol 101 without a TCP prefix for cloud MQTT", async () => {
		const { adapter, buildRoborockMessage, frame } = fixture();
		const wire = new IoBrokerAppPluginDeviceWire({ adapter, deviceId: "device-1", now: () => 2_000 });
		const dps = { "101": "{\"id\":8,\"method\":\"get_status\"}" };

		await wire.sendJsonDps("cloud", dps);

		expect(buildRoborockMessage).toHaveBeenCalledWith(
			"device-1",
			101,
			2,
			JSON.stringify({ dps, t: 2 }),
			"B01",
		);
		expect(adapter.mqtt_api.sendMessageChecked).toHaveBeenCalledWith("device-1", frame);
		expect(await wire.deviceOnline()).toBe(true);
	});

	it("reports a missing frame key instead of pretending that the request was sent", async () => {
		const { adapter, buildRoborockMessage } = fixture();
		buildRoborockMessage.mockResolvedValueOnce(false);
		const wire = new IoBrokerAppPluginDeviceWire({ adapter, deviceId: "device-1" });

		await expect(wire.sendJsonDps("cloud", {
			"101": "{\"id\":9,\"method\":\"get_status\"}",
		})).rejects.toThrow(/Schlüssel/u);
		expect(adapter.mqtt_api.sendMessageChecked).not.toHaveBeenCalled();
	});
});
