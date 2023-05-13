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

		this.setup.consumables = {
			main_brush_work_time: {
				"name": "Main brush used hours",
				"type": "number",
				"unit": "h",
				"divider": 60*60,
				"write": false
			},
			side_brush_work_time: {
				"name": "Side brush used hours",
				"type": "number",
				"unit": "h",
				"divider": 60*60,
				"write": false
			},
			filter_work_time: {
				"name": "Filter used hours",
				"type": "number",
				"unit": "h",
				"divider": 60*60,
				"write": false
			},
			filter_element_work_time: {
				"name": "Filter element used hours",
				"type": "number",
				"unit": "h",
				"divider": 60*60,
				"write": false
			},
			sensor_dirty_time: {
				"name": "Sensors time since last cleaning",
				"type": "number",
				"unit": "h",
				"divider": 60*60,
				"write": false
			},
			dust_collection_work_times:{
				"name": "Dust collection hours",
				"type": "number",
				"unit": "h",
				"divider": 60*60,
				"write": false
			},
			main_brush_life: {
				"name": "Main brush life",
				"type": "number",
				"unit": "%",
				"divider": 60*60,
				"write": false
			},
			side_brush_life: {
				"name": "Side brush life",
				"type": "number",
				"unit": "%",
				"divider": 60*60,
				"write": false
			},
			filter_life:{
				"name": "Filter life",
				"type": "number",
				"unit": "%",
				"divider": 60*60,
				"write": false
			},
			strainer_work_times: {
				"name": "Water Filter",
				"type": "number",
				"write": false
			},
			cleaning_brush_work_times: {
				"name": "High-speed maintenance brush",
				"type": "number",
				"write": false
			},
		};
	}
}

module.exports = {
	roborock_vacuum_a70: roborock_vacuum_a70,
	extended_robot: roborock_vacuum_a70
};