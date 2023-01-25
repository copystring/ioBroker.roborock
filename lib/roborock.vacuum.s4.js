"use strict";

// Roborock S4

const basic_robot = require("./basic_robot");

class extended_robot extends basic_robot {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		const states = {
			fan_power: {"101": "Quiet",
				"102": "Balanced",
				"103": "Turbo",
				"104": "Max",
				"105": "Off"
			}
		};

		this.setup.deviceStatus = {
			battery: {
				"name": "Battery percentage",
				"unit": "%",
				"type": "number",
				"write": false
			},
			filter_life: {
				"name": "Remaining air filter life",
				"type": "number",
				"unit": "%",
				"write": false
			},
			main_brush_life: {
				"name": "Remaining main brush life",
				"type": "number",
				"unit": "%",
				"write": false
			},
			side_brush_life: {
				"name": "Remaining side brush life",
				"type": "number",
				"unit": "%",
				"write": false
			},
			state: {
				"name": "Device state",
				"type": "number",
				"write": false
			},
			120: {
				"name": "unknown status",
				"type": "number",
				"write": false
			},
			121: {
				"name": "unknown status",
				"type": "number",
				"write": false
			},
			122: {
				"name": "unknown status",
				"type": "number",
				"write": false
			},
			123: {
				"name": "unknown status",
				"type": "number",
				"write": false
			},
			124: {
				"name": "unknown status",
				"type": "number",
				"write": false
			},
			125: {
				"name": "unknown status",
				"type": "number",
				"write": false
			},
			126: {
				"name": "unknown status",
				"type": "number",
				"write": false
			},
			127: {
				"name": "unknown status",
				"type":
                "number",
				"write": false
			},
		};

		this.setup.consumables = {
			main_brush_work_time: {
				"name": "Main brush used hours",
				"type": "number",
				"unit": "h",
				"write": false
			},
			side_brush_work_time: {
				"name": "Side brush used hours",
				"type": "number",
				"unit": "h",
				"write": false
			},
			filter_work_time: {
				"name": "Filter used hours",
				"type": "number",
				"unit": "h",
				"write": false
			},
			filter_element_work_time: {
				"name": "Filter element used hours",
				"type": "number",
				"unit": "h",
				"write": false
			},
			sensor_dirty_time: {
				"name": "Sensors time until cleaning",
				"type": "number",
				"unit": "h",
				"write": false
			},
			dust_collection_work_times:{
				"name": "Dust collection hours",
				"type":
                "number",
				"unit": "h",
				"write": false
			}
		};

		this.setup.commands = {
			app_start: {
				"type": "boolean",
				"name":"Start vacuum",
				"def":false,
				"states": null,
				"write": true
			},
			app_segment_clean: {
				"type": "boolean",
				"name":"Start room cleaning",
				"def":false,
				"states": null,
				"write": true
			},
			app_stop: {
				"type": "boolean",
				"name":"Stop vacuum",
				"def":false,
				"states": null,
				"write": true
			},
			app_pause: {
				"type": "boolean",
				"name":"Pause vacuum",
				"def":false,
				"states": null,
				"write": true
			},
			app_charge: {
				"type": "boolean",
				"name":"Charge vacuum",
				"def":false,
				"states": null,
				"write": true
			},
			app_spot: {
				"type": "boolean",
				"name":"Spot cleaning",
				"def":false,
				"states": null,
				"write": true
			},
			set_custom_mode: {
				"type": "number",
				"name": "Suction Power",
				"def": 101,
				"states": states["fan_power"],
				"write": true
			},
			find_me: {
				"type": "boolean",
				"name": "Find me",
				"def": false,
				"write": true
			},
			set_carpet_mode: {
				"type": "string",
				"name": "Carpet Boost",
				"def": '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]',
				"states": states["carpet_mode"],
				"write": true
			},
			set_carpet_clean_mode: {
				"type": "string",
				"name": "Carpet Avoidance Mode",
				"def": '{"carpet_clean_mode": 1}',
				"states": states["carpet_clean_mode"],
				"write": true
			}
		};

		this.setup.deviceConfig = {
			fan_power: {
				"type": "number",
				"name":"Fan power",
				"states": states["fan_power"],
				"write": false
			},
			carpet_mode: {
				"type": "string",
				"name":"Carpet Boost",
				"states": states["carpet_mode"],
				"write": false
			},
			carpet_clean_mode: {
				"type": "string",
				"name": "Carpet Avoidance Mode",
				"states": states["carpet_clean_mode"],
				"write": false
			}
		};

		this.setup.cleaningInfo = {
			clean_time: {"name": "Total Time",
				"type": "number",
				"unit": "h",
				"write": false
			},
			clean_area: {"name": "Total Area",
				"type": "number",
				"unit": "m³",
				"write": false
			},
			clean_count: {"name": "Cycles",
				"type": "number",
				"write": false
			},
			dust_collection_count: {
				"name": "Times Dust Collected",
				"type": "number",
				"write": false
			}
		};

		this.setup.cleaningRecords = {
			begin: {
				"name": "Start cleaning time",
				"type": "string",
				"write": false
			},
			end: {
				"name": "End cleaning time",
				"type": "string",
				"write": false
			},
			duration: {
				"name": "Duration cleaning time",
				"type": "number",
				"unit": "min",
				"write": false
			},
			area: {
				"name": "Cleaning Area",
				"type": "number",
				"unit": "m³",
				"write": false
			},
			error: {
				"name": "Error Type",
				"type": "number",
				"write": false
			},
			complete: {
				"name": "Completion Type",
				"type": "number",
				"write": false
			},
			start_type: {
				"name": "Start Type",
				"type": "number",
				"write": false
			},
			clean_type: {
				"name": "Clean Type",
				"type": "number",
				"write": false
			},
			finish_reason: {
				"name": "Clean Finish Reason",
				"type": "number",
				"write": false},
			dust_collection_status: {
				"name": "Dust Collection Status",
				"type": "number",
				"write": false
			}
		};

	}
}

module.exports = {
	extended_robot,
};