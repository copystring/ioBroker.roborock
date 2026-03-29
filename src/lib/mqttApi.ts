import * as crypto from "node:crypto";
import * as mqtt from "mqtt";
import * as protobuf from "protobufjs";
import * as zlib from "node:zlib";
import type { Roborock } from "../main";
import { MapDecryptor as B01MapDecryptor } from "./map/b01/MapDecryptor";
import { ROBOROCK_PROTO_STR } from "./map/b01/roborock_proto";
import { B01ChunkAssembler } from "./B01ChunkAssembler";
import { PhotoManager } from "./PhotoManager";

let cachedB01RobotMapType: protobuf.Type | null = null;

export class mqtt_api {
	adapter: Roborock;
	mqttUser: string;
	mqttPassword: string;
	client: any;
	connected: boolean;
	public photoManager: PhotoManager;
	private chunkAssembler: B01ChunkAssembler;
	mqttOptions: any;
	reconnectTimer: any;

	constructor(adapter: Roborock) {
		this.adapter = adapter;

		this.mqttUser = "";
		this.mqttPassword = "";
		this.client = null;
		this.connected = false;
		this.mqttOptions = null;
		this.reconnectTimer = null;

		this.photoManager = new PhotoManager(this.adapter);
		this.chunkAssembler = new B01ChunkAssembler(adapter);
	}

	/**
	 * Initializes the MQTT API by setting up credentials and connecting.
	 */
	async init(): Promise<void> {
		this.setup_mqtt_user();
		await this.connect_mqtt();
	}

	/**
	 * Derives MQTT credentials from the RRIOT data.
	 */
	setup_mqtt_user(): void {
		const rriot = this.adapter.http_api.get_rriot();

		// Generate MQTT username and password based on rriot data hashing
		this.mqttUser = this.md5hex(rriot.u + ":" + rriot.k).substring(2, 10);
		this.mqttPassword = this.md5hex(rriot.s + ":" + rriot.k).substring(16);

		this.mqttOptions = {
			clientId: this.mqttUser,
			username: this.mqttUser,
			password: this.mqttPassword,
			keepalive: 30,
			reconnectPeriod: 60000, // reconnect every 60s if disconnected
			clean: true,
		};
	}

	/**
	 * Establishes the connection to the Roborock MQTT broker.
	 */
	async connect_mqtt(): Promise<void> {
		if (!this.mqttOptions) {
			throw new Error("MQTT options not initialized. Call setup_mqtt_user() first.");
		}

		const rriot = this.adapter.http_api.get_rriot();
		this.adapter.rLog("MQTT", null, "Info", undefined, undefined, `Connecting to MQTT Broker at ${rriot.r.m}...`, "info");

		const client = mqtt.connect(rriot.r.m, this.mqttOptions);
		this.client = client;

		// Robust global error handling to prevent uncaught exceptions (like EPIPE)
		client.on("error", (err: Error) => {
			this.adapter.rLog("MQTT", null, "Error", "Info", undefined, `MQTT Client Error: ${err.message}`, "error");
			this.connected = false;
		});

		// Set up persistent listeners early
		this.subscribe_mqtt_message(client);

		return new Promise((resolve, reject) => {
			let connectionHandled = false;

			const onConnect = () => {
				if (!connectionHandled) {
					connectionHandled = true;
					this.connected = true;

					// Now set up event listeners and WAIT for initial subscription
					this.subscribe_mqtt_events(client)
						.then(() => resolve())
						.catch((err) => reject(err));
				}
			};

			if (client.connected) {
				onConnect();
			} else {
				client.once("connect", onConnect);
			}

			client.once("error", (error: Error) => {
				if (!connectionHandled) {
					connectionHandled = true;
					this.adapter.rLog("MQTT", null, "Error", "Info", undefined, `MQTT connection setup failed. Error: ${error.message}`, "error");
					this.connected = false;
					client.end();
					reject(error);
				}
			});

			// Timeout after 10s to prevent infinite wait
			this.adapter.setTimeout(() => {
				if (!connectionHandled) {
					connectionHandled = true;
					client.end();
					reject(new Error("MQTT connection timeout after 10s"));
				}
			}, 10000);
		});
	}

	/**
	 * Subscribes to MQTT client events (connect, error, offline, etc.).
	 * @param client - The MQTT client instance.
	 */
	async subscribe_mqtt_events(client: any): Promise<void> {
		const rriot = this.adapter.http_api.get_rriot();

		return new Promise((resolveSubscription, rejectSubscription) => {
			let initialSubscriptionHandled = false;

			const doSubscribe = () => {
				this.connected = true;
				this.adapter.rLog("MQTT", null, "Info", undefined, undefined, `MQTT connection established. subscribing...`, "info");

				const topic = `rr/m/o/${rriot.u}/${this.mqttUser}/#`;
				client.subscribe(topic, (err: Error | null) => {
					if (err) {
						this.adapter.rLog("MQTT", null, "Error", "Info", undefined, `Failed to subscribe to ${topic}! Error: ${err}`, "error");
						if (!initialSubscriptionHandled) {
							initialSubscriptionHandled = true;
							rejectSubscription(err);
						}
					} else {
						this.adapter.rLog("MQTT", null, "Info", undefined, undefined, `Subscribed to ${topic}`, "debug");
						if (!initialSubscriptionHandled) {
							initialSubscriptionHandled = true;
							resolveSubscription();
						}
					}
				});
			};

			client.on("connect", doSubscribe);

			if (client.connected) {
				doSubscribe();
			}

			// Safety timeout for subscription
			this.adapter.setTimeout(() => {
				if (!initialSubscriptionHandled) {
					initialSubscriptionHandled = true;
					this.adapter.rLog("MQTT", null, "Warn", "MQTT", undefined, `Initial subscription timed out, continuing anyway.`, "warn");
					resolveSubscription(); // Don't block forever if sub fails but conn is up
				}
			}, 5000);
		});

		client.on("disconnect", () => {
			this.adapter.rLog("MQTT", null, "Info", undefined, undefined, `MQTT disconnected.`, "info");
			this.connected = false;
		});

		client.on("error", (error: Error) => {
			this.adapter.rLog("MQTT", null, "Error", "Info", undefined, `MQTT connection error: ${error.message}. Broker: ${rriot.r.m}`, "error");
			this.connected = false;
		});

		client.on("close", () => {
			this.adapter.rLog("MQTT", null, "Info", undefined, undefined, `MQTT connection closed. Reconnecting in 60 seconds...`, "info");
			this.connected = false;
		});

		client.on("reconnect", () => {
			this.adapter.rLog("MQTT", null, "Info", undefined, undefined, `MQTT attempting to reconnect...`, "info");
			// Subscription is usually handled automatically by MQTT client on reconnect if clean=false,
			// but if we need to re-subscribe manually:
			const topic = `rr/m/o/${rriot.u}/${this.mqttUser}/#`;
			client.subscribe(topic, (err: Error | null) => {
				if (err) this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Failed to re-subscribe during reconnect: ${err}`, "error");
			});
		});

		client.on("offline", () => {
			this.adapter.rLog("MQTT", null, "Info", undefined, undefined, "MQTT connection went offline.", "warn");
			this.connected = false;
		});
	}

	/**
	 * Sets up the listener for incoming MQTT messages.
	 * @param client - The MQTT client instance.
	 */
	async subscribe_mqtt_message(client: any): Promise<void> {
		client.on("message", async (topic: string, message: Buffer) => {
			try {
				/**
				 * Listens for incoming MQTT messages and dispatches them to the appropriate handlers.
				 * @see test/unit/transport_specification.test.ts for the MQTT topic structure.
				 */
				const parts = topic.split("/");
				const duid = parts[parts.length - 1]; // ALWAYS use the last segment as the DUID

				if (!duid) {
					this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Could not extract DUID from topic: ${topic}`, "warn");
					return;
				}
				let finalDuid = duid;

				// Verify identity against known devices
				const knownDevices = this.adapter.http_api.getDevices();
				if (knownDevices.some(d => d.duid === duid)) {
					// Direct match
				} else {
					// Last segment not a known DUID: treat as endpoint-only response topic.
					// Search backwards through path for any known DUID.
					const safeParts = [...parts];
					for (let i = safeParts.length - 2; i >= 0; i--) {
						const seg = safeParts[i];
						if (knownDevices.some(d => d.duid === seg)) {
							finalDuid = seg;
							break;
						}
					}
				}
				const allMessages = this.adapter.requestsHandler.messageParser.decodeMsg(message, duid);

				for (const data of allMessages) {
					await this.handleDecodedMessage(finalDuid, data);
				}
			} catch (error: unknown) {
				this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Error processing MQTT message on ${topic}: ${this.adapter.errorStack(error)}`, "error");
			}
		});

		this.adapter.rLog("MQTT", null, "Info", undefined, undefined, `MQTT message listener initialized.`, "info");
	}

	private decryptB01Payload(payload: Buffer, duid: string): Buffer {
		const devices = this.adapter.http_api.getDevices();
		const device = devices.find((d: any) => d.duid === duid);
		const serial = device?.sn || "";
		const model = this.adapter.http_api.getRobotModel(duid) || "roborock.vacuum.a27";
		const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
		const result = B01MapDecryptor.decrypt(payload, serial, model, duid, this.adapter, localKey);
		return result || payload;
	}

	/**
	 * Helper to process the inner JSON of a B01 response.
	 */
	private async handleB01Response(response: any, duid: string): Promise<void> {
		const reqId = Number(response.msgId || response.id);

		if (isNaN(reqId) || reqId <= 0) {
			this.adapter.rLog("MQTT", duid, "<-", "B01", undefined, "Message has no valid ID", "warn");
			return;
		}

		const pending = this.adapter.pendingRequests.get(reqId);
		if (!pending) {
			this.handleUnknownB01Response(duid, reqId);
			return;
		}

		// Handle inner payload (Map/Photo)
		if (response.payload && await this.processB01InnerPayload(duid, reqId, response.payload)) {
			return;
		}

		const result: unknown = response.data ?? response.result ?? response.error;

		// Special handling for Map/Photo ACKs in B01
		const isMapOrPhoto = ["get_map_v1", "get_clean_record_map", "get_photo"].includes(pending.method);
		const isSuccessOk = result === "ok" || (Array.isArray(result) && result[0] === "ok");

		if (isMapOrPhoto && isSuccessOk) {
			// ACK received, waiting for binary data
		} else {
			this.adapter.requestsHandler.resolvePendingRequest(reqId, result, `MQTT-B01`, duid, "MQTT");
		}
	}

	/**
	 * Extracts and processes the inner 'payload' field from a B01 response.
	 */
	private async processB01InnerPayload(duid: string, reqId: number, payloadHex: string): Promise<boolean> {
		try {
			const payloadBuf = Buffer.from(payloadHex, "hex");
			const finalPayload = this.decryptB01Payload(payloadBuf, duid);

			if (finalPayload && finalPayload.length > 0) {
				this.adapter.requestsHandler.resolvePendingRequest(reqId, finalPayload, "B01", duid);
				return true;
			}
		} catch (e) {
			this.adapter.rLog("MQTT", duid, "Error", "B01", reqId, `Failed to process inner payload: ${e}`, "error");
		}
		return false;
	}

	/**
	 * Handles a B01 response that doesn't match any pending request.
	 */
	private handleUnknownB01Response(_duid: string, reqId: number): void {
		if (this.adapter.requestsHandler.isRequestRecentlyFinished(reqId)) {
			return;
		}
	}

	/**
	 * Processes a single decoded Roborock message frame.
	 */
	async handleDecodedMessage(duid: string, data: any): Promise<void> {
		// 1. Protocol A01 / B01 (Tuya-like / JSON payload)
		const isJsonProtocol = (data.version === "A01" || data.version === "B01") && data.protocol !== 300 && data.protocol !== 301;
		if (isJsonProtocol) {
			await this.handleProtocolA01B01(duid, data);

			// Only early return if it's NOT a specialized protocol that needs fallout to Section 2/3/4
			if (![102, 300, 301, 500].includes(data.protocol)) {
				return;
			}
		}

		// 2. Protocol 102 (General Command Response)
		if (data.protocol === 102) {
			await this.handleProtocol102(duid, data);
			return;
		}

		// 3. Protocol 300 & 301 & 302 (Binary Data: Photos, Maps, B01 Maps)
		if (data.protocol === 300 || data.protocol === 301 || data.protocol === 302) {
			await this.handlePhotoOrMapData(duid, data);
			return;
		}

		// 3b. Protocol 101 (V1 get_photo: binary photo or JSON ACK/error)
		if (data.protocol === 101 && data.version === "1.0") {
			if (data.payload.length >= 8 && data.payload.subarray(0, 8).toString("ascii") === "ROBOROCK") {
				const pending = this.adapter.requestsHandler.getPendingBinaryRequest(data.payload, duid);
				const msgId =
					pending && "binaryType" in pending && pending.binaryType === "photo" ? (pending as { messageID?: number }).messageID : undefined;
				await this.photoManager.handlePhotoProtocol301(duid, data.payload, msgId);
				return;
			}
			if (data.payload.length > 0 && data.payload[0] === 0x7B) {
				await this.handleProtocol101Response(duid, data);
				return;
			}
		}

		// 4. Protocol 500 (Device Status / OTA)
		if (data.protocol === 500) {
			await this.handleProtocol500(duid, data);
			return;
		}

		// 5. Unknown Protocol
		const version = await this.adapter.getDeviceProtocolVersion(duid).catch(() => "1.0");
		this.adapter.rLog("MQTT", duid, "<-", version, String(data.protocol), "Unknown Protocol", "warn");
	}

	/**
	 * Handles Protocol A01/B01 messages (Tuya-like JSON wrapper).
	 */
	private async handleProtocolA01B01(duid: string, data: any): Promise<void> {
		try {
			const payloadStr = data.payload.toString();
			const parsedPayload = JSON.parse(payloadStr);
			if (data.version === "B01") {
				await this.dispatchB01Message(duid, parsedPayload);
			} else {
				await this.adapter.processA01(duid, parsedPayload);
			}
		} catch (e) {
			this.adapter.rLog("MQTT", duid, "Error", data.version, undefined, `Failed to parse payload: ${e}`, "error");
		}
	}

	/**
	 * Dispatches a B01 JSON message to the appropriate handler.
	 */
	private async dispatchB01Message(duid: string, parsedPayload: any): Promise<void> {
		// Standard B01 Wrapper: { dps: { "10001": { ... } } }
		if (parsedPayload.dps?.["10001"]) {
			let inner = parsedPayload.dps["10001"];

			if (typeof inner === "string") {
				try {
					inner = JSON.parse(inner);
				} catch (e) {
					this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `Failed to parse B01 nested string payload: ${e}`, "warn");
					return;
				}
			}
			await this.handleB01Response(inner, duid);
		}
	}

	/**
	 * Handles Protocol 102 (General Command Response).
	 */
	private async handleProtocol102(duid: string, data: any): Promise<void> {
		try {
			const parsed = JSON.parse(data.payload.toString());
			let dps102 = parsed.dps?.["102"] || (parsed.dps ? parsed.dps : null);

			if (typeof dps102 === "string") {
				dps102 = JSON.parse(dps102);
			}

			if (!dps102 || typeof dps102 !== "object") return;

			const pendingRequest = this.adapter.pendingRequests.get(dps102.id);
			if (pendingRequest) {
				await this.resolveProtocol102Request(duid, data.protocol, dps102, pendingRequest);
			} else {
				// UNSOLICITED STATUS / RESPONSE FROM OTHER CLIENT (App)
				const isRecentlyFinished = this.adapter.requestsHandler.isRequestRecentlyFinished(dps102.id);
				const isPropPost = dps102.method === "prop.post";
				const hasStatusResult = Array.isArray(dps102.result) && dps102.result[0] && typeof dps102.result[0] === "object" && "state" in dps102.result[0];

				if (hasStatusResult || isPropPost) {
					// Discard unsolicited updates from official App silently
				} else if (!isRecentlyFinished) {
				}
			}
		} catch (e) {
			this.adapter.rLog("MQTT", duid, "Error", "102", undefined, `Failed to parse Protocol 102: ${e}`, "error");
		}
	}

	private async resolveProtocol102Request(duid: string, protocol: number, dps102: any, pending: any): Promise<void> {
		const isBinaryDataMethod = ["get_map_v1", "get_clean_record_map", "get_photo"].includes(pending.method);

		if (isBinaryDataMethod) {
			const isSuccessOk = dps102.result === "ok" || (Array.isArray(dps102.result) && dps102.result[0] === "ok");
			if (isSuccessOk) {
			} else {
				this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, protocol, duid, "MQTT");
			}
		} else {
			this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, protocol, duid, "MQTT");
		}
	}

	/**
	 * Handles Protocol 101 JSON response (V1 get_photo ACK or error). Same semantics as 102: do not resolve on "ok" for get_photo (wait for binary).
	 */
	private async handleProtocol101Response(duid: string, data: any): Promise<void> {
		try {
			const parsed = JSON.parse(data.payload.toString());
			const dps101 = parsed.dps?.["101"] ?? (typeof parsed.id !== "undefined" ? parsed : null);
			const inner = typeof dps101 === "string" ? (() => {
				try {
					return JSON.parse(dps101);
				} catch {
					return null;
				}
			})() : dps101;
			if (!inner || typeof inner !== "object") return;

			const pendingRequest = this.adapter.pendingRequests.get(inner.id);
			if (pendingRequest) {
				await this.resolveProtocol102Request(duid, 101, inner, pendingRequest);
			}
		} catch (e) {
			this.adapter.rLog("MQTT", duid, "Error", "101", undefined, `Failed to parse Protocol 101 response: ${e}`, "error");
		}
	}

	/**
	 * Handles Protocol 500 (Device Status / OTA).
	 */
	private async handleProtocol500(duid: string, data: any): Promise<void> {
		try {
			const parsedData = JSON.parse(data.payload.toString("utf8"));
			const version = await this.adapter.getDeviceProtocolVersion(duid).catch(() => "1.0");

			if (parsedData.mqttOtaData) {
				const status = parsedData.mqttOtaData.mqttOtaStatus?.status;
				const progress = parsedData.mqttOtaData.mqttOtaProgress?.progress;

				if (status) this.adapter.rLog("MQTT", duid, "Info", version, "500", `Firmware Update Status: ${status}`, "info");
				if (progress !== undefined) this.adapter.rLog("MQTT", duid, "Info", version, "500", `Firmware Update Progress: ${progress}%`, "info");
			} else if (parsedData.online === false) {
				this.adapter.rLog("MQTT", duid, "Info", version, "500", `Device OFFLINE.`, "info");
			}
		} catch (error: unknown) {
			const version = await this.adapter.getDeviceProtocolVersion(duid).catch(() => "1.0");
			this.adapter.rLog("MQTT", duid, "Error", version, "500", `Parse Error | ${this.adapter.errorMessage(error)}`, "warn");
		}
	}

	/**
	 * Handles binary data messages (Protocol 300/301) for Photos or Maps.
	 * B01ChunkAssembler distinguishes Photo (ROBOROCK) vs Map and assembles chunked maps.
	 */
	async handlePhotoOrMapData(duid: string, data: any): Promise<void> {
		const payloadBuf = data.payload as Buffer;
		const pending: any = this.adapter.requestsHandler.getPendingBinaryRequest(payloadBuf, duid);

		if (pending) {
			const binaryType = pending.binaryType;
			const msgId = (pending as any).messageID;
			const isMap = binaryType === "map" || (pending as any).method === "get_map_v1" || (pending as any).method === "get_clean_record_map";

			if (binaryType === "photo") {
				if (data.protocol === 300) {
					await this.photoManager.handlePhotoProtocol300(duid, payloadBuf);
				} else {
					await this.photoManager.handlePhotoProtocol301(duid, payloadBuf, msgId);
				}
				return;
			}
			if (isMap) {
				if (data.protocol === 302) {
					await this.handleB01Map(duid, data, payloadBuf);
					return;
				}
				if (data.protocol === 301 && !(payloadBuf.length >= 3 && payloadBuf.subarray(0, 3).toString("ascii") === "B01")) {
					await this.handleV1MapPacket(duid, data, payloadBuf);
					return;
				}
				// 300 or 301 with B01 payload: B01 chunked map, fall through to chunkAssembler
			}
		}

		// Continuation chunks (no ROBOROCK header) may not match getPendingBinaryRequest; try PhotoManager if we have a pending photo.
		if (!pending && data.protocol === 301 && payloadBuf.length >= 3 &&
			payloadBuf.subarray(0, 3).toString("ascii") !== "B01" &&
			this.adapter.requestsHandler.hasPendingPhotoRequest(duid)) {
			const handled = await this.photoManager.handlePhotoProtocol301(duid, payloadBuf);
			if (handled) return;
		}

		// Gate: pending request is photo (binaryType === "photo") => only PhotoManager, never feed to Map assembler.
		// Exception: payload starting with "B01" is a map frame, still send to chunkAssembler.
		if ((data.protocol === 300 || data.protocol === 301) && this.adapter.requestsHandler.hasPendingPhotoRequest(duid) &&
			!(payloadBuf.length >= 3 && payloadBuf.subarray(0, 3).toString("ascii") === "B01")) {
			const handled = data.protocol === 300
				? await this.photoManager.handlePhotoProtocol300(duid, payloadBuf)
				: await this.photoManager.handlePhotoProtocol301(duid, payloadBuf);
			if (handled) return;
			// Not handled (e.g. out-of-order): skip chunkAssembler so we don't buffer as map and trigger timeout.
			return;
		}

		if (data.protocol === 300 || data.protocol === 301) {
			const result = await this.chunkAssembler.process(duid, {
				protocol: data.protocol,
				seq: data.seq,
				payload: payloadBuf,
				payloadLen: data.payloadLen,
			});

			if (result.type === "photo") {
				if (data.protocol === 300) {
					await this.photoManager.handlePhotoProtocol300(duid, result.payload);
				} else {
					await this.photoManager.handlePhotoProtocol301(duid, result.payload, pending?.messageID);
				}
				return;
			}
			if (result.type === "map") {
				this.resolveAndSendB01Map(duid, result.payload, data.protocol);
				return;
			}
			if (result.type === "map_chunk_buffered") return;
		}

		if (data.protocol === 300) {
			await this.photoManager.handlePhotoProtocol300(duid, payloadBuf);
		} else if (data.protocol === 301) {
			await this.tryHandleB01Map301Single(duid, data);
		} else if (data.protocol === 302) {
			await this.handleB01Map(duid, data, payloadBuf);
		}
	}

	/** Resolves decrypted B01 map to pending request (301 logic: taskBeginDate/classify) and sends payload; no-op if no match. */
	private resolveAndSendB01Map(duid: string, mapBuf: Buffer, protocol: number): void {
		const foundId = this.resolveB01Map301ToPendingId(duid, mapBuf);
		this.resolvePendingMapIfFound(foundId, mapBuf, protocol, duid);
	}

	/** Sends map payload to pending request when foundId is valid; no-op otherwise. */
	private resolvePendingMapIfFound(foundId: number, mapBuf: Buffer, protocol: number, duid: string): void {
		if (foundId !== -1) {
			this.adapter.requestsHandler.resolvePendingRequest(foundId, mapBuf, protocol, duid, "MQTT", "B01");
		}
	}

	/** Single 301 frame (no chunk assembler): envelope, JSON error log, then decrypt and resolve if B01 map. */
	private async tryHandleB01Map301Single(duid: string, data: any): Promise<void> {
		const payloadBuf = data.payload as Buffer;
		if (this.handleB01Map301Envelope(duid, data)) return;
		if (payloadBuf[0] === 0x7B) {
			this.logIf301IsCloudError(duid, payloadBuf);
			return;
		}
		const hasB01Signature =
			(payloadBuf.length >= 3 && payloadBuf.toString("ascii", 0, 3) === "B01") ||
			(payloadBuf.length >= 8 && payloadBuf.subarray(0, 8).toString("ascii") === "ROBOROCK");
		if (!hasB01Signature) return;
		const workingBuf = this.getB01MapBuffer(duid, payloadBuf);
		if (workingBuf?.length > 0) this.resolveAndSendB01Map(duid, workingBuf, data.protocol);
	}

	/**
	 * Recognizes B01 map 301 envelope: {"roborock":{"ver":"B01","proto":301,"map_id":...},...}.
	 * When recognized: if cloud error → resolve pending with null; else return true.
	 */
	private handleB01Map301Envelope(duid: string, data: any): boolean {
		const payloadBuf = data.payload as Buffer;
		if (payloadBuf.length < 50 || payloadBuf[0] !== 0x7B) return false;
		let json: { roborock?: { ver?: string; proto?: number; map_id?: number; error?: string }; ver?: string; proto?: number; map_id?: number; error?: string };
		try {
			json = JSON.parse(payloadBuf.toString("utf8"));
		} catch {
			return false;
		}
		const roborock = json?.roborock ?? json;
		if (roborock?.ver !== "B01" || roborock?.proto !== 301 || !("map_id" in roborock)) return false;

		const pendingId = this.findPendingB01MapRequestByMethod(duid, "get_map_v1");
		const id = pendingId !== -1 ? pendingId : this.findPendingB01MapRequestByMethod(duid, "get_clean_record_map");
		if (id === -1) return true;

		if (roborock.error) {
			this.adapter.rLog("MQTT", duid, "Warn", "B01", undefined, `301 map envelope: cloud error (${roborock.error})`, "warn");
		}
		this.adapter.requestsHandler.resolvePendingRequest(id, null, data.protocol, duid, "MQTT", "B01");
		return true;
	}

	private async handleV1MapPacket(duid: string, data: any, payloadBuf: Buffer): Promise<void> {
		if (payloadBuf.length < 24) return;

		try {
			const msgId = payloadBuf.readUInt16LE(16);
			const pending = this.adapter.pendingRequests.get(msgId);

			if (!pending || pending.duid !== duid) return;

			// Verify this is actually a map request to avoid ID collisions
			if (pending.method !== "get_map_v1" && pending.method !== "get_clean_record_map") {
				return;
			}
			const unzipped = this.decryptAndUnzipV1MapCore(payloadBuf.subarray(24));
			this.adapter.requestsHandler.resolvePendingRequest(msgId, unzipped, data.protocol, duid, "MQTT", "1.0");
		} catch (e: unknown) {
			this.adapter.rLog("MQTT", duid, "Error", "1.0", String(data.protocol), `V1 map processing failed: ${this.adapter.errorMessage(e)}`, "error");
		}
	}

	/** V1 map: outer payload decrypted by messageParser; inner is AES-128-CBC (adapter nonce) then gzip. */
	private decryptAndUnzipV1MapCore(decryptedPayload: Buffer): Buffer {
		const iv = Buffer.alloc(16, 0);
		const decipher = crypto.createDecipheriv("aes-128-cbc", this.adapter.nonce, iv);
		let decrypted = decipher.update(decryptedPayload as Uint8Array);
		decrypted = Buffer.concat([decrypted as Uint8Array, decipher.final()]);
		return zlib.gunzipSync(decrypted as Uint8Array);
	}

	/** Handles B01 map (protocol 302): decrypt then resolve to first pending map request (FIFO). */
	private async handleB01Map(duid: string, data: any, payloadBuf: Buffer): Promise<void> {
		try {
			const workingBuf = this.getB01MapBuffer(duid, payloadBuf);
			this.resolvePendingMapIfFound(this.findPendingB01MapRequest(duid), workingBuf, data.protocol, duid);
		} catch (e: unknown) {
			this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `B01 Map processing failed: ${this.adapter.errorMessage(e)}`, "error");
		}
	}

	/** Decrypts B01 map payload. Callers (301 after envelope/0x7B skip, 302 chunk result) pass raw Layer1 payload only. */
	private getB01MapBuffer(duid: string, payloadBuf: Buffer): Buffer {
		const processed = this.decryptB01Payload(payloadBuf, duid);
		return (processed && processed.length > 0) ? processed : payloadBuf;
	}

	/**
	 * Classifies decrypted B01 map payload as live (upload_by_maptype) or history (upload_record_by_url) by protobuf prefix.
	 * Observed: live 301 first bytes 08 00 12 3c...; history 08 15 12 40... (field 1 value 0 vs 21).
	 */
	private classifyB01Map301Payload(decryptedBuf: Buffer): "get_map_v1" | "get_clean_record_map" | null {
		if (decryptedBuf.length < 3) return null;
		if (decryptedBuf[0] !== 0x08 || decryptedBuf[2] !== 0x12) return null;
		if (decryptedBuf[1] === 0x00) return "get_map_v1";   // live
		if (decryptedBuf[1] === 0x15) return "get_clean_record_map"; // history
		return null;
	}

	/** Removes the first queue entry that matches the given method; returns true if removed. */
	private shiftFirstMatchingB01MapMethod(duid: string, method: "get_map_v1" | "get_clean_record_map"): boolean {
		const queue = this.adapter.b01MapResponseQueue?.get(duid);
		if (!queue || queue.length === 0) return false;
		const idx = queue.indexOf(method);
		if (idx === -1) return false;
		queue.splice(idx, 1);
		if (queue.length === 0) this.adapter.b01MapResponseQueue!.delete(duid);
		else this.adapter.b01MapResponseQueue!.set(duid, queue);
		return true;
	}

	/**
	 * Resolves the 301 payload to the correct pending map request ID.
	 * History: taskBeginDate (from protobuf) only.
	 * Live: classify by payload prefix (08 00 12) + queue, then match by method.
	 */
	private resolveB01Map301ToPendingId(duid: string, payloadBuf: Buffer): number {
		const isHistoryProtobuf = payloadBuf.length >= 3 && payloadBuf[0] === 0x08 && payloadBuf[1] === 0x15 && payloadBuf[2] === 0x12;
		if (isHistoryProtobuf) {
			const taskBeginDate = this.extractTaskBeginDate(payloadBuf);
			if (taskBeginDate != null) {
				for (const [id, req] of this.adapter.pendingRequests) {
					if ((req as any).duid === duid && (req as any).method === "get_clean_record_map" && (req as any).startTime === taskBeginDate) {
						return typeof id === "number" ? id : -1;
					}
				}
			}
			return -1;
		}

		const classifiedMethod = this.classifyB01Map301Payload(payloadBuf);
		if (classifiedMethod) {
			this.shiftFirstMatchingB01MapMethod(duid, classifiedMethod);
			return this.findPendingB01MapRequestByMethod(duid, classifiedMethod);
		}
		return -1;
	}

	/** Returns the first pending map request for this duid (used for protocol 302 chunked map). */
	private findPendingB01MapRequest(duid: string): number {
		for (const [id, req] of this.adapter.pendingRequests) {
			if ((req.method === "get_map_v1" || req.method === "get_clean_record_map") && req.duid === duid) {
				return id;
			}
		}
		return -1;
	}

	private extractTaskBeginDate(buffer: Buffer): number | null {
		if (!buffer || buffer.length < 3) return null;
		try {
			if (!cachedB01RobotMapType) {
				const root = protobuf.parse(ROBOROCK_PROTO_STR).root;
				cachedB01RobotMapType = root.lookupType("SCMap.RobotMap");
			}
			const decoded = cachedB01RobotMapType.decode(buffer) as { mapExtInfo?: { taskBeginDate?: number } };
			const taskBeginDate = decoded?.mapExtInfo?.taskBeginDate;
			return taskBeginDate != null && typeof taskBeginDate === "number" ? (taskBeginDate >>> 0) : null;
		} catch {
			return null;
		}
	}

	/** Returns the id of a pending request for this duid with the given method (get_map_v1 = live, get_clean_record_map = history). */
	private findPendingB01MapRequestByMethod(duid: string, method: "get_map_v1" | "get_clean_record_map"): number {
		for (const [id, req] of this.adapter.pendingRequests) {
			if ((req as any).method === method && (req as any).duid === duid) return id;
		}
		return -1;
	}

	/** Called when 301 payload is JSON (starts with 0x7B). Logs cloud error message if present. */
	private logIf301IsCloudError(duid: string, payloadBuf: Buffer): void {
		if (payloadBuf.length < 20 || payloadBuf[0] !== 0x7B) return;
		try {
			const json = JSON.parse(payloadBuf.toString("utf8"));
			const err = json?.roborock?.error ?? json?.error ?? json?.message;
			if (err && typeof err === "string") {
				this.adapter.rLog("MQTT", duid, "Warn", "B01", undefined, `301 cloud error: ${err}`, "warn");
			}
		} catch {
			// not JSON
		}
	}

	/**
	 * Ensures that a valid endpoint string exists for this adapter instance.
	 */
	async ensureEndpoint(): Promise<string> {
		const endpointState = await this.adapter.getStateAsync("endpoint");

		if (!endpointState || !endpointState.val) {
			const rriot = this.adapter.http_api.get_rriot();
			const randomEndpoint = this.md5bin(rriot.k).subarray(8, 14).toString("base64");
			await this.adapter.setState("endpoint", { val: randomEndpoint, ack: true });
			return randomEndpoint;
		}

		return endpointState.val as string;
	}

	/**
	 * Publishes a message to the MQTT broker.
	 */
	async sendMessage(duid: string, roborockMessage: Buffer): Promise<void> {
		if (this.client && this.connected) {
			const rriot = this.adapter.http_api.get_rriot();
			const topic = `rr/m/i/${rriot.u}/${this.mqttUser}/${duid}`;
			this.client.publish(topic, roborockMessage, { qos: 1 });
		}
	}

	isConnected(): boolean {
		return this.connected;
	}

	async disconnectClient(): Promise<void> {
		if (this.client) {
			try {
				this.client.end();
				this.connected = false;
			} catch (error) {
				this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Failed to disconnect: ${error}`, "error");
			}
		}
	}

	md5hex(str: string): string {
		return crypto.createHash("md5").update(str).digest("hex");
	}

	md5bin(str: string): Buffer {
		return crypto.createHash("md5").update(str).digest();
	}

	public clearIntervals(): void {
		if (this.reconnectTimer) {
			this.adapter.clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}

		if (this.photoManager) {
			this.photoManager.clearIntervals();
		}

		this.client?.end();
		this.client = undefined;
	}

	cleanup(): void {
		if (this.client) {
			this.client.removeAllListeners();
			this.client.end();
			this.client = null;
		}
		this.connected = false;
		this.clearIntervals();
	}
}
