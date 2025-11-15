// src/lib/features/vacuum/a187_features.ts
// Features for Roborock Qrevo Edge Series (roborock.vacuum.a187)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a187 model
const a187Config: DeviceModelConfig = {
    staticFeatures: [
        // No specific static features listed in old definition
    ]
};

@RegisterModel('roborock.vacuum.a187')
export class A187Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a187', a187Config);
    }

    // No model-specific overrides needed currently
}