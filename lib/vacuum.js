"use strict";


const roborock_mqtt_connector = require("./roborock_mqtt_connector").roborock_mqtt_connector;
const rr_mqtt_connector = new roborock_mqtt_connector(this);
const RRMapParser = require("./RRMapParser");
const MapCreator = require("./mapCreator");
let rr;

const supportedRobots = {
	"roborock.vacuum.s4": "roborock_vacuum_s4", // Roborock S4
	"roborock.vacuum.s5": "roborock_vacuum_s5", // Roborock S5
	"roborock.vacuum.s5e": "roborock_vacuum_s5e", // Roborock S5 Max
	"roborock.vacuum.s6": "roborock_vacuum_s6", // Roborock S6
	"roborock.vacuum.a08": "roborock_vacuum_a08", // Roborock S6 Pure
	"roborock.vacuum.a10": "roborock_vacuum_a10", // Roborock S6 MaxV
	"roborock.vacuum.a15": "roborock_vacuum_a15", // Roborock S7
	"roborock.vacuum.a27": "roborock_vacuum_a27", // Roborock S7 MaxV (Ultra)
	"roborock.vacuum.a38": "roborock_vacuum_a38", // Roborock Q7 Max
	"roborock.vacuum.a62": "roborock_vacuum_a62" // Roborock S7 Pro Ultra


	//'roborock.vacuum.m1s', // ??
	//'rockrobo.vacuum.v1' // ??
};



class vacuum {
	constructor(adapter, rrEmitter, robotModel) {
		this.adapter = adapter;
		rr = rrEmitter;

		if (!supportedRobots[robotModel]) {
			this.adapter.log.error("The model ${robotModel} is not supported. Get in touch with the dev to get this robot supported.");
		}
		else {
			this.adapter.log.debug("Robot key: " + robotModel);
		}

		this.extended_robot_class = require("./" + supportedRobots[robotModel]).extended_robot;
		// this.extended_robot_class = extended_robot_module[robotModel];
		this.extended_robot = new this.extended_robot_class(this);

		this.parameterFolders = {
			"get_mop_mode": "deviceStatus",
			"get_water_box_custom_mode": "deviceStatus",
			"get_network_info": "networkInfo",
			"get_consumable": "consumables",
			"get_fw_features": "firmwareFeatures",
			"get_carpet_mode": "deviceStatus",
			"get_carpet_clean_mode": "deviceStatus",
			"get_carpet_cleaning_mode": "deviceStatus"
		};

		this.setup = this.extended_robot.setup;
	}

	async getMap(duid) {
		try {
			await rr_mqtt_connector.sendRequest(duid, rr, "get_map_v1", [], true).then(async map => {
				const parsedMap = RRMapParser.PARSEDATA(map);
				const mapBase64 = MapCreator.CanvasMap(parsedMap).toDataURL();

				this.adapter.setStateAsync("Devices." + duid + ".map.mapBase64", { val: mapBase64, ack: true });
			});
		}
		catch (error) {
			this.adapter.log.error("Failed to creating canvas: " + error);
		}

	}

	async command(duid, parameter, value)
	{
		if (parameter == "load_multi_map") {
			const roomFloor = value;
			await rr_mqtt_connector.sendRequest(duid, rr, "load_multi_map", [roomFloor]).then(attribute_val => {
				this.adapter.log.debug("Map " + attribute_val + "loaded.");
				this.getMap(duid);
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
		else if ((value) && (typeof(value) != "boolean")) {
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
		else {
			await rr_mqtt_connector.sendRequest(duid, rr, parameter, ).then(result => {
				this.adapter.log.debug("Command: " + parameter + " result: " + result);
			});
		}
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
		else if (parameter == "get_status") {
			rr_mqtt_connector.sendRequest(duid, rr, "get_status", []).then(attribute_val => {
				this.adapter.log.debug("get_status: " + JSON.stringify(attribute_val[0]));
				for (const attribute in attribute_val[0])
				{
					try {
						if (this.setup.deviceStatus[attribute]) {
							if (typeof(this.setup.deviceStatus[attribute].divider) != "undefined") {
								attribute_val[0][attribute] = Math.round(attribute_val[0][attribute] / this.setup.deviceStatus[attribute].divider);
							}
							if (typeof(attribute_val[0][attribute]) == "object") {
								attribute_val[0][attribute] = JSON.stringify(attribute_val[0][attribute]);
							}

							this.adapter.setStateAsync("Devices." + duid + ".deviceStatus." + attribute, { val: attribute_val[0][attribute], ack: true });
						}
						else {
							this.adapter.log.error("Unsported attribute: " + attribute + " of get_status. Please contact the dev to add the newly found attribute of your robot.");
						}
					} catch (e) {
						this.adapter.log.error("get_status error: " + e);
					}
				}
			});
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
				if (typeof(attribute_val) == "object") {
					this.adapter.log.error("Unknown parameter: " + JSON.stringify(attribute_val));
				}
				else {
					this.adapter.log.error("Unknown parameter: " + attribute_val);
				}
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


		await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".map.mapBase64", {
			type: "state",
			common: {
				name: "base64 Map",
				type: "string",
				read: true,
				write: false
			},
			native: {},
		});
	}

	async getCleanSummary(duid) {
		rr_mqtt_connector.sendRequest(duid, rr, "get_clean_summary", []).then(async cleaningAttributes => {
			for (const cleaningAttribute in cleaningAttributes)
			{
				let cleaningAttribute_val = cleaningAttributes[cleaningAttribute];
				switch (cleaningAttribute) {
					case "clean_time" || 0:
						cleaningAttribute_val = Math.round(cleaningAttribute_val/60/60);
						break;

					case "clean_area" || 1:
						cleaningAttribute_val = Math.round(cleaningAttribute_val/1000/1000);
						break;

					case "clean_count" || 2:
						break;

					case "records" || 3:
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
				if ((cleaningAttribute != "records") && (cleaningAttribute != "3")) {
					if (typeof(cleaningAttribute_val) == "object") {
						this.adapter.log.debug("cleaningInfo object: " + JSON.stringify(cleaningAttribute_val));
					}
					else {
						this.adapter.log.debug("cleaningInfo: " + cleaningAttribute_val);
					}
					this.adapter.setStateAsync("Devices." + duid + ".cleaningInfo." + cleaningAttribute, { val: cleaningAttribute_val, ack: true });
				}
			}
		});
	}
}

module.exports = {
	vacuum,
};
