import type { Roborock } from "../../main";
import { Feature } from "./features.enum";
import { z } from "zod";
/**
 * Specification for defining a command object's properties.
 */
export type CommandSpec = {
    type: ioBroker.CommonType | "json";
    def?: any;
    states?: Record<string | number, string>;
    min?: number;
    max?: number;
    unit?: string;
    role?: string;
};
/**
 * Type for a function that implements a specific feature.
 * It's called with the correct 'this' context bound.
 */
export type FeatureImplementation = () => Promise<void> | void;
/**
 * Configuration provided by a specific model class.
 */
export interface DeviceModelConfig {
    staticFeatures: Feature[];
}
/**
 * Type for the constructor signature of a device feature class.
 */
export type FeatureClassConstructor = new (_dependencies: FeatureDependencies, _duid: string) => BaseDeviceFeatures;
/**
 * Interface defining the dependencies injected into feature classes.
 */
export interface FeatureDependencies {
    adapter: Roborock;
    config: Roborock["config"];
    http_api: Roborock["http_api"];
    ensureState: Roborock["ensureState"];
    ensureFolder: Roborock["ensureFolder"];
    log: Roborock["log"];
}
/**
 * Class decorator to register a feature class for a specific robot model ID.
 * @param robotModelId The unique model identifier string (e.g., 'roborock.vacuum.a70').
 */
export declare function RegisterModel(robotModelId: string): (constructor: FeatureClassConstructor) => void;
/**
 * Base Zod schema for validating generic status properties potentially common to all devices.
 */
export declare const BaseStatusSchema: z.ZodObject<{
    error_code: z.ZodOptional<z.ZodNumber>;
}, z.core.$loose>;
/**
 * Abstract base class for handling device features.
 * Provides core logic for initialization, feature application, command object creation,
 * and dependency injection. Must be extended by device-type-specific base classes
 * (e.g., BaseVacuumFeatures).
 */
export declare abstract class BaseDeviceFeatures {
    protected deps: FeatureDependencies;
    commands: Record<string, CommandSpec | any>;
    protected duid: string;
    protected robotModel: string;
    protected config: DeviceModelConfig;
    protected appliedFeatures: Set<Feature>;
    protected runtimeDetectionComplete: boolean;
    protected commandsCreated: boolean;
    protected static readonly CONSTANTS: {
        baseCommands: {};
        errorCodes: {
            0: string;
            255: string;
            "-1": string;
        };
    };
    static readonly FEATURE_METADATA_KEY: unique symbol;
    /**
     * Decorator to register a method as a handler for a specific feature.
     * @param feature The Feature enum key.
     */
    static DeviceFeature(feature: Feature): (target: any, propertyKey: string) => void;
    /**
     * Constructor for the base feature handler.
     * @param dependencies Injected dependencies (adapter, config, APIs, helpers).
     * @param duid The device unique identifier.
     * @param robotModel The robot model string.
     * @param config Configuration containing static features for this model.
     */
    constructor(dependencies: FeatureDependencies, duid: string, robotModel: string, config: DeviceModelConfig);
    /**
     * Must be implemented by the concrete device-type base class to detect features
     * based on device-specific mechanisms (e.g., bitfields, firmware info).
     * @returns A Set containing the detected `Feature` enum keys (usually the 'is...' keys).
     */
    protected abstract getDynamicFeatures(): Set<Feature>;
    /**
     * Processes features related to the detected dock type.
     * Can be overridden by concrete base or specific model classes if needed.
     * @param dockType The numeric dock type identifier.
     */
    processDockType(dockType: number): Promise<void>;
    /**
     * Applies features defined statically in the `DeviceModelConfig`.
     * Can be overridden by specific model classes to add more complex model-specific logic
     * that runs *before* runtime detection.
     * @param _statusData Optional initial status data. Unused in base, but available for overrides.
     * @param _fwFeatures Optional initial firmware features data. Unused in base, but available for overrides.
     */
    applyModelSpecifics(): Promise<void>;
    /**
     * Must be implemented by the concrete device-type base class to perform
     * runtime feature detection based on validated status data.
     * @param statusData Validated status data object.
     * @param fwFeatures Optional firmware features data.
     * @returns `true` if features/commands were added or modified, `false` otherwise.
     */
    abstract detectAndApplyRuntimeFeatures(_statusData: Readonly<Record<string, any>>): Promise<boolean>;
    /**
     * Initializes all features for the device instance according to the defined flow:
     * Model Specifics -> Runtime Detection -> Dock Processing -> Command Object Creation.
     * @param initialStatus Optional initial status data to use for detection.
     * @param initialFwFeatures Optional initial firmware features data.
     */
    initialize(): Promise<void>;
    /**
     * Logs a consolidated summary of applied features and created commands.
     * Should be called explicitly after initialization is complete.
     */
    printSummary(): void;
    /**
     * Applies a single feature by looking up and executing its implementation from the registry.
     * Ensures a feature is applied only once per instance.
     * @param feature The Feature enum key to apply.
     * @returns `true` if the feature was successfully applied now, `false` otherwise.
     */
    protected applyFeature(feature: Feature): Promise<boolean>;
    /**
     * Helper to map a dynamically detected feature key (e.g., from bitfield/fw, often starting with 'is...')
     * to the corresponding primary action Feature key (e.g., 'MopWash') if a mapping exists and is registered.
     * @param detectedFeature The Feature enum key detected dynamically.
     * @returns The mapped action Feature enum key, the detected key itself if it's directly actionable, or null.
     */
    protected mapFeature(detectedFeature: Feature): Feature | null;
    /**
     * Creates or updates all command state objects in ioBroker based on the current `this.commands` map.
     */
    createCommandObjects(): Promise<void>;
    /**
     * Adds or updates a command definition in the instance's `commands` map.
     * Includes logic to merge `states` to prevent overwriting more specific definitions.
     * @param name The name (key) of the command.
     * @param spec The `CommandSpec` definition for the command.
     */
    protected addCommand(name: string, spec: CommandSpec | any): void;
    /**
     * Helper to call the injected `ensureState` function with the correct path format.
     * @param subfolder The subfolder within the device structure (e.g., 'info', 'commands').
     * @param stateName The name of the state.
     * @param commonOptions State common options.
     * @param native Optional native options.
     */
    protected ensureState(subfolder: string, stateName: string, commonOptions: Partial<ioBroker.StateCommon>, native?: Record<string, any>): Promise<void>;
    /**
     * Retrieves the registered feature class constructor for a given model ID.
     * @param modelId The robot model identifier string.
     * @returns The constructor if found, otherwise undefined.
     */
    static getRegisteredModelClass(modelId: string): FeatureClassConstructor | undefined;
    /**
     * Returns an array of all registered model IDs.
     */
    static getRegisteredModels(): string[];
    /**
     * Public method to check if a specific static feature is defined
     * in this model's configuration.
     * @param feature The Feature enum key to check.
     * @returns `true` if the feature is listed in staticFeatures, `false` otherwise.
     */
    hasStaticFeature(feature: Feature): boolean;
    abstract getCommonConsumable(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    abstract isResetableConsumable(consumable: string): boolean;
    abstract getCommonDeviceStates(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    abstract getCommonCleaningRecords(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    abstract getFirmwareFeatureName(featureID: string | number): string;
    abstract getCommonCleaningInfo(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
}
