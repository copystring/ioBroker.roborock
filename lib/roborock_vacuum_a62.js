"use strict";

// Roborock S7 Pro Ultra

const {
	states: baseStates,
	deviceStatus: baseDeviceStatus,
	consumables: baseConsumables,
	resetConsumables: baseResetConsumables,
	cleaningInfo: baseCleaningInfo,
	cleaningRecords: baseCleaningRecords,
	commands: baseCommands,
} = require("./genSpecs/gen7/s7_pro_ultra/robot");

const {
	deviceStatus: stationDeviceStatus,
	consumables: stationConsumables,
} = require("./genSpecs/gen7/s7_pro_ultra/station");

const basic_robot = require("./basic_robot");

class roborock_vacuum_a62 extends basic_robot {
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
	roborock_vacuum_a62: roborock_vacuum_a62,
	extended_robot: roborock_vacuum_a62,
};
