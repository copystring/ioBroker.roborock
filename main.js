"use strict";

const utils = require("@iobroker/adapter-core");

const axios = require("axios");
const crypto = require("crypto");
const EventEmitter = require("node:events");

const roborock_mqtt_connector = require("./lib/roborock_mqtt_connector").roborock_mqtt_connector;
const vacuum_class = require("./lib/vacuum").vacuum;
const rr = new EventEmitter();
const vacuums = {};

let rr_mqtt_connector;

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

		// store name of each room via ID
		const rooms = homedata.rooms;
		for (const room in rooms){
			const roomID = rooms[room].id;
			const roomName = rooms[room].name;

			this.roomIDs[roomID] = roomName;
		}
		this.log.debug("RoomIDs debug: " + JSON.stringify(this.roomIDs));

		rr_mqtt_connector = new roborock_mqtt_connector(this);
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
		const products = homedata.products;
		for (const device in devices){
			const robotModel = products[device]["model"];
			const duid = devices[device].duid;

			vacuums[duid] = new vacuum_class(this, rr, robotModel);

			await vacuums[duid].setUpObjects(duid);

			this.updateDataMinimumData(duid, vacuums[duid]);
			this.updateDataExtraData(duid, vacuums[duid]);

			setInterval(this.updateDataMinimumData.bind(this), this.config.updateInterval*1000, duid, vacuums[duid]);

			// sub to all commands of this robot
			this.subscribeStates("Devices." + duid + ".commands.*");
		}
	}

	updateDataMinimumData(duid, vacuum) {
		this.log.debug("Latest data requested");

		vacuum.getParameter(duid, "get_status");
		vacuum.getParameter(duid, "get_water_box_custom_mode");

		vacuum.getParameter(duid, "get_consumable");

		vacuum.getParameter(duid, "get_network_info");

		vacuum.getCleanSummary(duid);

		vacuum.getParameter(duid, "get_carpet_mode");
		vacuum.getParameter(duid, "get_carpet_clean_mode");

	}

	updateDataExtraData(duid, vacuum) {
		vacuum.getParameter(duid, "get_fw_features");

		vacuum.getParameter(duid, "get_multi_maps_list");

		vacuum.getParameter(duid, "get_room_mapping");
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
	async onStateChange(id, state) {
		if (state) {
			this.log.debug("onStateChange: " + id);
			const duid = id.substring(19, 41);
			const command = id.split(".").slice(-1)[0];

			this.log.debug("onStateChange: " + command + " with value: " + state.val);
			if ((state.val == true) && (typeof(state.val) == "boolean")) {
				vacuums[duid].command(duid, command);

				this.log.debug("Command to test: " + command);
				// set back command to false after 1 second
				if ((command != "set_carpet_mode") && (command != "set_carpet_cleaning_mode")) {
					setTimeout(() =>{
						this.setStateAsync(id, false);
					}, 1000);
				}
			}
			else if (command == "load_multi_map")
			{
				await vacuums[duid].command(duid, "load_multi_map", state.val);
			}
			else if (typeof(state.val) != "boolean") {
				vacuums[duid].command(duid, command, state.val);
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
