import { Parser } from "binary-parser";
import * as crc32 from "crc-32";
import { z } from "zod";
import { Roborock } from "../main";
import { cryptoEngine } from "./cryptoEngine";

export type ProtocolVersion = "1.0" | "A01" | "L01" | "B01" | "\x81S\x19";

const SUPPORTED_VERSIONS: ProtocolVersion[] = ["1.0", "A01", "L01", "B01", "\x81S\x19"] as const;

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
	"\x81S\x19": (payload, key, random) => cryptoEngine.decryptB01(payload, key, random),
};

const encryptors: Record<ProtocolVersion, (...args: any[]) => Buffer> = {
	"1.0": (payload, key, timestamp) => cryptoEngine.encryptV1(payload, key, timestamp),
	A01: (payload, key, random) => cryptoEngine.encryptA01(payload, key, random),
	L01: (payload, key, timestamp, seq, random, connectNonce, ackNonce) => cryptoEngine.encryptL01(payload, key, timestamp, seq, random, connectNonce, ackNonce),
	B01: (payload, key, random) => cryptoEngine.encryptB01(payload, key, random),
	"\x81S\x19": (payload, key, random) => cryptoEngine.encryptB01(payload, key, random),
};

export class messageParser {
	adapter: Roborock;

	constructor(adapter: Roborock) {
		this.adapter = adapter;
	}

	/**
	 * Decodes a buffer containing Roborock protocol messages.
	 * Returns an array of frames (empty if none decoded).
	 */
	decodeMsg(message: Buffer, duid: string): Frame[] {
		const decoded: Frame[] = [];
		let offset = 0;

		while (offset + 3 <= message.length) {
			// Check protocol version
			const version = message.toString("latin1", offset, offset + 3) as ProtocolVersion;

			if (!SUPPORTED_VERSIONS.includes(version)) {
				this.adapter.rLog("Requests", duid, "Error", version, undefined, `Unsupported version at offset ${offset} | Hex: ${message.toString("hex")}`, "error");

				// Skip corrupted message block
				const MIN_MSG_LENGTH = 23;
				offset += MIN_MSG_LENGTH;
				continue;
			}

			let raw: unknown;
			try {
				raw = frameParser.parse(message.subarray(offset));
			} catch (err) {
				this.adapter.rLog("Requests", duid, "Error", version, undefined, `Parse failed at offset ${offset}: ${err}`, "error");
				break;
			}

			let data: Frame;
			try {
				data = FrameSchema.parse(raw) as Frame;
				data.version = version;
			} catch (err) {
				this.adapter.rLog("Requests", duid, "Error", version, undefined, `Validation failed: ${err}`, "error");
				break;
			}

			const msgLen = HEADER_LEN + data.payloadLen + CRC32_LEN;
			if (msgLen <= 0 || offset + msgLen > message.length) break;

			// Validate CRC
			const msgBuffer = message.subarray(offset, offset + msgLen);
			if (!validateCrc(msgBuffer)) {
				this.adapter.rLog("Requests", duid, "Error", version, undefined, `CRC32 mismatch at offset ${offset}`, "error");
				offset += msgLen;
				continue;
			}

			// Get local key
			const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
			if (!localKey) {
				this.adapter.rLog("Requests", duid, "Error", version, undefined, "No localKey found", "error");
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
			} catch (err: unknown) {
				this.adapter.rLog("Requests", duid, "Error", version, undefined, `Decryption failed at offset ${offset}: ${this.adapter.errorMessage(err)} | Hex: ${message.toString("hex")}`, "error");
			}

			offset += msgLen;
		}

		return decoded;
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

		// Add security context ONLY for MQTT
		if (method === "get_photo" && protocol === 101) {
			const kp = cryptoEngine.ensureRsaKeys();
			// converting params to any to avoid TS errors
			const p = params as any;

			// FORCE Endpoint to "xxx" as per S7 MaxV protocol (and user log)
			p.endpoint = "xxx";

			// FORCE Cipher Suite 1 (RSA+AES)
			const cipherSuite = 1;

			// FORCE Security Object to match S7 MaxV (Cipher 1 + RSA, NO NONCE here)
			p.security = {
				cipher_suite: cipherSuite,
				pub_key: {
					e: kp.public.e,
					n: kp.public.n,
				},
			};

			// Add root-level security (nonce/endpoint)
			inner.security = {
				endpoint: endpoint,
				nonce: this.adapter.nonce.toString("hex").toUpperCase(),
			};
		} else if (["get_map_v1", "get_clean_record_map"].includes(method)) {
			// For TCP get_photo (and maps), we need the basic security wrapper (endpoint+nonce)
			// but NOT the RSA keys in params.
			inner.security = {
				endpoint,
				nonce: this.adapter.nonce.toString("hex").toUpperCase(),
			};
		}

		// B01 payload (Nested Object, key "10000" refers to the control endpoint)
		if (version === "B01") {
			// B01 Protocol Specifics:
			// 1. Wrapper is { dps: { "10000": innerObject } }
			// 2. 'inner' is an OBJECT (not stringified)
			// 3. 'id' is Number, 'msgId' is String
			// 4. Timestamp 't' is in the header, not JSON body for commands (but standard wrapper adds it to root)

			inner.msgId = String(messageID);
			// inner.id is already Number from line 197

			// 6. Map B01 payload structure based on method type.
			// If method is already a direct B01 protocol command, pass it through.
			if (method === "prop.get" || method === "prop.set" || method === "prop" || method.startsWith("service.")) {
				inner.method = method === "prop" ? "prop.set" : method;
				inner.params = params;

				// Fix double-encoded JSON params (e.g. from generic 'prop' command state)
				if (typeof inner.params === "string") {
					try {
						inner.params = JSON.parse(inner.params);
					} catch  {
						// Keep as string if parse fails
					}
				}

				// Map legacy keys in params object if needed (e.g. fan_power -> wind)
				if (typeof inner.params === "object" && inner.params !== null && !Array.isArray(inner.params)) {
					const paramObj = inner.params as Record<string, any>;
					if (paramObj.fan_power !== undefined) {
						paramObj.wind = paramObj.fan_power;
						delete paramObj.fan_power;
					}
					if (paramObj.water_box_mode !== undefined) {
						paramObj.water = paramObj.water_box_mode;
						delete paramObj.water_box_mode;
					}
					if (paramObj.mop_mode !== undefined) {
						paramObj.mode = paramObj.mop_mode;
						delete paramObj.mop_mode;
					}
				}
			} else if (method === "get_prop") {
				inner.method = "prop.get";
				inner.params = { property: params };
			} else if (method === "get_map_v1") {
				inner.method = "service.upload_by_maptype";
				inner.params = { force: 1, map_type: 0 };
			} else if (method === "get_room_mapping") {
				inner.method = "service.get_map_list";
				inner.params = {};
			} else if (["app_start", "app_stop", "app_pause", "app_charge"].includes(method)) {
				// Maps to prop.set { status: X }
				const statusMap: Record<string, number> = {
					app_start: 1,
					app_stop: 2,
					app_pause: 10,
					app_charge: 6
				};
				inner.method = "prop.set";
				inner.params = { status: statusMap[method] };
			} else if (method === "set_custom_mode") {
				// Fan Power
				inner.method = "prop.set";
				inner.params = { wind: params[0] };
			} else if (method === "set_water_box_custom_mode") {
				// Water Level
				inner.method = "prop.set";
				inner.params = { water: params[0] };
			} else if (method === "set_mop_mode") {
				if (params[0] >= 300) {
					inner.method = "prop.set";
					inner.params = { mode: params[0] };
				} else {
					inner.method = "prop.set";
					inner.params = { water: params[0] };
				}
			} else if (["along_floor", "green_laser", "status", "wind", "water", "fan_power", "water_box_mode", "mop_mode"].includes(method)) {
				// Handle both legacy names (fan_power) and B01 native names (wind)
				const keyMap: Record<string, string> = {
					"fan_power": "wind",
					"water_box_mode": "water",
					"mop_mode": "mode" // assuming mop_mode maps to 'mode' or similar
				};
				const key = keyMap[method] || method;
				inner.method = "prop.set";
				inner.params = { [key]: params[0] };
			} else if (method === "app_segment_clean") {
				inner.method = "service.segment_clean";
				inner.params = { segments: params[0] };
			} else if (method === "app_zoned_clean") {
				inner.method = "service.zoned_clean";
				inner.params = { zones: params[0] };
			}
			// Other methods (e.g. get_clean_record) are passed through as-is.

			// Note: 'prop.set' and service commands are passed through if generated correctly by features.
			// Ideally we would map set_custom_mode etc too, but that requires knowing the prop key.

			// For B01 MQTT/Cloud, requests go to DPS 10000 as a nested object (not string).
			// Responses come back on DPS 10001 as a nested stringified JSON.
			return JSON.stringify({ dps: { "10000": inner }, t: timestamp });
		}

		return JSON.stringify({ dps: { [protocol]: JSON.stringify(inner) }, t: timestamp });
	}

	/**
	 * Builds complete Roborock binary frame.
	 */
	async buildRoborockMessage(duid: string, protocol: number, timestamp: number, payload: string | Buffer, version: string, sequenceId?: number): Promise<Buffer | false> {
		const s = (sequenceId !== undefined ? sequenceId : seq++) >>> 0;
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
