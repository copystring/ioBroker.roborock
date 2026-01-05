import { V1VacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./v1VacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";

const PROFILE_S4: VacuumProfile = {
	name: "Roborock S4",
	features: {
		maxSuctionValue: 104
	},
	mappings: {
		fan_power: BASE_FAN,
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const s4Config: DeviceModelConfig = {
	staticFeatures: [
		// No specific static features listed in old definition
	]
};

@RegisterModel("roborock.vacuum.s4")
export class S4Features extends V1VacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.s4", s4Config, PROFILE_S4);
	}
}
