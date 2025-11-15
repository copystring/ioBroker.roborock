// src/lib/features/vacuum/a156_features.ts
// Features for Roborock Qrevo Edge (roborock.vacuum.a156)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a156 model
const a156Config: DeviceModelConfig = {
    staticFeatures: [
        // No specific static features listed in old definition
    ]
};

@RegisterModel('roborock.vacuum.a156')
export class A156Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a156', a156Config);
    }

    // No model-specific overrides needed currently
}