"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDeviceFeatures = exports.BaseStatusSchema = void 0;
exports.RegisterModel = RegisterModel;
const features_enum_1 = require("./features.enum");
const zod_1 = require("zod"); // Import Zod
// --- Registry & Decorator ---
/** Central registry mapping robotModelId strings to feature class constructors. */
const modelRegistry = new Map();
/**
 * Class decorator to register a feature class for a specific robot model ID.
 * @param robotModelId The unique model identifier string (e.g., 'roborock.vacuum.a70').
 */
function RegisterModel(robotModelId) {
    return function (constructor) {
        if (modelRegistry.has(robotModelId)) {
            // Use console during the initial script load phase
            console.warn(`[Roborock Features] Model ${robotModelId} is already registered. Overwriting.`);
        }
        console.log(`[Roborock Features] Registering model: ${robotModelId}`);
        modelRegistry.set(robotModelId, constructor);
    };
}
// --- Zod Schemas (Base) ---
/**
 * Base Zod schema for validating generic status properties potentially common to all devices.
 */
exports.BaseStatusSchema = zod_1.z
    .object({
    error_code: zod_1.z.number().int().optional(), // Example: error code might be generic
    // Add other truly generic status fields if applicable
})
    .passthrough(); // Allow fields not defined in this schema
// --- Generic Base Class ---
/**
 * Abstract base class for handling device features.
 * Provides core logic for initialization, feature application, command object creation,
 * and dependency injection. Must be extended by device-type-specific base classes
 * (e.g., BaseVacuumFeatures).
 */
class BaseDeviceFeatures {
    deps;
    commands; // Holds the command definitions for this device instance
    duid;
    robotModel;
    config; // Static feature configuration from the specific model class
    appliedFeatures = new Set(); // Tracks features already applied to this instance
    runtimeDetectionComplete = false; // Flag: Initial runtime detection ran
    commandsCreated = false; // Flag: Command objects created for ioBroker
    // --- Constants (Only absolutely generic ones) ---
    static CONSTANTS = {
        // Define constants universally applicable across all potential Roborock device types
        baseCommands: {},
        // Generic error codes (subset)
        errorCodes: {
            0: "No error",
            255: "Internal error",
            "-1": "Unknown Error",
            // Add more if truly generic across all device types
        },
    };
    // --- Feature Registry (Static) ---
    static featureRegistry = new Map();
    static registryInitialized = false; // Ensures registration logic runs only once
    /**
     * Constructor for the base feature handler.
     * @param dependencies Injected dependencies (adapter, config, APIs, helpers).
     * @param duid The device unique identifier.
     * @param robotModel The robot model string.
     * @param config Configuration containing static features for this model.
     */
    constructor(dependencies, duid, robotModel, config) {
        this.deps = dependencies;
        this.duid = duid;
        this.robotModel = robotModel;
        this.config = config;
        // Start with generic base commands defined in this base class
        this.commands = JSON.parse(JSON.stringify(BaseDeviceFeatures.CONSTANTS.baseCommands));
        // The registry is initialized only once, triggered by the first instance
        // of a *concrete* base class (like BaseVacuumFeatures) calling its `registerFeatures`.
        if (!BaseDeviceFeatures.registryInitialized) {
            // The flag is set here, but the actual registration happens in the concrete base class.
            BaseDeviceFeatures.registryInitialized = true;
            this.deps.log.debug("Feature registry initialization flag set.");
        }
    }
    /**
     * Processes features related to the detected dock type.
     * Can be overridden by concrete base or specific model classes if needed.
     * @param dockType The numeric dock type identifier.
     */
    async processDockType(dockType) {
        this.deps.log.silly(`[${this.duid}] Base processDockType called for type ${dockType}. No default actions defined.`);
        // Default (base) implementation does nothing. Should be implemented in concrete base (e.g., BaseVacuumFeatures).
    }
    /**
     * Applies features defined statically in the `DeviceModelConfig`.
     * Can be overridden by specific model classes to add more complex model-specific logic
     * that runs *before* runtime detection.
     * @param statusData Optional initial status data.
     * @param fwFeatures Optional initial firmware features data.
     */
    async applyModelSpecifics(statusData, fwFeatures) {
        this.deps.log.debug(`[FeatureApply|${this.robotModel}|${this.duid}] Applying model specifics (Static Features)...`);
        const promises = this.config.staticFeatures.map((feature) => this.applyFeature(feature));
        await Promise.all(promises);
        this.deps.log.debug(`[FeatureApply|${this.robotModel}|${this.duid}] Finished applying model specifics.`);
    }
    // --- Core Initialization Logic ---
    /**
     * Initializes all features for the device instance according to the defined flow:
     * Model Specifics -> Runtime Detection -> Dock Processing -> Command Object Creation.
     * @param initialStatus Optional initial status data to use for detection.
     * @param initialFwFeatures Optional initial firmware features data.
     */
    async initialize(initialStatus, initialFwFeatures) {
        this.deps.log.info(`[FeatureInit|${this.robotModel}|${this.duid}] Starting feature initialization...`);
        // Ensure registry is filled by the concrete base class implementation (runs only once).
        // This relies on the constructor setting the flag and the first instance calling registerFeatures.
        if (BaseDeviceFeatures.featureRegistry.size === 0 && BaseDeviceFeatures.registryInitialized) {
            // If the flag is set but registry is empty, the concrete implementation is missing the call.
            this.deps.log.warn(`[FeatureInit|${this.robotModel}|${this.duid}] Registry initialization flag was set, but registry is empty. Ensure 'registerFeatures' is called in the constructor or initializer of the concrete base class (e.g., BaseVacuumFeatures).`);
            // Attempt to call it here as a fallback, but it should ideally happen earlier.
            try {
                this.registerFeatures(); // Call the *concrete* implementation now
                if (BaseDeviceFeatures.featureRegistry.size > 0) {
                    this.deps.log.info(`Feature registry initialized late via initialize(). Size: ${BaseDeviceFeatures.featureRegistry.size}`);
                }
                else {
                    this.deps.log.error(`[FeatureInit|${this.robotModel}|${this.duid}] Failed to initialize feature registry even after explicit call!`);
                    return; // Abort initialization if registry fails
                }
            }
            catch (e) {
                this.deps.log.error(`[FeatureInit|${this.robotModel}|${this.duid}] Error calling registerFeatures: ${e.message} ${e.stack}`);
                return; // Abort
            }
        }
        else if (BaseDeviceFeatures.featureRegistry.size === 0 && !BaseDeviceFeatures.registryInitialized) {
            // Should not happen if constructor sets the flag correctly.
            this.deps.log.error(`[FeatureInit|${this.robotModel}|${this.duid}] Registry initialization logic error: Flag not set and registry empty.`);
            return; // Abort
        }
        // Flow: Basis -> Typ -> Spezifisch -> Laufzeit -> Dock
        // 1. Apply Model Specifics (Static Flags + Model Class Overrides/Additions)
        try {
            await this.applyModelSpecifics(initialStatus, initialFwFeatures);
        }
        catch (e) {
            this.deps.log.error(`[FeatureInit|${this.robotModel}|${this.duid}] Error applying model specifics: ${e.message} ${e.stack}`);
        }
        // 2. Runtime Detection (implemented by concrete base like BaseVacuumFeatures)
        let commandsChangedByRuntime = false;
        if (initialStatus) {
            try {
                commandsChangedByRuntime = await this.detectAndApplyRuntimeFeatures(initialStatus, initialFwFeatures);
                this.runtimeDetectionComplete = true; // Mark initial detection attempt as done
            }
            catch (e) {
                this.deps.log.error(`[FeatureInit|${this.robotModel}|${this.duid}] Error during runtime feature detection: ${e.message} ${e.stack}`);
            }
        }
        else {
            this.deps.log.warn(`[FeatureInit|${this.robotModel}|${this.duid}] Initial status data missing, skipping runtime feature detection.`);
        }
        // 3. Process Dock Type (implementation from concrete base or model class)
        if (initialStatus?.dock_type !== undefined) {
            try {
                await this.processDockType(initialStatus.dock_type);
            }
            catch (e) {
                this.deps.log.error(`[FeatureInit|${this.robotModel}|${this.duid}] Error processing dock type ${initialStatus.dock_type}: ${e.message} ${e.stack}`);
            }
        }
        else {
            this.deps.log.debug(`[FeatureInit|${this.robotModel}|${this.duid}] Initial dock_type missing.`);
        }
        // 4. Create/Update ioBroker Objects for Commands
        try {
            await this.createCommandObjects();
        }
        catch (e) {
            this.deps.log.error(`[FeatureInit|${this.robotModel}|${this.duid}] Error creating command objects: ${e.message} ${e.stack}`);
        }
        this.deps.log.info(`[FeatureInit|${this.robotModel}|${this.duid}] Initialization complete.`);
    }
    // --- Core Helper Methods ---
    /**
     * Applies a single feature by looking up and executing its implementation from the registry.
     * Ensures a feature is applied only once per instance.
     * @param feature The Feature enum key to apply.
     * @returns `true` if the feature was successfully applied now, `false` otherwise.
     */
    async applyFeature(feature) {
        // Basic validation of the input feature enum value
        if (!feature || !Object.values(features_enum_1.Feature).includes(feature)) {
            this.deps.log.warn(`[${this.duid}] Attempted to apply invalid feature value: ${feature}`);
            return false;
        }
        // Check if already applied
        if (this.appliedFeatures.has(feature)) {
            this.deps.log.silly(`[${this.duid}] Feature '${feature}' already applied.`);
            return false;
        }
        const implementation = BaseDeviceFeatures.featureRegistry.get(feature);
        if (implementation) {
            this.deps.log.debug(`[FeatureApply|${this.robotModel}|${this.duid}] Applying feature '${feature}'...`);
            try {
                // Use .call(this) to bind 'this' context and execute
                await implementation.call(this);
                this.appliedFeatures.add(feature); // Mark as applied *after* successful execution
                this.deps.log.debug(`[FeatureApply|${this.robotModel}|${this.duid}] Successfully applied feature '${feature}'.`);
                return true;
            }
            catch (e) {
                this.deps.log.error(`[FeatureApply|${this.robotModel}|${this.duid}] Error applying feature '${feature}': ${e.message} ${e.stack}`);
                return false; // Application failed
            }
        }
        else {
            this.deps.log.warn(`[FeatureApply|${this.robotModel}|${this.duid}] No implementation registered for feature '${feature}'.`);
            return false; // No implementation found
        }
    }
    /**
     * Helper to map a dynamically detected feature key (e.g., from bitfield/fw, often starting with 'is...')
     * to the corresponding primary action Feature key (e.g., 'MopWash') if a mapping exists and is registered.
     * @param detectedFeature The Feature enum key detected dynamically.
     * @returns The mapped action Feature enum key, the detected key itself if it's directly actionable, or null.
     */
    mapFeature(detectedFeature) {
        // Try direct mapping: Check if the value of the 'is...' key (e.g., 'MopWash') exists as an enum key
        const potentialActionName = features_enum_1.Feature[detectedFeature]; // Get string value (e.g., 'MopWash')
        // Find the enum key that corresponds to this string value, EXCLUDING the original detected key itself
        const mappedActionKey = Object.keys(features_enum_1.Feature).find((key) => features_enum_1.Feature[key] === potentialActionName && key !== detectedFeature);
        if (mappedActionKey) {
            const actionFeatureEnum = features_enum_1.Feature[mappedActionKey]; // Get the actual enum value (like Feature.MopWash)
            // Check if this mapped action feature *has an implementation registered*
            if (BaseDeviceFeatures.featureRegistry.has(actionFeatureEnum)) {
                this.deps.log.silly(`[${this.duid}] Mapping dynamic feature '${detectedFeature}' to action '${actionFeatureEnum}'`);
                return actionFeatureEnum;
            }
            else {
                this.deps.log.silly(`[${this.duid}] Dynamic feature '${detectedFeature}' mapped to '${actionFeatureEnum}', but no action is registered for it.`);
                return null; // Mapped but no action
            }
        }
        // If no mapping, check if the detected feature key itself has a registered action
        if (BaseDeviceFeatures.featureRegistry.has(detectedFeature)) {
            this.deps.log.silly(`[${this.duid}] Using dynamic feature '${detectedFeature}' directly as it has a registered action.`);
            return detectedFeature;
        }
        // If neither mapping nor direct action found, it's likely just a flag or unhandled
        this.deps.log.silly(`[${this.duid}] Dynamic feature '${detectedFeature}' detected but has no registered action or mapping.`);
        return null;
    }
    /**
     * Creates or updates all command state objects in ioBroker based on the current `this.commands` map.
     */
    async createCommandObjects() {
        const folderPath = `Devices.${this.duid}.commands`;
        // Ensure folder exists *before* creating states in parallel
        try {
            await this.deps.ensureFolder(folderPath);
        }
        catch (e) {
            this.deps.log.error(`[${this.duid}] Failed to ensure commands folder ${folderPath}: ${e.message}`);
            return; // Abort if folder cannot be ensured
        }
        this.deps.log.debug(`[${this.duid}] Creating/Updating ${Object.keys(this.commands).length} command objects...`);
        const promises = [];
        for (const [command, commonCommand] of Object.entries(this.commands)) {
            // Use an async IIFE (Immediately Invoked Function Expression) for safe parallel execution within the loop
            promises.push((async (cmd, spec) => {
                try {
                    const options = {
                        ...spec,
                        name: spec.name || this.deps.adapter.translations[cmd] || cmd, // Add name generation/translation
                        write: true, // Commands must be writable
                    };
                    const originalType = spec.type; // Store original type ('json' etc.)
                    // Determine Role if not explicitly set in spec
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
                    // Adjust type for ioBroker
                    if (originalType === "json") {
                        options.type = "string";
                    }
                    // Final type validation and default
                    const validTypes = ["string", "number", "boolean", "object", "array", "mixed"];
                    if (!options.type || typeof options.type !== "string" || !validTypes.includes(options.type)) {
                        if (originalType !== "json") {
                            // Avoid redundant log if we just set it to string
                            this.deps.log.warn(`[${this.duid}] Invalid or missing type '${spec.type}' for command '${cmd}', defaulting to 'string'.`);
                        }
                        options.type = "string";
                    }
                    const path = `${folderPath}.${cmd}`;
                    // Create or Update Object
                    const existingObj = await this.deps.adapter.getObjectAsync(path);
                    if (existingObj) {
                        // Only extend if common differs significantly (simple stringify might be too sensitive)
                        // A more robust check might compare key properties individually. For now, stringify is pragmatic.
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
                    // Reset button states after ensuring object exists/is updated
                    if (options.role === "button") {
                        const currentState = await this.deps.adapter.getStateAsync(path);
                        // Set to false only if not already false or if state doesn't exist yet
                        if (!currentState || currentState.val !== false) {
                            await this.deps.adapter.setState(path, false, true);
                        }
                    }
                }
                catch (e) {
                    this.deps.log.error(`[${this.duid}] Error processing command object '${command}': ${e.message}`);
                    // Optional: Log stack trace for more details: this.deps.log.error(e.stack);
                }
            })(command, commonCommand)); // Pass command and spec to IIFE
        } // End for loop
        try {
            await Promise.all(promises); // Wait for all command object operations
            this.commandsCreated = true; // Mark as done for this run
            this.deps.log.debug(`[${this.duid}] Command object creation/update finished.`);
        }
        catch (e) {
            // Errors inside the IIFEs are caught individually, this catches errors from Promise.all itself (rare)
            this.deps.log.error(`[${this.duid}] Critical error during parallel command object creation: ${e.message}`);
        }
    }
    // --- Helper Methods ---
    /**
     * Adds or updates a command definition in the instance's `commands` map.
     * Includes logic to merge `states` to prevent overwriting more specific definitions.
     * @param name The name (key) of the command.
     * @param spec The `CommandSpec` definition for the command.
     */
    _addCommand(name, spec) {
        if (!name || typeof name !== "string") {
            this.deps.log.error(`[${this.duid}] _addCommand: Invalid command name provided: ${name}`);
            return;
        }
        try {
            // Merge states logic: If new spec has fewer states than existing, merge them preserving existing ones.
            if (this.commands[name]?.states && spec.states) {
                const existingStatesJson = JSON.stringify(this.commands[name].states);
                const newStatesJson = JSON.stringify(spec.states);
                if (existingStatesJson !== newStatesJson) {
                    this.deps.log.silly(`[${this.duid}] Command '${name}' merge: Merging states.`);
                    // Merge: New states overwrite/add to existing ones
                    spec.states = { ...this.commands[name].states, ...spec.states };
                }
                else {
                    // If states are identical, ensure the rest of the existing spec isn't lost if the new one is simpler
                    spec = { ...this.commands[name], ...spec, states: this.commands[name].states };
                }
            }
            else if (this.commands[name]?.states && !spec.states) {
                // If existing had states but new one doesn't, keep existing states
                spec.states = this.commands[name].states;
            }
            this.commands[name] = spec;
            this.deps.log.silly(`[${this.duid}] Added/Updated command '${name}'`);
        }
        catch (e) {
            this.deps.log.error(`[${this.duid}] Error in _addCommand for '${name}': ${e.message}`);
        }
    }
    /**
     * Helper to call the injected `ensureState` function with the correct path format.
     * @param subfolder The subfolder within the device structure (e.g., 'info', 'commands').
     * @param stateName The name of the state.
     * @param commonOptions State common options.
     * @param native Optional native options.
     */
    async _ensureState(subfolder, stateName, commonOptions, native = {}) {
        const path = `Devices.${this.duid}.${subfolder}.${stateName}`;
        try {
            // Ensure type is valid before calling ensureState
            const validTypes = ["string", "number", "boolean", "object", "array", "mixed"];
            if (commonOptions.type && !validTypes.includes(commonOptions.type)) {
                this.deps.log.warn(`[${this.duid}] Invalid type '${commonOptions.type}' in _ensureState for ${path}, defaulting to 'string'.`);
                commonOptions.type = "string";
            }
            await this.deps.ensureState(path, commonOptions, native); // Cast after validation
        }
        catch (e) {
            this.deps.log.error(`[${this.duid}] Error in _ensureState for ${path}: ${e.message}`);
        }
    }
    // --- Static Methods ---
    /**
     * Retrieves the registered feature class constructor for a given model ID.
     * @param modelId The robot model identifier string.
     * @returns The constructor if found, otherwise undefined.
     */
    static getRegisteredModelClass(modelId) {
        return modelRegistry.get(modelId);
    }
    /**
     * Public method to check if a specific static feature is defined
     * in this model's configuration.
     * @param feature The Feature enum key to check.
     * @returns `true` if the feature is listed in staticFeatures, `false` otherwise.
     */
    hasStaticFeature(feature) {
        return this.config.staticFeatures.includes(feature);
    }
}
exports.BaseDeviceFeatures = BaseDeviceFeatures;
//# sourceMappingURL=baseDeviceFeatures.js.map