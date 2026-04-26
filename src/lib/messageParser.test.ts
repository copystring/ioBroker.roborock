// test/messageParser.test.ts

import { describe, expect, it } from "vitest";
import { messageParser } from "./messageParser";

// Mocking the Roborock adapter structure
const mockAdapter: any = {
	log: {
		error: console.error,
		info: console.log,
		debug: () => {}, // Silence debug logs in tests
	},
	http_api: {
		// Returns a Map mimicking the local keys store
		getMatchedLocalKeys: () => new Map([["test-duid", "0011223344556677"]]),
	},
	local_api: {
		localDevices: {
			"test-duid": {
				connectNonce: Buffer.alloc(16),
				ackNonce: Buffer.alloc(16),
			},
		},
	},
	mqtt_api: {
		ensureEndpoint: async () => "mqtt://localhost",
	},
	getDeviceProtocolVersion: async () => "1.0",
	nonce: Buffer.from("abcdef", "hex"),
};

describe("messageParser", () => {
	const parser = new messageParser(mockAdapter);

	it("should build and decode a simple message (Protocol 1.0)", async () => {
		const payload = JSON.stringify({ id: 1, method: "get_status", params: [] });
		const timestamp = Math.floor(Date.now() / 1000);

		const msg = await parser.buildRoborockMessage("test-duid", 1000, timestamp, payload, "1.0");

		// Ensure message creation was successful
		expect(msg).to.not.be.false;
		expect(msg).to.be.instanceOf(Buffer);

		// Decode the generated message
		const decoded = parser.decodeMsg(msg as Buffer, "test-duid");

		expect(decoded).to.be.an("array");
		expect(decoded.length).to.equal(1);
		expect(decoded[0].version).to.equal("1.0");
		expect(decoded[0].protocol).to.equal(1000);

		// Optional: Verify payload content matches
		const decodedPayload = JSON.parse(decoded[0].payload.toString());
		expect(decodedPayload.method).to.equal("get_status");
	});

	it("should build L01 TCP payloads with dps.101 inside protocol 4 frames", async () => {
		const payload = await parser.buildPayload(4, 1806, "get_prop", ["get_status"], "L01");
		const decodedPayload = JSON.parse(payload);

		expect(decodedPayload.dps["101"]).to.be.a("string");
		expect(decodedPayload.dps["4"]).to.be.undefined;

		const inner = JSON.parse(decodedPayload.dps["101"]);
		expect(inner).to.deep.equal({
			id: 1806,
			method: "get_prop",
			params: ["get_status"],
		});
	});

	it("should keep dps.4 for non-L01 protocol 4 payloads", async () => {
		const payload = await parser.buildPayload(4, 1806, "get_prop", ["get_status"], "1.0");
		const decodedPayload = JSON.parse(payload);

		expect(decodedPayload.dps["4"]).to.be.a("string");
		expect(decodedPayload.dps["101"]).to.be.undefined;
	});

	it("tracks transport sequence per device and wraps without using zero", () => {
		const localParser = new messageParser(mockAdapter);
		localParser.resetTransportSequence("test-duid", 0xffff);

		expect(localParser.nextTransportSequenceId("test-duid")).to.equal(0xffff);
		expect(localParser.nextTransportSequenceId("test-duid")).to.equal(1);

		localParser.resetTransportSequence("other-duid");

		expect(localParser.nextTransportSequenceId("other-duid")).to.equal(1);
		expect(localParser.nextTransportSequenceId("test-duid")).to.equal(2);
	});
});
