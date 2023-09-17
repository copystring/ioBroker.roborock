"use strict";

// Roborock S6

const {
	states: baseStates,
	deviceStatus: baseDeviceStatus,
	consumables: baseConsumables,
	resetConsumables: baseResetConsumables,
	cleaningInfo: baseCleaningInfo,
	cleaningRecords: baseCleaningRecords,
	commands: baseCommands,
} = require("ioBroker.roborock/lib/genSpecs/gen6/robot");

const basic_robot = require("./basic_robot");

class roborock_vacuum_s6 extends basic_robot {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.states = {
			...baseStates,
		};

		this.setup.deviceStatus = {
			...baseDeviceStatus,
		};

		this.setup.consumables = {
			...baseConsumables,
		};

		this.setup.resetConsumables = {
			...baseResetConsumables,
		};

		this.setup.commands = {
			...baseCommands,
		};

		this.setup.cleaningInfo = {
			...baseCleaningInfo,
		};

		this.setup.cleaningRecords = {
			...baseCleaningRecords,
		};

		delete this.setup.consumables[125];
		delete this.setup.consumables[126];
		delete this.setup.consumables[127];

		this.setup.consumables.main_brush_life = {
			"name": "Main brush life",
			"type": "number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
		this.setup.consumables.side_brush_life = {
			"name": "Side brush life",
			"type": "number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
		this.setup.consumables.filter_life = {
			"name": "Filter life",
			"type":
			"number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
	}
}

module.exports = {
	roborock_vacuum_s6: roborock_vacuum_s6,
	extended_robot: roborock_vacuum_s6,
};
