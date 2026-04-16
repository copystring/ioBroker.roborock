import { FeatureDependencies } from "../../baseDeviceFeatures";
import { DeviceStateWriter } from "../../deviceStateWriter";
import { classifyB01MapPayload } from "../../../map/b01/B01MapPayloadClassifier";
import { normalizeRoborockRoomDisplayName } from "../../../roomNameNormalizer";

export class B01MapService {
	private readonly stateWriter: DeviceStateWriter;
	private lastQ10LiveMapBlob: Buffer | null = null;
	private lastQ10PathBlob: Buffer | null = null;

	private static isLiveMapPayload(data: Buffer): boolean {
		return classifyB01MapPayload(data).kind === "live";
	}

	constructor(
		private deps: FeatureDependencies,
		private duid: string,
		private onRoomsDetected?: (rooms: any[]) => void
	) {
		this.stateWriter = new DeviceStateWriter(deps, duid);
	}

	private getDeviceSerial(): string | null {
		const device = this.deps.adapter.http_api.getDevices().find((entry: { duid: string; sn?: string }) => entry.duid === this.duid);
		return typeof device?.sn === "string" && device.sn.trim() ? device.sn.trim() : null;
	}

	private getDefaultRoomName(): string | undefined {
		return this.deps.adapter.translationManager?.get("default_room_name");
	}

	private translateRoomName(key: string, fallback?: string): string {
		return this.deps.adapter.translationManager?.get(key, fallback) ?? fallback ?? key;
	}

	public async updateMap(trigger?: () => Promise<void>): Promise<void> {
		const dummyId = -Math.floor(Math.random() * 1000000);
		try {
			// Pending request MUST exist before sending trigger, so 301 (which can arrive before 102) can find it via FIFO
			this.deps.adapter.pendingRequests.set(dummyId, {
				method: "get_map_v1",
				duid: this.duid,
				resolve: (data: unknown) => {
					this.deps.adapter.pendingRequests.delete(dummyId);
					if (Buffer.isBuffer(data)) {
						// Guard: room/floor updates must only originate from live maps.
						if (!B01MapService.isLiveMapPayload(data)) return;
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

			if (trigger) {
				await trigger();
			} else {
				// Trigger map push (Protocol 301); queue already has one entry, trigger sends and pushes "get_map_v1"
				await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.upload_by_maptype", {
					force: 1,
					map_type: 0
				});
			}
		} catch (e: any) {
			this.deps.adapter.pendingRequests.delete(dummyId);
			this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to trigger B01 map update: ${e.message}`, "warn");
		}
	}

	public async applyLiveMapPayload(data: Buffer): Promise<void> {
		await this.processUpdateMapResponse(data);
	}

	protected async processUpdateMapResponse(data: Buffer): Promise<void> {
		const payloadClassification = classifyB01MapPayload(data);
		if (payloadClassification.kind !== "live") return;
		const isQ10PathOnlyPayload =
			payloadClassification.variant === "q10" &&
			!payloadClassification.q10?.mapData &&
			!!payloadClassification.q10?.pathPoints?.length;

		if (payloadClassification.variant === "q10" && payloadClassification.q10?.isLiveMapCandidate) {
			const isPathOnly = isQ10PathOnlyPayload;
			const previousBlob = isPathOnly ? this.lastQ10PathBlob : this.lastQ10LiveMapBlob;
			if (previousBlob && previousBlob.equals(data)) {
				return;
			}

			const snapshot = Buffer.from(data);
			if (isPathOnly) {
				this.lastQ10PathBlob = snapshot;
			} else {
				this.lastQ10LiveMapBlob = snapshot;
			}
		}

		const serial = this.getDeviceSerial();
		if (!serial) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "Missing device serial; cannot process B01 live map.", "warn");
			return;
		}

		// Live map only: connectionType "B01" so robot/charger are drawn; history uses B01History in getCleaningRecordMap
		const mapRes = await this.deps.adapter.mapManager.processMap(
			data,
			"B01",
			this.deps.adapter.http_api.getRobotModel(this.duid) || "B01",
			serial,
			null,
			this.duid,
			"B01"
		);

		if (mapRes) {
			await this.processMapResults(mapRes);

			// Populate mappedRooms in feature handler if we found them in the map
			if (mapRes.mapData && Array.isArray(mapRes.mapData.rooms) && this.onRoomsDetected) {
				this.onRoomsDetected(mapRes.mapData.rooms);
			}
		} else if (!isQ10PathOnlyPayload) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "B01 Map processing returned null.", "warn");
		}
	}

	/** Writes map result to Devices.<duid>.map (current/live map only). History maps are never passed here; they go to cleaningInfo.records.<index>.mapBase64 via getCleaningRecordMap. */
	private async processMapResults(mapResult: { mapBase64: string, mapBase64Clean?: string, mapData?: any } | null): Promise<void> {
		if (!mapResult) return;
		const { mapData } = mapResult;
		// B01 returns same image for both; use one for both if only one present so they never get out of sync
		const mapBase64 = mapResult.mapBase64 || mapResult.mapBase64Clean;
		const mapBase64Clean = mapResult.mapBase64Clean ?? mapResult.mapBase64;

		await this.stateWriter.ensureFolder("map");

		if (mapData) {
			const q10MapId = Number(mapData?.q10SourceData?.mapId);
			if (Number.isFinite(q10MapId) && q10MapId > 0) {
				await this.stateWriter.ensureAndSetValueState(`deviceStatus.current_map_id`, {
					name: "current_map_id",
					type: "number",
				}, q10MapId);
			}

			const model = this.deps.adapter.http_api.getRobotModel(this.duid);
			const mapDataWithModel = { ...mapData, model: model || undefined };
			await this.stateWriter.ensureAndSetValueState(`map.mapData`, { name: "Map Data", type: "string", role: "json" }, JSON.stringify(mapDataWithModel));
			if (mapData.q10RuntimeDebug) {
				await this.stateWriter.ensureAndSetValueState(`map.q10DebugSummary`, {
					name: "Q10 Debug Summary",
					type: "string",
					role: "json"
				}, JSON.stringify(mapData.q10RuntimeDebug));
				this.deps.adapter.rLog(
					"MapManager",
					this.duid,
					"Debug",
					"B01",
					301,
					`[Q10Map] packet=${mapData.q10RuntimeDebug.packetKind}/${mapData.q10RuntimeDebug.payloadShape} seed=${mapData.q10RuntimeDebug.overlaySeedSource} rawWalls=${mapData.q10RuntimeDebug.rawVirtualWalls} rawForbid=${mapData.q10RuntimeDebug.rawForbidAreas} srcWalls=${mapData.q10RuntimeDebug.sourceVirtualWalls} srcForbid=${mapData.q10RuntimeDebug.sourceForbidAreas} walls=${mapData.q10RuntimeDebug.virtualWalls} forbid=${mapData.q10RuntimeDebug.forbidAreas} rooms=${mapData.q10RuntimeDebug.rooms} history=${mapData.q10RuntimeDebug.historyPoints} paths=${mapData.q10RuntimeDebug.pathPoints} obstacles=${mapData.q10RuntimeDebug.obstacles} skip=${mapData.q10RuntimeDebug.skipPoints} suspected=${mapData.q10RuntimeDebug.suspectedPoints} robot=${mapData.q10RuntimeDebug.robotPresent ? 1 : 0} charger=${mapData.q10RuntimeDebug.chargerPresent ? 1 : 0}`,
					"debug"
				);
			}
		}
		if (mapBase64 || mapBase64Clean) {
			await this.stateWriter.ensureState(`map.mapBase64`, { name: "Map Image", type: "string", role: "text.png" });
			await this.stateWriter.ensureState(`map.mapBase64Clean`, { name: "Map Image (Clean)", type: "string", role: "text.png" });
			// Write both together so a concurrent history/live update cannot leave one stale
			await Promise.all([
				mapBase64 ? this.stateWriter.setState(`map.mapBase64`, mapBase64) : Promise.resolve(),
				mapBase64Clean ? this.stateWriter.setState(`map.mapBase64Clean`, mapBase64Clean) : Promise.resolve()
			]);
		}
	}

	protected static readonly MAPPED_CLEAN_SUMMARY: Record<string, string> = { 0: "clean_time", 1: "clean_area", 2: "clean_count", 3: "records", record_list: "records" };

	/**
	 * B01: Load floor list via service.get_map_list and create Devices.<duid>.floors.<mapId> (name, mapFlag).
	 * Enables room selection for app_segment_clean.
	 */
	public async updateMultiMapsList(): Promise<void> {
		try {
			const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.get_map_list", {});
			const mapList = (result && typeof result === "object" && (result as any).map_list) || (result && typeof result === "object" && (result as any).data?.map_list);
			if (!Array.isArray(mapList) || mapList.length === 0) return;
			await this.stateWriter.ensureFolder("floors");
			for (const map of mapList) {
				const mapId = map.id;
				const name = map.name || `Map ${mapId}`;
				const folder = `floors.${mapId}`;
				await this.stateWriter.ensureFolder(folder, name);
				await this.stateWriter.ensureAndSetValueState(`${folder}.name`, { name: "Floor Name", type: "string" }, name);
				await this.stateWriter.ensureAndSetValueState(`${folder}.mapFlag`, { name: "Map ID", type: "number" }, mapId);
			}
			this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `B01 floors updated: ${mapList.length} maps (${mapList.map((m: any) => m.name || m.id).join(", ")})`, "info");
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `B01 updateMultiMapsList failed: ${e.message}`, "warn");
		}
	}

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

			// Process records one-by-one: B01 map queue has concurrency 1 (requestsHandler), and we await each
			// getCleaningRecordMap so only one get_clean_record_map pending exists — avoids wrong 301 assignment.
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
					} catch {
						return null;
					}
				}).filter((r: any) => r !== null)
			};

			await this.stateWriter.ensureAndSetValueState(`cleaningInfo.JSON`, { name: "JSON", type: "string", role: "json" }, JSON.stringify(jsonSummary));
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

		await this.stateWriter.ensureAndSetValueState(`cleaningInfo.${attr}`, {
			name: attr,
			type: "number",
		}, val);
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

			await this.stateWriter.ensureAndSetValueState(`cleaningInfo.records.${index}.${mappedKey}`, {
				name: mappedKey,
				type: type as ioBroker.CommonType,
				role: "value",
			}, val as ioBroker.StateValue);
		}
	}

	private async processRecordMap(index: number, detail: any, recordItem: any): Promise<void> {
		const startTime = detail.record_start_time || detail.begin;
		const mapRes = await this.getCleaningRecordMap(startTime, recordItem, index);
		if (!mapRes) return;

		await this.stateWriter.ensureAndSetState(`cleaningInfo.records.${index}.mapBase64`, {
			name: "Map Base64",
			type: "string",
			role: "text.png",
			read: true,
			write: false
		}, mapRes.mapBase64);
	}

	/**
	 * Fetches one history map (B01). Caller must await this before starting the next record so that
	 * only one get_clean_record_map pending exists at a time; B01 map queue concurrency is 1 (requestsHandler).
	 */
	public async getCleaningRecordMap(startTime: number, recordDetails?: unknown, recordIndex?: number): Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapBase64Truncated: string; mapData: string } | null> {
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
			// Store URL so raw 301 payload can be saved as record_map/<basename>.bin for offline use
			const recordMapUrl = url;

			const historyMapPromise = new Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapBase64Truncated: string; mapData: string } | null>((resolve) => {
				this.deps.adapter.pendingRequests.set(dummyId, {
					method: "get_clean_record_map",
					duid: this.duid,
					startTime,
					recordIndex: recordIndex ?? null,
					recordMapUrl,
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

	/** History map: only resolve with result; do NOT write to Devices.xxx.map. Caller saves to cleaningInfo.records.<index>.mapBase64. */
	private async processHistoryMapResponse(data: unknown, resolve: (val: any) => void): Promise<void> {
		try {
			if (!Buffer.isBuffer(data)) {
				resolve(null);
				return;
			}
			const serial = this.getDeviceSerial();
			if (!serial) {
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "Missing device serial; cannot process B01 history map.", "warn");
				resolve(null);
				return;
			}

			const mapRes = await this.deps.adapter.mapManager.processMap(
				data,
				"B01",
				this.deps.adapter.http_api.getRobotModel(this.duid) || "B01",
				serial,
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

	public async updateRoomMapping(mappedRooms?: any[], options: { refreshFloors?: boolean } = {}): Promise<void> {
		if (!mappedRooms) return;

		// Floors and names come only from the API; refresh so current floor folder exists with correct name (issue #1140)
		if (options.refreshFloors ?? true) {
			await this.updateMultiMapsList();
		}

		// B01: use current_map_id (map id like 1770281900); map_status is a small status code
		const currentMapIdState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.current_map_id`);
		let floorID = 0;
		if (currentMapIdState && typeof currentMapIdState.val === "number" && currentMapIdState.val > 0) {
			floorID = currentMapIdState.val;
		} else {
			const mapStatusState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.map_status`);
			if (mapStatusState && typeof mapStatusState.val === "number") {
				floorID = mapStatusState.val;
			}
		}
		const floorFolder = `floors.${floorID}`;
		// Guarantee folder exists before writing room states (updateMultiMapsList may have failed, returned empty, or floorID may not be in API list)
		await this.stateWriter.ensureFolder(floorFolder);

		// We assume mappedRooms is [{ id: 10, name: "Living Room" }, ...] or [{ roomId: 10, roomName: "Living Room" }, ...]

		const rooms = mappedRooms || [];

		for (const room of rooms) {
			const roomID = room?.id ?? room?.roomId;
			if (typeof roomID !== "number") {
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Invalid room data in mappedRooms: ${JSON.stringify(room)}`, "warn");
				continue;
			}
			const rawRoomName =
				typeof room.name === "string" && room.name.trim()
					? room.name
					: typeof room.roomName === "string"
						? room.roomName
						: "";
			const roomName = normalizeRoborockRoomDisplayName(
				rawRoomName,
				() => this.getDefaultRoomName(),
				(key, fallback) => this.translateRoomName(key, fallback),
				typeof room?.roomTypeId === "number" ? room.roomTypeId : undefined
			);
			const roomStateId = `${floorFolder}.${roomID}`;
			await this.stateWriter.ensureState(roomStateId, {
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
