import { DeviceModelConfig, FeatureDependencies, RegisterModel } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { BASE_FAN, BASE_MOP, BASE_WATER, V1VacuumFeatures, VacuumProfile } from "./v1VacuumFeatures";

const PROFILE_A147: VacuumProfile = {
	name: "Roborock Saros 10 (a147)",
	features: {
		maxSuctionValue: 110,
		hasSmartPlan: true
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

const a147Config: DeviceModelConfig = {
	staticFeatures: [
		Feature.InWarmup,
		Feature.CleanPercent,
		Feature.ExtraTime,
		Feature.RobotStatus,
		Feature.CommonStatus,
		Feature.SwitchStatus,
		Feature.ExitDock,
		Feature.ChargeStatus,
		Feature.MapFlag,
		Feature.CleaningInfo,
		Feature.TaskId,
		Feature.DockStatus,
		Feature.LastCleanTime,
		Feature.AutoEmptyDock,
		Feature.MopWash,
		Feature.MopDry,
		Feature.LiveVideo,
		Feature.Camera,
		Feature.MopForbidden,
		Feature.AvoidCarpet,
		Feature.WaterBox,
		Feature.SmartPlan,
		Feature.FanMaxPlus,
		Feature.SmartModeCommand,
		Feature.CleanRepeat,
		Feature.CleanedArea
	]
};

@RegisterModel("roborock.vacuum.a147")
export class A147Features extends V1VacuumFeatures {
	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a147", a147Config, PROFILE_A147);
	}

	public override async getPhoto(imgId: string, type: number): Promise<any> {
		return this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_photo", {
			data_filter: {
				img_id: Number(imgId),
				type: type
			}
		});
	}
}
