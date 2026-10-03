import { describe, expect, it, vi } from "vitest";
import { local_api } from "../../src/lib/localApi";
import { messageParser } from "../../src/lib/messageParser";
import { RoborockRequest } from "../../src/lib/requestsHandler";

function setup(version = "1.0") {
	const adapter = {
		http_api: {
			getRobotModel: vi.fn().mockReturnValue("roborock.wm.a102"),
			getMatchedLocalKeys: () => new Map([["washer", "0123456789abcdef"]]),
		},
		getDeviceProtocolVersion: vi.fn().mockResolvedValue("A01"),
		mqtt_api: { ensureEndpoint: vi.fn().mockResolvedValue("test"), isConnected: vi.fn().mockReturnValue(true), sendMessage: vi.fn().mockResolvedValue(undefined) },
		pendingRequests: new Map(),
		rLog: vi.fn(), catchError: vi.fn(),
		processA01: vi.fn().mockResolvedValue(undefined),
		clearTimeout: vi.fn(),
	};
	const local = new local_api(adapter as any);
	Object.assign(adapter, { local_api: local });
	local.localDevices.washer = { ip: "192.0.2.1", version, endpointSource: "udp", connectNonce: 123, ackNonce: 456 };
	local.deviceSockets.washer = { connected: true } as any;
	const sendLocal = vi.spyOn(local, "sendMessage").mockReturnValue(true);
	const parser = new messageParser(adapter as any);
	const handler = { adapter, messageParser: parser, nextMessageId: () => 301 };
	Object.assign(adapter, { requestsHandler: handler });
	const request = (method = "10000") => new RoborockRequest(handler as any, "washer", method, "[203,217]", { queue: { size: 0 } } as any, "test", "A01");
	return { adapter, local, parser, sendLocal, request };
}

describe("Zeo One local QueryDP transport", () => {
	it.each(["1.0", "L01"])("uses discovered %s frames with A01 DP payload and no RPC result", async version => {
		const { adapter, parser, sendLocal, request } = setup(version);
		await expect(request().send()).resolves.toBeNull();
		expect(adapter.mqtt_api.sendMessage).not.toHaveBeenCalled();
		const wrapped = sendLocal.mock.calls[0][1];
		expect(wrapped.readUInt32BE(0)).toBe(wrapped.length - 4);
		const [frame] = parser.decodeMsg(wrapped.subarray(4), "washer");
		expect(frame.version).toBe(version);
		expect(frame.protocol).toBe(4);
		expect(JSON.parse(frame.payload.toString())).toEqual({ dps: { "10000": "[203,217]" }, t: expect.any(Number) });
		expect(adapter.processA01).not.toHaveBeenCalled();
		expect(adapter.pendingRequests.size).toBe(0);
	});

	it.each(["unhandshaken", "offline", "unknown", "probe", "other model"])("falls back to MQTT for %s", async condition => {
		const { adapter, local, sendLocal, request } = setup();
		if (condition === "unhandshaken") local.localDevices.washer.ackNonce = undefined;
		if (condition === "offline") local.deviceSockets.washer.connected = false;
		if (condition === "unknown") local.localDevices.washer.version = "A01";
		if (condition === "probe") local.localDevices.washer.endpointSource = "probe";
		if (condition === "other model") adapter.http_api.getRobotModel.mockReturnValue("roborock.wm.a103");
		await expect(request().send()).resolves.toBeNull();
		expect(sendLocal).not.toHaveBeenCalled();
		expect(adapter.mqtt_api.sendMessage).toHaveBeenCalledOnce();
	});

	it("keeps control DPs on their existing transport", async () => {
		const { adapter, sendLocal, request } = setup();
		await request("203").send();
		expect(sendLocal).not.toHaveBeenCalled();
		expect(adapter.mqtt_api.sendMessage).toHaveBeenCalledOnce();
	});

	it("does not resend through MQTT when the selected local transport rejects the write", async () => {
		const { adapter, sendLocal, request } = setup();
		sendLocal.mockReturnValue(false);
		await expect(request().send()).rejects.toThrow("transport rejected");
		expect(sendLocal).toHaveBeenCalledOnce();
		expect(adapter.mqtt_api.sendMessage).not.toHaveBeenCalled();
	});

	it.each(["1.0", "L01"])("dispatches unsolicited %s DPs without vacuum RPC correlation", async version => {
		const { adapter, local } = setup(version);
		local.localDevices.washer.endpointSource = "probe";
		local.deviceSockets.washer.connected = false;
		const payload = { dps: { "203": 4, "217": 60 } };
		(local as any).resolveLocalProtocol4Payload("washer", version, 4, payload);
		await Promise.resolve();
		expect(adapter.processA01).toHaveBeenCalledWith("washer", payload);
		expect(adapter.pendingRequests.size).toBe(0);
	});

	it("rejects a QueryDP frame when the same-version session changes during construction", async () => {
		const { adapter, local, parser, sendLocal, request } = setup("L01");
		const build = parser.buildRoborockMessage.bind(parser);
		vi.spyOn(parser, "buildRoborockMessage").mockImplementation(async (...args) => {
			const frame = await build(...args);
			local.localDevices.washer.connectNonce = 789;
			return frame;
		});
		await expect(request().send()).rejects.toThrow("session changed");
		expect(sendLocal).not.toHaveBeenCalled();
		expect(adapter.mqtt_api.sendMessage).not.toHaveBeenCalled();
	});

	it("reports a DP update error through the adapter error handler", async () => {
		const { adapter, local } = setup();
		const error = new Error("state write failed");
		adapter.processA01.mockRejectedValue(error);
		(local as any).resolveLocalProtocol4Payload("washer", "1.0", 4, { dps: { "203": 4 } });
		await (local as any).washerDpUpdates.get("washer");
		expect(adapter.catchError).toHaveBeenCalledWith(error, "Local washer DP update", "washer");
	});

	it("serializes per-washer state writes and removes the completed queue", async () => {
		const { adapter, local } = setup();
		let finishFirst!: () => void;
		const first = new Promise<void>(resolve => { finishFirst = resolve; });
		adapter.processA01.mockImplementationOnce(() => first);
		const firstPayload = { dps: { "217": 40 } };
		const secondPayload = { dps: { "217": 60 } };
		(local as any).resolveLocalProtocol4Payload("washer", "1.0", 4, firstPayload);
		(local as any).resolveLocalProtocol4Payload("washer", "1.0", 4, secondPayload);
		await Promise.resolve();
		expect(adapter.processA01).toHaveBeenCalledTimes(1);
		expect(adapter.processA01).toHaveBeenNthCalledWith(1, "washer", firstPayload);
		finishFirst();
		await (local as any).washerDpUpdates.get("washer");
		expect(adapter.processA01).toHaveBeenNthCalledWith(2, "washer", secondPayload);
		expect((local as any).washerDpUpdates.size).toBe(0);
	});

	it("continues the per-washer queue after a rejected state write", async () => {
		const { adapter, local } = setup();
		adapter.processA01.mockRejectedValueOnce(new Error("first update failed"));
		(local as any).resolveLocalProtocol4Payload("washer", "L01", 4, { dps: { "217": 40 } });
		(local as any).resolveLocalProtocol4Payload("washer", "L01", 4, { dps: { "217": 60 } });
		await (local as any).washerDpUpdates.get("washer");
		expect(adapter.catchError).toHaveBeenCalledOnce();
		expect(adapter.processA01).toHaveBeenCalledTimes(2);
		expect((local as any).washerDpUpdates.size).toBe(0);
	});
});
