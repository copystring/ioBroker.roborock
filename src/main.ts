// src/main.ts
/// <reference types="@iobroker/adapter-core" />

import * as utils from "@iobroker/adapter-core";
import { ChildProcess, spawn } from "child_process";
import { randomBytes } from "crypto";
import go2rtcPath from "go2rtc-static";
import { commitInfo } from "./lib/commitInfo";

// --- API & Helper Imports ---
import { AppPluginManager } from "./lib/AppPluginManager";
import { DeviceManager } from "./lib/deviceManager";
import { BaseDeviceFeatures } from "./lib/features/baseDeviceFeatures";
import { Feature } from "./lib/features/features.enum";

import { http_api } from "./lib/httpApi";
import { local_api } from "./lib/localApi";
import { MapManager } from "./lib/map/MapManager";
import { mqtt_api } from "./lib/mqttApi";
import { requestsHandler } from "./lib/requestsHandler";
import { socketHandler } from "./lib/socketHandler";


export class Roborock extends utils.Adapter {
	// --- Public APIs (accessible by helpers) ---
	public http_api: http_api;
	public local_api: local_api;
	public mqtt_api: mqtt_api;
	public requestsHandler: requestsHandler;
	public socketHandler!: socketHandler;
	public deviceManager!: DeviceManager;
	public mapManager: MapManager;

	// --- Internal Properties ---
	public deviceFeatureHandlers: Map<string, BaseDeviceFeatures>;
	public nonce: Buffer;
	public pendingRequests: Map<number, any>;
	public appPluginManager: AppPluginManager;

	public isInitializing: boolean;
	public sentryInstance: any;
	public translations: Record<string, string> = {};

	private commandTimeouts: Map<string, ioBroker.Timeout> = new Map();
	private mqttReconnectInterval: ioBroker.Interval | undefined = undefined;
	public instance: number = 0;
	private go2rtcProcess: ChildProcess | null = null;
	// Bound exit handler to prevent memory leaks while allowing process.removeListener
	private onExitBound: (() => void) | null = null;

	constructor(options: Partial<utils.AdapterOptions> = {}) {
		super({ ...options, name: "roborock", useFormatDate: true });

		this.instance = options.instance || 0;
		this.nonce = randomBytes(16);
		this.pendingRequests = new Map();
		this.http_api = new http_api(this);
		this.local_api = new local_api(this);
		this.mqtt_api = new mqtt_api(this);
		this.requestsHandler = new requestsHandler(this);
		this.mapManager = new MapManager(this);

		this.deviceManager = new DeviceManager(this);
		this.socketHandler = new socketHandler(this);
		this.deviceFeatureHandlers = this.deviceManager.deviceFeatureHandlers;

		this.appPluginManager = new AppPluginManager(this);

		this.isInitializing = true;

		this.on("ready", this.onReady.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));

		// Global Error Handlers
		process.on("uncaughtException", (err) => {
			this.rLog("System", null, "Error", undefined, undefined, `Uncaught Exception: ${err.message}\n${err.stack}`, "error");
		});

		process.on("unhandledRejection", (reason) => {
			this.rLog("System", null, "Error", undefined, undefined, `Unhandled Rejection: ${reason}`, "error");
		});
	}

	/**
	 * Adapter ready logic.
	 */
	async onReady() {
		// Config properties are now type-safe thanks to types.d.ts
		if (!this.config.username) {
			this.rLog("System", null, "Error", undefined, undefined, "Username missing!", "error");
			return;
		}

		this.sentryInstance = this.getPluginInstance("sentry");
		this.translations = require(`../admin/i18n/${this.language || "en"}/translations.json`);

		this.rLog("System", null, "Info", undefined, undefined, "Starting adapter. This might take a few minutes...", "info");
		this.rLog("System", null, "Info", undefined, undefined, `Build Info: Date=${commitInfo.commitDate}, Commit=${commitInfo.commitHash}`, "info");

		// Log redacted config
		const configSummary = {
			...this.config,
			password: this.config.password ? "******" : "NOT_SET",
			cameraPin: this.config.cameraPin ? "******" : undefined,
		};
		this.rLog("System", null, "Info", undefined, undefined, `Config: ${JSON.stringify(configSummary)}`, "info");

		await this.setupBasicObjects();

		try {
			const clientID = await this.ensureClientID();
			await this.http_api.init(clientID);

			// 1. Start Cloud Data Sync (Get Keys & DUIDs)
			await this.http_api.updateHomeData();

			// 2a. Start UDP Discovery (Essential for determining Local/Cloud mode before Init)
			await this.local_api.startUdpDiscovery();

			// 2b. Start MQTT and WAIT for the connection to be established
			await this.mqtt_api.init();

			// --- Pre-Init Network Probe (Docker/VLAN Support) ---
			this.rLog("System", null, "Info", undefined, undefined, "Starting Pre-Init Network Probe...", "info");
			const allDevices = this.http_api.getDevices();
			const probePromises = allDevices.map(async (device) => {
				const duid = device.duid;
				// If already local (UDP found it), skip
				if (this.local_api.isConnected(duid)) return;

				try {
					// 1. Get Network Info (via MQTT as we have no TCP yet)
					this.rLog("System", duid, "Debug", undefined, undefined, "Probing network info via Cloud...", "debug");
					const result = await this.requestsHandler.sendRequest(duid, "get_network_info", []);

					// 2. Extract IP
					let networkData: any = result;
					if (Array.isArray(result)) networkData = result[0];

					if (networkData && networkData.ip) {
						// 3. Attempt TCP Connect with short timeout (1.5s) and silent logging
						await this.local_api.checkAndPromoteLocalConnection(duid, networkData.ip, 1500, true);
					}
				} catch (e: any) {
					this.rLog("System", duid, "Debug", undefined, undefined, `Probe failed: ${e.message}`, "debug");
				}
			});

			// Wait for all probes to finish (with timeout to not block forever)
			await Promise.race([
				Promise.all(probePromises),
				new Promise(resolve => setTimeout(resolve, 2000)) // Max 2s probe time
			]);
			this.rLog("System", null, "Info", undefined, undefined, "Network Probe finished.", "info");
			// ----------------------------------------------------

			// 3. Initialize Devices (now that communication channels are ready)
			await this.deviceManager.initializeDevices();

			// Download Assets and Updates in background to avoid blocking startup
			this.rLog("System", null, "Info", undefined, undefined, "Starting background asset and plugin updates...", "info");

			// Non-blocking background tasks
			(async () => {
				try {
					await this.http_api.downloadProductImages();
					const devices = this.http_api.getDevices();
					for (const device of devices) {
						await this.appPluginManager.updateProduct(device.duid).catch(e =>
							this.rLog("System", device.duid, "Warn", undefined, undefined, `Background plugin update failed: ${e.message}`, "warn")
						);
					}
				} catch (e: any) {
					this.rLog("System", null, "Warn", undefined, undefined, `Background maintenance failed: ${e.message}`, "warn");
				}
			})();

			// Parallelize non-dependent startup tasks
			await Promise.all([
				this.processScenes(),
				this.start_go2rtc(),
				this.subscribeStatesAsync("Devices.*.commands.*"),
				this.subscribeStatesAsync("Devices.*.resetConsumables.*"),
				this.subscribeStatesAsync("Devices.*.programs.*"),
				this.subscribeStatesAsync("loginCode")
			]);

			this.deviceManager.startPolling();

			this.rLog("System", null, "Info", undefined, undefined, "Adapter startup finished. Let's go!", "info");
			this.isInitializing = false;

			// Schedule MQTT API reset every hour (legacy behavior to prevent stale connections)
			this.mqttReconnectInterval = this.setInterval(async () => {
				this.rLog("System", null, "Debug", undefined, undefined, "Running scheduled MQTT reconnect...", "debug");
				await this.resetMqttApi();
			}, 3600 * 1000);
		} catch (e: any) {
			this.rLog("System", null, "Error", undefined, undefined, `Failed to initialize adapter: ${e.message}`, "error");
			this.catchError(e, "onReady");
		}
	}

	/**
	 * Message handler for Admin/Vis communication.
	 */
	async onMessage(obj: ioBroker.Message) {
		if (obj && obj.command && obj.callback) {
			try {
				this.rLog("Requests", null, "Debug", undefined, undefined, `Received message: ${JSON.stringify(obj)}`, "debug");
				// Forward to the dedicated handler
				await this.socketHandler.handleMessage(obj);
			} catch (err: any) {
				this.rLog("Requests", null, "Error", undefined, undefined, `Failed to execute command ${obj.command}: ${err.message}`, "error");
				this.sendTo(obj.from, obj.command, { error: err.message }, obj.callback);
			}
		}
	}

	/**
	 * Executes a scene locally by parsing the scene definition and sending commands to the device.
	 */
	async executeSceneLocal(sceneId: string | number): Promise<void> {
		try {
			this.log.info(`[executeSceneLocal] specific scene execution for ID: ${sceneId}`);

			// 1. Fetch scenes
			const scenes = await this.http_api.getScenes();
			if (!scenes || !scenes.result) {
				this.log.error(`[executeSceneLocal] Failed to fetch scenes or no result.`);
				return;
			}

			// 2. Find target scene
			// Scene ID from state might be string, API returns number. Compare loosely or convert.
			const scene = scenes.result.find((s: any) => s.id == sceneId);

			if (!scene) {
				this.log.error(`[executeSceneLocal] Scene with ID ${sceneId} not found.`);
				return;
			}

			this.log.debug(`[executeSceneLocal] Found scene: ${scene.name}`);

			// 3. Parse 'param' field
			let params;
			try {
				params = JSON.parse(scene.param);
			} catch (e) {
				this.log.error(`[executeSceneLocal] Failed to parse scene params: ${e}`);
				return;
			}

			// 4. Iterate actions and execute
			if (params.action && params.action.items) {
				for (const item of params.action.items) {
					if (item.type === "CMD") {
						const targetDuid = item.entityId;
						let commandPayload;

						try {
							commandPayload = JSON.parse(item.param);
						} catch (e) {
							this.log.error(`[executeSceneLocal] Failed to parse command params for item ${item.id}: ${e}`);
							continue;
						}

						const method = commandPayload.method;
						const args = commandPayload.params;

						this.log.info(`[executeSceneLocal] Executing scene '${scene.name}': sending '${method}' to ${targetDuid}`);

						// 5. Send command via requestsHandler
						// We pass 'null' as handler because we are sending a raw command directly via specific method/args
						// and don't need the abstraction of 'BaseDeviceFeatures' here if we go direct.
						// However, requestsHandler.command expects a handler.
						// Let's resolve the handler for the target Duid if possible, or cast/hack if needed.
						const handler = this.deviceFeatureHandlers.get(targetDuid);

						if (handler) {
							await this.requestsHandler.command(handler, targetDuid, method, args);
						} else {
							this.log.warn(`[executeSceneLocal] No handler found for device ${targetDuid}. Attempting raw send.`);
							// Fallback if no handler (though rare for known devices)
							await this.requestsHandler.sendRequest(targetDuid, method, args);
						}
					}
				}
			} else {
				this.log.warn(`[executeSceneLocal] Scene ${sceneId} has no actions.`);
			}

		} catch (e: any) {
			this.log.error(`[executeSceneLocal] Error executing scene: ${e} ${e.stack}`);
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
			this.mqtt_api.cleanup();
			this.local_api.stopUdpDiscovery();

			// Remove the global process exit listener to prevent memory leaks
			if (this.onExitBound) {
				process.removeListener("exit", this.onExitBound);
				this.onExitBound = null;
			}

			if (this.go2rtcProcess) {
				this.log.info("Killing go2rtc process...");
				this.go2rtcProcess.kill();
				this.go2rtcProcess = null;
			}
			this.setState("info.connection", { val: false, ack: true });
			callback();
		} catch (e: any) {
			this.rLog("System", null, "Error", undefined, undefined, `Failed to unload adapter: ${e.stack}`, "error");
			callback();
		}
	}

	/**
	 * Is called if a subscribed state changes.
	 */
	async onStateChange(id: string, state: ioBroker.State | null | undefined) {
		if (!state) return;

		// Split ID once
		const idParts = id.split(".");

		if (state.ack) {
			// ... (keep usage of id, state if needed, or previous code)
			if (id.endsWith(".online")) {
				this.rLog("System", idParts[3], "Info", undefined, undefined, `Device is now ${state.val ? "online" : "offline"}`, "info");
			}
			return;
		}

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
		if (folder === "floors" && idParts.length >= 7) {
			const mapFlag = parseInt(idParts[5], 10);
			const target = idParts[6];

			// Load Map Button
			if (target === "load" && (state.val === true || state.val === "true" || state.val === 1)) {
				await this.handleFloorSwitch(duid, mapFlag, id);
				return;
			}
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
			await this.requestsHandler.command(handler, duid, "reset_consumable", command, id);
			// Reset button
			this.setResetTimeout(id);
		} else if (folder === "programs" && command === "startProgram") {
			await this.executeSceneLocal(state.val as string);
			this.setResetTimeout(id); // Use setResetTimeout to reset to null/empty after 1s?
			// Actually executeSceneLocal takes time.
			// Better: explicit reset.
			await this.setState(id, { val: null, ack: true });
		} else if (folder === "commands") {
			this.log.info(`[handleCommand] Entering commands block for ${command}`);
			try {
				await this.executeCommand(handler, duid, command, state);
			} finally {

				// Reset boolean command state ONLY if it is defined as boolean
				const cmdDef = handler.commands[command];
				const isBoolean = cmdDef && cmdDef.type === "boolean";

				if (isBoolean && this.isTruthy(state.val)) {
					this.log.info(`[handleCommand] Scheduling reset for ${id} (type: boolean)`);
					this.setResetTimeout(id);
				}
			}
		}
	}

	/**
	 * Executes a specific command for a device.
	 */
	private async executeCommand(handler: BaseDeviceFeatures, duid: string, command: string, state: ioBroker.State) {
		const val = state.val;

		// 1. Common command types handling
		const cmdDef = handler.commands[command];
		const isButton = cmdDef?.role === "button" || cmdDef?.type === "boolean";

		if (isButton) {
			if (this.isTruthy(val)) {
				this.log.info(`[executeCommand] Triggering button command: ${command} for ${duid}`);
				await this.requestsHandler.command(handler, duid, command);
			} else {
				this.log.debug(`[executeCommand] Ignoring button command: ${command} (val: ${val})`);
			}
			return;
		}


		// Log start of command execution for diagnostics
		this.log.info(`[executeCommand] Starting command ${command} with params ${typeof val === "object" ? JSON.stringify(val) : val}`);

		// 2. Generic data commands (Numbers, Strings, JSON strings)
		// We pass the raw value. getCommandParams in feature handlers will do the packaging (e.g. [val]).
		if (typeof val === "string") {
			const parsed = this.tryParseJson(val);
			await this.requestsHandler.command(handler, duid, command, parsed !== undefined ? parsed : val);
		} else {
			await this.requestsHandler.command(handler, duid, command, val);
		}
	}

	private isTruthy(val: any): boolean {
		return val === true || val === "true" || val === 1 || val === "1";
	}

	/**
	 * Sets a timeout to reset a state to false after 1 second.
	 * Helps avoid race conditions by managing timeouts in a map.
	 */
	private setResetTimeout(id: string): void {
		const timeoutKey = `${id}_reset`;
		if (this.commandTimeouts.has(timeoutKey)) {
			this.clearTimeout(this.commandTimeouts.get(timeoutKey)!);
		}
		const timeout = this.setTimeout(() => {
			this.log.debug(`[setResetTimeout] Resetting ${id} to false`);
			this.setState(id, false, true);
			this.commandTimeouts.delete(timeoutKey);
		}, 1000);
		if (timeout) this.commandTimeouts.set(timeoutKey, timeout);
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
		this.commandTimeouts.forEach((timeout) => this.clearTimeout(timeout));
		this.commandTimeouts.clear();

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
					value = this.formatRoborockDate(value);
					common.unit = "";
					common.type = "string";
				} else if (attr === "createTime") {
					value = this.formatRoborockDate(value);
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
		// Allow empty string as name if explicitly provided. Only use fallback if name is undefined.
		const translatedName = commonOptions.name !== undefined ? commonOptions.name : (this.translations[stateName] || stateName);

		const baseCommon: ioBroker.StateCommon = {
			name: translatedName,
			type: "string",
			role: "value",
			read: true,
			write: false,
		};

		const finalCommon = { ...baseCommon, ...commonOptions, name: translatedName };
		if (finalCommon.def === undefined || finalCommon.def === null || finalCommon.def === "") {
			delete finalCommon.def;
		}

		let oldObj: ioBroker.Object | null | undefined;
		try {
			oldObj = await this.getObjectAsync(path);
		} catch {
			oldObj = null; // Does not exist
		}

		// Check if object exists AND if its metadata is different from what we need
		if (oldObj && !this.hasCommonChanged(oldObj.common as ioBroker.StateCommon, finalCommon)) {
			return;
		}

		try {
			if (oldObj) {
				// Object exists, but metadata changed
				this.log.silly(`[ensureState] Updating metadata for "${path}".`);

				// Safely merge common properties
				const newCommon = { ...oldObj.common, ...finalCommon };

				// Force extension to apply changes
				await this.extendObject(path, { common: newCommon });
			} else {
				// Object does not exist, create it new.
				// Provide mandatory defaults for a valid ioBroker state object.
				const defaults: Partial<ioBroker.StateCommon> = {
					role: "state",
					read: true,
					write: false,
					type: "mixed"
				};
				const commonObj: ioBroker.StateCommon = { ...defaults, ...finalCommon } as ioBroker.StateCommon;

				if (!commonObj.type) commonObj.type = "mixed";

				await this.setObject(path, {
					type: "state",
					common: commonObj,
					native: native,
				});
			}
		} catch (e: any) {
			this.log.error(`[ensureState] Failed to update/create object for "${path}": ${e.message}`);
		}
	}

	/**
	 * Helper to check if common properties of an object have meaningfully changed.
	 *
	 * PERFORMANCE CRITICAL:
	 * This method prevents "Write Storms" to the ioBroker database (objects.json/redis).
	 * Writing objects is expensive (disk I/O) and triggers system-wide events.
	 * We only write if the definition (name, role, unit, etc.) has actually changed.
	 * This significantly reduces CPU usage and disk wear on startup.
	 */
	private hasCommonChanged(oldCommon: ioBroker.StateCommon, newCommon: Partial<ioBroker.StateCommon>): boolean {
		if (newCommon.type !== undefined && oldCommon.type !== newCommon.type) return true;
		if (newCommon.name !== undefined && this.stringifySorted(oldCommon.name) !== this.stringifySorted(newCommon.name)) return true;
		if (newCommon.states !== undefined && this.stringifySorted(oldCommon.states) !== this.stringifySorted(newCommon.states)) return true;
		if (newCommon.role !== undefined && oldCommon.role !== newCommon.role) return true;
		if (newCommon.unit !== undefined && oldCommon.unit !== newCommon.unit) return true;
		if (newCommon.min !== undefined && oldCommon.min !== newCommon.min) return true;
		if (newCommon.max !== undefined && oldCommon.max !== newCommon.max) return true;
		if (newCommon.icon !== undefined && oldCommon.icon !== newCommon.icon) return true;
		if (newCommon.read !== undefined && oldCommon.read !== newCommon.read) return true;
		if (newCommon.write !== undefined && oldCommon.write !== newCommon.write) return true;
		if (newCommon.def !== undefined && oldCommon.def !== newCommon.def) return true;
		return false;
	}

	/**
	 * JSON.stringify with sorted keys for consistent object comparison.
	 */
	private stringifySorted(obj: any): string {
		return JSON.stringify(obj, (_key, value) => {
			if (value && typeof value === "object" && !Array.isArray(value)) {
				return Object.keys(value)
					.sort()
					.reduce((sorted: any, key) => {
						sorted[key] = value[key];
						return sorted;
					}, {});
			}
			return value;
		});
	}

	/**
	 * Helper to format Roborock timestamps (seconds) to locale string.
	 */
	public formatRoborockDate(timestamp: number): string {
		return new Date(timestamp * 1000).toLocaleString();
	}

	/**
	 * Helper to safely parse JSON strings that look like objects/arrays.
	 */
	private tryParseJson(value: string): any | undefined {
		const trimmed = value.trim();
		if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && (trimmed.endsWith("}") || trimmed.endsWith("]"))) {
			try {
				return JSON.parse(trimmed);
			} catch {
				return undefined;
			}
		}
		return undefined;
	}

	/**
	 * Creates a folder if it doesn't exist, applying translations.
	 */
	async ensureFolder(path: string, customName?: string | ioBroker.StringOrTranslated) {
		const attribute = path.split(".").pop() || path;
		const name = customName || this.translations[attribute] || attribute;

		let oldObj: ioBroker.Object | null | undefined;
		try {
			oldObj = await this.getObjectAsync(path);
		} catch {
			oldObj = null; // Does not exist
		}

		if (!oldObj || oldObj.type !== "folder") {
			await this.setObject(path, {
				type: "folder",
				common: {
					name: name
				},
				native: {}
			});
		} else {
			const currentName = oldObj.common.name;
			const isDifferent = JSON.stringify(currentName) !== JSON.stringify(name);

			if (isDifferent) {
				try {
					await this.extendObject(path, { common: { name } });
				} catch (e: any) {
					this.log.error(`Failed to update folder name for ${path}: ${e.message}`);
				}
			}
		}
	}

	/**
	 * Gets the protocol version for a device.
	 */
	async getDeviceProtocolVersion(duid: string): Promise<string> {
		const tcpConnected = this.local_api.isConnected(duid);

		if (tcpConnected) {
			const localPv = this.local_api.getLocalProtocolVersion(duid);
			if (localPv) return localPv;
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

		const apiPort = 1984 + this.instance; // API/Web Port
		const rtspPort = 8554 + this.instance; // RTSP Port
		const go2rtcConfig = {
			server: { listen: `:${apiPort}` },
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
				this.go2rtcProcess = spawn(go2rtcPath.toString(), ["-config", JSON.stringify(go2rtcConfig)], { shell: false, detached: false, windowsHide: true });

				this.go2rtcProcess!.on("error", (err) => this.log.error(`Error starting go2rtc: ${err.message}`));
				this.go2rtcProcess!.stdout!.on("data", (data) => this.log.debug(`go2rtc output: ${data.toString().trim()}`));
				this.go2rtcProcess!.stderr!.on("data", (data) => this.log.error(`go2rtc error output: ${data.toString().trim()}`));

				// Remove the process reference on exit to prevent double-kill attempts
				// Remove the process reference on exit to prevent double-kill attempts
				this.go2rtcProcess!.on("exit", () => {
					this.go2rtcProcess = null;
				});

				// Safety net: Ensure child process ensures if Node.js crashes/exits
				this.onExitBound = () => {
					if (this.go2rtcProcess) {
						this.go2rtcProcess.kill();
					}
				};
				process.on("exit", this.onExitBound);
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

		// this.log.debug(`[A01] Update for ${duid}: ${JSON.stringify(response.dps)}`);

		const determineType = (value: any): ioBroker.CommonType => {
			const t = typeof value;
			if (t === "number") return "number";
			if (t === "boolean") return "boolean";
			if (t === "object" && value !== null) return "object";
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

			if (typeof value === "object" && value !== null) {
				parsedValue = value;
				isJson = true;
			} else if (typeof value === "string") {
				const maybeJson = this.tryParseJson(value);
				if (maybeJson !== undefined) {
					parsedValue = maybeJson;
					isJson = true;
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

	/**
	 * Centralized Logging Function for Protocol Messages
	 * Format: [Connection] [duid] direction [version] [protocol] [ID: id] | payload
	 */
	rLog(connection: "MQTT" | "TCP" | "UDP" | "HTTP" | "Cloud" | "Local" | "System" | "MapManager" | "Requests" | "Unknown", duid: string | null | undefined, direction: "<-" | "->" | "Info" | "Error" | "Warn" | "Debug", version: string | undefined, protocol: string | number | undefined, message: string, level: "silly" | "debug" | "info" | "warn" | "error" = "debug", msgId?: string | number): void {
		// Use == as a neutral placeholder for alignment if it's not actual traffic (<- or ->).
		const directionDisplay = (direction === "<-" || direction === "->") ? direction : "==";

		// Construct prefix and message body using parts to ensure clean spacing.
		const parts = [directionDisplay, `[${connection}]`];
		if (duid) parts.push(`[${duid}]`);
		if (version) parts.push(`[${version}]`);
		if (protocol) parts.push(`[${protocol}]`);
		if (msgId !== undefined) parts.push(`[ID: ${msgId}]`);

		const logMsg = `${parts.join(" ")} | ${message}`;

		switch (level) {
			case "silly": this.log.silly(logMsg); break;
			case "debug": this.log.debug(logMsg); break;
			case "info": this.log.info(logMsg); break;
			case "warn": this.log.warn(logMsg); break;
			case "error": this.log.error(logMsg); break;
		}
	}

	// Helper to handle floor switching logic (extracted to reduce nesting)
	async handleFloorSwitch(duid: string, mapFlag: number, stateId: string): Promise<void> {
		const handler = this.deviceFeatureHandlers.get(duid);
		if (!handler) return;

		try {
			this.log.info(`[onStateChange] Loading map ${mapFlag} for ${duid}`);
			// 1. Send load command and wait for robot ACK
			await this.requestsHandler.sendRequest(duid, "load_multi_map", [mapFlag], { timeout: 60000 });

			this.log.info(`[onStateChange] Verified map load result. Verifying robot state sync for ${duid}`);

			// Failsafe: Robot says "ok" but might need a few seconds to switch currentMapIndex
			const startTime = Date.now();
			let verified = false;
			for (let i = 0; i < 10; i++) {
				await handler.updateStatus();
				const currentIndex = handler.getCurrentMapIndex();
				// Use exposed method if available or cast to any to access internal if needed (assuming logic added to V1Feature)
				// For now relying on public interface which delegates to V1MapService
				const rawStatus = (handler as any).mapService ? (handler as any).mapService.lastMapStatus : -1;

				const elapsed = Date.now() - startTime;

				// Verify using both index match and verifying raw status supports it
				if (currentIndex === mapFlag) {
					this.log.info(`[onStateChange] Robot synced map index to ${currentIndex} (Status: ${rawStatus} | Attempt ${i + 1}/10 | Elapsed: ${elapsed}ms)`);
					verified = true;
					break;
				}
				this.log.info(`[onStateChange] Waiting for robot to sync map index (Current: ${currentIndex}, Target: ${mapFlag}, Status: ${rawStatus} | Attempt ${i + 1}/10 | Elapsed: ${elapsed}ms)`);
				await new Promise(resolve => setTimeout(resolve, 2000));
			}

			if (!verified) {
				this.log.warn(`[onStateChange] Robot failed to sync map index to ${mapFlag} after several attempts. Proceeding anyway.`);
			}

			// Sequential verification: 1. MultiMap List (Room IDs synced) -> 2. Mapping -> 3. Map
			await handler.updateMultiMapsList();
			await handler.updateRoomMapping();
			await handler.updateMap();

			this.log.info(`[onStateChange] Floor switch to ${mapFlag} complete for ${duid}`);
		} catch (e: any) {
			this.catchError(e, "floorSwitch", duid);
		} finally {
			// Reset button
			this.setResetTimeout(stateId);
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
