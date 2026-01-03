import type { Roborock } from "../main";
import * as crypto from "crypto";
import * as mqtt from "mqtt";
import { Parser } from "binary-parser";
import { MapDecryptor as B01MapDecryptor } from "./map/b01/MapDecryptor";
import * as zlib from "zlib";

// Parser for protocol 301 messages (often Map Data)
const protocol301Parser = new Parser()
	.endianess("little")
	.string("endpoint", {
		length: 15,
		stripNull: true,
	})
	.uint8("unknown1")
	.uint16("id")
	.buffer("unknown2", {
		length: 6,
	});



// --------------------
// Types
// --------------------

interface PhotoRequestData {
	chunks: Buffer[];
}

export class mqtt_api {
	adapter: Roborock;
	mqttUser: string;
	mqttPassword: string;
	client: any;
	connected: boolean;
	pendingPhotoRequests: Record<string, PhotoRequestData>;
	mqttOptions: any;

	constructor(adapter: Roborock) {
		this.adapter = adapter;

		this.mqttUser = "";
		this.mqttPassword = "";
		this.client = null;
		this.connected = false;
		this.mqttOptions = null;

		// Object to store pending photo requests chunks
		this.pendingPhotoRequests = {};
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
		this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `Connecting to MQTT Broker at ${rriot.r.m}...`, "info");

		const client = mqtt.connect(rriot.r.m, this.mqttOptions);
		this.client = client;

		try {
			// Set up listeners and subscriptions
			await this.subscribe_mqtt_events(client);
			await this.subscribe_mqtt_message(client);

			// Note: 'connect' event handler sets this.connected = true
		} catch (error: any) {
			this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `MQTT connection setup failed. Error: ${error.message}`, "error");
			this.connected = false;
			client.removeAllListeners();
			client.end();
		}
	}

	/**
	 * Subscribes to MQTT client events (connect, error, offline, etc.).
	 * @param client - The MQTT client instance.
	 */
	async subscribe_mqtt_events(client: any): Promise<void> {
		const rriot = this.adapter.http_api.get_rriot();

		client.on("connect", () => {
			this.connected = true;
			this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `MQTT connection established.`, "info");

			// Subscribe to the specific topic for this user
			const topic = `rr/m/o/${rriot.u}/${this.mqttUser}/#`;
			client.subscribe(topic, (err: Error | null) => {
				if (err) {
					this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Failed to subscribe to ${topic}! Error: ${err}`, "error");
				} else {
					this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `Subscribed to ${topic}`, "debug");
				}
			});
		});

		client.on("disconnect", () => {
			this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `MQTT disconnected.`, "info");
			this.connected = false;
		});

		client.on("error", (error: Error) => {
			this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `MQTT connection error: ${error.message}. Broker: ${rriot.r.m}`, "error");
			this.connected = false;
		});

		client.on("close", () => {
			this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `MQTT connection closed. Reconnecting in 60 seconds...`, "info");
			this.connected = false;
		});

		client.on("reconnect", () => {
			this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `MQTT attempting to reconnect...`, "info");
			// Subscription is usually handled automatically by MQTT client on reconnect if clean=false,
			// but if we need to re-subscribe manually:
			const topic = `rr/m/o/${rriot.u}/${this.mqttUser}/#`;
			client.subscribe(topic, (err: Error | null) => {
				if (err) this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Failed to re-subscribe during reconnect: ${err}`, "error");
			});
		});

		client.on("offline", () => {
			this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, "MQTT connection went offline.", "warn");
			this.connected = false;
		});
	}

	/**
	 * Sets up the listener for incoming MQTT messages.
	 * @param client - The MQTT client instance.
	 */
	async subscribe_mqtt_message(client: any): Promise<void> {
		const endpoint = await this.ensureEndpoint();

		client.on("message", async (topic: string, message: Buffer) => {
			try {
				// Topic structure: rr/m/o/<uID>/<userID>/<endpoint>/<duid>
				const parts = topic.split("/");
				const duid = parts.pop();
				const topicEndpoint = parts.pop(); // Segment before duid (e.g. i8szGYLK)

				// Log the RAW message - DISABLED

				if (!duid) {
					this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Could not extract DUID from topic: ${topic}`, "warn");
					return;
				}

				this.adapter.rLog("MQTT", duid, "<-", "RAW", undefined, `Received Packet. Topic: ${topicEndpoint}, Size: ${message.length}`, "debug");

				// Decode the Roborock binary message wrapper
				const dataArr = this.adapter.requestsHandler.messageParser.decodeMsg(message, duid);
				const allMessages = Array.isArray(dataArr) ? dataArr : dataArr ? [dataArr] : [];

				for (const data of allMessages) {
					await this.handleDecodedMessage(duid, data, endpoint, topicEndpoint);
				}
			} catch (error: any) {
				this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Error processing MQTT message on ${topic}: ${error.stack}`, "error");
			}
		});

		this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `MQTT message listener initialized.`, "info");
	}

	/**
	 * Helper to decrypt B01 payload if needed using device keys
	 */
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
	private async handleB01Response(response: any, duid: string, version: string = "B01"): Promise<void> {
		// Verify typical response fields (msgId or id) to map back to the original request
		const rawId = response.msgId || response.id;
		const reqId = Number(rawId);

		const logPayload = JSON.stringify(response);


		if (!isNaN(reqId) && reqId > 0) {
			if (this.adapter.pendingRequests.has(reqId)) {
				const pending = this.adapter.pendingRequests.get(reqId);
				this.adapter.rLog("MQTT", duid, "<-", version, reqId, `Response ${pending.method} | ${logPayload}`, "debug");

				// Handle Payload (Map/Photo data often in 'payload' field)
				if (response.payload) {
					try {
						// Payload is typically a Hex string in the JSON
						const payloadBuf = Buffer.from(response.payload, "hex");

						// Decrypt/Decode the B01 payload (handles nested encryption and compression)
						const finalPayload = this.decryptB01Payload(payloadBuf, duid);

						// Determine if success based on if we got data
						if (finalPayload && finalPayload.length > 0) {
							this.adapter.requestsHandler.resolvePendingRequest(reqId, finalPayload, "B01", duid);
							return;
						}
					} catch (e) {
						this.adapter.rLog("MQTT", duid, "Error", "B01", reqId, `Failed to process inner payload: ${e}`, "error");
					}
				}

				// Map the response 'data' (on success) or fallback to 'result'/'error'
				// response.code === 0 is valid success.
				const result = response.code === 0 ? response.data : (response.error || response.result);

				// Special handling for Map/Photo ACKs in B01
				const isMapOrPhoto = ["get_map_v1", "get_clean_record_map", "get_photo"].includes(pending.method);
				const isSuccessOk = result === "ok" || (Array.isArray(result) && result[0] === "ok");

				if (isMapOrPhoto && isSuccessOk) {
					this.adapter.rLog("MQTT", duid, "<-", "B01", reqId, `Map/Photo ACK for ${pending.method}. Waiting for data.`, "debug");
					// Do NOT resolve yet, let Protocol 300/301 handle it.
				} else {
					this.adapter.requestsHandler.resolvePendingRequest(reqId, result, `MQTT-B01`, duid, "MQTT");
				}
			} else {
				if (this.adapter.requestsHandler.isRequestRecentlyFinished(reqId)) {
					this.adapter.rLog("MQTT", duid, "<-", "B01", reqId, `Response finished recently.`, "debug");
				} else {
					// Suppress warnings for common B01 pushes that are not responses
					const method = response.method || "";
					if (!["prop.post", "service.post"].includes(method)) {
						this.adapter.rLog("MQTT", duid, "<-", "B01", reqId, `Response not found in pending requests | ${logPayload}`, "debug");
					}
				}
			}
		} else {
			this.adapter.rLog("MQTT", duid, "<-", "B01", undefined, `Message has no valid ID | ${logPayload}`, "warn");
		}
	}

	/**
	 * Processes a single decoded Roborock message frame.
	 */
	async handleDecodedMessage(duid: string, data: any, endpoint: string, topicEndpoint?: string): Promise<void> {
		// 1. Protocol A01 / B01 (Tuya-like / JSON payload)
		// Protocol 301 (Map) is also marked as B01 version but is binary/encrypted, so we must exclude it from JSON parsing.
		if ((data.version === "A01" || data.version === "B01") && data.protocol !== 300 && data.protocol !== 301) {
			try {
				const parserPayloadStr = data.payload.toString();
				const parsedPayload = JSON.parse(parserPayloadStr);

				// [MQTT] <- <duid> (PV: <version>) ...


				// For B01/A01 we might not know the exact ID/Action yet until we look inside.
				// Log the RAW payload first - DEBUG
				this.adapter.rLog("MQTT", duid, "<-", data.version, undefined, `Message | ${parserPayloadStr}`, "debug");

				// B01: Extract nested response from key "10001"
				if (data.version === "B01") {
					// Standard B01 Wrapper: { dps: { "10001": { ... } } }
					if (parsedPayload.dps?.["10001"]) {
						let inner = parsedPayload.dps["10001"];

						// B01 payloads contain nested JSON strings
						if (typeof inner === "string") {
							try {
								inner = JSON.parse(inner);
							} catch (e) {
								this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `Failed to parse B01 nested string payload: ${e}`, "warn");
							}
						}
						this.handleB01Response(inner, duid, data.version);
					} else {
						// Fallback: Check if the payload ITSELF is the response (Unwrapped B01)
						// This handles cases where the device sends the encrypted inner object directly.
						const isDirectPayload = (parsedPayload.id || parsedPayload.msgId) && (parsedPayload.result !== undefined || parsedPayload.data !== undefined || parsedPayload.code !== undefined || parsedPayload.payload !== undefined);

						if (isDirectPayload) {
							this.adapter.rLog("MQTT", duid, "Info", "B01", undefined, `Detected DIRECT (unwrapped) B01 payload from ${duid}.`, "debug");
							this.handleB01Response(parsedPayload, duid, data.version);
						} else {
							this.adapter.rLog("MQTT", duid, "<-", "B01", undefined, `B01 Message structure unknown. Keys: ${Object.keys(parsedPayload.dps || {}).join(", ")}`, "debug");
						}
					}
				} else {
					await this.adapter.processA01(duid, parsedPayload);
				}
			} catch (e) {
				this.adapter.rLog("MQTT", duid, "Error", data.version, undefined, `Failed to parse payload: ${e}`, "error");
			}
			// Only early return if it's NOT a specialized protocol that needs fallout to Section 2/3/4
			if (data.protocol === 102) {
				return;
			}
			if (![300, 301, 500].includes(data.protocol)) {
				return;
			}
		}

		// 2. Protocol 102 (General Command Response)
		if (data.protocol === 102) {
			try {
				const payloadStr = data.payload.toString();
				const parsed = JSON.parse(payloadStr);

				// Sometimes 'dps["102"]' is a nested stringified JSON, sometimes it's an object
				let dps102 = parsed.dps?.["102"];
				if (typeof dps102 === "string") {
					dps102 = JSON.parse(dps102);
				} else if (!dps102 && parsed.dps) {
					// Fallback if it's directly in dps (rare but possible)
					dps102 = parsed.dps;
				}

				if (dps102) {
					const pendingRequest = this.adapter.pendingRequests.get(dps102.id);

					if (pendingRequest) {
						if (pendingRequest.method === "get_map_v1" || pendingRequest.method === "get_clean_record_map" || pendingRequest.method === "get_photo") {
							// This is a map or photo request.
							const isSuccessOk = dps102.result === "ok" || (Array.isArray(dps102.result) && dps102.result[0] === "ok");

							if (isSuccessOk) {
								// Initial confirmation. Real data follows via Protocol 300/301.
								this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `Map/Photo ACK for ${pendingRequest.method}. Waiting for data.`, "debug");
							} else {
								// This is an ERROR for the request (e.g., "retry" or "locating")
								if (Array.isArray(dps102.result) && dps102.result[0] === "retry") {
									this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `${pendingRequest.method} returned 'retry'.`, "debug");
								} else {
									this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `${pendingRequest.method} failed | Payload: ${JSON.stringify(dps102.result)}`, "warn");
								}
								this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, data.protocol, duid, "MQTT");
							}
						} else {
							// This is a normal command (not a map or photo), resolve it.
							// Log the result payload for debugging
							this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `Response ${pendingRequest.method} | ${JSON.stringify(dps102.result)}`, "debug");
							this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, data.protocol, duid, "MQTT");
						}
					} else {
						if (this.adapter.requestsHandler.isRequestRecentlyFinished(dps102.id)) {
							this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `Response finished recently.`, "debug");
						} else {
							const method = dps102.method || "";
							// Suppress warnings for common V1 pushes
							if (method !== "prop.post") {
								this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `Response not found in pending requests | Payload: ${JSON.stringify(dps102)}`, "debug");
							}
						}
					}
				}
			} catch (e) {
				this.adapter.rLog("MQTT", duid, "Error", "102", undefined, `Failed to parse payload: ${e}`, "error");
			}
			return;
		}

		// 3. Protocol 300 & 301 (Binary Data: Photos, Maps)
		if (data.protocol === 300 || data.protocol === 301) {
			await this.handlePhotoOrMapData(duid, data, endpoint, topicEndpoint);
			return;
		}

		// 4. Protocol 500 (Device Status / OTA)
		if (data.protocol === 500) {
			try {
				const dataString = data.payload.toString("utf8");
				const parsedData = JSON.parse(dataString);

				if (parsedData.mqttOtaData) {
					const status = parsedData.mqttOtaData.mqttOtaStatus?.status;
					const progress = parsedData.mqttOtaData.mqttOtaProgress?.progress;

					if (status) this.adapter.rLog("MQTT", duid, "Info", "500", undefined, `Firmware Update Status: ${status}`, "info");
					if (progress !== undefined) this.adapter.rLog("MQTT", duid, "Info", "500", undefined, `Firmware Update Progress: ${progress}%`, "info");
				} else if (parsedData.online === false) {
					this.adapter.rLog("MQTT", duid, "Info", "500", undefined, `Device OFFLINE.`, "info");
				} else if (parsedData.online === true) {
					// Device reported online, nothing specific to do
				} else {
					this.adapter.rLog("MQTT", duid, "<-", "500", undefined, `Unrecognized message | ${dataString}`, "warn");
				}
			} catch (error: any) {
				this.adapter.rLog("MQTT", duid, "Error", "500", undefined, `Parse Error | ${error.message}`, "warn");
			}
			return;
		}

		// 5. Unknown Protocol
		this.adapter.rLog("MQTT", duid, "<-", String(data.protocol), undefined, "Unknown Protocol", "warn");
	}

	/**
	 * Handles binary data messages (Protocol 300/301) for Photos or Maps.
	 */
	async handlePhotoOrMapData(duid: string, data: any, endpoint: string, topicEndpoint?: string): Promise<void> {
		const payloadBuf = data.payload as Buffer;
		const devices = this.adapter.http_api.getDevices();
		const device = devices.find((d: any) => d.duid === duid);
		let pv = device?.pv; // "1.0", "B01", etc.
		if (!pv) pv = data.version;

		this.adapter.rLog("MQTT", duid, "Info", String(pv), undefined, `Map Payload Info. TopicEndpoint: ${topicEndpoint}, Protocol: ${data.protocol}, Len: ${payloadBuf.length}`, "debug");

		// 1. Photo Data (Protocol 300 with "ROBOROCK" header)
		const isRoborockHeader = payloadBuf.length >= 8 && payloadBuf.subarray(0, 8).toString() === "ROBOROCK";
		if (data.protocol === 300 && isRoborockHeader) {
			this.adapter.rLog("MQTT", duid, "<-", "300", undefined, "Received Photo. Forwarding to handler...", "debug");
			this.adapter.emit("photoData", duid, payloadBuf);
			return;
		}

		// 2. Strict Routing
		if (pv === "1.0") {
			this.adapter.rLog("MQTT", duid, "Info", "301", undefined, `Strict Routing: Forced V1 (pv=1.0)`, "debug");
			await this.handleV1Map(duid, data, payloadBuf, endpoint);
			return;
		}

		if (pv === "B01") {
			this.adapter.rLog("MQTT", duid, "Info", "301", undefined, `Strict Routing: Forced B01 (pv=B01)`, "debug");
			await this.handleB01Map(duid, data, payloadBuf);
			return;
		}

		// 3. Fallback / Sniffing Logic (for unknown PV)
		await this.fallbackMapHandling(duid, data, payloadBuf, endpoint);
	}

	/**
	 * Handles V1 Map Data (Standard Encryption with 24-byte header)
	 */
	private async handleV1Map(duid: string, data: any, payloadBuf: Buffer, endpoint: string): Promise<void> {
		try {
			// Protocol 301 Header (24 bytes)
			if (payloadBuf.length >= 24) {
				const parsedHeader = protocol301Parser.parse(payloadBuf.subarray(0, 24));
				if (endpoint && endpoint.length > 0 && parsedHeader.endpoint && endpoint.startsWith(parsedHeader.endpoint)) {
					const iv = Buffer.alloc(16, 0);
					const decipher = crypto.createDecipheriv("aes-128-cbc", this.adapter.nonce, iv);
					let decrypted = decipher.update(payloadBuf.subarray(24) as Uint8Array);
					decrypted = Buffer.concat([decrypted as Uint8Array, decipher.final()]);

					// V1 data is typically GZIP compressed
					let unzipped = decrypted;
					try {
						unzipped = zlib.gunzipSync(decrypted as Uint8Array);
					} catch {
						// Maybe it wasn't gzipped?
					}

					// Resolve Pending Request (Priority)
					let foundId = -1;
					for (const [id, req] of this.adapter.pendingRequests) {
						// Critical Fix: Only match request if the DUID matches the incoming message source!
						if ((req.method === "get_map_v1" || req.method === "get_clean_record_map") && req.duid === duid) {
							foundId = id;
							break;
						}
					}

					if (foundId !== -1) {
						// Use the foundId (our internal task ID) instead of parsedHeader.id (which might be a sequence number)
						this.adapter.requestsHandler.resolvePendingRequest(foundId, unzipped, data.protocol, duid, "MQTT", "V1");
					} else {
						// Process Unsolicited V1
						this.adapter.rLog("MQTT", duid, "<-", "301", undefined, `Received Unsolicited V1 Map. Processing...`, "info");
						const robotModel = this.adapter.http_api.getRobotModel(duid) || "roborock.vacuum.a27";
						this.adapter.mapManager.processMap(unzipped, "V1", robotModel, duid, null, duid, "MQTT");
					}
				} else {
					this.adapter.rLog("MQTT", duid, "Warn", "301", undefined, `V1 Header Endpoint mismatch or invalid.`, "warn");
				}
			} else {
				this.adapter.rLog("MQTT", duid, "Warn", "301", undefined, `V1 Data too short (Len: ${payloadBuf.length})`, "warn");
			}
		} catch (e: any) {
			this.adapter.rLog("MQTT", duid, "Error", "301", undefined, `V1 Map processing failed: ${e.message}`, "error");
		}
	}

	/**
	 * Handles B01 Map Data (JSON Wrapped or Raw Encrypted with MapKey)
	 */
	private async handleB01Map(duid: string, data: any, payloadBuf: Buffer): Promise<void> {
		try {
			this.adapter.rLog("MQTT", duid, "Info", "B01", 301, `Starting B01 Map flow. Input Len: ${payloadBuf.length}`, "debug");
			let workingBuf = payloadBuf;

			// A. Try to parse as JSON first (common in B01 and newer A01)
			if (payloadBuf.length > 0 && payloadBuf[0] === 0x7B) { // '{'
				try {
					const json = JSON.parse(payloadBuf.toString("utf8"));
					if (json.payload) {
						this.adapter.rLog("MQTT", duid, "Info", "B01", 301, `Detected JSON-Wrapped B01 Map.`, "debug");
						const innerBuf = Buffer.from(json.payload, "hex");
						const finalPayload = this.decryptB01Payload(innerBuf, duid);

						if (finalPayload && finalPayload.length > 0) {
							workingBuf = finalPayload;
						}
					}
				} catch {}
			} else {
				// B. Decompress/Decrypt Logic for RAW B01
				this.adapter.rLog("MQTT", duid, "Info", "B01", 301, `Detected RAW B01 Map.`, "debug");
				const processed = this.decryptB01Payload(workingBuf, duid);
				if (processed && processed.length > 0) {
					workingBuf = processed;
				}
			}

			// Resolve Pending Request (Priority)
			let foundId = -1;
			for (const [id, req] of this.adapter.pendingRequests) {
				// Critical Fix: Only match request if the DUID matches the incoming message source!
				if ((req.method === "get_map_v1" || req.method === "get_clean_record_map" || req.method === "service.upload_by_maptype" || req.method === "service.upload_record_by_url") && req.duid === duid) {
					foundId = id;
					break;
				}
			}

			if (foundId !== -1) {
				this.adapter.requestsHandler.resolvePendingRequest(foundId, workingBuf, data.protocol, duid, "MQTT", "B01");
			} else {
				// Process Unsolicited B01
				this.adapter.rLog("MQTT", duid, "<-", "301", undefined, `Received Unsolicited B01 Map. Processing...`, "info");
				const robotModel = this.adapter.http_api.getRobotModel(duid) || "roborock.vacuum.a27";

				this.adapter.mapManager.processMap(workingBuf, "B01", robotModel, duid, null, duid, "MQTT")
					.then(async (res: any) => {
						if (res) {
							await this.adapter.ensureFolder(`Devices.${duid}.map`);
							if (res.mapBase64) {
								await this.adapter.ensureState(`Devices.${duid}.map.mapBase64`, { name: "Map Image", type: "string", role: "text.png" });
								await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64`, { val: res.mapBase64, ack: true });
							}
							if (res.mapBase64Clean) {
								await this.adapter.ensureState(`Devices.${duid}.map.mapBase64Clean`, { name: "Map Image (Clean)", type: "string", role: "text.png" });
								await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64Clean`, { val: res.mapBase64Clean, ack: true });
							}
							if (res.mapData) {
								await this.adapter.ensureState(`Devices.${duid}.map.mapData`, { name: "Map Data", type: "string", role: "json" });
								await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapData`, { val: JSON.stringify(res.mapData), ack: true });
							}
						}
					})
					.catch((err: any) => {
						this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `Failed to process unsolicited B01 map: ${err}`, "error");
					});
			}
		} catch (e: any) {
			this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `B01 Map processing failed: ${e.message}`, "error");
		}
	}

	/**
	 * Fallback logic if PV is unknown (Original mixed sniffing logic)
	 */
	private async fallbackMapHandling(duid: string, data: any, payloadBuf: Buffer, endpoint: string): Promise<void> {
		try {
			let workingBuf = payloadBuf;

			// A. Try to parse as JSON first
			if (payloadBuf.length > 0 && payloadBuf[0] === 0x7B) {
				try {
					const json = JSON.parse(payloadBuf.toString("utf8"));
					if (json.payload) {
						const innerBuf = Buffer.from(json.payload, "hex");
						const finalPayload = this.decryptB01Payload(innerBuf, duid);

						if (finalPayload && finalPayload.length > 64) {
							const isB01Inner = B01MapDecryptor.isSignatureMatch(finalPayload) && !(finalPayload[0] === 0x72 && finalPayload[1] === 0x72);
							const mapVersionInner = isB01Inner ? "B01" : "V1";

							// Resolve Pending...
							let foundId = -1;
							for (const [id, req] of this.adapter.pendingRequests) {
								// Critical Fix: Only match request if the DUID matches
								if ((req.method === "get_map_v1" || req.method === "get_clean_record_map") && req.duid === duid) {
									foundId = id;
									break;
								}
							}
							if (foundId !== -1) {
								this.adapter.requestsHandler.resolvePendingRequest(foundId, finalPayload, data.protocol, duid, "MQTT", mapVersionInner);
								return;
							} else {
								workingBuf = finalPayload;
							}
						}
					}
				} catch {}
			}

			// B. Decompress/Decrypt
			const processed = this.decryptB01Payload(workingBuf, duid);
			if (processed && processed.length > 0) {
				workingBuf = processed;
			}

			if (workingBuf.length < 64 && !B01MapDecryptor.isSignatureMatch(workingBuf)) {
				this.adapter.rLog("MQTT", duid, "Warn", "Map", undefined, `Ignoring small binary payload (Len: ${workingBuf.length}).`, "debug");
				return;
			}

			// C. Identify Version based on CONTENT SIGNATURE
			let isB01 = false;
			if (workingBuf.length > 2) {
				if (workingBuf[0] === 0x72 && workingBuf[1] === 0x72) {
					isB01 = false;
				} else if (B01MapDecryptor.isSignatureMatch(workingBuf)) {
					isB01 = true;
				}
			}
			const mapVersion = isB01 ? "B01" : "V1";

			// D. Match to Pending Request
			let foundId = -1;
			for (const [id, req] of this.adapter.pendingRequests) {
				// Critical Fix: Only match request if the DUID matches
				if ((req.method === "get_map_v1" || req.method === "get_clean_record_map") && req.duid === duid) {
					foundId = id;
					break;
				}
			}

			if (foundId !== -1) {
				this.adapter.requestsHandler.resolvePendingRequest(foundId, workingBuf, data.protocol, duid, "MQTT", mapVersion);
				return;
			} else if (isB01) {
				// E. Unsolicited Map (Only safe to assume for B01 here)
				// Re-use logic from handleB01Map essentially, but kept inline for now
				const robotModel = this.adapter.http_api.getRobotModel(duid) || "roborock.vacuum.a27";
				this.adapter.mapManager.processMap(workingBuf, "B01", robotModel, duid, null, duid, "MQTT")
					// ... (handling omitted for brevity, similar to handleB01Map)
					.catch((err: any) => this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `Unsolicited Fallback failed: ${err}`, "error"));
				return;
			}

			// F. Legacy Fallback (Protocol 301 Header)
			if (payloadBuf.length >= 24) {
				const parsedHeader = protocol301Parser.parse(payloadBuf.subarray(0, 24));
				if (endpoint && endpoint.length > 0 && parsedHeader.endpoint && endpoint.startsWith(parsedHeader.endpoint)) {
					// ... Same V1 Decryption as handleV1Map ...
					const iv = Buffer.alloc(16, 0);
					const decipher = crypto.createDecipheriv("aes-128-cbc", this.adapter.nonce, iv);
					let decrypted = decipher.update(payloadBuf.subarray(24) as Uint8Array);
					decrypted = Buffer.concat([decrypted as Uint8Array, decipher.final()]);
					const unzipped = zlib.gunzipSync(decrypted as Uint8Array);
					this.adapter.requestsHandler.resolvePendingRequest(parsedHeader.id, unzipped, data.protocol, duid, "MQTT", "V1");
				}
			}
		} catch (e: any) {
			this.adapter.rLog("MQTT", duid, "Debug", "Map", undefined, `Map/Photo Fallback failed: ${e.message}`, "debug");
		}
	}

	/**
	 * Ensures that a valid endpoint string exists for this adapter instance.
	 * Generates one if missing.
	 */
	async ensureEndpoint(): Promise<string> {
		const endpointState = await this.adapter.getStateAsync("endpoint");

		if (!endpointState || !endpointState.val) {
			const rriot = this.adapter.http_api.get_rriot();
			// Generate a random endpoint from the key
			const randomEndpoint = this.md5bin(rriot.k).subarray(8, 14).toString("base64");

			await this.adapter.setState("endpoint", { val: randomEndpoint, ack: true });
			this.adapter.rLog("MQTT", null, "Info", "Cloud", undefined, `Generated and saved new endpoint: ${randomEndpoint}`, "info");
			return randomEndpoint;
		}

		return endpointState.val as string;
	}

	/**
	 * Publishes a message to the MQTT broker.
	 * @param duid The Device Unique ID
	 * @param roborockMessage The encrypted binary message
	 */
	async sendMessage(duid: string, roborockMessage: Buffer): Promise<void> {
		if (this.client && this.connected) {
			const rriot = this.adapter.http_api.get_rriot();
			const topic = `rr/m/i/${rriot.u}/${this.mqttUser}/${duid}`;
			this.client.publish(topic, roborockMessage, { qos: 1 });
		} else {
			this.adapter.rLog("MQTT", duid, "->", "MQTT", undefined, `Cannot send message, client not connected.`, "warn");
		}
	}

	isConnected(): boolean {
		return this.connected;
	}

	/**
	 * Gracefully disconnects the MQTT client.
	 */
	async disconnectClient(): Promise<void> {
		if (this.client) {
			try {
				this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, "Disconnecting client...", "info");
				await this.client.endAsync();
				this.connected = false;
			} catch (error) {
				this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Failed to disconnect: ${error}`, "error");
			}
		}
	}

	/**
	 * Helper: Calculate MD5 hex string.
	 */
	md5hex(str: string): string {
		return crypto.createHash("md5").update(str).digest("hex");
	}

	/**
	 * Helper: Calculate MD5 binary buffer.
	 */
	md5bin(str: string): Buffer {
		return crypto.createHash("md5").update(str).digest();
	}

	/**
	 * Clears internal state (e.g. pending partial downloads).
	 */
	clearIntervals(): void {
		this.pendingPhotoRequests = {};
	}

	/**
	 * Full cleanup of the API instance.
	 */
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
