import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A72: VacuumProfile = {
	name: "Roborock Q5 Pro (a72)",
	features: {
		maxSuctionValue: 108
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const a72Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.AvoidCarpet,
		Feature.FanMaxPlus,
		Feature.DockStatus,
		Feature.RobotStatus,
		Feature.LastCleanTime,
		Feature.MapFlag,
		Feature.BackType,
		Feature.ChargeStatus,
		Feature.CleanPercent,
		Feature.CleanArea,
		Feature.SwitchStatus,
		Feature.CommonStatus,
		Feature.InWarmup
	]
};

@RegisterModel("roborock.vacuum.a72")
export class A72Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a72", a72Config, PROFILE_A72);
	}
}
