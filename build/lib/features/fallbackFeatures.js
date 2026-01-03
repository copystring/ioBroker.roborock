"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackVacuumFeatures = exports.FallbackBaseFeatures = void 0;
// src/lib/features/fallback_features.ts
const baseDeviceFeatures_1 = require("./baseDeviceFeatures");
const v1VacuumFeatures_1 = require("./vacuum/v1VacuumFeatures"); // Import Vacuum-Basis
// --- Generic fallback ---
class FallbackBaseFeatures extends baseDeviceFeatures_1.BaseDeviceFeatures {
    constructor(deps, duid, robotModel) {
        super(deps, duid, robotModel, { staticFeatures: [] });
    }
    // --- Implementation of abstract methods ---
    // --- Implementation of abstract methods ---
    getDynamicFeatures() {
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, "Using fallback getDynamicFeatures. Returning empty set.", "warn");
        return new Set(); // Fallback returns no dynamic features
    }
    async processDockType(dockType) {
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Using fallback processDockType for dock type ${dockType}. No actions taken.`, "warn");
        // Fallback does nothing with dock type
    }
    async detectAndApplyRuntimeFeatures() {
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, "Using fallback detectAndApplyRuntimeFeatures. No features detected.", "warn");
        return false; // Fallback does no runtime detection
    }
    getCommonConsumable(attribute) {
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getCommonConsumable called for ${attribute}, returning undefined.`, "warn");
        return undefined;
    }
    isResetableConsumable(consumable) {
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: isResetableConsumable called for ${consumable}, returning false.`, "warn");
        return false;
    }
    getCommonDeviceStates(attribute) {
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getCommonDeviceStates called for ${attribute}, returning undefined.`, "warn");
        return undefined;
    }
    getCommonCleaningInfo(attribute) {
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getCommonCleaningInfo called for ${attribute}, returning undefined.`, "warn");
        return undefined;
    }
    getCommonCleaningRecords(attribute) {
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getCommonCleaningRecords called for ${attribute}, returning undefined.`, "warn");
        return undefined;
    }
    getFirmwareFeatureName(featureID) {
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getFirmwareFeatureName called for ${featureID}, returning default.`, "warn");
        return `FeatureID_${featureID}`; // Default fallback response
    }
}
exports.FallbackBaseFeatures = FallbackBaseFeatures;
// --- Specific Vacuum Fallback ---
// ... imports
const v1VacuumFeatures_2 = require("./vacuum/v1VacuumFeatures");
// ...
class FallbackVacuumFeatures extends v1VacuumFeatures_1.V1VacuumFeatures {
    constructor(deps, duid, robotModel, profile = v1VacuumFeatures_2.DEFAULT_PROFILE) {
        super(deps, duid, robotModel, { staticFeatures: [] }, profile);
        this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Using FallbackVacuumFeatures for model ${robotModel}. Runtime detection and base vacuum features active.`, "warn");
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