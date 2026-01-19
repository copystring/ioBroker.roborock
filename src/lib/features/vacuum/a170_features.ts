import { DeviceModelConfig, FeatureDependencies, RegisterModel } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { BASE_FAN, BASE_MOP, BASE_WATER, V1VacuumFeatures, VacuumProfile } from "./v1VacuumFeatures";

const PROFILE_A170: VacuumProfile = {
	name: "Roborock Qrevo S5V (a170)",
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

const a170Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.WaterBox,
		Feature.CommonStatus,
		Feature.DockingStationStatus,
		Feature.RobotStatus,
		Feature.CleanPercent,
		Feature.ChargeStatus,
		Feature.InWarmup,
		Feature.WaterShortage,
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

@RegisterModel("roborock.vacuum.a170")
export class A170Features extends V1VacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a170", a170Config, PROFILE_A170);
	}
}
