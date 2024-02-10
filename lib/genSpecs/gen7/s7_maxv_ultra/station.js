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
 * @property {object} app_set_dryer_status - @app_set_dryer_status@
 * @property {object} app_start_wash - @app_start_wash@
 * @property {object} app_stop_wash - @app_stop_wash@
 * @property {object} app_set_dryer_setting - @app_set_dryer_setting@
 * @property {object} set_wash_towel_mode - @set_wash_towel_mode@
 * @property {object} set_smart_wash_params - @set_smart_wash_params@
 */
const commands = {
	app_stop_wash: {
		type: "boolean",
		name: "Stop Mop Washing",
		def: false,
		write: true,
	},
	app_set_dryer_setting: {
		type: "json",
		name: "Set dryer addon enabled",
		def: '{"on":{"dry_time":10800},"status":0}',
		states: {
			'{"on":{"dry_time":10800},"status":0}': "Off",
			'{"on":{"dry_time":7200},"status":1}': "2h",
			'{"on":{"dry_time":10800},"status":1}': "3h",
			'{"on":{"dry_time":14400},"status":1}': "4h",
		},
		write: true,
	},
	set_wash_towel_mode: {
		type: "json",
		name: "Mop wash mode",
		def: '{"wash_mode":2}',
		states: { '{"wash_mode":0}': "Eco", '{"wash_mode":1}': "Medium", '{"wash_mode":2}': "Intense" },
		write: true,
	},
	set_smart_wash_params: {
		type: "json",
		name: "Mop wash interval",
		def: '{"smart_wash":0,"wash_interval":1800}',
		states: {
			'{"smart_wash":0,"wash_interval":600}': "10 Min",
			'{"smart_wash":0,"wash_interval":900}': "15 Min",
			'{"smart_wash":0,"wash_interval":1200}': "20 Min",
			'{"smart_wash":0,"wash_interval":1500}': "25 Min",
			'{"smart_wash":0,"wash_interval":1800}': "30 Min",
			'{"smart_wash":0,"wash_interval":2100}': "35 Min",
			'{"smart_wash":0,"wash_interval":2400}': "40 Min",
			'{"smart_wash":0,"wash_interval":2700}': "45 Min",
			'{"smart_wash":0,"wash_interval":3000}': "50 Min",
			'{"smart_wash":1,"wash_interval":1200}': "Per room"
		},
		write: true,
	},
};

module.exports = {
	deviceStatus,
	consumables,
	reset_consumables,
	commands,
};
