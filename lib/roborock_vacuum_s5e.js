"use strict";

// Roborock S5 Max

const {roborock_vacuum_s5} = require("./roborock_vacuum_s5");


class roborock_vacuum_s5e extends roborock_vacuum_s5 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.states.water_box_custom_mode = {
			"200": "Off",
			"201": "Mild",
			"202": "Moderate",
			"203": "Intense"
		};

		this.setup.deviceStatus.distance_off = {
			"name": "Distance Off",
			"type": "number",
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

		delete this.setup.consumables.main_brush_life;
		delete this.setup.consumables.side_brush_life;
		delete this.setup.consumables.filter_life;

		this.setup.consumables[125]= {
			"name": "Main brush life",
			"type": "number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
		this.setup.consumables[126]= {
			"name": "Side brush life",
			"type": "number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
		this.setup.consumables[127]= {
			"name": "Filter life",
			"type":
			"number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
	}
}

module.exports = {
	roborock_vacuum_s5e: roborock_vacuum_s5e,
	extended_robot: roborock_vacuum_s5e
};