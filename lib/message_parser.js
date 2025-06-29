"use strict";

const crypto = require("crypto");
const CRC32 = require("crc-32");
const Parser = require("binary-parser").Parser;
const forge = require("node-forge");

const HEADER_LEN = 3 + 4 + 4 + 4 + 2 + 2; // version + seq + random + timestamp + protocol + payloadLen
const CRC32_LEN = 4; // CRC32 length

let seq = 1;
let random = 4711; // Should be initialized with a number 0 - 1999?

const keypair = forge.pki.rsa.generateKeyPair(2048);
const keys = {
	public: { n: keypair.publicKey.n.toString(16), e: keypair.publicKey.e.toString(16) },
	private: {
		n: keypair.privateKey.n.toString(16),
		e: keypair.privateKey.e.toString(16),
		d: keypair.privateKey.d.toString(16),
		p: keypair.privateKey.p.toString(16),
		q: keypair.privateKey.q.toString(16),
		dmp1: keypair.privateKey.dP.toString(16),
		dmq1: keypair.privateKey.dQ.toString(16),
		coeff: keypair.privateKey.qInv.toString(16),
	},
};

// This value is stored hardcoded in librrcodec.so, encrypted by the value of "com.roborock.iotsdk.appsecret" from AndroidManifest.xml.
const salt = "TXdfu$jyZ#TZHsg4";

const messageParser = new Parser()
	.endianess("big")
	.string("version", {
		length: 3,
	})
	.uint32("seq")
	.uint32("random")
	.uint32("timestamp")
	.uint16("protocol")
	.uint16("payloadLen")
	.buffer("payload", {
		length: "payloadLen",
	})
	.uint32("crc32");

class message_parser {
	constructor(adapter) {
		this.adapter = adapter;
	}

	/**
	 * @param {Buffer} message
	 * @param {string} duid
	 */
	_decodeMsg(message, duid) {
		const decodedMessages = [];
		let offset = 0;
		while (offset + 3 <= message.length) {
			// Do some checks before trying to decode the message.
			const version = message.toString("latin1", offset, offset + 3);

			if (version !== "1.0" && version !== "A01") {
				// Skip to the next message if the version is not recognized
				this.adapter.log.error(`[decodeMsg] Unsupported version "${version}" at offset ${offset}. Skipping to next message.`);
				offset++;
				continue;
			}
			let data;
			try {
				data = this.getParsedData(message.subarray(offset));
			} catch (error) {
				this.adapter.log.error(`[decodeMsg] Message parsing failed at offset ${offset}: ${error}`);
				break;
			}

			const msgLen = HEADER_LEN + data.payloadLen + CRC32_LEN;
			if (offset + msgLen > message.length) {
				this.adapter.log.error(`[decodeMsg] Message at offset ${offset} is incomplete (need ${msgLen} bytes, have ${message.length - offset}).`);
				break;
			}
			const msgBuffer = message.subarray(offset, offset + msgLen);
			const crc32 = CRC32.buf(msgBuffer.subarray(0, msgBuffer.length - 4)) >>> 0;
			const expectedCrc32 = msgBuffer.readUInt32BE(msgBuffer.length - 4);
			if (crc32 !== expectedCrc32) {
				this.adapter.log.error(`[decodeMsg] CRC32 mismatch at offset ${offset}: ${crc32} != ${expectedCrc32}`);
				offset += msgLen;
				continue;
			}
			const localKeys = this.adapter.http_api.getMatchedLocalKeys();
			const localKey = localKeys.get(duid);
			if (!localKey) {
				this.adapter.log.error(`[decodeMsg] Local key not found for DUID ${duid}`);
				offset += msgLen;
				continue;
			}
			const dataCopy = Object.assign({}, data);

			try {
				switch (version) {
					case "1.0": {
						const aesKey = this.md5bin(this._encodeTimestamp(dataCopy.timestamp) + localKey + salt);
						const decipher = crypto.createDecipheriv("aes-128-ecb", aesKey, null);
						dataCopy.payload = Buffer.concat([decipher.update(dataCopy.payload), decipher.final()]);
						break;
					}
					case "A01": {
						const iv = this.md5hex(dataCopy.random.toString(16).padStart(8, "0") + "726f626f726f636b2d67a6d6da").substring(8, 24);
						const decipher = crypto.createDecipheriv("aes-128-cbc", localKey, iv);
						dataCopy.payload = Buffer.concat([decipher.update(dataCopy.payload), decipher.final()]);
						break;
					}
				}
				delete dataCopy.payloadLen;
				decodedMessages.push(dataCopy);
			} catch (err) {
				this.adapter.log.error(`failed to _decodeMsg: ${err.stack}. Local binary data: ${message.toString("hex")}`, null, duid);
			}
			// this.adapter.catchError(error, "_decodeMessage", "none");
			offset += msgLen;
		}
		if (decodedMessages.length === 0) return null;
		return decodedMessages.length === 1 ? decodedMessages[0] : decodedMessages;
	}

	getParsedData(data) {
		return messageParser.parse(data);
	}

	/**
	 * @param {string} duid
	 * @param {number} protocol
	 * @param {number} messageID
	 * @param {string} method
	 * @param {Array | Object} params
	 * @returns {Promise<string>}
	 */
	async buildPayload(duid, protocol, messageID, method, params) {
		const timestamp = Math.floor(Date.now() / 1000);
		const endpoint = await this.adapter.requests_handler.mqtt_api.ensureEndpoint();
		const version = await this.adapter.getDeviceProtocolVersion(duid);
		// this.adapter.log.debug("sendRequest started with: " + requestId);

		if (version == "A01") {
			const payload = JSON.stringify({ dps: { [method]: params }, t: timestamp });
			return payload;
		} else {
			const inner = {
				id: messageID,
				method: method,
				params: params,
			};

			if (method == "get_photo") {
				params.endpoint = endpoint;
				params.security = {
					cipher_suite: 0,
					pub_key: keys.public,
				};
			} else if (method == "get_map_v1" || method == "get_clean_record_map") {
				inner.security = {
					endpoint: endpoint,
					nonce: this.adapter.nonce.toString("hex").toUpperCase(),
				};
			}

			const payload = JSON.stringify({
				dps: {
					[protocol]: JSON.stringify(inner),
				},
				t: timestamp,
			});

			return payload;
		}
	}

	/**
	 * @param {string} duid
	 * @param {number} protocol
	 * @param {number} timestamp
	 * @param {string} payload
	 */
	async buildRoborockMessage(duid, protocol, timestamp, payload) {
		const version = await this.adapter.getDeviceProtocolVersion(duid);
		const localKeys = this.adapter.http_api.getMatchedLocalKeys();

		let encrypted;

		// credits to rovo89 for the following code. Especially for version A01!
		if (version == "1.0") {
			const localKey = localKeys.get(duid);
			const aesKey = this.md5bin(this._encodeTimestamp(timestamp) + localKey + salt);
			const cipher = crypto.createCipheriv("aes-128-ecb", aesKey, null);
			encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);
		} else if (version == "A01") {
			protocol = 101;
			const localKey = localKeys.get(duid);
			const randomHex = random.toString(16).padStart(8, "0"); // Convert the number to an 8-character hex string (zero-padded if needed)
			const iv = this.md5hex(randomHex + "726f626f726f636b2d67a6d6da").substring(8, 24); // 726f626f726f636b2d67a6d6da can be found in librrcodec.so of version 4.0 of the roborock app

			const keyBuffer = Buffer.from(localKey, "utf-8");
			const ivBuffer = Buffer.from(iv, "utf-8");
			const payloadBuffer = Buffer.isBuffer(payload) ? payload : Buffer.from(payload, "utf-8");

			// Apply PKCS7 padding
			const blockSize = 16;
			const padding = blockSize - (payloadBuffer.length % blockSize);
			const paddingBuffer = Buffer.alloc(padding, padding);
			const paddedPayload = Buffer.concat([payloadBuffer, paddingBuffer]);
			const cipher = crypto.createCipheriv("aes-128-cbc", keyBuffer, ivBuffer);
			encrypted = Buffer.concat([cipher.update(paddedPayload), cipher.final()]);

			// const cipher = crypto.createCipheriv("aes-128-cbc", localKey, iv);
			// encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);
		}

		if (encrypted) {
			const msg = Buffer.alloc(23 + encrypted.length);
			msg.write(version);
			msg.writeUint32BE(seq++ & 0xffffffff, 3);
			msg.writeUint32BE(random++ & 0xffffffff, 7);
			msg.writeUint32BE(timestamp, 11);
			msg.writeUint16BE(protocol, 15);
			msg.writeUint16BE(encrypted.length, 17);
			encrypted.copy(msg, 19);
			const crc32 = CRC32.buf(msg.subarray(0, msg.length - 4)) >>> 0;
			msg.writeUint32BE(crc32, msg.length - 4);

			return msg;
		}

		return false;
	}

	/**
	 * @param {number} timestamp
	 */
	_encodeTimestamp(timestamp) {
		const hex = timestamp.toString(16).padStart(8, "0").split("");
		return [5, 6, 3, 7, 1, 2, 0, 4].map((idx) => hex[idx]).join("");
	}

	/**
	 * @param {string} str
	 */
	md5bin(str) {
		return crypto.createHash("md5").update(str).digest();
	}

	/**
	 * @param {string} str
	 */
	md5hex(str) {
		return crypto.createHash("md5").update(str).digest("hex");
	}
}

module.exports = message_parser;
