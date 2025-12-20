import type { Roborock } from "../main";
import * as crypto from "crypto";
import { Parser } from "binary-parser";
import * as ping from "ping";
import { Socket, SocketConstructorOpts } from "net";
import * as dgram from "dgram";
import * as crc32 from "crc-32";

const UDP_DISCOVERY_PORT = 58866;
const TCP_CONNECTION_PORT = 58867;

// The static key used for broadcast discovery decryption
const BROADCAST_TOKEN = Buffer.from("qWKYcdQWrbm9hPqe", "utf8");

// --------------------
// Interfaces & Types
// --------------------

interface LocalDevice {
	ip: string;
	version: string;
	connectNonce?: number;
	ackNonce?: number;
}

class EnhancedSocket extends Socket {
	connected: boolean;
	chunkBuffer: Buffer;

	constructor(options?: SocketConstructorOpts) {
		super(options);
		this.connected = false;
		this.chunkBuffer = Buffer.alloc(0);

		(this as any).on("connect", () => {
			this.connected = true;
		});

		(this as any).on("close", () => {
			this.connected = false;
		});

		(this as any).on("error", () => {
			this.connected = false;
		});

		(this as any).on("end", () => {
			this.connected = false;
		});
	}
}

// --------------------
// Binary Parsers
// --------------------

// Parser for just the version field (first 3 bytes)
const versionParser = new Parser().string("version", { length: 3 });

// Parser for v1.0 packet fields (excluding version)
const v1_0_Parser = new Parser()
	.endianess("big")
	// Note: Version is parsed separately
	.uint32("seq")
	.uint16("protocol")
	.uint16("payloadLen")
	.buffer("payload", { length: "payloadLen" })
	.uint32("crc32");

// Parser for L01 Discovery packet fields (excluding version)
const vL01_Parser = new Parser()
	.endianess("big")
	// Note: Version is parsed separately
	.buffer("field1", { length: 4 }) // Unknown field at offset 3
	.buffer("field2", { length: 2 }) // Unknown field at offset 7
	.uint16("payloadLen")
	.buffer("payload", { length: "payloadLen" })
	.uint32("crc32");

// --------------------
// Local API Class
// --------------------

export class local_api {
	adapter: Roborock;
	deviceSockets: Record<string, EnhancedSocket>;
	cloudDevices: Set<string>;
	localDevices: Record<string, LocalDevice> = {};
	localDevicesInterval: NodeJS.Timeout | null = null;
	private reconnectPlanned = new Set<string>();
	private connecting = new Set<string>();
	private discoveryServer: dgram.Socket | null = null;
	private discoveryTimer: NodeJS.Timeout | null = null;

	constructor(adapter: Roborock) {
		this.adapter = adapter;

		this.deviceSockets = {};
		this.cloudDevices = new Set();
		this.localDevices = {};
	}

	/**
	 * Initiates a TCP client connection for the given device.
	 * Used for local control if an IP is available.
	 */
	async initiateClient(duid: string): Promise<void> {
		if (this.connecting.has(duid)) return;
		this.connecting.add(duid);

		try {
			const ip = this.getIpForDuid(duid);
			if (!ip) {
				this.adapter.log.debug(`[LocalAPI] No local IP for ${duid} -> falling back to MQTT`);
				this.cloudDevices.add(duid);
				return;
			}

			// Check if already connected
			const existing = this.deviceSockets?.[duid];
			if (existing?.connected) {
				this.adapter.log.debug(`[LocalAPI] Already connected via TCP: ${duid}`);
				this.cloudDevices.delete(duid);
				return;
			}

			// Attempt TCP connection
			const client = new EnhancedSocket();

			await new Promise<void>((resolve, reject) => {
				const onErrorOnce = (err: Error) => reject(err);
				client.once("error", onErrorOnce); // Only catch error during initial connection

				client.setTimeout(5000, () => {
					client.destroy();
					reject(new Error("TCP connect timeout"));
				});

				client.connect(TCP_CONNECTION_PORT, ip, async () => {
					client.removeListener("error", onErrorOnce);
					client.setTimeout(0); // Disable timeout after connection
					this.adapter.log.info(`[LocalAPI] TCP client connected for ${duid}`);

					this.deviceSockets[duid] = client;
					this.reconnectPlanned.delete(duid);

					const version = this.getLocalProtocolVersion(duid);
					if (version === "L01") {
						await this.initHandshake(duid, version);
					}
					// B01 is stateless TCP, no handshake needed
					resolve();
				});
			});

			// Handle incoming data
			client.on("data", async (message: Buffer) => {
				try {
					// Buffering logic
					if (client.chunkBuffer.length === 0) {
						if (!this.checkComplete(message)) {
							this.adapter.log.debug(`[LocalAPI] Starting new chunk buffer`);
						}
						client.chunkBuffer = message;
					} else {
						this.adapter.log.debug(`[LocalAPI] Appending to chunk buffer`);
						client.chunkBuffer = Buffer.concat([client.chunkBuffer, message] as Uint8Array[]);
					}

					let offset = 0;
					// Process buffer if it contains at least one complete message
					if (this.checkComplete(client.chunkBuffer)) {
						if (client.chunkBuffer.length !== message.length) {
							this.adapter.log.debug(`[LocalAPI] Chunk buffer complete. Processing...`);
						}

						while (offset + 4 <= client.chunkBuffer.length) {
							const segmentLength = client.chunkBuffer.readUInt32BE(offset);
							this.adapter.log.debug(`[LocalAPI] Segment length: ${segmentLength} at offset ${offset}`);

							const currentBuffer = client.chunkBuffer.subarray(offset + 4, offset + segmentLength + 4);

							// Check for short control frames (Hello Response, Ping Response)
							// Length 17 or 21 usually indicates control frames without payload encryption overhead
							if (segmentLength === 17 || segmentLength === 21) {
								const nonce = currentBuffer.readUInt32BE(7);
								const protocol = currentBuffer.readUInt16BE(15);

								switch (protocol) {
									case 1: // hello_response
										if (this.localDevices[duid]) {
											this.localDevices[duid].ackNonce = nonce;
										}
										this.adapter.log.debug(`[LocalAPI] hello_response received from ${duid}, ackNonce=${nonce}`);
										break;

									case 5: // ping_response
										this.adapter.log.debug(`[LocalAPI] ping_response received from ${duid}`);
										break;

									default:
										this.adapter.log.debug(`[LocalAPI] Short frame ${protocol} received from ${duid}`);
								}
							} else {
								// Decode standard data message
								const dataArr = this.adapter.requestsHandler.messageParser.decodeMsg(currentBuffer, duid);

								const allMessages = Array.isArray(dataArr) ? dataArr : dataArr ? [dataArr] : [];
								for (const data of allMessages) {
									// Protocol 4: Device Status Update
									if (data.protocol === 4 || data.version === "B01") {
										const payloadStr = data.payload.toString();
										let parsedPayload;
										try {
											parsedPayload = JSON.parse(payloadStr);
										} catch (e) {
											this.adapter.log.warn(`[LocalAPI] Failed to parse ${data.version} payload: ${e}`);
											continue;
										}

										if (data.version === "B01") {
											const dps = parsedPayload.dps;
											if (dps?.["10001"]) {
												let inner = dps["10001"];
												if (typeof inner === "string") {
													try {
														inner = JSON.parse(inner);
													} catch (e) {
														this.adapter.log.warn(`[LocalAPI] Failed to parse B01 nested string response: ${e}`);
														continue;
													}
												}
												const id = inner.msgId || inner.id;
												const result = inner.code === 0 ? inner.data : (inner.error || inner.result);
												if (id) {
													this.adapter.requestsHandler.resolvePendingRequest(id, result, `Local-${data.version}`);
												}
											}
										} else if (data.protocol === 4) {
											// Standard protocol 4 nested JSON in 'dps'
											const dps = parsedPayload.dps;
											if (dps) {
												const _102 = JSON.stringify(dps["102"]);
												const parsed_102 = JSON.parse(JSON.parse(_102));
												const id = parsed_102.id;
												const result = parsed_102.result;
												this.adapter.requestsHandler.resolvePendingRequest(id, result, String(data.protocol));
											}
										}
									}
								}
							}

							offset += 4 + segmentLength;
						}

						this.clearChunkBuffer(duid);
					}
				} catch (error: any) {
					this.adapter.catchError(`Failed to process TCP data: ${error.stack}`, `function initiateClient`, duid);
				}
			});

			client.on("close", () => this.scheduleReconnect(duid, `connection closed`));
			client.on("error", (error) => this.scheduleReconnect(duid, `connection error: ${error.message}`));
			client.on("end", () => this.scheduleReconnect(duid, "connection ended"));

			this.adapter.log.info(`[LocalAPI] TCP client established for ${duid}`);
			this.cloudDevices.delete(duid);
		} catch (err: any) {
			this.adapter.log.warn(`[LocalAPI] TCP connect failed for ${duid}: ${err?.message || err}`);
			this.scheduleReconnect(duid, "connect failed");
			this.cloudDevices.add(duid);
		} finally {
			this.connecting.delete(duid);
		}
	}

	/**
	 * Schedules a reconnection attempt after a delay.
	 */
	scheduleReconnect(duid: string, reason: string): void {
		this.adapter.log.warn(`[LocalAPI] TCP ${reason} for ${duid}, retry in 5s`);

		const old = this.deviceSockets[duid];
		if (old) {
			old.removeAllListeners();
			if (!old.destroyed) old.destroy();
			delete this.deviceSockets[duid];
		}

		if (this.reconnectPlanned.has(duid)) return;
		this.reconnectPlanned.add(duid);

		this.adapter.setTimeout(() => {
			this.reconnectPlanned.delete(duid);

			// Retry only if device is still considered local
			if (this.getIpForDuid(duid)) {
				this.initiateClient(duid).catch((e) => this.adapter.log.warn(`[LocalAPI] Reconnect attempt failed for ${duid}: ${e?.message || e}`));
			} else {
				this.adapter.log.debug(`[LocalAPI] Skip reconnect for ${duid}, no longer in localDevices. Trying again next time.`);
				this.scheduleReconnect(duid, "waiting for IP");
			}
		}, 5000);
	}

	/**
	 * Checks if an IP is reachable via ICMP Ping.
	 */
	async isLocallyReachable(ip: string): Promise<boolean> {
		const res = await ping.promise.probe(ip, { timeout: 2 });
		return res.alive;
	}

	/**
	 * Checks if the buffer contains a complete message (or multiple complete messages).
	 */
	checkComplete(buffer: Buffer): boolean {
		let totalLength = 0;
		let offset = 0;

		while (offset + 4 <= buffer.length) {
			const segmentLength = buffer.readUInt32BE(offset);
			totalLength += 4 + segmentLength;
			offset += 4 + segmentLength;

			if (offset > buffer.length) {
				return false; // Data implies more bytes than available
			}
		}

		return totalLength <= buffer.length;
	}

	clearChunkBuffer(duid: string): void {
		if (this.deviceSockets[duid]) {
			this.deviceSockets[duid].chunkBuffer = Buffer.alloc(0);
		}
	}

	sendMessage(duid: string, message: Buffer): void {
		const client = this.deviceSockets[duid];
		if (client?.connected) {
			client.write(message);
		}
	}

	isConnected(duid: string): boolean {
		if (this.deviceSockets[duid] && this.deviceSockets[duid].connected) {

			const dev = this.localDevices[duid];
			if (dev && dev.version === "L01") {
				return dev.ackNonce !== undefined;
			}
			// For 1.0, B01, or generic TCP - connected socket is enough
			return true;
		}
		return false;
	}

	/**
	 * Starts listening for UDP broadcast packets to discover devices.
	 */
	async startUdpDiscovery(timeoutMs = 10_000): Promise<void> {
		if (this.discoveryServer) {
			this.adapter.log.warn("[LocalAPI] UDP discovery already running");
			return;
		}

		this.adapter.log.debug("[LocalAPI] UDP Discovery started");
		const devices: Record<string, LocalDevice> = {};

		// Create UDP socket
		const socketOptions: dgram.SocketOptions = process.platform === "win32" ? { type: "udp4", reuseAddr: true } : { type: "udp4", reusePort: true };

		this.discoveryServer = dgram.createSocket(socketOptions);

		this.discoveryServer.on("message", async (msg) => {
			this.adapter.log.debug(`[LocalAPI] UDP message received: ${msg.toString("hex")}`);
			let decodedMessage: string | null = null;
			let parsedMessage: any; // Structure depends on version

			const version = versionParser.parse(msg).version;
			try {
				switch (version) {
					case "L01":
						parsedMessage = vL01_Parser.parse(msg.slice(3));
						decodedMessage = this.decryptGCM(msg.toString("hex"));
						break;
					case "B01":
						// Try L01 (GCM) first
						try {
							parsedMessage = vL01_Parser.parse(msg.slice(3));
							decodedMessage = this.decryptGCM(msg.toString("hex"));
						} catch { /* ignore */ }

						if (!decodedMessage) {
							// Fallback to 1.0 (ECB)
							try {
								parsedMessage = v1_0_Parser.parse(msg.slice(3));
								decodedMessage = this.decryptECB(parsedMessage.payload);
							} catch {
								this.adapter.log.debug(`[LocalAPI] B01 discovery decryption failed for both GCM and ECB`);
							}
						}
						break;
					case "1.0":
						parsedMessage = v1_0_Parser.parse(msg.slice(3));
						decodedMessage = this.decryptECB(parsedMessage.payload);
						break;
					default:
						this.adapter.log.warn(`[LocalAPI] Unknown protocol version "${version}" found in local discovery packet. Raw: ${msg.toString("hex")}`);
				}

				if (!decodedMessage) return;

				const parsedDecodedMessage = JSON.parse(decodedMessage);
				if (!parsedDecodedMessage) return;

				const duid = parsedDecodedMessage.duid;
				const ip = parsedDecodedMessage.ip;
				const localKeys = this.adapter.http_api.getMatchedLocalKeys();
				const localKey = localKeys.get(duid);

				// Only track devices we have a key for
				if (!localKey) return;

				if (!devices[duid]) {
					devices[duid] = { ip, version };
					this.adapter.log.debug(`[LocalAPI] Found local device: ${duid} @ ${ip} using version ${version}`);
				}
			} catch (error: any) {
				this.adapter.log.warn(`[LocalAPI] Failed to process UDP message: ${error.stack}`);
			}
		});

		this.discoveryServer.on("listening", () => {
			const addr = this.discoveryServer!.address();
			this.adapter.log.info(`[LocalAPI] UDP listening on ${addr.address}:${addr.port}`);
		});

		this.discoveryServer.on("error", (error) => this.adapter.log.error(`[LocalAPI] Server error: ${error.stack}`));

		try {
			this.discoveryServer.bind(UDP_DISCOVERY_PORT);
		} catch (e: any) {
			this.adapter.log.error(`[LocalAPI] Failed to bind UDP port: ${e.message}`);
		}

		// Run discovery for specified timeout
		await new Promise<void>((resolve) => {
			this.discoveryTimer = setTimeout(() => {
				this.stopUdpDiscovery();
				this.adapter.log.info(`[LocalAPI] UDP discovery finished after ${timeoutMs / 1000}s`);
				// Update main list of local devices
				this.localDevices = { ...devices };
				resolve();
			}, timeoutMs);
		});
	}

	stopUdpDiscovery(): void {
		if (this.discoveryTimer) {
			clearTimeout(this.discoveryTimer);
			this.discoveryTimer = null;
		}
		if (this.discoveryServer) {
			try {
				this.discoveryServer.removeAllListeners();
				this.discoveryServer.close();
			} catch {
				// ignore close errors
			}
			this.discoveryServer = null;
			this.adapter.log.info("[LocalAPI] UDP discovery stopped");
		}
	}

	/**
	 * Initializes connection for L01/B01 protocol devices (Handshake).
	 */
	async initHandshake(duid: string, version: string): Promise<void> {
		const dev = this.localDevices[duid];
		if (!dev) {
			this.adapter.log.warn(`[LocalAPI] initHandshake: no local device found for ${duid}`);
			return;
		}

		try {
			const connectNonce = Math.floor(Math.random() * 1e9);
			dev.connectNonce = connectNonce;
			dev.ackNonce = undefined; // Reset for new handshake

			await this.sendHello(duid, connectNonce, version);
		} catch (err: any) {
			this.adapter.log.warn(`[LocalAPI] initHandshake failed for ${duid}: ${err.message || err}`);
		}
	}

	/**
	 * Sends the Hello packet (Step 1 of Handshake).
	 */
	async sendHello(duid: string, connectNonce: number, version: string): Promise<void> {
		const seq = 1;
		const timestamp = Math.floor(Date.now() / 1000);
		const protocol = 0; // 0 = Hello Request

		const payloadLen = 0;
		const msg = Buffer.alloc(23); // 3(Ver) + 4(Seq) + 4(Nonce) + 4(TS) + 2(Proto) + 2(Len) + 4(CRC)

		// Write dynamic version (L01 or B01)
		msg.write(version);
		msg.writeUInt32BE(seq, 3);
		msg.writeUInt32BE(connectNonce, 7);
		msg.writeUInt32BE(timestamp, 11);
		msg.writeUInt16BE(protocol, 15);
		msg.writeUInt16BE(payloadLen, 17);

		const crc = crc32.buf(msg.subarray(0, msg.length - 4)) >>> 0;
		msg.writeUInt32BE(crc, msg.length - 4);

		// Prepend length of the message (4 bytes)
		const lenBuf = Buffer.alloc(4);
		lenBuf.writeUInt32BE(msg.length, 0);

		const wrapped = Buffer.concat([lenBuf, msg] as Uint8Array[]);

		this.sendMessage(duid, wrapped);

		this.adapter.log.debug(`[LocalAPI] Hello (${version}) sent to ${duid} with connectNonce=${connectNonce}`);
	}

	isLocalDevice(duid: string): boolean {
		return duid in this.deviceSockets;
	}

	getIpForDuid(duid: string): string | null {
		const isSharedDevice = this.adapter.http_api.isSharedDevice(duid);
		if (isSharedDevice) {
			return null;
		}
		return this.localDevices?.[duid]?.ip || null;
	}

	getLocalProtocolVersion(duid: string): string | null {
		return this.localDevices?.[duid]?.version || null;
	}

	// --------------------
	// Decryption Helpers (Discovery Specific)
	// --------------------

	/**
	 * Decrypts AES-128-ECB packets (Protocol 1.0 Discovery).
	 */
	decryptECB(encrypted: Buffer | string): string {
		const input = Buffer.isBuffer(encrypted) ? encrypted : Buffer.from(encrypted, "binary");
		const decipher = crypto.createDecipheriv("aes-128-ecb", BROADCAST_TOKEN, null);
		decipher.setAutoPadding(false);
		try {
			let decrypted = decipher.update(input);
			decrypted = Buffer.concat([decrypted, decipher.final()]);
			return this.removePadding(decrypted.toString("utf8"));
		} catch (e: any) {
			// Log warning instead of error to avoid spamming if it's just a bad packet
			this.adapter.log.warn(`[decryptECB] Failed to decrypt packet: ${e.message}`);
			return "";
		}
	}

	/**
	 * Decrypts AES-256-GCM packets (Protocol L01 Discovery).
	 */
	decryptGCM(hexPacket: string): string | null {
		const packet = Buffer.from(hexPacket, "hex");

		if (packet.length < 15) {
			this.adapter.log.error("[LocalAPI] GCM Payload too small");
			return null;
		}

		// Validate CRC32
		const crcFromPacket = packet.readUInt32BE(packet.length - 4);
		const packetWithoutCrc = packet.subarray(0, packet.length - 4);
		if (crc32.buf(packetWithoutCrc) >>> 0 !== crcFromPacket) {
			this.adapter.log.error("[LocalAPI] CRC validation failed");
			return null;
		}

		// Extract GCM components
		const payloadLength = packet.readUInt16BE(9);
		const payload = packet.subarray(11, 11 + payloadLength);

		// Key derivation for discovery is fixed to SHA256 of the BROADCAST_TOKEN
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
		} catch (e: any) {
			this.adapter.log.error(
				`[decryptGCM] Failed to decrypt! Error: ${e.message} IV: ${iv.toString("hex")} Tag: ${tag.toString("hex")} Encrypted: ${ciphertext.toString("hex")}`
			);
			return null;
		}
	}

	/**
	 * Manually removes padding (Legacy support).
	 */
	removePadding(str: string): string {
		const paddingLength = str.charCodeAt(str.length - 1);
		return str.slice(0, -paddingLength);
	}

	clearLocalDevicedTimeout(): void {
		if (this.localDevicesInterval) {
			this.adapter.clearTimeout(this.localDevicesInterval as any);
			this.localDevicesInterval = null;
		}
	}
}
