"use strict";

const mqtt = require("mqtt");
const crypto = require("crypto");
const Parser = require("binary-parser").Parser;
const CRC32 = require("crc-32");
const zlib = require("zlib");
const { EventEmitter2 } = require("eventemitter2");
const rr = new EventEmitter2();
const forge = require("node-forge");

let seq = 1;
let random = 4711; // Should be initialized with a number 0 - 1999?

const nonce = crypto.randomBytes(16);

// This value is stored hardcoded in librrcodec.so, encrypted by the value of "com.roborock.iotsdk.appsecret" from AndroidManifest.xml.
const salt = "TXdfu$jyZ#TZHsg4";

const mqttMessageParser = new Parser()
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

const protocol301Parser = new Parser()
	.endianess("little")
	.string("endpoint", {
		length: 15,
		stripNull: true,
	})
	.uint8("unknown1")
	.uint16("id")
	.buffer("unknown2", {
		length: 6,
	});

let mqttUser;
let mqttPassword;
let client;
let endpoint;
let rriot;
let devices;
let localKeys;

class roborock_mqtt_connector {
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

	initUser(userdata, homedata) {
		rriot = userdata.rriot;

		devices = homedata.devices.concat(homedata.receivedDevices);
		localKeys = new Map(devices.map((device) => [device.duid, device.localKey]));
		// this.adapter.log.debug(`initUser test: ${JSON.stringify(Array.from(localKeys.entries()))}`);

		endpoint = this.md5bin(rriot.k).subarray(8, 14).toString("base64"); // Could be a random but rather static string. The app generates it on first run.
		mqttUser = this.md5hex(rriot.u + ":" + rriot.k).substring(2, 10);
		// mqttUser = "52a9b8f4";
		mqttPassword = this.md5hex(rriot.s + ":" + rriot.k).substring(16);
		client = mqtt.connect(rriot.r.m, {
			username: mqttUser,
			password: mqttPassword,
			keepalive: 30,
		});
	}

	async initMQTT_Subscribe() {
		const timeout = setTimeout(async () => {
			this.adapter.catchError(`Connection timed out! Deleting UserData and trying again`, `initMQTT_Subscribe`);
			await this.adapter.deleteStateAsync("UserData");
			this.adapter.restart();
		}, 5000);

		await client.on("connect", (result) => {
			if (typeof result != "undefined") {
				client.subscribe(`rr/m/o/${rriot.u}/${mqttUser}/#`, (err, granted) => {
					if (err) {
						this.adapter.catchError(`Failed to subscribe to Roborock MQTT Server! Error: ${err}, granted: ${JSON.stringify(granted)}`, `client.on("connect")`);
					}
				});
				clearTimeout(timeout);
			}
		});

		await client.on("error", (result) => {
			this.adapter.catchError(`MQTT connection error: ${result}`, `client.on("error")`);
		});

		await client.on("close", () => {
			this.adapter.log.warn(`MQTT connection close.`);
		});

		await client.on("reconnect", () => {
			this.adapter.log.warn(`MQTT connection reconnect.`);
		});

		await client.on("offline", (result) => {
			this.adapter.catchError(`MQTT connection offline: ${result}`, `client.on("offline")`);
		});
	}

	_decodeMsg(msg, localKey) {
		try {
			// Do some checks before trying to decode the message.
			const version = msg.toString("latin1", 0, 3);

			if (version !== "1.0" && version !== "A01") {
				this.adapter.log.error(`_decodeMsg error: ${msg.toString("latin1", 0, 3)}`);
				// throw new Error(`Unknown protocol version ${msg} localKey: ${localKey}`);
			}
			const crc32 = CRC32.buf(msg.subarray(0, msg.length - 4)) >>> 0;
			const expectedCrc32 = msg.readUint32BE(msg.length - 4);
			if (crc32 != expectedCrc32) {
				throw new Error(`Wrong CRC32 ${crc32}, expected ${expectedCrc32}`);
			}

			const data = mqttMessageParser.parse(msg);
			delete data.payloadLen;
			const aesKey = this.md5bin(this._encodeTimestamp(data.timestamp) + localKey + salt);
			const decipher = crypto.createDecipheriv("aes-128-ecb", aesKey, null);
			data.payload = Buffer.concat([decipher.update(data.payload), decipher.final()]);
			return data;
		}
		catch (error) {
			this.adapter.log.error(`failed to _decodeMsg: ${error.stack}`);
			// this.adapter.catchError(error, "_decodeMessage", "none");
		}
	}

	async isArray(what) {
		return Object.prototype.toString.call(what) === "[object Array]";
	}

	async initMQTT_Message() {
		this.adapter.log.info(`MQTT initialized`);

		client.on("message", (topic, message) => {
			try {
				const duid = topic.split("/").slice(-1)[0];
				const localKey = localKeys.get(duid);
				if (localKey) {
					const data = this._decodeMsg(message, localKeys.get(duid));
					// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${localKeys.get(duid)} data: ${JSON.stringify(data)} raw: ${JSON.stringify(mqttMessageParser.parse(message))} message: ${message}`);
					// rr.emit("response.raw", duid, data);

					// this.adapter.log.debug("Protocol: " + data.protocol);
					if (data.protocol == 102) {
						// sometimes JSON.parse(data.payload).dps["102"] is not a JSON. Check for this!
						let dps;
						if (typeof JSON.parse(data.payload).dps["102"] != "undefined") {
							dps = JSON.parse(JSON.parse(data.payload).dps["102"]);
						} else {
							dps = JSON.parse(data.payload).dps;
						}
						this.adapter.log.debug("dps debug: " + JSON.stringify(dps));

						if (dps.result || dps.error) {
							rr.emit("response.102", duid, dps.id, dps.result || dps.error);
						} else {
							rr.emit("foreign.message", duid, dps);
						}
					} else if (data.protocol == 301) {
						const data2 = protocol301Parser.parse(data.payload.subarray(0, 24));

						// this.adapter.log.debug("result.payload: " + data.payload);
						if (data.payload.subarray(0, 8) == "ROBOROCK") {
							rr.emit("response.301", duid, null, data.payload);
						} else if (endpoint.startsWith(data2.endpoint)) {
							const iv = Buffer.alloc(16, 0);
							const decipher = crypto.createDecipheriv("aes-128-cbc", nonce, iv);
							let decrypted = Buffer.concat([decipher.update(data.payload.subarray(24)), decipher.final()]);
							decrypted = zlib.gunzipSync(decrypted);
							// this.adapter.log.debug("raw 301: " + decrypted);
							rr.emit("response.301", duid, data2.id, decrypted);
						}
					}
				}
				else {
					this.adapter.log.warn(`Unable to decode message for ${duid}. The the device is most likely offline.`);
				}
			}
			catch (error) {
				this.adapter.log.error(`client.on message: ${error.stack} with topic ${topic} and message ${message}`);
			}
		});

		// rr.on("response.raw", (duid, result) => {
		// 	this.adapter.log.debug("raw: " + JSON.stringify(result));
		// });

		rr.on("foreign.message", (duid, result) => {
			for (const attribute in result) {
				this.adapter.log.debug(`foreign.message attribute: ${attribute} with value: ${JSON.stringify(result[attribute])} for duid: ${duid}`);
				switch (attribute) {
					case "121":
						if (this.adapter.isCleaning(result[attribute])) {
							this.adapter.log.debug(`Robot ${duid} is cleaning. Starting map updater.`);
							this.adapter.startMapUpdater(duid);
						} else {
							this.adapter.stopMapUpdater(duid);
						}
				}
			}
		});
	}

	_encodeTimestamp(timestamp) {
		const hex = timestamp.toString(16).padStart(8, "0").split("");
		return [5, 6, 3, 7, 1, 2, 0, 4].map((idx) => hex[idx]).join("");
	}

	createRequestId() {
		let requestId = Math.floor(Math.random() * 9000) + 1000;
		while (this.adapter.messageQueue.has(requestId)) {
			requestId = Math.floor(Math.random() * 9000) + 1000;
		}

		return requestId;
	}

	async sendRequest(deviceId, method, params, secure = false, photo = false) {
		// Check if robot is online before sending a request. This reduces timeouts.
		if (!(await this.adapter.onlineChecker(deviceId))) {
			this.adapter.log.debug(`Not sending request. Device ${deviceId} is offline.`);
			return;
		}

		const timestamp = Math.floor(Date.now() / 1000);
		const requestId = this.createRequestId();
		// this.adapter.log.debug("sendRequest started with: " + requestId);

		if (photo) {
			params.endpoint = endpoint;
			params.security = {
				cipher_suite: 0,
				pub_key: this.keys.public,
			};
		}

		const inner = {
			id: requestId,
			method: method,
			params: params,
		};
		if (secure) {
			if (!photo) {
				inner.security = {
					endpoint: endpoint,
					nonce: nonce.toString("hex").toUpperCase(),
				};
			}
		}
		const payload = JSON.stringify({
			t: timestamp,
			dps: {
				101: JSON.stringify(inner),
			},
		});

		return new Promise((resolve, reject) => {
			const listener102 = (deviceId, id, result) => {
				if (id == requestId) {
					rr.off("response.102", listener102);
					this.adapter.clearTimeout(this.adapter.messageQueue.get(requestId)?.timeout102);
					this.adapter.clearTimeout(this.adapter.messageQueue.get(requestId)?.timeout102);
					(this.adapter.messageQueue.get(requestId) || {}).timeout102 = null;
					this.checkAndClearRequest(requestId);

					if (result.code) {
						reject(new Error(`There was an error processing the request with id ${requestId} error: ${JSON.stringify(result)}`));
					} else {
						if (secure) {
							if (result[0] !== "ok") {
								reject(result);
							}
						} else {
							resolve(result);
						}
					}
				}
			};

			const timeout102 = this.adapter.setTimeout(() => {
				rr.off("response.102", listener102);
				(this.adapter.messageQueue.get(requestId) || {}).timeout102 = null;
				(this.adapter.messageQueue.get(requestId) || {}).timeout301 = null;
				this.checkAndClearRequest(requestId);
				reject(new Error(`Request with id ${requestId} timed out after 10 seconds for response.102`));
			}, 10000);

			rr.on("response.102", listener102);

			let listener301, timeout301;
			if (secure) {
				listener301 = (deviceId, id, result) => {
					if (photo) {
						resolve(result);
					} else if (id == requestId) {
						rr.off("response.301", listener301);
						this.adapter.clearTimeout(this.adapter.messageQueue.get(requestId)?.timeout301);
						(this.adapter.messageQueue.get(requestId) || {}).timeout301 = null;
						this.checkAndClearRequest(requestId);

						if (result.code) {
							reject(new Error(`There was an error processing the request with id ${requestId} error: ${JSON.stringify(result)}`));
						} else {
							resolve(result);
						}
					}
				};

				timeout301 = this.adapter.setTimeout(() => {
					rr.off("response.301", listener301);
					(this.adapter.messageQueue.get(requestId) || {}).timeout102 = null;
					(this.adapter.messageQueue.get(requestId) || {}).timeout301 = null;
					this.checkAndClearRequest(requestId);
					reject(new Error(`Request with ${requestId} timed out after 10 seconds for response.301`));
				}, 10000);

				rr.on("response.301", listener301);
			}

			this.adapter.messageQueue.set(requestId, {
				timeout102,
				timeout301,
				listener102,
				listener301,
			});

			this.sendMsgRaw(deviceId, 101, timestamp, payload);
			// this.adapter.log.debug("Promise for requestId " + requestId + " created.");
		});
	}

	checkAndClearRequest(requestId) {
		const request = this.adapter.messageQueue.get(requestId);
		if (!request?.timeout102 && !request?.timeout301) {
			this.adapter.messageQueue.delete(requestId);
			// this.adapter.log.debug("Cleared messageQueue");
		} else {
			this.adapter.log.debug(`Not clearing messageQueue. ${request.timeout102}  - ${request.timeout301}`);
		}
		this.adapter.log.debug(`Length of message queue: ${this.adapter.messageQueue.size}`);
	}

	sendMsgRaw(deviceId, protocol, timestamp, payload) {
		const localKey = localKeys.get(deviceId);
		const aesKey = this.md5bin(this._encodeTimestamp(timestamp) + localKey + salt);
		const cipher = crypto.createCipheriv("aes-128-ecb", aesKey, null);
		const encrypted = Buffer.concat([cipher.update(payload), cipher.final()]);
		const msg = Buffer.alloc(23 + encrypted.length);
		msg.write("1.0");
		msg.writeUint32BE(seq++ & 0xffffffff, 3);
		msg.writeUint32BE(random++ & 0xffffffff, 7);
		msg.writeUint32BE(timestamp, 11);
		msg.writeUint16BE(protocol, 15);
		msg.writeUint16BE(encrypted.length, 17);
		encrypted.copy(msg, 19);
		const crc32 = CRC32.buf(msg.subarray(0, msg.length - 4)) >>> 0;
		msg.writeUint32BE(crc32, msg.length - 4);
		client.publish(`rr/m/i/${rriot.u}/${mqttUser}/${deviceId}`, msg);
	}

	reconnectClient() {
		if (client) {
			try {
				client.end();
				client.reconnect();
			} catch (error) {
				this.adapter.catchError(`Failed to reconnect with error: ${error}`, `reconnectClient`);
			}
		}
	}

	md5hex(str) {
		return crypto.createHash("md5").update(str).digest("hex");
	}

	md5bin(str) {
		return crypto.createHash("md5").update(str).digest();
	}

	decryptWithPrivateKey(privateKeyPem, encryptedData) {
		const privateKey = crypto.createPrivateKey({
			key: privateKeyPem,
			format: "pem",
			type: "pkcs8",
		});

		const decryptedData = crypto.privateDecrypt(
			{
				key: privateKey,
				padding: crypto.constants.RSA_PKCS1_PADDING,
			},
			encryptedData
		);

		return decryptedData;
	}
}

module.exports = {
	roborock_mqtt_connector,
};
