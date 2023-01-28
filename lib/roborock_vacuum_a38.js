"use strict";

// Roborock Q7 Max

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a38 extends roborock_vacuum_a15 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}
}

module.exports = {
	roborock_vacuum_a38: roborock_vacuum_a38,
	extended_robot: roborock_vacuum_a38
};