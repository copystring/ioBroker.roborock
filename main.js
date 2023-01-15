"use strict";

/*
 * Created with @iobroker/create-adapter v2.3.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");

const axios = require("axios");
const crypto = require("crypto");
const EventEmitter = require("node:events");

const roborock_mqtt_connector = require("./lib/roborock_mqtt_connector").roborock_mqtt_connector;
const vacuum_class = require("./lib/vacuum").vacuum;
const rr = new EventEmitter();

let vacuum;
let rr_mqtt_connector;

const firmwareFeatureList = {101:"unknown", 102: "unknown", 103: "Clean Time Supported", 104:"unknown", 105:"unknown", 106:"unknown", 107:"unknown", 108:"unknown", 109:"unknown", 110:"unknown", 111:"Supports FSEndPoint", 112:"Supports AutoSplitSegments", 113:"Supports Delete Map feature", 114:"Supports OrderSegmentClean", 115:"Spot Clean", 116:"Map Segment Supported", 117:"unknown", 118:"unknown", 119:"Supports Led Status Switch", 120:"Multi Floor Supported", 121:"unknown", 122:"Supports FetchTimer Summary", 123:"Orders Clean Supported", 124:"Analysis Supported", 125:"Remote Supported", 126:"unknown", 127:"unknown", 128:"unknown", 129:"unknown"};

class Roborock extends utils.Adapter {

	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "roborock",
		});
		this.on("ready", this.onReady.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("objectChange", this.onObjectChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		const username = this.config.username;
		const password = this.config.password;

		if ((!username) || (!password)) {
			this.log.error("Username or password missing!");
			return;
		}

		vacuum = new vacuum_class(this, rr);

		// disabled for now. I don't know how to figure out a clean way to categorize received data which was not sent by this adapter.
		// eg "dps debug: {"id":48,"result":{"ssid":"SuperRouter2G","ip":"192.168.1.100","mac":"b0:4a:39:37:a6:4a","bssid":"ce:40:d0:49:9a:bc","rssi":0}}"
		// is networkdata but roborock doesn't seem to provide the information if this ist networkdata or something else.
		//this.setupEmitter();

		// Initialize the login API (which is needed to get access to the real API).
		const loginApi = axios.create({
			baseURL: "https://euiot.roborock.com",
			headers: {
				"header_clientid": crypto.createHash("md5").update(username).update("should_be_unique").digest().toString("base64"),
			},
		});
		// api/v1/getUrlByEmail(email = ...)
		// Try to load existing userdata.
		const userdataObj = await this.getStateAsync("UserData");
		let userdata;
		if ((userdataObj) && (typeof(userdataObj) != "undefined")) {
			userdata = JSON.parse(userdataObj.val);
		} else {
			// try log in.
			userdata = await loginApi.post("api/v1/login", new URLSearchParams({username: username, password: password, needtwostepauth: "false"}).toString()).then(res => res.data.data);

			// Alternative without password:
			// await loginApi.post("api/v1/sendEmailCode", new url.URLSearchParams({username: username, type: "auth"}).toString()).then(res => res.data);
			// // ... get code from user ...
			// userdata = await loginApi.post("api/v1/loginWithCode", new url.URLSearchParams({username: username, verifycode: code, verifycodetype: "AUTH_EMAIL_CODE"}).toString()).then(res => res.data.data);

			this.log.debug("UserData: " + userdata);
			if (userdata == null) {
				this.deleteStateAsync("HomeData");
				this.deleteStateAsync("UserData");
				this.log.error("Error! Failed to login. Maybe wrong username or password?");
				return;
			}

			// UserData
			await this.setObjectNotExistsAsync("UserData", {
				type: "state",
				common: {
					name: "UserData string",
					type: "string",
					role: "value",
					read: true,
					write: false,
				},
				native: {},
			});
			await this.setStateAsync("UserData", { val: JSON.stringify(userdata), ack: true });
		}

		try {
			loginApi.defaults.headers.common["Authorization"] = userdata.token;
		}
		catch (error) {
			this.log.error("Failed to login. Most likely wrong token! Deleting HomeData and UserData. Try again! " + error);
			this.deleteStateAsync("HomeData");
			this.deleteStateAsync("UserData");
		}
		const rriot = userdata.rriot;

		// Initialize the real API.
		const api = axios.create({
			baseURL: rriot.r.a,
		});
		api.interceptors.request.use(config => {
			const timestamp = Math.floor(Date.now() / 1000);
			const nonce = crypto.randomBytes(6).toString("base64").substring(0, 6).replace("+", "X").replace("/", "Y");
			const url = new URL(api.getUri(config));
			const prestr = [rriot.u, rriot.s, nonce, timestamp, md5hex(url.pathname), /*queryparams*/ "", /*body*/ ""].join(":");
			const mac = crypto.createHmac("sha256", rriot.h).update(prestr).digest("base64");
			config.headers.common["Authorization"] = `Hawk id="${rriot.u}", s="${rriot.s}", ts="${timestamp}", nonce="${nonce}", mac="${mac}"`;
			return config;
		});

		// Get home details.
		const homeId = await loginApi.get("api/v1/getHomeDetail").then(res => res.data.data.rrHomeId);

		// HomeData
		await this.setObjectNotExistsAsync("HomeData", {
			type: "state",
			common: {
				name: "HomeData string",
				type: "string",
				role: "value",
				read: true,
				write: false,
			},
			native: {},
		});
		// Try to load existing HomeData.
		const homedataObj = await this.getStateAsync("HomeData");
		let homedata;
		if (homedataObj) {
			homedata = JSON.parse(homedataObj.val);
		}
		else {
			// Log in.
			homedata = await api.get(`user/homes/${homeId}`).then(res => res.data.result);
			await this.setStateAsync("HomeData", { val: JSON.stringify(homedata), ack: true });
		}

		rr_mqtt_connector = new roborock_mqtt_connector(this, rr);
		rr_mqtt_connector.initUser(userdata, homedata);
		rr_mqtt_connector.initMQTT_Subscribe();
		rr_mqtt_connector.initMQTT_Message(rr);

		await this.setObjectNotExistsAsync("Devices", {
			type: "folder",
			common: {
				name: "Devices",
			},
			native: {},
		});

		// create devices
		const devices = homedata.devices;
		for (const device in devices){
			const duid = devices[device].duid;

			// create device object
			await this.setObjectNotExistsAsync("Devices." + duid, {
				type: "device",
				common: {
					name: devices[device].name,
				},
				native: {},
			});

			vacuum.getVacuumStatus(duid, devices[device]);

			vacuum.getMopMode(duid);

			vacuum.getConsumables(duid);

			vacuum.getCleanSummary(duid);

			vacuum.getNetworkInfo(duid);

			vacuum.getFirmwareFeatures(duid, firmwareFeatureList);

			vacuum.getWaterBoxCustomMode(duid);

			// create rooms
			await this.setObjectNotExistsAsync("Rooms", {
				type: "folder",
				common: {
					name: "Rooms",
				},
				native: {},
			});

			vacuum.getRoomData(homedata);

			await this.setObjectNotExistsAsync("Devices." + duid + ".commands.start", {
				type: "state",
				common: {
					name: "Start vacuum",
					type: "boolean",
					def: false,
					role: "indicator",
					read: true,
					write: true,
				},
				native: {
				},
			});

			await this.setObjectNotExistsAsync("Devices." + duid + ".commands.stop", {
				type: "state",
				common: {
					name: "Stop vacuum",
					type: "boolean",
					def: false,
					role: "indicator",
					read: true,
					write: true,
				},
				native: {},
			});

			await this.setObjectNotExistsAsync("Devices." + duid + ".commands.pause", {
				type: "state",
				common: {
					name: "Pause vacuum",
					type: "boolean",
					def: false,
					role: "indicator",
					read: true,
					write: true,
				},
				native: {},
			});

			await this.setObjectNotExistsAsync("Devices." + duid + ".commands.charge", {
				type: "state",
				common: {
					name: "Charge vacuum",
					type: "boolean",
					def: false,
					role: "indicator",
					read: true,
					write: true,
				},
				native: {},
			});

			await this.setObjectNotExistsAsync("Devices." + duid + ".commands.set_mop_mode", {
				type: "state",
				common: {
					name: "Change mop mode",
					type: "number",
					def: 300,
					role: "indicator",
					read: true,
					write: true,
					"states": {
						"300": "Standard",
						"301": "Deep",
						"302": "Deep+"
					},
				},
				native: {},
			});

			await this.setObjectNotExistsAsync("Devices." + duid + ".commands.set_water_box_custom_mode", {
				type: "state",
				common: {
					name: "Change water box custom mode",
					type: "number",
					def: 200,
					role: "indicator",
					read: true,
					write: true,
					"states": {
						"200": "Off",
						"201": "Low",
						"202": "Medium",
						"203": "High",
						"204": "Customize (Auto)",
						"207": "Custom (Levels)"
					},
				},
				native: {},
			});


			setInterval( () => {

				this.log.debug("Latest data requested");

				vacuum.getVacuumStatus(duid, devices[device]);

				vacuum.getMopMode(duid);

				vacuum.getConsumables(duid);

				vacuum.getCleanSummary(duid);

				vacuum.getNetworkInfo(duid);

				vacuum.getFirmwareFeatures(duid, firmwareFeatureList);

				vacuum.getWaterBoxCustomMode(duid);
			}, this.config.updateInterval*1000);


			// sub to all commands & deviceConfig
			this.subscribeStates("Devices." + duid + ".commands.*");
		}
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			// Here you must clear all timeouts or intervals that may still be active
			// clearTimeout(timeout1);
			// clearTimeout(timeout2);
			// ...
			// clearInterval(interval1);

			callback();
		} catch (e) {
			callback();
		}
	}

	// If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
	// You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
	// /**
	//  * Is called if a subscribed object changes
	//  * @param {string} id
	//  * @param {ioBroker.Object | null | undefined} obj
	//  */
	// onObjectChange(id, obj) {
	// 	if (obj) {
	// 		// The object was changed
	// 		this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
	// 	} else {
	// 		// The object was deleted
	// 		this.log.info(`object ${id} deleted`);
	// 	}
	// }

	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */
	onStateChange(id, state) {
		if (state) {
			const duid = id.substring(19, 41);
			const command = id.split(".").slice(-1)[0];

			if (state.val == true) {
				switch (command) {
					case "start":
						this.log.debug("Start vacuum");
						vacuum.startVacuum(duid);
						break;

					case "stop":
						this.log.debug("Stop vacuum");
						vacuum.stopVacuum(duid);
						break;

					case "pause":
						this.log.debug("Pause vacuum");
						vacuum.pauseVacuum(duid);
						break;

					case "charge":
						this.log.debug("Charge vacuum");
						vacuum.chargeVacuum(duid);
						break;

					default:
				}
				setTimeout(() =>{
					this.setStateAsync(id, false);
				}, 1000);
			}
			else {
				switch (command) {
					case "set_mop_mode":
						this.log.debug("Changed mop mode to: " + state.val);
						vacuum.changeMopMode(duid, state.val);
						break;

					case "set_water_box_custom_mode":
						this.log.debug("Changed water box custom mode to: " + state.val);
						vacuum.changeWaterBoxCustomMode(duid, state.val);
						break;

					default:
				}
			}
		} else {
			this.log.info("Error! Missing state onChangeState!");
		}
	}

	// If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
	// /**
	//  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	//  * Using this method requires "common.messagebox" property to be set to true in io-package.json
	//  * @param {ioBroker.Message} obj
	//  */
	// onMessage(obj) {
	// 	if (typeof obj === "object" && obj.message) {
	// 		if (obj.command === "send") {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info("send command");

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
	// 		}
	// 	}
	// }

	// respond to messages this adapter did not send itself
	setupEmitter() {
		rr.on("response.102", async (deviceId, id, result) => {
			let attributeCategory;
			let attribute;
			let value;
			const firmwareAttributes = {};
			switch (id) {
				case 1:
					attributeCategory = "deviceConfig";
					attribute = "mop_mode";
					value = result;
					break;

				case 2:
					attributeCategory = "consumables";
					attribute = result;
					break;
				case 3:
					attributeCategory = "networkInfo";
					attribute = result;
					break;

				case 4:
					attributeCategory = "cleaningInfo";
					attribute = result;
					break;

				case 5:
					attributeCategory = "firmwareFeatures";
					for (const featureID in result)
					{
						firmwareAttributes[featureID] = result[featureID].toString();
					}
					attribute = firmwareAttributes;
					break;

				default:
			}

			if (typeof(attributeCategory) != "undefined")
			{
				this.log.debug("Debug attributeCategory: Devices." + deviceId + "." + attributeCategory + ": " + JSON.stringify(attribute));
				if (typeof(attribute) == "string") {
					this.setStateAsync("Devices." + deviceId + "." + attributeCategory + "." + attribute, value);
				}
				else if (typeof(attribute) == "object") {
					for (const objectAttribute in attribute) {
						if (id == 5)
						{
							const featureID = attribute[objectAttribute];
							this.setStateAsync("Devices." + deviceId + ".firmwareFeatures." + objectAttribute, { val: firmwareFeatureList[featureID], ack: true });
						}
						else if (objectAttribute == "records")
						{
							this.log.debug("Cleaning records found!!!");
							for (const cleaningRecord in attribute["records"])
							{
								rr_mqtt_connector.sendRequest(deviceId, rr, "get_clean_record", [attribute["records"][cleaningRecord]]).then(async cleaningRecordAttributes => {
									cleaningRecordAttributes = cleaningRecordAttributes[0];
									for (const cleaningRecordAttribute in cleaningRecordAttributes) {
										// this.log.debug("cleaning record value helper: " + JSON.stringify(cleaningRecord));
										// let cleaningRecordAttribute_val = attribute["records"][cleaningRecord][cleaningRecordAttribute];
										// this.log.debug("cleaningRecordAttribute_val: " + JSON.stringify(cleaningRecordAttribute_val));
										let cleaningRecordAttribute_val = cleaningRecordAttributes[cleaningRecordAttribute];
										let cleaningRecordAttributeType;
										let cleaningRecordAttributeName;
										let cleaningRecordAttributeUnit = "";

										switch (cleaningRecordAttribute) {
											case "begin":
												cleaningRecordAttributeName = "Start cleaning time";
												cleaningRecordAttributeType = "string";
												cleaningRecordAttribute_val = new Date(attribute["records"][cleaningRecord] * 1000).toString();
												break;

											case "end":
												cleaningRecordAttributeName = "End cleaning time";
												cleaningRecordAttributeType = "string";
												cleaningRecordAttribute_val = new Date(attribute["records"][cleaningRecord] * 1000).toString();
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

										await this.setObjectNotExistsAsync("Devices." + deviceId + ".cleaningInfo.Records." + cleaningRecord + "." + cleaningRecordAttribute, {
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
										// this.adapter.setStateAsync("Devices." + duid + ".cleaningInfo.Records." + cleaningRecord + "." + cleaningRecordAttribute, { val: cleaningRecordAttribute_val, ack: true });
										this.setStateAsync("Devices." + deviceId + ".cleaningInfo.Records." + cleaningRecord + "." + cleaningRecordAttribute, { val: cleaningRecordAttribute_val, ack: true });
									}
								});
							}
						}
						else  {
							// this.log.debug("Received new data for " + attributeCategory + " with value: " + objectAttribute);
							this.setStateAsync("Devices." + deviceId + "." + attributeCategory + "." + objectAttribute, { val: attribute[objectAttribute], ack: true });
						}
					}
				}
				else if (typeof(attribute) != "undefined") {
					this.log.error("Unknown attribute: " + attribute + " with type: " + typeof(attribute));
				}
			}

			// this.log.debug("Emitter response.102");
			// this.log.debug(deviceId);
			// this.log.debug(id);
			// this.log.debug(result);
		});
	}

}

if (require.main !== module) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Roborock(options);
} else {
	// otherwise start the instance directly
	new Roborock();
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function md5hex(str) {
	return crypto.createHash("md5").update(str).digest("hex");
}

// function md5bin(str) {
// 	return crypto.createHash("md5").update(str).digest();
// }
