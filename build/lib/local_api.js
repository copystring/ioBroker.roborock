"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.local_api = void 0;
const crypto_1 = __importDefault(require("crypto"));
const binary_parser_1 = require("binary-parser");
const ping_1 = __importDefault(require("ping"));
const net_1 = __importDefault(require("net"));
const dgram_1 = __importDefault(require("dgram"));
const crc_32_1 = __importDefault(require("crc-32"));
const UDP_DISCOVERY_PORT = 58866;
const TCP_CONNECTION_PORT = 58867;
const TIMEOUT = 5000; // 5 seconds timeout
const BROADCAST_TOKEN = Buffer.from("qWKYcdQWrbm9hPqe", "utf8");
class EnhancedSocket extends net_1.default.Socket {
    connected;
    chunkBuffer;
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
const versionParser = new binary_parser_1.Parser().string("version", { length: 3 }); // Only parses the protocol version
// Parser for v1.0 packet fields (excluding version)
const v1_0_Parser = new binary_parser_1.Parser()
    .endianess("big")
    // Do not parse version here!
    .uint32("seq")
    .uint16("protocol")
    .uint16("payloadLen")
    .buffer("payload", { length: "payloadLen" })
    .uint32("crc32");
// Parser for L01 Discovery packet fields (excluding version)
const vL01_Parser = new binary_parser_1.Parser()
    .endianess("big")
    // Do not parse version here!
    .buffer("field1", { length: 4 }) // Unknown field at offset 3
    .buffer("field2", { length: 2 }) // Unknown field at offset 7
    .uint16("payloadLen")
    .buffer("payload", { length: "payloadLen" })
    .uint32("crc32");
class local_api {
    adapter;
    server;
    localDevices;
    cloudDevices;
    localIps = {};
    localDevicesInterval = null;
    reconnectPlanned = new Set();
    connecting = new Set();
    constructor(adapter) {
        this.adapter = adapter;
        this.server = dgram_1.default.createSocket("udp4");
        try {
            this.server = dgram_1.default.createSocket({ type: "udp4", reusePort: true });
            this.server.bind(UDP_DISCOVERY_PORT, "0.0.0.0", () => {
                this.adapter.log.info(`UDP discovery listening on port ${UDP_DISCOVERY_PORT} with reusePort`);
            });
        }
        catch (err) {
            // fallback, falls OS kein SO_REUSEPORT kennt (z. B. Windows)
            this.adapter.log.warn(`reusePort not available (${err.message}), falling back to reuseAddr`);
            this.server = dgram_1.default.createSocket({ type: "udp4", reuseAddr: true });
            this.server.bind(UDP_DISCOVERY_PORT, "0.0.0.0", () => {
                this.adapter.log.info(`UDP discovery listening on port ${UDP_DISCOVERY_PORT} with reuseAddr`);
            });
        }
        this.localDevices = {};
        this.cloudDevices = new Set();
        this.localIps = {};
    }
    /**
     * Initiates a TCP client connection for the given device.
     *
     * @async
     * @param {string} duid - The unique device identifier (DUID).
     * @returns {Promise<void>} Resolves when the client attempt has finished.
     */
    async initiateClient(duid) {
        if (this.connecting.has(duid))
            return;
        this.connecting.add(duid);
        try {
            const ip = this.getIpForDuid(duid);
            if (!ip) {
                this.adapter.log.debug(`No local IP for ${duid} → MQTT`);
                this.cloudDevices.add(duid);
                return;
            }
            // Already connected?
            const existing = this.localDevices?.[duid];
            if (existing?.connected) {
                this.adapter.log.debug(`Already connected via TCP: ${duid}`);
                this.cloudDevices.delete(duid);
                return;
            }
            // Try TCP connect
            await this.createClient(duid, ip);
            this.adapter.log.info(`TCP client established for ${duid}`);
            this.cloudDevices.delete(duid);
        }
        catch (err) {
            this.adapter.log.warn(`TCP connect failed for ${duid}: ${err?.message || err}`);
            this.scheduleReconnect(duid, "connect failed");
            this.cloudDevices.add(duid);
        }
        finally {
            this.connecting.delete(duid);
        }
    }
    async createClient(duid, ip) {
        const client = new EnhancedSocket();
        await new Promise((resolve, reject) => {
            const onErrorOnce = (err) => reject(err);
            client.once("error", onErrorOnce); // only for the connect phase
            client.setTimeout(5000, () => {
                client.destroy();
                reject(new Error("TCP connect timeout"));
            });
            client.connect(TCP_CONNECTION_PORT, ip, () => {
                client.off("error", onErrorOnce); // Remove listener
                client.setTimeout(0);
                this.adapter.log.info(`TCP client for ${duid} connected`);
                this.localDevices[duid] = client;
                this.reconnectPlanned.delete(duid);
                resolve();
            });
        });
        client.on("data", async (message) => {
            try {
                if (client.chunkBuffer.length == 0) {
                    if (!this.checkComplete(message)) {
                        this.adapter.log.debug(`New chunk buffer created`);
                    }
                    client.chunkBuffer = message;
                }
                else {
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
            }
            catch (error) {
                this.adapter.catchError(`Failed to create tcp client: ${error.stack}`, `function createClient`, duid);
            }
        });
        client.on("close", () => this.scheduleReconnect(duid, `connection closed`));
        client.on("error", (error) => this.scheduleReconnect(duid, `connection error: ${error.message}`));
        client.on("end", () => this.scheduleReconnect(duid, "connection ended"));
    }
    scheduleReconnect(duid, reason) {
        this.adapter.log.warn(`TCP ${reason} for ${duid}, retry in 5s`);
        const old = this.localDevices[duid];
        if (old) {
            try {
                old.removeAllListeners();
            }
            catch { }
            try {
                old.destroy();
            }
            catch { }
            delete this.localDevices[duid];
        }
        if (this.reconnectPlanned.has(duid))
            return;
        this.reconnectPlanned.add(duid);
        const t = this.adapter.setTimeout(() => {
            this.reconnectPlanned.delete(duid);
            // nur nochmal probieren, wenn duid noch lokal ist
            if (this.getIpForDuid(duid)) {
                this.initiateClient(duid).catch((e) => this.adapter.log.warn(`Reconnect attempt failed for ${duid}: ${e?.message || e}`));
            }
            else {
                this.adapter.log.debug(`Skip reconnect for ${duid}, no longer in localIps`);
            }
        }, 5000);
    }
    async isLocallyReachable(ip) {
        const res = await ping_1.default.promise.probe(ip, { timeout: 2 });
        return res.alive;
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
        if (client?.connected) {
            client.write(message);
        }
    }
    isConnected(duid) {
        if (this.localDevices[duid]) {
            return this.localDevices[duid].connected;
        }
        return false;
    }
    startUdpDiscovery() {
        this.adapter.log.debug(`startUdpDiscovery() called`);
        const devices = {}; // Temporary list to store discovered devices
        this.server.on("message", (msg) => {
            let decodedMessage;
            let parsedMessage;
            // Dynamically select the parser based on version
            const version = versionParser.parse(msg).version;
            this.adapter.log.debug(`startUdpDiscovery() packet with version ${version} received: ${msg.toString("hex")}`);
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
                this.adapter.log.debug(`${parsedDecodedMessage.duid} discovered @ ${parsedDecodedMessage.ip}`);
                if (parsedDecodedMessage) {
                    const localKeys = this.adapter.http_api.getMatchedLocalKeys();
                    const localKey = localKeys.get(parsedDecodedMessage.duid);
                    if (localKey) {
                        // Only add devices that are in the localKeys list
                        devices[parsedDecodedMessage.duid] = parsedDecodedMessage.ip;
                    }
                }
            }
            catch (error) {
                this.adapter.log.warn(`Failed to process message: ${error.stack}`);
            }
        });
        this.server.on("error", (error) => this.adapter.catchError(`Server error: ${error.stack}`));
        // Set a timeout for discovering devices
        this.localDevicesInterval = this.adapter.setInterval(() => {
            this.adapter.log.debug(`startUdpDiscovery() called, found devices: ${JSON.stringify(devices)}`);
            const oldDevices = new Set(Object.keys(this.localIps));
            const newDevices = new Set(Object.keys(devices));
            for (const duid of newDevices) {
                if (!oldDevices.has(duid)) {
                    this.adapter.log.info(`New local device discovered: ${duid} @ ${devices[duid]}`);
                }
            }
            for (const duid of oldDevices) {
                if (!newDevices.has(duid)) {
                    this.adapter.log.info(`Device no longer discovered locally: ${duid}`);
                }
            }
            this.localIps = { ...devices };
            // Clear the temporary devices list for the next discovery
            for (const key of Object.keys(devices)) {
                delete devices[key];
            }
        }, TIMEOUT);
    }
    // Cleanup function to remove temporary handlers and clear the timeout
    cleanup() {
        this.server.removeAllListeners();
        if (this.localDevicesInterval) {
            this.adapter.clearTimeout(this.localDevicesInterval);
            this.localDevicesInterval = null;
        }
    }
    /**
     * @param {string} duid
     */
    isLocalDevice(duid) {
        if (duid in this.localDevices) {
            return true;
        }
        return false;
    }
    getIpForDuid(duid) {
        return this.localIps?.[duid] || null;
    }
    decryptECB(encrypted) {
        const input = Buffer.isBuffer(encrypted) ? encrypted : Buffer.from(encrypted, "binary");
        const decipher = crypto_1.default.createDecipheriv("aes-128-ecb", BROADCAST_TOKEN, null);
        decipher.setAutoPadding(false);
        try {
            let decrypted = decipher.update(encrypted, "binary", "utf8");
            decrypted += decipher.final("utf8");
            return this.removePadding(decrypted);
        }
        catch (e) {
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
        if (crc_32_1.default.buf(packetWithoutCrc) >>> 0 !== crcFromPacket) {
            console.error("CRC validation failed");
            return null;
        }
        const payloadLength = packet.readUInt16BE(9);
        const payload = packet.subarray(11, 11 + payloadLength);
        const key = crypto_1.default.createHash("sha256").update(BROADCAST_TOKEN).digest();
        const digestInput = packet.subarray(0, 9);
        const digest = crypto_1.default.createHash("sha256").update(digestInput).digest();
        const iv = digest.subarray(0, 12);
        const tag = payload.subarray(payload.length - 16);
        const ciphertext = payload.subarray(0, payload.length - 16);
        const decipher = crypto_1.default.createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAuthTag(tag);
        try {
            const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
            return decrypted.toString("utf8");
        }
        catch (e) {
            console.error(`[decryptGCM] Failed to decrypt! Error: ${e.message} IV: ${iv.toString("hex")} Tag: ${tag.toString("hex")} Encrypted (hex): ${ciphertext.toString("hex")} Length: ${ciphertext.length}`);
            return null;
        }
    }
    removePadding(str) {
        const paddingLength = str.charCodeAt(str.length - 1);
        return str.slice(0, -paddingLength);
    }
    clearLocalDevicedTimeout() {
        if (this.localDevicesInterval) {
            this.adapter.clearTimeout(this.localDevicesInterval);
            this.localDevicesInterval = null;
        }
    }
}
exports.local_api = local_api;
//# sourceMappingURL=local_api.js.map