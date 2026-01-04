import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A40: VacuumProfile = {
	name: "Roborock Q7 (a40)",
	features: {
		maxSuctionValue: 108
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const a40Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.FanMaxPlus
	]
};

@RegisterModel("roborock.vacuum.a40")
export class A40Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a40", a40Config, PROFILE_A40);
	}
}
