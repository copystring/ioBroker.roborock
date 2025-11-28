import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A101: VacuumProfile = {
	name: "Roborock Q Revo Pro (a101)",
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
export class A101Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a101", a101Config, PROFILE_A101);
	}
}