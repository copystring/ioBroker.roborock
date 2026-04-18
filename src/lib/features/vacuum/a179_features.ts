import { V1VacuumFeatures, VacuumProfile, BASE_FAN, BASE_WATER, BASE_MOP } from "./v1VacuumFeatures";
import { RegisterModel, DeviceModelConfig, FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";

// --- DEVICE PROFILE (a179) ---
const PROFILE_A179: VacuumProfile = {
	name: "Roborock Saros Z70 (a179)",
	features: {
		hasSmartPlan: true,
		hasDistanceOff: true,
		maxSuctionValue: 110,
		ultraWaterValue: 209
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

const a179Config: DeviceModelConfig = {
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
		Feature.CleanedArea,
		Feature.GetPhoto
	]
};

const Z70_ARM_DIRECTION_STATES: Record<number, string> = {
	1: "Up",
	2: "Down",
	3: "Go",
	4: "Back"
};

const Z70_ARM_MOVE_PRESET_STATES: Record<string, string> = {
	"[2,0,0]": "M3 Left",
	"[1,0,0]": "M3 Right",
	"[0,1,0]": "M4 Left",
	"[0,2,0]": "M4 Right",
	"[0,0,2]": "M5 Left",
	"[0,0,1]": "M5 Right"
};

const Z70_GRAB_MODE_STATES: Record<number, string> = {
	0: "Exit / Off",
	1: "Manual Mode",
	2: "Auto Mode"
};

const Z70_PICK_UP_STATES: Record<number, string> = {
	0: "Auto Grab",
	1: "Manual Grab"
};

const Z70_PUT_DOWN_STATES: Record<number, string> = {
	0: "Put Down"
};

const Z70_CAMERA_STATES: Record<number, string> = {
	0: "Disable Mechanical Camera",
	1: "Enable Mechanical Camera"
};

const Z70_VIDEO_QUALITY_STATES: Record<string, string> = {
	SD: "SD",
	HD: "HD",
	FHD: "FHD",
	AUTO: "AUTO"
};

const Z70_ROLLER_MOP_STATES: Record<number, string> = {
	0: "In",
	1: "Out"
};

const Z70_ROLLER_MOP_COVER_STATES: Record<number, string> = {
	0: "Stretch Out",
	1: "Retract"
};

const Z70_LDS_LIFTING_STATES: Record<number, string> = {
	0: "Lower",
	1: "Lift Up"
};

const Z70_EXHIBITION_MODE_STATES: Record<number, string> = {
	0: "Exit",
	1: "Enter"
};

const Z70_SMART_WASH_STATES: Record<number, string> = {
	0: "Custom / Timed",
	1: "Smart",
	2: "New Smart"
};

const Z70_BACK_WASH_MODE_STATES: Record<number, string> = {
	0: "Smart",
	1: "Custom",
	2: "New Smart"
};

const Z70_WASH_TOWEL_MODE_STATES: Record<number, string> = {
	0: "Quick / Water Saving",
	1: "Daily",
	2: "Deep",
	8: "Super Deep / Soak",
	10: "Smart"
};

const Z70_WASH_TEMPERATURE_STATES: Record<number, string> = {
	0: "Normal",
	1: "Warm",
	2: "Hot / High Temperature"
};

const Z70_BACK_TYPE_LABELS: Record<number, string> = {
	1: "Washing Mop",
	2: "Setting Up Mop",
	3: "Removing Mop",
	4: "Collecting Dust"
};

const Z70_WASH_PHASE_LABELS: Record<number, string> = {
	11: "Running",
	17: "Pumping"
};

const Z70_WASHING_MODE_LABELS: Record<number, string> = {
	6: "Dock Self-Cleaning",
	7: "Water Draining",
	11: "Pumping Water"
};

const Z70_BINARY_STATUS_STATES: Record<number, string> = {
	0: "Off",
	1: "On"
};

const Z70_PROGRAM_RUNTIME_RESULT_STATES: Record<number, string> = {
	"-2": "Execution Failure 2",
	"-1": "Execution Failure",
	0: "Successful Execution",
	1: "Waiting For Execution",
	2: "Executing"
};

const Z70_PROGRAM_STATE_STATES: Record<number, string> = {
	0: "Without Tasks",
	1: "Starting",
	2: "Executing",
	3: "Error"
};

const Z70_PROGRAM_TYPE_STATES: Record<number, string> = {
	1: "My Program",
	2: "Official Recommendation"
};

const Z70_PROGRAM_ARM_DIRECTION_LABELS: Record<number, string> = {
	1: "Arm Position Up",
	2: "Arm Position Down",
	3: "Arm Position Head",
	4: "Arm Position Back"
};

const Z70_PROGRAM_COMMAND_LABELS: Record<string, string> = {
	arm_out: "Arm Out",
	arm_grasp: "Auto Grab",
	arm_putdown: "Auto Put Down",
	arm_in: "Arm In",
	delay: "Delay",
	sound: "Play Voice",
	move_forward: "Go Forward",
	move_backward: "Go Back",
	turn_right: "Turn Right",
	turn_left: "Turn Left",
	arm_joints: "Arm Joints",
	arm_move: "Arm Move"
};

const Z70_PROGRAM_ARM_MOVE_AXES = ["M3", "M4", "M5", "M6"] as const;

const Z70_EASTER_EGG_TYPE_STATES: Record<number, string> = {
	0: "Dance"
};

const Z70_FEATURE_BACK_WASH_NEW_SMART = 109;
const Z70_FEATURE_HOT_WASH_TOWEL = 41;
const Z70_FEATURE_SOAK_AND_WASH = 107;
const Z70_MECHANICAL_ARM_EMERGENCY_ERROR_CODES = new Set([64, 65, 67, 69, 70, 71]);

type ExperimentalPayloadOptions = {
	unwrapSingleItemArray?: boolean;
	flattenObject?: boolean;
	writeArrayCount?: boolean;
	writePrimitiveValue?: boolean;
	pruneLegacyTopLevelStates?: boolean;
};

@RegisterModel("roborock.vacuum.a179")
export class A179Features extends V1VacuumFeatures {
	private z70FirmwareFeatures?: Set<number>;
	private z70HomeSecStatus: number | null = null;
	private z70HomeSecClientId: string | null = null;
	private z70RobotState: number | null = null;
	private z70LockStatus: number | null = null;
	private z70IsLocating = false;
	private z70VoiceChatActive = false;
	private z70DryStatus: number | null = null;
	private z70ExitDock: number | null = null;
	private z70WashPhase: number | null = null;
	private z70SwitchStatus: number | null = null;
	private z70CleanFluidStatus: number | null = null;
	private readonly z70QueryOnlyCommandIds = new Set([
		"get_camera_status",
		"app_get_arm_joints_data",
		"app_get_segment_clean_subdivision",
		"app_get_zoned_clean_subdivision",
		"app_tidy_up_record_summary",
		"app_get_tidy_up_zones",
		"app_tidy_up_record_detail",
		"app_get_tidy_up_map",
		"get_wash_debug_params",
		"get_clean_roller_debug_info",
		"get_smart_wash_params",
		"get_wash_towel_params",
		"get_wash_towel_mode",
		"get_wash_water_temperature",
		"app_get_program",
		"app_get_robot_setting",
		"app_get_program_runtime",
		"app_get_program_soundlist",
		"app_get_programs_summary",
		"app_get_clean_estimate_info",
		"app_get_carpet_deep_clean_status",
		"app_get_dryer_setting",
		"app_get_wifi_list",
		"get_dock_info",
		"get_child_lock_status",
		"get_collision_avoid_status",
		"get_flow_led_status",
		"get_map_beautification_status",
		"test_get_enable_wakeup",
		"test_get_voice_keep_seconds",
		"get_voice_history_summary",
		"get_voice_history",
		"test_get_voice_list",
		"get_auto_delivery_cleaning_fluid",
		"get_ap_mic_led_status",
		"get_voice_service_switch",
		"get_handle_leak_water_status",
		"check_homesec_password",
		"get_homesec_connect_status"
	]);
	private readonly z70SettingsOnlyCommandIds = new Set([
		"set_camera_status",
		"switch_video_quality",
		"app_set_door_sill_blocks",
		"app_set_beautify_blocks",
		"app_set_smart_door_sill",
		"app_set_tidy_up_zones",
		"set_wash_debug_params",
		"set_roller_speed",
		"set_drying_time",
		"set_mopping_speed",
		"set_wash_interval",
		"set_smart_wash_params",
		"set_back_wash_mode",
		"set_back_wash_interval",
		"set_wash_towel_params",
		"set_wash_towel_interval",
		"set_wash_towel_mode",
		"set_wash_towel_status",
		"set_wash_water_temperature",
		"app_set_robot_setting",
		"app_set_carpet_deep_clean_status",
		"app_set_cross_carpet_cleaning_status",
		"app_set_priority_carpet_cleaning_status",
		"app_set_dryer_setting",
		"app_set_dryer_status",
		"set_child_lock_status",
		"set_collision_avoid_status",
		"set_flow_led_status",
		"set_map_beautification_status",
		"set_ignore_carpet_zone",
		"set_ignore_identify_area",
		"test_set_enable_wakeup",
		"test_set_voice_keep_seconds",
		"app_update_unsave_map",
		"set_auto_delivery_cleaning_fluid",
		"set_ap_mic_led_status",
		"set_voice_service_switch",
		"set_handle_leak_water_status",
		"set_homesec_password",
		"reset_homesec_password",
		"enable_homesec_voice"
	]);

	private readonly z70NoParamCommandIds = new Set([
		"app_empty_inbuilt_water_tank",
		"app_amethyst_drain_all_water",
		"app_amethyst_self_check",
		"app_keep_easter_egg",
		"app_arm_out_compartment",
		"app_arm_in_compartment",
		"app_open_gripper",
		"app_grip",
		"app_tidy_up_record_summary",
		"app_get_tidy_up_zones",
		"app_arm_recover",
		"app_get_arm_joints_data",
		"app_get_program_runtime",
		"app_get_program_soundlist",
		"app_get_programs_summary",
		"get_auto_delivery_cleaning_fluid",
		"get_ap_mic_led_status",
		"get_handle_leak_water_status",
		"app_get_clean_estimate_info",
		"app_get_carpet_deep_clean_status",
		"app_get_wifi_list",
		"app_resume_patrol",
		"app_start_easter_egg",
		"app_start_pet_patrol",
		"app_empty_rinse_tank_water",
		"app_save_beautification_pic",
		"stop_voice_chat",
		"get_smart_wash_params",
		"get_wash_towel_mode",
		"get_wash_water_temperature",
		"get_dock_info"
	]);

	private readonly z70EmptyArrayCommandIds = new Set([
		"app_stop_grasp",
		"start_wash_then_charge",
		"reset_homesec_password",
		"app_wakeup_robot",
		"app_start_build_map",
		"app_resume_build_map",
		"app_start_collect_dust",
		"app_stop_collect_dust"
	]);

	private readonly z70NoParamArrayCommandIds = new Set([
		"get_camera_status",
		"get_wash_debug_params",
		"get_clean_roller_debug_info",
		"app_get_dryer_setting",
		"get_wash_towel_params",
		"get_voice_service_switch",
		"get_homesec_connect_status",
		"get_child_lock_status",
		"get_collision_avoid_status",
		"get_flow_led_status",
		"get_map_beautification_status",
		"get_voice_history_summary",
		"test_get_enable_wakeup",
		"test_get_voice_keep_seconds",
		"test_get_voice_list"
	]);

	private readonly z70CmdCommandIds = new Set([
		"app_rc_roller_mop_cover",
		"app_rc_roller_mop"
	]);

	private readonly z70FlagCommandIds = new Set([
		"app_pick_up_enter_exit",
		"app_pick_up",
		"app_put_down",
		"app_change_camera",
		"app_exhibition_enter_exit",
		"app_program_enter_exit"
	]);

	private readonly z70StartTimeCommandIds = new Set([
		"app_tidy_up_record_detail",
		"app_delete_tidy_up_record",
		"app_get_tidy_up_map"
	]);

	constructor(dependencies: FeatureDependencies, duid: string) {
		super(dependencies, duid, "roborock.vacuum.a179", a179Config, PROFILE_A179);
	}

	public override async initializeDeviceData(): Promise<void> {
		await super.initializeDeviceData();
		await this.updateExtraStatus();
	}

	public override async updateMap(): Promise<void> {
		await super.updateMap();
		await this.refreshZ70Zones();
	}

	public override async setupProtocolFeatures(): Promise<void> {
		await super.setupProtocolFeatures();

		// Source-verified Z70 robotic arm / tidy-up endpoints from the Roborock app bundle.
		this.addCommand("app_empty_inbuilt_water_tank", {
			type: "boolean",
			role: "button",
			name: "Drain Built-In Water Tank",
			def: false
		});
		this.addCommand("app_amethyst_drain_all_water", {
			type: "boolean",
			role: "button",
			name: "Drain All Water",
			def: false
		});
		this.addCommand("app_amethyst_self_check", {
			type: "boolean",
			role: "button",
			name: "Run Self Check",
			def: false
		});
		this.addCommand("app_keep_easter_egg", {
			type: "boolean",
			role: "button",
			name: "Keep Easter Egg Mode",
			def: false
		});
		this.addCommand("app_arm_out_compartment", {
			type: "boolean",
			role: "button",
			name: "Arm Out",
			def: false
		});
		this.addCommand("app_arm_in_compartment", {
			type: "boolean",
			role: "button",
			name: "Arm In",
			def: false
		});
		this.addCommand("app_open_gripper", {
			type: "boolean",
			role: "button",
			name: "Open Gripper",
			def: false
		});
		this.addCommand("app_grip", {
			type: "boolean",
			role: "button",
			name: "Close Gripper",
			def: false
		});
		this.addCommand("app_arm_direction_move", {
			type: "number",
			role: "value",
			name: "Arm Direction Move",
			states: Z70_ARM_DIRECTION_STATES,
			def: 1
		});
		this.addCommand("app_arm_move", {
			type: "json",
			role: "json",
			name: "Arm Move"
		});
		this.addCommand("app_arm_move_preset", {
			type: "string",
			role: "value",
			name: "Arm Move Preset",
			states: Z70_ARM_MOVE_PRESET_STATES,
			def: "[2,0,0]"
		});
		this.addCommand("app_arm_recover", {
			type: "boolean",
			role: "button",
			name: "Recover Arm",
			def: false
		});
		this.addCommand("app_arm_recover_payload", {
			type: "json",
			role: "json",
			name: "Recover Arm Payload"
		});
		this.addCommand("app_get_arm_joints_data", {
			type: "boolean",
			role: "button",
			name: "Get Arm Joints Data",
			def: false
		});
		this.addCommand("app_stop_grasp", {
			type: "boolean",
			role: "button",
			name: "Stop Grasp",
			def: false
		});
		this.addCommand("app_rc_roller_mop_cover", {
			type: "number",
			role: "value",
			name: "Roller Mop Cover Command",
			states: Z70_ROLLER_MOP_COVER_STATES,
			def: 0
		});
		this.addCommand("app_rc_roller_mop", {
			type: "number",
			role: "value",
			name: "Roller Mop Command",
			states: Z70_ROLLER_MOP_STATES,
			def: 0
		});
		this.addCommand("app_rc_lds_lifting", {
			type: "number",
			role: "value",
			name: "LDS Lifting",
			states: Z70_LDS_LIFTING_STATES,
			def: 0
		});
		this.addCommand("app_wakeup_robot", {
			type: "boolean",
			role: "button",
			name: "Wake Up Robot",
			def: false
		});
		this.addCommand("app_set_door_sill_blocks", {
			type: "json",
			role: "json",
			name: "Set Door Sill Blocks"
		});
		this.addCommand("app_set_beautify_blocks", {
			type: "json",
			role: "json",
			name: "Set Beautify Blocks"
		});
		this.addCommand("app_set_smart_door_sill", {
			type: "json",
			role: "json",
			name: "Set Smart Door Sill"
		});
		this.addCommand("app_get_segment_clean_subdivision", {
			type: "json",
			role: "json",
			name: "Get Segment Clean Subdivision"
		});
		this.addCommand("app_segment_clean_subdivision", {
			type: "json",
			role: "json",
			name: "Segment Clean Subdivision"
		});
		this.addCommand("app_get_zoned_clean_subdivision", {
			type: "json",
			role: "json",
			name: "Get Zoned Clean Subdivision"
		});
		this.addCommand("app_zoned_clean_subdivision", {
			type: "json",
			role: "json",
			name: "Zoned Clean Subdivision"
		});
		this.addCommand("app_set_dirty_replenish_clean_status", {
			type: "json",
			role: "json",
			name: "Set Dirty Replenish Clean Status"
		});
		this.addCommand("app_set_dynamic_config", {
			type: "json",
			role: "json",
			name: "Set Dynamic Config"
		});
		this.addCommand("app_set_ignore_stuck_point", {
			type: "json",
			role: "json",
			name: "Set Ignore Stuck Point"
		});
		this.addCommand("app_set_low_space_zones", {
			type: "json",
			role: "json",
			name: "Set Low Space Zones"
		});
		this.addCommand("app_set_smart_cliff_forbidden", {
			type: "json",
			role: "json",
			name: "Set Smart Cliff Forbidden"
		});
		this.addCommand("app_ignore_dirty_objects", {
			type: "json",
			role: "json",
			name: "Ignore Dirty Objects"
		});
		this.addCommand("app_save_beautification_pic", {
			type: "boolean",
			role: "button",
			name: "Save Beautification Picture",
			def: false
		});
		this.addCommand("app_start_build_map", {
			type: "boolean",
			role: "button",
			name: "Start Quick Build Map",
			def: false
		});
		this.addCommand("app_resume_build_map", {
			type: "boolean",
			role: "button",
			name: "Resume Quick Build Map",
			def: false
		});
		this.addCommand("app_start_collect_dust", {
			type: "boolean",
			role: "button",
			name: "Start Collect Dust",
			def: false
		});
		this.addCommand("app_stop_collect_dust", {
			type: "boolean",
			role: "button",
			name: "Stop Collect Dust",
			def: false
		});
		this.addCommand("app_switch_dock_cool_fan", {
			type: "boolean",
			role: "switch.enable",
			name: "Dock Cool Fan",
			def: false
		});
		this.addCommand("app_delete_wifi", {
			type: "number",
			role: "value",
			name: "Delete Saved Wi-Fi",
			def: 0
		});
		this.addCommand("app_pick_up_enter_exit", {
			type: "number",
			role: "value",
			name: "Arm Grab Mode",
			states: Z70_GRAB_MODE_STATES,
			def: 0
		});
		this.addCommand("app_pick_up", {
			type: "number",
			role: "value",
			name: "Arm Pick-Up Action",
			states: Z70_PICK_UP_STATES,
			def: 0
		});
		this.addCommand("app_put_down", {
			type: "number",
			role: "value",
			name: "Arm Put-Down Action",
			states: Z70_PUT_DOWN_STATES,
			def: 0
		});
		this.addCommand("app_change_camera", {
			type: "number",
			role: "value",
			name: "Mechanical Camera",
			states: Z70_CAMERA_STATES,
			def: 0
		});
		this.addCommand("get_camera_status", {
			type: "boolean",
			role: "button",
			name: "Get Camera Status",
			def: false
		});
		this.addCommand("set_camera_status", {
			type: "number",
			role: "value",
			name: "Set Camera Status Bitfield",
			def: 0
		});
		this.addCommand("start_camera_preview", {
			type: "json",
			role: "json",
			name: "Start Camera Preview"
		});
		this.addCommand("stop_camera_preview", {
			type: "json",
			role: "json",
			name: "Stop Camera Preview"
		});
		this.addCommand("switch_video_quality", {
			type: "string",
			role: "value",
			name: "Switch Video Quality",
			states: Z70_VIDEO_QUALITY_STATES,
			def: "SD"
		});
		this.addCommand("app_exhibition_enter_exit", {
			type: "number",
			role: "value",
			name: "Exhibition Mode",
			states: Z70_EXHIBITION_MODE_STATES,
			def: 0
		});
		this.addCommand("app_exhibition_action", {
			type: "json",
			role: "json",
			name: "Exhibition Action"
		});
		this.addCommand("app_set_tidy_up_zones", {
			type: "json",
			role: "json",
			name: "Set Tidy-Up Zones"
		});
		this.addCommand("app_start_tidy_up", {
			type: "json",
			role: "json",
			name: "Start Tidy-Up"
		});
		this.addCommand("app_tidy_up_record_summary", {
			type: "boolean",
			role: "button",
			name: "Refresh Tidy-Up Summary",
			def: false
		});
		this.addCommand("app_get_tidy_up_zones", {
			type: "boolean",
			role: "button",
			name: "Refresh Tidy-Up Zones",
			def: false
		});
		this.addCommand("app_tidy_up_record_detail", {
			type: "number",
			role: "value",
			name: "Get Tidy-Up Record",
			def: 0
		});
		this.addCommand("app_delete_tidy_up_record", {
			type: "number",
			role: "value",
			name: "Delete Tidy-Up Record",
			def: 0
		});
		this.addCommand("app_get_tidy_up_map", {
			type: "number",
			role: "value",
			name: "Get Tidy-Up Record Map",
			def: 0
		});
		this.addCommand("get_wash_debug_params", {
			type: "boolean",
			role: "button",
			name: "Get Wash Debug Params",
			def: false
		});
		this.addCommand("get_clean_roller_debug_info", {
			type: "boolean",
			role: "button",
			name: "Get Clean Roller Debug Info",
			def: false
		});
		this.addCommand("set_wash_debug_params", {
			type: "json",
			role: "json",
			name: "Set Wash Debug Params"
		});
		this.addCommand("set_roller_speed", {
			type: "number",
			role: "value",
			name: "Set Roller Speed",
			def: 0
		});
		this.addCommand("set_drying_time", {
			type: "number",
			role: "value",
			name: "Set Drying Time",
			def: 0
		});
		this.addCommand("set_mopping_speed", {
			type: "number",
			role: "value",
			name: "Set Mopping Speed",
			def: 0
		});
		this.addCommand("set_wash_interval", {
			type: "number",
			role: "value",
			name: "Set Wash Interval",
			def: 0
		});
		this.addCommand("get_smart_wash_params", {
			type: "boolean",
			role: "button",
			name: "Get Smart Wash Params",
			def: false
		});
		this.addCommand("set_smart_wash_params", {
			type: "json",
			role: "json",
			name: "Set Smart Wash Params"
		});
		this.addCommand("set_back_wash_mode", {
			type: "number",
			role: "value",
			name: "Set Back Wash Mode",
			states: Z70_BACK_WASH_MODE_STATES,
			def: 0
		});
		this.addCommand("set_back_wash_interval", {
			type: "number",
			role: "value",
			name: "Set Back Wash Interval",
			min: 10,
			max: 50,
			unit: "min",
			def: 20
		});
		this.addCommand("get_wash_towel_params", {
			type: "boolean",
			role: "button",
			name: "Get Wash Towel Params",
			def: false
		});
		this.addCommand("get_wash_towel_mode", {
			type: "boolean",
			role: "button",
			name: "Get Wash Towel Mode",
			def: false
		});
		this.addCommand("get_wash_water_temperature", {
			type: "boolean",
			role: "button",
			name: "Get Wash Water Temperature",
			def: false
		});
		this.addCommand("set_wash_towel_params", {
			type: "json",
			role: "json",
			name: "Set Wash Towel Params"
		});
		this.addCommand("set_wash_towel_interval", {
			type: "number",
			role: "value",
			name: "Set Wash Towel Interval",
			def: 0
		});
		this.addCommand("set_wash_towel_mode", {
			type: "number",
			role: "value",
			name: "Set Wash Towel Mode",
			states: Z70_WASH_TOWEL_MODE_STATES,
			def: 1
		});
		this.addCommand("set_wash_towel_status", {
			type: "number",
			role: "value",
			name: "Set Wash Towel Status",
			def: 0
		});
		this.addCommand("set_wash_water_temperature", {
			type: "number",
			role: "value",
			name: "Set Wash Water Temperature",
			states: Z70_WASH_TEMPERATURE_STATES,
			def: 0
		});
		this.addCommand("start_wash_then_charge", {
			type: "boolean",
			role: "button",
			name: "Start Wash Then Charge",
			def: false
		});
		this.addCommand("app_get_program", {
			type: "number",
			role: "value",
			name: "Get Program",
			min: 1,
			def: 1
		});
		this.addCommand("app_get_robot_setting", {
			type: "json",
			role: "json",
			name: "Get Robot Setting"
		});
		this.addCommand("app_set_robot_setting", {
			type: "json",
			role: "json",
			name: "Set Robot Setting"
		});
		this.addCommand("app_get_program_runtime", {
			type: "boolean",
			role: "button",
			name: "Get Program Runtime",
			def: false
		});
		this.addCommand("app_get_program_soundlist", {
			type: "boolean",
			role: "button",
			name: "Get Program Sound List",
			def: false
		});
		this.addCommand("app_get_programs_summary", {
			type: "boolean",
			role: "button",
			name: "Get Program Summary",
			def: false
		});
		this.addCommand("app_program_enter_exit", {
			type: "number",
			role: "value",
			name: "Program Enter / Exit",
			states: Z70_EXHIBITION_MODE_STATES,
			def: 0
		});
		this.addCommand("app_copy_program", {
			type: "json",
			role: "json",
			name: "Copy Program"
		});
		this.addCommand("app_delete_program", {
			type: "number",
			role: "value",
			name: "Delete Program",
			min: 1,
			def: 1
		});
		this.addCommand("app_modify_program", {
			type: "json",
			role: "json",
			name: "Modify Program"
		});
		this.addCommand("app_save_program", {
			type: "json",
			role: "json",
			name: "Save Program"
		});
		this.addCommand("app_start_program", {
			type: "json",
			role: "json",
			name: "Start Program"
		});
		this.addCommand("app_start_patrol", {
			type: "json",
			role: "json",
			name: "Start Patrol"
		});
		this.addCommand("app_resume_patrol", {
			type: "boolean",
			role: "button",
			name: "Resume Patrol",
			def: false
		});
		this.addCommand("app_start_pet_patrol", {
			type: "boolean",
			role: "button",
			name: "Start Pet Search",
			def: false
		});
		this.addCommand("app_empty_rinse_tank_water", {
			type: "boolean",
			role: "button",
			name: "Empty Rinse Tank Water",
			def: false
		});
		this.addCommand("app_start_easter_egg", {
			type: "boolean",
			role: "button",
			name: "Start Easter Egg Attack",
			def: false
		});
		this.addCommand("start_new_easter_egg", {
			type: "number",
			role: "value",
			name: "Start New Easter Egg",
			states: Z70_EASTER_EGG_TYPE_STATES,
			def: 0
		});
		this.addCommand("start_voice_chat", {
			type: "json",
			role: "json",
			name: "Start Voice Chat"
		});
		this.addCommand("stop_voice_chat", {
			type: "boolean",
			role: "button",
			name: "Stop Voice Chat",
			def: false
		});
		this.addCommand("set_voice_chat_volume", {
			type: "number",
			role: "value",
			name: "Set Voice Chat Volume"
		});
		this.addCommand("app_get_clean_estimate_info", {
			type: "boolean",
			role: "button",
			name: "Get Clean Estimate Info",
			def: false
		});
		this.addCommand("app_get_carpet_deep_clean_status", {
			type: "boolean",
			role: "button",
			name: "Get Carpet Deep Clean Status",
			def: false
		});
		this.addCommand("app_set_carpet_deep_clean_status", {
			type: "json",
			role: "json",
			name: "Set Carpet Deep Clean Status"
		});
		this.addCommand("app_set_cross_carpet_cleaning_status", {
			type: "boolean",
			role: "switch.enable",
			name: "Cross Carpet Cleaning",
			def: false
		});
		this.addCommand("app_set_priority_carpet_cleaning_status", {
			type: "boolean",
			role: "switch.enable",
			name: "Priority Carpet Cleaning",
			def: false
		});
		this.addCommand("app_get_dryer_setting", {
			type: "boolean",
			role: "button",
			name: "Get Dryer Setting",
			def: false
		});
		this.addCommand("app_set_dryer_setting", {
			type: "json",
			role: "json",
			name: "Set Dryer Setting"
		});
		this.addCommand("app_set_dryer_status", {
			type: "boolean",
			role: "switch.enable",
			name: "Dryer Status",
			def: false
		});
		this.addCommand("app_get_wifi_list", {
			type: "boolean",
			role: "button",
			name: "Get Wi-Fi List",
			def: false
		});
		this.addCommand("get_dock_info", {
			type: "boolean",
			role: "button",
			name: "Get Dock Info",
			def: false
		});
		this.addCommand("get_child_lock_status", {
			type: "boolean",
			role: "button",
			name: "Get Child Lock Status",
			def: false
		});
		this.addCommand("set_child_lock_status", {
			type: "boolean",
			role: "switch.enable",
			name: "Child Lock",
			def: false
		});
		this.addCommand("get_collision_avoid_status", {
			type: "boolean",
			role: "button",
			name: "Get Collision Avoid Status",
			def: false
		});
		this.addCommand("set_collision_avoid_status", {
			type: "boolean",
			role: "switch.enable",
			name: "Collision Avoid Status",
			def: false
		});
		this.addCommand("get_flow_led_status", {
			type: "boolean",
			role: "button",
			name: "Get Flow LED Status",
			def: false
		});
		this.addCommand("set_flow_led_status", {
			type: "boolean",
			role: "switch.enable",
			name: "Flow LED Status",
			def: false
		});
		this.addCommand("get_map_beautification_status", {
			type: "boolean",
			role: "button",
			name: "Get Map Beautification Status",
			def: false
		});
		this.addCommand("set_map_beautification_status", {
			type: "boolean",
			role: "switch.enable",
			name: "Map Beautification Status",
			def: false
		});
		this.addCommand("set_ignore_carpet_zone", {
			type: "json",
			role: "json",
			name: "Set Ignore Carpet Zone"
		});
		this.addCommand("set_ignore_identify_area", {
			type: "json",
			role: "json",
			name: "Set Ignore Identify Area"
		});
		this.addCommand("test_get_enable_wakeup", {
			type: "boolean",
			role: "button",
			name: "Get Voice Wakeup Status",
			def: false
		});
		this.addCommand("test_set_enable_wakeup", {
			type: "boolean",
			role: "switch.enable",
			name: "Voice Wakeup",
			def: false
		});
		this.addCommand("test_get_voice_keep_seconds", {
			type: "boolean",
			role: "button",
			name: "Get Voice Keep Seconds",
			def: false
		});
		this.addCommand("test_set_voice_keep_seconds", {
			type: "number",
			role: "value",
			name: "Voice Keep Seconds",
			def: 0
		});
		this.addCommand("get_voice_history_summary", {
			type: "boolean",
			role: "button",
			name: "Get Voice History Summary",
			def: false
		});
		this.addCommand("get_voice_history", {
			type: "number",
			role: "value",
			name: "Get Voice History",
			def: 0
		});
		this.addCommand("test_get_voice_list", {
			type: "boolean",
			role: "button",
			name: "Get Voice List",
			def: false
		});
		this.addCommand("app_start_replenish_clean_area", {
			type: "json",
			role: "json",
			name: "Start Replenish Clean Area"
		});
		this.addCommand("app_skip_current_cleaning_area", {
			type: "json",
			role: "json",
			name: "Skip Current Cleaning Area"
		});
		this.addCommand("app_update_unsave_map", {
			type: "boolean",
			role: "switch.enable",
			name: "Update Unsave Map",
			def: false
		});
		this.addCommand("get_auto_delivery_cleaning_fluid", {
			type: "boolean",
			role: "button",
			name: "Get Auto Delivery Clean Fluid",
			def: false
		});
		this.addCommand("set_auto_delivery_cleaning_fluid", {
			type: "boolean",
			role: "switch.enable",
			name: "Auto Delivery Clean Fluid",
			def: false
		});
		this.addCommand("get_ap_mic_led_status", {
			type: "boolean",
			role: "button",
			name: "Get Voice Control LED Status",
			def: false
		});
		this.addCommand("set_ap_mic_led_status", {
			type: "boolean",
			role: "switch.enable",
			name: "Voice Control LED",
			def: false
		});
		this.addCommand("get_voice_service_switch", {
			type: "boolean",
			role: "button",
			name: "Get Voice Service Switch",
			def: false
		});
		this.addCommand("set_voice_service_switch", {
			type: "boolean",
			role: "switch.enable",
			name: "Voice Service Switch",
			def: false
		});
		this.addCommand("get_handle_leak_water_status", {
			type: "boolean",
			role: "button",
			name: "Get Water Leak Check",
			def: false
		});
		this.addCommand("set_handle_leak_water_status", {
			type: "boolean",
			role: "switch.enable",
			name: "Water Leak Check",
			def: false
		});
		this.addCommand("check_homesec_password", {
			type: "string",
			role: "text",
			name: "Check Home Security Password",
			def: ""
		});
		this.addCommand("set_homesec_password", {
			type: "json",
			role: "json",
			name: "Set Home Security Password"
		});
		this.addCommand("reset_homesec_password", {
			type: "boolean",
			role: "button",
			name: "Reset Home Security Password",
			def: false
		});
		this.addCommand("enable_homesec_voice", {
			type: "boolean",
			role: "switch.enable",
			name: "Enable Home Security Voice",
			def: false
		});
		this.addCommand("get_homesec_connect_status", {
			type: "boolean",
			role: "button",
			name: "Get Home Security Connect Status",
			def: false
		});

		this.reclassifyZ70WritableCommandGroups();
	}

	public override async createCommandObjects(): Promise<void> {
		await super.createCommandObjects();
		await this.cleanupLegacyZ70CommandStates();
	}

	private reclassifyZ70WritableCommandGroups(): void {
		const registeredCommands = { ...this.commands };
		this.extraCommandGroups.queries = {};
		this.extraCommandGroups.settings = {};

		for (const [command, spec] of Object.entries(registeredCommands)) {
			if (this.z70QueryOnlyCommandIds.has(command)) {
				delete this.commands[command];
				this.addCommand(command, spec, "queries");
				continue;
			}

			if (this.z70SettingsOnlyCommandIds.has(command)) {
				delete this.commands[command];
				this.addCommand(command, spec, "settings");
			}
		}
	}

	private async cleanupLegacyZ70CommandStates(): Promise<void> {
		const movedCommands = [
			...Object.keys(this.extraCommandGroups.queries ?? {}),
			...Object.keys(this.extraCommandGroups.settings ?? {})
		];

		await Promise.all(movedCommands.map(async (command) => {
			const path = `Devices.${this.duid}.commands.${command}`;
			const existing = await this.deps.adapter.getObjectAsync(path);
			if (existing) {
				await this.deps.adapter.delObjectAsync(path);
			}
		}));
	}

	public override async getCommandParams(method: string, params?: unknown, id?: string): Promise<unknown> {
		const baseParams = await super.getCommandParams(method, params, id);

		if (method === "app_arm_recover" || method === "app_arm_recover_payload") {
			return {
				method: "app_arm_recover",
				params: this.normalizeOptionalObjectParam(baseParams, method)
			};
		}

		if (this.z70NoParamCommandIds.has(method)) {
			return {
				method,
				params: {}
			};
		}

		if (this.z70EmptyArrayCommandIds.has(method)) {
			return {
				method,
				params: []
			};
		}

		if (this.z70NoParamArrayCommandIds.has(method)) {
			return {
				method: method === "get_clean_roller_debug_info" ? "get_wash_debug_params" : method,
				params: []
			};
		}

		if (this.z70FlagCommandIds.has(method)) {
			return {
				method,
				params: {
					flag: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (this.z70StartTimeCommandIds.has(method)) {
			return {
				method,
				params: {
					start_time: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "app_arm_direction_move") {
			return {
				method,
				params: {
					direction: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (this.z70CmdCommandIds.has(method)) {
			return {
				method,
				params: {
					cmd: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "app_rc_lds_lifting") {
			return {
				method,
				params: {
					lift_up: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "app_arm_move") {
			return {
				method,
				params: {
					m: this.normalizeArmMoveParam(baseParams, method)
				}
			};
		}

		if (method === "app_arm_move_preset") {
			return {
				method: "app_arm_move",
				params: {
					m: this.normalizeArmMoveParam(baseParams, method)
				}
			};
		}

		if (method === "app_set_tidy_up_zones") {
			return {
				method,
				params: this.parseJsonParam(baseParams, method)
			};
		}

		if (
			method === "app_set_door_sill_blocks"
			|| method === "app_set_beautify_blocks"
			|| method === "app_set_smart_door_sill"
		) {
			return {
				method,
				params: this.parseJsonParam(baseParams, method)
			};
		}

		if (
			method === "app_get_segment_clean_subdivision"
			|| method === "app_segment_clean_subdivision"
			|| method === "app_get_zoned_clean_subdivision"
			|| method === "app_zoned_clean_subdivision"
			|| method === "app_set_dirty_replenish_clean_status"
			|| method === "app_set_dynamic_config"
			|| method === "app_set_ignore_stuck_point"
			|| method === "app_set_low_space_zones"
			|| method === "app_set_smart_cliff_forbidden"
			|| method === "app_ignore_dirty_objects"
			|| method === "set_ignore_carpet_zone"
			|| method === "set_ignore_identify_area"
		) {
			return {
				method,
				params: this.normalizeRequiredObjectParam(baseParams, method)
			};
		}

		if (method === "app_exhibition_action") {
			return {
				method,
				params: this.normalizeExhibitionActionParam(baseParams, method)
			};
		}

		if (method === "set_camera_status") {
			return {
				method,
				params: [this.normalizeNumericParam(baseParams, method)]
			};
		}

		if (method === "set_wash_debug_params") {
			return {
				method,
				params: this.normalizeRequiredObjectParam(baseParams, method)
			};
		}

		if (method === "start_camera_preview") {
			return {
				method,
				params: await this.normalizeCameraPreviewParams(baseParams, method)
			};
		}

		if (method === "stop_camera_preview") {
			return {
				method,
				params: await this.normalizeCameraPreviewParams(baseParams, method)
			};
		}

		if (method === "set_smart_wash_params" || method === "set_wash_towel_params") {
			return {
				method,
				params: this.normalizeRequiredObjectParam(baseParams, method)
			};
		}

		if (method === "app_get_robot_setting") {
			return {
				method,
				params: this.normalizeRobotSettingQueryParam(baseParams, method)
			};
		}

		if (method === "app_set_robot_setting" || method === "app_set_dryer_setting") {
			return {
				method,
				params: this.normalizeRequiredObjectParam(baseParams, method)
			};
		}

		if (method === "switch_video_quality") {
			return {
				method,
				params: {
					quality: this.normalizeVideoQualityParam(baseParams, method)
				}
			};
		}

		if (method === "set_roller_speed") {
			return {
				method: "set_wash_debug_params",
				params: {
					rollerspeed: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "set_drying_time") {
			return {
				method: "set_wash_debug_params",
				params: {
					dryingtime: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "set_mopping_speed") {
			return {
				method: "set_wash_debug_params",
				params: {
					moppingspeed: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "set_wash_interval") {
			return {
				method: "set_wash_debug_params",
				params: {
					washinterval: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "set_back_wash_mode") {
			const mode = this.normalizeBackWashModeParam(baseParams, method);
			const intervalMinutes = mode === 0 ? 20 : await this.readNumericState("dockingStationStatus.smartWash.washIntervalMinutes", 20);
			await this.assertBackWashModeSupported(mode);
			return {
				method: "set_smart_wash_params",
				params: this.buildSmartWashParams(mode, intervalMinutes)
			};
		}

		if (method === "set_back_wash_interval") {
			const intervalMinutes = this.normalizeBackWashIntervalMinutes(baseParams, method);
			return {
				method: "set_smart_wash_params",
				params: this.buildSmartWashParams(1, intervalMinutes)
			};
		}

		if (method === "set_wash_towel_interval") {
			return {
				method: "set_wash_towel_params",
				params: {
					interval: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "set_wash_towel_mode") {
			return {
				method,
				params: {
					wash_mode: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "set_wash_towel_status") {
			return {
				method: "set_wash_towel_params",
				params: {
					status: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "set_wash_water_temperature") {
			return {
				method,
				params: {
					values: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "app_get_program" || method === "app_delete_program") {
			return {
				method,
				params: {
					program_id: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "app_copy_program" || method === "app_modify_program") {
			return {
				method,
				params: this.normalizeProgramNameAndIdParam(baseParams, method)
			};
		}

		if (method === "app_save_program" || method === "start_voice_chat") {
			return {
				method,
				params: this.normalizeRequiredObjectParam(baseParams, method)
			};
		}

		if (method === "app_start_program") {
			return {
				method,
				params: await this.normalizeStartProgramParam(baseParams, method)
			};
		}

		if (method === "app_start_patrol") {
			return {
				method,
				params: this.normalizePatrolParam(baseParams, method)
			};
		}

		if (
			method === "app_start_replenish_clean_area"
			|| method === "app_skip_current_cleaning_area"
			|| method === "app_set_carpet_deep_clean_status"
		) {
			return {
				method,
				params: this.parseJsonParam(baseParams, method)
			};
		}

		if (method === "start_new_easter_egg") {
			return {
				method,
				params: {
					type: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "set_auto_delivery_cleaning_fluid") {
			return {
				method,
				params: {
					status: this.normalizeBinarySwitchParam(baseParams, method)
				}
			};
		}

		if (method === "set_ap_mic_led_status" || method === "set_handle_leak_water_status") {
			return {
				method,
				params: {
					status: this.normalizeBinarySwitchParam(baseParams, method)
				}
			};
		}

		if (method === "set_voice_service_switch") {
			return {
				method,
				params: {
					data: this.normalizeBinarySwitchParam(baseParams, method)
				}
			};
		}

		if (method === "set_voice_chat_volume") {
			return {
				method,
				params: {
					volume: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "check_homesec_password") {
			return {
				method,
				params: {
					password: this.normalizeTextParam(baseParams, method)
				}
			};
		}

		if (method === "set_homesec_password") {
			return {
				method,
				params: this.normalizeHomeSecPasswordParam(baseParams, method)
			};
		}

		if (method === "enable_homesec_voice") {
			return {
				method,
				params: {
					enable: this.normalizeBooleanParam(baseParams, method)
				}
			};
		}

		if (
			method === "app_set_cross_carpet_cleaning_status"
			|| method === "app_set_priority_carpet_cleaning_status"
			|| method === "app_set_dryer_status"
			|| method === "app_switch_dock_cool_fan"
			|| method === "set_child_lock_status"
			|| method === "set_collision_avoid_status"
			|| method === "set_flow_led_status"
			|| method === "set_map_beautification_status"
			|| method === "test_set_enable_wakeup"
		) {
			const key = method === "set_child_lock_status"
				? "lock_status"
				: method === "test_set_enable_wakeup"
					? "enable_wakeup"
					: "status";
			return {
				method,
				params: {
					[key]: this.normalizeBinarySwitchParam(baseParams, method)
				}
			};
		}

		if (method === "app_delete_wifi") {
			return {
				method,
				params: {
					id: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "test_set_voice_keep_seconds") {
			return {
				method,
				params: {
					keep_seconds: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "get_voice_history") {
			return {
				method,
				params: {
					max_id: this.normalizeNumericParam(baseParams, method)
				}
			};
		}

		if (method === "app_update_unsave_map") {
			return {
				method,
				params: {
					update: this.normalizeBooleanParam(baseParams, method)
				}
			};
		}

		if (method === "app_start_tidy_up") {
			const payload = this.parseJsonParam(baseParams, method);
			return {
				method,
				params: {
					objects: typeof payload === "object" && payload !== null && "objects" in payload
						? (payload as { objects: unknown }).objects
						: payload
				}
			};
		}

		return baseParams;
	}

	public override async onCommandResult(
		requestedMethod: string,
		finalMethod: string,
		response: unknown,
		params?: unknown
	): Promise<void> {
		await super.onCommandResult(requestedMethod, finalMethod, response, params);

		switch (finalMethod) {
			case "app_tidy_up_record_summary":
				await this.applyTidyUpSummaryStatus(response);
				return;
			case "app_get_tidy_up_zones":
				await this.applyTidyUpZonesStatus(response);
				return;
			case "app_get_program":
				await this.applyProgramDetailCommandResult(response, params);
				return;
			case "app_get_programs_summary":
				await this.applyProgramSummaryStatus(response);
				return;
			case "app_get_program_runtime":
				await this.applyProgramRuntimeStatus(response);
				return;
			case "app_get_program_soundlist":
				await this.applyProgramSoundListStatus(response);
				return;
			case "app_get_segment_clean_subdivision":
				await this.applyCompactArrayStatus(response, "cleaningInfo.segmentSubdivision", "Segment Subdivision");
				return;
			case "app_get_zoned_clean_subdivision":
				await this.applyCompactArrayStatus(response, "cleaningInfo.zoneSubdivision", "Zone Subdivision");
				return;
			case "app_get_robot_setting":
				await this.applyRobotSettingStatus(response);
				return;
			case "app_get_clean_estimate_info":
				await this.applyCleanEstimateStatus(response);
				return;
			case "app_get_carpet_deep_clean_status":
				await this.applyCarpetDeepCleanStatus(response);
				return;
			case "app_get_dryer_setting":
				await this.applyDryerSettingStatus(response);
				return;
			case "app_get_wifi_list":
				await this.applyWifiListStatus(response);
				return;
			case "get_dock_info":
				await this.applyDockInfoStatus(response);
				return;
			case "get_child_lock_status":
				await this.applyGroupedBinaryResultStatePayload(
					response,
					"deviceStatus",
					"childLock",
					"Child Lock",
					"lock_status",
					"childLockStatus",
					"Child Lock Status",
					"childLockEnabled",
					"Child Lock Enabled"
				);
				return;
			case "get_collision_avoid_status":
				await this.applyGroupedBinaryResultStatePayload(
					response,
					"deviceStatus",
					"collisionAvoid",
					"Collision Avoid",
					"status",
					"collisionAvoidStatus",
					"Collision Avoid Status",
					"collisionAvoidEnabled",
					"Collision Avoid Enabled"
				);
				return;
			case "get_flow_led_status":
				await this.applyGroupedBinaryResultStatePayload(
					response,
					"deviceStatus",
					"flowLed",
					"Flow LED",
					"status",
					"flowLedStatus",
					"Flow LED Status",
					"flowLedEnabled",
					"Flow LED Enabled"
				);
				return;
			case "get_map_beautification_status":
				await this.applyGroupedBinaryResultStatePayload(
					response,
					"cleaningInfo",
					"mapBeautification",
					"Map Beautification",
					"status",
					"mapBeautificationStatus",
					"Map Beautification Status",
					"mapBeautificationEnabled",
					"Map Beautification Enabled"
				);
				return;
			case "test_get_enable_wakeup":
				await this.applyGroupedBinaryResultStatePayload(
					response,
					"homeSecurity",
					"voiceWakeup",
					"Voice Wakeup",
					"enable_wakeup",
					"voiceWakeupStatus",
					"Voice Wakeup Status",
					"voiceWakeupEnabled",
					"Voice Wakeup Enabled"
				);
				return;
			case "test_get_voice_keep_seconds":
				await this.applyVoiceKeepSecondsStatus(response);
				return;
			case "get_voice_history_summary":
				await this.applyCompactJsonStatus(response, "homeSecurity.voiceHistorySummaryJSON", "Voice History Summary JSON");
				return;
			case "get_voice_history":
				await this.applyVoiceHistoryStatus(response);
				return;
			case "test_get_voice_list":
				await this.applyCompactArrayStatus(response, "homeSecurity.voiceList", "Voice List");
				return;
			case "get_homesec_connect_status":
				await this.applyHomeSecConnectStatus(response);
				return;
			case "get_auto_delivery_cleaning_fluid":
				await this.applyGroupedBinaryResultStatePayload(
					response,
					"dockingStationStatus",
					"autoDeliveryCleanFluid",
					"Auto Delivery Clean Fluid",
					"status",
					"autoDeliveryCleanFluidStatus",
					"Auto Delivery Clean Fluid Status",
					"autoDeliveryCleanFluidEnabled",
					"Auto Delivery Clean Fluid Enabled"
				);
				return;
			case "get_ap_mic_led_status":
				await this.applyGroupedBinaryResultStatePayload(
					response,
					"homeSecurity",
					"voiceControlLed",
					"Voice Control LED",
					"status",
					"voiceControlLedStatus",
					"Voice Control LED Status",
					"voiceControlLedEnabled",
					"Voice Control LED Enabled"
				);
				return;
			case "get_voice_service_switch":
				await this.applyGroupedBinaryResultStatePayload(
					response,
					"homeSecurity",
					"voiceService",
					"Voice Service",
					"data",
					"voiceServiceData",
					"Voice Service Data",
					"voiceServiceEnabled",
					"Voice Service Enabled"
				);
				return;
			case "get_handle_leak_water_status":
				await this.applyGroupedBinaryResultStatePayload(
					response,
					"dockingStationStatus",
					"waterLeak",
					"Water Leak",
					"status",
					"waterLeakStatus",
					"Water Leak Status",
					"waterLeakEnabled",
					"Water Leak Enabled"
				);
				return;
			case "get_smart_wash_params":
				await this.applySmartWashStatus(response, await this.getZ70FirmwareFeatures());
				return;
			case "get_wash_towel_params": {
				const firmwareFeatures = await this.getZ70FirmwareFeatures();
				await this.applyWashTowelSupportStates(firmwareFeatures);
				await this.applyWashTowelParamsStatus(response);
				return;
			}
			case "get_wash_towel_mode": {
				const firmwareFeatures = await this.getZ70FirmwareFeatures();
				await this.applyWashTowelSupportStates(firmwareFeatures);
				await this.applyWashTowelModeStatus(response, firmwareFeatures.has(Z70_FEATURE_SOAK_AND_WASH));
				return;
			}
			case "get_wash_water_temperature": {
				const firmwareFeatures = await this.getZ70FirmwareFeatures();
				await this.applyWashTowelSupportStates(firmwareFeatures);
				if (firmwareFeatures.has(Z70_FEATURE_HOT_WASH_TOWEL)) {
					await this.applyWashTowelTemperatureStatus(response);
				}
				return;
			}
		}
	}

	protected override async processResultKey(folder: string, key: string, val: unknown): Promise<void> {
		await super.processResultKey(folder, key, val);

		if (folder !== "deviceStatus") {
			return;
		}

		if (key === "common_status") {
			await this.updateDerivedCommonStatus(val);
			return;
		}

		if (key === "camera_status") {
			await this.updateDerivedCameraStatus(val);
			return;
		}

		if (key === "dock_error_status") {
			await this.updateDerivedDockErrorStatus(val);
			return;
		}

		if (key === "home_sec_status") {
			await this.updateDerivedHomeSecStatus(val);
			return;
		}

		if (key === "home_sec_enable_password") {
			await super.processResultKey("deviceStatus", "homeSecPasswordEnabled", Number(val) === 1);
			return;
		}

		if (key === "lock_status") {
			this.z70LockStatus = Number(val);
			await this.refreshDerivedRobotControlStates();
			return;
		}

		if (key === "switch_status") {
			this.z70SwitchStatus = Number(val);
			await this.refreshDerivedSwitchStatus();
			return;
		}

		if (key === "clean_fluid") {
			this.z70CleanFluidStatus = Number(val);
			await this.refreshDerivedSwitchStatus();
			return;
		}

		if (key === "is_locating") {
			this.z70IsLocating = Number(val) === 1;
			await this.refreshDerivedRobotControlStates();
			return;
		}

		if (key === "voice_chat_status") {
			this.z70VoiceChatActive = Number(val) === 1;
			await super.processResultKey("deviceStatus", "voiceChatActive", this.z70VoiceChatActive);
			await this.refreshDerivedRobotControlStates();
			return;
		}

		if (key === "monitor_status") {
			await super.processResultKey("deviceStatus", "monitorActive", Number(val) === 1);
			return;
		}

		if (key === "dry_status") {
			this.z70DryStatus = Number(val);
			await this.refreshDerivedRobotControlStates();
			return;
		}

		if (key === "back_type") {
			await this.updateDerivedBackType(val);
			return;
		}

		if (key === "exit_dock") {
			this.z70ExitDock = Number(val);
			await this.refreshDerivedRobotControlStates();
			return;
		}

		if (key === "wash_phase") {
			this.z70WashPhase = Number(val);
			await this.updateDerivedWashPhase(val);
			await this.refreshDerivedRobotControlStates();
			return;
		}

		if (key === "wash_status") {
			await this.updateDerivedWashStatus(val);
			return;
		}

		if (key === "state") {
			await this.updateDerivedRobotState(val);
			return;
		}

		if (key === "error_code") {
			await this.updateDerivedMechanicalArmErrorState(val);
			return;
		}

		if (key === "clean_tidyup_status") {
			await this.updateDerivedTaskStatus("mechArmTidyup", val);
			return;
		}

		if (key === "assist_clean_status") {
			await this.updateDerivedTaskStatus("mechArmMove", val);
			return;
		}

		if (key === "water_shortage_status") {
			await this.updateDerivedWaterShortageStatus(val);
		}
	}

	public override async updateExtraStatus(): Promise<void> {
		await Promise.all([
			this.refreshTidyUpSummaryStatus(),
			this.refreshZ70Zones(),
			this.refreshProgramSummaryStatus(),
			this.refreshProgramRuntimeStatus(),
			this.refreshProgramSoundListStatus(),
			this.refreshDockInfoStatus(),
			this.refreshMapBeautificationStatus(),
			this.refreshHomeSecConnectStatus(),
			this.refreshAutoDeliveryCleanFluidStatus(),
			this.refreshVoiceControlLedStatus(),
			this.refreshVoiceServiceSwitchStatus(),
			this.refreshWaterLeakStatus(),
			this.refreshSmartWashStatus(),
			this.refreshWashTowelStatus()
		]);
	}

	private async refreshTidyUpSummaryStatus(): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "app_tidy_up_record_summary", {});
			await this.applyTidyUpSummaryStatus(response);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Tidy-Up Summary: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async refreshZ70Zones(): Promise<void> {
		const mapZones = await this.readTidyZonesFromMapState();
		if (mapZones !== null) {
			await this.applyTidyUpZonesStatus(mapZones);
			return;
		}

		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "app_get_tidy_up_zones", {});
			await this.applyTidyUpZonesStatus(response);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Tidy-Up Zones: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async refreshProgramSummaryStatus(): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "app_get_programs_summary", {});
			await this.applyProgramSummaryStatus(response);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Program Summary: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async refreshProgramDetailStatus(entries: Array<Record<string, unknown>>): Promise<void> {
		const programEntries = entries
			.map((entry) => ({
				entry,
				programId: this.readOptionalProgramNumber(entry.program_id)
			}))
			.filter((entry) => entry.programId > 0);

		if (programEntries.length < 1) {
			await this.cleanupLegacyPaths(["program.details", "program.detail"]);
			await this.writeJsonState("program.detailsJSON", "Program Details JSON", []);
			await this.stateWriter.ensureAndSetValueState("program.detailsCount", {
				name: "Program Details Count",
				type: "number"
			}, 0);
			await this.stateWriter.ensureAndSetValueState("program.hasBlocklyPrograms", {
				name: "Program Has Blockly Programs",
				type: "boolean"
			}, false);
			await this.stateWriter.ensureAndSetValueState("program.totalCommandCount", {
				name: "Program Total Command Count",
				type: "number"
			}, 0);
			return;
		}

		const details = await Promise.all(programEntries.map(async ({ entry, programId }) => {
			try {
				const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "app_get_program", { program_id: programId });
				const normalized = this.unwrapSingleItemArrays(this.normalizeRpcPayload(response));
				return this.normalizeProgramDetailEntry(normalized, entry);
			} catch (e: unknown) {
				this.deps.adapter.rLog(
					"System",
					this.duid,
					"Warn",
					this.protocolVersion || undefined,
					undefined,
					`Failed to update Program Detail ${programId}: ${this.deps.adapter.errorMessage(e)}`,
					"warn"
				);
				return this.normalizeProgramDetailEntry({}, entry);
			}
		}));

		const normalizedDetails = details
			.filter((entry): entry is Record<string, unknown> => typeof entry === "object" && entry !== null && !Array.isArray(entry))
			.sort((left, right) => this.readOptionalProgramNumber(left.program_id) - this.readOptionalProgramNumber(right.program_id));

		await this.cleanupLegacyPaths(["program.details", "program.detail"]);
		await this.writeJsonState("program.detailsJSON", "Program Details JSON", normalizedDetails);
		await this.stateWriter.ensureAndSetValueState("program.detailsCount", {
			name: "Program Details Count",
			type: "number"
		}, normalizedDetails.length);
		await this.stateWriter.ensureAndSetValueState("program.hasBlocklyPrograms", {
			name: "Program Has Blockly Programs",
			type: "boolean"
		}, normalizedDetails.some((entry) => entry.hasBlocks === true));
		await this.stateWriter.ensureAndSetValueState("program.totalCommandCount", {
			name: "Program Total Command Count",
			type: "number"
		}, normalizedDetails.reduce((sum, entry) => sum + this.readOptionalProgramNumber(entry.commandCount), 0));
	}

	private async applyProgramSummaryStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.cleanupLegacyPaths(["program.summary", "program.summary.officialPrograms", "program.summary.myPrograms"]);
		await this.writeJsonState("program.summaryJSON", "Program Summary JSON", normalized);

		const entries = this.normalizeProgramSummaryEntries(normalized);
		const officialPrograms = entries
			.filter((entry) => this.readNumericField(entry, "program_type") === 2)
			.sort((left, right) => this.readOptionalProgramNumber(left.program_id) - this.readOptionalProgramNumber(right.program_id));
		const myPrograms = entries.filter((entry) => this.readNumericField(entry, "program_type") === 1);

		await this.writeJsonState("program.officialProgramsJSON", "Official Programs JSON", officialPrograms);
		await this.stateWriter.ensureAndSetValueState("program.officialProgramsCount", {
			name: "Official Programs Count",
			type: "number"
		}, officialPrograms.length);
		await this.writeJsonState("program.myProgramsJSON", "My Programs JSON", myPrograms);
		await this.stateWriter.ensureAndSetValueState("program.myProgramsCount", {
			name: "My Programs Count",
			type: "number"
		}, myPrograms.length);
		await this.stateWriter.ensureAndSetValueState("program.totalCount", {
			name: "Program Total Count",
			type: "number"
		}, entries.length);
		await this.stateWriter.ensureAndSetValueState("program.hasOfficialPrograms", {
			name: "Program Has Official Programs",
			type: "boolean"
		}, officialPrograms.length > 0);
		await this.stateWriter.ensureAndSetValueState("program.hasMyPrograms", {
			name: "Program Has My Programs",
			type: "boolean"
		}, myPrograms.length > 0);
		await this.refreshProgramDetailStatus(entries);
	}

	private async applyProgramDetailCommandResult(rawValue: unknown, params?: unknown): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const programId = typeof params === "object" && params !== null && !Array.isArray(params)
			? this.readOptionalProgramNumber((params as { program_id?: unknown }).program_id)
			: 0;
		await this.writeProgramDetailState(normalized, programId > 0 ? { program_id: programId } : undefined);
	}

	private async writeProgramDetailState(rawValue: unknown, summaryEntry?: Record<string, unknown>): Promise<void> {
		const detail = this.normalizeProgramDetailEntry(rawValue, summaryEntry);
		await this.cleanupLegacyPaths(["program.detail"]);
		await this.writeJsonState("program.selectedJSON", "Program Selected JSON", detail);
		await this.stateWriter.ensureAndSetValueState("program.selectedCommandCount", {
			name: "Program Selected Command Count",
			type: "number"
		}, this.readOptionalProgramNumber(detail.commandCount));
		await this.stateWriter.ensureAndSetValueState("program.selectedHasBlocks", {
			name: "Program Selected Has Blocks",
			type: "boolean"
		}, detail.hasBlocks === true);
		if (typeof detail.programTypeLabel === "string") {
			await this.stateWriter.ensureAndSetValueState("program.selectedTypeLabel", {
				name: "Program Selected Type Label",
				type: "string"
			}, detail.programTypeLabel);
		}
		if (typeof detail.name === "string" && detail.name) {
			await this.stateWriter.ensureAndSetValueState("program.selectedName", {
				name: "Program Selected Name",
				type: "string"
			}, detail.name);
		}
	}

	private async refreshProgramRuntimeStatus(): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "app_get_program_runtime", {});
			await this.applyProgramRuntimeStatus(response);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Program Runtime: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async applyProgramRuntimeStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.writeExperimentalPayload("program.runtime", "Program Runtime", normalized, {
			flattenObject: false
		});

		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const programState = this.readNumericField(normalized, "program_state");
		if (Number.isFinite(programState)) {
			await this.stateWriter.ensureAndSetValueState("program.runtime.programState", {
				name: "Program State",
				type: "number",
				states: Z70_PROGRAM_STATE_STATES
			}, programState);
			await this.stateWriter.ensureAndSetValueState("program.runtime.programStateLabel", {
				name: "Program State Label",
				type: "string"
			}, this.getProgramStateLabel(programState));
		}

		const commands = this.normalizeProgramRuntimeCommands((normalized as { result?: unknown }).result);
		await this.cleanupLegacyPaths(["program.runtime.commands"]);
		await this.writeJsonState("program.runtime.commandsJSON", "Program Runtime Commands JSON", commands);
		await this.stateWriter.ensureAndSetValueState("program.runtime.commandCount", {
			name: "Program Runtime Command Count",
			type: "number"
		}, commands.length);
		await this.stateWriter.ensureAndSetValueState("program.runtime.hasFailure", {
			name: "Program Runtime Has Failure",
			type: "boolean"
		}, commands.some((command) => Number(command.result) < 0));

		if (commands.length < 1) {
			return;
		}

		const latestCommand = commands[commands.length - 1];
		const latestResult = Number(latestCommand.result);
		if (Number.isFinite(latestResult)) {
			await this.stateWriter.ensureAndSetValueState("program.runtime.lastResult", {
				name: "Program Runtime Last Result",
				type: "number",
				states: Z70_PROGRAM_RUNTIME_RESULT_STATES
			}, latestResult);
			await this.stateWriter.ensureAndSetValueState("program.runtime.lastResultLabel", {
				name: "Program Runtime Last Result Label",
				type: "string"
			}, this.getProgramRuntimeResultLabel(latestResult));
		}

		if (typeof latestCommand.cmdId === "string" && latestCommand.cmdId) {
			await this.stateWriter.ensureAndSetValueState("program.runtime.lastCommandId", {
				name: "Program Runtime Last Command ID",
				type: "string"
			}, latestCommand.cmdId);
		}

		if (typeof latestCommand.cmdText === "string" && latestCommand.cmdText) {
			await this.stateWriter.ensureAndSetValueState("program.runtime.lastCommandText", {
				name: "Program Runtime Last Command Text",
				type: "string"
			}, latestCommand.cmdText);
		}
	}

	private async refreshProgramSoundListStatus(): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "app_get_program_soundlist", {});
			await this.applyProgramSoundListStatus(response);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Program Sound List: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async applyProgramSoundListStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeRpcPayload(rawValue);
		await this.cleanupLegacyPaths(["program.soundList"]);
		await this.writeJsonState("program.soundListJSON", "Program Sound List JSON", normalized);
		await this.stateWriter.ensureAndSetValueState("program.soundListCount", {
			name: "Program Sound List Count",
			type: "number"
		}, Array.isArray(normalized) ? normalized.length : 0);
	}

	private async applyRobotSettingStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeRpcPayload(rawValue);
		await this.cleanupLegacyPaths(["robotSetting", "settings"]);
		await this.writeJsonState("deviceStatus.robotSettingQueryJSON", "Robot Setting Query JSON", normalized);
		if (Array.isArray(normalized)) {
			await this.stateWriter.ensureAndSetValueState("deviceStatus.robotSettingQueryCount", {
				name: "Robot Setting Query Count",
				type: "number"
			}, normalized.length);
		} else {
			await this.cleanupLegacyPaths(["deviceStatus.robotSettingQueryCount"]);
		}
	}

	private async applyCleanEstimateStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeRpcPayload(rawValue);
		await this.cleanupLegacyPaths(["cleanEstimate"]);
		await this.writeJsonState("cleaningInfo.estimateJSON", "Clean Estimate JSON", normalized);

		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const cleanTimeSeconds = Number((normalized as { clean_time?: unknown }).clean_time);
		if (Number.isFinite(cleanTimeSeconds)) {
			await this.stateWriter.ensureAndSetValueState("cleaningInfo.estimateTimeMinutes", {
				name: "Clean Estimate Time",
				type: "number",
				unit: "min"
			}, Math.round(cleanTimeSeconds / 60));
		}

		const cleanArea = Number((normalized as { clean_area?: unknown }).clean_area);
		if (Number.isFinite(cleanArea)) {
			await this.stateWriter.ensureAndSetValueState("cleaningInfo.estimateArea", {
				name: "Clean Estimate Area",
				type: "number",
				unit: "m²"
			}, Math.round(cleanArea / 1000000));
		}
	}

	private async applyCarpetDeepCleanStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeRpcPayload(rawValue);
		await this.cleanupLegacyPaths(["carpetDeepClean"]);
		await this.writeJsonState("cleaningInfo.carpetDeepCleanJSON", "Carpet Deep Clean JSON", normalized);

		const status = this.readNumericField(normalized, "status");
		if (!Number.isFinite(status)) {
			return;
		}

		await this.stateWriter.ensureAndSetValueState("cleaningInfo.carpetDeepCleanStatus", {
			name: "Carpet Deep Clean Status",
			type: "number",
			states: Z70_BINARY_STATUS_STATES
		}, status);
		await this.stateWriter.ensureAndSetValueState("cleaningInfo.carpetDeepCleanEnabled", {
			name: "Carpet Deep Clean Enabled",
			type: "boolean"
		}, status === 1);
	}

	private async applyDryerSettingStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeRpcPayload(rawValue);
		await this.cleanupLegacyPaths(["dryer"]);
		await this.writeJsonState("dockingStationStatus.dryerJSON", "Dryer JSON", normalized);

		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const status = Number((normalized as { status?: unknown }).status);
		if (Number.isFinite(status)) {
			await this.stateWriter.ensureAndSetValueState("dockingStationStatus.dryerStatus", {
				name: "Dryer Status",
				type: "number",
				states: Z70_BINARY_STATUS_STATES
			}, status);
			await this.stateWriter.ensureAndSetValueState("dockingStationStatus.dryerEnabled", {
				name: "Dryer Enabled",
				type: "boolean"
			}, status === 1);
		}

		const dryTimeSeconds = Number((normalized as { on?: { dry_time?: unknown } }).on?.dry_time);
		if (Number.isFinite(dryTimeSeconds)) {
			await this.stateWriter.ensureAndSetValueState("dockingStationStatus.dryerTimeSeconds", {
				name: "Dryer Time",
				type: "number",
				unit: "s"
			}, dryTimeSeconds);
		}
	}

	private async applyWifiListStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeRpcPayload(rawValue);
		await this.cleanupLegacyPaths(["wifiList"]);
		await this.writeJsonState("networkInfo.wifiListJSON", "Wi-Fi List JSON", normalized);
		await this.stateWriter.ensureAndSetValueState("networkInfo.wifiListCount", {
			name: "Wi-Fi List Count",
			type: "number"
		}, Array.isArray(normalized) ? normalized.length : 0);
	}

	private async applyCompactArrayStatus(rawValue: unknown, relativePathBase: string, label: string): Promise<void> {
		const normalized = this.normalizeRpcPayload(rawValue);
		await this.cleanupLegacyPaths([relativePathBase]);
		await this.writeJsonState(`${relativePathBase}JSON`, `${label} JSON`, normalized);
		await this.stateWriter.ensureAndSetValueState(`${relativePathBase}Count`, {
			name: `${label} Count`,
			type: "number"
		}, Array.isArray(normalized) ? normalized.length : 0);
	}

	private async applyCompactJsonStatus(rawValue: unknown, relativePath: string, label: string): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.cleanupLegacyPaths([relativePath.replace(/JSON$/, "")]);
		await this.writeJsonState(relativePath, label, normalized);
	}

	private async refreshDockInfoStatus(): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_dock_info", {});
			await this.applyDockInfoStatus(response);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Dock Info: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async applyDockInfoStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.cleanupLegacyPaths(["dockInfo"]);
		await this.writeJsonState("dockingStationStatus.dockInfoJSON", "Dock Info JSON", normalized);
	}

	private async refreshMapBeautificationStatus(): Promise<void> {
		await this.refreshBinaryResultState(
			"get_map_beautification_status",
			[],
			"cleaningInfo",
			"mapBeautification",
			"Map Beautification",
			"status",
			"mapBeautificationStatus",
			"Map Beautification Status",
			"mapBeautificationEnabled",
			"Map Beautification Enabled"
		);
	}

	private async applyVoiceKeepSecondsStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.cleanupLegacyPaths(["voiceKeepSeconds"]);
		await this.writeJsonState("homeSecurity.voiceKeepSecondsJSON", "Voice Keep Seconds JSON", normalized);

		const seconds = this.readNumericField(normalized, "keep_seconds");
		if (!Number.isFinite(seconds)) {
			return;
		}

		await this.stateWriter.ensureAndSetValueState("homeSecurity.voiceKeepSeconds", {
			name: "Voice Keep Seconds",
			type: "number",
			unit: "s"
		}, seconds);
	}

	private async applyVoiceHistoryStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.cleanupLegacyPaths(["voiceHistory"]);
		await this.writeJsonState("homeSecurity.voiceHistoryJSON", "Voice History JSON", normalized);

		const entries = Array.isArray(normalized)
			? normalized
			: Array.isArray((normalized as { list?: unknown } | null | undefined)?.list)
				? (normalized as { list: unknown[] }).list
				: [];
		await this.stateWriter.ensureAndSetValueState("homeSecurity.voiceHistoryCount", {
			name: "Voice History Count",
			type: "number"
		}, entries.length);
	}

	private async refreshHomeSecConnectStatus(): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_homesec_connect_status", []);
			await this.applyHomeSecConnectStatus(response);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Home Security Connect: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async applyHomeSecConnectStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.cleanupLegacyPaths(["homeSecurity.connect"]);
		await this.writeJsonState("homeSecurity.connectJSON", "Home Security Connect JSON", normalized);

		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const clientId = typeof (normalized as { client_id?: unknown }).client_id === "string"
			? String((normalized as { client_id?: unknown }).client_id).trim()
			: "";
		this.z70HomeSecClientId = clientId || null;
		await this.refreshDerivedHomeSecPreviewState();
	}

	private async refreshAutoDeliveryCleanFluidStatus(): Promise<void> {
		await this.refreshBinaryResultState(
			"get_auto_delivery_cleaning_fluid",
			{},
			"dockingStationStatus",
			"autoDeliveryCleanFluid",
			"Auto Delivery Clean Fluid",
			"status",
			"autoDeliveryCleanFluidStatus",
			"Auto Delivery Clean Fluid Status",
			"autoDeliveryCleanFluidEnabled",
			"Auto Delivery Clean Fluid Enabled"
		);
	}

	private async refreshVoiceControlLedStatus(): Promise<void> {
		await this.refreshBinaryResultState(
			"get_ap_mic_led_status",
			{},
			"homeSecurity",
			"voiceControlLed",
			"Voice Control LED",
			"status",
			"voiceControlLedStatus",
			"Voice Control LED Status",
			"voiceControlLedEnabled",
			"Voice Control LED Enabled"
		);
	}

	private async refreshVoiceServiceSwitchStatus(): Promise<void> {
		await this.refreshBinaryResultState(
			"get_voice_service_switch",
			[],
			"homeSecurity",
			"voiceService",
			"Voice Service",
			"data",
			"voiceServiceData",
			"Voice Service Data",
			"voiceServiceEnabled",
			"Voice Service Enabled"
		);
	}

	private async refreshWaterLeakStatus(): Promise<void> {
		await this.refreshBinaryResultState(
			"get_handle_leak_water_status",
			{},
			"dockingStationStatus",
			"waterLeak",
			"Water Leak",
			"status",
			"waterLeakStatus",
			"Water Leak Status",
			"waterLeakEnabled",
			"Water Leak Enabled"
		);
	}

	private async readTidyZonesFromMapState(): Promise<unknown[] | null> {
		try {
			const state = await this.deps.adapter.getStateAsync(`Devices.${this.duid}.map.mapData`);
			if (typeof state?.val !== "string" || !state.val.trim()) {
				return null;
			}

			const parsed = JSON.parse(state.val) as { TIDY_ZONES?: unknown };
			return this.normalizeTidyZones(parsed.TIDY_ZONES);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Debug",
				this.protocolVersion || undefined,
				undefined,
				`Failed to read Tidy-Up Zones from map data: ${this.deps.adapter.errorMessage(e)}`,
				"debug"
			);
			return null;
		}
	}

	private normalizeTidyZones(value: unknown): unknown[] {
		if (!Array.isArray(value)) {
			return [];
		}

		return value.map((zone) => this.normalizeTidyZone(zone));
	}

	private normalizeTidyZone(zone: unknown): unknown {
		if (!Array.isArray(zone) || zone.length < 10) {
			return zone;
		}

		const numbers = zone.map((entry) => Number(entry));
		return {
			id: numbers[0],
			type: numbers[1],
			points: [
				[numbers[2], numbers[3]],
				[numbers[4], numbers[5]],
				[numbers[6], numbers[7]],
				[numbers[8], numbers[9]]
			]
		};
	}

	private async writeExperimentalPayload(
		folder: string,
		label: string,
		payload: unknown,
		options: boolean | ExperimentalPayloadOptions = false
	): Promise<void> {
		const resolvedOptions: ExperimentalPayloadOptions = typeof options === "boolean"
			? { unwrapSingleItemArray: options }
			: options;
		const unwrapSingleItemArray = resolvedOptions.unwrapSingleItemArray ?? false;
		const flattenObject = resolvedOptions.flattenObject ?? true;
		const writeArrayCount = resolvedOptions.writeArrayCount ?? true;
		const writePrimitiveValue = resolvedOptions.writePrimitiveValue ?? true;
		const pruneLegacyTopLevelStates = resolvedOptions.pruneLegacyTopLevelStates ?? !flattenObject;
		const normalized = unwrapSingleItemArray ? this.unwrapSingleItemArrays(payload) : payload;

		await this.ensureFolderPath(folder);

		if (normalized !== undefined) {
			const jsonValue = typeof normalized === "string" ? normalized : JSON.stringify(normalized);
			if (jsonValue !== undefined) {
				await this.stateWriter.ensureAndSetValueState(`${folder}.JSON`, {
					name: `${label} JSON`,
					type: "string",
					role: "json"
				}, jsonValue);
			}
		}

		if (normalized && typeof normalized === "object" && !Array.isArray(normalized)) {
			if (!flattenObject) {
				if (pruneLegacyTopLevelStates) {
					await this.pruneExperimentalPayloadStates(folder, Object.keys(normalized));
				}
				return;
			}

			for (const [key, value] of Object.entries(normalized)) {
				await this.processResultKey(folder, key, value);
			}
			return;
		}

		if (Array.isArray(normalized)) {
			if (writeArrayCount) {
				await this.stateWriter.ensureAndSetValueState(`${folder}.count`, {
					name: `${label} Count`,
					type: "number"
				}, normalized.length);
			} else if (pruneLegacyTopLevelStates) {
				await this.pruneExperimentalPayloadStates(folder, ["count"]);
			}
			return;
		}

		if (normalized !== undefined && normalized !== null && writePrimitiveValue) {
			await this.stateWriter.ensureAndSetValueState(`${folder}.value`, {
				name: label,
				type: typeof normalized as ioBroker.CommonType
			}, normalized as ioBroker.StateValue);
		} else if (!writePrimitiveValue && pruneLegacyTopLevelStates) {
			await this.pruneExperimentalPayloadStates(folder, ["value"]);
		}
	}

	private async pruneExperimentalPayloadStates(folder: string, stateKeys: string[]): Promise<void> {
		if (typeof this.deps.adapter.delObjectAsync !== "function") {
			return;
		}

		for (const stateKey of stateKeys) {
			try {
				await this.deps.adapter.delObjectAsync(`Devices.${this.duid}.${folder}.${stateKey}`, { recursive: true });
			} catch {
				// Ignore missing legacy states; the compact layout is best-effort cleanup.
			}
		}
	}

	private async cleanupLegacyPaths(relativePaths: string[]): Promise<void> {
		if (typeof this.deps.adapter.delObjectAsync !== "function") {
			return;
		}

		for (const relativePath of relativePaths) {
			try {
				await this.deps.adapter.delObjectAsync(`Devices.${this.duid}.${relativePath}`, { recursive: true });
			} catch {
				// Ignore missing legacy folders/states.
			}
		}
	}

	private async writeJsonState(relativePath: string, name: string, payload: unknown): Promise<void> {
		const parts = relativePath.split(".");
		if (parts.length > 1) {
			await this.ensureFolderPath(parts.slice(0, -1).join("."));
		}

		const jsonValue = typeof payload === "string" ? payload : JSON.stringify(payload);
		if (jsonValue === undefined) {
			return;
		}

		await this.stateWriter.ensureAndSetValueState(relativePath, {
			name,
			type: "string",
			role: "json"
		}, jsonValue);
	}

	private normalizeNumericParam(params: unknown, method: string): number {
		const rawValue = Array.isArray(params) && params.length === 1 ? params[0] : params;
		const value = Number(rawValue);

		if (!Number.isFinite(value)) {
			throw new Error(`${method} expects a numeric value`);
		}

		return value;
	}

	private normalizeBackWashModeParam(params: unknown, method: string): number {
		const mode = this.normalizeNumericParam(params, method);
		if (![0, 1, 2].includes(mode)) {
			throw new Error(`${method} expects 0 (Smart), 1 (Custom), or 2 (New Smart)`);
		}

		return mode;
	}

	private normalizeBackWashIntervalMinutes(params: unknown, method: string): number {
		const minutes = this.normalizeNumericParam(params, method);
		if (!Number.isInteger(minutes) || minutes < 10 || minutes > 50 || minutes % 5 !== 0) {
			throw new Error(`${method} expects an interval in minutes from 10 to 50 in 5-minute steps`);
		}

		return minutes;
	}

	private normalizeArmMoveParam(params: unknown, method: string): number[] {
		const payload = this.parseJsonParam(params, method);
		const moveParams = typeof payload === "object" && payload !== null && "m" in payload
			? (payload as { m: unknown }).m
			: payload;

		if (!Array.isArray(moveParams)) {
			throw new Error(`${method} expects a JSON array or {"m":[...]}`);
		}

		if (moveParams.length !== 3 && moveParams.length !== 5) {
			throw new Error(`${method} expects an array with 3 or 5 numeric entries`);
		}

		return moveParams.map((entry) => {
			const value = Number(entry);
			if (!Number.isFinite(value)) {
				throw new Error(`${method} expects only numeric move values`);
			}
			return value;
		});
	}

	private normalizeBinarySwitchParam(params: unknown, method: string): number {
		const rawValue = Array.isArray(params) && params.length === 1 ? params[0] : params;
		if (typeof rawValue === "boolean") {
			return rawValue ? 1 : 0;
		}

		const value = Number(rawValue);
		if (value === 0 || value === 1) {
			return value;
		}

		throw new Error(`${method} expects true/false or 0/1`);
	}

	private normalizeBooleanParam(params: unknown, method: string): boolean {
		const rawValue = Array.isArray(params) && params.length === 1 ? params[0] : params;
		if (typeof rawValue === "boolean") {
			return rawValue;
		}

		const value = Number(rawValue);
		if (value === 0 || value === 1) {
			return value === 1;
		}

		throw new Error(`${method} expects true/false or 0/1`);
	}

	private normalizeOptionalBooleanSwitch(value: unknown, label: string): number {
		if (value === undefined || value === null || value === "") {
			return 0;
		}

		if (typeof value === "boolean") {
			return value ? 1 : 0;
		}

		const numericValue = Number(value);
		if (numericValue === 0 || numericValue === 1) {
			return numericValue;
		}

		throw new Error(`${label} expects true/false or 0/1`);
	}

	private normalizeTextParam(params: unknown, method: string): string {
		const rawValue = Array.isArray(params) && params.length === 1 ? params[0] : params;
		const value = String(rawValue ?? "").trim();
		if (!value) {
			throw new Error(`${method} expects a non-empty text value`);
		}

		return value;
	}

	private normalizeVideoQualityParam(params: unknown, method: string): string {
		const quality = this.normalizeTextParam(params, method).toUpperCase();
		if (!(quality in Z70_VIDEO_QUALITY_STATES)) {
			throw new Error(`${method} expects one of SD, HD, FHD, or AUTO`);
		}

		return quality;
	}

	private normalizeProgramNameAndIdParam(params: unknown, method: string): { name: string; program_id: number } {
		const payload = this.normalizeRequiredObjectParam(params, method);
		const name = String(payload.name ?? "").trim();
		const programId = Number(payload.program_id);
		if (!name) {
			throw new Error(`${method} expects a non-empty "name" field`);
		}
		if (!Number.isFinite(programId)) {
			throw new Error(`${method} expects a numeric "program_id" field`);
		}

		return {
			name,
			program_id: programId
		};
	}

	private async normalizeStartProgramParam(params: unknown, method: string): Promise<Record<string, unknown>> {
		const rawValue = Array.isArray(params) && params.length === 1 ? params[0] : params;
		if (typeof rawValue === "number") {
			return this.resolveProgramStartPayload(this.normalizeNumericParam(rawValue, method));
		}

		if (typeof rawValue === "string") {
			const trimmed = rawValue.trim();
			if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
				return this.resolveProgramStartPayload(this.normalizeNumericParam(trimmed, method));
			}
		}

		const payload = this.normalizeRequiredObjectParam(params, method);
		if (Array.isArray(payload.cmd_ids) && payload.cmd_ids.length > 0) {
			return payload;
		}

		if (payload.program_id !== undefined && payload.program_id !== null) {
			return this.resolveProgramStartPayload(Number(payload.program_id));
		}

		throw new Error(`${method} expects either {"cmd_ids":[...]} or a numeric program_id`);
	}

	private normalizePatrolParam(params: unknown, method: string): { map_index: number; points: unknown[] } {
		const payload = this.normalizeRequiredObjectParam(params, method);
		const mapIndex = Number(payload.map_index);
		if (!Number.isFinite(mapIndex)) {
			throw new Error(`${method} expects a numeric "map_index" field`);
		}
		if (!Array.isArray(payload.points)) {
			throw new Error(`${method} expects an array "points" field`);
		}

		return {
			map_index: mapIndex,
			points: payload.points
		};
	}

	private normalizeOptionalObjectParam(params: unknown, method: string): Record<string, unknown> {
		const rawValue = Array.isArray(params) && params.length === 1 ? params[0] : params;

		if (
			rawValue === undefined
			|| rawValue === null
			|| rawValue === ""
			|| rawValue === false
			|| rawValue === true
		) {
			return {};
		}

		const payload = this.parseJsonParam(rawValue, method);
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new Error(`${method} expects an object payload`);
		}

		return payload as Record<string, unknown>;
	}

	private async normalizeCameraPreviewParams(
		params: unknown,
		method: "start_camera_preview" | "stop_camera_preview"
	): Promise<Record<string, unknown>> {
		const payload = this.normalizeOptionalObjectParam(params, method);
		const normalized: Record<string, unknown> = { ...payload };

		if (method === "start_camera_preview") {
			if (typeof normalized.quality !== "string" || !normalized.quality.trim()) {
				normalized.quality = "SD";
			}

			if (typeof normalized.password !== "string" || !normalized.password.trim()) {
				const cameraPin = this.getConfiguredCameraPin();
				if (!cameraPin) {
					throw new Error(`${method} requires a configured cameraPin or an explicit "password" field`);
				}
				normalized.password = cameraPin;
			}
		}

		if (typeof normalized.client_id !== "string" || !normalized.client_id.trim()) {
			const adapterClientId = await this.getAdapterClientId();
			if (!adapterClientId) {
				throw new Error(`${method} requires a valid adapter clientID or an explicit "client_id" field`);
			}
			normalized.client_id = adapterClientId;
		}

		return normalized;
	}

	private normalizeRequiredObjectParam(params: unknown, method: string): Record<string, unknown> {
		const payload = this.parseJsonParam(params, method);
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new Error(`${method} expects an object payload`);
		}

		return payload as Record<string, unknown>;
	}

	private normalizeExhibitionActionParam(params: unknown, method: string): { type: number; value: number } {
		const payload = this.parseJsonParam(params, method);
		if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
			throw new Error(`${method} expects a JSON object with {"type":...,"value":...}`);
		}

		const type = Number((payload as { type?: unknown }).type);
		const value = Number((payload as { value?: unknown }).value);
		if (!Number.isFinite(type) || !Number.isFinite(value)) {
			throw new Error(`${method} expects numeric "type" and "value" fields`);
		}

		return { type, value };
	}

	private normalizeHomeSecPasswordParam(params: unknown, method: string): Record<string, unknown> {
		const payload = this.normalizeRequiredObjectParam(params, method);
		const enablePassword = this.normalizeOptionalBooleanSwitch(payload.enable_password, `${method}.enable_password`);
		const oldPassword = payload.old_password === undefined || payload.old_password === null ? "" : String(payload.old_password);
		const newPassword = payload.new_password === undefined || payload.new_password === null ? "" : String(payload.new_password);

		if (enablePassword === 1 && !newPassword.trim()) {
			throw new Error(`${method} expects a non-empty "new_password" when enable_password is enabled`);
		}

		return {
			enable_password: enablePassword,
			old_password: oldPassword,
			new_password: newPassword
		};
	}

	private parseJsonParam(params: unknown, method: string): unknown {
		const rawValue = Array.isArray(params) && params.length === 1 ? params[0] : params;

		if (rawValue === undefined || rawValue === null || rawValue === "") {
			throw new Error(`${method} expects a JSON payload`);
		}

		if (typeof rawValue === "string") {
			try {
				return JSON.parse(rawValue);
			} catch (e: unknown) {
				throw new Error(`${method} received invalid JSON: ${this.deps.adapter.errorMessage(e)}`);
			}
		}

		return rawValue;
	}

	private normalizeRobotSettingQueryParam(params: unknown, method: string): unknown {
		const rawValue = Array.isArray(params) && params.length === 1 ? params[0] : params;
		if (typeof rawValue === "string") {
			const trimmed = rawValue.trim();
			if (!trimmed) {
				throw new Error(`${method} expects a non-empty setting name`);
			}

			if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
				return { name: trimmed };
			}
		}

		const payload = this.parseJsonParam(rawValue, method);
		if (typeof payload === "string") {
			const name = payload.trim();
			if (!name) {
				throw new Error(`${method} expects a non-empty setting name`);
			}
			return { name };
		}

		if (Array.isArray(payload)) {
			return payload.map((entry, index) => {
				if (typeof entry === "string" && entry.trim()) {
					return { name: entry.trim() };
				}
				if (typeof entry === "object" && entry !== null && !Array.isArray(entry) && typeof (entry as { name?: unknown }).name === "string" && String((entry as { name?: unknown }).name).trim()) {
					return { ...entry, name: String((entry as { name?: unknown }).name).trim() };
				}
				throw new Error(`${method} expects setting names as strings or {"name":...} objects (index ${index})`);
			});
		}

		if (typeof payload === "object" && payload !== null && !Array.isArray(payload)) {
			const name = (payload as { name?: unknown }).name;
			if (typeof name === "string" && name.trim()) {
				return { ...payload, name: name.trim() };
			}
		}

		throw new Error(`${method} expects a setting name string, an object with {"name":...}, or an array of those`);
	}

	private async refreshSmartWashStatus(): Promise<void> {
		try {
			const [response, firmwareFeatures] = await Promise.all([
				this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_smart_wash_params", {}),
				this.getZ70FirmwareFeatures()
			]);
			await this.applySmartWashStatus(response, firmwareFeatures);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Smart Wash: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async applySmartWashStatus(rawValue: unknown, firmwareFeatures: Set<number>): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.cleanupLegacyPaths(["smartWash", "dockingStationStatus.smartWash.raw"]);
		await this.writeExperimentalPayload("dockingStationStatus.smartWash", "Smart Wash", normalized, {
			flattenObject: false
		});
		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const smartWashValue = Number((normalized as { smart_wash?: unknown }).smart_wash);
		const washIntervalSeconds = Number((normalized as { wash_interval?: unknown }).wash_interval);
		if (!Number.isFinite(smartWashValue) || !Number.isFinite(washIntervalSeconds)) {
			return;
		}

		const washIntervalMinutes = Math.trunc(washIntervalSeconds / 60);
		const backWashNewSmartSupported = firmwareFeatures.has(Z70_FEATURE_BACK_WASH_NEW_SMART);
		const backWashMode = this.deriveBackWashMode(smartWashValue, washIntervalMinutes, backWashNewSmartSupported);

		await this.ensureFolderPath("dockingStationStatus.smartWash");
		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.smartWash.smartWash", {
			name: "Smart Wash",
			type: "number",
			states: Z70_SMART_WASH_STATES
		}, smartWashValue);
		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.smartWash.washIntervalSeconds", {
			name: "Wash Interval Seconds",
			type: "number",
			unit: "s"
		}, washIntervalSeconds);
		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.smartWash.washIntervalMinutes", {
			name: "Wash Interval Minutes",
			type: "number",
			unit: "min"
		}, washIntervalMinutes);
		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.smartWash.backWashMode", {
			name: "Back Wash Mode",
			type: "number",
			states: Z70_BACK_WASH_MODE_STATES
		}, backWashMode);
		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.smartWash.backWashNewSmartSupported", {
			name: "Back Wash New Smart Supported",
			type: "boolean"
		}, backWashNewSmartSupported);
	}

	private async refreshWashTowelStatus(): Promise<void> {
		const firmwareFeatures = await this.getZ70FirmwareFeatures();
		const { hotWashTowelSupported, soakAndWashSupported } = await this.applyWashTowelSupportStates(firmwareFeatures);

		await Promise.all([
			this.refreshWashTowelParams(),
			this.refreshWashTowelMode(soakAndWashSupported),
			hotWashTowelSupported ? this.refreshWashTowelTemperature() : Promise.resolve()
		]);
	}

	private async applyWashTowelSupportStates(firmwareFeatures: Set<number>): Promise<{
		hotWashTowelSupported: boolean;
		soakAndWashSupported: boolean;
	}> {
		await this.cleanupLegacyPaths(["washTowel", "dockingStationStatus.washTowel.raw"]);
		const hotWashTowelSupported = firmwareFeatures.has(Z70_FEATURE_HOT_WASH_TOWEL);
		const soakAndWashSupported = firmwareFeatures.has(Z70_FEATURE_SOAK_AND_WASH);

		await this.ensureFolderPath("dockingStationStatus.washTowel");
		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.washTowel.hotWashTowelSupported", {
			name: "Hot Wash Towel Supported",
			type: "boolean"
		}, hotWashTowelSupported);
		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.washTowel.soakAndWashSupported", {
			name: "Soak And Wash Supported",
			type: "boolean"
		}, soakAndWashSupported);

		return { hotWashTowelSupported, soakAndWashSupported };
	}

	private async refreshWashTowelParams(): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_wash_towel_params", []);
			await this.applyWashTowelParamsStatus(response);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Wash Towel Params: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async applyWashTowelParamsStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.writeJsonState("dockingStationStatus.washTowel.paramsJSON", "Wash Towel Params JSON", normalized);
		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const interval = Number((normalized as { interval?: unknown }).interval);
		if (Number.isFinite(interval)) {
			await this.stateWriter.ensureAndSetValueState("dockingStationStatus.washTowel.interval", {
				name: "Wash Towel Interval",
				type: "number"
			}, interval);
		}

		const status = Number((normalized as { status?: unknown }).status);
		if (Number.isFinite(status)) {
			await this.stateWriter.ensureAndSetValueState("dockingStationStatus.washTowel.status", {
				name: "Wash Towel Status",
				type: "number"
			}, status);
		}

		const mode = Number((normalized as { mode?: unknown }).mode);
		if (Number.isFinite(mode)) {
			await this.stateWriter.ensureAndSetValueState("dockingStationStatus.washTowel.paramMode", {
				name: "Wash Towel Param Mode",
				type: "number",
				states: Z70_WASH_TOWEL_MODE_STATES
			}, mode);
		}
	}

	private async refreshWashTowelMode(soakAndWashSupported: boolean): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_wash_towel_mode", {});
			await this.applyWashTowelModeStatus(response, soakAndWashSupported);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Wash Towel Mode: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async applyWashTowelModeStatus(rawValue: unknown, soakAndWashSupported: boolean): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.writeJsonState("dockingStationStatus.washTowel.modeJSON", "Wash Towel Mode JSON", normalized);
		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const mode = Number((normalized as { wash_mode?: unknown }).wash_mode);
		if (!Number.isFinite(mode)) {
			return;
		}

		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.washTowel.mode", {
			name: "Wash Towel Mode",
			type: "number",
			states: Z70_WASH_TOWEL_MODE_STATES
		}, mode);
		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.washTowel.modeLabel", {
			name: "Wash Towel Mode Label",
			type: "string"
		}, this.getWashTowelModeLabel(mode, soakAndWashSupported));
	}

	private async refreshWashTowelTemperature(): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_wash_water_temperature", {});
			await this.applyWashTowelTemperatureStatus(response);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update Wash Towel Temperature: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async applyWashTowelTemperatureStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.writeJsonState("dockingStationStatus.washTowel.temperatureJSON", "Wash Towel Temperature JSON", normalized);
		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const temperature = Number((normalized as { wash_water_temperature?: unknown }).wash_water_temperature);
		if (!Number.isFinite(temperature)) {
			return;
		}

		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.washTowel.temperature", {
			name: "Wash Towel Temperature",
			type: "number",
			states: Z70_WASH_TEMPERATURE_STATES
		}, temperature);
		await this.stateWriter.ensureAndSetValueState("dockingStationStatus.washTowel.temperatureLabel", {
			name: "Wash Towel Temperature Label",
			type: "string"
		}, this.getWashTemperatureLabel(temperature));
	}

	private async refreshBinaryResultState(
		method: string,
		params: unknown,
		groupFolder: string,
		baseKey: string,
		label: string,
		responseKey: string,
		valueStateKey: string,
		valueStateName: string,
		enabledStateKey: string,
		enabledStateName: string
	): Promise<void> {
		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, method, params);
			await this.applyGroupedBinaryResultStatePayload(
				response,
				groupFolder,
				baseKey,
				label,
				responseKey,
				valueStateKey,
				valueStateName,
				enabledStateKey,
				enabledStateName
			);
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Warn",
				this.protocolVersion || undefined,
				undefined,
				`Failed to update ${label}: ${this.deps.adapter.errorMessage(e)}`,
				"warn"
			);
		}
	}

	private async applyGroupedBinaryResultStatePayload(
		rawValue: unknown,
		groupFolder: string,
		baseKey: string,
		label: string,
		responseKey: string,
		valueStateKey: string,
		valueStateName: string,
		enabledStateKey: string,
		enabledStateName: string
	): Promise<void> {
		const normalized = this.normalizeCommandPayload(rawValue);
		await this.cleanupLegacyPaths([`${baseKey}.raw`, baseKey]);
		await this.writeJsonState(`${groupFolder}.${baseKey}JSON`, `${label} JSON`, normalized);

		const value = this.readNumericField(normalized, responseKey);
		if (!Number.isFinite(value)) {
			return;
		}

		await this.ensureFolderPath(groupFolder);
		await this.stateWriter.ensureAndSetValueState(`${groupFolder}.${valueStateKey}`, {
			name: valueStateName,
			type: "number",
			states: Z70_BINARY_STATUS_STATES
		}, value);
		await this.stateWriter.ensureAndSetValueState(`${groupFolder}.${enabledStateKey}`, {
			name: enabledStateName,
			type: "boolean"
		}, value === 1);
	}

	private deriveBackWashMode(smartWashValue: number, washIntervalMinutes: number, backWashNewSmartSupported: boolean): number {
		if (smartWashValue === 1) {
			return 0;
		}

		if (backWashNewSmartSupported) {
			if (smartWashValue === 2) {
				return 2;
			}
			return 1;
		}

		return washIntervalMinutes % 5 === 0 ? 1 : 2;
	}

	private buildSmartWashParams(backWashMode: number, washIntervalMinutes: number): { smart_wash: number; wash_interval: number } {
		return {
			smart_wash: backWashMode === 0 ? 1 : backWashMode === 2 ? 2 : 0,
			wash_interval: washIntervalMinutes * 60
		};
	}

	private async assertBackWashModeSupported(backWashMode: number): Promise<void> {
		if (backWashMode !== 2) {
			return;
		}

		const firmwareFeatures = await this.getZ70FirmwareFeatures();
		if (!firmwareFeatures.has(Z70_FEATURE_BACK_WASH_NEW_SMART)) {
			throw new Error("set_back_wash_mode: New Smart mode is not supported by this robot");
		}
	}

	private async getZ70FirmwareFeatures(): Promise<Set<number>> {
		if (this.z70FirmwareFeatures) {
			return this.z70FirmwareFeatures;
		}

		const cached = this.deps.http_api.getFwFeaturesResult?.(this.duid);
		const cachedIds = this.normalizeFirmwareFeatureIds(cached);
		if (cachedIds.length > 0) {
			this.z70FirmwareFeatures = new Set(cachedIds);
			return this.z70FirmwareFeatures;
		}

		try {
			const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_fw_features", []);
			const featureIds = this.normalizeFirmwareFeatureIds(response);
			this.deps.http_api.storeFwFeaturesResult?.(this.duid, featureIds);
			this.z70FirmwareFeatures = new Set(featureIds);
			return this.z70FirmwareFeatures;
		} catch (e: unknown) {
			this.deps.adapter.rLog(
				"System",
				this.duid,
				"Debug",
				this.protocolVersion || undefined,
				undefined,
				`Failed to fetch Z70 firmware features: ${this.deps.adapter.errorMessage(e)}`,
				"debug"
			);
			return new Set();
		}
	}

	private normalizeFirmwareFeatureIds(rawValue: unknown): number[] {
		const normalized = this.normalizeRpcPayload(rawValue);
		if (!Array.isArray(normalized)) {
			return [];
		}

		return normalized
			.map((entry) => Number(entry))
			.filter((entry) => Number.isInteger(entry));
	}

	private readNumericField(rawValue: unknown, key: string): number {
		if (typeof rawValue !== "object" || rawValue === null || Array.isArray(rawValue)) {
			return Number.NaN;
		}

		return Number((rawValue as Record<string, unknown>)[key]);
	}

	private async readNumericState(relativePath: string, fallback: number): Promise<number> {
		try {
			const state = await this.deps.adapter.getStateAsync(this.stateWriter.path(relativePath));
			const value = Number(state?.val);
			return Number.isFinite(value) ? value : fallback;
		} catch {
			return fallback;
		}
	}

	private async getAdapterClientId(): Promise<string | null> {
		try {
			const state = await this.deps.adapter.getStateAsync("clientID");
			if (typeof state?.val !== "string" || !state.val.trim()) {
				return null;
			}

			return state.val.trim();
		} catch {
			return null;
		}
	}

	private getConfiguredCameraPin(): string | null {
		const adapterConfig = (this.deps.adapter as { config?: { cameraPin?: unknown } }).config;
		if (typeof adapterConfig?.cameraPin !== "string" || !adapterConfig.cameraPin.trim()) {
			return null;
		}

		return adapterConfig.cameraPin.trim();
	}

	private getWashTowelModeLabel(mode: number, soakAndWashSupported: boolean): string {
		switch (mode) {
			case 0:
				return "Quick / Water Saving";
			case 1:
				return "Daily";
			case 2:
				return "Deep";
			case 8:
				return soakAndWashSupported ? "Soak" : "Super Deep";
			case 10:
				return "Smart";
			default:
				return `Wash Mode ${mode}`;
		}
	}

	private getWashTemperatureLabel(temperature: number): string {
		switch (temperature) {
			case 0:
				return "Normal";
			case 1:
				return "Warm";
			case 2:
				return "Hot / High Temperature";
			default:
				return `Temperature ${temperature}`;
		}
	}

	private async ensureFolderPath(relativePath: string): Promise<void> {
		const parts = relativePath.split(".").filter(Boolean);
		let current = "";
		for (const part of parts) {
			current = current ? `${current}.${part}` : part;
			await this.stateWriter.ensureFolder(current);
		}
	}

	private unwrapSingleItemArrays(value: unknown): unknown {
		let current = value;

		while (Array.isArray(current) && current.length === 1) {
			current = current[0];
		}

		return current;
	}

	private normalizeCommandPayload(value: unknown): unknown {
		return this.unwrapSingleItemArrays(this.normalizeRpcPayload(value));
	}

	private normalizeRpcPayload(value: unknown): unknown {
		let current = value;
		while (typeof current === "object" && current !== null && !Array.isArray(current) && "version" in current && "data" in current) {
			current = (current as { data?: unknown }).data;
		}

		if (typeof current === "object" && current !== null && !Array.isArray(current) && "result" in current) {
			current = (current as { result?: unknown }).result;
		}

		return current;
	}

	private async applyTidyUpSummaryStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeRpcPayload(rawValue);
		await this.cleanupLegacyPaths(["tidyUp.summary"]);
		await this.writeJsonState("tidyUp.summaryJSON", "Tidy-Up Summary JSON", normalized);

		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			return;
		}

		const summaryPayload = normalized as {
			tidyup_count?: unknown;
			count?: unknown;
			tidyup_time?: unknown;
			time?: unknown;
			last_start_time?: unknown;
			records?: unknown;
		};
		const tidyUpCount = Number(summaryPayload.tidyup_count ?? summaryPayload.count);
		if (Number.isFinite(tidyUpCount)) {
			await this.stateWriter.ensureAndSetValueState("tidyUp.count", {
				name: "Tidy-Up Count",
				type: "number"
			}, tidyUpCount);
		}

		const tidyUpTime = Number(summaryPayload.tidyup_time ?? summaryPayload.time);
		if (Number.isFinite(tidyUpTime)) {
			await this.stateWriter.ensureAndSetValueState("tidyUp.timeSeconds", {
				name: "Tidy-Up Time",
				type: "number",
				unit: "s"
			}, tidyUpTime);
		}

		const lastStartTime = Number(summaryPayload.last_start_time);
		if (Number.isFinite(lastStartTime)) {
			await this.stateWriter.ensureAndSetValueState("tidyUp.lastStartTime", {
				name: "Tidy-Up Last Start Time",
				type: "number"
			}, lastStartTime);
		}

		const records = summaryPayload.records;
		if (Array.isArray(records)) {
			await this.writeJsonState("tidyUp.recordsJSON", "Tidy-Up Records JSON", records);
			await this.stateWriter.ensureAndSetValueState("tidyUp.recordCount", {
				name: "Tidy-Up Record Count",
				type: "number"
			}, records.length);
		}
	}

	private async applyTidyUpZonesStatus(rawValue: unknown): Promise<void> {
		const normalized = this.normalizeRpcPayload(rawValue);
		await this.cleanupLegacyPaths(["tidyUp.zones"]);
		await this.writeJsonState("tidyUp.zonesJSON", "Tidy-Up Zones JSON", normalized);
		await this.stateWriter.ensureAndSetValueState("tidyUp.zoneCount", {
			name: "Tidy-Up Zone Count",
			type: "number"
		}, Array.isArray(normalized) ? normalized.length : 0);
	}

	private async updateDerivedCommonStatus(rawCommonStatus: unknown): Promise<void> {
		const commonStatus = Number(rawCommonStatus);
		if (!Number.isFinite(commonStatus)) {
			return;
		}

		const mechanicalArmGrabStatus = this.extractCommonStatusBits(commonStatus, 6, 0xf);
		const mechanicalArmGrabMode = this.extractCommonStatusBits(commonStatus, 10, 0x3);
		const mechanicalArmGrabResult = this.extractCommonStatusBits(commonStatus, 12, 0x1);

		const derivedValues: Record<string, boolean | number> = {
			isAutoDeliveryOn: this.extractCommonStatusBits(commonStatus, 1, 0x1) === 1,
			isVocieControlActive: this.extractCommonStatusBits(commonStatus, 2, 0x1) === 1,
			patrolStatus: this.extractCommonStatusBits(commonStatus, 3, 0x3),
			patrolActive: this.extractCommonStatusBits(commonStatus, 3, 0x3) > 0,
			mechanicalTidyUpHouseworkState: this.extractCommonStatusBits(commonStatus, 5, 0x1),
			mechanicalArmGrabStatus,
			mechanicalArmGrabMode,
			mechanicalArmGrabResult,
			assistedTidyUp: this.extractCommonStatusBits(commonStatus, 13, 0x1),
			mechanicalArmActiveStatus: this.extractCommonStatusBits(commonStatus, 14, 0x1),
			canChangeCameraStatus: this.extractCommonStatusBits(commonStatus, 15, 0x1),
			notInGrabMode: mechanicalArmGrabMode === 0,
			manualGrabMode: mechanicalArmGrabMode === 1,
			autoGrabMode: mechanicalArmGrabMode === 2,
			notStart: mechanicalArmGrabStatus === 0,
			isExitingDoor: mechanicalArmGrabStatus === 1,
			isEnteringDoor: mechanicalArmGrabStatus === 2,
			isWaiting: mechanicalArmGrabStatus === 3,
			isGrabing: mechanicalArmGrabStatus === 4,
			isPuttingDown: mechanicalArmGrabStatus === 5,
			isContinue: mechanicalArmGrabStatus === 7,
			isMechanicalModeChanging: mechanicalArmGrabStatus === 8,
			isContinueToGrab: mechanicalArmGrabStatus === 9,
			isContinueToPutDown: mechanicalArmGrabStatus === 10,
			isGrabSucessful: mechanicalArmGrabResult === 1
		};

		for (const [derivedKey, derivedValue] of Object.entries(derivedValues)) {
			await super.processResultKey("deviceStatus", derivedKey, derivedValue);
		}
	}

	private async updateDerivedDockErrorStatus(rawDockErrorStatus: unknown): Promise<void> {
		const dockErrorStatus = Number(rawDockErrorStatus);
		if (!Number.isFinite(dockErrorStatus)) {
			return;
		}

		await super.processResultKey("deviceStatus", "hasDockError", dockErrorStatus > 0);
	}

	private async updateDerivedCameraStatus(rawCameraStatus: unknown): Promise<void> {
		const cameraStatus = Number(rawCameraStatus);
		if (!Number.isFinite(cameraStatus)) {
			return;
		}

		const derivedValues: Record<string, boolean | number> = {
			cameraEnabled: this.extractCommonStatusBits(cameraStatus, 0, 0x1) === 1,
			petModeEnabled: this.extractCommonStatusBits(cameraStatus, 1, 0x1) === 1,
			realTimeMonitorEnabled: this.extractCommonStatusBits(cameraStatus, 2, 0x1) === 1,
			ledSetting: this.extractCommonStatusBits(cameraStatus, 3, 0x3),
			monitorPrivacyPolicyAgreed: this.extractCommonStatusBits(cameraStatus, 5, 0x1) === 1,
			explorationEnabled: this.extractCommonStatusBits(cameraStatus, 6, 0x1) === 1,
			hasShownPetModeAlert: this.extractCommonStatusBits(cameraStatus, 7, 0x1) === 1,
			realVideoSetting: this.extractCommonStatusBits(cameraStatus, 8, 0x3),
			mapObjectPhotoEnabled: this.extractCommonStatusBits(cameraStatus, 10, 0x1) === 1,
			mapObjectPhotoPrivacyPolicyAgreed: this.extractCommonStatusBits(cameraStatus, 11, 0x1) === 1,
			realTimeVideoWithTwoKeysStatus: this.extractCommonStatusBits(cameraStatus, 12, 0x3),
			petSnapshotEnabled: this.extractCommonStatusBits(cameraStatus, 14, 0x1) === 1,
			mechanicalCameraEnabled: this.extractCommonStatusBits(cameraStatus, 15, 0x1) === 1
		};

		for (const [derivedKey, derivedValue] of Object.entries(derivedValues)) {
			await super.processResultKey("deviceStatus", derivedKey, derivedValue);
		}
	}

	private async updateDerivedHomeSecStatus(rawHomeSecStatus: unknown): Promise<void> {
		const homeSecStatus = Number(rawHomeSecStatus);
		if (!Number.isFinite(homeSecStatus)) {
			return;
		}

		this.z70HomeSecStatus = homeSecStatus;

		const derivedValues: Record<string, boolean> = {
			isHomeSecDisconnected: homeSecStatus === 0,
			isHomeSecRunning: homeSecStatus === 1,
			isHomeSecDisconnecting: homeSecStatus === 2,
		};

		for (const [derivedKey, derivedValue] of Object.entries(derivedValues)) {
			await super.processResultKey("deviceStatus", derivedKey, derivedValue);
		}

		await this.refreshDerivedHomeSecPreviewState();
	}

	private async updateDerivedRobotState(rawState: unknown): Promise<void> {
		const state = Number(rawState);
		if (!Number.isFinite(state)) {
			return;
		}

		this.z70RobotState = state;

		await super.processResultKey("deviceStatus", "isEmergencyStopStatus", state === 40);
		await super.processResultKey("deviceStatus", "isArmResetting", state === 41);
		await super.processResultKey("deviceStatus", "isProgramMode", state === 42);
		await this.refreshDerivedRobotControlStates();
	}

	private async updateDerivedMechanicalArmErrorState(rawErrorCode: unknown): Promise<void> {
		const errorCode = Number(rawErrorCode);
		if (!Number.isFinite(errorCode)) {
			return;
		}

		await super.processResultKey("deviceStatus", "hasMechanicalArmEmergencyError", Z70_MECHANICAL_ARM_EMERGENCY_ERROR_CODES.has(errorCode));
	}

	private async updateDerivedTaskStatus(prefix: "mechArmTidyup" | "mechArmMove", rawTaskStatus: unknown): Promise<void> {
		const taskStatus = Number(rawTaskStatus);
		if (!Number.isFinite(taskStatus)) {
			return;
		}

		const taskState = taskStatus & 0xff;
		const objectType = (taskStatus >>> 8) & 0xff;
		const taskStateKey = `${prefix}TaskState`;
		const objectTypeKey = `${prefix}ObjectType`;
		const objectLabelKey = `${prefix}ObjectLabel`;
		const activeKey = prefix === "mechArmTidyup" ? "isMechArmDoingTidyupTask" : "isMechArmDoingMoveTask";

		await super.processResultKey("deviceStatus", taskStateKey, taskState);
		await super.processResultKey("deviceStatus", objectTypeKey, objectType);
		await super.processResultKey("deviceStatus", objectLabelKey, this.getZ70ObjectTypeLabel(objectType));
		await super.processResultKey("deviceStatus", activeKey, taskState === 1);
	}

	private async updateDerivedBackType(rawBackType: unknown): Promise<void> {
		const backType = Number(rawBackType);
		if (!Number.isFinite(backType)) {
			return;
		}

		await super.processResultKey(
			"deviceStatus",
			"backTypeLabel",
			Z70_BACK_TYPE_LABELS[backType] ?? `Back Type ${backType}`
		);
	}

	private async updateDerivedWashPhase(rawWashPhase: unknown): Promise<void> {
		const washPhase = Number(rawWashPhase);
		if (!Number.isFinite(washPhase)) {
			return;
		}

		await super.processResultKey(
			"deviceStatus",
			"washPhaseLabel",
			Z70_WASH_PHASE_LABELS[washPhase] ?? `Wash Phase ${washPhase}`
		);
	}

	private async updateDerivedWashStatus(rawWashStatus: unknown): Promise<void> {
		const washStatus = Number(rawWashStatus);
		if (!Number.isFinite(washStatus)) {
			return;
		}

		const washingTaskStatus = washStatus & 0xff;
		const washingMode = (washStatus >>> 8) & 0xff;
		const derivedValues: Record<string, boolean | number | string> = {
			washingTaskStatus,
			washingMode,
			washingModeLabel: Z70_WASHING_MODE_LABELS[washingMode] ?? `Mode ${washingMode}`,
			isCleanCarouselSelfCleaning: washingMode === 6,
			isWaterDraining: washingMode === 7,
			isPumpingWater: washingMode === 11,
		};

		for (const [derivedKey, derivedValue] of Object.entries(derivedValues)) {
			await super.processResultKey("deviceStatus", derivedKey, derivedValue);
		}
	}

	private async updateDerivedWaterShortageStatus(rawWaterShortageStatus: unknown): Promise<void> {
		const waterShortageStatus = Number(rawWaterShortageStatus);
		if (!Number.isFinite(waterShortageStatus)) {
			return;
		}

		await super.processResultKey("deviceStatus", "waterShortageActive", waterShortageStatus !== 0);
	}

	private async refreshDerivedSwitchStatus(): Promise<void> {
		if (this.z70SwitchStatus === null) {
			return;
		}

		const switchStatus = this.z70SwitchStatus;
		const derivedValues: Record<string, boolean> = {
			offlineMapEnabled: (switchStatus & 0x1) !== 0,
			hasCleanFluidModule: this.z70CleanFluidStatus === 1 || (switchStatus & 0x2) !== 0,
			isSettingCarpetFirstOn: (switchStatus & 0x8) !== 0,
			isSettingDirtyReplenishOn: (switchStatus & 0x10) !== 0,
			isSettingCarpetCrossOn: (switchStatus & 0x20) !== 0,
		};

		for (const [derivedKey, derivedValue] of Object.entries(derivedValues)) {
			await super.processResultKey("deviceStatus", derivedKey, derivedValue);
		}
	}

	private async refreshDerivedRobotControlStates(): Promise<void> {
		const state = this.z70RobotState;
		const isLocked = this.z70LockStatus === 1;
		const isLocating = this.z70IsLocating;
		const voiceChatActive = this.z70VoiceChatActive;
		const isDrying = this.z70DryStatus === 1;
		const isUpdating = state === 14;
		const isSpotCleaning = state === 11;
		const isZonedCleaning = state === 17;
		const isSegmentCleaning = state === 18;
		const isCollectingDust = state === 22;
		const isWashing = state === 23 || state === 25;
		const isBackDockWashingDusterMode = state === 26;
		const isRemoteMode = state === 7;
		const isGotoTarget = state === 16;
		const isEggAttack = state === 30;
		const isSetupMop = state === 33;
		const isTeardownMop = state === 34;
		const isDance = state === 37;
		const isTidyUpHouseWork = state === 38;
		const isExitingDock = state === 15 && this.z70ExitDock === 1;
		// The split bundle references AIR_DRYING_STOPPING in button gating, but it never exposes a
		// numeric raw-state mapping for it. Keep the port faithful to the observable state machine.
		const isAirDryingStopping = false;
		const dockCanStopWash = isWashing && this.z70WashPhase !== 17;
		const isInBackDockTask = state === 6 || isBackDockWashingDusterMode || isCollectingDust || isDrying;

		const derivedValues: Record<string, boolean> = {
			isLocked,
			isDrying,
			isExitingDock,
			isBackDockWashingDusterMode,
			isWashing,
			isSpotCleaning,
			isZonedCleaning,
			isSegmentCleaning,
			dockCanStopCollectDust: isCollectingDust,
			dockCanStopWash,
			isInBackDockTask,
			isBackDockTaskResumeable: state === 10 || state === 2 || state === 12,
			isReadyToCmd: state === 2 || state === 3 || state === 12,
			canPauseByToast: isCollectingDust || isWashing || isSetupMop || isTeardownMop || state === 28,
			isTidyUpHouseWork,
			isHomeButtonsEnabled:
				!isUpdating
				&& !isLocked
				&& !isLocating
				&& !isCollectingDust
				&& !isWashing
				&& !isAirDryingStopping
				&& !isRemoteMode
				&& !isGotoTarget
				&& !voiceChatActive
				&& !isEggAttack
				&& !isSetupMop
				&& !isTeardownMop
				&& !isDance,
			isHomeModeControlButtonsEnabled:
				!isUpdating
				&& !isLocked
				&& !isLocating
				&& !isAirDryingStopping
				&& !isRemoteMode
				&& !isGotoTarget
				&& !voiceChatActive
				&& !isEggAttack
				&& !isTidyUpHouseWork,
			isHomeMapEditButtonsEnabled:
				!isUpdating
				&& !isLocked
				&& !isLocating
				&& !isAirDryingStopping
				&& !isRemoteMode
				&& !isGotoTarget
				&& !voiceChatActive
				&& !isEggAttack,
			isHomeSettingButtonEnabled: !isUpdating && !isLocked && !voiceChatActive
		};

		for (const [derivedKey, derivedValue] of Object.entries(derivedValues)) {
			await super.processResultKey("deviceStatus", derivedKey, derivedValue);
		}
	}

	private getZ70ObjectTypeLabel(objectType: number): string {
		switch (objectType) {
			case 2:
				return "Shoes";
			case 34:
				// The plugin exposes type 34 as the Fabrics group and also keeps a sock-specific backup label.
				return "Fabrics / Sock";
			case 51:
				return "Clumps / Curled Fabric";
			default:
				return objectType === 0 ? "None" : `Object Type ${objectType}`;
		}
	}

	private normalizeProgramRuntimeCommands(rawValue: unknown): Array<Record<string, unknown>> {
		if (!Array.isArray(rawValue)) {
			return [];
		}

		return rawValue.map((command) => this.normalizeProgramRuntimeCommand(command));
	}

	private normalizeProgramSummaryEntries(rawValue: unknown): Array<Record<string, unknown>> {
		if (!Array.isArray(rawValue)) {
			return [];
		}

		return rawValue
			.filter((entry): entry is Record<string, unknown> => typeof entry === "object" && entry !== null && !Array.isArray(entry))
			.map((entry) => {
				const programType = this.readNumericField(entry, "program_type");
				if (!Number.isFinite(programType)) {
					return { ...entry };
				}

				return {
					...entry,
					program_type: programType,
					programTypeLabel: Z70_PROGRAM_TYPE_STATES[programType] ?? `Type ${programType}`
				};
			});
	}

	private normalizeProgramDetailEntry(rawValue: unknown, summaryEntry?: Record<string, unknown>): Record<string, unknown> {
		const summary = summaryEntry && typeof summaryEntry === "object" && !Array.isArray(summaryEntry) ? summaryEntry : {};
		const payload = typeof rawValue === "object" && rawValue !== null && !Array.isArray(rawValue)
			? rawValue as Record<string, unknown>
			: {};
		const normalized: Record<string, unknown> = {
			...summary,
			...payload
		};
		const programId = this.readNumericField(payload, "program_id") || this.readNumericField(summary, "program_id");
		const programType = this.readNumericField(payload, "program_type") || this.readNumericField(summary, "program_type");
		const cmdIds = Array.isArray(payload.cmd_ids)
			? payload.cmd_ids
			: Array.isArray(summary.cmd_ids)
				? summary.cmd_ids
				: [];
		const blocks = payload.blocks !== undefined ? payload.blocks : summary.blocks;
		const name = typeof normalized.name === "string" ? normalized.name.trim() : "";
		const description = typeof normalized.description === "string" ? normalized.description : "";

		if (programId > 0) {
			normalized.program_id = programId;
		}

		if (Number.isFinite(programType) && programType > 0) {
			normalized.program_type = programType;
			normalized.programTypeLabel = Z70_PROGRAM_TYPE_STATES[programType] ?? `Type ${programType}`;
			normalized.isOfficialProgram = programType === 2;
			normalized.isMyProgram = programType === 1;
		}

		if (name) {
			normalized.name = name;
		}

		if (description || normalized.description !== undefined) {
			normalized.description = description;
		}

		const blockCount = this.countProgramBlockNodes(blocks);
		normalized.cmd_ids = cmdIds;
		normalized.commandCount = cmdIds.length;
		normalized.blocks = blocks;
		normalized.blockCount = blockCount;
		normalized.hasBlocks = blockCount > 0;

		return normalized;
	}

	private countProgramBlockNodes(rawValue: unknown): number {
		if (Array.isArray(rawValue)) {
			return rawValue.reduce((sum, entry) => sum + this.countProgramBlockNodes(entry), rawValue.length);
		}

		if (typeof rawValue !== "object" || rawValue === null) {
			return 0;
		}

		const nestedBlocks = (rawValue as { blocks?: unknown }).blocks;
		if (!Array.isArray(nestedBlocks)) {
			return 0;
		}

		return nestedBlocks.reduce((sum, entry) => sum + this.countProgramBlockNodes(entry), nestedBlocks.length);
	}

	private async resolveProgramStartPayload(programId: number): Promise<Record<string, unknown>> {
		if (!Number.isFinite(programId)) {
			throw new Error("app_start_program expects a valid numeric program_id");
		}

		const response = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "app_get_program", { program_id: programId });
		const normalized = this.unwrapSingleItemArrays(this.normalizeRpcPayload(response));
		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			throw new Error(`app_get_program returned no usable payload for program_id ${programId}`);
		}

		const cmdIds = (normalized as { cmd_ids?: unknown }).cmd_ids;
		if (!Array.isArray(cmdIds) || cmdIds.length < 1) {
			throw new Error(`app_get_program returned no cmd_ids for program_id ${programId}`);
		}

		return { cmd_ids: cmdIds };
	}

	private normalizeProgramRuntimeCommand(rawValue: unknown): Record<string, unknown> {
		if (typeof rawValue !== "object" || rawValue === null || Array.isArray(rawValue)) {
			return { value: rawValue };
		}

		const payload = { ...(rawValue as Record<string, unknown>) };
		const cmdId = typeof payload.cmd_id === "string" ? payload.cmd_id : "";
		const result = Number(payload.result);
		const normalized: Record<string, unknown> = {
			...payload,
			cmdId,
			cmdText: this.getProgramRuntimeCommandText(payload, cmdId),
			result: Number.isFinite(result) ? result : payload.result
		};

		if (Number.isFinite(result)) {
			normalized.statusText = this.getProgramRuntimeResultLabel(result);
		}

		return normalized;
	}

	private getProgramRuntimeCommandText(command: Record<string, unknown>, cmdId: string): string {
		if (cmdId === "arm_joints") {
			const direction = Number(command.direction);
			return Z70_PROGRAM_ARM_DIRECTION_LABELS[direction] ?? Z70_PROGRAM_COMMAND_LABELS[cmdId] ?? cmdId;
		}

		if (cmdId === "arm_move") {
			return this.getProgramArmMoveCommandText(command);
		}

		const explicitText = typeof command.cmdText === "string" ? command.cmdText.trim() : "";
		const baseText = explicitText || Z70_PROGRAM_COMMAND_LABELS[cmdId] || cmdId || "Unknown Command";

		if (cmdId === "delay") {
			return `${baseText} ${this.readOptionalProgramNumber(command.time)}s`;
		}

		if (cmdId === "turn_right" || cmdId === "turn_left") {
			return `${baseText} ${this.readOptionalProgramNumber(command.angle)}°`;
		}

		if (cmdId === "move_forward" || cmdId === "move_backward") {
			return `${baseText} ${this.readOptionalProgramNumber(command.time)}s @ ${this.readOptionalProgramNumber(command.speed)}`;
		}

		return baseText;
	}

	private getProgramArmMoveCommandText(command: Record<string, unknown>): string {
		const rawValue = command.value;
		const step = this.readOptionalProgramNumber(command.step);
		if (!Array.isArray(rawValue)) {
			return Z70_PROGRAM_COMMAND_LABELS.arm_move;
		}

		const parts = rawValue
			.map((entry, index) => this.getProgramArmMoveAxisText(index, Number(entry), step))
			.filter((entry): entry is string => Boolean(entry));

		return parts.length > 0 ? parts.join(" | ") : Z70_PROGRAM_COMMAND_LABELS.arm_move;
	}

	private getProgramArmMoveAxisText(axisIndex: number, rawValue: number, step: number): string | null {
		if (!Number.isFinite(rawValue) || rawValue === 0) {
			return null;
		}

		const axis = Z70_PROGRAM_ARM_MOVE_AXES[axisIndex] ?? `M${axisIndex + 3}`;
		if (axis === "M6") {
			if (rawValue === 1) {
				return "Release Gripper";
			}
			if (rawValue === 2) {
				return "Grip Gripper";
			}
			return axis;
		}

		if (rawValue === 1) {
			return `${axis} Up ${step}`;
		}
		if (rawValue === 2) {
			return `${axis} Down ${step}`;
		}

		return axis;
	}

	private readOptionalProgramNumber(value: unknown): number {
		const numericValue = Number(value);
		return Number.isFinite(numericValue) ? numericValue : 0;
	}

	private async refreshDerivedHomeSecPreviewState(): Promise<void> {
		const clientId = this.z70HomeSecClientId;
		const hasClientId = typeof clientId === "string" && clientId.length > 0;
		const adapterClientId = await this.getAdapterClientId();
		const isFreeControl = hasClientId && clientId === "none";
		const isControlledByCurrentClient = hasClientId && adapterClientId !== null && clientId === adapterClientId;

		if (hasClientId) {
			await super.processResultKey("deviceStatus", "homeSecClientId", clientId);
		}

		await super.processResultKey("deviceStatus", "isHomeSecFreeControl", isFreeControl);
		await super.processResultKey("deviceStatus", "isHomeSecControlledByCurrentClient", isControlledByCurrentClient);

		if (this.z70HomeSecStatus === null) {
			return;
		}

		const homeSecStatus = this.z70HomeSecStatus;
		await super.processResultKey("deviceStatus", "isHomeSecPreviewStartReady", homeSecStatus === 0);
		await super.processResultKey("deviceStatus", "isHomeSecPreviewRetryPending", homeSecStatus === 2);
		await super.processResultKey("deviceStatus", "isHomeSecPreviewOwnedByCurrentClient", homeSecStatus === 1 && isControlledByCurrentClient);
		await super.processResultKey("deviceStatus", "isHomeSecPreviewBlockedByOtherClient", homeSecStatus === 1 && hasClientId && clientId !== "none" && !isControlledByCurrentClient);
	}

	private getProgramRuntimeResultLabel(result: number): string {
		switch (result) {
			case -2:
				return "Execution Failure 2";
			case -1:
				return "Execution Failure";
			case 0:
				return "Successful Execution";
			case 1:
				return "Waiting For Execution";
			case 2:
				return "Executing";
			default:
				return `Result ${result}`;
		}
	}

	private getProgramStateLabel(programState: number): string {
		switch (programState) {
			case 0:
				return "Without Tasks";
			case 1:
				return "Starting";
			case 2:
				return "Executing";
			case 3:
				return "Error";
			default:
				return `Program State ${programState}`;
		}
	}

	private extractCommonStatusBits(value: number, shift: number, mask: number): number {
		return (value >>> shift) & mask;
	}
}
