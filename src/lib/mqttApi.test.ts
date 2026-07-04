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