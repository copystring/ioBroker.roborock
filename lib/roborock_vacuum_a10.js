"use strict";

// Roborock S6 MaxV

const {roborock_vacuum_s6} = require("./roborock_vacuum_s6");

class roborock_vacuum_a10 extends roborock_vacuum_s6 {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}
}

module.exports = {
	roborock_vacuum_a10: roborock_vacuum_a10,
	extended_robot: roborock_vacuum_a10
};