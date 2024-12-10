const utils = require("@iobroker/adapter-core");
const axios = require("axios");
const { randomBytes, createHmac, createHash } = require("crypto");
const WebSocket = require("ws");
const express = require("express");
const { spawn } = require("child_process");
const go2rtcPath = require("go2rtc-static");

const {
	localConnector: rrLocalConnector,
	roborock_mqtt_connector,
	message: rrMessage,
	vacuum: vacuum_class,
	roborockPackageHelper,
	deviceFeatures,
	messageQueueHandler,
} = require("./lib");

let socketServer, webserver;

const dockingStationStates = ["cleanFluidStatus", "waterBoxFilterStatus", "dustBagStatus", "dirtyWaterBoxStatus", "clearWaterBoxStatus", "isUpdownWaterReady"];

class Roborock extends utils.Adapter {
	constructor(options = {}) {
		super({ ...options, name: "roborock", useFormatDate: true });
		this.on("ready", this.onReady.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("objectChange", this.onObjectChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));

		this.localKeys = null;
		this.roomIDs = {};
		this.vacuums = {};
		this.socket = null;
		this.idCounter = 0;
		this.nonce = randomBytes(16);
		this.messageQueue = new Map();
		this.pendingRequests = new Map();
		this.localDevices = {};
		this.remoteDevices = new Set();
		this.roborockPackageHelper = new roborockPackageHelper(this);
		this.localConnector = new rrLocalConnector(this);
		this.message = new rrMessage(this);
		this.messageQueueHandler = new messageQueueHandler(this);
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		if (!this.config.username || !this.config.password) {
			this.log.error("Username or password missing!");
			return;
		}

		this.log.info(`Starting adapter. This might take a few minutes depending on your setup. Please wait.`);

		this.sentryInstance = this.getPluginInstance("sentry");
		this.translations = require(`./admin/i18n/${this.language || "en"}/translations.json`); // fall back to en for test-and-release.yml

		await this.setupBasicObjects();

		// Call the function initially and set an interval for every 3 hours
		const { loginApi, userdata } = await this.initializeRoborockApi();
		this.rr_mqtt_connector = new roborock_mqtt_connector(this, userdata);
		await this.initializeHomeDetails(loginApi, userdata);

		this.reconnectApiInterval = this.setInterval(async () => {
			// clean disconnect and reconnect every 3 hours
			if (this.rr_mqtt_connector) {
				await this.rr_mqtt_connector.disconnectClient();
			}

			const { loginApi, userdata } = await this.initializeRoborockApi();
			this.rr_mqtt_connector = new roborock_mqtt_connector(this, userdata);
			await this.initializeHomeDetails(loginApi, userdata);
		}, 3 * 60 * 60 * 1000); // 3 hours interval

		try {
			this.start_go2rtc(this.vacuums, userdata);
		} catch (error) {
			this.catchError(`Failed to start go2rtc. ${error.stack}`);
		}
	}

	async initializeRoborockApi() {
		try {
			this.log.debug(`initializeRoborockApi`);
			// Create or retrieve clientID
			const clientID = (await this.getStateAsync("clientID"))?.val?.toString() || crypto.randomUUID();
			await this.setState("clientID", { val: clientID, ack: true });

			// Initialize the login API
			const loginApi = axios.create({
				baseURL: "https://euiot.roborock.com",
				headers: {
					header_clientid: createHash("md5").update(this.config.username).update(clientID).digest().toString("base64"),
				},
			});

			// Get user data and set authorization header
			const userdata = await this.getUserData(loginApi);
			this.log.debug(`Userdata: ${JSON.stringify(userdata)}`);

			if (!userdata.token) throw new Error("Failed to retrieve user token. Check login credentials.");
			loginApi.defaults.headers.common["Authorization"] = userdata.token;

			// Initialize the real API with request interceptor
			this.api = axios.create({ baseURL: userdata.rriot.r.a });
			this.api.interceptors.request.use((config) => {
				try {
					const timestamp = Math.floor(Date.now() / 1000);
					const nonce = randomBytes(6)
						.toString("base64")
						.substring(0, 6)
						.replace(/[+/]/g, (m) => (m === "+" ? "X" : "Y"));
					const urlPath = this.api ? new URL(this.api.getUri(config)).pathname : "";
					const prestr = [userdata.rriot.u, userdata.rriot.s, nonce, timestamp, md5hex(urlPath), "", ""].join(":");
					const mac = createHmac("sha256", userdata.rriot.h).update(prestr).digest("base64");

					config.headers["Authorization"] = `Hawk id="${userdata.rriot.u}", s="${userdata.rriot.s}", ts="${timestamp}", nonce="${nonce}", mac="${mac}"`;
				} catch (error) {
					this.log.error("Failed to initialize API. Error: " + error);
					this.sentryInstance?.getSentryObject().captureException(error);
				}
				return config;
			});

			await this.setState("info.connection", { val: true, ack: true });

			return { loginApi, userdata };
		} catch (error) {
			this.log.error(`Error retrieving or setting clientID: ${error.stack}`);
			this.sentryInstance?.getSentryObject().captureException(error);
			await Promise.all([this.delObjectAsync("HomeData"), this.delObjectAsync("UserData")]);

			return { loginApi: null, userdata: null };
		}
	}

	async initializeHomeDetails(loginApi, userdata) {
		try {
			if (!loginApi) throw new Error("loginApi is not initialized.");
			const homeDetail = await loginApi.get("api/v1/getHomeDetail");
			if (!homeDetail) throw new Error("Failed to retrieve home details.");

			const homeId = homeDetail.data.data.rrHomeId;
			if (!this.api) throw new Error("API is not initialized.");

			// Fetch home data and scene
			const [homedataResult, scene] = await Promise.all([
				await this.api.get(`v2/user/homes/${homeId}`).then((res) => res.data.result),
				await this.api.get(`user/scene/home/${homeId}`).then((res) => res.data),
			]);

			// Set HomeData state
			await this.setState("HomeData", { val: JSON.stringify(homedataResult), ack: true });

			// Create devices and set states
			this.products = homedataResult.products;
			this.devices = homedataResult.devices.concat(homedataResult.receivedDevices);
			this.localKeys = new Map(this.devices.map((device) => [device.duid, device.localKey]));

			// Initialize MQTT and rooms
			if (this.rr_mqtt_connector) {
				await this.rr_mqtt_connector.initUser();
				await this.rr_mqtt_connector.initMQTT_Subscribe(userdata.rriot);
				await this.rr_mqtt_connector.initMQTT_Message();
			}

			homedataResult.rooms.forEach((room) => {
				this.roomIDs[room.id] = room.name;
			});
			this.log.debug(`RoomIDs debug: ${JSON.stringify(this.roomIDs)}`);

			this.processScene(scene);

			// Set up intervals
			if (this.reconnectIntervall) {
				this.clearInterval(this.reconnectIntervall);
			}
			this.reconnectIntervall = this.setInterval(async () => {
				this.log.debug(`Reconnecting every hour!`);
				if (this.rr_mqtt_connector) {
					await this.rr_mqtt_connector.reconnectClient();
				}
			}, 3600 * 1000);

			if (this.homedataInterval) {
				this.clearInterval(this.homedataInterval);
			}
			this.homedataInterval = this.setInterval(() => this.updateHomeData(homeId), this.config.updateInterval * 1000);
			await this.updateHomeData(homeId);

			// Initialize local devices
			const discoveredDevices = await this.localConnector.getLocalDevices();
			await this.createDevices();
			await this.getNetworkInfo();

			Object.entries(discoveredDevices).forEach(([duid, ip]) => {
				if (!this.localDevices[duid]) {
					this.localDevices[duid] = ip;
				}
			});
			this.log.debug(`localDevices: ${JSON.stringify(this.localDevices)}`);

			await Promise.all(Object.entries(this.localDevices).map(([duid, ip]) => this.localConnector.createClient(duid, ip)));
			this.initializeDeviceUpdates();

			// Start map creation if enabled
			if (this.config.enable_map_creation) {
				this.startWebserver();
				await this.startWebsocketServer();
			}

			this.log.info(`Starting adapter finished. Let's go!!!!!!!`);
		} catch (error) {
			this.log.error("Failed to get home details: " + error.stack);
		}
	}

	async getUserData(loginApi) {
		try {
			const response = await loginApi.post(
				"api/v1/login",
				new URLSearchParams({
					username: this.config.username,
					password: this.config.password,
					needtwostepauth: "false",
				}).toString()
			);
			const userdata = response.data.data;

			if (!userdata) {
				throw new Error("Login returned empty userdata.");
			}

			await this.setState("UserData", {
				val: JSON.stringify(userdata),
				ack: true,
			});

			return userdata;
		} catch (error) {
			this.log.error(`Error in getUserData: ${error.message}. This is most likely due to too many reconnects.`);
			await this.delObjectAsync("HomeData");
			await this.delObjectAsync("UserData");
			throw error;
		}
	}

	async getNetworkInfo() {
		const devices = this.devices;
		for (const device in devices) {
			const duid = devices[device].duid;
			const vacuum = this.vacuums[duid];
			await vacuum.getParameter(duid, "get_network_info");
		}
	}

	async createDevices() {
		const devices = this.devices;

		for (const device of devices) {
			const duid = device.duid;
			const name = device.name;

			const robotModel = this.getProductAttribute(duid, "model");

			this.vacuums[duid] = new vacuum_class(this, robotModel);
			this.vacuums[duid].name = name;
			this.vacuums[duid].features = new deviceFeatures(this, device.featureSet, device.newFeatureSet, duid);

			await this.vacuums[duid].features.processSupportedFeatures();

			await this.vacuums[duid].setUpObjects(duid);

			// sub to all commands of this robot
			this.subscribeStates("Devices." + duid + ".commands.*");
			this.subscribeStates("Devices." + duid + ".resetConsumables.*");
			this.subscribeStates("Devices." + duid + ".programs.startProgram");
			this.subscribeStates("Devices." + duid + ".deviceInfo.online");
		}
	}

	async initializeDeviceUpdates() {
		this.log.debug(`initializeDeviceUpdates`);

		const devices = this.devices;

		for (const device of devices) {
			const duid = device.duid;
			const robotModel = this.getProductAttribute(duid, "model");

			this.vacuums[duid].mainUpdateInterval = () =>
				this.setInterval(this.updateDataMinimumData.bind(this), this.config.updateInterval * 1000, duid, this.vacuums[duid], robotModel);

			if (device.online) {
				this.log.debug(`${duid} online. Starting mainUpdateInterval.`);
				this.vacuums[duid].mainUpdateInterval(); // actually start mainUpdateInterval()
			}

			this.vacuums[duid].getStatusIntervall = () => this.setInterval(this.getStatus.bind(this), 1000, duid, this.vacuums[duid], robotModel);

			if (device.online) {
				this.log.debug(`${duid} online. Starting getStatusIntervall.`);
				this.vacuums[duid].getStatusIntervall(); // actually start getStatusIntervall()
			}

			await this.updateDataExtraData(duid, this.vacuums[duid]);
			await this.updateDataMinimumData(duid, this.vacuums[duid], robotModel);

			await this.vacuums[duid].getCleanSummary(duid);

			// get map once at start of adapter
			await this.vacuums[duid].getMap(duid);
		}
	}

	async processScene(scene) {
		if (scene && scene?.result) {
			const data = scene.result;
			this.log.debug(`Processing scene ${JSON.stringify(data)}`);

			const programs = {};
			for (const program in data) {
				const enabled = data[program].enabled;
				const programID = data[program].id;
				const programName = data[program].name;
				const param = data[program].param;

				this.log.debug(`Processing scene param ${param}`);
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

	async executeScene(sceneID) {
		if (this.api) {
			try {
				await this.api.post(`user/scene/${sceneID.val}/execute`);
			} catch (error) {
				this.catchError(error.stack, "executeScene");
			}
		}
	}

	async startMapUpdater(duid) {
		if (!this.vacuums[duid].mapUpdater) {
			this.log.debug(`Started map updater on robot: ${duid}`);
			this.vacuums[duid].mapUpdater = this.setInterval(() => {
				this.vacuums[duid].getMap(duid);
			}, this.config.map_creation_interval * 1000);
		} else {
			this.log.debug(`Map updater on robot: ${duid} already running!`);
		}
	}

	async stopMapUpdater(duid) {
		this.log.debug(`Stopping map updater on robot: ${duid}`);

		if (this.vacuums[duid].mapUpdater) {
			this.clearInterval(this.vacuums[duid].mapUpdater);
			this.vacuums[duid].mapUpdater = null;

			await this.vacuums[duid].getCleanSummary(duid);
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
										// this.log.debug(`Sniffing message received!`);
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

	getProductAttribute(duid, attribute) {
		const products = this.products;
		const productID = this.devices.find((device) => device.duid == duid).productId;
		const product = products.find((product) => product.id == productID);

		return product ? product[attribute] : null;
	}

	startMainUpdateInterval(duid, online) {
		const robotModel = this.getProductAttribute(duid, "model");

		this.vacuums[duid].mainUpdateInterval = () =>
			this.setInterval(this.updateDataMinimumData.bind(this), this.config.updateInterval * 1000, duid, this.vacuums[duid], robotModel);
		if (online) {
			this.log.debug(`${duid} online. Starting mainUpdateInterval.`);
			this.vacuums[duid].mainUpdateInterval(); // actually start mainUpdateInterval()
			// Map updater gets startet automatically via getParameter with get_status
		}
	}

	decodeSniffedMessage(data, devices) {
		const dataString = JSON.stringify(data);

		const duidMatch = dataString.match(/\/(\w+)\.\w{3}'/);
		if (duidMatch) {
			const duidSniffed = duidMatch[1];

			const device = devices.find((device) => device.duid === duidSniffed);
			if (device) {
				const localKey = device.localKey;

				const payloadMatch = dataString.match(/'([a-fA-F0-9]+)'/);
				if (payloadMatch) {
					const hexPayload = payloadMatch[1];
					const msg = Buffer.from(hexPayload, "hex");

					const decodedMessage = this.message._decodeMsg(msg, localKey);
					this.log.debug(`Decoded sniffing message: ${JSON.stringify(JSON.parse(decodedMessage.payload))}`);
				}
			}
		}
	}

	async onlineChecker(duid) {
		const homedata = await this.getStateAsync("HomeData");

		// If the home data is not found or if its value is not a string, return false.
		if (homedata && typeof homedata.val == "string") {
			const homedataJSON = JSON.parse(homedata.val);
			const device = homedataJSON.devices.find((device) => device.duid == duid);
			const receivedDevice = homedataJSON.receivedDevices.find((device) => device.duid == duid);

			// If the device is not found, return false.
			if (!device && !receivedDevice) {
				return false;
			}

			return device?.online || receivedDevice?.online;
		} else {
			return false;
		}
	}

	async isRemoteDevice(duid) {
		const homedata = await this.getStateAsync("HomeData");

		if (homedata && typeof homedata.val == "string") {
			const homedataJSON = JSON.parse(homedata.val);
			const receivedDevice = homedataJSON.receivedDevices.find((device) => device.duid == duid);
			const remoteDevice = this.remoteDevices.has(duid);

			if (receivedDevice || remoteDevice) {
				return true;
			}

			return false;
		} else {
			return false;
		}
	}

	async getConnector(duid) {
		const isRemote = await this.isRemoteDevice(duid);

		if (isRemote) {
			return this.rr_mqtt_connector;
		} else {
			return this.localConnector;
		}
	}

	async manageDeviceIntervals(duid) {
		return this.onlineChecker(duid)
			.then((onlineState) => {
				if (!onlineState && this.vacuums[duid].mainUpdateInterval) {
					this.clearInterval(this.vacuums[duid].getStatusIntervall);
					this.clearInterval(this.vacuums[duid].mainUpdateInterval);
					this.clearInterval(this.vacuums[duid].mapUpdater);
				} else if (!this.vacuums[duid].mainUpdateInterval) {
					this.vacuums[duid].getStatusIntervall();
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

	async getStatus(duid, vacuum, robotModel) {
		if (robotModel == "roborock.wm.a102") {
			// nothing for now
		} else if (robotModel == "roborock.wetdryvac.a56") {
			await vacuum.getParameter(duid, "get_status");
		} else {
			await vacuum.getParameter(duid, "get_status");
		}
	}

	async updateDataMinimumData(duid, vacuum, robotModel) {
		this.log.debug(`Latest data requested`);

		if (robotModel == "roborock.wm.a102") {
			// nothing for now
		} else if (robotModel == "roborock.wetdryvac.a56") {
			// nothing for now
		} else {
			await vacuum.getParameter(duid, "get_room_mapping");

			await vacuum.getParameter(duid, "get_consumable");

			await vacuum.getParameter(duid, "get_server_timer");

			await vacuum.getParameter(duid, "get_timer");

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
					await vacuum.getParameter(duid, "get_carpet_mode");
					break;
				case "roborock.vacuum.a27":
					await vacuum.getParameter(duid, "get_dust_collection_switch_status");
					await vacuum.getParameter(duid, "get_wash_towel_mode");
					await vacuum.getParameter(duid, "get_smart_wash_params");
					await vacuum.getParameter(duid, "app_get_dryer_setting");
					break;
				default:
					await vacuum.getParameter(duid, "get_carpet_mode");
					await vacuum.getParameter(duid, "get_carpet_clean_mode");
					await vacuum.getParameter(duid, "get_water_box_custom_mode");
			}
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
		if (this.reconnectApiInterval) {
			this.clearInterval(this.reconnectApiInterval);
		}

		this.localConnector.clearLocalDevicedTimeout();

		for (const duid in this.vacuums) {
			this.clearInterval(this.vacuums[duid].getStatusIntervall);
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

		if (this.webSocketInterval) {
			this.clearInterval(this.webSocketInterval);
		}
	}

	checkAndClearRequest(requestId) {
		const request = this.messageQueue.get(requestId);
		if (!request?.timeout102 && !request?.timeout301) {
			this.messageQueue.delete(requestId);
			// this.log.debug(`Cleared messageQueue`);
		} else {
			this.log.debug(`Not clearing messageQueue. ${request.timeout102}  - ${request.timeout301}`);
		}
		this.log.debug(`Length of message queue: ${this.messageQueue.size}`);
	}

	async updateHomeData(homeId) {
		this.log.debug(`Updating HomeData with homeId: ${homeId}`);
		if (this.api) {
			try {
				const home = await this.api.get(`user/homes/${homeId}`);
				const homedata = home.data.result;

				if (homedata) {
					await this.setState("HomeData", {
						val: JSON.stringify(homedata),
						ack: true,
					});
					this.log.debug(`homedata successfully updated`);

					await this.updateConsumablesPercent(homedata.devices);
					await this.updateConsumablesPercent(homedata.receivedDevices);
					await this.updateDeviceInfo(homedata.devices);
					await this.updateDeviceInfo(homedata.receivedDevices);
				} else {
					this.log.warn("homedata failed to download");
				}
			} catch (error) {
				this.log.error(`Failed to update updateHomeData with error: ${error}`);
			}
		}
	}

	async updateConsumablesPercent(devices) {
		for (const device of devices) {
			const duid = device.duid;
			const deviceStatus = device.deviceStatus;

			for (const [attribute, value] of Object.entries(deviceStatus)) {
				const targetConsumable = await this.getObjectAsync(`Devices.${duid}.consumables.${attribute}`);

				if (targetConsumable) {
					const val = value >= 0 && value <= 100 ? parseInt(value) : 0;
					await this.setState(`Devices.${duid}.consumables.${attribute}`, { val: val, ack: true });
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
					this.setStateChangedAsync("Devices." + duid + ".deviceInfo." + deviceAttribute, { val: devices[device][deviceAttribute], ack: true });
				}
			}
		}
	}

	async checkForNewFirmware(duid) {
		const isLocalDevice = !this.isRemoteDevice(duid);

		if (isLocalDevice) {
			this.log.debug(`getting firmware status`);
			if (this.api) {
				try {
					const update = await this.api.get(`ota/firmware/${duid}/updatev2`);

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
				} catch (error) {
					this.catchError(error, "checkForNewFirmware()", duid);
				}
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
		const robotModel = this.getProductAttribute(duid, "model");
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

	async getRobotVersion(duid) {
		const homedata = await this.getStateAsync("HomeData");
		if (homedata && homedata.val) {
			const devices = JSON.parse(homedata.val.toString()).devices.concat(JSON.parse(homedata.val.toString()).receivedDevices);

			for (const device in devices) {
				if (devices[device].duid == duid) return devices[device].pv;
			}
		}

		return "Error in getRobotVersion. Version not found.";
	}

	getSelectedMap(deviceStatus) {
		const mapStatus = deviceStatus[0].map_status;

		return mapStatus >> 2; // to get the currently selected map perform bitwise right shift
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

	async start_go2rtc(robots, userdata) {
		let cameraCount = 0;

		const go2rtcConfig = { streams: {} };
		for (const duid of Object.keys(robots)) {
			if (this.localKeys) {
				const localKey = this.localKeys.get(duid);

				const { u, s, k } = userdata.rriot;

				if (this.vacuums[duid].features.getFeatureList().isCameraSupported) {
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

	async catchError(error, attribute, duid, model) {
		if (error) {
			if (error.toString().includes("retry") || error.toString().includes("locating") || error.toString().includes("timed out after 30 seconds")) {
				this.log.warn(`Failed to execute ${attribute} on robot ${duid} (${model || "unknown model"}): ${error}`);
			} else {
				this.log.error(`Failed to execute ${attribute} on robot ${duid} (${model || "unknown model"}): ${error.stack || error}`);

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
						await this.vacuums[duid].command(duid, "reset_consumable", command);
					} else {
						this.vacuums[duid].command(duid, command);
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
												this.vacuums[duid].command(duid, command, params);
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
											this.vacuums[duid].command(duid, command, params);
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
				} else if (command == "app_stop") {
					this.stopMapUpdater(duid);
				} else if (command == "startProgram") {
					this.executeScene(state);
				} else if (typeof state.val != "boolean") {
					this.vacuums[duid].command(duid, command, state.val);
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

////////////////////////////////////////////////////////////////////////////////////////////////////

function md5hex(str) {
	return createHash("md5").update(str).digest("hex");
}

// function md5bin(str) {
// 	return crypto.createHash("md5").update(str).digest();
// }
