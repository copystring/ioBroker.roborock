"use strict";

// Roborock S4

const basic_robot = require("./basic_robot");

class roborock_vacuum_s4 extends basic_robot {
	constructor(adapter) {
		super();
		this.adapter = adapter;

		this.states = {
			fan_power: {"101": "Quiet",
				"102": "Balanced",
				"103": "Turbo",
				"104": "Max",
				"105": "Off"
			},
			state: {
				0: "Unknown",
				1: "Initiating",
				2: "Sleeping",
				3: "Idle",
				4: "Remote Control",
				5: "Cleaning",
				6: "Returning Dock",
				7: "Manual Mode",
				8: "Charging",
				9: "Charging Error",
				10: "Paused",
				11: "Spot Cleaning",
				12: "In Error",
				13: "Shutting Down",
				14: "Updating",
				15: "Docking",
				16: "Go To",
				17: "Zone Clean",
				18: "Room Clean",
				22: "Empying dust container",
				23: "Washing the mop",
				26: "Going to wash the mop",
				100: "Fully Charged"
			},
			error: {
				0: "No error",
				1: "Laser sensor fault",
				2: "Collision sensor fault",
				3: "Wheel floating",
				4: "Cliff sensor fault",
				5: "Main brush blocked",
				6: "Side brush blocked",
				7: "Wheel blocked",
				8: "Device stuck",
				9: "Dust bin missing",
				10: "Filter blocked",
				11: "Magnetic field detected",
				12: "Low battery",
				13: "Charging problem",
				14: "Battery failure",
				15: "Wall sensor fault",
				16: "Uneven surface",
				17: "Side brush failure",
				18: "Suction fan failure",
				19: "Unpowered charging station",
				20: "Unknown Error",
				21: "Laser pressure sensor problem",
				22: "Charge sensor problem",
				23: "Dock problem",
				24: "No-go zone or invisible wall detected",
				254: "Bin full",
				255: "Internal error",
				"-1": "Unknown Error"
			}
		};

		this.setup.deviceStatus = {
			unsave_map_flag: {
				"name": "Unsave Map Flag",
				"type": "number",
				"write": false
			},
			unsave_map_reason: {
				"name": "Unsave Map Reason",
				"type": "number",
				"write": false
			},
			dock_error_status: {
				"name": "Dock Error Status",
				"type": "number",
				"write": false
			},
			debug_mode: {
				"name": "Debug mode",
				"type": "number",
				"write": false
			},
			auto_dust_collection: {
				"name": "Auto Dust Collection",
				"type": "number",
				"write": false
			},
			dust_collection_status: {
				"name": "Dust Collection Status",
				"type": "number",
				"write": false
			},
			dock_type: {
				"name": "Dock Type",
				"type": "number",
				"write": false
			},
			adbumper_status: {
				"name": "Adbumber Status",
				"type": "string",
				"write": false
			},
			lock_status: {
				"name": "Lock Status",
				"type": "number",
				"write": false
			},
			is_locating: {
				"name": "Is Locating",
				"type": "number",
				"write": false
			},
			map_status: {
				"name": "Map Status",
				"type": "number",
				"write": false
			},
			dnd_enabled: {
				"name": "DND Enabled",
				"type": "number",
				"write": false
			},
			lab_status: {
				"name": "Lab Status",
				"type": "number",
				"write": false
			},
			in_fresh_state: {
				"name": "In Fresh State",
				"type": "number",
				"write": false
			},
			in_returning: {
				"name": "Is returning",
				"type": "number",
				"write": false
			},
			in_cleaning: {
				"name": "Is Cleaning",
				"type": "number",
				"write": false
			},
			map_present: {
				"name": "Map Present",
				"type": "number",
				"write": false
			},
			error_code: {
				"name": "Error Code",
				"type": "number",
				"states": this.states["error"],
				"write": false
			},
			clean_area: {
				"name": "Cleaned Area",
				"type": "number",
				"unit": "m²",
				"divider": 1000000,
				"write": false
			},
			clean_time: {
				"name": "Cleaning Time",
				"type": "number",
				"unit": "min",
				"divider": 60,
				"write": false
			},
			battery: {
				"name": "Battery Percentage",
				"type": "number",
				"unit": "%",
				"write": false
			},
			state: {
				"name": "State",
				"type": "number",
				"states": this.states["state"],
				"write": false
			},
			msg_seq: {
				"name": "Message Sequence",
				"type": "number",
				"write": false
			},
			msg_ver: {
				"name": "Message Version",
				"type": "number",
				"write": false
			},
			fan_power: {
				"type": "number",
				"name":"Fan power",
				"states": this.states["fan_power"],
				"write": false
			}
		};

		this.setup.consumables = {
			main_brush_work_time: {
				"name": "Main brush used hours",
				"type": "number",
				"unit": "h",
				"write": false
			},
			side_brush_work_time: {
				"name": "Side brush used hours",
				"type": "number",
				"unit": "h",
				"write": false
			},
			filter_work_time: {
				"name": "Filter used hours",
				"type": "number",
				"unit": "h",
				"write": false
			},
			filter_element_work_time: {
				"name": "Filter element used hours",
				"type": "number",
				"unit": "h",
				"write": false
			},
			sensor_dirty_time: {
				"name": "Sensors time since last cleaning",
				"type": "number",
				"unit": "h",
				"write": false
			},
			dust_collection_work_times:{
				"name": "Dust collection hours",
				"type":
                "number",
				"unit": "h",
				"write": false
			}
		};

		this.setup.commands = {
			app_start: {
				"type": "boolean",
				"name":"Start vacuum",
				"def":false,
				"states": null,
				"write": true
			},
			app_segment_clean: {
				"type": "boolean",
				"name":"Start room cleaning",
				"def":false,
				"states": null,
				"write": true
			},
			app_stop: {
				"type": "boolean",
				"name":"Stop vacuum",
				"def":false,
				"states": null,
				"write": true
			},
			app_pause: {
				"type": "boolean",
				"name":"Pause vacuum",
				"def":false,
				"states": null,
				"write": true
			},
			app_charge: {
				"type": "boolean",
				"name":"Charge vacuum",
				"def":false,
				"states": null,
				"write": true
			},
			app_spot: {
				"type": "boolean",
				"name":"Spot cleaning",
				"def":false,
				"states": null,
				"write": true
			},
			set_custom_mode: {
				"type": "number",
				"name": "Suction Power",
				"def": 101,
				"states": this.states["fan_power"],
				"write": true
			},
			find_me: {
				"type": "boolean",
				"name": "Find me",
				"def": false,
				"write": true
			}
		};

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
			0: {
				"name": "Start cleaning time",
				"type": "string",
				"write": false
			},
			1: {
				"name": "End cleaning time",
				"type": "string",
				"write": false
			},
			2: {
				"name": "Duration cleaning time",
				"type": "number",
				"unit": "min",
				"write": false
			},
			3: {
				"name": "Cleaning Area",
				"type": "number",
				"unit": "m²",
				"write": false
			},
			4: {
				"name": "Error Type",
				"type": "number",
				"write": false
			},
			5: {
				"name": "Completion Type",
				"type": "number",
				"write": false
			},
			6: {
				"name": "Start Type",
				"type": "number",
				"write": false
			},
			7: {
				"name": "Clean Type",
				"type": "number",
				"write": false
			},
			8: {
				"name": "Clean Finish Reason",
				"type": "number",
				"write": false
			}
		};

	}
}

module.exports = {
	roborock_vacuum_s4: roborock_vacuum_s4,
	extended_robot: roborock_vacuum_s4
};