"use strict";

// Zeo One

const {
	states: baseStates,
} = require("./genSpecs/washer/zeo_one");

const basic_washer = require("./basic_washer");

class roborock_wm_a102 extends basic_washer {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.states = {
			...baseStates,
		};
	}
}

module.exports = {
	roborock_wm_a102: roborock_wm_a102,
	extended_robot: roborock_wm_a102,
};
