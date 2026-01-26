import PQueue from "p-queue";
import { BaseDeviceFeatures, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { V1ConsumableService } from "./services/V1ConsumableService";
import { V1MapService } from "./services/V1MapService";
import { VACUUM_CONSTANTS } from "./vacuumConstants";

// --- Shared Constants ---
export const BASE_FAN = { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max" };

export const BASE_WATER = { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" };
export const BASE_MOP = { 300: "Standard", 301: "Deep", 303: "Deep+" };

// --- Profile Interface ---
export interface VacuumProfile {
	mappings: {
		fan_power: Record<number, string>;
		mop_mode?: Record<number, string>;
		water_box_mode?: Record<number, string>;
		error_code?: Record<number, string>;
		state?: Record<number, string>;
	};
	name?: string;
	features?: Record<string, any>;
	cleanMotorModePresets?: Record<string, string>;
	consumableLifeHours?: Record<string, number>;
}

export const DEFAULT_PROFILE: VacuumProfile = {
	mappings: {
		fan_power: BASE_FAN,
		mop_mode: { 300: "Standard", 301: "Deep", 303: "Deep+" },
		water_box_mode: { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" },
	},
};

export class V1VacuumFeatures extends BaseDeviceFeatures {
	protected profile: VacuumProfile = DEFAULT_PROFILE;
	private _consumableService?: V1ConsumableService;
	private _mapService?: V1MapService;

	private get consumableService(): V1ConsumableService {
		if (!this._consumableService) {
			this._consumableService = new V1ConsumableService(this.deps, this.duid, this.profile);
		}
		return this._consumableService;
	}

	private get mapService(): V1MapService {
		if (!this._mapService) {
			this._mapService = new V1MapService(this.deps, this.duid);
		}
		return this._mapService;
	}

	constructor(dependencies: FeatureDependencies, duid: string, robotModel: string, config: DeviceModelConfig = { staticFeatures: [] }, profile: VacuumProfile = DEFAULT_PROFILE) {
		super(dependencies, duid, robotModel, config);

		// Deep clone profile to avoid mutating shared static objects
		this.profile = structuredClone(profile);
	}

	public override async initializeDeviceData(): Promise<void> {
		this.deps.adapter.rLog("System", this.duid, "Info", "1.0", undefined, `[initializeDeviceData] Starting sequential initialization...`, "debug");
		await this.updateMultiMapsList(); // 1. Load Floor List first (for names/metadata)
		await this.updateStatus();        // 2. Get Status (triggers Room sync via first floor detection)
		await this.updateMap();           // 3. Get Map Image

		// These can still be parallel as they don't depend on each other as much
		await Promise.all([
			this.updateFirmwareFeatures(),
			this.updateConsumables(),
			this.updateNetworkInfo(),
			this.updateTimers(),
		]);
		await this.updateConsumablesPercent();
		this.deps.adapter.rLog("System", this.duid, "Info", "1.0", undefined, `[initializeDeviceData] Sequential initialization complete.`, "debug");
	}


	/**
	 * Configures the standard command set for Protocol V1 devices.
	 * @see test/unit/features_specification.test.ts for the core vacuum command list.
	 */
	public override async setupProtocolFeatures(): Promise<void> {
		await super.setupProtocolFeatures();

		// Add Standard V1 Commands
		const translations = this.deps.adapter.translations;

		this.addCommand("app_start", { type: "boolean", role: "button", name: translations["app_start"] || "Start", def: false });
		this.addCommand("app_stop", { type: "boolean", role: "button", name: translations["app_stop"] || "Stop", def: false });
		this.addCommand("app_pause", { type: "boolean", role: "button", name: translations["app_pause"] || "Pause", def: false });
		this.addCommand("app_charge", { type: "boolean", role: "button", name: translations["app_charge"] || "Charge", def: false });
		this.addCommand("find_me", { type: "boolean", role: "button", name: translations["find_me"] || "Find Me", def: false });
		this.addCommand("app_spot", { type: "boolean", role: "button", name: translations["app_spot"] || "Spot Cleaning", def: false });
		this.addCommand("app_segment_clean", { type: "boolean", role: "button", name: "Segment Cleaning", def: false });

		// Restore missing standard V1 commands
		this.addCommand("app_zoned_clean", { type: "json", role: "json", name: "Zone Clean" }); // No default for JSON usually, or "[]"
		this.addCommand("resume_zoned_clean", { type: "boolean", role: "button", name: "Resume Zone Clean", def: false });
		this.addCommand("stop_zoned_clean", { type: "boolean", role: "button", name: "Stop Zone Clean", def: false });

		this.addCommand("resume_segment_clean", { type: "boolean", role: "button", name: "Resume Segment Clean", def: false });
		this.addCommand("stop_segment_clean", { type: "boolean", role: "button", name: "Stop Segment Clean", def: false });

		this.addCommand("app_goto_target", { type: "json", role: "json", name: "Go To Target" });

		this.addCommand("load_multi_map", { type: "number", role: "level", name: "Load Map", def: 0 });



		this.addCommand("set_custom_mode", {
			type: "number",
			role: "level",
			name: translations["fan_power"] || "Fan Power",
			states: this.profile.mappings.fan_power,
			def: Number(Object.keys(this.profile.mappings.fan_power)[0])
		});

		// Consolidated cleaning mode with all parameters (Custom Mode)
		// We define states (Presets) to make it selectable in UI
		this.addCommand("set_clean_motor_mode", {
			type: "string",
			role: "value", // changed from json to value to support dropdown
			name: "Set Custom Cleaning Mode",
			def: '{"fan_power":102,"mop_mode":300,"water_box_mode":201}',
			states: {
				'{"fan_power":102,"mop_mode":300,"water_box_mode":201}': "Indv.",
				'{"fan_power":102,"mop_mode":300,"water_box_mode":200}': "Saugen",
				'{"fan_power":105,"mop_mode":303,"water_box_mode":202}': "Wischen",
				'{"fan_power":102,"mop_mode":301,"water_box_mode":201}': "Vac & Mop",
				'{"fan_power":102,"mop_mode":306,"water_box_mode":201}': "Saugen, dann Wischen",
				'{"fan_power":106,"mop_mode":302,"water_box_mode":204}': "Smart Plan"
			}
		});

		if (this.profile.mappings.water_box_mode) {
			this.addCommand("set_water_box_custom_mode", {
				type: "number",
				role: "level",
				name: translations["water_box_mode"] || "Water Box Mode",
				states: this.profile.mappings.water_box_mode,
				def: Number(Object.keys(this.profile.mappings.water_box_mode)[0])
			});
		}

		if (this.profile.mappings.mop_mode) {
			this.addCommand("set_mop_mode", {
				type: "number",
				role: "level",
				name: translations["mop_mode"] || "Mop Mode",
				states: this.profile.mappings.mop_mode,
				def: Number(Object.keys(this.profile.mappings.mop_mode)[0])
			});
		}
	}



	public async detectAndApplyRuntimeFeatures(statusData: Readonly<Record<string, any>>): Promise<boolean> {
		let changed = false;

		// Detect features based on status keys
		if (("clean_area" in statusData || "clean_time" in statusData) && await this.applyFeature(Feature.CleaningRecords)) {
			changed = true;
		}

		if (("map_status" in statusData) && await this.applyFeature(Feature.Map)) {
			changed = true;
		}

		if (statusData["water_shortage_status"] !== undefined && await this.applyFeature(Feature.WaterShortage)) {
			changed = true;
		}

		// Consumables detection (usually static, but can check for keys)
		if (await this.applyFeature(Feature.Consumables)) changed = true;

		// Initial status
		if (statusData["state"] !== undefined) {
			await this.processStatus(statusData);
		}

		if (!this.runtimeDetectionComplete) {
			this.runtimeDetectionComplete = true;
			changed = true;
		}
		return changed;
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.Consumables)
	public async updateConsumables(): Promise<void> {
		await this.consumableService.updateConsumables();
	}

	public async updateConsumablesPercent(): Promise<void> {
		await this.consumableService.updateConsumablesPercent();
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.Map)
	public async updateMap(): Promise<void> {
		await this.mapService.updateMap();
	}

	public async getCleaningRecordMap(startTime: number) {
		return this.mapService.getCleaningRecordMap(startTime);
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.DockingStationStatus)
	protected async initDockingStationStatus(): Promise<void> {
		await this.deps.ensureFolder(`Devices.${this.duid}.dockingStationStatus`);
		const statusNames = ["cleanFluidStatus", "waterBoxFilterStatus", "dustBagStatus", "dirtyWaterBoxStatus", "clearWaterBoxStatus", "isUpdownWaterReady"];
		for (const name of statusNames) {
			await this.deps.ensureState(`Devices.${this.duid}.dockingStationStatus.${name}`, { name, type: "number", role: "value", read: true, write: false });
		}
	}

	public async updateDockingStationStatus(dss: number): Promise<void> {
		// Guard: Feature must be active
		if (!this.appliedFeatures.has(Feature.DockingStationStatus)) return;

		const status = {
			cleanFluidStatus: (dss >> 10) & 0b11,
			waterBoxFilterStatus: (dss >> 8) & 0b11,
			dustBagStatus: (dss >> 6) & 0b11,
			dirtyWaterBoxStatus: (dss >> 4) & 0b11,
			clearWaterBoxStatus: (dss >> 2) & 0b11,
			isUpdownWaterReady: dss & 0b11,
		};

		for (const [name, val] of Object.entries(status)) {
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.dockingStationStatus.${name}`, { val, ack: true });
		}
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.MultiMap)
	public async updateMultiMapsList(): Promise<void> {
		const mapList = await this.mapService.updateMultiMapsList();
		if (mapList && Array.isArray(mapList)) {
			// Update the load_multi_map command states to populate dropdown
			const states: Record<string, string> = {};
			for (const map of mapList) {
				states[String(map.mapFlag)] = map.name || `Map ${map.mapFlag}`;
			}

			await this.deps.adapter.extendObject(`Devices.${this.duid}.commands.load_multi_map`, {
				common: {
					type: "number",
					role: "value",
					states: states
				}
			});
		} else {
			await super.updateMultiMapsList();
		}
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.RoomMapping)
	public async updateRoomMapping(): Promise<void> {
		await this.mapService.updateRoomMapping();
	}

	public override async getCommandParams(method: string, params?: unknown): Promise<unknown> {
		if (method === "set_clean_motor_mode") {
			// Log shows "set_clean_motor_mode" works, but expects params as array: [{...}]
			let finalParams = params;

			// If input is a string (e.g. from Dropdown/Presets), parse it first
			if (typeof finalParams === "string") {
				try {
					finalParams = JSON.parse(finalParams);
				} catch (e: any) {
					this.deps.adapter.log.warn(`[getCommandParams] Failed to parse set_clean_motor_mode params: ${finalParams} - Error: ${e.message}`);
				}
			}

			if (finalParams && !Array.isArray(finalParams)) {
				finalParams = [finalParams];
			}
			return {
				method: "set_clean_motor_mode",
				params: finalParams
			};
		}

		if (method === "load_multi_map") {
			// Reset current map index -> Next status update triggers room refresh
			this.mapService.resetCurrentMapIndex();

			// User request: active fetch status after map load to ensure trigger
			// We trigger these in the background immediately
			(async () => {
				await new Promise(r => setTimeout(r, 2000));
				await this.updateStatus().catch(() => {});
				// Trigger map and room sync directly like 0.6.19
				await this.mapService.updateMap().catch(() => {});
				await this.mapService.updateRoomMapping().catch(() => {});
			})();

			// V1 protocol (0.6.19) expects [number] for load_multi_map
			return [params];
		}

		if (method === "app_segment_clean") {
			// If params are explicitly provided (e.g. from single room button), use them.
			if (params && (Array.isArray(params) || typeof params === "object")) {
				// If it's just a room ID or array of IDs, wrap it in the correct payload structure
				if (Array.isArray(params) && typeof params[0] === "number") {
					const roomIds = params as number[];
					this.deps.adapter.rLog("System", this.duid, "Info", "1.0", undefined, `Starting segment cleaning for specific rooms: ${roomIds.join(", ")}`, "info");
					return [{
						segments: roomIds,
						repeat: 1,
						clean_order_mode: 0,
						clean_mop: 0
					}];
				}
				return params;
			}

			// Gather selected rooms from floors
			const namespace = this.deps.adapter.namespace;
			// Pattern to find states under floors. Structure: Devices.<duid>.floors.<floorID>.<roomID>
			const pattern = `${namespace}.Devices.${this.duid}.floors.*.*`;
			const states = await this.deps.adapter.getStatesAsync(pattern);
			const roomIds: number[] = [];

			if (states) {
				for (const [id, state] of Object.entries(states)) {
					if (state && (state.val === true || state.val === "true" || state.val === 1)) {
						// Extract Room ID directly from the state path (last segment)
						const parts = id.split(".");
						const rid = Number(parts[parts.length - 1]);
						if (!isNaN(rid)) {
							roomIds.push(rid);
						}
					}
				}
			}

			if (roomIds.length > 0) {
				this.deps.adapter.rLog("System", this.duid, "Info", "1.0", undefined, `Starting segment cleaning for rooms: ${roomIds.join(", ")}`, "info");

				// Payload based on user sniff:
				// params: [{"clean_mop":0,"clean_order_mode":0,"repeat":1,"segments":[2,1]}]
				const payload = [{
					segments: roomIds,
					repeat: 1,
					clean_order_mode: 0,
					clean_mop: 0
				}];

				return payload;
			} else {
				this.deps.adapter.rLog("System", this.duid, "Warn", "1.0", undefined, `No rooms selected for segment cleaning!`, "warn");
				return [];
			}
		}
		return params;
	}

	public async updateCleanSummary(): Promise<void> {
		await this.requestAndProcess("get_clean_summary", [], "cleaningInfo", async (data) => {
			if (data.clean_time) data.clean_time = Math.round((data.clean_time / 3600) * 10) / 10;
			if (data.clean_area) data.clean_area = Math.round((data.clean_area / 1000000) * 10) / 10;

			// Fetch maps for records in parallel to avoid blocking
			if (this.deps.config.enable_map_creation && Array.isArray(data.records)) {
				// Use a local queue to limit concurrency strictly for map downloads
				// Concurrency 3 balances speed (UI) vs Congestion
				const mapQueue = new PQueue({ concurrency: 3 });

				// Sort records descending (newest first) to prioritize recent maps
				const sortedRecords = [...data.records].sort((a, b) => b - a);

				sortedRecords.forEach((startTime: number, index: number) => {
					// Prio 10 for first 3 maps (Newest), Prio 0 for rest (Background)
					const priority = index < 3 ? 10 : 0;

					mapQueue.add(async () => {
						try {
							const originalIndex = data.records.indexOf(startTime);
							const recordPath = `records.${originalIndex}`;
							const fullRecordPath = `cleaningInfo.${recordPath}`;
							await this.deps.ensureFolder(`Devices.${this.duid}.${fullRecordPath}`);

							// 1. Fetch detailed record metadata (Duration, Area, Status)
							const recordsDetails = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_clean_record", [startTime]);
							if (Array.isArray(recordsDetails) && recordsDetails.length > 0) {
								const record = recordsDetails[0];
								if (typeof record === "object" && record !== null) {
									for (const key in record) {
										let val = record[key];

										// Scale specific fields
										if (key === "area" || key === "cleaned_area") {
											val = Math.round((val / 1000000) * 10) / 10;
										} else if (key === "duration") {
											val = Math.round(val / 60);
										}

										await this.processResultKey(fullRecordPath, key, val);
									}
								}
							}

							// 2. Fetch Map Image
							const mapResult = await this.mapService.getCleaningRecordMap(startTime);
							if (mapResult) {
								const mapFolder = `${recordPath}.map`;
								await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.${mapFolder}`);

								await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${mapFolder}.mapBase64`, { name: "Map Image", type: "string", role: "text.png" });
								await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.${mapFolder}.mapBase64`, { val: mapResult.mapBase64, ack: true });

								await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${mapFolder}.mapBase64Truncated`, { name: "Map Image (Truncated)", type: "string", role: "text.png" });
								await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.${mapFolder}.mapBase64Truncated`, { val: mapResult.mapBase64Truncated, ack: true });

								await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${mapFolder}.mapData`, { name: "Map Data", type: "string", role: "json" });
								await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.${mapFolder}.mapData`, { val: JSON.stringify(mapResult.mapData), ack: true });
							}
						} catch (e: any) {
							this.deps.adapter.rLog("System", this.duid, "Warn", "1.0", undefined, `Background fetch for record ${startTime} failed: ${e.message}`, "warn");
						}
					}, { priority });
				});
				await mapQueue.onIdle();
			}

			return data;
		});
	}

	public async updateNetworkInfo(): Promise<void> {
		await this.requestAndProcess("get_network_info", [], "networkInfo");
	}

	public async updateTimers(): Promise<void> {
		try {
			const timers = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_timer", []);
			if (Array.isArray(timers)) {
				await this.deps.ensureFolder(`Devices.${this.duid}.schedules`);
				await Promise.all(timers.map(async (timer) => {
					// timer structure: [id, enabled, [cron, [cmd, params], createTime]]
					if (Array.isArray(timer) && timer.length >= 3) {
						const id = timer[0];
						const enabled = timer[1] === "on";
						const segments = timer[2];
						const cron = Array.isArray(segments) ? segments[0] : "";

						await this.deps.ensureFolder(`Devices.${this.duid}.schedules.${id}`);

						await this.deps.ensureState(`Devices.${this.duid}.schedules.${id}.enabled`, { name: "Enabled", type: "boolean", role: "switch", write: true });
						await this.deps.adapter.setStateChanged(`Devices.${this.duid}.schedules.${id}.enabled`, { val: enabled, ack: true });

						await this.deps.ensureState(`Devices.${this.duid}.schedules.${id}.cron`, { name: "CRON", type: "string", role: "text", write: false });
						await this.deps.adapter.setStateChanged(`Devices.${this.duid}.schedules.${id}.cron`, { val: cron, ack: true });
					}
				}));
			}
		} catch (e: any) {
			this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update timers: ${e.message}`, "warn");
		}
	}

	public async processStatus(status: any): Promise<void> {
    	const validStatus = status || {};

		if (validStatus.dss !== undefined) {
			await this.updateDockingStationStatus(Number(validStatus.dss));
			delete validStatus.dss;
		}

    	// Define property processing map
    	const processors: Record<string, (val: any) => Promise<void>> = {
    		state: async (val) => {
    			await this.deps.ensureState("deviceStatus.state", { type: "number", states: this.profile.mappings.state || VACUUM_CONSTANTS.stateCodes });
    			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.deviceStatus.state`, { val, ack: true });
    		},
    		error_code: async (val) => {
    			await this.deps.ensureState("deviceStatus.error_code", { type: "number", states: this.profile.mappings.error_code || VACUUM_CONSTANTS.errorCodes });
    			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.deviceStatus.error_code`, { val, ack: true });
    		},
    		fan_power: async (val) => {
    			await this.deps.ensureState("deviceStatus.fan_power", { type: "number", states: this.profile.mappings.fan_power });
    			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.deviceStatus.fan_power`, { val, ack: true });
				// Sync to command state
				await this.deps.adapter.setStateChanged(`Devices.${this.duid}.commands.set_custom_mode`, { val, ack: true });
    		},
    		mop_mode: async (val) => {
    			if (this.profile.mappings.mop_mode) {
    				await this.deps.ensureState("deviceStatus.mop_mode", { type: "number", states: this.profile.mappings.mop_mode });
    				await this.deps.adapter.setStateChanged(`Devices.${this.duid}.deviceStatus.mop_mode`, { val, ack: true });
					// Sync to command state
					await this.deps.adapter.setStateChanged(`Devices.${this.duid}.commands.set_mop_mode`, { val, ack: true });
    			}
    		},
    		water_box_mode: async (val) => {
    			if (this.profile.mappings.water_box_mode) {
    				await this.deps.ensureState("deviceStatus.water_box_mode", { type: "number", states: this.profile.mappings.water_box_mode });
    				await this.deps.adapter.setStateChanged(`Devices.${this.duid}.deviceStatus.water_box_mode`, { val, ack: true });
					// Sync to command state
					await this.deps.adapter.setStateChanged(`Devices.${this.duid}.commands.set_water_box_custom_mode`, { val, ack: true });
    			}
    		}
    	};

    	// Parallel processing of remaining status properties
    	const promises: Promise<void>[] = [];
    	for (const key in validStatus) {
    		if (processors[key]) {
    			promises.push(processors[key](validStatus[key]));
    		} else {
    			// Default handler for generic properties
    			promises.push(this.processResultKey("deviceStatus", key, validStatus[key]));
    		}
    	}

    	await Promise.all(promises);
	}

	protected getDynamicFeatures(): Set<Feature> {
		// v1 dynamic features
		const features = new Set<Feature>();
		if (this.config.staticFeatures) {
			this.config.staticFeatures.forEach(f => features.add(f));
		}
		return features;
	}

	// --- Abstract Method Implementations ---

	public getCommonConsumable(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return (VACUUM_CONSTANTS.consumables as any)[attribute];
	}

	public isResetableConsumable(consumable: string): boolean {
		return VACUUM_CONSTANTS.resetConsumables.has(consumable);
	}

	public getCommonDeviceStates(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return (VACUUM_CONSTANTS.deviceStates as any)[attribute];
	}

	public getCommonCleaningRecords(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return (VACUUM_CONSTANTS.cleaningRecords as any)[attribute];
	}

	public getFirmwareFeatureName(featureID: string | number): string {
		return (VACUUM_CONSTANTS.firmwareFeatures as any)[featureID] || `Feature ${featureID}`;
	}

	public getCommonCleaningInfo(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return (VACUUM_CONSTANTS.cleaningInfo as any)[attribute];
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.AutoEmptyDock)
	public async initAutoEmptyDock(): Promise<void> {
		this.addCommand("app_start_dust_collection", {
			type: "boolean",
			role: "button",
			name: "Empty Dust",
			def: false
		});
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.MopWash)
	public async initMopWash(): Promise<void> {
		this.addCommand("app_start_wash", {
			type: "boolean",
			role: "button",
			name: "Start Mop Wash",
			def: false
		});
		this.addCommand("app_stop_wash", {
			type: "boolean",
			role: "button",
			name: "Stop Mop Wash",
			def: false
		});
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.MopDry)
	public async initMopDry(): Promise<void> {
		this.addCommand("app_start_mop_drying", {
			type: "boolean",
			role: "button",
			name: "Start Mop Drying",
			def: false
		});
		this.addCommand("app_stop_mop_drying", {
			type: "boolean",
			role: "button",
			name: "Stop Mop Drying",
			def: false
		});
	}
	public override async processDockType(dockType: number): Promise<void> {
		const dockFeatureMap: Record<number, Feature[]> = {
			1: [Feature.AutoEmptyDock, Feature.DockingStationStatus],
			2: [Feature.MopWash, Feature.DockingStationStatus],
			3: [Feature.AutoEmptyDock, Feature.MopWash, Feature.DockingStationStatus],
			4: [Feature.AutoEmptyDock, Feature.MopWash, Feature.DockingStationStatus],
			17: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus]
		};
		const features = dockFeatureMap[dockType];
		if (features) {
			for (const feature of features) {
				await this.applyFeature(feature);
			}
		}
	}

	protected override async processResultKey(folder: string, key: string, val: unknown): Promise<void> {
		if (key === "map_status") {
			const mapIdxChanged = this.mapService.updateCurrentMapIndex(Number(val));

			if (mapIdxChanged) {
				this.deps.adapter.rLog("MapManager", this.duid, "Info", "1.0", undefined, `[MapSync] Map changed to index ${this.mapService.currentIndex}. Updating room mapping.`, "info");
				await this.updateRoomMapping();
			}
		} else if (key === "dock_type") {
			await this.processDockType(Number(val));
		}

		await super.processResultKey(folder, key, val);
	}

	public override getCurrentMapIndex(): number {
		return this.mapService.currentIndex;
	}

}

