"use strict";


const roborock_mqtt_connector = require("./roborock_mqtt_connector").roborock_mqtt_connector;
const rr_mqtt_connector = new roborock_mqtt_connector(this);
let rr;

class vacuum {
	constructor(adapter, rrEmitter) {
		this.adapter = adapter;
		rr = rrEmitter;
	}

	async startVacuum(duid) {
		rr_mqtt_connector.sendRequest(duid, rr, "app_start", []).then(result => {
			this.adapter.log.debug("app_start:" + result);
		});
	}

	async stopVacuum(duid) {
		rr_mqtt_connector.sendRequest(duid, rr, "app_stop", []).then(result => {
			this.adapter.log.debug("app_stop: " + result);
		});
	}

	async spotVacuum(duid) {
		rr_mqtt_connector.sendRequest(duid, rr, "app_spot", []).then(result => {
			this.adapter.log.debug("app_spot: " + result);
		});
	}

	async pauseVacuum(duid) {
		rr_mqtt_connector.sendRequest(duid, rr, "app_pause", []).then(result => {
			this.adapter.log.debug("app_pause: " + result);
		});
	}

	async chargeVacuum(duid) {
		rr_mqtt_connector.sendRequest(duid, rr, "app_charge", []).then(result => {
			this.adapter.log.debug("app_charge: " + result);
		});
	}

	async changeMopMode(duid, mode) {
		rr_mqtt_connector.sendRequest(duid, rr, "set_mop_mode", [mode]).then(result => {
			this.adapter.log.debug("mop_mode: " + result);
			this.getMopMode(duid);
		});
	}

	async getMopMode(duid)
	{
		await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".deviceConfig.mop_mode", {
			type: "state",
			common: {
				type: "number",
				name: "Mop Route",
				role: "value",
				read: true,
				write: false,
				"states": {
					"300": "Standard",
					"301": "Deep",
					"302": "Deep+"
				},
			},
			native: {},
		});
		rr_mqtt_connector.sendRequest(duid, rr,"get_mop_mode", []).then(attribute_val => {
			this.adapter.setStateAsync("Devices." + duid + ".deviceConfig.mop_mode", { val: attribute_val[0], ack: true });
		});
	}

	async getNetworkInfo(duid) {
		rr_mqtt_connector.sendRequest(duid, rr, "get_network_info", []).then(async networkAttributes => {
			for (const networkAttribute in networkAttributes) {
				const networkAttribute_val = networkAttributes[networkAttribute];
				let networkAttributeType;
				let networkAttributeName;

				switch (networkAttribute) {
					case "ssid":
						networkAttributeType = "string";
						networkAttributeName = "Connected WiFi";
						break;

					case "ip":
						networkAttributeType = "string";
						networkAttributeName = "IP adress of device";
						break;

					case "mac":
						networkAttributeType = "string";
						networkAttributeName = "MAC adress of device";
						break;

					case "bssid":
						networkAttributeType = "string";
						networkAttributeName = "Basic Service Set Identifier";
						break;

					case "rssi":
						networkAttributeType = "number";
						networkAttributeName = "Received Signal Strength Indicator";
						break;
					default:
				}

				await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".networkInfo." + networkAttribute, {
					type: "state",
					common: {
						type: networkAttributeType,
						name: networkAttributeName,
						role: "value",
						read: true,
						write: false,
					},
					native: {},
				});
				this.adapter.setStateAsync("Devices." + duid + ".networkInfo." + networkAttribute, { val: networkAttribute_val, ack: true });
			}
		});
	}

	async getVacuumStatus(duid, device) {
		for (const attribute in device) {
			const attribute_val = device[attribute];
			const type = typeof(attribute_val);

			if (type == "object" && attribute_val != null) {
				for (const attribute_in_object in device[attribute]) {
					const attribute_val_in_object = device[attribute][attribute_in_object];
					const type_in_object = typeof(attribute_val_in_object);

					let attributeName = "";
					let attributeUnit = "";
					let attributeStates = {};
					let attributeType;
					switch (attribute_in_object) {

						case "water_box_mode":
							attributeName = "Scrub Intensity";
							attributeStates = {"201": "Mild","202": "Moderate","203": "Intense"};
							attributeType = "number";
							break;

						case "battery":
							attributeName = "Battery percentage";
							attributeUnit = "%";
							attributeType = "number";
							break;

						case "fan_power":
							attributeName = "Suction Power";
							attributeStates =  {"101": "Quiet", "102": "Balanced", "103": "Turbo", "104": "Max"};
							attributeType = "number";
							break;

						case "filter_life":
							attributeName = "Remaining air filter life";
							attributeType = "number";
							attributeUnit = "%";
							break;

						case "main_brush_life":
							attributeName = "Remaining main brush life";
							attributeType = "number";
							attributeUnit = "%";
							break;

						case "side_brush_life":
							attributeName = "Remaining side brush life";
							attributeType = "number";
							attributeUnit = "%";
							break;

						case "state":
							attributeName = "Device state";
							attributeType = "number";
							break;

						default:
							attributeName = "Unknown value!";
							attributeType = type_in_object;
					}


					await this.adapter.setObjectNotExistsAsync("Devices." + duid + "." + attribute + "." + attribute_in_object, {
						type: "state",
						common: {
							type: attributeType,
							name: attributeName,
							role: "value",
							read: true,
							write: false,
							unit: attributeUnit,
							"states": attributeStates,
						},
						native: {},
					});
					await this.adapter.setStateAsync("Devices." + duid + "." + attribute + "." + attribute_in_object, { val: parseInt(attribute_val_in_object), ack: true });
				}
			}
			else {
				const typeOfAttribute = typeof(attribute);
				await this.adapter.setObjectNotExistsAsync("Devices." + duid + "." + attribute, {
					type: "state",
					common: {
						name: "Unknown attribute",
						type: typeOfAttribute,
						role: "value",
						read: true,
						write: false,
					},
					native: {},
				});
				await this.adapter.setStateAsync("Devices." + duid + "." + attribute, { val: attribute_val, ack: true });
			}

		}
	}

	async getConsumables(duid) {
		await rr_mqtt_connector.sendRequest(duid, rr, "get_consumable", []).then(async consumables => {
			consumables = consumables[0];
			for (const consumable in consumables) {
				let consumableName = "";
				const consumable_val = consumables[consumable];

				switch(consumable) {
					case "main_brush_work_time":
						consumableName = "Main brush used hours";
						break;
					case "side_brush_work_time":
						consumableName = "Side brush used hours";
						break;
					case "filter_work_time":
						consumableName = "Filter used hours";
						break;
					case "filter_element_work_time":
						consumableName = "Filter element used hours";
						break;
					case "sensor_dirty_time":
						consumableName = "Sensors time until cleaning";
						break;
					case "dust_collection_work_times":
						consumableName = "Dust collection hours";
						break;

					default:
						consumableName = "Unknown consumable";
				}

				await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".consumables." + consumable, {
					type: "state",
					common: {
						type: "number",
						name: consumableName,
						role: "value",
						read: true,
						write: false,
						unit: "h",
					},
					native: {},
				});
				this.adapter.setStateAsync("Devices." + duid + ".consumables." + consumable, { val: Math.round(consumable_val/60/60), ack: true });
			}
		});
	}

	async getCleanSummary(duid) {
		rr_mqtt_connector.sendRequest(duid, rr, "get_clean_summary", []).then(async cleaningAttributes => {

			let cleaningAttributeName;
			let cleaningAttributeType;
			let cleaningAttributeUnit = "";
			for (const cleaningAttribute in cleaningAttributes)
			{
				let cleaningAttribute_val = cleaningAttributes[cleaningAttribute];
				switch (cleaningAttribute) {
					case "clean_time":
						cleaningAttributeName = "Total Time";
						cleaningAttributeType = "number";
						cleaningAttributeUnit = "h";
						cleaningAttribute_val = Math.round(cleaningAttribute_val/60/60);
						break;

					case "clean_area":
						cleaningAttributeName = "Total Area";
						cleaningAttributeType = "number";
						cleaningAttributeUnit = "m³";
						cleaningAttribute_val = Math.round(cleaningAttribute_val/1000/1000);
						break;

					case "clean_count":
						cleaningAttributeName = "Cycles";
						cleaningAttributeType = "number";
						break;

					case "dust_collection_count":
						cleaningAttributeName = "Times Dust Collected";
						cleaningAttributeType = "number";
						break;

					case "records":
						for (const cleaningRecord in cleaningAttributes["records"])
						{
							await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".cleaningInfo.Records." + cleaningRecord, {
								type: "folder",
								common: {
									name: new Date(cleaningAttributes["records"][cleaningRecord] * 1000),
								},
								native: {},
							});

							rr_mqtt_connector.sendRequest(duid, rr, "get_clean_record", [cleaningAttributes["records"][cleaningRecord]]).then(async cleaningRecordAttributes => {
								cleaningRecordAttributes = cleaningRecordAttributes[0];
								for (const cleaningRecordAttribute in cleaningRecordAttributes) {
									let cleaningRecordAttribute_val = cleaningRecordAttributes[cleaningRecordAttribute];
									let cleaningRecordAttributeType;
									let cleaningRecordAttributeName;
									let cleaningRecordAttributeUnit = "";

									switch (cleaningRecordAttribute) {
										case "begin":
											cleaningRecordAttributeName = "Start cleaning time";
											cleaningRecordAttributeType = "string";
											cleaningRecordAttribute_val = new Date(cleaningAttributes["records"][cleaningRecord] * 1000).toString();
											break;

										case "end":
											cleaningRecordAttributeName = "End cleaning time";
											cleaningRecordAttributeType = "string";
											cleaningRecordAttribute_val = new Date(cleaningAttributes["records"][cleaningRecord] * 1000).toString();
											break;

										case "duration":
											cleaningRecordAttributeName = "Duration cleaning time";
											cleaningRecordAttributeType = "number";
											cleaningRecordAttribute_val = Math.round(cleaningRecordAttribute_val/60);
											cleaningRecordAttributeUnit = "min";
											break;

										case "area":
											cleaningRecordAttributeName = "Cleaning Area";
											cleaningRecordAttributeType = "number";
											cleaningRecordAttribute_val = Math.round(cleaningRecordAttribute_val/1000/1000);
											cleaningRecordAttributeUnit = "m³";
											break;

										case "error":
											cleaningRecordAttributeName = "Error Type";
											cleaningRecordAttributeType = "number";
											break;

										case "complete":
											cleaningRecordAttributeName = "Completion Type";
											cleaningRecordAttributeType = "number";
											break;

										case "start_type":
											cleaningRecordAttributeName = "Start Type";
											cleaningRecordAttributeType = "number";
											break;

										case "clean_type":
											cleaningRecordAttributeName = "Clean Type";
											cleaningRecordAttributeType = "number";
											break;

										case "finish_reason":
											cleaningRecordAttributeName = "Clean Finish Reason";
											cleaningRecordAttributeType = "number";
											break;

										case "dust_collection_status":
											cleaningRecordAttributeName = "Dust Collection Status";
											cleaningRecordAttributeType = "number";
											break;

										default:
									}

									await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".cleaningInfo.Records." + cleaningRecord + "." + cleaningRecordAttribute, {
										type: "state",
										common: {
											type: cleaningRecordAttributeType,
											name: cleaningRecordAttributeName,
											role: "value",
											read: true,
											write: false,
											unit: cleaningRecordAttributeUnit,
										},
										native: {},
									});
									this.adapter.setStateAsync("Devices." + duid + ".cleaningInfo.Records." + cleaningRecord + "." + cleaningRecordAttribute, { val: cleaningRecordAttribute_val, ack: true });
								}
							});
						}
						break;

					default:
				}

				if (cleaningAttribute != "records") {
					// this.adapter.log.debug("cleaningAttribute: " + cleaningAttribute);
					await this.adapter.setObjectNotExistsAsync("Devices." + duid + ".cleaningInfo." + cleaningAttribute, {
						type: "state",
						common: {
							name: cleaningAttributeName,
							type: cleaningAttributeType,
							role: "value",
							read: true,
							write: false,
							unit: cleaningAttributeUnit,
						},
						native: {},
					});
					this.adapter.setStateAsync("Devices." + duid + ".cleaningInfo." + cleaningAttribute, { val: cleaningAttribute_val, ack: true });
				}
			}
		});
	}

	async getFirmwareFeatures(duid, firmwareFeatureList) {
		this.adapter.log.debug("Firmware features request");
		rr_mqtt_connector.sendRequest(duid, rr, "get_fw_features", []).then(async firmwareFeatures => {
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
				this.adapter.setStateAsync("Devices." + duid + ".firmwareFeatures." + firmwareFeature, { val: firmwareFeatureList[featureID].toString(), ack: true });
			}
		});
	}

	async getRoomData(homedata){
		const rooms = homedata.rooms;
		for (const room in rooms){
			const roomID = rooms[room].id;
			const roomName = rooms[room].name;

			await this.adapter.setObjectNotExistsAsync("Rooms." + roomID, {
				type: "state",
				common: {
					//name: devices[device][attribute],
					type: "string",
					role: "value",
					read: true,
					write: false,
				},
				native: {},
			});
			await this.adapter.setStateAsync("Rooms." + roomID, { val: roomName, ack: true });
		}
	}
}

module.exports = {
	vacuum,
};
