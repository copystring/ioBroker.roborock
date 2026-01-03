// src/lib/features/fallback_features.ts
import { BaseDeviceFeatures, FeatureDependencies } from "./baseDeviceFeatures";
import { V1VacuumFeatures } from "./vacuum/v1VacuumFeatures"; // Import Vacuum-Basis
import { Feature } from "./features.enum";

// --- Generic fallback ---
export class FallbackBaseFeatures extends BaseDeviceFeatures {
	constructor(deps: FeatureDependencies, duid: string, robotModel: string) {
		super(deps, duid, robotModel, { staticFeatures: [] });
	}

	// --- Implementation of abstract methods ---
	// --- Implementation of abstract methods ---
	protected getDynamicFeatures(): Set<Feature> {
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, "Using fallback getDynamicFeatures. Returning empty set.", "warn");
		return new Set<Feature>(); // Fallback returns no dynamic features
	}

	public async processDockType(dockType: number): Promise<void> {
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Using fallback processDockType for dock type ${dockType}. No actions taken.`, "warn");
		// Fallback does nothing with dock type
	}

	public async detectAndApplyRuntimeFeatures(): Promise<boolean> {
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, "Using fallback detectAndApplyRuntimeFeatures. No features detected.", "warn");
		return false; // Fallback does no runtime detection
	}

	public getCommonConsumable(attribute: string | number): { unit?: string } | undefined {
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getCommonConsumable called for ${attribute}, returning undefined.`, "warn");
		return undefined;
	}

	public isResetableConsumable(consumable: string): boolean {
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: isResetableConsumable called for ${consumable}, returning false.`, "warn");
		return false;
	}

	public getCommonDeviceStates(attribute: string | number): { states?: Record<any, any>; unit?: string; type?: ioBroker.CommonType | undefined } | undefined {
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getCommonDeviceStates called for ${attribute}, returning undefined.`, "warn");
		return undefined;
	}

	public getCommonCleaningInfo(attribute: string | number): { unit?: string } | undefined {
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getCommonCleaningInfo called for ${attribute}, returning undefined.`, "warn");
		return undefined;
	}

	public getCommonCleaningRecords(attribute: string | number): { unit?: string } | undefined {
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getCommonCleaningRecords called for ${attribute}, returning undefined.`, "warn");
		return undefined;
	}

	public getFirmwareFeatureName(featureID: string | number): string {
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Fallback: getFirmwareFeatureName called for ${featureID}, returning default.`, "warn");
		return `FeatureID_${featureID}`; // Default fallback response
	}
}

// --- Specific Vacuum Fallback ---
// ... imports
import { VacuumProfile, DEFAULT_PROFILE } from "./vacuum/v1VacuumFeatures";

// ...

export class FallbackVacuumFeatures extends V1VacuumFeatures {
	constructor(deps: FeatureDependencies, duid: string, robotModel: string, profile: VacuumProfile = DEFAULT_PROFILE) {
		super(deps, duid, robotModel, { staticFeatures: [] }, profile);
		this.deps.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Using FallbackVacuumFeatures for model ${robotModel}. Runtime detection and base vacuum features active.`, "warn");
	}
	// No overrides needed here. It inherits:
	// - registerFeatures (from V1VacuumFeatures, registers all known vacuum feature implementations)
	// - _getDynamicFeatures (from V1VacuumFeatures, tries to detect vacuum bitfields)
	// - detectAndApplyRuntimeFeatures (from V1VacuumFeatures, tries runtime detection based on status)
	// - processDockType (from V1VacuumFeatures)
	// - All the getter implementations (getCommonConsumable etc. from V1VacuumFeatures)
}

// --- Example for future fallbacks ---
// export class FallbackWashingMachineFeatures extends BaseWashingMachineFeatures {
//     constructor(deps: FeatureDependencies, duid: string, robotModel: string) {
//         super(deps, duid, robotModel, { staticFeatures: [] });
//         this.deps.log.warn(`[${this.duid}] Using FallbackWashingMachineFeatures for model ${robotModel}.`);
//     }
//     // Implement specific fallback logic for washing machines here if needed
// }

