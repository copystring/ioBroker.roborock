"use strict";

// Roborock S5 Max

const {roborock_vacuum_s5} = require("./roborock_vacuum_s5");


class roborock_vacuum_s5e extends roborock_vacuum_s5 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.setup.distance_off = {
			"name": "Distance Off",
			"type": "number",
			"write": false
		};

		this.setup.cleaningInfo = {
			1: {"name": "Total Time",
				"type": "number",
				"unit": "h",
				"write": false
			},
			2: {"name": "Total Area",
				"type": "number",
				"unit": "m³",
				"write": false
			},
			3: {"name": "Cycles",
				"type": "number",
				"write": false
			},
			4: {
				"name": "Times Dust Collected",
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