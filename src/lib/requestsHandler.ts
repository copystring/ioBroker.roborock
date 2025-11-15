// src/lib/requestsHandler.ts
import type { Roborock } from "../main";
import type { BaseDeviceFeatures } from "./features/baseDeviceFeatures";

import fs from "fs";
import zlib from "zlib";
import { promisify } from "util";
import { RRMapParser, type ParsedMapData } from "./RRMapParser";
import { messageParser } from "./messageParser";
import { MapCreator } from "./mapCreator";
import PQueue from "p-queue";

// ... (Constants)

const REQUEST_TIMEOUT = 30000;
const mappedCleanSummary = { 0: "clean_time", 1: "clean_area", 2: "clean_count", 3: "records" };
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

const gunzipAsync = promisify(zlib.gunzip);
const gzipAsync = promisify(zlib.gzip);
const writeFileAsync = promisify(fs.writeFile);

export class requestsHandler {
	adapter: Roborock;
	idCounter: number;
	private deviceQueues: Map<string, PQueue>;
	messageParser: messageParser;
	mapParser: RRMapParser;
	mapCreator: MapCreator;
	mqttResetInterval: ioBroker.Interval | undefined = undefined;
	cached_get_status_value: Record<string, any>;

	constructor(adapter: Roborock) {
		this.adapter = adapter;
		this.idCounter = 1;
		this.deviceQueues = new Map();
		this.messageParser = new messageParser(this.adapter);
		this.mapParser = new RRMapParser(this.adapter);
		this.mapCreator = new MapCreator(this.adapter);
		this.cached_get_status_value = {};
		this.scheduleMqttReset();
	}

	private getQueue(duid: string): PQueue {
		if (!this.deviceQueues.has(duid)) {
			this.deviceQueues.set(duid, new PQueue({ concurrency: 10 }));
		}
		return this.deviceQueues.get(duid)!;
	}

	scheduleMqttReset() {
		if (this.mqttResetInterval) this.adapter.clearInterval(this.mqttResetInterval as any);

		this.mqttResetInterval = this.adapter.setInterval(async () => {
			await this.adapter.resetMqttApi();
		}, 3600000);
	}

	async getStatus(handler: BaseDeviceFeatures, duid: string) {
		const productCategory = await this.adapter.http_api.getProductCategory(duid);
		switch (productCategory) {
			case "roborock.wetdryvac":
				this.sendRequest(
					duid,
					"10000",
					"[200,201,202,203,204,205,206,207,208,209,210,212,213,214,215,216,221,222,223,224,225,226,227,228,235,210,10002,229,10004,10005,10007,230,237,238]",
					{ priority: 0 }
				).catch(() => {});
				break;
			case "robot.vacuum.cleaner":
			default:
				await this.getParameter(handler, duid, "get_prop", ["get_status"]);
				break;
		}
	}

	async getCleaningRecordMap(duid: string, startTime: number) {
		try {
			const cleaningRecordMap = (await this.sendRequest(duid, "get_clean_record_map", { start_time: startTime }, { priority: 0 })) as any;

			if (!Buffer.isBuffer(cleaningRecordMap)) {
				this.adapter.log.warn(`[getCleaningRecordMap] Received non-buffer data for record ${startTime}: ${JSON.stringify(cleaningRecordMap)}`);
				throw new Error("Received non-buffer data for history map");
			}

			const parsedData = (await this.mapParser.parsedata(cleaningRecordMap, { isHistoryMap: true })) as ParsedMapData;

			if (parsedData?.IMAGE?.segments) {
				this.adapter.log.info(`[getCleaningRecordMap] Parsed HISTORY map. Segments: ${parsedData.IMAGE.segments.id?.length || 0}`);
			} else {
				this.adapter.log.warn(`[getCleaningRecordMap] History map for ${startTime} was parsed but contains no IMAGE data.`);
			}

			this.adapter.log.debug(`Generating map for cleaning record with start time ${startTime} for duid ${duid}`);
			const [mapBase64, mapBase64Truncated] = await this.mapCreator.canvasMap(parsedData, { selectedMap: -1, mappedRooms: null });

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

	async getCleanSummary(handler: BaseDeviceFeatures, duid: string) {
		try {
			const cleaningAttributes = (await this.sendRequest(duid, "get_clean_summary", [], { priority: 0 })) as any;

			for (const cleaningAttribute in cleaningAttributes) {
				const mappedAttribute = mappedCleanSummary[cleaningAttribute] || cleaningAttribute;
				const cleaningAttributeCommon = handler.getCommonCleaningInfo(mappedAttribute) || {}; // Ensure object

				if (["clean_time", "clean_area", "clean_count"].includes(mappedAttribute)) {
					cleaningAttributeCommon.type = "number";
					await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.${cleaningAttribute}`, cleaningAttributeCommon || {});
					await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.${cleaningAttribute}`, {
						val: this.calculateCleaningValue(mappedAttribute, cleaningAttributes[cleaningAttribute]),
						ack: true,
					});
				} else if (mappedAttribute == "records") {
					const cleaningRecordsJSON = [];
					const recordsList = cleaningAttributes[cleaningAttribute];

					for (const cleaningRecord in recordsList) {
						const cleaningRecordID = recordsList[cleaningRecord];
						const cleaningRecordAttributesArr = (await this.sendRequest(duid, "get_clean_record", [cleaningRecordID], { priority: 0 })) as any[];
						const cleaningRecordAttributes = cleaningRecordAttributesArr[0];

						cleaningRecordsJSON[cleaningRecord] = cleaningRecordAttributes;

						for (const cleaningRecordAttribute in cleaningRecordAttributes) {
							const mappedRecordAttribute = mappedCleaningRecordAttribute[cleaningRecordAttribute] || cleaningRecordAttribute;
							const cleaningRecordCommon = handler.getCommonCleaningRecords(mappedRecordAttribute) || {}; // Ensure object

							if (mappedRecordAttribute === "begin" || mappedRecordAttribute === "end") {
								cleaningRecordCommon.type = "string";
							} else {
								cleaningRecordCommon.type = "number"; // duration, area, error, etc.
							}

							await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, cleaningRecordCommon || {});
							await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.${mappedRecordAttribute}`, {
								val: this.calculateRecordValue(mappedRecordAttribute, cleaningRecordAttributes[cleaningRecordAttribute]),
								ack: true,
							});
						}

						if (this.adapter.config.enable_map_creation == true) {
							const mapArray = await this.getCleaningRecordMap(duid, recordsList[cleaningRecord]);
							if (mapArray) {
								for (const mapType in mapArray) {
									const val = mapArray[mapType];
									await this.adapter.ensureState(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.map.${mapType}`, {});
									await this.adapter.setStateChangedAsync(`Devices.${duid}.cleaningInfo.records.${cleaningRecord}.map.${mapType}`, { val: val, ack: true });
								}
							}
						}
					}

					const objectString = `Devices.${duid}.cleaningInfo.JSON`;
					await this.adapter.ensureState(objectString, { name: "cleaningInfoJSON", type: "string", def: "json", write: false });
					await this.adapter.setState(`Devices.${duid}.cleaningInfo.JSON`, { val: JSON.stringify(cleaningRecordsJSON), ack: true });
				}
			}
		} catch (error) {
			this.adapter.catchError(error, "get_clean_summary", duid);
		}
	}

	getDockingStationStatus(duid) {
		const dss = this.cached_get_status_value[duid]?.dss;
		if (dss === undefined) return null;
		return {
			cleanFluidStatus: (dss >> 10) & 0b11,
			waterBoxFilterStatus: (dss >> 8) & 0b11,
			dustBagStatus: (dss >> 6) & 0b11,
			dirtyWaterBoxStatus: (dss >> 4) & 0b11,
			clearWaterBoxStatus: (dss >> 2) & 0b11,
			isUpdownWaterReady: dss & 0b11,
		};
	}

	async getParameter(handler: BaseDeviceFeatures, duid: string, parameter: string, attribute?: any): Promise<any> {
		try {
			const value = await this.sendRequest(duid, parameter, attribute, { priority: 0 });
			if (!value) {
				this.adapter.log.debug(`No value received for ${parameter} on ${duid}.`);
				return;
			}
			this.adapter.log.debug(`Received value for ${parameter} on ${duid}: ${JSON.stringify(value)}`);

			switch (parameter) {
				case "get_network_info":
					await this.handleGetNetworkInfo(duid, value);
					break;
				case "get_consumable":
					await this.handleGetConsumable(handler, duid, value);
					break;
				case "get_prop":
					await this.handleGetProp(handler, duid, value, attribute);
					break;
				case "get_room_mapping":
					await this.handleGetRoomMapping(duid, value);
					break;
				case "get_multi_maps_list":
					await this.handleGetMultiMapsList(duid, value);
					break;
				case "get_fw_features":
					await this.handleGetFwFeatures(handler, duid, value);
					break;
				case "get_photo":
					return await this.handleGetPhoto(duid, value);
				case "app_get_dryer_setting": {
					const val = value as any;

					if (val && val.on && typeof val.on === "object" && "dry_time" in val.on && "status" in val) {
						const actualVal = JSON.stringify({ on: { dry_time: val.on.dry_time }, status: val.status });
						await this.adapter.setState(`Devices.${duid}.commands.${parameter.replace("get", "set")}`, { val: actualVal, ack: true });
					} else {
						this.adapter.log.warn(`Unexpected value structure for ${parameter}: ${JSON.stringify(value)}`);
					}
					break;
				}
				case "get_timer":
				case "get_server_timer":
					this.adapter.log.debug(`[getParameter] Received timers (get_timer/get_server_timer), ignoring value.`);
					break;
				default:
					if (parameterFolders[parameter]) {
						const mode = parameter.substring(4);
						const targetFolder = parameterFolders[parameter];
						let valToSave = value[0];
						if (typeof valToSave == "object") valToSave = JSON.stringify(valToSave);
						await this.adapter.ensureState(targetFolder, {});
						await this.adapter.setStateChangedAsync(`Devices.${duid}.${targetFolder}.${mode}`, { val: valToSave, ack: true });
					} else {
						if (typeof value == "object") {
							if (typeof value[0] != "number") {
								this.adapter.catchError(`Unknown parameter: ${JSON.stringify(value)}`, parameter, duid);
							}
						} else {
							this.adapter.catchError(`Unknown parameter: ${value}`, parameter, duid);
						}
					}
			}
			return value;
		} catch (error) {
			this.adapter.catchError(error, parameter, duid);
			throw error;
		}
	}

	// --- Refactored Handlers ---

	private async handleGetNetworkInfo(duid: string, value: any) {
		const localDevice = this.adapter.local_api.localDevices[duid];
		for (const attribute in value) {
			if (attribute == "ip" && value[attribute] && !localDevice) {
				this.adapter.log.info(`[get_network_info] Adding device ${duid} @ ${value[attribute]} to local devices (missed by UDP).`);
				this.adapter.local_api.localDevices[duid] = { ip: value[attribute], version: "1.0" };
			}
			await this.adapter.ensureState(`Devices.${duid}.networkInfo.${attribute}`, {});
			await this.adapter.setStateChangedAsync(`Devices.${duid}.networkInfo.${attribute}`, { val: value[attribute], ack: true });
		}
	}

	private async handleGetConsumable(handler: BaseDeviceFeatures, duid: string, value: any) {
		const consumables = value[0];
		for (const consumable in consumables) {
			const commonConsumable = handler.getCommonConsumable(consumable) || {}; // Ensure it's an object
			const val = commonConsumable && commonConsumable.unit == "h" ? Math.round(consumables[consumable] / (60 * 60)) : consumables[consumable];
			commonConsumable.type = "number"; // Consumables are always numbers

			await this.adapter.ensureState(`Devices.${duid}.consumables.${consumable}`, commonConsumable);
			await this.adapter.setStateChangedAsync(`Devices.${duid}.consumables.${consumable}`, { val: val, ack: true });
			if (handler.isResetableConsumable(consumable)) {
				await this.adapter.ensureState(`Devices.${duid}.resetConsumables.${consumable}`, {
					type: "boolean",
					write: true,
					role: "button",
					def: false,
				});
				await this.adapter.setState(`Devices.${duid}.resetConsumables.${consumable}`, { val: false, ack: true });
			}
		}
	}

	private async handleGetProp(handler: BaseDeviceFeatures, duid: string, value: any, attribute: any) {
		if (!Array.isArray(attribute) || attribute[0] !== "get_status") {
			return;
		}
		this.cached_get_status_value[duid] = value[0];
		for (const attr in this.cached_get_status_value[duid]) {
			let val = this.cached_get_status_value[duid][attr];
			if (typeof val == "object") val = JSON.stringify(val);
			this.cached_get_status_value[duid][attr] = val;

			switch (attr) {
				case "dock_type":
					handler.processDockType(val);
					break;
				case "dss":
					const dssStatus = this.getDockingStationStatus(duid);
					if (dssStatus) {
						const dockStates = ["cleanFluidStatus", "waterBoxFilterStatus", "dustBagStatus", "dirtyWaterBoxStatus", "clearWaterBoxStatus", "isUpdownWaterReady"];
						for (const state of dockStates) {
							const path = `Devices.${duid}.dockingStationStatus.${state}`;
							await this.adapter.ensureState(path, { type: "number", role: "value", read: true, write: false, states: { 0: "UNKNOWN", 1: "ERROR", 2: "OK" } });
							const dssVal = dssStatus[state];
							if (dssVal !== undefined) await this.adapter.setStateChangedAsync(path, { val: parseInt(dssVal), ack: true });
						}
					}
					break;
				case "map_status": {
					// Use block scope
					// 'val' already holds the raw map_status (e.g., 252)
					// We can calculate 'selectedMap' directly without reading the state
					const rawMapStatus = Number(val);
					const selectedMap = rawMapStatus >> 2; // Bitwise shift

					// Store the CALCULATED map ID (e.g., 63) in the cache
					this.cached_get_status_value[duid][attr] = selectedMap;
					// Overwrite 'val' so the calculated value (63) is saved to the state
					// instead of the raw value (252)
					val = selectedMap;

					// Now run the rest of the logic using the calculated value
					const mapCount = await this.adapter.getStateAsync(`Devices.${duid}.floors.multi_map_count`);
					if (mapCount && typeof mapCount.val === "number" && mapCount.val > 1) {
						const mapFromCommand = await this.adapter.getStateAsync(`Devices.${duid}.commands.load_multi_map`);
						if (mapFromCommand && mapFromCommand.val != selectedMap) {
							await this.adapter.setState(`Devices.${duid}.commands.load_multi_map`, selectedMap, true);
							// Don't call getMap() here during init, it will be called by startPolling
							if (!this.adapter.isInitializing) {
								this.getMap(handler, duid).catch(() => {});
							}
						}
					}
					break;
				}
				case "state":
					const isCleaning = this.isCleaning(duid);
					if (this.adapter.socket && isCleaning) {
						this.adapter.socket.send(JSON.stringify({ duid: duid, command: "get_status", parameters: { isCleaning: isCleaning } }));
					}
					break;
				case "last_clean_t":
					val = new Date(val * 1000).toString();
					break;
			}
			const commonDeviceStates = handler.getCommonDeviceStates(attr) || {};

			// Dynamically set type based on the data we received
			if (attr === "last_clean_t") {
				commonDeviceStates.type = "string"; // This one was converted to a string
			} else if (typeof val === "number") {
				commonDeviceStates.type = "number";
			} else if (typeof val === "boolean") {
				commonDeviceStates.type = "boolean";
			}

			await this.adapter.ensureState(`Devices.${duid}.deviceStatus.${attr}`, commonDeviceStates);
			await this.adapter.setStateChangedAsync(`Devices.${duid}.deviceStatus.${attr}`, { val: val, ack: true });
		}
	}

	private async handleGetRoomMapping(duid: string, value: any) {
		const selectedMap = await this.getSelectedMap(duid);
		if (selectedMap != null) {
			const roomIDs = this.adapter.http_api.getMatchedRoomIDs();
			if (Array.isArray(value)) {
				value.map(async ([shortID, roomID]) => {
					const room = roomIDs.find((r) => r.id.toString() === roomID);
					const roomName = room?.name || "unknown";
					await this.adapter.ensureState(`Devices.${duid}.floors.${selectedMap}.${shortID}`, { name: roomName, type: "boolean", def: true, write: true });
				});
			}
			await this.adapter.ensureState(`Devices.${duid}.floors.cleanCount`, { name: "Clean count", type: "number", def: 1, read: true, write: true });
		}
	}

	private async handleGetMultiMapsList(duid: string, value: any) {
		const mapInfo = value[0].map_info;
		const maps = {};
		for (const mapParameter in value[0]) {
			if (typeof value[0][mapParameter] === "number") {
				await this.adapter.ensureState(`Devices.${duid}.floors.${mapParameter}`, {});
				await this.adapter.setStateChangedAsync(`Devices.${duid}.floors.${mapParameter}`, { val: value[0][mapParameter], ack: true });
			}
		}
		for (const map in mapInfo) {
			const roomFloor = mapInfo[map]["mapFlag"];
			const mapName = mapInfo[map]["name"];
			maps[roomFloor] = mapName;
			this.adapter.setObjectAsync(`Devices.${duid}.floors.${roomFloor}`, {
				type: "folder",
				common: { name: mapName },
				native: {},
			});
		}
		if (value[0]["max_multi_map"] > 1) {
			await this.adapter.ensureState(`Devices.${duid}.commands.load_multi_map`, { name: "Load map", type: "number", def: 0, write: true, states: maps });
		} else {
			this.adapter.delObjectAsync(`Devices.${duid}.commands.load_multi_map`);
		}
	}

	private async handleGetFwFeatures(handler: BaseDeviceFeatures, duid: string, value: any) {
		this.adapter.http_api.storeFwFeaturesResult(duid, value);
		for (const firmwareFeature in value) {
			const featureID = value[firmwareFeature];
			const featureName = handler.getFirmwareFeatureName(featureID);
			if (typeof handler[featureName] === "function") {
				handler[featureName](duid);
			}
			await this.adapter.ensureState(`Devices.${duid}.firmwareFeatures.${firmwareFeature}`, {});
			await this.adapter.setStateChangedAsync(`Devices.${duid}.firmwareFeatures.${firmwareFeature}`, { val: featureName, ack: true });
		}
	}

	private async handleGetPhoto(duid: string, value: any) {
		if (Buffer.isBuffer(value)) {
			if (this.isGZIP(value)) {
				this.adapter.log.debug(`gzipped photo found.`);
				try {
					const photoData = await gunzipAsync(value);
					const extractedPhoto = this.extractPhoto(photoData);
					if (extractedPhoto) {
						const photoResponse = { image: `data:image/jpeg;base64,${extractedPhoto.toString("base64")}` };
						this.adapter.log.debug(`photoResponse: ${photoResponse.image.substring(0, 40)}...`);
						return photoResponse;
					} else {
						this.adapter.log.warn(`Could not extract photo from data for ${duid}.`);
						throw new Error("Could not extract photo from data");
					}
				} catch (error) {
					this.adapter.catchError(error, "get_photo (unzip)", duid);
					throw error;
				}
			} else {
				this.adapter.log.warn(`Received get_photo but data was not gzipped for ${duid}.`);
				throw new Error("Photo data not gzipped");
			}
		}
		return null;
	}

	async command(handler: BaseDeviceFeatures, duid: string, parameter: string, value?: any) {
		try {
			const priority = 1;
			switch (parameter) {
				case "load_multi_map": {
					const result = await this.sendRequest(duid, "load_multi_map", value, { priority });
					if (Array.isArray(result) && result[0] == "ok") {
						await this.getMap(handler, duid).then(async () => {
							await this.getParameter(handler, duid, "get_room_mapping", []);
						});
					}
					break;
				}
				case "app_segment_clean": {
					this.adapter.log.debug("Starting room cleaning");
					const roomList: { segments: any[]; repeat?: number } = { segments: [] };
					const roomFloor = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.map_status`);
					const mappedRoomList = await this.getParameter(handler, duid, "get_room_mapping", []);
					if (mappedRoomList && roomFloor && roomFloor.val != null) {
						for (const mappedRoom in mappedRoomList) {
							const roomState = await this.adapter.getStateAsync(`Devices.${duid}.floors.${roomFloor.val}.${mappedRoomList[mappedRoom][0]}`);
							if (roomState && roomState.val) {
								roomList.segments.push(mappedRoomList[mappedRoom][0]);
							}
						}
					}
					const cleanCount = await this.adapter.getStateAsync(`Devices.${duid}.floors.cleanCount`);
					roomList["repeat"] = typeof cleanCount?.val === "number" ? cleanCount.val : 1;
					const result = await this.sendRequest(duid, "app_segment_clean", [roomList], { priority });
					this.adapter.log.debug(`app_segment_clean with roomIDs: ${JSON.stringify(roomList)} result: ${result}`);
					this.adapter.setState(`Devices.${duid}.floors.cleanCount`, { val: 1, ack: true });
					break;
				}
				case "reset_consumable":
					await this.sendRequest(duid, parameter, [value], { priority });
					this.adapter.log.info(`Consumable ${parameter} successfully reset.`);
					break;
				case "app_set_dryer_status": {
					const result = await this.sendRequest(duid, parameter, JSON.parse(value), { priority });
					this.adapter.log.debug(`Command: ${parameter} result: ${result}`);
					break;
				}
				case "app_goto_target":
				case "app_zoned_clean": {
					const result = await this.sendRequest(duid, parameter, value, { priority });
					this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(value)} result: ${result}`);
					break;
				}
				case "set_water_box_distance_off": {
					const mappedValue = ((value - 1) / (30 - 1)) * (60 - 205) + 205;
					const parameterValue = { distance_off: mappedValue };
					const result = await this.sendRequest(duid, parameter, parameterValue, { priority });
					this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(parameterValue)} result: ${result}`);
					break;
				}
				default:
					if (value && typeof value !== "boolean") {
						let valueToSend = value;
						const valueType = typeof value;
						if (valueType === "string") {
							valueToSend = await JSON.parse(value);
						} else if (valueType === "number") {
							valueToSend = [value];
						}
						const result = await this.sendRequest(duid, parameter, valueToSend, { priority });
						this.adapter.log.debug(`Command: ${parameter} with value: ${JSON.stringify(value)} result: ${result}`);
						const getCommand = parameter.replace("set", "get");
						await this.getParameter(handler, duid, getCommand, []);
					} else {
						const result = await this.sendRequest(duid, parameter, undefined, { priority });
						this.adapter.log.debug(`Command: ${parameter} result: ${result}`);
					}
			}
		} catch (error) {
			this.adapter.catchError(error, parameter, duid);
		}
	}

	async getMap(handler: BaseDeviceFeatures, duid: string) {
		if (this.adapter.config.enable_map_creation) {
			this.adapter.log.debug(`Requesting new map for ${duid}`);
			try {
				const mapBuf = await this.sendRequest(duid, "get_map_v1", [], { priority: 0 });

				if (!Buffer.isBuffer(mapBuf)) {
					this.adapter.log.warn(`[getMap] Received non-buffer data (e.g. 'retry' or 'ok'): ${JSON.stringify(mapBuf)}`);
					return;
				}

				const mappedRooms = await this.getParameter(handler, duid, "get_room_mapping", []);
				const parsedData = (await this.mapParser.parsedata(mapBuf, { isHistoryMap: false })) as ParsedMapData;

				if (parsedData?.metaData) {
					this.adapter.log.info(`[getMap] Parsed LIVE map. MapIndex (Floor): ${parsedData.metaData.map_index}, Segments: ${parsedData.IMAGE?.segments?.id?.length || 0}`);
				} else {
					this.adapter.log.warn(`[getMap] Live map was parsed but contains no metaData.`);
				}

				const selectedMap = await this.getSelectedMap(duid);

				// Restore the check, as it was in the original code
				if (selectedMap != null) {
					// This log is important (as noted in your old code)
					this.adapter.log.debug(`Generating map for selected map ${selectedMap} for duid ${duid}`);

					if (!parsedData || !parsedData.IMAGE || !parsedData.IMAGE.dimensions) {
						this.adapter.log.warn(`[getMap] Skipping map generation for ${duid}: Parsed data is invalid or missing IMAGE block.`);
						return;
					}

					const dims = parsedData.IMAGE.dimensions;
					this.adapter.log.debug(`[getMap] Calling canvasMap for ${duid} with dimensions: w=${dims.width}, h=${dims.height}`);

					// Check for invalid dimensions that cause canvas crashes
					if (dims.width <= 0 || dims.height <= 0) {
						this.adapter.log.warn(`[getMap] Skipping map generation for ${duid}: Invalid map dimensions (w=${dims.width}, h=${dims.height}). Map is likely empty.`);
						return;
					}

					const [mapBase64, mapBase64Truncated] = await this.mapCreator.canvasMap(parsedData, {
						selectedMap: selectedMap,
						mappedRooms: mappedRooms,
					});

					await this.adapter.ensureFolder(`Devices.${duid}.map`);
					await this.adapter.ensureState(`Devices.${duid}.map.mapData`, { name: "Map Data JSON", type: "string", role: "json" });
					await this.adapter.ensureState(`Devices.${duid}.map.mapBase64`, { name: "Map Image (Base64)", type: "string", role: "text.png" });
					await this.adapter.ensureState(`Devices.${duid}.map.mapBase64Truncated`, { name: "Map Image (Base64 Truncated)", type: "string", role: "text.png" });

					await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapData`, { val: JSON.stringify(parsedData), ack: true });
					await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64`, { val: mapBase64, ack: true });
					await this.adapter.setStateChangedAsync(`Devices.${duid}.map.mapBase64Truncated`, { val: mapBase64Truncated, ack: true });
				} else {
					this.adapter.log.warn(`[getMap] Skipping map generation for ${duid} because selectedMap is null. (map_status state not yet available?)`);
				}
			} catch (error: any) {
				this.adapter.log.error(`Error getting map for ${duid}: ${error?.stack || error}`);
			}
		}
	}

	// --- Helpers & Core Logic ---

	isCleaning(duid: string) {
		if (!duid) {
			this.adapter.log.error("duid parameter missing on function isCleaning");
			return false;
		}
		if (!this.cached_get_status_value[duid]) return false;
		const cleaningState = this.cached_get_status_value[duid].state;
		switch (cleaningState) {
			case 4:
			case 5:
			case 6:
			case 7:
			case 11:
			case 15:
			case 16:
			case 17:
			case 18:
			case 26:
				return true;
			default:
				return false;
		}
	}

	/**
	 * Gets the currently selected map ID (floor) from the ioBroker state.
	 * This is more robust than relying on the cache, which might not be initialized.
	 * @param duid The device DUID
	 * @returns The map ID (number) or null if not found.
	 */
	async getSelectedMap(duid: string): Promise<number | null> {
		if (!duid) {
			this.adapter.log.error("duid parameter missing on function getSelectedMap");
			return null;
		}

		try {
			// Read the map_status from the persistent ioBroker state
			const mapStatusState = await this.adapter.getStateAsync(`Devices.${duid}.deviceStatus.map_status`);

			// Check if the state exists and has a valid value
			if (mapStatusState && mapStatusState.val !== null && mapStatusState.val !== undefined) {
				const mapStatus = Number(mapStatusState.val);

				// Bitwise right shift to obtain the selected map
				return mapStatus >> 2;
			} else {
				this.adapter.log.warn(`[getSelectedMap] Could not read map_status state for ${duid}. State is null or undefined. Map generation might be skipped.`);
				return null;
			}
		} catch (error: any) {
			this.adapter.log.error(`[getSelectedMap] Error reading state for ${duid}: ${error.message}`);
			return null;
		}
	}

	isCloudRequest(duid: string, method: string) {
		const cloudOnlyMethods = ["get_map_v1", "get_clean_record_map", "get_photo", "get_network_info"];
		return cloudOnlyMethods.includes(method) || this.adapter.requestsHandler.isCloudDevice(duid);
	}

	async sendRequest(duid: string, method: string, params: Array<any> | Object | undefined, options: { priority?: number } = {}) {
		const queue = this.getQueue(duid);
		return queue.add(() => this._performRequest(duid, method, params), {
			priority: options.priority || 0,
		});
	}

	private async _performRequest(duid: string, method: string, params: any) {
		const remoteConnection = await this.isCloudDevice(duid);
		let protocol = 101;
		const version = await this.adapter.getDeviceProtocolVersion(duid);

		this.idCounter = this.idCounter > 9999 ? 1 : this.idCounter + 1;
		const messageID = method === "get_photo" ? ((this.idCounter - 1) % 256) + 1 : this.idCounter;
		const timestamp = Math.floor(Date.now() / 1000);

		if (!this.isCloudRequest(duid, method)) {
			protocol = 4;
		}

		const payload = await this.messageParser.buildPayload(duid, protocol, messageID, method, params, version);
		const roborockMessage = await this.messageParser.buildRoborockMessage(duid, protocol, timestamp, payload, version);

		const mqttConnectionState = this.adapter.mqtt_api.isConnected();
		const localConnectionState = this.adapter.local_api.isConnected(duid);

		if (!roborockMessage) {
			this.adapter.catchError("Failed to build buildRoborockMessage!", "function sendRequest", duid);
			return Promise.reject("Failed to build buildRoborockMessage!");
		}

		if (version == "A01") {
			this.adapter.mqtt_api.sendMessage(duid, roborockMessage);
			return Promise.resolve();
		}

		this.adapter.log.debug(`duid: ${duid}, mqtt: ${mqttConnectionState}, local: ${localConnectionState}, remote: ${remoteConnection}`);

		return new Promise((resolve, reject) => {
			if (!mqttConnectionState && remoteConnection) {
				this.adapter.pendingRequests.delete(messageID);
				const errorMsg = `Cloud connection not available. Not sending for method ${method} request!`;
				this.adapter.log.debug(errorMsg);
				return reject(new Error(errorMsg));
			} else if (!localConnectionState && !mqttConnectionState && method != "get_network_info") {
				this.adapter.pendingRequests.delete(messageID);
				const errorMsg = `Adapter locally or remotely not connected to robot ${duid}. Sending request for ${method} not possible!`;
				this.adapter.log.debug(errorMsg);
				return reject(new Error(errorMsg));
			} else {
				const timeout = this.adapter.setTimeout(() => {
					this.adapter.pendingRequests.delete(messageID);
					this.adapter.local_api.clearChunkBuffer(duid);
					if (remoteConnection) {
						reject(new Error(`Cloud request with id ${messageID} and method ${method} timed out after 30 seconds.`));
					} else {
						reject(new Error(`Local request with id ${messageID} and method ${method} timed out after 30 seconds.`));
					}
				}, REQUEST_TIMEOUT);

				this.adapter.pendingRequests.set(messageID, { method, resolve, reject, timeout });
				if (this.isCloudRequest(duid, method) || !localConnectionState) {
					this.adapter.mqtt_api.sendMessage(duid, roborockMessage);
					this.adapter.log.debug(`Sent payload for ${duid} with ${payload} using cloud connection using version ${version}`);
				} else {
					const lengthBuffer = Buffer.alloc(4);
					lengthBuffer.writeUInt32BE(roborockMessage.length, 0);
					const fullMessage = Buffer.concat([lengthBuffer, roborockMessage]);
					this.adapter.local_api.sendMessage(duid, fullMessage);
					this.adapter.log.debug(`Sent payload for ${duid} with ${payload} using local connection using version ${version}`);
				}
			}
		});
	}

	resolvePendingRequest(id, result, protocol) {
		const entry = this.adapter.pendingRequests?.get(id);
		if (entry) {
			if (entry.timeout) this.adapter.clearTimeout(entry.timeout);
			this.adapter.pendingRequests.delete(id);
			entry.resolve(result);
			this.adapter.log.debug(`Successfully resolved request id ${id} using protocol: ${protocol}. Size of message queue: ${this.adapter.pendingRequests.size}`);
		}
	}

	async isCloudDevice(duid) {
		const receivedDevices = this.adapter.http_api.getReceivedDevices();
		const sharedDevice = receivedDevices.find((device) => device.duid == duid);
		const cloudDevice = this.adapter.local_api.cloudDevices.has(duid);
		return !!(sharedDevice || cloudDevice);
	}

	async getConnector(duid) {
		const isRemote = await this.isCloudDevice(duid);
		if (isRemote) return this.adapter.mqtt_api;
		return this.adapter.local_api;
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
		zlib.gunzip(buffer, (err, result) => {
			if (err) callback(err);
			else callback(null, result);
		});
	}

	private unzipBufferAsync(buffer: Buffer): Promise<Buffer> {
		return new Promise((resolve, reject) => {
			this.unzipBuffer(buffer, (error, photoData) => {
				if (error) reject(error);
				else resolve(photoData);
			});
		});
	}

	isGZIP(buffer) {
		if (buffer.length < 2) return false;
		if (buffer[0] == 31 && buffer[1] == 139) return true;
		return false;
	}

	extractPhoto(buffer) {
		if (buffer.length < 10) return false;
		if (buffer[26] == 74 && buffer[27] == 70 && buffer[28] == 73 && buffer[29] == 70) {
			return buffer.slice(20);
		} else if (buffer[42] == 74 && buffer[43] == 70 && buffer[44] == 73 && buffer[45] == 70) {
			return buffer.slice(36);
		}
		return false;
	}

	clearQueue() {
		this.adapter.local_api.clearLocalDevicedTimeout();
		this.adapter.mqtt_api.clearIntervals();

		// Clear map-based queues
		this.deviceQueues.forEach((q) => q.clear());
		this.deviceQueues.clear();

		// Clear pending request timeouts
		this.adapter.pendingRequests.forEach((req) => {
			if (req.timeout) this.adapter.clearTimeout(req.timeout);
		});
		this.adapter.pendingRequests.clear();
	}
}
