"use strict";

const roborock_mqtt_connector = require("./roborock_mqtt_connector").roborock_mqtt_connector;
const rr_mqtt_connector = new roborock_mqtt_connector(this);
const RRMapParser = require("./RRMapParser");
const MapCreator = require("./mapCreator");
const fs = require("fs");
const { createCanvas, Image } = require("canvas");

let rr;
let roomList, roomFloor;

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
		if (this.adapter.config.enable_map_creation == true) {
			this.adapter.log.debug("Update map");
			try {
				await rr_mqtt_connector.sendRequest(duid, rr, "get_map_v1", [], true).then(async map => {
					const parsedData = RRMapParser.PARSEDATA(map);
					this.adapter.setStateAsync("Devices." + duid + ".map.mapData", { val: JSON.stringify(parsedData), ack: true });
					if (typeof(parsedData?.image?.pixels?.floor) != "undefined") {
						const mapBase64 = MapCreator.CanvasMap(parsedData, this.adapter.config.map_scale).toDataURL();
						this.adapter.setStateAsync("Devices." + duid + ".map.mapBase64", { val: mapBase64, ack: true });

						const image = new Image();
						image.src = mapBase64;
						const tempCanvas = createCanvas(image.width, image.height);
						const tempCtx = tempCanvas.getContext("2d");
						let mapMinX = image.width, mapMinY = image.height, mapMaxX = 0, mapMaxY = 0;
						tempCtx.drawImage(image, 0, 0);
						const imageData = tempCtx.getImageData(0, 0, image.width, image.height);

						for (let y = 0; y < image.height; y++) {
							for (let x = 0; x < image.width; x++) {
								const index = (y * image.width + x) * 4;
								if (imageData.data[index+3] > 0) { // Check if the alpha value is non-zero
									mapMinX = Math.min(mapMinX, x);
									mapMinY = Math.min(mapMinY, y);
									mapMaxX = Math.max(mapMaxX, x);
									mapMaxY = Math.max(mapMaxY, y);
								}
							}
						}
						const mapSizeX = mapMaxX - mapMinX;
						const mapSizeY = mapMaxY - mapMinY;
						const truncatedCanvas = createCanvas(mapSizeX, mapSizeY);
						const truncatedCtx = truncatedCanvas.getContext("2d");
						truncatedCtx.drawImage(image, mapMinX, mapMinY, mapSizeX, mapSizeY, 0, 0, mapSizeX, mapSizeY);

						this.adapter.setStateAsync("Devices." + duid + ".map.mapBase64Truncated", { val: truncatedCanvas.toDataURL(), ack: true });

						// Send current map with Scale factor
						const mapToSend = {};
						mapToSend.command = "map";
						mapToSend.base64 = mapBase64;
						mapToSend.map = parsedData;
						mapToSend.scale = this.adapter.config.map_scale;

						this.adapter.log.debug("socket connection status: " + this.adapter.socket);

						if (this.adapter.socket != null)
						{
							this.adapter.socket.send(JSON.stringify(mapToSend));
						}

						// This is for testing and debugging maps. This can't be stored in a state.
						fs.writeFile("./test.rrmap", map, err => {
							if (err) {
								console.error(err);
							}
						});
					}
				});
			}
			catch (error) {
				if (error == "locating") {
					this.adapter.log.info("Robot is currently: " + error);
				}
				else if (error == "retry") {
					this.adapter.log.info("Roborock rejected the request for a new map. Error: " + error);
				}
				else {
					this.adapter.log.error("Failed to create canvas: " + error);

					if (this.adapter.supportsFeature && this.adapter.supportsFeature("PLUGINS")) {
						if (this.adapter.sentryInstance) {
							this.adapter.sentryInstance.getSentryObject().captureException("Failed to create canvas: " + error);
						}
					}
				}
			}
		}
	}

	async command(duid, parameter, value) {
		switch (parameter) {
			case "load_multi_map":
				await rr_mqtt_connector.sendRequest(duid, rr, "load_multi_map", [value]).then(attribute_val => {
					this.adapter.log.debug("Map " + attribute_val + " loaded.");
					this.getMap(duid);
					this.getParameter(duid, "get_room_mapping");
				});
				break;

			case "app_segment_clean":
				this.adapter.log.debug("Start room cleaning");

				roomList = [];
				roomFloor = await this.adapter.getStateAsync("Devices." + duid + ".commands.load_multi_map");


				await rr_mqtt_connector.sendRequest(duid, rr, "get_room_mapping", []).then(async attribute_val => {
					for (const mappedRoom in attribute_val)
					{
						const roomState = await this.adapter.getStateAsync("Devices." + duid + ".floors." + roomFloor?.val + "." + attribute_val[mappedRoom][0]);
						if (roomState?.val == true)
						{
							roomList.push(attribute_val[mappedRoom][0]);
						}
					}
				});

				await rr_mqtt_connector.sendRequest(duid, rr, parameter, roomList).then(result => {
					this.adapter.log.debug("app_segment_clean with roomIDs: " + JSON.stringify(roomList) + " result: " + result);
				});
				break;

			case "reset_consumable":
				try{
					this.adapter.log.debug("reset_consumable : " + value);
					await rr_mqtt_connector.sendRequest(duid, rr, parameter, [value]).then(async parameter => {
						this.adapter.log.info("Consumable " + parameter + " successfully reset.");
					});
				}
				catch (e) {
					this.adapter.log.Error("Consumable reset failed: " + e);
				}
				break;

			default:
				if ((value) && (typeof(value) != "boolean")) {
					const valueType = typeof(value);
					if (valueType == "string") {
						value = await JSON.parse(value);
					}
					else if (valueType == "number") {
						value = [value];
					}
					// await is important here!!! Wait for the command to finish before sending the request to update deviceConfig!!!
					await rr_mqtt_connector.sendRequest(duid, rr, parameter, value).then(result => {
						this.adapter.log.debug("Command: " + parameter + " with value: " + JSON.stringify(value) + " result: " + result);
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

							if (attribute == "map_status") {
								attribute_val[0][attribute] = attribute_val[0][attribute] >> 2 ?? -1; // to get the currently selected map perform bitwise right shift

								this.adapter.getStateAsync("Devices." + duid + ".commands.load_multi_map").then (currentMap => {
									if (currentMap?.val != attribute_val[0][attribute]) {
										this.adapter.setStateAsync("Devices." + duid + ".commands.load_multi_map", { val: attribute_val[0][attribute], ack: true });
									}
								});
							}
							this.adapter.setStateAsync("Devices." + duid + ".deviceStatus." + attribute, { val: attribute_val[0][attribute], ack: true });
						}
						else {
							this.adapter.log.error("Unsported attribute: " + attribute + " of get_status. Please contact the dev to add the newly found attribute of your robot.");
						}
					} catch (e) {
						this.adapter.log.error("get_status error: " + e);

						if (this.adapter.supportsFeature && this.adapter.supportsFeature("PLUGINS")) {
							if (this.adapter.sentryInstance) {
								this.adapter.sentryInstance.getSentryObject().captureException("get_status error: " + e);
							}
						}
					}
				}
			});
		}
		else if (parameter == "get_room_mapping") {
			this.adapter.getStateAsync("Devices." + duid + ".commands.load_multi_map").then(roomFloor => {
				rr_mqtt_connector.sendRequest(duid, rr, "get_room_mapping", []).then(mappedRooms => {
					this.adapter.log.debug("All mapped rooms: " + JSON.stringify(mappedRooms));
					for (const mappedRoom in mappedRooms)
					{
						let roomName = "";
						for (const roomID in this.adapter.roomIDs)
						{
							if (roomID == mappedRooms[mappedRoom][1]) {
								roomName = this.adapter.roomIDs[roomID];
								this.adapter.log.debug("Mapped room matched: " + roomID + " with name: " + roomName);
							}
						}

						this.adapter.setObjectNotExistsAsync("Devices." + duid + ".floors." + roomFloor?.val + "." + mappedRooms[mappedRoom][0], {
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
				});
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
					if (typeof(attribute_val[0]) != "number") {
						this.adapter.log.error("Unknown parameter: " + JSON.stringify(attribute_val));
					}
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
		await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".map.mapBase64Truncated", {
			type: "state",
			common: {
				name: "base64 Map truncated",
				type: "string",
				read: true,
				write: false
			},
			native: {},
		});
		await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".map.mapData", {
			type: "state",
			common: {
				name: "raw Map",
				type: "object",
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
					case "clean_time":
					case "0":
						cleaningAttribute_val = Math.round(cleaningAttribute_val/60/60);
						break;

					case "clean_area":
					case "1":
						cleaningAttribute_val = Math.round(cleaningAttribute_val/1000/1000);
						break;

					case "clean_count":
					case "2":
						break;

					case "records":
					case "3":
						for (const cleaningRecord in cleaningAttributes[cleaningAttribute])
						{
							rr_mqtt_connector.sendRequest(duid, rr, "get_clean_record", [cleaningAttributes[cleaningAttribute][cleaningRecord]]).then(async cleaningRecordAttributes => {
								cleaningRecordAttributes = cleaningRecordAttributes[0];

								this.adapter.log.debug("Cleaning record: " + JSON.stringify(cleaningRecordAttributes));
								for (const cleaningRecordAttribute in cleaningRecordAttributes) {
									let cleaningRecordAttribute_val = cleaningRecordAttributes[cleaningRecordAttribute];

									switch (cleaningRecordAttribute) {
										case "begin":
										case "0":
											cleaningRecordAttribute_val = new Date(cleaningRecordAttribute_val * 1000).toString();
											break;

										case "end":
										case "1":
											cleaningRecordAttribute_val = new Date(cleaningRecordAttribute_val * 1000).toString();
											break;

										case "duration":
										case "2":
											cleaningRecordAttribute_val = Math.round(cleaningRecordAttribute_val/60);
											break;

										case "area":
										case "3":
											cleaningRecordAttribute_val = Math.round(cleaningRecordAttribute_val/1000/1000);
											break;

										case "error":
										case "4":
											break;

										case "complete":
										case "5":
											break;

										case "start_type":
										case "6":
											break;

										case "clean_type":
										case "7":
											break;

										case "finish_reason":
										case "8":
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
					this.adapter.setStateAsync("Devices." + duid + ".cleaningInfo." + cleaningAttribute, { val: cleaningAttribute_val, ack: true });
				}
			}
		});
	}
}

module.exports = {
	vacuum,
};
