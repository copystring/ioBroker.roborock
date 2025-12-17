import { BaseVacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./baseVacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

const PROFILE_SC01: VacuumProfile = {
	name: "Roborock Q7 (sc01)",
	features: {
		maxSuctionValue: 108
	},
	mappings: {
		fan_power: { ...BASE_FAN, 108: "Max+" },
		water_box_mode: BASE_WATER,
		mop_mode: BASE_MOP
	}
};

const sc01Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.MopForbidden,
		Feature.WaterBox,
		Feature.AvoidCarpet,
		Feature.FanMaxPlus,
		Feature.MapFlag,
		Feature.ChargeStatus,
		Feature.UpdateStatus,
		Feature.RobotStatus,
		Feature.NetworkInfo
	]
};

@RegisterModel("roborock.vacuum.sc01")
export class SC01Features extends BaseVacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.sc01", sc01Config, PROFILE_SC01);
	}
}
