"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsHandler = void 0;
const mapCreator_1 = require("./mapCreator");
const mapDataParser_1 = require("./mapDataParser");
const zlib_1 = require("zlib");
const util_1 = require("util");
const p_queue_1 = __importDefault(require("p-queue"));
const messageParser_1 = require("./messageParser");
const REQUEST_TIMEOUT = 30000;
const mappedCleanSummary = { 0: "clean_time", 1: "clean_area", 2: "clean_count", 3: "records" };
const mappedCleaningRecordAttribute = {
    0: "begin",
    1: "end",
    2: "duration",
    3: "area",
    4: "error",
    5: "complete",
    6: "start_type",
    7: "clean_type",
    8: "finish_reason",
    9: "dust_collection_status",
};
const parameterFolders = {
    get_mop_mode: "deviceStatus",
    get_water_box_custom_mode: "deviceStatus",
    get_consumable: "consumables",
    get_carpet_mode: "deviceStatus",
    get_carpet_clean_mode: "deviceStatus",
    get_carpet_cleaning_mode: "deviceStatus",
    get_wash_towel_mode: "deviceStatus",
    get_smart_wash_params: "deviceStatus",
    get_dust_collection_switch_status: "deviceStatus",
};
const gunzipAsync = (0, util_1.promisify)(zlib_1.gunzip);
// ============================================================
// Helper for AbortSignal compatibility (Node < 20)
// ============================================================
function anySignal(signals) {
    if (AbortSignal.any) {
        return AbortSignal.any(signals);
    }
    const controller = new AbortController();
    for (const signal of signals) {
        if (signal.aborted) {
            controller.abort(signal.reason);
            return controller.signal;
        }
        signal.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
    }
    return controller.signal;
}
function timeoutSignal(ms) {
    if (AbortSignal.timeout) {
        return AbortSignal.timeout(ms);
    }
    const controller = new AbortController();
    setTimeout(() => controller.abort(new Error("Timeout")), ms);
    return controller.signal;
}
// ============================================================
// RequestManager Class
// ============================================================
class RequestManager {
    queue;
    timeoutMs;
    tasks;
    constructor(concurrency = 10, timeoutMs = 30000) {
        this.queue = new p_queue_1.default({ concurrency });
        this.timeoutMs = timeoutMs;
        this.tasks = new Map();
    }
    add(id, taskFunction, priority = 0) {
        const manualController = new AbortController();
        this.tasks.set(id, manualController);
        return this.queue.add(async () => {
            try {
                if (manualController.signal.aborted) {
                    throw new Error("ADAPTER_STOPPED");
                }
                const tSignal = timeoutSignal(this.timeoutMs);
                const combinedSignal = anySignal([manualController.signal, tSignal]);
                const result = await taskFunction(combinedSignal);
                return result;
            }
            catch (error) {
                if (manualController.signal.aborted || (error instanceof Error && error.message === "CANCELLED_BY_USER")) {
                    throw new Error(`Task ${id} was cancelled manually.`);
                }
                else if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
                    throw new Error(`Task ${id} timed out after ${this.timeoutMs}ms.`);
                }
                else {
                    throw error;
                }
            }
            finally {
                this.tasks.delete(id);
            }
        }, { priority });
    }
    cancel(id) {
        const controller = this.tasks.get(id);
        if (controller) {
            controller.abort();
            return true;
        }
        return false;
    }
    async onIdle() {
        await this.queue.onIdle();
    }
    clear() {
        this.tasks.forEach((c) => c.abort(new Error("ADAPTER_STOPPED")));
        this.tasks.clear();
        this.queue.clear();
    }
}
class RoborockRequest {
    adapter;
    handler;
    duid;
    method;
    params;
    messageID;
    resolvePromise;
    rejectPromise;
    promise;
    constructor(handler, duid, method, params, messageID) {
        this.handler = handler;
        this.adapter = handler.adapter;
        this.duid = duid;
        this.method = method;
        this.params = params;
        this.messageID = messageID;
        this.promise = new Promise((resolve, reject) => {
            this.resolvePromise = resolve;
            this.rejectPromise = reject;
        });
    }
    async send(signal) {
        if (signal?.aborted)
            throw new Error("Aborted");
        const remoteConnection = await this.handler.isCloudDevice(this.duid);
        let protocol = 101;
        const version = await this.adapter.getDeviceProtocolVersion(this.duid);
        const timestamp = Math.floor(Date.now() / 1000);
        if (!this.handler.isCloudRequest(this.duid, this.method)) {
            protocol = 4;
        }
        const payload = await this.handler.messageParser.buildPayload(protocol, this.messageID, this.method, this.params, version);
        const roborockMessage = await this.handler.messageParser.buildRoborockMessage(this.duid, protocol, timestamp, payload, version);
        const mqttConnectionState = this.adapter.mqtt_api.isConnected();
        const localConnectionState = this.adapter.local_api.isConnected(this.duid);
        if (!roborockMessage) {
            const errorMsg = "Failed to build buildRoborockMessage!";
            this.adapter.catchError(errorMsg, "function sendRequest", this.duid);
            this.rejectPromise(new Error(errorMsg));
            return this.promise;
        }
        if (version == "A01") {
            this.adapter.mqtt_api.sendMessage(this.duid, roborockMessage);
            this.resolvePromise(null);
            return this.promise;
        }
        this.adapter.log.debug(`duid: ${this.duid}, mqtt: ${mqttConnectionState}, local: ${localConnectionState}, remote: ${remoteConnection}`);
        if (!mqttConnectionState && remoteConnection) {
            const errorMsg = `Cloud connection not available. Not sending for method ${this.method} request!`;
            this.adapter.log.debug(errorMsg);
            this.rejectPromise(new Error(errorMsg));
            return this.promise;
        }
        else if (!localConnectionState && !mqttConnectionState && this.method != "get_network_info") {
            const errorMsg = `Adapter locally or remotely not connected to robot ${this.duid}. Sending request for ${this.method} not possible!`;
            this.adapter.log.debug(errorMsg);
            this.rejectPromise(new Error(errorMsg));
            return this.promise;
        }
        // Register in pendingRequests
        this.adapter.pendingRequests.set(this.messageID, this);
        // Handle AbortSignal
        if (signal) {
            signal.addEventListener("abort", () => {
                if (signal.reason) {
                    this.rejectPromise(signal.reason);
                }
                else {
                    this.rejectPromise(new Error("Aborted by RequestManager"));
                }
            }, { once: true });
        }
        // Send
        if (this.handler.isCloudRequest(this.duid, this.method) || !localConnectionState) {
            this.adapter.mqtt_api.sendMessage(this.duid, roborockMessage);
            this.adapter.log.debug(`Sent payload for ${this.duid} with ${payload} using cloud connection using version ${version}`);
        }
        else {
            const lengthBuffer = Buffer.alloc(4);
            lengthBuffer.writeUInt32BE(roborockMessage.length, 0);
            const fullMessage = Buffer.concat([lengthBuffer, roborockMessage]);
            this.adapter.local_api.sendMessage(this.duid, fullMessage);
            this.adapter.log.debug(`Sent payload for ${this.duid} with ${payload} using local connection using version ${version}`);
        }
        return this.promise;
    }
    resolve(result) {
        this.adapter.pendingRequests.delete(this.messageID);
        this.resolvePromise(result);
    }
    reject(reason) {
        this.adapter.pendingRequests.delete(this.messageID);
        this.rejectPromise(reason);
    }
}
class requestsHandler {
    adapter;
    idCounter;
    photoIdCounter;
    deviceManagers;
    messageParser;
    mapParser;
    mapCreator;
    mqttResetInterval = undefined;
    startupFinished = false;
    startupPromises = [];
    constructor(adapter) {
        this.adapter = adapter;
        // Offset ID counter by instance to avoid collisions (Instance 0: 300-20000, Instance 1: 20300-40000)
        this.idCounter = (this.adapter.instance * 20000) + 300;
        this.photoIdCounter = 0;
        this.deviceManagers = new Map();
        this.messageParser = new messageParser_1.messageParser(this.adapter);
        this.mapParser = new mapDataParser_1.MapDataParser(this.adapter);
        this.mapCreator = new mapCreator_1.MapCreator(this.adapter);
        this.scheduleMqttReset();
    }
    scheduleMqttReset() {
        if (this.mqttResetInterval)
            this.adapter.clearInterval(this.mqttResetInterval);
        this.mqttResetInterval = this.adapter.setInterval(() => {
            this.adapter.log.debug("Resetting MQTT message ID counter");
            this.idCounter = 300;
        }, 24 * 60 * 60 * 1000); // 24 hours
    }
    async waitForStartup() {
        this.adapter.log.info(`[Startup] Waiting for ${this.startupPromises.length} initial requests to finish...`);
        await Promise.all(this.startupPromises);
        this.startupFinished = true;
        this.startupPromises = [];
        this.adapter.log.info("[Startup] All initial requests finished. Adapter is ready.");
    }
    _processResult(requestPromise, callback, identifier, duid, alwaysBackground = false) {
        const executionWrapper = async () => {
            try {
                const result = await requestPromise;
                await callback(result);
            }
            catch (e) {
                const errorMsg = e?.message || e?.toString() || "";
                // Handle timeouts and aborts gracefully without scary stack traces
                if (errorMsg.includes("Timeout") || errorMsg.includes("timed out") || errorMsg.includes("Aborted") || errorMsg.includes("CANCELLED") || errorMsg.includes("ADAPTER_STOPPED")) {
                    const idMatch = errorMsg.match(/Task (req_\d+_\d+)/);
                    const reqId = idMatch ? idMatch[1] : "unknown";
                    if (errorMsg.includes("ADAPTER_STOPPED")) {
                        this.adapter.log.warn(`[${identifier}] Request cancelled (Adapter stopped). ID: ${reqId}`);
                    }
                    else {
                        this.adapter.log.warn(`[${identifier}] Request timed out. ID: ${reqId}`);
                    }
                }
                else {
                    this.adapter.catchError(e, `Processing-${identifier}`, duid);
                }
            }
        };
        const promise = executionWrapper();
        if (alwaysBackground) {
            promise.catch(() => { });
        }
        else if (!this.startupFinished) {
            this.startupPromises.push(promise);
        }
        else {
            promise.catch(() => { });
        }
    }
    getManager(duid) {
        if (!this.deviceManagers.has(duid)) {
            // Initialize with default concurrency and timeout
            // Concurrency 10, Timeout 30s
            this.deviceManagers.set(duid, new RequestManager(10, REQUEST_TIMEOUT));
        }
        return this.deviceManagers.get(duid);
    }
    async sendRequest(duid, method, params, options = {}) {
        const manager = this.getManager(duid);
        const priority = options.priority || 0;
        const attempt = async (retryCount) => {
            let messageID;
            if (method === "get_photo") {
                this.photoIdCounter = this.photoIdCounter >= 250 ? 1 : this.photoIdCounter + 1;
                messageID = this.photoIdCounter;
            }
            else {
                const minId = (this.adapter.instance * 20000) + 300;
                const maxId = (this.adapter.instance * 20000) + 20000;
                this.idCounter = this.idCounter > maxId ? minId : this.idCounter + 1;
                messageID = this.idCounter;
            }
            const req = new RoborockRequest(this, duid, method, params, messageID);
            const taskId = `req_${messageID}_${Date.now()}`;
            try {
                const result = await manager.add(taskId, (signal) => req.send(signal), priority);
                if (Array.isArray(result) && result[0] === "retry" && retryCount < 3) {
                    this.adapter.log.debug(`[sendRequest] Received 'retry' for ${method} on ${duid}. Retrying (${retryCount + 1}/3)...`);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return attempt(retryCount + 1);
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        };
        return attempt(0);
    }
    async getParameter(handler, duid, parameter, extraParameters) {
        const folder = parameterFolders[parameter];
        if (folder) {
            await this.adapter.ensureFolder(`Devices.${duid}.${folder}`);
        }
        const params = extraParameters ? extraParameters : [];
        const requestPromise = this.sendRequest(duid, parameter, params, { priority: parameter === "get_prop" ? 1 : 0 });
        this._processResult(requestPromise, async (result) => {
            if (typeof result === "object" && result !== null && !Array.isArray(result)) {
                const resultObj = result;
                for (const key in resultObj) {
                    const subFolder = parameterFolders[key];
                    if (subFolder) {
                        await this.adapter.ensureFolder(`Devices.${duid}.${subFolder}`);
                        await this.adapter.ensureState(`Devices.${duid}.${subFolder}.${key}`, handler.getCommonDeviceStates(key) || {});
                        await this.adapter.setStateChangedAsync(`Devices.${duid}.${subFolder}.${key}`, { val: resultObj[key], ack: true });
                    }
                }
            }
        }, `getParameter-${parameter}-${duid}`, duid);
    }
    async command(_handler, duid, method, params) {
        const requestPromise = this.sendRequest(duid, method, params, { priority: 1 });
        this._processResult(requestPromise, async () => {
            // Command successful, nothing specific to do
        }, `command-${method}-${duid}`, duid);
    }
    async getStatus(handler, duid) {
        const productCategory = await this.adapter.http_api.getProductCategory(duid);
        switch (productCategory) {
            case "roborock.wetdryvac":
                this.sendRequest(duid, "10000", "[200,201,202,203,204,205,206,207,208,209,210,212,213,214,215,216,221,222,223,224,225,226,227,228,235,210,10002,229,10004,10005,10007,230,237,238]", { priority: 0 }).catch(() => { });
                break;
            case "robot.vacuum.cleaner":
            default:
                await this.getParameter(handler, duid, "get_prop", ["get_status"]);
                break;
        }
    }
    async getCleanSummary(handler, duid) {
        const requestPromise = this.sendRequest(duid, "get_clean_summary", [], { priority: 0 });
        this._processResult(requestPromise, async (result) => {
            const cleaningAttributes = result;
            for (const cleaningAttribute in cleaningAttributes) {
                const mappedAttribute = mappedCleanSummary[cleaningAttribute] || cleaningAttribute;
                const cleaningAttributeCommon = handler.getCommonCleaningInfo(mappedAttribute);
                if (["clean_time", "clean_area", "clean_count"].includes(mappedAttribute)) {
                    if (cleaningAttributeCommon)
                        cleaningAttributeCommon.type = "number";
                    await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.${mappedAttribute}`, cleaningAttributeCommon || {});
                    await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.${mappedAttribute}`, {
                        val: this.calculateCleaningValue(mappedAttribute, cleaningAttributes[cleaningAttribute]),
                        ack: true,
                    });
                }
                else if (mappedAttribute == "records") {
                    await this.adapter.ensureFolder(`Devices.${duid}.cleaningInfo.records`);
                    const recordsList = cleaningAttributes[cleaningAttribute];
                    const cleaningRecordsJSON = [];
                    // Process records sequentially
                    for (const cleaningRecord in recordsList) {
                        const cleaningRecordID = recordsList[cleaningRecord];
                        try {
                            await this.adapter.ensureFolder(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}`);
                            const cleaningRecordAttributesArr = (await this.sendRequest(duid, "get_clean_record", [cleaningRecordID], { priority: 0 }));
                            const cleaningRecordAttributes = cleaningRecordAttributesArr[0];
                            cleaningRecordsJSON[parseInt(cleaningRecord)] = cleaningRecordAttributes;
                            const cleaningRecordCommon = handler.getCommonCleaningRecords(mappedAttribute);
                            if (cleaningRecordCommon) {
                                for (const cleaningRecordAttribute in cleaningRecordAttributes) {
                                    const mappedRecordAttribute = mappedCleaningRecordAttribute[cleaningRecordAttribute] || cleaningRecordAttribute;
                                    let val = cleaningRecordAttributes[cleaningRecordAttribute];
                                    if (["begin", "end"].includes(mappedRecordAttribute)) {
                                        val = new Date(val * 1000).toString();
                                    }
                                    else if (mappedRecordAttribute == "duration") {
                                        val = Math.round(val / 60);
                                    }
                                    await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, cleaningRecordCommon);
                                    await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, {
                                        val: val,
                                        ack: true,
                                    });
                                }
                            }
                            if (this.adapter.config.enable_map_creation == true) {
                                const mapArray = await this.getCleaningRecordMap(duid, recordsList[cleaningRecord]);
                                if (mapArray) {
                                    await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.map.mapData`, {
                                        name: "Map Data JSON",
                                        type: "string",
                                        role: "json",
                                    });
                                    await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.map.mapData`, { val: mapArray.mapData, ack: true });
                                    await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64`, {
                                        name: "Map Image (Full, Uncropped)",
                                        type: "string",
                                        role: "text.png",
                                    });
                                    await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64`, { val: mapArray.mapBase64, ack: true });
                                    await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64Truncated`, {
                                        name: "Map Image (Full, Cropped)",
                                        type: "string",
                                        role: "text.png",
                                    });
                                    await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64Truncated`, {
                                        val: mapArray.mapBase64Truncated,
                                        ack: true,
                                    });
                                }
                            }
                        }
                        catch (e) {
                            const errorMsg = e?.message || e?.toString() || "";
                            if (errorMsg.includes("Timeout") || errorMsg.includes("timed out") || errorMsg.includes("Aborted") || errorMsg.includes("CANCELLED") || errorMsg.includes("ADAPTER_STOPPED")) {
                                const idMatch = errorMsg.match(/Task (req_\d+_\d+)/);
                                const reqId = idMatch ? idMatch[1] : "unknown";
                                if (errorMsg.includes("ADAPTER_STOPPED")) {
                                    this.adapter.log.warn(`[getCleanSummary_record] Request cancelled (Adapter stopped). ID: ${reqId}`);
                                }
                                else {
                                    this.adapter.log.warn(`[getCleanSummary_record] Request timed out. ID: ${reqId}`);
                                }
                            }
                            else {
                                this.adapter.catchError(e, "getCleanSummary_record", duid);
                            }
                        }
                    }
                    await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.records.json`, { name: "Cleaning Records JSON", type: "string", role: "json" });
                    await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.records.json`, { val: JSON.stringify(cleaningRecordsJSON), ack: true });
                }
            }
        }, `getCleanSummary-${duid}`, duid, true);
    }
    async getCleaningRecordMap(duid, startTime) {
        try {
            const cleaningRecordMap = (await this.sendRequest(duid, "get_clean_record_map", { start_time: startTime }, { priority: 0 }));
            if (!Buffer.isBuffer(cleaningRecordMap)) {
                this.adapter.log.warn(`[getCleaningRecordMap] Received non-buffer data for record ${startTime}: ${JSON.stringify(cleaningRecordMap)}`);
                return null;
            }
            // Check if map is gzipped (starts with 0x1f 0x8b)
            let mapBuf = cleaningRecordMap;
            if (cleaningRecordMap[0] === 0x1f && cleaningRecordMap[1] === 0x8b) {
                try {
                    mapBuf = await gunzipAsync(cleaningRecordMap);
                }
                catch (e) {
                    this.adapter.log.error(`[getCleaningRecordMap] Failed to unzip map data: ${e}`);
                    return null;
                }
            }
            const mapData = await this.mapParser.parsedata(mapBuf, null, { isHistoryMap: true });
            if (!mapData) {
                this.adapter.log.warn(`[getCleaningRecordMap] Failed to parse map data for record ${startTime}`);
                return null;
            }
            // Generate images
            const [mapBase64CleanUncropped, mapBase64, mapBase64Truncated] = await this.mapCreator.canvasMap(mapData);
            return {
                mapBase64CleanUncropped,
                mapBase64,
                mapBase64Truncated,
                mapData: JSON.stringify(mapData),
            };
        }
        catch (e) {
            const errorMsg = e?.message || e?.toString() || "";
            if (errorMsg.includes("Timeout") || errorMsg.includes("timed out") || errorMsg.includes("Aborted") || errorMsg.includes("CANCELLED") || errorMsg.includes("ADAPTER_STOPPED")) {
                const idMatch = errorMsg.match(/Task (req_\d+_\d+)/);
                const reqId = idMatch ? idMatch[1] : "unknown";
                if (errorMsg.includes("ADAPTER_STOPPED")) {
                    this.adapter.log.warn(`[getCleaningRecordMap] Request cancelled (Adapter stopped). ID: ${reqId}`);
                }
                else {
                    this.adapter.log.warn(`[getCleaningRecordMap] Request timed out. ID: ${reqId}`);
                }
            }
            else {
                this.adapter.catchError(e, "getCleaningRecordMap", duid);
            }
            return null;
        }
    }
    async getMap(_handler, duid) {
        const requestPromise = this.sendRequest(duid, "get_map_v1", [], { priority: 0 });
        this._processResult(requestPromise, async (result) => {
            const map = result;
            if (!Buffer.isBuffer(map)) {
                return;
            }
            // Check if map is gzipped
            let mapBuf = map;
            if (map[0] === 0x1f && map[1] === 0x8b) {
                try {
                    mapBuf = await gunzipAsync(map);
                }
                catch (e) {
                    this.adapter.log.error(`[getMap] Failed to unzip map data: ${e}`);
                    return;
                }
            }
            const mapData = await this.mapParser.parsedata(mapBuf, null);
            if (mapData) {
                // Update map states
                await this.adapter.ensureState(`Devices.${duid}.map.mapData`, { name: "Map Data", type: "string", role: "json" });
                await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapData`, { val: JSON.stringify(mapData), ack: true });
                const [, mapBase64] = await this.mapCreator.canvasMap(mapData);
                await this.adapter.ensureState(`Devices.${duid}.map.mapBase64`, { name: "Map Image", type: "string", role: "text.png" });
                await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64`, { val: mapBase64, ack: true });
            }
        }, `getMap-${duid}`, duid);
    }
    async isCleaning(_duid) {
        void _duid;
        return false;
    }
    isCloudDevice(_duid) {
        void _duid;
        return Promise.resolve(true);
    }
    isCloudRequest(_duid, _method) {
        void _duid;
        void _method;
        // Force cloud request (Protocol 101) for now to fix ID mismatch
        return true;
    }
    calculateCleaningValue(_attribute, value) {
        return value;
    }
    resolvePendingRequest(messageID, result, protocol) {
        const req = this.adapter.pendingRequests.get(messageID);
        if (req) {
            if (protocol) {
                this.adapter.log.debug(`[resolvePendingRequest] Received response for request ${messageID} with protocol ${protocol}`);
            }
            if (req instanceof RoborockRequest) {
                req.resolve(result);
            }
            else {
                // Legacy handling if any
                if (typeof req.resolve === "function") {
                    req.resolve(result);
                }
            }
        }
    }
    clearQueue() {
        this.adapter.local_api.clearLocalDevicedTimeout();
        this.adapter.mqtt_api.clearIntervals();
        // Clear map-based queues
        this.deviceManagers.forEach((m) => m.clear());
        this.deviceManagers.clear();
        // Reject all pending requests to prevent hanging promises
        this.adapter.pendingRequests.forEach((req) => {
            if (req instanceof RoborockRequest) {
                req.reject(new Error("Queue cleared (adapter stopped or disconnected)"));
            }
            else {
                // Legacy fallback
                if (req.timeout)
                    this.adapter.clearTimeout(req.timeout);
                // Try to reject if possible, otherwise just delete
                if (typeof req.reject === "function") {
                    req.reject(new Error("Queue cleared (adapter stopped or disconnected)"));
                }
            }
        });
        this.adapter.pendingRequests.clear();
    }
}
exports.requestsHandler = requestsHandler;
//# sourceMappingURL=requestsHandler.js.map