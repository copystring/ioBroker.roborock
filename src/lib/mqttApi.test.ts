import { describe, expect, it, vi } from "vitest";
import { mqtt_api } from "./mqttApi";

describe("mqtt_api B01 protocol 102 dispatch", () => {
	it("resolves Q7-style dps.10001 RPC replies delivered as protocol 102 frames", async () => {
		const duid = "duid-q7";
		const requestId = 1783006488697;
		const resolvePendingRequest = vi.fn();
		const adapter = {
			pendingRequests: new Map([[requestId, { duid, method: "prop.get", version: "B01" }]]),
			requestsHandler: {
				resolvePendingRequest,
				isRequestRecentlyFinished: vi.fn(() => false),
			},
			deviceFeatureHandlers: new Map(),
			getB01Variant: vi.fn().mockResolvedValue("Q7"),
			getDeviceProtocolVersion: vi.fn().mockResolvedValue("B01"),
			rLog: vi.fn(),
			setInterval: vi.fn(() => 1),
			clearInterval: vi.fn(),
			errorStack: (error: unknown) => error instanceof Error ? error.stack || error.message : String(error),
		};
		const api = new mqtt_api(adapter as any);

		await api.handleDecodedMessage(duid, {
			version: "B01",
			protocol: 102,
			payload: Buffer.from(JSON.stringify({
				t: 1783006491,
				dps: {
					"10001": JSON.stringify({
						msgId: String(requestId),
						code: 1,
						method: "prop.get",
						data: {
							status: 4,
							quantity: 100,
						},
					}),
				},
			})),
		});

		expect(resolvePendingRequest).toHaveBeenCalledWith(
			requestId,
			{ status: 4, quantity: 100 },
			"MQTT-B01",
			duid,
			"MQTT",
		);
	});
});

describe("mqtt_api publish", () => {
	const makeApi = () => {
		const api = new mqtt_api({
			http_api: { get_rriot: () => ({ u: "test-user" }) },
			setInterval: vi.fn(() => 1),
			clearInterval: vi.fn(),
		} as any);
		api.mqttUser = "mqtt-user";
		return api;
	};

	it("rejects instead of silently succeeding when MQTT is offline", async () => {
		const api = makeApi();
		api.client = { publish: vi.fn() };
		await expect(api.sendMessage("device", Buffer.from("payload"))).rejects.toThrow("MQTT connection not available");
		expect(api.client.publish).not.toHaveBeenCalled();
	});

	it("resolves only after the QoS 1 publish callback", async () => {
		const api = makeApi();
		api.connected = true;
		let publishCallback: ((error?: Error) => void) | undefined;
		api.client = {
			publish: vi.fn((_topic, _message, _options, callback) => {
				publishCallback = callback;
			}),
		};
		let completed = false;
		const publish = api.sendMessage("device", Buffer.from("payload")).then(() => {
			completed = true;
		});
		await Promise.resolve();
		expect(completed).toBe(false);
		expect(api.client.publish).toHaveBeenCalledWith(
			"rr/m/i/test-user/mqtt-user/device",
			Buffer.from("payload"),
			{ qos: 1 },
			expect.any(Function),
		);
		publishCallback?.();
		await publish;
		expect(completed).toBe(true);
	});

	it("propagates a publish callback error", async () => {
		const api = makeApi();
		api.connected = true;
		api.client = { publish: vi.fn((_topic, _message, _options, callback) => callback(new Error("publish failed"))) };
		await expect(api.sendMessage("device", Buffer.from("payload"))).rejects.toThrow("publish failed");
	});

	it("rejects when the MQTT client never calls back", async () => {
		vi.useFakeTimers();
		try {
			const api = makeApi();
			api.connected = true;
			api.client = { publish: vi.fn() };
			const publish = expect(api.sendMessage("device", Buffer.from("payload"))).rejects.toThrow("MQTT publish timed out");
			await vi.advanceTimersByTimeAsync(10000);
			await publish;
		} finally {
			vi.useRealTimers();
		}
	});
});
