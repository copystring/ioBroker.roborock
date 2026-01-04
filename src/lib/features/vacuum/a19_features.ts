import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A19: VacuumProfile = {
	name: "Roborock S4 Max (a19)",
	features: {
		maxSuctionValue: 104
	},
	mappings: {
		fan_power: BASE_FAN,
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const a19Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.ShakeMopStrength
	]
};

@RegisterModel("roborock.vacuum.a19")
export class A19Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a19", a19Config, PROFILE_A19);
	}
}
