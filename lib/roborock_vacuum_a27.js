"use strict";

// Roborock S7 MaxV (Ultra)

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");



class roborock_vacuum_a27 extends roborock_vacuum_a15 {
	constructor() {
		super();

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

module.exports = {
	roborock_vacuum_a27: roborock_vacuum_a27,
	extended_robot: roborock_vacuum_a27
};