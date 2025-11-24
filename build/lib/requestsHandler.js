"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const zlib_1 = __importDefault(require("zlib"));
const util_1 = require("util");
const mapDataParser_1 = require("./mapDataParser");
const messageParser_1 = require("./messageParser");
const mapCreator_1 = require("./mapCreator");
const p_queue_1 = __importDefault(require("p-queue"));
// ... (Constants)
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
const gunzipAsync = (0, util_1.promisify)(zlib_1.default.gunzip);
const gzipAsync = (0, util_1.promisify)(zlib_1.default.gzip);
const writeFileAsync = (0, util_1.promisify)(fs_1.default.writeFile);
class requestsHandler {
    adapter;
    idCounter;
    deviceQueues;
    messageParser;
    mapParser;
    mapCreator;
    mqttResetInterval = undefined;
    constructor(adapter) {
        this.adapter = adapter;
        this.idCounter = 0;
        this.deviceQueues = new Map();
        this.messageParser = new messageParser_1.messageParser(this.adapter);
        this.mapParser = new mapDataParser_1.MapDataParser(this.adapter);
        this.mapCreator = new mapCreator_1.MapCreator(this.adapter);
        this.scheduleMqttReset();
    }
    getQueue(duid) {
        if (!this.deviceQueues.has(duid)) {
            this.deviceQueues.set(duid, new p_queue_1.default({ concurrency: 10 }));
        }
        return this.deviceQueues.get(duid);
    }
    scheduleMqttReset() {
        if (this.mqttResetInterval)
            this.adapter.clearInterval(this.mqttResetInterval);
        this.mqttResetInterval = this.adapter.setInterval(async () => {
            await this.adapter.resetMqttApi();
        }, 3600000);
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
    async getCleaningRecordMap(duid, startTime) {
        try {
            const cleaningRecordMap = (await this.sendRequest(duid, "get_clean_record_map", { start_time: startTime }, { priority: 0 }));
            if (!Buffer.isBuffer(cleaningRecordMap)) {
                this.adapter.log.warn(`[getCleaningRecordMap] Received non-buffer data for record ${startTime}: ${JSON.stringify(cleaningRecordMap)}`);
                throw new Error("Received non-buffer data for history map");
            }
            // We must pass 'null' for the 'mappedRooms' argument, as history maps don't have live room mappings.
            const parsedData = (await this.mapParser.parsedata(cleaningRecordMap, null, { isHistoryMap: true }));
            // Use the new 'segments.list' structure for counting
            if (parsedData?.IMAGE?.segments) {
                this.adapter.log.info(`[getCleaningRecordMap] Parsed HISTORY map. Segments: ${parsedData.IMAGE.segments.list?.length || 0}`);
            }
            else {
                this.adapter.log.warn(`[getCleaningRecordMap] History map for ${startTime} was parsed but contains no IMAGE data.`);
            }
            this.adapter.log.debug(`Generating map for cleaning record with start time ${startTime} for duid ${duid}`);
            // We pass 'null' for mappedRooms because history maps don't get room names painted.
            const [mapBase64CleanUncropped, mapBase64Full, mapBase64Truncated] = await this.mapCreator.canvasMap(parsedData, { selectedMap: -1, mappedRooms: null });
            return {
                // Return the 3 maps as expected by getCleanSummary
                mapBase64CleanUncropped: mapBase64CleanUncropped,
                mapBase64: mapBase64Full,
                mapBase64Truncated: mapBase64Truncated,
                mapData: JSON.stringify(parsedData),
            };
        }
        catch (error) {
            this.adapter.catchError(error, "get_clean_record_map", duid);
            return null;
        }
    }
    async getCleanSummary(handler, duid) {
        try {
            const cleaningAttributes = (await this.sendRequest(duid, "get_clean_summary", [], { priority: 0 }));
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
                    const cleaningRecordsJSON = [];
                    const recordsList = cleaningAttributes[cleaningAttribute];
                    for (const cleaningRecord in recordsList) {
                        const cleaningRecordID = recordsList[cleaningRecord];
                        const cleaningRecordAttributesArr = (await this.sendRequest(duid, "get_clean_record", [cleaningRecordID], { priority: 0 }));
                        const cleaningRecordAttributes = cleaningRecordAttributesArr[0];
                        cleaningRecordsJSON[cleaningRecord] = cleaningRecordAttributes;
                        for (const cleaningRecordAttribute in cleaningRecordAttributes) {
                            const mappedRecordAttribute = mappedCleaningRecordAttribute[cleaningRecordAttribute] || cleaningRecordAttribute;
                            const cleaningRecordCommon = handler.getCommonCleaningRecords(mappedRecordAttribute) || {}; // Ensure object
                            const val = this.calculateRecordValue(mappedRecordAttribute, cleaningRecordAttributes[cleaningRecordAttribute]);
                            // Set type based on the calculated value's type
                            cleaningRecordCommon.type = typeof val;
                            await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, cleaningRecordCommon);
                            await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, {
                                val: val,
                                ack: true,
                            });
                        }
                        if (this.adapter.config.enable_map_creation == true) {
                            const mapArray = await this.getCleaningRecordMap(duid, recordsList[cleaningRecord]);
                            if (mapArray) {
                                // We only save the 3 maps relevant to history states
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
                    const objectString = `Devices.${duid}.cleaningInfo.JSON`;
                    await this.adapter.ensureState(objectString, { name: "cleaningInfoJSON", type: "string", def: "json", write: false });
                    await this.adapter.setStateAsync(`Devices.${duid}.cleaningInfo.JSON`, { val: JSON.stringify(cleaningRecordsJSON), ack: true });
                }
            }
        }
        catch (error) {
            this.adapter.catchError(error, "get_clean_summary", duid);
        }
    }
    getDockingStationStatus(dss) {
        if (dss === undefined)
            return null;
        return {
            cleanFluidStatus: (dss >> 10) & 0b11,
            waterBoxFilterStatus: (dss >> 8) & 0b11,
            dustBagStatus: (dss >> 6) & 0b11,
            dirtyWaterBoxStatus: (dss >> 4) & 0b11,
            clearWaterBoxStatus: (dss >> 2) & 0b11,
            isUpdownWaterReady: dss & 0b11,
        };
    }
    async getParameter(handler, duid, parameter, attribute) {
        try {
            const value = await this.sendRequest(duid, parameter, attribute, { priority: 0 });
            if (!value) {
                this.adapter.log.debug(`No value received for ${parameter} on ${duid}.`);
                return;
            }
            this.adapter.log.debug(`Received value for ${parameter} on ${duid}: ${JSON.stringify(value).slice(0, 100)}...}`);
            switch (parameter) {
                case "get_network_info":
                    await this.handleGetNetworkInfo(duid, value);
                    break;
                case "get_consumable":
                    await this.handleGetConsumable(handler, duid, value);
                    break;
                case "get_prop":
                    await this.handleGetProp(handler, duid, value, attribute);
                    break;
                case "get_room_mapping":
                    await this.handleGetRoomMapping(duid, value);
                    break;
                case "get_multi_maps_list":
                    await this.handleGetMultiMapsList(duid, value);
                    break;
                case "get_fw_features":
                    await this.handleGetFwFeatures(handler, duid, value);
                    break;
                case "get_photo":
                    return await this.handleGetPhoto(duid, value);
                case "app_get_dryer_setting": {
                    const val = value;
                    if (val && val.on && typeof val.on === "object" && "dry_time" in val.on && "status" in val) {
                        const actualVal = JSON.stringify({ on: { dry_time: val.on.dry_time }, status: val.status });
                        await this.adapter.setStateAsync(`Devices.${duid}.commands.${parameter.replace("get", "set")}`, { val: actualVal, ack: true });
                    }
                    else {
                        this.adapter.log.warn(`Unexpected value structure for ${parameter}: ${JSON.stringify(value)}`);
                    }
                    break;
                }
                case "get_timer":
                case "get_server_timer":
                    this.adapter.log.debug(`[getParameter] Received timers (get_timer/get_server_timer), ignoring value.`);
                    break;
                default:
                    if (parameterFolders[parameter]) {
                        const mode = parameter.substring(4);
                        const targetFolder = parameterFolders[parameter];
                        let valToSave = Array.isArray(value) ? value[0] : value;
                        if (typeof valToSave == "object")
                            valToSave = JSON.stringify(valToSave);
                        await this.adapter.ensureState(`Devices.${duid}.${targetFolder}.${mode}`, {});
                        await this.adapter.setStateChangedAsync(`Devices.${duid}.${targetFolder}.${mode}`, { val: valToSave, ack: true });
                    }
                    else {
                        if (typeof value == "object") {
                            if (typeof value[0] != "number") {
                                this.adapter.catchError(`Unknown parameter: ${JSON.stringify(value)}`, parameter, duid);
                            }
                        }
                        else {
                            this.adapter.catchError(`Unknown parameter: ${value}`, parameter, duid);
                        }
                    }
            }
            return value;
        }
        catch (error) {
            this.adapter.catchError(error, parameter, duid);
            throw error;
        }
    }
    // --- Refactored Handlers ---
    async handleGetNetworkInfo(duid, value) {
        const localDevice = this.adapter.local_api.localDevices[duid];
        for (const attribute in value) {
            if (attribute == "ip" && value[attribute] && !localDevice) {
                this.adapter.log.info(`[get_network_info] Adding device ${duid} @ ${value[attribute]} to local devices (missed by UDP).`);
                this.adapter.local_api.localDevices[duid] = { ip: value[attribute], version: "1.0" };
            }
            await this.adapter.ensureState(`Devices.${duid}.networkInfo.${attribute}`, { type: "string" });
            await this.adapter.setStateChangedAsync(`Devices.${duid}.networkInfo.${attribute}`, { val: value[attribute], ack: true });
        }
    }
    async handleGetConsumable(handler, duid, value) {
        const consumables = value[0];
        for (const consumable in consumables) {
            const commonConsumable = handler.getCommonConsumable(consumable) || {}; // Ensure object
            const val = commonConsumable && commonConsumable.unit == "h" ? Math.round(consumables[consumable] / (60 * 60)) : consumables[consumable];
            // Ensure type is number
            commonConsumable.type = "number";
            // Use extendObject to force type update if it was previously a string
            await this.adapter.extendObjectAsync(`Devices.${duid}.consumables.${consumable}`, {
                type: "state",
                common: commonConsumable,
                native: {},
            });
            await this.adapter.setStateChangedAsync(`Devices.${duid}.consumables.${consumable}`, { val: val, ack: true });
            if (handler.isResetableConsumable(consumable)) {
                await this.adapter.ensureState(`Devices.${duid}.resetConsumables.${consumable}`, {
                    type: "boolean",
                    write: true,
                    role: "button",
                    def: false,
                });
                await this.adapter.setStateAsync(`Devices.${duid}.resetConsumables.${consumable}`, { val: false, ack: true });
            }
        }
    }
    async handleGetProp(handler, duid, value, attribute) {
        if (!Array.isArray(attribute) || attribute[0] !== "get_status") {
            return;
        }
        const statusData = value[0];
        for (const attr in statusData) {
            let val = statusData[attr];
            if (typeof val == "object")
                val = JSON.stringify(val);
            const commonDeviceStates = handler.getCommonDeviceStates(attr) || {};
            switch (attr) {
                case "dock_type":
                    handler.processDockType(val);
                    break;
                case "dss":
                    try {
                        const dssStatus = this.getDockingStationStatus(val);
                        if (dssStatus) {
                            const dockStates = ["cleanFluidStatus", "waterBoxFilterStatus", "dustBagStatus", "dirtyWaterBoxStatus", "clearWaterBoxStatus", "isUpdownWaterReady"];
                            for (const state of dockStates) {
                                const path = `Devices.${duid}.dockingStationStatus.${state}`;
                                await this.adapter.ensureState(path, { type: "number", role: "value", read: true, write: false, states: { 0: "UNKNOWN", 1: "ERROR", 2: "OK" } });
                                const dssVal = dssStatus[state];
                                if (dssVal !== undefined)
                                    await this.adapter.setStateChangedAsync(path, { val: parseInt(dssVal), ack: true });
                            }
                        }
                    }
                    catch (e) {
                        this.adapter.log.error(`Error processing DSS for ${duid} with val ${val}: ${e}`);
                    }
                    break;
                case "map_status": {
                    // Use block scope
                    const rawMapStatus = Number(val);
                    const selectedMap = rawMapStatus >> 2; // Bitwise shift
                    val = selectedMap; // Overwrite 'val' to save the calculated map ID
                    const mapCount = await this.adapter.getStateAsync(`Devices.${duid}.floors.multi_map_count`);
                    if (mapCount && typeof mapCount.val === "number" && mapCount.val > 1) {
                        const mapFromCommand = await this.adapter.getStateAsync(`Devices.${duid}.commands.load_multi_map`);
                        if (mapFromCommand && mapFromCommand.val != selectedMap) {
                            await this.adapter.setStateAsync(`Devices.${duid}.commands.load_multi_map`, selectedMap, true);
                            if (!this.adapter.isInitializing) {
                                this.getMap(handler, duid).catch(() => { });
                            }
                        }
                    }
                    break;
                }
                case "state":
                    const isCleaning = await this.isCleaning(duid);
                    if (this.adapter.socket && isCleaning) {
                        this.adapter.socket.send(JSON.stringify({ duid: duid, command: "get_status", parameters: { isCleaning: isCleaning } }));
                    }
                    break;
                case "last_clean_t":
                    val = new Date(val * 1000).toString();
                    break;
                case "clean_time":
                    val = Math.round(val / 60);
                    break;
                case "clean_area":
                    val = Number((val / 1000000).toFixed(2));
                    break;
            }
            // Dynamically set type based on value
            if (attr === "last_clean_t") {
                commonDeviceStates.type = "string";
            }
            else {
                commonDeviceStates.type = typeof val;
            }
            await this.adapter.ensureState(`Devices.${duid}.deviceStatus.${attr}`, commonDeviceStates);
            await this.adapter.setStateChangedAsync(`Devices.${duid}.deviceStatus.${attr}`, { val: val, ack: true });
        }
    }
    async handleGetRoomMapping(duid, value) {
        const selectedMap = await this.getSelectedMap(duid);
        if (selectedMap != null) {
            const roomIDs = this.adapter.http_api.getMatchedRoomIDs();
            if (Array.isArray(value)) {
                value.map(async ([shortID, roomID]) => {
                    const room = roomIDs.find((r) => r.id.toString() === roomID);
                    const roomName = room?.name || "unknown";
                    await this.adapter.ensureState(`Devices.${duid}.floors.${selectedMap}.${shortID}`, { name: roomName, type: "boolean", def: true, write: true });
                });
            }
            await this.adapter.ensureState(`Devices.${duid}.floors.cleanCount`, { name: "Clean count", type: "number", def: 1, read: true, write: true });
        }
    }
    async handleGetMultiMapsList(duid, value) {
        const mapInfo = value[0].map_info;
        const maps = {}; // Use Record for states
        for (const mapParameter in value[0]) {
            if (typeof value[0][mapParameter] === "number") {
                await this.adapter.ensureState(`Devices.${duid}.floors.${mapParameter}`, { type: "number" });
                await this.adapter.setStateChangedAsync(`Devices.${duid}.floors.${mapParameter}`, { val: value[0][mapParameter], ack: true });
            }
        }
        for (const map in mapInfo) {
            const roomFloor = mapInfo[map]["mapFlag"];
            const mapName = mapInfo[map]["name"];
            maps[roomFloor] = mapName;
            this.adapter.setObject(`Devices.${duid}.floors.${roomFloor}`, {
                type: "folder",
                common: { name: mapName },
                native: {},
            });
        }
        if (value[0]["max_multi_map"] > 1) {
            await this.adapter.ensureState(`Devices.${duid}.commands.load_multi_map`, { name: "Load map", type: "number", def: 0, write: true, states: maps });
        }
        else {
            this.adapter.delObjectAsync(`Devices.${duid}.commands.load_multi_map`);
        }
    }
    async handleGetFwFeatures(handler, duid, value) {
        this.adapter.http_api.storeFwFeaturesResult(duid, value);
        for (const firmwareFeature in value) {
            const featureID = value[firmwareFeature];
            const featureName = handler.getFirmwareFeatureName(featureID);
            if (typeof handler[featureName] === "function") {
                handler[featureName](duid);
            }
            await this.adapter.ensureState(`Devices.${duid}.firmwareFeatures.${firmwareFeature}`, { type: "string" });
            await this.adapter.setStateChangedAsync(`Devices.${duid}.firmwareFeatures.${firmwareFeature}`, { val: featureName, ack: true });
        }
    }
    async handleGetPhoto(duid, value) {
        if (Buffer.isBuffer(value)) {
            if (this.isGZIP(value)) {
                this.adapter.log.debug(`gzipped photo found.`);
                try {
                    const photoData = await gunzipAsync(value);
                    const extractedPhoto = this.extractPhoto(photoData);
                    if (extractedPhoto) {
                        const photoResponse = { image: `data:image/jpeg;base64,${extractedPhoto.toString("base64")}` };
                        this.adapter.log.debug(`photoResponse: ${photoResponse.image.substring(0, 40)}...`);
                        return photoResponse;
                    }
                    else {
                        this.adapter.log.warn(`Could not extract photo from data for ${duid}.`);
                        throw new Error("Could not extract photo from data");
                    }
                }
                catch (error) {
                    this.adapter.catchError(error, "get_photo (unzip)", duid);
                    throw error;
                }
            }
            else {
                this.adapter.log.warn(`Received get_photo but data was not gzipped for ${duid}.`);
                throw new Error("Photo data not gzipped");
            }
        }
        return null;
    }
    async command(handler, duid, parameter, value) {
        try {
            const priority = 1;
            switch (parameter) {
                case "load_multi_map": {
                    const result = await this.sendRequest(duid, "load_multi_map", value, { priority });
                    if (Array.isArray(result) && result[0] == "ok") {
                        await this.getMap(handler, duid).then(async () => {
                            await this.getParameter(handler, duid, "get_room_mapping", []);
                        });
                    }
                    break;
                }
                case "app_segment_clean": {
                    this.adapter.log.debug("Starting room cleaning");
                    const roomList = { segments: [] };
                    const roomFloor = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.map_status`);
                    const mappedRoomList = await this.getParameter(handler, duid, "get_room_mapping", []);
                    if (mappedRoomList && roomFloor && roomFloor.val != null) {
                        for (const mappedRoom in mappedRoomList) {
                            const roomState = await this.adapter.getStateAsync(`Devices.${duid}.floors.${roomFloor.val}.${mappedRoomList[mappedRoom][0]}`);
                            if (roomState && roomState.val) {
                                roomList.segments.push(mappedRoomList[mappedRoom][0]);
                            }
                        }
                    }
                    const cleanCount = await this.adapter.getStateAsync(`Devices.${duid}.floors.cleanCount`);
                    roomList["repeat"] = typeof cleanCount?.val === "number" ? cleanCount.val : 1;
                    const result = await this.sendRequest(duid, "app_segment_clean", [roomList], { priority });
                    this.adapter.log.debug(`app_segment_clean with roomIDs: ${JSON.stringify(roomList)} result: ${result}`);
                    this.adapter.setStateAsync(`Devices.${duid}.floors.cleanCount`, { val: 1, ack: true });
                    break;
                }
                case "reset_consumable":
                    await this.sendRequest(duid, parameter, [value], { priority });
                    this.adapter.log.info(`Consumable ${parameter} successfully reset.`);
                    break;
                case "app_set_dryer_status": {
                    const result = await this.sendRequest(duid, parameter, JSON.parse(value), { priority });
                    this.adapter.log.debug(`Command: ${parameter} result: ${result}`);
                    break;
                }
                case "app_goto_target":
                case "app_zoned_clean": {
                    const result = await this.sendRequest(duid, parameter, value, { priority });
                    this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(value)} result: ${result}`);
                    break;
                }
                case "set_water_box_distance_off": {
                    const mappedValue = ((value - 1) / (30 - 1)) * (60 - 205) + 205;
                    const parameterValue = { distance_off: mappedValue };
                    const result = await this.sendRequest(duid, parameter, parameterValue, { priority });
                    this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(parameterValue)} result: ${result}`);
                    break;
                }
                default:
                    if (value !== undefined) {
                        let valueToSend = value;
                        const valueType = typeof value;
                        if (valueType === "string") {
                            try {
                                valueToSend = JSON.parse(value);
                            }
                            catch (e) {
                                // If parsing fails, treat as a regular string
                                valueToSend = value;
                            }
                        }
                        // Ensure valueToSend is an array if it's a primitive or object, unless it's already an array
                        // Many Roborock commands expect parameters as an array [param1, param2]
                        if (!Array.isArray(valueToSend)) {
                            valueToSend = [valueToSend];
                        }
                        const result = await this.sendRequest(duid, parameter, valueToSend, { priority });
                        this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(valueToSend)} result: ${result}`);
                        // If it was a set command, try to update the corresponding get command
                        if (parameter.startsWith("set_")) {
                            const getCommand = parameter.replace("set_", "get_");
                            // We don't await this to avoid blocking
                            this.getParameter(handler, duid, getCommand, []).catch(() => { });
                        }
                    }
                    else {
                        const result = await this.sendRequest(duid, parameter, [], { priority });
                        this.adapter.log.debug(`Command: ${parameter} result: ${result}`);
                    }
            }
        }
        catch (error) {
            this.adapter.catchError(error, parameter, duid);
        }
    }
    async getMap(handler, duid) {
        if (this.adapter.config.enable_map_creation) {
            this.adapter.log.debug(`Requesting new map for ${duid}`);
            try {
                let mapBuf = await this.sendRequest(duid, "get_map_v1", [], { priority: 0 });
                let retries = 0;
                while (!Buffer.isBuffer(mapBuf) && Array.isArray(mapBuf) && mapBuf[0] === "retry" && retries < 3) {
                    retries++;
                    this.adapter.log.debug(`[getMap] Received 'retry' for ${duid}. Retrying (${retries}/3)...`);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    mapBuf = await this.sendRequest(duid, "get_map_v1", [], { priority: 0 });
                }
                if (!Buffer.isBuffer(mapBuf)) {
                    if (Array.isArray(mapBuf) && mapBuf[0] === "retry") {
                        this.adapter.log.debug(`[getMap] Received 'retry' for ${duid}. Map not ready after 3 retries.`);
                        return;
                    }
                    this.adapter.log.warn(`[getMap] Received non-buffer data (e.g. 'retry' or 'ok'): ${JSON.stringify(mapBuf)}`);
                    return;
                }
                const mappedRooms = await this.getParameter(handler, duid, "get_room_mapping", []);
                const parsedData = (await this.mapParser.parsedata(mapBuf, mappedRooms, { isHistoryMap: false }));
                if (parsedData?.metaData) {
                    this.adapter.log.info(`[getMap] Parsed LIVE map. MapIndex (Floor): ${parsedData.metaData.map_index}, Segments: ${parsedData.IMAGE?.segments?.list?.length || 0}`);
                }
                else {
                    this.adapter.log.warn(`[getMap] Live map was parsed but contains no metaData.`);
                }
                const selectedMap = await this.getSelectedMap(duid);
                if (selectedMap != null) {
                    this.adapter.log.debug(`Generating map for selected map ${selectedMap} for duid ${duid}`);
                    if (!parsedData || !parsedData.IMAGE || !parsedData.IMAGE.dimensions) {
                        this.adapter.log.warn(`[getMap] Skipping map generation for ${duid}: Parsed data is invalid or missing IMAGE block.`);
                        return;
                    }
                    const dims = parsedData.IMAGE.dimensions;
                    this.adapter.log.debug(`[getMap] Calling canvasMap for ${duid} with dimensions: w=${dims.width}, h=${dims.height}`);
                    if (dims.width <= 0 || dims.height <= 0) {
                        this.adapter.log.warn(`[getMap] Skipping map generation for ${duid}: Invalid map dimensions (w=${dims.width}, h=${dims.height}). Map is likely empty.`);
                        return;
                    }
                    const [mapBase64CleanUncropped, mapBase64Full, mapBase64Truncated] = await this.mapCreator.canvasMap(parsedData, {
                        selectedMap: selectedMap,
                        mappedRooms: mappedRooms, // Pass rooms to mapCreator (it still needs them for 'isCurrentlyCleaned')
                    });
                    await this.adapter.ensureFolder(`Devices.${duid}.map`);
                    // 1. The new CLEAN map (Uncropped) for the Web UI (using your preferred name)
                    await this.adapter.ensureState(`Devices.${duid}.map.mapBase64Clean`, {
                        name: "Map Image (Clean, Uncropped)",
                        type: "string",
                        role: "text.png",
                        read: true,
                        write: false,
                    });
                    await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64Clean`, { val: mapBase64CleanUncropped, ack: true });
                    // 2. The FULL map (Uncropped) - existing state
                    await this.adapter.ensureState(`Devices.${duid}.map.mapBase64`, {
                        name: "Map Image (Full, Uncropped)",
                        type: "string",
                        role: "text.png",
                        read: true,
                        write: false,
                    });
                    await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64`, { val: mapBase64Full, ack: true });
                    // 3. The FULL map (Cropped) - existing state
                    await this.adapter.ensureState(`Devices.${duid}.map.mapBase64Truncated`, {
                        name: "Map Image (Full, Cropped)",
                        type: "string",
                        role: "text.png",
                        read: true,
                        write: false,
                    });
                    await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64Truncated`, { val: mapBase64Truncated, ack: true });
                    // 4. The JSON Data (now with room names)
                    await this.adapter.ensureState(`Devices.${duid}.map.mapData`, { name: "Map Data JSON", type: "string", role: "json", read: true, write: false });
                    await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapData`, { val: JSON.stringify(parsedData), ack: true });
                }
                else {
                    this.adapter.log.warn(`[getMap] Skipping map generation for ${duid} because selectedMap is null. (map_status state not yet available?)`);
                }
            }
            catch (error) {
                this.adapter.log.error(`Error getting map for ${duid}: ${error?.stack || error}`);
            }
        }
    }
    // --- Helpers & Core Logic ---
    async isCleaning(duid) {
        if (!duid) {
            this.adapter.log.error("duid parameter missing on function isCleaning");
            return false;
        }
        const cleaningState = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.state`);
        if (!cleaningState || cleaningState.val === null || cleaningState.val === undefined)
            return false;
        const stateVal = Number(cleaningState.val);
        switch (stateVal) {
            case 4:
            case 5:
            case 6:
            case 7:
            case 11:
            case 15:
            case 16:
            case 17:
            case 18:
            case 26:
                return true;
            default:
                return false;
        }
    }
    /**
     * Gets the currently selected map ID (floor) from the ioBroker state.
     * This is more robust than relying on the cache, which might not be initialized.
     * @param duid The device DUID
     * @returns The map ID (number) or null if not found.
     */
    async getSelectedMap(duid) {
        if (!duid) {
            this.adapter.log.error("duid parameter missing on function getSelectedMap");
            return null;
        }
        try {
            // Read the map_status from the persistent ioBroker state
            const mapStatusState = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.map_status`);
            // Check if the state exists and has a valid value
            if (mapStatusState && mapStatusState.val !== null && mapStatusState.val !== undefined) {
                const mapStatus = Number(mapStatusState.val);
                // Bitwise right shift to obtain the selected map
                // This logic comes from handleGetProp, where the calculated value is stored.
                return mapStatus;
            }
            else {
                this.adapter.log.warn(`[getSelectedMap] Could not read map_status state for ${duid}. State is null or undefined. Map generation might be skipped.`);
                return null;
            }
        }
        catch (error) {
            this.adapter.log.error(`[getSelectedMap] Error reading state for ${duid}: ${error.message}`);
            return null;
        }
    }
    isCloudRequest(duid, method) {
        const cloudOnlyMethods = ["get_map_v1", "get_clean_record_map", "get_photo", "get_network_info"];
        return cloudOnlyMethods.includes(method) || this.adapter.requestsHandler.isCloudDevice(duid);
    }
    async sendRequest(duid, method, params, options = {}) {
        const queue = this.getQueue(duid);
        return queue.add(() => this._performRequest(duid, method, params), {
            priority: options.priority || 0,
        });
    }
    async _performRequest(duid, method, params) {
        const remoteConnection = await this.isCloudDevice(duid);
        let protocol = 101;
        const version = await this.adapter.getDeviceProtocolVersion(duid);
        this.idCounter = this.idCounter > 9999 ? 1 : this.idCounter + 1;
        const messageID = method === "get_photo" ? ((this.idCounter - 1) % 256) + 1 : this.idCounter;
        const timestamp = Math.floor(Date.now() / 1000);
        if (!this.isCloudRequest(duid, method)) {
            protocol = 4;
        }
        const payload = await this.messageParser.buildPayload(duid, protocol, messageID, method, params, version);
        const roborockMessage = await this.messageParser.buildRoborockMessage(duid, protocol, timestamp, payload, version);
        const mqttConnectionState = this.adapter.mqtt_api.isConnected();
        const localConnectionState = this.adapter.local_api.isConnected(duid);
        if (!roborockMessage) {
            this.adapter.catchError("Failed to build buildRoborockMessage!", "function sendRequest", duid);
            return Promise.reject("Failed to build buildRoborockMessage!");
        }
        if (version == "A01") {
            this.adapter.mqtt_api.sendMessage(duid, roborockMessage);
            return Promise.resolve();
        }
        this.adapter.log.debug(`duid: ${duid}, mqtt: ${mqttConnectionState}, local: ${localConnectionState}, remote: ${remoteConnection}`);
        return new Promise((resolve, reject) => {
            if (!mqttConnectionState && remoteConnection) {
                this.adapter.pendingRequests.delete(messageID);
                const errorMsg = `Cloud connection not available. Not sending for method ${method} request!`;
                this.adapter.log.debug(errorMsg);
                return reject(new Error(errorMsg));
            }
            else if (!localConnectionState && !mqttConnectionState && method != "get_network_info") {
                this.adapter.pendingRequests.delete(messageID);
                const errorMsg = `Adapter locally or remotely not connected to robot ${duid}. Sending request for ${method} not possible!`;
                this.adapter.log.debug(errorMsg);
                return reject(new Error(errorMsg));
            }
            else {
                const timeout = this.adapter.setTimeout(() => {
                    this.adapter.pendingRequests.delete(messageID);
                    this.adapter.local_api.clearChunkBuffer(duid);
                    if (remoteConnection) {
                        reject(new Error(`Cloud request with id ${messageID} and method ${method} timed out after 30 seconds.`));
                    }
                    else {
                        reject(new Error(`Local request with id ${messageID} and method ${method} timed out after 30 seconds.`));
                    }
                }, REQUEST_TIMEOUT);
                this.adapter.pendingRequests.set(messageID, { method, resolve, reject, timeout });
                if (this.isCloudRequest(duid, method) || !localConnectionState) {
                    this.adapter.mqtt_api.sendMessage(duid, roborockMessage);
                    this.adapter.log.debug(`Sent payload for ${duid} with ${payload} using cloud connection using version ${version}`);
                }
                else {
                    const lengthBuffer = Buffer.alloc(4);
                    lengthBuffer.writeUInt32BE(roborockMessage.length, 0);
                    const fullMessage = Buffer.concat([lengthBuffer, roborockMessage]);
                    this.adapter.local_api.sendMessage(duid, fullMessage);
                    this.adapter.log.debug(`Sent payload for ${duid} with ${payload} using local connection using version ${version}`);
                }
            }
        });
    }
    resolvePendingRequest(id, result, protocol) {
        const entry = this.adapter.pendingRequests?.get(id);
        if (entry) {
            if (entry.timeout)
                this.adapter.clearTimeout(entry.timeout);
            this.adapter.pendingRequests.delete(id);
            entry.resolve(result);
            this.adapter.log.debug(`Successfully resolved request id ${id} using protocol: ${protocol}. Size of message queue: ${this.adapter.pendingRequests.size}`);
        }
    }
    async isCloudDevice(duid) {
        const receivedDevices = this.adapter.http_api.getReceivedDevices();
        const sharedDevice = receivedDevices.find((device) => device.duid == duid);
        const cloudDevice = this.adapter.local_api.cloudDevices.has(duid);
        return !!(sharedDevice || cloudDevice);
    }
    async getConnector(duid) {
        const isRemote = await this.isCloudDevice(duid);
        if (isRemote)
            return this.adapter.mqtt_api;
        return this.adapter.local_api;
    }
    calculateCleaningValue(attribute, value) {
        switch (attribute) {
            case "clean_time":
                return Math.round(value / 60 / 60);
            case "clean_area":
                return Number((value / 1000 / 1000).toFixed(2));
            default:
                return value;
        }
    }
    calculateRecordValue(attribute, value) {
        switch (attribute) {
            case "begin":
            case "end":
                return new Date(value * 1000).toString();
            case "duration":
                return Math.round(value / 60);
            case "area":
            case "cleaned_area":
                return Number((value / 1000 / 1000).toFixed(2));
            default:
                return value;
        }
    }
    unzipBuffer(buffer, callback) {
        zlib_1.default.gunzip(buffer, (err, result) => {
            if (err)
                callback(err);
            else
                callback(null, result);
        });
    }
    unzipBufferAsync(buffer) {
        return new Promise((resolve, reject) => {
            this.unzipBuffer(buffer, (error, photoData) => {
                if (error)
                    reject(error);
                else
                    resolve(photoData);
            });
        });
    }
    isGZIP(buffer) {
        if (buffer.length < 2)
            return false;
        if (buffer[0] == 31 && buffer[1] == 139)
            return true;
        return false;
    }
    extractPhoto(buffer) {
        if (buffer.length < 10)
            return false;
        if (buffer[26] == 74 && buffer[27] == 70 && buffer[28] == 73 && buffer[29] == 70) {
            return buffer.slice(20);
        }
        else if (buffer[42] == 74 && buffer[43] == 70 && buffer[44] == 73 && buffer[45] == 70) {
            return buffer.slice(36);
        }
        return false;
    }
    clearQueue() {
        this.adapter.local_api.clearLocalDevicedTimeout();
        this.adapter.mqtt_api.clearIntervals();
        // Clear map-based queues
        this.deviceQueues.forEach((q) => q.clear());
        this.deviceQueues.clear();
        // Clear pending request timeouts
        this.adapter.pendingRequests.forEach((req) => {
            if (req.timeout)
                this.adapter.clearTimeout(req.timeout);
        });
        this.adapter.pendingRequests.clear();
    }
}
exports.requestsHandler = requestsHandler;
//# sourceMappingURL=requestsHandler.js.map