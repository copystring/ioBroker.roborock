"use strict";

const mqtt = require("mqtt");
const crypto = require("crypto");
const Parser = require("binary-parser").Parser;
const zlib = require("zlib");
const { EventEmitter2 } = require("eventemitter2");
const rr = new EventEmitter2();
const forge = require("node-forge");

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

	initUser(userdata) {
		rriot = userdata.rriot;

		endpoint = this.md5bin(rriot.k).subarray(8, 14).toString("base64"); // Could be a random but rather static string. The app generates it on first run.
		mqttUser = this.md5hex(rriot.u + ":" + rriot.k).substring(2, 10);
		mqttPassword = this.md5hex(rriot.s + ":" + rriot.k).substring(16);
		client = mqtt.connect(rriot.r.m, {
			clientId: mqttUser,
			username: mqttUser,
			password: mqttPassword,
			keepalive: 30,
		});
	}

	async initMQTT_Subscribe() {
		const timeout = setTimeout(async () => {
			this.adapter.restart();
		}, 30000);

		await client.on("connect", (result) => {
			if (typeof result != "undefined") {
				client.subscribe(`rr/m/o/${rriot.u}/${mqttUser}/#`, (err, granted) => {
					if (err) {
						this.adapter.catchError(`Failed to subscribe to Roborock MQTT Server! Error: ${err}, granted: ${JSON.stringify(granted)}`, `client.on("connect")`);
					}
				});
				clearTimeout(timeout);
			}
			this.adapter.log.debug(`MQTT connection connected ${JSON.stringify(result)}.`);
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

	async isArray(what) {
		return Object.prototype.toString.call(what) === "[object Array]";
	}

	async initMQTT_Message() {
		this.adapter.log.info(`MQTT initialized`);

		client.on("message", (topic, message) => {
			try {
				const duid = topic.split("/").slice(-1)[0];
				const data = this.adapter.message._decodeMsg(message, duid);
				// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${this.adapter.localKeys.get(duid)} data: ${JSON.stringify(data)} raw: ${JSON.stringify(mqttMessageParser.parse(message))} message: ${message}`);
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
						const decipher = crypto.createDecipheriv("aes-128-cbc", this.adapter.nonce, iv);
						let decrypted = Buffer.concat([decipher.update(data.payload.subarray(24)), decipher.final()]);
						decrypted = zlib.gunzipSync(decrypted);
						// this.adapter.log.debug("raw 301: " + decrypted);
						rr.emit("response.301", duid, data2.id, decrypted);
					}
				}
				else {
					this.adapter.log.warn(`Unable to decode message for ${duid}. The the device is most likely offline.`);
				}
			}
			catch (error) {
				this.adapter.log.error(`client.on message: ${error.stack} with topic ${topic} and message ${message.toString("hex")}`);
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

	async sendRequest(duid, method, params, secure = false, photo = false) {
		const messageID = this.adapter.getRequestId();
		// Check if robot is online before sending a request. This reduces timeouts.
		if (!(await this.adapter.onlineChecker(duid))) {
			this.adapter.log.debug(`Not sending request ${method}. Device ${duid} is offline.`);
			return;
		}

		const timestamp = Math.floor(Date.now() / 1000);
		const payload = this.adapter.message.buildPayload(duid, messageID, method, params, secure, photo, endpoint);
		const roborockMessage = await this.adapter.message.buildRoborockMessage(duid, 101, timestamp, payload);

		return new Promise((resolve, reject) => {
			const listener102 = (duid, id, result) => {
				if (id == messageID) {
					rr.off("response.102", listener102);
					this.adapter.clearTimeout(this.adapter.messageQueue.get(messageID)?.timeout102);
					this.adapter.clearTimeout(this.adapter.messageQueue.get(messageID)?.timeout102);
					(this.adapter.messageQueue.get(messageID) || {}).timeout102 = null;
					this.adapter.checkAndClearRequest(messageID);

					if (result.code) {
						reject(new Error(`There was an error processing the request with id ${messageID} error: ${JSON.stringify(result)}`));
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
				(this.adapter.messageQueue.get(messageID) || {}).timeout102 = null;
				(this.adapter.messageQueue.get(messageID) || {}).timeout301 = null;
				this.adapter.checkAndClearRequest(messageID);
				reject(new Error(`Request with id ${messageID} with method ${method} timed out after 10 seconds for response.102`));
			}, 10000);

			rr.on("response.102", listener102);

			let listener301, timeout301;
			if (secure) {
				listener301 = (deviceId, id, result) => {
					if (photo) {
						resolve(result);
					} else if (id == messageID) {
						rr.off("response.301", listener301);
						this.adapter.clearTimeout(this.adapter.messageQueue.get(messageID)?.timeout301);
						(this.adapter.messageQueue.get(messageID) || {}).timeout301 = null;
						this.adapter.checkAndClearRequest(messageID);

						if (result.code) {
							reject(new Error(`There was an error processing the request with id ${messageID} error: ${JSON.stringify(result)}`));
						} else {
							resolve(result);
						}
					}
				};

				timeout301 = this.adapter.setTimeout(() => {
					rr.off("response.301", listener301);
					(this.adapter.messageQueue.get(messageID) || {}).timeout102 = null;
					(this.adapter.messageQueue.get(messageID) || {}).timeout301 = null;
					this.adapter.checkAndClearRequest(messageID);
					reject(new Error(`Request with ${messageID} timed out after 10 seconds for response.301`));
				}, 10000);

				rr.on("response.301", listener301);
			}

			this.adapter.messageQueue.set(messageID, {
				timeout102,
				timeout301,
				listener102,
				listener301,
			});

			if (roborockMessage) {
				this.sendMsgRaw(duid, roborockMessage);
				// this.adapter.log.debug("Promise for requestId " + requestId + " created.");
			}
			else {
				this.adapter.catchError("Failed to build buildRoborockMessage for mqtt");
			}
		});
	}

	sendMsgRaw(duid, roborockMessage) {
		client.publish(`rr/m/i/${rriot.u}/${mqttUser}/${duid}`, roborockMessage, {qos: 1});
	}

	async reconnectClient() {
		if (client) {
			try {
				this.adapter.log.warn("Reconnecting mqtt client!");
				await client.end();
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
