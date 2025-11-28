import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A147: VacuumProfile = {
	name: "Roborock Saros 10 (a147)",
	features: {
		maxSuctionValue: 108,
		hasSmartPlan: true
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: { ...BASE_MOP, 306: "Intense/Smart" }
	}
};

const a147Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.InWarmup,
		Feature.CleanPercent,
		Feature.ExtraTime,
		Feature.RobotStatus,
		Feature.CommonStatus,
		Feature.SwitchStatus,
		Feature.ExitDock,
		Feature.ChargeStatus,
		Feature.MapFlag,
		Feature.CleaningInfo,
		Feature.TaskId,
		Feature.DockStatus,
		Feature.LastCleanTime,
		Feature.AutoEmptyDock,
		Feature.MopWash,
		Feature.MopDry,
		Feature.LiveVideo,
		Feature.Camera,
		Feature.MopForbidden,
		Feature.AvoidCarpet,
		Feature.WaterBox,
		Feature.SmartPlan,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.CleanRepeat,
		Feature.CleanedArea
	]
};

@RegisterModel("roborock.vacuum.a147")
export class A147Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a147", a147Config, PROFILE_A147);
	}
}