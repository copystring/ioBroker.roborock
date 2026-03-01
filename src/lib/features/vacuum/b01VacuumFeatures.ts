import { MapManager } from "../../map/MapManager";
import { RoborockLocales } from "../../roborock_locales";
import { BaseDeviceFeatures, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { ADAPTER_ERROR_MAPPING } from "./adapterErrorMapping";
import { B01ConsumableService } from "./services/B01ConsumableService";
import { B01ControlService } from "./services/B01ControlService";
import { B01MapService } from "./services/B01MapService";
import { StationService } from "./services/StationService";
import { VACUUM_CONSTANTS } from "./vacuumConstants";
import deviceDataSet = require("../../../../lib/protocols/q7_dataset.json");

export class B01VacuumFeatures extends BaseDeviceFeatures {
	// B01-specific properties
	protected mapManager: MapManager;
	protected locales: RoborockLocales;

	// Services
	protected consumableService: B01ConsumableService;
	protected stationService: StationService;
	protected lastMapUpdate = 0;
	protected mapService: B01MapService;
	protected controlService: B01ControlService;

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

		this.consumableService = new B01ConsumableService(this.deps, this.duid);
		this.stationService = new StationService(this.deps, this.duid);

		// Initialize Services
		this.mapService = new B01MapService(dependencies, duid, this.locales, (rooms) => this.setMappedRooms(rooms));
		this.controlService = new B01ControlService();

		this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `Constructing B01VacuumFeatures for ${robotModel}`, "info");
	}

	/**
	 * Configures the command set for B01 devices.
	 * @see test/unit/features_specification.test.ts for the B01 command and property specification.
	 */
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

		// 3b. Segment / Room cleaning (B01: service.set_room_clean with room_ids)
		this.addCommand("app_segment_clean", {
			type: "boolean",
			role: "button",
			name: this.deps.adapter.translations["app_segment_clean"] || "Segment Cleaning",
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
	public override async getCommandParams(method: string, params?: unknown, id?: string): Promise<unknown> {
		void id;

		// B01 Room/Segment cleaning: gather selected room IDs from floors and send service.set_room_clean
		if (method === "app_segment_clean") {
			const namespace = this.deps.adapter.namespace;
			const pattern = `${namespace}.Devices.${this.duid}.floors.*.*`;
			const states = await this.deps.adapter.getStatesAsync(pattern);
			const roomIds: number[] = [];

			if (states) {
				for (const [stateId, state] of Object.entries(states)) {
					if (state && (state.val === true || state.val === "true" || state.val === 1)) {
						const parts = stateId.split(".");
						const rid = Number(parts[parts.length - 1]);
						if (!isNaN(rid)) {
							roomIds.push(rid);
						}
					}
				}
			}

			if (roomIds.length > 0) {
				this.deps.adapter.rLog("System", this.duid, "Info", "B01", undefined, `Starting room cleaning for rooms: ${roomIds.join(", ")}`, "info");
			} else {
				this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, "No rooms selected for segment cleaning. Start full clean (room_ids: []).", "warn");
			}

			return {
				method: "service.set_room_clean",
				params: { clean_type: 0, ctrl_value: 1, room_ids: roomIds }
			};
		}

		// Delegate all other command parameter mapping to the Control Service
		return this.controlService.getCommandParams(method, params);
	}

	public override async initializeDeviceData(): Promise<void> {
		await this.updateStatus();
		await this.updateMap(); // Fetch map first to set current index
		await this.updateMultiMapsList(); // Then get floors
		await this.updateRoomMapping(); // Finally map rooms

		await this.deps.adapter.checkForNewFirmware(this.duid);

		// Model-specific requests
		await Promise.all([
			this.updateFirmwareFeatures(),
			this.updateExtraStatus(),
			this.updateNetworkInfo()
		]);
	}

	public async updateRoomMapping(): Promise<void> {
		if (this.mappedRooms && this.mapService) {
			await this.mapService.updateRoomMapping(this.mappedRooms);
		}
	}

	public setMappedRooms(rooms: Array<{ id: number; name: string }>): void {
		this.mappedRooms = rooms;
		this.deps.adapter.rLog("System", this.duid, "Debug", "B01", undefined, `Updated mappedRooms: ${JSON.stringify(rooms)}`, "debug");
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
				if (!this.runtimeDetectionComplete) {
					await this.detectAndApplyRuntimeFeatures(resultObj);
				}
				await this.processStatus(resultObj);
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update status (B01): ${e.message}`, "warn");
		}
	}

	// Override updateConsumables to use strict B01 prop.get
	// Override updateConsumables to use strict B01 prop.get
	public override async updateConsumables(data?: unknown): Promise<void> {
		await this.consumableService.updateConsumables(data);
	}

	// Override processStatus to apply B01 specific conversions (dm² to m²)
	protected async processStatus(resultObj: Record<string, unknown>): Promise<void> {
		// Handle docking station status separately
		const dssValue = resultObj["dss"];
		const washStatus = resultObj["wash_status"];
		const washPhase = resultObj["wash_phase"];

		if (dssValue !== undefined || washStatus !== undefined || washPhase !== undefined) {
			if (dssValue !== undefined) delete resultObj["dss"];
			await this.updateDockingStationStatus({
				dss: dssValue !== undefined ? Number(dssValue) : undefined,
				washStatus: washStatus !== undefined ? Number(washStatus) : undefined,
				washPhase: washPhase !== undefined ? Number(washPhase) : undefined
			});
		}

		// Map B01 specific keys to standard ioBroker states for compatibility
		await this.deps.ensureFolder(`Devices.${this.duid}.deviceStatus`);
		for (const key in resultObj) {
			await this.processStatusProperty(key, resultObj[key]);
		}
	}

	private async processStatusProperty(key: string, inputVal: unknown): Promise<void> {
		let val = inputVal;
		if (typeof val === "string") {
			const trimmed = val.trim();
			if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && (trimmed.endsWith("}") || trimmed.endsWith("]"))) {
				try {
					val = JSON.parse(trimmed);
				} catch (e: any) {
					this.deps.adapter.log.debug(`Failed to parse JSON property ${key}: ${e.message}`);
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
		} else if (["cleaning_area", "last_clean_area"].includes(key)) {
			// B01 sends dm² (e.g. 2129 -> 21.29 m²)
			const numericVal = Number(((val as number) / 100).toFixed(2));
			val = isNaN(numericVal) ? 0 : numericVal;
		}

		if (common.type === "string" && typeof val !== "string") {
			val = String(val);
		}

		// Use ensureState for optimized change detection to prevent write storms
		const stateId = `Devices.${this.duid}.deviceStatus.${key}`;
		await this.deps.ensureState(stateId, common);

		this.deps.adapter.setStateChanged(`Devices.${this.duid}.deviceStatus.${key}`, { val: val as ioBroker.StateValue, ack: true });
	}

	// Override updateMap to use B01 service call
	// Override updateMap to use B01 service call
	public override async updateMap(): Promise<void> {
		await this.mapService.updateMap();
	}

	public override async updateCleanSummary(): Promise<void> {
		await this.mapService.updateCleanSummary();
	}

	public async getCleaningRecordMap(startTime: number, recordDetails?: unknown): Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapBase64Truncated: string; mapData: string } | null> {
		return this.mapService.getCleaningRecordMap(startTime, recordDetails);
	}

	protected async processCleanSummary(result: unknown): Promise<void> {
		await this.mapService.processCleanSummary(result);
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.DockingStationStatus)
	protected async initDockingStationStatus(): Promise<void> {
		await this.stationService.initDockingStationStatus();

		// B01 Specific Station States
		await this.deps.ensureState(`Devices.${this.duid}.dockingStationStatus.washingTaskStatus`, {
			name: "Washing Task Status",
			type: "number",
			role: "value",
			read: true,
			write: false,
			states: {
				"0": "Idle",
				"1": "Washing",
				"2": "Deep Washing",
				"3": "Drying",
				"4": "Completed",
				"5": "Paused",
				"6": "Error"
			}
		});

		await this.deps.ensureState(`Devices.${this.duid}.dockingStationStatus.washingMode`, {
			name: "Washing Mode",
			type: "number",
			role: "value",
			read: true,
			write: false,
			states: {
				"0": "Standard",
				"1": "Deep"
			}
		});
	}

	public async updateDockingStationStatus(status: { dss?: number, washStatus?: number, washPhase?: number }): Promise<void> {
		// Guard: Feature must be active
		if (!this.appliedFeatures.has(Feature.DockingStationStatus)) return;

		if (status.dss !== undefined) {
			await this.stationService.updateDockingStationStatus(status.dss);
		}

		if (status.washStatus !== undefined) {
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.dockingStationStatus.washingTaskStatus`, { val: status.washStatus, ack: true });
		}
		if (status.washPhase !== undefined) {
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.dockingStationStatus.washingMode`, { val: status.washPhase, ack: true });
		}
	}

	public override async detectAndApplyRuntimeFeatures(statusData: Readonly<Record<string, unknown>>): Promise<boolean> {
		let changed = false;

		if (statusData["dss"] !== undefined) {
			const dss = Number(statusData["dss"]);
			await this.applyFeature(Feature.DockingStationStatus);

			// Bits 6-7: Dust bag status (0=not supported/missing)
			if (((dss >> 6) & 0b11) > 0) {
				await this.applyFeature(Feature.AutoEmptyDock);
			}
			// Bits 4-5: Dirty water tank status (0=not supported/missing)
			// Bits 10-11: Clean water tank status
			if (((dss >> 4) & 0b11) > 0 || ((dss >> 10) & 0b11) > 0) {
				await this.applyFeature(Feature.MopWash);
			}
			changed = true;
		}

		if (!this.runtimeDetectionComplete) {
			this.runtimeDetectionComplete = true;
			changed = true;
		}

		return changed;
	}

	protected override getDynamicFeatures(): Set<Feature> {
		return new Set<Feature>(); // B01 does not use bitfield feature flags
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
			const standardErrorsToUse: Record<number, string> = { ...(standardErrors as unknown as Record<number, string>) };

			// Apply Adapter Error Mapping for specific language using TranslationManager
			// This replaces the legacy s7_maxv_dataset.json fallback
			for (const [codeStr, key] of Object.entries(ADAPTER_ERROR_MAPPING)) {
				const code = Number(codeStr);
				// TranslationManager uses adapter.language internally via init()
				const translated = this.deps.adapter.translationManager.get(key);
				if (translated && translated !== key) {
					standardErrorsToUse[code] = translated;
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
				const rawType = typeof info[key];
				const type = (rawType === "object" ? "mixed" : rawType) as ioBroker.CommonType;
				await this.deps.ensureState(`Devices.${this.duid}.networkInfo.${key}`, {
					name: key,
					type: type,
					read: true,
					write: false
				});
				await this.deps.adapter.setStateChanged(`Devices.${this.duid}.networkInfo.${key}`, { val: info[key], ack: true });
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", "B01", undefined, `Failed to update network info: ${e.message}`, "warn");
		}
	}

	protected static readonly MAPPED_CLEAN_SUMMARY: Record<string, string> = { 0: "clean_time", 1: "clean_area", 2: "clean_count", 3: "records", record_list: "records" };

	/**
	 * Override to handle B01 specific unit conversions (mm² -> m², s -> min)
	 */
	protected override async processResultKey(folder: string, key: string, val: unknown): Promise<void> {
		if (typeof val === "number") {
			// Time: seconds -> minutes
			if (key === "clean_time" || key === "cleaning_time" || key === "total_clean_time") {
				val = Math.round(val / 60);
			} else if (key === "clean_area" || key === "cleaning_area" || key === "last_clean_area" || key === "total_clean_area") {
				val = Math.round(val / 1000000);
			}
		}
		await super.processResultKey(folder, key, val);
	}

	public getCommonConsumable(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return VACUUM_CONSTANTS.consumables[attribute as keyof typeof VACUUM_CONSTANTS.consumables] as Partial<ioBroker.StateCommon>;
	}

	public isResetableConsumable(consumable: string): boolean {
		return VACUUM_CONSTANTS.resetConsumables.has(consumable);
	}

	public getCommonCleaningInfo(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return (VACUUM_CONSTANTS.cleaningInfo as any)[attribute];
	}

	public getCommonCleaningRecords(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return (VACUUM_CONSTANTS.cleaningRecords as any)[attribute];
	}

	public getFirmwareFeatureName(featureID: string | number): string {
		return (VACUUM_CONSTANTS.firmwareFeatures as any)[featureID] || `FeatureID_${featureID}`;
	}
}
