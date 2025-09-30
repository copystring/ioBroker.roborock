import { expect } from "chai";
import { messageParser, type Frame } from "../src/lib/messageParser";

const mockAdapter: any = {
	log: { error: console.error, info: console.log, debug: console.log },
	http_api: {
		getMatchedLocalKeys: () => new Map([["test-duid", Buffer.from("0011223344556677", "hex")]]),
	},
	local_api: { localDevices: { "test-duid": { connectNonce: Buffer.alloc(16), ackNonce: Buffer.alloc(16) } } },
	mqtt_api: { ensureEndpoint: async () => "mqtt://localhost" },
	getDeviceProtocolVersion: async () => "1.0" as const,
	nonce: Buffer.from("abcdef", "hex"),
};

describe("messageParser", () => {
	const parser = new messageParser(mockAdapter);

	it("should build and decode a simple message (1.0)", async () => {
		const payload = JSON.stringify({ id: 1, method: "get_status", params: [] });
		const timestamp = Math.floor(Date.now() / 1000);

		const msg = await parser.buildRoborockMessage("test-duid", 1000, timestamp, payload);
		expect(msg).to.be.instanceOf(Buffer);

		const decoded = parser._decodeMsg(msg as Buffer, "test-duid") as Frame;
		expect(decoded).to.be.ok;
		expect(decoded.version).to.equal("1.0");
		expect(decoded.protocol).to.equal(1000);
	});
});
