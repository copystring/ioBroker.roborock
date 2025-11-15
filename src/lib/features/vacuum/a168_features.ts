// src/lib/features/vacuum/a168_features.ts
// Features for Roborock QV 35A (roborock.vacuum.a168)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a168 model
const a168Config: DeviceModelConfig = {
    staticFeatures: [
        // No specific static features listed in old definition
    ]
};

@RegisterModel('roborock.vacuum.a168')
export class A168Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a168', a168Config);
    }

    // No model-specific overrides needed currently
}