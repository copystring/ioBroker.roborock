// src/lib/features/vacuum/a104_features.ts
// Features for Roborock Qrevo S (roborock.vacuum.a104)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a104 model
const a104Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.MopForbidden,
        Feature.WaterBox,
        Feature.AvoidCarpet
    ]
};

@RegisterModel('roborock.vacuum.a104')
export class A104Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a104', a104Config);
    }

    // No model-specific overrides needed currently
}