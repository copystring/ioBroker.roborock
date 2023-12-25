"use strict";

const crypto = require("crypto");
const Parser = require("binary-parser").Parser;
const net = require("net");
const dgram = require("dgram");
const { EventEmitter2 } = require("eventemitter2");
const rr = new EventEmitter2();

const rrMessage = require("./message").message;

const server = dgram.createSocket("udp4");
const PORT = 58866;
const TIMEOUT = 5000; // 5 Sekunden Timeout

const BROADCAST_TOKEN = Buffer.from("qWKYcdQWrbm9hPqe", "utf8");

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

		this.message = new rrMessage(this.adapter);
		this.localClients = {};
	}

	createClient(duid, ip) {
		try {
			const client = new net.Socket();

			client.connect(58867, ip, () => {
				this.adapter.log.debug(`tcp client for ${duid} connected`);
			});

			client.on("data", async (message) => {
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

				const localKey = this.adapter.localKeys.get(duid);

				if (localKey) {

					const data = this.message._decodeMsg(message, localKey);

					if (data.protocol == 4) {
						const dps = JSON.parse(data.payload).dps;

						if (dps) {
							const _102 = JSON.stringify(dps["102"]);
							const parsed_102 = JSON.parse(JSON.parse(_102));
							const id = parsed_102.id;
							const result = parsed_102.result;

							rr.emit("response.102", duid, id, result || dps.error);
						}
					}
				}
			});

			client.on("close", () => {
				this.adapter.log.debug(`tcp client for ${duid} disconnected`);
			});

			client.on("error", (err) => {
				this.adapter.log.debug(`error on tcp client for ${duid}. ${err.message}`);
			});

			this.localClients[duid] = client;
		} catch (error) {
			this.adapter.catchError(`Failed to create tcp client for ${duid}`);
		}
	}

	async sendRequest(duid, messageID, method, params, secure = false, photo = false) {
		const timestamp = Math.floor(Date.now() / 1000);

		return new Promise((resolve, reject) => {
			const client = this.localClients[duid];

			if (client) {
				const listener102 = async (duid, id, message) => {
					if (id == messageID) {
						rr.off("response.102", listener102);

						this.adapter.clearTimeout(this.adapter.messageQueue.get(messageID)?.timeout102);
						this.adapter.clearTimeout(this.adapter.messageQueue.get(messageID)?.timeout301);
						(this.adapter.messageQueue.get(messageID) || {}).timeout102 = null;
						this.adapter.checkAndClearRequest(messageID);

						const result = await this.message.resolve102Message(messageID, message);
						resolve(result);
					}
				};

				const timeout102 = this.adapter.setTimeout(() => {
					rr.off("response.102", listener102);
					(this.adapter.messageQueue.get(messageID) || {}).timeout102 = null;
					(this.adapter.messageQueue.get(messageID) || {}).timeout301 = null;
					this.adapter.checkAndClearRequest(messageID);
					reject(new Error(`Local request with id ${messageID} with method ${method} timed out after 10 seconds for response.102`));
				}, 10000);

				rr.on("response.102", listener102);


				let listener301, timeout301;
				if (secure) {
					listener301 = async (duid, id, message) => {

						if (photo) {
							resolve(message);
						} else if (id == messageID) {
							rr.off("response.301", listener301);

							const result = await this.message.resolve102Message(messageID, message, secure);
							resolve(result);
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

				// this.adapter.log.debug(`sendMessge localClients ${JSON.stringify(this.localClients)}`);

				const payload = this.message.buildPayload(duid, messageID, method, params, secure, photo);
				const roborockMessage = this.message.buildRoborockMessage(duid, 4, timestamp, payload);

				const lengthBuffer = Buffer.alloc(4);
				lengthBuffer.writeUInt32BE(roborockMessage.length, 0);

				const fullMessage = Buffer.concat([lengthBuffer, roborockMessage]);
				client.write(fullMessage);
				// this.adapter.log.debug(`sent fullMessage: ${fullMessage.toString("hex")}`);
			}
		});
	}

	async getLocalDevices() {
		return new Promise((resolve, reject) => {
			const devices = {};

			server.on("message", (msg) => {
				const parsedMessage = localMessageParser.parse(msg);
				const decodedMessage = this.decryptECB(parsedMessage.payload, BROADCAST_TOKEN);
				const parsedDecodedMessage = JSON.parse(decodedMessage);

				if (!devices[parsedDecodedMessage.duid]) {
					devices[parsedDecodedMessage.duid] = parsedDecodedMessage.ip;
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

	clearLocalDevicedTimeout() {
		if (this.localDevicesTimeout) {
			this.adapter.clearTimeout(this.localDevicesTimeout);
		}
	}

	decryptECB(encrypted, token) {
		const decipher = crypto.createDecipheriv("aes-128-ecb", token, null);
		decipher.setAutoPadding(false);
		let decrypted = decipher.update(encrypted, "binary", "utf8");
		decrypted += decipher.final("utf8");
		return this.removePadding(decrypted);
	}

	removePadding(str) {
		const paddingLength = str.charCodeAt(str.length - 1);
		return str.slice(0, -paddingLength);
	}
}

module.exports = {
	localConnector,
};
