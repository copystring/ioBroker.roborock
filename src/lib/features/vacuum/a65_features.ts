// src/lib/features/vacuum/a65_features.ts
// Features for Roborock S7 Max Ultra (roborock.vacuum.a65)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a65 model
const a65Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.ShakeMopStrength, // Alias for WaterBox logic
        Feature.WaterBox,
        Feature.AvoidCarpet
    ]
};

@RegisterModel('roborock.vacuum.a65')
export class A65Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a65', a65Config);
    }

    // No model-specific overrides needed currently
}