// src/lib/features/vacuum/a08_features.ts
// Features for Roborock S6 Pure (roborock.vacuum.a08)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a08 model
const a08Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.ShakeMopStrength,
        Feature.WaterBox
    ]
};

@RegisterModel('roborock.vacuum.a08')
export class A08Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a08', a08Config);
    }

    // No model-specific overrides needed currently
}