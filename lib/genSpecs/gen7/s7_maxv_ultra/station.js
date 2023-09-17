/**
 * @namespace deviceStatus
 * @description @deviceStatus_description@
 * @property {string} wash_ready - @wash_ready@
 * @property {string} wash_phase - @wash_phase@
 * @property {string} back_type - @back_type@
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

/**
 * @namespace commands
 * @description @commands_description@
 * @property {object} app_start_collect_dust - @app_start_collect_dust@
 * @property {object} app_stop_collect_dust - @app_stop_collect_dust@
 * @property {object} app_set_dryer_setting - @app_set_dryer_setting@
 * @property {object} app_set_dryer_status - @app_set_dryer_status@
 * @property {object} app_start_wash - @app_start_wash@
 * @property {object} app_stop_wash - @app_stop_wash@
 */
const commands = {
	app_start_collect_dust: {
		type: "boolean",
		name: "Start dust collection",
		def: false,
		write: true,
	},
	app_stop_collect_dust: {
		type: "boolean",
		name: "Stop dust collection",
		def: false,
		write: true,
	},
	app_set_dryer_setting: {
		type: "boolean",
		name: "Set dryer addon enabled",
		def: false,
		write: true,
	},
	app_set_dryer_status: {
		type: "string",
		role: "json",
		name: "Set dryer status",
		def: '{"status": 0}',
		states: { '{"status": 0}': "On", '{"status": 1}': "Off" },
		write: true,
	},
	app_start_wash: {
		type: "boolean",
		name: "Start Mop Washing",
		def: false,
		write: true,
	},
	app_stop_wash: {
		type: "boolean",
		name: "Stop Mop Washing",
		def: false,
		write: true,
	},
};

module.exports = {
	deviceStatus,
	consumables,
	reset_consumables,
	commands,
};
