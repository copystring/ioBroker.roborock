// src/lib/features/vacuum/a72_features.ts
// Features for Roborock Q5 Pro (roborock.vacuum.a72)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a72 model
const a72Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.AvoidCarpet
    ]
};

@RegisterModel('roborock.vacuum.a72')
export class A72Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a72', a72Config);
    }

    // No model-specific overrides needed currently
}