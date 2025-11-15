// src/lib/features/vacuum/a147_features.ts
// Features for Roborock Saros 10 (roborock.vacuum.a147)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a147 model
const a147Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.SmartModeCommand,
        Feature.ShakeMopStrength,
        // Add other static features if known
    ]
};

@RegisterModel('roborock.vacuum.a147')
export class A147Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a147', a147Config);
    }

    // No model-specific overrides needed currently
}