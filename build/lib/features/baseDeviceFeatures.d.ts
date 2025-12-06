import type { Roborock } from "../../main";
import { Feature } from "./features.enum";
import { z } from "zod";
/**
 * Command object properties.
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
 * Feature implementation function, 'this' context is bound.
 */
export type FeatureImplementation = () => Promise<void> | void;
/**
 * Model-specific configuration.
 */
export interface DeviceModelConfig {
    staticFeatures: Feature[];
}
/**
 * Feature class constructor signature.
 */
export type FeatureClassConstructor = new (_dependencies: FeatureDependencies, _duid: string) => BaseDeviceFeatures;
/**
 * Dependencies injected into feature classes.
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
 * Decorator to register a feature class for a robot model.
 * @param robotModelId Unique model identifier (e.g. 'roborock.vacuum.a70').
 */
export declare function RegisterModel(robotModelId: string): (constructor: FeatureClassConstructor) => void;
/**
 * Base Zod schema for generic status properties.
 */
export declare const BaseStatusSchema: z.ZodObject<{
    error_code: z.ZodOptional<z.ZodNumber>;
}, z.core.$loose>;
/**
 * Base class for device features. Handles init, feature application, and commands.
 * Extended by specific types (e.g. BaseVacuumFeatures).
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
     * Decorator to register a feature handler method.
     * @param feature The Feature enum key.
     */
    static DeviceFeature(feature: Feature): (target: any, propertyKey: string) => void;
    /**
     * Base feature handler constructor.
     * @param dependencies Injected dependencies.
     * @param duid Device unique identifier.
     * @param robotModel Robot model string.
     * @param config Static feature config.
     */
    constructor(dependencies: FeatureDependencies, duid: string, robotModel: string, config: DeviceModelConfig);
    /**
     * Detects features via device-specific mechanisms (bitfields, fw info).
     * Implemented by subclasses.
     * @returns Set of detected `Feature` enum keys.
     */
    protected abstract getDynamicFeatures(): Set<Feature>;
    /**
     * Handles dock type features. Override if needed.
     * @param dockType Numeric dock type identifier.
     */
    processDockType(dockType: number): Promise<void>;
    /**
     * Applies static features from config.
     * Override for pre-runtime model logic.
     * @param _statusData Optional initial status data.
     * @param _fwFeatures Optional initial firmware features.
     */
    applyModelSpecifics(): Promise<void>;
    /**
     * Performs runtime feature detection using status data.
     * Implemented by subclasses.
     * @param statusData Validated status data.
     * @param fwFeatures Optional firmware features.
     * @returns `true` if features/commands changed.
     */
    abstract detectAndApplyRuntimeFeatures(_statusData: Readonly<Record<string, any>>): Promise<boolean>;
    /**
     * Initializes features: Model Specifics -> Runtime Detection -> Dock Processing -> Command Objects.
     * @param initialStatus Optional initial status.
     * @param initialFwFeatures Optional initial firmware features.
     */
    initialize(): Promise<void>;
    /**
     * Logs summary of applied features and commands. Call after init.
     */
    printSummary(): void;
    /**
     * Applies a feature if not already applied. Looks up implementation in registry.
     * @param feature Feature enum key.
     * @returns `true` if applied now.
     */
    protected applyFeature(feature: Feature): Promise<boolean>;
    /**
     * Maps dynamic feature keys (e.g. 'is...') to action keys (e.g. 'MopWash').
     * @param detectedFeature Detected Feature enum key.
     * @returns Mapped action Feature key, detected key if actionable, or null.
     */
    protected mapFeature(detectedFeature: Feature): Feature | null;
    /**
     * Creates/updates ioBroker command objects from this.commands.
     */
    createCommandObjects(): Promise<void>;
    /**
     * Adds/updates command definition. Merges states to preserve specifics.
     * @param name Command name.
     * @param spec CommandSpec definition.
     */
    protected addCommand(name: string, spec: CommandSpec | any): void;
    /**
     * Calls injected ensureState with correct path.
     * @param subfolder Subfolder name.
     * @param stateName State name.
     * @param commonOptions State options.
     * @param native Optional native options.
     */
    protected ensureState(subfolder: string, stateName: string, commonOptions: Partial<ioBroker.StateCommon>, native?: Record<string, any>): Promise<void>;
    /**
     * Get registered feature class for model.
     * @param modelId Robot model identifier.
     * @returns Constructor or undefined.
     */
    static getRegisteredModelClass(modelId: string): FeatureClassConstructor | undefined;
    /**
     * Get all registered model IDs.
     */
    static getRegisteredModels(): string[];
    /**
     * Check if static feature is defined.
     * @param feature Feature enum key.
     */
    hasStaticFeature(feature: Feature): boolean;
    /**
     * Fetch data and store in folder.
     * @param method API method.
     * @param params API parameters.
     * @param folder Target folder.
     * @param mapper Optional data mapper.
     */
    protected requestAndProcess(method: string, params: any[], folder: string, mapper?: (data: any) => Record<string, any>): Promise<void>;
    updateStatus(): Promise<void>;
    updateConsumables(): Promise<void>;
    updateNetworkInfo(): Promise<void>;
    updateTimers(): Promise<void>;
    updateFirmwareFeatures(): Promise<void>;
    updateMultiMapsList(): Promise<void>;
    updateRoomMapping(): Promise<void>;
    updateCleanSummary(): Promise<void>;
    updateMap(): Promise<void>;
    updateExtraStatus(): Promise<void>;
    getPhoto(imgId: string, type: number): Promise<any>;
    abstract getCommonConsumable(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    abstract isResetableConsumable(consumable: string): boolean;
    abstract getCommonDeviceStates(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    abstract getCommonCleaningRecords(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    abstract getFirmwareFeatureName(featureID: string | number): string;
    abstract getCommonCleaningInfo(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
}
