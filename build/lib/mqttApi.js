"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqtt_api = void 0;
const binary_parser_1 = require("binary-parser");
const crypto = __importStar(require("crypto"));
const mqtt = __importStar(require("mqtt"));
const zlib = __importStar(require("zlib"));
const MapDecryptor_1 = require("./map/b01/MapDecryptor");
const PhotoManager_1 = require("./PhotoManager");
// Parser for protocol 301 messages (often Map Data)
const protocol301Parser = new binary_parser_1.Parser()
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
class mqtt_api {
    adapter;
    mqttUser;
    mqttPassword;
    client;
    connected;
    photoManager;
    mqttOptions;
    constructor(adapter) {
        this.adapter = adapter;
        this.mqttUser = "";
        this.mqttPassword = "";
        this.client = null;
        this.connected = false;
        this.mqttOptions = null;
        this.photoManager = new PhotoManager_1.PhotoManager(this.adapter);
    }
    /**
     * Initializes the MQTT API by setting up credentials and connecting.
     */
    async init() {
        this.setup_mqtt_user();
        await this.connect_mqtt();
    }
    /**
     * Derives MQTT credentials from the RRIOT data.
     */
    setup_mqtt_user() {
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
    async connect_mqtt() {
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
        }
        catch (error) {
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
    async subscribe_mqtt_events(client) {
        const rriot = this.adapter.http_api.get_rriot();
        client.on("connect", () => {
            this.connected = true;
            this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `MQTT connection established.`, "info");
            // Subscribe to the specific topic for this user
            const topic = `rr/m/o/${rriot.u}/${this.mqttUser}/#`;
            client.subscribe(topic, (err) => {
                if (err) {
                    this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Failed to subscribe to ${topic}! Error: ${err}`, "error");
                }
                else {
                    this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `Subscribed to ${topic}`, "debug");
                }
            });
        });
        client.on("disconnect", () => {
            this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `MQTT disconnected.`, "info");
            this.connected = false;
        });
        client.on("error", (error) => {
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
            client.subscribe(topic, (err) => {
                if (err)
                    this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Failed to re-subscribe during reconnect: ${err}`, "error");
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
    async subscribe_mqtt_message(client) {
        const endpoint = await this.ensureEndpoint();
        client.on("message", async (topic, message) => {
            try {
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
            }
            catch (error) {
                this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Error processing MQTT message on ${topic}: ${error.stack}`, "error");
            }
        });
        this.adapter.rLog("MQTT", null, "Info", "MQTT", undefined, `MQTT message listener initialized.`, "info");
    }
    /**
     * Helper to decrypt B01 payload if needed using device keys
     */
    decryptB01Payload(payload, duid) {
        const devices = this.adapter.http_api.getDevices();
        const device = devices.find((d) => d.duid === duid);
        const serial = device?.sn || "";
        const model = this.adapter.http_api.getRobotModel(duid) || "roborock.vacuum.a27";
        const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
        const result = MapDecryptor_1.MapDecryptor.decrypt(payload, serial, model, duid, this.adapter, localKey);
        return result || payload;
    }
    /**
     * Helper to process the inner JSON of a B01 response.
     */
    async handleB01Response(response, duid, _version = "B01") {
        // Verify typical response fields (msgId or id) to map back to the original request
        const reqId = Number(response.msgId || response.id);
        if (!isNaN(reqId) && reqId > 0) {
            if (this.adapter.pendingRequests.has(reqId)) {
                const pending = this.adapter.pendingRequests.get(reqId);
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
                    }
                    catch (e) {
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
                }
                else {
                    this.adapter.requestsHandler.resolvePendingRequest(reqId, result, `MQTT-B01`, duid, "MQTT");
                }
            }
            else {
                if (this.adapter.requestsHandler.isRequestRecentlyFinished(reqId)) {
                    this.adapter.rLog("MQTT", duid, "<-", "B01", reqId, `Response finished recently.`, "debug");
                }
                else {
                    // Suppress warnings for common B01 pushes that are not responses
                    const method = response.method || "";
                    if (!["prop.post", "service.post"].includes(method)) {
                        this.adapter.rLog("MQTT", duid, "<-", "B01", reqId, `Response not found in pending requests`, "debug");
                    }
                }
            }
        }
        else {
            this.adapter.rLog("MQTT", duid, "<-", "B01", undefined, `Message has no valid ID`, "warn");
        }
    }
    /**
     * Processes a single decoded Roborock message frame.
     */
    async handleDecodedMessage(duid, data, endpoint, topicEndpoint) {
        // 1. Protocol A01 / B01 (Tuya-like / JSON payload)
        // Protocol 301 (Map) is also marked as B01 version but is binary/encrypted, so we must exclude it from JSON parsing.
        if ((data.version === "A01" || data.version === "B01") && data.protocol !== 300 && data.protocol !== 301) {
            try {
                const parserPayloadStr = data.payload.toString();
                const parsedPayload = JSON.parse(parserPayloadStr);
                // For B01/A01 we might not know the exact ID/Action yet until we look inside.
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
                            }
                            catch (e) {
                                this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `Failed to parse B01 nested string payload: ${e}`, "warn");
                            }
                        }
                        this.handleB01Response(inner, duid, data.version);
                    }
                    else {
                        // Fallback: Check if the payload ITSELF is the response (Unwrapped B01)
                        const isDirectPayload = (parsedPayload.id || parsedPayload.msgId) && (parsedPayload.result !== undefined || parsedPayload.data !== undefined || parsedPayload.code !== undefined || parsedPayload.payload !== undefined);
                        if (isDirectPayload) {
                            this.handleB01Response(parsedPayload, duid, data.version);
                        }
                    }
                }
                else {
                    await this.adapter.processA01(duid, parsedPayload);
                }
            }
            catch (e) {
                this.adapter.rLog("MQTT", duid, "Error", data.version, undefined, `Failed to parse payload: ${e}`, "error");
            }
            // Only early return if it's NOT a specialized protocol that needs fallout to Section 2/3/4
            if (![102, 300, 301, 500].includes(data.protocol)) {
                return;
            }
        }
        // 2. Protocol 102 (General Command Response)
        if (data.protocol === 102) {
            try {
                const payloadStr = data.payload.toString();
                const parsed = JSON.parse(payloadStr);
                let dps102 = parsed.dps?.["102"];
                if (typeof dps102 === "string") {
                    dps102 = JSON.parse(dps102);
                }
                else if (!dps102 && parsed.dps) {
                    dps102 = parsed.dps;
                }
                if (dps102) {
                    const pendingRequest = this.adapter.pendingRequests.get(dps102.id);
                    if (pendingRequest) {
                        if (pendingRequest.method === "get_map_v1" || pendingRequest.method === "get_clean_record_map" || pendingRequest.method === "get_photo") {
                            const isSuccessOk = dps102.result === "ok" || (Array.isArray(dps102.result) && dps102.result[0] === "ok");
                            if (isSuccessOk) {
                                this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `Map/Photo ACK for ${pendingRequest.method}. Waiting for data.`, "debug");
                            }
                            else {
                                this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, data.protocol, duid, "MQTT");
                            }
                        }
                        else {
                            this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `Response ${pendingRequest.method} | ${JSON.stringify(dps102.result)}`, "debug");
                            this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, data.protocol, duid, "MQTT");
                        }
                    }
                    else if (!this.adapter.requestsHandler.isRequestRecentlyFinished(dps102.id)) {
                        const method = dps102.method || "";
                        if (method !== "prop.post") {
                            this.adapter.rLog("MQTT", duid, "<-", "102", dps102.id, `Response not found in pending requests | Payload: ${JSON.stringify(dps102)}`, "debug");
                        }
                    }
                }
            }
            catch (e) {
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
                    if (status)
                        this.adapter.rLog("MQTT", duid, "Info", "500", undefined, `Firmware Update Status: ${status}`, "info");
                    if (progress !== undefined)
                        this.adapter.rLog("MQTT", duid, "Info", "500", undefined, `Firmware Update Progress: ${progress}%`, "info");
                }
                else if (parsedData.online === false) {
                    this.adapter.rLog("MQTT", duid, "Info", "500", undefined, `Device OFFLINE.`, "info");
                }
            }
            catch (error) {
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
    async handlePhotoOrMapData(duid, data, endpoint, topicEndpoint) {
        const payloadBuf = data.payload;
        const isRoborockHeader = payloadBuf.length > 8 && payloadBuf.subarray(0, 8).equals(Buffer.from("ROBOROCK"));
        if (data.protocol === 300) {
            const isPhotoPacket = await this.photoManager.handlePhotoProtocol300(duid, payloadBuf, isRoborockHeader);
            if (isPhotoPacket)
                return;
        }
        if (data.protocol === 301) {
            const isPhotoPacket = await this.photoManager.handlePhotoProtocol301(duid, payloadBuf, isRoborockHeader);
            if (isPhotoPacket)
                return;
            // Fallthrough to Map Logic
            const devices = this.adapter.http_api.getDevices();
            const device = devices.find((d) => d.duid === duid);
            const pv = device?.pv || data.version;
            if (pv === "B01") {
                await this.handleB01Map(duid, data, payloadBuf);
            }
            else {
                await this.handleV1Map(duid, data, payloadBuf, endpoint, topicEndpoint);
            }
        }
    }
    /**
     * Handles V1 Map Data (Standard Encryption with 24-byte header)
     */
    async handleV1Map(duid, data, payloadBuf, endpoint, topicEndpoint) {
        try {
            if (payloadBuf.length >= 24) {
                const parsedHeader = protocol301Parser.parse(payloadBuf.subarray(0, 24));
                const isValidEndpoint = (endpoint && endpoint.length > 0 && parsedHeader.endpoint && endpoint.startsWith(parsedHeader.endpoint)) ||
                    (topicEndpoint && topicEndpoint.length > 0 && parsedHeader.endpoint && topicEndpoint.startsWith(parsedHeader.endpoint));
                if (isValidEndpoint) {
                    const iv = Buffer.alloc(16, 0);
                    const decipher = crypto.createDecipheriv("aes-128-cbc", this.adapter.nonce, iv);
                    let decrypted = decipher.update(payloadBuf.subarray(24));
                    decrypted = Buffer.concat([decrypted, decipher.final()]);
                    let unzipped = decrypted;
                    try {
                        unzipped = zlib.gunzipSync(decrypted);
                    }
                    catch { }
                    let foundId = -1;
                    for (const [id, req] of this.adapter.pendingRequests) {
                        if ((req.method === "get_map_v1" || req.method === "get_clean_record_map") && req.duid === duid) {
                            foundId = id;
                            break;
                        }
                    }
                    if (foundId !== -1) {
                        this.adapter.requestsHandler.resolvePendingRequest(foundId, unzipped, data.protocol, duid, "MQTT", "V1");
                    }
                    else {
                        const robotModel = this.adapter.http_api.getRobotModel(duid) || "default";
                        this.adapter.mapManager.processMap(unzipped, "V1", robotModel, duid, null, duid, "MQTT");
                    }
                }
                else {
                    this.adapter.rLog("MQTT", duid, "Warn", "301", undefined, `V1 Header Endpoint mismatch or invalid. Got: '${parsedHeader.endpoint}'`, "warn");
                }
            }
            else {
                this.adapter.rLog("MQTT", duid, "Warn", "301", undefined, `V1 Data too short (${payloadBuf.length}b)`, "warn");
            }
        }
        catch (e) {
            this.adapter.rLog("MQTT", duid, "Error", "301", undefined, `V1 Map processing failed: ${e.message}`, "error");
        }
    }
    /**
     * Handles B01 Map Data (JSON Wrapped or Raw Encrypted with MapKey)
     */
    async handleB01Map(duid, data, payloadBuf) {
        try {
            let workingBuf = payloadBuf;
            if (payloadBuf.length > 0 && payloadBuf[0] === 0x7B) { // '{'
                try {
                    const json = JSON.parse(payloadBuf.toString("utf8"));
                    if (json.payload) {
                        const innerBuf = Buffer.from(json.payload, "hex");
                        const finalPayload = this.decryptB01Payload(innerBuf, duid);
                        if (finalPayload && finalPayload.length > 0) {
                            workingBuf = finalPayload;
                        }
                    }
                }
                catch { }
            }
            else {
                const processed = this.decryptB01Payload(workingBuf, duid);
                if (processed && processed.length > 0) {
                    workingBuf = processed;
                }
            }
            let foundId = -1;
            for (const [id, req] of this.adapter.pendingRequests) {
                if ((req.method === "get_map_v1" || req.method === "get_clean_record_map" || req.method === "service.upload_by_maptype" || req.method === "service.upload_record_by_url") && req.duid === duid) {
                    foundId = id;
                    break;
                }
            }
            if (foundId !== -1) {
                this.adapter.requestsHandler.resolvePendingRequest(foundId, workingBuf, data.protocol, duid, "MQTT", "B01");
            }
            else {
                const robotModel = this.adapter.http_api.getRobotModel(duid) || "roborock.vacuum.a27";
                this.adapter.mapManager.processMap(workingBuf, "B01", robotModel, duid, null, duid, "MQTT")
                    .then(async (res) => {
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
                    .catch((err) => {
                    this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `Failed to process unsolicited B01 map: ${err}`, "error");
                });
            }
        }
        catch (e) {
            this.adapter.rLog("MQTT", duid, "Error", "B01", undefined, `B01 Map processing failed: ${e.message}`, "error");
        }
    }
    /**
     * Ensures that a valid endpoint string exists for this adapter instance.
     */
    async ensureEndpoint() {
        const endpointState = await this.adapter.getStateAsync("endpoint");
        if (!endpointState || !endpointState.val) {
            const rriot = this.adapter.http_api.get_rriot();
            const randomEndpoint = this.md5bin(rriot.k).subarray(8, 14).toString("base64");
            await this.adapter.setState("endpoint", { val: randomEndpoint, ack: true });
            return randomEndpoint;
        }
        return endpointState.val;
    }
    /**
     * Publishes a message to the MQTT broker.
     */
    async sendMessage(duid, roborockMessage) {
        if (this.client && this.connected) {
            const rriot = this.adapter.http_api.get_rriot();
            const topic = `rr/m/i/${rriot.u}/${this.mqttUser}/${duid}`;
            this.client.publish(topic, roborockMessage, { qos: 1 });
        }
    }
    isConnected() {
        return this.connected;
    }
    async disconnectClient() {
        if (this.client) {
            try {
                this.client.end();
                this.connected = false;
            }
            catch (error) {
                this.adapter.rLog("MQTT", null, "Error", "MQTT", undefined, `Failed to disconnect: ${error}`, "error");
            }
        }
    }
    md5hex(str) {
        return crypto.createHash("md5").update(str).digest("hex");
    }
    md5bin(str) {
        return crypto.createHash("md5").update(str).digest();
    }
    clearIntervals() {
        this.photoManager.clearIntervals();
    }
    cleanup() {
        if (this.client) {
            this.client.removeAllListeners();
            this.client.end();
            this.client = null;
        }
        this.connected = false;
        this.clearIntervals();
    }
}
exports.mqtt_api = mqtt_api;
//# sourceMappingURL=mqttApi.js.map