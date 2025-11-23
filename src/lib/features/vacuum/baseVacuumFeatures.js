// src/lib/features/vacuum/base_vacuum_features.ts
import { BaseDeviceFeatures } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { z } from "zod";
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
        .refine((val) => {
        if (val === undefined)
            return true;
        try {
            JSON.parse(val);
            return true;
        }
        catch {
            return false;
        }
    }, { message: "carpet_mode must be a valid JSON string or undefined" }),
    carpet_clean_mode: z
        .string()
        .optional()
        .refine((val) => {
        if (val === undefined)
            return true;
        try {
            JSON.parse(val);
            return true;
        }
        catch {
            return false;
        }
    }, { message: "carpet_clean_mode must be a valid JSON string or undefined" }),
    water_box_custom_mode: z.number().int().optional(), // Added for WaterBox detection
    // Add other relevant vacuum status fields...
})
    .passthrough(); // Allow fields not defined in the schema
export class BaseVacuumFeatures extends BaseDeviceFeatures {
    // --- Vacuum-specific Constants ---
    static CONSTANTS = {
        errorCodes: {
            0: "No error",
            1: "Laser sensor fault",
            2: "Collision sensor fault",
            3: "Wheel floating",
            4: "Cliff sensor fault",
            5: "Main brush blocked",
            6: "Side brush blocked",
            7: "Wheel blocked",
            8: "Device stuck",
            9: "Dust bin missing",
            10: "Filter blocked",
            11: "Magnetic field detected",
            12: "Low battery",
            13: "Charging problem",
            14: "Battery failure",
            15: "Wall sensor fault",
            16: "Uneven surface",
            17: "Side brush failure",
            18: "Suction fan failure",
            19: "Unpowered charging station",
            20: "Unknown Error",
            21: "Laser pressure sensor problem",
            22: "Charge sensor problem",
            23: "Dock problem",
            24: "No-go zone or invisible wall detected",
            254: "Bin full",
            255: "Internal error",
            "-1": "Unknown Error",
        },
        stateCodes: {
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
            22: "Emptying dust container",
            23: "Washing the mop",
            26: "Going to wash the mop",
            28: "In call",
            29: "Mapping",
            100: "Fully Charged",
        },
        dockTypes: {
            0: "Charging dock",
            1: "Auto-Empty Dock",
            2: "Empty Wash Fill Dock",
            3: "Empty Wash Fill (Dry) Dock",
            5: "Auto-Empty Dock (Q8 Max+)",
            7: "Empty Wash Fill Dry Dock (S8 Pro Ultra)",
            8: "Empty Wash Fill Dry Dock (Q Revo)",
            9: "Empty Wash Fill Dry Dock (Q Revo Pro)",
        },
        baseCommands: {
            app_start: { type: "boolean", def: false },
            app_segment_clean: { type: "boolean", def: false },
            app_stop: { type: "boolean", def: false },
            app_pause: { type: "boolean", def: false },
            app_charge: { type: "boolean", def: false },
            app_spot: { type: "boolean", def: false },
            app_zoned_clean: { type: "json" },
            resume_zoned_clean: { type: "boolean", def: false },
            stop_zoned_clean: { type: "boolean", def: false },
            resume_segment_clean: { type: "boolean", def: false },
            stop_segment_clean: { type: "boolean", def: false },
            set_custom_mode: { type: "number", def: 102, states: { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max", 105: "Off" } },
            find_me: { type: "boolean", def: false },
            app_goto_target: { type: "json" },
        },
        deviceStates: {
            dock_type: { type: "number", states: {} },
            error_code: { type: "number", states: {} },
            clean_area: { type: "number", unit: "m²" },
            clean_time: { type: "number", unit: "min" },
            battery: { type: "number", unit: "%" },
            state: { type: "number", states: {} },
            fan_power: { type: "number", states: { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max", 105: "Off" } },
            clean_percent: { unit: "%" },
            water_box_custom_mode: { states: { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" } },
            water_box_mode: { type: "number", states: { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" } },
            mop_mode: { states: { 300: "Standard", 301: "Deep", 303: "Deep+", 304: "Fast" } },
            carpet_mode: {
                states: {
                    '[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]': "off",
                    '[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]': "on",
                },
            },
            carpet_clean_mode: {
                states: {
                    '{"carpet_clean_mode":0}': "Avoid",
                    '{"carpet_clean_mode":1}': "Rise",
                    '{"carpet_clean_mode":2}': "Ignore",
                },
            },
        },
        consumables: {
            main_brush_work_time: { unit: "h" },
            side_brush_work_time: { unit: "h" },
            filter_work_time: { unit: "h" },
            filter_element_work_time: { unit: "h" },
            sensor_dirty_time: { unit: "h" },
            125: { unit: "%" },
            126: { unit: "%" },
            127: { unit: "%" },
            main_brush_life: { unit: "%" },
            side_brush_life: { unit: "%" },
            filter_life: { unit: "%" },
        },
        resetConsumables: new Set([
            // Filled with actual values
            "main_brush_work_time",
            "side_brush_work_time",
            "filter_work_time",
            "filter_element_work_time",
            "sensor_dirty_time",
            "dust_collection_work_times",
            "strainer_work_times",
            "cleaning_brush_work_times",
        ]),
        cleaningRecords: {
            0: { type: "string" }, // begin
            1: { type: "string" }, // end
            2: { type: "number", unit: "min" }, // duration
            3: { type: "number", unit: "m²" }, // area
            4: { type: "number" }, // error
            5: { type: "number" }, // complete
            6: { type: "number" }, // start_type
            7: { type: "number" }, // clean_type
            8: { type: "number" }, // finish_reason
            9: { type: "number" }, // dust_collection_status
            // Mapped from name
            begin: { type: "string" },
            end: { type: "string" },
            duration: { type: "number", unit: "min" },
            area: { type: "number", unit: "m²" },
            error: { type: "number" },
            complete: { type: "number" },
            start_type: { type: "number" },
            clean_type: { type: "number" },
            finish_reason: { type: "number" },
            dust_collection_status: { type: "number" },
            cleaned_area: { type: "number", unit: "m²" },
            task_id: { type: "number" },
            clean_times: { type: "number" },
            dirty_replenish: { type: "number" },
            manual_replenish: { type: "number" },
            map_flag: { type: "number" },
            wash_count: { type: "number" },
            avoid_count: { type: "number" },
        },
        cleaningInfo: {
            0: { unit: "h" },
            1: { unit: "m²" },
            clean_time: { unit: "h" },
            clean_area: { unit: "m²" },
        },
        // Keep firmwareFeatures map temporarily for getFirmwareFeatureName fallback
        firmwareFeatures: {
            111: "isSupportFDSEndPoint",
            112: "isSupportAutoSplitSegments",
            114: "isSupportOrderSegmentClean",
            116: "isMapSegmentSupported",
            119: "isSupportLedStatusSwitch",
            120: "isMultiFloorSupported",
            122: "isSupportFetchTimerSummary",
            123: "isOrderCleanSupported",
            125: "isRemoteSupported",
        },
    };
    constructor(dependencies, duid, robotModel, config) {
        super(dependencies, duid, robotModel, config);
        // Initialize with Vacuum base commands
        this.commands = JSON.parse(JSON.stringify(BaseVacuumFeatures.CONSTANTS.baseCommands));
        // Populate dynamic states map references
        BaseVacuumFeatures.CONSTANTS.deviceStates.dock_type.states = BaseVacuumFeatures.CONSTANTS.dockTypes;
        BaseVacuumFeatures.CONSTANTS.deviceStates.error_code.states = BaseVacuumFeatures.CONSTANTS.errorCodes;
        BaseVacuumFeatures.CONSTANTS.deviceStates.state.states = BaseVacuumFeatures.CONSTANTS.stateCodes;
        this.registerFeatures();
    }
    // --- Implementation of abstract methods ---
    registerFeatures() {
        if (BaseDeviceFeatures.featureRegistry.size > 0)
            return;
        this.deps.log.debug(`Registering Vacuum features...`);
        const reg = BaseDeviceFeatures.featureRegistry;
        // --- Command Features ---
        reg.set(Feature.AutoEmptyDock, this._addAutoEmptyDockCommands);
        reg.set(Feature.MopWash, this._addMopWashCommands);
        reg.set(Feature.MopDry, this._addMopDryCommands);
        reg.set(Feature.WaterBox, this._addWaterBoxCommands);
        reg.set(Feature.CleanRouteFastMode, this._addCleanRouteFastModeCommand);
        reg.set(Feature.CustomWaterBoxDistance, this._createCustomWaterDistanceState);
        reg.set(Feature.FanMaxPlus, this._addFanMaxPlusCommand);
        reg.set(Feature.SmartModeCommand, this._addSmartModeCommand);
        // --- State/Info Features ---
        reg.set(Feature.LiveVideo, this._createCameraStates);
        reg.set(Feature.MultiFloor, this._createMultiFloorStates);
        // --- Aliases ---
        reg.set(Feature.ShakeMopStrength, this._addWaterBoxCommands);
        reg.set(Feature.ElectronicWaterBox, this._addWaterBoxCommands);
        // --- Placeholders ---
        const noOp = () => {
            this.deps.log.silly(`[${this.duid}] No-op feature called.`);
        };
        // List ALL Feature enum keys that DO NOT have a specific implementation registered above
        const placeholderFeatures = [
            // Static Flags (might have no direct action)
            Feature.MopForbidden,
            Feature.AvoidCarpet,
            Feature.Camera,
            Feature.VoiceControl,
            // Dynamic Bitfield/FW features (placeholder actions or just flags)
            Feature.isShakeMopSetSupported,
            Feature.isVideoMonitorSupported,
            Feature.isVideoSettingSupported,
            Feature.isCarpetSupported,
            Feature.isPhotoUploadSupported,
            Feature.isAvoidCollisionSupported,
            Feature.isCornerCleanModeSupported,
            Feature.isSupportSetSwitchMapMode,
            Feature.isBackChargeAutoWashSupported,
            Feature.isSupportFDSEndPoint,
            Feature.isSupportAutoSplitSegments,
            Feature.isSupportOrderSegmentClean,
            Feature.isMapSegmentSupported,
            Feature.isSupportLedStatusSwitch,
            Feature.isSupportFetchTimerSummary,
            Feature.isOrderCleanSupported,
            Feature.isRemoteSupported,
        ];
        placeholderFeatures.forEach((f) => {
            // Register placeholder only if no other implementation was already registered for this key
            if (!reg.has(f)) {
                reg.set(f, noOp);
            }
        });
        this.deps.log.debug(`Vacuum feature registry size: ${reg.size}`);
    }
    _getDynamicFeatures() {
        const features = new Set();
        try {
            const featureSet = this.deps.http_api.getFeatureSet(this.duid);
            const newFeatureSet = this.deps.http_api.getNewFeatureSet(this.duid);
            if (featureSet === undefined) {
                this.deps.log.error(`[${this.duid}] _getDynamicFeatures: Could not get featureSet.`);
                return features;
            }
            const highFeatureSet = Math.floor(featureSet / 2 ** 32);
            const newFeatureSetInt = newFeatureSet ? parseInt("0x" + newFeatureSet.slice(-8)) : 0;
            // Map Bitfields to 'is...' Enum keys
            if (!!((highFeatureSet >> 5) & 1))
                features.add(Feature.isWashThenChargeCmdSupported);
            if (!!(featureSet & 33554432))
                features.add(Feature.isDustCollectionSettingSupported);
            if (!!((highFeatureSet >> 15) & 1))
                features.add(Feature.isSupportedDrying);
            if (!!(featureSet & 262144))
                features.add(Feature.isShakeMopSetSupported);
            if (!!(featureSet & 8))
                features.add(Feature.isVideoMonitorSupported);
            if (!!(featureSet & 64))
                features.add(Feature.isVideoSettingSupported);
            if (!!(featureSet & 512))
                features.add(Feature.isCarpetSupported);
            if (!!(featureSet & 65536))
                features.add(Feature.isPhotoUploadSupported);
            if (!!(featureSet & 134217728))
                features.add(Feature.isAvoidCollisionSupported);
            if (!!(featureSet & 2147483648))
                features.add(Feature.isCornerCleanModeSupported);
            if (!!(featureSet & 268435456))
                features.add(Feature.isSupportSetSwitchMapMode);
            if (!!(featureSet & 2147483648))
                features.add(Feature.isCustomWaterBoxDistanceSupported);
            if (!!(newFeatureSetInt & 4096))
                features.add(Feature.isBackChargeAutoWashSupported);
            if (!!(newFeatureSetInt & 256))
                features.add(Feature.isCleanRouteFastModeSupported);
            // Map FW Features Result to 'is...' Enum keys
            const fwResult = this.deps.http_api.getFwFeaturesResult(this.duid); // Ensure this method exists and returns number[] | undefined
            if (fwResult) {
                if (fwResult.includes(111))
                    features.add(Feature.isSupportFDSEndPoint);
                if (fwResult.includes(112))
                    features.add(Feature.isSupportAutoSplitSegments);
                if (fwResult.includes(114))
                    features.add(Feature.isSupportOrderSegmentClean);
                if (fwResult.includes(116))
                    features.add(Feature.isMapSegmentSupported);
                if (fwResult.includes(119))
                    features.add(Feature.isSupportLedStatusSwitch);
                if (fwResult.includes(120))
                    features.add(Feature.isMultiFloorSupported);
                if (fwResult.includes(122))
                    features.add(Feature.isSupportFetchTimerSummary);
                if (fwResult.includes(123))
                    features.add(Feature.isOrderCleanSupported);
                if (fwResult.includes(125))
                    features.add(Feature.isRemoteSupported);
            }
        }
        catch (error) {
            this.deps.log.error(`[${this.duid}] Error in _getDynamicFeatures: ${error.message}`);
        }
        this.deps.log.silly(`[${this.duid}] Detected dynamic vacuum features (raw): ${[...features].join(", ")}`);
        return features;
    }
    async detectAndApplyRuntimeFeatures(statusData) {
        let changedOverall = false;
        const runDetection = !this.runtimeDetectionComplete || this.deps.config.forceRuntimeDetectEveryTime; // Check config flag
        if (!runDetection) {
            this.deps.log.silly(`[${this.duid}] Skipping repeated runtime feature detection.`);
            return false;
        }
        this.deps.log.debug(`[RuntimeDetect|${this.robotModel}|${this.duid}] Running...`);
        // --- Validate Status Data ---
        const validationResult = VacuumStatusSchema.safeParse(statusData);
        if (!validationResult.success) {
            this.deps.log.warn(`[RuntimeDetect|${this.robotModel}|${this.duid}] Received invalid status data. Skipping detection. Errors: ${JSON.stringify(validationResult.error.issues)}`);
            return false;
        }
        const validStatus = validationResult.data;
        // --- Apply dynamic features first (Bitfields/FW) ---
        const dynamicFeatures = this._getDynamicFeatures(); // Get current dynamic features
        this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Dynamic features from bits/fw: ${[...dynamicFeatures].join(", ")}`);
        for (const feature of dynamicFeatures) {
            const mappedFeature = this.mapFeature(feature);
            if (mappedFeature) {
                // Apply only if NOT applied by model specifics already and NOT conflicting
                if (!this.config.staticFeatures.includes(mappedFeature)) {
                    const applied = await this.applyFeature(mappedFeature);
                    if (applied)
                        changedOverall = true;
                }
                else {
                    this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Feature '${mappedFeature}' (from '${feature}') defined statically, skipping dynamic application.`);
                }
            }
        }
        // --- Rules based on validated status data ---
        // Apply features/commands only if they haven't been applied yet
        let changedByStatus = false;
        // WaterBox
        if ((validStatus.water_box_mode !== undefined || validStatus.mop_mode !== undefined) && !this.appliedFeatures.has(Feature.WaterBox)) {
            this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected WaterBox feature via status.`);
            if (await this.applyFeature(Feature.WaterBox))
                changedByStatus = true;
        }
        // Carpet Mode Commands
        if (validStatus.carpet_mode !== undefined && !this.commands["set_carpet_mode"]) {
            this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected carpet_mode command via status.`);
            const spec = { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_mode.states };
            this._addCommand("set_carpet_mode", spec);
            changedByStatus = true;
        }
        if (validStatus.carpet_clean_mode !== undefined && !this.commands["set_carpet_clean_mode"]) {
            this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected carpet_clean_mode command via status.`);
            const spec = { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_clean_mode.states };
            this._addCommand("set_carpet_clean_mode", spec);
            changedByStatus = true;
        }
        // Refine Fan Power (Max+)
        if (validStatus.fan_power === 108 && !this.appliedFeatures.has(Feature.FanMaxPlus)) {
            // Apply only if not statically defined
            if (!this.config.staticFeatures.includes(Feature.FanMaxPlus)) {
                this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected FanMaxPlus state (108).`);
                if (await this.applyFeature(Feature.FanMaxPlus))
                    changedByStatus = true;
            }
        }
        // MopDry
        if (validStatus.dry_status !== undefined && !this.appliedFeatures.has(Feature.MopDry)) {
            this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected MopDry feature via 'dry_status' key.`);
            if (await this.applyFeature(Feature.MopDry))
                changedByStatus = true;
        }
        // AutoEmptyDock
        if (validStatus.dust_collection_status !== undefined && !this.appliedFeatures.has(Feature.AutoEmptyDock)) {
            this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected AutoEmptyDock feature via 'dust_collection_status' key.`);
            if (await this.applyFeature(Feature.AutoEmptyDock))
                changedByStatus = true;
        }
        // MopWash
        if (validStatus.wash_status !== undefined && !this.appliedFeatures.has(Feature.MopWash)) {
            this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected MopWash feature via 'wash_status' key.`);
            if (await this.applyFeature(Feature.MopWash))
                changedByStatus = true;
        }
        // Add more status-based detection rules here...
        if (changedByStatus)
            this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Features/Commands applied/modified based on status.`);
        this.runtimeDetectionComplete = true;
        return changedOverall || changedByStatus; // Return true if anything changed
    }
    async processDockType(dockTypeInput) {
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
        this.deps.log.debug(`[${this.duid}] Processing dock type ${dockType} for Vacuum`);
        const dockFeatureMap = {
            1: [Feature.AutoEmptyDock],
            2: [Feature.MopWash],
            3: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry],
            5: [Feature.AutoEmptyDock],
            6: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry],
            7: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry],
            8: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry],
            9: [Feature.AutoEmptyDock, Feature.MopWash, Feature.MopDry],
            10: [], // Placeholder for future dock types
            18: [], // Placeholder for future dock types
        };
        const features = dockFeatureMap[dockType];
        if (features) {
            this.deps.log.debug(`[${this.duid}] Applying dock features for type ${dockType}: ${features.join(", ")}`); // Apply features sequentially to potentially handle dependencies/overwrites correctly
            for (const feature of features) {
                await this.applyFeature(feature); // Use applyFeature helper which checks if already applied
            }
        }
        else if (dockType !== 0) {
            this.deps.log.warn(`[processDockType|${this.duid}] Unknown dock type ${dockType} encountered. No features applied. Please report this model and dock type.`);
        }
    }
    // --- Instance Getters for Constants ---
    getCommonConsumable(attribute) {
        return BaseVacuumFeatures.CONSTANTS.consumables[attribute];
    }
    isResetableConsumable(consumable) {
        // Access static constant
        return BaseVacuumFeatures.CONSTANTS.resetConsumables.has(consumable);
    }
    getCommonDeviceStates(attribute) {
        const stateDef = BaseVacuumFeatures.CONSTANTS.deviceStates[attribute];
        return stateDef;
    }
    getCommonCleaningInfo(attribute) {
        return BaseVacuumFeatures.CONSTANTS.cleaningInfo[attribute];
    }
    getCommonCleaningRecords(attribute) {
        const spec = BaseVacuumFeatures.CONSTANTS.cleaningRecords[attribute];
        return spec;
    }
    getFirmwareFeatureName(featureID) {
        // Use the temporarily kept static map for lookup
        const name = BaseVacuumFeatures.CONSTANTS.firmwareFeatures[featureID];
        return name || `FeatureID_${featureID}`;
    }
    // --- Feature Implementations ---
    _addAutoEmptyDockCommands() {
        this._addCommand("app_start_collect_dust", { type: "boolean", def: false });
        this._addCommand("app_stop_collect_dust", { type: "boolean", def: false });
        this._addCommand("set_dust_collection_switch_status", { type: "json", def: '{"status":1}', states: { '{"status":0}': "Off", '{"status":1}': "On" } });
        this._addCommand("set_dust_collection_mode", {
            type: "json",
            def: '{"mode":0}',
            states: { '{"mode":0}': "Smart", '{"mode":1}': "Low", '{"mode":2}': "Medium", '{"mode":4}': "Max" },
        });
    }
    _addMopWashCommands() {
        this._addCommand("app_start_wash", { type: "boolean", def: false });
        this._addCommand("app_stop_wash", { type: "boolean", def: false });
        this._addCommand("set_wash_towel_mode", {
            type: "json",
            def: '{"wash_mode":2}',
            states: { '{"wash_mode":0}': "Eco", '{"wash_mode":1}': "Medium", '{"wash_mode":2}': "Intense" },
        });
        this._addCommand("set_smart_wash_params", {
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
    _addMopDryCommands() {
        this._addCommand("app_set_dryer_status", { type: "string", def: '{"status": 0}', states: { '{"status": 1}': "On", '{"status": 0}': "Off" } });
        this._addCommand("app_set_dryer_setting", {
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
    _addWaterBoxCommands() {
        this._addCommand("set_mop_mode", { type: "number", def: 300, states: { 300: "Standard", 301: "Deep", 303: "Deep+" } });
        this._addCommand("set_water_box_custom_mode", { type: "number", def: 201, states: { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" } });
    }
    _addCleanRouteFastModeCommand() {
        const mopMode = this.commands.set_mop_mode || { type: "number", def: 300, states: {} };
        mopMode.states = { ...BaseVacuumFeatures.CONSTANTS.deviceStates.mop_mode.states, ...mopMode.states, 304: "Fast" }; // Merge carefully
        this._addCommand("set_mop_mode", mopMode);
    }
    async _createCameraStates() {
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
            // Use _ensureState helper
            await this._ensureState("camera", name, { type: "string", role: "url", write: false, def: stream_uri });
        }
    }
    async _createMultiFloorStates() {
        await this.deps.ensureFolder(`Devices.${this.duid}.floors`);
        for (const feature of ["max_multi_map", "max_bak_map", "multi_map_count"]) {
            // Use _ensureState helper
            await this._ensureState("floors", feature, { type: "number", role: "value", write: false });
        }
    }
    async _createCustomWaterDistanceState() {
        // Use _ensureState helper
        await this._ensureState("commands", "set_water_box_distance_off", {
            type: "number",
            role: "level",
            write: true,
            def: 1,
            min: 1,
            max: 30,
        });
    }
    _addFanMaxPlusCommand() {
        // Ensure base command exists before modifying
        if (!this.commands.set_custom_mode) {
            this._addCommand("set_custom_mode", JSON.parse(JSON.stringify(BaseVacuumFeatures.CONSTANTS.baseCommands.set_custom_mode)));
        }
        // Safely add state
        if (this.commands.set_custom_mode.states) {
            this.commands.set_custom_mode.states[108] = "Max+";
        }
    }
    _addSmartModeCommand() {
        this._addCommand("app_set_clean_sequence_type", {
            type: "json",
            role: "value.list",
            def: '{"fan_power":110,"mop_mode":306,"type":0,"water_box_mode":209}',
            states: {
                '{"fan_power":102,"mop_mode":300,"repeat":1,"type":1,"water_box_mode":201}': "Mop and vacuum",
                '{"fan_power":110,"mop_mode":306,"type":0,"water_box_mode":209}': "Smart mode",
            },
        });
    }
}
//# sourceMappingURL=baseVacuumFeatures.js.map