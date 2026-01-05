import { MapManager } from "../../map/MapManager";
import { BaseDeviceFeatures, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
export declare class B01VacuumFeatures extends BaseDeviceFeatures {
    protected mapManager: MapManager;
    protected mappedRooms: unknown[] | null;
    constructor(dependencies: FeatureDependencies, duid: string, robotModel: string, config: DeviceModelConfig, profile?: unknown);
    setupProtocolFeatures(): Promise<void>;
    /**
     * Allows feature handlers to provide/modify parameters for a command before sending.
     * B01 uses this to map individual command states to prop.set or service calls.
     */
    getCommandParams(method: string, params?: unknown): Promise<unknown>;
    initializeDeviceData(): Promise<void>;
    updateRoomMapping(): Promise<void>;
    updateStatus(): Promise<void>;
    updateConsumables(data?: unknown): Promise<void>;
    protected processStatus(resultObj: Record<string, unknown>): Promise<void>;
    updateMap(): Promise<void>;
    updateCleanSummary(): Promise<void>;
    getCleaningRecordMap(startTime: number, recordDetails?: unknown): Promise<{
        mapBase64CleanUncropped: string;
        mapBase64: string;
        mapBase64Truncated: string;
        mapData: string;
    } | null>;
    protected processCleanSummary(result: unknown): Promise<void>;
    private updateSummaryState;
    private extractStartTime;
    private processRecordAttributes;
    detectAndApplyRuntimeFeatures(statusData: Readonly<Record<string, unknown>>): Promise<boolean>;
    protected getDynamicFeatures(): Set<Feature>;
    processDockType(dockType: number): Promise<void>;
    getCommonDeviceStates(attribute: string | number): {
        states?: Record<any, any>;
        unit?: string;
        type?: ioBroker.CommonType | undefined;
    } | undefined;
    updateNetworkInfo(): Promise<void>;
    protected processConsumables(resultObj: Record<string, unknown>): Promise<void>;
    private processNetworkInfo;
    protected updateDockingStationStatus(dss: number): Promise<void>;
    protected static readonly MAPPED_CLEAN_SUMMARY: Record<string, string>;
    getCommonConsumable(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    isResetableConsumable(consumable: string): boolean;
    getCommonCleaningInfo(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    getCommonCleaningRecords(attribute: string | number): Partial<ioBroker.StateCommon> | undefined;
    getFirmwareFeatureName(featureID: string | number): string;
}
