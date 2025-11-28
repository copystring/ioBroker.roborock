import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A168: VacuumProfile = {
	name: "Roborock Qrevo L (a168)",
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

const a168Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.WaterBox,
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
		Feature.CleanRepeat,
		Feature.CleanedArea,
		Feature.MopForbidden,
		Feature.AvoidCarpet
	]
};

@RegisterModel("roborock.vacuum.a168")
export class A168Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a168", a168Config, PROFILE_A168);
	}
}