import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A144: VacuumProfile = {
	name: "Roborock Saros 10R (a144)",
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

const a144Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.WaterBox,
		Feature.LiveVideo,
		Feature.Camera,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.CommonStatus, Feature.DockStatus, Feature.RobotStatus,
		Feature.CleanPercent, Feature.ChargeStatus, Feature.InWarmup,
		Feature.MapFlag, Feature.TaskId, Feature.LastCleanTime,
		Feature.SwitchStatus, Feature.CleaningInfo, Feature.AutoEmptyDock,
		Feature.MopWash, Feature.MopDry, Feature.CleanRepeat,
		Feature.CleanedArea
	]
};

@RegisterModel("roborock.vacuum.a144")
export class A144Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a144", a144Config, PROFILE_A144);
	}
}
