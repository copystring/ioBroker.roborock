import { V1VacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./v1VacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A65: VacuumProfile = {
	name: "Roborock S7 Max Ultra (a65)",
	features: {
		maxSuctionValue: 108
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const a65Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.FanMaxPlus,
		Feature.DockStatus,
		Feature.RobotStatus,
		Feature.MapFlag,
		Feature.BackType,
		Feature.ChargeStatus,
		Feature.CleanPercent,
		Feature.SwitchStatus,
		Feature.CleanArea
	]
};

@RegisterModel("roborock.vacuum.a65")
export class A65Features extends V1VacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a65", a65Config, PROFILE_A65);
	}
}
