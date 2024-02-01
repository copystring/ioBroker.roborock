/**
 * @namespace commands
 * @description @commands_description@
 * @property {object} app_start_collect_dust - @app_start_collect_dust@
 * @property {object} app_stop_collect_dust - @app_stop_collect_dust@
 * @property {object} set_dust_collection_switch_status - @set_dust_collection_switch_status@
 * @property {object} set_dust_collection_mode - @set_dust_collection_mode@
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
	set_dust_collection_switch_status: {
		type: "json",
		name: "Auto empty dust bin",
		def: '{"status":1}',
		states: { '{"status":0}': "Off", '{"status":1}': "On", },
		write: true,
	},
	set_dust_collection_mode: {
		type: "json",
		name: "Empty mode",
		def: '{"mode":0}',
		states: { '{"mode":0}': "Smart", '{"mode":1}': "Low", '{"mode":2}': "Medium", '{"mode":4}': "Max" },
		write: true,
	},
};

module.exports = {
	commands,
};
