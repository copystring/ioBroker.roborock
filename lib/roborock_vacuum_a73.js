"use strict";

// Roborock Q8 Max

const {
	states: baseStates,
	deviceStatus: baseDeviceStatus,
	consumables: baseConsumables,
	resetConsumables: baseResetConsumables,
	cleaningInfo: baseCleaningInfo,
	cleaningRecords: baseCleaningRecords,
	commands: baseCommands,
} = require("./genSpecs/gen8/q8_max/robot");

const {
	deviceStatus: cameradeviceStatus,
} = require("./genSpecs/gen8/q8_max/camera");

const basic_robot = require("./basic_robot");

class roborock_vacuum_a73 extends basic_robot {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.states = {
			...baseStates,
		};

		this.setup.deviceStatus = {
			...baseDeviceStatus,
			...cameradeviceStatus,
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
	}
}

module.exports = {
	roborock_vacuum_a73: roborock_vacuum_a73,
	extended_robot: roborock_vacuum_a73,
};
