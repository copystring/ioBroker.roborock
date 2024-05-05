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

		client.connect(58867, ip, () => {
			this.adapter.log.debug(`tcp client for ${duid} connected`);
		});

		client.on("data", async (message) => {
			try {
				// some messages have preceeding data which needs to be removed
				let index = 0;
				const hexMessage = message.toString("hex");

				while ((index = hexMessage.indexOf("312e", index)) !== -1) {
					const offset = index / 2;
					const prevValue = message.readUInt32BE(offset - 4);
					const bufferLength = message.length - offset;

					if (prevValue === bufferLength) {
						break;
					}

					index += 4;
				}
				if (index === -1) {
					this.adapter.log.debug(`Could not find matching 312e`);
					return;
				}

				message = message.subarray(index / 2);
				if (message.length <= 21) return;

				const data = this.adapter.message._decodeMsg(message, duid);

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
			} catch (error) {
				this.adapter.catchError(`Failed to create tcp client for ${duid}`);
			}
		});

		client.on("close", () => {
			this.adapter.log.debug(`tcp client for ${duid} disconnected, attempting to reconnect...`);
			setTimeout(() => {
				this.createClient(duid, ip);
			}, 1000);
			client.connected = false;
		});

		client.on("error", (error) => {
			this.adapter.log.debug(`error on tcp client for ${duid}. ${error.message}`);
		});

		this.localClients[duid] = client;
	}

	sendMessage(duid, message) {
		const client = this.localClients[duid];
		if (client) {
			client.write(message);
		}
	}

	isConnected(duid) {
		return this.localClients[duid].connected;
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
