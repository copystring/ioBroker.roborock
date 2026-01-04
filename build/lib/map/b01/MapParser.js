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
exports.MapParser = void 0;
const protobuf = __importStar(require("protobufjs"));
const GridBeautifier_1 = require("./GridBeautifier");
const MapDecryptor_1 = require("./MapDecryptor");
const MapHelper = __importStar(require("../MapHelper"));
const roborock_proto_1 = require("./roborock_proto");
const utils_1 = require("./utils");
class MapParser {
    adapter;
    protoRoot = null;
    RobotMapType = null;
    constructor(adapter) {
        this.adapter = adapter;
        try {
            this.protoRoot = protobuf.parse(roborock_proto_1.ROBOROCK_PROTO_STR).root;
            this.RobotMapType = this.protoRoot.lookupType("SCMap.RobotMap");
        }
        catch (e) {
            this.adapter.rLog("System", null, "Error", undefined, undefined, `Failed to parse Proto Schema: ${e.message}`, "error");
        }
    }
    parse(rawData, serial, model, duid, connectionType) {
        try {
            this.adapter.rLog(connectionType, duid, "Debug", "B01", 301, `[MapParser] smartDecrypt start. Serial: ${serial}, Model: ${model}. Data Len: ${rawData.length}`, "debug");
            const decrypted = this.smartDecrypt(rawData, serial, model, duid);
            if (!decrypted) {
                this.adapter.rLog(connectionType, duid, "Error", "B01", 301, "[MapParser] Pipeline failed to produce valid data.", "error");
                return null;
            }
            return this.parseProtobuf(decrypted, duid, connectionType);
        }
        catch (e) {
            this.adapter.rLog(connectionType, duid, "Error", "B01", 301, `[MapParser] Parse failed: ${e.message}`, "error");
            return null;
        }
    }
    /* Redundant methods removed - Moved to B01MapDecryptor */
    /**
     * Delegates decryption to the centralized B01MapDecryptor.
     */
    smartDecrypt(buf, serial, model, duid) {
        const localKey = this.adapter.http_api.getMatchedLocalKeys().get(duid);
        return MapDecryptor_1.MapDecryptor.decrypt(buf, serial, model, duid, this.adapter, localKey);
    }
    /* Helper methods removed - Moved to MapDecryptor */
    parseProtobuf(buffer, duid, connectionType) {
        const mapData = {
            header: { sizeX: 0, sizeY: 0, minX: 0, minY: 0, maxX: 0, maxY: 0, resolution: 0.05 },
            mapGrid: Buffer.alloc(0)
        };
        if (!this.RobotMapType)
            return mapData;
        try {
            const object = this.RobotMapType.decode(buffer);
            // Map Header
            if (object.mapHead) {
                mapData.header.sizeX = object.mapHead.sizeX || 0;
                mapData.header.sizeY = object.mapHead.sizeY || 0;
                mapData.header.minX = object.mapHead.minX || 0;
                mapData.header.minY = object.mapHead.minY || 0;
                mapData.header.maxX = object.mapHead.maxX || 0;
                mapData.header.maxY = object.mapHead.maxY || 0;
                mapData.header.resolution = object.mapHead.resolution || 0.05;
            }
            // Map Data (Grid)
            if (object.mapData && object.mapData.mapData) {
                let gridBytes = object.mapData.mapData;
                if (gridBytes.length > 2 && ((gridBytes[0] === 0x1f && gridBytes[1] === 0x8b) || gridBytes[0] === 0x78)) {
                    gridBytes = MapHelper.decompress(gridBytes);
                }
                mapData.mapGrid = Buffer.from(gridBytes);
            }
            // Positions
            if (object.chargeStation) {
                mapData.chargerPos = { x: object.chargeStation.x, y: object.chargeStation.y, phi: object.chargeStation.phi || 0 };
            }
            if (object.currentPose) {
                mapData.robotPos = { x: object.currentPose.x, y: object.currentPose.y, phi: object.currentPose.phi || 0 };
            }
            // Areas
            if (object.areasInfo) {
                mapData.areasInfo = object.areasInfo.map((a) => ({
                    status: a.status, type: a.type, areaIndex: a.areaIndex, points: a.points
                }));
            }
            if (object.virtualWalls) {
                mapData.virtualWalls = object.virtualWalls.map((v) => ({
                    status: v.status, type: v.type, areaIndex: v.areaIndex, points: v.points
                }));
            }
            if (object.recmForbitZone) {
                mapData.recmForbitZone = object.recmForbitZone.map((f) => ({
                    status: f.status, type: f.type, areaIndex: f.areaIndex, points: f.points
                }));
            }
            // Rooms
            if (object.roomDataInfo) {
                mapData.rooms = object.roomDataInfo.map((r) => ({
                    roomId: r.roomId, roomName: r.roomName, roomTypeId: r.roomTypeId, colorId: r.colorId,
                    labelPos: r.roomNamePost ? { x: r.roomNamePost.x, y: r.roomNamePost.y } : undefined
                }));
            }
            // Room Chain
            if (object.roomChain) {
                mapData.roomChain = object.roomChain.map((rc) => ({
                    roomId: rc.roomId,
                    points: rc.points ? rc.points.map((p) => ({ x: p.x, y: p.y, value: p.value })) : [],
                    door_info: rc.door_info ? rc.door_info.map((d) => ({
                        door_point: d.door_point ? d.door_point.map((dp) => ({ x: dp.x, y: dp.y })) : [],
                        area_id: d.area_id
                    })) : []
                }));
            }
            // History
            if (object.historyPose && object.historyPose.points) {
                mapData.history = object.historyPose.points.map((p) => ({ update: p.update, x: p.x, y: p.y }));
            }
            // Carpet
            if (object.carpetInfo) {
                mapData.carpetInfo = object.carpetInfo.map((c) => ({ id: c.id, points: c.points }));
            }
            this.beautifyMap(mapData);
            this.adapter.rLog(connectionType, duid, "Info", "B01", 301, `[MapParser] B01 Map Parsed Successfully. Header: ${JSON.stringify(mapData.header)}`, "info");
        }
        catch (e) {
            const hexDump = buffer.subarray(0, 32).toString("hex");
            this.adapter.rLog(connectionType, duid, "Warn", "B01", 301, `[MapParser] Protobuf decode failure: ${e.message}. Buffer Head: ${hexDump}, Len: ${buffer.length}`, "warn");
        }
        return mapData;
    }
    beautifyMap(mapData) {
        if (!mapData.mapGrid || mapData.mapGrid.length === 0)
            return;
        const tMapStruct = {
            map: new Int8Array(mapData.mapGrid),
            x_min: mapData.header.minX,
            x_max: mapData.header.maxX,
            y_min: mapData.header.minY,
            y_max: mapData.header.maxY,
            resolution: mapData.header.resolution,
            info: mapData.roomChain ? mapData.roomChain.map(rc => {
                const rInfo = mapData.rooms ? mapData.rooms.find(r => r.roomId === rc.roomId) : null;
                let center = { x: 0, y: 0 };
                if (rInfo && rInfo.labelPos) {
                    center = { x: rInfo.labelPos.x, y: rInfo.labelPos.y };
                }
                else if (rc.points && rc.points.length > 0) {
                    center = {
                        x: mapData.header.minX + (rc.points[0].x * mapData.header.resolution),
                        y: mapData.header.minY + (rc.points[0].y * mapData.header.resolution)
                    };
                }
                const rawChain = rc.points ? rc.points.map(p => ({ chain_point: { x: p.x, y: p.y } })) : [];
                return {
                    tid: rc.roomId,
                    center_pose: center,
                    chain_infor: (0, utils_1.interpolate)(rawChain),
                    door_info: rc.door_info ? rc.door_info.map(d => ({
                        door_point: d.door_point ? d.door_point.map(dp => ({ x: dp.x, y: dp.y })) : [],
                        area_id: d.area_id || []
                    })) : []
                };
            }) : null
        };
        const result = (0, GridBeautifier_1.beautify)(tMapStruct).result;
        if (result && result.length > 0) {
            mapData.mapGrid = Buffer.from(result);
        }
    }
}
exports.MapParser = MapParser;
//# sourceMappingURL=MapParser.js.map