"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1VacuumFeatures = exports.VacuumStatusSchema = exports.DEFAULT_PROFILE = exports.BASE_MOP = exports.BASE_WATER = exports.BASE_FAN = void 0;
const zod_1 = require("zod");
const MapManager_1 = require("../../map/MapManager");
const productHelper_1 = require("../../productHelper");
const Q7Data = __importStar(require("../../protocols/q7_dataset.json"));
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
const features_enum_1 = require("../features.enum");
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
    water_box_custom_mode: zod_1.z.number().int().optional(), // Required for WaterBox feature detection
    // Add other relevant vacuum status fields...
})
    .passthrough(); // Allow fields not defined in the schema
class V1VacuumFeatures extends baseDeviceFeatures_1.BaseDeviceFeatures {
    profile;
    // --- Vacuum-specific Constants ---
    static CONSTANTS = vacuumConstants_1.VACUUM_CONSTANTS;
    mappedRooms = null;
    mapManager;
    constructor(dependencies, duid, robotModel, config, profile = exports.DEFAULT_PROFILE) {
        // Add default features that should be present on all vacuums
        const defaultFeatures = [
            features_enum_1.Feature.NetworkInfo,
            features_enum_1.Feature.UpdateStatus,
            features_enum_1.Feature.Timers,
            features_enum_1.Feature.FirmwareInfo,
            features_enum_1.Feature.MultiMap,
            features_enum_1.Feature.RoomMapping,
            features_enum_1.Feature.Consumables,
        ];
        const mergedConfig = {
            ...config,
            staticFeatures: [...defaultFeatures, ...config.staticFeatures]
        };
        super(dependencies, duid, robotModel, mergedConfig);
        this.profile = profile;
        this.applyLocalizedMappings();
        // Populate dynamic states map references
        V1VacuumFeatures.CONSTANTS.deviceStates.dock_type.states = V1VacuumFeatures.CONSTANTS.dockTypes;
        V1VacuumFeatures.CONSTANTS.deviceStates.error_code.states = V1VacuumFeatures.CONSTANTS.errorCodes;
        V1VacuumFeatures.CONSTANTS.deviceStates.state.states = V1VacuumFeatures.CONSTANTS.stateCodes;
        this.applyCleanMotorModePresets();
        // Deduplicate static features
        this.config.staticFeatures = [...new Set(this.config.staticFeatures)];
    }
    applyLocalizedMappings() {
        try {
            // Determine system language, default to 'en'
            // @ts-ignore - 'language' property might not be typed on adapter config correctly or needs access
            const sysLang = (this.deps.adapter.config && this.deps.adapter.config.language) ? this.deps.adapter.config.language : "en";
            // Check if there is data for fault codes
            if (Q7Data && Q7Data.fault_codes) {
                const errorMapping = {};
                for (const [codeStr, data] of Object.entries(Q7Data.fault_codes)) {
                    const code = Number(codeStr);
                    const entry = data;
                    // Try exact language match, simplified match (e.g. en-US -> en), or english fallback
                    let trans = entry[sysLang];
                    if (!trans && sysLang.includes("-")) {
                        const shortLang = sysLang.split("-")[0];
                        trans = entry[shortLang];
                    }
                    if (!trans)
                        trans = entry["en"];
                    if (trans && trans.title) {
                        errorMapping[code] = trans.title;
                    }
                    else if (entry.internal) {
                        errorMapping[code] = entry.internal;
                    }
                }
                // Override/Merge into profile mappings
                if (Object.keys(errorMapping).length > 0) {
                    this.profile.mappings.error_code = {
                        ...this.profile.mappings.error_code,
                        ...errorMapping
                    };
                }
            }
        }
        catch (e) {
            this.deps.adapter.log.error(`Failed to apply localized mappings: ${e}`);
        }
    }
    async setupProtocolFeatures() {
        await super.setupProtocolFeatures();
        // B01 devices will override this entirely, V1 devices will add their specific set
        // Protocol 1.0 (V1) specific overrides
        this.commands = {
            ...this.commands,
            ...JSON.parse(JSON.stringify(V1VacuumFeatures.CONSTANTS.baseCommands))
        };
    }
    async initializeDeviceData() {
        await this.updateStatus();
        await Promise.all([
            this.updateFirmwareFeatures(),
            this.updateMultiMapsList(),
            this.updateRoomMapping(),
            this.updateConsumables(),
            this.updateTimers(),
            this.updateNetworkInfo(),
        ]);
        await this.deps.adapter.checkForNewFirmware(this.duid);
        // Consumable Percentages (Cloud)
        await this.updateConsumablesPercent();
        // Model-specific requests
        await this.updateExtraStatus();
        // Initial Map
        await this.updateMap();
    }
    async updateConsumablesPercent() {
        const device = this.deps.adapter.http_api.getDevices().find((d) => d.duid === this.duid);
        if (!device?.deviceStatus)
            return;
        const status = device.deviceStatus;
        const consumableMap = {
            "125": "main_brush_life",
            "126": "side_brush_life",
            "127": "filter_life",
        };
        for (const [attribute, value] of Object.entries(status)) {
            if (attribute === "125" || attribute === "126" || attribute === "127") {
                const val = value >= 0 && value <= 100 ? value : 0;
                const mappedName = consumableMap[attribute];
                const common = this.getCommonConsumable(mappedName);
                await this.deps.adapter.ensureState(`Devices.${this.duid}.consumables.${mappedName}`, common || {});
                await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.consumables.${mappedName}`, { val, ack: true });
            }
        }
    }
    applyCleanMotorModePresets() {
        const presets = this.profile.cleanMotorModePresets || {
            '{"fan_power":102,"mop_mode":300,"water_box_mode":200}': "Vacuum",
            '{"fan_power":105,"mop_mode":300,"water_box_mode":202}': "Mop",
            '{"fan_power":102,"mop_mode":300,"water_box_mode":202}': "Vac & Mop"
        };
        this.addCommand("set_clean_motor_mode", {
            type: "json",
            def: V1VacuumFeatures.CONSTANTS.baseCommands.set_clean_motor_mode.def,
            states: presets
        });
        this.mapManager = new MapManager_1.MapManager(this.deps.adapter);
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
            // Check firmware features
            const fwResult = this.deps.http_api.getFwFeaturesResult(this.duid);
            if (fwResult) {
                for (const id of fwResult) {
                    const featureName = V1VacuumFeatures.CONSTANTS.firmwareFeatures[id];
                    if (featureName) {
                        const featureEnum = features_enum_1.Feature[featureName];
                        if (featureEnum)
                            features.add(featureEnum);
                    }
                }
            }
            // Add features from product info
            if (this.deps.http_api.productInfo) {
                const deduced = productHelper_1.ProductHelper.deduceFeatures(this.deps.http_api.productInfo, this.robotModel);
                for (const f of deduced) {
                    features.add(f);
                }
                this.deps.log.silly(`[${this.duid}] ProductHelper deduced: ${[...deduced].join(", ")}`);
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
            if (mappedFeature && !this.config.staticFeatures.includes(mappedFeature)) {
                // Apply only if NOT applied by model specifics already and NOT conflicting
                const applied = await this.applyFeature(mappedFeature);
                if (applied) {
                    changedOverall = true;
                    appliedFeaturesList.push(mappedFeature);
                }
            }
            else if (mappedFeature) {
                this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Feature '${mappedFeature}' (from '${feature}') defined statically, skipping dynamic application.`);
            }
        }
        // --- Rules based on validated status data ---
        // Apply features/commands only if they haven't been applied yet
        let changedByStatus = false;
        // WaterBox
        // WaterBox
        const detectedWaterBox = (validStatus.water_box_mode !== undefined || validStatus.mop_mode !== undefined);
        if (detectedWaterBox && !this.appliedFeatures.has(features_enum_1.Feature.WaterBox) && await this.applyFeature(features_enum_1.Feature.WaterBox)) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected WaterBox feature via status.`);
            changedByStatus = true;
            appliedFeaturesList.push("WaterBox");
        }
        // Carpet Mode Commands
        if (validStatus.carpet_mode !== undefined && !this.commands["set_carpet_mode"]) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected carpet_mode command via status.`);
            const spec = { type: "json", states: V1VacuumFeatures.CONSTANTS.deviceStates.carpet_mode.states };
            this.addCommand("set_carpet_mode", spec);
            changedByStatus = true;
            appliedFeaturesList.push("set_carpet_mode (Command)");
        }
        if (validStatus.carpet_clean_mode !== undefined && !this.commands["set_carpet_clean_mode"]) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected carpet_clean_mode command via status.`);
            const spec = { type: "json", states: V1VacuumFeatures.CONSTANTS.deviceStates.carpet_clean_mode.states };
            this.addCommand("set_carpet_clean_mode", spec);
            changedByStatus = true;
            appliedFeaturesList.push("set_carpet_clean_mode (Command)");
        }
        // Refine Fan Power (Max+)
        if (validStatus.fan_power === 108 && !this.appliedFeatures.has(features_enum_1.Feature.FanMaxPlus) && !this.config.staticFeatures.includes(features_enum_1.Feature.FanMaxPlus) && await this.applyFeature(features_enum_1.Feature.FanMaxPlus)) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected FanMaxPlus state (108).`);
            changedByStatus = true;
            appliedFeaturesList.push("FanMaxPlus");
        }
        // MopDry
        if (validStatus.dry_status !== undefined && !this.appliedFeatures.has(features_enum_1.Feature.MopDry) && await this.applyFeature(features_enum_1.Feature.MopDry)) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected MopDry feature via 'dry_status' key.`);
            changedByStatus = true;
            appliedFeaturesList.push("MopDry");
        }
        // AutoEmptyDock
        if (validStatus.dust_collection_status !== undefined && !this.appliedFeatures.has(features_enum_1.Feature.AutoEmptyDock) && await this.applyFeature(features_enum_1.Feature.AutoEmptyDock)) {
            // this.deps.log.silly(`[RuntimeDetect|${this.robotModel}|${this.duid}] Detected AutoEmptyDock feature via 'dust_collection_status' key.`);
            changedByStatus = true;
            appliedFeaturesList.push("AutoEmptyDock");
        }
        // MopWash
        if (validStatus.wash_status !== undefined && !this.appliedFeatures.has(features_enum_1.Feature.MopWash) && await this.applyFeature(features_enum_1.Feature.MopWash)) {
            changedByStatus = true;
            appliedFeaturesList.push("MopWash");
        }
        // Dynamic DockingStationStatus
        const dssSupportedDockTypes = [1, 2, 3, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18];
        const hasDssInStatus = validStatus.dss !== undefined;
        const hasSupportedDock = validStatus.dock_type !== undefined && dssSupportedDockTypes.includes(validStatus.dock_type);
        const shouldApplyDss = (hasDssInStatus || hasSupportedDock);
        if (shouldApplyDss && !this.appliedFeatures.has(features_enum_1.Feature.DockingStationStatus) && await this.applyFeature(features_enum_1.Feature.DockingStationStatus)) {
            changedByStatus = true;
            appliedFeaturesList.push("DockingStationStatus");
        }
        // Ensure Consumables features are applied (standard for all vacuums really, but good to be explicit)
        if (!this.appliedFeatures.has(features_enum_1.Feature.Consumables) && await this.applyFeature(features_enum_1.Feature.Consumables)) {
            changedByStatus = true;
            appliedFeaturesList.push("Consumables");
        }
        // ResetConsumables is now handled dynamically inside updateConsumables loop,
        // but we might want to register the Feature if we attach commands to it in future.
        // For now, the buttons are created in updateConsumables.
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
            1: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.DockingStationStatus],
            2: [features_enum_1.Feature.MopWash, features_enum_1.Feature.DockingStationStatus],
            3: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus],
            5: [features_enum_1.Feature.AutoEmptyDock],
            6: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus],
            7: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus],
            8: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus],
            9: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus],
            14: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus], // Qrevo Master (a117)
            15: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus], // Qrevo S (a104)
            16: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus],
            10: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus], // S7 MaxV/Pro
            17: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus], // Qrevo Curv Series (a159)
            18: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus], // S8 Pro
            21: [features_enum_1.Feature.AutoEmptyDock, features_enum_1.Feature.MopWash, features_enum_1.Feature.MopDry, features_enum_1.Feature.DockingStationStatus], // Qrevo Edge / New Model
        };
        const features = dockFeatureMap[dockType];
        if (features) {
            this.deps.log.info(`[${this.duid}] Applying dock features for type ${dockType}: ${features.join(", ")}`); // Apply features sequentially to handle dependencies
            for (const feature of features) {
                await this.applyFeature(feature); // applyFeature handles de-duplication
            }
        }
        else if (dockType !== 0) {
            this.deps.log.warn(`[processDockType|${this.duid}] Unknown dock type ${dockType} encountered. No features applied. Please report this model and dock type.`);
        }
    }
    // --- Instance Getters for Constants ---
    getCommonConsumable(attribute) {
        return V1VacuumFeatures.CONSTANTS.consumables[attribute];
    }
    isResetableConsumable(consumable) {
        // Access static constant
        return V1VacuumFeatures.CONSTANTS.resetConsumables.has(consumable);
    }
    getCommonDeviceStates(attribute) {
        const stateDef = V1VacuumFeatures.CONSTANTS.deviceStates[attribute];
        if (!stateDef)
            return undefined;
        const result = { ...stateDef };
        if (attribute === "fan_power" && this.profile.mappings.fan_power) {
            result.states = this.profile.mappings.fan_power;
        }
        else if (attribute === "mop_mode" && this.profile.mappings.mop_mode) {
            result.states = this.profile.mappings.mop_mode;
        }
        else if (attribute === "water_box_mode" && this.profile.mappings.water_box_mode) {
            result.states = this.profile.mappings.water_box_mode;
        }
        else if (attribute === "error_code" && this.profile.mappings.error_code) {
            result.states = { ...result.states, ...this.profile.mappings.error_code };
        }
        else if (attribute === "state" && this.profile.mappings.state) {
            result.states = this.profile.mappings.state;
        }
        return result;
    }
    getCommonCleaningInfo(attribute) {
        return V1VacuumFeatures.CONSTANTS.cleaningInfo[attribute];
    }
    getCommonCleaningRecords(attribute) {
        const spec = V1VacuumFeatures.CONSTANTS.cleaningRecords[attribute];
        return spec;
    }
    getFirmwareFeatureName(featureID) {
        // Retrieve feature name from static constants
        const name = V1VacuumFeatures.CONSTANTS.firmwareFeatures[featureID];
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
        mopMode.states = { ...V1VacuumFeatures.CONSTANTS.deviceStates.mop_mode.states, ...mopMode.states, 304: "Fast" }; // Merge carefully
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
            stream_html: `http://${ip}:${8554 + this.deps.adapter.instance}/stream.html?src=${this.duid}`,
            webrtc_html: `http://${ip}:${8554 + this.deps.adapter.instance}/webrtc.html?src=${this.duid}&media=video`,
            stream_mp4: `http://${ip}:${8554 + this.deps.adapter.instance}/api/stream.mp4?src=${this.duid}`,
            rtsp: `rtsp://${ip}:${1984 + this.deps.adapter.instance}/${this.duid}?video`,
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
            await this.ensureState("floors", feature, { ...this.getCommonDeviceStates(feature), write: false });
        }
    }
    async updateConsumables(data) {
        let resultObj;
        if (data) {
            resultObj = data;
        }
        else {
            try {
                const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_consumable", []);
                if (Array.isArray(result) && result.length > 0 && typeof result[0] === "object") {
                    resultObj = result[0];
                }
                else if (typeof result === "object" && result !== null) {
                    resultObj = result;
                }
            }
            catch (e) {
                this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update consumables: ${e.message}`, "warn");
            }
        }
        if (resultObj) {
            await this.processConsumables(resultObj);
        }
    }
    async processConsumables(resultObj) {
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
                await this.deps.ensureState(`Devices.${this.duid}.deviceStatus.${key}`, {
                    name: key,
                    type: typeof resultObj[key],
                    role: "value",
                    write: false
                });
                await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.deviceStatus.${key}`, { val: resultObj[key], ack: true });
            }
        }
        for (const key in resultObj) {
            const val = resultObj[key];
            if (key === "net_status" || settingsToProcess.includes(key))
                continue;
            const common = this.getCommonDeviceStates(key) || { name: key, type: typeof val, role: "value", write: false };
            // Check for specific consumables
            if (["main_brush_work_time", "side_brush_work_time", "filter_work_time", "filter_element_work_time", "sensor_dirty_time"].includes(key)) {
                const deviceName = key.replace("_work_time", "").replace("_dirty_time", "");
                await this.deps.ensureState(`Devices.${this.duid}.consumables.${deviceName}`, { ...common, unit: "%" });
                const fullLifeHours = {
                    "main_brush": 300,
                    "side_brush": 200,
                    "filter": 150,
                    "filter_element": 150,
                    "sensor": 30
                };
                const totalTime = (fullLifeHours[deviceName] || 0) * 3600;
                if (totalTime > 0) {
                    const percent = Math.round(100 - (val / totalTime) * 100);
                    await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.consumables.${deviceName}`, { val: percent, ack: true });
                }
            }
            else {
                await this.deps.ensureState(`Devices.${this.duid}.consumables.${key}`, common);
                await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.consumables.${key}`, { val: val, ack: true });
            }
            if (key.endsWith("_work_time") || key.endsWith("_dirty_time")) {
                const resetKey = key.replace("_work_time", "").replace("_dirty_time", "");
                await this.deps.ensureState(`Devices.${this.duid}.resetConsumables.${resetKey}`, { name: `Reset ${resetKey}`, type: "boolean", role: "button", write: true, def: false });
            }
        }
    }
    // Helper for B01 network info processing
    async processNetworkInfo(data) {
        if (!data || typeof data !== "object")
            return;
        await this.deps.ensureFolder(`Devices.${this.duid}.networkInfo`);
        const mapping = {
            ssid: "ssid",
            ip: "ip",
            mac: "mac",
            bssid: "bssid",
            rssi: "rssi",
            frequency: "frequency" // Not standard but useful
        };
        for (const [key, stateName] of Object.entries(mapping)) {
            if (data[key] !== undefined) {
                const val = data[key];
                const common = {
                    name: stateName,
                    type: typeof val === "number" ? "number" : "string",
                    role: key === "rssi" ? "value.rssi" : "info",
                    read: true,
                    write: false
                };
                await this.deps.ensureState(`Devices.${this.duid}.networkInfo.${stateName}`, common);
                await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.networkInfo.${stateName}`, { val: val, ack: true });
            }
        }
    }
    addAvoidCarpetCommands() {
        this.addCommand("set_carpet_mode", { type: "json", states: V1VacuumFeatures.CONSTANTS.deviceStates.carpet_mode.states });
        this.addCommand("set_carpet_clean_mode", { type: "json", states: V1VacuumFeatures.CONSTANTS.deviceStates.carpet_clean_mode.states });
    }
    async addAvoidCollisionStates() {
        await this.ensureState("deviceStatus", "collision_avoid_status", { ...this.getCommonDeviceStates("collision_avoid_status"), write: false });
        await this.ensureState("deviceStatus", "avoid_count", { ...this.getCommonDeviceStates("avoid_count"), write: false });
    }
    async addMopForbiddenStates() {
        await this.ensureState("deviceStatus", "mop_forbidden_enable", { ...this.getCommonDeviceStates("mop_forbidden_enable"), write: false });
    }
    async addVoiceControlStates() {
        await this.ensureState("deviceStatus", "voice_chat_status", { ...this.getCommonDeviceStates("voice_chat_status"), write: false });
    }
    async addCameraSettingsStates() {
        await this.ensureState("deviceStatus", "camera_status", { ...this.getCommonDeviceStates("camera_status"), write: false });
        await this.ensureState("deviceStatus", "distance_off", { ...this.getCommonDeviceStates("distance_off"), write: false });
    }
    async addSwitchMapModeState() {
        await this.ensureState("deviceStatus", "switch_map_mode", { ...this.getCommonDeviceStates("switch_map_mode"), write: false });
    }
    async addCornerCleanModeState() {
        await this.ensureState("deviceStatus", "corner_clean_mode", { ...this.getCommonDeviceStates("corner_clean_mode"), write: false });
    }
    // --- State/Info Feature Handlers ---
    async addMapFlagState() { await this.ensureState("deviceStatus", "map_flag", { ...this.getCommonDeviceStates("map_flag"), write: false }); }
    async addCommonStatusState() { await this.ensureState("deviceStatus", "common_status", { ...this.getCommonDeviceStates("common_status"), write: false }); }
    async addDockErrorStatusState() { await this.ensureState("deviceStatus", "dock_error_status", { ...this.getCommonDeviceStates("dock_error_status"), write: false }); }
    async addBackTypeState() { await this.ensureState("deviceStatus", "back_type", { ...this.getCommonDeviceStates("back_type"), write: false }); }
    async addSwitchStatusState() { await this.ensureState("deviceStatus", "switch_status", { ...this.getCommonDeviceStates("switch_status"), write: false }); }
    async addMonitorStatusState() { await this.ensureState("deviceStatus", "monitor_status", { ...this.getCommonDeviceStates("monitor_status"), write: false }); }
    async addCleanPercentState() { await this.ensureState("deviceStatus", "clean_percent", { ...this.getCommonDeviceStates("clean_percent"), write: false }); }
    async addInWarmupState() { await this.ensureState("deviceStatus", "in_warmup", { ...this.getCommonDeviceStates("in_warmup"), write: false }); }
    async addExitDockState() { await this.ensureState("deviceStatus", "exit_dock", { ...this.getCommonDeviceStates("exit_dock"), write: false }); }
    async addExtraTimeState() { await this.ensureState("deviceStatus", "extra_time", { ...this.getCommonDeviceStates("extra_time"), write: false }); }
    async addLastCleanTimeState() { await this.ensureState("deviceStatus", "last_clean_t", { ...this.getCommonDeviceStates("last_clean_t"), write: false }); }
    async addChargeStatusState() { await this.ensureState("deviceStatus", "charge_status", { ...this.getCommonDeviceStates("charge_status"), write: false }); }
    async addCleaningInfoState() { await this.ensureState("deviceStatus", "cleaning_info", { ...this.getCommonDeviceStates("cleaning_info"), write: false }); }
    async addCleanRepeatState() { await this.ensureState("deviceStatus", "repeat", { ...this.getCommonDeviceStates("repeat"), write: false }); }
    async createDockingStationStatusStates() {
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
        }
        catch (error) {
            throw error;
        }
    }
    async updateFirmwareFeatures() {
        if (!this.hasFeature(features_enum_1.Feature.FirmwareInfo))
            return;
        let version = await this.deps.adapter.getDeviceProtocolVersion(this.duid);
        // Fallback: If version is 1.0 but model is known B01 (e.g. Q7 Max, Q7, Q7 L5), force B01
        if (version === "1.0" && ["roborock.vacuum.a27", "roborock.vacuum.a34", "roborock.vacuum.sc01"].includes(this.robotModel)) {
            this.deps.adapter.rLog("System", this.duid, "Debug", version, undefined, `Force-overriding version to B01 for model ${this.robotModel} in updateFirmwareFeatures`, "debug");
            version = "B01";
        }
        if (version === "B01")
            return;
        try {
            const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_fw_features", []);
            if (Array.isArray(result)) {
                // Store in http_api for getDynamicFeatures usage
                this.deps.http_api.storeFwFeaturesResult(this.duid, result);
                // Setup states
                await this.setupFirmwareFeatures(result);
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update firmware features: ${e.message}`, "warn");
        }
    }
    async setupFirmwareFeatures(features) {
        await this.deps.ensureFolder(`Devices.${this.duid}.firmwareFeatures`);
        // Loop through all known features from CONSTANTS
        for (const [id, name] of Object.entries(V1VacuumFeatures.CONSTANTS.firmwareFeatures)) {
            const isSupported = features.includes(Number(id));
            await this.ensureState("firmwareFeatures", name, {
                type: "boolean",
                role: "indicator",
                name: `${name} (ID: ${id})`,
                write: false
            });
            await this.deps.adapter.setStateChanged(`Devices.${this.duid}.firmwareFeatures.${name}`, { val: isSupported, ack: true });
        }
    }
    // Override updateStatus to process dss breakdown and B01 support
    async updateStatus() {
        let resultObj;
        try {
            const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_status", []);
            if (Array.isArray(result) && result.length > 0 && typeof result[0] === "object") {
                resultObj = result[0];
            }
            else if (typeof result === "object" && result !== null) {
                resultObj = result;
            }
            if (resultObj) {
                await this.processStatus(resultObj);
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update status: ${e.message}`, "warn");
        }
    }
    async processStatus(resultObj) {
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
        if (resultObj["wind"] !== undefined)
            resultObj["fan_power"] = resultObj["wind"];
        if (resultObj["water"] !== undefined)
            resultObj["water_box_mode"] = resultObj["water"];
        if (resultObj["quantity"] !== undefined)
            resultObj["battery"] = resultObj["quantity"];
        if (resultObj["clean_finish"] !== undefined)
            resultObj["last_clean_t"] = resultObj["clean_finish"];
        await this.deps.ensureFolder(`Devices.${this.duid}.deviceStatus`);
        for (const key in resultObj) {
            let val = resultObj[key];
            const common = this.getCommonDeviceStates(key) || { name: key, type: typeof val, role: "value", read: true, write: false };
            // Serialize complex objects
            if (typeof val === "object" && val !== null) {
                val = JSON.stringify(val);
            }
            if (key === "clean_time") {
                val = Math.round(val / 60);
            }
            else if (key === "clean_area" || key === "cleaned_area") {
                val = Number((val / 1000000).toFixed(2));
            }
            // Formatting for specific keys (e.g. timestamps)
            if ((key === "last_clean_t" || key === "clean_finish") && typeof val === "number") {
                val = new Date(val * 1000).toLocaleString();
            }
            if (common.type === "string" && typeof val !== "string") {
                val = String(val);
            }
            await this.deps.ensureState(`Devices.${this.duid}.deviceStatus.${key}`, common);
            await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.deviceStatus.${key}`, { val: val, ack: true });
        }
    }
    async updateDockingStationStatus(dss) {
        // Guard: Feature must be active
        if (!this.appliedFeatures.has(features_enum_1.Feature.DockingStationStatus)) {
            return;
        }
        // Parse 2-bit status fields
        const status = {
            cleanFluidStatus: (dss >> 10) & 0b11, // Bits 10-11: Clean water tank status
            waterBoxFilterStatus: (dss >> 8) & 0b11, // Bits 8-9: Water box filter
            dustBagStatus: (dss >> 6) & 0b11, // Bits 6-7: Dust bag (Staubbeutel)
            dirtyWaterBoxStatus: (dss >> 4) & 0b11, // Bits 4-5: Dirty water tank
            clearWaterBoxStatus: (dss >> 2) & 0b11, // Bits 2-3: Clear water box
            isUpdownWaterReady: dss & 0b11, // Bits 0-1: Water ready status
        };
        for (const [name, val] of Object.entries(status)) {
            await this.deps.adapter.setStateChanged(`Devices.${this.duid}.dockingStationStatus.${name}`, { val: val, ack: true });
        }
    }
    async addRssState() { await this.ensureState("deviceStatus", "rss", { ...this.getCommonDeviceStates("rss"), write: false }); }
    async addRobotStatusState() { await this.ensureState("deviceStatus", "state", { ...this.getCommonDeviceStates("state"), write: false }); }
    async addKctState() { await this.ensureState("deviceStatus", "kct", { ...this.getCommonDeviceStates("kct"), write: false }); }
    async addCleanFluidState() { await this.ensureState("deviceStatus", "clean_fluid", { ...this.getCommonDeviceStates("clean_fluid"), write: false }); }
    async addRdtState() { await this.ensureState("deviceStatus", "rdt", { ...this.getCommonDeviceStates("rdt"), write: false }); }
    async addReplenishModeState() { await this.ensureState("deviceStatus", "replenish_mode", { ...this.getCommonDeviceStates("replenish_mode"), write: false }); }
    async addCleanedAreaState() { await this.ensureState("deviceStatus", "cleaned_area", { ...this.getCommonDeviceStates("cleaned_area"), write: false }); }
    async addCleanTimesState() { await this.ensureState("deviceStatus", "clean_times", { ...this.getCommonDeviceStates("clean_times"), write: false }); }
    async createCustomWaterDistanceState() {
        await this.ensureState("commands", "set_water_box_distance_off", {
            type: "number",
            role: "level",
            write: true,
            ...this.getCommonDeviceStates("distance_off"),
            min: 1,
            max: 30,
        });
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
    // --- Complex Update Implementations ---
    static MAPPED_CLEAN_SUMMARY = { 0: "clean_time", 1: "clean_area", 2: "clean_count", 3: "records", record_list: "records" };
    static MAPPED_CLEANING_RECORD_ATTRIBUTE = {
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
    async updateRoomMapping() {
        try {
            const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_room_mapping", []);
            this.mappedRooms = result;
            if (!Array.isArray(result) || result.length === 0) {
                return;
            }
            let mapStatus = 0;
            const mapStatusState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.map_status`);
            if (mapStatusState && typeof mapStatusState.val === "number") {
                mapStatus = mapStatusState.val;
            }
            else {
                const statusRes = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_prop", ["get_status"]);
                if (Array.isArray(statusRes) && statusRes[0] && typeof statusRes[0] === "object" && "map_status" in statusRes[0]) {
                    mapStatus = Number(statusRes[0]["map_status"]);
                }
            }
            const roomFloor = mapStatus >> 2;
            const roomIDs = this.deps.http_api.getMatchedRoomIDs(true);
            for (const item of result) {
                if (!Array.isArray(item) || item.length < 2)
                    continue;
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
                await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.floors.${pathName}`, { val: true, ack: true });
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
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update room mapping: ${e.message}`, "warn");
        }
    }
    async getCommandParams(method, params) {
        if (method === "app_segment_clean") {
            try {
                this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, "Generating params for app_segment_clean...", "debug");
                const roomList = { segments: [], repeat: 1 };
                // 1. Get current map/floor
                const mapStatusState = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.deviceStatus.map_status`);
                let roomFloor = 0;
                if (mapStatusState && typeof mapStatusState.val === "number") {
                    roomFloor = mapStatusState.val >> 2;
                }
                else {
                    this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, "app_segment_clean: map_status not available, assuming floor 0.", "warn");
                }
                // 2. Get Room Mapping (to know which IDs to check)
                // We use the cached/latest mapping from API because looking up folders is harder without knowing IDs
                const mappedRoomList = (await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_room_mapping", [], { priority: 1 }));
                if (Array.isArray(mappedRoomList)) {
                    for (const item of mappedRoomList) {
                        // item: [shortID, roomID]
                        if (!Array.isArray(item) || item.length < 1)
                            continue;
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
                    this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, "app_segment_clean: No rooms selected! Command might be ignored by robot.", "warn");
                }
                else {
                    this.deps.adapter.rLog("System", this.duid, "Info", undefined, undefined, `Starting segment clean for rooms: ${roomList.segments.join(", ")} (Repeat: ${roomList.repeat})`, "info");
                }
                // Reset count to 1 after start (from legacy behavior)
                await this.deps.adapter.setState(`Devices.${this.duid}.floors.cleanCount`, { val: 1, ack: true });
                // Roborock expects array of objects? Legacy code: [roomList]
                return [roomList];
            }
            catch (e) {
                this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Failed to generate params for app_segment_clean: ${e.message}`, "error");
                return params; // Fallback
            }
        }
        const commandsRequiringArray = [
            "set_water_box_custom_mode",
            "set_custom_mode",
            "set_clean_motor_mode",
            "set_mop_mode",
            "set_smart_wash_params",
            "set_carpet_mode",
            "set_carpet_clean_mode",
            "set_dust_collection_mode",
            "set_water_box_distance_off",
            "app_set_dryer_setting",
            "set_wash_towel_mode",
            "set_dust_collection_switch_status"
        ];
        if (commandsRequiringArray.includes(method) &&
            (params !== undefined && !Array.isArray(params))) {
            // These commands require parameters to be wrapped in an array [val]
            // If params is a string (ioBroker JSON state), try to parse it first
            if (typeof params === "string") {
                try {
                    const parsed = JSON.parse(params);
                    return [parsed];
                }
                catch {
                    // Not JSON, wrap as is
                    return [params];
                }
            }
            return [params];
        }
        return params;
    }
    async updateCleanSummary() {
        try {
            const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_clean_summary", [], { priority: -10 });
            if (result) {
                await this.processCleanSummary(result);
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update clean summary: ${e.message}`, "warn");
        }
    }
    async processCleanSummary(result) {
        try {
            let unwrapped = result;
            while (Array.isArray(unwrapped) && unwrapped.length === 1) {
                unwrapped = unwrapped[0];
            }
            const cleaningAttributes = unwrapped;
            for (const cleaningAttribute in cleaningAttributes) {
                const mappedAttribute = V1VacuumFeatures.MAPPED_CLEAN_SUMMARY[cleaningAttribute] || cleaningAttribute;
                const cleaningAttributeCommon = this.getCommonCleaningInfo(mappedAttribute);
                if (["clean_time", "clean_area", "clean_count"].includes(mappedAttribute)) {
                    let val = cleaningAttributes[cleaningAttribute];
                    if (mappedAttribute === "clean_time") {
                        val = Number((val / 3600).toFixed(2));
                    }
                    else if (mappedAttribute === "clean_area") {
                        val = Number((val / 1000000).toFixed(2));
                    }
                    if (cleaningAttributeCommon)
                        cleaningAttributeCommon.type = "number";
                    await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.${mappedAttribute}`, cleaningAttributeCommon || {});
                    await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.${mappedAttribute}`, {
                        val: val,
                        ack: true,
                    });
                    continue;
                }
                if (mappedAttribute == "records") {
                    await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records`);
                    const recordsList = cleaningAttributes[cleaningAttribute];
                    const cleaningRecordsJSON = [];
                    // Process records sequentially, most recent first (index 0 is newest)
                    const recordsIndices = Object.keys(recordsList).sort((a, b) => parseInt(a) - parseInt(b));
                    const limit = 20; // Max records to process per update to avoid timeouts
                    let processed = 0;
                    for (const cleaningRecord of recordsIndices) {
                        if (processed >= limit)
                            break;
                        processed++;
                        let cleaningRecordID;
                        let recordDetails = null;
                        const rawRecord = recordsList[cleaningRecord];
                        if (rawRecord && typeof rawRecord === "object" && "detail" in rawRecord) {
                            // B01 Record format
                            recordDetails = rawRecord;
                            try {
                                const detail = typeof rawRecord.detail === "string" ? JSON.parse(rawRecord.detail) : rawRecord.detail;
                                cleaningRecordID = detail.record_start_time || detail.begin;
                            }
                            catch (e) {
                                this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Failed to parse B01 record detail: ${e}`, "error");
                                continue;
                            }
                        }
                        else {
                            cleaningRecordID = rawRecord;
                        }
                        await new Promise((resolve) => setTimeout(resolve, 100)); // Pacing delay
                        try {
                            // Optimization: Skip if record already exists in database
                            const existing = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.duration`);
                            if (existing && existing.val !== null && existing.val !== undefined) {
                                this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, `Skipping already processed cleaning record ${cleaningRecordID} (Index: ${cleaningRecord})`, "debug");
                                continue;
                            }
                            await this.deps.ensureFolder(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}`);
                            const protocol = await this.deps.adapter.getDeviceProtocolVersion(this.duid);
                            const params = protocol === "B01" ? [{ record_id: cleaningRecordID }] : [cleaningRecordID];
                            const cleaningRecordAttributesRes = (await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_clean_record", params, { priority: -10 }));
                            let unwrappedRecord = cleaningRecordAttributesRes;
                            while (Array.isArray(unwrappedRecord) && unwrappedRecord.length === 1) {
                                unwrappedRecord = unwrappedRecord[0];
                            }
                            const cleaningRecordAttributes = unwrappedRecord;
                            cleaningRecordsJSON[parseInt(cleaningRecord)] = cleaningRecordAttributes;
                            const combinedRecord = { ...cleaningRecordAttributes };
                            for (const cleaningRecordAttribute in cleaningRecordAttributes) {
                                const mappedRecordAttribute = V1VacuumFeatures.MAPPED_CLEANING_RECORD_ATTRIBUTE[cleaningRecordAttribute] || cleaningRecordAttribute;
                                let val = cleaningRecordAttributes[cleaningRecordAttribute];
                                if (["begin", "end"].includes(mappedRecordAttribute)) {
                                    val = new Date(val * 1000).toString();
                                }
                                else if (mappedRecordAttribute == "duration") {
                                    val = Math.round(val / 60);
                                }
                                else if (mappedRecordAttribute == "area" || mappedRecordAttribute == "cleaned_area") {
                                    val = Number((val / 1000000).toFixed(2));
                                }
                                combinedRecord[mappedRecordAttribute] = val;
                                const cleaningRecordCommon = this.getCommonCleaningRecords(mappedRecordAttribute);
                                if (cleaningRecordCommon) {
                                    await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, cleaningRecordCommon);
                                    await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, {
                                        val: val,
                                        ack: true,
                                    });
                                }
                            }
                            if (this.deps.config.enable_map_creation == true) {
                                const mapArray = await this.getCleaningRecordMap(cleaningRecordID, recordDetails);
                                if (mapArray) {
                                    combinedRecord.mapBase64 = mapArray.mapBase64;
                                    combinedRecord.mapBase64Truncated = mapArray.mapBase64Truncated;
                                    await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapData`, {
                                        name: "Map Data JSON",
                                        type: "string",
                                        role: "json",
                                    });
                                    await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapData`, { val: mapArray.mapData, ack: true });
                                    await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64`, {
                                        name: "Map Image (Full, Uncropped)",
                                        type: "string",
                                        role: "text.png",
                                    });
                                    await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64`, { val: mapArray.mapBase64, ack: true });
                                    await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64Truncated`, {
                                        name: "Map Image (Full, Cropped)",
                                        type: "string",
                                        role: "text.png",
                                    });
                                    await this.deps.adapter.setStateChanged(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map.mapBase64Truncated`, {
                                        val: mapArray.mapBase64Truncated,
                                        ack: true,
                                    });
                                }
                            }
                            // Set combined map_object for this record
                            await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map_object`, {
                                name: "Combined cleaning record and map object",
                                type: "string",
                                role: "json",
                            });
                            await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.records.${cleaningRecord}.map_object`, {
                                val: JSON.stringify(combinedRecord),
                                ack: true,
                            });
                        }
                        catch (e) {
                            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to process cleaning record ${cleaningRecordID}: ${e.message}`, "warn");
                        }
                    }
                    await this.deps.ensureState(`Devices.${this.duid}.cleaningInfo.JSON`, { name: "Cleaning Records JSON", type: "string", role: "json" });
                    await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.cleaningInfo.JSON`, { val: JSON.stringify(cleaningRecordsJSON), ack: true });
                }
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to process clean summary: ${e.message}`, "warn");
        }
    }
    async getCleaningRecordMap(startTime, _recordDetails) {
        try {
            void _recordDetails;
            // B01 devices are handled via override.
            // V1 devices (1.0) expect an object with start_time.
            const params = { start_time: startTime };
            const cleaningRecordMapRes = (await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_clean_record_map", params, { priority: -10 })); // LOW
            let unwrapped = cleaningRecordMapRes;
            while (Array.isArray(unwrapped) && unwrapped.length === 1) {
                unwrapped = unwrapped[0];
            }
            let cleaningRecordMap;
            // Check new return format { data, version } or legacy Buffer
            if (unwrapped && typeof unwrapped === "object" && "data" in unwrapped && Buffer.isBuffer(unwrapped.data)) {
                cleaningRecordMap = unwrapped.data;
            }
            else if (Buffer.isBuffer(unwrapped)) {
                cleaningRecordMap = unwrapped;
            }
            else {
                return null;
            }
            // Check if map is gzipped (starts with 0x1f 0x8b)
            let mapBuf = cleaningRecordMap;
            if (cleaningRecordMap[0] === 0x1f && cleaningRecordMap[1] === 0x8b) {
                try {
                    const { promisify } = require("util");
                    const { gunzip } = require("zlib");
                    const gunzipAsync = promisify(gunzip);
                    mapBuf = await gunzipAsync(cleaningRecordMap);
                }
                catch (e) {
                    this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Failed to unzip map data: ${e}`, "error");
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
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to get cleaning record map: ${e.message}`, "warn");
            return null;
        }
    }
    async updateMap() {
        try {
            // "get_map_v1" is usually the command to GET the map.
            const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_map_v1", [], { priority: 0 });
            let mapBuf;
            let mapVer = await this.deps.adapter.getDeviceProtocolVersion(this.duid);
            const robotModel = this.deps.adapter.http_api.getRobotModel(this.duid) || "";
            // Handle new return format { data, version } or legacy Buffer
            if (result && typeof result === "object" && "data" in result && Buffer.isBuffer(result.data)) {
                mapBuf = result.data;
                if (result.version)
                    mapVer = result.version;
            }
            else if (Buffer.isBuffer(result)) {
                mapBuf = result;
            }
            else if (result) {
                this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, `get_map_v1 returned non-buffer: ${typeof result}`, "debug");
            }
            if (mapBuf) {
                const mapResult = await this.mapManager.processMap(mapBuf, mapVer, robotModel, this.duid, this.mappedRooms, this.duid, "Unknown");
                await this.processMapResults(mapResult);
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update map: ${e.message}`, "warn");
        }
    }
    /**
     * Helper to process map results and update ioBroker states.
     */
    async processMapResults(mapResult) {
        if (!mapResult)
            return;
        const { mapBase64, mapBase64Clean, mapData } = mapResult;
        await this.deps.ensureFolder(`Devices.${this.duid}.map`);
        if (mapData) {
            await this.deps.ensureState(`Devices.${this.duid}.map.mapData`, { name: "Map Data", type: "string", role: "json" });
            await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapData`, { val: JSON.stringify(mapData), ack: true });
        }
        if (mapBase64) {
            await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64`, { name: "Map Image", type: "string", role: "text.png" });
            await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapBase64`, { val: mapBase64, ack: true });
        }
        if (mapBase64Clean) {
            await this.deps.ensureState(`Devices.${this.duid}.map.mapBase64Clean`, { name: "Map Image (Clean)", type: "string", role: "text.png" });
            await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.map.mapBase64Clean`, { val: mapBase64Clean, ack: true });
        }
    }
    async updateExtraStatus() {
        const robotModel = this.deps.adapter.http_api.getRobotModel(this.duid);
        const version = await this.deps.adapter.getDeviceProtocolVersion(this.duid);
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
                if (version !== "B01")
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
                if (version !== "B01") {
                    await this.requestAndProcess("get_carpet_mode", [], "deviceStatus");
                    await this.requestAndProcess("get_carpet_clean_mode", [], "deviceStatus");
                    await this.requestAndProcess("get_water_box_custom_mode", [], "deviceStatus");
                }
        }
    }
    async getPhoto(imgId, type) {
        const requestParams = {
            data_filter: {
                img_id: imgId,
                type: type,
            },
        };
        return this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_photo", requestParams, { priority: 0 });
    }
    async updateMultiMapsList() {
        const version = await this.deps.adapter.getDeviceProtocolVersion(this.duid);
        if (version === "B01")
            return;
        try {
            const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_multi_maps_list", []);
            let mapInfo = [];
            if (Array.isArray(result) && result[0] && result[0].map_info) {
                mapInfo = result[0].map_info;
            }
            else if (typeof result === "object" && result.map_info) {
                mapInfo = result.map_info;
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
                    await this.deps.adapter.setStateChanged(`Devices.${this.duid}.floors.${mapFlag}.name`, { val: name, ack: true });
                    await this.ensureState(`floors.${mapFlag}`, "mapFlag", { name: "Map Flag", type: "number", write: false });
                    await this.deps.adapter.setStateChanged(`Devices.${this.duid}.floors.${mapFlag}.mapFlag`, { val: mapFlag, ack: true });
                    await this.ensureState(`floors.${mapFlag}`, "add_time", { name: "Created At", type: "string", write: false });
                    await this.deps.adapter.setStateChanged(`Devices.${this.duid}.floors.${mapFlag}.add_time`, { val: formattedTime, ack: true });
                    // Load Button
                    await this.ensureState(`floors.${mapFlag}`, "load", { name: "Load Map", type: "boolean", role: "button", write: true, def: false });
                }
            }
            else {
                // Fallback to default behavior if no map info (or empty)
                await super.updateMultiMapsList();
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update floors/multi-maps: ${e.message}`, "warn");
        }
    }
    placeholderFeatures() {
        // No-op: These features are detected but require no specific initialization logic
        this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, "Placeholder feature initialized.", "debug");
    }
}
exports.V1VacuumFeatures = V1VacuumFeatures;
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.AutoEmptyDock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], V1VacuumFeatures.prototype, "addAutoEmptyDockCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MopWash),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], V1VacuumFeatures.prototype, "addMopWashCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MopDry),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], V1VacuumFeatures.prototype, "addMopDryCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.WaterBox),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ShakeMopStrength),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ElectronicWaterBox),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], V1VacuumFeatures.prototype, "addWaterBoxCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanRouteFastMode),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], V1VacuumFeatures.prototype, "addCleanRouteFastModeCommand", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.SmartPlan),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], V1VacuumFeatures.prototype, "addSmartPlanFeature", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.LiveVideo),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Camera),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "createCameraStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MultiFloor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "createMultiFloorStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.AvoidCarpet),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isCarpetSupported),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], V1VacuumFeatures.prototype, "addAvoidCarpetCommands", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isAvoidCollisionSupported),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addAvoidCollisionStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MopForbidden),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addMopForbiddenStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.VoiceControl),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addVoiceControlStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Camera),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addCameraSettingsStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isSupportSetSwitchMapMode),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addSwitchMapModeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isCornerCleanModeSupported),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addCornerCleanModeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MapFlag),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addMapFlagState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CommonStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addCommonStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.DockStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addDockErrorStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.BackType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addBackTypeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.SwitchStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addSwitchStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.MonitorStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addMonitorStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanPercent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addCleanPercentState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.InWarmup),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addInWarmupState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ExitDock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addExitDockState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ExtraTime),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addExtraTimeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.LastCleanTime),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addLastCleanTimeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ChargeStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addChargeStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleaningInfo),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addCleaningInfoState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanRepeat),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addCleanRepeatState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.DockingStationStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "createDockingStationStatusStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Rss),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addRssState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.RobotStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addRobotStatusState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Kct),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addKctState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanFluid),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addCleanFluidState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.Rdt),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addRdtState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.ReplenishMode),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addReplenishModeState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanedArea),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addCleanedAreaState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CleanTimes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addCleanTimesState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.CustomWaterBoxDistance),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "createCustomWaterDistanceState", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.FanMaxPlus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], V1VacuumFeatures.prototype, "addFanMaxPlusCommand", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.NetworkInfo),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addNetworkInfoStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.UpdateStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "addUpdateStatusStates", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.SmartModeCommand),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], V1VacuumFeatures.prototype, "addSmartModeCommand", null);
__decorate([
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isShakeMopSetSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isVideoMonitorSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isVideoSettingSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isPhotoUploadSupported),
    baseDeviceFeatures_1.BaseDeviceFeatures.DeviceFeature(features_enum_1.Feature.isBackChargeAutoWashSupported),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V1VacuumFeatures.prototype, "updateMultiMapsList", null);
__decorate([
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
], V1VacuumFeatures.prototype, "placeholderFeatures", null);
//# sourceMappingURL=v1VacuumFeatures.js.map