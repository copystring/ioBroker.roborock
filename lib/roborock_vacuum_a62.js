"use strict";

// Roborock S7 Pro Ultra

const {roborock_vacuum_a27} = require("./roborock_vacuum_a27");

class roborock_vacuum_a62 extends roborock_vacuum_a27 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

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
	roborock_vacuum_a62: roborock_vacuum_a62,
	extended_robot: roborock_vacuum_a62
};