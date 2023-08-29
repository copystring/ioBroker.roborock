"use strict";

// Roborock S4 Max

const {roborock_vacuum_s4} = require("./roborock_vacuum_s4");

class roborock_vacuum_a19 extends roborock_vacuum_s4 {
	constructor(adapter) {
		super();
		this.adapter = adapter;


		this.setup.deviceStatus.water_box_status = {
			"name": "Water Box Status",
			"type": "number",
			"write": false
		};
		this.setup.deviceStatus.water_box_custom_mode = {
			"type": "string",
			"name":"Scrub Intensity",
			"states": this.states["water_box_custom_mode"],
			"write": false
		};
		this.setup.deviceStatus.carpet_mode = {
			"type": "string",
			"name":"Carpet Boost",
			"states": this.states["carpet_mode"],
			"write": false
		};
	}
}

module.exports = {
	roborock_vacuum_a19: roborock_vacuum_a19,
	extended_robot: roborock_vacuum_a19
};
