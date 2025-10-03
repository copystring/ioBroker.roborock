"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageParser = void 0;
const cryptoEngine_1 = require("./cryptoEngine");
const crc_32_1 = __importDefault(require("crc-32"));
const binary_parser_1 = require("binary-parser");
const zod_1 = require("zod");
const SUPPORTED_VERSIONS = ["1.0", "A01", "L01"];
const FrameSchema = zod_1.z.object({
    version: zod_1.z.string(),
    seq: zod_1.z.number(),
    random: zod_1.z.number(),
    timestamp: zod_1.z.number(),
    protocol: zod_1.z.number(),
    payloadLen: zod_1.z.number(),
    payload: zod_1.z.instanceof(Buffer),
    crc32: zod_1.z.number(),
});
// --------------------
// Constants
// --------------------
const HEADER_LEN = 3 + 4 + 4 + 4 + 2 + 2; // version + seq + random + timestamp + protocol + payloadLen
const CRC32_LEN = 4; // CRC32 length
let seq = 1;
let random = 4711;
// --------------------
// Binary Parser
// --------------------
const frameParser = new binary_parser_1.Parser()
    .endianess("big")
    .string("version", { length: 3 })
    .uint32("seq")
    .uint32("random")
    .uint32("timestamp")
    .uint16("protocol")
    .uint16("payloadLen")
    .buffer("payload", { length: "payloadLen" })
    .uint32("crc32");
// --------------------
// CRC Utilities
// --------------------
function validateCrc(buf) {
    const crc = crc_32_1.default.buf(buf.subarray(0, buf.length - 4)) >>> 0;
    return crc === buf.readUInt32BE(buf.length - 4);
}
function appendCrc(buf) {
    const crc = crc_32_1.default.buf(buf.subarray(0, buf.length - 4)) >>> 0;
    buf.writeUInt32BE(crc, buf.length - 4);
}
// --------------------
// Dispatch Maps
// --------------------
const decryptors = {
    "1.0": (payload, key, timestamp) => cryptoEngine_1.cryptoEngine.decryptV1(payload, key, timestamp),
    A01: (payload, key, random) => cryptoEngine_1.cryptoEngine.decryptA01(payload, key, random),
    L01: (payload, key, timestamp, seq, random, connectNonce, ackNonce) => cryptoEngine_1.cryptoEngine.decryptL01(payload, key, timestamp, seq, random, connectNonce, ackNonce),
};
const encryptors = {
    "1.0": (payload, key, timestamp) => cryptoEngine_1.cryptoEngine.encryptV1(payload, key, timestamp),
    A01: (payload, key, random) => cryptoEngine_1.cryptoEngine.encryptA01(payload, key, random),
    L01: (payload, key, timestamp, seq, random, connectNonce, ackNonce) => cryptoEngine_1.cryptoEngine.encryptL01(payload, key, timestamp, seq, random, connectNonce, ackNonce),
};
// --------------------
// Message Parser
// --------------------
class messageParser {
    adapter;
    constructor(adapter) {
        this.adapter = adapter;
    }
    /**
     * Decodes one or more messages from a buffer.
     */
    _decodeMsg(message, duid) {
        const decoded = [];
        let offset = 0;
        while (offset + 3 <= message.length) {
            const version = message.toString("latin1", offset, offset + 3);
            if (!SUPPORTED_VERSIONS.includes(version)) {
                this.adapter.log.error(`[decodeMsg] Unsupported version "${version}" at offset ${offset}`);
                offset++;
                continue;
            }
            let raw;
            try {
                raw = frameParser.parse(message.subarray(offset));
            }
            catch (err) {
                this.adapter.log.error(`[decodeMsg] Parse failed at offset ${offset}: ${err}`);
                break;
            }
            let data;
            try {
                data = FrameSchema.parse(raw);
                data.version = version;
            }
            catch (err) {
                this.adapter.log.error(`[decodeMsg] Validation failed: ${err}`);
                break;
            }
            const msgLen = HEADER_LEN + data.payloadLen + CRC32_LEN;
            if (msgLen <= 0 || offset + msgLen > message.length)
                break;
            const msgBuffer = message.subarray(offset, offset + msgLen);
            if (!validateCrc(msgBuffer)) {
                this.adapter.log.error(`[decodeMsg] CRC32 mismatch at offset ${offset}`);
                offset += msgLen;
                continue;
            }
            const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
            if (!localKey) {
                this.adapter.log.error(`[decodeMsg] No localKey for DUID ${duid}`);
                offset += msgLen;
                continue;
            }
            try {
                if (version === "L01") {
                    const dev = this.adapter.local_api.localDevices[duid];
                    if (!dev?.connectNonce || dev.ackNonce == null) {
                        throw new Error(`[decodeMsg] Missing nonces for L01 (duid=${duid})`);
                    }
                    data.payload = decryptors.L01(data.payload, localKey, data.timestamp, data.seq, data.random, dev.connectNonce, dev.ackNonce);
                }
                else if (version === "1.0") {
                    data.payload = decryptors["1.0"](data.payload, localKey, data.timestamp);
                }
                else if (version === "A01") {
                    data.payload = decryptors.A01(data.payload, localKey, data.random);
                }
                decoded.push(data);
            }
            catch (err) {
                this.adapter.log.error(`[_decodeMsg] Decrypt failed for duid=${duid} at offset ${offset}: ${err}`);
            }
            offset += msgLen;
        }
        if (decoded.length === 0)
            return null;
        return decoded.length === 1 ? decoded[0] : decoded;
    }
    /**
     * Builds the JSON payload for the device.
     */
    async buildPayload(duid, protocol, messageID, method, params) {
        const timestamp = Math.floor(Date.now() / 1000);
        const endpoint = await this.adapter.mqtt_api.ensureEndpoint();
        const version = await this.adapter.getDeviceProtocolVersion(duid);
        if (version === "A01") {
            return JSON.stringify({ dps: { [method]: params }, t: timestamp });
        }
        const inner = { id: messageID, method, params };
        if (method === "get_photo") {
            const kp = cryptoEngine_1.cryptoEngine.ensureRsaKeys();
            params.endpoint = endpoint;
            params.security = { cipher_suite: 0, pub_key: kp.public };
        }
        else if (["get_map_v1", "get_clean_record_map"].includes(method)) {
            inner.security = { endpoint, nonce: this.adapter.nonce.toString("hex").toUpperCase() };
        }
        return JSON.stringify({ dps: { [protocol]: JSON.stringify(inner) }, t: timestamp });
    }
    /**
     * Builds the final Roborock frame and encrypts the payload.
     */
    async buildRoborockMessage(duid, protocol, timestamp, payload) {
        const version = (await this.adapter.getDeviceProtocolVersion(duid));
        const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
        if (!localKey)
            return false;
        const payloadBuf = Buffer.isBuffer(payload) ? payload : Buffer.from(payload, "utf-8");
        let encrypted;
        if (protocol === 1) {
            // hello_request
            encrypted = Buffer.alloc(0);
        }
        else if (version === "L01") {
            const connectNonce = this.adapter.local_api.localDevices[duid]?.connectNonce;
            const ackNonce = this.adapter.local_api.localDevices[duid]?.ackNonce;
            this.adapter.log.debug(`[buildRoborockMessage] Using connectNonce=${connectNonce?.toString("hex")} ackNonce=${ackNonce?.toString("hex")}`);
            encrypted = encryptors.L01(payloadBuf, localKey, timestamp, seq, random, connectNonce, ackNonce);
        }
        else if (version === "1.0") {
            encrypted = encryptors["1.0"](payloadBuf, localKey, timestamp);
        }
        else if (version === "A01") {
            encrypted = encryptors.A01(payloadBuf, localKey, random);
        }
        else {
            return false;
        }
        const s = seq++ >>> 0;
        const r = random++ >>> 0;
        const msg = Buffer.alloc(HEADER_LEN + encrypted.length + CRC32_LEN);
        msg.write(version);
        msg.writeUInt32BE(s, 3);
        msg.writeUInt32BE(r, 7);
        msg.writeUInt32BE(timestamp >>> 0, 11);
        msg.writeUInt16BE(protocol, 15);
        msg.writeUInt16BE(encrypted.length, 17);
        encrypted.copy(msg, 19);
        appendCrc(msg);
        return msg;
    }
}
exports.messageParser = messageParser;
//# sourceMappingURL=messageParser.js.map