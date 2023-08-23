// Roborock S8

const states = {
	/**
	 * @namespace fan_power
	 * @description Mapping of fan power states.
	 * @property {number} 101 - Quiet
	 * @property {number} 102 - Balanced
	 * @property {number} 103 - Turbo
	 * @property {number} 104 - Max
	 * @property {number} 105 - Off
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
	 * @description Mapping of robot activity states.
	 * @property {number} 0 - Unknown
	 * @property {number} 1 - Initiating
	 * @property {number} 2 - Sleeping
	 * @property {number} 3 - Idle
	 * @property {number} 4 - Remote Control
	 * @property {number} 5 - Cleaning
	 * @property {number} 6 - Returning Dock
	 * @property {number} 7 - Manual Mode
	 * @property {number} 8 - Charging
	 * @property {number} 9 - Charging Error
	 * @property {number} 10 - Paused
	 * @property {number} 11 - Spot Cleaning
	 * @property {number} 12 - In Error
	 * @property {number} 13 - Shutting Down
	 * @property {number} 14 - Updating
	 * @property {number} 15 - Docking
	 * @property {number} 16 - Go To
	 * @property {number} 17 - Zone Clean
	 * @property {number} 18 - Room Clean
	 * @property {number} 22 - Emptying dust container
	 * @property {number} 23 - Washing the mop
	 * @property {number} 26 - Going to wash the mop
	 * @property {number} 28 - In call
	 * @property {number} 29 - Mapping
	 * @property {number} 100 - Fully Charged
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
	 * @description Mapping of robot errors.
	 * @property {number} 0 - No error
	 * @property {number} 1 - Laser sensor fault
	 * @property {number} 2 - Collision sensor fault
	 * @property {number} 3 - Wheels on top of void
	 * @property {number} 4 - Clean hovering sensors
	 * @property {number} 5 - Clean main brush
	 * @property {number} 6 - Clean side brushes
	 * @property {number} 7 - Main wheel stuck?
	 * @property {number} 8 - Device stuck, clean area
	 * @property {number} 9 - Dust collector missing
	 * @property {number} 10 - Clean filter
	 * @property {number} 11 - Stuck in magnetic barrier
	 * @property {number} 12 - Low battery
	 * @property {number} 13 - Charging fault
	 * @property {number} 14 - Battery fault
	 * @property {number} 15 - Wall sensors fault
	 * @property {number} 16 - Dirty drop sensors
	 * @property {number} 17 - Main brush stuck
	 * @property {number} 18 - Side brush stuck
	 * @property {number} 19 - Suction fan fault
	 * @property {number} 20 - Unpowered charging station
	 * @property {number} 21 - Laser pressure sensor problem
	 * @property {number} 22 - Charge sensor problem
	 * @property {number} 23 - Dock problem
	 * @property {number} 24 - No-go zone or invisible wall detected
	 * @property {number} 254 - Bin full
	 * @property {number} 255 - Internal error
	 * @property {string} -1 - Unknown Error
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
	 * @description Mapping of mop modes.
	 * @property {string} 300 - Standard
	 * @property {string} 301 - Deep
	 * @property {string} 303 - Deep+
	 */
	mop_mode: {
		300: "Standard",
		301: "Deep",
		303: "Deep+",
	},

	/**
	 * @namespace water_box_custom_mode
	 * @description Mapping of water box custom modes.
	 * @property {string} 200 - Off mode
	 * @property {string} 201 - Mild mode
	 * @property {string} 202 - Moderate mode
	 * @property {string} 203 - Intense mode
	 */
	water_box_custom_mode: {
		200: "Off",
		201: "Mild",
		202: "Moderate",
		203: "Intense",
	},

	/**
	 * @namespace carpet_mode
	 * @description Represents the carpet mode settings for the vacuum.
	 * Each key is a JSON string that encodes the settings, and each value
	 * indicates whether the mode is "on" or "off".
	 *
	 * @property {string} '[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - Carpet mode is off
	 * @property {string} '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]' - Carpet mode is on
	 */
	carpet_mode: {
		'[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]':
			"off",
		'[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]':
			"on",
	},

	/**
	 * @namespace carpet_clean_mode
	 * @description Represents the different cleaning modes for carpets.
	 * Each key is a JSON string that encodes the mode setting, and each value
	 * indicates the behavior of the vacuum on carpets.
	 *
	 * @property {string} '{"carpet_clean_mode": 0}' - The vacuum avoids carpets.
	 * @property {string} '{"carpet_clean_mode": 1}' - The vacuum rises the mop on carpets.
	 * @property {string} '{"carpet_clean_mode": 2}' - The vacuum ignores the presence of carpets and cleans normally.
	 */
	carpet_clean_mode: {
		'{"carpet_clean_mode": 0}': "Avoid",
		'{"carpet_clean_mode": 1}': "Rise",
		'{"carpet_clean_mode": 2}': "Ignore",
	},

	/**
	 * @namespace water_box_mode
	 * @description Represents the different modes for water box usage.
	 * Each key is a string representing a mode ID, and each value
	 * describes the water output level for the mopping function.
	 *
	 * @property {string} "200" - The water box is turned off.
	 * @property {string} "201" - Low level of water output.
	 * @property {string} "202" - Medium level of water output.
	 * @property {string} "203" - High level of water output.
	 * @property {string} "204" - Customize automatically based on the surface.
	 * @property {string} "207" - User customized water output levels.
	 */
	water_box_mode: {
		200: "Off",
		201: "Low",
		202: "Medium",
		203: "High",
		204: "Customize (Auto)",
		207: "Custom (Levels)",
	},
};

/**
 * @namespace deviceStatus
 * @description Mapping of robot states.
 * @property {number} unsave_map_flag - Unsave Map Flag
 * @property {number} unsave_map_reason - Unsave Map Reason
 * @property {number} dock_error_status - Dock Error Status
 * @property {number} debug_mode - Debug mode
 * @property {number} auto_dust_collection - Auto Dust Collection
 * @property {number} dust_collection_status - Dust Collection Status
 * @property {number} dock_type - Dock Type
 * @property {string} adbumper_status - Adbumber Status
 * @property {number} lock_status - Lock Status
 * @property {number} is_locating - Is Locating
 * @property {number} map_status - Currently selected map
 * @property {number} dnd_enabled - DND Enabled
 * @property {number} lab_status - Lab Status
 * @property {number} in_fresh_state - In Fresh State
 * @property {number} in_returning - Is returning
 * @property {number} in_cleaning - Is Cleaning
 * @property {number} map_present - Map Present
 * @property {number} error_code - Error Code
 * @property {number} clean_area - Cleaned Area
 * @property {number} clean_time - Cleaning Time
 * @property {number} battery - Battery Percentage
 * @property {number} state - State
 * @property {number} msg_seq - Message Sequence
 * @property {number} msg_ver - Message Version
 * @property {number} fan_power - Fan power
 * @property {number} mop_mode - Mop Mode
 * @property {number} water_shortage_status - Water Shortage Status
 * @property {number} mop_forbidden_enable - Mop Forbidden Enable
 * @property {number} water_box_carriage_status - Water Box Carriage Status
 * @property {number} water_box_status - Water Box Status
 * @property {number} water_box_mode - Amount of water to use
 * @property {number} distance_off - Distance Off
 * @property {number} carpet_mode - Carpet Boost
 * @property {number} is_exploring - Is Exploring
 * @property {number} water_box_custom_mode - Custom water usage mode
 * @property {string} carpet_clean_mode - Carpet avoidance mode
 * @property {number} dss - Collision Avoid Status
 * @property {number} rss - Signal quality
 * @property {number} clean_percent - Cleaning percent completed
 * @property {number} charge_status - Charging status
 * @property {number} switch_map_mode - Switch map mode
 * @property {number} collision_avoid_status - Collision Avoid Status
 * @property {number} avoid_count - Avoid count
 * @property {number} camera_status - Camera
 * @property {number} last_clean_t - Last clean time
 * @property {number} rdt - ???
 * @property {number} dry_status - Drying status
 * @property {number} wash_status - Washing status
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
	distance_off: {
		name: "Distance Off",
		type: "number",
		write: false,
	},
	carpet_mode: {
		type: "string",
		name: "Carpet Boost",
		states: states["carpet_mode"],
		write: false,
	},
	is_exploring: {
		type: "number",
		name: "Is Exploring",
		write: false,
	},
	water_box_custom_mode: {
		type: "number",
		name: "Scrub Intensity",
		states: states["water_box_custom_mode"],
		write: false,
	},
	carpet_clean_mode: {
		type: "string",
		name: "Carpet Avoidance Mode",
		states: states["carpet_clean_mode"],
		write: false,
	},
	dss: {
		"type": "number",
		"name": "Collision Avoid Status",
		"write": false
	},
	rss: {
		"type": "number",
		"name": "Signal quality",
		"write": false
	},
	clean_percent: {
		"type": "number",
		"name": "Cleaning percent completed",
		"write": false
	},
	charge_status: {
		"type": "number",
		"name": "Charging status",
		"write": false
	},
	switch_map_mode: {
		"type": "number",
		"name": "Switch map mode",
		"write": false
	},
	collision_avoid_status: {
		"type": "number",
		"name": "Collision Avoid Status",
		"write": false
	},
	avoid_count: {
		"type": "number",
		"name": "Avoid count",
		"write": false
	},
	camera_status: {
		"type": "number",
		"name": "Camera",
		"write": false
	},
	last_clean_t: {
		"type": "number",
		"name": "Last clean time",
		"write": false
	},
	rdt: {
		"type": "number",
		"name": "???",
		"write": false
	},
	dry_status: {
		"type": "number",
		"name": "Drying status",
		"write": false
	},
	wash_status: {
		"type": "number",
		"name": "Washing status",
		"write": false
	},
};

/**
 * @namespace consumables
 * @description Mapping of consumables.
 * @property {Object} main_brush_work_time - Main brush used hours
 * @property {Object} side_brush_work_time - Side brush used hours
 * @property {Object} filter_work_time - Filter used hours
 * @property {Object} filter_element_work_time - Filter element used hours
 * @property {Object} sensor_dirty_time - Time since last cleaning of sensors
 * @property {Object} dust_collection_work_times - Dust collection hours
 * @property {Object} 125 - Main brush life
 * @property {Object} 126 - Side brush life
 * @property {Object} 127 - Filter life
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
	dust_collection_work_times: {
		name: "Dust collection hours",
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
 * @description Description of resettable consumables.
 * @property {Object} main_brush_work_time - Main brush
 * @property {Object} side_brush_work_time - Side brush
 * @property {Object} filter_work_time - Filter
 * @property {Object} filter_element_work_time - Filter element
 * @property {Object} sensor_dirty_time - Sensors
 * @property {Object} dust_collection_work_times - Dust collection
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
	dust_collection_work_times: {
		name: "Dust collection",
		type: "boolean",
		def: false,
		write: true,
	},
};

/**
 * @namespace commands
 * @description Description of each robot command.
 * @property {Object} app_start - Starts cleaning
 * @property {Object} app_segment_clean - Start room cleaning
 * @property {Object} resume_segment_clean - Resume room cleaning
 * @property {Object} app_stop - Stops cleaning
 * @property {Object} app_pause - Pause cleaning
 * @property {Object} app_charge - Return to dock
 * @property {Object} app_spot - Start spot cleaning
 * @property {Object} app_zoned_clean - Start zone cleaning
 * @property {Object} resume_zoned_clean - Resume zone cleaning
 * @property {Object} stop_zoned_clean - Stop zone cleaning
 * @property {Object} set_custom_mode - Set custom mode or suction power
 * @property {Object} find_me - Find the robot
 * @property {Object} app_goto_target - Go to target
 * @property {Object} set_mop_mode - Mop Route
 * @property {Object} set_water_box_custom_mode - Scrub Intensity
 * @property {Object} set_carpet_mode - Carpet Boost
 * @property {Object} set_carpet_clean_mode - Carpet Avoidance Mode
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
	set_carpet_mode: {
		type: "string",
		name: "Carpet Boost",
		def: '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]',
		states: states["carpet_mode"],
		write: true,
	},
	set_carpet_clean_mode: {
		type: "string",
		name: "Carpet Avoidance Mode",
		def: '{"carpet_clean_mode": 1}',
		states: states["carpet_clean_mode"],
		write: true,
	},
};

/**
 * @namespace cleaningInfo
 * @description Description of cleaning information.
 * @property {Object} clean_time - Total cleaning time
 * @property {Object} clean_area - Total cleaning area
 * @property {Object} clean_count - Total cleaning cycles
 * @property {Object} dust_collection_count - Total cleaning records
 */
const cleaningInfo = {
	clean_time: { name: "Total Time", type: "number", unit: "h", write: false },
	clean_area: { name: "Total Area", type: "number", unit: "m²", write: false },
	clean_count: { name: "Cycles", type: "number", write: false },
	dust_collection_count: {
		name: "Times Dust Collected",
		type: "number",
		write: false,
	},
};

/**
 * @namespace cleaningRecords
 * @description Description of the cleaning records.
 * @property {Object} begin - Start cleaning time
 * @property {Object} end - End cleaning time
 * @property {Object} duration - Duration cleaning time
 * @property {Object} area - Cleaning Area
 * @property {Object} error - Error Type
 * @property {Object} complete - Completion Type
 * @property {Object} start_type - Start Type
 * @property {Object} clean_type - Clean Type
 * @property {Object} finish_reason - Clean Finish Reason
 * @property {Object} dust_collection_status - Dust Collection Status
 * @property {Object} map_flag - ID of used map
 * @property {Object} avoid_count - How many obstacles have been avoided
 */
const cleaningRecords = {
	begin: {
		name: "Start cleaning time",
		type: "string",
		write: false,
	},
	end: {
		name: "End cleaning time",
		type: "string",
		write: false,
	},
	duration: {
		name: "Duration cleaning time",
		type: "number",
		unit: "min",
		write: false,
	},
	area: {
		name: "Cleaning Area",
		type: "number",
		unit: "m²",
		write: false,
	},
	error: {
		name: "Error Type",
		type: "number",
		write: false,
	},
	complete: {
		name: "Completion Type",
		type: "number",
		write: false,
	},
	start_type: {
		name: "Start Type",
		type: "number",
		write: false,
	},
	clean_type: {
		name: "Clean Type",
		type: "number",
		write: false,
	},
	finish_reason: {
		name: "Clean Finish Reason",
		type: "number",
		write: false,
	},
	dust_collection_status: {
		name: "Dust Collection Status",
		type: "number",
		write: false,
	},
	map_flag: {
		"name": "ID of used map",
		"type": "number",
		"write": false
	},
	avoid_count: {
		"name": "How many obstacles have been avoided.",
		"type": "number",
		"write": false
	}
};

/**
 * @namespace camera
 * @description Information related to different camera stream formats.
 * @property {string} stream_html - html stream
 * @property {string} rtsp - rtsp stream
 * @property {string} stream_mp4 - mp4 stream
 */
const camera = {
	stream_html: {
		"name": "html stream",
		"type": "string",
		"write": false
	},
	rtsp: {
		"name": "rtsp stream",
		"type": "string",
		"write": false
	},
	stream_mp4: {
		"name": "mp4 stream",
		"type": "string",
		"write": false
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
	camera,
};