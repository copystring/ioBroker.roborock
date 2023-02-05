"use strict";

// Roborock S5 Max

const {roborock_vacuum_s5} = require("./roborock_vacuum_s5");


class roborock_vacuum_s5e extends roborock_vacuum_s5 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.setup.deviceStatus.distance_off = {
			"name": "Distance Off",
			"type": "number",
			"write": false
		};
	}
}

module.exports = {
	roborock_vacuum_s5e: roborock_vacuum_s5e,
	extended_robot: roborock_vacuum_s5e
};