"use strict";

// Roborock S7 Max Ultra

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a65 extends roborock_vacuum_a15 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

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

		this.setup.deviceStatus.dss = {
			"type": "number",
			"name": "Collision Avoid Status",
			"write": false
		};
		this.setup.deviceStatus.rss = {
			"type": "number",
			"name": "Signal quality",
			"write": false
		};
		this.setup.deviceStatus.clean_percent = {
			"type": "number",
			"name": "Cleaning percent completed",
			"write": false
		};
		this.setup.deviceStatus.rdt = {
			"type": "number",
			"name": "???",
			"write": false
		};
		this.setup.deviceStatus.dry_status = {
			"type": "number",
			"name": "Drying status",
			"write": false
		};
		this.setup.deviceStatus.wash_status = {
			"type": "number",
			"name": "Washing status",
			"write": false
		};
		this.setup.deviceStatus.switch_map_mode = {
			"type": "number",
			"name": "Switch map mode",
			"write": false
		};
		this.setup.deviceStatus.collision_avoid_status = {
			"type": "number",
			"name": "Collision Avoid Status",
			"write": false
		};
		this.setup.deviceStatus.avoid_count = {
			"type": "number",
			"name": "Avoid count",
			"write": false
		};
		this.setup.deviceStatus.camera_status = {
			"type": "number",
			"name": "Camera",
			"write": false
		};
		this.setup.deviceStatus.wash_ready = {
			"type": "number",
			"name": "Wash Ready",
			"write": false
		};
		this.setup.deviceStatus.wash_phase = {
			"type": "number",
			"name": "Wash Phase",
			"write": false
		};
		this.setup.deviceStatus.back_type = {
			"type": "number",
			"name": "Back Type",
			"write": false
		};
		this.setup.deviceStatus.charge_status = {
			"type": "number",
			"name": "Charge Status",
			"write": false
		};

		this.setup.consumables.strainer_work_times = {
			"name": "Water Filter",
			"type": "number",
			"unit": "h",
			"divider": 60*60,
			"write": false
		};
		this.setup.consumables.cleaning_brush_work_times = {
			"name": "High-speed maintenance brush",
			"type": "number",
			"write": false
		};
		this.setup.consumables.dust_collection_work_times = {
			"name": "Dust collection hours",
			"type": "number",
			"unit": "h",
			"divider": 60*60,
			"write": false
		};
	}
}

module.exports = {
	roborock_vacuum_a65: roborock_vacuum_a65,
	extended_robot: roborock_vacuum_a65
};