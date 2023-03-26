"use strict";

// Roborock S7

const {roborock_vacuum_s6} = require("./roborock_vacuum_s6");

class roborock_vacuum_a15 extends roborock_vacuum_s6 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		//states
		this.states.water_box_mode = {
			"200": "Off",
			"201": "Low",
			"202": "Medium",
			"203": "High",
			"204": "Customize (Auto)",
			"207": "Custom (Levels)"
		};
		this.states.water_box_custom_mode = {
			"200": "Off",
			"201": "Mild",
			"202": "Moderate",
			"203": "Intense"
		};
		this.states.carpet_mode = {
			'[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]': "off",
			'[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]': "on"
		};
		this.states.carpet_clean_mode = {
			'{"carpet_clean_mode": 0}': "Avoid",
			'{"carpet_clean_mode": 1}': "Rise",
			'{"carpet_clean_mode": 2}': "Ignore"
		};

		// deviceStatus
		this.setup.deviceStatus.water_box_custom_mode = {
			"type": "number",
			"name":"Scrub Intensity",
			"states": this.states["water_box_custom_mode"],
			"write": false
		};
		this.setup.deviceStatus.carpet_clean_mode = {
			"type": "string",
			"name": "Carpet Avoidance Mode",
			"states": this.states["carpet_clean_mode"],
			"write": false
		};

		// commands
		this.setup.commands.set_water_box_custom_mode = {
			"type": "number",
			"name":"Scrub Intensity",
			"def":201,
			"states": this.states["water_box_custom_mode"],
			"write": true
		};
		this.setup.commands.set_carpet_mode = {
			"type": "string",
			"name": "Carpet Boost",
			"def": '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]',
			"states": this.states["carpet_mode"],
			"write": true
		};
		this.setup.commands.set_carpet_clean_mode = {
			"type": "string",
			"name": "Carpet Avoidance Mode",
			"def": '{"carpet_clean_mode": 1}',
			"states": this.states["carpet_clean_mode"],
			"write": true
		};

		this.setup.cleaningInfo = {
			clean_time: {"name": "Total Time",
				"type": "number",
				"unit": "h",
				"write": false
			},
			clean_area: {"name": "Total Area",
				"type": "number",
				"unit": "m²",
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
				"unit": "m²",
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
	roborock_vacuum_a15: roborock_vacuum_a15,
	extended_robot: roborock_vacuum_a15
};