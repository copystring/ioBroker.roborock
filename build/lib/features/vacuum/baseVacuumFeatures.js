"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseVacuumFeatures = exports.VacuumStatusSchema = exports.DEFAULT_PROFILE = exports.BASE_MOP = exports.BASE_WATER = exports.BASE_FAN = void 0;
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
const zod_1 = require("zod");
const vacuumConstants_1 = require("./vacuumConstants");
// --- Shared Constants ---
exports.BASE_FAN = { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max" };
exports.BASE_WATER = { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" };
exports.BASE_MOP = { 300: "Standard", 301: "Deep", 303: "Deep+" };
exports.DEFAULT_PROFILE = {
    mappings: {
        fan_power: exports.BASE_FAN,
        water_box_mode: exports.BASE_WATER,
        mop_mode: exports.BASE_MOP
    },
    features: {
        maxSuctionValue: 104
    }
};
// --- Zod Schema for Vacuum Status ---
exports.VacuumStatusSchema = zod_1.z
    .object({
    state: zod_1.z.number().int().optional(),
    fan_power: zod_1.z.number().int().optional(),
    water_box_mode: zod_1.z.number().int().optional(),
    mop_mode: zod_1.z.number().int().optional(),
    dock_type: zod_1.z.number().int().optional(),
    error_code: zod_1.z.number().int().optional(),
    battery: zod_1.z.number().int().min(0).max(100).optional(),
    clean_time: zod_1.z.number().int().optional(),
    clean_area: zod_1.z.number().int().optional(),
    dss: zod_1.z.number().int().optional(), // Docking station status bits
    map_status: zod_1.z.number().int().optional(),
    // Optional string fields that should be valid JSON
    carpet_mode: zod_1.z
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
    carpet_clean_mode: zod_1.z
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
    water_box_custom_mode: zod_1.z.number().int().optional(), // Added for WaterBox detection
    // Add other relevant vacuum status fields...
})
    .passthrough(); // Allow fields not defined in the schema
class BaseVacuumFeatures extends baseDeviceFeatures_1.BaseDeviceFeatures {
    profile;
    // --- Vacuum-specific Constants ---
    static CONSTANTS = vacuumConstants_1.VACUUM_CONSTANTS;
    constructor(dependencies, duid, robotModel, config, profile = exports.DEFAULT_PROFILE) {
        // Add default features that should be present on all vacuums
        const defaultFeatures = [
            features_enum_1.Feature.NetworkInfo,
            features_enum_1.Feature.UpdateStatus,
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
    applyCleanMotorModePresets() {
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
    getDynamicFeatures() {
        const features = new Set();
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
            if (!!((highFeatureSet >> 5) & 1))
                features.add(features_enum_1.Feature.isWashThenChargeCmdSupported);
            if (!!(featureSet & 33554432))
                features.add(features_enum_1.Feature.isDustCollectionSettingSupported);
            if (!!((highFeatureSet >> 15) & 1))
                features.add(features_enum_1.Feature.isSupportedDrying);
            if (!!(featureSet & 262144))
                features.add(features_enum_1.Feature.isShakeMopSetSupported);
            if (!!(featureSet & 8))
                features.add(features_enum_1.Feature.isVideoMonitorSupported);
            if (!!(featureSet & 64))
                features.add(features_enum_1.Feature.isVideoSettingSupported);
            if (!!(featureSet & 512))
                features.add(features_enum_1.Feature.isCarpetSupported);
            if (!!(featureSet & 65536))
                features.add(features_enum_1.Feature.isPhotoUploadSupported);
            if (!!(featureSet & 134217728))
                features.add(features_enum_1.Feature.isAvoidCollisionSupported);
            if (!!(featureSet & 2147483648))
                features.add(features_enum_1.Feature.isCornerCleanModeSupported);
            if (!!(featureSet & 268435456))
                features.add(features_enum_1.Feature.isSupportSetSwitchMapMode);
            if (!!(featureSet & 2147483648))
                features.add(features_enum_1.Feature.isCustomWaterBoxDistanceSupported);
            if (!!(newFeatureSetInt & 4096))
                features.add(features_enum_1.Feature.isBackChargeAutoWashSupported);
            if (!!(newFeatureSetInt & 256))
                features.add(features_enum_1.Feature.isCleanRouteFastModeSupported);
            // Map FW Features Result to 'is...' Enum keys
            const fwResult = this.deps.http_api.getFwFeaturesResult(this.duid);
            if (fwResult) {
                for (const id of fwResult) {
                    const featureName = BaseVacuumFeatures.CONSTANTS.firmwareFeatures[id];
                    if (featureName) {
                        // Check if this feature name exists in our Feature enum
                        const featureEnum = features_enum_1.Feature[featureName];
                        if (featureEnum) {
                            features.add(featureEnum);
                        }
                    }
                }
            }
        }
        catch (error) {
            this.deps.log.error(`[${this.duid}] Error in getDynamicFeatures: ${error.message}`);
        }
        this.deps.log.silly(`[${this.duid}] Detected dynamic vacuum features (raw): ${[...features].join(", ")}`);
        return features;
    }
    async detectAndApplyRuntimeFeatures(statusData) {
        let changedOverall = false;
        const runDetection = !this.runtimeDetectionComplete || this.deps.config.forceRuntimeDetectEveryTime; // Check config flag
        const appliedFeaturesList = [];
        if (!runDetection) {
            this.deps.log.silly(`[${this.duid}] Skipping repeated runtime feature detection.`);
            return false;
        }
        this.deps.log.debug(`[RuntimeDetect|${this.robotModel}|${this.duid}] Running...`);
        // --- Validate Status Data ---
        const validationResult = exports.VacuumStatusSchema.safeParse(statusData);
        if (!validationResult.success) {
            this.deps.log.warn(`[RuntimeDetect|${this.robotModel}|${this.duid}] Received invalid status data. Skipping detection. Errors: ${JSON.stringify(validationResult.error.issues)}`);
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
        if ((validStatus.water_box_mode !== undefined || validStatus.mop_mode !== undefined) && !this.appliedFeatures.has(features_enum_1.Feature.WaterBox)) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected WaterBox feature via status.`);
            if (await this.applyFeature(features_enum_1.Feature.WaterBox)) {
                changedByStatus = true;
                appliedFeaturesList.push("WaterBox");
            }
        }
        // Carpet Mode Commands
        if (validStatus.carpet_mode !== undefined && !this.commands["set_carpet_mode"]) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected carpet_mode command via status.`);
            const spec = { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_mode.states };
            this.addCommand("set_carpet_mode", spec);
            changedByStatus = true;
            appliedFeaturesList.push("set_carpet_mode (Command)");
        }
        if (validStatus.carpet_clean_mode !== undefined && !this.commands["set_carpet_clean_mode"]) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected carpet_clean_mode command via status.`);
            const spec = { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_clean_mode.states };
            this.addCommand("set_carpet_clean_mode", spec);
            changedByStatus = true;
            appliedFeaturesList.push("set_carpet_clean_mode (Command)");
        }
        // Refine Fan Power (Max+)
        if (validStatus.fan_power === 108 && !this.appliedFeatures.has(features_enum_1.Feature.FanMaxPlus)) {
            // Apply only if not statically defined
            if (!this.config.staticFeatures.includes(features_enum_1.Feature.FanMaxPlus)) {
                // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected FanMaxPlus state (108).`);
                if (await this.applyFeature(features_enum_1.Feature.FanMaxPlus)) {
                    changedByStatus = true;
                    appliedFeaturesList.push("FanMaxPlus");
                }
            }
        }
        // MopDry
        if (validStatus.dry_status !== undefined && !this.appliedFeatures.has(features_enum_1.Feature.MopDry)) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected MopDry feature via 'dry_status' key.`);
            if (await this.applyFeature(features_enum_1.Feature.MopDry)) {
                changedByStatus = true;
                appliedFeaturesList.push("MopDry");
            }
        }
        // AutoEmptyDock
        if (validStatus.dust_collection_status !== undefined && !this.appliedFeatures.has(features_enum_1.Feature.AutoEmptyDock)) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected AutoEmptyDock feature via 'dust_collection_status' key.`);
            if (await this.applyFeature(features_enum_1.Feature.AutoEmptyDock)) {
                changedByStatus = true;
                appliedFeaturesList.push("AutoEmptyDock");
            }
        }
        // MopWash
        if (validStatus.wash_status !== undefined && !this.appliedFeatures.has(features_enum_1.Feature.MopWash)) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected MopWash feature via 'wash_status' key.`);
            if (await this.applyFeature(features_enum_1.Feature.MopWash)) {
                changedByStatus = true;
                appliedFeaturesList.push("MopWash");
            }
        }
        // Add more status-based detection rules here...
        if (changedByStatus || changedOverall) {
            this.deps.log.info(`[RuntimeDetect|${this.robotModel}|${this.duid}] Runtime detection applied new features/commands: ${appliedFeaturesList.join(", ")}`);
        }
        else {
            this.deps.log.debug(`[RuntimeDetect|${this.robotModel}|${this.duid}] No new features detected.`);
        }
        this.runtimeDetectionComplete = true;
        return changedOverall || changedByStatus; // Return true if anything changed
    }
    lastDockType;
    async processDockType(dockTypeInput) {
        if (dockTypeInput === undefined) {
            this.deps.log.debug(`[processDockType|${this.duid}] dockTypeInput is undefined, skipping dock processing.`);
            return;
        }
        const dockTypeSchema = zod_1.z.number().int().min(0);
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
        const dockFeatureMap = {
            1: [features_enum_1.Feature.AutoEmptyDock],
            2: [features_enum_1.Feature.MopWash],
            3: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry],
            5: [features_enum_1.Feature.AutoEmptyDock],
            6: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry],
            7: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry],
            8: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry],
            9: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry],
            14: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry], // Qrevo Master (a117)
            15: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry], // Qrevo S (a104)
            16: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry],
            10: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry], // S7 MaxV/Pro
            17: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry], // Qrevo Curv Series (a159)
            18: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry], // S8 Pro
        };
        const features = dockFeatureMap[dockType];
        if (features) {
            this.deps.log.info(`[${this.duid}] Applying dock features for type ${dockType}: ${features.join(", ")}`); // Apply features sequentially to potentially handle dependencies/overwrites correctly
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
    // Converted to methods with decorators
    addAutoEmptyDockCommands() {
        this.addCommand("app_start_collect_dust", { type: "boolean", def: false });
        this.addCommand("app_stop_collect_dust", { type: "boolean", def: false });
        this.addCommand("set_dust_collection_switch_status", { type: "json", def: '{"status":1}', states: { '{"status":0}': "Off", '{"status":1}': "On" } });
        this.addCommand("set_dust_collection_mode", {
            type: "json",
            def: '{"mode":0}',
            states: { '{"mode":0}': "Smart", '{"mode":1}': "Low", '{"mode":2}': "Medium", '{"mode":4}': "Max" },
        });
    }
    addMopWashCommands() {
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
    addMopDryCommands() {
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
    addWaterBoxCommands() {
        const mopStates = this.profile.mappings.mop_mode || vacuumConstants_1.VACUUM_CONSTANTS.deviceStates.mop_mode.states;
        this.addCommand("set_mop_mode", { type: "number", def: 300, states: mopStates });
        const waterStates = this.profile.mappings.water_box_mode || vacuumConstants_1.VACUUM_CONSTANTS.deviceStates.water_box_mode.states;
        this.addCommand("set_water_box_custom_mode", { type: "number", def: 201, states: waterStates });
    }
    addCleanRouteFastModeCommand() {
        const mopMode = this.commands.set_mop_mode || { type: "number", def: 300, states: {} };
        mopMode.states = { ...BaseVacuumFeatures.CONSTANTS.deviceStates.mop_mode.states, ...mopMode.states, 304: "Fast" }; // Merge carefully
        this.addCommand("set_mop_mode", mopMode);
    }
    addSmartPlanFeature() {
        const mopMode = this.commands.set_mop_mode || { type: "number", def: 300, states: {} };
        mopMode.states = { ...mopMode.states, 306: "SmartPlan" };
        this.addCommand("set_mop_mode", mopMode);
    }
    async createCameraStates() {
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
    async createMultiFloorStates() {
        await this.deps.ensureFolder(`Devices.${this.duid}.floors`);
        for (const feature of ["max_multi_map", "max_bak_map", "multi_map_count"]) {
            // Use ensureState helper
            await this.ensureState("floors", feature, { type: "number", role: "value", write: false });
        }
    }
    addAvoidCarpetCommands() {
        this.addCommand("set_carpet_mode", { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_mode.states });
        this.addCommand("set_carpet_clean_mode", { type: "json", states: BaseVacuumFeatures.CONSTANTS.deviceStates.carpet_clean_mode.states });
    }
    async addAvoidCollisionStates() {
        await this.ensureState("deviceStatus", "collision_avoid_status", { type: "number", role: "value", write: false });
        await this.ensureState("deviceStatus", "avoid_count", { type: "number", role: "value", write: false });
    }
    async addMopForbiddenStates() {
        await this.ensureState("deviceStatus", "mop_forbidden_enable", { type: "number", role: "value", write: false });
    }
    async addVoiceControlStates() {
        await this.ensureState("deviceStatus", "voice_chat_status", { type: "number", role: "value", write: false });
    }
    async addCameraSettingsStates() {
        await this.ensureState("deviceStatus", "camera_status", { type: "number", role: "value", write: false });
        await this.ensureState("deviceStatus", "distance_off", { type: "number", role: "value", write: false });
    }
    async addSwitchMapModeState() {
        await this.ensureState("deviceStatus", "switch_map_mode", { type: "number", role: "value", write: false });
    }
    async addCornerCleanModeState() {
        await this.ensureState("deviceStatus", "corner_clean_mode", { type: "number", role: "value", write: false });
    }
    // --- State/Info Feature Handlers ---
    async addMapFlagState() { await this.ensureState("deviceStatus", "map_flag", { type: "number", role: "value", write: false }); }
    async addCommonStatusState() { await this.ensureState("deviceStatus", "common_status", { type: "number", role: "value", write: false }); }
    async addDockErrorStatusState() { await this.ensureState("deviceStatus", "dock_error_status", { type: "number", role: "value", write: false }); }
    async addBackTypeState() { await this.ensureState("deviceStatus", "back_type", { type: "number", role: "value", write: false }); }
    async addSwitchStatusState() { await this.ensureState("deviceStatus", "switch_status", { type: "number", role: "value", write: false }); }
    async addMonitorStatusState() { await this.ensureState("deviceStatus", "monitor_status", { type: "number", role: "value", write: false }); }
    async addCleanPercentState() { await this.ensureState("deviceStatus", "clean_percent", { type: "number", role: "value", write: false, unit: "%" }); }
    async addInWarmupState() { await this.ensureState("deviceStatus", "in_warmup", { type: "number", role: "value", write: false }); }
    async addExitDockState() { await this.ensureState("deviceStatus", "exit_dock", { type: "number", role: "value", write: false }); }
    async addExtraTimeState() { await this.ensureState("deviceStatus", "extra_time", { type: "number", role: "value", write: false }); }
    async addLastCleanTimeState() { await this.ensureState("deviceStatus", "last_clean_t", { type: "string", role: "value", write: false }); }
    async addChargeStatusState() { await this.ensureState("deviceStatus", "charge_status", { type: "number", role: "value", write: false }); }
    async addCleaningInfoState() { await this.ensureState("deviceStatus", "cleaning_info", { type: "string", role: "value", write: false }); }
    async addCleanRepeatState() { await this.ensureState("deviceStatus", "repeat", { type: "number", role: "value", write: false }); }
    async addDssState() { await this.ensureState("deviceStatus", "dss", { type: "number", role: "value", write: false }); }
    async addRssState() { await this.ensureState("deviceStatus", "rss", { type: "number", role: "value", write: false }); }
    async addRobotStatusState() { await this.ensureState("deviceStatus", "state", { type: "number", role: "value", write: false }); }
    async addKctState() { await this.ensureState("deviceStatus", "kct", { type: "number", role: "value", write: false }); }
    async addCleanFluidState() { await this.ensureState("deviceStatus", "clean_fluid", { type: "number", role: "value", write: false }); }
    async addRdtState() { await this.ensureState("deviceStatus", "rdt", { type: "number", role: "value", write: false }); }
    async addReplenishModeState() { await this.ensureState("deviceStatus", "replenish_mode", { type: "number", role: "value", write: false }); }
    async addCleanedAreaState() { await this.ensureState("deviceStatus", "cleaned_area", { type: "number", role: "value", write: false, unit: "m²" }); }
    async addCleanTimesState() { await this.ensureState("deviceStatus", "clean_times", { type: "number", role: "value", write: false }); }
    async createCustomWaterDistanceState() {
        // Use ensureState helper
        await this.ensureState("commands", "set_water_box_distance_off", {
            type: "number",
            role: "level",
            write: true,
            def: 1,
            min: 1,
            max: 30,
        });
    }
    async createResetConsumables() {
        await this.deps.ensureFolder(`Devices.${this.duid}.resetConsumables`);
        for (const consumable of BaseVacuumFeatures.CONSTANTS.resetConsumables) {
            await this.ensureState("resetConsumables", consumable, {
                type: "boolean",
                role: "button",
                def: false,
                write: true,
                name: `Reset ${consumable}`
            });
        }
    }
    async createConsumables() {
        await this.deps.ensureFolder(`Devices.${this.duid}.consumables`);
        for (const [id, common] of Object.entries(BaseVacuumFeatures.CONSTANTS.consumables)) {
            await this.ensureState("consumables", id, {
                ...common,
                type: "number",
                role: "value",
                write: false
            });
        }
    }
    addFanMaxPlusCommand() {
        const fanStates = this.profile.mappings.fan_power || vacuumConstants_1.VACUUM_CONSTANTS.deviceStates.fan_power.states;
        // Use set_custom_mode for fan power as per base commands
        this.addCommand("set_custom_mode", { type: "number", def: 102, states: fanStates });
    }
    async addNetworkInfoStates() {
        await this.deps.ensureFolder(`Devices.${this.duid}.networkInfo`);
        await this.ensureState("networkInfo", "ssid", { type: "string", role: "info.name", write: false });
        await this.ensureState("networkInfo", "ip", { type: "string", role: "info.ip", write: false });
        await this.ensureState("networkInfo", "mac", { type: "string", role: "info.mac", write: false });
        await this.ensureState("networkInfo", "bssid", { type: "string", role: "info.address", write: false });
        await this.ensureState("networkInfo", "rssi", { type: "number", role: "value.rssi", write: false, unit: "dBm" });
    }
    async addUpdateStatusStates() {
        await this.deps.ensureFolder(`Devices.${this.duid}.updateStatus`);
        await this.ensureState("updateStatus", "checking", { type: "boolean", role: "indicator", write: false });
        await this.ensureState("updateStatus", "available", { type: "boolean", role: "indicator", write: false });
        await this.ensureState("updateStatus", "progress", { type: "number", role: "value", write: false, unit: "%" });
        await this.ensureState("updateStatus", "version", { type: "string", role: "info.firmware", write: false });
        await this.ensureState("updateStatus", "description", { type: "string", role: "text", write: false });
    }
    addSmartModeCommand() {
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
    // --- Placeholder Features (Flags without specific actions) ---
    placeholderFeatures() {
        // No-op: These features are detected but require no specific initialization logic
        this.deps.log.silly(`[${this.duid}] Placeholder feature initialized.`);
    }
}
exports.BaseVacuumFeatures = BaseVacuumFeatures;
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.AutoEmptyDock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "addAutoEmptyDockCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MopWash),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "addMopWashCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MopDry),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "addMopDryCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.WaterBox),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ShakeMopStrength),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ElectronicWaterBox),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "addWaterBoxCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanRouteFastMode),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "addCleanRouteFastModeCommand", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.SmartPlan),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "addSmartPlanFeature", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.LiveVideo),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Camera),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "createCameraStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MultiFloor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "createMultiFloorStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.AvoidCarpet),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isCarpetSupported),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "addAvoidCarpetCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isAvoidCollisionSupported),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addAvoidCollisionStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MopForbidden),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addMopForbiddenStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.VoiceControl),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addVoiceControlStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Camera),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addCameraSettingsStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isSupportSetSwitchMapMode),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addSwitchMapModeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isCornerCleanModeSupported),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addCornerCleanModeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MapFlag),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addMapFlagState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CommonStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addCommonStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.DockStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addDockErrorStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.BackType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addBackTypeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.SwitchStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addSwitchStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MonitorStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addMonitorStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanPercent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addCleanPercentState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.InWarmup),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addInWarmupState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ExitDock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addExitDockState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ExtraTime),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addExtraTimeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.LastCleanTime),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addLastCleanTimeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ChargeStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addChargeStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleaningInfo),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addCleaningInfoState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanRepeat),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addCleanRepeatState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Dss),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addDssState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Rss),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addRssState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.RobotStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addRobotStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Kct),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addKctState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanFluid),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addCleanFluidState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Rdt),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addRdtState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ReplenishMode),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addReplenishModeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanedArea),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addCleanedAreaState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanTimes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addCleanTimesState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CustomWaterBoxDistance),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "createCustomWaterDistanceState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.FanMaxPlus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "addFanMaxPlusCommand", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.NetworkInfo),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addNetworkInfoStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.UpdateStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseVacuumFeatures.prototype, "addUpdateStatusStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.SmartModeCommand),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "addSmartModeCommand", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isShakeMopSetSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isVideoMonitorSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isVideoSettingSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isPhotoUploadSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isBackChargeAutoWashSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isSupportFDSEndPoint),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isSupportAutoSplitSegments),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isSupportOrderSegmentClean),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isMapSegmentSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isSupportLedStatusSwitch),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isSupportFetchTimerSummary),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isOrderCleanSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isRemoteSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isSupportTaskId),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseVacuumFeatures.prototype, "placeholderFeatures", null);
//# sourceMappingURL=baseVacuumFeatures.js.map