// src/lib/features/vacuum/s5e_features.ts
// Features for Roborock S5 Max (roborock.vacuum.s5e)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the s5e model
const s5eConfig: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.ShakeMopStrength, // Alias for WaterBox logic
        Feature.WaterBox
    ]
};

@RegisterModel('roborock.vacuum.s5e')
export class S5eFeatures extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.s5e', s5eConfig);
    }

    // No model-specific overrides needed currently
}