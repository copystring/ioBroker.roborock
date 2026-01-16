
import { MapManager } from "../../map/MapManager";
import { RoborockLocales } from "../../roborock_locales";
import { BaseDeviceFeatures, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { VACUUM_CONSTANTS } from "./vacuumConstants";
import deviceDataSet = require("../../protocols/q7_dataset.json");

export class B01VacuumFeatures extends BaseDeviceFeatures {

	// B01-specific properties
	protected mapManager: MapManager;
	protected locales: RoborockLocales;
	private cleanedLegacySegments = false;
	private mappedRooms: Array<{ id: number; name: string }> | null = null;

	constructor(
		dependencies: FeatureDependencies,
		duid: string,
		robotModel: string,
		config: DeviceModelConfig,
		profile?: unknown // Accept profile to match legacy subclasses, but ignore it
	) {
		super(dependencies, duid, robotModel, config);
		void profile;
		this.mapManager = new MapManager(this.deps.adapter);
		this.locales = new RoborockLocales(deviceDataSet);
		this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `Constructing B01VacuumFeatures for ${robotModel}`, "info");
	}



	public override async setupProtocolFeatures(): Promise<void> {
		this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, "Configuring B01 Command Set...", "debug");

		// 1. CLEAR all inherited base commands. B01 uses its own protocol.
		this.commands = {};

		// 2. Add properties for prop.get
		const properties = [
			"wind", "water", "clean_mode", "status", "error_code", "battery",
			"clean_time", "clean_area", "map_status", "dock_status", "water_box_level_off", "dust_collection_status"
		];
		const propStates: Record<string, string> = {};
		properties.forEach(p => propStates[p] = p);

		this.addCommand("prop.get", {
			type: "string",
			role: "text",
			name: "Property Get",
			def: "status",
			states: propStates
		});

		// 3. Status Control (Buttons)
		this.addCommand("app_start", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["app_start"] || "Start Cleaning",
			def: false
		});

		this.addCommand("app_pause", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["app_pause"] || "Pause Cleaning",
			def: false
		});


		this.addCommand("app_charge", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["app_charge"] || "Return to Dock",
			def: false
		});

		this.addCommand("find_me", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["find_me"] || "Find Me",
			def: false
		});

		// 4. Fan Power (wind)

		this.addCommand("wind", {
			type: "number",
			role: "value",
			name: this.locales.getNameAll("wind"),
			def: 2,
			states: {
				1: "Quiet",
				2: "Balanced",
				3: "Turbo",
				4: "Max",
				5: "Max+"
			}
		});

		// 5. Water Level (water)
		this.addCommand("water", {
			type: "number",
			role: "value",
			name: this.locales.getNameAll("water"),
			def: 1,
			states: {
				1: "Low",
				2: "Medium",
				3: "High"
			}
		});








		// 12. Update Map
		this.addCommand("update_map", {
			type: "boolean",
			role: "button",
			name: "Update Map",
			def: false
		});

		// 13. Consumable Resets are handled in createCommandObjects and initializeDeviceData

		// 14. Additional B01 Commands (Discovered in Sniffer)
		this.addCommand("child_lock", {
			type: "boolean",
			role: "switch",
			name: this.locales.getNameAll("child_lock"),
			def: false
		});

		this.addCommand("carpet_turbo", {
			type: "boolean",
			role: "switch",
			name: this.locales.getNameAll("carpet_turbo"),
			def: false
		});

		this.addCommand("light_mode", {
			type: "boolean",
			role: "switch",
			name: this.locales.getNameAll("light_mode"),
			def: true
		});

		this.addCommand("green_laser", {
			type: "boolean",
			role: "switch",
			name: this.locales.getNameAll("green_laser"),
			def: true
		});

		this.addCommand("repeat_state", {
			type: "number",
			role: "value",
			name: this.locales.getNameAll("repeat_state"),
			def: 0,
			states: { 0: "Off", 1: "On" } // Assuming 0/1 typical for repeat
		});

		// 10. Robot Mode (Verified in logs: 0=Vacuum, 1=Vac&Mop, 2=Mop)
		this.addCommand("mode", {
			type: "number",
			role: "value",
			name: this.locales.getNameAll("mode"),
			def: 0,
			states: {
				0: "Vacuum",
				1: "Vacuum & Mop",
				2: "Mop"
			}
		});

		const cmds = Object.keys(this.commands);
		this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `B01 Protocol Enforced. Commands in memory: ${cmds.join(", ")}`, "info");
	}

	public override async createCommandObjects(): Promise<void> {
		await super.createCommandObjects();

		// Create Reset Consumables Folder
		await this.deps.ensureFolder(`Devices.${this.duid}.resetConsumables`);

		const resets: Record<string, string> = {
			"reset_main_brush": "Reset Main Brush",
			"reset_side_brush": "Reset Side Brush",
			"reset_filter": "Reset Filter"
		};

		for (const [id, name] of Object.entries(resets)) {
			await this.deps.ensureState(`Devices.${this.duid}.resetConsumables.${id}`, {
				name: name,
				type: "boolean",
				role: "button",
				def: false,
				read: false,
				write: true
			});
		}
	}

	/**
	 * Allows feature handlers to provide/modify parameters for a command before sending.
	 * B01 uses this to map individual command states to prop.set or service calls.
	 */
	public override async getCommandParams(method: string, params?: unknown): Promise<unknown> {
		// Intercept individual commands and route to prop.set or service
		// Removed "clean_path_preference" and "status" from generic list
		// Added "clean_path_preference" handler below
		if (["wind", "water", "mode",
			"child_lock", "carpet_turbo", "light_mode", "green_laser", "repeat_state"
		].includes(method)) {
			return {
				method: "prop.set",
				params: { [method]: params }
			};
		}

		if (method === "clean_path_preference") {
			return {
				method: "service.set_preference_type",
				params: { "prefer_type": params }
			};
		}

		if (method === "find_me") {
			return {
				method: "service.find_device",
				params: {}
			};
		}

		if (method === "app_start") {
			return {
				method: "service.set_room_clean",
				params: { "clean_type": 0, "ctrl_value": 1, "room_ids": [] }
			};
		}

		if (method === "app_pause") {
			return {
				method: "service.set_room_clean",
				params: { "clean_type": 0, "ctrl_value": 2, "room_ids": [] }
			};
		}


		if (method === "app_charge") {
			return {
				method: "service.start_recharge",
				params: {}
			};
		}

		if (method === "update_map") {
			return {
				method: "service.upload_by_maptype",
				params: { "force": 1, "map_type": 0 }
			};
		}

		// Service calls




		// Explicit Consumable Resets
		const isReset = method === "reset_consumable" || method.startsWith("reset_");
		if (isReset) {
			const resetTarget = method === "reset_consumable" ? (Array.isArray(params) ? params[0] : params) : method;
			if (resetTarget === "reset_main_brush" || resetTarget === 1) {
				return { method: "service.reset_consumable", params: { "consumable": 1 } };
			}
			if (resetTarget === "reset_side_brush" || resetTarget === 2) {
				return { method: "service.reset_consumable", params: { "consumable": 2 } };
			}
			if (resetTarget === "reset_filter" || resetTarget === 3) {
				return { method: "service.reset_consumable", params: { "consumable": 3 } };
			}
		}

		return params;
	}



	public override async initializeDeviceData(): Promise<void> {
		await this.updateStatus();
		await Promise.all([
			this.updateFirmwareFeatures(),
			this.updateMultiMapsList(),
			this.updateRoomMapping(),
		]);

		await this.deps.adapter.checkForNewFirmware(this.duid);

		// Model-specific requests
		await this.updateExtraStatus();

		// Initial Map
		await this.updateMap();
	}

	public async updateRoomMapping(): Promise<void> {
		if (!this.mappedRooms) return;

		const mapStatusState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.map_status`);
		let floorID = 0;
		if (mapStatusState && typeof mapStatusState.val === "number") {
			floorID = mapStatusState.val;
		} else {
			// Fallback: try to use 'current_map_id' from device status
			const currentMapIdState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.current_map_id`);
			if (currentMapIdState && typeof currentMapIdState.val === "number") {
				floorID = currentMapIdState.val;
			} else {
				this.deps.log.debug(`[${this.duid}] map_status and current_map_id not available for room mapping, defaulting to floor 0.`);
			}
		}
		const floorFolder = `Devices.${this.duid}.floors.${floorID}`;
		const floorName = `${this.locales.getText("guide_multifloors", this.deps.adapter.language || "en")} ${floorID}`;
		await this.deps.ensureFolder(floorFolder, floorName);

		// Cleaning up legacy/orphan states to avoid confusion (run once)
		if (!this.cleanedLegacySegments) {
			this.cleanedLegacySegments = true; // Set flag immediately to prevent race conditions
			const legacyCleanSegments = `Devices.${this.duid}.floors.cleanSegments`;
			try {
				const legacyObj = await this.deps.adapter.getObjectAsync(legacyCleanSegments);
				if (legacyObj) {
					this.deps.adapter.log.info(`[${this.duid}] Cleaning up legacy 'cleanSegments' folder...`);
					await this.deps.adapter.delObjectAsync(legacyCleanSegments, { recursive: true });
				}
			} catch {
				// Ignore cleanup errors
			}
		}

		// We assume mappedRooms is [{ id: 10, name: "Living Room" }, ...] or [{ roomId: 10, roomName: "Living Room" }, ...]
		const rooms = this.mappedRooms as any[];

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

	// Override updateStatus to use strict B01 prop.get
	public override async updateStatus(): Promise<void> {
		const props = VACUUM_CONSTANTS.b01StatusProps;
		let resultObj: Record<string, any> | undefined;

		try {
			const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "prop.get", { property: props });

			if (Array.isArray(result) && result.length === props.length) {
				resultObj = {};
				props.forEach((key: string, index: number) => {
                    resultObj![key] = result[index];
				});
			} else if (typeof result === "object" && result !== null) {
				resultObj = result;
			}

			if (resultObj) {
				await this.processStatus(resultObj);
				// B01: Features are static/protocol-defined, skipping dynamic detection
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update status (B01): ${e.message}`, "warn");
		}
	}

	// Override updateConsumables to use strict B01 prop.get
	public override async updateConsumables(data?: unknown): Promise<void> {
		let resultObj: Record<string, any> | undefined;

		if (data) {
			resultObj = data;
		} else {
    		const props = VACUUM_CONSTANTS.b01SettingsProps;
    		const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "prop.get", { property: props });
    		if (Array.isArray(result) && result.length === props.length) {
    			resultObj = {};
    			props.forEach((key: string, index: number) => {
    				resultObj![key] = result[index];
    			});
    		} else if (typeof result === "object" && result !== null) {
    			resultObj = result as Record<string, any>;
    		}
		}

		if (resultObj) {
			await this.processConsumables(resultObj);
		}
	}

	// Override processStatus to apply B01 specific conversions (dm² to m²)
	protected async processStatus(resultObj: Record<string, unknown>): Promise<void> {
		// Prioritize dock_type processing to ensure feature flags are set
		const dockType = resultObj["dock_type"];
		if (dockType !== undefined) {
			await this.processDockType(Number(dockType));
		}

		// Handle docking station status separately
		const dssValue = resultObj["dss"];
		if (dssValue !== undefined) {
			delete resultObj["dss"];
			await this.updateDockingStationStatus(Number(dssValue));
		}

		// Map B01 specific keys to standard ioBroker states for compatibility
		await this.deps.ensureFolder(`Devices.${this.duid}.deviceStatus`);
		for (const key in resultObj) {
			let val: unknown = resultObj[key];

			if (typeof val === "string") {
				const trimmed = val.trim();
				if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && (trimmed.endsWith("}") || trimmed.endsWith("]"))) {
					try {
						val = JSON.parse(trimmed);
					} catch {
						/* ignore */
					}
				}
			}

			// Formatting for specific keys (e.g. timestamps)
			if ((key === "last_clean_t" || key === "clean_finish") && typeof val === "number") {
				val = this.deps.adapter.formatRoborockDate(val);
			}

			// Get definition or create default
			const def = this.getCommonDeviceStates(key);
			let type: ioBroker.CommonType = typeof val as ioBroker.CommonType;
			if (type === "object" && val !== null) type = "object";
			if ((key === "last_clean_t" || key === "clean_finish") && typeof val === "string") type = "string"; // Force string type if formatted

			const common: any = def ? { ...def } : { name: key, type: type, role: "value", read: true, write: false };

			// Enrich with defaults if missing
			if (!common.name) common.name = key;
			if (!common.role) common.role = "value";
			if (common.read === undefined) common.read = true;
			if (common.write === undefined) common.write = false;

			// Manual Metadata Overrides - Removed hardcoded EN strings to use getNameAll translations
			if (key === "cleaning_time" || key === "real_clean_time" || key === "total_clean_time") {
				common.role = "value.interval";
				common.unit = key === "cleaning_time" ? "min" : "s";
			}

			// Serialize complex objects
			if (typeof val === "object" && val !== null) {
				val = JSON.stringify(val);
			}

			// Debug clean_finish value
			if (key === "clean_finish") {
				this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, `clean_finish raw: ${val}`, "debug");
			}

			// B01 Area/Time Conversion
			if (["clean_time", "cleaning_time"].includes(key)) {
				// sniffs show 'cleaning_time: 25' for 25 min -> already in minutes. No conversion needed.
				// last_clean_t might be timestamp or duration? usually timestamp if clean_finish.
				const numericVal = Number(val as number | string);
				val = isNaN(numericVal) ? 0 : numericVal;
			} else if (["cleaning_area", "cleaning_area", "last_clean_area"].includes(key)) {
				// B01 sends dm² (e.g. 2129 -> 21.29 m²)
				const numericVal = Number(((val as number) / 100).toFixed(2));
				val = isNaN(numericVal) ? 0 : numericVal;
			}

			if (common.type === "string" && typeof val !== "string") {
				val = String(val);
			}

			// Force object update to ensure units/states are applied
			// extendObject ensures that if the object exists, it gets updated with new common properties
			await this.deps.adapter.extendObject(`Devices.${this.duid}.deviceStatus.${key}`, {
				type: "state",
				common: common
			});

			await this.deps.ensureState(`Devices.${this.duid}.deviceStatus.${key}`, common);
			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.deviceStatus.${key}`, { val: val as ioBroker.StateValue, ack: true });
		}
	}

	// Override updateMap to use B01 service call
	public override async updateMap(): Promise<void> {
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
				reject: () => { }
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

	public override async updateCleanSummary(): Promise<void> {
		try {
			const summaryRes = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.get_record_list", {}, { priority: -10 });
			if (summaryRes) {
				await this.processCleanSummary(summaryRes);
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to update B01 clean summary: ${e.message}`, "warn");
		}
	}

	// Override getCleaningRecordMap to use B01 service call (upload_record_by_url)
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
	// Override processCleanSummary to handle B01 specific structure and avoid redundant requests
	protected async processCleanSummary(result: unknown): Promise<void> {
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

			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.JSON`, { val: JSON.stringify(jsonSummary), ack: true });


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
		await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.${attr}`, { val, ack: true });
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
			const mappedKey = B01VacuumFeatures.MAPPED_CLEAN_SUMMARY[key] || key;

			// Simple type mapping
			const type = typeof val;
			if (type !== "string" && type !== "number" && type !== "boolean") continue;

			await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.${mappedKey}`, {
				name: mappedKey,
				type: type as ioBroker.CommonType,
				role: "value",
				read: true,
				write: false
			});
			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.${mappedKey}`, { val: val as ioBroker.StateValue, ack: true });
		}
	}

	public override async detectAndApplyRuntimeFeatures(statusData: Readonly<Record<string, unknown>>): Promise<boolean> {
		// B01 features are statically defined, parameter unused but required by signature
		void statusData;
		return false;
	}

	protected override getDynamicFeatures(): Set<Feature> {
		return new Set<Feature>(); // B01 does not use bitfield feature flags
	}

	public override async processDockType(dockType: number): Promise<void> {
		// B01 dock features are handled via static command definitions, parameter unused but required by signature
		void dockType;
	}

	public override getCommonDeviceStates(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		// Map B01 properties to readable states
		const lang = this.deps.adapter.language || "en";

		// Fan Power (wind)
		if (attribute === "wind" || attribute === "fan_power") {
			// Map B01 (1-5) to Standard (101-105) for text retrieval
			const b01FanMap: Record<number, number> = { 1: 101, 2: 102, 3: 103, 4: 104, 5: 105 };
			const states: Record<number, string> = {};

			for (const [b01Val, stdVal] of Object.entries(b01FanMap)) {
				states[parseInt(b01Val)] = this.locales.getFanPowerText(stdVal, lang);
			}

			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: states
			};
		}

		// Water Level (water)
		if (attribute === "water" || attribute === "water_box_mode") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: this.locales.getWaterBoxModeText(200, lang), // Off
					1: this.locales.getWaterBoxModeText(201, lang), // Low
					2: this.locales.getWaterBoxModeText(202, lang), // Medium
					3: this.locales.getWaterBoxModeText(203, lang)  // High
				}
			};
		}

		// Status
		if (attribute === "status" || attribute === "state") {
			const states: Record<number, string> = {
				0: "Unknown",
				1: "Initiating",
				2: "Sleeping",
				3: "Idle",
				4: "Remote Control",
				5: "Cleaning",
				6: "Returning Dock",
				7: "Manual Mode",
				8: "Charging",
				9: "Charging Error",
				10: "Paused",
				11: "Spot Cleaning",
				12: "In Error",
				13: "Shutting Down",
				14: "Updating",
				15: "Docking",
				16: "Go To",
				17: "Zone Clean",
				18: "Room Clean",
				22: "Emptying Dust Container",
				23: "Washing Mop",
				26: "Going to Wash Mop",
				28: "In Call",
				29: "Mapping",
				100: "Fully Charged"
			};

			// Override with dataset translations if available
			for (const code in states) {
				const key = this.locales.getStatusKey(code);
				if (key) {
					states[Number(code)] = this.locales.getText(key, lang);
				}
			}

			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: states
			};
		}

		// Cleaning Stats
		if (attribute === "clean_time" || attribute === "cleaning_time" || attribute === "total_clean_time") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				unit: "min"
			};
		}
		if (attribute === "clean_area" || attribute === "cleaning_area" || attribute === "last_clean_area") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				unit: "m²"
			};
		}
		if (attribute === "quantity") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				unit: "%"
			};
		}
		if (attribute === "real_clean_time") {
			return {
				type: "number",
				role: "value.interval",
				name: this.locales.getNameAll(String(attribute)),
				unit: "s"
			};
		}
		if (attribute === "clean_finish") {
			return {
				type: "string",
				role: "value.datetime",
				name: this.locales.getNameAll(String(attribute)),
			};
		}
		if (attribute === "last_clean_t") {
			return {
				type: "string",
				name: this.locales.getNameAll(String(attribute))
			};
		}

		// Error Codes
		if (attribute === "error_code" || attribute === "fault") {
			const faultCodes = this.locales.getErrorCodes();
			const standardErrors = VACUUM_CONSTANTS.errorCodes;
			const states: Record<string, string> = {};

			// Use standard firmware error range (1-30) as the foundation before applying model-specific overrides to ensure basic faults are covered
			// Provide localized fallback if available
			let standardErrorsToUse = standardErrors;
			if (VACUUM_CONSTANTS.errorCodes_languages) {
				const fallbackErrors = VACUUM_CONSTANTS.resolveErrorCodeFallback(lang);
				if (fallbackErrors) {
					standardErrorsToUse = { ...standardErrors, ...fallbackErrors };
				}
			}

			// Add standard error codes (with fallback)
			for (const [code, desc] of Object.entries(standardErrorsToUse)) {
				if (typeof desc === "string") {
					states[code] = desc;
				}
			}

			// 2. Add/Overlay model-specific fault codes from dataset
			faultCodes.forEach((code) => {
				const entry = this.locales.getErrorText(code, lang);
				let text = "";
				if (typeof entry === "string") {
					text = entry;
				} else if (entry && typeof entry === "object") {
					const obj = entry as any;
					text = obj.summary || obj.title || "";
				}

				// Check if the resolved text matches a standardized placeholder format to avoid overwriting default labels
				const isPlaceholder = text === `F_${code}`;

				if (isPlaceholder || !text) {
					// Skip overwriting if it's a placeholder or empty
				} else {
					states[code] = text;
				}
			});

			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: states,
			};
		}


		// 5. Dock Status
		if (attribute === "dock_status") {
			const states: Record<number, string> = {
				0: "Undocked",
				1: "Docking",
				2: "Docked",
				3: "Leaving Dock",
				255: "Unknown"
			};
			// TODO: Add dataset mapping for dock_status if possible
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: states
			};
		}

		// 6. Dust Collection Status
		if (attribute === "dust_collection_status") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Idle",
					1: "Collecting",
					2: "Collection Weaker",
					3: "Collection Failed",
					4: "Dustbin Full"
				}
			};
		}

		// 7. Map Status
		if (attribute === "map_status") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Unmapped",
					1: "Mapped",
					2: "Mapping",
					3: "Loading"
				}
			};
		}

		// 8. Charge State
		if (attribute === "charge_state") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Charging",
					1: "Not Charging",
					2: "Fully Charged",
					3: "Charge Failed"
				}
			};
		}

		// 9. Work Mode
		if (attribute === "work_mode") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Standard",
					1: "Custom",
					2: "Silent"
				}
			};
		}

		// 10. Robot Mode
		if (attribute === "mode") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Vacuum",
					1: "Vacuum & Mop",
					2: "Mop"
				}
			};
		}

		// 10. Tank State (Water Box)
		if (attribute === "tank_state") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Installed",
					1: "Removed",
					2: "Empty",
					3: "Unknown"
				}
			};
		}

		// 11. Sweep Type (Mop Route)
		if (attribute === "sweep_type" || attribute === "mop_mode") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: this.locales.getMopModeText(300, lang) || "Standard",
					1: this.locales.getMopModeText(301, lang) || "Deep",
					300: this.locales.getMopModeText(300, lang),
					301: this.locales.getMopModeText(301, lang),
					302: this.locales.getMopModeText(302, lang),
					303: this.locales.getMopModeText(303, lang)
				}
			};
		}

		// 12. Cloth State (Mop Pad)
		if (attribute === "cloth_state") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: this.locales.getClothStateText(0, lang),
					1: this.locales.getClothStateText(1, lang),
					2: this.locales.getClothStateText(2, lang)
				}
			};
		}

		// 13. Multi Floor
		if (attribute === "multi_floor") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Disabled",
					1: "Enabled"
				}
			};
		}

		// 14. Quiet Is Open (DND Mode)
		if (attribute === "quiet_is_open") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Off",
					1: "On"
				}
			};
		}

		// 15. Dust Collection Frequency
		if (attribute === "dust_frequency") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Smart",
					1: "Low",
					2: "Medium",
					3: "High",
					4: "Never"
				}
			};
		}

		// 16. Clean Path Preference
		if (attribute === "clean_path_preference") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Standard",
					1: "Fast"
				}
			};
		}

		// 17. Repeat State
		if (attribute === "repeat_state") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Off",
					1: "On"
				}
			};
		}

		// 18. Dust Action
		if (attribute === "dust_action") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Idle",
					1: "Emptying"
				}
			};
		}

		// 19. Build Map
		if (attribute === "build_map") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Off",
					1: "On"
				}
			};
		}

		// 20. Map Num
		if (attribute === "map_num") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				unit: "maps"
			};
		}



		// 22. Custom Type
		if (attribute === "custom_type") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					0: "Off",
					1: "On"
				}
			};
		}

		// 23. Add Sweep Status
		if (attribute === "add_sweep_status") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
				states: {
					"-1": "Unknown",
					0: this.locales.getText("common_off", lang),
					1: this.locales.getText("common_on", lang)
				}
			};
		}

		// 24. Language
		if (attribute === "language") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
			};
		}

		// 25. Time Zone
		if (attribute === "time_zone") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
			};
		}
		if (attribute === "time_zone_info") {
			return {
				type: "string",
				name: this.locales.getNameAll(String(attribute)),
			};
		}

		// 26. Recommend
		if (attribute === "recommend") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
			};
		}

		// 27. PU Charging
		if (attribute === "pu_charging") {
			return {
				type: "number",
				name: this.locales.getNameAll(String(attribute)),
			};
		}

		// Default fallback using getNameAll
		const keyName = String(attribute);
		const translatedName = this.locales.getNameAll(keyName);
		if (translatedName !== keyName) {
			return {
				name: translatedName,
				type: "mixed",
				role: "value",
				read: true,
				write: false
			};
		}

		return undefined;
	}

	public override async updateNetworkInfo(): Promise<void> {
		try {
			// B01: Request via service.get_net_info? Or just rely on prop.get("net_status")?
			// prop.get "net_status" usually just gives connected state.
			// Let's try service.get_network_info first as it's common.
			const res = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "service.get_net_info", {});
			if (!res) return;

			// Typically returns { ssid, ip, mac, rssi... }
			const info = Array.isArray(res) ? res[0] : res;

			if (!info) return;

			await this.deps.ensureFolder(`Devices.${this.duid}.networkInfo`);
			for (const key in info) {
				await this.deps.ensureState(`Devices.${this.duid}.networkInfo.${key}`, {
					name: key,
					type: typeof info[key] as ioBroker.CommonType,
					read: true,
					write: false
				});
				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.networkInfo.${key}`, { val: info[key], ack: true });
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to update network info: ${e.message}`, "warn");
		}
	}



	protected async processConsumables(resultObj: Record<string, unknown>): Promise<void> {
		await this.deps.ensureFolder(`Devices.${this.duid}.consumables`);
		await this.deps.ensureFolder(`Devices.${this.duid}.resetConsumables`);

		// Process Net Status if present (B01)
		if (resultObj.net_status) {
			await this.processNetworkInfo(resultObj.net_status);
		}

		// Process other B01 settings
		const settingsToProcess = ["volume", "voice_type", "light_mode", "child_lock", "sound", "charge_station_type", "dust_auto_state"];
		for (const key of settingsToProcess) {
			if (resultObj[key] !== undefined) {
				const type = resultObj[key] === null ? "mixed" : typeof resultObj[key];
				await this.deps.ensureState(`Devices.${this.duid}.deviceStatus.${key}`, {
					name: key,
					type: type as ioBroker.CommonType,
					role: "value",
					write: false
				});
				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.deviceStatus.${key}`, { val: resultObj[key] as ioBroker.StateValue, ack: true });
			}
		}

		for (const key in resultObj) {
			const val = resultObj[key];

			if (key === "net_status" || settingsToProcess.includes(key)) continue;

			const common = this.getCommonDeviceStates(key) || {
				name: this.locales.getNameAll(key) || key,
				type: typeof val as ioBroker.CommonType,
				role: "value",
				write: false
			};

			// Check for specific consumables
			if (["main_brush_work_time", "side_brush_work_time", "filter_work_time", "filter_element_work_time", "sensor_dirty_time"].includes(key)) {
				const deviceName = key.replace("_work_time", "").replace("_dirty_time", "");
				await this.deps.ensureState(`Devices.${this.duid}.consumables.${deviceName}`, { ...common, unit: "%" });

				const totalTime = this.getConsumableLifeSpan(deviceName) * 3600;

				if (totalTime > 0) {
					const percent = Math.round(100 - ((val as number) / totalTime) * 100);
					await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.consumables.${deviceName}`, { val: percent, ack: true });
				}
			} else {
				await this.deps.ensureState(`Devices.${this.duid}.consumables.${key}`, common);
				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.consumables.${key}`, { val: val as ioBroker.StateValue, ack: true });
			}

			if (key.endsWith("_work_time") || key.endsWith("_dirty_time")) {
				const resetKey = key.replace("_work_time", "").replace("_dirty_time", "");
				await this.deps.ensureState(`Devices.${this.duid}.resetConsumables.${resetKey}`, { name: `Reset ${resetKey}`, type: "boolean", role: "button", write: true, def: false });
			}
		}
	}

	private async processNetworkInfo(data: unknown): Promise<void> {
		if (!data || typeof data !== "object") return;

		const info = data as Record<string, unknown>;

		await this.deps.ensureFolder(`Devices.${this.duid}.networkInfo`);

		const mapping: Record<string, string> = {
			ssid: "ssid",
			ip: "ip",
			mac: "mac",
			bssid: "bssid",
			rssi: "rssi",
			frequency: "frequency" // Not standard but useful
		};

		for (const [key, stateName] of Object.entries(mapping)) {
			if (info[key] !== undefined) {
				const val = info[key];
				const common = {
					name: stateName,
					type: typeof val === "number" ? "number" : "string",
					role: key === "rssi" ? "value.rssi" : "info",
					read: true,
					write: false
				} as ioBroker.StateCommon;

				await this.deps.ensureState(`Devices.${this.duid}.networkInfo.${stateName}`, common);
				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.networkInfo.${stateName}`, { val: val as ioBroker.StateValue, ack: true });
			}
		}
	}

	private getConsumableLifeSpan(deviceName: string): number {
		switch (deviceName) {
			case "main_brush": return 300;
			case "side_brush": return 200;
			case "filter":
			case "filter_element": return 150;
			case "sensor": return 30;
			default: return 0;
		}
	}

	private async processUpdateMapResponse(data: Buffer): Promise<void> {
		try {
			const device = this.deps.adapter.http_api.getDevices().find(d => d.duid === this.duid);
			const sn = device?.sn || this.duid;

			const res = await this.mapManager.processMap(data, "B01", this.robotModel, sn, this.mappedRooms, this.duid, "MQTT");
			if (!res) return;

			const { mapBase64, mapBase64Truncated, mapData } = res as { mapBase64: string; mapBase64Truncated: string; mapData: unknown };
			await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64`, {
				name: "Map Base64",
				type: "string",
				role: "text.png",
				read: true,
				write: false
			});
			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapBase64`, { val: mapBase64, ack: true });

			await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64Truncated`, {
				name: "Map Base64 Truncated",
				type: "string",
				role: "text.png",
				read: true,
				write: false
			});
			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapBase64Truncated`, { val: mapBase64Truncated, ack: true });

			await this.deps.ensureState(`Devices.${this.duid}.map.mapData`, {
				name: "Map Data",
				type: "string",
				role: "json",
				read: true,
				write: false
			});
			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapData`, { val: JSON.stringify(mapData), ack: true });

			// Update internal room mapping from map data
			if ((mapData as any).rooms) {
				this.mappedRooms = (mapData as any).rooms;
				await this.updateRoomMapping();
			}
		} catch (err: any) {
			this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Failed to process B01 map: ${err.message}`, "error");
		}
	}

	private async processRecordMap(index: number, detail: any, recordItem: any): Promise<void> {
		const startTime = detail.record_start_time || detail.begin;
		const mapRes = await this.getCleaningRecordMap(startTime, recordItem);
		if (!mapRes) return;

		await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64`, {
			name: "Map Base64",
			type: "string",
			role: "text",
			read: true,
			write: false
		});
		await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64Truncated`, {
			name: "Map Base64 Truncated",
			type: "string",
			role: "text",
			read: true,
			write: false
		});

		await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64`, { val: mapRes.mapBase64, ack: true });
		await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${index}.mapBase64Truncated`, { val: mapRes.mapBase64Truncated, ack: true });

		// Add the map_object state (Combined JSON)
		const combinedObject = {
			...detail,
			mapBase64: mapRes.mapBase64,
			mapBase64Truncated: mapRes.mapBase64Truncated
		};

		await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${index}.map_object`, {
			name: "Map Object",
			type: "string",
			role: "json",
			read: true,
			write: false
		});

		await this.deps.adapter.setState(`Devices.${this.duid}.cleaningInfo.records.${index}.map_object`, {
			val: JSON.stringify(combinedObject),
			ack: true
		});
	}

	protected async updateDockingStationStatus(dss: number): Promise<void> {
		// Guard: Feature must be active
		if (!this.appliedFeatures.has(Feature.DockingStationStatus)) {
			return;
		}

		// Parse 2-bit status fields
		const status = {
			cleanFluidStatus: (dss >> 10) & 0b11,        // Bits 10-11: Clean water tank status
			waterBoxFilterStatus: (dss >> 8) & 0b11,     // Bits 8-9: Water box filter
			dustBagStatus: (dss >> 6) & 0b11,            // Bits 6-7: Dust bag (Staubbeutel)
			dirtyWaterBoxStatus: (dss >> 4) & 0b11,      // Bits 4-5: Dirty water tank
			clearWaterBoxStatus: (dss >> 2) & 0b11,      // Bits 2-3: Clear water box
			isUpdownWaterReady: dss & 0b11,              // Bits 0-1: Water ready status
		};

		for (const [name, val] of Object.entries(status)) {
			await this.deps.adapter.setStateChanged(
				`Devices.${this.duid}.dockingStationStatus.${name}`,
				{ val: val, ack: true }
			);
		}
	}

	protected static readonly MAPPED_CLEAN_SUMMARY: Record<string, string> = { 0: "clean_time", 1: "clean_area", 2: "clean_count", 3: "records", record_list: "records" };

	public getCommonConsumable(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return VACUUM_CONSTANTS.consumables[attribute as keyof typeof VACUUM_CONSTANTS.consumables] as Partial<ioBroker.StateCommon>;
	}

	public isResetableConsumable(consumable: string): boolean {
		return VACUUM_CONSTANTS.resetConsumables.has(consumable);
	}

	public getCommonCleaningInfo(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return VACUUM_CONSTANTS.cleaningInfo[attribute as keyof typeof VACUUM_CONSTANTS.cleaningInfo] as Partial<ioBroker.StateCommon>;
	}

	public getCommonCleaningRecords(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		const spec = VACUUM_CONSTANTS.cleaningRecords[attribute as keyof typeof VACUUM_CONSTANTS.cleaningRecords];
		return spec as Partial<ioBroker.StateCommon> | undefined;
	}

	public getFirmwareFeatureName(featureID: string | number): string {
		const name = VACUUM_CONSTANTS.firmwareFeatures[featureID as keyof typeof VACUUM_CONSTANTS.firmwareFeatures];
		return name || `FeatureID_${featureID}`;
	}

	private async processHistoryMapResponse(data: unknown, resolve: (val: any) => void): Promise<void> {
		if (!Buffer.isBuffer(data)) {
			resolve(null);
			return;
		}
		try {
			const devices = this.deps.adapter.http_api.getDevices();
			const device = devices.find((d: any) => d.duid === this.duid);
			const serial = device?.sn || this.duid;

			const mapRes = await this.deps.adapter.mapManager.processMap(data, "B01", this.robotModel, serial, null, this.duid, "B01History");

			if (mapRes) {
				resolve({
					mapBase64CleanUncropped: mapRes.mapBase64Clean || mapRes.mapBase64,
					mapBase64: mapRes.mapBase64,
					mapBase64Truncated: mapRes.mapBase64Clean || mapRes.mapBase64,
					mapData: JSON.stringify(mapRes.mapData),
				});
			} else {
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "B01 History Map processing returned null.", "warn");
				resolve(null);
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Error", "B01", undefined, `Failed to process B01 history map: ${e.message}`, "error");
			resolve(null);
		}
	}
}




