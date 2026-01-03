"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapManager = void 0;
const MapParser_1 = require("./v1/MapParser");
const MapBuilder_1 = require("./v1/MapBuilder");
const MapDecryptor_1 = require("./v1/MapDecryptor");
const MapParser_2 = require("./b01/MapParser");
const MapBuilder_2 = require("./b01/MapBuilder");
class MapManager {
    adapter;
    parserV1;
    builderV1;
    parserB01;
    builderB01;
    constructor(adapter) {
        this.adapter = adapter;
        this.parserV1 = new MapParser_1.MapParser(adapter);
        this.builderV1 = new MapBuilder_1.MapBuilder(adapter);
        this.parserB01 = new MapParser_2.MapParser(adapter);
        this.builderB01 = new MapBuilder_2.MapBuilder(adapter);
    }
    /**
     * Processes raw map data and returns a generated map buffer.
     * @param rawData The raw buffer from the robot (Protocol 301).
     * @param version The protocol version string (e.g., "B01" or "1.0").
     * @param model The robot model (used for key derivation/assets).
     * @param serial The robot serial (used for key derivation).
     * @param mappedRooms Optional room mapping for V1.
     */
    async processMap(rawData, version, model, serial, mappedRooms, duid, connectionType = "Unknown", deviceStatus) {
        try {
            // Robust device status retrieval if not provided
            if (version === "B01" && !deviceStatus && duid) {
                deviceStatus = await this.getDeviceStatusForB01(duid);
            }
            const startTime = Date.now();
            this.adapter.rLog("MapManager", duid || null, "Info", version, 301, `Processing B01 map... Input Size: ${rawData.length}, Model: ${model}`, "debug");
            if (version === "B01") {
                const mapData = this.parserB01.parse(rawData, serial, model, duid || "", connectionType);
                if (mapData) {
                    this.adapter.rLog(connectionType, duid || "unknown", "Info", version, 301, `B01 Parse Result -> Header: ${JSON.stringify(mapData.header)}, GridLen: ${mapData.mapGrid?.length}, Rooms: ${mapData.rooms?.length}`, "info");
                    const mapBuf = await this.builderB01.buildMap(mapData, model, duid, deviceStatus);
                    const duration = Date.now() - startTime;
                    this.adapter.rLog("MapManager", duid || null, "Info", version, 301, `B01 Map Built. Buffer Size: ${mapBuf.length}. Duration: ${duration}ms`, "debug");
                    const mapBase64 = "data:image/png;base64," + mapBuf.toString("base64");
                    return {
                        mapBase64: mapBase64,
                        mapBase64Clean: mapBase64, // Reuse same map for clean view for now
                        mapData: mapData
                    };
                }
                else {
                    this.adapter.rLog("MapManager", duid || null, "Info", version, 301, `B01 Parser returned NULL.`, "debug");
                }
            }
            else {
                // V1 Handling with MapDecryptor (GZIP)
                const mapBuf = await MapDecryptor_1.MapDecryptor.decrypt(rawData);
                if (!mapBuf) {
                    this.adapter.rLog("MapManager", duid || null, "Error", version, 301, `Failed to unzip V1 map data`, "error");
                    return null;
                }
                // V1 parser returns ParsedMapData OR empty object
                const mapData = await this.parserV1.parsedata(mapBuf, mappedRooms);
                if (mapData && Object.keys(mapData).length > 0) {
                    // Legacy MapCreator returns [clean, full]
                    // We cast builderV1 to any to avoid type issues if CanvasMap isn't explicitly typed in class definition yet
                    const [mapBase64Clean, mapBase64] = await this.builderV1.canvasMap(mapData, { mappedRooms, model });
                    return {
                        mapBase64: mapBase64,
                        mapBase64Clean: mapBase64Clean,
                        mapData: mapData
                    };
                }
            }
        }
        catch (e) {
            this.adapter.rLog("MapManager", duid || null, "Error", version, 301, `Failed to process map (Version: ${version}): ${e.message}`, "error");
        }
        return null;
    }
    async getDeviceStatusForB01(duid) {
        const getVal = async (keys) => {
            for (const k of keys) {
                const s = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.${k}`);
                if (s && s.val !== undefined && s.val !== null)
                    return { val: s.val, source: k };
            }
            return undefined;
        };
        const stateObj = await getVal(["status", "state", "4"]);
        const workModeObj = await getVal(["work_mode", "workMode", "15"]);
        const cleanModeObj = await getVal(["mode", "cleanMode", "17"]);
        const dustCollectObj = await getVal(["dust_action", "dust_collection_status", "105"]);
        const faultObj = await getVal(["fault", "deviceFault", "18"]);
        // Log found properties for debugging
        if (stateObj)
            this.adapter.rLog("MapManager", duid, "Debug", "B01", undefined, `Status found in '${stateObj.source}': ${stateObj.val}`);
        if (faultObj && Number(faultObj.val) !== 0)
            this.adapter.rLog("MapManager", duid, "Debug", "B01", undefined, `Fault found in '${faultObj.source}': ${faultObj.val}`);
        return {
            deviceState: stateObj ? Number(stateObj.val) : 0,
            deviceWorkMode: workModeObj ? Number(workModeObj.val) : 0,
            deviceCleanMode: cleanModeObj ? Number(cleanModeObj.val) : 0,
            isDustCollect: dustCollectObj ? (dustCollectObj.val === 1 || dustCollectObj.val === true || dustCollectObj.val === "1") : false,
            deviceFault: faultObj ? Number(faultObj.val) : 0
        };
    }
}
exports.MapManager = MapManager;
//# sourceMappingURL=MapManager.js.map