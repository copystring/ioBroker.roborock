// src/main.ts
/// <reference types="@iobroker/adapter-core" />

import * as utils from "@iobroker/adapter-core";
import { randomBytes } from "crypto";
import { spawn } from "child_process";
import go2rtcPath from "go2rtc-static";

// --- API & Helper Imports ---
import { roborock_package_helper } from "./lib/roborock_package_helper";
import { requestsHandler } from "./lib/requestsHandler";
import { http_api } from "./lib/httpApi";
import { local_api } from "./lib/localApi";
import { mqtt_api } from "./lib/mqttApi";
import { socketHandler } from "./lib/socketHandler";
import { DeviceManager } from "./lib/deviceManager";
import { Feature } from "./lib/features/features.enum";
import { BaseDeviceFeatures } from "./lib/features/baseDeviceFeatures";
import { buildInfo } from "./lib/buildInfo";

export class Roborock extends utils.Adapter {
	// --- Public APIs (accessible by helpers) ---
	public http_api: http_api;
	public local_api: local_api;
	public mqtt_api: mqtt_api;
	public requestsHandler: requestsHandler;
	public socketHandler!: socketHandler;
	public deviceManager!: DeviceManager;

	// --- Internal Properties ---
	public deviceFeatureHandlers: Map<string, BaseDeviceFeatures>;
	public nonce: Buffer;
	public pendingRequests: Map<number, any>;
	public roborock_package_helper: roborock_package_helper;

	public isInitializing: boolean;
	public sentryInstance: any;
	public translations: Record<string, string> = {};

	private commandTimeout: ioBroker.Timeout | undefined = undefined;
	private mqttReconnectInterval: ioBroker.Interval | undefined = undefined;
	public instance: number = 0;

	constructor(options: Partial<utils.AdapterOptions> = {}) {
		super({ ...options, name: "roborock", useFormatDate: true });

		this.instance = options.instance || 0;
		this.nonce = randomBytes(16);
		this.pendingRequests = new Map();
		this.http_api = new http_api(this);
		this.local_api = new local_api(this);
		this.mqtt_api = new mqtt_api(this);
		this.requestsHandler = new requestsHandler(this);

		this.deviceManager = new DeviceManager(this);
		this.socketHandler = new socketHandler(this);
		this.deviceFeatureHandlers = this.deviceManager.deviceFeatureHandlers; // Reference DM's map

		this.roborock_package_helper = new roborock_package_helper(this);

		this.isInitializing = true;

		this.on("ready", this.onReady.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
	}

	/**
	 * Adapter ready logic.
	 */
	async onReady() {
		// Config properties are now type-safe thanks to types.d.ts
		if (!this.config.username) {
			this.log.error("Username missing!");
			return;
		}

		this.sentryInstance = this.getPluginInstance("sentry");
		this.translations = require(`../admin/i18n/${this.language || "en"}/translations.json`);

		this.log.info(`Starting adapter. This might take a few minutes...`);
		this.log.info(`Build Info: Date=${buildInfo.buildDate}, Commit=${buildInfo.commitHash}`);
		await this.setupBasicObjects();

		try {
			const clientID = await this.ensureClientID();
			await this.http_api.init(clientID);
			await this.mqtt_api.init();
			await this.http_api.updateHomeData();

			if (this.config.downloadRoborockImages) {
				this.log.info("Downloading Roborock images...");
				await this.http_api.downloadProductImages();

				// Download additional assets (icons, etc)
				const devices = this.http_api.getDevices();
				for (const device of devices) {
					await this.roborock_package_helper.updateProduct(device.duid);
				}
			}

			await this.local_api.startUdpDiscovery();
			await this.deviceManager.initializeDevices();
			await this.processScenes();
			this.deviceManager.startPolling();
			await this.start_go2rtc();

			this.subscribeStatesAsync("Devices.*.commands.*");
			this.subscribeStatesAsync("Devices.*.resetConsumables.*");
			this.subscribeStatesAsync("Devices.*.programs.startProgram");
			this.subscribeStatesAsync("Devices.*.deviceInfo.online");
			this.subscribeStatesAsync("Devices.*.floors.*.load");

			this.log.info(`Adapter startup finished. Let's go!`);
			this.isInitializing = false;

			// Schedule MQTT API reset every hour (legacy behavior to prevent stale connections)
			this.mqttReconnectInterval = this.setInterval(async () => {
				this.log.debug("Running scheduled MQTT reconnect...");
				await this.resetMqttApi();
			}, 3600 * 1000);
		} catch (e: any) {
			this.log.error(`Failed to initialize adapter: ${e.message}`);
			this.catchError(e, "onReady");
		}
	}

	/**
	 * Message handler for Admin/Vis communication.
	 */
	async onMessage(obj: ioBroker.Message) {
		if (obj && obj.command && obj.callback) {
			try {
				this.log.debug(`[SocketHandler] Received message: ${JSON.stringify(obj)}`);
				// Forward to the dedicated handler
				await this.socketHandler.handleMessage(obj);
			} catch (err: any) {
				this.log.error(`[SocketHandler] Failed to execute command ${obj.command}: ${err.message}`);
				this.sendTo(obj.from, obj.command, { error: err.message }, obj.callback);
			}
		}
	}

	/**
	 * Is called when adapter shuts down.
	 */
	onUnload(callback: () => void) {
		try {
			if (this.mqttReconnectInterval) {
				this.clearInterval(this.mqttReconnectInterval);
			}
			this.clearTimersAndIntervals();
			this.local_api.stopUdpDiscovery();
			this.setState("info.connection", { val: false, ack: true });
			callback();
		} catch (e: any) {
			this.log.error(`Failed to unload adapter: ${e.stack}`);
			callback();
		}
	}

	/**
	 * Is called if a subscribed state changes.
	 */
	async onStateChange(id: string, state: ioBroker.State | null | undefined) {
		if (!state) return;

		if (state.ack) {
			// ... (keep usage of id, state if needed, or previous code)
			if (id.endsWith(".online")) {
				this.log.info(`Device ${id.split(".")[3]} is now ${state.val ? "online" : "offline"}`);
			}
			return;
		}

		// Split ID once
		const idParts = id.split(".");

		// Check for root loginCode (roborock.0.loginCode)
		if (idParts[2] === "loginCode" && state.val && String(state.val).length === 6) {
			this.http_api.submitLoginCode(String(state.val));
			return;
		}

		// Devices logic
		if (idParts[2] !== "Devices") return;

		const duid = idParts[3];
		const folder = idParts[4];
		const command = idParts[5];

		// Special handling for floors (deeply nested: Devices.duid.floors.mapFlag.load)
		if (folder === "floors" && idParts.length >= 7 && idParts[6] === "load") {
			const mapFlag = parseInt(idParts[5], 10);
			if (state.val === true || state.val === "true" || state.val === 1) {
				const handler = this.deviceFeatureHandlers.get(duid);
				if (handler) {
					this.log.info(`[onStateChange] Loading map ${mapFlag} for ${duid}`);
					await this.requestsHandler.command(handler, duid, "load_multi_map", [mapFlag]);

					// Trigger update of room mapping and map after switching floors
					setTimeout(async () => {
						this.log.info(`[onStateChange] Updating map and rooms after floor switch for ${duid}`);
						await handler.updateRoomMapping();
						await handler.updateMap();
					}, 2000); // Small delay to let the robot process the switch

					// Reset button
					this.setTimeout(() => this.setState(id, false, true), 1000);
				}
			}
			return;
		}

		this.log.info(`[onStateChange] Processing command: ${command} for ${duid} in folder: ${folder}`);

		const handler = this.deviceFeatureHandlers.get(duid);
		if (!handler) {
			this.log.warn(`[onStateChange] Received command for unknown DUID: ${duid}`);
			return;
		}

		try {
			await this.handleCommand(duid, folder, command, state, handler, id);
		} catch (e: any) {
			this.catchError(e, `onStateChange (${command})`, duid);
		}
	}

	/**
	 * Handles commands from onStateChange.
	 */
	private async handleCommand(duid: string, folder: string, command: string, state: ioBroker.State, handler: BaseDeviceFeatures, id: string) {
		if (folder === "resetConsumables" && state.val === true) {
			await this.requestsHandler.command(handler, duid, "reset_consumable", command);
			// Reset button
			this.setTimeout(() => {
				this.setState(id, false, true);
			}, 1000);
		} else if (folder === "programs" && command === "startProgram") {
			await this.http_api.executeScene(state as any);
		} else if (folder === "commands") {
			this.log.info(`[handleCommand] Entering commands block for ${command}`);
			try {
				// Handle specific commands
				switch (command) {
					case "load_multi_map":
						await this.requestsHandler.command(handler, duid, command, [state.val]);
						break;
					case "app_start":
					case "app_charge":
					case "app_spot":
						this.log.info(`[handleCommand] Checking boolean command ${command}. Val: ${state.val}`);
						if (state.val === true || state.val === "true" || state.val === 1) {
							this.log.info(`[handleCommand] Triggering command ${command} for ${duid}`);
							await this.requestsHandler.command(handler, duid, command);
						} else {
							this.log.info(`[handleCommand] Command ${command} NOT triggered because value is not true.`);
						}
						break;
					case "app_segment_clean":
						if (state.val === true || state.val === "true" || state.val === 1) {
							// This command reads other states (selected rooms, count)
							this.log.info(`[handleCommand] Triggering app_segment_clean for ${duid}`);
							await this.requestsHandler.command(handler, duid, command);
						}
						break;
					case "app_zoned_clean":
					case "app_goto_target":
						// Expects JSON string "[x,y]" or "[[x1,y1,x2,y2,n]]"
						try {
							const params = JSON.parse(state.val as string);
							await this.requestsHandler.command(handler, duid, command, params);
						} catch {
							this.log.error(`Invalid JSON for ${command}: ${state.val}`);
						}
						break;
					default:
						// Default handler for simple set commands
						// If it's a boolean command (button), we only trigger on true (or truthy)
						if (typeof state.val === "boolean") {
							if (state.val === true) {
								await this.requestsHandler.command(handler, duid, command, state.val);
							}
						} else {
							// For non-boolean, just send the value
							await this.requestsHandler.command(handler, duid, command, state.val);
						}
				}
			} finally {
				// Reset boolean command state
				if ((typeof state.val === "boolean" && state.val === true) || state.val === "true" || state.val === 1) {
					this.log.info(`[handleCommand] Scheduling reset for ${id}`);
					this.commandTimeout = this.setTimeout(() => {
						this.log.info(`[handleCommand] Resetting ${id} to false`);
						this.setState(id, false, true);
					}, 1000);
				}
			}
		}
	}

	/**
	 * Ensures a ClientID exists.
	 */
	async ensureClientID(): Promise<string> {
		try {
			const clientIDState = await this.getStateAsync("clientID"); // Revert to Async
			if (clientIDState?.val) {
				this.log.info(`Loaded existing clientID: ${clientIDState.val}`);
				return clientIDState.val.toString();
			}
			const randomClientID = randomBytes(16).toString("hex");
			await this.setState("clientID", { val: randomClientID, ack: true });
			this.log.info(`Generated and saved new clientID: ${randomClientID}`);
			return randomClientID;
		} catch (error: any) {
			this.log.error(`Error ensuring clientID: ${error.message}`);
			throw error;
		}
	}

	/**
	 * Creates base adapter objects (Folders, States).
	 */
	async setupBasicObjects() {
		await this.setObjectNotExistsAsync("Devices", { type: "folder", common: { name: "Devices" }, native: {} });
		await this.ensureState("UserData", { name: "UserData string", write: false });
		await this.ensureState("HomeData", { name: "HomeData string", write: false });
		await this.ensureState("clientID", { name: "Client ID", write: false });
		await this.ensureState("endpoint", { name: "MQTT endpoint", write: false });
	}

	/**
	 * Processes scenes from HTTP API.
	 */
	async processScenes() {
		const scenes = await this.http_api.getScenes();
		if (!scenes?.result) return;

		const data = scenes.result;
		const programs: Record<string, Record<string, string>> = {};

		for (const program of data) {
			try {
				const { enabled, id, name, param } = program;
				const duid = JSON.parse(param).action.items[0].entityId;

				if (!programs[duid]) programs[duid] = {};
				programs[duid][id] = name;

				await this.ensureFolder(`Devices.${duid}.programs`);
				await this.setObjectNotExistsAsync(`Devices.${duid}.programs.${id}`, {
					type: "folder",
					common: { name },
					native: {},
				});

				await this.ensureState(`Devices.${duid}.programs.${id}.enabled`, { name: "Enabled", type: "boolean" });
				this.setState(`Devices.${duid}.programs.${id}.enabled`, enabled, true);

				// ... (rest of scene item processing)
			} catch (e: any) {
				this.log.warn(`[processScenes] Failed to process scene '${program.name}' (ID: ${program.id}): ${e.message}`);
			}
		}

		for (const duid in programs) {
			await this.ensureState(`Devices.${duid}.programs.startProgram`, {
				name: "Start saved program",
				type: "string",
				write: true,
				states: programs[duid],
			});
		}
	}

	/**
	 * Clears all timeouts and intervals.
	 */
	clearTimersAndIntervals() {
		if (this.commandTimeout) this.clearTimeout(this.commandTimeout as any);

		this.deviceManager.stopPolling();
		this.requestsHandler.clearQueue();
	}

	/**
	 * Updates general device info (online status, etc.).
	 */
	async updateDeviceInfo(duid: string, devices: any[]) {
		const device = devices.find((d) => d.duid === duid);
		if (!device) return;

		for (const attr in device) {
			if (typeof device[attr] !== "object") {
				const common: Partial<ioBroker.StateCommon> = {};
				let value = device[attr];

				if (attr === "activeTime") {
					value = new Date(value * 1000).toLocaleString();
					common.unit = "";
					common.type = "string";
				} else if (attr === "createTime") {
					value = new Date(value * 1000).toLocaleString();
					common.type = "string";
				} else {
					common.type = typeof value as ioBroker.CommonType;
				}

				await this.ensureState(`Devices.${duid}.deviceInfo.${attr}`, common);
				await this.setStateChanged(`Devices.${duid}.deviceInfo.${attr}`, { val: value, ack: true });
			}
		}
	}

	/**
	 * Checks for new firmware.
	 */
	async checkForNewFirmware(duid: string) {
		const isLocal = this.local_api.isLocalDevice(duid);
		if (!isLocal) return;

		try {
			this.log.debug(`[checkForNewFirmware] Checking for firmware update for ${duid}...`);
			const update = await this.http_api.getFirmwareStates(duid);
			this.log.debug(`[checkForNewFirmware] Result for ${duid}: ${JSON.stringify(update)}`);

			if (update.data.result) {
				for (const state in update.data.result) {
					const value = update.data.result[state];
					await this.ensureState(`Devices.${duid}.updateStatus.${state}`, { type: typeof value as ioBroker.CommonType });
					await this.setStateChanged(`Devices.${duid}.updateStatus.${state}`, { val: value, ack: true });
				}
			} else {
				this.log.warn(`[checkForNewFirmware] No result in firmware update response for ${duid}`);
			}
		} catch (error) {
			this.log.warn(`Failed to check for new firmware: ${error}`);
		}
	}



	/**
	 * Creates a state if it doesn't exist, applying translations.
	 */
	public async ensureState(path: string, commonOptions: Partial<ioBroker.StateCommon>, native: Record<string, any> = {}) {


		const stateName = path.split(".").pop() || path;
		const translatedName = commonOptions.name || this.translations[stateName] || stateName;

		const baseCommon: ioBroker.StateCommon = {
			name: translatedName,
			type: "string",
			role: "value",
			read: true,
			write: false,
		};

		const finalCommon = { ...baseCommon, ...commonOptions };
		if (finalCommon.def === undefined || finalCommon.def === null || finalCommon.def === "") {
			delete finalCommon.def;
		}

		let oldObj: ioBroker.Object | null | undefined;
		try {
			oldObj = await this.getObjectAsync(path);
		} catch {
			oldObj = null; // Does not exist
		}

		// Check if object exists AND if its type is different from what we need
		if (!oldObj || oldObj.common.type !== finalCommon.type) {
			if (oldObj) {
				// Object exists, but type is wrong - let's fix it
				this.log.warn(`[ensureState] Correcting data type for "${path}". Old: "${oldObj.common.type}", New: "${finalCommon.type}".`);

				// Safely merge common properties, ensuring type is updated
				const newCommon = { ...oldObj.common, ...finalCommon };

				// Force extension to apply changes
				await this.extendObject(path, { common: newCommon });
			} else {
				// Object does not exist, create it new
				await this.setObject(path, {
					type: "state",
					common: finalCommon,
					native: native,
				});
			}
		}
	}

	/**
	 * Creates a folder if it doesn't exist, applying translations.
	 */
	async ensureFolder(path: string) {


		const attribute = path.split(".").pop() || path;
		await this.setObjectNotExistsAsync(path, {
			type: "folder",
			common: { name: this.translations[attribute] || attribute },
			native: {},
		});
	}

	/**
	 * Gets the protocol version for a device.
	 */
	async getDeviceProtocolVersion(duid: string): Promise<string> {
		const tcpConnected = this.local_api.isConnected(duid);
		if (tcpConnected && !this.requestsHandler.isCloudDevice(duid)) {
			return this.local_api.getLocalProtocolVersion(duid) || "1.0";
		}

		const device = this.http_api.getDevices().find((d) => d.duid == duid);
		return device?.pv || "1.0";
	}

	/**
	 * Starts the go2rtc process if cameras are present.
	 */
	async start_go2rtc() {
		const devices = this.http_api.getDevices();
		const localKeys = this.http_api.getMatchedLocalKeys();
		const { u, s, k } = this.http_api.get_rriot();

		const port = 8554 + this.instance;
		const rtspPort = 1984 + this.instance;
		const go2rtcConfig = {
			server: { listen: `:${port}` },
			rtsp: { listen: `:${rtspPort}` },
			streams: {} as Record<string, string>,
		};
		let cameraCount = 0;

		for (const device of devices) {
			const duid = device.duid;
			const handler = this.deviceFeatureHandlers.get(duid);
			const localKey = localKeys.get(duid);

			if (handler && localKey && handler.hasStaticFeature(Feature.Camera)) {
				cameraCount++;
				go2rtcConfig.streams[duid] = `roborock://mqtt-eu-3.roborock.com:8883?u=${u}&s=${s}&k=${k}&did=${duid}&key=${localKey}&pin=${this.config.cameraPin}`;
			}
		}

		if (cameraCount > 0 && go2rtcPath) {
			try {
				const go2rtcProcess = spawn(go2rtcPath.toString(), ["-config", JSON.stringify(go2rtcConfig)], { shell: false, detached: false, windowsHide: true });

				go2rtcProcess.on("error", (err) => this.log.error(`Error starting go2rtc: ${err.message}`));
				go2rtcProcess.stdout.on("data", (data) => this.log.debug(`go2rtc output: ${data}`));
				go2rtcProcess.stderr.on("data", (data) => this.log.error(`go2rtc error output: ${data}`));
				process.on("exit", () => go2rtcProcess.kill());
			} catch (error: any) {
				this.log.error(`Failed to spawn go2rtc: ${error.message}`);
			}
		}
	}

	/**
	 * Processes A01 (Tuya) protocol messages.
	 */
	async processA01(duid: string, response: { dps?: Record<string, any> }): Promise<void> {
		if (!response?.dps) {
			this.log.warn(`[A01|${duid}] Invalid response: ${JSON.stringify(response)}`);
			return;
		}

		this.log.debug(`[A01] Update for ${duid}: ${JSON.stringify(response.dps)}`);

		const determineType = (value: any): ioBroker.CommonType => {
			const t = typeof value;
			if (t === "number") return "number";
			if (t === "boolean") return "boolean";
			return "string";
		};

		// Recursive helper for nested JSON objects
		const processNested = async (basePath: string, obj: Record<string, any>) => {
			for (const [key, value] of Object.entries(obj)) {
				const path = `${basePath}.${key}`;
				if (typeof value === "object" && value !== null && !Array.isArray(value)) {
					await this.ensureFolder(path);
					await processNested(path, value);
				} else {
					const val = typeof value === "object" || value === null ? JSON.stringify(value) : value;
					await this.ensureState(path, { name: key, type: determineType(value), write: false });
					await this.setStateChanged(path, { val, ack: true });
				}
			}
		};

		for (const [id, value] of Object.entries(response.dps)) {
			// A01 states are not defined in main.ts anymore, this is just a fallback name
			const stateName = id;
			let parsedValue = value;
			let isJson = false;

			if (typeof value === "string" && value.startsWith("{") && value.endsWith("}")) {
				try {
					parsedValue = JSON.parse(value);
					isJson = true;
				} catch {
					/* ignore */
				}
			}

			if (isJson && typeof parsedValue === "object" && parsedValue !== null) {
				const basePath = `Devices.${duid}.${id}`; // Use ID as folder name
				await this.ensureFolder(basePath);
				await processNested(basePath, parsedValue);
			} else {
				const path = `Devices.${duid}.deviceStatus.${id}`;
				await this.ensureState(path, { name: stateName, type: determineType(value), write: false });
				await this.setStateChanged(path, { val: parsedValue, ack: true });
			}
		}
	}

	/**
	 * Resets the MQTT API instance.
	 */
	async resetMqttApi() {
		this.log.info("Resetting MQTT API instance...");
		if (this.mqtt_api) {
			this.mqtt_api.cleanup();
			this.requestsHandler.clearQueue(); // Prevents pending promises
		}
		// Create a new MQTT API instance and initialize it
		this.mqtt_api = new mqtt_api(this);
		await this.mqtt_api.init();
		this.log.info("MQTT API instance has been reset.");
	}

	/**
	 * Centralized error handler.
	 */
	async catchError(error: any, attribute?: string, duid?: string) {
		const robotModel = duid ? this.http_api.getRobotModel(duid) : "unknown";
		const msg = `Failed processing ${attribute || "task"} on ${duid || "adapter"} (${robotModel}): ${error?.stack || error}`;

		if (error?.toString().includes("retry") || error?.toString().includes("locating") || error?.toString().includes("timed out")) {
			this.log.warn(msg);
		} else {
			this.log.error(msg);
			if (this.sentryInstance) {
				this.sentryInstance.getSentryObject().captureException(error);
			}
		}
	}
}

if (require.main !== module) {
	// Export the constructor in compact mode
	module.exports = (options: Partial<utils.AdapterOptions>) => new Roborock(options);
} else {
	// otherwise start the instance directly
	new Roborock();
}
