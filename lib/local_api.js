"use strict";

const crypto = require("crypto");
const Parser = require("binary-parser").Parser;
const net = require("net");
const dgram = require("dgram");

const UDP_DISCOVERY_PORT = 58866;
const TCP_CONNECTION_PORT = 58867;
const TIMEOUT = 5000; // 5 seconds timeout

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
			this.server.bind(UDP_DISCOVERY_PORT);
		} catch (err) {
			adapter.catchError(`Failed to bind server to port ${UDP_DISCOVERY_PORT}: ${err.message}`);
		}

		this.localDevices = {};
		this.cloudDevices = new Set();
	}

	async initiateClient(duid) {
		if (this.localDevices[duid]) {
			return;
		}

		const ip = this.adapter.requests_handler.getIpForDuid(duid);
		if (!ip) {
			this.adapter.log.warn(`No IP found for ${duid}, skipping TCP check`);
			return;
		}

		const portOpen = await this.isPortOpen(ip);
		if (portOpen) {
			this.adapter.log.info(`TCP port reachable for ${duid}, creating TCP client`);
			await this.createClient(duid, ip);

			if (this.cloudDevices.has(duid)) {
				this.adapter.log.info(`TCP connection for ${duid} restored. Switching back from MQTT.`);
				this.cloudDevices.delete(duid);
			}
		} else {
			const online = this.adapter.onlineChecker(duid);
			if (online) {
				this.adapter.log.info(`TCP not reachable for ${duid}, using MQTT`);
				this.cloudDevices.add(duid);
			} else {
				this.adapter.log.warn(`TCP not reachable for ${duid}, and device is offline`);
			}

			// Repeat in 60s
			setTimeout(() => this.initiateClient(duid), 60000);
		}
	}

	async createClient(duid, ip) {
		const client = new EnhancedSocket();

		try {
			await new Promise((resolve, reject) => {
				client
					.connect(TCP_CONNECTION_PORT, ip, () => {
						this.adapter.log.info(`TCP client for ${duid} connected`);
						this.localDevices[duid] = client;
						resolve();
					})
					.on("error", (error) => {
						reject(error);
					});
			});
		} catch (error) {
			this.adapter.log.warn(`TCP connect error for ${duid}: ${error.message}`);
			delete this.localDevices[duid];
			setTimeout(() => this.initiateClient(duid), 60000); // Retry über initiateClient mit Port-Check
			return;
		}

		// Data-Handling etc. bleibt wie bisher
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
							const dataArr = this.adapter.requests_handler.message_parser._decodeMsg(currentBuffer, duid);

							const allMessages = Array.isArray(dataArr) ? dataArr : dataArr ? [dataArr] : [];
							for (const data of allMessages) {
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
			this.adapter.log.info(`TCP client for ${duid} disconnected, attempting reconnect via initiateClient...`);
			setTimeout(() => this.initiateClient(duid), 60000);
			delete this.localDevices[duid];
		});

		client.on("error", (error) => {
			this.adapter.log.info(`TCP error for ${duid}: ${error.message}`);
		});
	}

	async isPortOpen(ip) {
		return new Promise((resolve) => {
			const socket = new net.Socket();

			const onFail = (reason) => {
				this.adapter.log.debug(`TCP port check failed for ${ip} – reason: ${reason}`);
				socket.destroy();
				resolve(false);
			};

			socket.setTimeout(2000);
			socket.once("error", (err) => onFail(`error: ${err.message}`));
			socket.once("timeout", () => onFail("timeout"));

			socket.once("connect", () => {
				socket.end();
				socket.once("close", () => {
					resolve(true);
				});
			});

			socket.connect(TCP_CONNECTION_PORT, ip);
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
		this.adapter.log.debug(`getLocalDevices() called`);

		return new Promise((resolve, reject) => {
			const devices = {}; // Temporary list to store discovered devices

			// Handler to process incoming messages
			const handleMessage = async (msg) => {
				this.adapter.log.debug(`getLocalDeviced() package received`);
				try {
					const parsedMessage = localMessageParser.parse(msg);
					const decodedMessage = this.decryptECB(parsedMessage.payload, BROADCAST_TOKEN);
					const parsedDecodedMessage = JSON.parse(decodedMessage);
					this.adapter.log.debug(`getLocalDeviced() message received: ${JSON.stringify(parsedDecodedMessage)}`);

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
			this.adapter.log.debug(`handleMessage enabled`);

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
