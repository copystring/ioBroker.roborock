import type { Roborock } from "../main";
import { cryptoEngine } from "./cryptoEngine";

import CRC32 from "crc-32";
import { Parser } from "binary-parser";

const HEADER_LEN = 3 + 4 + 4 + 4 + 2 + 2; // version + seq + random + timestamp + protocol + payloadLen
const CRC32_LEN = 4; // CRC32 length

// Global rolling counter
let seq = 1;
let random = 4711;

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

export class messageParser {
	adapter: Roborock;

	constructor(adapter: Roborock) {
		this.adapter = adapter;
	}

	/**
	 * Decodes one or more messages from a buffer.
	 */
	_decodeMsg(message: Buffer, duid: string) {
		const decoded: any[] = [];
		let offset = 0;

		while (offset + 3 <= message.length) {
			const version = message.toString("latin1", offset, offset + 3);
			if (!["1.0", "A01", "L01"].includes(version)) {
				this.adapter.log.error(`[decodeMsg] Unsupported version "${version}" at offset ${offset}`);
				offset++;
				continue;
			}

			let data: any;
			try {
				data = frameParser.parse(message.subarray(offset));
			} catch (err) {
				this.adapter.log.error(`[decodeMsg] Parse failed at offset ${offset}: ${err}`);
				break;
			}

			const msgLen = HEADER_LEN + data.payloadLen + CRC32_LEN;
			if (msgLen <= 0 || offset + msgLen > message.length) break;

			// Check CRC
			const msgBuffer = message.subarray(offset, offset + msgLen);
			const crc32 = CRC32.buf(msgBuffer.subarray(0, msgLen - 4)) >>> 0;
			if (crc32 !== msgBuffer.readUInt32BE(msgLen - 4)) {
				this.adapter.log.error(`[decodeMsg] CRC32 mismatch at offset ${offset}`);
				offset += msgLen;
				continue;
			}

			// Retrieve key
			const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
			if (!localKey) {
				this.adapter.log.error(`[decodeMsg] No localKey for DUID ${duid}`);
				offset += msgLen;
				continue;
			}

			// Decrypt payload
			const frame = { ...data };
			try {
				switch (version) {
					case "1.0":
						frame.payload = cryptoEngine.decryptV1(frame.payload, localKey, frame.timestamp);
						break;
					case "A01":
						frame.payload = cryptoEngine.decryptA01(frame.payload, localKey, frame.random);
						break;
					case "L01":
					frame.payload = cryptoEngine.decryptL01(
						frame.payload,
						localKey,
						frame.timestamp,
						frame.seq,
						frame.random,
						this.adapter.connectNonce,
						this.adapter.ackNonce?.get(duid)
					);
				}
				delete frame.payloadLen;
				decoded.push(frame);
			} catch (err: any) {
				this.adapter.log.error(`[_decodeMsg] Decrypt failed: ${err?.stack || err}`);
			}

			offset += msgLen;
		}

		if (decoded.length === 0) return null;
		return decoded.length === 1 ? decoded[0] : decoded;
	}

	/**
	 * Builds the JSON payload for the device.
	 */
	async buildPayload(duid: string, protocol: number, messageID: number, method: string, params: any) {
		const timestamp = Math.floor(Date.now() / 1000);
		const endpoint = await this.adapter.mqtt_api.ensureEndpoint();
		const version = await this.adapter.getDeviceProtocolVersion(duid);

		if (version === "A01") {
			return JSON.stringify({ dps: { [method]: params }, t: timestamp });
		}

		const inner: any = { id: messageID, method, params };

		if (method === "get_photo") {
			const kp = cryptoEngine.ensureRsaKeys();
			(params as any).endpoint = endpoint;
			(params as any).security = { cipher_suite: 0, pub_key: kp.public };
		} else if (["get_map_v1", "get_clean_record_map"].includes(method)) {
			inner.security = { endpoint, nonce: this.adapter.nonce.toString("hex").toUpperCase() };
		}

		return JSON.stringify({ dps: { [protocol]: JSON.stringify(inner) }, t: timestamp });
	}

	/**
	 * Builds the final Roborock frame and encrypts the payload.
	 */
	async buildRoborockMessage(duid: string, protocol: number, timestamp: number, payload: string | Buffer) {
		const version = await this.adapter.getDeviceProtocolVersion(duid);
		const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);

		if (!localKey) return false;

		const payloadBuf = Buffer.isBuffer(payload) ? payload : Buffer.from(payload, "utf-8");
		let encrypted: Buffer | undefined;

		try {
			switch (version) {
				case "1.0":
					encrypted = cryptoEngine.encryptV1(payloadBuf, localKey, timestamp);
					break;
				case "A01":
					encrypted = cryptoEngine.encryptA01(payloadBuf, localKey, random);
					break;
				case "L01":
					encrypted = cryptoEngine.encryptL01(payloadBuf, localKey, timestamp, seq, random, this.adapter.connectNonce, this.adapter.ackNonce?.get(duid));
					break;
				default:
					return false;
			}
		} catch (err) {
			this.adapter.log.error(`[buildRoborockMessage] Encrypt failed: ${err}`);
			return false;
		}

		if (!encrypted) return false;

		// Assemble header and payload
		const s = seq++ >>> 0;
		const r = random++ >>> 0;
		const msg = Buffer.alloc(23 + encrypted.length);
		msg.write(version);
		msg.writeUInt32BE(s, 3);
		msg.writeUInt32BE(r, 7);
		msg.writeUInt32BE(timestamp >>> 0, 11);
		msg.writeUInt16BE(protocol, 15);
		msg.writeUInt16BE(encrypted.length, 17);
		encrypted.copy(msg, 19);
		msg.writeUInt32BE(CRC32.buf(msg.subarray(0, msg.length - 4)) >>> 0, msg.length - 4);

		return msg;
	}
}
