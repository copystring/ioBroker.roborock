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
		await this.updateStatus();
		await Promise.all([
			this.updateFirmwareFeatures(),
			this.updateMultiMapsList(),
			this.updateRoomMapping(),
			this.updateConsumables(),
			this.updateNetworkInfo(),
			this.updateTimers(),
		]);
		await this.updateConsumablesPercent();
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

		this.addCommand("set_custom_mode", {
			type: "number",
			role: "level",
			name: translations["fan_power"] || "Fan Power",
			states: this.profile.mappings.fan_power
		});

		if (this.profile.mappings.water_box_mode) {
			this.addCommand("set_water_box_custom_mode", {
				type: "number",
				role: "level",
				name: translations["water_box_mode"] || "Water Box Mode",
				states: this.profile.mappings.water_box_mode
			});
		}

		if (this.profile.mappings.mop_mode) {
			this.addCommand("set_mop_mode", {
				type: "number",
				role: "level",
				name: translations["mop_mode"] || "Mop Mode",
				states: this.profile.mappings.mop_mode
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
		if (!await this.mapService.updateMultiMapsList()) {
			await super.updateMultiMapsList();
		}
	}

	@BaseDeviceFeatures.DeviceFeature(Feature.RoomMapping)
	public async updateRoomMapping(): Promise<void> {
		await super.updateRoomMapping();
	}

	public async updateCleanSummary(): Promise<void> {
		await this.requestAndProcess("get_clean_summary", [], "cleaningInfo", async (data) => {
			if (data.clean_time) data.clean_time = Math.round(data.clean_time / 3600 * 10) / 10;
			if (data.clean_area) data.clean_area = Math.round(data.clean_area / 1000000 * 10) / 10;

			// Fetch maps for records if enabled
			if (this.deps.config.enable_map_creation && Array.isArray(data.records)) {
				// Process records sequentially to avoid overwhelming the device/API
				for (let i = 0; i < data.records.length; i++) {
					const startTime = data.records[i];
					const mapResult = await this.mapService.getCleaningRecordMap(startTime);

					if (mapResult) {
						const recordPath = `records.${i}.map`;
						await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.${recordPath}`);

						await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${recordPath}.mapBase64`, { name: "Map Image", type: "string", role: "text.png" });
						await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.${recordPath}.mapBase64`, { val: mapResult.mapBase64, ack: true });

						await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${recordPath}.mapBase64Truncated`, { name: "Map Image (Truncated)", type: "string", role: "text.png" });
						await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.${recordPath}.mapBase64Truncated`, { val: mapResult.mapBase64Truncated, ack: true });

						await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${recordPath}.mapData`, { name: "Map Data", type: "string", role: "json" });
						await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.${recordPath}.mapData`, { val: mapResult.mapData, ack: true });
					}
				}
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
				for (const timer of timers) {
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
				}
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
    		},
    		mop_mode: async (val) => {
    			if (this.profile.mappings.mop_mode) {
    				await this.deps.ensureState("deviceStatus.mop_mode", { type: "number", states: this.profile.mappings.mop_mode });
    				await this.deps.adapter.setStateChanged(`Devices.${this.duid}.deviceStatus.mop_mode`, { val, ack: true });
    			}
    		},
    		water_box_mode: async (val) => {
    			if (this.profile.mappings.water_box_mode) {
    				await this.deps.ensureState("deviceStatus.water_box_mode", { type: "number", states: this.profile.mappings.water_box_mode });
    				await this.deps.adapter.setStateChanged(`Devices.${this.duid}.deviceStatus.water_box_mode`, { val, ack: true });
    			}
    		},
			dock_type: async (val) => {
				await this.processDockType(Number(val));
				await this.processResultKey("deviceStatus", "dock_type", val);
			}
    	};

    	// Prioritize dock_type to enable features before processing other states
    	if (validStatus.dock_type !== undefined) {
    		await processors.dock_type(validStatus.dock_type);
    		delete validStatus.dock_type;
    	}

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
	public override async processDockType(dockType: number): Promise<void> {
		const dockFeatureMap: Record<number, Feature[]> = {
			1: [Feature.AutoEmptyDock, Feature.DockingStationStatus],
			2: [Feature.MopWash, Feature.DockingStationStatus],
			3: [Feature.AutoEmptyDock, Feature.MopWash, Feature.DockingStationStatus],
			4: [Feature.AutoEmptyDock, Feature.MopWash, Feature.DockingStationStatus]
		};
		const features = dockFeatureMap[dockType];
		if (features) {
			for (const feature of features) {
				await this.applyFeature(feature);
			}
		}
	}
}
