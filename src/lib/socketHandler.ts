// /lib/socketHandler.ts

import { Roborock } from "../main"; // Import the type of your main adapter class

// Describes a robot object
interface Robot {
	duid: string;
	name: string;
}

// Type definition for a message handler function
type MessageHandler = (message: any) => Promise<any>;

export class socketHandler {
	private adapter: Roborock;

	// A map to route commands to specific handler functions
	private commandHandlers: Map<string, MessageHandler>;

	constructor(adapterInstance: Roborock) {
		this.adapter = adapterInstance;

		// Initialize the command routing map
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
	 * Handles all incoming messages from 'sendTo' (e.g., from Admin or Vis).
	 * Routes commands to the appropriate handler using the commandHandlers map.
	 * @param obj The message object
	 */
	public async handleMessage(obj: ioBroker.Message): Promise<void> {
		if (!obj || !obj.command) {
			this.adapter.log.warn("[SocketHandler] Received invalid message object.");
			return;
		}

		// --- Special Handlers (that manage their own response) ---
		// get_obstacle_image is complex and has its own try/catch and response logic
		if (obj.command === "get_obstacle_image") {
			return this.handleGetObstacleImage(obj);
		}

		// --- Standard Handlers (that return data) ---
		const handler = this.commandHandlers.get(obj.command);

		if (!handler) {
			this.adapter.log.warn(`[SocketHandler] Unknown command received: ${obj.command}`);
			if (obj.callback) {
				this.adapter.sendTo(obj.from, obj.command, { error: "Unknown command" }, obj.callback);
			}
			return;
		}

		// Centralized try/catch and response
		try {
			// We assume the message is the 'message' property of the ioBroker.Message
			const result = await handler(obj.message);
			if (obj.callback) {
				this.adapter.sendTo(obj.from, obj.command, result, obj.callback);
			}
		} catch (error: any) {
			this.adapter.log.error(`[SocketHandler] Error handling command '${obj.command}': ${error.message}`);
			if (obj.callback) {
				this.adapter.sendTo(obj.from, obj.command, { error: error.message || "Failed" }, obj.callback);
			}
		}
	}

	/**
	 * Handles the 'get_obstacle_image' command.
	 * This method manages its own try/catch and response due to its complexity.
	 */
	private async handleGetObstacleImage(msg: ioBroker.Message): Promise<void> {
		const { duid, obstacleId } = msg.message;

		if (!duid || !obstacleId) {
			this.adapter.log.warn(`[SocketHandler] 'get_obstacle_image' missing duid or obstacleId.`);
			if (msg.callback) {
				this.adapter.sendTo(msg.from, msg.command, { error: "Missing duid or obstacleId" }, msg.callback);
			}
			return;
		}

		// Use type 0 (full image) if specified, otherwise default to 1 (preview)
		const imageType = msg.message.type === 0 ? 0 : 1;
		this.adapter.log.info(`[SocketHandler] Requesting obstacle image type: ${imageType}`);

		try {
			if (!this.adapter.requestsHandler) {
				throw new Error("RequestHandler is not available");
			}

			const handler = this.adapter.deviceFeatureHandlers.get(duid);
			if (!handler) {
				throw new Error(`No device handler found for DUID ${duid}`);
			}

			const requestParams = {
				data_filter: {
					img_id: obstacleId,
					type: imageType,
				},
			};

			const photoResponse = await this.adapter.requestsHandler.getParameter(handler, duid, "get_photo", requestParams);

			if (msg.callback) {
				this.adapter.sendTo(msg.from, msg.command, photoResponse, msg.callback);
			}
		} catch (error: any) {
			this.adapter.log.error(`[SocketHandler] Failed to get obstacle image ${obstacleId}: ${error.message}`);
			this.adapter.catchError(error, "handleGetObstacleImage", duid);

			if (msg.callback) {
				this.adapter.sendTo(msg.from, msg.command, { error: error.message || "Failed" }, msg.callback);
			}
		}
	}

	/**
	 * Fetches the list of robot devices from the adapter's objects.
	 */
	private async handleGetDeviceList(): Promise<Robot[]> {
		this.adapter.log.debug("[SocketHandler] Executing handleGetDeviceList...");
		let devices: ioBroker.DeviceObject[];

		try {
			const adapterObjects = await this.adapter.getAdapterObjectsAsync();

			// Filter all objects to find only those that are 'device'
			// AND are inside the 'Devices' folder
			devices = Object.values(adapterObjects).filter(
				(obj: any): obj is ioBroker.DeviceObject => obj && typeof obj === "object" && obj.type === "device" && obj._id.startsWith(this.adapter.namespace + ".Devices.")
			);
		} catch (e: any) {
			this.adapter.log.error(`[SocketHandler] Error getting adapter objects: ${e.message}`);
			return []; // Return empty list on error
		}

		if (devices.length === 0) {
			this.adapter.log.warn("[SocketHandler] No device objects found under 'Devices' folder.");
			return [];
		}

		const robotList: Robot[] = devices
			.map((dev) => {
				// e.g., "roborock.0.Devices.ABCDEFG"
				const idParts = dev._id.split(".");
				const duid = idParts.pop();
				const name = dev.common.name ? String(dev.common.name) : "Unknown Robot";

				if (!duid) {
					this.adapter.log.warn(`[SocketHandler] Could not parse DUID from _id: ${dev._id}`);
					return null;
				}
				return { duid, name };
			})
			.filter((robot): robot is Robot => robot !== null); // Filter out any nulls

		this.adapter.log.debug(`[SocketHandler] Returning robot list: ${JSON.stringify(robotList)}`);
		return robotList;
	}

	/**
	 * Handles simple, parameter-less commands like start, stop, pause, dock.
	 */
	private async handleSimpleCommand(duid: string, command: string): Promise<{ result: string }> {
		if (!duid) throw new Error(`Invalid message: '${command}' requires a 'duid'.`);
		this.adapter.log.info(`[SocketHandler] Received '${command}' for DUID: ${duid}`);

		const handler = this.adapter.deviceFeatureHandlers.get(duid);
		if (!handler) throw new Error(`No handler for DUID ${duid}`);

		await this.adapter.requestsHandler.command(handler, duid, command);
		return { result: "ok" };
	}

	/**
	 * Handles 'app_goto_target' command.
	 */
	private async handleGotoTarget(message: { duid: string; points: [number, number] }): Promise<{ result: string }> {
		const { duid, points } = message;
		if (!duid || !points || !Array.isArray(points) || points.length !== 2) {
			throw new Error("Invalid 'app_goto_target' message: requires 'duid' and 'points' array [x, y]");
		}

		this.adapter.log.info(`[SocketHandler] Received 'app_goto_target' for DUID: ${duid} with points: ${JSON.stringify(points)}`);

		const handler = this.adapter.deviceFeatureHandlers.get(duid);
		if (!handler) throw new Error(`No handler for DUID ${duid}`);

		await this.adapter.requestsHandler.command(handler, duid, "app_goto_target", points);
		return { result: "ok" };
	}

	/**
	 * Handles 'app_zoned_clean' command.
	 */
	private async handleZonedClean(message: { duid: string; zones: any[] }): Promise<{ result: string }> {
		const { duid, zones } = message;
		if (!duid || !zones || !Array.isArray(zones)) {
			throw new Error("Invalid 'app_zoned_clean' message: requires 'duid' and 'zones' array");
		}

		this.adapter.log.info(`[SocketHandler] Received 'app_zoned_clean' for DUID: ${duid} with zones: ${JSON.stringify(zones)}`);

		const handler = this.adapter.deviceFeatureHandlers.get(duid);
		if (!handler) throw new Error(`No handler for DUID ${duid}`);

		await this.adapter.requestsHandler.command(handler, duid, "app_zoned_clean", zones);
		return { result: "ok" };
	}
}
