"use strict";

const fs = require("fs");
const zlib = require("zlib");
const RRMapParser = require("./RRMapParser");
const MapCreator = require("./mapCreator");
const message_parser = require("./message_parser");
const local_api = require("./local_api");
const mqtt_api = require("./mqtt_api");

const requestTimeout = 30000; // 30s

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

const parameterFolders = {
	get_mop_mode: "deviceStatus",
	get_water_box_custom_mode: "deviceStatus",
	get_consumable: "consumables",
	get_carpet_mode: "deviceStatus",
	get_carpet_clean_mode: "deviceStatus",
	get_carpet_cleaning_mode: "deviceStatus",
};

class requests_handler {
	constructor(adapter) {
		this.adapter = adapter;

		this.messageQueue = new Map();

		this.localDevices = {};

		this.local_api = new local_api(this.adapter);
		this.mqtt_api = new mqtt_api(this.adapter);

		this.message_parser = new message_parser(this.adapter);

		this.mapParser = new RRMapParser(this.adapter);
		this.mapCreator = new MapCreator(this.adapter);

		this.cached_get_status_value = [];

		// Schedule MQTT API reset every hour
		this.scheduleMqttReset();
	}

	/**
	 * Schedules the MQTT API to be reset every hour.
	 */
	scheduleMqttReset() {
		// Clear any existing interval if present
		if (this.mqttResetInterval) {
			clearInterval(this.mqttResetInterval);
		}
		// Set an interval to reset the MQTT API every 1 hour (3600000 ms)
		this.mqttResetInterval = setInterval(async () => {
			await this.resetMqttApi();
		}, 3600000);
	}

	/**
	 * Resets the MQTT API instance by cleaning up resources and reinitializing it.
	 */
	async resetMqttApi() {
		this.adapter.log.info("Resetting MQTT API instance...");
		// Cleanup the existing MQTT API instance
		if (this.mqtt_api) {
			this.mqtt_api.cleanup();
			this.clearQueue();
		}
		// Create a new MQTT API instance and initialize it
		this.mqtt_api = new mqtt_api(this.adapter);
		await this.mqtt_api.init();
		this.adapter.log.info("MQTT API instance has been reset.");
	}

	async init() {
		await this.mqtt_api.init();
	}

	async initTCP() {
		this.localDevices = await this.local_api.getLocalDevices(); // discovers devices in local network via UDP discovery
		this.adapter.log.debug(`localDevices: ${JSON.stringify(this.localDevices)}`);

		await Promise.all(Object.entries(this.localDevices).map(async ([duid, ip]) => await this.local_api.createClient(duid, ip)));
	}

	async getStatus(duid) {
		const robotModel = await this.adapter.http_api.getRobotModel(duid);
		// Add vacuum class here after adjusting it

		if (robotModel == "roborock.wm.a102") {
			// Nothing for now
		} else if (robotModel == "roborock.wetdryvac.a56") {
			await this.getParameter(duid, "get_status");
		} else {
			await this.getParameter(duid, "get_status");
		}
	}

	async getCleaningRecordMap(duid, startTime) {
		try {
			const cleaningRecordMap = await this.sendRequest(duid, "get_clean_record_map", { start_time: startTime }, true);
			const parsedData = await this.mapParser.parsedata(cleaningRecordMap);
			const [mapBase64, mapBase64Truncated] = await this.mapCreator.canvasMap(parsedData);

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

	/**
	 * @param {string} duid
	 */
	async getCleanSummary(duid) {
		try {
			const cleaningAttributes = await this.sendRequest(duid, "get_clean_summary", []);

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
						const cleaningRecordAttributes = (await this.sendRequest(duid, "get_clean_record", [cleaningRecordID]))[0];

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
			this.adapter.catchError(error, "get_clean_summary", duid);
		}
	}

	/**
	 * @param {string} duid
	 */
	getDockingStationStatus(duid) {
		const dss = this.cached_get_status_value[duid].dss;

		return {
			cleanFluidStatus: (dss >> 10) & 0b11,
			waterBoxFilterStatus: (dss >> 8) & 0b11,
			dustBagStatus: (dss >> 6) & 0b11,
			dirtyWaterBoxStatus: (dss >> 4) & 0b11,
			clearWaterBoxStatus: (dss >> 2) & 0b11,
			isUpdownWaterReady: dss & 0b11,
		};
	}

	async getParameter(duid, parameter, attribute) {
		let mode;
		const robotModel = await this.adapter.http_api.getRobotModel(duid);

		try {
			switch (parameter) {
				case "get_network_info":
					mode = parameter;
					const networkInfo = await this.sendRequest(duid, parameter, []);

					for (const attribute in networkInfo) {
						if (attribute == "ip" && !(await this.isCloudDevice(duid))) {
							this.localDevices[duid] = networkInfo[attribute];
						}
						this.adapter.setStateAsync(`Devices.${duid}.networkInfo.${attribute}`, { val: networkInfo[attribute], ack: true });
					}
					break;
				case "get_consumable":
					const consumables = (await this.sendRequest(duid, "get_consumable", []))[0];

					for (const consumable in consumables) {
						const divider = this.adapter.device_features.getConsumablesDivider(duid, consumable);
						if (divider) {
							const consumable_val = divider ? Math.round(consumables[consumable] / divider) : consumables[consumable];

							this.adapter.setStateAsync(`Devices.${duid}.consumables.${consumable}`, { val: consumable_val, ack: true });
						}
					}
					break;
				case "get_status":
					// Only send status every minute or if websocket is connected
					this.cached_get_status_value[duid] = await this.sendRequest(duid, "get_prop", ["get_status"]);

					for (const attribute in this.cached_get_status_value[duid][0]) {
						if (!(await this.adapter.getObjectAsync(`Devices.${duid}.deviceStatus.${attribute}`))) {
							this.adapter.log.warn(
								`Unsupported attribute: ${attribute} of get_status with value ${this.cached_get_status_value[duid][0][attribute]}. Please contact the dev to add the newly found attribute of your robot. Model: ${robotModel}`
							);
							continue; // Skip unsupported attributes
						}

						const divider = this.adapter.device_features.getStatusDivider(attribute);
						if (divider) {
							this.cached_get_status_value[duid][0][attribute] = Math.round(this.cached_get_status_value[duid][0][attribute] / divider);
						}

						if (typeof this.cached_get_status_value[duid][0][attribute] == "object") {
							this.cached_get_status_value[duid][0][attribute] = JSON.stringify(this.cached_get_status_value[duid][0][attribute]);
						}

						switch (attribute) {
							case "dock_type":
								this.adapter.device_features.processDockType(attribute);
								break;
							case "dss":
								await this.adapter.createDockingStationObject(duid);
								const dockingStationStatus = this.getDockingStationStatus(duid);

								for (const state in dockingStationStatus) {
									this.adapter.setStateAsync(`Devices.${duid}.dockingStationStatus.${state}`, { val: parseInt(dockingStationStatus[state]), ack: true });
								}
								break;
							case "map_status": {
								this.cached_get_status_value[duid][0][attribute] = this.getSelectedMap(duid);

								const mapCount = await this.adapter.getStateAsync(`Devices.${duid}.floors.multi_map_count`);

								// Don't process load_multi_map for single level configuration
								if (mapCount) {
									// Sometimes mapCount is not available shortly after first start of adapter
									if (mapCount.val > 1) {
										const currentMap = this.cached_get_status_value[duid][0][attribute];
										const mapFromCommand = await this.adapter.getState(`Devices.${duid}.commands.load_multi_map`);

										if (mapFromCommand && mapFromCommand.val != currentMap) {
											await this.adapter.setStateAsync(`Devices.${duid}.commands.load_multi_map`, currentMap, true);
											await this.getMap(duid);
										}
									}
								}

								break;
							}
							case "state": {
								const isCleaning = this.isCleaning(duid);
								if (this.adapter.socket) {
									const sendValue = { duid: duid, command: "get_status", parameters: { isCleaning: isCleaning } };
									this.adapter.socket.send(JSON.stringify(sendValue));
								}

								break;
							}
							case "last_clean_t":
								this.cached_get_status_value[duid][0][attribute] = new Date(this.cached_get_status_value[duid][0][attribute]).toString();
								break;
						}
						this.adapter.setStateChangedAsync(`Devices.${duid}.deviceStatus.${attribute}`, { val: this.cached_get_status_value[duid][0][attribute], ack: true });
					}
					break;
				case "get_room_mapping":
					const mappedRooms = await this.sendRequest(duid, "get_room_mapping", []);

					const roomFloor = this.getSelectedMap(duid);
					const roomIDs = this.adapter.http_api.getMatchedRoomIDs();

					mappedRooms.map(async ([shortID, roomID]) => {
						const room = roomIDs.find((r) => r.id.toString() === roomID);

						const objectString = `Devices.${duid}.floors.${roomFloor}.${shortID}`;
						await this.adapter.createStateObjectHelper(objectString, room.name, "boolean", null, true, "value", true, true);
					});

					const objectString = `Devices.${duid}.floors.cleanCount`;
					await this.adapter.createStateObjectHelper(objectString, "Clean count", "number", null, 1, "value", true, true);
					break;
				case "get_multi_maps_list":
					const mapList = await this.sendRequest(duid, "get_multi_maps_list", []);
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
					break;
				case "get_fw_features":
					const firmwareFeatures = await this.sendRequest(duid, parameter, []);

					this.adapter.log.debug(`firmwareFeatures ${JSON.stringify(firmwareFeatures)}`);
					for (const firmwareFeature in firmwareFeatures) {
						const featureID = firmwareFeatures[firmwareFeature];

						const objectString = `Devices.${duid}.firmwareFeatures.${firmwareFeature}`;
						await this.adapter.createStateObjectHelper(objectString, featureID.toString(), "string", null, null, "value", true, false);

						const featureName = this.adapter.device_features.getFirmwareFeature(featureID);

						// Dynamically process robot features by ID if they are supported
						if (typeof this.adapter.device_features[featureName] === "function") {
							this.adapter.device_features[featureName](duid);
						}

						this.adapter.setStateAsync(objectString, { val: featureName, ack: true });
					}
					break;
				case "get_server_timer":
					// const serverTimers = await this.sendRequest(duid, parameter, []);
					// if (typeof(attribute_val[0]) == "object") {
					// attribute_val[0] = JSON.stringify(attribute_val[0]);
					// }
					// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
					// Handle get_server_timer if needed
					break;
				case "get_timer":
					// const timers = await this.sendRequest(duid, parameter, []);
					// if (typeof(attribute_val[0]) == "object") {
					// attribute_val[0] = JSON.stringify(attribute_val[0]);
					// }
					// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
					// Handle get_timer if needed
					break;
				case "get_photo":
					const photoresponse = await this.sendRequest(duid, "get_photo", attribute, true, true);

					if (this.isGZIP(photoresponse)) {
						this.adapter.log.debug(`gzipped photo found.`);
						this.adapter.log.debug(JSON.stringify(photoresponse));

						this.unzipBuffer(photoresponse, (error, photoData) => {
							if (error) {
								this.adapter.catchError(error, "get_photo", duid);

								if (this.adapter.supportsFeature && this.adapter.supportsFeature("PLUGINS")) {
									if (this.adapter.sentryInstance) {
										this.adapter.sentryInstance.getSentryObject().captureException(`Failed to extract gzip: ${JSON.stringify(error)}`);
									}
								}
							} else {
								const extractedPhoto = this.extractPhoto(photoData);

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
					break;
				case "get_dust_collection_switch_status":
				case "get_wash_towel_mode":
				case "get_smart_wash_params":
				case "get_dust_collection_mode": {
					const attribute_val = JSON.stringify(await this.sendRequest(duid, parameter, {}));
					this.adapter.setStateAsync(`Devices.${duid}.commands.${parameter.replace("get", "set")}`, { val: attribute_val, ack: true });
					break;
				}
				case "app_get_dryer_setting": {
					const attribute_val = await this.sendRequest(duid, parameter, {});
					const actualVal = JSON.stringify({ on: { dry_time: attribute_val.on.dry_time }, status: attribute_val.status });
					this.adapter.setStateAsync(`Devices.${duid}.commands.${parameter.replace("get", "set")}`, { val: actualVal, ack: true });
					break;
				}
				default: {
					if (parameterFolders[parameter]) {
						mode = parameter.substring(4);
						const attribute_val = await this.sendRequest(duid, parameter, []);

						if (typeof attribute_val[0] == "object") {
							attribute_val[0] = JSON.stringify(attribute_val[0]);
						}
						const targetFolder = parameterFolders[parameter];
						this.adapter.setStateAsync(`Devices.${duid}.${targetFolder}.${mode}`, { val: attribute_val[0], ack: true });
					} else {
						// Unknown parameter
						const unknown_parameter_val = await this.sendRequest(duid, parameter, []);

						// this.adapter.setStateAsync("Devices." + duid + "." + targetFolder + "." + mode, { val: attribute_val[0], ack: true });
						if (typeof unknown_parameter_val == "object") {
							if (typeof unknown_parameter_val[0] != "number") {
								this.adapter.catchError(`Unknown parameter: ${JSON.stringify(unknown_parameter_val)}`, parameter, duid);
							}
						} else {
							this.adapter.catchError(`Unknown parameter: ${unknown_parameter_val}`, parameter, duid);
						}
					}
				}
			}
		} catch (error) {
			this.adapter.catchError(error, parameter, duid);
		}
	}

	async command(duid, parameter, value) {
		try {
			switch (parameter) {
				case "load_multi_map": {
					const result = await this.sendRequest(duid, "load_multi_map", value);

					if (result[0] == "ok") {
						await this.getMap(duid).then(async () => {
							await this.getParameter(duid, "get_room_mapping");
						});
					}

					break;
				}
				case "app_segment_clean": {
					this.adapter.log.debug("Starting room cleaning");

					const roomList = {};
					roomList.segments = [];
					const roomFloor = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.map_status`);
					const mappedRoomList = await this.sendRequest(duid, "get_room_mapping", []);

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

					const result = await this.sendRequest(duid, "app_segment_clean", [roomList]);
					this.adapter.log.debug(`app_segment_clean with roomIDs: ${JSON.stringify(roomList)} result: ${result}`);
					this.adapter.setStateAsync(`Devices.${duid}.floors.cleanCount`, { val: 1, ack: true });

					break;
				}
				case "reset_consumable":
					await this.sendRequest(duid, parameter, [value]);
					this.adapter.log.info(`Consumable ${parameter} successfully reset.`);
					break;
				case "app_set_dryer_status": {
					const result = await this.sendRequest(duid, parameter, JSON.parse(value));
					this.adapter.log.debug(`Command: ${parameter} result: ${result}`);
					break;
				}
				case "app_goto_target":
				case "app_zoned_clean": {
					const result = await this.sendRequest(duid, parameter, value);
					this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(value)} result: ${result}`);
					break;
				}
				case "set_water_box_distance_off": {
					const mappedValue = ((value - 1) / (30 - 1)) * (60 - 205) + 205;
					const parameterValue = { distance_off: mappedValue };

					const result = await this.sendRequest(duid, parameter, parameterValue);
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

						// Wait for the command to finish before updating device configuration
						const result = await this.sendRequest(duid, parameter, value);
						this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(value)} result: ${result}`);

						// Update states instantly after sending a command
						const getCommand = parameter.replace("set", "get");
						await this.getParameter(duid, getCommand);
					} else {
						const result = await this.sendRequest(duid, parameter);
						this.adapter.log.debug(`Command: ${parameter} result: ${result}`);
					}
			}
		} catch (error) {
			this.adapter.catchError(error, parameter, duid);
		}
	}

	async getMap(duid) {
		if (this.adapter.config.enable_map_creation) {
			this.adapter.log.debug(`Requesting new map for ${duid}`);

			try {
				// const map = await connector.sendRequest(duid, "get_map_v1", [], true);
				// const map = await this.mqtt_api.sendRequest(duid, "get_map_v1", [], true);
				const map = await this.sendRequest(duid, "get_map_v1", [], true);
				// this.adapter.log.debug(`Map received: ${map}`);
				if (map != "retry") {
					const mappedRooms = await this.sendRequest(duid, "get_room_mapping", []);

					// const deviceStatus = await this.sendRequest(duid, "get_status", []);
					const selectedMap = this.getSelectedMap(duid);

					// For testing and debugging maps; this cannot be stored in a state.
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
					const [mapBase64, mapBase64Truncated] = await this.mapCreator.canvasMap(parsedData, selectedMap, mappedRooms);

					await this.adapter.setStateAsync(`Devices.${duid}.map.mapData`, { val: JSON.stringify(parsedData), ack: true });
					await this.adapter.setStateAsync(`Devices.${duid}.map.mapBase64`, { val: mapBase64, ack: true });
					await this.adapter.setStateAsync(`Devices.${duid}.map.mapBase64Truncated`, { val: mapBase64Truncated, ack: true });

					// Send current map with scale factor
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
				this.adapter.catchError(error, "get_map_v1", duid);
			}
		}
	}

	/**
	 * @param {string} duid
	 */
	isCleaning(duid) {
		if (!duid) {
			throw new Error("duid parameter missing on function isCleaning");
		}
		if (!this.cached_get_status_value[duid]) {
			throw new Error("this.get_status is not initialized. Request get_status first.");
		}

		const cleaningState = this.cached_get_status_value[duid][0].state;

		switch (cleaningState) {
			case 4: // Remote Control
			case 5: // Cleaning
			case 6: // Returning Dock
			case 7: // Manual Mode
			case 11: // Spot Cleaning
			case 15: // Docking
			case 16: // Go To
			case 17: // Zone Clean
			case 18: // Room Clean
			case 26: // Going to wash the mop
				return true;
			default:
				return false;
		}
	}

	/**
	 * @param {string} duid
	 */
	getSelectedMap(duid) {
		if (!duid) {
			throw new Error("duid parameter missing on function getSelectedMap");
		}
		if (!this.cached_get_status_value[duid]) {
			throw new Error("this.get_status is not initialized. Request get_status first.");
		}

		return this.cached_get_status_value[duid][0].map_status >> 2; // Bitwise right shift to obtain the selected map
	}

	async sendRequest(duid, method, params, secure = false, photo = false) {
		const remoteConnection = await this.isCloudDevice(duid);

		let messageID = this.adapter.getRequestId();
		if (photo) messageID = messageID % 256; // Special case for photo requests.
		const timestamp = Math.floor(Date.now() / 1000);

		let protocol;
		if (remoteConnection || secure || photo || method == "get_network_info") {
			protocol = 101;
		} else {
			protocol = 4;
		}
		const payload = await this.message_parser.buildPayload(protocol, messageID, method, params, secure, photo);
		const roborockMessage = await this.message_parser.buildRoborockMessage(duid, protocol, timestamp, payload);

		const deviceOnline = await this.adapter.onlineChecker(duid);
		const mqttConnectionState = this.mqtt_api.isConnected();
		const localConnectionState = this.local_api.isConnected(duid);

		if (roborockMessage) {
			return new Promise((resolve, reject) => {
				if (!deviceOnline) {
					this.adapter.pendingRequests.delete(messageID);
					this.adapter.log.debug(`Device ${duid} offline. Not sending for method ${method} request!`);
					reject();
				} else if (!mqttConnectionState && remoteConnection) {
					this.adapter.pendingRequests.delete(messageID);
					this.adapter.log.debug(`Cloud connection not available. Not sending for method ${method} request!`);
					reject();
				} else if (!localConnectionState && !remoteConnection && method != "get_network_info") {
					this.adapter.pendingRequests.delete(messageID);
					this.adapter.log.debug(`Adapter not connected locally to robot ${duid}. Not sending for method ${method} request!`);
					reject();
				} else {
					// Setup timeout for the request
					const timeout = this.adapter.setTimeout(() => {
						this.adapter.pendingRequests.delete(messageID);
						this.local_api.clearChunkBuffer(duid);
						if (remoteConnection) {
							reject(new Error(`Cloud request with id ${messageID} and method ${method} timed out after 30 seconds. MQTT connection state: ${mqttConnectionState}`));
						} else {
							reject(new Error(`Local request with id ${messageID} and method ${method} timed out after 30 seconds. Local connection state: ${localConnectionState}`));
						}
					}, requestTimeout);

					// Store the request with resolve and reject functions
					this.adapter.pendingRequests.set(messageID, { resolve, reject, timeout });

					if (remoteConnection || secure || photo || method == "get_network_info") {
						this.mqtt_api.sendMessage(duid, roborockMessage);
						this.adapter.log.debug(`Sent payload for ${duid} with ${payload} using cloud connection`);
						//client.publish(`rr/m/i/${rriot.u}/${mqttUser}/${duid}`, roborockMessage, { qos: 1 });
						// this.adapter.log.debug(`Promise for messageID ${messageID} created. ${this._decodeMsg(roborockMessage, duid).payload}`);
					} else {
						const lengthBuffer = Buffer.alloc(4);
						lengthBuffer.writeUInt32BE(roborockMessage.length, 0);

						const fullMessage = Buffer.concat([lengthBuffer, roborockMessage]);
						this.local_api.sendMessage(duid, fullMessage);
						// this.adapter.log.debug(`sent fullMessage: ${fullMessage.toString("hex")}`);
						this.adapter.log.debug(`Sent payload for ${duid} with ${payload} using local connection`);
					}
				}
			}).finally(() => {
				this.adapter.log.debug(`Size of message queue: ${this.adapter.pendingRequests.size}`);
			});
		} else {
			this.adapter.catchError("Failed to build buildRoborockMessage!", "function sendRequest", duid);
		}
	}

	async isCloudDevice(duid) {
		const receivedDevices = this.adapter.http_api.getReceivedDevices();

		const sharedDevice = receivedDevices.find((device) => device.duid == duid);
		const cloudDevice = this.local_api.cloudDevices.has(duid);

		if (sharedDevice || cloudDevice) {
			return true;
		}

		return false;
	}

	isLocalDevice(duid) {
		if (duid in this.localDevices) {
			return true;
		}
		return false;
	}

	async getConnector(duid) {
		const isRemote = await this.isCloudDevice(duid);

		if (isRemote) {
			return this.mqtt_api;
		} else {
			return this.local_api;
		}
	}

	calculateCleaningValue(attribute, value) {
		switch (attribute) {
			case "clean_time":
				return Math.round(value / 60 / 60);
			case "clean_area":
				return Number((value / 1000 / 1000).toFixed(2));
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
			case "cleaned_area":
				return Number((value / 1000 / 1000).toFixed(2));
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

	clearQueue() {
		this.local_api.clearLocalDevicedTimeout();
		this.mqtt_api.clearIntervals();

		this.messageQueue.forEach(({ timeout102, timeout301 }) => {
			this.adapter.clearTimeout(timeout102);
			if (timeout301) {
				this.adapter.clearTimeout(timeout301);
			}
		});

		// Clear the messageQueue map
		this.messageQueue.clear();
	}

	checkAndClearRequest(requestId) {
		const request = this.messageQueue.get(requestId);

		if (!request?.timeout102 && !request?.timeout301) {
			this.messageQueue.delete(requestId);
		} else {
			this.adapter.log.debug(`Not clearing messageQueue. ${request.timeout102}  - ${request.timeout301}`);
		}
		this.adapter.log.debug(`Length of message queue: ${this.messageQueue.size}`);
	}
}

module.exports = requests_handler;
