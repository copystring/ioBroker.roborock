"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDeviceFeatures = exports.BaseStatusSchema = void 0;
exports.RegisterModel = RegisterModel;
const features_enum_1 = require("./features.enum");
const zod_1 = require("zod");
// --- Registry & Decorator ---
/** Maps robotModelId to feature class constructors. */
const modelRegistry = new Map();
/**
 * Decorator to register a feature class for a robot model.
 * @param robotModelId Unique model identifier (e.g. 'roborock.vacuum.a70').
 */
function RegisterModel(robotModelId) {
    return function (constructor) {
        if (modelRegistry.has(robotModelId)) {
            // Model already registered, overwriting.
        }
        modelRegistry.set(robotModelId, constructor);
    };
}
// --- Zod Schemas (Base) ---
/**
 * Base Zod schema for generic status properties.
 */
exports.BaseStatusSchema = zod_1.z
    .object({
    error_code: zod_1.z.number().int().optional(),
    // Add generic status fields if applicable
})
    .passthrough();
// --- Generic Base Class ---
/**
 * Base class for device features. Handles init, feature application, and commands.
 * Extended by specific types (e.g. V1VacuumFeatures).
 */
class BaseDeviceFeatures {
    deps;
    commands; // Command definitions for this device
    duid;
    robotModel;
    config; // Static feature config from model class
    appliedFeatures = new Set(); // Tracks applied features
    runtimeDetectionComplete = false; // Initial runtime detection flag
    commandsCreated = false; // Command objects created flag
    // --- Constants (Generic) ---
    static CONSTANTS = {
        // Generic constants for all Roborock devices
        baseCommands: {},
        // Generic error codes (subset)
        errorCodes: {
            0: "No error",
            255: "Internal error",
            "-1": "Unknown Error",
            // Add more if generic across all devices
        },
    };
    // --- Metadata Key for Feature Registry ---
    // Unique symbol for registry on prototype
    static FEATURE_METADATA_KEY = Symbol.for("roborock.featureRegistry");
    /**
     * Decorator to register a feature handler method.
     * @param feature The Feature enum key.
     */
    static DeviceFeature(feature) {
        return function (target, propertyKey) {
            // 'target' is the prototype
            let registry = target[BaseDeviceFeatures.FEATURE_METADATA_KEY];
            if (!registry) {
                registry = new Map();
                // Store on prototype
                target[BaseDeviceFeatures.FEATURE_METADATA_KEY] = registry;
            }
            registry.set(feature, propertyKey);
        };
    }
    // --- Feature Registry (Instance Based via Metadata) ---
    /**
     * Base feature handler constructor.
     * @param dependencies Injected dependencies.
     * @param duid Device unique identifier.
     * @param robotModel Robot model string.
     * @param config Static feature config.
     */
    constructor(dependencies, duid, robotModel, config) {
        this.deps = dependencies;
        this.duid = duid;
        this.robotModel = robotModel;
        this.config = config;
        // Initialize empty commands map. Actual commands will be populated during setupProtocolFeatures.
        this.commands = {};
    }
    /**
     * Handles dock type features. Override if needed.
     * @param dockType Numeric dock type identifier.
     */
    async processDockType(dockType) {
        this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, `Base processDockType called for type ${dockType}. No default actions.`, "debug");
    }
    /**
     * Applies static features from config.
     * Override for pre-runtime model logic.
     * @param _statusData Optional initial status data.
     * @param _fwFeatures Optional initial firmware features.
     */
    async applyModelSpecifics() {
        const promises = this.config.staticFeatures.map((feature) => this.applyFeature(feature));
        await Promise.all(promises);
    }
    // --- Core Initialization Logic ---
    /**
     * Initializes features: Model Specifics -> Runtime Detection -> Dock Processing -> Command Objects.
     * @param initialStatus Optional initial status.
     * @param initialFwFeatures Optional initial firmware features.
     */
    async initialize(online = false) {
        this.deps.adapter.rLog("System", this.duid, "Info", undefined, undefined, "Starting feature initialization...", "info");
        // Flow: Protocol -> Model Specifics -> Runtime Detection -> Dock Processing -> Command Objects
        // 0. Setup Protocol Features (Command Sets)
        try {
            await this.setupProtocolFeatures();
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Error setting up protocol features: ${e.message}`, "error");
        }
        // 1. Apply Model Specifics
        try {
            await this.applyModelSpecifics();
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Error applying model specifics: ${e.message}`, "error");
        }
        // 2. Fetch initial data if online
        if (online) {
            try {
                await this.initializeDeviceData();
            }
            catch (e) {
                this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Error initializing device data: ${e.message}`, "error");
            }
        }
        // 3. Create/Update ioBroker Objects
        try {
            await this.createCommandObjects();
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Error creating command objects: ${e.message}`, "error");
        }
        this.deps.adapter.rLog("System", this.duid, "Info", undefined, undefined, "Initialization complete.", "info");
    }
    /**
     * Fetches initial runtime data (status, consumables, map).
     * Subclasses should override this to provide specific logic.
     */
    async initializeDeviceData() {
        // Default implementation: update status if online
        await this.updateStatus();
        await this.updateFirmwareFeatures();
    }
    async setupProtocolFeatures() {
        const version = await this.deps.adapter.getDeviceProtocolVersion(this.duid);
        this.deps.adapter.rLog("System", this.duid, "Debug", undefined, version, "Configuring Command Set...", "debug");
        // Initialize with generic base commands
        this.commands = JSON.parse(JSON.stringify(BaseDeviceFeatures.CONSTANTS.baseCommands));
    }
    /**
     * Logs summary of applied features and commands. Call after init.
     */
    printSummary() {
        const featureList = Array.from(this.appliedFeatures).sort().join(", ");
        const commandList = Object.keys(this.commands).sort().join(", ");
        this.deps.adapter.rLog("System", this.duid, "Info", undefined, undefined, `Summary -> Features: [${featureList}] | Commands: [${commandList}]`, "info");
    }
    // --- Core Helper Methods ---
    /**
     * Applies a feature if not already applied. Looks up implementation in registry.
     * @param feature Feature enum key.
     * @returns `true` if applied now.
     */
    async applyFeature(feature) {
        // Validate input feature
        if (!feature || !Object.values(features_enum_1.Feature).includes(feature)) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Attempted to apply invalid feature value: ${feature}`, "warn");
            return false;
        }
        // Check if already applied
        if (this.appliedFeatures.has(feature)) {
            this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, `Feature '${feature}' already applied.`, "debug");
            return false;
        }
        // Get registry from instance metadata (prototype chain)
        const registry = this[BaseDeviceFeatures.FEATURE_METADATA_KEY];
        if (registry && registry.has(feature)) {
            const methodName = registry.get(feature);
            try {
                // Execute method dynamically
                const method = this.getFeatureMethod(methodName);
                await method.call(this);
                this.appliedFeatures.add(feature); // Mark applied after success
                return true;
            }
            catch (e) {
                this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Error applying feature '${feature}': ${e.message}`, "error");
                return false;
            }
        }
        else {
            if (registry) {
                this.deps.log.silly(`[FeatureApply|${this.robotModel}|${this.duid}] Registry exists, no implementation for feature '${feature}'. Keys: ${Array.from(registry.keys()).join(", ")}`);
            }
            else {
                this.deps.log.silly(`[FeatureApply|${this.robotModel}|${this.duid}] No registry found on instance.`);
            }
            return false;
        }
    }
    /**
     * Maps dynamic feature keys (e.g. 'is...') to action keys (e.g. 'MopWash').
     * @param detectedFeature Detected Feature enum key.
     * @returns Mapped action Feature key, detected key if actionable, or null.
     */
    mapFeature(detectedFeature) {
        // Get registry from instance metadata
        const registry = this[BaseDeviceFeatures.FEATURE_METADATA_KEY];
        // Check if 'is...' key value exists as enum key
        const potentialActionName = features_enum_1.Feature[detectedFeature];
        // Find enum key for string value, excluding original key
        const mappedActionKey = Object.keys(features_enum_1.Feature).find((key) => features_enum_1.Feature[key] === potentialActionName && key !== detectedFeature);
        if (mappedActionKey) {
            const actionFeatureEnum = features_enum_1.Feature[mappedActionKey];
            // Check if mapped action has registered implementation
            if (registry && registry.has(actionFeatureEnum)) {
                this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, `Mapping dynamic feature '${detectedFeature}' to action '${actionFeatureEnum}'`, "debug");
                return actionFeatureEnum;
            }
            else {
                this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, `Dynamic feature '${detectedFeature}' mapped to '${actionFeatureEnum}', but no action registered.`, "debug");
                return null;
            }
        }
        // Check if detected feature has registered action
        if (registry && registry.has(detectedFeature)) {
            this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, `Using dynamic feature '${detectedFeature}' directly.`, "debug");
            return detectedFeature;
        }
        // No mapping or action found
        this.deps.adapter.rLog("System", this.duid, "Debug", undefined, undefined, `Dynamic feature '${detectedFeature}' detected but has no registered action or mapping.`, "debug");
        return null;
    }
    /**
     * Creates/updates ioBroker command objects from this.commands.
     */
    async createCommandObjects() {
        const folderPath = `Devices.${this.duid}.commands`;
        // Ensure folder exists before creating states
        try {
            await this.deps.ensureFolder(folderPath);
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Failed to ensure commands folder ${folderPath}: ${e.message}`, "error");
            return;
        }
        const promises = [];
        const keys = Object.keys(this.commands);
        this.deps.adapter.rLog("System", this.duid, "Info", undefined, undefined, `Starting createCommandObjects. Commands to create: ${keys.length} -> [${keys.join(", ")}]`, "info");
        for (const [command, commonCommand] of Object.entries(this.commands)) {
            // Async IIFE for parallel execution
            promises.push((async (cmd, spec) => {
                try {
                    const options = {
                        ...spec,
                        name: spec.name || this.deps.adapter.translations[cmd] || cmd, // Add name generation
                        write: true, // Writable
                    };
                    const originalType = spec.type; // Store original type
                    // Determine Role
                    if (!options.role) {
                        if (originalType === "boolean" && !options.states)
                            options.role = "button";
                        else if (originalType === "number" && options.states)
                            options.role = "value.list";
                        else if (originalType === "number")
                            options.role = "level";
                        else if (originalType === "json" && options.states)
                            options.role = "value.list";
                        else if (originalType === "json")
                            options.role = "json";
                        else
                            options.role = "state";
                    }
                    // Adjust type
                    if (originalType === "json") {
                        options.type = "string";
                    }
                    // Type validation and default
                    const validTypes = ["string", "number", "boolean", "object", "array", "mixed"];
                    if (!options.type || typeof options.type !== "string" || !validTypes.includes(options.type)) {
                        if (originalType !== "json") {
                            // Skip log if setting to string
                            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Invalid or missing type '${spec.type}' for command '${cmd}', defaulting to 'string'.`, "warn");
                        }
                        options.type = "string";
                    }
                    const path = `${folderPath}.${cmd}`;
                    // Create/Update Object
                    const existingObj = await this.deps.adapter.getObjectAsync(path);
                    if (existingObj) {
                        // Extend if common differs. Stringify is good enough for now.
                        if (JSON.stringify(existingObj.common) !== JSON.stringify(options)) {
                            this.deps.log.silly(`[${this.duid}] Extending command object ${path}`);
                            await this.deps.adapter.extendObject(path, { common: options });
                        }
                        else {
                            this.deps.log.silly(`[${this.duid}] Command object ${path} common part is up-to-date.`);
                        }
                    }
                    else {
                        this.deps.log.silly(`[${this.duid}] Ensuring command object ${path}`);
                        await this.deps.ensureState(path, options);
                    }
                    // Reset button states
                    if (options.role === "button") {
                        const currentState = await this.deps.adapter.getStateAsync(path);
                        // Reset to false if needed
                        if (!currentState || currentState.val !== false) {
                            await this.deps.adapter.setState(path, false, true);
                        }
                    }
                }
                catch (e) {
                    this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Error processing command object '${command}': ${e.message}`, "error");
                }
            })(command, commonCommand)); // Pass to IIFE
        }
        try {
            await Promise.all(promises); // Wait for all operations
            this.commandsCreated = true; // Done
        }
        catch (e) {
            // Catch Promise.all errors (rare)
            this.deps.log.error(`[${this.duid}] Critical error during parallel command object creation: ${e.message}`);
        }
    }
    // --- Helper Methods ---
    /**
     * Adds/updates command definition. Merges states to preserve specifics.
     * @param name Command name.
     * @param spec CommandSpec definition.
     */
    addCommand(name, spec) {
        if (!name || typeof name !== "string") {
            this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `addCommand: Invalid command name provided: ${name}`, "error");
            return;
        }
        try {
            // Merge states if new spec has fewer states.
            if (this.commands[name]?.states && spec.states) {
                const existingStatesJson = JSON.stringify(this.commands[name].states);
                const newStatesJson = JSON.stringify(spec.states);
                if (existingStatesJson !== newStatesJson) {
                    this.deps.log.silly(`[${this.duid}] Command '${name}' merge: Merging states.`);
                    // Merge: New states overwrite/add
                    spec.states = { ...this.commands[name].states, ...spec.states };
                }
                else {
                    // Preserve existing spec if states identical
                    spec = { ...this.commands[name], ...spec, states: this.commands[name].states };
                }
            }
            else if (this.commands[name]?.states && !spec.states) {
                // Keep existing states if new one has none
                spec.states = this.commands[name].states;
            }
            this.commands[name] = spec;
            this.deps.log.silly(`[${this.duid}] Added/Updated command '${name}'`);
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Error in addCommand for '${name}': ${e.message}`, "error");
        }
    }
    /**
     * Calls injected ensureState with correct path.
     * @param subfolder Subfolder name.
     * @param stateName State name.
     * @param commonOptions State options.
     * @param native Optional native options.
     */
    async ensureState(subfolder, stateName, commonOptions, native = {}) {
        const path = `Devices.${this.duid}.${subfolder}.${stateName}`;
        try {
            // Validate type before ensureState
            const validTypes = ["string", "number", "boolean", "object", "array", "mixed"];
            if (commonOptions.type && !validTypes.includes(commonOptions.type)) {
                this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Invalid type '${commonOptions.type}' in ensureState for ${path}, defaulting to 'string'.`, "warn");
                commonOptions.type = "string";
            }
            // Check if object exists and needs update
            const existingObj = await this.deps.adapter.getObjectAsync(path);
            if (existingObj && existingObj.common) {
                // Check if states mapping changed
                const hasStatesMappingChanged = (commonOptions.states && !existingObj.common.states) ||
                    (!commonOptions.states && existingObj.common.states) ||
                    (commonOptions.states && existingObj.common.states &&
                        JSON.stringify(commonOptions.states) !== JSON.stringify(existingObj.common.states));
                if (hasStatesMappingChanged) {
                    this.deps.log.debug(`[${this.duid}] Updating object definition for ${path} (states mapping changed)`);
                    await this.deps.adapter.extendObjectAsync(path, {
                        common: commonOptions,
                        native: native
                    });
                    return;
                }
            }
            // Standard ensure (creates if not exists)
            await this.deps.ensureState(path, commonOptions, native); // Cast after validation
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Error", undefined, undefined, `Error in ensureState for ${path}: ${e.message}`, "error");
        }
    }
    // --- Static Methods ---
    /**
     * Get registered feature class for model.
     * @param modelId Robot model identifier.
     * @returns Constructor or undefined.
     */
    static getRegisteredModelClass(modelId) {
        return modelRegistry.get(modelId);
    }
    /**
     * Get all registered model IDs.
     */
    static getRegisteredModels() {
        return Array.from(modelRegistry.keys());
    }
    /**
     * Check if static feature is defined.
     * @param feature Feature enum key.
     */
    hasStaticFeature(feature) {
        return this.config.staticFeatures.includes(feature);
    }
    hasFeature(feature) {
        return this.appliedFeatures.has(feature) || this.config.staticFeatures.includes(feature);
    }
    /**
     * Helper to safely access dynamic feature methods.
     * Encapsulates type casting for readability.
     */
    getFeatureMethod(name) {
        // Safe access using keyof assertion
        const method = this[name];
        if (typeof method === "function") {
            return method;
        }
        throw new Error(`Feature method '${name}' not found or is not a function.`);
    }
    // --- Command Parameter Interception ---
    /**
     * Allows feature handlers to provide/modify parameters for a command before sending.
     * Override this to implement logic like 'app_segment_clean' gathering segments from states.
     * @param method Command method name.
     * @param params Existing parameters passed from caller.
     */
    async getCommandParams(method, params) {
        void method;
        return params;
    }
    // --- Data Update Methods (Unified Data Handling) ---
    /**
     * Fetch data and store in folder.
     * @param method API method.
     * @param params API parameters.
     * @param folder Target folder.
     * @param mapper Optional data mapper.
     */
    async requestAndProcess(method, params, folder, mapper) {
        try {
            const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, method, params);
            let resultObj;
            // Recursively unwrap single-element arrays (common in B01/Tuya responses)
            let unwrapped = result;
            while (Array.isArray(unwrapped) && unwrapped.length === 1) {
                unwrapped = unwrapped[0];
            }
            if (typeof unwrapped === "object" && unwrapped !== null && !Array.isArray(unwrapped)) {
                resultObj = unwrapped;
            }
            if (resultObj) {
                // Apply mapper
                if (mapper) {
                    resultObj = mapper(resultObj);
                }
                await this.deps.ensureFolder(`Devices.${this.duid}.${folder}`);
                for (const key in resultObj) {
                    let val = resultObj[key];
                    // Determine common options (type, role, unit)
                    const common = this.getCommonDeviceStates(key) || { name: key, type: typeof val, read: true, write: false };
                    // Handle Objects/Arrays by stringifying them so they don't crash the state
                    if (typeof val === "object" && val !== null) {
                        val = JSON.stringify(val);
                    }
                    // Formatting for specific keys (e.g. timestamps)
                    if (key === "last_clean_t" && typeof resultObj[key] === "number") {
                        val = new Date(resultObj[key] * 1000).toString();
                    }
                    // Enforce type matching to keep the log clean
                    if (common.type === "string" && typeof val !== "string") {
                        val = String(val);
                    }
                    else if (common.type === "number" && typeof val !== "number") {
                        val = Number(val);
                    }
                    else if (common.type === "boolean" && typeof val !== "boolean") {
                        val = !!val;
                    }
                    await this.deps.ensureState(`Devices.${this.duid}.${folder}.${key}`, common);
                    await this.deps.adapter.setStateChangedAsync(`Devices.${this.duid}.${folder}.${key}`, { val: val, ack: true });
                }
            }
        }
        catch (e) {
            this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update ${folder} (method: ${method}): ${e.message}`, "warn");
        }
    }
    async updateStatus() {
        // Default for vacuums
        await this.requestAndProcess("get_prop", ["get_status"], "deviceStatus");
    }
    async updateConsumables() {
        if (!this.hasFeature(features_enum_1.Feature.Consumables))
            return;
        await this.requestAndProcess("get_consumable", [], "consumables");
    }
    async updateNetworkInfo() {
        if (!this.hasFeature(features_enum_1.Feature.NetworkInfo))
            return;
        await this.requestAndProcess("get_network_info", [], "networkInfo");
    }
    async updateTimers() {
        if (!this.hasFeature(features_enum_1.Feature.Timers))
            return;
        await this.requestAndProcess("get_timer", [], "timers");
        await this.requestAndProcess("get_server_timer", [], "timers");
    }
    async updateFirmwareFeatures() {
        if (!this.hasFeature(features_enum_1.Feature.FirmwareInfo))
            return;
        await this.requestAndProcess("get_fw_features", [], "firmwareFeatures");
    }
    async updateMultiMapsList() {
        if (!this.hasFeature(features_enum_1.Feature.MultiMap))
            return;
        await this.requestAndProcess("get_multi_maps_list", [], "map");
    }
    async updateRoomMapping() {
        if (!this.hasFeature(features_enum_1.Feature.RoomMapping))
            return;
        await this.requestAndProcess("get_room_mapping", [], "map");
    }
    // Complex updates (override in subclasses)
    async updateCleanSummary() {
        // Default: no-op
    }
    async updateMap() {
        // Default: no-op
    }
    async updateExtraStatus() {
        // Default: no-op. Override for model-specifics.
    }
    async getPhoto(imgId, type) {
        void imgId;
        void type;
        throw new Error("getPhoto not implemented for this device");
    }
}
exports.BaseDeviceFeatures = BaseDeviceFeatures;
//# sourceMappingURL=baseDeviceFeatures.js.map