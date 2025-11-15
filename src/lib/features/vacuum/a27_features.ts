
// src/lib/features/vacuum/a27_features.ts
// Features for Roborock S7 MaxV (Ultra) (roborock.vacuum.a27)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a27 model
const a27Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.Camera,
        Feature.MopForbidden,
        Feature.ShakeMopStrength,
        Feature.WaterBox,
        Feature.AvoidCarpet,
        Feature.VoiceControl,
        Feature.LiveVideo
    ]
};

@RegisterModel('roborock.vacuum.a27')
export class A27Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a27', a27Config);
    }

    // No model-specific overrides needed currently
}