import type { Roborock } from "../../main";
import { MapBuilder as MapBuilderB01 } from "./b01/MapBuilder";
import { MapParser as MapParserB01 } from "./b01/MapParser";
import { B01DeviceStatus } from "./b01/types";
import { MapBuilder as MapBuilderV1 } from "./v1/MapBuilder";
import { MapDecryptor as MapDecryptorV1 } from "./v1/MapDecryptor";
import { MapParser as MapParserV1 } from "./v1/MapParser";

export class MapManager {
	private adapter: Roborock;
	public mapParser: MapParserV1;
	public mapCreator: MapBuilderV1;
	private parserB01: MapParserB01;
	private builderB01: MapBuilderB01;

	constructor(adapter: Roborock) {
		this.adapter = adapter;
		this.mapParser = new MapParserV1(adapter);
		this.mapCreator = new MapBuilderV1(adapter);
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
     * @param currentMapIndex Optional floor index for V1; when set and mappedRooms empty, segment names are enriched from room states.
     */
	public async processMap(rawData: Buffer, version: string, model: string, serial: string, mappedRooms: any[] | null, duid?: string, connectionType: string = "Unknown", deviceStatus?: B01DeviceStatus, currentMapIndex?: number): Promise<{ mapBase64: string, mapBase64Clean?: string, mapData?: any } | null> {
		try {
			// Robust device status retrieval if not provided
			if (version === "B01" && !deviceStatus && duid) {
				deviceStatus = await this.getDeviceStatusForB01(duid);
			}

			if (version === "B01") {
				const mapData = this.parserB01.parse(rawData, serial, model, duid || "", connectionType);
				if (mapData && mapData.mapGrid && mapData.mapGrid.length > 0) {
					const expectedGridSize = mapData.header.sizeX * mapData.header.sizeY;
					// Only accept when grid length exactly matches header (real maps); reject wrong decryption, fragments, or non-map packets.
					if (expectedGridSize > 0 && mapData.mapGrid.length !== expectedGridSize) {
						this.adapter.rLog(connectionType as any, duid || "unknown", "Warn", version, 301, `B01 map rejected: grid size inconsistent with header (got ${mapData.mapGrid.length}, expected sizeX*sizeY=${expectedGridSize})`, "warn");
					} else {
						const mapBuf = await this.builderB01.buildMap(mapData, model, duid, deviceStatus);
						const mapBase64 = "data:image/png;base64," + mapBuf.toString("base64");
						return {
							mapBase64: mapBase64,
							mapBase64Clean: mapBase64, // Reuse same map for clean view for now
							mapData: mapData
						};
					}
				}
			} else {
				// V1 Handling with MapDecryptor (GZIP)
				const mapBuf = await MapDecryptorV1.decrypt(rawData);
				if (!mapBuf) {
					this.adapter.rLog("MapManager", duid || null, "Error", version, 301, `Failed to unzip V1 map data`, "error");
					return null;
				}

				// V1 parser returns ParsedMapData OR empty object
				const mapData = await this.mapParser.parsedata(mapBuf, mappedRooms, { isHistoryMap: false, duid: duid ?? undefined });

				// For cloud robots mappedRooms may be empty; enrich segment names from room states when possible
				if (mapData && Object.keys(mapData).length > 0 && duid != null && "IMAGE" in mapData) {
					const floor = (currentMapIndex != null && currentMapIndex >= 0) ? currentMapIndex : 0;
					const list = mapData.IMAGE?.segments?.list;
					if (Array.isArray(list) && (!mappedRooms || mappedRooms.length === 0)) {
						for (const seg of list) {
							if (seg.id != null && !seg.name) {
								const obj = await this.adapter.getObjectAsync(`Devices.${duid}.floors.${floor}.${seg.id}`);
								const name = (obj as any)?.common?.name;
								if (name && String(name).trim()) seg.name = String(name).trim();
							}
						}
					}
				}

				if (mapData && Object.keys(mapData).length > 0) {
					// Legacy MapCreator returns [clean, full]
					// We cast builderV1 to any to avoid type issues if CanvasMap isn't explicitly typed in class definition yet
					const [mapBase64Clean, mapBase64] = await this.mapCreator.canvasMap(mapData, { mappedRooms, model, duid: duid ?? undefined });
					return {
						mapBase64: mapBase64,
						mapBase64Clean: mapBase64Clean,
						mapData: mapData
					};
				}
			}
		} catch (e: unknown) {
			this.adapter.rLog("MapManager", duid || null, "Error", version, 301, `Failed to process map (Version: ${version}): ${this.adapter.errorMessage(e)}`, "error");
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

		return {
			deviceState: stateObj ? Number(stateObj.val) : 0,
			deviceWorkMode: workModeObj ? Number(workModeObj.val) : 0,
			deviceCleanMode: cleanModeObj ? Number(cleanModeObj.val) : 0,
			isDustCollect: dustCollectObj ? (dustCollectObj.val === 1 || dustCollectObj.val === true || dustCollectObj.val === "1") : false,
			deviceFault: faultObj ? Number(faultObj.val) : 0
		};
	}

	/**
	 * Saves the generated map results to ioBroker states.
	 * @param duid Device Unique ID
	 * @param res The processed map result object
	 */
	public async saveGeneratedMap(duid: string, res: { mapBase64: string, mapBase64Clean?: string, mapData?: any }): Promise<void> {
		if (!res) return;

		try {
			await this.adapter.ensureFolder(`Devices.${duid}.map`);
			const tasks: Promise<any>[] = [];

			if (res.mapBase64) {
				tasks.push(
					this.adapter.ensureState(`Devices.${duid}.map.mapBase64`, { name: "Map Image", type: "string", role: "text.png" })
						.then(() => this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64`, { val: res.mapBase64, ack: true }))
				);
			}
			if (res.mapBase64Clean) {
				tasks.push(
					this.adapter.ensureState(`Devices.${duid}.map.mapBase64Clean`, { name: "Map Image (Clean)", type: "string", role: "text.png" })
						.then(() => this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64Clean`, { val: res.mapBase64Clean, ack: true }))
				);
			}
			if (res.mapData) {
				tasks.push(
					this.adapter.ensureState(`Devices.${duid}.map.mapData`, { name: "Map Data", type: "string", role: "json" })
						.then(() => this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapData`, { val: JSON.stringify(res.mapData), ack: true }))
				);
			}

			await Promise.all(tasks);
		} catch (e: unknown) {
			this.adapter.rLog("MapManager", duid, "Error", "Map", undefined, `Failed to save map states: ${this.adapter.errorMessage(e)}`, "error");
		}
	}
}
