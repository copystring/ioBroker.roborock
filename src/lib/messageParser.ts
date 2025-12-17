import { z } from "zod";
import { Parser } from "binary-parser";
import * as crc32 from "crc-32";
import { Roborock } from "../main";
import { cryptoEngine } from "./cryptoEngine";

export type ProtocolVersion = "1.0" | "A01" | "L01" | "B01";

const SUPPORTED_VERSIONS: ProtocolVersion[] = ["1.0", "A01", "L01", "B01"] as const;

// Zod schema for runtime frame validation
const FrameSchema = z.object({
	version: z.string(),
	seq: z.number(),
	random: z.number(),
	timestamp: z.number(),
	protocol: z.number(),
	payloadLen: z.number(),
	payload: z.instanceof(Buffer),
	crc32: z.number(),
});

// Infer Frame type from schema
export type Frame = z.infer<typeof FrameSchema> & { version: ProtocolVersion };

// --------------------
// Constants
// --------------------

const HEADER_LEN = 3 + 4 + 4 + 4 + 2 + 2; // version(3) + seq(4) + random(4) + timestamp(4) + protocol(2) + payloadLen(2)
const CRC32_LEN = 4;

// Persistent global sequence and random counters
let seq = 1;
let random = 4711;

// --------------------
// Binary Parser Configuration
// --------------------

const frameParser = new Parser()
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

/**
 * Validates CRC32 checksum.
 */
function validateCrc(buf: Buffer): boolean {
	const crc = crc32.buf(buf.subarray(0, buf.length - 4)) >>> 0;
	return crc === buf.readUInt32BE(buf.length - 4);
}

/**
 * Appends CRC32 checksum to the buffer.
 */
function appendCrc(buf: Buffer): void {
	const crc = crc32.buf(buf.subarray(0, buf.length - 4)) >>> 0;
	buf.writeUInt32BE(crc, buf.length - 4);
}

// --------------------
// Protocol Version Dispatchers
// --------------------

const decryptors: Record<ProtocolVersion, (...args: any[]) => Buffer> = {
	"1.0": (payload, key, timestamp) => cryptoEngine.decryptV1(payload, key, timestamp),
	A01: (payload, key, random) => cryptoEngine.decryptA01(payload, key, random),
	L01: (payload, key, timestamp, seq, random, connectNonce, ackNonce) => cryptoEngine.decryptL01(payload, key, timestamp, seq, random, connectNonce, ackNonce),
	B01: (payload, key, random) => cryptoEngine.decryptB01(payload, key, random),
};

const encryptors: Record<ProtocolVersion, (...args: any[]) => Buffer> = {
	"1.0": (payload, key, timestamp) => cryptoEngine.encryptV1(payload, key, timestamp),
	A01: (payload, key, random) => cryptoEngine.encryptA01(payload, key, random),
	L01: (payload, key, timestamp, seq, random, connectNonce, ackNonce) => cryptoEngine.encryptL01(payload, key, timestamp, seq, random, connectNonce, ackNonce),
	B01: (payload, key, random) => cryptoEngine.encryptB01(payload, key, random),
};



export class messageParser {
	adapter: Roborock;

	constructor(adapter: Roborock) {
		this.adapter = adapter;
	}

	/**
	 * Decodes a buffer containing Roborock protocol messages.
	 */
	decodeMsg(message: Buffer, duid: string): Frame | Frame[] | null {
		const decoded: Frame[] = [];
		let offset = 0;

		while (offset + 3 <= message.length) {
			// Check protocol version
			const version = message.toString("latin1", offset, offset + 3) as ProtocolVersion;

			if (!SUPPORTED_VERSIONS.includes(version)) {
				this.adapter.log.error(`[decodeMsg] Unsupported version "${version}" at offset ${offset}`);
				this.adapter.log.error(`[decodeMsg] Hex Dump: ${message.toString("hex")}`);

				// Skip corrupted message block
				const MIN_MSG_LENGTH = 23;
				offset += MIN_MSG_LENGTH;
				continue;
			}

			let raw: unknown;
			try {
				raw = frameParser.parse(message.subarray(offset));
			} catch (err) {
				this.adapter.log.error(`[decodeMsg] Parse failed at offset ${offset}: ${err}`);
				break;
			}

			let data: Frame;
			try {
				data = FrameSchema.parse(raw) as Frame;
				data.version = version;
			} catch (err) {
				this.adapter.log.error(`[decodeMsg] Validation failed: ${err}`);
				break;
			}

			const msgLen = HEADER_LEN + data.payloadLen + CRC32_LEN;
			if (msgLen <= 0 || offset + msgLen > message.length) break;

			// Validate CRC
			const msgBuffer = message.subarray(offset, offset + msgLen);
			if (!validateCrc(msgBuffer)) {
				this.adapter.log.error(`[decodeMsg] CRC32 mismatch at offset ${offset}`);
				offset += msgLen;
				continue;
			}

			// Get local key
			const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
			if (!localKey) {
				this.adapter.log.error(`[decodeMsg] No localKey found for DUID ${duid}`);
				offset += msgLen;
				continue;
			}

			// Decrypt
			try {
				if (version === "L01") {
					const dev = this.adapter.local_api.localDevices[duid];
					if (!dev?.connectNonce || dev.ackNonce == null) {
						throw new Error(`Missing nonces for L01 (duid=${duid})`);
					}
					data.payload = decryptors.L01(data.payload, localKey, data.timestamp, data.seq, data.random, dev.connectNonce, dev.ackNonce);
				} else if (version === "1.0") {
					data.payload = decryptors["1.0"](data.payload, localKey, data.timestamp);
				} else if (version === "A01") {
					data.payload = decryptors.A01(data.payload, localKey, data.random);
				} else if (version === "B01") {
					data.payload = decryptors.B01(data.payload, localKey, data.random);
				}
				decoded.push(data);
			} catch (err: any) {
				this.adapter.log.error(`[_decodeMsg] Decryption failed for duid=${duid} at offset ${offset}: ${err}`);
				this.adapter.log.error(`[decodeMsg] Hex Dump: ${message.toString("hex")}`);
			}

			offset += msgLen;
		}

		if (decoded.length === 0) return null;
		return decoded.length === 1 ? decoded[0] : decoded;
	}

	/**
	 * Builds JSON payload for device command.
	 */
	async buildPayload(protocol: number, messageID: number, method: string, params: any, version: string): Promise<string> {
		const timestamp = Math.floor(Date.now() / 1000);
		const endpoint = await this.adapter.mqtt_api.ensureEndpoint();

		// Protocol A01 simplified payload
		if (version === "A01") {
			return JSON.stringify({ dps: { [method]: params }, t: timestamp });
		}

		// Standard payload
		const inner: any = { id: messageID, method, params };

		// Add security context
		if (method === "get_photo") {
			const kp = cryptoEngine.ensureRsaKeys();
			(params as any).endpoint = endpoint;
			(params as any).security = { cipher_suite: 0, pub_key: kp.public };
		} else if (["get_map_v1", "get_clean_record_map"].includes(method)) {
			inner.security = {
				endpoint,
				nonce: this.adapter.nonce.toString("hex").toUpperCase(),
			};
		}

		// B01 payload (Nested Object, key "10000" refers to the control endpoint)
		if (version === "B01") {
			return JSON.stringify({ dps: { "10000": JSON.stringify(inner) }, t: timestamp });
		}

		return JSON.stringify({ dps: { [protocol]: JSON.stringify(inner) }, t: timestamp });
	}

	/**
	 * Builds complete Roborock binary frame.
	 */
	async buildRoborockMessage(duid: string, protocol: number, timestamp: number, payload: string | Buffer, version: string): Promise<Buffer | false> {
		const s = seq++ >>> 0;
		const r = random++ >>> 0;

		const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
		if (!localKey) return false;

		// Protocol 1 (Handshake)
		if (protocol === 1) {
			const msg = Buffer.alloc(HEADER_LEN + CRC32_LEN);
			msg.write(version);
			msg.writeUInt32BE(s, 3);
			msg.writeUInt32BE(r, 7);
			msg.writeUInt32BE(timestamp >>> 0, 11);
			msg.writeUInt16BE(protocol, 15);
			msg.writeUInt16BE(0, 17); // Payload 0
			appendCrc(msg);
			return msg;
		}

		let encrypted: Buffer;
		const payloadBuf = Buffer.isBuffer(payload) ? payload : Buffer.from(payload, "utf-8");

		// Encrypt
		if (version === "L01") {
			const connectNonce = this.adapter.local_api.localDevices[duid]?.connectNonce;
			const ackNonce = this.adapter.local_api.localDevices[duid]?.ackNonce;
			this.adapter.log.debug(`[buildRoborockMessage] Using connectNonce=${connectNonce} ackNonce=${ackNonce}`);

			if (!connectNonce || ackNonce == null) return false;

			encrypted = encryptors.L01(payloadBuf, localKey, timestamp, s, r, connectNonce, ackNonce);
		} else if (version === "1.0") {
			encrypted = encryptors["1.0"](payloadBuf, localKey, timestamp);
		} else if (version === "A01") {
			encrypted = encryptors.A01(payloadBuf, localKey, r);
		} else if (version === "B01") {
			encrypted = encryptors.B01(payloadBuf, localKey, r);
		} else {
			return false; // Unsupported
		}

		// Assemble message
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
