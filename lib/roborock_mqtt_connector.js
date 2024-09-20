"use strict";

const mqtt = require("mqtt");
const crypto = require("crypto");
const Parser = require("binary-parser").Parser;
const zlib = require("zlib");
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

const photoParser = new Parser()
	.endianess("little")
	.string("roborock", {
		length: 8,
		stripNull: true,
	})
	.uint8("id");

let mqttUser;
let mqttPassword;
let client;
let endpoint;
let rriot;

let photoGzipChunks = [];
let photoChunkID = 0;

class roborock_mqtt_connector {
	constructor(adapter) {
		this.adapter = adapter;

		this.connected = false;

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

	async initUser(userdata) {
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

				this.connected = true;
			}
			this.adapter.log.debug(`MQTT connection connected ${JSON.stringify(result)}.`);
		});

		await client.on("error", (result) => {
			this.adapter.catchError(`MQTT connection error: ${result}`, `client.on("error")`);

			this.connected = false;
		});

		await client.on("close", () => {
			this.adapter.log.info(`MQTT connection close.`);

			this.connected = false;
		});

		await client.on("reconnect", (error) => {
			if (error) {
				this.adapter.catchError(`Failed to reconnect to MQTT server.`, `mqtt client reconnect`);
			} else {
				client.subscribe(`rr/m/o/${rriot.u}/${mqttUser}/#`, (err, granted) => {
					if (err) {
						this.adapter.catchError(`Failed to subscribe to Roborock MQTT Server! Error: ${err}, granted: ${JSON.stringify(granted)}`, `client.on("reconnect")`);
					}
				});
				clearTimeout(timeout);
			}
			this.adapter.log.info(`MQTT connection reconnect.`);
		});

		await client.on("offline", (result) => {
			this.adapter.catchError(`MQTT connection offline: ${result}`, `client.on("offline")`);

			this.connected = false;
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
				// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${this.adapter.localKeys.get(duid)} data: ${JSON.stringify(data.toString("hex"))} message: ${message}`);
				// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${this.adapter.localKeys.get(duid)} data: ${JSON.stringify(data)}`);

				// this.adapter.log.debug("Protocol: " + data.protocol);
				if (data.protocol == 102) {
					// sometimes JSON.parse(data.payload).dps["102"] is not a JSON. Check for this!
					let dps;
					if (typeof JSON.parse(data.payload).dps["102"] != "undefined") {
						dps = JSON.parse(JSON.parse(data.payload).dps["102"]);
					} else {
						dps = JSON.parse(data.payload).dps;
					}
					this.adapter.log.debug(`Cloud message with protocol 102 and id ${dps.id} received. Result: ${JSON.stringify(dps.result)}`);

					// special check for secure request like get_map_v1 etc. Don't process if result is OK. Instead wait for the actual response for protocol 301
					if (dps.result != "ok") {
						if (this.adapter.pendingRequests.has(dps.id)) {
							const { resolve, timeout } = this.adapter.pendingRequests.get(dps.id);
							this.adapter.clearTimeout(timeout);
							this.adapter.pendingRequests.delete(dps.id);
							resolve(dps.result);
						}
					}
					// protocol 300 seems to be for get_photo 0 only. get_photo 0 is for large images. 1 is for small images.
				} else if (data.protocol == 300) {
					if (data.payload.subarray(0, 8) == "ROBOROCK") {
						const photoData = photoParser.parse(data.payload);

						if (this.adapter.pendingRequests.has(photoData.id)) {
							this.adapter.log.debug(`First photo gzip chunk detected!`);

							photoGzipChunks.push(data.payload.slice(56));
							photoChunkID = photoData.id;
						}
					}
				} else if (data.protocol == 301) {
					const data2 = protocol301Parser.parse(data.payload.subarray(0, 24));

					if (data.seq == 2 && photoGzipChunks != [] && photoChunkID != 0) {
						this.adapter.log.debug(`Second photo gzip chunk detected!`);
						photoGzipChunks.push(data.payload);

						if (this.adapter.pendingRequests.has(photoChunkID)) {
							const { resolve, timeout } = this.adapter.pendingRequests.get(photoChunkID);
							this.adapter.clearTimeout(timeout);
							this.adapter.pendingRequests.delete(photoChunkID);

							const finalPhotoGzip = Buffer.concat(photoGzipChunks);

							photoGzipChunks = [];
							photoChunkID = 0;

							resolve(finalPhotoGzip);
						}
					} else {
						if (data.payload.subarray(0, 8) == "ROBOROCK") {
							const photoData = photoParser.parse(data.payload);
							this.adapter.log.debug(`Cloud message with protocol 301 and photo id ${photoData.id} received.`);

							if (this.adapter.pendingRequests.has(photoData.id)) {
								const { resolve, timeout } = this.adapter.pendingRequests.get(photoData.id);
								this.adapter.clearTimeout(timeout);
								this.adapter.pendingRequests.delete(photoData.id);
								this.adapter.log.debug(`Cloud message with protocol 301 and photo id ${photoData.id} received.`);
								resolve(data.payload.slice(56));
							}
						} else if (endpoint.startsWith(data2.endpoint)) {
							const iv = Buffer.alloc(16, 0);
							const decipher = crypto.createDecipheriv("aes-128-cbc", this.adapter.nonce, iv);
							let decrypted = Buffer.concat([decipher.update(data.payload.subarray(24)), decipher.final()]);
							decrypted = zlib.gunzipSync(decrypted);
							// this.adapter.log.debug("raw 301: " + decrypted);

							if (this.adapter.pendingRequests.has(data2.id)) {
								const { resolve, timeout } = this.adapter.pendingRequests.get(data2.id);
								this.adapter.clearTimeout(timeout);
								this.adapter.pendingRequests.delete(data2.id);
								// this.adapter.log.debug("protocol 301 OK check: " + JSON.stringify(decrypted));
								this.adapter.log.debug(`Cloud message with protocol 301 and id ${data2.id} received.`);
								resolve(decrypted);
							}
						}
					}
				} else {
					const dataString = data.payload.toString("utf8");
					let parsedData;

					try {
						parsedData = JSON.parse(dataString);
					} catch (error) {
						// If parsing fails, the data might be corrupted or in an unexpected format
						this.adapter.log.warn(`Unable to parse message for ${duid}. Error: ${error.message}. Data: ${dataString}`);
						return;
					}

					// Check if the device is online
					if (parsedData.online === false) {
						this.adapter.log.info(`Device ${duid} is offline.`);
					} else if (parsedData.online === true) {
						this.adapter.log.info(`Device ${duid} is online.`);
					}

					// Check for firmware update information
					if (parsedData.mqttOtaData) {
						const otaStatus = parsedData.mqttOtaData.mqttOtaStatus?.status;
						const otaProgress = parsedData.mqttOtaData.mqttOtaProgress?.progress;

						if (otaStatus) {
							this.adapter.log.info(`Device ${duid} firmware update status: ${otaStatus}`);
						}

						if (otaProgress !== undefined) {
							this.adapter.log.info(`Device ${duid} firmware update progress: ${otaProgress}%`);
						}
					} else {
						// Received an unrecognized message
						this.adapter.log.warn(`Received an unrecognized message for ${duid}. Data: ${dataString}`);
					}
				}
			} catch (error) {
				this.adapter.log.error(`client.on message: ${error.stack} with topic ${topic} and message ${message.toString("hex")}`);
			}
		});
	}

	_encodeTimestamp(timestamp) {
		const hex = timestamp.toString(16).padStart(8, "0").split("");
		return [5, 6, 3, 7, 1, 2, 0, 4].map((idx) => hex[idx]).join("");
	}

	getEndpoint() {
		return endpoint;
	}

	sendMessage(duid, roborockMessage) {
		client.publish(`rr/m/i/${rriot.u}/${mqttUser}/${duid}`, roborockMessage, { qos: 1 });
	}

	isConnected() {
		return this.connected;
	}

	async reconnectClient() {
		if (client) {
			try {
				this.adapter.log.info("Reconnecting mqtt client!");
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
