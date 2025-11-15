// src/lib/features/vacuum/s4_features.ts
// Features for Roborock S4 (roborock.vacuum.s4)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the s4 model
const s4Config: DeviceModelConfig = {
    staticFeatures: [
        // No specific static features listed in old definition
    ]
};

@RegisterModel('roborock.vacuum.s4')
export class S4Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.s4', s4Config);
    }

    // No model-specific overrides needed currently
}