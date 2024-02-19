// Roborock S6
// Roborock S6 Pure
// Roborock S6 MaxV

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
 * @property {Object} set_mop_mode - @set_mop_mode@
 * @property {Object} set_water_box_distance_off - @set_water_box_distance_off@
 */
const commands = {
	set_mop_mode: {
		type: "number",
		name: "Mop Route",
		def: 300,
		states: states["mop_mode"],
		write: true,
	},
	set_water_box_distance_off: {
		type: "number",
		name: "Precise water level for mopping",
		def: 1,
		min: 1,
		max: 30,
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
	consumables,
	resetConsumables,
	cleaningInfo,
	cleaningRecords,
	commands,
};