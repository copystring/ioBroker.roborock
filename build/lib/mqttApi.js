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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqtt_api = void 0;
const crypto = __importStar(require("crypto"));
const mqtt = __importStar(require("mqtt"));
const binary_parser_1 = require("binary-parser");
const zlib = __importStar(require("zlib"));
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
// Parser for photo data headers
const photoParser = new binary_parser_1.Parser()
    .endianess("little")
    .string("roborock", {
    length: 8,
    stripNull: true,
})
    .uint8("id");
class mqtt_api {
    adapter;
    mqttUser;
    mqttPassword;
    client;
    connected;
    pendingPhotoRequests;
    mqttOptions;
    constructor(adapter) {
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
        this.adapter.log.info(`Connecting to MQTT Broker at ${rriot.r.m}...`);
        const client = mqtt.connect(rriot.r.m, this.mqttOptions);
        this.client = client;
        try {
            // Set up listeners and subscriptions
            await this.subscribe_mqtt_events(client);
            await this.subscribe_mqtt_message(client);
            // Note: 'connect' event handler sets this.connected = true
        }
        catch (error) {
            this.adapter.log.error(`MQTT connection setup failed. Error: ${error.message}`);
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
            this.adapter.log.info(`MQTT connection established.`);
            // Subscribe to the specific topic for this user
            const topic = `rr/m/o/${rriot.u}/${this.mqttUser}/#`;
            client.subscribe(topic, (err) => {
                if (err) {
                    this.adapter.log.error(`Failed to subscribe to ${topic}! Error: ${err}`);
                }
                else {
                    this.adapter.log.debug(`Subscribed to ${topic}`);
                }
            });
        });
        client.on("disconnect", () => {
            this.adapter.log.info(`MQTT disconnected.`);
            this.connected = false;
        });
        client.on("error", (error) => {
            this.adapter.log.error(`MQTT connection error: ${error.message}. Broker: ${rriot.r.m}`);
            this.connected = false;
        });
        client.on("close", () => {
            this.adapter.log.info(`MQTT connection closed. Reconnecting in 60 seconds...`);
            this.connected = false;
        });
        client.on("reconnect", () => {
            this.adapter.log.info(`MQTT attempting to reconnect...`);
            // Subscription is usually handled automatically by MQTT client on reconnect if clean=false,
            // but if we need to re-subscribe manually:
            const topic = `rr/m/o/${rriot.u}/${this.mqttUser}/#`;
            client.subscribe(topic, (err) => {
                if (err)
                    this.adapter.log.error(`Failed to re-subscribe during reconnect: ${err}`);
            });
        });
        client.on("offline", () => {
            this.adapter.log.warn("MQTT connection went offline.");
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
                // Extract DUID from topic (last part)
                const duid = topic.split("/").pop();
                if (!duid) {
                    this.adapter.log.warn(`Could not extract DUID from topic: ${topic}`);
                    return;
                }
                // Decode the Roborock binary message wrapper
                const dataArr = this.adapter.requestsHandler.messageParser.decodeMsg(message, duid);
                const allMessages = Array.isArray(dataArr) ? dataArr : dataArr ? [dataArr] : [];
                for (const data of allMessages) {
                    await this.handleDecodedMessage(duid, data, endpoint);
                }
            }
            catch (error) {
                this.adapter.log.error(`Error processing MQTT message on ${topic}: ${error.stack}`);
            }
        });
        this.adapter.log.info(`MQTT message listener initialized.`);
    }
    /**
     * Processes a single decoded Roborock message frame.
     */
    async handleDecodedMessage(duid, data, endpoint) {
        // 1. Protocol A01 (Tuya-like / JSON payload)
        if (data.version === "A01") {
            try {
                const parsedPayload = JSON.parse(data.payload.toString());
                this.adapter.log.debug(`[MQTT] A01 Message from ${duid}: ${JSON.stringify(parsedPayload)}`);
                await this.adapter.processA01(duid, parsedPayload);
            }
            catch (e) {
                this.adapter.log.error(`[MQTT] Failed to parse A01 payload: ${e}`);
            }
            return;
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
                }
                else if (!dps102 && parsed.dps) {
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
                                // This is the initial "ok". IGNORE IT. Do NOT resolve the promise.
                                // The real data will come via Protocol 300/301.
                                this.adapter.log.debug(`[MQTT] Received Map/Photo expectation (102) for ${pendingRequest.method} (ID: ${dps102.id}). Waiting for data.`);
                                // --- DO NOTHING HERE ---
                            }
                            else {
                                // This is an ERROR for the request (e.g., "retry" or "locating")
                                if (Array.isArray(dps102.result) && dps102.result[0] === "retry") {
                                    this.adapter.log.debug(`[MQTT] ${pendingRequest.method} request ${dps102.id} returned 'retry'.`);
                                }
                                else {
                                    this.adapter.log.warn(`[MQTT] ${pendingRequest.method} request ${dps102.id} failed with: ${JSON.stringify(dps102.result)}`);
                                }
                                this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, data.protocol);
                            }
                        }
                        else {
                            // This is a normal command (not a map or photo), resolve it.
                            // Log the result payload for debugging as requested
                            this.adapter.log.debug(`[MQTT] Command Response (102) for ${pendingRequest.method} (ID: ${dps102.id}): ${JSON.stringify(dps102.result)}`);
                            this.adapter.requestsHandler.resolvePendingRequest(dps102.id, dps102.result, data.protocol);
                        }
                    }
                    else {
                        this.adapter.log.debug(`[MQTT] Received Protocol 102 message with ID ${dps102.id} but no matching pending request found.`);
                    }
                }
            }
            catch (e) {
                this.adapter.log.error(`[MQTT] Failed to parse Protocol 102 payload: ${e}`);
            }
            return;
        }
        // 3. Protocol 300 & 301 (Binary Data: Photos, Maps)
        if (data.protocol === 300 || data.protocol === 301) {
            this.handlePhotoOrMapData(data, endpoint);
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
                        this.adapter.log.info(`[MQTT] Device ${duid} Firmware Update Status: ${status}`);
                    if (progress !== undefined)
                        this.adapter.log.info(`[MQTT] Device ${duid} Firmware Update Progress: ${progress}%`);
                }
                else if (parsedData.online === false) {
                    this.adapter.log.info(`[MQTT] Device ${duid} reported OFFLINE.`);
                }
                else if (parsedData.online === true) {
                    // Device reported online, nothing specific to do
                }
                else {
                    this.adapter.log.warn(`[MQTT] Unrecognized Protocol 500 message for ${duid}: ${dataString}`);
                }
            }
            catch (error) {
                this.adapter.log.warn(`[MQTT] Unable to parse Protocol 500 message for ${duid}: ${error.message}`);
            }
            return;
        }
        // 5. Unknown Protocol
        this.adapter.log.warn(`[MQTT] Received unknown protocol ${data.protocol} from ${duid}`);
    }
    /**
     * Handles binary data messages (Protocol 300/301) for Photos or Maps.
     */
    handlePhotoOrMapData(data, endpoint) {
        const payloadBuf = data.payload;
        // Check for "ROBOROCK" header -> Photo Data
        const isRoborockHeader = payloadBuf.subarray(0, 8).toString() === "ROBOROCK";
        if (data.protocol === 300 && isRoborockHeader) {
            // Protocol 300: First chunk of a photo
            const photoData = photoParser.parse(payloadBuf);
            if (this.adapter.pendingRequests.has(photoData.id)) {
                this.adapter.log.debug(`[MQTT] Photo Data (300) Chunk 1 received for ReqID ${photoData.id}`);
                this.pendingPhotoRequests[photoData.id] = {
                    chunks: [payloadBuf.subarray(56)], // Skip header
                };
            }
        }
        else if (data.protocol === 301) {
            // Protocol 301: Subsequent chunks OR Map Data
            // Case A: Subsequent Photo Chunk
            if (data.seq === 2 && isRoborockHeader) {
                // Note: The logic assumes 'id' is embedded or known.
                // Original code used data.payload.id which might be incorrect on a Buffer.
                // We need to re-parse or check how to link seq 2 to the request.
                // Assuming standard flow:
                // For now, sticking close to original logic but safe access:
                try {
                    // It seems we need to parse again to get ID if header is present
                    const photoData = photoParser.parse(payloadBuf);
                    if (this.pendingPhotoRequests[photoData.id]?.chunks) {
                        this.adapter.log.debug(`[MQTT] Photo Data (301) Chunk 2 received for ReqID ${photoData.id}`);
                        this.pendingPhotoRequests[photoData.id].chunks.push(payloadBuf);
                        // Combine and resolve
                        const totalBuffer = Buffer.concat(this.pendingPhotoRequests[photoData.id].chunks);
                        this.adapter.requestsHandler.resolvePendingRequest(photoData.id, totalBuffer, data.protocol);
                        delete this.pendingPhotoRequests[photoData.id]; // Cleanup
                    }
                }
                catch (e) {
                    this.adapter.log.warn(`[MQTT] Error processing photo chunk 2: ${e}`);
                }
                return;
            }
            // Case B: Single Packet Photo (Header present)
            if (isRoborockHeader) {
                const photoData = photoParser.parse(payloadBuf);
                this.adapter.log.debug(`[MQTT] Single Packet Photo (301) received for ReqID ${photoData.id}`);
                this.adapter.requestsHandler.resolvePendingRequest(photoData.id, payloadBuf.subarray(56), data.protocol);
                return;
            }
            // Case C: Map Data (Check Endpoint Match)
            try {
                const parsedHeader = protocol301Parser.parse(payloadBuf.subarray(0, 24));
                if (endpoint.startsWith(parsedHeader.endpoint)) {
                    // Decrypt and Decompress Map Data
                    const iv = Buffer.alloc(16, 0);
                    const decipher = crypto.createDecipheriv("aes-128-cbc", this.adapter.nonce, iv);
                    let decrypted = decipher.update(payloadBuf.subarray(24));
                    decrypted = Buffer.concat([decrypted, decipher.final()]);
                    const unzipped = zlib.gunzipSync(decrypted);
                    // Resolve pending map request
                    this.adapter.requestsHandler.resolvePendingRequest(parsedHeader.id, unzipped, data.protocol);
                }
            }
            catch (e) {
                // Not a valid map header or decryption failed
                this.adapter.log.debug(`[MQTT] Protocol 301 parse failed (not a map?): ${e}`);
            }
        }
    }
    /**
     * Ensures that a valid endpoint string exists for this adapter instance.
     * Generates one if missing.
     */
    async ensureEndpoint() {
        const endpointState = await this.adapter.getStateAsync("endpoint");
        if (!endpointState || !endpointState.val) {
            const rriot = this.adapter.http_api.get_rriot();
            // Generate a random endpoint from the key
            const randomEndpoint = this.md5bin(rriot.k).subarray(8, 14).toString("base64");
            await this.adapter.setState("endpoint", { val: randomEndpoint, ack: true });
            this.adapter.log.info(`Generated and saved new endpoint: ${randomEndpoint}`);
            return randomEndpoint;
        }
        return endpointState.val;
    }
    /**
     * Publishes a message to the MQTT broker.
     * @param duid The Device Unique ID
     * @param roborockMessage The encrypted binary message
     */
    async sendMessage(duid, roborockMessage) {
        if (this.client && this.connected) {
            const rriot = this.adapter.http_api.get_rriot();
            const topic = `rr/m/i/${rriot.u}/${this.mqttUser}/${duid}`;
            this.client.publish(topic, roborockMessage, { qos: 1 });
        }
        else {
            this.adapter.log.warn(`[MQTT] Cannot send message to ${duid}, client not connected.`);
        }
    }
    isConnected() {
        return this.connected;
    }
    /**
     * Gracefully disconnects the MQTT client.
     */
    async disconnectClient() {
        if (this.client) {
            try {
                this.adapter.log.info("[MQTT] Disconnecting client...");
                await this.client.endAsync();
                this.connected = false;
            }
            catch (error) {
                this.adapter.log.error(`[MQTT] Failed to disconnect: ${error}`);
            }
        }
    }
    /**
     * Helper: Calculate MD5 hex string.
     */
    md5hex(str) {
        return crypto.createHash("md5").update(str).digest("hex");
    }
    /**
     * Helper: Calculate MD5 binary buffer.
     */
    md5bin(str) {
        return crypto.createHash("md5").update(str).digest();
    }
    /**
     * Clears internal state (e.g. pending partial downloads).
     */
    clearIntervals() {
        this.pendingPhotoRequests = {};
    }
    /**
     * Full cleanup of the API instance.
     */
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