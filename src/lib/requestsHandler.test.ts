import { describe, expect, it, vi } from "vitest";
import { messageParser } from "./messageParser";
import { RoborockRequest, requestsHandler } from "./requestsHandler";

describe("A01 request transport", () => {
	const makeRequest = (sendMessage: ReturnType<typeof vi.fn>) => {
		const adapter = {
			pendingRequests: new Map(),
			getDeviceProtocolVersion: vi.fn().mockResolvedValue("A01"),
			local_api: { isConnected: vi.fn(() => true) },
			mqtt_api: { isConnected: vi.fn(() => true), ensureEndpoint: vi.fn().mockResolvedValue("endpoint"), sendMessage },
			http_api: { getMatchedLocalKeys: () => new Map([["device", "0011223344556677"]]) },
			rLog: vi.fn(),
			catchError: vi.fn(),
		};
		const parser = new messageParser(adapter as any);
		const handler = { adapter, messageParser: parser, nextMessageId: () => 1234 };
		const manager = { queue: { size: 0 } };
		const request = new RoborockRequest(handler as any, "device", "10000", "[203,217,218]", manager as any, "CommandQueue", "A01");
		return { adapter, parser, request };
	};

	it("sends QueryDP over MQTT protocol 101 even when local TCP is connected", async () => {
		const sendMessage = vi.fn().mockResolvedValue(undefined);
		const { adapter, parser, request } = makeRequest(sendMessage);
		await expect(request.send()).resolves.toBeNull();
		expect(sendMessage).toHaveBeenCalledTimes(1);
		const [duid, frame] = sendMessage.mock.calls[0];
		expect(duid).toBe("device");
		const decoded = parser.decodeMsg(frame, "device");
		expect(decoded).toHaveLength(1);
		expect(decoded[0].protocol).toBe(101);
		expect(JSON.parse(decoded[0].payload.toString())).toMatchObject({ dps: { "10000": "[203,217,218]" } });
		expect(adapter.pendingRequests.size).toBe(0);
	});

	it("rejects a failed A01 publish and removes its pending entry", async () => {
		const sendMessage = vi.fn().mockRejectedValue(new Error("MQTT connection not available for publish."));
		const { adapter, request } = makeRequest(sendMessage);
		await expect(request.send()).rejects.toThrow("MQTT connection not available");
		expect(adapter.pendingRequests.size).toBe(0);
	});

	it("cleans up an A01 pending request when payload construction fails", async () => {
		const adapter = {
			instance: 0,
			pendingRequests: new Map(),
			getDeviceProtocolVersion: vi.fn().mockResolvedValue("A01"),
			local_api: { isConnected: vi.fn(() => false) },
			setInterval: vi.fn(() => 1),
			clearInterval: vi.fn(),
			rLog: vi.fn(),
		};
		const handler = new requestsHandler(adapter as any);
		vi.spyOn(handler.messageParser, "buildPayload").mockRejectedValue(new Error("payload build failed"));
		await expect(handler.sendRequest("device", "10000", "[203]")).rejects.toThrow("payload build failed");
		expect(adapter.pendingRequests.size).toBe(0);
	});
});
