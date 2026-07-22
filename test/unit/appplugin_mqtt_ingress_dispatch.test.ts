import { describe, expect, it, vi } from "vitest";

import { mqtt_api } from "../../src/lib/mqttApi";

describe("AppPlugin MQTT ingress dispatch", () => {
	it("offers the decoded DPS envelope to AppPlugin before legacy response handling", async () => {
		const acceptJsonEnvelope = vi.fn();
		const adapter = {
			appPluginDeviceIngressRouter: { acceptJsonEnvelope },
			deviceFeatureHandlers: new Map(),
			getB01Variant: vi.fn(async () => "Q7"),
			getDeviceProtocolVersion: vi.fn(async () => "1.0"),
			pendingRequests: new Map(),
			requestsHandler: { isRequestRecentlyFinished: vi.fn(() => false) },
			rLog: vi.fn(),
			errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error),
			setInterval: vi.fn(() => 1),
		};
		const mqtt = new mqtt_api(adapter as never);
		const envelope = { dps: { "102": JSON.stringify({ id: 73, result: { battery: 88 } }) } };

		await mqtt.handleDecodedMessage("device-1", {
			payload: Buffer.from(JSON.stringify(envelope)),
			protocol: 102,
			version: "1.0",
		});

		expect(acceptJsonEnvelope).toHaveBeenCalledWith("device-1", "1.0", envelope);
	});
});
