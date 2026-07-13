import { V1VacuumFeatures, VacuumProfile, BASE_FAN, BASE_MOP } from "./v1VacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const QREVO_EDGE_2_WATER = {
	200: "Off",
	221: "Very Light",
	222: "Very Light",
	223: "Very Light",
	224: "Low",
	225: "Low",
	226: "Low",
	227: "Low",
	228: "Gentle",
	229: "Gentle",
	230: "Gentle",
	231: "Gentle",
	232: "Gentle",
	233: "Medium",
	234: "Medium",
	235: "Medium",
	236: "Medium",
	237: "Medium",
	238: "Moderate",
	239: "Moderate",
	240: "Moderate",
	241: "Moderate",
	242: "Moderate",
	243: "High",
	244: "High",
	245: "High",
	246: "High",
	247: "High",
	248: "Extreme",
	249: "Extreme",
	250: "Extreme"
};

const PROFILE_A298: VacuumProfile = {
	name: "Roborock Qrevo Edge 2 (a298)",
	features: {
		maxSuctionValue: 108,
		hasSmartPlan: true
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: QREVO_EDGE_2_WATER,
		mop_mode: BASE_MOP
	}
};

const a298Config: DeviceModelConfig = {
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

@RegisterModel("roborock.vacuum.a298")
export class A298Features extends V1VacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a298", a298Config, PROFILE_A298);
	}
}
