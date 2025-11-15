// src/lib/features/vacuum/a135_features.ts
// Features for Roborock Qrevo Curv (roborock.vacuum.a135)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a135 model
const a135Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.WaterBox,
        Feature.AvoidCarpet,
        Feature.LiveVideo          // Action feature triggered by isVideoLiveCallSupported
        // Add Feature.Camera if applicable
    ]
};

@RegisterModel('roborock.vacuum.a135')
export class A135Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a135', a135Config);
    }

    // No model-specific overrides needed currently
}