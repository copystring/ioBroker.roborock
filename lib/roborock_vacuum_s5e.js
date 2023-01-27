"use strict";

// Roborock S5 Max

const basic_robot = require("./basic_robot");

class roborock_vacuum_s5e extends basic_robot {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		const states = {
			mop_mode: {
				"300": "Standard",
				"301": "Deep",
				"302": "Deep+"
			},
			water_box_mode: {
				"200": "Off",
				"201": "Low",
				"202": "Medium",
				"203": "High",
				"204": "Customize (Auto)",
				"207": "Custom (Levels)"
			},
			water_box_custom_mode: {
				"200": "Off",
				"201": "Mild",
				"202": "Moderate",
				"203": "Intense"
			},
			fan_power: {"101": "Quiet",
				"102": "Balanced",
				"103": "Turbo",
				"104": "Max",
				"105": "Off"
			},
			carpet_mode: {
				'[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]': "off",
				'[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]': "on"
			},
			carpet_clean_mode: {
				'{"carpet_clean_mode": 0}': "Avoid",
				'{"carpet_clean_mode": 1}': "Rise",
				'{"carpet_clean_mode": 2}': "Ignore"
			}
		};

		this.setup.deviceStatus = {
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
			set_mop_mode: {
				"type": "number",
				"name":"Mop Route",
				"def":300,
				"states": states["mop_mode"],
				"write": true
			},
			set_water_box_custom_mode: {
				"type": "number",
				"name":"Scrub Intensity",
				"def":201,
				"states": states["water_box_custom_mode"],
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
			mop_mode: {
				"type": "number",
				"name":"Mop Route",
				"states": states["mop_mode"],
				"write": false
			},
			water_box_custom_mode: {
				"type": "number",
				"name":"Scrub Intensity",
				"states": states["water_box_custom_mode"],
				"write": false
			},
			water_box_mode: {
				"type": "number",
				"name":"Amount of water to use",
				"states": states["water_box_mode"],
				"write": false
			},
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
	roborock_vacuum_s5e: roborock_vacuum_s5e,
	extended_robot: roborock_vacuum_s5e
};