"use strict";

const roborock_mqtt_connector = require("./roborock_mqtt_connector").roborock_mqtt_connector;
const RRMapParser = require("./RRMapParser");
const MapCreator = require("./mapCreator");
const fs = require("fs");
const zlib = require("zlib");

const supportedRobots = {
	"roborock.vacuum.s4": "roborock_vacuum_s4", // Roborock S4
	"roborock.vacuum.a19": "roborock_vacuum_a19", // Roborock S4 Max
	"roborock.vacuum.s5": "roborock_vacuum_s5", // Roborock S5
	"roborock.vacuum.s5e": "roborock_vacuum_s5e", // Roborock S5 Max
	"roborock.vacuum.s6": "roborock_vacuum_s6", // Roborock S6
	"roborock.vacuum.a08": "roborock_vacuum_a08", // Roborock S6 Pure
	"roborock.vacuum.a10": "roborock_vacuum_a10", // Roborock S6 MaxV
	"roborock.vacuum.a15": "roborock_vacuum_a15", // Roborock S7
	"roborock.vacuum.a27": "roborock_vacuum_a27", // Roborock S7 MaxV (Ultra)
	"roborock.vacuum.a38": "roborock_vacuum_a38", // Roborock Q7 Max
	"roborock.vacuum.a40": "roborock_vacuum_a40", // Roborock Q7
	"roborock.vacuum.a62": "roborock_vacuum_a62", // Roborock S7 Pro Ultra
	"roborock.vacuum.a65": "roborock_vacuum_a65", // Roborock S7 Max Ultra
	"roborock.vacuum.a51": "roborock_vacuum_a51", // Roborock S8
	"roborock.vacuum.a70": "roborock_vacuum_a70", // Roborock S8 Pro Ultra
	"roborock.vacuum.a75": "roborock_vacuum_a75", // Roborock Q Revo

	//'roborock.vacuum.m1s', // ??
	//'rockrobo.vacuum.v1' // ??
};

const mappedCleanSummary = {
	0: "clean_time",
	1: "clean_area",
	2: "clean_count",
	3: "records",
};

const mappedCleaningRecordAttribute = {
	0: "begin",
	1: "end",
	2: "duration",
	3: "area",
	4: "error",
	5: "complete",
	6: "start_type",
	7: "clean_type",
	8: "finish_reason",
	9: "dust_collection_status",
};

class vacuum {
	constructor(adapter, robotModel) {
		this.adapter = adapter;

		if (!supportedRobots[robotModel]) {
			this.adapter.catchError(`The model ${robotModel} is not supported. Get in touch with the dev to get this robot supported.`, "constructor", robotModel);
		} else {
			this.adapter.log.debug(`Robot key: ${robotModel}`);
		}

		this.rr_mqtt_connector = new roborock_mqtt_connector(this.adapter);

		this.extended_robot_class = require("./" + supportedRobots[robotModel]).extended_robot;
		this.extended_robot = new this.extended_robot_class(this);

		this.mapParser = new RRMapParser(this.adapter);
		this.mapCreator = new MapCreator(this.adapter);

		this.parameterFolders = {
			get_mop_mode: "deviceStatus",
			get_water_box_custom_mode: "deviceStatus",
			get_network_info: "networkInfo",
			get_consumable: "consumables",
			get_fw_features: "firmwareFeatures",
			get_carpet_mode: "deviceStatus",
			get_carpet_clean_mode: "deviceStatus",
			get_carpet_cleaning_mode: "deviceStatus",
		};

		this.setup = this.extended_robot.setup;
	}

	async getMap(duid) {
		if (this.adapter.config.enable_map_creation) {
			this.adapter.log.debug(`Update map`);

			try {
				const map = await this.rr_mqtt_connector.sendRequest(duid, "get_map_v1", [], true);
				const mappedRooms = await this.rr_mqtt_connector.sendRequest(duid, "get_room_mapping", []);

				const deviceStatus = await this.rr_mqtt_connector.sendRequest(duid, "get_status", []);
				const selectedMap = deviceStatus[0].map_status >> 2 ?? -1; // to get the currently selected map perform bitwise right shift
				this.adapter.log.debug(`bounding box debug deviceStatus: ${JSON.stringify(deviceStatus)}`);
				this.adapter.log.debug(`bounding box debug selectedMap: ${selectedMap}`);

				// This is for testing and debugging maps. This can't be stored in a state.
				fs.writeFile("./test.rrmap", map, (err) => {
					if (err) {
						this.adapter.catchError(err, "writing test.rrmap", duid);
					}
				});

				const parsedData = await this.mapParser.parsedata(map);

				const [mapBase64, mapBase64Truncated] = this.mapCreator.canvasMap(parsedData, duid, selectedMap, mappedRooms);

				await this.adapter.setStateAsync(`Devices.${duid}.map.mapData`, { val: JSON.stringify(parsedData), ack: true });
				await this.adapter.setStateAsync(`Devices.${duid}.map.mapBase64`, { val: mapBase64, ack: true });
				await this.adapter.setStateAsync(`Devices.${duid}.map.mapBase64Truncated`, { val: mapBase64Truncated, ack: true });

				// Send current map with Scale factor
				const mapToSend = {
					duid: duid,
					command: "map",
					base64: mapBase64,
					map: parsedData,
					scale: this.adapter.config.map_scale,
				};

				if (this.adapter.socket != null) {
					this.adapter.socket.send(JSON.stringify(mapToSend));
				}
			} catch (error) {
				this.adapter.catchError(error, "get_map_v1", duid);
			}
		}
	}

	async getCleaningRecordMap(duid, startTime) {
		try {
			const cleaningRecordMap = await this.rr_mqtt_connector.sendRequest(duid, "get_clean_record_map", { start_time: startTime }, true);
			const parsedData = await this.mapParser.parsedata(cleaningRecordMap);
			const [mapBase64, mapBase64Truncated] = this.mapCreator.canvasMap(parsedData, duid);

			return {
				mapBase64: mapBase64,
				mapBase64Truncated: mapBase64Truncated,
				mapData: JSON.stringify(parsedData),
			};
		} catch (error) {
			this.adapter.catchError(error, "get_clean_record_map", duid);

			return null;
		}
	}

	async command(duid, parameter, value) {
		try {
			switch (parameter) {
				case "load_multi_map": {
					const result = await this.rr_mqtt_connector.sendRequest(duid, "load_multi_map", value);

					if (result[0] == "ok") {
						await this.getMap(duid).then(() => {
							this.getParameter(duid, "get_room_mapping");
						});
					}

					break;
				}
				case "app_segment_clean": {
					this.adapter.log.debug("Start room cleaning");

					const roomList = {};
					roomList.segments = [];
					const roomFloor = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.map_status`);
					const mappedRoomList = await this.rr_mqtt_connector.sendRequest(duid, "get_room_mapping", []);

					if (mappedRoomList) {
						for (const mappedRoom in mappedRoomList) {
							const roomState = await this.adapter.getStateAsync(`Devices.${duid}.floors.${roomFloor.val}.${mappedRoomList[mappedRoom][0]}`);

							if (roomState.val) {
								roomList.segments.push(mappedRoomList[mappedRoom][0]);
							}
						}
					}

					const cleanCount = await this.adapter.getStateAsync(`Devices.${duid}.floors.cleanCount`);
					roomList["repeat"] = cleanCount.val;

					const result = await this.rr_mqtt_connector.sendRequest(duid, "app_segment_clean", [roomList]);
					this.adapter.log.debug(`app_segment_clean with roomIDs: ${JSON.stringify(roomList)} result: ${result}`);
					this.adapter.setStateAsync(`Devices.${duid}.floors.cleanCount`, { val: 1, ack: true });

					break;
				}
				case "reset_consumable":
					await this.rr_mqtt_connector.sendRequest(duid, parameter, [value]);
					this.adapter.log.info(`Consumable ${parameter} successfully reset.`);

					break;

				case "app_set_dryer_status": {
					const result = await this.rr_mqtt_connector.sendRequest(duid, parameter);
					this.adapter.log.debug(`Command: ${parameter} result: ${result}`);

					break;
				}
				case "app_goto_target":
				case "app_zoned_clean": {
					const result = await this.rr_mqtt_connector.sendRequest(duid, parameter, value);
					this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(value)} result: ${result}`);

					break;
				}
				default:
					if (value && typeof value !== "boolean") {
						const valueType = typeof value;

						if (valueType === "string") {
							value = await JSON.parse(value);
						} else if (valueType === "number") {
							value = [value];
						}

						// await is important here!!! Wait for the command to finish before sending the request to update deviceConfig!!!
						const result = await this.rr_mqtt_connector.sendRequest(duid, parameter, value);
						this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(value)} result: ${result}`);

						// this is needed to update the states instantly after sending a command
						const getCommand = parameter.replace("set", "get");
						this.getParameter(duid, getCommand);
					} else {
						const result = await this.rr_mqtt_connector.sendRequest(duid, parameter);
						this.adapter.log.debug(`Command: ${parameter} result: ${result}`);
					}
			}
		} catch (error) {
			this.adapter.catchError(error, parameter, duid);
		}
	}

	async getParameter(duid, parameter, attribute) {
		this.adapter.log.debug(`getParameter for ${duid}: ${parameter}`);
		const targetFolder = this.parameterFolders[parameter];
		let mode;

		try {
			if (targetFolder == "networkInfo") {
				mode = parameter;
				const networkInfo = await this.rr_mqtt_connector.sendRequest(duid, parameter, []);

				for (const attribute in networkInfo) {
					this.adapter.setStateAsync(`Devices.${duid}.${targetFolder}.${attribute}`, { val: networkInfo[attribute], ack: true });
				}
			} else if (targetFolder == "consumables") {
				const consumables = (await this.rr_mqtt_connector.sendRequest(duid, "get_consumable", []))[0];
				this.adapter.log.debug(`Consumables of robot: ${JSON.stringify(consumables)}`);

				for (const consumable in consumables) {
					const divider = this.setup.consumables[consumable]?.divider;
					const consumable_val = divider ? Math.round(consumables[consumable] / divider) : consumables[consumable];

					this.adapter.setStateAsync(`Devices.${duid}.consumables.${consumable}`, { val: consumable_val, ack: true });
				}
			} else if (parameter == "get_status") {
				const deviceStatus = await this.rr_mqtt_connector.sendRequest(duid, "get_status", []);

				this.adapter.log.debug(`get_status: ${JSON.stringify(deviceStatus[0])}`);

				for (const attribute in deviceStatus[0]) {
					if (!this.setup.deviceStatus[attribute]) {
						this.adapter.catchError(
							`Unsupported attribute: ${attribute} of get_status with value ${deviceStatus[0][attribute]}. Please contact the dev to add the newly found attribute of your robot.`,
							"get_status",
							duid
						);

						continue;
					}

					if (this.setup.deviceStatus[attribute]?.divider) {
						deviceStatus[0][attribute] = Math.round(deviceStatus[0][attribute] / this.setup.deviceStatus[attribute].divider);
					}

					if (typeof deviceStatus[0][attribute] == "object") {
						deviceStatus[0][attribute] = JSON.stringify(deviceStatus[0][attribute]);
					}

					switch (attribute) {
						case "map_status":
							deviceStatus[0][attribute] = deviceStatus[0][attribute] >> 2 ?? -1; // to get the currently selected map perform bitwise right shift

							if (this.adapter.isCleaning(deviceStatus[0]["state"])) {
								this.adapter.startMapUpdater(duid);
							} else {
								const maxMaps = await this.adapter.getStateAsync(`Devices.${duid}.floors.max_multi_map`);

								// don't process load_multi_map for single level configuration
								if (maxMaps.val > 1) {
									const mapFromCommand = await this.adapter.getState(`Devices.${duid}.commands.load_multi_map`);
									if (mapFromCommand && mapFromCommand.val != deviceStatus[0][attribute]) {
										// this check is needed so load_multi_map only executes when the map actually changed
										this.command(duid, "load_multi_map", [deviceStatus[0][attribute]]); // this also updates mapBase64 etc
									}
								}
							}

							break;

						case "last_clean_t":
							deviceStatus[0][attribute] = new Date(deviceStatus[0][attribute]).toString();

							break;
					}
					this.adapter.setStateAsync(`Devices.${duid}.deviceStatus.${attribute}`, { val: deviceStatus[0][attribute], ack: true });
				}
				this.adapter.manageDeviceIntervals(duid);
			} else if (parameter == "get_room_mapping") {
				const deviceStatus = await this.rr_mqtt_connector.sendRequest(duid, "get_status", []);
				const roomFloor = deviceStatus[0]["map_status"] >> 2 ?? -1; // to get the currently selected map perform bitwise right shift
				const mappedRooms = await this.rr_mqtt_connector.sendRequest(duid, "get_room_mapping", []);


				this.adapter.log.debug(`All mapped rooms: ${JSON.stringify(mappedRooms)}`);
				// if no rooms have been named, processing them can't work
				if (mappedRooms.length < 1) {
					this.adapter.log.warn(`Failed to map rooms. You need to name your rooms via the mobile app on your phone.`);
				} else {
					for (const mappedRoom of mappedRooms) {
						const roomID = mappedRoom[1];
						const roomName = this.adapter.roomIDs[roomID];

						if (roomName) {
							this.adapter.log.debug(`Mapped room matched: ${roomID} with name: ${roomName}`);
							const objectString = `Devices.${duid}.floors.${roomFloor}.${mappedRoom[0]}`;
							this.adapter.createStateObjectHelper(objectString, roomName, "boolean", null, true, "value", true, true);

						}
					}
				}

				const objectString = `Devices.${duid}.floors.cleanCount`;
				this.adapter.createStateObjectHelper(objectString, "Clean count", "number", null, 1, "value", true, true);
			} else if (parameter == "get_multi_maps_list") {
				const mapList = await this.rr_mqtt_connector.sendRequest(duid, "get_multi_maps_list", []);
				const mapInfo = mapList[0]["map_info"];
				const maps = {};

				// Set states for numeric parameters
				for (const mapParameter in mapList[0]) {
					if (typeof mapList[0][mapParameter] === "number") {
						const statePath = `Devices.${duid}.floors.${mapParameter}`;
						this.adapter.setStateAsync(statePath, { val: mapList[0][mapParameter], ack: true });
					}
				}

				// Create map folders
				for (const map in mapInfo) {
					const roomFloor = mapInfo[map]["mapFlag"];
					const mapName = mapInfo[map]["name"];
					maps[roomFloor] = mapName;

					const objectPath = `Devices.${duid}.floors.${roomFloor}`;
					this.adapter.setObjectAsync(objectPath, {
						type: "folder",
						common: {
							name: mapName,
						},
						native: {},
					});
				}

				// Handle the load_multi_map command
				const commandPath = `Devices.${duid}.commands.load_multi_map`;
				if (mapList[0]["max_multi_map"] > 1) {
					this.adapter.createStateObjectHelper(commandPath, "Load map", "number", null, 0, "value", true, true, maps);
				} else {
					this.adapter.delObjectAsync(commandPath);
				}
			} else if (parameter == "get_fw_features") {
				this.adapter.log.debug(`Firmware features request`);
				const firmwareFeatures = await this.rr_mqtt_connector.sendRequest(duid, parameter, []);
				for (const firmwareFeature in firmwareFeatures) {
					const featureID = firmwareFeatures[firmwareFeature];

					const objectString = `Devices.${duid}.firmwareFeatures.${firmwareFeature}`;
					await this.adapter.createStateObjectHelper(objectString, featureID.toString(), "string", null, null, "value", true, false);

					this.adapter.setStateAsync(objectString, { val: this.setup.firmwareFeatures[featureID].toString(), ack: true });
				}
			} else if (parameter == "get_server_timer") {
				const serverTimers = this.rr_mqtt_connector.sendRequest(duid, parameter, []);
				this.adapter.log.debug(`get_server_timer: " + ${JSON.stringify(serverTimers)}`);
				// if (typeof(attribute_val[0]) == "object") {
				// attribute_val[0] = JSON.stringify(attribute_val[0]);
				// }
				// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
			} else if (parameter == "get_timer") {
				const timers = this.rr_mqtt_connector.sendRequest(duid, parameter, []);
				this.adapter.log.debug(`get_timer: "${JSON.stringify(timers)}`);
				// if (typeof(attribute_val[0]) == "object") {
				// attribute_val[0] = JSON.stringify(attribute_val[0]);
				// }
				// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
			} else if (parameter == "get_photo") {
				const photoresponse = await this.rr_mqtt_connector.sendRequest(
					duid,
					"get_photo",
					{
						data_filter: {
							img_id: attribute,
							type: 1, // don't know what this is for. When i sniffed traffic this was 0. However when it's 0 not every request get's a response.
						},
					},
					true,
					true
				);

				if (this.isGZIP(photoresponse)) {
					this.adapter.log.debug(`gzipped photo found.`);
					const gzipPhoto = photoresponse.slice(56);

					this.unzipBuffer(gzipPhoto, (error, jfifData) => {
						if (error) {
							this.adapter.catchError(error, "get_photo", duid);

							if (this.adapter.supportsFeature && this.adapter.supportsFeature("PLUGINS")) {
								if (this.adapter.sentryInstance) {
									this.adapter.sentryInstance.getSentryObject().captureException(`Failed to create canvas: ${JSON.stringify(error)}`);
								}
							}
						} else {
							if (this.isJFIF(jfifData)) {
								this.adapter.log.debug(`jfif photo found.`);

								const photo = {};
								photo.duid = duid;
								photo.command = "get_photo";
								photo.image = `data:image/jpeg;base64,${jfifData.slice(20).toString("base64")}`;

								if (this.adapter.socket) {
									this.adapter.socket.send(JSON.stringify(photo));
								}
							}
						}
					});
				}
			} else if (this.parameterFolders[parameter]) {
				mode = parameter.substring(4);
				const attribute_val = await this.rr_mqtt_connector.sendRequest(duid, parameter, []);

				if (typeof attribute_val[0] == "object") {
					attribute_val[0] = JSON.stringify(attribute_val[0]);
				}
				this.adapter.setStateAsync(`Devices.${duid}.${targetFolder}.${mode}`, { val: attribute_val[0], ack: true });
			} else {
				// unknown parameter
				const unknown_parameter_val = await this.rr_mqtt_connector.sendRequest(duid, parameter, []);

				// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
				if (typeof unknown_parameter_val == "object") {
					if (typeof unknown_parameter_val[0] != "number") {
						this.adapter.catchError(`Unknown parameter: ${JSON.stringify(unknown_parameter_val)}`, parameter, duid);
					}
				} else {
					this.adapter.catchError(`Unknown parameter: ${unknown_parameter_val}`, parameter, duid);
				}
			}
		} catch (error) {
			this.adapter.catchError(error, parameter, duid);
		}
	}

	async setUpObjects(duid) {
		await this.adapter.setObjectAsync("Devices." + duid, {
			type: "device",
			common: {
				name: this.adapter.vacuums[duid].name,
				statusStates: {
					onlineId: `${this.adapter.name}.${this.adapter.instance}.Devices.${duid}.deviceInfo.online`,
				},
			},
			native: {},
		});

		for (const setupAttribute in this.setup) {
			if (setupAttribute != "firmwareFeatures") {
				for (const command in this.setup[setupAttribute]) {
					const object = this.setup[setupAttribute][command];

					// special case so cleaning records are processed below
					if (setupAttribute != "cleaningRecords") {
						const objectString = `Devices.${duid}.${setupAttribute}.${command}`;
						await this.adapter.createStateObjectHelper(objectString, object.name, object.type, object.unit, object.def, "value", true, object.write, object.states);
					} else {
						for (let i = 0; i < 20; i++) {
							await this.adapter.setObjectAsync(`Devices.${duid}.cleaningInfo.Records.${i}`, {
								type: "folder",
								common: {
									name: `Cleaning record ${i}`,
								},
								native: {},
							});
							for (const record in this.setup["cleaningRecords"]) {
								const object = this.setup["cleaningRecords"][record];

								const objectString = `Devices.${duid}.cleaningInfo.Records.${i}.${record}`;
								await this.adapter.createStateObjectHelper(objectString, object.name, object.type, object.unit, null, "value", true, object.write);

								await this.adapter.setObjectAsync(`Devices.${duid}.cleaningInfo.Records.${i}.map`, {
									type: "folder",
									common: {
										name: "Map",
									},
									native: {},
								});
								for (const name of ["mapBase64", "mapBase64Truncated", "mapData"]) {
									const objectString = `Devices.${duid}.cleaningInfo.Records.${i}.map.${name}`;
									await this.adapter.createStateObjectHelper(objectString, name, "string", null, null, "value", true, false);
								}
							}
						}
					}
				}
			}
		}
	}

	async getCleanSummary(duid) {
		try {
			const cleaningAttributes = await this.rr_mqtt_connector.sendRequest(duid, "get_clean_summary", []);

			for (const cleaningAttribute in cleaningAttributes) {
				const mappedAttribute = mappedCleanSummary[cleaningAttribute] || cleaningAttribute;

				if (["clean_time", "clean_area", "clean_count"].includes(mappedAttribute)) {
					await this.adapter.setStateAsync(`Devices.${duid}.cleaningInfo.${cleaningAttribute}`, {
						val: this.calculateCleaningValue(mappedAttribute, cleaningAttributes[cleaningAttribute]),
						ack: true,
					});
				} else if (mappedAttribute == "records") {
					const cleaningRecordsJSON = [];

					for (const cleaningRecord in cleaningAttributes[cleaningAttribute]) {
						const cleaningRecordID = cleaningAttributes[cleaningAttribute][cleaningRecord];
						const cleaningRecordAttributes = (await this.rr_mqtt_connector.sendRequest(duid, "get_clean_record", [cleaningRecordID]))[0];

						cleaningRecordsJSON[cleaningRecord] = cleaningRecordAttributes;

						for (const cleaningRecordAttribute in cleaningRecordAttributes) {
							const mappedRecordAttribute = mappedCleaningRecordAttribute[cleaningRecordAttribute] || cleaningRecordAttribute;
							await this.adapter.setStateAsync(`Devices.${duid}.cleaningInfo.Records.${cleaningRecord}.${cleaningRecordAttribute}`, {
								val: this.calculateRecordValue(mappedRecordAttribute, cleaningRecordAttributes[cleaningRecordAttribute]),
								ack: true,
							});
						}

						if (this.adapter.config.enable_map_creation == true) {
							const mapArray = await this.getCleaningRecordMap(duid, cleaningAttributes[cleaningAttribute][cleaningRecord]);
							for (const mapType in mapArray) {
								const val = mapArray[mapType];
								this.adapter.setStateAsync(`Devices.${duid}.cleaningInfo.Records.${cleaningRecord}.map.${mapType}`, { val: val, ack: true });
							}
						}
					}

					const objectString = `Devices.${duid}.cleaningInfo.JSON`;
					await this.adapter.createStateObjectHelper(objectString, "cleaningInfoJSON", "string", null, null, "json", true, false);
					this.adapter.setStateAsync(`Devices.${duid}.cleaningInfo.JSON`, { val: JSON.stringify(cleaningRecordsJSON), ack: true });
				}
			}
		} catch (error) {
			this.adapter.catchError(error, "get_clean_summary", duid);
		}
	}

	getCameraStreams(duid) {
		if (this.setup.camera) {
			for (const stream_type in this.setup.camera) {
				switch (stream_type) {
					case "stream_html":
						this.adapter.setStateAsync("Devices." + duid + ".camera." + stream_type, {
							val: `http://${this.adapter.config.hostname_ip}:1984/${stream_type.replace(/_/g, ".")}?src=${duid}`,
							ack: true,
						});
						break;
					case "webrtc_html":
						this.adapter.setStateAsync("Devices." + duid + ".camera." + stream_type, {
							val: `http://${this.adapter.config.hostname_ip}:1984/${stream_type.replace(/_/g, ".")}?src=${duid}&media=video`,
							ack: true,
						});
						break;
					case "stream_mp4":
						this.adapter.setStateAsync("Devices." + duid + ".camera." + stream_type, {
							val: `http://${this.adapter.config.hostname_ip}:1984/api/${stream_type.replace(/_/g, ".")}?src=${duid}`,
							ack: true,
						});
						break;
					case "rtsp":
						this.adapter.setStateAsync("Devices." + duid + ".camera." + stream_type, {
							val: `rtsp://${this.adapter.config.hostname_ip}:8554/${duid}?video`,
							ack: true,
						});
				}
			}
		}
	}

	calculateCleaningValue(attribute, value) {
		switch (attribute) {
			case "clean_time":
				return Math.round(value / 60 / 60);
			case "clean_area":
				return Math.round(value / 1000 / 1000);
			default:
				return value;
		}
	}

	calculateRecordValue(attribute, value) {
		switch (attribute) {
			case "begin":
			case "end":
				return new Date(value * 1000).toString();
			case "duration":
				return Math.round(value / 60);
			case "area":
				return Math.round(value / 1000 / 1000);
			default:
				return value;
		}
	}

	unzipBuffer(buffer, callback) {
		zlib.gunzip(buffer, function (err, result) {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	}

	isGZIP(buffer) {
		if (buffer.length < 2) {
			return false;
		}

		if (buffer[56] == 31 && buffer[57] == 139) {
			return true;
		}

		return false;
	}
	isJFIF(buffer) {
		// Verify that the buffer is long enough to hold the header
		if (buffer.length < 10) {
			return false;
		}

		// Check the signature
		if (buffer[26] == 74 && buffer[27] == 70 && buffer[28] == 73 && buffer[29] == 70) {
			return true;
		}

		return false;
	}
}

module.exports = {
	vacuum,
};
