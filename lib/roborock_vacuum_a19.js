"use strict";

// Roborock S4 Max

const {roborock_vacuum_s4} = require("./roborock_vacuum_s4");

class roborock_vacuum_a19 extends roborock_vacuum_s4 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
}
}

module.exports = {
	roborock_vacuum_a19: roborock_vacuum_a19,
	extended_robot: roborock_vacuum_a19
};
