import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_A75: VacuumProfile = {
	name: "Roborock Q Revo (a75)",
	features: {
		maxSuctionValue: 108
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const a75Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.CommonStatus,
		Feature.Dss,
		Feature.Rss,
		Feature.Kct,
		Feature.Rdt,
		Feature.InWarmup,
		Feature.LastCleanTime,
		Feature.MapFlag,
		Feature.BackType,
		Feature.ChargeStatus,
		Feature.CleanPercent,
		Feature.SwitchStatus,
		Feature.MopForbidden,
		Feature.ShakeMopStrength,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.FanMaxPlus
	]
};

@RegisterModel("roborock.vacuum.a75")
export class A75Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a75", a75Config, PROFILE_A75);
	}
}