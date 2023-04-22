"use strict";

const roborock_mqtt_connector = require("./roborock_mqtt_connector").roborock_mqtt_connector;
const RRMapParser = require("./RRMapParser");
const MapCreator = require("./mapCreator");
const fs = require("fs");

let roomList;

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
	"roborock.vacuum.a62": "roborock_vacuum_a62", // Roborock S7 Pro Ultra
	"roborock.vacuum.a51": "roborock_vacuum_a51" // Roborock S8


	//'roborock.vacuum.m1s', // ??
	//'rockrobo.vacuum.v1' // ??
};



class vacuum {
	constructor(adapter, robotModel) {
		this.adapter = adapter;

		if (!supportedRobots[robotModel]) {
			this.adapter.log.error("The model " + robotModel + " is not supported. Get in touch with the dev to get this robot supported.");
		}
		else {
			this.adapter.log.debug("Robot key: " + robotModel);
		}

		this.rr_mqtt_connector = new roborock_mqtt_connector(this.adapter);

		this.extended_robot_class = require("./" + supportedRobots[robotModel]).extended_robot;
		this.extended_robot = new this.extended_robot_class(this);

		this.mapParser = new RRMapParser(this.adapter);
		this.mapCreator = new MapCreator(this.adapter);


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
			this.rr_mqtt_connector.sendRequest(duid, "get_map_v1", [], true).then(map => {

				// This is for testing and debugging maps. This can't be stored in a state.
				fs.writeFile("./test.rrmap", map, err => {
					if (err) {
						console.error(err);
					}
				});

				this.mapParser.parsedata(map).then(parsedData => {
					try {
						const [mapBase64, mapBase64Truncated] = this.mapCreator.canvasMap(parsedData);

						this.adapter.setStateAsync("Devices." + duid + ".map.mapData", { val: JSON.stringify(parsedData), ack: true });
						this.adapter.setStateAsync("Devices." + duid + ".map.mapBase64", { val: mapBase64, ack: true });
						this.adapter.setStateAsync("Devices." + duid + ".map.mapBase64Truncated", { val: mapBase64Truncated, ack: true });

						// Send current map with Scale factor
						const mapToSend = {};
						mapToSend.duid = duid;
						mapToSend.command = "map";
						mapToSend.base64 = mapBase64;
						mapToSend.map = parsedData;
						mapToSend.scale = this.adapter.config.map_scale;

						if (this.adapter.socket != null)
						{
							this.adapter.socket.send(JSON.stringify(mapToSend));
						}
					} catch(error) {
						switch (error.toString()) {
							case "locating":
								this.adapter.log.info("Could not get map. Robot is currently: " + error);
								break;

							case "retry":
								this.adapter.log.info("Roborock rejected the request for a new map. - " + error);
								break;

							default:
								this.adapter.log.error("Failed to create canvas: " + JSON.stringify(error));

								if (this.adapter.supportsFeature && this.adapter.supportsFeature("PLUGINS")) {
									if (this.adapter.sentryInstance) {
										this.adapter.sentryInstance.getSentryObject().captureException("Failed to create canvas: " + JSON.stringify(error));
									}
								}
						}
					}
				}).catch(error => {
					this.adapter.log.error("Failed to get parsedData. The error was: " + error);

					if (this.adapter.supportsFeature && this.adapter.supportsFeature("PLUGINS")) {
						if (this.adapter.sentryInstance) {
							this.adapter.sentryInstance.getSentryObject().captureException("Failed to get parsedData. The error was: " + error);
						}
					}
				});
			}).catch(error => {
				this.adapter.log.error("Failed to create map. The error was: " + error);

				if (this.adapter.supportsFeature && this.adapter.supportsFeature("PLUGINS")) {
					if (this.adapter.sentryInstance) {
						this.adapter.sentryInstance.getSentryObject().captureException("Failed to create map. The error was: " + error);
					}
				}
			});
		}
	}

	async command(duid, parameter, value) {
		switch (parameter) {
			case "load_multi_map":
				this.rr_mqtt_connector.sendRequest(duid, "load_multi_map", value).then(async (result) => {
					if (result[0] == "ok") {
						// this needs be called after sendRequest so map and room mapping is updated even when load_multi_map fails (e.g. when robot is currently running)
						await this.getMap(duid).then(() => {
							this.getParameter(duid, "get_room_mapping");
						});
					}
				}).catch(error => {
					this.adapter.log.error("Failed to execute load_multi_map. Error: " + error);
				});
				break;

			case "app_segment_clean":
				this.adapter.log.debug("Start room cleaning");

				roomList = {};
				roomList["segments"] = [];
				await this.adapter.getStateAsync("Devices." + duid + ".deviceStatus.map_status").then(async roomFloor => {
					await this.rr_mqtt_connector.sendRequest(duid, "get_room_mapping", []).then(async mappedRoomList => {
						for (const mappedRoom in mappedRoomList)
						{
							await this.adapter.getStateAsync("Devices." + duid + ".floors." + roomFloor.val + "." + mappedRoomList[mappedRoom][0]).then(roomState => {
								if (roomState.val == true) {
									roomList["segments"].push(mappedRoomList[mappedRoom][0]);
								}
							});
						}
						await this.adapter.getStateAsync("Devices." + duid + ".floors.cleanCount").then(cleanCount => {
							roomList["repeat"] = cleanCount.val;

							this.rr_mqtt_connector.sendRequest(duid, parameter, [roomList]).then(result => {
								this.adapter.log.debug("app_segment_clean with roomIDs: " + JSON.stringify(roomList) + " result: " + result);
								this.adapter.setStateAsync("Devices." + duid + ".floors.cleanCount", { val: 1, ack: true });
							}).catch(error => {
								this.adapter.log.error("Failed to execute app_segment_clean. Error: " + error);
							});
						});
					}).catch(error => {
						this.adapter.log.error("Failed to execute get_room_mapping. Error: " + error);
					});
				});
				break;

			case "reset_consumable":
				try{
					this.adapter.log.debug("reset_consumable : " + value);
					await this.rr_mqtt_connector.sendRequest(duid, parameter, [value]).then(async parameter => {
						this.adapter.log.info("Consumable " + parameter + " successfully reset.");
					}).catch(error => {
						this.adapter.log.error("Failed to execute reset_consumable. Error: " + error);
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
					await this.rr_mqtt_connector.sendRequest(duid, parameter, value).then(result => {
						this.adapter.log.debug("Command: " + parameter + " with value: " + JSON.stringify(value) + " result: " + result);
					}).catch(error => {
						this.adapter.log.error("Failed to execute " + parameter + ". Error: " + error);
					});

					const getCommand = parameter.replace("set", "get");
					this.getParameter(duid, getCommand);
				}
				else {
					await this.rr_mqtt_connector.sendRequest(duid, parameter, ).then(result => {
						this.adapter.log.debug("Command: " + parameter + " result: " + result);
					}).catch(error => {
						this.adapter.log.error("Failed to execute " + parameter + ". Error: " + error);
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
			this.rr_mqtt_connector.sendRequest(duid, parameter, []).then(networkInfo => {
				for (const attribute in networkInfo)
				{
					this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + attribute, { val: networkInfo[attribute], ack: true });
				}
			}).catch(error => {
				this.adapter.log.error("Failed to execute " + parameter + ". Error: " + error);
			});
		}
		else if (targetFolder == "consumables") {
			await this.rr_mqtt_connector.sendRequest(duid, "get_consumable", []).then(async consumables => {
				consumables = consumables[0];
				for (const consumable in consumables) {
					let consumable_val;
					if (this.setup.consumables[consumable].divider) {
						consumable_val = Math.round(consumables[consumable] / this.setup.consumables[consumable].divider);
					}
					else {
						consumable_val = consumables[consumable];
					}
					this.adapter.setStateAsync("Devices." + duid + ".consumables." + consumable, { val: consumable_val, ack: true });
				}
			}).catch(error => {
				this.adapter.log.error("Failed to execute get_consumable. Error: " + error);
			});
		}
		else if (parameter == "get_status") {
			this.rr_mqtt_connector.sendRequest(duid, "get_status", []).then(deviceStatus => {
				this.adapter.log.debug("get_status: " + JSON.stringify(deviceStatus[0]));
				for (const attribute in deviceStatus[0])
				{
					try {
						if (this.setup.deviceStatus[attribute]) {
							if (typeof(this.setup.deviceStatus[attribute].divider) != "undefined") {
								deviceStatus[0][attribute] = Math.round(deviceStatus[0][attribute] / this.setup.deviceStatus[attribute].divider);
							}
							if (typeof(deviceStatus[0][attribute]) == "object") {
								deviceStatus[0][attribute] = JSON.stringify(deviceStatus[0][attribute]);
							}

							if (attribute == "map_status") {
								deviceStatus[0][attribute] = deviceStatus[0][attribute] >> 2 ?? -1; // to get the currently selected map perform bitwise right shift

								if (this.adapter.isCleaning(deviceStatus[0]["state"])) {
									this.adapter.startMapUpdater(duid);
								}
								else
								{
									const mapFromCommand = this.adapter.getState("Devices." + duid + ".commands.load_multi_map");
									if (mapFromCommand && mapFromCommand.val != deviceStatus[0][attribute]) {
										this.command(duid, "load_multi_map", [deviceStatus[0][attribute]]); // this also updates mapBase64 etc
									}
								}
							}
							this.adapter.setStateAsync("Devices." + duid + ".deviceStatus." + attribute, { val: deviceStatus[0][attribute], ack: true });
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
			}).catch(error => {
				this.adapter.log.error("Failed to execute get_status. Error: " + error);
			});
		}
		else if (parameter == "get_room_mapping") {
			this.adapter.getStateAsync("Devices." + duid + ".deviceStatus.map_status").then(async roomFloor => {
				this.rr_mqtt_connector.sendRequest(duid, "get_room_mapping", []).then(mappedRooms => {
					this.adapter.log.debug("All mapped rooms: " + JSON.stringify(mappedRooms));
					for (const mappedRoom in mappedRooms)
					{
						let roomName = "";
						for (const roomID in this.adapter.roomIDs)
						{
							if (roomID == mappedRooms[mappedRoom][1]) {
								roomName = this.adapter.roomIDs[roomID];
								this.adapter.log.debug("Mapped room matched: " + roomID + " with name: " + roomName);

								this.adapter.setObjectAsync("Devices." + duid + ".floors." + roomFloor.val + "." + mappedRooms[mappedRoom][0], {
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

						this.adapter.setObjectAsync("Devices." + duid + ".floors.cleanCount", {
							type: "state",
							common: {
								name: "Clean count",
								type: "number",
								def: 1,
								role: "value",
								read: true,
								write: true,
							},
							native: {},
						});
					}
				}).catch(error => {
					this.adapter.log.error("Failed to execute get_room_mapping. Error: " + error);
				});
			});
		}
		else if (parameter == "get_multi_maps_list") {
			this.rr_mqtt_connector.sendRequest(duid, "get_multi_maps_list", []).then(mapList => {
				const mapInfo = mapList[0]["map_info"];
				const maps = {};

				for (const map in mapInfo)
				{
					const roomFloor = mapList[0]["map_info"][map]["mapFlag"];
					const mapName = mapList[0]["map_info"][map]["name"];

					maps[roomFloor] = mapName;

					this.adapter.setObjectAsync("Devices." + duid + ".floors." + roomFloor, {
						type: "folder",
						common: {
							name: mapName,
						},
						native: {},
					});
				}
				this.adapter.setObjectAsync("Devices." + duid + ".commands.load_multi_map", {
					type: "state",
					common: {
						name: "Load map",
						type: "number",
						role: "value",
						def: 0,
						read: true,
						write: true,
						states: maps
					},
					native: {},
				});
			}).catch(error => {
				this.adapter.log.error("Failed to execute get_multi_map_list. Error: " + error);
			});
		}
		else if (parameter == "get_fw_features") {
			this.adapter.log.debug("Firmware features request");
			this.rr_mqtt_connector.sendRequest(duid, parameter, []).then(async firmwareFeatures => {
				for (const firmwareFeature in firmwareFeatures) {
					const featureID = firmwareFeatures[firmwareFeature];
					await this.adapter.setObjectAsync("Devices." + duid + ".firmwareFeatures." + firmwareFeature, {
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
			}).catch(error => {
				this.adapter.log.error("Failed to execute get_fw_features. Error: " + error);
			});
		}
		else if (typeof(this.parameterFolders[parameter]) != "undefined")
		{
			mode = parameter.substring(4);
			this.rr_mqtt_connector.sendRequest(duid, parameter, []).then(attribute_val => {
				if (typeof(attribute_val[0]) == "object") {
					attribute_val[0] = JSON.stringify(attribute_val[0]);
				}
				this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
			}).catch(error => {
				this.adapter.log.error("Failed to execute " + parameter + ". Error: " + error);
			});
		}
		else {
			// unknown parameter
			this.rr_mqtt_connector.sendRequest(duid, parameter, []).then(unknown_parameter_val => {
				// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
				if (typeof(unknown_parameter_val) == "object") {
					if (typeof(unknown_parameter_val[0]) != "number") {
						this.adapter.log.error("Unknown parameter: " + JSON.stringify(unknown_parameter_val));
					}
				}
				else {
					this.adapter.log.error("Unknown parameter: " + unknown_parameter_val);
				}
			}).catch(error => {
				this.adapter.log.error("Failed to execute " + parameter + ". Error: " + error);
			});
		}
	}

	async setUpObjects(duid)
	{
		await this.adapter.setObjectAsync("Devices." + duid, {
			type: "device",
			common: {
				name: "Robot with id: " + duid,
				statusStates: {
					onlineId: `${this.adapter.name}.${this.adapter.instance}.Devices.${duid}.deviceInfo.online`,
				},
			},
			native: {},
		});

		for (const setupAttribute in this.setup) {
			if (setupAttribute == "floor") {
				// create floors
				await this.adapter.setObjectAsync("Devices." + duid + ".floors", {
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
					await this.adapter.setObjectAsync("Devices." + duid + "."+ setupAttribute + "." + command, {
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
					await this.adapter.setObjectAsync("Devices." + duid + ".cleaningInfo.Records." + i, {
						type: "folder",
						common: {
							name: "Cleaning record " + i
						},
						native: {},
					});
					for (const record in this.setup["cleaningRecords"]) {
						const object = this.setup["cleaningRecords"][record];
						await this.adapter.setObjectAsync("Devices." + duid + ".cleaningInfo.Records." + i + "." + record, {
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


		await this.adapter.setObjectAsync("Devices." + duid + ".map.mapBase64", {
			type: "state",
			common: {
				name: "base64 Map",
				type: "string",
				role: "value",
				read: true,
				write: false
			},
			native: {},
		});
		await this.adapter.setObjectAsync("Devices." + duid + ".map.mapBase64Truncated", {
			type: "state",
			common: {
				name: "base64 Map truncated",
				type: "string",
				role: "value",
				read: true,
				write: false
			},
			native: {},
		});
		await this.adapter.setObjectAsync("Devices." + duid + ".map.mapData", {
			type: "state",
			common: {
				name: "raw Map",
				type: "object",
				role: "value",
				read: true,
				write: false
			},
			native: {},
		});
	}

	async getCleanSummary(duid) {
		this.rr_mqtt_connector.sendRequest(duid, "get_clean_summary", []).then(async cleaningAttributes => {
			for (const cleaningAttribute in cleaningAttributes)
			{
				let cleaningAttribute_val = cleaningAttributes[cleaningAttribute];
				const cleaningRecordsJSON = [];

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
							await this.rr_mqtt_connector.sendRequest(duid, "get_clean_record", [cleaningAttributes[cleaningAttribute][cleaningRecord]]).then(async cleaningRecordAttributes => {
								cleaningRecordAttributes = cleaningRecordAttributes[0];

								cleaningRecordsJSON[cleaningRecord] = cleaningRecordAttributes;

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
							}).catch(error => {
								this.adapter.log.error("Failed to execute get_clean_record. Error: " + error);
							});
						}

						await this.adapter.setObjectAsync("Devices." + duid + ".cleaningInfo.JSON", {
							type: "state",
							common: {
								name: "cleaningInfoJSON",
								type: "string",
								role: "json",
								read: true,
								write: false,
							},
							native: {},
						});
						this.adapter.setStateAsync("Devices." + duid + ".cleaningInfo.JSON", { val: JSON.stringify(cleaningRecordsJSON), ack: true });
						break;
					default:
				}
				if ((cleaningAttribute != "records") && (cleaningAttribute != "3")) {
					this.adapter.setStateAsync("Devices." + duid + ".cleaningInfo." + cleaningAttribute, { val: cleaningAttribute_val, ack: true });
				}
			}
		}).catch(error => {
			this.adapter.log.error("Failed to execute get_clean_summary. Error: " + error);
		});
	}

	getCameraStreams(duid)
	{
		if (this.setup.camera) {
			for(const stream_type in this.setup.camera) {
				switch (stream_type)
				{
					case "stream_html":
						this.adapter.setStateAsync("Devices." + duid + ".camera." + stream_type, { val: "http://" + this.adapter.config.hostname_ip + ":1984/" + stream_type.replace(/_/g, ".") + "?src=" + duid, ack: true});
						break;
					case "webrtc_html":
						this.adapter.setStateAsync("Devices." + duid + ".camera." + stream_type, { val: "http://" + this.adapter.config.hostname_ip + ":1984/" + stream_type.replace(/_/g, ".") + "?src=" + duid + "&media=video", ack: true});
						break;
					case "stream_mp4":
						this.adapter.setStateAsync("Devices." + duid + ".camera." + stream_type, { val: "http://" + this.adapter.config.hostname_ip + ":1984/api/" + stream_type.replace(/_/g, ".") + "?src=" + duid, ack: true});
						break;
					case "rtsp":
						this.adapter.setStateAsync("Devices." + duid + ".camera." + stream_type, { val: "rtsp://" + this.adapter.config.hostname_ip + ":8554/" + duid + "?video", ack: true});
				}
			}
		}
	}
}

module.exports = {
	vacuum,
};
