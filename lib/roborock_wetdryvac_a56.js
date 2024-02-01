"use strict";

// Dyad Pro

const {
	states: baseStates,
} = require("./genSpecs/vacuums/DyadPro/vacuum");

const basic_vacuum = require("./basic_vacuum");

class roborock_wetdryvac_a56 extends basic_vacuum {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.states = {
			...baseStates,
		};
	}
}

module.exports = {
	roborock_wetdryvac_a56: roborock_wetdryvac_a56,
	extended_robot: roborock_wetdryvac_a56,
};
