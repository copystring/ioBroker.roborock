// Roborock S4

const states = {
};


/**
 * @namespace consumables
 * @description @consumables_description@
 * @property {Object} main_brush_work_time - @main_brush_work_time@
 * @property {Object} side_brush_work_time - @side_brush_work_time@
 * @property {Object} filter_work_time - @filter_work_time@
 * @property {Object} filter_element_work_time - @filter_element_work_time@
 * @property {Object} sensor_dirty_time - @sensor_dirty_time@
 * @property {Object} dust_collection_work_times - @dust_collection_work_times@
 * @property {Object} main_brush_life - @main_brush_life@
 * @property {Object} side_brush_life - @side_brush_life@
 * @property {Object} filter_life - @filter_life@
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
	main_brush_life: {
		name: "Main brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	side_brush_life: {
		name: "Side brush life",
		type: "number",
		unit: "%",
		divider: 60 * 60,
		write: false,
	},
	filter_life: {
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
 * @property {Object} dust_collection_work_times - @reset_dust_collection_work_times@
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
