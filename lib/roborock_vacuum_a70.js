"use strict";

// Roborock S8 Pro Ultra

const {roborock_vacuum_a51} = require("./roborock_vacuum_a51");

class roborock_vacuum_a70 extends roborock_vacuum_a51 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}
}

module.exports = {
	roborock_vacuum_a70: roborock_vacuum_a70,
	extended_robot: roborock_vacuum_a70
};