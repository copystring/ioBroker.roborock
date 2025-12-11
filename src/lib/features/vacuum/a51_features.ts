import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A51: VacuumProfile = {
	name: "Roborock S8 (a51)",
	features: {
		maxSuctionValue: 108,
		hasSmartPlan: true
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const a51Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.Camera,
		Feature.MopForbidden,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.DockStatus,
		Feature.RobotStatus,
		Feature.LastCleanTime,
		Feature.MapFlag,
		Feature.ChargeStatus,
		Feature.CleanPercent,
		Feature.SwitchStatus,
	]
};

@RegisterModel("roborock.vacuum.a51")
export class A51Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a51", a51Config, PROFILE_A51);
	}
}