"use strict";
// /lib/socketHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = void 0;
class socketHandler {
    adapter;
    // Command routing map
    commandHandlers;
    constructor(adapterInstance) {
        this.adapter = adapterInstance;
        // Initialize command map
        this.commandHandlers = new Map();
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
    async handleMessage(obj) {
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
        }
        catch (error) {
            this.adapter.rLog("System", null, "Error", undefined, undefined, `Error handling command '${obj.command}': ${error.message}`, "error");
            if (obj.callback) {
                this.adapter.sendTo(obj.from, obj.command, { error: error.message || "Failed" }, obj.callback);
            }
        }
    }
    /**
     * Handles 'get_obstacle_image' command.
     */
    async handleGetObstacleImage(msg) {
        const { duid } = msg.message;
        if (!duid) {
            this.adapter.rLog("MapManager", duid, "Warn", undefined, undefined, "'get_obstacle_image' missing duid.", "warn");
            if (msg.callback) {
                this.adapter.sendTo(msg.from, msg.command, { error: "Missing duid" }, msg.callback);
            }
            return;
        }
        const obstacleId = msg.message.obstacleId;
        if (obstacleId === undefined || obstacleId === null) {
            this.adapter.rLog("MapManager", duid, "Warn", undefined, undefined, "[Photo] Received get_obstacle_image request without obstacleId", "warn");
            if (msg.callback)
                this.adapter.sendTo(msg.from, msg.command, { error: "Missing obstacleId" }, msg.callback);
            return;
        }
        const imageType = msg.message.type !== undefined ? msg.message.type : 1;
        this.adapter.rLog("MapManager", duid, "Info", undefined, undefined, `[Photo] Requesting obstacle image type: ${imageType}`, "info");
        try {
            if (!this.adapter.requestsHandler) {
                throw new Error("RequestHandler is not available");
            }
            const handler = this.adapter.deviceFeatureHandlers.get(duid);
            if (!handler) {
                throw new Error(`No device handler found for DUID ${duid}`);
            }
            const photoResponse = await handler.getPhoto(obstacleId, imageType);
            let potentialBuffer = null;
            let bbox = null;
            // Helper to find the buffer and bbox in various response structures
            const extractData = (obj) => {
                if (!obj)
                    return null;
                if (Buffer.isBuffer(obj))
                    return { buf: obj };
                if (obj.buffer && Buffer.isBuffer(obj.buffer))
                    return { buf: obj.buffer, bbox: obj.bbox };
                if (obj.data) {
                    if (Buffer.isBuffer(obj.data))
                        return { buf: obj.data };
                    if (obj.data.buffer && Buffer.isBuffer(obj.data.buffer))
                        return { buf: obj.data.buffer, bbox: obj.data.bbox };
                }
                return null;
            };
            let payload = photoResponse;
            const extracted = extractData(photoResponse);
            if (extracted) {
                potentialBuffer = extracted.buf;
                bbox = extracted.bbox;
            }
            if (Buffer.isBuffer(potentialBuffer)) {
                let mimeType = "image/png";
                if (potentialBuffer[0] === 0xff && potentialBuffer[1] === 0xd8) {
                    mimeType = "image/jpeg";
                }
                this.adapter.rLog("MapManager", duid, "Debug", undefined, undefined, `[Photo] Converting Buffer to Base64. Length: ${potentialBuffer.length}. Mime: ${mimeType}`, "debug");
                payload = {
                    image: `data:${mimeType};base64,` + potentialBuffer.toString("base64"),
                    bbox: bbox
                };
            }
            if (msg.callback) {
                const imageLen = (payload && payload.image) ? payload.image.length : 0;
                this.adapter.rLog("MapManager", duid, "Info", undefined, undefined, `[Photo] Sending photo response to frontend (Image length: ${imageLen})`, "info");
                this.adapter.sendTo(msg.from, msg.command, payload, msg.callback);
            }
        }
        catch (error) {
            this.adapter.rLog("MapManager", duid, "Error", undefined, undefined, `[Photo] Failed to get obstacle image ${obstacleId}: ${error.message}`, "error");
            this.adapter.catchError(error, "handleGetObstacleImage", duid);
            if (msg.callback) {
                this.adapter.sendTo(msg.from, msg.command, { error: error.message || "Failed" }, msg.callback);
            }
        }
    }
    /**
     * Fetches robot list.
     */
    async handleGetDeviceList() {
        this.adapter.rLog("System", null, "Debug", undefined, undefined, "Executing handleGetDeviceList...", "debug");
        let devices;
        try {
            const adapterObjects = await this.adapter.getAdapterObjectsAsync();
            // Filter for devices in 'Devices' folder
            devices = Object.values(adapterObjects).filter((obj) => obj && typeof obj === "object" && obj.type === "device" && obj._id.startsWith(this.adapter.namespace + ".Devices."));
        }
        catch (e) {
            this.adapter.rLog("System", null, "Error", undefined, undefined, `Error getting adapter objects: ${e.message}`, "error");
            return []; // Return empty list on error
        }
        if (devices.length === 0) {
            this.adapter.rLog("System", null, "Warn", undefined, undefined, "No device objects found under 'Devices' folder.", "warn");
            return [];
        }
        const robotList = devices
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
            .filter((robot) => robot !== null); // Filter out any nulls
        this.adapter.rLog("System", null, "Debug", undefined, undefined, `Returning robot list: ${JSON.stringify(robotList)}`, "debug");
        return robotList;
    }
    /**
     * Handles simple commands.
     */
    async handleSimpleCommand(duid, command) {
        if (!duid)
            throw new Error(`Invalid message: '${command}' requires a 'duid'.`);
        this.adapter.rLog("System", duid, "Info", undefined, undefined, `Received '${command}'`, "info");
        const handler = this.adapter.deviceFeatureHandlers.get(duid);
        if (!handler)
            throw new Error(`No handler for DUID ${duid}`);
        await this.adapter.requestsHandler.command(handler, duid, command);
        return { result: "ok" };
    }
    /**
     * Handles 'app_goto_target'.
     */
    async handleGotoTarget(message) {
        const { duid, points } = message;
        if (!duid || !points || !Array.isArray(points) || points.length !== 2) {
            throw new Error("Invalid 'app_goto_target' message: requires 'duid' and 'points' array [x, y]");
        }
        this.adapter.rLog("System", duid, "Info", undefined, undefined, `Received 'app_goto_target' with points: ${JSON.stringify(points)}`, "info");
        const handler = this.adapter.deviceFeatureHandlers.get(duid);
        if (!handler)
            throw new Error(`No handler for DUID ${duid}`);
        await this.adapter.requestsHandler.command(handler, duid, "app_goto_target", points);
        return { result: "ok" };
    }
    /**
     * Handles 'app_zoned_clean'.
     */
    async handleZonedClean(message) {
        const { duid, zones } = message;
        if (!duid || !zones || !Array.isArray(zones)) {
            throw new Error("Invalid 'app_zoned_clean' message: requires 'duid' and 'zones' array");
        }
        this.adapter.rLog("System", duid, "Info", undefined, undefined, `Received 'app_zoned_clean' with zones: ${JSON.stringify(zones)}`, "info");
        const handler = this.adapter.deviceFeatureHandlers.get(duid);
        if (!handler)
            throw new Error(`No handler for DUID ${duid}`);
        await this.adapter.requestsHandler.command(handler, duid, "app_zoned_clean", zones);
        return { result: "ok" };
    }
}
exports.socketHandler = socketHandler;
//# sourceMappingURL=socketHandler.js.map