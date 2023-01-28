"use strict";

// Roborock S5

const {roborock_vacuum_s4} = require("./roborock_vacuum_s4");

class roborock_vacuum_s5 extends roborock_vacuum_s4 {
	constructor() {
		super();

		//states
		this.states.mop_mode = {
			"300": "Standard",
			"301": "Deep",
			"302": "Deep+"
		};
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
		this.setup.deviceStatus.mop_mode = {
			"name": "Mop mode",
			"type": "number",
			"states": this.states["mop_mode"],
			"write": false
		};
		this.setup.deviceStatus.water_shortage_status = {
			"name": "Water Shortage Status",
			"type": "number",
			"write": false
		};
		this.setup.deviceStatus.mop_forbidden_enable = {
			"name": "Mop Forbidden Enable",
			"type": "number",
			"write": false
		};
		this.setup.deviceStatus.water_box_carriage_status = {
			"name": "Water Box Carriage Status",
			"type": "number",
			"write": false
		};
		this.setup.deviceStatus.water_box_status = {
			"name": "Water Box Status",
			"type": "number",
			"write": false
		};
		this.setup.deviceStatus.water_box_custom_mode = {
			"type": "number",
			"name":"Scrub Intensity",
			"states": this.states["water_box_custom_mode"],
			"write": false
		};
		this.setup.deviceStatus.water_box_mode = {
			"type": "number",
			"name":"Amount of water to use",
			"states": this.states["water_box_mode"],
			"write": false
		};
		this.setup.deviceStatus.carpet_mode = {
			"type": "string",
			"name":"Carpet Boost",
			"states": this.states["carpet_mode"],
			"write": false
		};
		this.setup.deviceStatus.carpet_clean_mode = {
			"type": "string",
			"name": "Carpet Avoidance Mode",
			"states": this.states["carpet_clean_mode"],
			"write": false
		};


		this.setup.commands.set_mop_mode = {
			"type": "number",
			"name":"Mop Route",
			"def":300,
			"states": this.states["mop_mode"],
			"write": true
		};
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
	}
}

module.exports = {
	roborock_vacuum_s5: roborock_vacuum_s5,
	extended_robot: roborock_vacuum_s5
};