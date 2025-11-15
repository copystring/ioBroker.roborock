// src/lib/features/vacuum/a10_features.ts
// Features for Roborock S6 MaxV (roborock.vacuum.a10)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a10 model
const a10Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.Camera,
        Feature.MopForbidden,
        Feature.ShakeMopStrength,
        Feature.WaterBox,
        Feature.AvoidCarpet,
        Feature.LiveVideo
    ]
};

@RegisterModel('roborock.vacuum.a10')
export class A10Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a10', a10Config);
    }

    // No model-specific overrides needed currently
}