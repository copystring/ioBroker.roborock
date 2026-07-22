// src/main.ts
/// <reference types="@iobroker/adapter-core" />

import * as utils from "@iobroker/adapter-core";
import { ChildProcess, spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import go2rtcPath from "go2rtc-static";
import { ApkAppPluginAuthenticatedAccountRuntime } from "./apppluginHost/apkAppPluginAuthenticatedAccountRuntime";
import { ApkAppPluginPackageRuntime } from "./apppluginHost/apkPluginPackageRuntime";
import { commitInfo } from "./lib/commitInfo";

// --- API & Helper Imports ---
import { AppPluginManager } from "./lib/AppPluginManager";
import { B01Variant, getB01VariantFromModel } from "./lib/b01Variant";
import { DeviceManager } from "./lib/deviceManager";
import { BaseDeviceFeatures } from "./lib/features/baseDeviceFeatures";
import type { CommandSpec } from "./lib/features/baseDeviceFeatures";
import { Feature } from "./lib/features/features.enum";

import { Device, http_api } from "./lib/httpApi";
import { local_api } from "./lib/localApi";
import { MapManager } from "./lib/map/MapManager";
import { mqtt_api } from "./lib/mqttApi";
import { PendingMapEntry, RequestPriority, RoborockRequest, requestsHandler } from "./lib/requestsHandler";
import { socketHandler } from "./lib/socketHandler";
import { TranslationManager } from "./lib/translationManager";

interface SentryPlugin {
	getSentryObject(): {
		captureException(error: unknown): void;
	};
}

type SceneQueueCommand = {
	duid: string;
	method: string;
	params: unknown;
	waitForCompletionAfter?: boolean;
	attempts?: number;
};

type PersistedSceneQueue = {
	version: 1;
	id: string;
	sceneId: string;
	sceneName?: string;
	commands: SceneQueueCommand[];
	nextIndex: number;
	waitingForCompletion: boolean;
	createdAt: number;
	updatedAt: number;
};

type SceneExecutionMode = "local" | "cloud";
type SceneSegmentWaitResult = "ready" | "not-started" | "finish-timeout" | "cancelled";
type SceneSegmentStartResult = "started" | "not-started" | "cancelled";
type SceneSegmentInactiveResult = "ready" | "timeout" | "cancelled";

const SCENE_QUEUE_VERSION = 1;
const SCENE_SEGMENT_START_MAX_ATTEMPTS = 3;
const SCENE_SEGMENT_START_TIMEOUT_MS = 2 * 60 * 1000;
const SCENE_SEGMENT_FINISH_TIMEOUT_MS = 4 * 60 * 60 * 1000;
const SCENE_SEGMENT_READY_STABLE_MS = 30 * 1000;
const SCENE_SEGMENT_RETRY_DELAY_MS = 30 * 1000;
const SCENE_SEGMENT_DOCK_CANCEL_STABLE_MS = 2 * 60 * 1000;
const SCENE_SEGMENT_POLL_INTERVAL_MS = 10 * 1000;
const SCENE_SEGMENT_STARTED_STATES = new Set([
	18, // Room Clean
]);
const SCENE_SEGMENT_ACTIVE_STATES = new Set([
	5,  // Cleaning
	6,  // Returning Dock
	7,  // Manual Mode
	10, // Paused
	11, // Spot Cleaning
	15, // Docking
	16, // Go To
	17, // Zone Clean
	18, // Room Clean
	22, // Emptying dust container
	23, // Washing the mop
	25, // Washing duster
	26, // Going to wash the mop
	29, // Mapping
	33, // Setting up the mop
	34, // Removing the mop
	38, // Tidy-up housework
	39, // Remote pick-up
	41, // Arm resetting
	42, // Program mode
]);
const SCENE_SEGMENT_RETURN_TO_DOCK_STATES = new Set([
	6,  // Returning Dock
	15, // Docking
]);
const SCENE_SEGMENT_DOCK_SERVICE_STATES = new Set([
	22, // Emptying dust container
	23, // Washing the mop
	25, // Washing duster
	26, // Going to wash the mop
	33, // Setting up the mop
	34, // Removing the mop
]);
export class Roborock extends utils.Adapter {
	// --- Public APIs (accessible by helpers) ---
	public http_api: http_api;
	public local_api: local_api;
	public mqtt_api: mqtt_api;
	public requestsHandler: requestsHandler;
	public socketHandler!: socketHandler;
	public deviceManager!: DeviceManager;
	public mapManager: MapManager;
	public translationManager!: TranslationManager;

	// --- Internal Properties ---
	public deviceFeatureHandlers: Map<string, BaseDeviceFeatures>;
	public nonce: Buffer;
	public pendingRequests: Map<number, RoborockRequest | PendingMapEntry>;
	/** B01: FIFO queue of expected 301 map response types (classify + taskBeginDate match using this order). */
	public b01MapResponseQueue: Map<string, Array<"get_map_v1" | "get_clean_record_map">> = new Map();
	public appPluginManager: AppPluginManager;
	public appPluginAccountRuntime: ApkAppPluginAuthenticatedAccountRuntime | undefined;
	public appPluginPackageRuntime: ApkAppPluginPackageRuntime | undefined;

	public isInitializing: boolean;
	public sentryInstance: SentryPlugin | undefined;
	public translations: Record<string, string> = {};

	private commandTimeouts: Map<string, ioBroker.Timeout> = new Map();
	private activeSceneQueueProcessors: Set<string> = new Set();
	private ensuredSceneQueueStates: Set<string> = new Set();
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
		this.translationManager = new TranslationManager(this);

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
	 * Loads admin translations from the current short i18n format and keeps a fallback
	 * for older local builds that still contain long-format files.
	 */
	private loadAdminTranslations(): Record<string, string> {
		const lang = this.language || "en";
		for (const candidate of [`../admin/i18n/${lang}.json`, `../admin/i18n/${lang}/translations.json`, "../admin/i18n/en.json", "../admin/i18n/en/translations.json"]) {
			try {
				return require(candidate);
			} catch {
				// Try the next supported translation layout.
			}
		}
		return {};
	}

	/**
	 * Adapter ready logic.
	 */
	async onReady() {
		// Config properties are now type-safe thanks to types.d.ts
		if (!this.config.username) {
			this.rLog("System", null, "Error", undefined, undefined, "Username missing!", "error");
			this.isInitializing = false;
			return;
		}

		this.translationManager.init();

		this.sentryInstance = this.getPluginInstance("sentry") as SentryPlugin | undefined;
		this.translations = this.loadAdminTranslations();

		this.rLog("System", null, "Info", undefined, undefined, `Build Info: Date=${commitInfo.commitDate}, Commit=${commitInfo.commitHash}`, "debug");

		// Log adapter settings at start (no credentials) for easier support/debugging
		const safeSettings: Record<string, unknown> = {
			enable_map_creation: this.config.enable_map_creation,
			updateInterval: this.config.updateInterval,
			region: this.config.region,
			loginMethod: this.config.loginMethod,
			map_theme: this.config.map_theme,
			sceneExecutionMode: this.getSceneExecutionMode(),
		};
		if ("map_creation_interval" in this.config) safeSettings.map_creation_interval = (this.config as Record<string, unknown>).map_creation_interval;
		if ("map_scale" in this.config) safeSettings.map_scale = (this.config as Record<string, unknown>).map_scale;
		if ("webserverPort" in this.config) safeSettings.webserverPort = (this.config as Record<string, unknown>).webserverPort;
		this.rLog("System", null, "Info", undefined, undefined, `Settings: ${JSON.stringify(safeSettings)}`, "info");

		// Full config for debug (credentials redacted)
		const configSummary = {
			...this.config,
			username: this.config.username ? "******" : "NOT_SET",
			password: this.config.password ? "******" : "NOT_SET",
			cameraPin: this.config.cameraPin ? "******" : undefined,
		};
		this.rLog("System", null, "Info", undefined, undefined, `Config: ${JSON.stringify(configSummary)}`, "debug");

		await this.setupBasicObjects();

		try {
			const clientID = await this.ensureClientID();
			await this.http_api.init(clientID);

			// 1. Start Cloud Data Sync (Get Keys & DUIDs)
			await this.http_api.updateHomeData();

			// 1a. Capture the complete APK post-login account generation only
			// after authenticated HomeData and V5 product data are available.
			await this.initializeAppPluginAuthenticatedAccountRuntime();

			// 1b. Prepare the instance-scoped APK package host. This performs
			// no download; acquisition remains an explicit later action.
			await this.initializeAppPluginPackageRuntime();

			// 1c. Asset download for account models (before device init)
			await this.downloadAssetsForAccountModels();

			// 2a. Start UDP Discovery (Essential for determining Local/Cloud mode before Init)
			await this.local_api.startUdpDiscovery();

			// 2b. Start MQTT and WAIT for the connection to be established
			await this.mqtt_api.init();

			// --- Pre-Init Network Probe (Docker/VLAN Support) ---
			this.rLog("System", null, "Info", undefined, undefined, "Starting Pre-Init Network Probe...", "debug");
			const allDevices = this.http_api.getDevices() || [];
			const probePromises = allDevices.map(async (device) => {
				const duid = device.duid;
				if (!device.online) return; // Skip devices cloud reports as offline
				// If already local (UDP found it), skip
				if (this.local_api.isConnected(duid)) return;
				const protocolVersion = device.pv || await this.getDeviceProtocolVersion(duid);
				if (protocolVersion === "B01") {
					const model = this.http_api.getRobotModel(duid) || "";
					if (model && getB01VariantFromModel(model) === "Q10") {
						return;
					}
				}

				try {
					const promoted = await this.local_api.probeLocalEndpointFromNetworkInfo(duid, "pre-init network probe", 1500, true, 10000);
					if (!promoted) {
						this.rLog("System", duid, "Debug", undefined, undefined, "Probe did not resolve a local TCP endpoint.", "debug");
					}
				} catch (e: unknown) {
					const errorMsg = e instanceof Error ? e.message : String(e);
					this.rLog("System", duid, "Debug", undefined, undefined, `Probe failed: ${errorMsg}`, "debug");
				}
			});

			// Wait for all probes to finish (with timeout to not block forever)
			await Promise.race([
				Promise.all(probePromises),
				this.delay(10000) // Max 10s probe time
			]);
			this.rLog("System", null, "Info", undefined, undefined, "Network Probe finished.", "info");
			// ----------------------------------------------------

			// 3. Initialize Devices (now that communication channels are ready)
			await this.deviceManager.initializeDevices();

			const writableFolders = new Set<string>();
			for (const handler of this.deviceFeatureHandlers.values()) {
				for (const folder of handler.getCommandFolders()) {
					writableFolders.add(folder);
				}
			}

			// Parallelize non-dependent startup tasks
			await Promise.all([
				this.processScenes(),
				this.start_go2rtc(),
				...Array.from(writableFolders).map((folder) => this.subscribeStatesAsync(`Devices.*.${folder}.*`)),
				this.subscribeStatesAsync("Devices.*.resetConsumables.*"),
				this.subscribeStatesAsync("Devices.*.programs.*"),
				this.subscribeStatesAsync("Devices.*.deviceStatus.state"),
				this.subscribeStatesAsync("Devices.*.deviceStatus.status"),
				this.subscribeStatesAsync("loginCode")
			]);

			await this.resumeSceneQueues();

			this.deviceManager.startPolling();
			this.local_api.startTcpKeepaliveInterval();

			this.rLog("System", null, "Info", undefined, undefined, "Adapter startup finished. Let's go!", "info");
			this.isInitializing = false;

			// Schedule MQTT API reset every hour (legacy behavior to prevent stale connections)
			this.mqttReconnectInterval = this.setInterval(() => {
				this.rLog("System", null, "Debug", undefined, undefined, "Running scheduled MQTT reconnect...", "debug");
				this.resetMqttApi().catch((e: unknown) => {
					this.rLog("System", null, "Error", undefined, undefined, `Scheduled MQTT reconnect failed: ${e instanceof Error ? e.message : String(e)}`, "error");
					this.catchError(e, "resetMqttApi (scheduled)");
				});
			}, 3600 * 1000);
		} catch (e: unknown) {
			this.rLog("System", null, "Error", undefined, undefined, `Failed to initialize adapter: ${this.errorMessage(e)}`, "error");
			this.catchError(e, "onReady");
			this.isInitializing = false;
		}
	}

	/**
	 * Message handler for Admin/Vis communication.
	 */
	async onMessage(obj: ioBroker.Message) {
		if (obj && obj.command && obj.callback) {
			try {
				// Forward to the dedicated handler
				await this.socketHandler.handleMessage(obj);
			} catch (err: unknown) {
				this.rLog("Requests", null, "Error", undefined, undefined, `Failed to execute command ${obj.command}: ${this.errorMessage(err)}`, "error");
				this.sendTo(obj.from, obj.command, { error: this.errorMessage(err) }, obj.callback);
			}
		}
	}

	private getSceneExecutionMode(): SceneExecutionMode {
		return this.config.sceneExecutionMode === "cloud" ? "cloud" : "local";
	}

	async executeSceneProgram(duid: string, sceneId: string | number): Promise<void> {
		const mode = this.getSceneExecutionMode();
		await this.ensureSceneQueueState(duid);
		await this.setState(this.getSceneQueueModeStateId(duid), { val: mode, ack: true });

		if (mode === "cloud") {
			await this.executeSceneCloud(duid, sceneId);
			return;
		}

		await this.executeSceneLocal(duid, sceneId);
	}

	private async executeSceneCloud(duid: string, sceneId: string | number): Promise<void> {
		try {
			this.rLog("Requests", duid, "Info", undefined, undefined, `[Scene] Executing cloud scene ${sceneId} via Roborock scene endpoint`, "info");
			await this.clearSceneQueue(duid, "cloud");
			const response = await this.http_api.executeScene(sceneId);
			await this.setSceneQueueStatus(duid, "cloud-triggered");
			this.rLog("Requests", duid, "Debug", undefined, undefined, `[Scene] Cloud scene ${sceneId} response: ${JSON.stringify(response)}`, "debug");
		} catch (error: unknown) {
			await this.setSceneQueueStatus(duid, "cloud-error");
			this.rLog("Requests", duid, "Error", undefined, undefined, `[Scene] Failed to execute cloud scene ${sceneId}: ${this.errorMessage(error)}`, "error");
		}
	}

	/**
	 * Executes a scene locally by parsing the scene definition and sending commands to the device.
	 */
	async executeSceneLocal(duid: string, sceneId: string | number): Promise<void> {
		try {
			this.rLog("Requests", duid, "Info", undefined, undefined, `[Scene] Executing local scene ${sceneId}`, "info");

			// 1. Fetch scenes
			const scenes = await this.http_api.getScenes();
			if (!scenes || !scenes.result) {
				this.rLog("Requests", duid, "Error", undefined, undefined, `[Scene] Failed to fetch scenes or no result for ${sceneId}`, "error");
				return;
			}

			// 2. Find target scene
			// Scene ID from state might be string, API returns number. Compare loosely or convert.
			const scene = scenes.result.find((s) => s.id == sceneId);
			if (!scene) {
				this.rLog("Requests", duid, "Error", undefined, undefined, `[Scene] Scene ${sceneId} not found`, "error");
				return;
			}

			this.rLog("Requests", duid, "Debug", undefined, undefined, `[Scene] Found scene "${scene.name}"`, "debug");

			let params;
			try {
				params = JSON.parse(scene.param);
			} catch (e: unknown) {
				this.rLog("Requests", duid, "Error", undefined, undefined, `[Scene] Failed to parse params for ${sceneId}: ${this.errorMessage(e)}`, "error");
				return;
			}

			const actionItems = params?.action?.items;
			if (!Array.isArray(actionItems) || actionItems.length === 0) {
				this.rLog("Requests", duid, "Warn", undefined, undefined, `[Scene] Scene ${sceneId} has no actions`, "warn");
				return;
			}
			const targetDuid = this.resolveSceneTargetDuid(duid, actionItems);
			const commands = await this.buildSceneQueueCommands(targetDuid, sceneId, actionItems);
			if (commands.length === 0) {
				this.rLog("Requests", targetDuid, "Warn", undefined, undefined, `[Scene] Scene ${sceneId} has no executable commands`, "warn");
				return;
			}

			for (let index = 0; index < commands.length; index++) {
				commands[index].waitForCompletionAfter = commands[index].method === "do_scenes_segments" && index < commands.length - 1;
			}

			const now = Date.now();
			const queue: PersistedSceneQueue = {
				version: SCENE_QUEUE_VERSION,
				id: `${now}-${randomBytes(4).toString("hex")}`,
				sceneId: String(sceneId),
				sceneName: typeof scene.name === "string" ? scene.name : undefined,
				commands,
				nextIndex: 0,
				waitingForCompletion: false,
				createdAt: now,
				updatedAt: now,
			};

			await this.saveSceneQueue(targetDuid, queue);
			this.rLog("Requests", targetDuid, "Info", undefined, undefined, `[Scene] Queued local scene ${sceneId} with ${commands.length} command(s)`, "info");
			void this.processSceneQueue(targetDuid);
		} catch (e: unknown) {
			this.rLog("Requests", duid, "Error", undefined, undefined, `[Scene] Error executing ${sceneId}: ${this.errorMessage(e)}`, "error");
		}
	}
	private async buildSceneQueueCommands(defaultDuid: string, sceneId: string | number, actionItems: unknown[]): Promise<SceneQueueCommand[]> {
		const commands: SceneQueueCommand[] = [];

		for (const item of actionItems) {
			if (!this.isRecord(item) || item.type !== "CMD") continue;
			const itemDuid = typeof item.entityId === "string" && item.entityId.trim().length > 0 ? item.entityId : defaultDuid;

			const rawCommandPayload = this.tryParseSceneCommandPayload(item.param);
			const parsedCommandPayload = this.isRecord(rawCommandPayload) ? rawCommandPayload : null;
			if (!parsedCommandPayload?.method) {
				const itemId = typeof item.id === "string" ? item.id : `${item.id}`;
				this.rLog("Requests", itemDuid, "Warn", undefined, undefined, `[Scene] Invalid command item ${itemId} in ${sceneId}`, "warn");
				continue;
			}

			const method = typeof parsedCommandPayload.method === "string" ? parsedCommandPayload.method : "";
			if (!method) {
				const itemId = typeof item.id === "string" ? item.id : `${item.id}`;
				this.rLog("Requests", itemDuid, "Warn", undefined, undefined, `[Scene] Command without string method for item ${itemId} in ${sceneId}`, "warn");
				continue;
			}

			const args = this.tryParseSceneCommandPayload(parsedCommandPayload.params);
			const commandArgs = args !== undefined ? args : parsedCommandPayload.params;

			if (method === "do_scenes_segments") {
				const segmentPayloads = this.toSingleSceneSegmentsPayloads(commandArgs);
				if (segmentPayloads) {
					for (const segmentPayload of segmentPayloads) {
						commands.push({ duid: itemDuid, method, params: segmentPayload });
					}
					continue;
				}
			}

			if (method === "app_start_program") {
				try {
					const startArgs = await this.resolveStartProgramArgs(itemDuid, commandArgs ?? {});
					commands.push({ duid: itemDuid, method, params: startArgs });
				} catch (error: unknown) {
					this.rLog(
						"Requests",
						itemDuid,
						"Error",
						undefined,
						undefined,
						`[Scene] Failed to resolve app_start_program payload for ${sceneId}: ${this.errorMessage(error)}`,
						"error"
					);
				}
				continue;
			}

			commands.push({ duid: itemDuid, method, params: commandArgs });
		}

		return commands;
	}

	private isRecord(value: unknown): value is Record<string, unknown> {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}
	private async processSceneQueue(duid: string): Promise<void> {
		if (this.activeSceneQueueProcessors.has(duid)) return;
		this.activeSceneQueueProcessors.add(duid);

		try {
			while (true) {
				const queue = await this.loadSceneQueue(duid);
				if (!queue) return;

				if (queue.waitingForCompletion) {
					const previousIndex = Math.max(0, queue.nextIndex - 1);
					const previousCommand = queue.commands[Math.max(0, queue.nextIndex - 1)];
					const nextCommand = queue.commands[queue.nextIndex];
					const waitDuid = previousCommand?.duid ?? nextCommand?.duid ?? duid;
					this.rLog(
						"Requests",
						waitDuid,
						"Info",
						undefined,
						undefined,
						`[Scene] Waiting for segment completion before continuing scene ${queue.sceneId} (${queue.nextIndex}/${queue.commands.length})`,
						"info"
					);
					const waitResult = await this.waitForSceneSegmentReadyForNext(waitDuid);

					const latestQueue = await this.loadSceneQueue(duid);
					if (!latestQueue) return;
					if (latestQueue.id !== queue.id) continue;

					if (waitResult === "cancelled") {
						await this.clearSceneQueue(duid, "cancelled");
						this.rLog(
							"Requests",
							waitDuid,
							"Info",
							undefined,
							undefined,
							`[Scene] Cleared local scene ${latestQueue.sceneId} queue because the robot returned to dock`,
							"info"
						);
						return;
					}

					if (waitResult === "not-started" && previousCommand?.method === "do_scenes_segments") {
						const retryCommand = latestQueue.commands[previousIndex];
						if (retryCommand && (retryCommand.attempts ?? 0) < SCENE_SEGMENT_START_MAX_ATTEMPTS) {
							latestQueue.nextIndex = previousIndex;
							latestQueue.waitingForCompletion = false;
							latestQueue.updatedAt = Date.now();
							await this.saveSceneQueue(duid, latestQueue);
							await this.setSceneQueueStatus(duid, "retrying");
							await this.delay(SCENE_SEGMENT_RETRY_DELAY_MS);
							continue;
						}

						this.rLog(
							"Requests",
							waitDuid,
							"Error",
							undefined,
							undefined,
							`[Scene] Segment task in ${latestQueue.sceneId} did not start after ${SCENE_SEGMENT_START_MAX_ATTEMPTS} attempt(s); continuing`,
							"error"
						);
					}

					latestQueue.waitingForCompletion = false;
					latestQueue.updatedAt = Date.now();
					await this.saveSceneQueue(duid, latestQueue);
					continue;
				}

				if (queue.nextIndex >= queue.commands.length) {
					await this.clearSceneQueue(duid, "completed");
					this.rLog("Requests", duid, "Info", undefined, undefined, `[Scene] Local scene ${queue.sceneId} queue completed`, "info");
					return;
				}

				const command = queue.commands[queue.nextIndex];
				if (!command) {
					await this.clearSceneQueue(duid, "invalid");
					return;
				}

				this.rLog(
					"Requests",
					command.duid,
					"Info",
					undefined,
					undefined,
					`[Scene] Executing queued local scene command ${queue.nextIndex + 1}/${queue.commands.length}: ${command.method}`,
					"info"
				);

				command.attempts = (command.attempts ?? 0) + 1;
				queue.commands[queue.nextIndex] = command;
				queue.updatedAt = Date.now();
				await this.saveSceneQueue(duid, queue);

				let commandSucceeded = false;
				try {
					await this.executeSceneCommand(command.duid, command.method, command.params);
					commandSucceeded = true;
				} catch (error: unknown) {
					this.logSceneQueueCommandError(queue, command, error);
				}

				const latestQueue = await this.loadSceneQueue(duid);
				if (!latestQueue) return;
				if (latestQueue.id !== queue.id) continue;

				latestQueue.nextIndex = queue.nextIndex + 1;
				latestQueue.waitingForCompletion = commandSucceeded && command.method === "do_scenes_segments";
				latestQueue.updatedAt = Date.now();

				if (latestQueue.nextIndex >= latestQueue.commands.length && !latestQueue.waitingForCompletion) {
					const completedStatus = command.method === "app_start_program" ? "program-started" : "completed";
					await this.clearSceneQueue(duid, completedStatus);
					this.rLog("Requests", duid, "Info", undefined, undefined, `[Scene] Local scene ${latestQueue.sceneId} queue completed`, "info");
					return;
				}

				await this.saveSceneQueue(duid, latestQueue);
			}
		} catch (error: unknown) {
			await this.setSceneQueueStatus(duid, "error");
			this.rLog("Requests", duid, "Error", undefined, undefined, `[Scene] Local scene queue failed: ${this.errorMessage(error)}`, "error");
		} finally {
			this.activeSceneQueueProcessors.delete(duid);
		}
	}

	private logSceneQueueCommandError(queue: PersistedSceneQueue, command: SceneQueueCommand, error: unknown): void {
		const level = command.method === "do_scenes_segments" || command.method === "app_start_program" ? "Error" : "Warn";
		this.rLog(
			"Requests",
			command.duid,
			level,
			undefined,
			undefined,
			`[Scene] Failed to execute queued command ${command.method} in ${queue.sceneId}: ${this.errorMessage(error)}`,
			level === "Error" ? "error" : "warn"
		);
	}

	private getSceneQueueStateId(duid: string): string {
		return `Devices.${duid}.programs.sceneQueue`;
	}

	private getSceneQueueLengthStateId(duid: string): string {
		return `Devices.${duid}.programs.sceneQueueLength`;
	}

	private getSceneQueueStatusStateId(duid: string): string {
		return `Devices.${duid}.programs.sceneQueueStatus`;
	}

	private getSceneQueueModeStateId(duid: string): string {
		return `Devices.${duid}.programs.sceneExecutionMode`;
	}

	private async ensureSceneQueueState(duid: string): Promise<void> {
		if (this.ensuredSceneQueueStates.has(duid)) return;
		await this.ensureFolder(`Devices.${duid}.programs`);
		await this.ensureState(this.getSceneQueueStateId(duid), {
			name: "Local scene queue",
			type: "string",
			role: "json",
			read: true,
			write: false,
		});
		await this.ensureState(this.getSceneQueueLengthStateId(duid), {
			name: "Local scene queue length",
			type: "number",
			role: "value",
			read: true,
			write: false,
			def: 0,
		});
		await this.ensureState(this.getSceneQueueStatusStateId(duid), {
			name: "Scene queue status",
			type: "string",
			role: "text",
			read: true,
			write: false,
			def: "idle",
		});
		await this.ensureState(this.getSceneQueueModeStateId(duid), {
			name: "Scene execution mode",
			type: "string",
			role: "text",
			read: true,
			write: false,
			states: {
				local: "local",
				cloud: "cloud",
			},
			def: "local",
		});
		this.ensuredSceneQueueStates.add(duid);
	}

	private async saveSceneQueue(duid: string, queue: PersistedSceneQueue): Promise<void> {
		await this.ensureSceneQueueState(duid);
		await this.setState(this.getSceneQueueStateId(duid), { val: JSON.stringify(queue), ack: true });
		await this.setSceneQueueSummaryStates(duid, queue, queue.waitingForCompletion ? "waiting" : "running");
	}

	private async clearSceneQueue(duid: string, status = "idle"): Promise<void> {
		await this.ensureSceneQueueState(duid);
		await this.setState(this.getSceneQueueStateId(duid), { val: "", ack: true });
		await this.setSceneQueueSummaryStates(duid, null, status);
	}

	private shouldClearSceneQueueForCommand(command: string, value: unknown): boolean {
		return (command === "app_stop" || command === "app_charge") && this.isTruthy(value);
	}

	private async clearSceneQueueForManualCancel(duid: string, command: string): Promise<void> {
		const queue = await this.loadSceneQueue(duid);
		if (!queue) return;
		await this.clearSceneQueue(duid, "cancelled");
		this.rLog("Requests", duid, "Info", undefined, undefined, `[Scene] Cleared local scene ${queue.sceneId} queue because ${command} was requested`, "info");
	}

	private async setSceneQueueStatus(duid: string, status: string): Promise<void> {
		await this.ensureSceneQueueState(duid);
		await this.setSceneQueueSummaryStates(duid, await this.loadSceneQueue(duid), status);
	}

	private async setSceneQueueSummaryStates(duid: string, queue: PersistedSceneQueue | null, status: string): Promise<void> {
		const length = queue ? Math.max(0, queue.commands.length - queue.nextIndex) : 0;
		await Promise.all([
			this.setState(this.getSceneQueueLengthStateId(duid), { val: length, ack: true }),
			this.setState(this.getSceneQueueStatusStateId(duid), { val: status, ack: true }),
			this.setState(this.getSceneQueueModeStateId(duid), { val: this.getSceneExecutionMode(), ack: true }),
		]);
	}

	private async loadSceneQueue(duid: string): Promise<PersistedSceneQueue | null> {
		let state: ioBroker.State | null | undefined;
		try {
			state = await this.getStateAsync(this.getSceneQueueStateId(duid));
		} catch {
			return null;
		}

		if (typeof state?.val !== "string" || state.val.trim() === "") {
			return null;
		}

		try {
			return this.parseSceneQueueState(state.val);
		} catch (error: unknown) {
			this.rLog("Requests", duid, "Warn", undefined, undefined, `[Scene] Ignoring invalid persisted scene queue: ${this.errorMessage(error)}`, "warn");
			await this.clearSceneQueue(duid);
			return null;
		}
	}

	private parseSceneQueueState(value: string): PersistedSceneQueue {
		const parsed = JSON.parse(value) as Record<string, unknown>;
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
			throw new Error("queue state is not an object");
		}
		if (parsed.version !== SCENE_QUEUE_VERSION) {
			throw new Error(`unsupported queue version ${String(parsed.version)}`);
		}
		if (!Array.isArray(parsed.commands) || parsed.commands.length === 0) {
			throw new Error("queue has no commands");
		}

		const commands = parsed.commands.map((command) => this.parseSceneQueueCommand(command));
		const nextIndex = typeof parsed.nextIndex === "number" && Number.isInteger(parsed.nextIndex)
			? Math.max(0, Math.min(parsed.nextIndex, commands.length))
			: 0;
		const now = Date.now();

		return {
			version: SCENE_QUEUE_VERSION,
			id: typeof parsed.id === "string" && parsed.id.trim() !== "" ? parsed.id : `${now}-${randomBytes(4).toString("hex")}`,
			sceneId: typeof parsed.sceneId === "string" && parsed.sceneId.trim() !== "" ? parsed.sceneId : "unknown",
			sceneName: typeof parsed.sceneName === "string" ? parsed.sceneName : undefined,
			commands,
			nextIndex,
			waitingForCompletion: parsed.waitingForCompletion === true,
			createdAt: typeof parsed.createdAt === "number" && Number.isFinite(parsed.createdAt) ? parsed.createdAt : now,
			updatedAt: typeof parsed.updatedAt === "number" && Number.isFinite(parsed.updatedAt) ? parsed.updatedAt : now,
		};
	}

	private parseSceneQueueCommand(value: unknown): SceneQueueCommand {
		if (!value || typeof value !== "object" || Array.isArray(value)) {
			throw new Error("queue command is not an object");
		}

		const command = value as Record<string, unknown>;
		if (typeof command.duid !== "string" || command.duid.trim() === "") {
			throw new Error("queue command has no duid");
		}
		if (typeof command.method !== "string" || command.method.trim() === "") {
			throw new Error("queue command has no method");
		}

		return {
			duid: command.duid,
			method: command.method,
			params: command.params,
			waitForCompletionAfter: command.waitForCompletionAfter === true,
			attempts: typeof command.attempts === "number" && Number.isInteger(command.attempts) && command.attempts > 0 ? command.attempts : undefined,
		};
	}

	private async resumeSceneQueues(): Promise<void> {
		const duids = new Set<string>();
		for (const device of this.http_api.getDevices() || []) {
			if (typeof device.duid === "string" && device.duid.trim() !== "") {
				duids.add(device.duid);
			}
		}

		const mode = this.getSceneExecutionMode();
		for (const duid of duids) {
			await this.ensureSceneQueueState(duid);
			if (mode === "cloud") {
				await this.clearSceneQueue(duid, "cloud-idle");
				continue;
			}

			const queue = await this.loadSceneQueue(duid);
			if (!queue) continue;

			const status = await this.refreshSceneSegmentStatus(duid);
			if (!this.isSceneSegmentActiveStatus(status)) {
				await this.clearSceneQueue(duid, "cancelled");
				this.rLog(
					"Requests",
					duid,
					"Info",
					undefined,
					undefined,
					`[Scene] Cleared local scene ${queue.sceneId} queue on adapter start because the robot is idle`,
					"info"
				);
				continue;
			}

			this.rLog(
				"Requests",
				duid,
				"Info",
				undefined,
				undefined,
				`[Scene] Resuming local scene ${queue.sceneId} at command ${queue.nextIndex + 1}/${queue.commands.length}`,
				"info"
			);
			void this.processSceneQueue(duid);
		}
	}

	private resolveSceneTargetDuid(defaultDuid: string, actionItems: unknown[]): string {
		for (const item of actionItems) {
			const sceneItem = item as Record<string, unknown>;
			const entityId = typeof sceneItem?.entityId === "string" && sceneItem.entityId.trim().length > 0 ? sceneItem.entityId : null;
			if (entityId) return entityId;
		}
		return defaultDuid;
	}
	private toSingleSceneSegmentsPayloads(value: unknown): Record<string, unknown>[] | null {
		const parsed = this.tryParseSceneCommandPayload(value);
		const payload = Array.isArray(parsed) && parsed.length === 1 ? parsed[0] : parsed;
		if (!this.isRecord(payload) || !Array.isArray(payload.data) || payload.data.length === 0) {
			return null;
		}

		return payload.data.map((entry) => ({
			...payload,
			data: [entry],
		}));
	}

	private async waitForSceneSegmentReadyForNext(duid: string): Promise<SceneSegmentWaitResult> {
		const startResult = await this.waitForSceneSegmentStarted(duid, SCENE_SEGMENT_START_TIMEOUT_MS);
		if (startResult === "cancelled") {
			this.rLog(
				"Requests",
				duid,
				"Info",
				undefined,
				undefined,
				"[Scene] Segment task was cancelled by return to dock",
				"info"
			);
			return "cancelled";
		}
		if (startResult === "not-started") {
			this.rLog(
				"Requests",
				duid,
				"Warn",
				undefined,
				undefined,
				"[Scene] Segment task did not report a room-cleaning start before timeout",
				"warn"
			);
			return "not-started";
		}

		const finishResult = await this.waitForSceneSegmentInactiveStable(duid, SCENE_SEGMENT_FINISH_TIMEOUT_MS, SCENE_SEGMENT_READY_STABLE_MS);
		if (finishResult === "cancelled") {
			this.rLog(
				"Requests",
				duid,
				"Info",
				undefined,
				undefined,
				"[Scene] Segment task was cancelled by return to dock",
				"info"
			);
			return "cancelled";
		}
		if (finishResult === "timeout") {
			this.rLog(
				"Requests",
				duid,
				"Warn",
				undefined,
				undefined,
				"[Scene] Segment task did not reach stable idle before timeout; continuing with next scene task",
				"warn"
			);
			return "finish-timeout";
		}

		return "ready";
	}
	private async waitForSceneSegmentStarted(duid: string, timeoutMs: number): Promise<SceneSegmentStartResult> {
		let deadline = Date.now() + timeoutMs;
		const hardDeadline = Date.now() + SCENE_SEGMENT_FINISH_TIMEOUT_MS;
		let idleSince: number | null = null;
		let sawPaused = false;
		let sawReturnToDock = false;
		let sawDockServiceAfterReturn = false;

		do {
			const status = await this.refreshSceneSegmentStatus(duid);
			if (this.isSceneSegmentStartedStatus(status)) {
				return "started";
			}

			const now = Date.now();
			if (this.isSceneSegmentPausedStatus(status)) {
				sawPaused = true;
			}
			if (this.isSceneSegmentReturnToDockStatus(status)) {
				sawReturnToDock = true;
			}
			if (sawReturnToDock && this.isSceneSegmentDockServiceStatus(status)) {
				sawDockServiceAfterReturn = true;
			}

			if (this.isSceneSegmentActiveStatus(status)) {
				deadline = now + timeoutMs;
				idleSince = null;
			} else {
				idleSince ??= now;
				if (sawReturnToDock && (sawPaused || !sawDockServiceAfterReturn)) {
					if (now - idleSince >= SCENE_SEGMENT_DOCK_CANCEL_STABLE_MS) {
						return "cancelled";
					}
				} else if (now >= deadline) {
					return "not-started";
				}
			}

			await this.delay(SCENE_SEGMENT_POLL_INTERVAL_MS);
		} while (Date.now() < hardDeadline);
		return "not-started";
	}
	private async waitForSceneSegmentInactiveStable(duid: string, timeoutMs: number, stableMs: number): Promise<SceneSegmentInactiveResult> {
		const deadline = Date.now() + timeoutMs;
		let idleSince: number | null = null;
		let sawPaused = false;
		let sawReturnToDock = false;
		let sawDockServiceAfterReturn = false;

		do {
			const status = await this.refreshSceneSegmentStatus(duid);
			const now = Date.now();
			if (this.isSceneSegmentPausedStatus(status)) {
				sawPaused = true;
			}
			if (this.isSceneSegmentReturnToDockStatus(status)) {
				sawReturnToDock = true;
			}
			if (sawReturnToDock && this.isSceneSegmentDockServiceStatus(status)) {
				sawDockServiceAfterReturn = true;
			}

			if (!this.isSceneSegmentActiveStatus(status)) {
				idleSince ??= now;
				const idleFor = now - idleSince;
				if (sawReturnToDock && (sawPaused || !sawDockServiceAfterReturn)) {
					if (idleFor >= SCENE_SEGMENT_DOCK_CANCEL_STABLE_MS) {
						return "cancelled";
					}
				} else if (idleFor >= stableMs) {
					return "ready";
				}
			} else {
				idleSince = null;
			}
			await this.delay(SCENE_SEGMENT_POLL_INTERVAL_MS);
		} while (Date.now() < deadline);
		return "timeout";
	}
	private async refreshSceneSegmentStatus(duid: string): Promise<Record<string, unknown>> {
		const handler = this.deviceFeatureHandlers.get(duid);
		if (handler) {
			try {
				await handler.updateStatus();
			} catch (error: unknown) {
				this.rLog(
					"Requests",
					duid,
					"Warn",
					handler.protocolVersion || undefined,
					undefined,
					`[Scene] Failed to update status while sequencing scene tasks: ${this.errorMessage(error)}`,
					"warn"
				);
			}
		}

		const status: Record<string, unknown> = {};
		const deviceStatusKeys = [
			"state",
			"status",
			"in_cleaning",
			"in_returning",
			"isWashing",
			"dockCanStopWash",
			"isInBackDockTask",
			"wash_phase",
			"wash_status",
			"washingTaskStatus",
			"dust_collection_status",
		];
		const dockingStationStatusKeys = [
			"washingTaskStatus",
		];

		await Promise.all(deviceStatusKeys.map(async (key) => {
			try {
				const state = await this.getStateAsync(`Devices.${duid}.deviceStatus.${key}`);
				if (state?.val !== null && state?.val !== undefined) {
					status[key] = state.val;
				}
			} catch {
				// Some protocols expose only a subset of these states.
			}
		}));
		await Promise.all(dockingStationStatusKeys.map(async (key) => {
			try {
				const state = await this.getStateAsync(`Devices.${duid}.dockingStationStatus.${key}`);
				if (state?.val !== null && state?.val !== undefined) {
					status[`dockingStationStatus.${key}`] = state.val;
				}
			} catch {
				// Some devices do not expose station detail states.
			}
		}));
		return status;
	}

	private isSceneSegmentPausedStatus(status: Record<string, unknown>): boolean {
		const state = this.numberFromStateValue(status.state ?? status.status);
		return state === 10;
	}
	private isSceneSegmentReturnToDockStatus(status: Record<string, unknown>): boolean {
		const inReturning = this.numberFromStateValue(status.in_returning);
		if (inReturning !== null && inReturning > 0) {
			return true;
		}

		const state = this.numberFromStateValue(status.state ?? status.status);
		return state !== null && SCENE_SEGMENT_RETURN_TO_DOCK_STATES.has(state);
	}

	private isSceneSegmentDockServiceStatus(status: Record<string, unknown>): boolean {
		if (this.booleanFromStateValue(status.isWashing) || this.booleanFromStateValue(status.dockCanStopWash)) {
			return true;
		}

		const rawWashStatus = this.numberFromStateValue(status.wash_status);
		if (rawWashStatus !== null && this.isActiveWashingTaskStatus(rawWashStatus & 0xff)) {
			return true;
		}

		const deviceWashingTaskStatus = this.numberFromStateValue(status.washingTaskStatus);
		if (deviceWashingTaskStatus !== null && this.isActiveWashingTaskStatus(deviceWashingTaskStatus)) {
			return true;
		}

		const dockWashingTaskStatus = this.numberFromStateValue(status["dockingStationStatus.washingTaskStatus"]);
		if (dockWashingTaskStatus !== null && this.isActiveWashingTaskStatus(dockWashingTaskStatus)) {
			return true;
		}

		const washPhase = this.numberFromStateValue(status.wash_phase);
		if (washPhase !== null && washPhase !== 0 && washPhase !== 17) {
			return true;
		}

		const dustCollectionStatus = this.numberFromStateValue(status.dust_collection_status);
		if (dustCollectionStatus !== null && dustCollectionStatus > 0) {
			return true;
		}

		const state = this.numberFromStateValue(status.state ?? status.status);
		return state !== null && SCENE_SEGMENT_DOCK_SERVICE_STATES.has(state);
	}
	private isSceneSegmentActiveStatus(status: Record<string, unknown>): boolean {
		const inCleaning = this.numberFromStateValue(status.in_cleaning);
		const inReturning = this.numberFromStateValue(status.in_returning);
		if ((inCleaning !== null && inCleaning > 0) || (inReturning !== null && inReturning > 0)) {
			return true;
		}

		if (
			this.booleanFromStateValue(status.isWashing)
			|| this.booleanFromStateValue(status.dockCanStopWash)
			|| this.booleanFromStateValue(status.isInBackDockTask)
		) {
			return true;
		}

		const rawWashStatus = this.numberFromStateValue(status.wash_status);
		if (rawWashStatus !== null && this.isActiveWashingTaskStatus(rawWashStatus & 0xff)) {
			return true;
		}

		const deviceWashingTaskStatus = this.numberFromStateValue(status.washingTaskStatus);
		if (deviceWashingTaskStatus !== null && this.isActiveWashingTaskStatus(deviceWashingTaskStatus)) {
			return true;
		}

		const dockWashingTaskStatus = this.numberFromStateValue(status["dockingStationStatus.washingTaskStatus"]);
		if (dockWashingTaskStatus !== null && this.isActiveWashingTaskStatus(dockWashingTaskStatus)) {
			return true;
		}

		const washPhase = this.numberFromStateValue(status.wash_phase);
		if (washPhase !== null && washPhase !== 0 && washPhase !== 17) {
			return true;
		}

		const state = this.numberFromStateValue(status.state ?? status.status);
		return state !== null && SCENE_SEGMENT_ACTIVE_STATES.has(state);
	}

	private isSceneSegmentStartedStatus(status: Record<string, unknown>): boolean {
		const state = this.numberFromStateValue(status.state ?? status.status);
		if (state !== null) {
			return SCENE_SEGMENT_STARTED_STATES.has(state);
		}

		const inCleaning = this.numberFromStateValue(status.in_cleaning);
		return inCleaning !== null && inCleaning > 0;
	}

	private isActiveWashingTaskStatus(status: number): boolean {
		return Number.isFinite(status) && status > 0 && status !== 4;
	}

	private booleanFromStateValue(value: unknown): boolean {
		if (typeof value === "boolean") {
			return value;
		}
		if (typeof value === "number" && Number.isFinite(value)) {
			return value !== 0;
		}
		if (typeof value === "string") {
			const normalized = value.trim().toLowerCase();
			return normalized === "true" || normalized === "1";
		}
		return false;
	}

	private numberFromStateValue(value: unknown): number | null {
		if (typeof value === "number" && Number.isFinite(value)) {
			return value;
		}
		if (typeof value === "string" && value.trim() !== "") {
			const parsed = Number(value);
			return Number.isFinite(parsed) ? parsed : null;
		}
		return null;
	}

	private async executeSceneCommand(duid: string, method: string, args: unknown): Promise<void> {
		const handler = this.deviceFeatureHandlers.get(duid);
		if (handler) {
			await this.requestsHandler.command(handler, duid, method, this.tryParseSceneCommandPayload(args) ?? args);
		} else {
			await this.requestsHandler.sendRequest(duid, method, this.tryParseSceneCommandPayload(args) ?? args);
		}
	}

	private tryParseSceneCommandPayload(value: unknown): unknown | undefined {
		if (typeof value === "string") {
			const parsed = this.tryParseJson(value);
			return parsed !== undefined ? parsed : value;
		}
		return value as unknown;
	}
	private async resolveStartProgramArgs(duid: string, value: unknown): Promise<Record<string, unknown>> {
		const parsed = this.resolveProgramArgPayload(this.tryParseSceneCommandPayload(value) ?? value);
		const cmdIds = this.collectNonEmptyArray(parsed, "cmd_ids");
		if (cmdIds.length > 0) {
			return { cmd_ids: cmdIds };
		}

		const programId = this.resolveProgramId(parsed);
		if (programId != null) {
			return this.resolveStartProgramFromProgramId(duid, programId);
		}

		throw new Error("app_start_program payload has no program_id/cmd_ids");
	}

	private resolveProgramArgPayload(value: unknown): Record<string, unknown> {
		if (Array.isArray(value)) {
			if (value.length === 1) {
				const entry = value[0];
				if (
					typeof entry === "number"
					|| typeof entry === "string"
					|| (
						this.isRecord(entry)
						&& ("program_id" in entry || "programId" in entry || "cmd_ids" in entry)
					)
				) {
					return this.resolveProgramArgPayload(entry);
				}
			}

			if (value.length > 0) {
				return { cmd_ids: value };
			}

			return {};
		}

		if (typeof value === "number") {
			return { program_id: value };
		}

		if (typeof value === "string") {
			const parsed = this.tryParseJson(value);
			if (parsed !== undefined) {
				const normalized = this.resolveProgramArgPayload(parsed);
				if (this.isRecord(normalized)) {
					return normalized;
				}
			}

			if (value.trim() !== "" && Number.isFinite(Number(value))) {
				return { program_id: Number(value) };
			}
		}

		if (this.isRecord(value)) {
			return value;
		}

		return {};
	}

	private resolveProgramId(payload: Record<string, unknown>): number | null {
		if (typeof payload.program_id === "number" && Number.isFinite(payload.program_id)) {
			return payload.program_id;
		}

		if (typeof payload.programId === "number" && Number.isFinite(payload.programId)) {
			return payload.programId;
		}

		if (typeof payload.programId === "string" && payload.programId.trim() !== "" && Number.isFinite(Number(payload.programId))) {
			return Number(payload.programId);
		}

		if (typeof payload.program_id === "string" && payload.program_id.trim() !== "" && Number.isFinite(Number(payload.program_id))) {
			return Number(payload.program_id);
		}

		return null;
	}

	private collectNonEmptyArray(payload: Record<string, unknown>, key: string): unknown[] {
		const rawValue = payload[key];
		if (!rawValue) return [];

		if (Array.isArray(rawValue)) {
			return rawValue.length > 0 ? rawValue : [];
		}

		if (typeof rawValue === "string") {
			const parsed = this.tryParseJson(rawValue);
			if (Array.isArray(parsed) && parsed.length > 0) return parsed;
			if (rawValue.trim() !== "" && Number.isFinite(Number(rawValue))) return [Number(rawValue)];
		}

		if (typeof rawValue === "number" && Number.isFinite(rawValue)) {
			return [rawValue];
		}

		return [];
	}

	private async resolveStartProgramFromProgramId(duid: string, programId: number): Promise<Record<string, unknown>> {
		const response = await this.requestsHandler.sendRequest(duid, "app_get_program", { program_id: programId });
		const normalized = this.unwrapSingleItemArrays(this.normalizeSceneRpcPayload(response));
		if (typeof normalized !== "object" || normalized === null || Array.isArray(normalized)) {
			throw new Error(`app_get_program returned no usable payload for program_id ${programId}`);
		}

		const cmdIds = this.collectNonEmptyArray(normalized as Record<string, unknown>, "cmd_ids");
		if (cmdIds.length === 0) {
			throw new Error(`app_get_program returned no cmd_ids for program_id ${programId}`);
		}

		return { cmd_ids: cmdIds };
	}

	private normalizeSceneRpcPayload(value: unknown): unknown {
		let current = value;
		while (typeof current === "object" && current !== null && !Array.isArray(current) && "version" in current && "data" in current) {
			current = (current as { data?: unknown }).data;
		}

		if (typeof current === "object" && current !== null && !Array.isArray(current) && "result" in current) {
			current = (current as { result?: unknown }).result;
		}
		return current;
	}

	private unwrapSingleItemArrays(value: unknown): unknown {
		let current = value;
		while (Array.isArray(current) && current.length === 1) {
			current = current[0];
		}
		return current;
	}

	/** Legacy request-based keepalive. TCP socket sessions now use localApi PINGREQ frames. */
	sendTcpKeepalive(duid: string): void {
		this.requestsHandler.sendRequest(duid, "get_prop", ["get_status"], { priority: RequestPriority.LOW }).catch(() => {});
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
			this.local_api.stopTcpKeepaliveInterval();
			this.appPluginAccountRuntime = undefined;
			this.appPluginPackageRuntime?.shutdown();
			this.appPluginPackageRuntime = undefined;

			// Remove the global process exit listener to prevent memory leaks
			if (this.onExitBound) {
				process.removeListener("exit", this.onExitBound);
				this.onExitBound = null;
			}

			if (this.go2rtcProcess) {
				this.rLog("Local", null, "Info", undefined, undefined, "Stopping go2rtc process...", "info");
				this.go2rtcProcess.kill();
				this.go2rtcProcess = null;
			}
			this.setState("info.connection", { val: false, ack: true });
			callback();
		} catch (e: unknown) {
			this.rLog("System", null, "Error", undefined, undefined, `Failed to unload adapter: ${this.errorStack(e)}`, "error");
			callback();
		}
	}

	/**
	 * Is called if a subscribed state changes.
	 */
	async onStateChange(id: string, state: ioBroker.State | null | undefined) {
		if (!state) return;

		const idParts = id.split(".");

		// deviceStatus.state (V1) or deviceStatus.status (B01): react only to our own updates (ack) — active -> idle triggers cleaning records update
		if (state.ack && idParts[2] === "Devices" && idParts.length >= 6 && idParts[4] === "deviceStatus" && (idParts[5] === "state" || idParts[5] === "status")) {
			const duid = idParts[3];
			const newVal = state.val != null ? Number(state.val) : 0;
			if (!isNaN(newVal)) {
				this.deviceManager.onDeviceStateChange(duid, newVal).catch((e: unknown) => this.catchError(e, "onStateChange(deviceStatus)", duid));
			}
			return;
		}

		if (state.ack) {
			if (id.endsWith(".online") && idParts.length >= 4) {
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
		if (idParts.length < 6) return;

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
		this.rLog("Requests", duid, "Info", undefined, undefined, `[onStateChange] Processing ${folder}.${command}`, "info");

		const handler = this.deviceFeatureHandlers.get(duid);
		if (!handler) {
			this.rLog("Requests", duid, "Warn", undefined, undefined, "[onStateChange] Received command for unknown device", "warn");
			return;
		}

		try {
			await this.handleCommand(duid, folder, command, state, handler, id);
		} catch (e: unknown) {
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
			await this.executeSceneProgram(duid, state.val as string | number);
			// Scene execution can continue asynchronously in local queue mode.
			await this.setState(id, { val: null, ack: true });
		} else if (handler.hasCommandFolder(folder)) {
			const cmdDef: CommandSpec | undefined = handler.getCommandSpec(folder, command);
			if (!cmdDef) {
				this.rLog("Requests", duid, "Warn", handler.protocolVersion || undefined, undefined, `[handleCommand] Ignoring unregistered command ${folder}.${command}`, "warn");
				return;
			}

			this.rLog("Requests", duid, "Info", handler.protocolVersion || undefined, undefined, `[handleCommand] Entering commands block for ${command}`, "info");
			try {
				if (this.shouldClearSceneQueueForCommand(command, state.val)) {
					await this.clearSceneQueueForManualCancel(duid, command);
				}
				await this.executeCommand(handler, duid, command, state, cmdDef);
			} finally {
				// Reset boolean command state ONLY if it is defined as boolean
				const isBoolean = cmdDef.type === "boolean";

				if (isBoolean && this.isTruthy(state.val)) {
					this.rLog("Requests", duid, "Info", handler.protocolVersion || undefined, undefined, `[handleCommand] Scheduling reset for ${id} (boolean)`, "info");
					this.setResetTimeout(id);
				}
			}
		}
	}

	/**
	 * Executes a specific command for a device.
	 */
	private async executeCommand(handler: BaseDeviceFeatures, duid: string, command: string, state: ioBroker.State, cmdDef: CommandSpec) {
		const val = state.val;

		// 1. Common command types handling
		const isButton = cmdDef.role === "button" || cmdDef.type === "boolean";

		if (isButton) {
			if (this.isTruthy(val)) {
				this.rLog("Requests", duid, "Info", handler.protocolVersion || undefined, undefined, `[executeCommand] Triggering button command ${command}`, "info");
				await this.requestsHandler.command(handler, duid, command);
			} else {
				this.rLog("Requests", duid, "Debug", handler.protocolVersion || undefined, undefined, `[executeCommand] Ignoring button command ${command} (val=${val})`, "debug");
			}
			return;
		}

		// Log start of command execution for diagnostics
		this.rLog("Requests", duid, "Info", handler.protocolVersion || undefined, undefined, `[executeCommand] Starting ${command} with params ${typeof val === "object" ? JSON.stringify(val) : val}`, "info");

		// 2. Generic data commands (Numbers, Strings, JSON strings)
		// We pass the raw value. getCommandParams in feature handlers will do the packaging (e.g. [val]).
		if (typeof val === "string") {
			const parsed = this.tryParseJson(val);
			await this.requestsHandler.command(handler, duid, command, parsed !== undefined ? parsed : val);
		} else {
			await this.requestsHandler.command(handler, duid, command, val);
		}
	}

	private isTruthy(val: unknown): boolean {
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
			this.rLog("Requests", null, "Debug", undefined, undefined, `[setResetTimeout] Resetting ${id} to false`, "debug");
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
				this.rLog("System", null, "Info", undefined, undefined, `Loaded existing clientID: ${clientIDState.val}`, "info");
				return clientIDState.val.toString();
			}
			const randomClientID = randomBytes(16).toString("hex");
			await this.setState("clientID", { val: randomClientID, ack: true });
			this.rLog("System", null, "Info", undefined, undefined, `Generated and saved new clientID: ${randomClientID}`, "info");
			return randomClientID;
		} catch (error: unknown) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			this.rLog("System", null, "Error", undefined, undefined, `Error ensuring clientID: ${errorMsg}`, "error");
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

	/** Captures the complete authenticated APK account boundary in memory. */
	private async initializeAppPluginAuthenticatedAccountRuntime(): Promise<void> {
		if (this.appPluginAccountRuntime) {
			return;
		}
		try {
			await this.http_api.ensureProductInfo();
			this.appPluginAccountRuntime = this.http_api.createAppPluginAuthenticatedAccountRuntime();
			const summary = this.appPluginAccountRuntime.summary();
			this.rLog(
				"System",
				null,
				"Info",
				undefined,
				undefined,
				`AppPlugin-Kontositzung bereit: Region=${summary.serverCode}, Geräte=${summary.deviceCount}, Produkte=${summary.productCount}, Rollen=${summary.roleCount}`,
				"info",
			);
		} catch (error) {
			// The account runtime is still Phase 0B and must not make the existing
			// adapter unusable. A device runtime cannot start without this gate.
			this.rLog(
				"System",
				null,
				"Warn",
				undefined,
				undefined,
				`AppPlugin-Kontositzung konnte nicht aufgebaut werden: ${this.errorMessage(error)}`,
				"warn",
			);
		}
	}

	/** Prepares the opt-in APK package runtime without downloading a package. */
	private async initializeAppPluginPackageRuntime(): Promise<void> {
		if (this.appPluginPackageRuntime) {
			return;
		}
		try {
			const metadataClient = this.http_api.loginApi;
			if (!metadataClient) {
				throw new Error("Die angemeldete Cloud-Sitzung für AppPlugin-Metadaten fehlt");
			}
			this.appPluginPackageRuntime = await ApkAppPluginPackageRuntime.create({
				instanceDataDirectory: utils.getAbsoluteInstanceDataDir(this),
				metadataClient,
			});
		} catch (error) {
			// The package host is still Phase 0B and must not make the existing
			// adapter unusable. Its own state remains fail-closed.
			this.rLog(
				"System",
				null,
				"Warn",
				undefined,
				undefined,
				`AppPlugin-Paketlaufzeit konnte nicht vorbereitet werden: ${this.errorMessage(error)}`,
				"warn",
			);
		}
	}

	/** Obstacle assets for account models at startup (before device init). */
	private async downloadAssetsForAccountModels(): Promise<void> {
		try {
			await this.http_api.ensureProductInfo();
			let devices = this.http_api.getDevices() || [];
			for (let attempt = 0; attempt < 6 && devices.length === 0; attempt++) {
				await this.delay(500);
				devices = this.http_api.getDevices() || [];
			}
			const modelsInAccount = new Set<string>();
			for (const d of devices) {
				const m = this.http_api.getRobotModel(d.duid);
				if (m && m !== "unknown" && m.includes(".")) modelsInAccount.add(m);
			}
			if (modelsInAccount.size === 0) return;
			this.rLog("System", null, "Info", undefined, undefined, `Downloading obstacle assets for ${modelsInAccount.size} model(s)...`, "info");
			await this.http_api.downloadProductImages();
			for (const model of modelsInAccount) {
				await this.appPluginManager.downloadAssetsForModelIfMissing(model).catch((e: unknown) => {
					this.rLog("Cloud", null, "Debug", undefined, undefined, `Asset download for ${model}: ${e instanceof Error ? e.message : String(e)}`, "debug");
				});
			}
		} catch (e: unknown) {
			this.rLog("System", null, "Warn", undefined, undefined, `Obstacle asset download failed: ${e instanceof Error ? e.message : String(e)}`, "warn");
		}
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
				const params = JSON.parse(param);
				const duid = params.action.items[0].entityId;

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
			} catch (e: unknown) {
				const errorMsg = e instanceof Error ? e.message : String(e);
				this.rLog("Requests", null, "Warn", undefined, undefined, `[processScenes] Failed to process scene "${program.name}" (${program.id}): ${errorMsg}`, "warn");
			}
		}

		for (const duid in programs) {
			await this.ensureState(`Devices.${duid}.programs.startProgram`, {
				name: "Start saved program",
				type: "string",
				write: true,
				states: programs[duid],
			});
			await this.ensureSceneQueueState(duid);
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

	/** Timestamp keys we format as readable date string; all other keys passed through as-is. */
	private static readonly DEVICE_INFO_DATE_KEYS = ["activeTime", "active_time", "createTime", "create_time"];
	private static readonly DEVICE_INFO_NAME_OVERRIDES: Record<string, string> = {
		activeTime: "Last Activity",
		active_time: "Last Activity",
		createTime: "Created At",
		create_time: "Created At"
	};

	/**
	 * Updates deviceInfo from cloud HomeData: all top-level device fields are written to
	 * Devices.${duid}.deviceInfo.* (names unchanged). Scalars as-is; objects/arrays as JSON string.
	 */
	async updateDeviceInfo(duid: string, devices: Device[]) {
		const device = devices.find((d) => d.duid === duid);
		if (!device) return;

		const raw = device as unknown as Record<string, unknown>;
		for (const attr of Object.keys(raw)) {
			let value: ioBroker.StateValue = raw[attr] as ioBroker.StateValue;
			if (typeof value === "object" && value !== null) {
				value = JSON.stringify(value);
			}
			const common: Partial<ioBroker.StateCommon> = {};
			let finalValue: ioBroker.StateValue = value;
			if (Roborock.DEVICE_INFO_NAME_OVERRIDES[attr]) {
				common.name = Roborock.DEVICE_INFO_NAME_OVERRIDES[attr];
			}
			if (Roborock.DEVICE_INFO_DATE_KEYS.includes(attr) && typeof value === "number") {
				finalValue = this.formatRoborockDate(value);
				common.type = "string";
			} else {
				common.type = typeof finalValue as ioBroker.CommonType;
			}
			await this.ensureState(`Devices.${duid}.deviceInfo.${attr}`, common);
			await this.setStateChanged(`Devices.${duid}.deviceInfo.${attr}`, { val: finalValue, ack: true });
		}
	}

	/**
	 * Checks for new firmware.
	 */
	async checkForNewFirmware(duid: string) {
		const isLocal = this.local_api.isLocalDevice(duid);
		if (!isLocal) return;

		try {
			this.rLog("HTTP", duid, "Debug", undefined, undefined, "[checkForNewFirmware] Checking for firmware update...", "debug");
			const update = await this.http_api.getFirmwareStates(duid);
			this.rLog("HTTP", duid, "Debug", undefined, undefined, `[checkForNewFirmware] Result: ${JSON.stringify(update)}`, "debug");

			if (update.data.result) {
				for (const state in update.data.result) {
					const value = update.data.result[state];
					await this.ensureState(`Devices.${duid}.updateStatus.${state}`, { type: typeof value as ioBroker.CommonType });
					await this.setStateChanged(`Devices.${duid}.updateStatus.${state}`, { val: value, ack: true });
				}
			} else {
				this.rLog("HTTP", duid, "Warn", undefined, undefined, "[checkForNewFirmware] No result in firmware update response", "warn");
			}
		} catch (error: unknown) {
			this.rLog("HTTP", duid, "Warn", undefined, undefined, `Failed to check for new firmware: ${this.errorMessage(error)}`, "warn");
		}
	}

	/**
	 * Creates a state if it doesn't exist, applying translations.
	 */
	public async ensureState(path: string, commonOptions: Partial<ioBroker.StateCommon>, native: Record<string, unknown> = {}) {
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

				await this.setObjectNotExistsAsync(path, {
					type: "state",
					common: commonObj,
					native: native,
				});
			}
		} catch (e: unknown) {
			this.rLog("System", null, "Error", undefined, undefined, `[ensureState] Failed to update/create object for "${path}": ${this.errorMessage(e)}`, "error");
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
	private stringifySorted(obj: unknown): string {
		return JSON.stringify(obj, (_key, value) => {
			if (value && typeof value === "object" && !Array.isArray(value)) {
				return Object.keys(value)
					.sort()
					.reduce((sorted: Record<string, unknown>, key) => {
						sorted[key] = (value as Record<string, unknown>)[key];
						return sorted;
					}, {});
			}
			return value;
		});
	}

	/**
	 * Safe string from any thrown value (message if Error, else String(e)).
	 * Use in catch (e: unknown) instead of repeating e instanceof Error ? e.message : String(e).
	 */
	public errorMessage(e: unknown): string {
		return e instanceof Error ? e.message : String(e);
	}

	/**
	 * Stack trace if Error, else message, else String(e).
	 */
	public errorStack(e: unknown): string {
		if (e instanceof Error) return e.stack ?? e.message;
		return String(e);
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
	private tryParseJson(value: string): unknown | undefined {
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

		const folderObject = {
			type: "folder" as const,
			common: {
				name: name
			},
			native: {}
		};

		if (!oldObj) {
			await this.setObjectNotExistsAsync(path, {
				...folderObject
			});
		} else if (oldObj.type !== "folder") {
			await this.extendObject(path, folderObject);
		} else if (customName !== undefined) {
			// Only update name when explicitly passed; avoid overwriting with path segment when ensuring existence (issue #1140)
			const currentName = oldObj.common.name;
			const isDifferent = JSON.stringify(currentName) !== JSON.stringify(name);

			if (isDifferent) {
				try {
					await this.extendObject(path, { common: { name } });
				} catch (e: unknown) {
					this.rLog("System", null, "Error", undefined, undefined, `Failed to update folder name for ${path}: ${this.errorMessage(e)}`, "error");
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

		const devices = this.http_api.getDevices();
		const device = devices ? devices.find((d) => d.duid == duid) : undefined;
		return device?.pv || "1.0";
	}

	/**
	 * Returns the B01 sub-variant for a device when applicable.
	 * Q10 behaves event-driven and is routed separately from classic B01/Q7.
	 */
	async getB01Variant(duid: string): Promise<B01Variant | null> {
		const handler = this.deviceFeatureHandlers.get(duid);
		if (handler && "b01Variant" in handler && typeof (handler as { b01Variant?: unknown }).b01Variant === "string") {
			return (handler as { b01Variant: B01Variant }).b01Variant;
		}

		const pv = await this.getDeviceProtocolVersion(duid);
		if (pv !== "B01") return null;

		const model = this.http_api.getRobotModel(duid);
		return model ? getB01VariantFromModel(model) : "Q7";
	}

	/**
	 * Starts the go2rtc process if cameras are present.
	 */
	async start_go2rtc() {
		const devices = this.http_api.getDevices() || [];
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

				this.go2rtcProcess!.on("error", (err) => this.rLog("Local", null, "Error", undefined, undefined, `go2rtc start error: ${err.message}`, "error"));
				this.go2rtcProcess!.stdout!.on("data", (data) => this.rLog("Local", null, "Debug", undefined, undefined, `go2rtc output: ${data.toString().trim()}`, "debug"));
				this.go2rtcProcess!.stderr!.on("data", (data) => {
					const msg = data.toString().trim();
					const isShutdown = /signal:\s*terminated|exit with signal/i.test(msg);
					this.rLog("Local", null, isShutdown ? "Info" : "Error", undefined, undefined, `go2rtc ${isShutdown ? "output" : "error output"}: ${msg}`, isShutdown ? "info" : "error");
				});

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
			} catch (error: unknown) {
				this.rLog("Local", null, "Error", undefined, undefined, `Failed to spawn go2rtc: ${this.errorMessage(error)}`, "error");
			}
		}
	}

	/**
	 * Processes A01 (Tuya) protocol messages.
	 */
	async processA01(duid: string, response: { dps?: Record<string, unknown> }): Promise<void> {
		if (!response?.dps) {
			this.rLog("Local", duid, "Warn", "A01", undefined, `Invalid response: ${JSON.stringify(response)}`, "warn");
			return;
		}

		const determineType = (value: unknown): ioBroker.CommonType => {
			const t = typeof value;
			if (t === "number") return "number";
			if (t === "boolean") return "boolean";
			if (t === "object" && value !== null) return "object";
			return "string";
		};

		// Recursive helper for nested JSON objects
		const processNested = async (basePath: string, obj: Record<string, unknown>) => {
			for (const [key, value] of Object.entries(obj)) {
				const path = `${basePath}.${key}`;
				if (typeof value === "object" && value !== null && !Array.isArray(value)) {
					await this.ensureFolder(path);
					await processNested(path, value as Record<string, unknown>);
				} else {
					const val = typeof value === "object" || value === null ? JSON.stringify(value) : (value as ioBroker.StateValue);
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
				await processNested(basePath, parsedValue as Record<string, unknown>);
			} else {
				const path = `Devices.${duid}.deviceStatus.${id}`;
				await this.ensureState(path, { name: stateName, type: determineType(value), write: false });
				await this.setStateChanged(path, { val: parsedValue as ioBroker.StateValue, ack: true });
			}
		}
	}

	/**
	 * Resets the MQTT API instance.
	 */
	async resetMqttApi() {
		this.rLog("System", null, "Info", undefined, undefined, "Resetting MQTT API instance...", "info");
		if (this.mqtt_api) {
			this.mqtt_api.cleanup();
			this.requestsHandler.clearQueue(); // Prevents pending promises
		}
		// Create a new MQTT API instance and initialize it
		this.mqtt_api = new mqtt_api(this);
		await this.mqtt_api.init();
		this.rLog("System", null, "Info", undefined, undefined, "MQTT API instance has been reset.", "info");
	}

	/**
	 * Centralized error handler.
	 */
	async catchError(error: unknown, attribute?: string, duid?: string) {
		const robotModel = duid ? this.http_api.getRobotModel(duid) : "unknown";
		const stack = this.errorStack(error);
		const errorMsg = this.errorMessage(error);
		const msg = `Failed processing ${attribute || "task"} on ${duid || "adapter"} (${robotModel}): ${stack}`;

		if (errorMsg.includes("retry") || errorMsg.includes("locating") || errorMsg.includes("timed out")) {
			this.rLog("System", duid, "Warn", undefined, undefined, msg, "warn");
		} else {
			this.rLog("System", duid, "Error", undefined, undefined, msg, "error");
			if (this.sentryInstance) {
				this.sentryInstance.getSentryObject().captureException(error);
			}
		}
	}

	/**
	 * Centralized Logging Function for Protocol Messages
	 * Format: [Connection] [duid] direction [version] [protocol] [ID: id] | payload
	 */
	rLog(connection: "MQTT" | "TCP" | "UDP" | "HTTP" | "Cloud" | "Local" | "System" | "MapManager" | "Requests" | "Unknown", duid: string | null | undefined, direction: "<-" | "->" | "Info" | "Error" | "Warn" | "Debug", version: string | undefined, protocol: string | number | undefined, message: string, level: "debug" | "info" | "warn" | "error" = "debug", msgId?: string | number): void {
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
			case "debug":
				this.log.debug(logMsg);
				break;
			case "info":
				this.log.info(logMsg);
				break;
			case "warn":
				this.log.warn(logMsg);
				break;
			case "error":
				this.log.error(logMsg);
				break;
		}
	}

	// Helper to handle floor switching logic (extracted to reduce nesting)
	async handleFloorSwitch(duid: string, mapFlag: number, stateId: string): Promise<void> {
		const handler = this.deviceFeatureHandlers.get(duid);
		if (!handler) return;

		try {
			this.rLog("Requests", duid, "Info", handler.protocolVersion || undefined, undefined, `[floorSwitch] Loading map ${mapFlag}`, "info");
			// 1. Send load command and wait for robot ACK
			await this.requestsHandler.sendRequest(duid, "load_multi_map", [mapFlag], { timeout: 60000 });

			this.rLog("Requests", duid, "Info", handler.protocolVersion || undefined, undefined, "[floorSwitch] Load acknowledged, verifying map index sync", "info");

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
					this.rLog("Requests", duid, "Info", handler.protocolVersion || undefined, undefined, `[floorSwitch] Synced map index to ${currentIndex} (status=${rawStatus}, attempt=${i + 1}/10, elapsed=${elapsed}ms)`, "info");
					verified = true;
					break;
				}
				this.rLog("Requests", duid, "Info", handler.protocolVersion || undefined, undefined, `[floorSwitch] Waiting for sync (current=${currentIndex}, target=${mapFlag}, status=${rawStatus}, attempt=${i + 1}/10, elapsed=${elapsed}ms)`, "info");
				await this.delay(2000);
			}

			if (!verified) {
				this.rLog("Requests", duid, "Warn", handler.protocolVersion || undefined, undefined, `[floorSwitch] Map index did not sync to ${mapFlag} after retries; proceeding`, "warn");
			}

			await handler.updateMultiMapsList();
			await handler.updateRoomMapping();
			await handler.updateMap();

			this.rLog("Requests", duid, "Info", handler.protocolVersion || undefined, undefined, `[floorSwitch] Completed switch to map ${mapFlag}`, "info");
		} catch (e: unknown) {
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
