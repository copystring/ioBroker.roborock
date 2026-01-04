import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A117: VacuumProfile = {
	name: "Roborock Qrevo Master (a117)",
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

const a117Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.LiveVideo,
		Feature.Camera,
		Feature.CommonStatus,
		Feature.DockStatus,
		Feature.RobotStatus,
		Feature.CleanPercent,
		Feature.ChargeStatus,
		Feature.InWarmup,
		Feature.MapFlag,
		Feature.TaskId,
		Feature.LastCleanTime,
		Feature.SwitchStatus,
		Feature.CleaningInfo,
		Feature.AutoEmptyDock,
		Feature.MopWash,
		Feature.MopDry,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.CleanRepeat
	]
};

@RegisterModel("roborock.vacuum.a117")
export class A117Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a117", a117Config, PROFILE_A117);
	}
}
