"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.message_parser = void 0;
const cryptoEngine_1 = require("./cryptoEngine");
const crc_32_1 = __importDefault(require("crc-32"));
const binary_parser_1 = require("binary-parser");
const node_forge_1 = __importDefault(require("node-forge"));
const HEADER_LEN = 3 + 4 + 4 + 4 + 2 + 2; // version + seq + random + timestamp + protocol + payloadLen
const CRC32_LEN = 4;
// Global rolling counters (wrapped to uint32)
let seq = 1;
let random = 4711;
// Discovery/app salt (from librrcodec.so; encrypted via com.roborock.iotsdk.appsecret)
const salt = "TXdfu$jyZ#TZHsg4";
// Lazy RSA keypair (only when needed for get_photo)
let keys = null;
function ensureRsaKeys() {
    if (keys)
        return keys;
    const kp = node_forge_1.default.pki.rsa.generateKeyPair(2048);
    keys = {
        public: { n: kp.publicKey.n.toString(16), e: kp.publicKey.e.toString(16) },
        private: {
            n: kp.privateKey.n.toString(16),
            e: kp.privateKey.e.toString(16),
            d: kp.privateKey.d.toString(16),
            p: kp.privateKey.p.toString(16),
            q: kp.privateKey.q.toString(16),
            dmp1: kp.privateKey.dP.toString(16),
            dmq1: kp.privateKey.dQ.toString(16),
            coeff: kp.privateKey.qInv.toString(16),
        },
    };
    return keys;
}
const messageParser = new binary_parser_1.Parser()
    .endianess("big")
    .string("version", { length: 3 })
    .uint32("seq")
    .uint32("random")
    .uint32("timestamp")
    .uint16("protocol")
    .uint16("payloadLen")
    .buffer("payload", { length: "payloadLen" })
    .uint32("crc32");
class message_parser {
    adapter;
    constructor(adapter) {
        this.adapter = adapter;
    }
    /**
     * Decode one or more concatenated messages from a buffer.
     */
    _decodeMsg(message, duid) {
        const decoded = [];
        let offset = 0;
        while (offset + 3 <= message.length) {
            const version = message.toString("latin1", offset, offset + 3);
            if (version !== "1.0" && version !== "A01" && version !== "L01") {
                this.adapter.log.error(`[decodeMsg] Unsupported version "${version}" at offset ${offset}. Skipping byte.`);
                offset += 1;
                continue;
            }
            let data;
            try {
                data = this.getParsedData(message.subarray(offset));
            }
            catch (error) {
                this.adapter.log.error(`[decodeMsg] Message parsing failed at offset ${offset}: ${error}`);
                break;
            }
            const msgLen = HEADER_LEN + data.payloadLen + CRC32_LEN;
            if (msgLen <= 0 || offset + msgLen > message.length) {
                this.adapter.log.error(`[decodeMsg] Incomplete message at offset ${offset} (need ${msgLen}, have ${message.length - offset}).`);
                break;
            }
            const msgBuffer = message.subarray(offset, offset + msgLen);
            const crc32 = crc_32_1.default.buf(msgBuffer.subarray(0, msgLen - 4)) >>> 0;
            const expectedCrc32 = msgBuffer.readUInt32BE(msgLen - 4);
            if (crc32 !== expectedCrc32) {
                this.adapter.log.error(`[decodeMsg] CRC32 mismatch at offset ${offset}: ${crc32} != ${expectedCrc32}`);
                offset += msgLen;
                continue;
            }
            const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
            if (!localKey) {
                this.adapter.log.error(`[decodeMsg] Local key not found for DUID ${duid}`);
                offset += msgLen;
                continue;
            }
            const frame = { ...data };
            try {
                switch (version) {
                    case "1.0": {
                        frame.payload = cryptoEngine_1.cryptoEngine.decryptV1(frame.payload, localKey, frame.timestamp);
                        break;
                    }
                    case "A01": {
                        frame.payload = cryptoEngine_1.cryptoEngine.decryptA01(frame.payload, localKey, frame.random);
                        break;
                    }
                    case "L01": {
                        frame.payload = cryptoEngine_1.cryptoEngine.decryptL01(frame.payload, localKey, frame.timestamp, frame.seq, frame.random, this.adapter.connectNonce, this.adapter.ackNonce?.get(duid));
                        break;
                    }
                }
                delete frame.payloadLen;
                decoded.push(frame);
            }
            catch (err) {
                this.adapter.log.error(`failed to _decodeMsg: ${err?.stack || err}. Local binary: ${message.toString("hex")}`, null, duid);
            }
            offset += msgLen;
        }
        if (decoded.length === 0)
            return null;
        return decoded.length === 1 ? decoded[0] : decoded;
    }
    getParsedData(data) {
        return messageParser.parse(data);
    }
    /**
     * Build device JSON payload (inner JSON for dps).
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
            const kp = ensureRsaKeys();
            params.endpoint = endpoint;
            params.security = { cipher_suite: 0, pub_key: kp.public };
        }
        else if (method === "get_map_v1" || method === "get_clean_record_map") {
            inner.security = { endpoint, nonce: this.adapter.nonce.toString("hex").toUpperCase() };
        }
        return JSON.stringify({ dps: { [protocol]: JSON.stringify(inner) }, t: timestamp });
    }
    /**
     * Wraps the payload into a Roborock local frame and encrypts according to protocol version.
     */
    async buildRoborockMessage(duid, protocol, timestamp, payload) {
        const version = await this.adapter.getDeviceProtocolVersion(duid);
        const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
        if (!localKey) {
            this.adapter.log.error(`[buildRoborockMessage] No localKey for DUID ${duid}`);
            return false;
        }
        let encrypted;
        const payloadBuf = this._toBuf(payload);
        try {
            switch (version) {
                case "1.0": {
                    encrypted = cryptoEngine_1.cryptoEngine.encryptV1(payloadBuf, localKey, timestamp);
                    break;
                }
                case "A01": {
                    encrypted = cryptoEngine_1.cryptoEngine.encryptA01(payloadBuf, localKey, random);
                    break;
                }
                case "L01": {
                    encrypted = cryptoEngine_1.cryptoEngine.encryptL01(payloadBuf, localKey, timestamp, seq, random, this.adapter.connectNonce, this.adapter.ackNonce?.get(duid));
                    break;
                }
                default:
                    this.adapter.log.error(`[buildRoborockMessage] Unsupported version ${version}`);
                    return false;
            }
        }
        catch (err) {
            this.adapter.log.error(`[buildRoborockMessage] Encryption failed for ${version}: ${err?.stack || err}`);
            return false;
        }
        if (!encrypted)
            return false;
        // Build frame
        const s = this._wrap32(seq++);
        const r = this._wrap32(random++);
        const msg = Buffer.alloc(23 + encrypted.length);
        msg.write(version);
        msg.writeUInt32BE(s, 3);
        msg.writeUInt32BE(r, 7);
        msg.writeUInt32BE(timestamp >>> 0, 11);
        msg.writeUInt16BE(protocol, 15);
        msg.writeUInt16BE(encrypted.length, 17);
        encrypted.copy(msg, 19);
        const crc32 = crc_32_1.default.buf(msg.subarray(0, msg.length - 4)) >>> 0;
        msg.writeUInt32BE(crc32, msg.length - 4);
        return msg;
    }
    /**
     * Timestamp permutation as used by Roborock.
     */
    _encodeTimestamp(timestamp) {
        const hex = timestamp.toString(16).padStart(8, "0").split("");
        return [5, 6, 3, 7, 1, 2, 0, 4].map((idx) => hex[idx]).join("");
    }
    // ---------- small local utilities (kept inside the class) ----------
    _toBuf(input) {
        return Buffer.isBuffer(input) ? input : Buffer.from(input, "utf-8");
    }
    _wrap32(v) {
        // keep in uint32 space
        return v >>> 0;
    }
    _hex8(v) {
        return (v >>> 0).toString(16).padStart(8, "0");
    }
}
exports.message_parser = message_parser;
//# sourceMappingURL=message_parser.js.map