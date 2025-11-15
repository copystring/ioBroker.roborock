// src/lib/features/vacuum/a159_features.ts
// Features for Roborock Qrevo Curv S5X (roborock.vacuum.a159)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a159 model
const a159Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.WaterBox
    ]
};

@RegisterModel('roborock.vacuum.a159')
export class A159Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a159', a159Config);
    }

    // No model-specific overrides needed currently
}