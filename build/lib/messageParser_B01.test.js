"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const messageParser_1 = require("./messageParser");
const cryptoEngine_1 = require("./cryptoEngine");
const mockAdapter = {
    log: {
        error: console.error,
        info: console.log,
        debug: () => { },
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
        const encrypted = cryptoEngine_1.cryptoEngine.encryptB01(payload, localKey, random);
        const decrypted = cryptoEngine_1.cryptoEngine.decryptB01(encrypted, localKey, random);
        (0, chai_1.expect)(decrypted.toString()).to.equal(payload);
    });
});
describe("messageParser (B01)", () => {
    const parser = new messageParser_1.messageParser(mockAdapter);
    it("should build and decode a B01 message", async () => {
        const payload = JSON.stringify({ id: 123, method: "get_status", params: [] });
        const timestamp = Math.floor(Date.now() / 1000);
        const protocol = 101;
        // Build
        const msg = await parser.buildRoborockMessage("test-duid-b01", protocol, timestamp, payload, "B01");
        (0, chai_1.expect)(msg).to.not.be.false;
        (0, chai_1.expect)(msg).to.be.instanceOf(Buffer);
        // Decode
        const decoded = parser.decodeMsg(msg, "test-duid-b01");
        (0, chai_1.expect)(decoded).to.be.ok;
        (0, chai_1.expect)(decoded.version).to.equal("B01");
        (0, chai_1.expect)(decoded.protocol).to.equal(protocol);
        const decodedPayload = JSON.parse(decoded.payload.toString());
        (0, chai_1.expect)(decodedPayload.method).to.equal("get_status");
        (0, chai_1.expect)(decodedPayload.id).to.equal(123);
    });
    // Test case: B01 protocol verification with known binary dump
    // Uses real-world captured data to verify AES-128-CBC decryption and payload parsing
    it("should verify against REAL B01 binary dump", () => {
        // Encrypted response from device
        const incomingHex = "4230310000404f04226e1468cc3eaa0066008025a69d6ed58f8798486b5a73c1d44b4ec342ee6fc84de839f87608349f7f2edd830caab9cc86082d3ec85652cb6614173c192de18822141a0ad719e928db9ebac872368f99e611f547ad31fad4bcfd640fdfa91ee7b1706f7f3b6da7f786aa5fedf4ccc06c02cc64163e88db43db13ec7592c8ff0f7da348cbdd24787ef9f63d0ca8101c";
        // Known LocalKey for this capture
        const localKey = "0WczpPyjucptblG7";
        // Expected content after decryption:
        // Payload: {"t":1758215849,"dps":{"10001":"{\"msgId\":\"200000000001\",\"code\":0,\"method\":\"prop.get\",\"data\":{\"status\":4}}"}}
        const expectedInnerId = "200000000001";
        const message = Buffer.from(incomingHex, "hex");
        // Setup mock for this specific key
        mockAdapter.http_api.getMatchedLocalKeys = () => new Map([["real-device-duid", localKey]]);
        // Decode
        const decoded = parser.decodeMsg(message, "real-device-duid");
        (0, chai_1.expect)(decoded).to.be.ok;
        (0, chai_1.expect)(decoded.version).to.equal("B01");
        const jsonBuf = decoded.payload;
        const jsonStr = jsonBuf.toString();
        const json = JSON.parse(jsonStr);
        (0, chai_1.expect)(json.t).to.be.a("number"); // 1758215849
        (0, chai_1.expect)(json.dps["10001"]).to.be.ok; // Response uses 10001
        const innerStr = json.dps["10001"];
        // If the output is a string, JSON.parse it
        let inner = innerStr;
        if (typeof inner === "string") {
            inner = JSON.parse(inner);
        }
        (0, chai_1.expect)(inner.msgId).to.equal(expectedInnerId);
        (0, chai_1.expect)(inner.data.status).to.equal(4);
    });
    it("should build correct payload structure for B01 (Nested Object)", async () => {
        const payload = await parser.buildPayload(101, 123, "get_prop", ["status"], "B01");
        const parsed = JSON.parse(payload);
        (0, chai_1.expect)(parsed.dps).to.be.ok;
        // Verify inner dps is a STRING (Double encoded)
        (0, chai_1.expect)(typeof parsed.dps["10000"]).to.equal("string");
        const inner = JSON.parse(parsed.dps["10000"]);
        (0, chai_1.expect)(inner.method).to.equal("get_prop");
    });
    it("should build correct payload structure for Standard (Stringified)", async () => {
        const payload = await parser.buildPayload(101, 123, "get_prop", ["status"], "1.0");
        const parsed = JSON.parse(payload);
        (0, chai_1.expect)(parsed.dps).to.be.ok;
        // Verify inner dps is a STRING
        (0, chai_1.expect)(typeof parsed.dps["101"]).to.equal("string");
        const inner = JSON.parse(parsed.dps["101"]);
        (0, chai_1.expect)(inner.method).to.equal("get_prop");
    });
});
//# sourceMappingURL=messageParser_B01.test.js.map