// src/lib/features/vacuum/a51_features.ts
// Features for Roborock S8 (roborock.vacuum.a51)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a51 model
const a51Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.Camera,
        Feature.MopForbidden,
        Feature.ShakeMopStrength, // Alias for WaterBox logic
        Feature.WaterBox,
        Feature.AvoidCarpet
    ]
};

@RegisterModel('roborock.vacuum.a51')
export class A51Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a51', a51Config);
    }

    // No model-specific overrides needed currently
}