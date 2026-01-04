import { BaseDeviceFeatures, FeatureDependencies } from "./baseDeviceFeatures";
import { V1VacuumFeatures } from "./vacuum/v1VacuumFeatures";
import { Feature } from "./features.enum";
export declare class FallbackBaseFeatures extends BaseDeviceFeatures {
    constructor(deps: FeatureDependencies, duid: string, robotModel: string);
    protected getDynamicFeatures(): Set<Feature>;
    processDockType(dockType: number): Promise<void>;
    detectAndApplyRuntimeFeatures(): Promise<boolean>;
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
import { VacuumProfile } from "./vacuum/v1VacuumFeatures";
export declare class FallbackVacuumFeatures extends V1VacuumFeatures {
    constructor(deps: FeatureDependencies, duid: string, robotModel: string, profile?: VacuumProfile);
}
