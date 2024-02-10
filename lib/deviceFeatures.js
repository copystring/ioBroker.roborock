"use strict";

const errorCodes = {
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
	"-1": "Unknown Error",
};

const stateCodes = {
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
	28: "In call",
	29: "Mapping",
	100: "Fully Charged",
};

const defaultCommands = {
	app_start: "boolean",
	app_segment_clean: "boolean",
	app_stop: "boolean",
	app_pause: "boolean",
	app_charge: "boolean",
	app_spot: "boolean",
	app_zoned_clean: "json",
	resume_zoned_clean: "boolean",
	stop_zoned_clean: "boolean",
	set_custom_mode: "number",
	find_me: "boolean",
	app_goto_target: "json",
};

const defaultDeviceStatus = {
	unsave_map_flag: "number",
	unsave_map_reason: "number",
	dock_error_status: "number",
	debug_mode: "number",
	auto_dust_collection: "number",
	dust_collection_status: "number",
	dock_type: "number",
	adbumper_status: "string",
	lock_status: "number",
	is_locating: "number",
	map_status: "number",
	dnd_enabled: "number",
	lab_status: "number",
	in_fresh_state: "number",
	in_returning: "number",
	in_cleaning: "number",
	map_present: "number",
	error_code: { type: "number", states: errorCodes },
	clean_area: { type: "number", unit: "m²", divider: 1000000 },
	clean_time: { type: "number", unit: "min", divider: 60 },
	battery: { type: "number", unit: "%" },
	state: { type: "number", states: stateCodes },
	msg_seq: "number",
	msg_ver: "number",
	fan_power: { type: "number", name: "Fan power", states: { 101: "Quiet", 102: "Balanced", 103: "Turbo", 104: "Max", 105: "Off" } },
};

class deviceFeatures {
	constructor(adapter, features, duid) {
		this.adapter = adapter;
		this.features = features;
		this.duid = duid;
	}

	isWashThenChargeCmdSupported() {
		this.adapter.createCommand(this.duid, "app_start_wash", "boolean", false);
		this.adapter.createCommand(this.duid, "app_stop_wash", "boolean", false);
	}

	isDustCollectionSettingSupported() {
		this.adapter.createCommand(this.duid, "app_start_collect_dust", "boolean", false);
		this.adapter.createCommand(this.duid, "app_stop_collect_dust", "boolean", false);
		this.adapter.createCommand(this.duid, "set_dust_collection_switch_status", "json", '{"status":1}', { '{"status":0}': "Off", '{"status":1}': "On" });
		this.adapter.createCommand(this.duid, "set_dust_collection_mode", "json", '{"mode":0}', {
			'{"mode":0}': "Smart",
			'{"mode":1}': "Low",
			'{"mode":2}': "Medium",
			'{"mode":4}': "Max",
		});
	}

	isSupportedDrying() {
		this.adapter.createCommand(this.duid, "app_set_dryer_status", "string", '{"status": 0}', { '{"status": 0}': "On", '{"status": 1}': "Off" });
		this.adapter.createCommand(
			this.duid,
			"set_wash_towel_mode",
			"json",
			'{"wash_mode":2}',
			{ '{"wash_mode":0}': "Eco", '{"wash_mode":1}': "Medium", '{"wash_mode":2}': "Intense" }
		);
		this.adapter.createCommand(
			this.duid,
			"set_smart_wash_params",
			"json",
			'{"smart_wash":0,"wash_interval":1800}',
			{
				'{"smart_wash":0,"wash_interval":600}': "10 Min",
				'{"smart_wash":0,"wash_interval":900}': "15 Min",
				'{"smart_wash":0,"wash_interval":1200}': "20 Min",
				'{"smart_wash":0,"wash_interval":1500}': "25 Min",
				'{"smart_wash":0,"wash_interval":1800}': "30 Min",
				'{"smart_wash":0,"wash_interval":2100}': "35 Min",
				'{"smart_wash":0,"wash_interval":2400}': "40 Min",
				'{"smart_wash":0,"wash_interval":2700}': "45 Min",
				'{"smart_wash":0,"wash_interval":3000}': "50 Min",
				'{"smart_wash":1,"wash_interval":1200}': "Per room",
			}
		);
	}

	isShakeMopSetSupported() {
		this.adapter.createCommand(this.duid, "set_mop_mode", "number", 300, { 300: "Standard", 301: "Deep", 303: "Deep+" });
		this.adapter.createCommand(this.duid, "set_water_box_custom_mode", "number", 201, { 200: "Off", 201: "Mild", 202: "Moderate", 203: "Intense" });
	}

	getFeatureList() {
		return {
			isWashThenChargeCmdSupported: ((this.features / Math.pow(2, 32)) >> 5) & 1,
			isDustCollectionSettingSupported: !!(33554432 & this.features),
			isSupportedDrying: ((this.features / Math.pow(2, 32)) >> 15) & 1,
			isShakeMopSetSupported: !!(262144 & this.features),
		};
	}

	processSupportedFeatures() {
		// process default commands
		for (const [command, type] of Object.entries(defaultCommands)) {
			this.adapter.createCommand(this.duid, command, type);
		}

		// process default device status
		for (const [state, type] of Object.entries(defaultDeviceStatus)) {
			if (typeof type == "string") {
				this.adapter.createDeviceStatus(this.duid, state, type);
			} else {
				this.adapter.createDeviceStatus(this.duid, state, type.type, type.states, type.unit, type.divider);
			}
		}

		const featureList = this.getFeatureList();
		Object.keys(featureList).forEach((feature) => {
			if (featureList[feature]) {
				if (typeof this[feature] === "function") {
					this[feature]();
				}
			}
		});
	}
}

module.exports = {
	deviceFeatures,
};
