"use strict";

// Roborock S6

const {roborock_vacuum_s5} = require("./roborock_vacuum_s5");

class roborock_vacuum_s6 extends roborock_vacuum_s5 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}
}

module.exports = {
	roborock_vacuum_s6: roborock_vacuum_s6,
	extended_robot: roborock_vacuum_s6
};