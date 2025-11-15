"use strict";
// src/lib/features/features.enum.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
var Feature;
(function (Feature) {
    // --- Actions primarily adding Commands ---
    Feature["FanMaxPlus"] = "FanMaxPlus";
    Feature["SmartModeCommand"] = "SmartModeCommand";
    Feature["MopWash"] = "MopWash";
    Feature["AutoEmptyDock"] = "AutoEmptyDock";
    Feature["MopDry"] = "MopDry";
    Feature["WaterBox"] = "WaterBox";
    Feature["CleanRouteFastMode"] = "CleanRouteFastMode";
    Feature["CustomWaterBoxDistance"] = "CustomWaterBoxDistance";
    // --- Actions primarily creating States (non-command) ---
    Feature["LiveVideo"] = "LiveVideo";
    Feature["MultiFloor"] = "MultiFloor";
    // --- Static Flags (Defined by Model Class Config) ---
    Feature["Camera"] = "Camera";
    Feature["MopForbidden"] = "MopForbidden";
    Feature["AvoidCarpet"] = "AvoidCarpet";
    Feature["VoiceControl"] = "VoiceControl";
    Feature["ShakeMopStrength"] = "ShakeMopStrength";
    Feature["ElectronicWaterBox"] = "ElectronicWaterBox";
    // --- Dynamic Bitfield/Firmware Features (Keys used in _getDynamicFeatures) ---
    // These might map to Action Features above or just be flags themselves
    Feature["isWashThenChargeCmdSupported"] = "isWashThenChargeCmdSupported";
    Feature["isDustCollectionSettingSupported"] = "isDustCollectionSettingSupported";
    Feature["isSupportedDrying"] = "isSupportedDrying";
    Feature["isShakeMopSetSupported"] = "isShakeMopSetSupported";
    Feature["isVideoMonitorSupported"] = "isVideoMonitorSupported";
    Feature["isVideoSettingSupported"] = "isVideoSettingSupported";
    Feature["isCarpetSupported"] = "isCarpetSupported";
    Feature["isPhotoUploadSupported"] = "isPhotoUploadSupported";
    Feature["isAvoidCollisionSupported"] = "isAvoidCollisionSupported";
    Feature["isCornerCleanModeSupported"] = "isCornerCleanModeSupported";
    Feature["isSupportSetSwitchMapMode"] = "isSupportSetSwitchMapMode";
    Feature["isCustomWaterBoxDistanceSupported"] = "isCustomWaterBoxDistanceSupported";
    Feature["isBackChargeAutoWashSupported"] = "isBackChargeAutoWashSupported";
    Feature["isCleanRouteFastModeSupported"] = "isCleanRouteFastModeSupported";
    Feature["isVideoLiveCallSupported"] = "isVideoLiveCallSupported";
    Feature["isSupportFDSEndPoint"] = "isSupportFDSEndPoint";
    Feature["isSupportAutoSplitSegments"] = "isSupportAutoSplitSegments";
    Feature["isSupportOrderSegmentClean"] = "isSupportOrderSegmentClean";
    Feature["isMapSegmentSupported"] = "isMapSegmentSupported";
    Feature["isSupportLedStatusSwitch"] = "isSupportLedStatusSwitch";
    Feature["isMultiFloorSupported"] = "isMultiFloorSupported";
    Feature["isSupportFetchTimerSummary"] = "isSupportFetchTimerSummary";
    Feature["isOrderCleanSupported"] = "isOrderCleanSupported";
    Feature["isRemoteSupported"] = "isRemoteSupported";
    // --- Action Placeholders (if an action doesn't map 1:1 to a bitfield/fw feature) ---
    // Add more if needed, otherwise rely on mapping the is... keys above
})(Feature || (exports.Feature = Feature = {}));
//# sourceMappingURL=features.enum.js.map