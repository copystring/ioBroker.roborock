"use strict";

// Roborock S7 MaxV (Ultra)

const roborock_vacuum_a15 = require("./roborock.vacuum.a15");

class extended_robot extends roborock_vacuum_a15 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.setup.cleaningRecords.map_flag = {
			"name": "ID of used map",
			"type": "number",
			"write": false
		};
		this.setup.cleaningRecords.wash_count = {
			"name": "Number of washes",
			"type": "number",
			"write": false
		};
		this.setup.cleaningRecords.avoid_count = {
			"name": "How many obstacles have been avoided.",
			"type": "number",
			"write": false
		};

	}
}

module.exports = extended_robot;