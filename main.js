const utils = require("@iobroker/adapter-core");
const { randomBytes } = require("crypto");
const WebSocket = require("ws");
const express = require("express");
const { spawn } = require("child_process");
const go2rtcPath = require("go2rtc-static");

const roborock_package_helper = require("./lib/roborock_package_helper");
const device_features = require("./lib/device_features");
const requests_handler = require("./lib/requests_handler");
const http_api = require("./lib/http_api");
const sniffing = require("./lib/sniffing");

let socketServer, webserver;

const dockingStationStates = ["cleanFluidStatus", "waterBoxFilterStatus", "dustBagStatus", "dirtyWaterBoxStatus", "clearWaterBoxStatus", "isUpdownWaterReady"];

let updateIntervalCount = 0;

class Roborock extends utils.Adapter {
	constructor(options = {}) {
		super({ ...options, name: "roborock", useFormatDate: true });
		this.on("ready", this.onReady.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("objectChange", this.onObjectChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));

		this.socket = null;
		this.idCounter = 0;
		this.nonce = randomBytes(16);
		this.pendingRequests = new Map();
		this.http_api = new http_api(this);
		this.roborock_package_helper = new roborock_package_helper(this);
		this.requests_handler = new requests_handler(this);
		this.device_features = new device_features(this);
		this.sniffing = new sniffing(this);
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		if (!this.config.username || !this.config.password) {
			this.log.error("Username or password missing!");
			return;
		}

		this.sentryInstance = this.getPluginInstance("sentry");
		this.translations = require(`./admin/i18n/${this.language || "en"}/translations.json`); // fall back to en for test-and-release.yml

		this.log.info(`Starting adapter. This might take a few minutes depending on your setup. Please wait.`);

		try {
			const clientID = await this.ensureClientID();
			await this.http_api.init(clientID);
		}
		catch (error) {
			this.log.error(`Failed to get clientID. ${error.stack}`);
		}

		await this.setupBasicObjects();

		await this.requests_handler.init(); // this makes the requests handler connect to mqtt. tcp follows later when IP of each device have been received

		// get latest data on start of adapter
		const devices = await this.http_api.getDevices();

		// need to get network data before processing any other data
		for (const device of devices) {
			const duid = device.duid;

			await this.requests_handler.getParameter(duid, "get_network_info"); // this needs to be called first on start of adapter to get the IP adresses of each device
		}
		// now network data is present, connect tcp client to devices
		await this.requests_handler.initTCP();

		// now tcp clients are connected. process any further data
		for (const device of devices) {
			const duid = device.duid;

			await this.createDeviceObjects(device);

			await this.requests_handler.getStatus(duid);

			this.updateDeviceData(duid);
			this.updateConsumablesPercent(duid);
			this.updateDeviceInfo(duid);

			await this.requests_handler.getCleanSummary(duid);
			await this.requests_handler.getMap(duid);
		}
		await this.processScenes();

		this.log.info(`Starting adapter finished. Let's go!!!!!!!`);

		// handle requests based on interval here. No separate interval needed anywhere
		this.log.debug(`initializing mainUpdateInterval`);
		this.mainUpdateInterval = this.setInterval(async () => {
			const devices = this.http_api.getDevices();

			for (const device of devices) {
				if (device.online) {
					const duid = device.duid;

					try {
						// update status every second if websocket is connected or update interval is met
						if (this.socket || updateIntervalCount % this.config.updateInterval == 0) {
							await this.requests_handler.getStatus(duid);
						}

						// update device data on interval defined in options
						if (updateIntervalCount % this.config.updateInterval == 0) {
							this.updateDeviceData(duid);
							this.updateConsumablesPercent(duid);
							this.updateDeviceInfo(duid);

							updateIntervalCount = 0;
						}

						// update map when needed
						const isCleaning = this.requests_handler.isCleaning(duid);
						if (isCleaning) this.requests_handler.getMap(duid);
					} catch (error) {
						this.catchError(error.stack, "mainUpdateInterval", duid);
					}
				}
			}
			updateIntervalCount++;
		}, 1000);

		try {
			await this.start_go2rtc();
		} catch (error) {
			this.catchError(`Failed to start go2rtc. ${error.stack}`);
		}

		// Start map creation if enabled
		if (this.config.enable_map_creation) {
			try {
				this.startWebserver();
				await this.startWebsocketServer();
			} catch (error) {
				this.catchError(error.stack);
			}
		}
	}

	/**
	 *
	 * @returns {Promise<string>}
	 */
	async ensureClientID() {
		try {
			const clientID = await this.getStateAsync("clientID");
			if (!clientID || !clientID.val) {
				const randomClientID = crypto.randomUUID();
				await this.setState("clientID", { val: randomClientID, ack: true });
				this.log.info(`Generated and saved new clientID: ${randomClientID}`);
				return randomClientID;
			} else {
				this.log.info(`Loaded existing clientID: ${clientID.val}`);
				return clientID.val.toString();
			}
		} catch (error) {
			this.log.error(`Error ensuring clientID: ${error.message}`);
			throw error;
		}
	}

	async createDeviceObjects(device) {
		const duid = device.duid;
		const name = device.name;

		await this.device_features.processSupportedFeatures(duid);

		await this.setObjectAsync("Devices." + duid, {
			type: "device",
			common: {
				name: name,
				statusStates: {
					onlineId: `${this.name}.${this.instance}.Devices.${duid}.deviceInfo.online`,
				},
			},
			native: {},
		});

		// sub to all commands of this robot
		this.subscribeStates("Devices." + duid + ".commands.*");
		this.subscribeStates("Devices." + duid + ".resetConsumables.*");
		this.subscribeStates("Devices." + duid + ".programs.startProgram");
		this.subscribeStates("Devices." + duid + ".deviceInfo.online");
	}

	async processScenes() {
		const scenes = await this.http_api.getScenes();

		if (scenes && scenes?.result) {
			const data = scenes.result;

			const programs = {};
			for (const program in data) {
				const enabled = data[program].enabled;
				const programID = data[program].id;
				const programName = data[program].name;
				const param = data[program].param;

				const duid = JSON.parse(param).action.items[0].entityId;

				if (!programs[duid]) {
					programs[duid] = {};
				}
				programs[duid][programID] = programName;

				await this.setObjectNotExistsAsync(`Devices.${duid}.programs`, {
					type: "folder",
					common: {
						name: "Programs",
					},
					native: {},
				});

				await this.setObjectAsync(`Devices.${duid}.programs.${programID}`, {
					type: "folder",
					common: {
						name: programName,
					},
					native: {},
				});

				const enabledPath = `Devices.${duid}.programs.${programID}.enabled`;
				await this.createStateObjectHelper(enabledPath, "enabled", "boolean", null, null, "value");
				this.setState(enabledPath, enabled, true);

				const items = JSON.parse(param).action.items;
				for (const item in items) {
					for (const attribute in items[item]) {
						const objectPath = `Devices.${duid}.programs.${programID}.items.${item}.${attribute}`;
						let value = items[item][attribute];
						const typeOfValue = typeof value;

						await this.createStateObjectHelper(objectPath, attribute, typeOfValue, null, null, "value", true, false);

						if (typeOfValue == "object") {
							value = value.toString();
						}
						this.setState(objectPath, value, true);
					}
				}
			}

			for (const duid in programs) {
				const objectPath = `Devices.${duid}.programs.startProgram`;
				await this.createStateObjectHelper(objectPath, "Start saved program", "string", null, Object.keys(programs[duid])[0], "value", true, true, programs[duid]);
			}
		}
	}

	startWebserver() {
		const app = express();
		app.use(express.static("lib/map"));
		webserver = app.listen(this.config.webserverPort);

		webserver.on("error", (error) => {
			// This code will run if there was an error starting the server
			this.log.error(`Error occurred: ${error}`);
		});
	}
	async stopWebserver() {
		webserver.close();
	}

	async startWebsocketServer() {
		socketServer = new WebSocket.Server({ port: 7906 });
		let parameters, robot;

		socketServer.on("connection", async (socket) => {
			this.socket = socket;
			this.log.debug(`Websocket client connected`);

			socket.on("pong", () => {
				this.socket = socket;
			});

			this.webSocketInterval = this.setInterval(() => {
				if (!this.socket) {
					this.log.debug(`Client disconnected. Stopping interval.`);
					this.clearInterval(this.webSocketInterval);
					socket.terminate();
					return;
				}

				this.socket = null;
				socket.ping();
			}, 1000);

			socket.on("message", async (message) => {
				const data = JSON.parse(message.toString());
				const command = data.command;
				const sendValue = {};
				sendValue.parameters = [];

				const devices = this.http_api.getDevices();

				switch (command) {
					case "app_zoned_clean":
					case "app_goto_target":
					case "app_start":
					case "app_stop":
					case "stop_zoned_clean":
					case "app_pause":
					case "app_charge":
						parameters = data["parameters"];
						this.requests_handler.command(data["duid"], command, parameters);
						break;

					case "getRobots":
						sendValue.command = "robotList";

						for (const robotID in devices) {
							robot = [devices[robotID].duid, devices[robotID].name];
							sendValue.parameters.push(robot);
						}
						socket.send(JSON.stringify(sendValue));
						break;

					case "getMap":
						this.requests_handler.getMap(data.duid);
						break;

					case "get_photo":
						this.requests_handler.getParameter(data["duid"], "get_photo", data["attribute"]);
						break;
					case "sniffing_decrypt":
						try {
							this.sniffing.decodeSniffedMessage(data, devices);
						} catch (error) {
							this.log.error("Failed to decode/decrypt sniffing message. " + error);

							if (this.supportsFeature && this.supportsFeature("PLUGINS")) {
								if (this.sentryInstance) {
									this.sentryInstance.getSentryObject().captureException("Failed to initialize API. Error: " + error);
								}
							}
						}

						break;
				}
			});

			socket.on("close", () => {
				this.log.debug(`Client disconnected`);
				this.clearInterval(this.webSocketInterval);
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

	async onlineChecker(duid) {
		const devices = this.http_api.getDevices();

		const device = devices.find((device) => device.duid == duid);

		// If the device is not found, return false.
		if (!device) {
			return false;
		}

		return device?.online;
	}

	async updateDeviceData(duid) {
		const robotModel = this.http_api.getRobotModel(duid);

		if (robotModel == "roborock.wm.a102") {
			// nothing for now
		} else if (robotModel == "roborock.wetdryvac.a56") {
			// nothing for now
		} else {
			await this.requests_handler.getParameter(duid, "get_fw_features");

			await this.requests_handler.getParameter(duid, "get_multi_maps_list");

			await this.requests_handler.getParameter(duid, "get_room_mapping");

			await this.requests_handler.getParameter(duid, "get_consumable");

			await this.requests_handler.getParameter(duid, "get_server_timer");

			await this.requests_handler.getParameter(duid, "get_timer");

			await this.checkForNewFirmware(duid);

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
					await this.requests_handler.getParameter(duid, "get_carpet_mode");
					break;
				case "roborock.vacuum.a27":
					await this.requests_handler.getParameter(duid, "get_dust_collection_switch_status");
					await this.requests_handler.getParameter(duid, "get_wash_towel_mode");
					await this.requests_handler.getParameter(duid, "get_smart_wash_params");
					await this.requests_handler.getParameter(duid, "app_get_dryer_setting");
					break;
				default:
					await this.requests_handler.getParameter(duid, "get_carpet_mode");
					await this.requests_handler.getParameter(duid, "get_carpet_clean_mode");
					await this.requests_handler.getParameter(duid, "get_water_box_custom_mode");
			}
		}
	}

	clearTimersAndIntervals() {
		if (this.commandTimeout) {
			this.clearTimeout(this.commandTimeout);
		}
		if (this.mainUpdateInterval) {
			this.clearInterval(this.mainUpdateInterval);
		}
		if (this.requests_handler) {
			this.requests_handler.clearQueue();
		}

		if (this.mainUpdateInterval) {
			this.clearInterval(this.mainUpdateInterval);
		}

		if (this.webSocketInterval) {
			this.clearInterval(this.webSocketInterval);
		}
	}

	async updateConsumablesPercent(duid) {
		const devices = this.http_api.getDevices();
		const device = devices.find((device) => device.duid === duid);

		const deviceStatus = device.deviceStatus;

		for (const [attribute, value] of Object.entries(deviceStatus)) {
			const targetConsumable = await this.getObjectAsync(`Devices.${duid}.consumables.${attribute}`);

			if (targetConsumable) {
				const val = value >= 0 && value <= 100 ? parseInt(value) : 0;
				await this.setState(`Devices.${duid}.consumables.${attribute}`, { val: val, ack: true });
			}
		}
	}

	async updateDeviceInfo(duid) {
		const devices = this.http_api.getDevices();
		const device = devices.find((device) => device.duid === duid);

		for (const deviceAttribute in device) {
			let value = device[deviceAttribute];

			if (typeof value != "object") {
				let unit;

				if (deviceAttribute == "activeTime") {
					unit = "h";
					value = Math.round(device[deviceAttribute] / 1000 / 60 / 60);
				}
				await this.setObjectAsync("Devices." + duid + ".deviceInfo." + deviceAttribute, {
					type: "state",
					common: {
						name: deviceAttribute,
						type: this.getType(value),
						unit: unit,
						role: "value",
						read: true,
						write: false,
					},
					native: {},
				});
				this.setStateChangedAsync("Devices." + duid + ".deviceInfo." + deviceAttribute, { val: value, ack: true });
			}
		}
	}

	async checkForNewFirmware(duid) {
		this.log.debug(`Checking for new firmware`);
		const isLocalDevice = this.requests_handler.isLocalDevice(duid);

		if (isLocalDevice) {
			const update = await this.http_api.getFirmwareStates(duid);

			await this.setObjectNotExistsAsync("Devices." + duid + ".updateStatus", {
				type: "folder",
				common: {
					name: "Update status",
				},
				native: {},
			});

			for (const state in update.data.result) {
				await this.setObjectNotExistsAsync("Devices." + duid + ".updateStatus." + state, {
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
				this.setState("Devices." + duid + ".updateStatus." + state, {
					val: update.data.result[state],
					ack: true,
				});
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

	async createStateObjectHelper(path, name, type, unit, def, role, read, write, states, native = {}) {
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

	async createCommand(duid, command, type, defaultState, states) {
		const path = `Devices.${duid}.commands.${command}`;
		const name = this.translations[command];

		const common = {
			name: name,
			type: type,
			role: "value",
			read: true,
			write: true,
			def: defaultState,
			states: states,
		};

		this.setObjectAsync(path, {
			type: "state",
			common: common,
			native: {},
		});
	}

	async createDeviceStatus(duid, state, type, states, unit) {
		const path = `Devices.${duid}.deviceStatus.${state}`;
		const name = this.translations[state];

		const common = {
			name: name,
			type: type,
			role: "value",
			unit: unit,
			read: true,
			write: false,
			states: states,
		};

		this.setObjectAsync(path, {
			type: "state",
			common: common,
			native: {},
		});
	}

	async createDockingStationObject(duid) {
		for (const state of dockingStationStates) {
			const path = `Devices.${duid}.dockingStationStatus.${state}`;
			const name = this.translations[state];

			await this.setObjectNotExistsAsync(path, {
				type: "state",
				common: {
					name: name,
					type: "number",
					role: "value",
					read: true,
					write: false,
					states: { 0: "UNKNOWN", 1: "ERROR", 2: "OK" },
				},
				native: {},
			});
		}
	}

	async createConsumable(duid, state, type, states, unit) {
		const path = `Devices.${duid}.consumables.${state}`;
		const name = this.translations[state];

		const common = {
			name: name,
			type: type,
			role: "value",
			unit: unit,
			read: true,
			write: false,
			states: states,
		};

		this.setObjectAsync(path, {
			type: "state",
			common: common,
			native: {},
		});
	}

	async createResetConsumables(duid, state) {
		const path = `Devices.${duid}.resetConsumables.${state}`;
		const name = this.translations[state];

		this.setObjectNotExistsAsync(path, {
			type: "state",
			common: {
				name: name,
				type: "boolean",
				role: "value",
				read: true,
				write: true,
				def: false,
			},
			native: {},
		});
	}

	async createCleaningRecord(duid, state, type, states, unit) {
		let start = 0;
		let end = 19;
		const robotModel = await this.http_api.getRobotModel(duid);
		if (robotModel == "roborock.vacuum.a97") {
			start = 1;
			end = 20;
		}

		for (let i = start; i <= end; i++) {
			await this.setObjectAsync(`Devices.${duid}.cleaningInfo.records.${i}`, {
				type: "folder",
				common: {
					name: `Cleaning record ${i}`,
				},
				native: {},
			});

			this.setObjectAsync(`Devices.${duid}.cleaningInfo.records.${i}.${state}`, {
				type: "state",
				common: {
					name: this.translations[state],
					type: type,
					role: "value",
					unit: unit,
					read: true,
					write: false,
					states: states,
				},
				native: {},
			});

			await this.setObjectAsync(`Devices.${duid}.cleaningInfo.records.${i}.map`, {
				type: "folder",
				common: {
					name: "Map",
				},
				native: {},
			});
			for (const name of ["mapBase64", "mapBase64Truncated", "mapData"]) {
				const objectString = `Devices.${duid}.cleaningInfo.records.${i}.map.${name}`;
				await this.createStateObjectHelper(objectString, name, "string", null, null, "value", true, false);
			}
		}
	}

	async createCleaningInfo(duid, key, object) {
		const path = `Devices.${duid}.cleaningInfo.${key}`;
		const name = this.translations[object.name];

		this.setObjectAsync(path, {
			type: "state",
			common: {
				name: name,
				type: "number",
				role: "value",
				unit: object.unit,
				read: true,
				write: false,
			},
			native: {},
		});
	}

	async createBaseRobotObjects(duid) {
		for (const name of ["mapBase64", "mapBase64Truncated", "mapData"]) {
			const objectString = `Devices.${duid}.map.${name}`;
			await this.createStateObjectHelper(objectString, name, "string", null, null, "value", true, false);
		}

		this.createNetworkInfoObjects(duid);
	}

	async createBasicVacuumObjects(duid) {
		this.createNetworkInfoObjects(duid);
	}

	async createBasicWashingMachineObjects(duid) {
		this.createNetworkInfoObjects(duid);
	}

	async createNetworkInfoObjects(duid) {
		for (const name of ["ssid", "ip", "mac", "bssid", "rssi"]) {
			const objectString = `Devices.${duid}.networkInfo.${name}`;
			const objectType = name == "rssi" ? "number" : "string";
			await this.createStateObjectHelper(objectString, name, objectType, null, null, "value", true, false);
		}
	}

	async getRobotVersion(duid) {
		const devices = this.http_api.getDevices();

		for (const device in devices) {
			if (devices[device].duid == duid) return devices[device].pv;
		}

		return "Error in getRobotVersion. Version not found.";
	}

	getRequestId() {
		if (this.idCounter >= 9999) {
			this.idCounter = 0;
			return this.idCounter;
		}
		return this.idCounter++;
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

		await this.setObjectNotExistsAsync("endpoint", {
			type: "state",
			common: {
				name: "MQTT endpoint",
				type: "string",
				role: "value",
				read: true,
				write: false,
			},
			native: {},
		});
	}

	async start_go2rtc() {
		const devices = this.http_api.getDevices();

		let cameraCount = 0;
		const localKeys = this.http_api.getMatchedLocalKeys();

		const go2rtcConfig = { streams: {} };
		for (const device of devices) {
			const duid = device.duid;

			if (localKeys) {
				const localKey = localKeys.get(duid);

				const { u, s, k } = await this.http_api.get_rriot();

				if (this.device_features.getFeatureList(duid).isCameraSupported) {
					cameraCount++;
					go2rtcConfig.streams[duid] = `roborock://mqtt-eu-3.roborock.com:8883?u=${u}&s=${s}&k=${k}&did=${duid}&key=${localKey}&pin=${this.config.cameraPin}`;
				}
			}
		}

		if (cameraCount > 0) {
			try {
				const go2rtcProcess = spawn(go2rtcPath.toString(), ["-config", JSON.stringify(go2rtcConfig)], { shell: false, detached: false, windowsHide: true });

				go2rtcProcess.on("error", (error) => {
					this.log.error(`Error starting go2rtc: ${error.message}`);
				});

				go2rtcProcess.stdout.on("data", (data) => {
					this.log.debug(`go2rtc output: ${data}`);
				});

				go2rtcProcess.stderr.on("data", (data) => {
					this.log.error(`go2rtc error output: ${data}`);
				});

				process.on("exit", () => {
					go2rtcProcess.kill();
				});
			} catch (error) {
				this.log.error(`Failed to start go2rtc: ${error.message}`);
			}
		}
	}

	async catchError(error, attribute, duid) {
		const robotModel = duid ? this.http_api.getRobotModel(duid) : "unknown device model";

		if (error) {
			if (error.toString().includes("retry") || error.toString().includes("locating") || error.toString().includes("timed out after 30 seconds")) {
				this.log.warn(`Failed to process ${attribute} on robot ${duid} (${robotModel}): ${error}`);
			} else {
				this.log.error(`Failed to process ${attribute} on robot ${duid} (${robotModel}): ${error.stack || error}`);

				if (this.supportsFeature && this.supportsFeature("PLUGINS")) {
					if (this.sentryInstance) {
						this.sentryInstance.getSentryObject().captureException(`Error: ${error}`);
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
			this.setState("info.connection", { val: false, ack: true });

			callback();
		} catch (e) {
			this.catchError(e.stack);
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

			if (state.ack) {
				if (id.endsWith("online")) {
					this.log.info(`Device ${duid} is now ${state.val ? "online" : "offline"}`);
				}
			} else {
				const command = idParts[5];

				this.log.debug(`onStateChange: ${command} with value: ${state.val}`);
				if (state.val == true && typeof state.val == "boolean") {
					if (folder == "resetConsumables") {
						await this.requests_handler.command(duid, "reset_consumable", command);
					} else {
						this.requests_handler.command(duid, command);
					}
				} else if (command == "load_multi_map") {
					await this.requests_handler.command(duid, command, [state.val]);
				} else if (
					command == "app_start" ||
					command == "app_segment_clean" ||
					command == "app_charge" ||
					command == "app_spot" ||
					command == "app_zoned_clean" ||
					command == "app_goto_target"
				) {
					switch (command) {
						case "app_zoned_clean":
						case "app_goto_target":
							if (typeof state.val === "string") {
								try {
									const params = JSON.parse(state.val);

									if (command === "app_zoned_clean") {
										// Check if params is an array and contains multiple arrays
										if (Array.isArray(params) && params.every(Array.isArray)) {
											const allZonesValid = params.every((zone) => {
												const isCorrectLength = zone.length === 4 || zone.length === 5;
												const areAllNumbers = zone.every((item) => typeof item === "number");
												const isValidFifth = zone.length !== 5 || (zone[4] >= 1 && zone[4] <= 3);
												return isCorrectLength && areAllNumbers && isValidFifth;
											});

											if (allZonesValid) {
												this.requests_handler.command(duid, command, params);
											} else {
												this.log.error(
													`Invalid command parameters for ${command}: ${state.val}. Expected format: [[x1, y1, x2, y2, repeat], [x1, y1, x2, y2, repeat], ...] (where repeat is between 1 and 3)`
												);
											}
										} else {
											this.log.error(
												`Invalid command parameters for ${command}: ${state.val}. Expected format: [[x1, y1, x2, y2, repeat], [x1, y1, x2, y2, repeat], ...] (where repeat is between 1 and 3)`
											);
										}
									} else if (command === "app_goto_target") {
										// For app_goto_target, params should be an array with exactly two numbers
										const isCorrectLength = params.length === 2;
										const areAllNumbers = params.every((item) => typeof item === "number");

										if (isCorrectLength && areAllNumbers) {
											this.requests_handler.command(duid, command, params);
										} else {
											this.log.error(`Invalid command parameters for ${command}: ${state.val}. Expected format: [x, y]`);
										}
									}
								} catch (error) {
									this.log.error(`Error parsing JSON for ${command}: ${error}`);
								}
							}
							break;
					}
				} else if (command == "startProgram") {
					this.http_api.executeScene(state);
				} else if (typeof state.val != "boolean") {
					this.requests_handler.command(duid, command, state.val);
				}

				if (typeof state.val == "boolean") {
					this.commandTimeout = this.setTimeout(() => {
						this.setState(id, false, true);
					}, 1000);
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
