// /lib/socketHandler.ts

import { Roborock } from "../main"; // Import main adapter type

// Robot object definition
interface Robot {
	duid: string;
	name: string;
}

// Message handler type
type MessageHandler = (message: any) => Promise<any>;

export class socketHandler {
	private adapter: Roborock;

	// Command routing map
	private commandHandlers: Map<string, MessageHandler>;

	constructor(adapterInstance: Roborock) {
		this.adapter = adapterInstance;

		// Initialize command map
		this.commandHandlers = new Map<string, MessageHandler>();
		this.commandHandlers.set("getDeviceList", () => this.handleGetDeviceList());

		this.commandHandlers.set("app_start", (msg) => this.handleSimpleCommand(msg.duid, "app_start"));
		this.commandHandlers.set("app_pause", (msg) => this.handleSimpleCommand(msg.duid, "app_pause"));
		this.commandHandlers.set("app_stop", (msg) => this.handleSimpleCommand(msg.duid, "app_stop"));
		this.commandHandlers.set("app_charge", (msg) => this.handleSimpleCommand(msg.duid, "app_charge"));
		this.commandHandlers.set("app_goto_target", (msg) => this.handleGotoTarget(msg));
		this.commandHandlers.set("app_zoned_clean", (msg) => this.handleZonedClean(msg));
	}

	/**
	 * Handles incoming 'sendTo' messages.
	 * Routes commands to the appropriate handler using the commandHandlers map.
	 * @param obj The message object
	 */
	public async handleMessage(obj: ioBroker.Message): Promise<void> {
		if (!obj || !obj.command) {
			this.adapter.rLog("System", null, "Warn", undefined, undefined, "Received invalid message object.", "warn");
			return;
		}

		// --- Special Handlers ---
		// get_obstacle_image has custom logic
		if (obj.command === "get_obstacle_image") {
			return this.handleGetObstacleImage(obj);
		}

		// --- Standard Handlers ---
		const handler = this.commandHandlers.get(obj.command);

		if (!handler) {
			this.adapter.rLog("System", null, "Warn", undefined, undefined, `Unknown command received: ${obj.command}`, "warn");
			if (obj.callback) {
				this.adapter.sendTo(obj.from, obj.command, { error: "Unknown command" }, obj.callback);
			}
			return;
		}

		// Centralized error handling
		try {
			// Extract message payload
			const result = await handler(obj.message);
			if (obj.callback) {
				this.adapter.sendTo(obj.from, obj.command, result, obj.callback);
			}
		} catch (error: any) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, `Error handling command '${obj.command}': ${error.message}`, "error");
			if (obj.callback) {
				this.adapter.sendTo(obj.from, obj.command, { error: error.message || "Failed" }, obj.callback);
			}
		}
	}

	/**
	 * Handles 'get_obstacle_image' command.
	 */
	private async handleGetObstacleImage(msg: ioBroker.Message): Promise<void> {
		const { duid, obstacleId } = msg.message;

		if (!duid || !obstacleId) {
			this.adapter.rLog("MapManager", duid, "Warn", undefined, undefined, "'get_obstacle_image' missing duid or obstacleId.", "warn");
			if (msg.callback) {
				this.adapter.sendTo(msg.from, msg.command, { error: "Missing duid or obstacleId" }, msg.callback);
			}
			return;
		}

		// Use type 0 (full) or 1 (preview)
		const imageType = msg.message.type === 0 ? 0 : 1;
		this.adapter.rLog("MapManager", duid, "Info", undefined, undefined, `Requesting obstacle image type: ${imageType}`, "info");

		try {
			if (!this.adapter.requestsHandler) {
				throw new Error("RequestHandler is not available");
			}

			const handler = this.adapter.deviceFeatureHandlers.get(duid);
			if (!handler) {
				throw new Error(`No device handler found for DUID ${duid}`);
			}

			const photoResponse = await handler.getPhoto(obstacleId, imageType);

			if (msg.callback) {
				this.adapter.sendTo(msg.from, msg.command, photoResponse, msg.callback);
			}
		} catch (error: any) {
			this.adapter.rLog("MapManager", duid, "Error", undefined, undefined, `Failed to get obstacle image ${obstacleId}: ${error.message}`, "error");
			this.adapter.catchError(error, "handleGetObstacleImage", duid);

			if (msg.callback) {
				this.adapter.sendTo(msg.from, msg.command, { error: error.message || "Failed" }, msg.callback);
			}
		}
	}

	/**
	 * Fetches robot list.
	 */
	private async handleGetDeviceList(): Promise<Robot[]> {
		this.adapter.rLog("System", null, "Debug", undefined, undefined, "Executing handleGetDeviceList...", "debug");
		let devices: ioBroker.DeviceObject[];

		try {
			const adapterObjects = await this.adapter.getAdapterObjectsAsync();

			// Filter for devices in 'Devices' folder
			devices = Object.values(adapterObjects).filter(
				(obj: any): obj is ioBroker.DeviceObject => obj && typeof obj === "object" && obj.type === "device" && obj._id.startsWith(this.adapter.namespace + ".Devices.")
			);
		} catch (e: any) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, `Error getting adapter objects: ${e.message}`, "error");
			return []; // Return empty list on error
		}

		if (devices.length === 0) {
			this.adapter.rLog("System", null, "Warn", undefined, undefined, "No device objects found under 'Devices' folder.", "warn");
			return [];
		}

		const robotList: Robot[] = devices
			.map((dev) => {
				// e.g. "roborock.0.Devices.ABCDEFG"
				const idParts = dev._id.split(".");
				const duid = idParts.pop();
				const name = dev.common.name ? String(dev.common.name) : "Unknown Robot";

				if (!duid) {
					this.adapter.rLog("System", null, "Warn", undefined, undefined, `Could not parse DUID from _id: ${dev._id}`, "warn");
					return null;
				}
				return { duid, name };
			})
			.filter((robot): robot is Robot => robot !== null); // Filter out any nulls

		this.adapter.rLog("System", null, "Debug", undefined, undefined, `Returning robot list: ${JSON.stringify(robotList)}`, "debug");
		return robotList;
	}

	/**
	 * Handles simple commands.
	 */
	private async handleSimpleCommand(duid: string, command: string): Promise<{ result: string }> {
		if (!duid) throw new Error(`Invalid message: '${command}' requires a 'duid'.`);
		this.adapter.rLog("System", duid, "Info", undefined, undefined, `Received '${command}'`, "info");

		const handler = this.adapter.deviceFeatureHandlers.get(duid);
		if (!handler) throw new Error(`No handler for DUID ${duid}`);

		await this.adapter.requestsHandler.command(handler, duid, command);
		return { result: "ok" };
	}

	/**
	 * Handles 'app_goto_target'.
	 */
	private async handleGotoTarget(message: { duid: string; points: [number, number] }): Promise<{ result: string }> {
		const { duid, points } = message;
		if (!duid || !points || !Array.isArray(points) || points.length !== 2) {
			throw new Error("Invalid 'app_goto_target' message: requires 'duid' and 'points' array [x, y]");
		}

		this.adapter.rLog("System", duid, "Info", undefined, undefined, `Received 'app_goto_target' with points: ${JSON.stringify(points)}`, "info");

		const handler = this.adapter.deviceFeatureHandlers.get(duid);
		if (!handler) throw new Error(`No handler for DUID ${duid}`);

		await this.adapter.requestsHandler.command(handler, duid, "app_goto_target", points);
		return { result: "ok" };
	}

	/**
	 * Handles 'app_zoned_clean'.
	 */
	private async handleZonedClean(message: { duid: string; zones: any[] }): Promise<{ result: string }> {
		const { duid, zones } = message;
		if (!duid || !zones || !Array.isArray(zones)) {
			throw new Error("Invalid 'app_zoned_clean' message: requires 'duid' and 'zones' array");
		}

		this.adapter.rLog("System", duid, "Info", undefined, undefined, `Received 'app_zoned_clean' with zones: ${JSON.stringify(zones)}`, "info");

		const handler = this.adapter.deviceFeatureHandlers.get(duid);
		if (!handler) throw new Error(`No handler for DUID ${duid}`);

		await this.adapter.requestsHandler.command(handler, duid, "app_zoned_clean", zones);
		return { result: "ok" };
	}
}
