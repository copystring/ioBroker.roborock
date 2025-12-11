import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A08: VacuumProfile = {
	name: "Roborock S6 Pure (a08)",
	features: {
		maxSuctionValue: 104
	},
	mappings: {
		fan_power: BASE_FAN,
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const a08Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.ShakeMopStrength,
		Feature.WaterBox
	]
};

@RegisterModel("roborock.vacuum.a08")
export class A08Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a08", a08Config, PROFILE_A08);
	}
}