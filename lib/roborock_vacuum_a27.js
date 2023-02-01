"use strict";

// Roborock S7 MaxV (Ultra)

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a27 extends roborock_vacuum_a15 {
	constructor() {
		super();

		this.setup.cleaningRecords.map_flag = {
			"name": "ID of used map",
			"type": "number",
			"write": false
		};
		this.setup.cleaningRecords.wash_count = {
			"name": "Number of washes",
			"type": "number",
			"write": false
		};
		this.setup.cleaningRecords.avoid_count = {
			"name": "How many obstacles have been avoided.",
			"type": "number",
			"write": false
		};

		this.setup.commands.app_start_collect_dust = {
			"type": "boolean",
			"name":"Start dust collection",
			"def":false,
			"write": true
		};
		this.setup.commands.app_stop_collect_dust = {
			"type": "boolean",
			"name":"Stop dust collection",
			"def":false,
			"write": true
		};
		this.setup.commands.app_set_dryer_setting = {
			"type": "boolean",
			"name":"Set dryer addon enabled",
			"def":false,
			"write": true
		};
		this.setup.commands.app_set_dryer_status = {
			"type": "boolean",
			"name":"Set dryer status",
			"def":{"status": 0},
			"states": [{"status": 1}, {"status": 0}],
			"write": true
		};
		this.setup.commands.app_start_wash = {
			"type": "boolean",
			"name":"Start Mop Washing",
			"def":false,
			"write": true
		};
		this.setup.commands.app_stop_wash = {
			"type": "boolean",
			"name":"Stop Mop Washing",
			"def":false,
			"write": true
		};


	}
}

module.exports = {
	roborock_vacuum_a27: roborock_vacuum_a27,
	extended_robot: roborock_vacuum_a27
};