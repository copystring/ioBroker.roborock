import { DeviceModelConfig, FeatureDependencies, RegisterModel } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { BASE_FAN, BASE_MOP, BASE_WATER, V1VacuumFeatures, VacuumProfile } from "./v1VacuumFeatures";

const PROFILE_A101: VacuumProfile = {
	name: "Roborock Q Revo Pro (a101)",
	features: {
		maxSuctionValue: 108,
		hasSmartPlan: true,
		hasDistanceOff: true
	},
	mappings: {
		fan_power: { ...BASE_FAN, 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max", 106: "Custom", 108: "Max+", 110: "Smart" },
		water_box_mode: { ...BASE_WATER, 201: "Low", 202: "Medium", 203: "High", 204: "Indiv", 207: "Custom", 209: "Smart" },
		mop_mode: { ...BASE_MOP, 300: "Standard", 301: "Deep", 302: "Indiv", 303: "Deep+", 304: "Fast", 306: "Smart" }
	},
	cleanMotorModePresets: {
		'{"fan_power":110,"mop_mode":306,"water_box_mode":209}': "Smart",
		'{"fan_power":102,"mop_mode":300,"water_box_mode":201}': "Vac & Mop",
		'{"fan_power":105,"mop_mode":300,"water_box_mode":201}': "Wischen",
		'{"fan_power":102,"mop_mode":300,"water_box_mode":200}': "Saugen",
		'{"fan_power":106,"mop_mode":302,"water_box_mode":204}': "Indiv"
	}
};

const a101Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.DockStatus,
		Feature.RobotStatus,
		Feature.InWarmup,
		Feature.LastCleanTime,
		Feature.MapFlag,
		Feature.BackType,
		Feature.ChargeStatus,
		Feature.CleanPercent,
		Feature.SwitchStatus,
		Feature.MopForbidden,
		Feature.AvoidCarpet,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.AutoEmptyDock,
		Feature.MopWash,
		Feature.MopDry,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.CleanRepeat
	]
};

@RegisterModel("roborock.vacuum.a101")
export class A101Features extends V1VacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a101", a101Config, PROFILE_A101);
	}
}
