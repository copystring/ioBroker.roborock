"use strict";

const mqtt = require("mqtt");
const crypto = require("crypto");
const Parser = require("binary-parser").Parser;
const zlib = require("zlib");
const forge = require("node-forge");

// Parser for protocol 301 messages
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

// Parser for photo data
const photoParser = new Parser()
	.endianess("little")
	.string("roborock", {
		length: 8,
		stripNull: true,
	})
	.uint8("id");

class mqtt_api {
	/**
	 * Constructor for the mqtt_api class.
	 * @param {object} adapter - The adapter instance.
	 */
	constructor(adapter) {
		this.adapter = adapter;

		this.mqttUser = "";
		this.mqttPassword = "";
		this.client = null;

		this.connected = false;

		// Generate an RSA key pair for encryption
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

		// Convert the keys to the desired format (hexadecimal strings)
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

		// Object to store pending photo requests
		this.pendingPhotoRequests = {};
	}

	/**
	 * Initializes the MQTT API.
	 */
	async init() {
		this.setup_mqtt_user();
		await this.connect_mqtt();
	}

	/**
	 * Sets up the MQTT user credentials.
	 */
	setup_mqtt_user() {
		const rriot = this.adapter.http_api.get_rriot();

		// Generate MQTT username and password based on rriot data
		this.mqttUser = this.md5hex(rriot.u + ":" + rriot.k).substring(2, 10);
		this.mqttPassword = this.md5hex(rriot.s + ":" + rriot.k).substring(16);

		this.mqttOptions = {
			clientId: this.mqttUser,
			username: this.mqttUser,
			password: this.mqttPassword,
			keepalive: 30,
		};
	}

	/**
	 * Connects to the MQTT broker.
	 */
	async connect_mqtt() {
		const rriot = this.adapter.http_api.get_rriot();
		const client = mqtt.connect(rriot.r.m, this.mqttOptions);
		this.client = client;

		try {
			await this.subscribe_mqtt_events(client);
			await this.subscribe_mqtt_message(client);

			this.connected = true;
		} catch (error) {
			this.adapter.log.error(`MQTT connection failed. Error: ${error.message}`);
			// Do not retry here
			this.connected = false;
			client.removeAllListeners();
			client.end();
		}
	}

	/**
	 * Subscribes to MQTT events.
	 * @param {object} client - The MQTT client.
	 */
	async subscribe_mqtt_events(client) {
		const rriot = await this.adapter.http_api.get_rriot();

		client.on("connect", (result) => {
			if (result) {
				// Subscribe to the necessary topic
				client.subscribe(`rr/m/o/${rriot.u}/${this.mqttUser}/#`, (error, granted) => {
					if (error) {
						this.adapter.catchError(`Failed to subscribe to Roborock MQTT Server! Error: ${error}, granted: ${JSON.stringify(granted)}`);
					}
				});

				this.connected = true;
				this.adapter.log.info(`MQTT connection established ${JSON.stringify(result)}.`);
			} else {
				this.adapter.catchError("MQTT connection failed: No result on connect.", "client.on('connect')");
			}
		});

		client.on("disconnect", () => {
			this.adapter.log.info(`MQTT disconnected.`);
			this.connected = false;
		});

		client.on("error", (result) => {
			this.adapter.log.error(`MQTT connection error: ${result}. rriot.r.m: ${rriot.r.m} rriot.u: ${rriot.u}`);
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
				client.subscribe(`rr/m/o/${rriot.u}/${this.mqttUser}/#`, (error, granted) => {
					if (error) {
						this.adapter.catchError(`Failed to subscribe to Roborock MQTT Server! Error: ${error}, granted: ${JSON.stringify(granted)}`, "client.on('reconnect')");
					}
				});
			}
			this.adapter.log.info(`MQTT connection reconnect.`);
		});

		client.on("offline", () => {
			this.adapter.log.error("MQTT connection went offline.");
			this.connected = false;
		});
	}

	/**
	 * Subscribes to MQTT messages.
	 * @param {object} client - The MQTT client.
	 */
	async subscribe_mqtt_message(client) {
		const endpoint = await this.ensureEndpoint();

		client.on("message", async (topic, message) => {
			try {
				const duid = topic.split("/").slice(-1)[0];
				// const localKeys = this.adapter.http_api.getMatchedLocalKeys();
				// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${localKeys.get(duid)} data: ${JSON.stringify(data)} raw: ${JSON.stringify(mqttMessageParser.parse(message))} message: ${message}`);
				// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${localKeys.get(duid)} data: ${JSON.stringify(data.toString("hex"))} message: ${message}`);
				// this.adapter.log.debug(`MESSAGE RECEIVED for duid ${duid} with key: ${localKeys.get(duid)} data: ${JSON.stringify(data)}`);

				// this.adapter.log.debug("Protocol: " + data.protocol);
				const dataArr = this.adapter.requests_handler.message_parser._decodeMsg(message, duid);

				const allMessages = Array.isArray(dataArr) ? dataArr : dataArr ? [dataArr] : [];
				for (const data of allMessages) {
					// this.adapter.log.debug("Protocol: " + data.protocol);
					if (data.version == "A01") {
						const parsedPayload = JSON.parse(data.payload);
						this.adapter.log.debug(`Received message for ${duid} with protocol A01 and parsedPayload ${JSON.stringify(parsedPayload)}.`);
						await this.adapter.processA01(duid, parsedPayload);
					} else if (data.protocol == 102) {
						// sometimes JSON.parse(data.payload).dps["102"] is not a JSON. Check for this!
						// Handle protocol 102 (general command responses)
						let dps;
						if (typeof JSON.parse(data.payload).dps["102"] != "undefined") {
							dps = JSON.parse(JSON.parse(data.payload).dps["102"]);
						} else {
							dps = JSON.parse(data.payload).dps;
						}
						// this.adapter.log.debug(`Cloud message for ${duid} with protocol 102 and id ${dps.id} received. Result: ${JSON.stringify(dps.result)}`);

						// special check for secure request like get_map_v1 etc. Don't process if result is OK. Instead wait for the actual response for protocol 301
						if (dps.result != "ok") {
							if (this.adapter.pendingRequests.has(dps.id)) {
								const { resolve, timeout } = this.adapter.pendingRequests.get(dps.id);
								this.adapter.clearTimeout(timeout);
								this.adapter.pendingRequests.delete(dps.id);
								resolve(dps.result);
							}
						}
					} else if (data.protocol == 300 || data.protocol == 301) {
						// Handle protocol 300 and 301 (photo data)
						this.handlePhotoData(data, endpoint);
					} else if (data.protocol == 500) {
						// Handle protocol 500 (device status information)
						const dataString = data.payload.toString("utf8");
						let parsedData;

						try {
							parsedData = JSON.parse(dataString);
						} catch (error) {
							// If parsing fails, the data might be corrupted or in an unexpected format
							this.adapter.log.warn(`Unable to parse message for ${duid}. Error: ${error.message}. Data: ${dataString}`);
							return;
						}

						if (parsedData.online == false) {
							this.adapter.log.info(`Couldn't process message. The device ${duid} is offline.`);
						} else if (parsedData.online == true) {
							// Device online status - no action needed
						} else if (parsedData.mqttOtaData) {
							const otaStatus = parsedData.mqttOtaData.mqttOtaStatus?.status;
							const otaProgress = parsedData.mqttOtaData.mqttOtaProgress?.progress;

							if (otaStatus) {
								this.adapter.log.info(`Device ${duid} firmware update status: ${otaStatus}`);
							}

							if (otaProgress !== undefined) {
								this.adapter.log.info(`Device ${duid} firmware update progress: ${otaProgress}%`);
							}
						} else {
							this.adapter.log.warn(`Received an unrecognized message for ${duid}. Data: ${dataString}`);
						}
					} else {
						this.adapter.log.warn(`Received message with unknown protocol ${data.protocol} data: ${JSON.stringify(data)}.`);
					}
				}
			} catch (error) {
				this.adapter.log.error(`client.on message: ${error.stack} with topic ${topic} and message ${message.toString("hex")}`);
			}
		});
		this.adapter.log.info(`MQTT initialized`);
	}

	/**
	 * Handles photo data received in chunks (protocol 300 and 301).
	 * @param {object} data - The received data.
	 * @param {string} endpoint - The endpoint.
	 */
	async handlePhotoData(data, endpoint) {
		if (data.protocol === 300 && data.payload.subarray(0, 8).toString() === "ROBOROCK") {
			// Handle the first chunk of a photo
			const photoData = photoParser.parse(data.payload);
			if (this.adapter.pendingRequests.has(photoData.id)) {
				this.adapter.log.debug(`First photo gzip chunk detected for ID ${photoData.id}!`);
				this.pendingPhotoRequests[photoData.id] = {
					chunks: [data.payload.slice(56)], // Store the first chunk
				};
			}
		} else if (data.protocol === 301) {
			// Handle subsequent chunks or other protocol 301 messages
			if (data.seq === 2 && this.pendingPhotoRequests[data.payload.id]?.chunks) {
				this.adapter.log.debug(`Second photo gzip chunk detected for ID ${data.payload.id}!`);
				this.pendingPhotoRequests[data.payload.id].chunks.push(data.payload);

				// If we have all chunks, resolve the pending request
				if (this.adapter.pendingRequests.has(data.payload.id)) {
					const { resolve, timeout } = this.adapter.pendingRequests.get(data.payload.id);
					clearTimeout(timeout);
					this.adapter.pendingRequests.delete(data.payload.id);

					const finalPhotoGzip = Buffer.concat(this.pendingPhotoRequests[data.payload.id].chunks);
					delete this.pendingPhotoRequests[data.payload.id];

					resolve(finalPhotoGzip);
				}
			} else {
				// Handle other protocol 301 messages (not photo chunks)
				const parsedData = protocol301Parser.parse(data.payload.subarray(0, 24));
				if (data.payload.subarray(0, 8).toString() === "ROBOROCK") {
					const photoData = photoParser.parse(data.payload);
					this.adapter.log.debug(`Cloud message with protocol 301 and photo id ${photoData.id} received.`);

					if (this.adapter.pendingRequests.has(photoData.id)) {
						const { resolve, timeout } = this.adapter.pendingRequests.get(photoData.id);
						clearTimeout(timeout);
						this.adapter.pendingRequests.delete(photoData.id);
						resolve(data.payload.slice(56));
					}
					// Handle map data
				} else if (endpoint.startsWith(parsedData.endpoint)) {
					// Decrypt and decompress the message
					const iv = Buffer.alloc(16, 0);
					const decipher = crypto.createDecipheriv("aes-128-cbc", this.adapter.nonce, iv);
					const decrypted = Buffer.concat([decipher.update(data.payload.subarray(24)), decipher.final()]);
					const unzipped = zlib.gunzipSync(decrypted);

					// Resolve the pending request with the decrypted data
					if (this.adapter.pendingRequests.has(parsedData.id)) {
						const { resolve, timeout } = this.adapter.pendingRequests.get(parsedData.id);
						clearTimeout(timeout);
						this.adapter.pendingRequests.delete(parsedData.id);
						this.adapter.log.debug(`Cloud message with protocol 301 and id ${parsedData.id} received.`);
						resolve(unzipped);
					}
				}
			}
		}
	}

	/**
	 * Encodes a timestamp into a specific format.
	 * @param {number} timestamp - The timestamp to encode.
	 * @returns {string} The encoded timestamp.
	 */
	_encodeTimestamp(timestamp) {
		const hex = timestamp.toString(16).padStart(8, "0").split("");
		return [5, 6, 3, 7, 1, 2, 0, 4].map((idx) => hex[idx]).join("");
	}

	/**
	 * Ensures that an endpoint exists, generating one if necessary.
	 * @returns {Promise<string>} A promise that resolves with the endpoint.
	 */
	async ensureEndpoint() {
		const rriot = this.adapter.http_api.get_rriot();

		const endpoint = await this.adapter.getStateAsync("endpoint");
		if (!endpoint || !endpoint.val) {
			// Generate a random endpoint if it doesn't exist
			const randomEndpoint = this.md5bin(rriot.k).subarray(8, 14).toString("base64");
			await this.adapter.setStateAsync("endpoint", { val: randomEndpoint, ack: true });
			this.adapter.log.info(`Generated and saved new endpoint: ${randomEndpoint}`);
			return randomEndpoint;
		} else {
			return endpoint.val;
		}
	}

	/**
	 * Sends a message to the MQTT broker.
	 * @param {string} duid - The device unique ID.
	 * @param {Buffer} roborockMessage - The message to send.
	 */
	async sendMessage(duid, roborockMessage) {
		const rriot = await this.adapter.http_api.get_rriot();

		if (this.client) {
			this.client.publish(`rr/m/i/${rriot.u}/${this.mqttUser}/${duid}`, roborockMessage, { qos: 1 });
		}
	}

	/**
	 * Checks if the MQTT client is connected.
	 * @returns {boolean} True if connected, false otherwise.
	 */
	isConnected() {
		return this.connected;
	}

	/**
	 * Disconnects the MQTT client.
	 */
	async disconnectClient() {
		if (this.client) {
			try {
				this.adapter.log.info("Disconnecting mqtt client!");
				await this.client.endAsync();
			} catch (error) {
				this.adapter.catchError(`Failed to disconnect with error: ${error}`, `disconnectClient`);
			}
		}
	}

	/**
	 * Calculates the MD5 hash of a string (hexadecimal representation).
	 * @param {string} str - The string to hash.
	 * @returns {string} The MD5 hash in hexadecimal format.
	 */
	md5hex(str) {
		return crypto.createHash("md5").update(str).digest("hex");
	}

	/**
	 * Calculates the MD5 hash of a string (binary representation).
	 * @param {string} str - The string to hash.
	 * @returns {Buffer} The MD5 hash in binary format.
	 */
	md5bin(str) {
		return crypto.createHash("md5").update(str).digest();
	}

	/**
	 * Clears any intervals or timers used by mqtt_api.
	 */
	clearIntervals() {
		// If there were any intervals or timers, they would be cleared here.
		// For now, reset pending photo requests.
		this.pendingPhotoRequests = {};
	}

	/**
	 * Cleanup resources used by mqtt_api before disposal.
	 */
	cleanup() {
		// Disconnect the client and remove all event listeners
		if (this.client) {
			this.client.removeAllListeners();
			this.client.end();
		}
		// Clear any intervals/timers if any
		this.clearIntervals();
	}
}

module.exports = mqtt_api;
