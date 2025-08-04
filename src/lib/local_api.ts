"use strict";

import crypto from "crypto";
import { Parser } from "binary-parser";
import net from "net";
import dgram from "dgram";
import crc32 from "crc-32";

const UDP_DISCOVERY_PORT = 58866;
const TCP_CONNECTION_PORT = 58867;
const TIMEOUT = 5000; // 5 seconds timeout

const BROADCAST_TOKEN = Buffer.from("qWKYcdQWrbm9hPqe", "utf8");

class EnhancedSocket extends net.Socket {
	connected: boolean;
	chunkBuffer: Buffer;

	constructor(options = {}) {
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

// Parser for just the version field (first 3 bytes)
const versionParser = new Parser().string("version", { length: 3 }); // Only parses the protocol version

// Parser for v1.0 packet fields (excluding version)
const v1_0_Parser = new Parser()
	.endianess("big")
	// Do not parse version here!
	.uint32("seq")
	.uint16("protocol")
	.uint16("payloadLen")
	.buffer("payload", { length: "payloadLen" })
	.uint32("crc32");

// Parser for L01 Discovery packet fields (excluding version)
const vL01_Parser = new Parser()
	.endianess("big")
	// Do not parse version here!
	.buffer("field1", { length: 4 }) // Unknown field at offset 3
	.buffer("field2", { length: 2 }) // Unknown field at offset 7
	.uint16("payloadLen")
	.buffer("payload", { length: "payloadLen" })
	.uint32("crc32");

export class local_api {
	adapter: any;
	server: dgram.Socket;
	localDevices: Record<string, EnhancedSocket>;
	cloudDevices: Set<string>;
	localDevicesTimeout: NodeJS.Timeout | null = null;

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
			await new Promise<void>((resolve, reject) => {
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
			setTimeout(() => this.initiateClient(duid), 60000); // Retry via initiateClient with port check
			return;
		}

		client.on("data", async (message) => {
			try {
				if (client.chunkBuffer.length == 0) {
					if (!this.checkComplete(message)) {
						this.adapter.log.debug(`New chunk buffer created`);
					}
					client.chunkBuffer = message;
				} else {
					this.adapter.log.debug(`New chunk buffer data received`);
					client.chunkBuffer = Buffer.concat([client.chunkBuffer, message]);
				}
				// this.adapter.log.debug(`new chunk received: ${message.toString("hex")}`);

				let offset = 0;
				if (this.checkComplete(client.chunkBuffer)) {
					if (client.chunkBuffer.length != message.length) {
						this.adapter.log.debug(`Chunk buffer data is complete. Processing...`);
					}
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

										this.adapter.requests_handler.resolvePendingRequest(id, result, data.protocol);
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
				const version = versionParser.parse(msg).version;

				this.adapter.log.debug(`getLocalDevices() packet with version ${version} received: ${msg.toString("hex")}`);

				let decodedMessage;
				let parsedMessage;

				// Dynamically select the parser based on version
				switch (version) {
					case "L01":
						parsedMessage = vL01_Parser.parse(msg.slice(3));
						decodedMessage = this.decryptGCM(msg.toString("hex"));
						break;
					case "1.0":
						parsedMessage = v1_0_Parser.parse(msg.slice(3));
						decodedMessage = this.decryptECB(parsedMessage.payload);
						break;
					default:
						this.adapter.log.warn(`Unknown protocol version "${version}" found in local discovery packet. Please report this! Raw: ${msg.toString("hex")}`);
						return;
				}

				try {
					// Decrypt the payload (if needed)
					const parsedDecodedMessage = JSON.parse(decodedMessage);

					this.adapter.log.debug(`getLocalDevices() message received: ${JSON.stringify(parsedDecodedMessage)}`);

					if (parsedDecodedMessage) {
						const localKeys = this.adapter.http_api.getMatchedLocalKeys();
						const localKey = localKeys.get(parsedDecodedMessage.duid);

						if (localKey && !devices[parsedDecodedMessage.duid]) {
							devices[parsedDecodedMessage.duid] = parsedDecodedMessage.ip;
						}
					}
				} catch (error) {
					this.adapter.log.warn(`Failed to process message: ${error.stack}`);
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

	decryptECB(encrypted) {
		const input = Buffer.isBuffer(encrypted) ? encrypted : Buffer.from(encrypted, "binary");
		const decipher = crypto.createDecipheriv("aes-128-ecb", BROADCAST_TOKEN, null);
		decipher.setAutoPadding(false);
		try {
			let decrypted = decipher.update(encrypted, "binary", "utf8");
			decrypted += decipher.final("utf8");
			return this.removePadding(decrypted);
		} catch (e) {
			this.adapter.log.error(`[decryptECB] Failed to decrypt! Error: ${e.message} encrypted (hex): ${input.toString("hex")} length: ${input.length}}`);
			throw e;
		}
	}

	decryptGCM(hexPacket) {
		const packet = Buffer.from(hexPacket, "hex");

		if (packet.length < 15) {
			console.error("Payload too small");
			return null;
		}

		// CRC32 check
		const crcFromPacket = packet.readUInt32BE(packet.length - 4);
		const packetWithoutCrc = packet.subarray(0, packet.length - 4);
		if (crc32.buf(packetWithoutCrc) >>> 0 !== crcFromPacket) {
			console.error("CRC validation failed");
			return null;
		}

		const payloadLength = packet.readUInt16BE(9);
		const payload = packet.subarray(11, 11 + payloadLength);
		const key = crypto.createHash("sha256").update(BROADCAST_TOKEN).digest();
		const digestInput = packet.subarray(0, 9);
		const digest = crypto.createHash("sha256").update(digestInput).digest();
		const iv = digest.subarray(0, 12);
		const tag = payload.subarray(payload.length - 16);
		const ciphertext = payload.subarray(0, payload.length - 16);
		const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);

		decipher.setAuthTag(tag);

		try {
			const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
			return decrypted.toString("utf8");
		} catch (e) {
			console.error(
				`[decryptGCM] Failed to decrypt! Error: ${e.message} IV: ${iv.toString("hex")} Tag: ${tag.toString("hex")} Encrypted (hex): ${ciphertext.toString(
					"hex"
				)} Length: ${ciphertext.length}`
			);
			return null;
		}
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
