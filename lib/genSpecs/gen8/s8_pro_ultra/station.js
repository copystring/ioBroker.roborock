/**
 * @namespace consumables
 * @description @consumables_description@
 * @property {object} strainer_work_times - @strainer_work_times@
 * @property {object} cleaning_brush_work_times - @cleaning_brush_work_times@
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
};

/**
 * @namespace cleaningRecords
 * @description @consumables_cleaningRecords@
 * @property {object} wash_count - @wash_count@
 */

const cleaningRecords = {
	wash_count: {
		name: "Number of washes",
		type: "number",
		write: false,
	},
};

module.exports = {
	consumables,
	cleaningRecords,
};
