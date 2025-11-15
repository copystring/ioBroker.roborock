// src/lib/features/vacuum/a144_features.ts
// Features for Roborock Saros 10R (roborock.vacuum.a144)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a144 model
const a144Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.WaterBox,
        Feature.LiveVideo          // Action feature triggered by isVideoLiveCallSupported
        // Add Feature.Camera if applicable
    ]
};

@RegisterModel('roborock.vacuum.a144')
export class A144Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a144', a144Config);
    }

    // No model-specific overrides needed currently
}