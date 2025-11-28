import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_S6: VacuumProfile = {
	name: "Roborock S6",
	features: {
		maxSuctionValue: 104
	},
	mappings: {
		fan_power: BASE_FAN,
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const s6Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.WaterBox,
		Feature.AvoidCarpet
	]
};

@RegisterModel("roborock.vacuum.s6")
export class S6Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.s6", s6Config, PROFILE_S6);
	}
}