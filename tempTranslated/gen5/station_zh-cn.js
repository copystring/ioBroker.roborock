/**
 * @namespace deviceStatus
 * @description Mapping of robot states.
 * @property {object} back_type - Back Type
 * @property {object} wash_phase - Wash Phase
 * @property {object} wash_ready - Wash Ready
 */
const deviceStatus = {
	back_type: {
		type: "number",
		name: "Back Type",
		write: false,
	},
	wash_phase: {
		type: "number",
		name: "Wash Phase",
		write: false,
	},
	wash_ready: {
		type: "number",
		name: "Wash Ready",
		write: false,
	},
};

/**
 * @namespace consumables
 * @description Mapping of consumables.
 * @property {object} strainer_work_times - How many times the water filter has been used
 * @property {object} cleaning_brush_work_times - How many times the high-speed maintenance brush has been used
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


module.exports = {
	deviceStatus,
	consumables,
};