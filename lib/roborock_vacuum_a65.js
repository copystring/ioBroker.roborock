"use strict";

// Roborock S7 Max Ultra

const {
	states: baseStates,
	deviceStatus: baseDeviceStatus,
	consumables: baseConsumables,
	resetConsumables: baseResetConsumables,
	cleaningInfo: baseCleaningInfo,
	cleaningRecords: baseCleaningRecords,
	commands: baseCommands,
} = require("./genSpecs/gen4/s7_max_ultra/base");

const {
	deviceStatus: stationDeviceStatus,
	consumables: stationConsumables,
} = require("./genSpecs/gen4/s7_max_ultra/station");

const basic_robot = require("./basic_robot");

class roborock_vacuum_a65 extends basic_robot {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.states = {
			...baseStates,
		};

		this.setup.deviceStatus = {
			...baseDeviceStatus,
			...stationDeviceStatus,
		};

		this.setup.consumables = {
			...baseConsumables,
			...stationConsumables,
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
	}
}

module.exports = {
	roborock_vacuum_a65: roborock_vacuum_a65,
	extended_robot: roborock_vacuum_a65,
};
