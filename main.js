"use strict";

const utils = require("@iobroker/adapter-core");

const axios = require("axios").default;
const crypto = require("crypto");
const EventEmitter = require("node:events");
const websocket = require("ws");
const express = require("express");


const roborock_mqtt_connector = require("./lib/roborock_mqtt_connector").roborock_mqtt_connector;
const vacuum_class = require("./lib/vacuum").vacuum;
const rr = new EventEmitter();

let rr_mqtt_connector, socketServer, webserver;

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
		this.roomIDs = {};
		this.vacuums = {};
		this.socket = null;
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		this.sentryInstance = this.getPluginInstance("sentry");

		const username = this.config.username;
		const password = this.config.password;

		if ((!username) || (!password)) {
			this.log.error("Username or password missing!");
			return;
		}

		// create new clientID if it doesn't exist yet
		let clientID = "";
		const storedClientID = await this.getStateAsync("clientID");
		if (storedClientID && typeof (storedClientID) != "undefined") {
			clientID = storedClientID.val?.toString() ?? "";
		}
		else {
			await this.setObjectNotExistsAsync("clientID", {
				type: "state",
				common: {
					name: "Client ID",
					type: "string",
					role: "value",
					read: true,
					write: false,
				},
				native: {},
			});
			clientID = crypto.randomUUID();
			await this.setStateAsync("clientID", { val: clientID, ack: true });
		}

		// Initialize the login API (which is needed to get access to the real API).
		const loginApi = axios.create({
			baseURL: "https://euiot.roborock.com",
			headers: {
				"header_clientid": crypto.createHash("md5").update(username).update(clientID).digest().toString("base64"),
			},
		});
		// api/v1/getUrlByEmail(email = ...)

		// Try to load existing userdata.
		const userdataObj = await this.getStateAsync("UserData");
		let userdata;
		if (userdataObj && typeof (userdataObj) != "undefined") {
			userdata = JSON.parse(userdataObj.val?.toString() || "{}");
		} else {
			// try log in.
			userdata = await loginApi.post("api/v1/login", new URLSearchParams({ username: username, password: password, needtwostepauth: "false" }).toString()).then(res => res.data.data);

			// Alternative without password:
			// await loginApi.post("api/v1/sendEmailCode", new url.URLSearchParams({username: username, type: "auth"}).toString()).then(res => res.data);
			// // ... get code from user ...
			// userdata = await loginApi.post("api/v1/loginWithCode", new url.URLSearchParams({username: username, verifycode: code, verifycodetype: "AUTH_EMAIL_CODE"}).toString()).then(res => res.data.data);

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

			if (this.supportsFeature && this.supportsFeature("PLUGINS")) {
				if (this.sentryInstance) {
					this.sentryInstance.getSentryObject().captureException("Failed to login. Most likely wrong token! Deleting HomeData and UserData. Try again! " + error);
				}
			}
			this.deleteStateAsync("HomeData");
			this.deleteStateAsync("UserData");
		}
		const rriot = userdata.rriot;

		// Initialize the real API.
		this.api = axios.create({
			baseURL: rriot.r.a,
		});
		this.api.interceptors.request.use(config => {
			try {
				const timestamp = Math.floor(Date.now() / 1000);
				const nonce = crypto.randomBytes(6).toString("base64").substring(0, 6).replace("+", "X").replace("/", "Y");
				let url;
				if (this.api) {
					url = new URL(this.api.getUri(config));
					const prestr = [rriot.u, rriot.s, nonce, timestamp, md5hex(url.pathname), /*queryparams*/ "", /*body*/ ""].join(":");
					const mac = crypto.createHmac("sha256", rriot.h).update(prestr).digest("base64");

					config.headers["Authorization"] = `Hawk id="${rriot.u}", s="${rriot.s}", ts="${timestamp}", nonce="${nonce}", mac="${mac}"`;
				}
			}
			catch (error) {
				this.log.error("Failed to initialize API. Error: " + error);

				if (this.supportsFeature && this.supportsFeature("PLUGINS")) {
					if (this.sentryInstance) {
						this.sentryInstance.getSentryObject().captureException("Failed to initialize API. Error: " + error);
					}
				}
			}
			return config;
		});

		// Get home details.
		loginApi.get("api/v1/getHomeDetail").then(async res => {
			const homeId = res.data.data.rrHomeId;
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

			if (this.api) {

				this.homedataInterval = this.setInterval(this.updateHomeData.bind(this), this.config.updateInterval * 1000, homeId);
				this.updateHomeData(homeId);

				this.api.get(`user/homes/${homeId}`).then(async res => {
					const homedata = res.data.result;
					await this.setStateAsync("HomeData", { val: JSON.stringify(homedata), ack: true });

					rr_mqtt_connector = new roborock_mqtt_connector(this);
					rr_mqtt_connector.initUser(userdata, homedata);
					rr_mqtt_connector.initMQTT_Subscribe();
					rr_mqtt_connector.initMQTT_Message(rr);

					// store name of each room via ID
					const rooms = homedata.rooms;
					for (const room in rooms) {
						const roomID = rooms[room].id;
						const roomName = rooms[room].name;

						this.roomIDs[roomID] = roomName;
					}
					this.log.debug("RoomIDs debug: " + JSON.stringify(this.roomIDs));


					await this.setObjectNotExistsAsync("Devices", {
						type: "folder",
						common: {
							name: "Devices",
						},
						native: {},
					});


					// create devices and set states
					const devices = homedata.devices;
					const products = homedata.products;
					for (const device in devices) {
						const productID = devices[device]["productId"];
						// const robotModel = products[device]["model"];
						const robotModel = this.getRobotModel(products, productID);
						const duid = devices[device].duid;
						const name = devices[device].name;

						this.vacuums[duid] = new vacuum_class(this, rr, robotModel);
						this.vacuums[duid].name = name;

						await this.vacuums[duid].setUpObjects(duid);

						for (const attribute in devices[device].deviceStatus) {
							if (this.vacuums[duid].setup.consumables[attribute]) {
								const val = (devices[device].deviceStatus[attribute] >= 0 && devices[device].deviceStatus[attribute] <= 100) ? parseInt(devices[device].deviceStatus[attribute]) : 0;

								switch (robotModel) {
									case "roborock.vacuum.s4":
									case "roborock.vacuum.s5":
									case "roborock.vacuum.s5e":
									case "roborock.vacuum.a08":
									case "roborock.vacuum.a10":
									case "roborock.vacuum.s6":
										this.setStateAsync("Devices." + duid + ".consumables." + attribute, { val: val, ack: true });
										break;
									default:
										this.setStateAsync("Devices." + duid + ".consumables." + attribute, { val: val - 1, ack: true });
								}
							}
						}

						// Update map once on start of adapter
						this.vacuums[duid].getMap(duid);

						// sub to all commands of this robot
						this.subscribeStates("Devices." + duid + ".commands.*");
						this.subscribeStates("Devices." + duid + ".reset_consumables.*");

						this.vacuums[duid].mainUpdateInterval = this.setInterval(this.updateDataMinimumData.bind(this), this.config.updateInterval * 1000, duid, this.vacuums[duid], robotModel);

						this.updateDataExtraData(duid, this.vacuums[duid]); // extra data needs to be called first!!!
						this.updateDataMinimumData(duid, this.vacuums[duid], robotModel);


						// reconnect every 3 hours (10800 seconds)
						this.reconnectIntervall = this.setInterval(() => {
							this.log.debug("Reconnecting after 3 hours!");

							rr_mqtt_connector.reconnectClient();
						}, 10800 * 1000);

						this.vacuums[duid].getCleanSummary(duid);
					}
				});
			}
		});

		// These need to start only after all states have been set

		if (this.config.enable_map_creation == true) {
			this.startWebserver();
			this.startWebsocketServer();
		}
		// rr.on("response.raw", (duid, result) => {
		// 	this.log.debug("raw: " + JSON.stringify(result));
		// });

		rr.on("foreign.message", (duid, result) => {
			let value;

			this.log.debug("foreign.message duid: " + duid);

			for (const attribute in result) {
				this.log.debug("foreign.message attribute: " + attribute);
				switch(attribute) {
					case "121":
						value = result[attribute];
						if ((value == 4) || (value == 5) || (value == 6) || (value == 7) || (value == 11) || (value == 15) || (value == 16) || (value == 17) || (value == 18)) {
							this.startMapUpdater(duid);
						}
						else {
							this.stopMapUpdater(duid);
						}
						break;
					default:
				}
			}
		});
	}

	async startMapUpdater(duid) {
		if (this.vacuums[duid].mapUpdater == null) {
			this.log.debug("Started map updater on robot: " + duid);
			// get map every x seconds. Maybe I find a way later on to only update every second if the robot is running.
			this.vacuums[duid].mapUpdater = this.setInterval(() => {
				this.vacuums[duid].getMap(duid);
			}, this.config.map_creation_interval*1000);
		}
		else {
			this.log.debug("Map updater on robot: " + duid + " already running!");
		}
	}

	stopMapUpdater(duid) {
		this.log.debug("Stopped map updater on robot: " + duid);
		if (this.vacuums[duid].mapUpdater != null) {
			this.clearInterval(this.vacuums[duid].mapUpdater);
			this.vacuums[duid].mapUpdater = null;

			this.vacuums[duid].getCleanSummary(duid);
		}
	}

	startWebserver() {
		const app = express();
		app.use(express.static("lib/map"));
		webserver = app.listen(this.config.webserverPort);
	}
	async stopWebserver() {
		webserver.close();
	}

	async startWebsocketServer() {
		socketServer = new websocket.Server({ port: 7906 });
		let parameters, robot;

		socketServer.on("connection", async (socket) => {
			this.socket = socket;
			this.log.debug("Websocket client connected");

			socket.on("message", async (message) => {
				const data = JSON.parse(message.toString());
				const command = data["command"];
				const sendValue = {};
				sendValue.parameters = [];

				switch (command)
				{
					case "app_zoned_clean":
					case "app_goto_target":
					case "app_start":
					case "app_stop":
					case "app_pause":
					case "app_charge":
						parameters = data["parameters"];
						this.vacuums[data["duid"]].command(data["duid"], command, parameters);
						break;

					case "getRobots":
						sendValue.command = "robotList";
						for (const robotID in this.vacuums)
						{
							robot = [robotID, this.vacuums[robotID].name];
							sendValue.parameters.push(robot);
						}
						socket.send(JSON.stringify(sendValue));
						break;

					case "getMap":
						sendValue.command = "map";
						await this.getStateAsync("Devices." + data["duid"] + ".map.mapBase64")
							.then((state) => {
								sendValue.base64 = state?.val?.toString() ?? "";
							});
						await this.getStateAsync("Devices." + data["duid"] + ".map.mapData")
							.then((state) => {
								sendValue.map = JSON.parse(state?.val?.toString() ?? "");
							});
						sendValue.scale = this.config.map_scale;
						socket.send(JSON.stringify(sendValue));
						break;
				}
			});

			socket.on("close", () => {
				this.log.debug("Client disconnected");
				this.socket = null;
			});
		});
	}
	async stopWebsocketServer() {
		socketServer.close();
	}

	getRobotModel(products, productID) {
		for (const product in products) {
			if (products[product].id == productID) {
				const model = products[product].model;
				return model;
			}
		}

	}

	updateDataMinimumData(duid, vacuum, robotModel) {
		this.log.debug("Latest data requested");

		vacuum.getParameter(duid, "get_status");

		vacuum.getParameter(duid, "get_consumable");

		vacuum.getParameter(duid, "get_network_info");

		switch (robotModel) {
			case "roborock.vacuum.s4":
			case "roborock.vacuum.s5":
			case "roborock.vacuum.s5e":
			case "roborock.vacuum.a08":
			case "roborock.vacuum.a10":
				//do nothing
				break;
			case "roborock.vacuum.s6":
				vacuum.getParameter(duid, "get_carpet_mode");
				break;
			default:
				vacuum.getParameter(duid, "get_carpet_mode");
				vacuum.getParameter(duid, "get_carpet_clean_mode");
				vacuum.getParameter(duid, "get_water_box_custom_mode");
		}
	}

	async updateDataExtraData(duid, vacuum) {
		vacuum.getParameter(duid, "get_fw_features");

		vacuum.getParameter(duid, "get_multi_maps_list");

		const in_returning = await this.getStateAsync("Devices." + duid + ".deviceStatus.in_returning");
		const in_cleaning = await this.getStateAsync("Devices." + duid + ".deviceStatus.in_cleaning");

		if ((in_cleaning?.val == 1) || (in_returning?.val == 1)) {
			this.startMapUpdater(duid);
		}
	}

	clearTimersAndIntervals() {
		if (this.reconnectIntervall) {
			this.clearInterval(this.reconnectIntervall);
		}
		if (this.homedataInterval) {
			this.clearInterval(this.homedataInterval);
		}
		if (this.commandTimeout) {
			this.clearTimeout(this.commandTimeout);
		}
		if (this.resetTimeout) {
			this.clearTimeout(this.resetTimeout);
		}

		for (const duid in this.vacuums) {
			this.clearInterval(this.vacuums[duid].mainUpdateInterval);
			this.clearInterval(this.vacuums[duid].mapUpdater);
		}
	}

	updateHomeData(homeId) {
		if (this.api) {
			this.api.get(`user/homes/${homeId}`).then(async res => {
				const homedata = res.data.result;
				await this.setStateAsync("HomeData", { val: JSON.stringify(homedata), ack: true });
				this.log.debug("homedata successfully updated");
			});
		}
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			this.clearTimersAndIntervals();

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
	async onStateChange(id, state) {
		if (state) {
			const idParts = id.split(".");
			const duid = idParts[3];
			const folder = idParts[4];
			const command = idParts[5];

			this.log.debug("onStateChange: " + command + " with value: " + state.val);
			if ((state.val == true) && (typeof (state.val) == "boolean")) {
				if (folder == "reset_consumables") {
					await this.vacuums[duid].command(duid, "reset_consumable", command);

					this.resetTimeout = this.setTimeout(() => {
						this.setStateAsync(id, false);
					}, 1000);
				}
				else {
					this.vacuums[duid].command(duid, command);

					// set back command to false after 1 second
					if ((command != "set_carpet_mode") && (command != "set_carpet_cleaning_mode")) {
						this.commandTimeout = this.setTimeout(() => {
							this.setStateAsync(id, false);
						}, 1000);
					}
				}
			}
			else if (command == "load_multi_map") {
				await this.vacuums[duid].command(duid, command, state.val);
			}
			else if (typeof (state.val) != "boolean") {
				this.vacuums[duid].command(duid, command, state.val);
			}
			else if ((command == "app_start") || (command == "app_segment_clean") || (command == "app_charge") || (command == "app_spot") || (command == "app_zoned_clean"))
			{
				this.startMapUpdater(duid);

				if (command == "app_zoned_clean") {
					// vacuums[duid].command(duid, command, [[ 24575,28050,25225,28500,1 ]]);
					// vacuums[duid].command(duid, command, [[ 24450,27800,25125,28450,1 ]]); // known good
					this.vacuums[duid].command(duid, command, [[23875,27850,25125,29100,1]]);
				}
			}
		} else {
			this.log.error("Error! Missing state onChangeState!");
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
	// this.log.debug(deviceId);
	// this.log.debug(id);
	// this.log.debug(result);
	// });
	// }

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
