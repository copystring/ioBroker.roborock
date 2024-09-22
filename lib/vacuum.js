"use strict";

const rrMessage = require("./message").message;
const RRMapParser = require("./RRMapParser");
const MapCreator = require("./mapCreator");
const fs = require("fs");
const zlib = require("zlib");

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

		this.adapter.log.debug(`Robot key: ${robotModel}`);
		this.robotModel = robotModel;

		this.message = new rrMessage(this.adapter);

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
	}

	async getMap(duid) {
		if (this.adapter.config.enable_map_creation) {
			this.adapter.log.debug(`Update map`);

			try {
				// const map = await connector.sendRequest(duid, "get_map_v1", [], true);
				// const map = await this.adapter.rr_mqtt_connector.sendRequest(duid, "get_map_v1", [], true);
				const map = await this.adapter.messageQueueHandler.sendRequest(duid, "get_map_v1", [], true);
				// this.adapter.log.debug(`Map received: ${map}`);
				if (map != "retry") {
					const mappedRooms = await this.adapter.messageQueueHandler.sendRequest(duid, "get_room_mapping", []);

					// const deviceStatus = await this.adapter.messageQueueHandler.sendRequest(duid, "get_status", []);
					const deviceStatus = await this.adapter.messageQueueHandler.sendRequest(duid, "get_prop", ["get_status"]);
					const selectedMap = deviceStatus[0].map_status >> 2 ?? -1; // to get the currently selected map perform bitwise right shift

					// This is for testing and debugging maps. This can't be stored in a state.
					zlib.gzip(map, (error, buffer) => {
						if (error) {
							this.adapter.log.error(`Error compressing map to gz ${error}`);
						} else {
							fs.writeFile("./test.rrmap.gz", buffer, (error) => {
								if (error) {
									this.adapter.log.error(`Error writing map file ${error}`);
								}
							});
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
				}
			} catch (error) {
				this.adapter.catchError(error, "get_map_v1", duid), this.robotModel;
			}
		}
	}

	async getCleaningRecordMap(duid, startTime) {
		try {
			const cleaningRecordMap = await this.adapter.messageQueueHandler.sendRequest(duid, "get_clean_record_map", { start_time: startTime }, true);
			const parsedData = await this.mapParser.parsedata(cleaningRecordMap);
			const [mapBase64, mapBase64Truncated] = this.mapCreator.canvasMap(parsedData, duid);

			return {
				mapBase64: mapBase64,
				mapBase64Truncated: mapBase64Truncated,
				mapData: JSON.stringify(parsedData),
			};
		} catch (error) {
			this.adapter.catchError(error, "get_clean_record_map", duid, this.robotModel);

			return null;
		}
	}

	async command(duid, parameter, value) {
		try {
			switch (parameter) {
				case "load_multi_map": {
					const result = await this.adapter.messageQueueHandler.sendRequest(duid, "load_multi_map", value);

					if (result[0] == "ok") {
						await this.getMap(duid).then(async () => {
							await this.getParameter(duid, "get_room_mapping");
						});
					}

					break;
				}
				case "app_segment_clean": {
					this.adapter.log.debug("Start room cleaning");

					const roomList = {};
					roomList.segments = [];
					const roomFloor = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.map_status`);
					const mappedRoomList = await this.adapter.messageQueueHandler.sendRequest(duid, "get_room_mapping", []);

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

					const result = await this.adapter.messageQueueHandler.sendRequest(duid, "app_segment_clean", [roomList]);
					this.adapter.log.debug(`app_segment_clean with roomIDs: ${JSON.stringify(roomList)} result: ${result}`);
					this.adapter.setStateAsync(`Devices.${duid}.floors.cleanCount`, { val: 1, ack: true });

					break;
				}
				case "reset_consumable":
					await this.adapter.messageQueueHandler.sendRequest(duid, parameter, [value]);
					this.adapter.log.info(`Consumable ${parameter} successfully reset.`);

					break;

				case "app_set_dryer_status": {
					const result = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, JSON.parse(value));
					this.adapter.log.debug(`Command: ${parameter} result: ${result}`);

					break;
				}
				case "app_goto_target":
				case "app_zoned_clean": {
					const result = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, value);
					this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(value)} result: ${result}`);

					break;
				}
				case "set_water_box_distance_off": {
					const mappedValue = ((value - 1) / (30 - 1)) * (60 - 205) + 205;
					const parameterValue = { distance_off: mappedValue };

					const result = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, parameterValue);
					this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(parameterValue)} result: ${result}`);
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
						const result = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, value);
						this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(value)} result: ${result}`);

						// this is needed to update the states instantly after sending a command
						const getCommand = parameter.replace("set", "get");
						await this.getParameter(duid, getCommand);
					} else {
						const result = await this.adapter.messageQueueHandler.sendRequest(duid, parameter);
						this.adapter.log.debug(`Command: ${parameter} result: ${result}`);
					}
			}
		} catch (error) {
			this.adapter.catchError(error, parameter, duid, this.robotModel);
		}
	}

	async getParameter(duid, parameter, attribute) {
		let mode;

		try {
			if (parameter == "get_network_info") {
				mode = parameter;
				const networkInfo = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, []);

				for (const attribute in networkInfo) {
					if (attribute == "ip" && !(await this.adapter.isRemoteDevice(duid))) {
						this.adapter.localDevices[duid] = networkInfo[attribute];
					}
					this.adapter.setStateAsync(`Devices.${duid}.networkInfo.${attribute}`, { val: networkInfo[attribute], ack: true });
				}
			} else if (parameter == "get_consumable") {
				const consumables = (await this.adapter.messageQueueHandler.sendRequest(duid, "get_consumable", []))[0];

				for (const consumable in consumables) {
					const divider = this.adapter.vacuums[duid].features.getConsumablesDivider(consumable);
					if (divider) {
						const consumable_val = divider ? Math.round(consumables[consumable] / divider) : consumables[consumable];

						this.adapter.setStateAsync(`Devices.${duid}.consumables.${consumable}`, { val: consumable_val, ack: true });
					}
				}
			} else if (parameter == "get_status") {
				const now = new Date();
				const seconds = now.getSeconds();

				if (this.adapter.socket || seconds % this.adapter.config.updateInterval == 0) {
					// only send status every minute or if websocket is connected

					// const deviceStatus = await this.adapter.messageQueueHandler.sendRequest(duid, "get_status", []);
					const deviceStatus = await this.adapter.messageQueueHandler.sendRequest(duid, "get_prop", ["get_status"]);

					for (const attribute in deviceStatus[0]) {
						const isCleaning = this.adapter.isCleaning(deviceStatus[0]["state"]);

						if (!(await this.adapter.getObjectAsync(`Devices.${duid}.deviceStatus.${attribute}`))) {
							this.adapter.log.warn(
								`Unsupported attribute: ${attribute} of get_status with value ${deviceStatus[0][attribute]}. Please contact the dev to add the newly found attribute of your robot. Model: ${this.robotModel}`
							);
							continue; // skip unsupported attributes
						}

						const divider = this.adapter.vacuums[duid].features.getStatusDivider(attribute);
						if (divider) {
							deviceStatus[0][attribute] = Math.round(deviceStatus[0][attribute] / divider);
						}

						if (typeof deviceStatus[0][attribute] == "object") {
							deviceStatus[0][attribute] = JSON.stringify(deviceStatus[0][attribute]);
						}

						switch (attribute) {
							case "dock_type":
								this.adapter.vacuums[duid].features.processDockType(attribute);
								break;
							case "dss":
								await this.adapter.createDockingStationObject(duid);
								const dockingStationStatus = await this.parseDockingStationStatus(deviceStatus[0][attribute]);

								for (const state in dockingStationStatus) {
									this.adapter.setStateAsync(`Devices.${duid}.dockingStationStatus.${state}`, { val: parseInt(dockingStationStatus[state]), ack: true });
								}
								break;
							case "map_status": {
								deviceStatus[0][attribute] = deviceStatus[0][attribute] >> 2 ?? -1; // to get the currently selected map perform bitwise right shift

								if (isCleaning) {
									this.adapter.startMapUpdater(duid);
								} else if (!isCleaning) {
									this.adapter.stopMapUpdater(duid);
								} else {
									const mapCount = await this.adapter.getStateAsync(`Devices.${duid}.floors.multi_map_count`);

									// don't process load_multi_map for single level configuration
									if (mapCount) {
										// sometimes mapCount is not available shortly after first start of adapter
										if (mapCount.val > 1) {
											const currentMap = deviceStatus[0][attribute];
											const mapFromCommand = await this.adapter.getState(`Devices.${duid}.commands.load_multi_map`);

											if (mapFromCommand && mapFromCommand.val != currentMap) {
												await this.adapter.setStateAsync(`Devices.${duid}.commands.load_multi_map`, currentMap, true);
												await this.adapter.vacuums[duid].getMap(duid);
											}
										}
									}
								}

								break;
							}
							case "state": {
								if (this.adapter.socket) {
									const sendValue = { duid: duid, command: "get_status", parameters: { isCleaning: isCleaning } };
									this.adapter.socket.send(JSON.stringify(sendValue));
								}

								break;
							}
							case "last_clean_t":
								deviceStatus[0][attribute] = new Date(deviceStatus[0][attribute]).toString();

								break;
						}
						this.adapter.setStateChangedAsync(`Devices.${duid}.deviceStatus.${attribute}`, { val: deviceStatus[0][attribute], ack: true });
					}
					this.adapter.manageDeviceIntervals(duid);
				}
			} else if (parameter == "get_room_mapping") {
				const deviceStatus = await this.adapter.messageQueueHandler.sendRequest(duid, "get_status", []);
				const roomFloor = deviceStatus[0]["map_status"] >> 2 ?? -1; // to get the currently selected map perform bitwise right shift
				const mappedRooms = await this.adapter.messageQueueHandler.sendRequest(duid, "get_room_mapping", []);

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
							await this.adapter.createStateObjectHelper(objectString, roomName, "boolean", null, true, "value", true, true);
						}
					}
				}

				const objectString = `Devices.${duid}.floors.cleanCount`;
				await this.adapter.createStateObjectHelper(objectString, "Clean count", "number", null, 1, "value", true, true);
			} else if (parameter == "get_multi_maps_list") {
				const mapList = await this.adapter.messageQueueHandler.sendRequest(duid, "get_multi_maps_list", []);
				const mapInfo = mapList[0].map_info;
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
					await this.adapter.createStateObjectHelper(commandPath, "Load map", "number", null, 0, "value", true, true, maps);
				} else {
					this.adapter.delObjectAsync(commandPath);
				}
			} else if (parameter == "get_fw_features") {
				const firmwareFeatures = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, []);
				for (const firmwareFeature in firmwareFeatures) {
					const featureID = firmwareFeatures[firmwareFeature];

					const objectString = `Devices.${duid}.firmwareFeatures.${firmwareFeature}`;
					await this.adapter.createStateObjectHelper(objectString, featureID.toString(), "string", null, null, "value", true, false);

					const featureName = this.adapter.vacuums[duid].features.getFirmwareFeature(featureID);

					// this dynamically processes robot features by ID if they are supported
					if (typeof this.adapter.vacuums[duid].features[featureName] === "function") {
						this.adapter.vacuums[duid].features[featureName]();
					}

					this.adapter.setStateAsync(objectString, { val: featureName, ack: true });
				}
			} else if (parameter == "get_server_timer") {
				// const serverTimers = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, []);
				// if (typeof(attribute_val[0]) == "object") {
				// attribute_val[0] = JSON.stringify(attribute_val[0]);
				// }
				// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
			} else if (parameter == "get_timer") {
				// const timers = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, []);
				// if (typeof(attribute_val[0]) == "object") {
				// attribute_val[0] = JSON.stringify(attribute_val[0]);
				// }
				// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
			} else if (parameter == "get_photo") {
				const photoresponse = await this.adapter.messageQueueHandler.sendRequest(duid, "get_photo", attribute, true, true);

				if (this.isGZIP(photoresponse)) {
					this.adapter.log.debug(`gzipped photo found.`);
					this.adapter.log.debug(JSON.stringify(photoresponse));

					this.unzipBuffer(photoresponse, (error, photoData) => {
						if (error) {
							this.adapter.catchError(error, "get_photo", duid, this.robotModel);

							if (this.adapter.supportsFeature && this.adapter.supportsFeature("PLUGINS")) {
								if (this.adapter.sentryInstance) {
									this.adapter.sentryInstance.getSentryObject().captureException(`Failed to extract gzip: ${JSON.stringify(error)}`);
								}
							}
						} else {
							const extractedPhoto = this.extractPhoto(photoData);

							// fs.writeFile("slicedBuffer.jpg", extractedPhoto, (err) => {
							// 	if (err) {
							// 		console.error("Fehler beim Schreiben der Datei:", err);
							// 	} else {
							// 		console.log("Die Datei wurde erfolgreich gespeichert!");
							// 	}
							// });

							if (extractedPhoto) {
								const photo = {};
								photo.duid = duid;
								photo.command = "get_photo";
								photo.image = `data:image/jpeg;base64,${extractedPhoto.toString("base64")}`;

								if (this.adapter.socket) {
									this.adapter.socket.send(JSON.stringify(photo));
								}
							}
						}
					});
				}
			} else if (
				parameter == "get_dust_collection_switch_status" ||
				parameter == "get_wash_towel_mode" ||
				parameter == "get_smart_wash_params" ||
				parameter == "get_dust_collection_mode"
			) {
				const attribute_val = JSON.stringify(await this.adapter.messageQueueHandler.sendRequest(duid, parameter, {}));
				this.adapter.setStateAsync(`Devices.${duid}.commands.${parameter.replace("get", "set")}`, { val: attribute_val, ack: true });
			} else if (parameter == "app_get_dryer_setting") {
				const attribute_val = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, {});
				const actualVal = JSON.stringify({ on: { dry_time: attribute_val.on.dry_time }, status: attribute_val.status });
				this.adapter.setStateAsync(`Devices.${duid}.commands.${parameter.replace("get", "set")}`, { val: actualVal, ack: true });
			} else if (this.parameterFolders[parameter]) {
				mode = parameter.substring(4);
				const attribute_val = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, []);

				if (typeof attribute_val[0] == "object") {
					attribute_val[0] = JSON.stringify(attribute_val[0]);
				}
				const targetFolder = this.parameterFolders[parameter];
				this.adapter.setStateAsync(`Devices.${duid}.${targetFolder}.${mode}`, { val: attribute_val[0], ack: true });
			} else {
				// unknown parameter
				const unknown_parameter_val = await this.adapter.messageQueueHandler.sendRequest(duid, parameter, []);

				// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
				if (typeof unknown_parameter_val == "object") {
					if (typeof unknown_parameter_val[0] != "number") {
						this.adapter.catchError(`Unknown parameter: ${JSON.stringify(unknown_parameter_val)}`, parameter, duid, this.robotModel);
					}
				} else {
					this.adapter.catchError(`Unknown parameter: ${unknown_parameter_val}`, parameter, duid, this.robotModel);
				}
			}
		} catch (error) {
			this.adapter.catchError(error, parameter, duid, this.robotModel);
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
	}

	async parseDockingStationStatus(dss) {

		return {
			cleanFluidStatus: (dss >> 10) & 0b11,
			waterBoxFilterStatus: (dss >> 8) & 0b11,
			dustBagStatus: (dss >> 6) & 0b11,
			dirtyWaterBoxStatus: (dss >> 4) & 0b11,
			clearWaterBoxStatus: (dss >> 2) & 0b11,
			isUpdownWaterReady: dss & 0b11,
		};
	}
	async getCleanSummary(duid) {
		try {
			const cleaningAttributes = await this.adapter.messageQueueHandler.sendRequest(duid, "get_clean_summary", []);

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
						const cleaningRecordAttributes = (await this.adapter.messageQueueHandler.sendRequest(duid, "get_clean_record", [cleaningRecordID]))[0];

						cleaningRecordsJSON[cleaningRecord] = cleaningRecordAttributes;

						for (const cleaningRecordAttribute in cleaningRecordAttributes) {
							const mappedRecordAttribute = mappedCleaningRecordAttribute[cleaningRecordAttribute] || cleaningRecordAttribute;
							await this.adapter.setStateAsync(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, {
								val: this.calculateRecordValue(mappedRecordAttribute, cleaningRecordAttributes[cleaningRecordAttribute]),
								ack: true,
							});
						}

						if (this.adapter.config.enable_map_creation == true) {
							const mapArray = await this.getCleaningRecordMap(duid, cleaningAttributes[cleaningAttribute][cleaningRecord]);
							for (const mapType in mapArray) {
								const val = mapArray[mapType];
								this.adapter.setStateAsync(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.map.${mapType}`, { val: val, ack: true });
							}
						}
					}

					const objectString = `Devices.${duid}.cleaningInfo.JSON`;
					await this.adapter.createStateObjectHelper(objectString, "cleaningInfoJSON", "string", null, null, "json", true, false);
					this.adapter.setStateAsync(`Devices.${duid}.cleaningInfo.JSON`, { val: JSON.stringify(cleaningRecordsJSON), ack: true });
				}
			}
		} catch (error) {
			this.adapter.catchError(error, "get_clean_summary", duid, this.robotModel);
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

		if (buffer[0] == 31 && buffer[1] == 139) {
			return true;
		}

		return false;
	}
	extractPhoto(buffer) {
		// Verify that the buffer is long enough to hold the header
		if (buffer.length < 10) {
			return false;
		}

		// Check the signature
		if (buffer[26] == 74 && buffer[27] == 70 && buffer[28] == 73 && buffer[29] == 70) {
			return buffer.slice(20);
		} else if (buffer[42] == 74 && buffer[43] == 70 && buffer[44] == 73 && buffer[45] == 70) {
			return buffer.slice(36);
		}

		return false;
	}
}

module.exports = {
	vacuum,
};
