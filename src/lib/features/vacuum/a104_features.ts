import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A104: VacuumProfile = {
	name: "Roborock Qrevo S (a104)",
	features: {
		maxSuctionValue: 108
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const a104Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.FanMaxPlus,
		Feature.InWarmup,
		Feature.ChargeStatus,
		Feature.CleanPercent,
		Feature.RobotStatus,
		Feature.DockStatus,
		Feature.CommonStatus,
		Feature.Kct,
		Feature.SwitchStatus,
		Feature.MapFlag,
		Feature.CleanArea
	]
};

@RegisterModel("roborock.vacuum.a104")
export class A104Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a104", a104Config, PROFILE_A104);
	}
}