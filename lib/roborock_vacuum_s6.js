"use strict";

// Roborock S6

const {roborock_vacuum_s5} = require("./roborock_vacuum_s5");

class roborock_vacuum_s6 extends roborock_vacuum_s5 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.setup.deviceStatus.carpet_mode = {
			"type": "string",
			"name":"Carpet Boost",
			"states": this.states["carpet_mode"],
			"write": false
		};
		this.setup.deviceStatus.is_exploring = {
			"type": "number",
			"name": "Is Exploring",
			"write": false
		};

		delete this.setup.consumables[125];
		delete this.setup.consumables[126];
		delete this.setup.consumables[127];

		this.setup.consumables.main_brush_life = {
			"name": "Main brush life",
			"type": "number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
		this.setup.consumables.side_brush_life = {
			"name": "Side brush life",
			"type": "number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
		this.setup.consumables.filter_life = {
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
	roborock_vacuum_s6: roborock_vacuum_s6,
	extended_robot: roborock_vacuum_s6
};