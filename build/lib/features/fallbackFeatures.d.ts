import { BaseDeviceFeatures, FeatureDependencies } from "./baseDeviceFeatures";
import { BaseVacuumFeatures } from "./vacuum/baseVacuumFeatures";
import { Feature } from "./features.enum";
export declare class FallbackBaseFeatures extends BaseDeviceFeatures {
    constructor(deps: FeatureDependencies, duid: string, robotModel: string);
    protected registerFeatures(): void;
    protected _getDynamicFeatures(): Set<Feature>;
    processDockType(dockType: number): Promise<void>;
    detectAndApplyRuntimeFeatures(statusData: Record<string, any>, fwFeatures?: readonly number[]): Promise<boolean>;
    getCommonConsumable(attribute: string | number): {
        unit?: string;
    } | undefined;
    isResetableConsumable(consumable: string): boolean;
    getCommonDeviceStates(attribute: string | number): {
        states?: Record<any, any>;
        unit?: string;
        type?: ioBroker.CommonType | undefined;
    } | undefined;
    getCommonCleaningInfo(attribute: string | number): {
        unit?: string;
    } | undefined;
    getCommonCleaningRecords(attribute: string | number): {
        unit?: string;
    } | undefined;
    getFirmwareFeatureName(featureID: string | number): string;
}
export declare class FallbackVacuumFeatures extends BaseVacuumFeatures {
    constructor(deps: FeatureDependencies, duid: string, robotModel: string);
}
