"use strict";

// Roborock Q Revo

const {
	states: baseStates,
	deviceStatus: baseDeviceStatus,
	consumables: baseConsumables,
	resetConsumables: baseResetConsumables,
	cleaningInfo: baseCleaningInfo,
	cleaningRecords: baseCleaningRecords,
	commands: baseCommands,
} = require("./genSpecs/gen8/q_revo/robot");

const {
	deviceStatus: stationDeviceStatus,
	consumables: stationConsumables,
} = require("./genSpecs/gen8/q_revo/station");

const {
	deviceStatus: cameradeviceStatus,
	camera: camera,
} = require("./genSpecs/gen8/q_revo/camera");

const basic_robot = require("./basic_robot");

class roborock_vacuum_a75 extends basic_robot {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.states = {
			...baseStates,
		};

		this.setup.deviceStatus = {
			...baseDeviceStatus,
			...stationDeviceStatus,
			...cameradeviceStatus,
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

		this.setup.camera = {
			...camera,
		};
	}
}

module.exports = {
	roborock_vacuum_a75: roborock_vacuum_a75,
	extended_robot: roborock_vacuum_a75,
};
