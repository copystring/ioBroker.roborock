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

function nextSocketRandom(): number {
	return Math.floor(Math.random() * 1_000_000 + 1_000) >>> 0;
}

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
	receivedBytes: number;
	sentBytes: number;
	lastReceivedAt?: number;
	lastSentAt?: number;
	lastPingAt?: number;
	pingOutstanding: number;

	constructor(options?: SocketConstructorOpts) {
		super(options);
		this.connected = false;
		this.chunkBuffer = Buffer.alloc(0);
		this.receivedBytes = 0;
		this.sentBytes = 0;
		this.pingOutstanding = 0;

		(this as any).on("connect", () => {
			const now = Date.now();
			this.connected = true;
			this.lastReceivedAt = now;
			this.lastSentAt = now;
			this.lastPingAt = undefined;
			this.pingOutstanding = 0;
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
	private connectPromises = new Map<string, Promise<void>>();
	private sessionAckWaiters = new Map<string, { resolve: () => void; reject: (error: Error) => void; timer: NodeJS.Timeout }>();
	private discoveryServer: dgram.Socket | null = null;
	private discoveryTimer: NodeJS.Timeout | null = null;
	private gracePeriodTimer: NodeJS.Timeout | null = null;
	private tcpKeepaliveInterval: ioBroker.Interval | undefined = undefined;
	private static readonly TCP_KEEPALIVE_MS = 10_000;
	private static readonly TCP_KEEPALIVE_GRACE_MS = 1_000;
	private static readonly TCP_KEEPALIVE_CHECK_MS = 1_000;

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

	async initiateClient(duid: string, suppressLog: boolean = false, timeoutMs = 5000): Promise<void> {
		let promise = this.connectPromises.get(duid);

		if (!promise) {
			promise = this._performConnection(duid, timeoutMs)
				.finally(() => {
					// We do NOT delete from the map here immediately if we want to cache the "success" state?
					// No, we only cache the "Connecting" state.
					this.connectPromises.delete(duid);
				});
			this.connectPromises.set(duid, promise);
		}

		try {
			await promise;
		} catch (err: unknown) {
			if (suppressLog === true) {
				// Don't log internally, don't retry immediately. Let caller handle summary log.
				this.cloudDevices.add(duid);
				throw err;
			}
			const logLevel = suppressLog ? "debug" : "warn";
			this.adapter.rLog("TCP", duid, "Error", undefined, undefined, `TCP connect failed for ${duid}: ${this.adapter.errorMessage(err)}`, logLevel);
			this.scheduleReconnect(duid, "connect failed", !!suppressLog);
			this.cloudDevices.add(duid);
		}
	}

	private async _performConnection(duid: string, timeoutMs: number): Promise<void> {
		const ip = this.getIpForDuid(duid);
		if (!ip) {
			this.adapter.rLog("Local", duid, "Debug", "N/A", undefined, `No local IP -> falling back to MQTT`, "debug");
			this.cloudDevices.add(duid);
			return; // Resolves void
		}

		// Check if already connected
		const existing = this.deviceSockets?.[duid];
		if (existing?.connected) {
			this.adapter.rLog("TCP", duid, "Debug", "TCP", undefined, `Already connected via TCP`, "debug");
			this.cloudDevices.delete(duid);
			return; // Resolves void
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

			client.connect(TCP_CONNECTION_PORT, ip, () => {
				client.removeListener("error", onErrorOnce);
				client.setTimeout(0); // Disable timeout after connection
				client.setKeepAlive(true, 30000); // Keep connection alive through NAT; 30s initial delay
				this.deviceSockets[duid] = client;
				this.reconnectPlanned.delete(duid);
				this.adapter.requestsHandler.messageParser.resetTransportSequence(duid);
				resolve();
			});
		});

		// Handle incoming data
		client.on("data", async (message: Buffer) => {
			try {
				client.lastReceivedAt = Date.now();
				client.receivedBytes += message.length;
				this.adapter.rLog("TCP", duid, "<-", this.getLocalProtocolVersion(duid) ?? undefined, undefined, `raw data | bytes=${message.length} | totalRx=${client.receivedBytes} | bufferedBefore=${client.chunkBuffer.length}`, "debug");

				client.chunkBuffer = client.chunkBuffer.length === 0
					? message
					: Buffer.concat([client.chunkBuffer, message] as Uint8Array[]);
				let offset = 0;

				while (offset + 4 <= client.chunkBuffer.length) {
					const segmentLength = client.chunkBuffer.readUInt32BE(offset);
					if (segmentLength < 17) {
						this.adapter.rLog("TCP", duid, "Warn", this.getLocalProtocolVersion(duid) ?? undefined, undefined, `invalid frame length | frameBytes=${segmentLength} | buffered=${client.chunkBuffer.length}`, "warn");
						this.clearChunkBuffer(duid);
						this.scheduleReconnect(duid, "invalid frame length");
						return;
					}

					const frameEnd = offset + 4 + segmentLength;
					if (frameEnd > client.chunkBuffer.length) {
						break;
					}

					const currentBuffer = client.chunkBuffer.subarray(offset + 4, frameEnd);

					// Control frames are unencrypted and establish/maintain the local socket session.
					const protocol = currentBuffer.readUInt16BE(15);
					const frameVersion = currentBuffer.subarray(0, 3).toString();
					const frameMsgId = currentBuffer.length >= 7 ? currentBuffer.readUInt32BE(3) : undefined;
					this.adapter.rLog("TCP", duid, "<-", frameVersion, protocol, `frame header | tcpMsgId=${frameMsgId ?? "n/a"} | frameBytes=${segmentLength}`, "debug");

					if (protocol === 1) { // CONNACK
						const nonce = currentBuffer.readUInt32BE(7);
						const returnCode = currentBuffer.length >= 21 ? currentBuffer.readUInt32BE(17) : 0;
						if (returnCode === 0 && this.localDevices[duid]) {
							this.localDevices[duid].ackNonce = nonce;
							this.resolveSessionAck(duid);
							this.adapter.rLog("TCP", duid, "<-", "Control", 1, `connack | ackNonce=${nonce} | returnCode=${returnCode}`, "debug");
						} else {
							this.rejectSessionAck(duid, new Error(`TCP CONNACK rejected with returnCode=${returnCode}`));
							this.adapter.rLog("TCP", duid, "<-", "Control", 1, `connack rejected | ackNonce=${nonce} | returnCode=${returnCode}`, "warn");
						}
					} else if (segmentLength === 17 || segmentLength === 21) {
						// Short frames logic (Ping Response etc)
						switch (protocol) {
							case 3: // PINGRESP
								client.pingOutstanding = Math.max(0, client.pingOutstanding - 1);
								this.adapter.rLog("TCP", duid, "<-", frameVersion, protocol, `pingresp`, "debug");
								break;
							case 5: // PUBACK
								this.adapter.rLog("TCP", duid, "<-", frameVersion, protocol, `puback | tcpMsgId=${frameMsgId ?? "n/a"}`, "debug");
								break;

							default:
						}
					} else {
						// Decode standard data message
						const allMessages = this.adapter.requestsHandler.messageParser.decodeMsg(currentBuffer, duid);

						for (const data of allMessages) {
							// Protocol 4: Device Status Update
							if (data.protocol === 4 || data.protocol === 6 || data.protocol === 7) {
								this.sendPubAck(duid, data.seq, data.version);
							}
							if (data.protocol === 4 || data.version === "B01") {
								const payloadStr = data.payload.toString();
								let parsedPayload;
								try {
									parsedPayload = JSON.parse(payloadStr);
								} catch (e) {
									this.adapter.rLog("TCP", duid, "Error", data.version, undefined, `Parse Error | ${e}`, "warn");
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
									this.resolveLocalProtocol4Payload(duid, data.version, data.protocol, parsedPayload);
								}
							} else {
								// Explicitly log unknown protocols as Error to identify missing handlers
								this.adapter.rLog("TCP", duid, "Error", data.version, data.protocol, `Unhandled Protocol ${data.protocol}`, "error");
							}
						}
					}

					offset = frameEnd;
				}
				if (offset > 0) {
					client.chunkBuffer = client.chunkBuffer.subarray(offset);
				}
			} catch (error: unknown) {
				this.adapter.catchError(error, "initiateClient", duid);
			}
		});

		const version = this.getLocalProtocolVersion(duid);
		if (version === "1.0" || version === "L01") {
			try {
				await this.initHandshake(duid, version);
				await this.waitForSessionAck(duid, timeoutMs, version);
			} catch (error: unknown) {
				const socket = this.deviceSockets[duid];
				if (socket && !socket.destroyed) socket.destroy();
				delete this.deviceSockets[duid];
				throw error;
			}
		}

		client.on("close", () => this.scheduleReconnect(duid, `connection closed`));
		client.on("error", (error) => this.scheduleReconnect(duid, `connection error: ${error.message}`));
		client.on("end", () => this.scheduleReconnect(duid, "connection ended"));

		this.adapter.rLog("TCP", duid, "Info", undefined, undefined, `Connected`, "debug");
		this.cloudDevices.delete(duid);
	}

	/** Sends app-style PINGREQ frames so the socket session stays alive. */
	startTcpKeepaliveInterval(): void {
		if (this.tcpKeepaliveInterval) return;
		this.tcpKeepaliveInterval = this.adapter.setInterval(() => {
			for (const duid of Object.keys(this.deviceSockets)) {
				this.checkTcpActivity(duid);
			}
		}, local_api.TCP_KEEPALIVE_CHECK_MS);
	}

	private checkTcpActivity(duid: string): void {
		const client = this.deviceSockets[duid];
		if (!client?.connected || !this.isConnected(duid)) return;

		const version = this.getLocalProtocolVersion(duid);
		if (version !== "1.0" && version !== "L01") return;

		const now = Date.now();
		const lastInbound = client.lastReceivedAt ?? client.lastSentAt ?? now;
		const lastOutbound = client.lastSentAt ?? client.lastReceivedAt ?? now;
		const inboundIdleMs = now - lastInbound;
		const outboundIdleMs = now - lastOutbound;
		const pingOutstanding = client.pingOutstanding ?? 0;
		const pingDueMs = local_api.TCP_KEEPALIVE_MS - local_api.TCP_KEEPALIVE_GRACE_MS;
		const lastPingAgeMs = client.lastPingAt ? now - client.lastPingAt : 0;

		if (pingOutstanding > 0) {
			const pingTimeoutMs = client.lastPingAt ? lastPingAgeMs : inboundIdleMs;
			if (pingTimeoutMs >= local_api.TCP_KEEPALIVE_MS) {
				this.adapter.rLog("TCP", duid, "Warn", version, undefined, `keepalive timeout | pingOutstanding=${pingOutstanding} | pingTimeout=${pingTimeoutMs}ms | inboundIdle=${inboundIdleMs}ms | outboundIdle=${outboundIdleMs}ms | lastPingAgo=${lastPingAgeMs}ms`, "warn");
				this.scheduleReconnect(duid, "keepalive timeout", false);
			}
			return;
		}

		if (pingOutstanding === 0 && outboundIdleMs >= 2 * local_api.TCP_KEEPALIVE_MS) {
			this.adapter.rLog("TCP", duid, "Warn", version, undefined, `keepalive timeout | reason=no write activity | inboundIdle=${inboundIdleMs}ms | outboundIdle=${outboundIdleMs}ms`, "warn");
			this.scheduleReconnect(duid, "keepalive write timeout", false);
			return;
		}

		if (inboundIdleMs < pingDueMs && outboundIdleMs < pingDueMs) return;
		this.sendPing(duid);
	}

	stopTcpKeepaliveInterval(): void {
		if (this.tcpKeepaliveInterval) {
			this.adapter.clearInterval(this.tcpKeepaliveInterval);
			this.tcpKeepaliveInterval = undefined;
		}
	}

	/** Schedules reconnect in 5s. */
	scheduleReconnect(duid: string, reason: string, silent = false): void {
		this.adapter.rLog("TCP", duid, "Debug", undefined, undefined, `TCP ${reason} for ${duid}, retry in 5s`, "debug");
		this.adapter.requestsHandler?.rejectPendingTcpRequests?.(duid, reason);

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
				this.initiateClient(duid, silent).catch((e) => this.adapter.rLog("TCP", duid, "Error", undefined, undefined, `Reconnect failed: ${e?.message || e}`, silent ? "debug" : "warn"));
			} else if (!silent) {
				this.adapter.rLog("TCP", duid, "Debug", undefined, undefined, `Skip reconnect: no longer in localDevices`, "debug");
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
		let offset = 0;

		if (buffer.length < 4) {
			return false;
		}

		while (offset + 4 <= buffer.length) {
			const segmentLength = buffer.readUInt32BE(offset);
			const nextOffset = offset + 4 + segmentLength;

			if (nextOffset > buffer.length) {
				return false; // Data implies more bytes than available
			}

			offset = nextOffset;
		}

		return offset === buffer.length;
	}

	clearChunkBuffer(duid: string): void {
		if (this.deviceSockets[duid]) {
			this.deviceSockets[duid].chunkBuffer = Buffer.alloc(0);
		}
	}

	private waitForSessionAck(duid: string, timeoutMs: number, version: string): Promise<void> {
		if (this.localDevices[duid]?.ackNonce !== undefined) {
			return Promise.resolve();
		}

		const existingWaiter = this.sessionAckWaiters.get(duid);
		if (existingWaiter) {
			clearTimeout(existingWaiter.timer);
			existingWaiter.reject(new Error(`TCP session handshake superseded for ${duid}`));
			this.sessionAckWaiters.delete(duid);
		}

		return new Promise<void>((resolve, reject) => {
			const timer = setTimeout(() => {
				this.sessionAckWaiters.delete(duid);
				reject(new Error(`TCP session handshake timeout for ${duid} (${version})`));
			}, timeoutMs);

			this.sessionAckWaiters.set(duid, {
				resolve: () => {
					clearTimeout(timer);
					this.sessionAckWaiters.delete(duid);
					resolve();
				},
				reject,
				timer,
			});
		});
	}

	private resolveSessionAck(duid: string): void {
		const waiter = this.sessionAckWaiters.get(duid);
		if (waiter) {
			waiter.resolve();
		}
	}

	private rejectSessionAck(duid: string, error: Error): void {
		const waiter = this.sessionAckWaiters.get(duid);
		if (waiter) {
			clearTimeout(waiter.timer);
			this.sessionAckWaiters.delete(duid);
			waiter.reject(error);
		}
	}

	sendMessage(duid: string, message: Buffer): boolean {
		const client = this.deviceSockets[duid];
		if (client?.connected && !client.destroyed && client.writable) {
			try {
				client.write(message, (error?: Error | null) => {
					if (error) {
						this.scheduleReconnect(duid, `write failed: ${error.message}`);
					}
				});
			} catch (error: unknown) {
				this.scheduleReconnect(duid, `write failed: ${this.adapter.errorMessage(error)}`);
				return false;
			}
			client.lastSentAt = Date.now();
			client.sentBytes += message.length;
			return true;
		}
		return false;
	}

	isConnected(duid: string): boolean {
		if (this.deviceSockets[duid] && this.deviceSockets[duid].connected) {
			const dev = this.localDevices[duid];
			if (dev && (dev.version === "1.0" || dev.version === "L01")) {
				return dev.ackNonce !== undefined;
			}
			// For B01 or generic TCP - connected socket is enough
			return true;
		}
		return false;
	}

	private resolveLocalProtocol4Payload(duid: string, version: string, protocol: number, parsedPayload: any): void {
		const dps = parsedPayload?.dps;
		let content: any = null;

		if (dps && typeof dps === "object" && !Array.isArray(dps)) {
			content = dps["102"] ?? dps["101"] ?? dps;
		}
		if (content == null && parsedPayload && typeof parsedPayload.id !== "undefined") {
			content = parsedPayload;
		}
		if (typeof content === "string") {
			try {
				content = JSON.parse(content);
			} catch (e) {
				this.adapter.rLog("TCP", duid, "Error", version, protocol, `Nested JSON Parse Error | ${e}`, "warn");
				return;
			}
		}
		if (!content || typeof content !== "object" || typeof content.id === "undefined") return;

		const id = Number(content.id);
		if (!Number.isFinite(id)) return;

		const result = Object.prototype.hasOwnProperty.call(content, "result") ? content.result : content.error;
		this.adapter.requestsHandler.resolvePendingRequest(id, result, String(protocol), duid, "TCP");
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

		const devices: Record<string, LocalDevice> = {};

		// Create UDP socket
		const socketOptions: dgram.SocketOptions = process.platform === "win32" ? { type: "udp4", reuseAddr: true } : { type: "udp4", reusePort: true };

		this.discoveryServer = dgram.createSocket(socketOptions);

		this.discoveryServer.on("message", async (msg) => {
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
				}
			} catch (error: unknown) {
				this.adapter.rLog("UDP", null, "Error", "N/A", undefined, `Failed to process UDP message: ${this.adapter.errorStack(error)}`, "warn");
			}
		});

		this.discoveryServer.on("listening", () => {
			const addr = this.discoveryServer!.address();
			const allDevices = this.adapter.http_api.getDevices();
			const ownedDevices = allDevices.filter(d => !this.adapter.http_api.isSharedDevice(d.duid));
			this.adapter.rLog("UDP", null, "Info", undefined, undefined, `UDP listening on ${addr.address}:${addr.port} (Expecting ${ownedDevices.length} owned devices)`, "info");
		});

		this.discoveryServer.on("error", (error) => this.adapter.rLog("UDP", null, "Error", "N/A", undefined, `Server error: ${error.stack}`, "error"));

		try {
			this.discoveryServer.bind(UDP_DISCOVERY_PORT);
		} catch (e: unknown) {
			this.adapter.rLog("UDP", null, "Error", "N/A", undefined, `Failed to bind UDP port: ${this.adapter.errorMessage(e)}`, "error");
		}

		// Run discovery for specified timeout
		await new Promise<void>((resolve) => {
			const allDevices = this.adapter.http_api.getDevices();
			// We only want to wait for "Owned" devices to be found before finishing early.
			// Shared devices might be remote, so we shouldn't block/wait for them.
			const ownedDevices = allDevices.filter(d => !this.adapter.http_api.isSharedDevice(d.duid));
			const expectedCount = ownedDevices.length;

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
						// Cancel the main timeout (10s) immediately, as we are now in "Finishing" mode.
						if (this.discoveryTimer) {
							clearTimeout(this.discoveryTimer);
							this.discoveryTimer = null;
						}

						this.gracePeriodTimer = setTimeout(() => {
							this.stopUdpDiscovery();
							const duids = Object.keys(devices).join(", ");
							this.adapter.rLog("UDP", null, "Info", undefined, undefined, `UDP discovery finished. Found ${Object.keys(devices).length} total devices: [${duids}]`, "info");
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
				const duids = Object.keys(devices).join(", ");
				this.adapter.rLog("UDP", null, "Info", undefined, undefined, `UDP discovery finished. Found ${Object.keys(devices).length}/${expectedCount} devices: [${duids}]`, "info");
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
		}
	}

	/**
	 * Initializes the local socket session before PUBLISH frames are sent.
	 */
	async initHandshake(duid: string, version: string): Promise<void> {
		const dev = this.localDevices[duid];
		if (!dev) {
			this.adapter.rLog("TCP", duid, "Warn", undefined, undefined, "initHandshake: no local device data found", "warn");
			return;
		}

		try {
			const connectNonce = nextSocketRandom();
			dev.connectNonce = connectNonce;
			dev.ackNonce = undefined; // Reset for new handshake
			this.adapter.requestsHandler.messageParser.resetTransportSequence(duid);

			await this.sendHello(duid, connectNonce, version);
		} catch (err: unknown) {
			this.adapter.rLog("TCP", duid, "Error", version, undefined, `initHandshake failed for ${duid}: ${this.adapter.errorMessage(err)}`, "warn");
		}
	}

	/**
	 * Probes a device at a specific IP via TCP.
	 * If successful, promotes it to a Local Device.
	 */

	async checkAndPromoteLocalConnection(duid: string, ip: string, timeoutMs = 5000, suppressLog = false): Promise<boolean> {
		if (this.isConnected(duid)) return true;		// Register temporarily to allow initiateClient to work
		if (!this.localDevices[duid]) {
			// Fetch protocol version (mapped from cloud pv)
			const version = await this.adapter.getDeviceProtocolVersion(duid);

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
			await this.initiateClient(duid, suppressLog, timeoutMs);

			if (this.isConnected(duid)) {
				this.adapter.rLog("TCP", duid, "Info", "TCP", undefined, `Network Probe success! Device ${duid} is reachable at ${ip}. Promoted to Local Control.`, "info");
				return true;
			}

			// Check if we at least have a connected socket (waiting for L01 handshake)
			const socket = this.deviceSockets[duid];
			if (socket && socket.connected) {
				this.adapter.rLog("TCP", duid, "Debug", "TCP", undefined, `Connection initiated but not yet fully confirmed (Handshake pending). Keeping ${ip} as candidate.`, "debug");
				return false;
			}

			// If we are here, TCP failed hard (timeout/refused), but initiateClient swallowed the error.
			// We must clean up to prevent infinite reconnect loops.
			throw new Error("TCP Connection failed (No socket established)");
		} catch (e: unknown) {
			// Probe failed - cleanup temporary registration AND cancel any scheduled reconnects
			delete this.localDevices[duid];

			this.adapter.rLog("TCP", duid, "Debug", undefined, undefined, `Network Probe failed for ${ip}: ${this.adapter.errorMessage(e)} (Cloud Fallback)`, "debug");
			return false;
		}
	}

	/** App-style CONNECT packet, once per TCP socket session. */
	async sendHello(duid: string, connectNonce: number, version: string): Promise<void> {
		const keepAliveSeconds = 10;
		const protocol = 0; // SocketFrameType.CONNECT

		// Match the app socket CONNECT frame: 17-byte header + 4-byte keepalive.
		// PUBLISH frames carry payload length and CRC, CONNECT/CONNACK do not.
		const payload = Buffer.alloc(4);
		payload.writeUInt32BE(keepAliveSeconds, 0);
		const wrapped = this.buildControlFrame(version, 0, connectNonce, 0, protocol, payload);

		this.sendMessage(duid, wrapped);

		this.adapter.rLog("TCP", duid, "->", version, 0, `connect | connectNonce=${connectNonce} | keepAlive=${keepAliveSeconds}s`, "debug");
	}

	sendPing(duid: string): void {
		const version = this.getLocalProtocolVersion(duid);
		if (version !== "1.0" && version !== "L01") return;
		const client = this.deviceSockets[duid];
		if (!client?.connected) return;
		this.sendMessage(duid, this.buildControlFrame(version, 0, 0, 0, 2));
		client.lastPingAt = Date.now();
		client.pingOutstanding = (client.pingOutstanding ?? 0) + 1;
		this.adapter.rLog("TCP", duid, "->", version, 2, "pingreq", "debug");
	}

	private sendPubAck(duid: string, messageId: number, version: string): void {
		this.sendMessage(duid, this.buildControlFrame(version, messageId, 0, 0, 5));
		this.adapter.rLog("TCP", duid, "->", version, 5, `puback | tcpMsgId=${messageId}`, "debug");
	}

	private buildControlFrame(version: string, messageId: number, randomValue: number, timestamp: number, protocol: number, payload = Buffer.alloc(0)): Buffer {
		const msg = Buffer.alloc(17 + payload.length);
		msg.write(version);
		msg.writeUInt32BE(messageId >>> 0, 3);
		msg.writeUInt32BE(randomValue >>> 0, 7);
		msg.writeUInt32BE(timestamp >>> 0, 11);
		msg.writeUInt16BE(protocol, 15);
		payload.copy(msg, 17);

		const lenBuf = Buffer.alloc(4);
		lenBuf.writeUInt32BE(msg.length, 0);

		return Buffer.concat([lenBuf, msg] as Uint8Array[]);
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
		} catch (e: unknown) {
			// Log warning instead of error to avoid spamming if it's just a bad packet
			this.adapter.rLog("UDP", null, "Warn", "N/A", undefined, `Failed to decrypt packet (ECB): ${this.adapter.errorMessage(e)}`, "warn");
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
		} catch (e: unknown) {
			this.adapter.rLog("UDP", null, "Error", "N/A", undefined, `Failed to decrypt! Error: ${this.adapter.errorMessage(e)} IV: ${iv.toString("hex")} Tag: ${tag.toString("hex")} Encrypted: ${ciphertext.toString("hex")}`, "error");
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
