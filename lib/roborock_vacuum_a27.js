"use strict";

// Roborock S7 MaxV (Ultra)

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a27 extends roborock_vacuum_a15 {
	constructor() {
		super();

		this.states.fan_power["108"] = "MAX+";

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

		this.setup.deviceStatus.back_type = {
			"type": "number",
			"name": "Back Type",
			"write": false
		};
		this.setup.deviceStatus.wash_phase = {
			"type": "number",
			"name": "Wash Phase",
			"write": false
		};
		this.setup.deviceStatus.wash_ready = {
			"type": "number",
			"name": "Wash Ready",
			"write": false
		};
		this.setup.deviceStatus.switch_map_mode = {
			"type": "number",
			"name": "Map Mode",
			"write": false
		};
		this.setup.deviceStatus.charge_status = {
			"type": "number",
			"name": "Charge Status",
			"write": false
		};
		this.setup.deviceStatus.camera_status = {
			"type": "number",
			"name": "Camera Status",
			"write": false
		};
		this.setup.deviceStatus.is_exploring = {
			"type": "number",
			"name": "Is Exploring",
			"write": false
		};
		this.setup.deviceStatus.home_sec_status = {
			"type": "number",
			"name": "Home Security Status",
			"write": false
		};
		this.setup.deviceStatus.home_sec_enable_password = {
			"type": "number",
			"name": "Home Security Enable Password",
			"write": false
		};
		this.setup.deviceStatus.avoid_count = {
			"type": "number",
			"name": "Avoid Count",
			"write": false
		};
		this.setup.deviceStatus.collision_avoid_status = {
			"type": "number",
			"name": "Collision Avoid Status",
			"write": false
		};

		this.setup.consumables.strainer_work_times = {
			"name": "Strainer Work Times",
			"type": "number",
			"unit": "h",
			"write": false
		};
		this.setup.consumables.cleaning_brush_work_times = {
			"name": "Cleaning Brush Work Times",
			"type": "number",
			"unit": "h",
			"write": false
		};
		this.setup.consumables.filter_element_work_time = {
			"name": "Water Filter Work Times",
			"type": "number",
			"unit": "h",
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

		this.setup.camera = {
			html_stream: {
				"name": "html stream",
				"type": "string",
				"write": false
			},
			rtsp: {
				"name": "rtsp stream",
				"type": "string",
				"write": false
			},
			mp4: {
				"name": "mp4 stream",
				"type": "string",
				"write": false
			},
		};
	}
}

module.exports = {
	roborock_vacuum_a27: roborock_vacuum_a27,
	extended_robot: roborock_vacuum_a27
};