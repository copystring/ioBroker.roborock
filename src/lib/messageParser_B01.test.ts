
import { expect } from "chai";
import { messageParser, type Frame } from "./messageParser";
import { cryptoEngine } from "./cryptoEngine";

const mockAdapter: any = {
	log: {
		error: console.error,
		info: console.log,
		debug: () => {},
	},
	http_api: {
		getMatchedLocalKeys: () => new Map([["test-duid-b01", "0011223344556677"]]),
	},
	local_api: {
		localDevices: {},
	},
	mqtt_api: {
		ensureEndpoint: async () => "mqtt://localhost",
	},
	nonce: Buffer.from("abcdef", "hex"),
};

describe("cryptoEngine (B01)", () => {
	it("should encrypt and decrypt correctly", () => {
		const payload = JSON.stringify({ id: 123, method: "get_status", params: [] });
		const localKey = "0011223344556677";
		const random = 4711;

		const encrypted = cryptoEngine.encryptB01(payload, localKey, random);
		const decrypted = cryptoEngine.decryptB01(encrypted, localKey, random);

		expect(decrypted.toString()).to.equal(payload);
	});
});

describe("messageParser (B01)", () => {
	const parser = new messageParser(mockAdapter);

	it("should build and decode a B01 message", async () => {
		const payload = JSON.stringify({ id: 123, method: "get_status", params: [] });
		const timestamp = Math.floor(Date.now() / 1000);
		const protocol = 101;

		// Build
		const msg = await parser.buildRoborockMessage("test-duid-b01", protocol, timestamp, payload, "B01");

		expect(msg).to.not.be.false;
		expect(msg).to.be.instanceOf(Buffer);

		// Decode
		const decoded = parser.decodeMsg(msg as Buffer, "test-duid-b01") as Frame;

		expect(decoded).to.be.ok;
		expect(decoded.version).to.equal("B01");
		expect(decoded.protocol).to.equal(protocol);


		const decodedPayload = JSON.parse(decoded.payload.toString());
		expect(decodedPayload.method).to.equal("get_status");
		expect(decodedPayload.id).to.equal(123);
	});

	it("should build correct payload structure for B01 (Nested Object)", async () => {
		const payload = await parser.buildPayload(101, 123, "get_prop", ["status"], "B01");
		const parsed = JSON.parse(payload);

		expect(parsed.dps).to.be.ok;
		// Verify inner dps is a STRING (Double encoded)
		expect(typeof parsed.dps["10000"]).to.equal("string");
		const inner = JSON.parse(parsed.dps["10000"]);
		expect(inner.method).to.equal("get_prop");
	});

	it("should build correct payload structure for Standard (Stringified)", async () => {
		const payload = await parser.buildPayload(101, 123, "get_prop", ["status"], "1.0");
		const parsed = JSON.parse(payload);

		expect(parsed.dps).to.be.ok;
		// Verify inner dps is a STRING
		expect(typeof parsed.dps["101"]).to.equal("string");
		const inner = JSON.parse(parsed.dps["101"]);
		expect(inner.method).to.equal("get_prop");
	});
});
