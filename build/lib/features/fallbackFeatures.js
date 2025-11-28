"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackVacuumFeatures = exports.FallbackBaseFeatures = void 0;
// src/lib/features/fallback_features.ts
const baseDeviceFeatures_1 = require("./baseDeviceFeatures");
const baseVacuumFeatures_1 = require("./vacuum/baseVacuumFeatures"); // Import Vacuum-Basis
// --- Generic fallback ---
class FallbackBaseFeatures extends baseDeviceFeatures_1.BaseDeviceFeatures {
    constructor(deps, duid, robotModel) {
        super(deps, duid, robotModel, { staticFeatures: [] });
    }
    // --- Implementation of abstract methods ---
    // --- Implementation of abstract methods ---
    getDynamicFeatures() {
        this.deps.log.warn(`[${this.duid}] Using fallback getDynamicFeatures. Returning empty set.`);
        return new Set(); // Fallback returns no dynamic features
    }
    async processDockType(dockType) {
        this.deps.log.warn(`[${this.duid}] Using fallback processDockType for dock type ${dockType}. No actions taken.`);
        // Fallback does nothing with dock type
    }
    async detectAndApplyRuntimeFeatures() {
        this.deps.log.warn(`[${this.duid}] Using fallback detectAndApplyRuntimeFeatures. No features detected.`);
        return false; // Fallback does no runtime detection
    }
    getCommonConsumable(attribute) {
        this.deps.log.warn(`[${this.duid}] Fallback: getCommonConsumable called for ${attribute}, returning undefined.`);
        return undefined;
    }
    isResetableConsumable(consumable) {
        this.deps.log.warn(`[${this.duid}] Fallback: isResetableConsumable called for ${consumable}, returning false.`);
        return false;
    }
    getCommonDeviceStates(attribute) {
        this.deps.log.warn(`[${this.duid}] Fallback: getCommonDeviceStates called for ${attribute}, returning undefined.`);
        return undefined;
    }
    getCommonCleaningInfo(attribute) {
        this.deps.log.warn(`[${this.duid}] Fallback: getCommonCleaningInfo called for ${attribute}, returning undefined.`);
        return undefined;
    }
    getCommonCleaningRecords(attribute) {
        this.deps.log.warn(`[${this.duid}] Fallback: getCommonCleaningRecords called for ${attribute}, returning undefined.`);
        return undefined;
    }
    getFirmwareFeatureName(featureID) {
        this.deps.log.warn(`[${this.duid}] Fallback: getFirmwareFeatureName called for ${featureID}, returning default.`);
        return `FeatureID_${featureID}`; // Default fallback response
    }
}
exports.FallbackBaseFeatures = FallbackBaseFeatures;
// --- Specific Vacuum Fallback ---
class FallbackVacuumFeatures extends baseVacuumFeatures_1.BaseVacuumFeatures {
    constructor(deps, duid, robotModel) {
        super(deps, duid, robotModel, { staticFeatures: [] }); // Start with no static features
        this.deps.log.warn(`[${this.duid}] Using FallbackVacuumFeatures for model ${robotModel}. Runtime detection and base vacuum features active.`);
    }
}
exports.FallbackVacuumFeatures = FallbackVacuumFeatures;
// --- Example for future fallbacks ---
// export class FallbackWashingMachineFeatures extends BaseWashingMachineFeatures {
//     constructor(deps: FeatureDependencies, duid: string, robotModel: string) {
//         super(deps, duid, robotModel, { staticFeatures: [] });
//         this.deps.log.warn(`[${this.duid}] Using FallbackWashingMachineFeatures for model ${robotModel}.`);
//     }
//     // Implement specific fallback logic for washing machines here if needed
// }
//# sourceMappingURL=fallbackFeatures.js.map