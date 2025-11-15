"use strict";
// test/messageParser.test.ts
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const messageParser_1 = require("./messageParser"); // Adjust path if necessary
// Mocking the Roborock adapter structure
const mockAdapter = {
	log: {
		error: console.error,
		info: console.log,
		debug: () => { }, // Silence debug logs in tests
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
	const parser = new messageParser_1.messageParser(mockAdapter);
	it("should build and decode a simple message (Protocol 1.0)", async () => {
		const payload = JSON.stringify({ id: 1, method: "get_status", params: [] });
		const timestamp = Math.floor(Date.now() / 1000);
		const msg = await parser.buildRoborockMessage("test-duid", 1000, timestamp, payload, "1.0");
		// Ensure message creation was successful
		(0, chai_1.expect)(msg).to.not.be.false;
		(0, chai_1.expect)(msg).to.be.instanceOf(Buffer);
		// Decode the generated message
		const decoded = parser._decodeMsg(msg, "test-duid");
		(0, chai_1.expect)(decoded).to.be.ok;
		(0, chai_1.expect)(decoded.version).to.equal("1.0");
		(0, chai_1.expect)(decoded.protocol).to.equal(1000);
		// Optional: Verify payload content matches
		const decodedPayload = JSON.parse(decoded.payload.toString());
		(0, chai_1.expect)(decodedPayload.method).to.equal("get_status");
	});
});
//# sourceMappingURL=messageParser.test.js.map