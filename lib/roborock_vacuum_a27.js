"use strict";

// Roborock S7 MaxV (Ultra)

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a27 extends roborock_vacuum_a15 {
	constructor() {
		super();

		this.setup.cleaningRecords.map_flag = {
			"name": "ID of used map",
			"type": "number",
			"write": false
		};
		this.setup.cleaningRecords.wash_count = {
			"name": "Number of washes",
			"type": "number",
			"write": false
		};
		this.setup.cleaningRecords.avoid_count = {
			"name": "How many obstacles have been avoided.",
			"type": "number",
			"write": false
		};


		this.setup.deviceStatus.back_type = {
			"type": "number",
			"name": "Back Type",
			"write": false
		};
		this.setup.deviceStatus.wash_phase = {
			"type": "number",
			"name": "Wash Phase",
			"write": false
		};
		this.setup.deviceStatus.wash_ready = {
			"type": "number",
			"name": "Wash Ready",
			"write": false
		};
		this.setup.deviceStatus.switch_map_mode = {
			"type": "number",
			"name": "Map Mode",
			"write": false
		};
		this.setup.deviceStatus.charge_status = {
			"type": "number",
			"name": "Charge Status",
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
		this.setup.deviceStatus.avoid_count = {
			"type": "number",
			"name": "Avoid Count",
			"write": false
		};
		this.setup.deviceStatus.collision_avoid_status = {
			"type": "number",
			"name": "Collision Avoid Status",
			"write": false
		};

		this.setup.consumables.strainer_work_times = {
			"name": "Strainer Work Times",
			"type": "number",
			"unit": "h",
			"write": false
		};
		this.setup.consumables.cleaning_brush_work_times = {
			"name": "Cleaning Brush Work Times",
			"type": "number",
			"unit": "h",
			"write": false
		};
	}
}

module.exports = {
	roborock_vacuum_a27: roborock_vacuum_a27,
	extended_robot: roborock_vacuum_a27
};