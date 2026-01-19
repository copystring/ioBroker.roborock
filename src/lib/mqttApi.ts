import { Parser } from "binary-parser";
import * as crypto from "crypto";
import * as mqtt from "mqtt";
import * as zlib from "zlib";
import type { Roborock } from "../main";
import { MapDecryptor as B01MapDecryptor } from "./map/b01/MapDecryptor";

import { PhotoManager } from "./PhotoManager";

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

export class mqtt_api {
	adapter: Roborock;
	mqttUser: string;
	mqttPassword: string;
	client: any;
	connected: boolean;
	public photoManager: PhotoManager;
	mqttOptions: any;

	constructor(adapter: Roborock) {
		this.adapter = adapter;

		this.mqttUser = "";
		this.mqttPassword = "";
		this.client = null;
		this.connected = false;
		this.mqttOptions = null;

		this.photoManager = new PhotoManager(this.adapter);
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
				/**
				 * Listens for incoming MQTT messages and dispatches them to the appropriate handlers.
				 * @see test/unit/transport_specification.test.ts for the MQTT topic structure.
				 */
				// Topic structure: rr/m/o/<uID>/<userID>/<endpoint>/<duid>
				const parts = topic.split("/");
				const duid = parts.pop();
				const topicEndpoint = parts.pop(); // Segment before duid (e.g. i8szGYLK)

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
	private async handleB01Response(response: any, duid: string): Promise<void> {
		const reqId = Number(response.msgId || response.id);

		if (isNaN(reqId) || reqId <= 0) {
			this.adapter.rLog("MQTT", duid, "<-", "B01", undefined, `Message has no valid ID`, "warn");
			return;
		}

		if (!this.adapter.pendingRequests.has(reqId)) {
			this.handleUnknownB01Response(duid, reqId);
			return;
		}

		const pending = this.adapter.pendingRequests.get(reqId);

		// Handle inner payload (Map/Photo)
		if (response.payload && await this.processB01InnerPayload(duid, reqId, response.payload)) {
			return;
		}

		// Map the response 'data' (on success) or fallback to 'result'/'error'
		const result = response.code === 0 ? response.data : (response.error || response.result);

		// Special handling for Map/Photo ACKs in B01
		const isMapOrPhoto = ["get_map_v1", "get_clean_record_map", "get_photo"].includes(pending.method);
		const isSuccessOk = result === "ok" || (Array.isArray(result) && result[0] === "ok");

		if (isMapOrPhoto && isSuccessOk) {
			this.adapter.rLog("MQTT", duid, "<-", "B01", reqId, `Map/Photo ACK for ${pending.method}. Waiting for data.`, "debug");
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
	private handleUnknownB01Response(duid: string, reqId: number): void {
		if (this.adapter.requestsHandler.isRequestRecentlyFinished(reqId)) {
			this.adapter.rLog("MQTT", duid, "<-", "B01", reqId, `Response finished recently.`, "debug");
			return;
		}

		// Strictly ignore unsolicited messages
	}

	/**
	 * Processes a single decoded Roborock message frame.
	 */
	async handleDecodedMessage(duid: string, data: any, endpoint: string, topicEndpoint?: string): Promise<void> {
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

		// 3. Protocol 300 & 301 (Binary Data: Photos, Maps)
		if (data.protocol === 300 || data.protocol === 301) {
			await this.handlePhotoOrMapData(duid, data, endpoint, topicEndpoint);
			return;
		}

		// 4. Protocol 500 (Device Status / OTA)
		if (data.protocol === 500) {
			await this.handleProtocol500(duid, data);
			return;
		}

		// 5. Unknown Protocol
		this.adapter.rLog("MQTT", duid, "<-", String(data.protocol), undefined, "Unknown Protocol", "warn");
	}

	/**
	 * Handles Protocol A01/B01 messages (Tuya-like JSON wrapper).
	 */
	private async handleProtocolA01B01(duid: string, data: any): Promise<void> {
		try {
			const payloadStr = data.payload.toString();
			const parsedPayload = JSON.parse(payloadStr);

			this.adapter.rLog("MQTT", duid, "<-", data.version, undefined, `Message | ${payloadStr}`, "debug");

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
			return;
		}

		// Fallback: Check if the payload ITSELF is the response (Unwrapped B01)
		const hasId = !!(parsedPayload.id || parsedPayload.msgId);
		const hasResult = parsedPayload.result !== undefined || parsedPayload.data !== undefined || parsedPayload.code !== undefined || parsedPayload.payload !== undefined;

		if (hasId && hasResult) {
			await this.handleB01Response(parsedPayload, duid);
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
				this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `Map/Photo ACK for ${pending.method}. Waiting for data.`, "debug");
			} else {
				this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, protocol, duid, "MQTT");
			}
		} else {
			this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `Response ${pending.method} | ${JSON.stringify(dps102.result)}`, "debug");
			this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, protocol, duid, "MQTT");
		}
	}

	/**
	 * Handles Protocol 500 (Device Status / OTA).
	 */
	private async handleProtocol500(duid: string, data: any): Promise<void> {
		try {
			const parsedData = JSON.parse(data.payload.toString("utf8"));

			if (parsedData.mqttOtaData) {
				const status = parsedData.mqttOtaData.mqttOtaStatus?.status;
				const progress = parsedData.mqttOtaData.mqttOtaProgress?.progress;

				if (status) this.adapter.rLog("MQTT", duid, "Info", "500", undefined, `Firmware Update Status: ${status}`, "info");
				if (progress !== undefined) this.adapter.rLog("MQTT", duid, "Info", "500", undefined, `Firmware Update Progress: ${progress}%`, "info");
			} else if (parsedData.online === false) {
				this.adapter.rLog("MQTT", duid, "Info", "500", undefined, `Device OFFLINE.`, "info");
			}
		} catch (error: any) {
			this.adapter.rLog("MQTT", duid, "Error", "500", undefined, `Parse Error | ${error.message}`, "warn");
		}
	}

	/**
	 * Handles binary data messages (Protocol 300/301) for Photos or Maps.
	 */
	async handlePhotoOrMapData(duid: string, data: any, endpoint: string, topicEndpoint?: string): Promise<void> {
		const payloadBuf = data.payload as Buffer;
		const isRoborockHeader = payloadBuf.length > 8 && payloadBuf.subarray(0, 8).equals(Buffer.from("ROBOROCK"));

		if (data.protocol === 300) {
			const isPhotoPacket = await this.photoManager.handlePhotoProtocol300(duid, payloadBuf, isRoborockHeader);
			if (isPhotoPacket) return;
		}

		if (data.protocol === 301) {
			const isPhotoPacket = await this.photoManager.handlePhotoProtocol301(duid, payloadBuf, isRoborockHeader);
			if (isPhotoPacket) return;

			// Fallthrough to Map Logic
			const devices = this.adapter.http_api.getDevices();
			const device = devices.find((d: any) => d.duid === duid);
			const pv = device?.pv || data.version;

			if (pv === "B01") {
				await this.handleB01Map(duid, data, payloadBuf);
			} else {
				await this.handleV1Map(duid, data, payloadBuf, endpoint, topicEndpoint);
			}
		}
	}

	/**
	 * Handles V1 Map Data (Standard Encryption with 24-byte header)
	 */
	private async handleV1Map(duid: string, data: any, payloadBuf: Buffer, endpoint: string, topicEndpoint?: string): Promise<void> {
		if (payloadBuf.length < 24) {
			this.adapter.rLog("MQTT", duid, "Warn", "301", undefined, `V1 Data too short (${payloadBuf.length}b)`, "warn");
			return;
		}

		try {
			const parsedHeader = protocol301Parser.parse(payloadBuf.subarray(0, 24));
			const matchEndpoint = endpoint && parsedHeader.endpoint && endpoint.startsWith(parsedHeader.endpoint);
			const matchTopic = topicEndpoint && parsedHeader.endpoint && topicEndpoint.startsWith(parsedHeader.endpoint);

			if (!matchEndpoint && !matchTopic) {
				this.adapter.rLog("MQTT", duid, "Warn", "301", undefined, `V1 Header Endpoint mismatch or invalid. Got: '${parsedHeader.endpoint}'`, "warn");
				return;
			}

			const unzipped = this.decryptAndUnzipV1Map(payloadBuf);
			const foundId = this.findPendingMapRequest(duid);

			if (foundId !== -1) {
				this.adapter.requestsHandler.resolvePendingRequest(foundId, unzipped, data.protocol, duid, "MQTT", "V1");
			}
		} catch (e: any) {
			this.adapter.rLog("MQTT", duid, "Error", "301", undefined, `V1 Map processing failed: ${e.message}`, "error");
		}
	}

	private decryptAndUnzipV1Map(payloadBuf: Buffer): Buffer {
		const iv = Buffer.alloc(16, 0);
		const decipher = crypto.createDecipheriv("aes-128-cbc", this.adapter.nonce, iv);
		let decrypted = decipher.update(payloadBuf.subarray(24) as Uint8Array);
		decrypted = Buffer.concat([decrypted as Uint8Array, decipher.final()]);

		try {
			return zlib.gunzipSync(decrypted as Uint8Array);
		} catch {
			return decrypted;
		}
	}

	/**
	 * Handles B01 Map Data (JSON Wrapped or Raw Encrypted with MapKey)
	 */
	private async handleB01Map(duid: string, data: any, payloadBuf: Buffer): Promise<void> {
		try {
			const workingBuf = await this.getB01MapBuffer(duid, payloadBuf);
			const foundId = this.findPendingB01MapRequest(duid);

			if (foundId !== -1) {
				this.adapter.requestsHandler.resolvePendingRequest(foundId, workingBuf, data.protocol, duid, "MQTT", "B01");
			} else {
				await this.processUnsolicitedB01Map(duid, workingBuf);
			}
		} catch (e: any) {
			this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `B01 Map processing failed: ${e.message}`, "error");
		}
	}

	private async getB01MapBuffer(duid: string, payloadBuf: Buffer): Promise<Buffer> {
		if (payloadBuf.length <= 0 || payloadBuf[0] !== 0x7B) { // NOT '{'
			const processed = this.decryptB01Payload(payloadBuf, duid);
			return (processed && processed.length > 0) ? processed : payloadBuf;
		}

		try {
			const json = JSON.parse(payloadBuf.toString("utf8"));
			if (!json.payload) return payloadBuf;

			const innerBuf = Buffer.from(json.payload, "hex");
			const finalPayload = this.decryptB01Payload(innerBuf, duid);
			return (finalPayload && finalPayload.length > 0) ? finalPayload : payloadBuf;
		} catch {
			const processed = this.decryptB01Payload(payloadBuf, duid);
			return (processed && processed.length > 0) ? processed : payloadBuf;
		}
	}

	private findPendingMapRequest(duid: string): number {
		for (const [id, req] of this.adapter.pendingRequests) {
			if ((req.method === "get_map_v1" || req.method === "get_clean_record_map") && req.duid === duid) {
				return id;
			}
		}
		return -1;
	}

	private findPendingB01MapRequest(duid: string): number {
		for (const [id, req] of this.adapter.pendingRequests) {
			const methods = ["get_map_v1", "get_clean_record_map", "service.upload_by_maptype", "service.upload_record_by_url"];
			if (methods.includes(req.method) && req.duid === duid) {
				return id;
			}
		}
		return -1;
	}



	private async processUnsolicitedB01Map(duid: string, workingBuf: Buffer): Promise<void> {
		try {
			const robotModel = this.adapter.http_api.getRobotModel(duid) || "roborock.vacuum.a27";
			const res = await this.adapter.mapManager.processMap(workingBuf, "B01", robotModel, duid, null, duid, "MQTT");
			if (!res) return;

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
		} catch (err: any) {
			this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `Failed to process unsolicited B01 map: ${err}`, "error");
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

	clearIntervals(): void {
		this.photoManager.clearIntervals();
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
