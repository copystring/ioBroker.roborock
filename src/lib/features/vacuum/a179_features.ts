import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// --- DEVICE PROFILE (a179) ---
const PROFILE_A179: VacuumProfile = {
	name: "Roborock Saros Z70 (a179)",
	features: {
		hasSmartPlan: true,
		maxSuctionValue: 110,
		ultraWaterValue: 209
	},
	mappings: {
		fan_power: { ...BASE_FAN, 110: "Max+" },
		water_box_mode: { ...BASE_WATER, 209: "Ultra" },
		mop_mode: { ...BASE_MOP, 306: "Intense/Smart" }
	},
	cleanMotorModePresets: {
		'{"fan_power":110,"mop_mode":306,"water_box_mode":209}': "SmartPlan",
		'{"fan_power":102,"mop_mode":300,"water_box_mode":200}': "Vacuum",
		'{"fan_power":105,"mop_mode":300,"water_box_mode":202}': "Mop",
		'{"fan_power":102,"mop_mode":300,"water_box_mode":202}': "Vac & Mop"
	}
};

// Define static features for the a179 model
const a179Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.LiveVideo,
		Feature.Camera,

		// Common Features (Inferred)
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
		Feature.CleanRepeat,
		Feature.SmartPlan
	]
};

@RegisterModel("roborock.vacuum.a179")
export class A179Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a179", a179Config, PROFILE_A179);
	}
}
