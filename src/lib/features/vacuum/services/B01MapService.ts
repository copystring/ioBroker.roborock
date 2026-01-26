
import type { RoborockLocales } from "../../../roborock_locales";
import { FeatureDependencies } from "../../baseDeviceFeatures";

export class B01MapService {
	constructor(
		private deps: FeatureDependencies,
		private duid: string,
		private locales: RoborockLocales,
		private onRoomsDetected?: (rooms: any[]) => void
	) {}

	public async updateMap(): Promise<void> {
		try {
			// Trigger map push (Protocol 301)
			await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.upload_by_maptype", {
				force: 1,
				map_type: 0
			});
			this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, "Triggered B01 Map update via service.upload_by_maptype", "debug");

			// Pending Request to handle the async 301 push
			const dummyId = -Math.floor(Math.random() * 1000000);

			this.deps.adapter.pendingRequests.set(dummyId, {
				method: "get_map_v1",
				duid: this.duid,
				resolve: (data: unknown) => {
					this.deps.adapter.pendingRequests.delete(dummyId);
					if (Buffer.isBuffer(data)) {
						void this.processUpdateMapResponse(data);
					}
				},
				reject: () => {
					this.deps.adapter.pendingRequests.delete(dummyId);
				}
			});

			this.deps.adapter.setTimeout(() => {
				if (this.deps.adapter.pendingRequests.has(dummyId)) {
					this.deps.adapter.pendingRequests.delete(dummyId);
				}
			}, 15000);

		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to trigger B01 map update: ${e.message}`, "warn");
		}
	}

	protected async processUpdateMapResponse(data: Buffer): Promise<void> {
		this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, `Received Map Data (${data.length} bytes)`, "silly");

		const mapRes = await this.deps.adapter.mapManager.processMap(data, "B01", this.deps.adapter.http_api.getRobotModel(this.duid) || "B01", this.duid, null, this.duid, "B01History");

		if (mapRes) {
			await this.processMapResults(mapRes);

			// Populate mappedRooms in feature handler if we found them in the map
			if (mapRes.mapData && Array.isArray(mapRes.mapData.rooms) && this.onRoomsDetected) {
				this.onRoomsDetected(mapRes.mapData.rooms);
			}
		} else {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "B01 Map processing returned null.", "warn");
		}
	}

	private async processMapResults(mapResult: { mapBase64: string, mapBase64Clean?: string, mapData?: any } | null): Promise<void> {
		if (!mapResult) return;

		const { mapBase64, mapBase64Clean, mapData } = mapResult;
		await this.deps.ensureFolder(`Devices.${this.duid}.map`);

		if (mapData) {
			await this.deps.ensureState(`Devices.${this.duid}.map.mapData`, { name: "Map Data", type: "string", role: "json" });
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.map.mapData`, { val: JSON.stringify(mapData), ack: true });
		}
		if (mapBase64) {
			await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64`, { name: "Map Image", type: "string", role: "text.png" });
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.map.mapBase64`, { val: mapBase64, ack: true });
		}
		if (mapBase64Clean) {
			await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64Clean`, { name: "Map Image (Clean)", type: "string", role: "text.png" });
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.map.mapBase64Clean`, { val: mapBase64Clean, ack: true });
		}
	}

	protected static readonly MAPPED_CLEAN_SUMMARY: Record<string, string> = { 0: "clean_time", 1: "clean_area", 2: "clean_count", 3: "records", record_list: "records" };

	public async updateCleanSummary(): Promise<void> {
		try {
			const summaryRes = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.get_record_list", {}, { priority: -10 });
			if (summaryRes) {
				await this.processCleanSummary(summaryRes);
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to update B01 clean summary: ${e.message}`, "warn");
		}
	}

	public async processCleanSummary(result: unknown): Promise<void> {
		try {
			// B01 result structure is { total_time, total_area, total_count, record_list: [ { url, detail: string }, ... ] }
			let sd = result as { data?: any; total_time: number; total_area: number; total_count: number; record_list: any[] };
			if (sd && sd.data) {
				sd = sd.data;
			}

			if (!sd || !sd.record_list) {
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "Invalid B01 clean summary format", "warn");
				return;
			}

			// Update Summary States
			await this.updateSummaryState("clean_time", sd.total_time);
			await this.updateSummaryState("clean_area", sd.total_area);
			await this.updateSummaryState("clean_count", sd.total_count);

			await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records`);
			const recordList = sd.record_list;
			const limit = 20;

			recordList.sort((a: unknown, b: unknown) => {
				const timeA = this.extractStartTime(a);
				const timeB = this.extractStartTime(b);
				return timeB - timeA;
			});

			for (let i = 0; i < Math.min(recordList.length, limit); i++) {
				const recordItem = recordList[i];
				let detail: any = null;

				try {
					detail = typeof recordItem.detail === "string" ? JSON.parse(recordItem.detail) : recordItem.detail;
				} catch (e) {
					this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Failed to parse record detail: ${e}`, "error");
					continue;
				}

				if (!detail) continue;

				const index = i;
				await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records.${index}`);
				await this.processRecordAttributes(index, detail);

				if (detail.record_map_url || detail.url || recordItem.url) {
					await this.processRecordMap(index, detail, recordItem);
				}
			}

			const jsonSummary = {
				clean_time: Number((sd.total_time / 3600).toFixed(2)),
				clean_area: Number((sd.total_area / 1000000).toFixed(2)),
				clean_count: sd.total_count,
				records: recordList.map((r: any) => {
					try {
						return typeof r.detail === "string" ? JSON.parse(r.detail) : r.detail;
					} catch { return null; }
				}).filter((r: any) => r !== null)
			};

			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.JSON`, { val: JSON.stringify(jsonSummary), ack: true });
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Error processing B01 clean summary: ${e.message}`, "error");
		}
	}

	private async updateSummaryState(attr: string, value: number): Promise<void> {
		let val = value;
		if (attr === "clean_time") {
			val = Number((val / 3600).toFixed(2));
		} else if (attr === "clean_area") {
			val = Number((val / 1000000).toFixed(2));
		}

		await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${attr}`, {
			name: attr,
			type: "number",
			role: "value",
			read: true,
			write: false
		});
		await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.${attr}`, { val, ack: true });
	}

	private extractStartTime(record: unknown): number {
		try {
			const r = record as Record<string, unknown>;
			const detail = typeof r.detail === "string" ? JSON.parse(r.detail) : r.detail;
			return detail.record_start_time || detail.begin || 0;
		} catch {
			return 0;
		}
	}

	private async processRecordAttributes(index: number, detail: Record<string, unknown>): Promise<void> {
		for (const key in detail) {
			const val = detail[key];
			const mappedKey = B01MapService.MAPPED_CLEAN_SUMMARY[key] || key;

			const type = typeof val;
			if (type !== "string" && type !== "number" && type !== "boolean") continue;

			await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.${mappedKey}`, {
				name: mappedKey,
				type: type as ioBroker.CommonType,
				role: "value",
				read: true,
				write: false
			});
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.records.${index}.${mappedKey}`, { val: val as ioBroker.StateValue, ack: true });
		}
	}

	private async processRecordMap(index: number, detail: any, recordItem: any): Promise<void> {
		const startTime = detail.record_start_time || detail.begin;
		const mapRes = await this.getCleaningRecordMap(startTime, recordItem);
		if (!mapRes) return;

		await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64`, {
			name: "Map Base64",
			type: "string",
			role: "text.png",
			read: true,
			write: false
		});
		await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64`, { val: mapRes.mapBase64, ack: true });
	}

	public async getCleaningRecordMap(startTime: number, recordDetails?: unknown): Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapBase64Truncated: string; mapData: string } | null> {
		try {
			const details = recordDetails as { record_map_url?: string; url?: string; detail?: string | { record_map_url?: string; url?: string } };
			let url = details?.record_map_url || details?.url;
			if (!url && details?.detail) {
				const d = typeof details.detail === "string" ? JSON.parse(details.detail) : details.detail;
				url = d.record_map_url || d.url;
			}

			if (!url) {
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `No URL found in record details for B01 history map (startTime: ${startTime})`, "warn");
				return null;
			}

			const dummyId = -Math.floor(Math.random() * 1000000);

			const historyMapPromise = new Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapBase64Truncated: string; mapData: string } | null>((resolve) => {
				this.deps.adapter.pendingRequests.set(dummyId, {
					method: "get_clean_record_map",
					duid: this.duid,
					resolve: (data: Buffer) => {
						this.deps.adapter.pendingRequests.delete(dummyId);
						void this.processHistoryMapResponse(data, resolve);
					},
					reject: () => {
						this.deps.adapter.pendingRequests.delete(dummyId);
						resolve(null);
					}
				});

				this.deps.adapter.setTimeout(() => {
					if (this.deps.adapter.pendingRequests.has(dummyId)) {
						this.deps.adapter.pendingRequests.delete(dummyId);
						resolve(null);
					}
				}, 30000);
			});

			try {
				await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.upload_record_by_url", { url }, { priority: -10 });
				this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, `Triggered B01 History Map update for URL: ${url}`, "debug");
			} catch (e: any) {
				this.deps.adapter.pendingRequests.delete(dummyId);
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to trigger B01 history map upload: ${e.message}`, "warn");
				return null;
			}

			return historyMapPromise;
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to get cleaning record map (B01): ${e.message}`, "warn");
			return null;
		}
	}

	private async processHistoryMapResponse(data: unknown, resolve: (val: any) => void): Promise<void> {
		try {
			if (!Buffer.isBuffer(data)) {
				resolve(null);
				return;
			}

			this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, `Received History Map Data (${data.length} bytes)`, "silly");

			const mapRes = await this.deps.adapter.mapManager.processMap(
				data,
				"B01",
				this.deps.adapter.http_api.getRobotModel(this.duid) || "B01",
				this.duid,
				null,
				this.duid,
				"B01History"
			);

			resolve(mapRes);
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Failed to process history map: ${e.message}`, "error");
			resolve(null);
		}
	}

	public async updateRoomMapping(mappedRooms?: any[]): Promise<void> {
		if (!mappedRooms) return;

		const mapStatusState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.map_status`);
		let floorID = 0;
		if (mapStatusState && typeof mapStatusState.val === "number") {
			floorID = mapStatusState.val;
		} else {
			// Fallback: try to use 'current_map_id' from device status
			const currentMapIdState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.current_map_id`);
			if (currentMapIdState && typeof currentMapIdState.val === "number") {
				floorID = currentMapIdState.val;
			}
		}
		const floorFolder = `Devices.${this.duid}.floors.${floorID}`;
		const floorName = `${this.locales.getText("guide_multifloors", this.deps.adapter.language || "en")} ${floorID}`;
		await this.deps.ensureFolder(floorFolder, floorName);

		// We assume mappedRooms is [{ id: 10, name: "Living Room" }, ...] or [{ roomId: 10, roomName: "Living Room" }, ...]


		const rooms = mappedRooms || [];

		for (const room of rooms) {
			const roomID = room?.id ?? room?.roomId;
			if (typeof roomID !== "number") {
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Invalid room data in mappedRooms: ${JSON.stringify(room)}`, "warn");
				continue;
			}
			const roomName = room.name || room.roomName || `Room ${roomID}`;
			const roomStateId = `${floorFolder}.${roomID}`;

			await this.deps.ensureState(roomStateId, {
				name: roomName,
				type: "boolean",
				role: "value",
				def: false,
				read: true,
				write: true
			});
		}
	}
}
