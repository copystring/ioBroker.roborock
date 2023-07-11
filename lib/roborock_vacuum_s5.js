"use strict";

// Roborock S5

const {roborock_vacuum_s4} = require("./roborock_vacuum_s4");

class roborock_vacuum_s5 extends roborock_vacuum_s4 {
	constructor() {
		super();

		//states
		this.states.mop_mode = {
			"300": "Standard",
			"301": "Deep",
			"303": "Deep+"
		};

		// deviceStatus
		this.setup.deviceStatus.mop_mode = {
			"name": "Mop mode",
			"type": "number",
			"states": this.states["mop_mode"],
			"write": false
		};
		this.setup.deviceStatus.water_shortage_status = {
			"name": "Water Shortage Status",
			"type": "number",
			"write": false
		};
		this.setup.deviceStatus.mop_forbidden_enable = {
			"name": "Mop Forbidden Enable",
			"type": "number",
			"write": false
		};
		this.setup.deviceStatus.water_box_carriage_status = {
			"name": "Water Box Carriage Status",
			"type": "number",
			"write": false
		};
		this.setup.deviceStatus.water_box_status = {
			"name": "Water Box Status",
			"type": "number",
			"write": false
		};
		this.setup.deviceStatus.water_box_mode = {
			"type": "number",
			"name":"Amount of water to use",
			"states": this.states["water_box_mode"],
			"write": false
		};

		// commands
		this.setup.commands.set_mop_mode = {
			"type": "number",
			"name":"Mop Route",
			"def":300,
			"states": this.states["mop_mode"],
			"write": true
		};

		delete this.setup.consumables.main_brush_life;
		delete this.setup.consumables.side_brush_life;
		delete this.setup.consumables.filter_life;

		this.setup.consumables[125]= {
			"name": "Main brush life",
			"type": "number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
		this.setup.consumables[126]= {
			"name": "Side brush life",
			"type": "number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
		this.setup.consumables[127]= {
			"name": "Filter life",
			"type":
			"number",
			"unit": "%",
			"divider": 1000000,
			"write": false
		};
	}
}

module.exports = {
	roborock_vacuum_s5: roborock_vacuum_s5,
	extended_robot: roborock_vacuum_s5
};