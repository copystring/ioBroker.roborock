// src/lib/features/vacuum/a19_features.ts
// Features for Roborock S4 Max (roborock.vacuum.a19)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a19 model
const a19Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.ShakeMopStrength // Alias for WaterBox logic
    ]
};

@RegisterModel('roborock.vacuum.a19')
export class A19Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a19', a19Config);
    }

    // No model-specific overrides needed currently
}