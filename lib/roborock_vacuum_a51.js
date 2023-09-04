"use strict";

// Roborock S8

const {roborock_vacuum_a15} = require("./roborock_vacuum_a15");

class roborock_vacuum_a51 extends roborock_vacuum_a15 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.setup.cleaningRecords.map_flag = {
			"name": "ID of used map",
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
		this.setup.deviceStatus.charge_status = {
			"type": "number",
			"name": "Charging status",
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
		this.setup.deviceStatus.last_clean_t = {
			"type": "string",
			"name": "Last clean time",
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

		this.setup.camera = {
			stream_html: {
				"name": "html stream",
				"type": "string",
				"write": false
			},
			rtsp: {
				"name": "rtsp stream",
				"type": "string",
				"write": false
			},
			stream_mp4: {
				"name": "mp4 stream",
				"type": "string",
				"write": false
			},
		};
	}
}

module.exports = {
	roborock_vacuum_a51: roborock_vacuum_a51,
	extended_robot: roborock_vacuum_a51
};