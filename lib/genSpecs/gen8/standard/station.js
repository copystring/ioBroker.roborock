/**
 * @namespace deviceStatus
 * @description @deviceStatus_description@
 * @property {string} wash_ready - @wash_ready@
 * @property {string} wash_phase - @wash_phase@
 * @property {string} back_type - @back_type@
 * @property {number} dry_status - @dry_status@
 * @property {number} wash_status - @wash_status@
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
	dry_status: {
		type: "number",
		name: "Drying status",
		write: false,
	},
	wash_status: {
		type: "number",
		name: "Washing status",
		write: false,
	},
};

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


module.exports = {
	deviceStatus,
	consumables,
};