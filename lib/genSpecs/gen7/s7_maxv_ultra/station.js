/**
 * @namespace consumables
 * @description @consumables_description@
 * @property {object} strainer_work_times - @strainer_work_times@
 * @property {object} cleaning_brush_work_times - @cleaning_brush_work_times@
 * @property {object} dust_collection_work_times - @dust_collection_work_times@
 */
const consumables = {
	strainer_work_times: {
		name: "Water Filter",
		type: "number",
		write: false,
	},
	cleaning_brush_work_times: {
		name: "High-speed maintenance brush",
		type: "number",
		write: false,
	},
	filter_element_work_time: {
		name: "Water Filter Work Times",
		type: "number",
		unit: "h",
		write: false,
	},
};

/**
 * @namespace reset_consumables
 * @description @resetConsumables_description@
 * @property {object} strainer_work_times - @strainer_work_times@
 * @property {object} cleaning_brush_work_times - @cleaning_brush_work_times@
 * @property {object} dust_collection_work_times - @dust_collection_work_times@
 */
const reset_consumables = {
	strainer_work_times: {
		name: "Water Filter",
		type: "boolean",
		def: false,
		write: true,
	},
	cleaning_brush_work_times: {
		name: "High-speed maintenance brush",
		type: "boolean",
		def: false,
		write: true,
	},
	filter_element_work_time: {
		name: "Filter Element Work Time",
		type: "boolean",
		def: false,
		write: true,
	},
};

module.exports = {
	consumables,
	reset_consumables,
};
