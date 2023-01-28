"use strict";

// Roborock S6 Pure

const {roborock_vacuum_s6} = require("./roborock_vacuum_s6");

class roborock_vacuum_a08 extends roborock_vacuum_s6 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}
}

module.exports = {
	roborock_vacuum_a08: roborock_vacuum_a08,
	extended_robot: roborock_vacuum_a08
};