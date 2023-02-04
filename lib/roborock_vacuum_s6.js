"use strict";

// Roborock S6

const {roborock_vacuum_s5} = require("./roborock_vacuum_s5");

class roborock_vacuum_s6 extends roborock_vacuum_s5 {
	constructor(adapter) {
		super();
		this.adapter = adapter;

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
	roborock_vacuum_s6: roborock_vacuum_s6,
	extended_robot: roborock_vacuum_s6
};