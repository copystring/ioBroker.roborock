import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A21: VacuumProfile = {
	name: "Roborock Qrevo Slim (a21)",
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

const a21Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.LiveVideo,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.MapFlag,
		Feature.ReplenishMode,
		Feature.TaskId,
		Feature.MonitorStatus,
		Feature.InWarmup,
		Feature.ChargeStatus,
		Feature.CleanPercent,
		Feature.DockStatus,
		Feature.RobotStatus,
		Feature.CommonStatus,
		Feature.SwitchStatus,
		Feature.LastCleanTime
	]
};

@RegisterModel("roborock.vacuum.a21")
export class A21Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a21", a21Config, PROFILE_A21);
	}
}