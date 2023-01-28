"use strict";

// Roborock S7

const {roborock_vacuum_s6} = require("./roborock_vacuum_s6");

class roborock_vacuum_a15 extends roborock_vacuum_s6 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}
}

module.exports = {
	roborock_vacuum_a15: roborock_vacuum_a15,
	extended_robot: roborock_vacuum_a15
};