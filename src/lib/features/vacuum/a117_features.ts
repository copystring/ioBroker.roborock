// src/lib/features/vacuum/a117_features.ts
// Features for Roborock Qrevo Master (roborock.vacuum.a117)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a117 model
const a117Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.WaterBox,
        Feature.AvoidCarpet,
        Feature.LiveVideo          // Action feature triggered by isVideoLiveCallSupported
        // Add Feature.Camera if applicable
    ]
};

@RegisterModel('roborock.vacuum.a117')
export class A117Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a117', a117Config);
    }

    // No model-specific overrides needed currently
}