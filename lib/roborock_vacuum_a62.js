"use strict";

// Roborock S7 Pro Ultra

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a62 extends roborock_vacuum_a15 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}
}

module.exports = {
	roborock_vacuum_a62: roborock_vacuum_a62,
	extended_robot: roborock_vacuum_a62
};