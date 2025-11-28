import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A135: VacuumProfile = {
	name: "Roborock Qrevo Curv (a135)",
	features: {
		maxSuctionValue: 108,
		hasSmartPlan: true
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	},
	cleanMotorModePresets: {
		'{"fan_power":102,"mop_mode":300,"water_box_mode":200}': "Vacuum",
		'{"fan_power":105,"mop_mode":300,"water_box_mode":202}': "Mop",
		'{"fan_power":102,"mop_mode":300,"water_box_mode":202}': "Vac & Mop"
	}
};

const a135Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.CommonStatus,
		Feature.Dss,
		Feature.Rss,
		Feature.Kct,
		Feature.InWarmup,
		Feature.MonitorStatus,
		Feature.CleanPercent,
		Feature.ExtraTime,
		Feature.RobotStatus,
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
		Feature.MopForbidden,
		Feature.AvoidCarpet,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.CleanRepeat
	]
};

@RegisterModel("roborock.vacuum.a135")
export class A135Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a135", a135Config, PROFILE_A135);
	}
}
