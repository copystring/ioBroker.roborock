"use strict";

const utils = require("@iobroker/adapter-core");

const axios = require("axios").default;
const crypto = require("crypto");
const websocket = require("ws");
const express = require("express");
const os = require("os");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const findProcess = require("find-process");

const { downloadRelease } = require("@terascope/fetch-github-release");

const roborock_mqtt_connector = require("./lib/roborock_mqtt_connector").roborock_mqtt_connector;
const vacuum_class = require("./lib/vacuum").vacuum;
const roborockPackageHelper = require("./lib/roborockPackageHelper").roborockPackageHelper;

let rr_mqtt_connector, socketServer, webserver;

const systems = {
	win32: { x64: "go2rtc_win64.zip" },
	linux: {
		arm: "go2rtc_linux_arm",
		arm64: "go2rtc_linux_arm64",
		ia32: "go2rtc_linux_i386",
		x64: "go2rtc_linux_amd64",
	},
};
let go2rtc;

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
		this.localKeys = null;
		this.roomIDs = {};
		this.vacuums = {};
		this.socket = null;

		this.messageQueue = new Map();

		this.roborockPackageHelper = new roborockPackageHelper(this);
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		this.sentryInstance = this.getPluginInstance("sentry");

		await this.setupBasicObjects();

		const username = this.config.username;
		const password = this.config.password;

		if (!username || !password) {
			this.log.error("Username or password missing!");
			return;
		}
		await this.setStateAsync("info.connection", { val: true, ack: true });

		// create new clientID if it doesn't exist yet
		let clientID = "";
		await this.getStateAsync("clientID").then(async (storedClientID) => {
			if (storedClientID && typeof storedClientID != "undefined") {
				clientID = storedClientID.val?.toString() ?? "";
			} else {
				clientID = crypto.randomUUID();
				await this.setStateAsync("clientID", { val: clientID, ack: true });
			}
		});

		// Initialize the login API (which is needed to get access to the real API).
		const loginApi = axios.create({
			baseURL: "https://euiot.roborock.com",
			headers: {
				header_clientid: crypto.createHash("md5").update(username).update(clientID).digest().toString("base64"),
			},
		});
		// api/v1/getUrlByEmail(email = ...)

		// Try to load existing userdata.
		const userdataObj = await this.getStateAsync("UserData");
		let userdata;
		if (userdataObj && typeof userdataObj != "undefined") {
			userdata = JSON.parse(userdataObj.val?.toString() || "{}");
		} else {
			// try log in.
			userdata = await loginApi
				.post(
					"api/v1/login",
					new URLSearchParams({
						username: username,
						password: password,
						needtwostepauth: "false",
					}).toString()
				)
				.then((res) => res.data.data);

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
			await this.setStateAsync("UserData", {
				val: JSON.stringify(userdata),
				ack: true,
			});
		}

		try {
			loginApi.defaults.headers.common["Authorization"] = userdata.token;
		} catch (error) {
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
		this.api.interceptors.request.use((config) => {
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
			} catch (error) {
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
		loginApi
			.get("api/v1/getHomeDetail")
			.then(async (res) => {
				const homeId = res.data.data.rrHomeId;

				if (this.api) {
					try {
						const homedata = await this.api.get(`v2/user/homes/${homeId}`);
						const homedataResult = homedata.data.result;

						const sharedData = await this.api.get(`user/deviceshare/query/receiveddevices`);
						const sharedDataDevices = sharedData.data.result;

						await this.setStateAsync("HomeData", {
							val: JSON.stringify(homedataResult),
							ack: true,
						});

						rr_mqtt_connector = new roborock_mqtt_connector(this);
						rr_mqtt_connector.initUser(userdata, homedataResult);
						rr_mqtt_connector.initMQTT_Subscribe();
						rr_mqtt_connector.initMQTT_Message();

						// store name of each room via ID
						const rooms = homedataResult.rooms;
						for (const room in rooms) {
							const roomID = rooms[room].id;
							const roomName = rooms[room].name;

							this.roomIDs[roomID] = roomName;
						}
						this.log.debug("RoomIDs debug: " + JSON.stringify(this.roomIDs));

						// create devices and set states
						const devices = homedataResult.devices;
						const products = homedataResult.products;

						this.createDevices(products, devices);
						this.createDevices(products, sharedDataDevices);

						await this.download_go2rtc();
						this.start_go2rtc(this.vacuums, homedataResult, userdata);

						this.homedataInterval = this.setInterval(this.updateHomeData.bind(this), this.config.updateInterval * 1000, homeId);
						await this.updateHomeData(homeId);

						// These need to start only after all states have been set
						if (this.config.enable_map_creation == true) {
							this.startWebserver();
							this.startWebsocketServer();
						}
					}
					catch (error) {
						this.log.error(error.stack);
					}
				}
			})
			.catch((e) => {
				this.log.error("Failed to get home details: " + e);
			});
	}

	async createDevices(products, devices) {
		for (const device in devices) {
			const productID = devices[device]["productId"];
			// const robotModel = products[device]["model"];
			const robotModel = this.getRobotModel(products, productID);
			const duid = devices[device].duid;
			const name = devices[device].name;

			this.vacuums[duid] = new vacuum_class(this, robotModel);
			this.vacuums[duid].name = name;

			await this.vacuums[duid].setUpObjects(duid);

			// sub to all commands of this robot
			this.subscribeStates("Devices." + duid + ".commands.*");
			this.subscribeStates("Devices." + duid + ".reset_consumables.*");

			this.vacuums[duid].mainUpdateInterval = () => this.setInterval(this.updateDataMinimumData.bind(this), this.config.updateInterval * 1000, duid, this.vacuums[duid], robotModel);
			if (devices[device].online) {
				this.log.debug(duid + " online. Starting mainUpdateInterval.");
				this.vacuums[duid].mainUpdateInterval(); // actually start mainUpdateInterval()
				// Map updater gets startet automatically via getParameter with get_status
			}

			await this.updateDataExtraData(duid, this.vacuums[duid]); // extra data needs to be called first!!!
			await this.updateDataMinimumData(duid, this.vacuums[duid], robotModel);

			this.vacuums[duid].getCameraStreams(duid);

			this.vacuums[duid].getCleanSummary(duid);

			// get map once at start of adapter
			this.vacuums[duid].getMap(duid);

			// reconnect every 3 hours (10800 seconds)
			this.reconnectIntervall = this.setInterval(() => {
				this.log.debug("Reconnecting after 3 hours!");

				rr_mqtt_connector.reconnectClient();
				// this.checkForNewFirmware(duid);
			}, 10800 * 1000);
			// this.checkForNewFirmware(duid);
		}
	}

	async startMapUpdater(duid) {
		if (this.vacuums[duid].mapUpdater == null) {
			this.log.debug("Started map updater on robot: " + duid);
			this.vacuums[duid].mapUpdater = this.setInterval(() => {
				this.vacuums[duid].getMap(duid);
			}, this.config.map_creation_interval * 1000);
		} else {
			this.log.debug(`Map updater on robot: ${duid} already running!`);
		}
	}

	stopMapUpdater(duid) {
		this.log.debug(`Stopping map updater on robot: ${duid}`);

		if (this.vacuums[duid].mapUpdater) {
			this.clearInterval(this.vacuums[duid].mapUpdater);
			this.vacuums[duid].mapUpdater = null;

			this.vacuums[duid].getCleanSummary(duid);
		}
	}

	startWebserver() {
		const app = express();
		app.use(express.static("lib/map"));
		webserver = app.listen(this.config.webserverPort);

		webserver.on("error", (error) => {
			// This code will run if there was an error starting the server
			this.log.error("Error occurred: " + error);
		});
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

				switch (command) {
					case "app_zoned_clean":
					case "app_goto_target":
					case "app_start":
					case "app_stop":
					case "stop_zoned_clean":
					case "app_pause":
					case "app_charge":
						parameters = data["parameters"];
						this.vacuums[data["duid"]].command(data["duid"], command, parameters);
						break;

					case "getRobots":
						sendValue.command = "robotList";
						for (const robotID in this.vacuums) {
							robot = [robotID, this.vacuums[robotID].name];
							sendValue.parameters.push(robot);
						}
						socket.send(JSON.stringify(sendValue));
						break;

					case "getMap":
						this.vacuums[data["duid"]].getMap(data["duid"]);
						break;

					case "get_photo":
						this.vacuums[data["duid"]].getParameter(data["duid"], "get_photo", data["attribute"]);
						break;
					case "sniffing_decrypt":
						await this.getStateAsync("HomeData")
							.then((homedata) => {
								if (homedata) {
									const homedataVal = homedata.val;
									if (typeof homedataVal == "string") {
										// this.log.debug("Sniffing message received!");
										const homedataParsed = JSON.parse(homedataVal);

										this.decodeSniffedMessage(data, homedataParsed.devices);
										this.decodeSniffedMessage(data, homedataParsed.receivedDevices);
									}
								}
							})
							.catch((error) => {
								this.log.error("Failed to decode/decrypt sniffing message. " + error);

								if (this.supportsFeature && this.supportsFeature("PLUGINS")) {
									if (this.sentryInstance) {
										this.sentryInstance.getSentryObject().captureException("Failed to initialize API. Error: " + error);
									}
								}
							});

						break;
				}
			});

			socket.on("close", () => {
				this.log.debug("Client disconnected");
				this.socket = null;
			});

			socketServer.on("error", (error) => {
				this.log.error("WebSocket Server error: " + error);
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

	startMainUpdateInterval(duid, online) {
		const robotModel = this.getRobotModel(duid);

		this.vacuums[duid].mainUpdateInterval = () =>
			this.setInterval(this.updateDataMinimumData.bind(this), this.config.updateInterval * 1000, duid, this.vacuums[duid], robotModel);
		if (online) {
			this.log.debug(duid + " online. Starting mainUpdateInterval.");
			this.vacuums[duid].mainUpdateInterval(); // actually start mainUpdateInterval()
			// Map updater gets startet automatically via getParameter with get_status
		}
	}

	decodeSniffedMessage(data, devices) {
		devices.forEach((device) => {
			const data_string = JSON.stringify(data);

			const parts = data_string.split("/");
			const duid_sniffed = parts[parts.length - 1].slice(0, -3);

			if (duid_sniffed == device.duid) {
				const localKey = JSON.stringify(device.localKey).slice(1, -1);
				// this.log.debug("duid_sniffed: " + duid_sniffed);
				// this.log.debug("Device duid: " + JSON.stringify(device.duid).slice(1, -1));
				// this.log.debug("Device localKey: " + localKey);

				const startIndex = data_string.indexOf("'") + 1;
				const endIndex = data_string.lastIndexOf("'");
				const hex_payload = data_string.substring(startIndex, endIndex);
				const msg = Buffer.from(hex_payload, "hex");
				// this.log.debug("Sniffing msg: " + msg);

				const decodedMessage = rr_mqtt_connector._decodeMsg(msg, localKey);
				// this.log.debug("decodedMessage: " + JSON.stringify(decodedMessage));
				this.log.debug("Decoded sniffing message: " + JSON.stringify(JSON.parse(decodedMessage.payload)));
			}
		});
	}

	async onlineChecker(duid) {
		const homedata = await this.getStateAsync("HomeData");

		// If the home data is not found or if its value is not a string, return false.
		if (homedata && typeof homedata.val == "string") {
			const homedataJSON = JSON.parse(homedata.val);
			const device = homedataJSON.devices.find((device) => device.duid == duid);

			// If the device is not found, return false.
			if (!device) {
				return false;
			}

			return device.online;
		}
		else {
			return false;
		}
	}

	async manageDeviceIntervals(duid) {
		return this.onlineChecker(duid)
			.then((onlineState) => {
				if (!onlineState && this.vacuums[duid].mainUpdateInterval) {
					this.clearInterval(this.vacuums[duid].mainUpdateInterval);
					this.clearInterval(this.vacuums[duid].mapUpdater);
				}
				else if (!this.vacuums[duid].mainUpdateInterval) {
					this.startMainUpdateInterval(duid, onlineState);
				}
				return onlineState;
			})
			.catch((error) => {
				this.log.error("startStopIntervals " + error);

				if (this.supportsFeature && this.supportsFeature("PLUGINS")) {
					if (this.sentryInstance) {
						this.sentryInstance.getSentryObject().captureException("startStopIntervals " + error);
					}
				}
				return false; // Make device appear as offline on error. Just in case.
			});
	}

	async updateDataMinimumData(duid, vacuum, robotModel) {
		this.log.debug("Latest data requested");

		await vacuum.getParameter(duid, "get_status");

		await vacuum.getParameter(duid, "get_room_mapping");

		await vacuum.getParameter(duid, "get_consumable");

		await vacuum.getParameter(duid, "get_network_info");

		await vacuum.getParameter(duid, "get_server_timer");

		await vacuum.getParameter(duid, "get_timer");

		switch (robotModel) {
			case "roborock.vacuum.s4":
			case "roborock.vacuum.s5":
			case "roborock.vacuum.s5e":
			case "roborock.vacuum.a08":
			case "roborock.vacuum.a10":
			case "roborock.vacuum.a40":
				//do nothing
				break;
			case "roborock.vacuum.s6":
				await vacuum.getParameter(duid, "get_carpet_mode");
				break;
			case "roborock.vacuum.a27":
				await vacuum.getParameter(duid, "get_dust_collection_switch_status");
				await vacuum.getParameter(duid, "get_wash_towel_mode");
				await vacuum.getParameter(duid, "get_smart_wash_params");
				break;
			default:
				await vacuum.getParameter(duid, "get_carpet_mode");
				await vacuum.getParameter(duid, "get_carpet_clean_mode");
				await vacuum.getParameter(duid, "get_water_box_custom_mode");
		}
	}

	async updateDataExtraData(duid, vacuum) {
		await vacuum.getParameter(duid, "get_fw_features");

		await vacuum.getParameter(duid, "get_multi_maps_list");
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

		this.messageQueue.forEach(({ timeout102, timeout301 }) => {
			this.clearTimeout(timeout102);
			if (timeout301) {
				this.clearTimeout(timeout301);
			}
		});

		// Clear the messageQueue map
		this.messageQueue.clear();
	}

	updateHomeData(homeId) {
		if (this.api) {
			this.api
				.get(`user/homes/${homeId}`)
				.then(async (res) => {
					const homedata = res.data.result;
					await this.setStateAsync("HomeData", {
						val: JSON.stringify(homedata),
						ack: true,
					});
					this.log.debug("homedata successfully updated");

					this.updateConsumablesPercent(homedata.devices);
					this.updateDeviceInfo(homedata.devices);
					this.updateDeviceInfo(homedata.receivedDevices);
				})
				.catch((e) => {
					this.log.error("Failed to update updateHomeData with error: " + e);
				});
		}
	}
	updateConsumablesPercent(devices) {
		for (const device in devices) {
			const duid = devices[device].duid;

			for (const deviceAttribute in devices[device].deviceStatus) {
				if (this.vacuums[duid].setup.consumables[deviceAttribute]) {
					const val =
						devices[device].deviceStatus[deviceAttribute] >= 0 && devices[device].deviceStatus[deviceAttribute] <= 100
							? parseInt(devices[device].deviceStatus[deviceAttribute])
							: 0;

					this.setStateAsync("Devices." + duid + ".consumables." + deviceAttribute, { val: val, ack: true });
				}
			}
		}
	}
	async updateDeviceInfo(devices) {
		for (const device in devices) {
			const duid = devices[device].duid;

			for (const deviceAttribute in devices[device]) {
				if (typeof devices[device][deviceAttribute] != "object") {
					let unit;
					if (deviceAttribute == "activeTime") {
						unit = "h";
						devices[device][deviceAttribute] = Math.round(devices[device][deviceAttribute] / 1000 / 60 / 60);
					}
					await this.setObjectAsync("Devices." + duid + ".deviceInfo." + deviceAttribute, {
						type: "state",
						common: {
							name: deviceAttribute,
							type: this.getType(devices[device][deviceAttribute]),
							unit: unit,
							role: "value",
							read: true,
							write: false,
						},
						native: {},
					});
					this.setStateAsync("Devices." + duid + ".deviceInfo." + deviceAttribute, { val: devices[device][deviceAttribute], ack: true });
				}
			}
		}
	}

	checkForNewFirmware(duid) {
		if (this.api) {
			try {
				this.api.get(`ota/firmware/${duid}/updatev2`).then(async (update) => {
					await this.setObjectAsync("Devices." + duid + ".updateStatus", {
						type: "folder",
						common: {
							name: "Update status",
						},
						native: {},
					});

					for (const state in update.data.result) {
						await this.setObjectAsync("Devices." + duid + ".updateStatus." + state, {
							type: "state",
							common: {
								name: state,
								type: this.getType(update.data.result[state]),
								role: "value",
								read: true,
								write: false,
							},
							native: {},
						});
						this.setStateAsync("Devices." + duid + ".updateStatus." + state, {
							val: update.data.result[state],
							ack: true,
						});
					}
				});
			} catch (e) {
				this.log.error("Failed to check for new firmware. Error: " + e);
			}
		}
	}

	getType(attribute) {
		// Get the type of the attribute.
		const type = typeof attribute;

		// Return the appropriate string representation of the type.
		switch (type) {
			case "boolean":
				return "boolean";
			case "number":
				return "number";
			default:
				return "string";
		}
	}

	createStateObjectHelper(path, name, type, unit, def, role, read, write, states, native = {}) {
		const common = {
			name: name,
			type: type,
			unit: unit,
			role: role,
			read: read,
			write: write,
			states: states,
		};

		if (def !== undefined && def !== null && def !== "") {
			common.def = def;
		}

		this.setObjectAsync(path, {
			type: "state",
			common: common,
			native: native,
		});
	}

	isCleaning(state) {
		switch (state) {
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

	async setupBasicObjects() {
		await this.setObjectAsync("Devices", {
			type: "folder",
			common: {
				name: "Devices",
			},
			native: {},
		});

		await this.setObjectAsync("UserData", {
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

		await this.setObjectAsync("HomeData", {
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

		await this.setObjectAsync("clientID", {
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
	}

	async download_go2rtc() {
		const arch = os.arch();
		const platform = os.platform();
		const filename = systems[platform][arch];
		const unzippedFilePath = "./lib/go2rtc/" + filename;
		const version = "v1.3.0";
		this.log.debug(`arch:  ${arch}`);
		this.log.debug(`platform: ${platform}`);
		this.log.debug(`System type: ${filename}`);

		const downloadURL = `https://github.com/AlexxIT/go2rtc/releases/download/${version}/${filename}`;
		this.log.debug(`downloadURL: ${downloadURL}`);

		const user = "AlexxIT";
		const repo = "go2rtc";
		const outputdir = "./lib/go2rtc";
		const filterRelease = (release) => release.prerelease === false;
		const filterAsset = (asset) => asset.name.includes(filename);
		const leaveZipped = false;

		const outputFilePath = path.join(outputdir, filename);

		if (fs.existsSync(outputFilePath)) { // delete old file. Sometimes the adapter crashes and the file is not deleted.
			try {
				fs.unlinkSync(outputFilePath);
				this.log.debug(`Old file ${outputFilePath} has been deleted.`);
			} catch (error) {
				this.log.error(`Error deleting old file ${outputFilePath}: ${error.message}`);
			}
		}

		try {
			const downloadedAssets = await downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped);
			// 	this.log.debug("Downloaded assets:" + downloadedAssets);
		} catch(error) {
			this.log.error("Error: " + error.message);
		}

		if (platform != "win32") {
			fs.chmod(unzippedFilePath, 0o755, (err) => {
				if (err) {
					this.log.error(`Error making ${unzippedFilePath} executable: ${err}`);
				} else {
					this.log.debug(`Made ${unzippedFilePath} executable`);
				}
			});
			go2rtc = filename;
		} else go2rtc = "go2rtc.exe";
	}

	async start_go2rtc(robots, homedata, userdata) {
		let cameraCount = 0;

		const go2rtcConfig = { streams: {} };
		for (const robot in robots) {
			const duid = robot;
			const localKey = this.localKeys.get(duid);

			const u = userdata.rriot.u;
			const s = userdata.rriot.s;
			const k = userdata.rriot.k;

			if (robots[robot].setup.camera) {
				cameraCount++;
				go2rtcConfig.streams[duid] =
				`roborock://mqtt-eu-3.roborock.com:8883?u=${u}&s=${s}&k=${k}&did=${duid}&key=${localKey}&pin=${this.config.cameraPin}`;
			}
		}

		if (go2rtc && cameraCount > 0) {
			const exePath = path.join(__dirname, "./lib/go2rtc/") + go2rtc;
			this.log.debug(`exePath: ${exePath}`);

			const processList = await findProcess("name", go2rtc);

			if (processList) {
				processList.forEach((proc) => {
					this.log.debug(`Killing process with pid ${proc.pid}`);
					process.kill(proc.pid, "SIGTERM");
				});
			}

			try {
				execFile(exePath, ["-config", JSON.stringify(go2rtcConfig)], (error, stdout, stderr) => {
					if (error) {
						this.log.error(`Error executing file ${error}`);
						return;
					}
					if (stdout) {
						this.log.debug(`Output from go2rtc: ${stdout}`);
					}
					if (stderr) {
						this.log.error(`Error output from: ${stderr}`);
					}
				});
			}
			catch (error) {
				this.log.error(`Failed to launch go2rtc: ${error}`);
			}
		}
	}

	async catchError(error, attribute, duid) {
		const onlineState = await this.onlineChecker(duid);

		if (onlineState) {
			if (error.toString().includes("retry") || error.toString().includes("locating") || error.toString().includes("timed out after 10 seconds")) {
				this.log.warn(`Failed to execute ${attribute} on robot ${duid} ${error}`);
			}
			else {
				this.log.error(`Failed to execute ${attribute} on robot ${duid} ${error.stack}`);

				if (this.supportsFeature && this.supportsFeature("PLUGINS")) {
					if (this.sentryInstance) {
						this.sentryInstance.getSentryObject().captureException(`error: ${error}`);
					}
				}
			}
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
			if (state.ack) {
				const idParts = id.split(".");
				const duid = idParts[3];
				const folder = idParts[4];
				const command = idParts[5];

				this.log.debug(`onStateChange: ${command} with value: ${state.val}`);
				if (state.val == true && typeof state.val == "boolean") {
					if (folder == "reset_consumables") {
						await this.vacuums[duid].command(duid, "reset_consumable", command);

						this.resetTimeout = this.setTimeout(() => {
							this.setStateAsync(id, false);
						}, 1000);
					} else {
						this.vacuums[duid].command(duid, command);

						// set back command to false after 1 second
						if (command != "set_carpet_mode" && command != "set_carpet_cleaning_mode") {
							this.commandTimeout = this.setTimeout(() => {
								this.setStateAsync(id, false);
							}, 1000);
						}
					}
				} else if (command == "load_multi_map") {
					await this.vacuums[duid].command(duid, command, [state.val]);
				} else if (
					command == "app_start" ||
					command == "app_segment_clean" ||
					command == "app_charge" ||
					command == "app_spot" ||
					command == "app_zoned_clean" ||
					command == "app_goto_target"
				) {
					this.startMapUpdater(duid);

					switch (command) {
						case "app_zoned_clean":
						case "app_goto_target":
							if (typeof state.val == "string") {
								this.vacuums[duid].command(duid, command, JSON.parse(state.val));
							}
							break;
					}
				} else if (typeof state.val != "boolean") {
					this.vacuums[duid].command(duid, command, state.val);
				}
			}
		} else {
			this.log.error(`Error! Missing state onChangeState!`);
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
