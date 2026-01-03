import { V1VacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./v1VacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A97: VacuumProfile = {
	name: "Roborock S8 MaxV Ultra (a97)",
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

const a97Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.CommonStatus,
		Feature.Dss,
		Feature.Rss,
		Feature.Kct,
		Feature.RobotStatus,
		Feature.CleanPercent,
		Feature.ChargeStatus,
		Feature.InWarmup,
		Feature.MapFlag,
		Feature.TaskId,
		Feature.LastCleanTime,
		Feature.SwitchStatus,
		Feature.MonitorStatus,
		Feature.CleaningInfo,
		Feature.AutoEmptyDock,
		Feature.MopWash,
		Feature.MopDry,
		Feature.LiveVideo,
		Feature.VoiceControl,
		Feature.MopForbidden,
		Feature.AvoidCarpet,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.CleanRepeat,
		Feature.Camera
	]
};

@RegisterModel("roborock.vacuum.a97")
export class A97Features extends V1VacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a97", a97Config, PROFILE_A97);
	}
}
