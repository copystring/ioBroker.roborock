"use strict";

const crypto = require("crypto");
const Parser = require("binary-parser").Parser;
const net = require("net");
const dgram = require("dgram");

const server = dgram.createSocket("udp4");
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

class localConnector {
	constructor(adapter) {
		this.adapter = adapter;

		this.localClients = {};
	}

	async createClient(duid, ip) {
		const client = new EnhancedSocket();

		// Wrap the connect method in a promise to await its completion
		await new Promise((resolve, reject) => {
			client
				.connect(58867, ip, () => {
					this.adapter.log.debug(`tcp client for ${duid} connected`);
					resolve();
				})
				.on("error", (error) => {
					this.adapter.log.debug(`error on tcp client for ${duid}. ${error.message}`);
					reject(error);
				});
		}).catch((error) => {
			this.adapter.catchError(`Failed to create tcp client for ${duid} - ${error.stack}`);
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
							const data = this.adapter.message._decodeMsg(currentBuffer, duid);

							if (data.protocol == 4) {
								const dps = JSON.parse(data.payload).dps;

								if (dps) {
									const _102 = JSON.stringify(dps["102"]);
									const parsed_102 = JSON.parse(JSON.parse(_102));
									const id = parsed_102.id;
									const result = parsed_102.result;

									if (this.adapter.pendingRequests.has(id)) {
										this.adapter.log.debug(`Local message with protocol 4 and id ${id} received. Result: ${JSON.stringify(result)}`);
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
				this.adapter.catchError(`Failed to create tcp client for ${duid} - ${error.stack}`);
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

		this.localClients[duid] = client;
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
		if (this.localClients[duid]) {
			this.localClients[duid].chunkBuffer = Buffer.alloc(0);
		}
	}

	sendMessage(duid, message) {
		const client = this.localClients[duid];
		if (client) {
			client.write(message);
		}
	}

	isConnected(duid) {
		if (this.localClients[duid]) {
			return this.localClients[duid].connected;
		}
	}

	async getLocalDevices() {
		return new Promise((resolve, reject) => {
			const devices = {};

			server.on("message", (msg) => {
				const parsedMessage = localMessageParser.parse(msg);
				const decodedMessage = this.decryptECB(parsedMessage.payload, BROADCAST_TOKEN); // this might be decryptCBC for A01. Haven't checked this yet
				const parsedDecodedMessage = JSON.parse(decodedMessage);
				this.adapter.log.debug(`getLocalDevices parsedDecodedMessage: ${JSON.stringify(parsedDecodedMessage)}`);

				if (parsedDecodedMessage) {
					const localKey = this.adapter.localKeys.get(parsedDecodedMessage.duid);
					this.adapter.log.debug(`getLocalDevices localKey: ${localKey}`);

					if (localKey) {
						// if there's no localKey, decryption cannot work. For example when the found robot is not associated with a roborock account
						if (!devices[parsedDecodedMessage.duid]) {
							devices[parsedDecodedMessage.duid] = parsedDecodedMessage.ip;
						}
					}
				}
			});

			server.on("error", (error) => {
				this.adapter.catchError(`Discover server error: ${error.stack}`);
				server.close();
				reject(error);
			});

			server.bind(PORT);

			this.localDevicesTimeout = this.adapter.setTimeout(() => {
				server.close();

				resolve(devices);
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

module.exports = {
	localConnector,
};
