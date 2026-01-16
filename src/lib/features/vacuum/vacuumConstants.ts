import EXTRACTED_ERRORS from "../../protocols/s7_maxv_dataset.json";

interface S7Dataset {
	[lang: string]: Record<string, string>;
}

export const VACUUM_CONSTANTS = {
	errorCodes: {
		0: "No error",
		// Use S7 MaxV dataset as the standardized error definition for the entire adapter
		// This supersedes legacy hardcoded lists and serves as the baseline for V1 and B01
		// SCHEMA VERIFIED: The S7 dataset structure is flat: { [lang]: { [code]: "text" } }.
		// It does NOT follow the Q7 nested structure.
		...((EXTRACTED_ERRORS as unknown as S7Dataset)["en"] || {}),
		// Add legacy/missing codes
		254: "Bin full",
		255: "Internal error",
		"-1": "Unknown Error",
	},
	errorCodes_languages: EXTRACTED_ERRORS as Record<string, Record<string, string>>,
	stateCodes: {
		0: "Unknown",
		1: "Initiating",
		2: "Sleeping",
		3: "Idle",
		4: "Remote Control",
		5: "Cleaning",
		6: "Returning Dock",
		7: "Manual Mode",
		8: "Charging",
		9: "Charging Error",
		10: "Paused",
		11: "Spot Cleaning",
		12: "In Error",
		13: "Shutting Down",
		14: "Updating",
		15: "Docking",
		16: "Go To",
		17: "Zone Clean",
		18: "Room Clean",
		22: "Emptying dust container",
		23: "Washing the mop",
		26: "Going to wash the mop",
		28: "In call",
		29: "Mapping",
		100: "Fully Charged",
	},
	dockTypes: {
		0: "Charging dock",
		1: "Auto-Empty Dock",
		2: "Empty Wash Fill Dock",
		3: "Empty Wash Fill (Dry) Dock",
		5: "Auto-Empty Dock (Q8 Max+)",
		6: "Empty Wash Fill Dry Dock (S8 Pro Ultra)",
		7: "Empty Wash Fill Dry Dock (S8 Pro Ultra)",
		8: "Empty Wash Fill Dry Dock (Q Revo)",
		9: "Empty Wash Fill Dry Dock (Q Revo Pro)",
		10: "Empty Wash Fill Dock (S7 MaxV Ultra)",
		14: "Empty Wash Fill Dry Dock (Qrevo Master)",
		15: "Empty Wash Fill Dry Dock (Qrevo S)",
		16: "Empty Wash Fill Dry Dock (Saros 10R)",
		17: "Empty Wash Fill Dry Dock (Qrevo Curv)",
		18: "Empty Wash Fill Dry Dock (S8 Pro)",
	},
	// B01 Devices: Property lists from user sniff logs (Protocol 101/102 via prop.get)
	b01StatusProps: [
		"status", "fault", "wind", "water", "mode", "quantity", "repeat_state", "tank_state",
		"sweep_type", "clean_path_preference", "cloth_state", "time_zone", "time_zone_info",
		"language", "cleaning_time", "real_clean_time", "cleaning_area", "custom_type",
		"work_mode", "charge_state", "current_map_id", "map_num", "dust_action",
		"quiet_is_open", "clean_finish", "build_map", "dust_frequency", "multi_floor",
		"pv_charging", "recommend", "add_sweep_status"
	],
	b01SettingsProps: [
		"alarm", "volume", "hypa", "main_brush", "side_brush", "mop_life", "main_sensor",
		"net_status", "sound", "station_act", "quiet_begin_time", "quiet_end_time",
		"voice_type", "voice_type_version", "order_total", "privacy", "dust_auto_state",
		"light_mode", "order_save_mode", "manufacturer", "child_lock", "charge_station_type",
		"carpet_turbo", "green_laser"
	],

	baseCommands: {
		app_start: { type: "boolean", def: false },
		app_segment_clean: { type: "boolean", def: false },
		app_stop: { type: "boolean", def: false },
		app_pause: { type: "boolean", def: false },
		app_charge: { type: "boolean", def: false },
		app_spot: { type: "boolean", def: false },
		app_zoned_clean: { type: "json" },
		resume_zoned_clean: { type: "boolean", def: false },
		stop_zoned_clean: { type: "boolean", def: false },
		resume_segment_clean: { type: "boolean", def: false },
		stop_segment_clean: { type: "boolean", def: false },
		set_custom_mode: { type: "number", def: 102, states: { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max", 105: "Off" } },
		find_me: { type: "boolean", def: false },
		app_goto_target: { type: "json" },
		set_clean_motor_mode: { type: "json", def: '{"fan_power":102,"mop_mode":300,"water_box_mode":201}' },
	},
	deviceStates: {
		dock_type: { type: "number", states: {} },
		error_code: { type: "number", states: {} },
		clean_area: { type: "number", unit: "m²" },
		clean_time: { type: "number", unit: "min" },
		battery: { type: "number", unit: "%" },
		state: { type: "number", states: {} },
		fan_power: { type: "number", states: { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max", 105: "Off" } },
		clean_percent: { type: "number", unit: "%" },
		water_box_mode: { type: "number", states: { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense", 204: "Custom", 205: "Custom", 206: "Custom", 207: "Custom", 208: "Custom", 209: "Custom" } },
		mop_mode: { type: "number", states: { 300: "Standard", 301: "Deep", 303: "Deep+", 304: "Fast" } },
		carpet_mode: {
			type: "string",
			states: {
				'[{"enable":0,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]': "off",
				'[{"enable":1,"stall_time":10,"current_low":400,"current_high":500,"current_integral":450}]': "on",
			},
		},
		carpet_clean_mode: {
			type: "number",
			states: {
				0: "Avoid",
				1: "Rise",
				2: "Ignore",
			},
		},
		unsave_map_flag: { type: "number" },
		unsave_map_reason: { type: "number" },
		dock_error_status: { type: "number" },
		debug_mode: { type: "number" },
		auto_dust_collection: { type: "number" },
		dust_collection_status: { type: "number" },
		adbumper_status: { type: "string" },
		lock_status: { type: "number" },
		is_locating: { type: "number" },
		map_status: { type: "number" },
		dnd_enabled: { type: "number" },
		lab_status: { type: "number" },
		in_fresh_state: { type: "number" },
		in_returning: { type: "number" },
		in_cleaning: { type: "number" },
		in_warmup: { type: "number" },
		map_present: { type: "number" },
		is_exploring: { type: "number" },
		events: { type: "string" },
		subdivision_sets: { type: "number" },
		repeat: { type: "number" },
		replenish_mode: { type: "number" },
		rdt: { type: "number" },
		camera_status: { type: "number" },
		distance_off: { type: "number" },
		wash_phase: { type: "number" },
		wash_ready: { type: "number" },
		wash_status: { type: "number" },
		back_type: { type: "number" },
		collision_avoid_status: { type: "number" },
		avoid_count: { type: "number" },
		switch_map_mode: { type: "number" },
		charge_status: { type: "number" },
		dry_status: { type: "number" },
		extra_time: { type: "number" },
		rss: { type: "number" },
		dss: { type: "number" },
		common_status: { type: "number" },
		kct: { type: "number" },
		sterilize_status: { type: "number" },
		rst: { type: "number" },
		switch_status: { type: "number" },
		last_clean_t: { type: "string" },
		cleaning_info: { type: "string" },
		exit_dock: { type: "number" },
		dtof_status: { type: "number" },
		seq_type: { type: "number" },
		mop_forbidden_enable: { type: "number" },
		voice_chat_status: { type: "number" },
		corner_clean_mode: { type: "number" },
		home_sec_status: { type: "number" },
		home_sec_enable_password: { type: "number" },
		monitor_status: { type: "number" },
		clean_fluid: { type: "number" },
		water_box_carriage_status: { type: "number" },
		water_box_status: { type: "number" },
		water_shortage_status: { type: "number" },
		cleaned_area: { type: "number", unit: "m²" },
		clean_times: { type: "number" },
		along_floor: { type: "number", def: 0, states: { 0: "Off", 1: "On" }, write: true },
		green_laser: { type: "number", def: 0, states: { 0: "Off", 1: "On" }, write: true },
		dust_bag_used: { type: "number", def: 0 },
		add_sweep_status: { type: "number", def: 0, states: { 0: "None", 1: "Active" } },
		status: {
			type: "number",
			def: 3,
			states: {
				1: "Start",
				2: "Stop",
				3: "Idle",
				5: "Cleaning",
				6: "Home",
				7: "Manual",
				8: "Charging",
				9: "Charge Error",
				10: "Pause",
				11: "Spot",
				12: "Error",
				14: "Updating",
				15: "Docking",
				16: "Go To",
				17: "Zone Clean",
				18: "Room Clean",
				22: "Emptying",
				23: "Washing",
				26: "Going to Wash",
				28: "In Call",
				29: "Mapping",
				100: "Fully Charged",
			},
			write: true,
		},
		wind: {
			type: "number",
			def: 102,
			states: { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max", 105: "Off", 108: "Max+" },
			write: true,
		},
		water: {
			type: "number",
			def: 201,
			states: { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense", 204: "Custom" },
			write: true,
		},
	},
	consumables: {
		main_brush_work_time: { type: "number", unit: "h" },
		side_brush_work_time: { type: "number", unit: "h" },
		filter_work_time: { type: "number", unit: "h" },
		filter_element_work_time: { type: "number", unit: "h" },
		sensor_dirty_time: { type: "number", unit: "h" },
		dust_collection_work_times: { type: "number", unit: "h" },
		main_brush_life: { type: "number", unit: "%" },
		side_brush_life: { type: "number", unit: "%" },
		filter_life: { type: "number", unit: "%" },
		strainer_work_times: { type: "number", unit: "h" },
		cleaning_brush_work_times: { type: "number", unit: "%" },
	},
	resetConsumables: new Set([
		"main_brush_work_time",
		"side_brush_work_time",
		"filter_work_time",
		"filter_element_work_time",
		"sensor_dirty_time",
		"dust_collection_work_times",
		"strainer_work_times",
		"cleaning_brush_work_times",
	]),
	cleaningRecords: {
		0: { type: "string" }, // begin
		1: { type: "string" }, // end
		2: { type: "number", unit: "min" }, // duration
		3: { type: "number", unit: "m²" }, // area
		4: { type: "number" }, // error
		5: { type: "number" }, // complete
		6: { type: "number" }, // start_type
		7: { type: "number" }, // clean_type
		8: { type: "number" }, // finish_reason
		9: { type: "number" }, // dust_collection_status

		// Mapped from name
		begin: { type: "string" },
		end: { type: "string" },
		duration: { type: "number", unit: "min" },
		area: { type: "number", unit: "m²" },
		error: { type: "number" },
		complete: { type: "number" },
		start_type: { type: "number" },
		clean_type: { type: "number" },
		finish_reason: { type: "number" },
		dust_collection_status: { type: "number" },

		cleaned_area: { type: "number", unit: "m²" },
		task_id: { type: "number" },
		clean_times: { type: "number" },
		dirty_replenish: { type: "number" },
		manual_replenish: { type: "number" },
		map_flag: { type: "number" },
		wash_count: { type: "number" },
		avoid_count: { type: "number" },
		sub_source: { type: "number" },
		extra_time: { type: "number" },
	},
	cleaningInfo: {
		0: { type: "number", unit: "h" },
		1: { type: "number", unit: "m²" },
		clean_time: { type: "number", unit: "h" },
		clean_area: { type: "number", unit: "m²" },
		clean_count: { type: "number" },
		dust_collection_count: { type: "number" },
	},
	firmwareFeatures: {
		111: "isSupportFDSEndPoint",
		112: "isSupportAutoSplitSegments",
		114: "isSupportOrderSegmentClean",
		116: "isMapSegmentSupported",
		119: "isSupportLedStatusSwitch",
		120: "isMultiFloorSupported",
		122: "isSupportFetchTimerSummary",
		123: "isOrderCleanSupported",
		125: "isRemoteSupported",
	} as const,

	/**
	 * Helper to resolve language fallback for error codes.
	 * Returns the localized error map or undefined if not found.
	 */
	resolveErrorCodeFallback(lang: string | undefined | null): Record<string, string> | undefined {
		if (!lang) return undefined;
		// Check exact match first
		if (this.errorCodes_languages[lang]) return this.errorCodes_languages[lang];

		// Check base language (e.g., 'es' from 'es-LA' or 'es-MX')
		if (lang.includes("-")) {
			const baseLang = lang.split("-")[0].toLowerCase();
			if (this.errorCodes_languages[baseLang]) return this.errorCodes_languages[baseLang];
		}

		return undefined;
	},
};

export type FirmwareFeatures = typeof VACUUM_CONSTANTS.firmwareFeatures;
export type FirmwareFeatureId = keyof FirmwareFeatures;
