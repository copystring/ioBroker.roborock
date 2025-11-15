// src/lib/features/vacuum/a70_features.ts
// Features for Roborock S8 Pro Ultra (roborock.vacuum.a70)

import { BaseVacuumFeatures } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// Define static features for the a70 model
const a70Config: DeviceModelConfig = {
    staticFeatures: [
        Feature.FanMaxPlus,
        Feature.MopForbidden,
        Feature.ShakeMopStrength,
        Feature.WaterBox,
        Feature.AvoidCarpet
    ]
};

@RegisterModel('roborock.vacuum.a70')
export class A70Features extends BaseVacuumFeatures {
    constructor(dependencies: FeatureDependencies, duid: string) {
        super(dependencies, duid, 'roborock.vacuum.a70', a70Config);
    }

    // Override applyModelSpecifics if needed
    // public async applyModelSpecifics(statusData?: Readonly<Record<string, any>>, fwFeatures?: readonly number[]): Promise<void> {
    //     await super.applyModelSpecifics(statusData, fwFeatures);
    //     this.deps.log.debug(`[A70 Specifics|${this.duid}] Applying specifics...`);
    // }
}