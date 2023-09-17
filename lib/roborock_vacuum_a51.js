"use strict";

// Roborock S8

const {
	states: baseStates,
	deviceStatus: baseDeviceStatus,
	consumables: baseConsumables,
	resetConsumables: baseResetConsumables,
	cleaningInfo: baseCleaningInfo,
	cleaningRecords: baseCleaningRecords,
	commands: baseCommands,
} = require("./genSpecs/gen8/standard/robot");

const {
	deviceStatus: cameradeviceStatus,
	camera: camera,
} = require("./genSpecs/gen8/standard/camera");

const basic_robot = require("./basic_robot");

class roborock_vacuum_a51 extends basic_robot {
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
	roborock_vacuum_a51: roborock_vacuum_a51,
	extended_robot: roborock_vacuum_a51,
};
