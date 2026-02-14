import { promisify } from "util";
import { gunzip } from "zlib";
import { MapManager } from "../../../map/MapManager";
import type { FeatureDependencies } from "../../baseDeviceFeatures";

const gunzipAsync = promisify(gunzip);

export class V1MapService {
	public mapManager: MapManager;
	private adapter: FeatureDependencies["adapter"];

	// Mapped rooms cache (currently seems unused/null in V1VacuumFeatures but kept for compatibility)
	private mappedRooms: any[] | null = null;
	private currentMapIndex: number = -1;
	public get currentIndex(): number {
		return this.currentMapIndex;
	}
	private multiMaps: any[] = [];
	private lastMapStatus: number = -1;

	constructor(
		private deps: FeatureDependencies,
		private duid: string
	) {
		this.adapter = deps.adapter;
		this.mapManager = new MapManager(this.adapter);
	}

	public async updateMap(): Promise<void> {
		try {
			// "get_map_v1" is usually the command to GET the map.
			const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_map_v1", [], { priority: 0 });

			let mapBuf: Buffer | undefined;
			let mapVer = await this.deps.adapter.getDeviceProtocolVersion(this.duid);
			const robotModel = this.deps.adapter.http_api.getRobotModel(this.duid) || "";

			// Handle new return format { data, version } or legacy Buffer
			if (result && typeof result === "object" && "data" in result && Buffer.isBuffer((result as any).data)) {
				mapBuf = (result as any).data;
				if ((result as any).version) mapVer = (result as any).version;
			} else if (Buffer.isBuffer(result)) {
				mapBuf = result;
			} else if (result) {
				this.adapter.rLog("System", this.duid, "Debug", undefined, undefined, `get_map_v1 returned non-buffer: ${typeof result}`, "debug");
			}

			if (mapBuf) {
				const mapResult = await this.mapManager.processMap(mapBuf, mapVer, robotModel, this.duid, this.mappedRooms, this.duid, "Unknown");
				if (mapResult) {
					await this.processMapResults(mapResult);
				}
			}
		} catch (e: any) {
			this.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update map: ${e.message}`, "warn");
		}
	}

	private async processMapResults(mapResult: { mapBase64: string, mapBase64Clean?: string, mapData?: any } | null): Promise<void> {
		if (!mapResult) return;

		await this.mapManager.saveGeneratedMap(this.duid, mapResult);

		// Logic to determine current floor (mapFlag) based on active map slot
		if (this.lastMapStatus !== -1 && this.lastMapStatus < 250) {
			const slotIndex = this.lastMapStatus >> 2;
			if (slotIndex >= 0 && slotIndex !== this.currentMapIndex) {
				this.currentMapIndex = slotIndex;
				this.adapter.rLog("MapManager", this.duid, "Debug", "1.0", undefined, `Updated current map index to ${this.currentMapIndex} from status ${this.lastMapStatus}`, "debug");
			}
		}

		// Sync extra rooms found in map data (visual segments) that might be missing from get_room_mapping
		if (mapResult.mapData && mapResult.mapData.IMAGE && mapResult.mapData.IMAGE.segments && Array.isArray(mapResult.mapData.IMAGE.segments.list)) {
			// Ensure floors.<mapIndex> exists (using current map index)
			const currentMapFlag = this.currentMapIndex;
			await this.deps.ensureFolder(`Devices.${this.duid}.floors.${currentMapFlag}`);

			for (const segment of mapResult.mapData.IMAGE.segments.list) {
				const id = segment.id;
				// Skip invalid IDs if any
				if (!id) continue;

				const roomStateId = `Devices.${this.duid}.floors.${currentMapFlag}.${id}`;

				// We update the name even if the state exists, IF the state name is empty or numeric
				const segmentName = segment.name;
				let finalName = segmentName || "";
				if (String(finalName).match(/^\d+$/)) {
					finalName = "";
				}

				const obj = await this.adapter.getObjectAsync(roomStateId);
				const currentName = obj?.common?.name;

				// If we have a new name, or if state doesn't exist, or if current name is just a number/invalid
				const isInvalidName = !currentName || String(currentName).match(/^\d+$/);

				if (!obj || (finalName && currentName !== finalName) || (isInvalidName && finalName !== currentName)) {
					if (!obj) {
						this.adapter.rLog("MapManager", this.duid, "Info", "1.0", undefined, `Found new room in map (ID: ${id}, Name: "${finalName}"). Adding state.`, "info");
					} else if (finalName) {
						this.adapter.rLog("MapManager", this.duid, "Debug", "1.0", undefined, `Updating room name for ${roomStateId}: "${currentName}" -> "${finalName}"`, "debug");
					}

					const common: Partial<ioBroker.StateCommon> = {
						type: "boolean",
						role: "switch",
						write: true,
						name: finalName || (obj?.common?.name as string) || "",
						def: false
					};

					await this.deps.ensureState(roomStateId, common);
					await this.adapter.extendObject(roomStateId, {
						native: { id: id }
					});
				}
			}
		}
	}

	public async getCleaningRecordMap(startTime: number): Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapData: string } | null> {
		try {
			// B01 devices are handled via override/other logic.
			// V1 devices (1.0) expect an object with start_time.
			const params = { start_time: startTime };
			const cleaningRecordMapRes = (await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_clean_record_map", params, { priority: -10 })); // LOW

			let unwrapped = cleaningRecordMapRes;
			while (Array.isArray(unwrapped) && unwrapped.length === 1) {
				unwrapped = unwrapped[0];
			}

			let cleaningRecordMap: Buffer;
			// Check new return format { data, version } or legacy Buffer
			if (unwrapped && typeof unwrapped === "object" && "data" in unwrapped && Buffer.isBuffer((unwrapped as any).data)) {
				cleaningRecordMap = (unwrapped as any).data;
			} else if (Buffer.isBuffer(unwrapped)) {
				cleaningRecordMap = unwrapped;
			} else {
				return null;
			}

			const t0 = Date.now();

			// Check if map is gzipped (starts with 0x1f 0x8b)
			let mapBuf: Buffer = cleaningRecordMap;
			if (cleaningRecordMap[0] === 0x1f && cleaningRecordMap[1] === 0x8b) {
				try {
					mapBuf = await gunzipAsync(cleaningRecordMap);
				} catch (e) {
					this.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Failed to unzip map data: ${e}`, "error");
					return null;
				}
			}
			const t1 = Date.now();

			const mapData = await this.deps.adapter.mapManager.mapParser.parsedata(mapBuf, null, { isHistoryMap: true });
			if (!mapData) {
				return null;
			}
			const t2 = Date.now();

			// Generate images
			const [mapBase64CleanUncropped, mapBase64] = await this.deps.adapter.mapManager.mapCreator.canvasMap(mapData);
			const t3 = Date.now();

			this.adapter.rLog("MapManager", this.duid, "Debug", "Profiler", undefined, `[MapProfiler] History Map ${startTime} processed. Total: ${t3 - t0}ms | Unzip: ${t1 - t0}ms | Parse: ${t2 - t1}ms | Canvas: ${t3 - t2}ms | Size: ${cleaningRecordMap.length}`, "debug");

			return {
				mapBase64CleanUncropped,
				mapBase64,

				mapData: JSON.stringify(mapData),
			};
		} catch (e: any) {
			this.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to get cleaning record map: ${e.message}`, "warn");
			return null;
		}
	}

	public async updateRoomMapping(): Promise<boolean> {
		try {
			let result: any[] = [];
			for (let i = 0; i < 3; i++) {
				result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_room_mapping", []) as any[];

				if (Array.isArray(result) && result.length > 0) {
					break;
				}
				// Wait 2 seconds before retry if empty
				if (i < 2) await new Promise(resolve => setTimeout(resolve, 2000));
			}

			let fallbackUsed = false;
			if (!(Array.isArray(result) && result.length > 0)) {
				// FALLBACK: Use rooms from get_multi_maps_list matching current floor
				const currentFloor = this.multiMaps.find(m => m.mapFlag === this.currentMapIndex);
				if (currentFloor && Array.isArray(currentFloor.rooms)) {
					fallbackUsed = true;
					// Convert multi_maps format [{id, tag, iot_name_id, iot_name}] to room_mapping format [[id, iot_name_id, tag]]
					result = currentFloor.rooms.map((r: any) => [r.id, r.iot_name_id, r.tag]);
				}
			}

			if (Array.isArray(result) && result.length > 0) {
				if (fallbackUsed) {
					this.adapter.rLog("MapManager", this.duid, "Info", "1.0", undefined, `[updateRoomMapping] Fallsback to multi-map list for Floor ${this.currentMapIndex} (Count: ${result.length})`, "info");
				} else {
					this.adapter.rLog("MapManager", this.duid, "Info", "1.0", undefined, `[updateRoomMapping] Using ${result.length} rooms from get_room_mapping (Floor: ${this.currentMapIndex})`, "info");
				}

				this.mappedRooms = result;
				const currentMapFlag = this.currentMapIndex;

				await this.deps.ensureFolder(`Devices.${this.duid}.floors`);
				await this.deps.ensureFolder(`Devices.${this.duid}.floors.${currentMapFlag}`);

				// Get Cloud Room Names to resolve IDs (e.g. "33230238" -> "Kitchen")
				const cloudRooms = this.adapter.http_api.getMatchedRoomIDs(false);

				await Promise.all(result.map(async ([shortID, longID]) => {
					// Resolve Name using Long ID (index 1)
					let realName = "";

					const roomObj = cloudRooms.find((r) => String(r.id) === String(longID));
					if (roomObj && roomObj.name) {
						realName = roomObj.name;
					}

					// Structure: Devices.<duid>.floors.<floorID>.<shortID>
					const roomStateId = `Devices.${this.duid}.floors.${currentMapFlag}.${shortID}`;

					// If name failed to resolve (still looks like ID or empty), set to empty to indicate "Unnamed"
					if (!realName || String(realName).match(/^\d+$/) || String(realName) === "-1") {
						realName = "";
					}

					const obj = await this.adapter.getObjectAsync(roomStateId);
					const currentName = obj?.common?.name;

					const isInvalidName = !currentName || String(currentName).match(/^\d+$/);

					if (!obj || (realName && currentName !== realName) || (isInvalidName && realName !== currentName)) {
						// Prepare common attributes
						const common: Partial<ioBroker.StateCommon> = {
							type: "boolean",
							role: "switch",
							write: true,
							name: realName || (obj?.common?.name as string) || "",
							def: false
						};

						// Ensure the State is a switch (boolean)
						await this.deps.ensureState(roomStateId, common);

						// extendObject to set native.id properly AND ensure name is updated (if we have one)
						const extendCommon: Partial<ioBroker.StateCommon> = { name: realName || (obj?.common?.name as string) || "" };

						if (realName) {
							this.adapter.rLog("MapManager", this.duid, "Debug", "1.0", undefined, `[updateRoomMapping] Syncing Room ${shortID} -> ${roomStateId} (Name: "${realName}")`, "debug");
						}

						await this.adapter.extendObject(roomStateId, {
							common: extendCommon,
							native: { id: shortID }
						});
					}
				}));
				// Update cleanCount (legacy feature from 0.6.19)
				const cleanCountId = `Devices.${this.duid}.floors.cleanCount`;
				await this.deps.ensureState(cleanCountId, {
					name: "Clean count",
					type: "number",
					write: true,
					def: 1
				});

				return true;
			} else {
				this.adapter.rLog("MapManager", this.duid, "Warn", "1.0", undefined, `[updateRoomMapping] No rooms found for Floor ${this.currentMapIndex} (Result empty, No MultiMap fallback)`, "warn");
			}
		} catch (e: any) {
			this.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update room mapping: ${e.message}`, "warn");
		}
		return false;
	}

	public async updateMultiMapsList(): Promise<any[] | null> {
		try {
			// Cast result to any[] as we expect an array response
			const result: any[] = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_multi_maps_list", []) as any[];
			let mapInfo: any[] = [];

			if (Array.isArray(result) && result[0] && result[0].map_info) {
				mapInfo = result[0].map_info;
			} else if (typeof result === "object" && (result as any).map_info) {
				mapInfo = (result as any).map_info;
			}

			this.multiMaps = mapInfo;

			if (mapInfo.length > 0) {
				await this.deps.ensureFolder(`Devices.${this.duid}.floors`);

				// Legacy: Global parameters from result[0] (e.g. max_multi_map)
				if (result[0]) {
					for (const key in result[0]) {
						if (typeof result[0][key] === "number") {
							await this.deps.ensureState(`Devices.${this.duid}.floors.${key}`, { name: key, type: "number", write: false });
							await this.adapter.setStateChanged(`Devices.${this.duid}.floors.${key}`, { val: result[0][key], ack: true });
						}
					}
				}

				const maps: Record<string, string> = {};

				for (const map of mapInfo) {
					const mapFlag = map.mapFlag;
					const name = map.name || `Map ${mapFlag}`;
					const formattedTime = map.add_time ? new Date(map.add_time * 1000).toLocaleString() : "Unknown";

					maps[mapFlag] = name;

					// Create folder for this floor (using mapFlag as stable ID)
					await this.deps.ensureFolder(`Devices.${this.duid}.floors.${mapFlag}`);
					await this.adapter.extendObject(`Devices.${this.duid}.floors.${mapFlag}`, { common: { name } });

					// Create States
					await this.deps.ensureState(`Devices.${this.duid}.floors.${mapFlag}.name`, { name: "Floor Name", type: "string", write: false });
					await this.adapter.setStateChanged(`Devices.${this.duid}.floors.${mapFlag}.name`, { val: name, ack: true });

					await this.deps.ensureState(`Devices.${this.duid}.floors.${mapFlag}.mapFlag`, { name: "Map Flag", type: "number", write: false });
					await this.adapter.setStateChanged(`Devices.${this.duid}.floors.${mapFlag}.mapFlag`, { val: mapFlag, ack: true });

					await this.deps.ensureState(`Devices.${this.duid}.floors.${mapFlag}.add_time`, { name: "Created At", type: "string", write: false });
					await this.adapter.setStateChanged(`Devices.${this.duid}.floors.${mapFlag}.add_time`, { val: formattedTime, ack: true });

					// Legacy: Also keep local load button (optional but useful)
					await this.deps.ensureState(`Devices.${this.duid}.floors.${mapFlag}.load`, { name: "Load Map", type: "boolean", role: "button", write: true, def: false });
				}

				// Legacy: Create load_multi_map command
				if (result[0] && result[0]["max_multi_map"] > 1) {
					await this.deps.ensureState(`Devices.${this.duid}.commands.load_multi_map`, {
						name: "Load map",
						type: "number",
						role: "level",
						write: true,
						def: 0,
						states: maps
					});
				}

				return mapInfo;
			}
			return null;
		} catch (e: any) {
			this.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update floors/multi-maps: ${e.message}`, "warn");
		}
		return null;
	}

	public updateCurrentMapIndex(mapStatus: number): boolean {
		this.lastMapStatus = mapStatus;
		if (mapStatus === undefined || mapStatus === null) return false;

		// Ignore large status values (usually > 250) which indicate "No Map", "Loading", or "Updating".
		// For example, 252 (0xFC) or 255 (0xFF).
		if (mapStatus >= 250) return false;

		const slotIndex = mapStatus >> 2;
		if (slotIndex >= 0 && slotIndex !== this.currentMapIndex) {
			this.currentMapIndex = slotIndex;
			this.mappedRooms = null; // Clear room mapping cache on floor switch
			return true;
		}
		return false;
	}

	public resetCurrentMapIndex(): void {
		this.adapter.rLog("System", this.duid, "Info", undefined, undefined, "resetCurrentMapIndex: Forcing reset of map index to 0", "info");
		this.currentMapIndex = 0;
		this.lastMapStatus = -1;
	}
}
