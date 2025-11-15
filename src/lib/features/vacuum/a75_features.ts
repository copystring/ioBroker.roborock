// src/lib/features/vacuum/a75_features.ts
// Features for Roborock Q Revo (roborock.vacuum.a75)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a75 model
const a75Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.ShakeMopStrength, // Alias for WaterBox logic
        Feature.WaterBox,
        Feature.AvoidCarpet
    ]
};

@RegisterModel('roborock.vacuum.a75')
export class A75Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a75', a75Config);
    }

    // No model-specific overrides needed currently
}