"use strict";

// Roborock S7 Max Ultra

const {roborock_vacuum_a27} = require("./roborock_vacuum_a27");

class roborock_vacuum_a65 extends roborock_vacuum_a27 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}
}

module.exports = {
	roborock_vacuum_a65: roborock_vacuum_a65,
	extended_robot: roborock_vacuum_a65
};