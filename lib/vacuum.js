"use strict";


const roborock_mqtt_connector = require("./roborock_mqtt_connector").roborock_mqtt_connector;
const rr_mqtt_connector = new roborock_mqtt_connector(this);
let rr;



class vacuum {
	constructor(adapter, rrEmitter) {
		this.adapter = adapter;
		rr = rrEmitter;

		this.parameterFolders = {
			"get_mop_mode": "deviceConfig",
			"get_water_box_custom_mode": "deviceConfig",
			"get_network_info": "networkInfo",
			"get_consumable": "consumables",
			"get_fw_features": "firmwareFeatures",
			"get_carpet_mode": "deviceConfig",
			"get_carpet_clean_mode": "deviceConfig"
		};

		this.states = {
			"mop_mode": {"300": "Standard","301": "Deep","302": "Deep+"},
			"water_box_mode": {"200": "Off","201": "Low","202": "Medium","203": "High","204": "Customize (Auto)","207": "Custom (Levels)"},
			"water_box_custom_mode": {"200": "Off", "201": "Mild","202": "Moderate","203": "Intense"},
			"fan_power": {"101": "Quiet", "102": "Balanced", "103": "Turbo", "104": "Max", "105": "Off"},
			"carpet_mode": {'[{"enable":0, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]': "off", '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]': "on"},
			"carpet_clean_mode": {'{"carpet_clean_mode": 0}': "Avoid", '{"carpet_clean_mode": 1}': "Rise", '{"carpet_clean_mode": 2}': "Ignore"}
		};

		this.setup = {
			"floor": {},

			"networkInfo": {
				"ssid":  {"type": "string", "name": "Connected WiFi", "write": false},
				"ip":    {"type": "string", "name": "IP adress of device", "write": false},
				"mac":   {"type": "string", "name": "MAC adress of device", "write": false},
				"bssid": {"type": "string", "name": "Basic Service Set Identifier", "write": false},
				"rssi":  {"type": "number", "name": "Received Signal Strength Indicator", "write": false}
			},

			"deviceStatus": {
				"battery":         {"name": "Battery percentage", "unit": "%",  "type": "number", "write": false},
				"filter_life":     {"name": "Remaining air filter life", "type": "number", "unit": "%", "write": false},
				"main_brush_life": {"name": "Remaining main brush life", "type": "number", "unit": "%", "write": false},
				"side_brush_life": {"name": "Remaining side brush life", "type": "number", "unit": "%", "write": false},
				"state":           {"name": "Device state", "type": "number", "write": false},
				"120":             {"name": "unknown status", "type": "number", "write": false},
				"121":             {"name": "unknown status", "type": "number", "write": false},
				"122":             {"name": "unknown status", "type": "number", "write": false},
				"123":             {"name": "unknown status", "type": "number", "write": false},
				"124":             {"name": "unknown status", "type": "number", "write": false},
				"125":             {"name": "unknown status", "type": "number", "write": false},
				"126":             {"name": "unknown status", "type": "number", "write": false},
				"127":             {"name": "unknown status", "type": "number", "write": false},
			},

			"deviceInfo": {
				"activeTime": {"name": "Total run time", "type": "number", "write": false},
				"attribute": {"name": "Attribute", "type": "object", "write": false},
				"duid": {"name": "Device unique ID", "type": "string", "write": false},
				"extra": {"name": "Extra", "type": "string", "write": false},
				"featureSet": {"name": "Feature set", "type": "string", "write": false},
				"fv": {"name": "Firmware version", "type": "string", "write": false},
				"iconUrl": {"name": "Icon URL", "type": "string", "write": false},
				"lat": {"name": "latitude", "type": "string", "write": false},
				"localKey": {"name": "Local key", "type": "string", "write": false},
				"lon": {"name": "longitude", "type": "string", "write": false},
				"name": {"name": "Robot name", "type": "string", "write": false},
				"newFeatureSet": {"name": "Feature set", "type": "string", "write": false},
				"online": {"name": "Online status", "type": "boolean", "write": false},
				"productId": {"name": "Product ID", "type": "string", "write": false},
				"pv": {"name": "Product version", "type": "string", "write": false},
				"roomId": {"name": "Room ID", "type": "string", "write": false},
				"runtimeEnv": {"name": "Runetime environment", "type": "string", "write": false},
				"share": {"name": "Share", "type": "boolean", "write": false},
				"shareTime": {"name": "Shared time", "type": "number", "write": false},
				"silentOtaSwitch": {"name": "Perform silent OTA", "type": "boolean", "write": false},
				"sn": {"name": "Serialnumber", "type": "string", "write": false},
				"timeZoneId": {"name": "Robot Time Zone", "type": "string", "write": false},
				"tuyaMigrated": {"name": "Tuya integration", "type": "boolean", "write": false},
				"tuyaUuid": {"name": "Tuya integration UUID", "type": "string", "write": false}
			},

			"consumables": {
				"main_brush_work_time": {"name": "Main brush used hours", "type": "number", "unit": "h", "write": false},
				"side_brush_work_time": {"name": "Side brush used hours", "type": "number", "unit": "h", "write": false},
				"filter_work_time": {"name": "Filter used hours", "type": "number", "unit": "h", "write": false},
				"filter_element_work_time": {"name": "Filter element used hours", "type": "number", "unit": "h", "write": false},
				"sensor_dirty_time": {"name": "Sensors time until cleaning", "type": "number", "unit": "h", "write": false},
				"dust_collection_work_times":{"name":  "Dust collection hours", "type": "number", "unit": "h", "write": false}
			},

			"cleaningInfo": {
				"clean_time":             {"name": "Total Time", "type": "number", "unit": "h", "write": false},
				"clean_area":             {"name": "Total Area","type": "number","unit": "m³", "write": false},
				"clean_count":            {"name": "Cycles","type": "number", "write": false},
				"dust_collection_count":  {"name": "Times Dust Collected", "type": "number", "write": false}
			},

			"cleaningRecords": {
				"begin":                  {"name": "Start cleaning time", "type": "string", "write": false},
				"end":                    {"name": "End cleaning time", "type": "string", "write": false},
				"duration":               {"name": "Duration cleaning time", "type": "number", "unit": "min", "write": false},
				"area":                   {"name": "Cleaning Area", "type": "number", "unit": "m³", "write": false},
				"error":                  {"name": "Error Type", "type": "number", "write": false},
				"complete":               {"name": "Completion Type", "type": "number", "write": false},
				"start_type":             {"name": "Start Type", "type": "number", "write": false},
				"clean_type":             {"name": "Clean Type", "type": "number", "write": false},
				"finish_reason":          {"name": "Clean Finish Reason", "type": "number", "write": false},
				"dust_collection_status": {"name": "Dust Collection Status", "type": "number", "write": false}
			},

			["commands"]: {
				"app_start":                    {"type": "boolean", "name":"Start vacuum", "def":false, "states": null, "write": true},
				"app_segment_clean":            {"type": "boolean", "name":"Start room cleaning", "def":false, "states": null, "write": true},
				"app_stop":                     {"type": "boolean", "name":"Stop vacuum", "def":false, "states": null, "write": true},
				"app_pause":                    {"type": "boolean", "name":"Pause vacuum", "def":false, "states": null, "write": true},
				"app_charge":                   {"type": "boolean", "name":"Charge vacuum", "def":false, "states": null, "write": true},
				"app_spot":                     {"type": "boolean", "name":"Spot cleaning", "def":false, "states": null, "write": true},
				"set_mop_mode":                 {"type": "number", "name":"Mop Route", "def":300, "states": this.states["mop_mode"], "write": true},
				"set_water_box_custom_mode":    {"type": "number", "name":"Scrub Intensity", "def":201, "states": this.states["water_box_custom_mode"], "write": true},
				"set_custom_mode":              {"type": "number", "name": "Suction Power", "def": 101, "states": this.states["fan_power"], "write": true},
				"find_me":                      {"type": "boolean", "name": "Find me", "def": false, "write": true},
				"set_carpet_mode":              {"type": "string", "name": "Carpet Boost", "def": '[{"enable":1, "stall_time": 10, "current_low": 400, "current_high": 500, "current_integral": 450}]', "states": this.states["carpet_mode"], "write": true},
				"set_carpet_clean_mode":        {"type": "string", "name": "Carpet Avoidance Mode", "def": '{"carpet_clean_mode": 1}', "states": this.states["carpet_clean_mode"], "write": true}
			},

			["deviceConfig"]: {
				"mop_mode":                     {"type": "number", "name":"Mop Route", "states": this.states["mop_mode"], "write": false},
				"water_box_custom_mode":        {"type": "number", "name":"Scrub Intensity", "states": this.states["water_box_custom_mode"], "write": false},
				"water_box_mode":               {"type": "number", "name":"Amount of water to use", "states": this.states["water_box_mode"], "write": false},
				"fan_power":                    {"type": "number", "name":"Fan power", "states": this.states["fan_power"], "write": false},
				"carpet_mode":                  {"type": "string", "name":"Carpet Boost", "states": this.states["carpet_mode"], "write": false},
				"carpet_clean_mode":            {"type": "string", "name": "Carpet Avoidance Mode", "states": this.states["carpet_clean_mode"], "write": false}
			},

			["firmwareFeatures"]: {
				101:"unknown",
				102:"unknown",
				103:"Clean Time Supported",
				104:"unknown",
				105:"unknown",
				106:"unknown",
				107:"unknown",
				108:"unknown",
				109:"unknown",
				110:"unknown",
				111:"Supports FSEndPoint",
				112:"Supports AutoSplitSegments",
				113:"Supports Delete Map feature",
				114:"Supports OrderSegmentClean",
				115:"Spot Clean",
				116:"Map Segment Supported",
				117:"unknown",
				118:"unknown",
				119:"Supports Led Status Switch",
				120:"Multi Floor Supported",
				121:"unknown",
				122:"Supports FetchTimer Summary",
				123:"Orders Clean Supported",
				124:"Analysis Supported",
				125:"Remote Supported",
				126:"unknown",
				127:"unknown",
				128:"unknown",
				129:"unknown"
			}
		};
	}

	async command(duid, parameter, value)
	{
		if (parameter == "load_multi_map") {
			const roomFloor = value;
			await rr_mqtt_connector.sendRequest(duid, rr, "load_multi_map", [roomFloor]).then(attribute_val => {
				this.adapter.log.debug("Map " + attribute_val + "loaded.");
			});

			rr_mqtt_connector.sendRequest(duid, rr, "get_room_mapping", []).then(attribute_val => {
				this.adapter.log.debug("get_room_mapping via load_multi_map: " + JSON.stringify(attribute_val));

				for (const roomID in this.adapter.roomIDs)
				{
					const roomName = this.adapter.roomIDs[roomID];

					for (const mappedRoom in attribute_val)
					{
						if (roomID == attribute_val[mappedRoom][1]) {
							this.adapter.log.debug("Mapped room matched: " + roomID + " with name: " + roomName);

							this.adapter.setObjectNotExistsAsync("Devices." + duid + ".floors." + roomFloor + "." + attribute_val[mappedRoom][0], {
								type: "state",
								common: {
									name: roomName,
									type: "boolean",
									def: true,
									role: "value",
									read: true,
									write: true,
								},
								native: {},
							});
						}
					}
				}
			});
		}
		else if (parameter == "app_segment_clean") {
			this.adapter.log.debug("Start room cleaning");

			const roomList = [];
			const roomFloor = await this.adapter.getStateAsync("Devices." + duid + ".commands.load_multi_map");


			await rr_mqtt_connector.sendRequest(duid, rr, "get_room_mapping", []).then(async attribute_val => {
				for (const mappedRoom in attribute_val)
				{
					const roomState = await this.adapter.getStateAsync("Devices." + duid + ".floors." + roomFloor.val + "." + attribute_val[mappedRoom][0]);
					if (roomState.val == true)
					{
						roomList.push(attribute_val[mappedRoom][0]);
					}
				}
			});

			await rr_mqtt_connector.sendRequest(duid, rr, parameter, roomList).then(result => {
				this.adapter.log.debug("app_segment_clean with roomIDs: " + JSON.stringify(roomList) + " result: " + result);
			});
		}
		else if (typeof(value) != "boolean") {
			const valueType = typeof(value);
			if (valueType == "string") {
				value = await JSON.parse(value);
			}
			else if (valueType == "number") {
				value = [value];
			}
			// await is important here!!! Wait for the command to finish before sending the request to update deviceConfig!!!
			await rr_mqtt_connector.sendRequest(duid, rr, parameter, value).then(result => {
				this.adapter.log.debug("Command: " + parameter + " with value: " + value + " result: " + result);
			});

			const getCommand = parameter.replace("set", "get");
			this.getParameter(duid, getCommand);
		}
		// else {
		// 	await rr_mqtt_connector.sendRequest(duid, rr, parameter, [value]).then(result => {
		// 		this.adapter.log.debug("Command: " + parameter + " result: " + result);
		// 	});
		// }
	}

	async getParameter(duid, parameter) {
		this.adapter.log.debug("getParameter: " + parameter);
		const targetFolder = this.parameterFolders[parameter];
		let mode;
		if (targetFolder == "networkInfo")
		{
			mode = parameter;
			rr_mqtt_connector.sendRequest(duid, rr, parameter, []).then(attribute_val => {
				for (const attribute in attribute_val)
				{
					this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + attribute, { val: attribute_val[attribute], ack: true });
				}
			});
		}
		else if (targetFolder == "consumables") {
			await rr_mqtt_connector.sendRequest(duid, rr, "get_consumable", []).then(async consumables => {
				consumables = consumables[0];
				for (const consumable in consumables) {
					const consumable_val = consumables[consumable];
					this.adapter.setStateAsync("Devices." + duid + ".consumables." + consumable, { val: Math.round(consumable_val/60/60), ack: true });
				}
			});
		}
		else if ((parameter == "get_custom_mode") || (parameter == "get_status") || (parameter == "get_water_box_custom_mode")) {
			rr_mqtt_connector.sendRequest(duid, rr, "get_status", []).then(attribute_val => {
				for (const attribute in attribute_val[0])
				{
					if ((attribute == "fan_power") || (attribute == "water_box_mode"))
					{
						this.adapter.setStateAsync("Devices." + duid + ".deviceConfig." + attribute, { val: attribute_val[0][attribute], ack: true });
					}
				}
			});
			if (parameter == "get_water_box_custom_mode") {
				rr_mqtt_connector.sendRequest(duid, rr, "get_water_box_custom_mode", []).then(attribute_val => {
					this.adapter.setStateAsync("Devices." + duid + ".deviceConfig.water_box_custom_mode", { val: attribute_val[0], ack: true });
				});
			}
		}
		else if (parameter == "get_room_mapping") {
			this.adapter.log.debug("get_room_mapping");
			rr_mqtt_connector.sendRequest(duid, rr, "get_room_mapping", []).then(attribute_val => {
				this.adapter.log.debug("get_room_mapping: " + JSON.stringify(attribute_val));
			});
		}
		else if (parameter == "get_multi_maps_list") {
			rr_mqtt_connector.sendRequest(duid, rr, "get_multi_maps_list", []).then(attribute_val => {
				const mapInfo = attribute_val[0]["map_info"];
				const maps = {};

				for (const map in mapInfo)
				{
					const roomFloor = attribute_val[0]["map_info"][map]["mapFlag"];
					const mapName = attribute_val[0]["map_info"][map]["name"];

					maps[roomFloor] = mapName;

					this.adapter.setObjectNotExistsAsync("Devices." + duid + ".floors." + roomFloor, {
						type: "folder",
						common: {
							name: mapName,
						},
						native: {},
					});
				}
				this.adapter.setObjectNotExistsAsync("Devices." + duid + ".commands.load_multi_map", {
					type: "state",
					common: {
						name: "Load map",
						type: "number",
						def: 0,
						read: true,
						write: true,
						states: maps
					},
					native: {},
				});
			});
		}
		else if (parameter == "get_fw_features") {
			this.adapter.log.debug("Firmware features request");
			rr_mqtt_connector.sendRequest(duid, rr, parameter, []).then(async firmwareFeatures => {
				for (const firmwareFeature in firmwareFeatures) {
					const featureID = firmwareFeatures[firmwareFeature];
					await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".firmwareFeatures." + firmwareFeature, {
						type: "state",
						common: {
							type: "string",
							name: featureID.toString(),
							role: "value",
							read: true,
							write: false,
						},
						native: {},
					});
					this.adapter.setStateAsync("Devices." + duid + ".firmwareFeatures." + firmwareFeature, { val: this.setup.firmwareFeatures[featureID].toString(), ack: true });
				}
			});
		}
		else if (typeof(this.parameterFolders[parameter]) != "undefined")
		{
			mode = parameter.substring(4);
			rr_mqtt_connector.sendRequest(duid, rr, parameter, []).then(attribute_val => {
				if (typeof(attribute_val[0]) == "object") {
					attribute_val[0] = JSON.stringify(attribute_val[0]);
				}
				this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
			});
		}
		else {
			// unknown parameter
			rr_mqtt_connector.sendRequest(duid, rr, parameter, []).then(attribute_val => {
				// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
				this.adapter.log.debug("Unknown parameter: " + JSON.stringify(attribute_val));
			});
		}
	}

	async setUpObjects(duid)
	{
		for (const setupAttribute in this.setup) {
			if (setupAttribute == "floor") {
				// create floors
				await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".floors", {
					type: "folder",
					common: {
						name: "Floors",
					},
					native: {},
				});
			}
			else if ((setupAttribute != "cleaningRecords") && (setupAttribute != "firmwareFeatures")) {
				for (const command in this.setup[setupAttribute])
				{
					const object = this.setup[setupAttribute][command];
					await this.adapter.setObjectNotExistsAsync("Devices." + duid + "."+ setupAttribute + "." + command, {
						type: "state",
						common: {
							name: object.name,
							type: object.type,
							unit: object.unit,
							def: object.def,
							role: "value",
							read: true,
							write: object.write,
							"states": object.states,
						},
						native: {},
					});
				}
			}
			else {
				for (let i=0; i<20; i++)
				{
					await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".cleaningInfo.Records." + i, {
						type: "folder",
						common: {
						},
						native: {},
					});
					for (const record in this.setup["cleaningRecords"]) {
						const object = this.setup["cleaningRecords"][record];
						await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".cleaningInfo.Records." + i + "." + record, {
							type: "state",
							common: {
								name: object.name,
								type: object.type,
								unit: object.unit,
								role: "value",
								read: true,
								write: object.write,
							},
							native: {},
						});
					}
				}
			}
		}
	}



	async deviceInfo(duid, device) {
		for (const attribute in device) {
			const attribute_val = device[attribute];
			const type = typeof(attribute_val);

			if (type == "object" && attribute_val != null) {
				for (const attribute_in_object in device[attribute]) {
					const attribute_val_in_object = device[attribute][attribute_in_object];

					if ((attribute_in_object == "fan_power") || (attribute_in_object == "water_box_mode")) {
						await this.adapter.setStateAsync("Devices." + duid + ".deviceConfig." + attribute_in_object, { val: parseInt(attribute_val_in_object), ack: true });
					}
					else {
						await this.adapter.setStateAsync("Devices." + duid + "." + attribute + "." + attribute_in_object, { val: parseInt(attribute_val_in_object), ack: true });
					}
				}
			}
			else {
				await this.adapter.setStateAsync("Devices." + duid + ".deviceInfo." + attribute, { val: attribute_val, ack: true });
			}

		}
	}

	async getCleanSummary(duid) {
		rr_mqtt_connector.sendRequest(duid, rr, "get_clean_summary", []).then(async cleaningAttributes => {
			for (const cleaningAttribute in cleaningAttributes)
			{
				let cleaningAttribute_val = cleaningAttributes[cleaningAttribute];
				switch (cleaningAttribute) {
					case "clean_time":
						cleaningAttribute_val = Math.round(cleaningAttribute_val/60/60);
						break;

					case "clean_area":
						cleaningAttribute_val = Math.round(cleaningAttribute_val/1000/1000);
						break;

					case "clean_count":
						break;

					case "dust_collection_count":
						break;

					case "records":
						for (const cleaningRecord in cleaningAttributes["records"])
						{
							rr_mqtt_connector.sendRequest(duid, rr, "get_clean_record", [cleaningAttributes["records"][cleaningRecord]]).then(async cleaningRecordAttributes => {
								cleaningRecordAttributes = cleaningRecordAttributes[0];
								for (const cleaningRecordAttribute in cleaningRecordAttributes) {
									let cleaningRecordAttribute_val = cleaningRecordAttributes[cleaningRecordAttribute];

									switch (cleaningRecordAttribute) {
										case "begin":
											cleaningRecordAttribute_val = new Date(cleaningAttributes["records"][cleaningRecord] * 1000).toString();
											break;

										case "end":
											cleaningRecordAttribute_val = new Date(cleaningAttributes["records"][cleaningRecord] * 1000).toString();
											break;

										case "duration":
											cleaningRecordAttribute_val = Math.round(cleaningRecordAttribute_val/60);
											break;

										case "area":
											cleaningRecordAttribute_val = Math.round(cleaningRecordAttribute_val/1000/1000);
											break;

										case "error":
											break;

										case "complete":
											break;

										case "start_type":
											break;

										case "clean_type":
											break;

										case "finish_reason":
											break;

										case "dust_collection_status":
											break;

										default:
									}
									this.adapter.setStateAsync("Devices." + duid + ".cleaningInfo.Records." + cleaningRecord + "." + cleaningRecordAttribute, { val: cleaningRecordAttribute_val, ack: true });
								}
							});
						}
						break;

					default:
				}
				if (cleaningAttribute != "records") {
					this.adapter.setStateAsync("Devices." + duid + ".cleaningInfo." + cleaningAttribute, { val: cleaningAttribute_val, ack: true });
				}
			}
		});
	}
}

module.exports = {
	vacuum,
};
