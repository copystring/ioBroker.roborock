// Roborock S5

const states = {
	/**
	 * @namespace fan_power
	 * @description @fan_power_description@
	 * @property {number} 101 - @fan_power_101@
	 * @property {number} 102 - @fan_power_102@
	 * @property {number} 103 - @fan_power_103@
	 * @property {number} 104 - @fan_power_104@
	 * @property {number} 105 - @fan_power_105@
	 */
	fan_power: {
		101: "Quiet",
		102: "Balanced",
		103: "Turbo",
		104: "Max",
		105: "Off",
	},

	/**
     * @namespace state
     * @description @state_description@
     * @property {number} 0 - @state_0@
     * @property {number} 1 - @state_1@
     * @property {number} 2 - @state_2@
     * @property {number} 3 - @state_3@
     * @property {number} 4 - @state_4@
     * @property {number} 5 - @state_5@
     * @property {number} 6 - @state_6@
     * @property {number} 7 - @state_7@
     * @property {number} 8 - @state_8@
     * @property {number} 9 - @state_9@
     * @property {number} 10 - @state_10@
     * @property {number} 11 - @state_11@
     * @property {number} 12 - @state_12@
     * @property {number} 13 - @state_13@
     * @property {number} 14 - @state_14@
     * @property {number} 15 - @state_15@
     * @property {number} 16 - @state_16@
     * @property {number} 17 - @state_17@
     * @property {number} 18 - @state_18@
     * @property {number} 22 - @state_22@
     * @property {number} 23 - @state_23@
     * @property {number} 26 - @state_26@
     * @property {number} 28 - @state_28@
     * @property {number} 29 - @state_29@
     * @property {number} 100 - @state_100@
     */
	state: {
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
		22: "Empying dust container",
		23: "Washing the mop",
		26: "Going to wash the mop",
		28: "In call",
		29: "Mapping",
		100: "Fully Charged",
	},

	/**
     * @namespace error
     * @description @error_description@
     * @property {number} 0 - @error_0@
     * @property {number} 1 - @error_1@
     * @property {number} 2 - @error_2@
     * @property {number} 3 - @error_3@
     * @property {number} 4 - @error_4@
     * @property {number} 5 - @error_5@
     * @property {number} 6 - @error_6@
     * @property {number} 7 - @error_7@
     * @property {number} 8 - @error_8@
     * @property {number} 9 - @error_9@
     * @property {number} 10 - @error_10@
     * @property {number} 11 - @error_11@
     * @property {number} 12 - @error_12@
     * @property {number} 13 - @error_13@
     * @property {number} 14 - @error_14@
     * @property {number} 15 - @error_15@
     * @property {number} 16 - @error_16@
     * @property {number} 17 - @error_17@
     * @property {number} 18 - @error_18@
     * @property {number} 19 - @error_19@
     * @property {number} 20 - @error_20@
     * @property {number} 21 - @error_21@
     * @property {number} 22 - @error_22@
     * @property {number} 23 - @error_23@
     * @property {number} 24 - @error_24@
     * @property {number} 254 - @error_254@
     * @property {number} 255 - @error_255@
     * @property {string} -1 - @error_m1@
     */
	error: {
		0: "No error",
		1: "Laser sensor fault",
		2: "Collision sensor fault",
		3: "Wheel floating",
		4: "Cliff sensor fault",
		5: "Main brush blocked",
		6: "Side brush blocked",
		7: "Wheel blocked",
		8: "Device stuck",
		9: "Dust bin missing",
		10: "Filter blocked",
		11: "Magnetic field detected",
		12: "Low battery",
		13: "Charging problem",
		14: "Battery failure",
		15: "Wall sensor fault",
		16: "Uneven surface",
		17: "Side brush failure",
		18: "Suction fan failure",
		19: "Unpowered charging station",
		20: "Unknown Error",
		21: "Laser pressure sensor problem",
		22: "Charge sensor problem",
		23: "Dock problem",
		24: "No-go zone or invisible wall detected",
		254: "Bin full",
		255: "Internal error",
		"-1": "Unknown Error",
	},

	/**
	 * @namespace mop_mode
	 * @description @mop_mode_description@
	 * @property {string} 300 - @mop_mode_300@
	 * @property {string} 301 - @mop_mode_301@
	 * @property {string} 303 - @mop_mode_303@
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},
};

/**
 * @namespace deviceStatus
 * @description @deviceStatus_description@
 * @property {number} unsave_map_flag - @unsave_map_flag@
 * @property {number} unsave_map_reason - @unsave_map_reason@
 * @property {number} dock_error_status - @dock_error_status@
 * @property {number} debug_mode - @debug_mode@
 * @property {number} auto_dust_collection - @auto_dust_collection@
 * @property {number} dust_collection_status - @dust_collection_status@
 * @property {number} dock_type - @dock_type@
 * @property {string} adbumper_status - @adbumper_status@
 * @property {number} lock_status - @lock_status@
 * @property {number} is_locating - @is_locating@
 * @property {number} map_status - @map_status@
 * @property {number} dnd_enabled - @dnd_enabled@
 * @property {number} lab_status - @lab_status@
 * @property {number} in_fresh_state - @in_fresh_state@
 * @property {number} in_returning - @in_returning@
 * @property {number} in_cleaning - @in_cleaning@
 * @property {number} map_present - @map_present@
 * @property {number} error_code - @error_code@
 * @property {number} clean_area - @clean_area@
 * @property {number} clean_time - @clean_time@
 * @property {number} battery - @battery@
 * @property {number} state - @state@
 * @property {number} msg_seq - @msg_seq@
 * @property {number} msg_ver - @msg_ver@
 * @property {number} fan_power - @fan_power@
 * @property {number} mop_mode - @mop_mode@
 * @property {number} water_shortage_status - @water_shortage_status@
 * @property {number} mop_forbidden_enable - @mop_forbidden_enable@
 * @property {number} water_box_carriage_status - @water_box_carriage_status@
 * @property {number} water_box_status - @water_box_status@
 * @property {number} water_box_mode - @water_box_mode@
 * @property {number} water_box_custom_mode - @water_box_custom_mode@
 */
const deviceStatus = {
	unsave_map_flag: {
		name: "Unsave Map Flag",
		type: "number",
		write: false,
	},
	unsave_map_reason: {
		name: "Unsave Map Reason",
		type: "number",
		write: false,
	},
	dock_error_status: {
		name: "Dock Error Status",
		type: "number",
		write: false,
	},
	debug_mode: {
		name: "Debug mode",
		type: "number",
		write: false,
	},
	auto_dust_collection: {
		name: "Auto Dust Collection",
		type: "number",
		write: false,
	},
	dust_collection_status: {
		name: "Dust Collection Status",
		type: "number",
		write: false,
	},
	dock_type: {
		name: "Dock Type",
		type: "number",
		write: false,
	},
	adbumper_status: {
		name: "Adbumber Status",
		type: "string",
		write: false,
	},
	lock_status: {
		name: "Lock Status",
		type: "number",
		write: false,
	},
	is_locating: {
		name: "Is Locating",
		type: "number",
		write: false,
	},
	map_status: {
		name: "Currently selected map",
		type: "number",
		write: false,
	},
	dnd_enabled: {
		name: "DND Enabled",
		type: "number",
		write: false,
	},
	lab_status: {
		name: "Lab Status",
		type: "number",
		write: false,
	},
	in_fresh_state: {
		name: "In Fresh State",
		type: "number",
		write: false,
	},
	in_returning: {
		name: "Is returning",
		type: "number",
		write: false,
	},
	in_cleaning: {
		name: "Is Cleaning",
		type: "number",
		write: false,
	},
	map_present: {
		name: "Map Present",
		type: "number",
		write: false,
	},
	error_code: {
		name: "Error Code",
		type: "number",
		states: states["error"],
		write: false,
	},
	clean_area: {
		name: "Cleaned Area",
		type: "number",
		unit: "m²",
		divider: 1000000,
		write: false,
	},
	clean_time: {
		name: "Cleaning Time",
		type: "number",
		unit: "min",
		divider: 60,
		write: false,
	},
	battery: {
		name: "Battery Percentage",
		type: "number",
		unit: "%",
		write: false,
	},
	state: {
		name: "State",
		type: "number",
		states: states["state"],
		write: false,
	},
	msg_seq: {
		name: "Message Sequence",
		type: "number",
		write: false,
	},
	msg_ver: {
		name: "Message Version",
		type: "number",
		write: false,
	},
	fan_power: {
		type: "number",
		name: "Fan power",
		states: states["fan_power"],
		write: false,
	},
	mop_mode: {
		name: "Mop mode",
		type: "number",
		states: states["mop_mode"],
		write: false,
	},
	water_shortage_status: {
		name: "Water Shortage Status",
		type: "number",
		write: false,
	},
	mop_forbidden_enable: {
		name: "Mop Forbidden Enable",
		type: "number",
		write: false,
	},
	water_box_carriage_status: {
		name: "Water Box Carriage Status",
		type: "number",
		write: false,
	},
	water_box_status: {
		name: "Water Box Status",
		type: "number",
		write: false,
	},
	water_box_mode: {
		type: "number",
		name: "Amount of water to use",
		states: states["water_box_mode"],
		write: false,
	},
};

/**
 * @namespace consumables
 * @description @consumables_description@
 * @property {Object} main_brush_work_time - @main_brush_work_time@
 * @property {Object} side_brush_work_time - @side_brush_work_time@
 * @property {Object} filter_work_time - @filter_work_time@
 * @property {Object} filter_element_work_time - @filter_element_work_time@
 * @property {Object} sensor_dirty_time - @sensor_dirty_time@
 * @property {Object} 125 - @main_brush_life@
 * @property {Object} 126 - @side_brush_life@
 * @property {Object} 127 - @filter_life@
 */
const consumables = {
	main_brush_work_time: {
		name: "Main brush used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	side_brush_work_time: {
		name: "Side brush used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	filter_work_time: {
		name: "Filter used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	filter_element_work_time: {
		name: "Filter element used hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	sensor_dirty_time: {
		name: "Time since last cleaning of sensors",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
	125: {
		name: "Main brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	126: {
		name: "Side brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	127: {
		name: "Filter life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
};

/**
 * @namespace resetConsumables
 * @description @resetConsumables_description@
 * @property {Object} main_brush_work_time - @reset_main_brush_work_time@
 * @property {Object} side_brush_work_time - @reset_side_brush_work_time@
 * @property {Object} filter_work_time - @reset_filter_work_time@
 * @property {Object} filter_element_work_time - @reset_filter_element_work_time@
 * @property {Object} sensor_dirty_time - @reset_sensor_dirty_time@
 */
const resetConsumables = {
	main_brush_work_time: {
		name: "Main brush",
		type: "boolean",
		def: false,
		write: true,
	},
	side_brush_work_time: {
		name: "Side brush",
		type: "boolean",
		def: false,
		write: true,
	},
	filter_work_time: {
		name: "Filter",
		type: "boolean",
		def: false,
		write: true,
	},
	filter_element_work_time: {
		name: "Filter element",
		type: "boolean",
		def: false,
		write: true,
	},
	sensor_dirty_time: {
		name: "Sensors",
		type: "boolean",
		def: false,
		write: true,
	},
};

/**
 * @namespace commands
 * @description @commands_description@
 * @property {Object} app_start - @app_start@
 * @property {Object} app_segment_clean - @app_segment_clean@
 * @property {Object} resume_segment_clean - @resume_segment_clean@
 * @property {Object} app_stop - @app_stop@
 * @property {Object} app_pause - @app_pause@
 * @property {Object} app_charge - @app_charge@
 * @property {Object} app_spot - @app_spot@
 * @property {Object} app_zoned_clean - @app_zoned_clean@
 * @property {Object} resume_zoned_clean - @resume_zoned_clean@
 * @property {Object} stop_zoned_clean - @stop_zoned_clean@
 * @property {Object} set_custom_mode - @set_custom_mode@
 * @property {Object} find_me - @find_me@
 * @property {Object} app_goto_target - @app_goto_target@
 * @property {Object} set_mop_mode - @set_mop_mode@
 * @property {Object} set_water_box_custom_mode - @set_water_box_custom_mode@
 */
const commands = {
	app_start: {
		type: "boolean",
		name: "Start vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_segment_clean: {
		type: "boolean",
		name: "Start room cleaning",
		def: false,
		states: null,
		write: true,
	},
	resume_segment_clean: {
		type: "boolean",
		name: "Resume room cleaning",
		def: false,
		states: null,
		write: true,
	},
	app_stop: {
		type: "boolean",
		name: "Stop vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_pause: {
		type: "boolean",
		name: "Pause vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_charge: {
		type: "boolean",
		name: "Charge vacuum",
		def: false,
		states: null,
		write: true,
	},
	app_spot: {
		type: "boolean",
		name: "Spot cleaning",
		def: false,
		states: null,
		write: true,
	},
	app_zoned_clean: {
		type: "json",
		name: "Zone cleaning",
		write: true,
	},
	resume_zoned_clean: {
		type: "boolean",
		name: "Resume zone cleaning",
		def: false,
		write: true,
	},
	stop_zoned_clean: {
		type: "boolean",
		name: "Stop zone cleaning",
		def: false,
		write: true,
	},
	set_custom_mode: {
		type: "number",
		name: "Suction Power",
		def: 101,
		states: states["fan_power"],
		write: true,
	},
	find_me: {
		type: "boolean",
		name: "Find me",
		def: false,
		write: true,
	},
	app_goto_target: {
		type: "json",
		name: "Go to",
		def: null,
		write: true,
	},
	set_mop_mode: {
		type: "number",
		name: "Mop Route",
		def: 300,
		states: states["mop_mode"],
		write: true,
	},
	set_water_box_custom_mode: {
		type: "number",
		name: "Scrub Intensity",
		def: 201,
		states: states["water_box_custom_mode"],
		write: true,
	},
};

/**
 * @namespace cleaningInfo
 * @description @cleaningInfo_description@
 * @property {Object} 0 - @clean_time@
 * @property {Object} 1 - @clean_area@
 * @property {Object} 2 - @clean_count@
 * @property {Object} 3 - @dust_collection_count@
 */
const cleaningInfo = {
	0: { name: "Total Time", type: "number", unit: "h", write: false },
	1: { name: "Total Area", type: "number", unit: "m²", write: false },
	2: { name: "Cycles", type: "number", write: false },
	3: { name: "Records", type: "number", write: false },
};

/**
 * @namespace cleaningRecords
 * @description @cleaningRecords_description@
 * @property {Object} 0 - @start_cleaning_time@
 * @property {Object} 1 - @end_cleaning_time@
 * @property {Object} 2 - @duration_cleaning_time@
 * @property {Object} 3 - @cleaning_area@
 * @property {Object} 4 - @error_type@
 * @property {Object} 5 - @completion_type@
 * @property {Object} 6 - @start_type@
 * @property {Object} 7 - @clean_type@
 * @property {Object} 8 - @clean_finish_reason@
 */
const cleaningRecords = {
	0: {
		name: "Start cleaning time",
		type: "string",
		write: false,
	},
	1: {
		name: "End cleaning time",
		type: "string",
		write: false,
	},
	2: {
		name: "Duration cleaning time",
		type: "number",
		unit: "min",
		write: false,
	},
	3: {
		name: "Cleaning Area",
		type: "number",
		unit: "m²",
		write: false,
	},
	4: {
		name: "Error Type",
		type: "number",
		write: false,
	},
	5: {
		name: "Completion Type",
		type: "number",
		write: false,
	},
	6: {
		name: "Start Type",
		type: "number",
		write: false,
	},
	7: {
		name: "Clean Type",
		type: "number",
		write: false,
	},
	8: {
		name: "Clean Finish Reason",
		type: "number",
		write: false,
	},
};

module.exports = {
	states,
	deviceStatus,
	consumables,
	resetConsumables,
	cleaningInfo,
	cleaningRecords,
	commands,
};