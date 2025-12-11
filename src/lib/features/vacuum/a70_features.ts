import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A70: VacuumProfile = {
	name: "Roborock S8 Pro Ultra (a70)",
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

const a70Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.CommonStatus,
		Feature.Dss,
		Feature.Rss,
		Feature.LastCleanTime,
		Feature.MapFlag,
		Feature.BackType,
		Feature.ChargeStatus,
		Feature.SwitchStatus,
		Feature.CleanPercent,
		Feature.FanMaxPlus,
		Feature.MopForbidden,
		Feature.AvoidCarpet,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.AutoEmptyDock,
		Feature.MopWash,
		Feature.MopDry,
		Feature.RobotStatus,
		Feature.CleaningInfo,
		Feature.CleanRepeat
	]
};

@RegisterModel("roborock.vacuum.a70")
export class A70Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a70", a70Config, PROFILE_A70);
	}
}