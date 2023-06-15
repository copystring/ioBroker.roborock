"use strict";

// Roborock Q7

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a40 extends roborock_vacuum_a15 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.setup.cleaningRecords.map_flag = {
			"name": "ID of used map",
			"type": "number",
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
	roborock_vacuum_a40: roborock_vacuum_a40,
	extended_robot: roborock_vacuum_a40
};