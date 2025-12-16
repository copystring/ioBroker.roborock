import { BaseDeviceFeatures, DeviceModelConfig, FeatureDependencies, CommandSpec } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { z } from "zod";
import { VACUUM_CONSTANTS } from "./vacuumConstants";
import { ProductHelper } from "../../productHelper";

// --- Shared Constants ---
export const BASE_FAN = { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max" };
export const BASE_WATER = { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" };
export const BASE_MOP = { 300: "Standard", 301: "Deep", 303: "Deep+" };

export interface VacuumProfile {
    name?: string;
    docks?: Record<number, { features: Feature[] }>;
    mappings: {
        fan_power: Record<number, string>;
        water_box_mode?: Record<number, string>;
        mop_mode?: Record<number, string>;
        error_code?: Record<number, string>;
        state?: Record<number, string>;
    };
    features: {
        maxSuctionValue: number;
        ultraWaterValue?: number;
        hasSmartPlan?: boolean;
    };
    cleanMotorModePresets?: Record<string, string>;
}

export const DEFAULT_PROFILE: VacuumProfile = {
	mappings: {
		fan_power: BASE_FAN,
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	},
	features: {
		maxSuctionValue: 104
	}
};

// --- Zod Schema for Vacuum Status ---
export const VacuumStatusSchema = z
	.object({
		state: z.number().int().optional(),
		fan_power: z.number().int().optional(),
		water_box_mode: z.number().int().optional(),
		mop_mode: z.number().int().optional(),
		dock_type: z.number().int().optional(),
		error_code: z.number().int().optional(),
		battery: z.number().int().min(0).max(100).optional(),
		clean_time: z.number().int().optional(),
		clean_area: z.number().int().optional(),
		dss: z.number().int().optional(), // Docking station status bits
		map_status: z.number().int().optional(),
		// Optional string fields that should be valid JSON
		carpet_mode: z
			.string()
			.optional()
			.refine(
				(val) => {
					if (val === undefined) return true;
					try {
						JSON.parse(val);
						return true;
					} catch {
						return false;
					}
				},
				{ message: "carpet_mode must be a valid JSON string or undefined" }
			),
		carpet_clean_mode: z
			.string()
			.optional()
			.refine(
				(val) => {
					if (val === undefined) return true;
					try {
						JSON.parse(val);
						return true;
					} catch {
						return false;
					}
				},
				{ message: "carpet_clean_mode must be a valid JSON string or undefined" }
			),
		water_box_custom_mode: z.number().int().optional(), // Required for WaterBox feature detection
		// Add other relevant vacuum status fields...
	})
	.passthrough(); // Allow fields not defined in the schema

export abstract class BaseVacuumFeatures extends BaseDeviceFeatures {
	protected profile: VacuumProfile;

	// --- Vacuum-specific Constants ---
	protected static readonly CONSTANTS = VACUUM_CONSTANTS;
	protected mappedRooms: any[] | null = null;

	constructor(
		dependencies: FeatureDependencies,
		duid: string,
		robotModel: string,
		config: DeviceModelConfig,
		profile: VacuumProfile = DEFAULT_PROFILE
	) {
		// Add default features that should be present on all vacuums
		const defaultFeatures = [
			Feature.NetworkInfo,
			Feature.UpdateStatus,
		];
		const mergedConfig = {
			...config,
			staticFeatures: [...defaultFeatures, ...config.staticFeatures]
		};

		super(dependencies, duid, robotModel, mergedConfig);
		this.profile = profile;

		// Initialize with Vacuum base commands
		this.commands = JSON.parse(JSON.stringify(BaseVacuumFeatures.CONSTANTS.baseCommands));

		// Populate dynamic states map references
		BaseVacuumFeatures.CONSTANTS.deviceStates.dock_type.states = BaseVacuumFeatures.CONSTANTS.dockTypes;
		BaseVacuumFeatures.CONSTANTS.deviceStates.error_code.states = BaseVacuumFeatures.CONSTANTS.errorCodes;
		BaseVacuumFeatures.CONSTANTS.deviceStates.state.states = BaseVacuumFeatures.CONSTANTS.stateCodes;

		this.applyCleanMotorModePresets();

		// Deduplicate static features
		this.config.staticFeatures = [...new Set(this.config.staticFeatures)];
	}

	protected applyCleanMotorModePresets(): void {
		const presets = this.profile.cleanMotorModePresets || {
			'{"fan_power":102,"mop_mode":300,"water_box_mode":200}': "Vacuum",
			'{"fan_power":105,"mop_mode":300,"water_box_mode":202}': "Mop",
			'{"fan_power":102,"mop_mode":300,"water_box_mode":202}': "Vac & Mop"
		};

		this.addCommand("set_clean_motor_mode", {
			type: "json",
			def: BaseVacuumFeatures.CONSTANTS.baseCommands.set_clean_motor_mode.def,
			states: presets
		});
	}

	protected getDynamicFeatures(): Set<Feature> {
		const features = new Set<Feature>();
		try {
			const featureSet = this.deps.http_api.getFeatureSet(this.duid);
			const newFeatureSet = this.deps.http_api.getNewFeatureSet(this.duid);
			if (featureSet === undefined) {
				this.deps.log.error(`[${this.duid}] getDynamicFeatures: Could not get featureSet.`);
				return features;
			}

			const highFeatureSet = Math.floor(featureSet / 2 ** 32);
			const newFeatureSetInt = newFeatureSet ? parseInt("0x" + newFeatureSet.slice(-8)) : 0;

			// Map Bitfields to 'is...' Enum keys
			if (!!((highFeatureSet >> 5) & 1)) features.add(Feature.isWashThenChargeCmdSupported);
			if (!!(featureSet & 33554432)) features.add(Feature.isDustCollectionSettingSupported);
			if (!!((highFeatureSet >> 15) & 1)) features.add(Feature.isSupportedDrying);
			if (!!(featureSet & 262144)) features.add(Feature.isShakeMopSetSupported);
			if (!!(featureSet & 8)) features.add(Feature.isVideoMonitorSupported);
			if (!!(featureSet & 64)) features.add(Feature.isVideoSettingSupported);
			if (!!(featureSet & 512)) features.add(Feature.isCarpetSupported);
			if (!!(featureSet & 65536)) features.add(Feature.isPhotoUploadSupported);
			if (!!(featureSet & 134217728)) features.add(Feature.isAvoidCollisionSupported);
			if (!!(featureSet & 2147483648)) features.add(Feature.isCornerCleanModeSupported);
			if (!!(featureSet & 268435456)) features.add(Feature.isSupportSetSwitchMapMode);
			if (!!(featureSet & 2147483648)) features.add(Feature.isCustomWaterBoxDistanceSupported);
			if (!!(newFeatureSetInt & 4096)) features.add(Feature.isBackChargeAutoWashSupported);
			if (!!(newFeatureSetInt & 256)) features.add(Feature.isCleanRouteFastModeSupported);

			// Check firmware features
			const fwResult = this.deps.http_api.getFwFeaturesResult(this.duid);
			if (fwResult) {
				for (const id of fwResult) {
					const featureName = BaseVacuumFeatures.CONSTANTS.firmwareFeatures[id as keyof typeof BaseVacuumFeatures.CONSTANTS.firmwareFeatures];
					if (featureName) {
						const featureEnum = Feature[featureName as keyof typeof Feature];
						if (featureEnum) {
							features.add(featureEnum);
						}
					}
				}
			}

			// Add features from product info
			if (this.deps.http_api.productInfo) {
				const deduced = ProductHelper.deduceFeatures(this.deps.http_api.productInfo, this.robotModel);
				for (const f of deduced) {
					features.add(f);
				}
				this.deps.log.silly(`[${this.duid}] ProductHelper deduced: ${[...deduced].join(", ")}`);
			}
		} catch (error: any) {
			this.deps.log.error(`[${this.duid}] Error in getDynamicFeatures: ${error.message}`);
		}
		this.deps.log.silly(`[${this.duid}] Detected dynamic vacuum features (raw): ${[...features].join(", ")}`);
		return features;
	}

	public async detectAndApplyRuntimeFeatures(statusData: Readonly<Record<string, any>>): Promise<boolean> {
		let changedOverall = false;
		const runDetection = !this.runtimeDetectionComplete || this.deps.config.forceRuntimeDetectEveryTime; // Check config flag
		const appliedFeaturesList: string[] = [];

		if (!runDetection) {
			this.deps.log.silly(`[${this.duid}] Skipping repeated runtime feature detection.`);
			return false;
		}

		this.deps.log.debug(`[RuntimeDetect|${this.robotModel}|${this.duid}] Running...`);

		// --- Validate Status Data ---
		const validationResult = VacuumStatusSchema.safeParse(statusData);
		if (!validationResult.success) {
			this.deps.log.warn(
				`[RuntimeDetect|${this.robotModel}|${this.duid}] Received invalid status data. Skipping detection. Errors: ${JSON.stringify(validationResult.error.issues)}`
			);
			return false;
		}
		const validStatus = validationResult.data;

		// --- Apply dynamic features first (Bitfields/FW) ---
		const dynamicFeatures = this.getDynamicFeatures(); // Get current dynamic features
		this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Dynamic features from bits/fw: ${[...dynamicFeatures].join(", ")}`);
		for (const feature of dynamicFeatures) {
			const mappedFeature = this.mapFeature(feature);
			if (mappedFeature) {
				// Apply only if NOT applied by model specifics already and NOT conflicting
				if (!this.config.staticFeatures.includes(mappedFeature)) {
					const applied = await this.applyFeature(mappedFeature);
					if (applied) {
						changedOverall = true;
						appliedFeaturesList.push(mappedFeature);
					}
				} else {
					this.deps.log.silly(
						`[RuntimeDetect|${this.robotModel}|${this.duid}] Feature '${mappedFeature}' (from '${feature}') defined statically, skipping dynamic application.`
					);
				}
			}
		}

		// --- Rules based on validated status data ---
		// Apply features/commands only if they haven't been applied yet

		let changedByStatus = false;
		// WaterBox
		if ((validStatus.water_box_mode !== undefined || validStatus.mop_mode !== undefined) && !this.appliedFeatures.has(Feature.WaterBox)) {
			// this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected WaterBox feature via status.`);
			if (await this.applyFeature(Feature.WaterBox)) {
				changedByStatus = true;
				appliedFeaturesList.push("WaterBox");
			}
		}

		// Carpet Mode Commands
		if (validStatus.carpet_mode !== undefined && !this.commands["set_carpet_mode"]) {
			// this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected carpet_mode command via status.`);
			const spec: CommandSpec = { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_mode.states };
			this.addCommand("set_carpet_mode", spec);
			changedByStatus = true;
			appliedFeaturesList.push("set_carpet_mode (Command)");
		}
		if (validStatus.carpet_clean_mode !== undefined && !this.commands["set_carpet_clean_mode"]) {
			// this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected carpet_clean_mode command via status.`);
			const spec: CommandSpec = { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_clean_mode.states };
			this.addCommand("set_carpet_clean_mode", spec);
			changedByStatus = true;
			appliedFeaturesList.push("set_carpet_clean_mode (Command)");
		}

		// Refine Fan Power (Max+)
		if (validStatus.fan_power === 108 && !this.appliedFeatures.has(Feature.FanMaxPlus)) {
			// Apply only if not statically defined
			if (!this.config.staticFeatures.includes(Feature.FanMaxPlus)) {
				// this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected FanMaxPlus state (108).`);
				if (await this.applyFeature(Feature.FanMaxPlus)) {
					changedByStatus = true;
					appliedFeaturesList.push("FanMaxPlus");
				}
			}
		}

		// MopDry
		if (validStatus.dry_status !== undefined && !this.appliedFeatures.has(Feature.MopDry)) {
			// this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected MopDry feature via 'dry_status' key.`);
			if (await this.applyFeature(Feature.MopDry)) {
				changedByStatus = true;
				appliedFeaturesList.push("MopDry");
			}
		}

		// AutoEmptyDock
		if (validStatus.dust_collection_status !== undefined && !this.appliedFeatures.has(Feature.AutoEmptyDock)) {
			// this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected AutoEmptyDock feature via 'dust_collection_status' key.`);
			if (await this.applyFeature(Feature.AutoEmptyDock)) {
				changedByStatus = true;
				appliedFeaturesList.push("AutoEmptyDock");
			}
		}

		// MopWash
		if (validStatus.wash_status !== undefined && !this.appliedFeatures.has(Feature.MopWash)) {

			if (await this.applyFeature(Feature.MopWash)) {
				changedByStatus = true;
				appliedFeaturesList.push("MopWash");
			}
		}

		// Dynamic DockingStationStatus
		const dssSupportedDockTypes = [1, 2, 3, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18];
		const hasDssInStatus = validStatus.dss !== undefined;
		const hasSupportedDock = validStatus.dock_type !== undefined && dssSupportedDockTypes.includes(validStatus.dock_type);

		if ((hasDssInStatus || hasSupportedDock) && !this.appliedFeatures.has(Feature.DockingStationStatus)) {
			if (await this.applyFeature(Feature.DockingStationStatus)) {
				changedByStatus = true;
				appliedFeaturesList.push("DockingStationStatus");
			}
		}

		// Ensure Consumables features are applied (standard for all vacuums really, but good to be explicit)
		if (!this.appliedFeatures.has(Feature.Consumables)) {
			if (await this.applyFeature(Feature.Consumables)) {
				changedByStatus = true;
				appliedFeaturesList.push("Consumables");
			}
		}
		// ResetConsumables is now handled dynamically inside updateConsumables loop,
		// but we might want to register the Feature if we attach commands to it in future.
		// For now, the buttons are created in updateConsumables.

		// Add more status-based detection rules here...

		if (changedByStatus || changedOverall) {
			this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Runtime detection applied new features/commands: ${appliedFeaturesList.join(", ")}`);
		} else {
			this.deps.log.debug(`[RuntimeDetect|${this.robotModel}|${this.duid}] No new features detected.`);
		}
		this.runtimeDetectionComplete = true;
		return changedOverall || changedByStatus; // Return true if anything changed
	}

	private lastDockType: number | undefined;

	public async processDockType(dockTypeInput: number | undefined): Promise<void> {
		if (dockTypeInput === undefined) {
			this.deps.log.debug(`[processDockType|${this.duid}] dockTypeInput is undefined, skipping dock processing.`);
			return;
		}
		const dockTypeSchema = z.number().int().min(0);
		const validation = dockTypeSchema.safeParse(dockTypeInput);
		if (!validation.success) {
			this.deps.log.warn(`[processDockType|${this.duid}] Invalid dockTypeInput received: ${dockTypeInput}. Errors: ${JSON.stringify(validation.error.issues)}`);
			return;
		}
		const dockType = validation.data;

		// Optimization: Skip if dock type hasn't changed
		if (this.lastDockType === dockType) {
			this.deps.log.silly(`[${this.duid}] Dock type ${dockType} unchanged, skipping processing.`);
			return;
		}
		this.lastDockType = dockType;

		this.deps.log.info(`[${this.duid}] Processing dock type ${dockType} for Vacuum`);
		const dockFeatureMap: Record<number, Feature[]> = {
			1: [Feature.AutoEmptyDock, Feature.DockingStationStatus],
			2: [Feature.MopWash, Feature.DockingStationStatus],
			3: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus],
			5: [Feature.AutoEmptyDock],
			6: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus],
			7: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus],
			8: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus],
			9: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus],
			14: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus], // Qrevo Master (a117)
			15: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus], // Qrevo S (a104)
			16: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus],
			10: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus], // S7 MaxV/Pro
			17: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus], // Qrevo Curv Series (a159)
			18: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry, Feature.DockingStationStatus], // S8 Pro
		};
		const features = dockFeatureMap[dockType];

		if (features) {
			this.deps.log.info(`[${this.duid}] Applying dock features for type ${dockType}: ${features.join(", ")}`); // Apply features sequentially to handle dependencies
			for (const feature of features) {
				await this.applyFeature(feature); // applyFeature handles de-duplication
			}
		} else if (dockType !== 0) {
			this.deps.log.warn(`[processDockType|${this.duid}] Unknown dock type ${dockType} encountered. No features applied. Please report this model and dock type.`);
		}
	}

	// --- Instance Getters for Constants ---
	public getCommonConsumable(attribute: string | number): { unit?: string } | undefined {
		return BaseVacuumFeatures.CONSTANTS.consumables[attribute as keyof typeof BaseVacuumFeatures.CONSTANTS.consumables];
	}
	public isResetableConsumable(consumable: string): boolean {
		// Access static constant
		return BaseVacuumFeatures.CONSTANTS.resetConsumables.has(consumable);
	}
	public getCommonDeviceStates(attribute: string | number): { states?: Record<any, any>; unit?: string; type?: ioBroker.CommonType | undefined } | undefined {
		const stateDef = BaseVacuumFeatures.CONSTANTS.deviceStates[attribute as keyof typeof BaseVacuumFeatures.CONSTANTS.deviceStates];
		if (!stateDef) return undefined;

		const result = { ...stateDef } as { states?: Record<any, any>; unit?: string; type?: ioBroker.CommonType | undefined };

		if (attribute === "fan_power" && this.profile.mappings.fan_power) {
			result.states = this.profile.mappings.fan_power;
		} else if (attribute === "mop_mode" && this.profile.mappings.mop_mode) {
			result.states = this.profile.mappings.mop_mode;
		} else if (attribute === "water_box_mode" && this.profile.mappings.water_box_mode) {
			result.states = this.profile.mappings.water_box_mode;
		} else if (attribute === "error_code" && this.profile.mappings.error_code) {
			result.states = this.profile.mappings.error_code;
		} else if (attribute === "state" && this.profile.mappings.state) {
			result.states = this.profile.mappings.state;
		}

		return result;
	}
	public getCommonCleaningInfo(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		return BaseVacuumFeatures.CONSTANTS.cleaningInfo[attribute as keyof typeof BaseVacuumFeatures.CONSTANTS.cleaningInfo] as Partial<ioBroker.StateCommon>;
	}
	public getCommonCleaningRecords(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		const spec = BaseVacuumFeatures.CONSTANTS.cleaningRecords[attribute as keyof typeof BaseVacuumFeatures.CONSTANTS.cleaningRecords];
		return spec as Partial<ioBroker.StateCommon> | undefined;
	}
	public getFirmwareFeatureName(featureID: string | number): string {
		// Retrieve feature name from static constants
		const name = BaseVacuumFeatures.CONSTANTS.firmwareFeatures[featureID as keyof typeof BaseVacuumFeatures.CONSTANTS.firmwareFeatures];
		return name || `FeatureID_${featureID}`;
	}

	// --- Feature Implementations ---
	// Converted to methods with decorators

    @BaseDeviceFeatures.DeviceFeature(Feature.AutoEmptyDock)
	protected addAutoEmptyDockCommands(): void {
		this.addCommand("app_start_collect_dust", { type: "boolean", def: false });
		this.addCommand("app_stop_collect_dust", { type: "boolean", def: false });
		this.addCommand("set_dust_collection_switch_status", { type: "json", def: '{"status":1}', states: { '{"status":0}': "Off", '{"status":1}': "On" } });
		this.addCommand("set_dust_collection_mode", {
			type: "json",
			def: '{"mode":0}',
			states: { '{"mode":0}': "Smart", '{"mode":1}': "Low", '{"mode":2}': "Medium", '{"mode":4}': "Max" },
		});
	}

    @BaseDeviceFeatures.DeviceFeature(Feature.MopWash)
    protected addMopWashCommands(): void {
    	this.addCommand("app_start_wash", { type: "boolean", def: false });
    	this.addCommand("app_stop_wash", { type: "boolean", def: false });
    	this.addCommand("set_wash_towel_mode", {
    		type: "json",
    		def: '{"wash_mode":2}',
    		states: { '{"wash_mode":0}': "Eco", '{"wash_mode":1}': "Medium", '{"wash_mode":2}': "Intense" },
    	});
    	this.addCommand("set_smart_wash_params", {
    		type: "json",
    		def: '{"smart_wash":0,"wash_interval":1800}',
    		states: {
    			'{"smart_wash":0,"wash_interval":600}': "10 Min",
    			'{"smart_wash":0,"wash_interval":900}': "15 Min",
    			'{"smart_wash":0,"wash_interval":1200}': "20 Min",
    			'{"smart_wash":0,"wash_interval":1500}': "25 Min",
    			'{"smart_wash":0,"wash_interval":1800}': "30 Min",
    			'{"smart_wash":0,"wash_interval":2100}': "35 Min",
    			'{"smart_wash":0,"wash_interval":2400}': "40 Min",
    			'{"smart_wash":0,"wash_interval":2700}': "45 Min",
    			'{"smart_wash":0,"wash_interval":3000}': "50 Min",
    			'{"smart_wash":1,"wash_interval":1200}': "Per room",
    		},
    	});
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.MopDry)
    protected addMopDryCommands(): void {
    	this.addCommand("app_set_dryer_status", { type: "string", def: '{"status": 0}', states: { '{"status": 1}': "On", '{"status": 0}': "Off" } });
    	this.addCommand("app_set_dryer_setting", {
    		type: "json",
    		def: '{"on":{"dry_time":10800},"status":0}',
    		states: {
    			'{"on":{"dry_time":10800},"status":0}': "Off",
    			'{"on":{"dry_time":7200},"status":1}': "2h",
    			'{"on":{"dry_time":10800},"status":1}': "3h",
    			'{"on":{"dry_time":14400},"status":1}': "4h",
    		},
    	});
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.WaterBox)
    @BaseDeviceFeatures.DeviceFeature(Feature.ShakeMopStrength)
    @BaseDeviceFeatures.DeviceFeature(Feature.ElectronicWaterBox)
    protected addWaterBoxCommands(): void {
    	const mopStates = this.profile.mappings.mop_mode || VACUUM_CONSTANTS.deviceStates.mop_mode.states;
    	this.addCommand("set_mop_mode", { type: "number", def: 300, states: mopStates });

    	const waterStates = this.profile.mappings.water_box_mode || VACUUM_CONSTANTS.deviceStates.water_box_mode.states;
    	this.addCommand("set_water_box_custom_mode", { type: "number", def: 201, states: waterStates });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.CleanRouteFastMode)
    protected addCleanRouteFastModeCommand(): void {
    	const mopMode = this.commands.set_mop_mode || { type: "number", def: 300, states: {} };
    	mopMode.states = { ...BaseVacuumFeatures.CONSTANTS.deviceStates.mop_mode.states, ...mopMode.states, 304: "Fast" }; // Merge carefully
    	this.addCommand("set_mop_mode", mopMode);
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.SmartPlan)
    protected addSmartPlanFeature(): void {
    	const mopMode = this.commands.set_mop_mode || { type: "number", def: 300, states: {} };
    	mopMode.states = { ...mopMode.states, 306: "SmartPlan" };
    	this.addCommand("set_mop_mode", mopMode);
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.LiveVideo)
    @BaseDeviceFeatures.DeviceFeature(Feature.Camera)
    protected async createCameraStates(): Promise<void> {
    	const ip = this.deps.config.hostname_ip; // Use DI config
    	if (!ip) {
    		this.deps.log.warn(`[${this.duid}] Cannot create camera states: IP address not configured.`);
    		return;
    	}
    	const streamTypes = {
    		stream_html: `http://${ip}:${1984 + this.deps.adapter.instance}/stream.html?src=${this.duid}`,
    		webrtc_html: `http://${ip}:${1984 + this.deps.adapter.instance}/webrtc.html?src=${this.duid}&media=video`,
    		stream_mp4: `http://${ip}:${1984 + this.deps.adapter.instance}/api/stream.mp4?src=${this.duid}`,
    		rtsp: `rtsp://${ip}:${8554 + this.deps.adapter.instance}/${this.duid}?video`,
    	};
    	await this.deps.ensureFolder(`Devices.${this.duid}.camera`);
    	for (const [name, stream_uri] of Object.entries(streamTypes)) {
    		// Use ensureState helper
    		await this.ensureState("camera", name, { type: "string", role: "url", write: false, def: stream_uri });
    	}
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.MultiFloor)
    protected async createMultiFloorStates(): Promise<void> {
    	await this.deps.ensureFolder(`Devices.${this.duid}.floors`);
    	for (const feature of ["max_multi_map", "max_bak_map", "multi_map_count"]) {
    		await this.ensureState("floors", feature, { ...this.getCommonDeviceStates(feature), write: false });
    	}
    }

    public async updateConsumables(data?: any): Promise<void> {
    	let resultObj: Record<string, any> | undefined;

    	if (data) {
    		resultObj = data;
    	} else {
    		const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_consumable", []);
    		if (Array.isArray(result) && result.length > 0 && typeof result[0] === "object") {
    			resultObj = result[0];
    		} else if (typeof result === "object" && result !== null) {
    			resultObj = result as Record<string, any>;
    		}
    	}

    	if (resultObj) {
    		await this.deps.ensureFolder(`Devices.${this.duid}.consumables`);
    		await this.deps.ensureFolder(`Devices.${this.duid}.resetConsumables`);

    		for (const key in resultObj) {
    			let val = resultObj[key];
    			const common = this.getCommonConsumable(key);
    			const fullCommon = common ? { ...common, type: "number" as const, role: "value" as const, read: true, write: false, name: key }
    				: { type: "number" as const, role: "value" as const, read: true, write: false, name: key };

    			if (fullCommon.unit === "h" && typeof val === "number") {
    				val = Math.round(val / 3600);
    			}

    			await this.deps.ensureState(`Devices.${this.duid}.consumables.${key}`, fullCommon as ioBroker.StateCommon);
    			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.consumables.${key}`, { val: Number(val), ack: true });

    			if (BaseVacuumFeatures.CONSTANTS.resetConsumables.has(key)) {
    				await this.ensureState("resetConsumables", key, {
    					type: "boolean",
    					role: "button",
    					def: false,
    					write: true,
    					name: `Reset ${key}`
    				});
    			}
    		}
    	}
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.AvoidCarpet)
    @BaseDeviceFeatures.DeviceFeature(Feature.isCarpetSupported)
    protected addAvoidCarpetCommands(): void {
    	this.addCommand("set_carpet_mode", { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_mode.states });
    	this.addCommand("set_carpet_clean_mode", { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_clean_mode.states });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.isAvoidCollisionSupported)
    protected async addAvoidCollisionStates(): Promise<void> {
    	await this.ensureState("deviceStatus", "collision_avoid_status", { ...this.getCommonDeviceStates("collision_avoid_status"), write: false });
    	await this.ensureState("deviceStatus", "avoid_count", { ...this.getCommonDeviceStates("avoid_count"), write: false });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.MopForbidden)
    protected async addMopForbiddenStates(): Promise<void> {
    	await this.ensureState("deviceStatus", "mop_forbidden_enable", { ...this.getCommonDeviceStates("mop_forbidden_enable"), write: false });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.VoiceControl)
    protected async addVoiceControlStates(): Promise<void> {
    	await this.ensureState("deviceStatus", "voice_chat_status", { ...this.getCommonDeviceStates("voice_chat_status"), write: false });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.Camera)
    protected async addCameraSettingsStates(): Promise<void> {
    	await this.ensureState("deviceStatus", "camera_status", { ...this.getCommonDeviceStates("camera_status"), write: false });
    	await this.ensureState("deviceStatus", "distance_off", { ...this.getCommonDeviceStates("distance_off"), write: false });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.isSupportSetSwitchMapMode)
    protected async addSwitchMapModeState(): Promise<void> {
    	await this.ensureState("deviceStatus", "switch_map_mode", { ...this.getCommonDeviceStates("switch_map_mode"), write: false });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.isCornerCleanModeSupported)
    protected async addCornerCleanModeState(): Promise<void> {
    	await this.ensureState("deviceStatus", "corner_clean_mode", { ...this.getCommonDeviceStates("corner_clean_mode"), write: false });
    }



    // --- State/Info Feature Handlers ---
    @BaseDeviceFeatures.DeviceFeature(Feature.MapFlag)
    protected async addMapFlagState(): Promise<void> { await this.ensureState("deviceStatus", "map_flag", { ...this.getCommonDeviceStates("map_flag"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.CommonStatus)
    protected async addCommonStatusState(): Promise<void> { await this.ensureState("deviceStatus", "common_status", { ...this.getCommonDeviceStates("common_status"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.DockStatus)
    protected async addDockErrorStatusState(): Promise<void> { await this.ensureState("deviceStatus", "dock_error_status", { ...this.getCommonDeviceStates("dock_error_status"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.BackType)
    protected async addBackTypeState(): Promise<void> { await this.ensureState("deviceStatus", "back_type", { ...this.getCommonDeviceStates("back_type"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.SwitchStatus)
    protected async addSwitchStatusState(): Promise<void> { await this.ensureState("deviceStatus", "switch_status", { ...this.getCommonDeviceStates("switch_status"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.MonitorStatus)
    protected async addMonitorStatusState(): Promise<void> { await this.ensureState("deviceStatus", "monitor_status", { ...this.getCommonDeviceStates("monitor_status"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.CleanPercent)
    protected async addCleanPercentState(): Promise<void> { await this.ensureState("deviceStatus", "clean_percent", { ...this.getCommonDeviceStates("clean_percent"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.InWarmup)
    protected async addInWarmupState(): Promise<void> { await this.ensureState("deviceStatus", "in_warmup", { ...this.getCommonDeviceStates("in_warmup"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.ExitDock)
    protected async addExitDockState(): Promise<void> { await this.ensureState("deviceStatus", "exit_dock", { ...this.getCommonDeviceStates("exit_dock"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.ExtraTime)
    protected async addExtraTimeState(): Promise<void> { await this.ensureState("deviceStatus", "extra_time", { ...this.getCommonDeviceStates("extra_time"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.LastCleanTime)
    protected async addLastCleanTimeState(): Promise<void> { await this.ensureState("deviceStatus", "last_clean_t", { ...this.getCommonDeviceStates("last_clean_t"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.ChargeStatus)
    protected async addChargeStatusState(): Promise<void> { await this.ensureState("deviceStatus", "charge_status", { ...this.getCommonDeviceStates("charge_status"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.CleaningInfo)
    protected async addCleaningInfoState(): Promise<void> { await this.ensureState("deviceStatus", "cleaning_info", { ...this.getCommonDeviceStates("cleaning_info"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.CleanRepeat)
    protected async addCleanRepeatState(): Promise<void> { await this.ensureState("deviceStatus", "repeat", { ...this.getCommonDeviceStates("repeat"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.DockingStationStatus)
    protected async createDockingStationStatusStates(): Promise<void> {
    	try {
    		await this.deps.ensureFolder(`Devices.${this.duid}.dockingStationStatus`);

    		// Common states mapping for docking station status values (from original implementation)
    		const commonStates = {
    			0: "UNKNOWN",
    			1: "ERROR",
    			2: "OK"
    		};

    		// Create all docking station status states (original field names from working code)
    		const stateDefinitions = [
    			{ key: "cleanFluidStatus", name: "Clean Water Tank" },
    			{ key: "waterBoxFilterStatus", name: "Water Box Filter" },
    			{ key: "dustBagStatus", name: "Dust Bag" },
    			{ key: "dirtyWaterBoxStatus", name: "Dirty Water Tank" },
    			{ key: "clearWaterBoxStatus", name: "Clear Water Box" },
    			{ key: "isUpdownWaterReady", name: "Water Ready Status" }
    		];

    		for (const stateDef of stateDefinitions) {
    			await this.ensureState("dockingStationStatus", stateDef.key, {
    				name: stateDef.name,
    				type: "number",
    				role: "value",
    				read: true,
    				write: false,
    				states: commonStates
    			});
    		}

    	} catch (error) {
    		throw error;
    	}
    }

    public override async updateFirmwareFeatures(): Promise<void> {
    	try {
    		const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_fw_features", []);
    		if (Array.isArray(result)) {
    			// Store in http_api for getDynamicFeatures usage
    			this.deps.http_api.storeFwFeaturesResult(this.duid, result);

    			// Setup states
    			await this.setupFirmwareFeatures(result);
    		}
    	} catch (e: any) {
    		this.deps.log.warn(`[${this.duid}] Failed to update firmware features: ${e.message}`);
    	}
    }

    protected async setupFirmwareFeatures(features: number[]): Promise<void> {
    	await this.deps.ensureFolder(`Devices.${this.duid}.firmwareFeatures`);

    	// Loop through all known features from CONSTANTS
    	for (const [id, name] of Object.entries(BaseVacuumFeatures.CONSTANTS.firmwareFeatures)) {
    		const isSupported = features.includes(Number(id));
    		await this.ensureState("firmwareFeatures", name, {
    			type: "boolean",
    			role: "indicator",
    			name: `${name} (ID: ${id})`,
    			write: false
    		});
    		await this.deps.adapter.setStateChangedAsync(
    			`Devices.${this.duid}.firmwareFeatures.${name}`,
    			{ val: isSupported, ack: true }
    		);
    	}
    }

    // Override updateStatus to process dss breakdown
    public override async updateStatus(): Promise<void> {
    	// Re-implementing updateStatus for detailed handling
    	try {
    		const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_prop", ["get_status"]);
    		let resultObj: Record<string, any> | undefined;

    		if (Array.isArray(result) && result.length > 0 && typeof result[0] === "object") {
    			resultObj = result[0];
    		} else if (typeof result === "object" && result !== null) {
    			resultObj = result as Record<string, any>;
    		}

    		if (resultObj) {
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

    			await this.deps.ensureFolder(`Devices.${this.duid}.deviceStatus`);
    			for (const key in resultObj) {
    				let val = resultObj[key];
    				const common = this.getCommonDeviceStates(key) || { name: key, type: typeof val as ioBroker.CommonType, read: true, write: false };

    				// Serialize complex objects
    				if (typeof val === "object" && val !== null) {
    					val = JSON.stringify(val);
    				}

    				if (["clean_time", "clean_area", "cleaned_area"].includes(key)) {
    					if (key === "clean_time") {
    						val = Math.round((val as number) / 60);
    					} else if (key === "clean_area" || key === "cleaned_area") {
    						val = Number(((val as number) / 1000000).toFixed(2));
    					}
    				}

    				if (common.type === "string" && typeof val !== "string") {
    					val = String(val);
    				}

    				await this.deps.ensureState(`Devices.${this.duid}.deviceStatus.${key}`, common);
    				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.deviceStatus.${key}`, { val: val as ioBroker.StateValue, ack: true });
    			}
    		}
    	} catch (e: any) {
    		this.deps.log.warn(`[${this.duid}] Failed to update status: ${e.message}`);
    	}
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
    		await this.deps.adapter.setStateChangedAsync(
    			`Devices.${this.duid}.dockingStationStatus.${name}`,
    			{ val: val, ack: true }
    		);
    	}
    }


    @BaseDeviceFeatures.DeviceFeature(Feature.Rss)
    protected async addRssState(): Promise<void> { await this.ensureState("deviceStatus", "rss", { ...this.getCommonDeviceStates("rss"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.RobotStatus)
    protected async addRobotStatusState(): Promise<void> { await this.ensureState("deviceStatus", "state", { ...this.getCommonDeviceStates("state"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.Kct)
    protected async addKctState(): Promise<void> { await this.ensureState("deviceStatus", "kct", { ...this.getCommonDeviceStates("kct"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.CleanFluid)
    protected async addCleanFluidState(): Promise<void> { await this.ensureState("deviceStatus", "clean_fluid", { ...this.getCommonDeviceStates("clean_fluid"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.Rdt)
    protected async addRdtState(): Promise<void> { await this.ensureState("deviceStatus", "rdt", { ...this.getCommonDeviceStates("rdt"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.ReplenishMode)
    protected async addReplenishModeState(): Promise<void> { await this.ensureState("deviceStatus", "replenish_mode", { ...this.getCommonDeviceStates("replenish_mode"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.CleanedArea)
    protected async addCleanedAreaState(): Promise<void> { await this.ensureState("deviceStatus", "cleaned_area", { ...this.getCommonDeviceStates("cleaned_area"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.CleanTimes)
    protected async addCleanTimesState(): Promise<void> { await this.ensureState("deviceStatus", "clean_times", { ...this.getCommonDeviceStates("clean_times"), write: false }); }

    @BaseDeviceFeatures.DeviceFeature(Feature.CustomWaterBoxDistance)
    protected async createCustomWaterDistanceState(): Promise<void> {

    	await this.ensureState("commands", "set_water_box_distance_off", {
    		type: "number",
    		role: "level",
    		write: true,
    		...this.getCommonDeviceStates("distance_off"),
    		min: 1,
    		max: 30,
    	});
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.FanMaxPlus)
    protected addFanMaxPlusCommand(): void {
    	const fanStates = this.profile.mappings.fan_power || VACUUM_CONSTANTS.deviceStates.fan_power.states;
    	// Use set_custom_mode for fan power as per base commands
    	this.addCommand("set_custom_mode", { type: "number", def: 102, states: fanStates });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.NetworkInfo)
    protected async addNetworkInfoStates(): Promise<void> {
    	await this.deps.ensureFolder(`Devices.${this.duid}.networkInfo`);
    	await this.ensureState("networkInfo", "ssid", { type: "string", role: "info.name", write: false });
    	await this.ensureState("networkInfo", "ip", { type: "string", role: "info.ip", write: false });
    	await this.ensureState("networkInfo", "mac", { type: "string", role: "info.mac", write: false });
    	await this.ensureState("networkInfo", "bssid", { type: "string", role: "info.address", write: false });
    	await this.ensureState("networkInfo", "rssi", { type: "number", role: "value.rssi", write: false, unit: "dBm" });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.UpdateStatus)
    protected async addUpdateStatusStates(): Promise<void> {
    	await this.deps.ensureFolder(`Devices.${this.duid}.updateStatus`);
    	await this.ensureState("updateStatus", "checking", { type: "boolean", role: "indicator", write: false });
    	await this.ensureState("updateStatus", "available", { type: "boolean", role: "indicator", write: false });
    	await this.ensureState("updateStatus", "progress", { type: "number", role: "value", write: false, unit: "%" });
    	await this.ensureState("updateStatus", "version", { type: "string", role: "info.firmware", write: false });
    	await this.ensureState("updateStatus", "description", { type: "string", role: "text", write: false });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.SmartModeCommand)
    protected addSmartModeCommand(): void {
    	this.addCommand("app_set_clean_sequence_type", {
    		type: "json",
    		role: "value.list",
    		def: '{"fan_power":110,"mop_mode":306,"type":0,"water_box_mode":209}',
    		states: {
    			'{"fan_power":102,"mop_mode":300,"repeat":1,"type":1,"water_box_mode":201}': "Mop and vacuum",
    			'{"fan_power":110,"mop_mode":306,"type":0,"water_box_mode":209}': "Smart mode",
    		},
    	});
    }

    // --- Complex Update Implementations ---

    private static readonly MAPPED_CLEAN_SUMMARY: Record<string, string> = { 0: "clean_time", 1: "clean_area", 2: "clean_count", 3: "records" };
    private static readonly MAPPED_CLEANING_RECORD_ATTRIBUTE: Record<string, string> = {
    	0: "begin",
    	1: "end",
    	2: "duration",
    	3: "area",
    	4: "error",
    	5: "complete",
    	6: "start_type",
    	7: "clean_type",
    	8: "finish_reason",
    	9: "dust_collection_status",
    };

    public override async updateRoomMapping(): Promise<void> {
    	try {
    		const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_room_mapping", []);
    		this.mappedRooms = result as any[];

    		if (!Array.isArray(result) || result.length === 0) {
    			return;
    		}

    		let mapStatus = 0;
    		const mapStatusState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.map_status`);

    		if (mapStatusState && typeof mapStatusState.val === "number") {
    			mapStatus = mapStatusState.val;
    		} else {
    			const statusRes = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_prop", ["get_status"]);
    			if (Array.isArray(statusRes) && statusRes[0] && typeof statusRes[0] === "object" && "map_status" in statusRes[0]) {
    				mapStatus = Number((statusRes[0] as any)["map_status"]);
    			}
    		}

    		const roomFloor = mapStatus >> 2;
    		const roomIDs = this.deps.http_api.getMatchedRoomIDs(true);

    		for (const item of result) {
    			if (!Array.isArray(item) || item.length < 2) continue;
    			const shortID = item[0];
    			const roomID = String(item[1]);

    			const room = roomIDs.find((r) => String(r.id) === roomID);
    			const roomName = room ? room.name : `Room ${shortID}`;
    			const pathName = `${roomFloor}.${shortID}`;

    			await this.ensureState("floors", pathName, {
    				name: roomName,
    				type: "boolean",
    				role: "value",
    				def: true,
    				write: true,
    				read: true
    			});

    			// Only set to true if not already set? Old code set it always.
    			// Start with true (selected)
    			const fullStateId = `Devices.${this.duid}.floors.${pathName}`;
    			const currentState = await this.deps.adapter.getStateAsync(fullStateId);

    			if (!currentState || currentState.val === null) {
    				await this.deps.adapter.setStateAsync(fullStateId, { val: true, ack: true });
    			}
    		}

    		await this.ensureState("floors", "cleanCount", {
    			name: "Clean count",
    			type: "number",
    			role: "value",
    			def: 1,
    			min: 1,
    			max: 10,
    			write: true,
    			read: true
    		});
    	} catch (e: any) {
    		this.deps.log.warn(`[${this.duid}] Failed to update room mapping: ${e.message}`);
    	}
    }



    public override async getCommandParams(method: string, params?: unknown): Promise<unknown> {
    	if (method === "app_segment_clean") {
    		try {
    			this.deps.log.debug(`[${this.duid}] Generating params for app_segment_clean...`);
    			const roomList: { segments: number[]; repeat: number } = { segments: [], repeat: 1 };

    			// 1. Get current map/floor
    			const mapStatusState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.map_status`);
    			let roomFloor = 0;
    			if (mapStatusState && typeof mapStatusState.val === "number") {
    				roomFloor = mapStatusState.val >> 2;
    			} else {
    				this.deps.log.warn(`[${this.duid}] app_segment_clean: map_status not available, assuming floor 0.`);
    			}

    			// 2. Get Room Mapping (to know which IDs to check)
    			// We use the cached/latest mapping from API because looking up folders is harder without knowing IDs
    			const mappedRoomList = (await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_room_mapping", [], { priority: 1 })) as any[];

    			if (Array.isArray(mappedRoomList)) {
    				for (const item of mappedRoomList) {
    					// item: [shortID, roomID]
    					if (!Array.isArray(item) || item.length < 1) continue;
    					const shortID = item[0];

    					// 3. Check 'floors.floor.shortID' state
    					const statePath = `Devices.${this.duid}.floors.${roomFloor}.${shortID}`;
    					const roomState = await this.deps.adapter.getStateAsync(statePath);

    					if (roomState && roomState.val === true) {
    						roomList.segments.push(shortID);
    					}
    				}
    			}

    			// 4. Get Repeat Count
    			const cleanCountState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.floors.cleanCount`);
    			if (cleanCountState && typeof cleanCountState.val === "number") {
    				roomList.repeat = cleanCountState.val;
    			}

    			// 5. Build Final Params
    			if (roomList.segments.length === 0) {
    				this.deps.log.warn(`[${this.duid}] app_segment_clean: No rooms selected! Command might be ignored by robot.`);
    			} else {
    				this.deps.log.info(`[${this.duid}] Starting segment clean for rooms: ${roomList.segments.join(", ")} (Repeat: ${roomList.repeat})`);
    			}

    			// Reset count to 1 after start (from legacy behavior)
    			await this.deps.adapter.setStateAsync(`Devices.${this.duid}.floors.cleanCount`, { val: 1, ack: true });

    			// Roborock expects array of objects? Legacy code: [roomList]
    			return [roomList];

    		} catch (e: any) {
    			this.deps.log.error(`[${this.duid}] Failed to generate params for app_segment_clean: ${e.message}`);
    			return params; // Fallback
    		}
    	}

    	if (
    		method === "set_water_box_custom_mode" ||
    		method === "set_custom_mode" ||
    		method === "set_clean_motor_mode" ||
    		method === "set_mop_mode" ||
    		method === "set_smart_wash_params" ||
    		method === "set_carpet_mode" ||
    		method === "set_carpet_clean_mode" ||
    		method === "set_dust_collection_mode" ||
    		method === "set_water_box_distance_off" ||
    		method === "app_set_dryer_setting" ||
    		method === "set_wash_towel_mode" ||
    		method === "set_dust_collection_switch_status"
    	) {
    		// These commands require parameters to be wrapped in an array [val]
    		if (params !== undefined && !Array.isArray(params)) {
    			// If params is a string (ioBroker JSON state), try to parse it first
    			if (typeof params === "string") {
    				try {
    					const parsed = JSON.parse(params);
    					return [parsed];
    				} catch {
    					// Not JSON, wrap as is
    					return [params];
    				}
    			}
    			return [params];
    		}
    	}

    	return params;
    }

    public override async updateCleanSummary(): Promise<void> {
    	try {
    		const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_clean_summary", [], { priority: 0 });
    		const cleaningAttributes = result as Record<string, unknown>;

    		for (const cleaningAttribute in cleaningAttributes) {
    			const mappedAttribute = BaseVacuumFeatures.MAPPED_CLEAN_SUMMARY[cleaningAttribute] || cleaningAttribute;
    			const cleaningAttributeCommon = this.getCommonCleaningInfo(mappedAttribute);

    			if (["clean_time", "clean_area", "clean_count"].includes(mappedAttribute)) {
    				let val = cleaningAttributes[cleaningAttribute] as number;

    				if (mappedAttribute === "clean_time") {
    					val = Number((val / 3600).toFixed(2));
    				} else if (mappedAttribute === "clean_area") {
    					val = Number((val / 1000000).toFixed(2));
    				}

    				if (cleaningAttributeCommon) (cleaningAttributeCommon as ioBroker.StateCommon).type = "number";

    				await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${mappedAttribute}`, cleaningAttributeCommon || {});
    				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.${mappedAttribute}`, {
    					val: val as ioBroker.StateValue,
    					ack: true,
    				});
    			} else if (mappedAttribute == "records") {
    				await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records`);
    				const recordsList = cleaningAttributes[cleaningAttribute] as Record<string, number>;
    				const cleaningRecordsJSON: unknown[] = [];

    				// Process records sequentially
    				for (const cleaningRecord in recordsList) {
    					const cleaningRecordID = recordsList[cleaningRecord];

    					try {
    						await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}`);

    						const cleaningRecordAttributesArr = (await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_clean_record", [cleaningRecordID], { priority: 0 })) as unknown[];
    						const cleaningRecordAttributes = cleaningRecordAttributesArr[0] as Record<string, unknown>;

    						cleaningRecordsJSON[parseInt(cleaningRecord)] = cleaningRecordAttributes;

    						for (const cleaningRecordAttribute in cleaningRecordAttributes) {
    								const mappedRecordAttribute = BaseVacuumFeatures.MAPPED_CLEANING_RECORD_ATTRIBUTE[cleaningRecordAttribute] || cleaningRecordAttribute;
    								let val = cleaningRecordAttributes[cleaningRecordAttribute];

    								if (["begin", "end"].includes(mappedRecordAttribute)) {
    									val = new Date((val as number) * 1000).toString();
    								} else if (mappedRecordAttribute == "duration") {
    									val = Math.round((val as number) / 60);
    								} else if (mappedRecordAttribute == "duration") {
    									val = Math.round((val as number) / 60);
    								} else if (mappedRecordAttribute == "area" || mappedRecordAttribute == "cleaned_area") {
    									val = Number(((val as number) / 1000000).toFixed(2));
    								}

    								const cleaningRecordCommon = this.getCommonCleaningRecords(mappedRecordAttribute);
    								if (cleaningRecordCommon) {
    									await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, cleaningRecordCommon);
    									await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, {
    										val: val as ioBroker.StateValue,
    										ack: true,
    									});
    								}
    							}

    						if (this.deps.config.enable_map_creation == true) {
    							const mapArray = await this.getCleaningRecordMap(recordsList[cleaningRecord]);
    							if (mapArray) {
    								await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapData`, {
    									name: "Map Data JSON",
    									type: "string",
    									role: "json",
    								});
    								await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapData`, { val: mapArray.mapData, ack: true });

    								await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64`, {
    									name: "Map Image (Full, Uncropped)",
    									type: "string",
    									role: "text.png",
    								});
    								await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64`, { val: mapArray.mapBase64, ack: true });

    								await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64Truncated`, {
    									name: "Map Image (Full, Cropped)",
    									type: "string",
    									role: "text.png",
    								});
    								await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64Truncated`, {
    									val: mapArray.mapBase64Truncated,
    									ack: true,
    								});
    							}
    						}
    					} catch (e: any) {
    						this.deps.log.warn(`[${this.duid}] Failed to process cleaning record ${cleaningRecordID}: ${e.message}`);
    					}
    				}

    				await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.json`, { name: "Cleaning Records JSON", type: "string", role: "json" });
    				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.json`, { val: JSON.stringify(cleaningRecordsJSON), ack: true });
    			}
    		}
    	} catch (e: any) {
    		this.deps.log.warn(`[${this.duid}] Failed to update clean summary: ${e.message}`);
    	}
    }

    private async getCleaningRecordMap(startTime: number): Promise<{ mapBase64CleanUncropped: string; mapBase64: string; mapBase64Truncated: string; mapData: string } | null> {
    	try {
    		const cleaningRecordMap = (await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_clean_record_map", { start_time: startTime }, { priority: 0 })) as Buffer;

    		if (!Buffer.isBuffer(cleaningRecordMap)) {
    			return null;
    		}

    		// Check if map is gzipped (starts with 0x1f 0x8b)
    		let mapBuf: Buffer = cleaningRecordMap;
    		if (cleaningRecordMap[0] === 0x1f && cleaningRecordMap[1] === 0x8b) {
    			try {
    				const { promisify } = require("util");
    				const { gunzip } = require("zlib");
    				const gunzipAsync = promisify(gunzip);
    				mapBuf = await gunzipAsync(cleaningRecordMap);
    			} catch (e) {
    				this.deps.log.error(`[${this.duid}] Failed to unzip map data: ${e}`);
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
    		this.deps.log.warn(`[${this.duid}] Failed to get cleaning record map: ${e.message}`);
    		return null;
    	}
    }

    public override async updateMap(): Promise<void> {
    	try {
    		const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_map_v1", [], { priority: 0 });
    		const map = result as Buffer;

    		if (!Buffer.isBuffer(map)) {
    			return;
    		}

    		// Check if map is gzipped
    		let mapBuf: Buffer = map;
    		if (map[0] === 0x1f && map[1] === 0x8b) {
    			try {
    				const { promisify } = require("util");
    				const { gunzip } = require("zlib");
    				const gunzipAsync = promisify(gunzip);
    				mapBuf = await gunzipAsync(map);
    			} catch (e) {
    				this.deps.log.error(`[${this.duid}] Failed to unzip map data: ${e}`);
    				return;
    			}
    		}

    		const mapData = await this.deps.adapter.requestsHandler.mapParser.parsedata(mapBuf, this.mappedRooms);
    		if (mapData) {
    			// Update map states
    			await this.deps.ensureState(`Devices.${this.duid}.map.mapData`, { name: "Map Data", type: "string", role: "json" });
    			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapData`, { val: JSON.stringify(mapData), ack: true });

    			const [mapBase64Clean, mapBase64] = await this.deps.adapter.requestsHandler.mapCreator.canvasMap(mapData);

    			await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64Clean`, { name: "Map Image (Clean)", type: "string", role: "text.png" });
    			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapBase64Clean`, { val: mapBase64Clean, ack: true });
    			await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64`, { name: "Map Image", type: "string", role: "text.png" });
    			await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapBase64`, { val: mapBase64, ack: true });
    		}
    	} catch (e: any) {
    		this.deps.log.warn(`[${this.duid}] Failed to update map: ${e.message}`);
    	}
    }

    public override async updateExtraStatus(): Promise<void> {
    	const robotModel = this.deps.adapter.http_api.getRobotModel(this.duid);
    	switch (robotModel) {
    		case "roborock.vacuum.s4":
    		case "roborock.vacuum.s5":
    		case "roborock.vacuum.s5e":
    		case "roborock.vacuum.a08":
    		case "roborock.vacuum.a10":
    		case "roborock.vacuum.a40":
    			// No extra params needed
    			break;
    		case "roborock.vacuum.s6":
    		case "roborock.vacuum.a72":
    			await this.requestAndProcess("get_carpet_mode", [], "deviceStatus");
    			break;
    		case "roborock.vacuum.a27":
    			await this.requestAndProcess("get_dust_collection_switch_status", [], "deviceStatus");
    			await this.requestAndProcess("get_wash_towel_mode", [], "deviceStatus");
    			await this.requestAndProcess("get_smart_wash_params", [], "deviceStatus");
    			await this.requestAndProcess("app_get_dryer_setting", [], "deviceStatus");
    			break;
    		default:
    			// Assume newer models, try to get all
    			await this.requestAndProcess("get_carpet_mode", [], "deviceStatus");
    			await this.requestAndProcess("get_carpet_clean_mode", [], "deviceStatus");
    			await this.requestAndProcess("get_water_box_custom_mode", [], "deviceStatus");
    	}
    }

    public override async getPhoto(imgId: string, type: number): Promise<any> {
    	const requestParams = {
    		data_filter: {
    			img_id: imgId,
    			type: type,
    		},
    	};
    	return this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_photo", requestParams, { priority: 0 });
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.isShakeMopSetSupported)
    @BaseDeviceFeatures.DeviceFeature(Feature.isVideoMonitorSupported)
    @BaseDeviceFeatures.DeviceFeature(Feature.isVideoSettingSupported)
    @BaseDeviceFeatures.DeviceFeature(Feature.isPhotoUploadSupported)
    @BaseDeviceFeatures.DeviceFeature(Feature.isBackChargeAutoWashSupported)
    public async updateMultiMapsList(): Promise<void> {
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
    				await this.deps.adapter.extendObjectAsync(`Devices.${this.duid}.floors.${mapFlag}`, { common: { name } });

    				// Create States
    				await this.ensureState(`floors.${mapFlag}`, "name", { name: "Floor Name", type: "string", write: false });
    				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.floors.${mapFlag}.name`, { val: name, ack: true });

    				await this.ensureState(`floors.${mapFlag}`, "mapFlag", { name: "Map Flag", type: "number", write: false });
    				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.floors.${mapFlag}.mapFlag`, { val: mapFlag, ack: true });

    				await this.ensureState(`floors.${mapFlag}`, "add_time", { name: "Created At", type: "string", write: false });
    				await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.floors.${mapFlag}.add_time`, { val: formattedTime, ack: true });

    				// Load Button
    				await this.ensureState(`floors.${mapFlag}`, "load", { name: "Load Map", type: "boolean", role: "button", write: true, def: false });
    			}
    		} else {
    			// Fallback to default behavior if no map info (or empty)
    			await super.updateMultiMapsList();
    		}
    	} catch (e: any) {
    		this.deps.log.warn(`[${this.duid}] Failed to update floors/multi-maps: ${e.message}`);
    	}
    }

    @BaseDeviceFeatures.DeviceFeature(Feature.isSupportFDSEndPoint)
    @BaseDeviceFeatures.DeviceFeature(Feature.isSupportAutoSplitSegments)
    @BaseDeviceFeatures.DeviceFeature(Feature.isSupportOrderSegmentClean)
    @BaseDeviceFeatures.DeviceFeature(Feature.isMapSegmentSupported)
    @BaseDeviceFeatures.DeviceFeature(Feature.isSupportLedStatusSwitch)
    @BaseDeviceFeatures.DeviceFeature(Feature.isSupportFetchTimerSummary)
    @BaseDeviceFeatures.DeviceFeature(Feature.isOrderCleanSupported)
    @BaseDeviceFeatures.DeviceFeature(Feature.isRemoteSupported)
    @BaseDeviceFeatures.DeviceFeature(Feature.isSupportTaskId)
    protected placeholderFeatures(): void {
    	// No-op: These features are detected but require no specific initialization logic
    	this.deps.log.silly(`[${this.duid}] Placeholder feature initialized.`);
    }
}
