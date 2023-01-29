"use strict";

// Roborock S6 MaxV

const {roborock_vacuum_s6} = require("./roborock_vacuum_s6");

class roborock_vacuum_a10 extends roborock_vacuum_s6 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.setup.deviceStatus.distance_off = {
			"type": "number",
			"name": "Distance Off",
			"write": false
		};
		this.setup.deviceStatus.camera_status = {
			"type": "number",
			"name": "Camera Status",
			"write": false
		};
		this.setup.deviceStatus.is_exploring = {
			"type": "number",
			"name": "Is Exploring",
			"write": false
		};
		this.setup.deviceStatus.home_sec_status = {
			"type": "number",
			"name": "Home Security Status",
			"write": false
		};
		this.setup.deviceStatus.home_sec_enable_password = {
			"type": "number",
			"name": "Home Security Enable Password",
			"write": false
		};
	}
}

module.exports = {
	roborock_vacuum_a10: roborock_vacuum_a10,
	extended_robot: roborock_vacuum_a10
};