// src/lib/features/vacuum/a62_features.ts
// Features for Roborock S7 Pro Ultra (roborock.vacuum.a62)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a62 model
const a62Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.ShakeMopStrength, // Alias for WaterBox logic
        Feature.WaterBox,
        Feature.AvoidCarpet
    ]
};

@RegisterModel('roborock.vacuum.a62')
export class A62Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a62', a62Config);
    }

    // No model-specific overrides needed currently
}