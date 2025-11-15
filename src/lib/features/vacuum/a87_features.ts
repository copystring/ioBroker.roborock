// src/lib/features/vacuum/a87_features.ts
// Features for Roborock Qrevo MaxV (roborock.vacuum.a87)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a87 model
const a87Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.Camera,
        Feature.MopForbidden,
        Feature.ShakeMopStrength, // Alias for WaterBox logic
        Feature.WaterBox,
        Feature.AvoidCarpet,
        Feature.LiveVideo          // Action feature triggered by isVideoLiveCallSupported
    ]
};

@RegisterModel('roborock.vacuum.a87')
export class A87Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a87', a87Config);
    }

    // No model-specific overrides needed currently
}