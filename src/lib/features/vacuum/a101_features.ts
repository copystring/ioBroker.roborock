// src/lib/features/vacuum/a101_features.ts
// Features for Roborock Q Revo Pro (roborock.vacuum.a101)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a101 model
const a101Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.ShakeMopStrength, // Alias for WaterBox logic
        Feature.WaterBox,
        Feature.AvoidCarpet
    ]
};

@RegisterModel('roborock.vacuum.a101')
export class A101Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a101', a101Config);
    }

    // No model-specific overrides needed currently
}