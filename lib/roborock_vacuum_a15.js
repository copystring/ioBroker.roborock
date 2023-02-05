"use strict";

// Roborock S7

const {roborock_vacuum_s6} = require("./roborock_vacuum_s6");

class roborock_vacuum_a15 extends roborock_vacuum_s6 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.setup.cleaningInfo = {
			clean_time: {"name": "Total Time",
				"type": "number",
				"unit": "h",
				"write": false
			},
			clean_area: {"name": "Total Area",
				"type": "number",
				"unit": "m²",
				"write": false
			},
			clean_count: {"name": "Cycles",
				"type": "number",
				"write": false
			},
			dust_collection_count: {
				"name": "Times Dust Collected",
				"type": "number",
				"write": false
			}
		};

		this.setup.cleaningRecords = {
			begin: {
				"name": "Start cleaning time",
				"type": "string",
				"write": false
			},
			end: {
				"name": "End cleaning time",
				"type": "string",
				"write": false
			},
			duration: {
				"name": "Duration cleaning time",
				"type": "number",
				"unit": "min",
				"write": false
			},
			area: {
				"name": "Cleaning Area",
				"type": "number",
				"unit": "m²",
				"write": false
			},
			error: {
				"name": "Error Type",
				"type": "number",
				"write": false
			},
			complete: {
				"name": "Completion Type",
				"type": "number",
				"write": false
			},
			start_type: {
				"name": "Start Type",
				"type": "number",
				"write": false
			},
			clean_type: {
				"name": "Clean Type",
				"type": "number",
				"write": false
			},
			finish_reason: {
				"name": "Clean Finish Reason",
				"type": "number",
				"write": false},
			dust_collection_status: {
				"name": "Dust Collection Status",
				"type": "number",
				"write": false
			}
		};
	}
}

module.exports = {
	roborock_vacuum_a15: roborock_vacuum_a15,
	extended_robot: roborock_vacuum_a15
};