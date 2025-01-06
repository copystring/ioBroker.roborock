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

let photoGzipChunks = [];
let photoChunkID = 0;

class mqtt_api {
	constructor(adapter) {
		this.adapter = adapter;

		this.mqttUser = "";
		this.mqttPassword = "";
		this.client = null;

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

	async init() {
		await this.initUser();
		await this.initMQTT_Subscribe(this.client);
		await this.initMQTT_Message();

		this.setupReconnectInterval();
	}

	async initUser() {
		const rriot = this.adapter.http_api.get_rriot();

		this.mqttUser = this.md5hex(rriot.u + ":" + rriot.k).substring(2, 10);
		this.mqttPassword = this.md5hex(rriot.s + ":" + rriot.k).substring(16);
		this.client = mqtt.connect(rriot.r.m, {
			clientId: this.mqttUser,
			username: this.mqttUser,
			password: this.mqttPassword,
			keepalive: 30,
		});
	}

	async initMQTT_Subscribe(client) {
		return new Promise(async (resolve, reject) => {
			let retryCount = 0;
			const maxRetries = 10;
			const retryDelay = 30000;

			const attemptConnection = async () => {
				const rriot = await this.adapter.http_api.get_rriot();

				const timeout = setTimeout(() => {
					if (retryCount < maxRetries) {
						retryCount++;
						this.adapter.log.warn(`Retrying MQTT connection (${retryCount}/${maxRetries})...`);
						attemptConnection();
					} else {
						reject(new Error(`Failed to connect to MQTT after ${maxRetries} attempts`));
					}
				}, retryDelay);

				client.on("connect", (result) => {
					clearTimeout(timeout);

					if (result) {
						client.subscribe(`rr/m/o/${rriot.u}/${this.mqttUser}/#`, (err, granted) => {
							if (err) {
								reject(new Error(`Failed to subscribe to Roborock MQTT Server! Error: ${err}, granted: ${JSON.stringify(granted)} client.on("connect")`));
							}
						});

						this.connected = true;
						this.adapter.log.info(`MQTT connection established ${JSON.stringify(result)}.`);
						resolve(result);
					} else {
						clearTimeout(timeout);
						reject(new Error("MQTT connection failed: No result on connect."));
					}
				});

				client.on("disconnect", () => {
					this.adapter.log.info(`MQTT disconnected.`);
					this.connected = false;
				});

				client.on("error", (result) => {
					this.adapter.catchError(`MQTT connection error: ${result}. rriot.r.m: ${rriot.r.m} rriot.u: ${rriot.u}`, "client.on('error')");
					this.connected = false;
				});

				client.on("close", () => {
					this.adapter.log.info(`MQTT connection closed.`);
					this.connected = false;
				});

				client.on("reconnect", (error) => {
					if (error) {
						this.adapter.catchError(`Failed to reconnect to MQTT server.`, "mqtt client reconnect");
					} else {
						client.subscribe(`rr/m/o/${rriot.u}/${this.mqttUser}/#`, (err, granted) => {
							if (err) {
								this.adapter.catchError(`Failed to subscribe to Roborock MQTT Server! Error: ${err}, granted: ${JSON.stringify(granted)}`, "client.on('reconnect')");
							}
						});
					}
					this.adapter.log.info(`MQTT connection reconnect.`);
				});

				client.on("offline", () => {
					this.adapter.catchError("MQTT connection offline.", "client.on('offline')");
					this.connected = false;
				});
			};

			attemptConnection();
		});
	}

	async initMQTT_Message() {
		if (this.client) {
			const endpoint = await this.ensureEndpoint();

			this.client.on("message", (topic, message) => {
				try {
					const duid = topic.split("/").slice(-1)[0];
					const data = this.adapter.requests_handler.message_parser._decodeMsg(message, duid);

					// const localKeys = this.adapter.http_api.getMatchedLocalKeys();
					// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${localKeys.get(duid)} data: ${JSON.stringify(data)} raw: ${JSON.stringify(mqttMessageParser.parse(message))} message: ${message}`);
					// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${localKeys.get(duid)} data: ${JSON.stringify(data.toString("hex"))} message: ${message}`);
					// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${localKeys.get(duid)} data: ${JSON.stringify(data)}`);

					// this.adapter.log.debug("Protocol: " + data.protocol);
					if (data.protocol == 102) {
						// sometimes JSON.parse(data.payload).dps["102"] is not a JSON. Check for this!
						let dps;
						if (typeof JSON.parse(data.payload).dps["102"] != "undefined") {
							dps = JSON.parse(JSON.parse(data.payload).dps["102"]);
						} else {
							dps = JSON.parse(data.payload).dps;
						}
						this.adapter.log.debug(`Cloud message for ${duid} with protocol 102 and id ${dps.id} received. Result: ${JSON.stringify(dps.result)}`);

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
							const data2 = protocol301Parser.parse(data.payload.subarray(0, 24));

							this.adapter.log.debug(`endpoint debug data.payload ${data.payload}`);
							this.adapter.log.debug(`endpoint debug data2 ${JSON.stringify(data2)}`);
							this.adapter.log.debug(`endpoint debug endpoint ${endpoint} data2.endpoint ${data2.endpoint}`);

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
					} else if (data.protocol == 500) {
						// 500 is for general information
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
						if (parsedData.online == false) {
							this.adapter.log.info(`Couldn't process message. The device ${duid} is offline.`);
						} else if (parsedData.online == true) {
							// this.adapter.log.info(`Device ${duid} is online.`);
						} else if (
							// Check for firmware update information
							parsedData.mqttOtaData
						) {
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
					} else {
						this.adapter.log.debug(`Received message with unknown protocol ${data.protocol} data: ${JSON.stringify(data)}.`);
					}
				} catch (error) {
					this.adapter.log.error(`client.on message: ${error.stack} with topic ${topic} and message ${message.toString("hex")}`);
				}
			});
			this.adapter.log.info(`MQTT initialized`);
		}
	}

	setupReconnectInterval() {
		this.reconnectApiInterval = this.adapter.setInterval(async () => {
			// clean disconnect and reconnect every hour
			// await this.disconnectClient();

			await this.init();
		}, 60 * 60 * 1000); // 1 hour interval
	}
	clearIntervals() {
		if (this.reconnectApiInterval) this.adapter.clearInterval(this.reconnectApiInterval);
	}

	_encodeTimestamp(timestamp) {
		const hex = timestamp.toString(16).padStart(8, "0").split("");
		return [5, 6, 3, 7, 1, 2, 0, 4].map((idx) => hex[idx]).join("");
	}

	async ensureEndpoint() {
		const rriot = this.adapter.http_api.get_rriot();

		try {
			const endpoint = await this.adapter.getStateAsync("endpoint");
			if (!endpoint || !endpoint.val) {
				const randomEndpoint = this.md5bin(rriot.k).subarray(8, 14).toString("base64"); // Could be a random but rather static string. The app generates it on first run.
				await this.adapter.setState("endpoint", { val: randomEndpoint, ack: true });
				this.adapter.log.info(`Generated and saved new endpoint: ${randomEndpoint}`);
				return randomEndpoint;
			} else {
				this.adapter.log.info(`Loaded existing endpoint: ${endpoint.val}`);
				return endpoint.val;
			}
		} catch (error) {
			this.adapter.log.error(`Error ensuring endpoint: ${error.message}`);
			throw error; // Optional, falls der Fehler weitergereicht werden soll
		}
	}

	async sendMessage(duid, roborockMessage) {
		const rriot = await this.adapter.http_api.get_rriot();

		if (this.client) {
			this.client.publish(`rr/m/i/${rriot.u}/${this.mqttUser}/${duid}`, roborockMessage, { qos: 1 });
		}
	}

	isConnected() {
		return this.connected;
	}

	async disconnectClient() {
		if (this.client) {
			try {
				this.adapter.log.info("Disconnecting mqtt client!");
				await this.client.end();
			} catch (error) {
				this.adapter.catchError(`Failed to disconnect with error: ${error}`, `disconnectClient`);
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

	async isArray(what) {
		return Object.prototype.toString.call(what) === "[object Array]";
	}
}

module.exports = mqtt_api;
