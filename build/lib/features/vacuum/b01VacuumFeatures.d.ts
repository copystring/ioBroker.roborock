import { V1VacuumFeatures, VacuumProfile } from "./v1VacuumFeatures";
import { FeatureDependencies, DeviceModelConfig } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
export declare class B01VacuumFeatures extends V1VacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string, robotModel: string, config: DeviceModelConfig, profile?: VacuumProfile);
    setupProtocolFeatures(): Promise<void>;
    /**
     * Allows feature handlers to provide/modify parameters for a command before sending.
     * B01 uses this to map individual command states to prop.set or service calls.
     */
    getCommandParams(method: string, params?: unknown): Promise<any>;
    initializeDeviceData(): Promise<void>;
    updateStatus(): Promise<void>;
    updateConsumables(data?: any): Promise<void>;
    protected processStatus(resultObj: Record<string, any>): Promise<void>;
    updateMap(): Promise<void>;
    updateCleanSummary(): Promise<void>;
    protected getCleaningRecordMap(startTime: number, recordDetails?: any): Promise<{
        mapBase64CleanUncropped: string;
        mapBase64: string;
        mapBase64Truncated: string;
        mapData: string;
    } | null>;
    protected processCleanSummary(result: any): Promise<void>;
    private updateSummaryState;
    private extractStartTime;
    private processRecordAttributes;
    detectAndApplyRuntimeFeatures(statusData: Readonly<Record<string, any>>): Promise<boolean>;
    protected getDynamicFeatures(): Set<Feature>;
    processDockType(dockType: number): Promise<void>;
    getCommonDeviceStates(attribute: string | number): {
        states?: Record<any, any>;
        unit?: string;
        type?: ioBroker.CommonType | undefined;
    } | undefined;
    updateNetworkInfo(): Promise<void>;
}
