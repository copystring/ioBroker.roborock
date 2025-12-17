import { VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./v1VacuumFeatures";
import { B01VacuumFeatures } from "./b01VacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";

const PROFILE_SC01: VacuumProfile = {
	name: "Roborock Q7 L5 (sc01)",
	features: {
		maxSuctionValue: 108
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const sc01Config: DeviceModelConfig = {
	// B01 devices should strict to B01 protocol capabilities only.
	// We clear these to prevent standard Vacuum logic from adding incompatible commands.
	staticFeatures: []
};

@RegisterModel("roborock.vacuum.sc01")
export class SC01Features extends B01VacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.sc01", sc01Config, PROFILE_SC01);
		dependencies.adapter.rLog("System", duid, "Info", "SC01", undefined, `Constructing SC01Features`, "info");
	}
}
