"use strict";

// Roborock S7 MaxV (Ultra)

const {
	states: baseStates,
	deviceStatus: baseDeviceStatus,
	consumables: baseConsumables,
	resetConsumables: baseResetConsumables,
	cleaningInfo: baseCleaningInfo,
	cleaningRecords: baseCleaningRecords,
	commands: baseCommands,
} = require("./genSpecs/gen4/s7_maxv_ultra/base");

const {
	deviceStatus: stationDeviceStatus,
	consumables: stationConsumables,
} = require("./genSpecs/gen4/s7_maxv_ultra/station");

const {
	deviceStatus: cameradeviceStatus,
	camera: camera,
} = require("./genSpecs/gen4/s7_maxv_ultra/camera");

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
			...cameradeviceStatus,
		};
		this.setup.deviceStatus.clean_percent = {
			"type": "number",
			"name": "Cleaning progress",
			"write": false
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
	roborock_vacuum_a65: roborock_vacuum_a65,
	extended_robot: roborock_vacuum_a65,
};
