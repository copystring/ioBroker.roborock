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
				await this.processMapResults(mapResult);
			}
		} catch (e: any) {
			this.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update map: ${e.message}`, "warn");
		}
	}

	private async processMapResults(mapResult: { mapBase64: string, mapBase64Clean?: string, mapData?: any } | null): Promise<void> {
		this.adapter.rLog("MapManager", this.duid, "Debug", undefined, undefined, `mapResult: ${!!mapResult}, keys: ${mapResult ? Object.keys(mapResult).join(",") : "none"}`, "debug");
		if (!mapResult) return;

		const { mapBase64, mapBase64Clean, mapData } = mapResult;
		await this.deps.ensureFolder(`Devices.${this.duid}.map`);

		if (mapData) {
			await this.deps.ensureState(`Devices.${this.duid}.map.mapData`, { name: "Map Data", type: "string", role: "json" });
			await this.adapter.setStateChanged(`Devices.${this.duid}.map.mapData`, { val: JSON.stringify(mapData), ack: true });
		}
		if (mapBase64) {
			await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64`, { name: "Map Image", type: "string", role: "text.png" });
			await this.adapter.setStateChanged(`Devices.${this.duid}.map.mapBase64`, { val: mapBase64, ack: true });
		}
		if (mapBase64Clean) {
			await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64Clean`, { name: "Map Image (Clean)", type: "string", role: "text.png" });
			await this.adapter.setStateChanged(`Devices.${this.duid}.map.mapBase64Clean`, { val: mapBase64Clean, ack: true });
		}
	}

	public async getCleaningRecordMap(startTime: number): Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapBase64Truncated: string; mapData: string } | null> {
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

			const mapData = await this.deps.adapter.requestsHandler.mapParser.parsedata(mapBuf, null, { isHistoryMap: true });
			if (!mapData) {
				return null;
			}

			// Generate images
			const [mapBase64CleanUncropped, mapBase64, mapBase64Truncated] = await this.deps.adapter.requestsHandler.mapCreator.canvasMap(mapData);

			return {
				mapBase64CleanUncropped,
				mapBase64,
				mapBase64Truncated,
				mapData: JSON.stringify(mapData),
			};
		} catch (e: any) {
			this.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to get cleaning record map: ${e.message}`, "warn");
			return null;
		}
	}

	public async updateMultiMapsList(): Promise<boolean> {
		try {
			const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_multi_maps_list", []);
			let mapInfo: any[] = [];

			if (Array.isArray(result) && result[0] && result[0].map_info) {
				mapInfo = result[0].map_info;
			} else if (typeof result === "object" && (result as any).map_info) {
				mapInfo = (result as any).map_info;
			}

			if (mapInfo.length > 0) {
				await this.deps.ensureFolder(`Devices.${this.duid}.floors`);

				for (const map of mapInfo) {
					const mapFlag = map.mapFlag;
					const name = map.name || `Map ${mapFlag}`;
					const formattedTime = map.add_time ? new Date(map.add_time * 1000).toLocaleString() : "Unknown";

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

					// Load Button
					await this.deps.ensureState(`Devices.${this.duid}.floors.${mapFlag}.load`, { name: "Load Map", type: "boolean", role: "button", write: true, def: false });
				}
				return true;
			}
			return false;
		} catch (e: any) {
			this.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update floors/multi-maps: ${e.message}`, "warn");
		}
		return false;
	}
}
