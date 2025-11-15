// src/lib/features/vacuum/a97_features.ts
// Features for Roborock S8 MaxV (Ultra) (roborock.vacuum.a97)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a97 model
const a97Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.WaterBox,
        Feature.AvoidCarpet,
        Feature.LiveVideo          // Action feature triggered by isVideoLiveCallSupported
        // Add Feature.Camera if applicable
    ]
};

@RegisterModel('roborock.vacuum.a97')
export class A97Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a97', a97Config);
    }

    // No model-specific overrides needed currently
}