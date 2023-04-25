"use strict";

// Roborock Q7 Max

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a38 extends roborock_vacuum_a15 {
	constructor(adapter) {
		super();
		this.adapter = adapter;


		this.setup.deviceStatus.distance_off = {
			"type": "number",
			"name": "Distance Off",
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
	}
}

module.exports = {
	roborock_vacuum_a38: roborock_vacuum_a38,
	extended_robot: roborock_vacuum_a38
};