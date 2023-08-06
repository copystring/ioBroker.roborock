"use strict";

// Roborock S8 Pro Ultra

const {
	states: baseStates,
	deviceStatus: baseDeviceStatus,
	consumables: baseConsumables,
	resetConsumables: baseResetConsumables,
	cleaningInfo: baseCleaningInfo,
	cleaningRecords: baseCleaningRecords,
	commands: baseCommands,
	camera: baseCamera,
} = require("./genSpecs/gen5/base");

const {
	deviceStatus: stationDeviceStatus,
	consumables: stationConsumables,
} = require("ioBroker.roborock/lib/genSpecs/gen5/station");

const basic_robot = require("./basic_robot");

class roborock_vacuum_a70 extends basic_robot {
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

		this.setup.camera = {
			...baseCamera,
		};
	}
}

module.exports = {
	roborock_vacuum_s8: roborock_vacuum_a70,
	extended_robot: roborock_vacuum_a70,
};
