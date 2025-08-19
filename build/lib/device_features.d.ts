import { Roborock } from "../main";
export declare class device_features {
    adapter: Roborock;
    cleaningInfo: Record<string, any>;
    cleaningRecords: Record<string, any>;
    constructor(adapter: Roborock);
    getCommonCommand(command: any): any;
    /**
     * @param {string | number} attribute
     */
    getCommonDeviceStates(attribute: any): any;
    /**
     * @param {string | number} attribute
     */
    getCommonCleaningRecords(attribute: any): any;
    /**
     * @param {string | number} attribute
     */
    getCommonCleaningInfo(attribute: any): any;
    /**
     * @param {string} consumable
     */
    isResetableConsumable(consumable: any): boolean;
    isWashThenChargeCmdSupported(): void;
    isDustCollectionSettingSupported(): void;
    isSupportedDrying(): void;
    isSupportedWaterMode(): void;
    isShakeMopSetSupported(): void;
    isElectronicWaterBoxSupported(): void;
    isCarpetSupported(): void;
    isCleanRouteFastModeSupported(): void;
    isAvoidCollisionSupported(): void;
    isCornerCleanModeSupported(): void;
    isCameraSupported(): void;
    isVideoLiveCallSupported(duid: any): void;
    isVoiceControlSupported(): void;
    isSupportSetSwitchMapMode(): void;
    isMopForbiddenSupported(): void;
    isShakeMopStrengthSupported(): void;
    isWaterBoxSupported(): void;
    isCustomWaterBoxDistanceSupported(duid: any): void;
    isBackChargeAutoWashSupported(): void;
    isAvoidCarpetSupported(): void;
    isSupportFDSEndPoint(): void;
    isSupportAutoSplitSegments(): void;
    isSupportOrderSegmentClean(): void;
    isMapSegmentSupported(): void;
    isSupportLedStatusSwitch(): void;
    isMultiFloorSupported(duid: any): void;
    isSupportFetchTimerSummary(): void;
    isOrderCleanSupported(): void;
    isRemoteSupported(): void;
    getFeatureList(duid: any): {
        isWashThenChargeCmdSupported: number;
        isDustCollectionSettingSupported: boolean;
        isSupportedDrying: number;
        isShakeMopSetSupported: boolean;
        isVideoMonitorSupported: boolean;
        isVideoSettingSupported: boolean;
        isCarpetSupported: boolean;
        isPhotoUploadSupported: boolean;
        isAvoidCollisionSupported: boolean;
        isCornerCleanModeSupported: boolean;
        isCameraSupported: boolean;
        isSupportSetSwitchMapMode: boolean;
        isMopForbiddenSupported: boolean;
        isShakeMopStrengthSupported: boolean;
        isWaterBoxSupported: boolean;
        isCustomWaterBoxDistanceSupported: boolean;
        isBackChargeAutoWashSupported: any;
        isAvoidCarpetSupported: boolean;
        isVoiceControlSupported: string[];
        isElectronicWaterBoxSupported: boolean;
        isCleanRouteFastModeSupported: any;
        isVideoLiveCallSupported: boolean;
    };
    /**
     * @param {string | number} attribute
     */
    getCommonConsumable(attribute: any): any;
    processSupportedFeatures(duid: any): Promise<void>;
    processDockType(dockType: any): void;
    getFirmwareFeature(featureID: any): any;
}
