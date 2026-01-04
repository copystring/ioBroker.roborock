import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A87: VacuumProfile = {
	name: "Roborock Qrevo MaxV (a87)",
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

const a87Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.Camera,
		Feature.MopForbidden,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.LiveVideo,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.InWarmup,
		Feature.ChargeStatus,
		Feature.CleanPercent,
		Feature.RobotStatus,
		Feature.CommonStatus,
		Feature.LastCleanTime,
		Feature.Kct,
		Feature.MapFlag,
		Feature.ReplenishMode,
		Feature.CleanRepeat,
		Feature.Rdt,
		Feature.CleanArea,
		Feature.CleanTime,
		Feature.SwitchStatus
	]
};

@RegisterModel("roborock.vacuum.a87")
export class A87Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a87", a87Config, PROFILE_A87);
	}
}
