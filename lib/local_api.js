"use strict";

const crypto = require("crypto");
const Parser = require("binary-parser").Parser;
const net = require("net");
const dgram = require("dgram");

const PORT = 58866;
const TIMEOUT = 5000; // 5 Sekunden Timeout

const BROADCAST_TOKEN = Buffer.from("qWKYcdQWrbm9hPqe", "utf8");

class EnhancedSocket extends net.Socket {
	constructor(options) {
		super(options);
		this.connected = false;
		this.chunkBuffer = Buffer.alloc(0);

		this.on("connect", () => {
			this.connected = true;
		});

		this.on("close", () => {
			this.connected = false;
		});

		this.on("error", () => {
			this.connected = false;
		});

		this.on("end", () => {
			this.connected = false;
		});
	}
}

const localMessageParser = new Parser()
	.endianess("big")
	.string("version", {
		length: 3,
	})
	.uint32("seq")
	.uint16("protocol")
	.uint16("payloadLen")
	.buffer("payload", {
		length: "payloadLen",
	})
	.uint32("crc32");

class local_api {
	constructor(adapter) {
		this.adapter = adapter;

		this.server = dgram.createSocket("udp4");
		try {
			this.server.bind(PORT);
		} catch (err) {
			adapter.catchError(`Failed to bind server to port ${PORT}: ${err.message}`);
		}

		this.localDevices = {};
		this.cloudDevices = new Set();
	}

	async createClient(duid, ip) {
		const client = new EnhancedSocket();

		// Wrap the connect method in a promise to await its completion
		await new Promise((resolve, reject) => {
			client
				.connect(58867, ip, () => {
					this.adapter.log.debug(`tcp client for ${duid} connected`);

					this.localDevices[duid] = client;
					resolve();
				})
				.on("error", (error) => {
					this.adapter.log.debug(`error on tcp client for ${duid}. ${error.message}`);
					reject(error);
				});
		}).catch((error) => {
			const online = this.adapter.onlineChecker(duid);
			if (online) {
				// if the device is online connecting via tcp is not possible, we can assume that the device is a remote device
				this.adapter.log.info(`error on tcp client for ${duid}. Marking this device as remote device. Connecting via MQTT instead ${error.message}`);
				this.cloudDevices.add(duid);
				// this.adapter.catchError(`Failed to create tcp client: ${error.stack}`, `function createClient`, duid);
			}
		});

		client.on("data", async (message) => {
			try {
				if (client.chunkBuffer.length == 0) {
					this.adapter.log.debug(`new chunk started`);
					client.chunkBuffer = message;
				} else {
					this.adapter.log.debug(`new chunk received`);
					client.chunkBuffer = Buffer.concat([client.chunkBuffer, message]);
				}
				// this.adapter.log.debug(`new chunk received: ${message.toString("hex")}`);

				let offset = 0;
				if (this.checkComplete(client.chunkBuffer)) {
					this.adapter.log.debug(`Chunk buffer data is complete. Processing...`);
					// this.adapter.log.debug(`chunkBuffer: ${client.chunkBuffer.toString("hex")}`);
					while (offset + 4 <= client.chunkBuffer.length) {
						const segmentLength = client.chunkBuffer.readUInt32BE(offset);
						// length of 17 does not contain any useful data.
						// The parser for this looks like this: const shortMessageParser = new Parser().endianess("big").string("version", {length: 3,}).uint32("seq").uint32("random").uint32("timestamp").uint16("protocol")
						if (segmentLength != 17) {
							const currentBuffer = client.chunkBuffer.subarray(offset + 4, offset + segmentLength + 4);
							const data = this.adapter.requests_handler.message_parser._decodeMsg(currentBuffer, duid);

							if (data.protocol == 4) {
								const dps = JSON.parse(data.payload).dps;

								if (dps) {
									const _102 = JSON.stringify(dps["102"]);
									const parsed_102 = JSON.parse(JSON.parse(_102));
									const id = parsed_102.id;
									const result = parsed_102.result;

									if (this.adapter.pendingRequests.has(id)) {
										this.adapter.log.debug(`Local message for ${duid} with protocol 4 and id ${id} received. Result: ${JSON.stringify(result)}`);
										const { resolve, timeout } = this.adapter.pendingRequests.get(id);
										this.adapter.clearTimeout(timeout);
										this.adapter.pendingRequests.delete(id);
										resolve(result);
									}
								}
							}
						}
						offset += 4 + segmentLength;
					}
					this.clearChunkBuffer(duid);
				}
			} catch (error) {
				this.adapter.catchError(`Failed to create tcp client: ${error.stack}`, `function createClient`, duid);
			}
		});

		client.on("close", () => {
			this.adapter.log.debug(`tcp client for ${duid} disconnected, attempting to reconnect...`);
			setTimeout(async () => {
				await this.createClient(duid, ip);
			}, 60000);
			client.connected = false;
		});

		client.on("error", (error) => {
			this.adapter.log.debug(`error on tcp client for ${duid}. ${error.message}`);
		});
	}

	checkComplete(buffer) {
		let totalLength = 0;
		let offset = 0;

		while (offset + 4 <= buffer.length) {
			const segmentLength = buffer.readUInt32BE(offset);
			totalLength += 4 + segmentLength;
			offset += 4 + segmentLength;

			if (offset > buffer.length) {
				return false; // Data is not complete yet
			}
		}

		return totalLength <= buffer.length;
	}

	clearChunkBuffer(duid) {
		if (this.localDevices[duid]) {
			this.localDevices[duid].chunkBuffer = Buffer.alloc(0);
		}
	}

	sendMessage(duid, message) {
		const client = this.localDevices[duid];
		if (client) {
			client.write(message);
		}
	}

	isConnected(duid) {
		if (this.localDevices[duid]) {
			return this.localDevices[duid].connected;
		}
	}

	async getLocalDevices() {
		return new Promise((resolve, reject) => {
			const devices = {}; // Temporary list to store discovered devices

			// Handler to process incoming messages
			const handleMessage = async (msg) => {
				try {
					const parsedMessage = localMessageParser.parse(msg);
					const decodedMessage = this.decryptECB(parsedMessage.payload, BROADCAST_TOKEN);
					const parsedDecodedMessage = JSON.parse(decodedMessage);

					if (parsedDecodedMessage) {
						const localKeys = this.adapter.http_api.getMatchedLocalKeys();
						const localKey = localKeys.get(parsedDecodedMessage.duid);

						if (localKey && !devices[parsedDecodedMessage.duid]) {
							devices[parsedDecodedMessage.duid] = parsedDecodedMessage.ip;
						}
					}
				} catch (error) {
					this.adapter.catchError(`Failed to process message: ${error.stack}`);
				}
			};

			// Handler to process server errors
			const handleError = (error) => {
				this.adapter.catchError(`Server error: ${error.stack}`);
				cleanup(); // Clean up on error
				reject(error);
			};

			// Cleanup function to remove temporary handlers and clear the timeout
			const cleanup = () => {
				this.server.off("message", handleMessage);
				this.server.off("error", handleError);
				if (this.localDevicesTimeout) {
					this.adapter.clearTimeout(this.localDevicesTimeout);
					this.localDevicesTimeout = null;
				}
			};

			// Add temporary event handlers
			this.server.on("message", handleMessage);
			this.server.on("error", handleError);

			// Set a timeout for discovering devices
			this.localDevicesTimeout = this.adapter.setTimeout(() => {
				cleanup(); // Remove handlers and clear timeout after timeout
				resolve(devices); // Return the discovered devices
			}, TIMEOUT);
		});
	}

	decryptECB(encrypted, aesKey) {
		const decipher = crypto.createDecipheriv("aes-128-ecb", aesKey, null);
		decipher.setAutoPadding(false);
		let decrypted = decipher.update(encrypted, "binary", "utf8");
		decrypted += decipher.final("utf8");
		return this.removePadding(decrypted);
	}

	removePadding(str) {
		const paddingLength = str.charCodeAt(str.length - 1);
		return str.slice(0, -paddingLength);
	}

	clearLocalDevicedTimeout() {
		if (this.localDevicesTimeout) {
			this.adapter.clearTimeout(this.localDevicesTimeout);
		}
	}
}

module.exports = local_api;
