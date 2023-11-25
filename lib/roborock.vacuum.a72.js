"use strict";

// Roborock Q5 Pro

const {
	states: baseStates,
	deviceStatus: baseDeviceStatus,
	consumables: baseConsumables,
	resetConsumables: baseResetConsumables,
	cleaningInfo: baseCleaningInfo,
	cleaningRecords: baseCleaningRecords,
	commands: baseCommands,
} = require("ioBroker.roborock/lib/genSpecs/gen8/q5_pro/robot");

const {
	deviceStatus: cameradeviceStatus,
	camera: camera,
} = require("ioBroker.roborock/lib/genSpecs/gen8/q5_pro/camera");

const basic_robot = require("ioBroker.roborock/lib/basic_robot");

class roborock_vacuum_a72 extends basic_robot {
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

		this.setup.camera = {
			...camera,
		};
	}
}

module.exports = {
	roborock_vacuum_a72: roborock_vacuum_a72,
	extended_robot: roborock_vacuum_a72,
};
