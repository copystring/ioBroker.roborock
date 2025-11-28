import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A10: VacuumProfile = {
	name: "Roborock S6 MaxV (a10)",
	features: {
		maxSuctionValue: 104
	},
	mappings: {
		fan_power: BASE_FAN,
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

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

@RegisterModel("roborock.vacuum.a10")
export class A10Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a10", a10Config, PROFILE_A10);
	}
}