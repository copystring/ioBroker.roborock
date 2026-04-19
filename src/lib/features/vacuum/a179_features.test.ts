import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FeatureDependencies } from "../baseDeviceFeatures";
import { A179Features } from "./a179_features";
import { VACUUM_CONSTANTS } from "./vacuumConstants";

describe("A179Features", () => {
	let adapterMock: any;
	let depsMock: FeatureDependencies;
	let requestsHandlerMock: { sendRequest: ReturnType<typeof vi.fn> };

	beforeEach(() => {
		requestsHandlerMock = {
			sendRequest: vi.fn().mockResolvedValue({})
		};

		adapterMock = {
			log: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn(), silly: vi.fn() },
			setStateChanged: vi.fn().mockResolvedValue(undefined),
			setState: vi.fn(),
			delObjectAsync: vi.fn().mockResolvedValue(undefined),
			ensureState: vi.fn().mockResolvedValue(undefined),
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			getStateAsync: vi.fn().mockImplementation(async (id: string) => id === "clientID" ? { val: "client-123" } : undefined),
			getObjectAsync: vi.fn().mockResolvedValue(undefined),
			extendObject: vi.fn().mockResolvedValue(undefined),
			setObject: vi.fn().mockResolvedValue(undefined),
			setObjectNotExistsAsync: vi.fn().mockResolvedValue(undefined),
			requestsHandler: requestsHandlerMock,
			getDeviceProtocolVersion: vi.fn().mockResolvedValue("1.0"),
			translations: {},
			http_api: {
				getFwFeaturesResult: vi.fn(),
				storeFwFeaturesResult: vi.fn(),
				getRobotModel: vi.fn().mockReturnValue("roborock.vacuum.a179"),
				getDevices: vi.fn().mockReturnValue([])
			},
			rLog: vi.fn(),
			errorMessage: vi.fn().mockImplementation((error: unknown) => error instanceof Error ? error.message : String(error)),
			translationManager: {
				get: vi.fn().mockImplementation((key, def) => def || key),
			},
			config: {
				cameraPin: "9876"
			},
		};

		depsMock = {
			adapter: adapterMock,
			http_api: adapterMock.http_api,
			ensureState: vi.fn().mockResolvedValue(undefined),
			ensureFolder: vi.fn().mockResolvedValue(undefined),
			log: adapterMock.log,
			config: { staticFeatures: [] }
		} as unknown as FeatureDependencies;
	});

	it("registers Z70 actions under commands and moves get/set RPCs into grouped folders", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await feature.setupProtocolFeatures();

		expect(feature.commands).toMatchObject({
			set_water_box_distance_off: expect.objectContaining({ type: "number", min: 1, max: 30 }),
			app_empty_inbuilt_water_tank: expect.objectContaining({ type: "boolean", role: "button" }),
			app_arm_out_compartment: expect.objectContaining({ type: "boolean", role: "button" }),
			app_arm_direction_move: expect.objectContaining({ type: "number", states: { 1: "Up", 2: "Down", 3: "Go", 4: "Back" } }),
			app_arm_move: expect.objectContaining({ type: "json", role: "json" }),
			app_stop_grasp: expect.objectContaining({ type: "boolean", role: "button" }),
			app_rc_roller_mop_cover: expect.objectContaining({ type: "number", states: { 0: "Stretch Out", 1: "Retract" } }),
			app_rc_roller_mop: expect.objectContaining({ type: "number", states: { 0: "In", 1: "Out" } }),
			app_rc_lds_lifting: expect.objectContaining({ type: "number", states: { 0: "Lower", 1: "Lift Up" } }),
			app_wakeup_robot: expect.objectContaining({ type: "boolean", role: "button" }),
			app_segment_clean_subdivision: expect.objectContaining({ type: "json", role: "json" }),
			app_zoned_clean_subdivision: expect.objectContaining({ type: "json", role: "json" }),
			app_ignore_dirty_objects: expect.objectContaining({ type: "json", role: "json" }),
			app_start_build_map: expect.objectContaining({ type: "boolean", role: "button" }),
			app_resume_build_map: expect.objectContaining({ type: "boolean", role: "button" }),
			app_start_collect_dust: expect.objectContaining({ type: "boolean", role: "button" }),
			app_stop_collect_dust: expect.objectContaining({ type: "boolean", role: "button" }),
			app_switch_dock_cool_fan: expect.objectContaining({ type: "boolean", role: "switch.enable" }),
			app_delete_wifi: expect.objectContaining({ type: "number", role: "value" }),
			app_pick_up_enter_exit: expect.objectContaining({ type: "number", states: { 0: "Exit / Off", 1: "Manual Mode", 2: "Auto Mode" } }),
			app_pick_up: expect.objectContaining({ type: "number", states: { 0: "Auto Grab", 1: "Manual Grab" } }),
			app_put_down: expect.objectContaining({ type: "number", states: { 0: "Put Down" } }),
			app_change_camera: expect.objectContaining({ type: "number", states: { 0: "Disable Mechanical Camera", 1: "Enable Mechanical Camera" } }),
			start_camera_preview: expect.objectContaining({ type: "json", role: "json" }),
			stop_camera_preview: expect.objectContaining({ type: "json", role: "json" }),
			app_exhibition_enter_exit: expect.objectContaining({ type: "number", states: { 0: "Exit", 1: "Enter" } }),
			app_exhibition_action: expect.objectContaining({ type: "json", role: "json" }),
			app_start_tidy_up: expect.objectContaining({ type: "json" }),
			app_delete_tidy_up_record: expect.objectContaining({ type: "number" }),
			start_wash_then_charge: expect.objectContaining({ type: "boolean", role: "button" }),
			app_program_enter_exit: expect.objectContaining({ type: "number", states: { 0: "Exit", 1: "Enter" } }),
			app_copy_program: expect.objectContaining({ type: "json", role: "json" }),
			app_delete_program: expect.objectContaining({ type: "number", role: "value" }),
			app_modify_program: expect.objectContaining({ type: "json", role: "json" }),
			app_save_program: expect.objectContaining({ type: "json", role: "json" }),
			app_start_program: expect.objectContaining({ type: "json", role: "json" }),
			app_start_patrol: expect.objectContaining({ type: "json", role: "json" }),
			app_resume_patrol: expect.objectContaining({ type: "boolean", role: "button" }),
			app_start_pet_patrol: expect.objectContaining({ type: "boolean", role: "button" }),
			app_empty_rinse_tank_water: expect.objectContaining({ type: "boolean", role: "button" }),
			app_start_easter_egg: expect.objectContaining({ type: "boolean", role: "button" }),
			start_new_easter_egg: expect.objectContaining({ type: "number", states: { 0: "Dance" } }),
			start_voice_chat: expect.objectContaining({ type: "json", role: "json" }),
			stop_voice_chat: expect.objectContaining({ type: "boolean", role: "button" }),
			app_start_replenish_clean_area: expect.objectContaining({ type: "json", role: "json" }),
			app_skip_current_cleaning_area: expect.objectContaining({ type: "json", role: "json" }),
			set_voice_chat_volume: expect.objectContaining({ type: "number", role: "value" }),
		});

		expect(feature.commands).not.toHaveProperty("get_camera_status");
		expect(feature.commands).not.toHaveProperty("set_camera_status");
		expect(feature.commands).not.toHaveProperty("app_get_arm_joints_data");
		expect(feature.commands).not.toHaveProperty("app_get_program");
		expect(feature.commands).not.toHaveProperty("app_set_robot_setting");
		expect(feature.commands).not.toHaveProperty("get_dock_info");
		expect(feature.commands).not.toHaveProperty("set_child_lock_status");

		expect(feature.extraCommandGroups.queries).toMatchObject({
			get_camera_status: expect.objectContaining({ type: "boolean", role: "button" }),
			app_get_program: expect.objectContaining({ type: "number", role: "value" }),
			app_get_program_runtime: expect.objectContaining({ type: "boolean", role: "button" }),
			app_tidy_up_record_summary: expect.objectContaining({ type: "boolean", role: "button" }),
			get_dock_info: expect.objectContaining({ type: "boolean", role: "button" }),
			get_homesec_connect_status: expect.objectContaining({ type: "boolean", role: "button" }),
			check_homesec_password: expect.objectContaining({ type: "string", role: "text" }),
		});

		expect(feature.extraCommandGroups.settings).toMatchObject({
			set_camera_status: expect.objectContaining({ type: "number", role: "value" }),
			app_set_robot_setting: expect.objectContaining({ type: "json", role: "json" }),
			set_child_lock_status: expect.objectContaining({ type: "boolean", role: "switch.enable" }),
			set_map_beautification_status: expect.objectContaining({ type: "boolean", role: "switch.enable" }),
			switch_video_quality: expect.objectContaining({ type: "string", states: { SD: "SD", HD: "HD", FHD: "FHD", AUTO: "AUTO" } }),
			enable_homesec_voice: expect.objectContaining({ type: "boolean", role: "switch.enable" }),
		});
	});

	it("creates grouped writable folders and removes legacy get/set states from commands", async () => {
		const feature = new A179Features(depsMock, "duid1");

		adapterMock.getObjectAsync.mockImplementation(async (id: string) => {
			if (id === "Devices.duid1.commands.get_camera_status" || id === "Devices.duid1.commands.set_camera_status") {
				return { _id: id, type: "state", common: {}, native: {} };
			}
			return undefined;
		});

		await feature.setupProtocolFeatures();
		await feature.createCommandObjects();

		expect(depsMock.ensureFolder).toHaveBeenCalledWith("Devices.duid1.commands");
		expect(depsMock.ensureFolder).toHaveBeenCalledWith("Devices.duid1.queries");
		expect(depsMock.ensureFolder).toHaveBeenCalledWith("Devices.duid1.settings");
		expect(adapterMock.delObjectAsync).toHaveBeenCalledWith("Devices.duid1.commands.get_camera_status");
		expect(adapterMock.delObjectAsync).toHaveBeenCalledWith("Devices.duid1.commands.set_camera_status");
	});

	it("maps Z70 command parameters to the app payload shape", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await expect(feature.getCommandParams("app_empty_inbuilt_water_tank", true)).resolves.toEqual({
			method: "app_empty_inbuilt_water_tank",
			params: {}
		});
		await expect(feature.getCommandParams("app_keep_easter_egg", true)).resolves.toEqual({
			method: "app_keep_easter_egg",
			params: {}
		});
		await expect(feature.getCommandParams("app_open_gripper", true)).resolves.toEqual({
			method: "app_open_gripper",
			params: {}
		});
		await expect(feature.getCommandParams("app_arm_direction_move", "2")).resolves.toEqual({
			method: "app_arm_direction_move",
			params: { direction: 2 }
		});
		await expect(feature.getCommandParams("app_arm_move", "[1,2,3]")).resolves.toEqual({
			method: "app_arm_move",
			params: { m: [1, 2, 3] }
		});
		await expect(feature.getCommandParams("app_arm_move_preset", "[0,1,0]")).resolves.toEqual({
			method: "app_arm_move",
			params: { m: [0, 1, 0] }
		});
		await expect(feature.getCommandParams("app_arm_recover", true)).resolves.toEqual({
			method: "app_arm_recover",
			params: {}
		});
		await expect(feature.getCommandParams("app_arm_recover_payload", '{"confirm":true}')).resolves.toEqual({
			method: "app_arm_recover",
			params: { confirm: true }
		});
		await expect(feature.getCommandParams("app_get_arm_joints_data", true)).resolves.toEqual({
			method: "app_get_arm_joints_data",
			params: {}
		});
		await expect(feature.getCommandParams("app_stop_grasp", true)).resolves.toEqual({
			method: "app_stop_grasp",
			params: []
		});
		await expect(feature.getCommandParams("app_rc_lds_lifting", 1)).resolves.toEqual({
			method: "app_rc_lds_lifting",
			params: { lift_up: 1 }
		});
		await expect(feature.getCommandParams("app_wakeup_robot", true)).resolves.toEqual({
			method: "app_wakeup_robot",
			params: []
		});
		await expect(feature.getCommandParams("app_rc_roller_mop_cover", "2")).resolves.toEqual({
			method: "app_rc_roller_mop_cover",
			params: { cmd: 2 }
		});
		await expect(feature.getCommandParams("app_rc_roller_mop", 1)).resolves.toEqual({
			method: "app_rc_roller_mop",
			params: { cmd: 1 }
		});
		await expect(feature.getCommandParams("app_pick_up_enter_exit", "1")).resolves.toEqual({
			method: "app_pick_up_enter_exit",
			params: { flag: 1 }
		});
		await expect(feature.getCommandParams("app_pick_up", 1)).resolves.toEqual({
			method: "app_pick_up",
			params: { flag: 1 }
		});
		await expect(feature.getCommandParams("app_put_down", "0")).resolves.toEqual({
			method: "app_put_down",
			params: { flag: 0 }
		});
		await expect(feature.getCommandParams("app_change_camera", 1)).resolves.toEqual({
			method: "app_change_camera",
			params: { flag: 1 }
		});
		await expect(feature.getCommandParams("get_camera_status", true)).resolves.toEqual({
			method: "get_camera_status",
			params: []
		});
		await expect(feature.getCommandParams("set_camera_status", 58805)).resolves.toEqual({
			method: "set_camera_status",
			params: [58805]
		});
		await expect(feature.getCommandParams("start_camera_preview", '{"password":"1234","client_id":"demo","quality":"HD"}')).resolves.toEqual({
			method: "start_camera_preview",
			params: { password: "1234", client_id: "demo", quality: "HD" }
		});
		await expect(feature.getCommandParams("stop_camera_preview", '{"client_id":"demo"}')).resolves.toEqual({
			method: "stop_camera_preview",
			params: { client_id: "demo" }
		});
		await expect(feature.getCommandParams("switch_video_quality", "fhd")).resolves.toEqual({
			method: "switch_video_quality",
			params: { quality: "FHD" }
		});
		await expect(feature.getCommandParams("app_exhibition_enter_exit", 1)).resolves.toEqual({
			method: "app_exhibition_enter_exit",
			params: { flag: 1 }
		});
		await expect(feature.getCommandParams("app_exhibition_action", '{"type":8,"value":1}')).resolves.toEqual({
			method: "app_exhibition_action",
			params: { type: 8, value: 1 }
		});
		await expect(feature.getCommandParams("app_set_tidy_up_zones", '{"zones":[{"id":1}]}')).resolves.toEqual({
			method: "app_set_tidy_up_zones",
			params: { zones: [{ id: 1 }] }
		});
		await expect(feature.getCommandParams("app_set_door_sill_blocks", '[{"id":1}]')).resolves.toEqual({
			method: "app_set_door_sill_blocks",
			params: [{ id: 1 }]
		});
		await expect(feature.getCommandParams("app_set_beautify_blocks", '{"erase":[1]}')).resolves.toEqual({
			method: "app_set_beautify_blocks",
			params: { erase: [1] }
		});
		await expect(feature.getCommandParams("app_set_smart_door_sill", '{"enabled":true}')).resolves.toEqual({
			method: "app_set_smart_door_sill",
			params: { enabled: true }
		});
		await expect(feature.getCommandParams("app_get_segment_clean_subdivision", '{"segment_id":12}')).resolves.toEqual({
			method: "app_get_segment_clean_subdivision",
			params: { segment_id: 12 }
		});
		await expect(feature.getCommandParams("app_segment_clean_subdivision", '{"segment_id":12,"mode":3}')).resolves.toEqual({
			method: "app_segment_clean_subdivision",
			params: { segment_id: 12, mode: 3 }
		});
		await expect(feature.getCommandParams("app_get_zoned_clean_subdivision", '{"zones":[[1,2,3,4]]}')).resolves.toEqual({
			method: "app_get_zoned_clean_subdivision",
			params: { zones: [[1, 2, 3, 4]] }
		});
		await expect(feature.getCommandParams("app_zoned_clean_subdivision", '{"zones":[[1,2,3,4]],"mode":2}')).resolves.toEqual({
			method: "app_zoned_clean_subdivision",
			params: { zones: [[1, 2, 3, 4]], mode: 2 }
		});
		await expect(feature.getCommandParams("app_set_dirty_replenish_clean_status", '{"status":1}')).resolves.toEqual({
			method: "app_set_dirty_replenish_clean_status",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("app_set_dynamic_config", '{"url":"https://example.invalid"}')).resolves.toEqual({
			method: "app_set_dynamic_config",
			params: { url: "https://example.invalid" }
		});
		await expect(feature.getCommandParams("app_set_ignore_stuck_point", '{"points":[[1,2]]}')).resolves.toEqual({
			method: "app_set_ignore_stuck_point",
			params: { points: [[1, 2]] }
		});
		await expect(feature.getCommandParams("app_set_low_space_zones", '{"zones":[{"id":1}]}')).resolves.toEqual({
			method: "app_set_low_space_zones",
			params: { zones: [{ id: 1 }] }
		});
		await expect(feature.getCommandParams("app_set_smart_cliff_forbidden", '{"status":1}')).resolves.toEqual({
			method: "app_set_smart_cliff_forbidden",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("app_ignore_dirty_objects", '{"object_ids":[1,2]}')).resolves.toEqual({
			method: "app_ignore_dirty_objects",
			params: { object_ids: [1, 2] }
		});
		await expect(feature.getCommandParams("app_save_beautification_pic", true)).resolves.toEqual({
			method: "app_save_beautification_pic",
			params: {}
		});
		await expect(feature.getCommandParams("app_start_build_map", true)).resolves.toEqual({
			method: "app_start_build_map",
			params: []
		});
		await expect(feature.getCommandParams("app_resume_build_map", true)).resolves.toEqual({
			method: "app_resume_build_map",
			params: []
		});
		await expect(feature.getCommandParams("app_start_collect_dust", true)).resolves.toEqual({
			method: "app_start_collect_dust",
			params: []
		});
		await expect(feature.getCommandParams("app_stop_collect_dust", true)).resolves.toEqual({
			method: "app_stop_collect_dust",
			params: []
		});
		await expect(feature.getCommandParams("app_switch_dock_cool_fan", true)).resolves.toEqual({
			method: "app_switch_dock_cool_fan",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("app_delete_wifi", 7)).resolves.toEqual({
			method: "app_delete_wifi",
			params: { id: 7 }
		});
		await expect(feature.getCommandParams("set_water_box_distance_off", 15)).resolves.toEqual({
			distance_off: 160
		});
		await expect(feature.getCommandParams("app_start_tidy_up", '[{"object_id":"sock"}]')).resolves.toEqual({
			method: "app_start_tidy_up",
			params: { objects: [{ object_id: "sock" }] }
		});
		await expect(feature.getCommandParams("app_delete_tidy_up_record", "1713371337")).resolves.toEqual({
			method: "app_delete_tidy_up_record",
			params: { start_time: 1713371337 }
		});
		await expect(feature.getCommandParams("get_wash_debug_params", true)).resolves.toEqual({
			method: "get_wash_debug_params",
			params: []
		});
		await expect(feature.getCommandParams("get_clean_roller_debug_info", true)).resolves.toEqual({
			method: "get_wash_debug_params",
			params: []
		});
		await expect(feature.getCommandParams("set_wash_debug_params", '{"rollerspeed":3,"washinterval":10}')).resolves.toEqual({
			method: "set_wash_debug_params",
			params: { rollerspeed: 3, washinterval: 10 }
		});
		await expect(feature.getCommandParams("set_roller_speed", 5)).resolves.toEqual({
			method: "set_wash_debug_params",
			params: { rollerspeed: 5 }
		});
		await expect(feature.getCommandParams("set_drying_time", 60)).resolves.toEqual({
			method: "set_wash_debug_params",
			params: { dryingtime: 60 }
		});
		await expect(feature.getCommandParams("set_mopping_speed", 2)).resolves.toEqual({
			method: "set_wash_debug_params",
			params: { moppingspeed: 2 }
		});
		await expect(feature.getCommandParams("set_wash_interval", 8)).resolves.toEqual({
			method: "set_wash_debug_params",
			params: { washinterval: 8 }
		});
		await expect(feature.getCommandParams("get_smart_wash_params", true)).resolves.toEqual({
			method: "get_smart_wash_params",
			params: {}
		});
		await expect(feature.getCommandParams("set_smart_wash_params", '{"smart_wash":2,"wash_interval":1500}')).resolves.toEqual({
			method: "set_smart_wash_params",
			params: { smart_wash: 2, wash_interval: 1500 }
		});
		await expect(feature.getCommandParams("set_back_wash_mode", 0)).resolves.toEqual({
			method: "set_smart_wash_params",
			params: { smart_wash: 1, wash_interval: 1200 }
		});
		adapterMock.getStateAsync.mockImplementation(async (id: string) => id.endsWith(".dockingStationStatus.smartWash.washIntervalMinutes") ? { val: 25 } : undefined);
		requestsHandlerMock.sendRequest.mockImplementation(async (_duid: string, method: string) => method === "get_fw_features" ? [109] : {});
		await expect(feature.getCommandParams("set_back_wash_mode", 2)).resolves.toEqual({
			method: "set_smart_wash_params",
			params: { smart_wash: 2, wash_interval: 1500 }
		});
		adapterMock.getStateAsync.mockResolvedValue(undefined);
		requestsHandlerMock.sendRequest.mockResolvedValue({});
		await expect(feature.getCommandParams("set_back_wash_interval", 25)).resolves.toEqual({
			method: "set_smart_wash_params",
			params: { smart_wash: 0, wash_interval: 1500 }
		});
		await expect(feature.getCommandParams("get_wash_towel_params", true)).resolves.toEqual({
			method: "get_wash_towel_params",
			params: []
		});
		await expect(feature.getCommandParams("get_wash_towel_mode", true)).resolves.toEqual({
			method: "get_wash_towel_mode",
			params: {}
		});
		await expect(feature.getCommandParams("get_wash_water_temperature", true)).resolves.toEqual({
			method: "get_wash_water_temperature",
			params: {}
		});
		await expect(feature.getCommandParams("set_wash_towel_params", '{"interval":12,"status":1}')).resolves.toEqual({
			method: "set_wash_towel_params",
			params: { interval: 12, status: 1 }
		});
		await expect(feature.getCommandParams("set_wash_towel_interval", 12)).resolves.toEqual({
			method: "set_wash_towel_params",
			params: { interval: 12 }
		});
		await expect(feature.getCommandParams("set_wash_towel_mode", 10)).resolves.toEqual({
			method: "set_wash_towel_mode",
			params: { wash_mode: 10 }
		});
		await expect(feature.getCommandParams("set_wash_towel_status", 1)).resolves.toEqual({
			method: "set_wash_towel_params",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("set_wash_water_temperature", 2)).resolves.toEqual({
			method: "set_wash_water_temperature",
			params: { values: 2 }
		});
		await expect(feature.getCommandParams("start_wash_then_charge", true)).resolves.toEqual({
			method: "start_wash_then_charge",
			params: []
		});
		await expect(feature.getCommandParams("app_get_program", 2)).resolves.toEqual({
			method: "app_get_program",
			params: { program_id: 2 }
		});
		await expect(feature.getCommandParams("app_get_robot_setting", "custom_mode")).resolves.toEqual({
			method: "app_get_robot_setting",
			params: { name: "custom_mode" }
		});
		await expect(feature.getCommandParams("app_get_robot_setting", '["custom_mode","voice_service"]')).resolves.toEqual({
			method: "app_get_robot_setting",
			params: [{ name: "custom_mode" }, { name: "voice_service" }]
		});
		await expect(feature.getCommandParams("app_set_robot_setting", '{"name":"custom_mode","status":1}')).resolves.toEqual({
			method: "app_set_robot_setting",
			params: { name: "custom_mode", status: 1 }
		});
		await expect(feature.getCommandParams("app_get_program_runtime", true)).resolves.toEqual({
			method: "app_get_program_runtime",
			params: {}
		});
		await expect(feature.getCommandParams("app_get_program_soundlist", true)).resolves.toEqual({
			method: "app_get_program_soundlist",
			params: {}
		});
		await expect(feature.getCommandParams("app_get_programs_summary", true)).resolves.toEqual({
			method: "app_get_programs_summary",
			params: {}
		});
		await expect(feature.getCommandParams("app_program_enter_exit", 1)).resolves.toEqual({
			method: "app_program_enter_exit",
			params: { flag: 1 }
		});
		await expect(feature.getCommandParams("app_copy_program", '{"name":"Demo","program_id":3}')).resolves.toEqual({
			method: "app_copy_program",
			params: { name: "Demo", program_id: 3 }
		});
		await expect(feature.getCommandParams("app_delete_program", 3)).resolves.toEqual({
			method: "app_delete_program",
			params: { program_id: 3 }
		});
		await expect(feature.getCommandParams("app_modify_program", '{"name":"Demo 2","program_id":3}')).resolves.toEqual({
			method: "app_modify_program",
			params: { name: "Demo 2", program_id: 3 }
		});
		await expect(feature.getCommandParams("app_save_program", '{"program_id":3,"steps":[{"cmd_id":"sound"}]}')).resolves.toEqual({
			method: "app_save_program",
			params: { program_id: 3, steps: [{ cmd_id: "sound" }] }
		});
		requestsHandlerMock.sendRequest.mockImplementation(async (_duid: string, method: string) => {
			if (method === "app_get_program") {
				return { result: { cmd_ids: [11, 12, 13] } };
			}
			return {};
		});
		await expect(feature.getCommandParams("app_start_program", '{"program_id":3}')).resolves.toEqual({
			method: "app_start_program",
			params: { cmd_ids: [11, 12, 13] }
		});
		await expect(feature.getCommandParams("app_start_program", 3)).resolves.toEqual({
			method: "app_start_program",
			params: { cmd_ids: [11, 12, 13] }
		});
		await expect(feature.getCommandParams("app_start_patrol", '{"map_index":0,"points":[[100,200],[300,400]]}')).resolves.toEqual({
			method: "app_start_patrol",
			params: { map_index: 0, points: [[100, 200], [300, 400]] }
		});
		await expect(feature.getCommandParams("app_resume_patrol", true)).resolves.toEqual({
			method: "app_resume_patrol",
			params: {}
		});
		await expect(feature.getCommandParams("app_start_pet_patrol", true)).resolves.toEqual({
			method: "app_start_pet_patrol",
			params: {}
		});
		await expect(feature.getCommandParams("app_empty_rinse_tank_water", true)).resolves.toEqual({
			method: "app_empty_rinse_tank_water",
			params: {}
		});
		await expect(feature.getCommandParams("app_start_easter_egg", true)).resolves.toEqual({
			method: "app_start_easter_egg",
			params: {}
		});
		await expect(feature.getCommandParams("start_new_easter_egg", 0)).resolves.toEqual({
			method: "start_new_easter_egg",
			params: { type: 0 }
		});
		await expect(feature.getCommandParams("start_voice_chat", '{"play":true,"record":false}')).resolves.toEqual({
			method: "start_voice_chat",
			params: { play: true, record: false }
		});
		await expect(feature.getCommandParams("stop_voice_chat", true)).resolves.toEqual({
			method: "stop_voice_chat",
			params: {}
		});
		await expect(feature.getCommandParams("set_voice_chat_volume", 66)).resolves.toEqual({
			method: "set_voice_chat_volume",
			params: { volume: 66 }
		});
		await expect(feature.getCommandParams("app_get_clean_estimate_info", true)).resolves.toEqual({
			method: "app_get_clean_estimate_info",
			params: {}
		});
		await expect(feature.getCommandParams("app_get_carpet_deep_clean_status", true)).resolves.toEqual({
			method: "app_get_carpet_deep_clean_status",
			params: {}
		});
		await expect(feature.getCommandParams("app_set_carpet_deep_clean_status", '{"status":1}')).resolves.toEqual({
			method: "app_set_carpet_deep_clean_status",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("app_set_cross_carpet_cleaning_status", true)).resolves.toEqual({
			method: "app_set_cross_carpet_cleaning_status",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("app_set_priority_carpet_cleaning_status", false)).resolves.toEqual({
			method: "app_set_priority_carpet_cleaning_status",
			params: { status: 0 }
		});
		await expect(feature.getCommandParams("app_get_dryer_setting", true)).resolves.toEqual({
			method: "app_get_dryer_setting",
			params: []
		});
		await expect(feature.getCommandParams("app_set_dryer_setting", '{"on":{"dry_time":1800},"status":1}')).resolves.toEqual({
			method: "app_set_dryer_setting",
			params: { on: { dry_time: 1800 }, status: 1 }
		});
		await expect(feature.getCommandParams("app_set_dryer_status", true)).resolves.toEqual({
			method: "app_set_dryer_status",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("app_get_wifi_list", true)).resolves.toEqual({
			method: "app_get_wifi_list",
			params: {}
		});
		await expect(feature.getCommandParams("get_dock_info", true)).resolves.toEqual({
			method: "get_dock_info",
			params: {}
		});
		await expect(feature.getCommandParams("get_child_lock_status", true)).resolves.toEqual({
			method: "get_child_lock_status",
			params: []
		});
		await expect(feature.getCommandParams("set_child_lock_status", true)).resolves.toEqual({
			method: "set_child_lock_status",
			params: { lock_status: 1 }
		});
		await expect(feature.getCommandParams("get_collision_avoid_status", true)).resolves.toEqual({
			method: "get_collision_avoid_status",
			params: []
		});
		await expect(feature.getCommandParams("set_collision_avoid_status", false)).resolves.toEqual({
			method: "set_collision_avoid_status",
			params: { status: 0 }
		});
		await expect(feature.getCommandParams("get_flow_led_status", true)).resolves.toEqual({
			method: "get_flow_led_status",
			params: []
		});
		await expect(feature.getCommandParams("set_flow_led_status", 1)).resolves.toEqual({
			method: "set_flow_led_status",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("get_map_beautification_status", true)).resolves.toEqual({
			method: "get_map_beautification_status",
			params: []
		});
		await expect(feature.getCommandParams("set_map_beautification_status", true)).resolves.toEqual({
			method: "set_map_beautification_status",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("set_ignore_carpet_zone", '{"zones":[[1,2,3,4]]}')).resolves.toEqual({
			method: "set_ignore_carpet_zone",
			params: { zones: [[1, 2, 3, 4]] }
		});
		await expect(feature.getCommandParams("set_ignore_identify_area", '{"areas":[{"id":3}]}')).resolves.toEqual({
			method: "set_ignore_identify_area",
			params: { areas: [{ id: 3 }] }
		});
		await expect(feature.getCommandParams("test_get_enable_wakeup", true)).resolves.toEqual({
			method: "test_get_enable_wakeup",
			params: []
		});
		await expect(feature.getCommandParams("test_set_enable_wakeup", false)).resolves.toEqual({
			method: "test_set_enable_wakeup",
			params: { enable_wakeup: 0 }
		});
		await expect(feature.getCommandParams("test_get_voice_keep_seconds", true)).resolves.toEqual({
			method: "test_get_voice_keep_seconds",
			params: []
		});
		await expect(feature.getCommandParams("test_set_voice_keep_seconds", 18)).resolves.toEqual({
			method: "test_set_voice_keep_seconds",
			params: { keep_seconds: 18 }
		});
		await expect(feature.getCommandParams("get_voice_history_summary", true)).resolves.toEqual({
			method: "get_voice_history_summary",
			params: []
		});
		await expect(feature.getCommandParams("get_voice_history", 42)).resolves.toEqual({
			method: "get_voice_history",
			params: { max_id: 42 }
		});
		await expect(feature.getCommandParams("test_get_voice_list", true)).resolves.toEqual({
			method: "test_get_voice_list",
			params: []
		});
		await expect(feature.getCommandParams("app_start_replenish_clean_area", '{"zones":[1,2]}')).resolves.toEqual({
			method: "app_start_replenish_clean_area",
			params: { zones: [1, 2] }
		});
		await expect(feature.getCommandParams("app_skip_current_cleaning_area", '{"skip":"current_zone"}')).resolves.toEqual({
			method: "app_skip_current_cleaning_area",
			params: { skip: "current_zone" }
		});
		await expect(feature.getCommandParams("app_update_unsave_map", true)).resolves.toEqual({
			method: "app_update_unsave_map",
			params: { update: true }
		});
		await expect(feature.getCommandParams("get_auto_delivery_cleaning_fluid", true)).resolves.toEqual({
			method: "get_auto_delivery_cleaning_fluid",
			params: {}
		});
		await expect(feature.getCommandParams("set_auto_delivery_cleaning_fluid", true)).resolves.toEqual({
			method: "set_auto_delivery_cleaning_fluid",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("get_ap_mic_led_status", true)).resolves.toEqual({
			method: "get_ap_mic_led_status",
			params: {}
		});
		await expect(feature.getCommandParams("set_ap_mic_led_status", false)).resolves.toEqual({
			method: "set_ap_mic_led_status",
			params: { status: 0 }
		});
		await expect(feature.getCommandParams("get_voice_service_switch", true)).resolves.toEqual({
			method: "get_voice_service_switch",
			params: []
		});
		await expect(feature.getCommandParams("set_voice_service_switch", true)).resolves.toEqual({
			method: "set_voice_service_switch",
			params: { data: 1 }
		});
		await expect(feature.getCommandParams("get_handle_leak_water_status", true)).resolves.toEqual({
			method: "get_handle_leak_water_status",
			params: {}
		});
		await expect(feature.getCommandParams("set_handle_leak_water_status", true)).resolves.toEqual({
			method: "set_handle_leak_water_status",
			params: { status: 1 }
		});
		await expect(feature.getCommandParams("check_homesec_password", "123456")).resolves.toEqual({
			method: "check_homesec_password",
			params: { password: "123456" }
		});
		await expect(feature.getCommandParams("set_homesec_password", '{"enable_password":1,"old_password":"1111","new_password":"2222"}')).resolves.toEqual({
			method: "set_homesec_password",
			params: { enable_password: 1, old_password: "1111", new_password: "2222" }
		});
		await expect(feature.getCommandParams("reset_homesec_password", true)).resolves.toEqual({
			method: "reset_homesec_password",
			params: []
		});
		await expect(feature.getCommandParams("enable_homesec_voice", true)).resolves.toEqual({
			method: "enable_homesec_voice",
			params: { enable: true }
		});
		await expect(feature.getCommandParams("get_homesec_connect_status", true)).resolves.toEqual({
			method: "get_homesec_connect_status",
			params: []
		});
	});

	it("builds app-like preview defaults from cameraPin and clientID", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await expect(feature.getCommandParams("start_camera_preview", true)).resolves.toEqual({
			method: "start_camera_preview",
			params: { quality: "SD", password: "9876", client_id: "client-123" }
		});
		await expect(feature.getCommandParams("start_camera_preview", '{"quality":"FHD"}')).resolves.toEqual({
			method: "start_camera_preview",
			params: { quality: "FHD", password: "9876", client_id: "client-123" }
		});
		await expect(feature.getCommandParams("stop_camera_preview", true)).resolves.toEqual({
			method: "stop_camera_preview",
			params: { client_id: "client-123" }
		});
	});

	it("stores app_get_program command results as compact program detail state", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await feature.onCommandResult("app_get_program", "app_get_program", {
			result: {
				program_id: 5,
				name: "Manual Program",
				description: "From command result",
				program_type: 1,
				cmd_ids: [{ id: 1, cmd_id: "sound" }, { id: 2, cmd_id: "arm_out" }],
				blocks: { blocks: [{ id: "p1" }] }
			}
		}, { program_id: 5 });

		const programDetailCall = adapterMock.setStateChanged.mock.calls.find(
			([id]: [string]) => id === "Devices.duid1.program.selectedJSON"
		);
		expect(programDetailCall).toBeDefined();
		expect(JSON.parse(String(programDetailCall?.[1]?.val))).toEqual({
			program_id: 5,
			name: "Manual Program",
			description: "From command result",
			program_type: 1,
			cmd_ids: [{ id: 1, cmd_id: "sound" }, { id: 2, cmd_id: "arm_out" }],
			blocks: { blocks: [{ id: "p1" }] },
			programTypeLabel: "My Program",
			isOfficialProgram: false,
			isMyProgram: true,
			commandCount: 2,
			blockCount: 1,
			hasBlocks: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.selectedCommandCount", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.selectedHasBlocks", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.selectedTypeLabel", {
			val: "My Program",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.selectedName", {
			val: "Manual Program",
			ack: true
		});
	});

	it("stores shared manual getter results and unwraps transport wrappers", async () => {
		requestsHandlerMock.sendRequest.mockImplementation(async (_duid: string, method: string, params?: unknown) => {
			if (method === "app_get_program") {
				const programId = Number((params as { program_id?: unknown } | undefined)?.program_id);
				if (programId === 1) {
					return {
						result: {
							program_id: 1,
							name: "Official A",
							description: "Alpha",
							program_type: 2,
							cmd_ids: [{ id: 1, cmd_id: "arm_out" }],
							blocks: { blocks: [{ id: "oa" }] }
						}
					};
				}
				if (programId === 9) {
					return {
						result: {
							program_id: 9,
							name: "My Routine",
							description: "Custom",
							program_type: 1,
							cmd_ids: [{ id: 4, cmd_id: "sound" }]
						}
					};
				}
			}
			return {};
		});

		const feature = new A179Features(depsMock, "duid1");

		await feature.onCommandResult("app_tidy_up_record_summary", "app_tidy_up_record_summary", {
			data: { result: { tidyup_count: 4, tidyup_time: 1200 } },
			version: "L01"
		});
		await feature.onCommandResult("app_get_tidy_up_zones", "app_get_tidy_up_zones", {
			data: { result: [{ id: 1, name: "Desk" }] },
			version: "L01"
		});
		await feature.onCommandResult("app_get_programs_summary", "app_get_programs_summary", {
			data: {
				result: [
					{ program_id: 9, program_type: 1, name: "My Routine" },
					{ program_id: 1, program_type: 2, name: "Official A" }
				]
			},
			version: "L01"
		});
		await feature.onCommandResult("app_get_program_runtime", "app_get_program_runtime", {
			data: {
				result: {
					program_state: 2,
					result: [{ cmd_id: "arm_move", value: [1, 0, 2, 1], result: -2 }]
				}
			},
			version: "L01"
		});
		await feature.onCommandResult("app_get_program_soundlist", "app_get_program_soundlist", {
			data: { result: [{ id: 6, cmd_id: "sound", value: "code_mode_process_9" }] },
			version: "L01"
		});
		await feature.onCommandResult("get_homesec_connect_status", "get_homesec_connect_status", {
			data: { result: { client_id: "client-123" } },
			version: "L01"
		}, []);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.summaryJSON", {
			val: '{"tidyup_count":4,"tidyup_time":1200}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.count", {
			val: 4,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.timeSeconds", {
			val: 1200,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.zonesJSON", {
			val: '[{"id":1,"name":"Desk"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.zoneCount", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.summaryJSON", {
			val: '[{"program_id":9,"program_type":1,"name":"My Routine"},{"program_id":1,"program_type":2,"name":"Official A"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.officialProgramsJSON", {
			val: '[{"program_id":1,"program_type":2,"name":"Official A","programTypeLabel":"Official Recommendation"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.myProgramsJSON", {
			val: '[{"program_id":9,"program_type":1,"name":"My Routine","programTypeLabel":"My Program"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.detailsCount", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.programState", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.lastResult", {
			val: -2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.soundListJSON", {
			val: '[{"id":6,"cmd_id":"sound","value":"code_mode_process_9"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.connectJSON", {
			val: '{"client_id":"client-123"}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.homeSecClientId", {
			val: "client-123",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecControlledByCurrentClient", {
			val: true,
			ack: true
		});
	});

	it("stores compact manual getter payloads for newly exposed Z70 app wrappers", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await feature.onCommandResult("app_get_robot_setting", "app_get_robot_setting", {
			data: { result: [{ name: "custom_mode", status: 1 }] },
			version: "L01"
		}, { name: "custom_mode" });
		await feature.onCommandResult("app_get_clean_estimate_info", "app_get_clean_estimate_info", {
			data: { result: { clean_time: 900, clean_area: 12000000 } },
			version: "L01"
		}, {});
		await feature.onCommandResult("app_get_dryer_setting", "app_get_dryer_setting", {
			data: { result: { status: 1, on: { dry_time: 1800 } } },
			version: "L01"
		}, []);
		await feature.onCommandResult("app_get_wifi_list", "app_get_wifi_list", {
			data: { result: [{ ssid: "PixelPalace", rssi: -48 }] },
			version: "L01"
		}, {});
		await feature.onCommandResult("app_get_segment_clean_subdivision", "app_get_segment_clean_subdivision", {
			data: { result: [{ segment_id: 2, mode: 3 }] },
			version: "L01"
		}, { segment_id: 2 });
		await feature.onCommandResult("app_get_zoned_clean_subdivision", "app_get_zoned_clean_subdivision", {
			data: { result: [{ zone_id: 1, mode: 2 }] },
			version: "L01"
		}, { zones: [[1, 2, 3, 4]] });
		await feature.onCommandResult("get_dock_info", "get_dock_info", {
			data: { result: { cool_fan: 1, dock_type: 16 } },
			version: "L01"
		}, {});
		await feature.onCommandResult("get_child_lock_status", "get_child_lock_status", {
			data: { result: { lock_status: 1 } },
			version: "L01"
		}, []);
		await feature.onCommandResult("get_collision_avoid_status", "get_collision_avoid_status", {
			data: { result: { status: 1 } },
			version: "L01"
		}, []);
		await feature.onCommandResult("get_flow_led_status", "get_flow_led_status", {
			data: { result: { status: 1 } },
			version: "L01"
		}, []);
		await feature.onCommandResult("test_get_enable_wakeup", "test_get_enable_wakeup", {
			data: { result: { enable_wakeup: 1 } },
			version: "L01"
		}, []);
		await feature.onCommandResult("test_get_voice_keep_seconds", "test_get_voice_keep_seconds", {
			data: { result: { keep_seconds: 18 } },
			version: "L01"
		}, []);
		await feature.onCommandResult("get_map_beautification_status", "get_map_beautification_status", {
			data: { result: { status: 1 } },
			version: "L01"
		}, []);
		await feature.onCommandResult("get_voice_history_summary", "get_voice_history_summary", {
			data: { result: { total: 5, latest_id: 77 } },
			version: "L01"
		}, []);
		await feature.onCommandResult("get_voice_history", "get_voice_history", {
			data: { result: { list: [{ id: 77, text: "Hello" }] } },
			version: "L01"
		}, { max_id: 77 });
		await feature.onCommandResult("test_get_voice_list", "test_get_voice_list", {
			data: { result: [{ id: 9, name: "Welcome" }] },
			version: "L01"
		}, []);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.robotSettingQueryJSON", {
			val: '[{"name":"custom_mode","status":1}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.robotSettingQueryCount", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.cleaningInfo.estimateJSON", {
			val: '{"clean_time":900,"clean_area":12000000}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.cleaningInfo.estimateTimeMinutes", {
			val: 15,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.cleaningInfo.estimateArea", {
			val: 12,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.dryerJSON", {
			val: '{"status":1,"on":{"dry_time":1800}}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.dryerStatus", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.dryerEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.dryerTimeSeconds", {
			val: 1800,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.networkInfo.wifiListJSON", {
			val: '[{"ssid":"PixelPalace","rssi":-48}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.networkInfo.wifiListCount", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.cleaningInfo.segmentSubdivisionJSON", {
			val: '[{"segment_id":2,"mode":3}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.cleaningInfo.segmentSubdivisionCount", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.cleaningInfo.zoneSubdivisionJSON", {
			val: '[{"zone_id":1,"mode":2}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.cleaningInfo.zoneSubdivisionCount", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.dockInfoJSON", {
			val: '{"cool_fan":1,"dock_type":16}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.childLockStatus", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.childLockEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.collisionAvoidStatus", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.flowLedEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceWakeupEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceKeepSeconds", {
			val: 18,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.cleaningInfo.mapBeautificationEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceHistorySummaryJSON", {
			val: '{"total":5,"latest_id":77}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceHistoryJSON", {
			val: '{"list":[{"id":77,"text":"Hello"}]}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceHistoryCount", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceListJSON", {
			val: '[{"id":9,"name":"Welcome"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceListCount", {
			val: 1,
			ack: true
		});
	});

	it("stores manual smart wash, wash towel, and binary getter results through shared handlers", async () => {
		requestsHandlerMock.sendRequest.mockImplementation(async (_duid: string, method: string) => {
			if (method === "get_fw_features") {
				return { data: [41, 107, 109], version: "L01" };
			}
			return {};
		});

		const feature = new A179Features(depsMock, "duid1");

		await feature.onCommandResult("get_smart_wash_params", "get_smart_wash_params", {
			data: { smart_wash: 2, wash_interval: 1500 },
			version: "L01"
		}, {});
		await feature.onCommandResult("get_wash_towel_params", "get_wash_towel_params", {
			data: { interval: 12, status: 1, mode: 8 },
			version: "L01"
		}, []);
		await feature.onCommandResult("get_wash_towel_mode", "get_wash_towel_mode", {
			data: { wash_mode: 8 },
			version: "L01"
		}, {});
		await feature.onCommandResult("get_wash_water_temperature", "get_wash_water_temperature", {
			data: { wash_water_temperature: 2 },
			version: "L01"
		}, {});
		await feature.onCommandResult("get_auto_delivery_cleaning_fluid", "get_auto_delivery_cleaning_fluid", {
			data: { result: { status: 1 } },
			version: "L01"
		}, {});
		await feature.onCommandResult("get_ap_mic_led_status", "get_ap_mic_led_status", {
			data: { result: { status: 1 } },
			version: "L01"
		}, {});
		await feature.onCommandResult("get_voice_service_switch", "get_voice_service_switch", {
			data: { result: { data: 1 } },
			version: "L01"
		}, []);
		await feature.onCommandResult("get_handle_leak_water_status", "get_handle_leak_water_status", {
			data: { result: { status: 1 } },
			version: "L01"
		}, {});

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.smartWash.smartWash", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.smartWash.washIntervalMinutes", {
			val: 25,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.smartWash.backWashMode", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.hotWashTowelSupported", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.soakAndWashSupported", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.interval", {
			val: 12,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.paramMode", {
			val: 8,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.mode", {
			val: 8,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.temperature", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.autoDeliveryCleanFluidEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceControlLedEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceServiceEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.waterLeakEnabled", {
			val: true,
			ack: true
		});
	});

	it("stores tidy-up summary and tidy zones from map data", async () => {
		requestsHandlerMock.sendRequest.mockImplementation(async (_duid: string, method: string) => {
			if (method === "app_tidy_up_record_summary") {
				return { count: 2, last_start_time: 1713371337 };
			}
			return {};
		});
		adapterMock.getStateAsync.mockResolvedValue({
			val: JSON.stringify({
				TIDY_ZONES: [[1, 2, 10, 20, 30, 40, 50, 60, 70, 80]]
			})
		});

		const feature = new A179Features(depsMock, "duid1");
		await feature.updateExtraStatus();

		expect(requestsHandlerMock.sendRequest).toHaveBeenCalledWith("duid1", "app_tidy_up_record_summary", {});
		expect(requestsHandlerMock.sendRequest).not.toHaveBeenCalledWith("duid1", "app_get_tidy_up_zones", {});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.summaryJSON", {
			val: '{"count":2,"last_start_time":1713371337}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.count", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.zonesJSON", {
			val: '[{"id":1,"type":2,"points":[[10,20],[30,40],[50,60],[70,80]]}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.zoneCount", {
			val: 1,
			ack: true
		});
	});

	it("falls back to the tidy-up zones RPC when no map data is available", async () => {
		requestsHandlerMock.sendRequest.mockImplementation(async (_duid: string, method: string) => {
			if (method === "app_tidy_up_record_summary") {
				return { count: 2 };
			}
			if (method === "app_get_tidy_up_zones") {
				return [{ id: 1, name: "Desk" }];
			}
			return {};
		});
		adapterMock.getStateAsync.mockResolvedValue(undefined);

		const feature = new A179Features(depsMock, "duid1");
		await feature.updateExtraStatus();

		expect(requestsHandlerMock.sendRequest).toHaveBeenCalledWith("duid1", "app_get_tidy_up_zones", {});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.tidyUp.zonesJSON", {
			val: '[{"id":1,"name":"Desk"}]',
			ack: true
		});
	});

	it("derives Z70 arm status fields from common_status", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await (feature as any).processResultKey("deviceStatus", "common_status", 63840);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechanicalTidyUpHouseworkState", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechanicalArmGrabStatus", {
			val: 5,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechanicalArmGrabMode", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.autoGrabMode", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isPuttingDown", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechanicalArmGrabResult", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isGrabSucessful", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.assistedTidyUp", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechanicalArmActiveStatus", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.canChangeCameraStatus", {
			val: 1,
			ack: true
		});
	});

	it("derives Z70 camera flags from camera_status", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await (feature as any).processResultKey("deviceStatus", "camera_status", 58805);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.cameraEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.realTimeMonitorEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.ledSetting", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.realVideoSetting", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.realTimeVideoWithTwoKeysStatus", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechanicalCameraEnabled", {
			val: true,
			ack: true
		});
	});

	it("exposes source-backed friendly mappings for numeric Z70 status states", () => {
		expect(VACUUM_CONSTANTS.deviceStates.back_type).toMatchObject({
			type: "number",
			states: {
				1: "Washing Mop",
				2: "Setting Up Mop",
				3: "Removing Mop",
				4: "Collecting Dust",
			},
		});
		expect(VACUUM_CONSTANTS.deviceStates.wash_phase).toMatchObject({
			type: "number",
			states: {
				11: "Running",
				17: "Pumping",
			},
		});
		expect(VACUUM_CONSTANTS.deviceStates.washingMode).toMatchObject({
			type: "number",
			states: {
				6: "Dock Self-Cleaning",
				7: "Water Draining",
				11: "Pumping Water",
			},
		});
		expect(VACUUM_CONSTANTS.deviceStates.water_shortage_status).toMatchObject({
			type: "number",
			states: {
				0: "Normal",
				1: "Water Shortage",
			},
		});
	});

	it("derives switch bitfields and washing helpers into user-friendly states", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await (feature as any).processResultKey("deviceStatus", "common_status", 8);
		await (feature as any).processResultKey("deviceStatus", "clean_fluid", 1);
		await (feature as any).processResultKey("deviceStatus", "switch_status", 59);
		await (feature as any).processResultKey("deviceStatus", "dock_error_status", 42);
		await (feature as any).processResultKey("deviceStatus", "back_type", 4);
		await (feature as any).processResultKey("deviceStatus", "wash_phase", 17);
		await (feature as any).processResultKey("deviceStatus", "wash_status", 0x0b07);
		await (feature as any).processResultKey("deviceStatus", "water_shortage_status", 1);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.patrolStatus", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.patrolActive", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.offlineMapEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.hasCleanFluidModule", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isSettingCarpetFirstOn", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isSettingDirtyReplenishOn", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isSettingCarpetCrossOn", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.backTypeLabel", {
			val: "Collecting Dust",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.hasDockError", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.washPhaseLabel", {
			val: "Pumping",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.washingTaskStatus", {
			val: 7,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.washingMode", {
			val: 11,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.washingModeLabel", {
			val: "Pumping Water",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isCleanCarouselSelfCleaning", {
			val: false,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isWaterDraining", {
			val: false,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isPumpingWater", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.waterShortageActive", {
			val: true,
			ack: true
		});
	});

	it("derives Home Security and monitor flags from source-backed status fields", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await (feature as any).processResultKey("deviceStatus", "home_sec_status", 2);
		await (feature as any).processResultKey("deviceStatus", "home_sec_enable_password", 1);
		await (feature as any).processResultKey("deviceStatus", "voice_chat_status", 1);
		await (feature as any).processResultKey("deviceStatus", "monitor_status", 1);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecDisconnecting", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecRunning", {
			val: false,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecPreviewStartReady", {
			val: false,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecPreviewRetryPending", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.homeSecPasswordEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.voiceChatActive", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.monitorActive", {
			val: true,
			ack: true
		});
	});

	it("derives Home Security preview ownership states from status and connect client id", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await (feature as any).processResultKey("deviceStatus", "home_sec_status", 1);
		requestsHandlerMock.sendRequest.mockResolvedValueOnce({ result: { client_id: "client-123" } });
		await (feature as any).refreshHomeSecConnectStatus();

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecPreviewOwnedByCurrentClient", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecPreviewBlockedByOtherClient", {
			val: false,
			ack: true
		});

		adapterMock.setStateChanged.mockClear();
		requestsHandlerMock.sendRequest.mockResolvedValueOnce({ result: { client_id: "other-client" } });
		await (feature as any).refreshHomeSecConnectStatus();

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecPreviewOwnedByCurrentClient", {
			val: false,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecPreviewBlockedByOtherClient", {
			val: true,
			ack: true
		});
	});

	it("derives Z70 robot state and mechanical arm emergency flags", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await (feature as any).processResultKey("deviceStatus", "state", 40);
		await (feature as any).processResultKey("deviceStatus", "state", 41);
		await (feature as any).processResultKey("deviceStatus", "state", 42);
		await (feature as any).processResultKey("deviceStatus", "error_code", 70);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isEmergencyStopStatus", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isArmResetting", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isProgramMode", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.hasMechanicalArmEmergencyError", {
			val: true,
			ack: true
		});
	});

	it("derives source-backed Z70 dock and home control states", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await (feature as any).processResultKey("deviceStatus", "state", 3);
		await (feature as any).processResultKey("deviceStatus", "lock_status", 0);
		await (feature as any).processResultKey("deviceStatus", "is_locating", 0);
		await (feature as any).processResultKey("deviceStatus", "voice_chat_status", 0);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeButtonsEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeModeControlButtonsEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeMapEditButtonsEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSettingButtonEnabled", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "state", 22);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.dockCanStopCollectDust", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isInBackDockTask", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeButtonsEnabled", {
			val: false,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "state", 23);
		await (feature as any).processResultKey("deviceStatus", "wash_phase", 16);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isWashing", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.dockCanStopWash", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "wash_phase", 17);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.dockCanStopWash", {
			val: false,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "state", 11);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isSpotCleaning", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "state", 17);
		await (feature as any).processResultKey("deviceStatus", "state", 18);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isZonedCleaning", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isSegmentCleaning", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "state", 15);
		await (feature as any).processResultKey("deviceStatus", "exit_dock", 1);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isExitingDock", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "dry_status", 1);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isDrying", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isInBackDockTask", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "state", 26);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isBackDockWashingDusterMode", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "state", 2);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isBackDockTaskResumeable", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isReadyToCmd", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "state", 28);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.canPauseByToast", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "dry_status", 0);
		await (feature as any).processResultKey("deviceStatus", "state", 38);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isTidyUpHouseWork", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeModeControlButtonsEnabled", {
			val: false,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeButtonsEnabled", {
			val: true,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "state", 30);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeMapEditButtonsEnabled", {
			val: false,
			ack: true
		});

		await (feature as any).processResultKey("deviceStatus", "lock_status", 1);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isLocked", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSettingButtonEnabled", {
			val: false,
			ack: true
		});
	});

	it("derives Z70 tidy-up and move task flags from task status fields", async () => {
		const feature = new A179Features(depsMock, "duid1");

		await (feature as any).processResultKey("deviceStatus", "clean_tidyup_status", 0x0201);
		await (feature as any).processResultKey("deviceStatus", "assist_clean_status", 0x3301);

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechArmTidyupTaskState", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechArmTidyupObjectType", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechArmTidyupObjectLabel", {
			val: "Shoes",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isMechArmDoingTidyupTask", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechArmMoveTaskState", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechArmMoveObjectType", {
			val: 51,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.mechArmMoveObjectLabel", {
			val: "Clumps / Curled Fabric",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isMechArmDoingMoveTask", {
			val: true,
			ack: true
		});
	});

	it("stores Smart Wash and Wash Towel states from source-backed getter responses", async () => {
		requestsHandlerMock.sendRequest.mockImplementation(async (_duid: string, method: string, params?: unknown) => {
			switch (method) {
				case "app_tidy_up_record_summary":
					return { count: 1 };
				case "app_get_programs_summary":
					return {
						result: [
							{ program_id: 2, program_type: 2, name: "Official B" },
							{ program_id: 9, program_type: 1, name: "My Routine" },
							{ program_id: 1, program_type: 2, name: "Official A" }
						]
					};
				case "app_get_program": {
					const programId = Number((params as { program_id?: unknown } | undefined)?.program_id);
					switch (programId) {
						case 1:
							return {
								result: {
									program_id: 1,
									name: "Official A",
									description: "Official Alpha",
									program_type: 2,
									cmd_ids: [{ id: 1, cmd_id: "arm_out" }],
									blocks: { blocks: [{ id: "oa" }] }
								}
							};
						case 2:
							return {
								result: {
									program_id: 2,
									name: "Official B",
									description: "Official Beta",
									program_type: 2,
									cmd_ids: [{ id: 2, cmd_id: "arm_out" }, { id: 3, cmd_id: "arm_in" }],
									blocks: { blocks: [{ id: "ob1" }, { id: "ob2" }] }
								}
							};
						case 9:
							return {
								result: {
									program_id: 9,
									name: "My Routine",
									description: "Custom Flow",
									program_type: 1,
									cmd_ids: [{ id: 4, cmd_id: "sound" }]
								}
							};
						default:
							return {};
					}
				}
				case "app_get_program_runtime":
					return { result: { status: 2, progress: 45 } };
				case "app_get_program_soundlist":
					return { result: [{ id: 6, cmd_id: "sound", value: "code_mode_process_9" }] };
				case "get_homesec_connect_status":
					return { result: { client_id: "client-123" } };
				case "get_auto_delivery_cleaning_fluid":
					return { result: { status: 1 } };
				case "get_ap_mic_led_status":
					return { result: { status: 1 } };
				case "get_voice_service_switch":
					return { result: { data: 1 } };
				case "get_handle_leak_water_status":
					return { result: { status: 1 } };
				case "get_fw_features":
					return [41, 107, 109];
				case "get_smart_wash_params":
					return { smart_wash: 2, wash_interval: 1500 };
				case "get_wash_towel_params":
					return { interval: 12, status: 1, mode: 8 };
				case "get_wash_towel_mode":
					return { wash_mode: 8 };
				case "get_wash_water_temperature":
					return { wash_water_temperature: 2 };
				default:
					return {};
			}
		});
		adapterMock.getStateAsync.mockImplementation(async (id: string) => {
			if (id === "clientID") {
				return { val: "client-123" };
			}
			return {
				val: JSON.stringify({
					TIDY_ZONES: []
				})
			};
		});

		const feature = new A179Features(depsMock, "duid1");
		await feature.updateExtraStatus();

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.smartWash.smartWash", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.smartWash.washIntervalMinutes", {
			val: 25,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.smartWash.backWashMode", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.smartWash.backWashNewSmartSupported", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.hotWashTowelSupported", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.soakAndWashSupported", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.mode", {
			val: 8,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.modeLabel", {
			val: "Soak",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.interval", {
			val: 12,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.status", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.temperature", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.washTowel.temperatureLabel", {
			val: "Hot / High Temperature",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.autoDeliveryCleanFluidStatus", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.autoDeliveryCleanFluidEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceControlLedStatus", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceControlLedEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceServiceData", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.voiceServiceEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.waterLeakStatus", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.dockingStationStatus.waterLeakEnabled", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.summaryJSON", {
			val: '[{"program_id":2,"program_type":2,"name":"Official B"},{"program_id":9,"program_type":1,"name":"My Routine"},{"program_id":1,"program_type":2,"name":"Official A"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.officialProgramsJSON", {
			val: '[{"program_id":1,"program_type":2,"name":"Official A","programTypeLabel":"Official Recommendation"},{"program_id":2,"program_type":2,"name":"Official B","programTypeLabel":"Official Recommendation"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.officialProgramsCount", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.myProgramsJSON", {
			val: '[{"program_id":9,"program_type":1,"name":"My Routine","programTypeLabel":"My Program"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.myProgramsCount", {
			val: 1,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.totalCount", {
			val: 3,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.hasOfficialPrograms", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.hasMyPrograms", {
			val: true,
			ack: true
		});
		const programDetailsCall = adapterMock.setStateChanged.mock.calls.find(
			([id]: [string]) => id === "Devices.duid1.program.detailsJSON"
		);
		expect(programDetailsCall).toBeDefined();
		expect(JSON.parse(String(programDetailsCall?.[1]?.val))).toEqual([
			{
				program_id: 1,
				program_type: 2,
				name: "Official A",
				description: "Official Alpha",
				cmd_ids: [{ id: 1, cmd_id: "arm_out" }],
				blocks: { blocks: [{ id: "oa" }] },
				programTypeLabel: "Official Recommendation",
				isOfficialProgram: true,
				isMyProgram: false,
				commandCount: 1,
				blockCount: 1,
				hasBlocks: true
			},
			{
				program_id: 2,
				program_type: 2,
				name: "Official B",
				description: "Official Beta",
				cmd_ids: [{ id: 2, cmd_id: "arm_out" }, { id: 3, cmd_id: "arm_in" }],
				blocks: { blocks: [{ id: "ob1" }, { id: "ob2" }] },
				programTypeLabel: "Official Recommendation",
				isOfficialProgram: true,
				isMyProgram: false,
				commandCount: 2,
				blockCount: 2,
				hasBlocks: true
			},
			{
				program_id: 9,
				program_type: 1,
				name: "My Routine",
				description: "Custom Flow",
				cmd_ids: [{ id: 4, cmd_id: "sound" }],
				programTypeLabel: "My Program",
				isOfficialProgram: false,
				isMyProgram: true,
				commandCount: 1,
				blockCount: 0,
				hasBlocks: false
			}
		]);
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.detailsCount", {
			val: 3,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.hasBlocklyPrograms", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.totalCommandCount", {
			val: 4,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.JSON", {
			val: '{"status":2,"progress":45}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.soundListJSON", {
			val: '[{"id":6,"cmd_id":"sound","value":"code_mode_process_9"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.homeSecurity.connectJSON", {
			val: '{"client_id":"client-123"}',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.homeSecClientId", {
			val: "client-123",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecControlledByCurrentClient", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.deviceStatus.isHomeSecFreeControl", {
			val: false,
			ack: true
		});
		expect(adapterMock.delObjectAsync).toHaveBeenCalledWith("Devices.duid1.homeSecurity.connect", { recursive: true });
		expect(adapterMock.delObjectAsync).toHaveBeenCalledWith("Devices.duid1.smartWash", { recursive: true });
		expect(adapterMock.delObjectAsync).toHaveBeenCalledWith("Devices.duid1.washTowel", { recursive: true });
	});

	it("derives source-backed program runtime state and command labels", async () => {
		requestsHandlerMock.sendRequest.mockImplementation(async (_duid: string, method: string) => {
			switch (method) {
				case "app_tidy_up_record_summary":
					return { count: 0 };
				case "app_get_programs_summary":
					return { result: [] };
				case "app_get_program_runtime":
					return {
						result: {
							program_state: 2,
							result: [
								{ cmd_id: "move_forward", cmdText: "Forward", time: 3, speed: 2, result: 2 },
								{ cmd_id: "arm_move", value: [1, 0, 2, 1], step: 4, result: -2 }
							]
						}
					};
				case "app_get_program_soundlist":
					return { result: [] };
				case "get_homesec_connect_status":
					return { result: { client_id: "none" } };
				case "get_auto_delivery_cleaning_fluid":
				case "get_ap_mic_led_status":
				case "get_voice_service_switch":
				case "get_handle_leak_water_status":
					return { result: { status: 0, data: 0 } };
				case "get_fw_features":
					return [];
				case "get_smart_wash_params":
					return { smart_wash: 0, wash_interval: 1200 };
				case "get_wash_towel_params":
					return { interval: 10, status: 0, mode: 1 };
				case "get_wash_towel_mode":
					return { wash_mode: 1 };
				default:
					return {};
			}
		});
		adapterMock.getStateAsync.mockImplementation(async (id: string) => {
			if (id === "clientID") {
				return { val: "client-123" };
			}
			return {
				val: JSON.stringify({
					TIDY_ZONES: []
				})
			};
		});

		const feature = new A179Features(depsMock, "duid1");
		await feature.updateExtraStatus();

		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.programState", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.programStateLabel", {
			val: "Executing",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.commandsJSON", {
			val: '[{"cmd_id":"move_forward","cmdText":"Forward 3s @ 2","time":3,"speed":2,"result":2,"cmdId":"move_forward","statusText":"Executing"},{"cmd_id":"arm_move","value":[1,0,2,1],"step":4,"result":-2,"cmdId":"arm_move","cmdText":"M3 Up 4 | M5 Down 4 | Release Gripper","statusText":"Execution Failure 2"}]',
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.commandCount", {
			val: 2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.lastResult", {
			val: -2,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.lastResultLabel", {
			val: "Execution Failure 2",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.lastCommandId", {
			val: "arm_move",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.lastCommandText", {
			val: "M3 Up 4 | M5 Down 4 | Release Gripper",
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.runtime.hasFailure", {
			val: true,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.detailsCount", {
			val: 0,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.hasBlocklyPrograms", {
			val: false,
			ack: true
		});
		expect(adapterMock.setStateChanged).toHaveBeenCalledWith("Devices.duid1.program.totalCommandCount", {
			val: 0,
			ack: true
		});
	});
});
