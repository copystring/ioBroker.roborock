import { Parser } from "binary-parser";
import * as crc32 from "crc-32";
import * as crypto from "crypto";
import * as dgram from "dgram";
import { Socket, SocketConstructorOpts } from "net";
import * as ping from "ping";
import type { Roborock } from "../main";

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
	.uint32("seq")
	.uint16("protocol")
	.uint16("payloadLen")
	.buffer("payload", { length: "payloadLen" })
	.uint32("crc32");

// Parser for L01 Discovery packet fields (excluding version)
const vL01_Parser = new Parser()
	.endianess("big")
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
	private gracePeriodTimer: NodeJS.Timeout | null = null;

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

	async initiateClient(duid: string, timeoutMs = 5000, suppressLog = false): Promise<void> {
		if (this.connecting.has(duid)) return;
		this.connecting.add(duid);

		try {
			const ip = this.getIpForDuid(duid);
			if (!ip) {
				this.adapter.rLog("Local", duid, "Debug", "N/A", undefined, `No local IP -> falling back to MQTT`, "debug");
				this.cloudDevices.add(duid);
				return;
			}

			// Check if already connected
			const existing = this.deviceSockets?.[duid];
			if (existing?.connected) {
				this.adapter.rLog("TCP", duid, "Debug", "TCP", undefined, `Already connected via TCP`, "debug");
				this.cloudDevices.delete(duid);
				return;
			}

			// Attempt TCP connection
			const client = new EnhancedSocket();

			await new Promise<void>((resolve, reject) => {
				const onErrorOnce = (err: Error) => reject(err);
				client.once("error", onErrorOnce); // Only catch error during initial connection

				client.setTimeout(timeoutMs, () => {
					client.destroy();
					reject(new Error("TCP connect timeout"));
				});

				client.connect(TCP_CONNECTION_PORT, ip, async () => {
					client.removeListener("error", onErrorOnce);
					client.setTimeout(0); // Disable timeout after connection
					this.adapter.rLog("TCP", duid, "Info", undefined, undefined, `TCP client connected`, "info");



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
							this.adapter.rLog("TCP", duid, "<-", "TCP", undefined, `Starting new chunk buffer`, "silly");
						}
						client.chunkBuffer = message;
					} else {
						this.adapter.rLog("TCP", duid, "<-", "TCP", undefined, `Appending to chunk buffer`, "silly");
						client.chunkBuffer = Buffer.concat([client.chunkBuffer, message] as Uint8Array[]);
					}

					let offset = 0;
					// Process buffer if it contains at least one complete message
					if (this.checkComplete(client.chunkBuffer)) {
						if (client.chunkBuffer.length !== message.length) {
							this.adapter.rLog("TCP", duid, "<-", "TCP", undefined, `Chunk buffer complete. Processing...`, "silly");
						}

						while (offset + 4 <= client.chunkBuffer.length) {
							const segmentLength = client.chunkBuffer.readUInt32BE(offset);
							this.adapter.rLog("TCP", duid, "<-", "TCP", undefined, `Segment length: ${segmentLength} at offset ${offset}`, "silly");



							const currentBuffer = client.chunkBuffer.subarray(offset + 4, offset + segmentLength + 4);

							// Check for Control Frames (Hello Response, Ping Response)
							// Protocol 1 (Hello Response) is unencrypted and critical for L01 handshake
							const protocol = currentBuffer.readUInt16BE(15);

							if (protocol === 1) { // hello_response (CONNACK)
								const nonce = currentBuffer.readUInt32BE(7);
								if (this.localDevices[duid]) {
									this.localDevices[duid].ackNonce = nonce;
								}
								this.adapter.rLog("TCP", duid, "<-", "Control", 1, `hello_response | ackNonce=${nonce}`, "debug");
							} else if (segmentLength === 17 || segmentLength === 21) {


								// Short frames logic (Ping Response etc)
								switch (protocol) {
									case 5: // ping_response
										this.adapter.rLog("TCP", duid, "<-", "Control", 5, `ping_response`, "silly");
										break;

									default:
										this.adapter.rLog("TCP", duid, "<-", "Control", protocol, `Short frame ${protocol}`, "silly");
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
											this.adapter.rLog("TCP", duid, "Error", data.version, undefined, `Parse Error | ${e}`, "warn");
											continue;
										}

										this.adapter.rLog("TCP", duid, "<-", data.version, undefined, `Message | ${payloadStr}`, "debug");

										if (data.version === "B01") {
											const dps = parsedPayload.dps;
											if (dps?.["10001"]) {
												let inner = dps["10001"];
												if (typeof inner === "string") {
													try {
														inner = JSON.parse(inner);
													} catch (e) {
														this.adapter.rLog("TCP", duid, "Error", "B01", undefined, `Nested JSON Parse Error | ${e}`, "warn");
														continue;
													}
												}
												const id = inner.msgId || inner.id;
												const result = inner.code === 0 ? inner.data : (inner.error || inner.result);

												if (id) {
													this.adapter.requestsHandler.resolvePendingRequest(id, result, `Local-${data.version}`, duid, "TCP");
												} else {
													this.adapter.rLog("TCP", duid, "<-", "B01", undefined, `Received B01 message without ID.`, "warn");
												}
											}
										} else if (data.protocol === 4) {
											// Standard protocol 4 nested JSON in 'dps'
											const dps = parsedPayload.dps;
											if (dps) {
												// Often dps["102"] is nested stringified loop
												// Try to unpack if standard fields like 102 are present
												let content = dps;
												if (dps["102"]) {
													try {
														content = JSON.parse(dps["102"]);
													} catch {}
												}

												if (content.id) {
													this.adapter.requestsHandler.resolvePendingRequest(content.id, content.result, String(data.protocol), duid, "TCP");
												}
											}
										}
									} else {
										// Explicitly log unknown protocols as Error to identify missing handlers
										this.adapter.rLog("TCP", duid, "Error", data.version, data.protocol, `Unhandled Protocol ${data.protocol}`, "error");
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

			this.adapter.rLog("TCP", duid, "Info", undefined, undefined, `TCP client established for ${duid}`, "info");
			this.cloudDevices.delete(duid);
		} catch (err: any) {
			const logLevel = suppressLog ? "debug" : "warn";
			this.adapter.rLog("TCP", duid, "Error", undefined, undefined, `TCP connect failed for ${duid}: ${err?.message || err}`, logLevel);
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
		this.adapter.rLog("TCP", duid, "Debug", undefined, undefined, `TCP ${reason} for ${duid}, retry in 5s`, "debug");

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
				this.initiateClient(duid).catch((e) => this.adapter.rLog("TCP", duid, "Error", undefined, undefined, `Reconnect attempt failed for ${duid}: ${e?.message || e}`, "warn"));
			} else {
				this.adapter.rLog("TCP", duid, "Debug", "TCP", undefined, `Skip reconnect for ${duid}, no longer in localDevices.`, "debug");
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
	 * @see test/unit/transport_specification.test.ts for the UDP discovery protocol.
	 */
	async startUdpDiscovery(timeoutMs = 10_000): Promise<void> {
		if (this.discoveryServer) {
			this.adapter.rLog("UDP", null, "Warn", "N/A", undefined, "UDP discovery already running", "warn");
			return;
		}

		this.adapter.rLog("UDP", null, "Debug", "N/A", undefined, "UDP Discovery started", "debug");
		const devices: Record<string, LocalDevice> = {};

		// Create UDP socket
		const socketOptions: dgram.SocketOptions = process.platform === "win32" ? { type: "udp4", reuseAddr: true } : { type: "udp4", reusePort: true };

		this.discoveryServer = dgram.createSocket(socketOptions);

		this.discoveryServer.on("message", async (msg) => {
			this.adapter.rLog("UDP", null, "<-", "N/A", undefined, `UDP message received: ${msg.toString("hex")}`, "silly");
			let decodedMessage: string | null = null;
			let parsedMessage: any; // Structure depends on version

			const version = versionParser.parse(msg).version;
			try {
				switch (version) {
					case "L01":
						parsedMessage = vL01_Parser.parse(msg.subarray(3));
						decodedMessage = this.decryptGCM(msg.toString("hex"));
						break;
					case "B01":
						// Try L01 (GCM) first
						try {
							parsedMessage = vL01_Parser.parse(msg.subarray(3));
							decodedMessage = this.decryptGCM(msg.toString("hex"));
						} catch { /* ignore */ }

						if (!decodedMessage) {
							// Fallback to 1.0 (ECB)
							try {
								parsedMessage = v1_0_Parser.parse(msg.subarray(3));
								decodedMessage = this.decryptECB(parsedMessage.payload);
							} catch {
								this.adapter.rLog("UDP", null, "Debug", "B01", undefined, `B01 discovery decryption failed for both GCM and ECB`, "debug");
							}
						}
						break;
					case "1.0":
						parsedMessage = v1_0_Parser.parse(msg.subarray(3));
						decodedMessage = this.decryptECB(parsedMessage.payload);
						break;
					default:
						this.adapter.rLog("UDP", null, "Warn", version, undefined, `Unknown protocol version "${version}" found in local discovery packet.`, "warn");
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
					this.adapter.rLog("UDP", duid, "Info", version, undefined, `Found local device: ${duid} @ ${ip} using version ${version}`, "debug");
				}
			} catch (error: any) {
				this.adapter.rLog("UDP", null, "Error", "N/A", undefined, `Failed to process UDP message: ${error.stack}`, "warn");
			}
		});

		this.discoveryServer.on("listening", () => {
			const addr = this.discoveryServer!.address();
			this.adapter.rLog("UDP", null, "Info", undefined, undefined, `UDP listening on ${addr.address}:${addr.port}`, "info");
		});

		this.discoveryServer.on("error", (error) => this.adapter.rLog("UDP", null, "Error", "N/A", undefined, `Server error: ${error.stack}`, "error"));

		try {
			this.discoveryServer.bind(UDP_DISCOVERY_PORT);
		} catch (e: any) {
			this.adapter.rLog("UDP", null, "Error", "N/A", undefined, `Failed to bind UDP port: ${e.message}`, "error");
		}

		// Run discovery for specified timeout
		await new Promise<void>((resolve) => {
			const allDevices = this.adapter.http_api.getDevices();
			// We only want to wait for "Owned" devices to be found before finishing early.
			// Shared devices might be remote, so we shouldn't block/wait for them.
			const ownedDevices = allDevices.filter(d => !this.adapter.http_api.isSharedDevice(d.duid));
			const expectedCount = ownedDevices.length;

			this.adapter.rLog("UDP", null, "Debug", "N/A", undefined, `Expecting ${expectedCount} owned devices (of ${allDevices.length} total) for fast startup.`, "debug");

			const checkFinished = () => {

				// We check if we found ALL owned devices.
				// (We might have found shared ones too, which is fine, but we only care about owned for the count)
				let foundOwnedCount = 0;
				for (const duid of Object.keys(devices)) {
					if (!this.adapter.http_api.isSharedDevice(duid)) {
						foundOwnedCount++;
					}
				}

				if (foundOwnedCount >= expectedCount && expectedCount > 0) {
					// All OWNED devices found!
					// Enter Grace Period to catch potential Local Shared devices.
					if (!this.gracePeriodTimer) {
						this.adapter.rLog("UDP", null, "Debug", undefined, undefined, `All ${expectedCount} owned devices found. Waiting 1500ms for potential shared devices...`, "debug");

						// Cancel the main timeout (10s) immediately, as we are now in "Finishing" mode.
						if (this.discoveryTimer) {
							clearTimeout(this.discoveryTimer);
							this.discoveryTimer = null;
						}

						this.gracePeriodTimer = setTimeout(() => {
							this.stopUdpDiscovery();
							this.adapter.rLog("UDP", null, "Info", undefined, undefined, `UDP discovery finished after grace period. Found ${Object.keys(devices).length} total devices.`, "info");
							this.localDevices = { ...devices };

							// Trigger connection for all found devices
							for (const duid of Object.keys(this.localDevices)) {
								this.initiateClient(duid).catch((e) => this.adapter.rLog("TCP", duid, "Debug", undefined, undefined, `Initial connect failed: ${e.message}`, "debug"));
							}

							resolve();
						}, 1500); // 1.5s Grace Period
					}
					return true; // Return true to stop further "checkFinished" calls from triggering logic, though timer is async.
				}
				return false;
			};

			// Initial check (unlikely but safe)
			if (checkFinished()) return;

			// Update the message handler to check for finish
			// We can't easily hook into the existing listener without re-binding,
			// assuming the listener above is the one adding to 'devices'.
			// We'll add a specific listener that runs AFTER the main one.
			this.discoveryServer?.on("message", () => {
				// We wait for the next tick to ensure the message handler finished adding to 'devices'
				setImmediate(() => {
					checkFinished();
				});
			});

			this.discoveryTimer = setTimeout(() => {
				this.stopUdpDiscovery();
				this.adapter.rLog("UDP", null, "Info", undefined, undefined, `UDP discovery finished after ${timeoutMs / 1000}s. Found ${Object.keys(devices).length}/${expectedCount} devices.`, "info");
				// Update main list of local devices
				this.localDevices = { ...devices };

				// Trigger connection for all found devices
				for (const duid of Object.keys(this.localDevices)) {
					this.initiateClient(duid).catch((e) => this.adapter.rLog("TCP", duid, "Debug", undefined, undefined, `Initial connect failed: ${e.message}`, "debug"));
				}

				resolve();
			}, timeoutMs);
		});
	}

	stopUdpDiscovery(): void {
		if (this.discoveryTimer) {
			clearTimeout(this.discoveryTimer);
			this.discoveryTimer = null;
		}
		if (this.gracePeriodTimer) {
			clearTimeout(this.gracePeriodTimer);
			this.gracePeriodTimer = null;
		}
		if (this.discoveryServer) {
			try {
				this.discoveryServer.removeAllListeners();
				this.discoveryServer.close();
			} catch {
				// ignore close errors
			}
			this.discoveryServer = null;
			this.adapter.rLog("UDP", null, "Info", undefined, undefined, "UDP discovery stopped", "info");
		}
	}

	/**
	 * Initializes connection for L01/B01 protocol devices (Handshake).
	 */
	async initHandshake(duid: string, version: string): Promise<void> {
		const dev = this.localDevices[duid];
		if (!dev) {
			this.adapter.rLog("TCP", duid, "Warn", undefined, undefined, "initHandshake: no local device data found", "warn");
			return;
		}

		try {
			const connectNonce = Math.floor(Math.random() * 1e9);
			dev.connectNonce = connectNonce;
			dev.ackNonce = undefined; // Reset for new handshake

			await this.sendHello(duid, connectNonce, version);
		} catch (err: any) {
			this.adapter.rLog("TCP", duid, "Error", version, undefined, `initHandshake failed for ${duid}: ${err.message || err}`, "warn");
		}
	}

	/**
	 * Probes a device at a specific IP via TCP.
	 * If successful, promotes it to a Local Device.
	 */

	async checkAndPromoteLocalConnection(duid: string, ip: string, timeoutMs = 5000, suppressLog = false): Promise<boolean> {
		if (this.isConnected(duid)) return true;

		this.adapter.rLog("TCP", duid, "Debug", undefined, undefined, `Probing ${ip} for local connection...`, "debug");

		// Register temporarily to allow initiateClient to work
		if (!this.localDevices[duid]) {
			// Fetch protocol version (mapped from cloud pv)
			const version = await this.adapter.getDeviceProtocolVersion(duid);
			this.adapter.rLog("TCP", duid, "Debug", undefined, undefined, `Probe using version: ${version}`, "debug");

			this.localDevices[duid] = {
				ip: ip,
				version: version,
			} as LocalDevice;
		} else {
			if (this.localDevices[duid].ip !== ip) {
				this.localDevices[duid].ip = ip;
			}
		}

		try {
			await this.initiateClient(duid, timeoutMs, suppressLog);
			if (this.isConnected(duid)) {
				this.adapter.rLog("TCP", duid, "Info", "TCP", undefined, `Network Probe success! Device ${duid} is reachable at ${ip}. Promoted to Local Control.`, "info");
				return true;
			}
			// If not connected but no error thrown, assume handshake is pending (L01).
			// Do NOT delete localDevices[duid] here, as it clears the nonce needed for the handshake.
			this.adapter.rLog("TCP", duid, "Debug", "TCP", undefined, `Connection initiated but not yet fully confirmed (Handshake pending). Keeping ${ip} as candidate.`, "debug");
			return false;
		} catch (e: any) {
			// Probe failed - cleanup temporary registration to prevent infinite retries
			delete this.localDevices[duid];

			this.adapter.rLog("TCP", duid, "Debug", undefined, undefined, `Network Probe failed for ${ip}: ${e.message}`, "debug");
			return false;
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

		this.adapter.rLog("TCP", duid, "->", version, 0, `Hello Handshake Step 1 Sent. Nonce=${connectNonce}, Timestamp=${timestamp}`, "debug");
	}

	isLocalDevice(duid: string): boolean {
		return duid in this.deviceSockets;
	}

	getIpForDuid(duid: string): string | null {
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
			this.adapter.rLog("UDP", null, "Warn", "N/A", undefined, `Failed to decrypt packet (ECB): ${e.message}`, "warn");
			return "";
		}
	}

	/**
	 * Decrypts AES-256-GCM packets (Protocol L01 Discovery).
	 */
	decryptGCM(hexPacket: string): string | null {
		const packet = Buffer.from(hexPacket, "hex");

		if (packet.length < 15) {
			this.adapter.rLog("UDP", null, "Error", "N/A", undefined, "GCM Payload too small", "error");
			return null;
		}

		// Validate CRC32
		const crcFromPacket = packet.readUInt32BE(packet.length - 4);
		const packetWithoutCrc = packet.subarray(0, packet.length - 4);
		if (crc32.buf(packetWithoutCrc) >>> 0 !== crcFromPacket) {
			this.adapter.rLog("UDP", null, "Error", "N/A", undefined, "CRC validation failed", "error");
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
			this.adapter.rLog("UDP", null, "Error", "N/A", undefined, `Failed to decrypt! Error: ${e.message} IV: ${iv.toString("hex")} Tag: ${tag.toString("hex")} Encrypted: ${ciphertext.toString("hex")}`, "error");
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
