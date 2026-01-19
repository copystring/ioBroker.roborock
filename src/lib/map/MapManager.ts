import type { Roborock } from "../../main";
import { MapBuilder as MapBuilderB01 } from "./b01/MapBuilder";
import { MapParser as MapParserB01 } from "./b01/MapParser";
import { B01DeviceStatus } from "./b01/types";
import { MapBuilder as MapBuilderV1 } from "./v1/MapBuilder";
import { MapDecryptor as MapDecryptorV1 } from "./v1/MapDecryptor";
import { MapParser as MapParserV1 } from "./v1/MapParser";

export class MapManager {
	private adapter: Roborock;
	private parserV1: MapParserV1;
	private builderV1: MapBuilderV1;
	private parserB01: MapParserB01;
	private builderB01: MapBuilderB01;

	constructor(adapter: Roborock) {
		this.adapter = adapter;
		this.parserV1 = new MapParserV1(adapter);
		this.builderV1 = new MapBuilderV1(adapter);
		this.parserB01 = new MapParserB01(adapter);
		this.builderB01 = new MapBuilderB01(adapter);
	}

	/**
     * Processes raw map data and returns a generated map buffer.
     * @param rawData The raw buffer from the robot (Protocol 301).
     * @param version The protocol version string (e.g., "B01" or "1.0").
     * @param model The robot model (used for key derivation/assets).
     * @param serial The robot serial (used for key derivation).
     * @param mappedRooms Optional room mapping for V1.
     */
	public async processMap(rawData: Buffer, version: string, model: string, serial: string, mappedRooms: any[] | null, duid?: string, connectionType: string = "Unknown", deviceStatus?: B01DeviceStatus): Promise<{ mapBase64: string, mapBase64Clean?: string, mapData?: any } | null> {
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
					this.adapter.rLog(connectionType as any, duid || "unknown", "Info", version, 301, `B01 Parse Result -> Header: ${JSON.stringify(mapData.header)}, GridLen: ${mapData.mapGrid?.length}, Rooms: ${mapData.rooms?.length}`, "info");

					const mapBuf = await this.builderB01.buildMap(mapData, model, duid, deviceStatus);
					const duration = Date.now() - startTime;
					this.adapter.rLog("MapManager", duid || null, "Info", version, 301, `B01 Map Built. Buffer Size: ${mapBuf.length}. Duration: ${duration}ms`, "debug");

					const mapBase64 = "data:image/png;base64," + mapBuf.toString("base64");
					return {
						mapBase64: mapBase64,
						mapBase64Clean: mapBase64, // Reuse same map for clean view for now
						mapData: mapData
					};
				} else {
					this.adapter.rLog("MapManager", duid || null, "Info", version, 301, `B01 Parser returned NULL.`, "debug");
				}
			} else {
				// V1 Handling with MapDecryptor (GZIP)
				const mapBuf = await MapDecryptorV1.decrypt(rawData);
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
		} catch (e: any) {
			this.adapter.rLog("MapManager", duid || null, "Error", version, 301, `Failed to process map (Version: ${version}): ${e.message}`, "error");
		}
		return null;
	}

	private async getDeviceStatusForB01(duid: string): Promise<B01DeviceStatus> {
		const getVal = async (keys: string[]): Promise<{ val: any, source: string } | undefined> => {
			for (const k of keys) {
				const s = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.${k}`);
				if (s && s.val !== undefined && s.val !== null) return { val: s.val, source: k };
			}
			return undefined;
		};

		const stateObj = await getVal(["status", "state", "4"]);
		const workModeObj = await getVal(["work_mode", "workMode", "15"]);
		const cleanModeObj = await getVal(["mode", "cleanMode", "17"]);
		const dustCollectObj = await getVal(["dust_action", "dust_collection_status", "105"]);
		const faultObj = await getVal(["fault", "deviceFault", "18"]);

		// Log found properties for debugging
		if (stateObj) this.adapter.rLog("MapManager", duid, "Debug", "B01", undefined, `Status found in '${stateObj.source}': ${stateObj.val}`);
		if (faultObj && Number(faultObj.val) !== 0) this.adapter.rLog("MapManager", duid, "Debug", "B01", undefined, `Fault found in '${faultObj.source}': ${faultObj.val}`);

		return {
			deviceState: stateObj ? Number(stateObj.val) : 0,
			deviceWorkMode: workModeObj ? Number(workModeObj.val) : 0,
			deviceCleanMode: cleanModeObj ? Number(cleanModeObj.val) : 0,
			isDustCollect: dustCollectObj ? (dustCollectObj.val === 1 || dustCollectObj.val === true || dustCollectObj.val === "1") : false,
			deviceFault: faultObj ? Number(faultObj.val) : 0
		};
	}
}
