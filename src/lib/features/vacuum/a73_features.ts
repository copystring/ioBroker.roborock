import { V1VacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./v1VacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A73: VacuumProfile = {
	name: "Roborock Q8 Max (a73)",
	features: {
		maxSuctionValue: 108
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const a73Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.FanMaxPlus,
		Feature.CommonStatus,
		Feature.DockStatus,
		Feature.RobotStatus,
		Feature.InWarmup,
		Feature.LastCleanTime,
		Feature.MapFlag,
		Feature.ChargeStatus,
		Feature.CleanPercent,
		Feature.SwitchStatus
	]
};

@RegisterModel("roborock.vacuum.a73")
export class A73Features extends V1VacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a73", a73Config, PROFILE_A73);
	}
}
