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
	dust_collection_work_times: {
		name: "Dust collection hours",
		type: "number",
		unit: "h",
		divider: 60 * 60,
		write: false,
	},
};

module.exports = {
	consumables,
};
