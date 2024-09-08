"use strict";

const crypto = require("crypto");
const CRC32 = require("crc-32");
const Parser = require("binary-parser").Parser;
const forge = require("node-forge");

let seq = 1;
let random = 4711; // Should be initialized with a number 0 - 1999?

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

class message {
	constructor(adapter) {
		this.adapter = adapter;

		const keypair = forge.pki.rsa.generateKeyPair(2048);
		this.keys = {
			public: { n: null, e: null },
			private: {
				n: null,
				e: null,
				d: null,
				p: null,
				q: null,
				dmp1: null,
				dmq1: null,
				coeff: null,
			},
		};

		// Convert the keys to the desired format
		this.keys.public.n = keypair.publicKey.n.toString(16);
		this.keys.public.e = keypair.publicKey.e.toString(16);
		this.keys.private.n = keypair.privateKey.n.toString(16);
		this.keys.private.e = keypair.privateKey.e.toString(16);
		this.keys.private.d = keypair.privateKey.d.toString(16);
		this.keys.private.p = keypair.privateKey.p.toString(16);
		this.keys.private.q = keypair.privateKey.q.toString(16);
		this.keys.private.dmp1 = keypair.privateKey.dP.toString(16);
		this.keys.private.dmq1 = keypair.privateKey.dQ.toString(16);
		this.keys.private.coeff = keypair.privateKey.qInv.toString(16);
	}

	buildPayload(protocol, messageID, method, params, secure = false, photo = false) {
		const timestamp = Math.floor(Date.now() / 1000);
		const endpoint = this.adapter.rr_mqtt_connector.getEndpoint();
		// this.adapter.log.debug("sendRequest started with: " + requestId);

		if (photo) {
			params.endpoint = endpoint;
			params.security = {
				cipher_suite: 0,
				pub_key: this.keys.public,
			};
		}

		const inner = {
			id: messageID,
			method: method,
			params: params,
		};
		if (secure) {
			if (!photo) {
				inner.security = {
					endpoint: endpoint,
					nonce: this.adapter.nonce.toString("hex").toUpperCase(),
				};
			}
		}

		const payload = JSON.stringify({
			dps: {
				[protocol]: JSON.stringify(inner),
			},
			t: timestamp,
		});

		return payload;
	}

	async buildRoborockMessage(duid, protocol, timestamp, payload) {
		const version = await this.adapter.getRobotVersion(duid);

		let encrypted;

		if (version == "1.0") {
			const localKey = this.adapter.localKeys.get(duid);
			const aesKey = this.md5bin(this._encodeTimestamp(timestamp) + localKey + salt);
			const cipher = crypto.createCipheriv("aes-128-ecb", aesKey, null);
			encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);

		}
		else if (version == "A01") {
			const localKey = this.adapter.localKeys.get(duid);

			const iv = this.md5hex(payload.random.toString(16).padStart(8, "0") + "726f626f726f636b2d67a6d6da").substring(8, 24); // 726f626f726f636b2d67a6d6da can be found in librrcodec.so of version 4.0 of the roborock app
			const cipher = crypto.createCipheriv("aes-128-cbc", localKey, iv);
			encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);
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

	_decodeMsg(message, duid) {
		try {
			// Do some checks before trying to decode the message.
			const version = message.toString("latin1", 0, 3);

			if (version !== "1.0" && version !== "A01") {
				this.adapter.log.error(`_decodeMsg error: ${message.toString("latin1", 0, 3)}`);
				// throw new Error(`Unknown protocol version ${msg} localKey: ${localKey}`);
			}
			const crc32 = CRC32.buf(message.subarray(0, message.length - 4)) >>> 0;
			const expectedCrc32 = message.readUint32BE(message.length - 4);
			if (crc32 != expectedCrc32) {
				throw new Error(`Wrong CRC32 ${crc32}, expected ${expectedCrc32}`);
			}

			const data = this.getParsedData(message);
			delete data.payloadLen;

			const localKey = this.adapter.localKeys.get(duid);
			if(version == "1.0") {
				const aesKey = this.md5bin(this._encodeTimestamp(data.timestamp) + localKey + salt);
				const decipher = crypto.createDecipheriv("aes-128-ecb", aesKey, null);
				data.payload = Buffer.concat([decipher.update(data.payload), decipher.final()]);
			}
			else if  (version == "A01") {
				const iv = this.md5hex(data.random.toString(16).padStart(8, "0") + "726f626f726f636b2d67a6d6da").substring(8, 24);
				const decipher = crypto.createDecipheriv("aes-128-cbc", localKey, iv);
				data.payload = Buffer.concat([decipher.update(data.payload), decipher.final()]);
			}

			return data;
		} catch (error) {
			this.adapter.log.error(`failed to _decodeMsg: ${error} local binary data: ${message.toString("hex")}`, null, duid);
			// this.adapter.catchError(error, "_decodeMessage", "none");
		}
	}

	getParsedData(data) {
		return messageParser.parse(data);
	}

	resolve102Message(messageID, message, secure = false) {
		return new Promise((resolve, reject) => {
			if (message?.code) {
				reject(new Error(`There was an error processing the request with id ${messageID} error: ${JSON.stringify(message)}`));
			} else {
				if (secure) {
					if (message[0] !== "ok") {
						reject(message);
					}
				} else {
					resolve(message);
				}
			}
		});
	}

	resolve301Message(messageID, message) {
		return new Promise((resolve, reject) => {
			this.adapter.clearTimeout(this.adapter.messageQueue.get(messageID)?.timeout301);
			(this.adapter.messageQueue.get(messageID) || {}).timeout301 = null;
			this.adapter.checkAndClearRequest(messageID);

			if (message?.code) {
				reject(new Error(`There was an error processing the request with id ${messageID} error: ${JSON.stringify(message)}`));
			} else {
				resolve(message);
			}
		});
	}

	_encodeTimestamp(timestamp) {
		const hex = timestamp.toString(16).padStart(8, "0").split("");
		return [5, 6, 3, 7, 1, 2, 0, 4].map((idx) => hex[idx]).join("");
	}

	md5bin(str) {
		return crypto.createHash("md5").update(str).digest();
	}

	md5hex(str) {
		return crypto.createHash("md5").update(str).digest("hex");
	}
}

module.exports = {
	message,
};
