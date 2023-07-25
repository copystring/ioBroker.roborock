"use strict";

// Roborock Q Revo

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a75 extends roborock_vacuum_a15 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}
}

module.exports = {
	roborock_vacuum_a70: roborock_vacuum_a75,
	extended_robot: roborock_vacuum_a75
};