"use strict";

// Roborock S8 Pro Ultra

const {roborock_vacuum_a51} = require("./roborock_vacuum_a51");

class roborock_vacuum_a70 extends roborock_vacuum_a51 {
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

		this.setup.consumables.strainer_work_times = {
			"name": "Water Filter",
			"type": "number",
			"write": false
		};
		this.setup.consumables.cleaning_brush_work_times = {
			"name": "High-speed maintenance brush",
			"type": "number",
			"write": false
		};
	}
}

module.exports = {
	roborock_vacuum_a70: roborock_vacuum_a70,
	extended_robot: roborock_vacuum_a70
};