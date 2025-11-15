// src/lib/features/vacuum/a21_features.ts
// Features for Roborock Qrevo Slim (roborock.vacuum.a21)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a21 model
const a21Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.WaterBox,
        Feature.AvoidCarpet,
        Feature.LiveVideo          // Action feature triggered by isVideoLiveCallSupported
        // Add Feature.Camera if applicable
    ]
};

@RegisterModel('roborock.vacuum.a21')
export class A21Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a21', a21Config);
    }

    // No model-specific overrides needed currently
}