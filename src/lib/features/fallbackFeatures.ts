// src/lib/features/fallback_features.ts
import { BaseDeviceFeatures, FeatureDependencies } from "./baseDeviceFeatures";
import { BaseVacuumFeatures } from "./vacuum/baseVacuumFeatures"; // Import Vacuum-Basis
import { Feature } from "./features.enum";

// --- Generic fallback ---
export class FallbackBaseFeatures extends BaseDeviceFeatures {
	constructor(deps: FeatureDependencies, duid: string, robotModel: string) {
		super(deps, duid, robotModel, { staticFeatures: [] });
	}

	// --- Implementation of abstract methods ---
	// --- Implementation of abstract methods ---
	protected getDynamicFeatures(): Set<Feature> {
		this.deps.log.warn(`[${this.duid}] Using fallback getDynamicFeatures. Returning empty set.`);
		return new Set<Feature>(); // Fallback returns no dynamic features
	}

	public async processDockType(dockType: number): Promise<void> {
		this.deps.log.warn(`[${this.duid}] Using fallback processDockType for dock type ${dockType}. No actions taken.`);
		// Fallback does nothing with dock type
	}

	public async detectAndApplyRuntimeFeatures(): Promise<boolean> {
		this.deps.log.warn(`[${this.duid}] Using fallback detectAndApplyRuntimeFeatures. No features detected.`);
		return false; // Fallback does no runtime detection
	}

	public getCommonConsumable(attribute: string | number): { unit?: string } | undefined {
		this.deps.log.warn(`[${this.duid}] Fallback: getCommonConsumable called for ${attribute}, returning undefined.`);
		return undefined;
	}

	public isResetableConsumable(consumable: string): boolean {
		this.deps.log.warn(`[${this.duid}] Fallback: isResetableConsumable called for ${consumable}, returning false.`);
		return false;
	}

	public getCommonDeviceStates(attribute: string | number): { states?: Record<any, any>; unit?: string; type?: ioBroker.CommonType | undefined } | undefined {
		this.deps.log.warn(`[${this.duid}] Fallback: getCommonDeviceStates called for ${attribute}, returning undefined.`);
		return undefined;
	}

	public getCommonCleaningInfo(attribute: string | number): { unit?: string } | undefined {
		this.deps.log.warn(`[${this.duid}] Fallback: getCommonCleaningInfo called for ${attribute}, returning undefined.`);
		return undefined;
	}

	public getCommonCleaningRecords(attribute: string | number): { unit?: string } | undefined {
		this.deps.log.warn(`[${this.duid}] Fallback: getCommonCleaningRecords called for ${attribute}, returning undefined.`);
		return undefined;
	}

	public getFirmwareFeatureName(featureID: string | number): string {
		this.deps.log.warn(`[${this.duid}] Fallback: getFirmwareFeatureName called for ${featureID}, returning default.`);
		return `FeatureID_${featureID}`; // Default fallback response
	}
}

// --- Specific Vacuum Fallback ---
// ... imports
import { VacuumProfile, DEFAULT_PROFILE } from "./vacuum/baseVacuumFeatures";

// ...

export class FallbackVacuumFeatures extends BaseVacuumFeatures {
	constructor(deps: FeatureDependencies, duid: string, robotModel: string, profile: VacuumProfile = DEFAULT_PROFILE) {
		super(deps, duid, robotModel, { staticFeatures: [] }, profile);
		this.deps.log.warn(`[${this.duid}] Using FallbackVacuumFeatures for model ${robotModel}. Runtime detection and base vacuum features active.`);
	}
	// No overrides needed here. It inherits:
	// - registerFeatures (from BaseVacuumFeatures, registers all known vacuum feature implementations)
	// - _getDynamicFeatures (from BaseVacuumFeatures, tries to detect vacuum bitfields)
	// - detectAndApplyRuntimeFeatures (from BaseVacuumFeatures, tries runtime detection based on status)
	// - processDockType (from BaseVacuumFeatures)
	// - All the getter implementations (getCommonConsumable etc. from BaseVacuumFeatures)
}

// --- Example for future fallbacks ---
// export class FallbackWashingMachineFeatures extends BaseWashingMachineFeatures {
//     constructor(deps: FeatureDependencies, duid: string, robotModel: string) {
//         super(deps, duid, robotModel, { staticFeatures: [] });
//         this.deps.log.warn(`[${this.duid}] Using FallbackWashingMachineFeatures for model ${robotModel}.`);
//     }
//     // Implement specific fallback logic for washing machines here if needed
// }
