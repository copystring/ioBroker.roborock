// /lib/socketHandler.ts

import { Roborock } from "../main"; // Import main adapter type

// Robot object definition
interface Robot {
	duid: string;
	name: string;
}

// Message handler type
type MessageHandler = (message: any, id?: string | number) => Promise<any>;

export class socketHandler {
	private adapter: Roborock;

	// Command routing map
	private commandHandlers: Map<string, MessageHandler>;

	constructor(adapterInstance: Roborock) {
		this.adapter = adapterInstance;

		// Initialize command map
		this.commandHandlers = new Map<string, MessageHandler>();
		this.commandHandlers.set("getDeviceList", () => this.handleGetDeviceList());

		this.commandHandlers.set("app_start", (msg, id) => this.handleSimpleCommand(msg.duid, "app_start", id));
		this.commandHandlers.set("app_pause", (msg, id) => this.handleSimpleCommand(msg.duid, "app_pause", id));
		this.commandHandlers.set("app_stop", (msg, id) => this.handleSimpleCommand(msg.duid, "app_stop", id));
		this.commandHandlers.set("app_charge", (msg, id) => this.handleSimpleCommand(msg.duid, "app_charge", id));
		this.commandHandlers.set("app_goto_target", (msg, id) => this.handleGotoTarget(msg, id));
		this.commandHandlers.set("app_zoned_clean", (msg, id) => this.handleZonedClean(msg, id));
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

		if (obj.command === "get_obstacle_image") {
			return this.handleGetObstacleImage(obj);
		}
		if (obj.command === "get_room_names") {
			return this.handleGetRoomNames(obj);
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
			// Extract message payload and pass callback ID
			const result = await handler(obj.message, obj.callback?.id);
			if (obj.callback) {
				this.adapter.sendTo(obj.from, obj.command, result, obj.callback);
			}
		} catch (error: unknown) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, `Error handling command '${obj.command}': ${this.adapter.errorMessage(error)}`, "error");
			if (obj.callback) {
				this.adapter.sendTo(obj.from, obj.command, { error: this.adapter.errorMessage(error) || "Failed" }, obj.callback);
			}
		}
	}

	private async handleGetObstacleImage(msg: ioBroker.Message): Promise<void> {
		const { duid } = msg.message;

		if (!duid) {
			this.adapter.rLog("MapManager", duid, "Warn", undefined, undefined, "'get_obstacle_image' missing duid.", "warn");
			if (msg.callback) {
				this.adapter.sendTo(msg.from, msg.command, { error: "Missing duid" }, msg.callback);
			}
			return;
		}

		const obstacleId = msg.message.obstacleId || msg.message.imgId || msg.message.img_id;

		if (obstacleId === undefined || obstacleId === null) {
			this.adapter.rLog("MapManager", duid, "Warn", undefined, undefined, "[Photo] Received get_photo request without obstacleId or imgId", "warn");
			if (msg.callback) this.adapter.sendTo(msg.from, msg.command, { error: "Missing ID" }, msg.callback);
			return;
		}

		const imageType = msg.message.type !== undefined ? Number(msg.message.type) : 1;
		this.adapter.rLog("MapManager", duid, "Debug", undefined, undefined, `[Photo] Requesting image type: ${imageType} (ID: ${obstacleId})`, "debug");

		try {
			if (!this.adapter.requestsHandler) {
				throw new Error("RequestHandler is not available");
			}

			const handler = this.adapter.deviceFeatureHandlers.get(duid);
			if (!handler) {
				throw new Error(`No device handler found for DUID ${duid}`);
			}

			const photoResponse = await handler.getPhoto(obstacleId, imageType, msg.callback ? msg.callback.id : undefined);

			let potentialBuffer: Buffer | null = null;
			let bbox: any = null;

			// Helper to find the buffer and bbox in various response structures
			const extractData = (obj: any): { buf: Buffer; bbox?: any } | null => {
				if (!obj) return null;
				if (Buffer.isBuffer(obj)) return { buf: obj };
				if (obj.buffer && Buffer.isBuffer(obj.buffer)) return { buf: obj.buffer, bbox: obj.bbox };
				if (obj.data) {
					if (Buffer.isBuffer(obj.data)) return { buf: obj.data };
					if (obj.data.buffer && Buffer.isBuffer(obj.data.buffer)) return { buf: obj.data.buffer, bbox: obj.data.bbox };
				}
				return null;
			};

			let payload: any = photoResponse;
			const extracted = extractData(photoResponse);
			if (extracted) {
				potentialBuffer = extracted.buf;
				bbox = extracted.bbox;
			}

			if (Buffer.isBuffer(potentialBuffer)) {
				let mimeType = "image/png";
				// Check for JPEG (FF D8)
				if (potentialBuffer[0] === 0xff && potentialBuffer[1] === 0xd8) {
					mimeType = "image/jpeg";
				} else if (potentialBuffer[0] === 0x89 && potentialBuffer[1] === 0x50 && potentialBuffer[2] === 0x4e && potentialBuffer[3] === 0x47) {
					mimeType = "image/png";
				} else {
					this.adapter.rLog("MapManager", duid, "Warn", undefined, undefined, `[Photo] Unknown image format. Header: ${potentialBuffer.subarray(0, 8).toString("hex")}`, "warn");
				}

				const base64Str = potentialBuffer.toString("base64");
				payload = {
					image: `data:${mimeType};base64,` + base64Str,
					bbox: bbox
				};
			}

			if (msg.callback) {
				const imageLen = (payload && payload.image) ? payload.image.length : 0;
				this.adapter.rLog("MapManager", duid, "Debug", undefined, undefined, `[Photo] Sending photo response to frontend (Image length: ${imageLen})`, "debug");
				this.adapter.sendTo(msg.from, msg.command, payload, msg.callback);
			}
		} catch (error: unknown) {
			this.adapter.rLog("MapManager", duid, "Error", undefined, undefined, `[Photo] Failed to get obstacle image ${obstacleId}: ${this.adapter.errorMessage(error)}`, "error");
			this.adapter.catchError(error, "handleGetObstacleImage", duid);

			if (msg.callback) {
				this.adapter.sendTo(msg.from, msg.command, { error: this.adapter.errorMessage(error) || "Failed" }, msg.callback);
			}
		}
	}

	/**
	 * Returns segment id → room name for a device (e.g. for cloud maps where mapData has no segment names).
	 * Message: { duid: string, floor?: number, segmentIds?: number[] }. Returns { [segmentId: string]: string }.
	 */
	private async handleGetRoomNames(msg: ioBroker.Message): Promise<void> {
		const { duid, floor = 0, segmentIds } = msg.message || {};
		if (!duid) {
			if (msg.callback) this.adapter.sendTo(msg.from, msg.command, { error: "Missing duid" }, msg.callback);
			return;
		}
		const result: Record<string, string> = {};
		try {
			const prefix = `Devices.${duid}.floors.${floor}.`;
			if (Array.isArray(segmentIds) && segmentIds.length > 0) {
				for (const id of segmentIds) {
					const obj = await this.adapter.getObjectAsync(prefix + id);
					const name = (obj as any)?.common?.name;
					if (name && String(name).trim()) result[String(id)] = String(name).trim();
				}
			} else {
				const ns = this.adapter.namespace;
				const list = await (this.adapter.getObjectListAsync as (n: string, o: { type: string; startkey: string; endkey: string }) => Promise<unknown>)(ns, {
					type: "state",
					startkey: `${ns}.${prefix}`,
					endkey: `${ns}.${prefix}\u9999`
				});
				const rows = (list as any)?.rows ?? (Array.isArray(list) ? list : []);
				for (const row of rows) {
					const o = row.value ?? row;
					if (!o || !o._id) continue;
					const segId = o._id.slice((ns + "." + prefix).length);
					if (!segId) continue;
					const name = o.common?.name;
					if (name && String(name).trim()) result[segId] = String(name).trim();
				}
			}
			if (msg.callback) this.adapter.sendTo(msg.from, msg.command, result, msg.callback);
		} catch (error: any) {
			this.adapter.rLog("System", duid, "Error", undefined, undefined, `get_room_names failed: ${error.message}`, "error");
			if (msg.callback) this.adapter.sendTo(msg.from, msg.command, { error: error.message || "Failed" }, msg.callback);
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
		} catch (e: unknown) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, `Error getting adapter objects: ${this.adapter.errorMessage(e)}`, "error");
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
	private async handleSimpleCommand(duid: string, command: string, id?: string | number): Promise<{ result: string }> {
		if (!duid) throw new Error(`Invalid message: '${command}' requires a 'duid'.`);
		this.adapter.rLog("System", duid, "Info", undefined, undefined, `Received '${command}' (ID: ${id})`, "info");

		const handler = this.adapter.deviceFeatureHandlers.get(duid);
		if (!handler) throw new Error(`No handler for DUID ${duid}`);

		await this.adapter.requestsHandler.command(handler, duid, command, undefined, id ? String(id) : undefined);
		return { result: "ok" };
	}

	/**
	 * Handles 'app_goto_target'.
	 */
	private async handleGotoTarget(message: { duid: string; points: [number, number] }, id?: string | number): Promise<{ result: string }> {
		const { duid, points } = message;
		if (!duid || !points || !Array.isArray(points) || points.length !== 2) {
			throw new Error("Invalid 'app_goto_target' message: requires 'duid' and 'points' array [x, y]");
		}

		this.adapter.rLog("System", duid, "Info", undefined, undefined, `Received 'app_goto_target' with points: ${JSON.stringify(points)} (ID: ${id})`, "info");

		const handler = this.adapter.deviceFeatureHandlers.get(duid);
		if (!handler) throw new Error(`No handler for DUID ${duid}`);

		await this.adapter.requestsHandler.command(handler, duid, "app_goto_target", points, id ? String(id) : undefined);
		return { result: "ok" };
	}

	/**
	 * Handles 'app_zoned_clean'.
	 */
	private async handleZonedClean(message: { duid: string; zones: any[] }, id?: string | number): Promise<{ result: string }> {
		const { duid, zones } = message;
		if (!duid || !zones || !Array.isArray(zones)) {
			throw new Error("Invalid 'app_zoned_clean' message: requires 'duid' and 'zones' array");
		}

		this.adapter.rLog("System", duid, "Info", undefined, undefined, `Received 'app_zoned_clean' with zones: ${JSON.stringify(zones)} (ID: ${id})`, "info");

		const handler = this.adapter.deviceFeatureHandlers.get(duid);
		if (!handler) throw new Error(`No handler for DUID ${duid}`);

		await this.adapter.requestsHandler.command(handler, duid, "app_zoned_clean", zones, id ? String(id) : undefined);
		return { result: "ok" };
	}
}
