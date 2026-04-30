import PQueue from "p-queue";
import type { Roborock } from "../main";
import { Q10CommandHandler } from "./b01/q10/Q10CommandHandler";
import { isConnectivityLikeError } from "./errorUtils";
import type { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import { messageParser } from "./messageParser";

const REQUEST_TIMEOUT = 10000;
/** Max retries on failure (timeout/network); total attempts = 1 + this value. */
const MAX_REQUEST_RETRIES = 2;

function isRetryableError(error: unknown): boolean {
	return isConnectivityLikeError(error);
}

export enum RequestPriority {
	LOW = -10,
	NORMAL = 0,
	HIGH = 10
}

// ============================================================
// RequestManager Class
// ============================================================
class RequestManager {
	queue: PQueue;
	timeoutMs: number;
	tasks: Map<string, AbortController>;
	constructor(concurrency = 20, timeoutMs = 30000) {
		this.queue = new PQueue({ concurrency });
		this.timeoutMs = timeoutMs;
		this.tasks = new Map();
	}

	async add<T>(id: string, taskFunction: (signal: AbortSignal) => Promise<T>, priority = RequestPriority.NORMAL): Promise<T> {
		const manualController = new AbortController();
		this.tasks.set(id, manualController);

		try {
			return await this.queue.add(async () => {
				try {
					if (manualController.signal.aborted) {
						throw new Error("ADAPTER_STOPPED");
					}

					// The 30s timeout is now handled INSIDE RoborockRequest.send()
					// This signal is only for manual cancellation (adapter stop)
					return await taskFunction(manualController.signal);
				} catch (error: unknown) {
					if (manualController.signal.aborted || (error instanceof Error && error.message === "CANCELLED_BY_USER")) {
						throw new Error(`Task ${id} was cancelled manually.`);
					} else {
						throw error;
					}
				}
			}, { priority });
		} finally {
			this.tasks.delete(id);
		}
	}

	cancel(id: string) {
		const controller = this.tasks.get(id);
		if (controller) {
			controller.abort();
			return true;
		}
		return false;
	}

	async onIdle() {
		await this.queue.onIdle();
	}

	clear() {
		this.tasks.forEach((c) => c.abort(new Error("ADAPTER_STOPPED")));
		this.tasks.clear();
		this.queue.clear();
	}
}

/** B01 map-style pending entry (method, duid, resolve, reject; optional startTime/recordIndex for history map matching). */
export type PendingMapEntry = {
	method: string;
	duid: string;
	resolve: (data: any) => void;
	reject: (err?: any) => void;
	startTime?: number;
	recordIndex?: number | null;
	recordMapUrl?: string;
};

export class RoborockRequest {
	adapter: Roborock;
	handler: requestsHandler;
	duid: string;
	method: string;
	params: unknown;
	messageID: number;
	resolvePromise!: (value: unknown) => void;
	rejectPromise!: (reason?: unknown) => void;
	promise: Promise<unknown>;
	version: string; // Store protocol version for logging
	public creationTime: number;
	public startTime: number = 0;
	public binaryType: "photo" | "map" | undefined;
	public sentConnectionType: "MQTT" | "TCP" | undefined;
	timeoutTimer: ioBroker.Timeout | undefined;

	timeout: number;
	manager: RequestManager;
	queueName: string;

	constructor(handler: requestsHandler, duid: string, method: string, params: unknown, manager: RequestManager, queueName: string, version = "1.0", timeout = REQUEST_TIMEOUT) {
		this.handler = handler;
		this.adapter = handler.adapter;
		this.duid = duid;
		this.method = method;
		this.params = params;
		this.messageID = 0;
		this.version = version;
		this.creationTime = Date.now();
		this.startTime = Date.now();
		this.timeout = timeout;
		this.manager = manager;
		this.queueName = queueName;

		// Set strict binary type based on method
		if (this.method === "get_photo") {
			this.binaryType = "photo";
		} else if (this.method === "get_map_v1" || this.method === "get_clean_record_map") {
			this.binaryType = "map";
		}

		this.promise = new Promise((resolve, reject) => {
			this.resolvePromise = resolve;
			this.rejectPromise = reject;
		});
		// Prevent unhandled rejections if we reject before anyone awaits it
		this.promise.catch(() => { });
	}

	async send(signal?: AbortSignal) {
		const queueDuration = Date.now() - this.creationTime;

		if (signal?.aborted) throw new Error("Aborted");

		// Assign fresh Message ID right before sending
		if (this.method === "get_photo") {
			this.handler.photoIdCounter = this.handler.photoIdCounter >= 255 ? 1 : this.handler.photoIdCounter + 1;
			this.messageID = this.handler.photoIdCounter;
		} else {
			if (this.version === "B01") {
				this.messageID = Date.now();
				if (this.messageID <= this.handler.lastB01Id) {
					this.messageID = this.handler.lastB01Id + 1;
				}
				this.handler.lastB01Id = this.messageID;
			} else {
				this.messageID = this.handler.nextMessageId();
			}
		}

		// Register in pendingRequests immediately to ensure we can cleanup if anything fails
		this.adapter.pendingRequests.set(this.messageID, this);

		// B01: FIFO queue so 301 responses can be matched by order (live vs history from classify + taskBeginDate)
		if (this.version === "B01" && (this.method === "service.upload_by_maptype" || this.method === "service.upload_record_by_url")) {
			const queue = this.adapter.b01MapResponseQueue.get(this.duid) || [];
			queue.push(this.method === "service.upload_by_maptype" ? "get_map_v1" : "get_clean_record_map");
			this.adapter.b01MapResponseQueue.set(this.duid, queue);
		}

		// Handle Manual Cancellation
		if (signal) {
			signal.addEventListener("abort", () => {
				this.reject(new Error(`Task ${this.messageID} was cancelled manually.`));
			}, { once: true });
		}

		let protocol = 101;
		let version = await this.adapter.getDeviceProtocolVersion(this.duid);
		const timestamp = Math.floor(Date.now() / 1000);

		// FORCE Protocol 1.0 for get_photo as it uses a specific RSA handshake
		// that is known to work with 1.0 but fails/times out with L01.
		if (this.method === "get_photo") {
			version = "1.0";
		}

		if (this.adapter.local_api.isConnected(this.duid) && version != "B01" && !["service.upload_by_maptype", "service.upload_record_by_url", "get_photo"].includes(this.method)) {
			protocol = 4;
		}

		const payload = await this.handler.messageParser.buildPayload(protocol, this.messageID, this.method, this.params, version);

		const mqttConnectionState = this.adapter.mqtt_api.isConnected();

		// Connection inference
		const connectionType = (protocol == 101) ? "MQTT" : "TCP";
		this.sentConnectionType = connectionType;

		const reduceLog = this.method === "get_clean_summary" || this.method === "service.get_record_list" || this.method === "get_photo";
		const paramsStr = this.params != null ? JSON.stringify(this.params) : "";
		const logParams = reduceLog
			? (paramsStr ? ` | Params (${paramsStr.length < 1024 ? `${paramsStr.length}b` : `${(paramsStr.length / 1024).toFixed(1)} KB`})` : "")
			: (paramsStr ? ` | Params: ${paramsStr}` : "");

		const logLevel = requestsHandler.getLogLevelForMethod(this.method);
		const qSize = this.manager.queue.size;
		// Do not show internal request ID for B01 301 map methods.
		const logMsgId = (version === "B01" && (this.method === "get_clean_record_map" || this.method === "get_map_v1")) ? undefined : this.messageID;
		// Local TCP uses a socket msgId separate from the JSON request id; L01 also
		// feeds that frame id into AES-GCM/replay state.
		const transportMessageId = protocol === 4 ? this.handler.messageParser.nextTransportSequenceId(this.duid) : this.messageID;
		const tcpFrameLog = protocol === 4 ? ` | tcpMsgId: ${transportMessageId}` : "";

		if (connectionType === "MQTT") {
			this.adapter.rLog("MQTT", this.duid, "->", `${version}`, protocol, `${this.method}${logParams} | qSize: ${qSize} | waited: ${queueDuration}ms`, logLevel, logMsgId);
		} else {
			this.adapter.rLog("TCP", this.duid, "->", `${version}`, protocol, `${this.method}${logParams}${tcpFrameLog} | qSize: ${qSize} | waited: ${queueDuration}ms`, "debug", logMsgId);
		}
		const roborockMessage = await this.handler.messageParser.buildRoborockMessage(this.duid, protocol, timestamp, payload, version, transportMessageId);

		const localConnectionState = this.adapter.local_api.isConnected(this.duid);

		if (!roborockMessage) {
			const errorMsg = "Failed to build buildRoborockMessage!";
			this.adapter.catchError(errorMsg, "function sendRequest", this.duid);
			this.reject(new Error(errorMsg));
			return this.promise;
		}

		if (version == "A01") {
			this.adapter.mqtt_api.sendMessage(this.duid, roborockMessage);
			this.resolve(null);
			return this.promise;
		}

		if (protocol == 101 && !mqttConnectionState) {
			const errorMsg = `Cloud connection not available. Not sending for method ${this.method} request!`;
			this.adapter.rLog("System", this.duid, "Debug", "N/A", undefined, errorMsg, "debug");
			this.reject(new Error(errorMsg));
			return this.promise;
		} else if (!localConnectionState && !mqttConnectionState && this.method != "get_network_info") {
			const errorMsg = `Adapter locally or remotely not connected to robot ${this.duid}. Sending request for ${this.method} not possible!`;
			this.adapter.rLog("System", this.duid, "Debug", "N/A", undefined, errorMsg, "debug");
			this.reject(new Error(errorMsg));
			return this.promise;
		}

		if (protocol !== 101 && !localConnectionState) {
			const errorMsg = `TCP network connection unavailable before sending ${this.method}.`;
			this.adapter.rLog("TCP", this.duid, "Debug", `${version}`, protocol, errorMsg, "debug", logMsgId);
			this.reject(new Error(errorMsg));
			return this.promise;
		}

		// --- Start Precision Timer NOW ---
		// We start the timer only when the message is about to touch the wire.
		this.startTime = Date.now();
		this.timeoutTimer = this.adapter.setTimeout(() => {
			const runDuration = Date.now() - this.startTime;
			this.adapter.rLog("System", this.duid, "Debug", "Lifecycle", undefined, `[Task ${this.messageID}] TIMEOUT (${this.method}) after ${runDuration}ms | limit: ${this.timeout}ms`, "debug");
			this.reject(new Error(`Task ${this.messageID} timed out after ${this.timeout}ms.`));
		}, this.timeout);

		// Use the forced connectionType logic for decision making
		if (protocol == 101) {
			this.adapter.mqtt_api.sendMessage(this.duid, roborockMessage);
		} else {
			const lengthBuffer = Buffer.alloc(4);
			lengthBuffer.writeUInt32BE(roborockMessage.length, 0);
			const fullMessage = Buffer.concat([lengthBuffer, roborockMessage] as Uint8Array[]);
			if (!this.adapter.local_api.sendMessage(this.duid, fullMessage)) {
				this.reject(new Error(`TCP network connection unavailable while sending ${this.method}.`));
			}
		}

		return this.promise;
	}

	resolve(result: unknown, version?: string) {
		if (this.timeoutTimer) this.adapter.clearTimeout(this.timeoutTimer);
		this.adapter.pendingRequests.delete(this.messageID);
		// Return an object if version is present, otherwise just the result
		if (version) {
			this.resolvePromise({ data: result, version: version });
		} else {
			this.resolvePromise(result);
		}
	}

	reject(reason: unknown) {
		if (this.timeoutTimer) this.adapter.clearTimeout(this.timeoutTimer);

		// Debug logging to verify deletion
		const existed = this.adapter.pendingRequests.delete(this.messageID);
		if (!existed) {
			// This might happen if someone else deleted it, which shouldn't happen with single-threaded guard
			this.adapter.rLog("System", this.duid, "Debug", "Requests", undefined, `Warning: MessageID ${this.messageID} was NOT found in pendingRequests during rejection.`, "debug");
		}

		this.rejectPromise(reason);
	}
}

export class requestsHandler {
	adapter: Roborock;
	idCounter: number;
	photoIdCounter: number;
	lastB01Id: number; // For B01 timestamp-based IDs
	private globalManager: RequestManager; // For commands (high concurrency)
	/** Map-related requests for non-B01 (V1 etc.). Concurrency 2; responses are matched by message ID. */
	private mapManager: RequestManager;
	/** B01 only: map triggers and logical map requests. Concurrency 1 — B01 301 responses are not matched by ID, so only one in flight avoids wrong assignment (e.g. records.0 getting wrong payload). */
	private b01MapManager: RequestManager;
	private q10CommandHandler: Q10CommandHandler | undefined;
	messageParser: messageParser;
	mqttResetInterval: ioBroker.Interval | undefined = undefined;

	public startupFinished: boolean = true;
	private finishedRequests: Set<number> = new Set();

	constructor(adapter: Roborock) {
		this.adapter = adapter;
		// Offset ID by instance to avoid collisions
		this.idCounter = (this.adapter.instance * 20000) + 300;
		this.photoIdCounter = 0;
		this.lastB01Id = 0;
		this.globalManager = new RequestManager(10, REQUEST_TIMEOUT); // Fast commands queue
		this.mapManager = new RequestManager(2, REQUEST_TIMEOUT); // Non-B01 maps: match by ID
		this.b01MapManager = new RequestManager(1, REQUEST_TIMEOUT); // B01 maps only: concurrency 1
		this.messageParser = new messageParser(this.adapter);
		this.scheduleMqttReset();
	}

	private getQ10CommandHandler(): Q10CommandHandler {
		if (!this.q10CommandHandler) {
			this.q10CommandHandler = new Q10CommandHandler(this);
		}
		return this.q10CommandHandler;
	}

	private static readonly POLL_METHODS = [
		"get_prop",
		"prop.get",
		"get_consumable",
		"get_timer",
		"get_network_info",
		"get_room_mapping",
		"get_multi_maps_list",
		"get_clean_summary",
		"get_clean_record",
		"get_clean_record_map",
		"get_map_v1",
		"get_photo",
		"service.get_record_list",
		"service.upload_record_by_url",
		"service.upload_by_maptype"
	];

	private getMinMessageId(): number {
		return (this.adapter.instance * 20000) + 300;
	}

	private getMaxMessageId(): number {
		return (this.adapter.instance * 20000) + 20000;
	}

	public nextMessageId(): number {
		if (this.idCounter >= this.getMaxMessageId()) {
			this.resetMessageIdCounter("wrapped");
		}

		this.idCounter += 1;
		return this.idCounter;
	}

	private resetMessageIdCounter(reason: "scheduled" | "wrapped"): void {
		const previousId = this.idCounter;
		const resetId = this.getMinMessageId();
		const resetReason = reason === "scheduled" ? "scheduled reset" : "counter wrap";

		this.adapter.rLog("System", null, "Debug", "N/A", undefined, `Resetting request ID counter (${resetReason}) from ${previousId} to ${resetId}. TCP transport sequence remains independent.`, "debug");
		this.idCounter = resetId;
	}

	public static getLogLevelForMethod(method: string): "info" | "debug" {
		const m = method.toLowerCase();
		const isPoll = requestsHandler.POLL_METHODS.some(pollMethod => m.includes(pollMethod)) || m.startsWith("service.get");
		return isPoll ? "debug" : "info";
	}

	private scheduleMqttReset() {
		if (this.mqttResetInterval) this.adapter.clearInterval(this.mqttResetInterval);
		this.mqttResetInterval = this.adapter.setInterval(() => {
			this.resetMessageIdCounter("scheduled");
		}, 24 * 60 * 60 * 1000); // 24h
	}

	async waitForStartup() {
		this.adapter.rLog("System", null, "Info", "Startup", undefined, `[Startup] Skipping wait for initial requests...`, "info");
		this.startupFinished = true;
		this.adapter.rLog("System", null, "Info", "Startup", undefined, "[Startup] All initial requests finished. Adapter is ready.", "info");
	}

	public _processResult<T>(requestPromise: Promise<T>, callback: (result: T) => Promise<void>, identifier: string, duid: string): void {
		const executionWrapper = async () => {
			try {
				const result = await requestPromise;
				await callback(result);
			} catch (e: unknown) {
				const errorMsg = this.adapter.errorMessage(e);
				// Handle timeouts/aborts gracefully
				if (errorMsg.includes("Timeout") || errorMsg.includes("timed out") || errorMsg.includes("Aborted") || errorMsg.includes("CANCELLED") || errorMsg.includes("ADAPTER_STOPPED")) {
					const idMatch = errorMsg.match(/Task (req_\d+_\d+)/);
					const reqId = idMatch ? idMatch[1] : "unknown";

					if (errorMsg.includes("ADAPTER_STOPPED")) {
						this.adapter.rLog("System", duid, "Warn", "N/A", undefined, `[${identifier}] Request cancelled (Adapter stopped). ID: ${reqId}`, "warn");
					} else {
						// Standardized Timeout Log (using dynamic timeout from error if possible)
						const timeoutLimit = errorMsg.match(/limit: (\d+)ms/) || errorMsg.match(/after (\d+)ms/);
						const displayLimit = timeoutLimit ? timeoutLimit[1] : REQUEST_TIMEOUT;
						this.adapter.rLog("System", duid, "Warn", "Timeout", undefined, `Request ${identifier} timed out after ${displayLimit}ms. ID: ${reqId}`, "warn");
					}
				} else {
					this.adapter.catchError(e, `Processing-${identifier}`, duid);
				}
			}
		};

		const promise = executionWrapper();
		promise.catch(() => {});
	}

	async sendRequest(duid: string, method: string, params: unknown, options: { priority?: number; timeout?: number } = {}) {
		const version = await this.adapter.getDeviceProtocolVersion(duid);

		let manager = this.globalManager;
		let queueName = "CommandQueue";

		const isB01MapMethod =
			method === "get_map_v1" ||
			method === "get_clean_record_map" ||
			method === "service.upload_by_maptype" ||
			method === "service.upload_record_by_url";

		if (version === "B01" && isB01MapMethod) {
			manager = this.b01MapManager;
			queueName = "B01MapQueue";
		} else if (method === "get_map_v1" || method === "get_clean_record_map" || method === "get_photo") {
			manager = this.mapManager;
			queueName = "MapQueue";
		}

		const priority = options.priority ?? RequestPriority.NORMAL;
		let timeout = options.timeout ?? REQUEST_TIMEOUT;

		// Map and room-related requests need more time (especially on slow connections or when robot is busy)
		if (method.includes("map") || method.includes("room") || method === "get_clean_record_map" || method === "get_photo") {
			timeout = 20000;
		}

		const attempt = async (retryCount: number): Promise<unknown> => {
			const req = new RoborockRequest(this, duid, method, params, manager, queueName, version, timeout);
			if (method === "get_photo") {
				req.binaryType = "photo";
			} else if (method === "get_map_v1" || method === "get_clean_record_map") {
				req.binaryType = "map";
			}
			const taskId = `${method}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

			try {
				const result = await manager.add(taskId, (signal) => req.send(signal), priority);

				if (Array.isArray(result) && result[0] === "retry" && retryCount < MAX_REQUEST_RETRIES) {
					this.adapter.rLog("System", duid, "Debug", "Retry", undefined, `[sendRequest] Received 'retry' for ${method} on ${duid}. Retrying (${retryCount + 1}/${MAX_REQUEST_RETRIES + 1})...`, "debug");
					await new Promise((resolve) => setTimeout(resolve, 1000));
					return attempt(retryCount + 1);
				}
				return result;
			} catch (error) {
				if (retryCount < MAX_REQUEST_RETRIES && isRetryableError(error)) {
					this.adapter.rLog("System", duid, "Warn", "Retry", undefined, `[sendRequest] ${method} failed (${(error as Error).message}). Retrying (${retryCount + 1}/${MAX_REQUEST_RETRIES + 1})...`, "warn");
					await new Promise((resolve) => setTimeout(resolve, 1000));
					return attempt(retryCount + 1);
				}
				throw error;
			}
		};

		return attempt(0);
	}

	/**
	 * Q10/B01: publishes a raw DP payload via protocol 101 without waiting for a
	 * correlated response. The device answers via async DP shadow / protocol 102 / 301.
	 */
	public async publishB01Dp(duid: string, dps: Record<string, unknown>): Promise<void> {
		const timestamp = Math.floor(Date.now() / 1000);
		const payload = JSON.stringify({ dps, t: timestamp });
		const roborockMessage = await this.messageParser.buildRoborockMessage(duid, 101, timestamp, payload, "B01");

		if (!roborockMessage) {
			throw new Error("Failed to build B01 DP message");
		}

		await this.adapter.mqtt_api.sendMessage(duid, roborockMessage);
		this.adapter.rLog("MQTT", duid, "->", "B01", 101, `Q10 DP publish: ${JSON.stringify(dps)}`, "debug");
	}

	async command(_handler: BaseDeviceFeatures, duid: string, method: string, params?: unknown, id?: string) {
		const b01Variant = await this.adapter.getB01Variant?.(duid);
		if (b01Variant === "Q10") {
			await this.getQ10CommandHandler().handleCommand(_handler, duid, method, params);
			return;
		}

		let finalParams = params;
		let finalMethod = method;

		if (_handler) {
			const intercepted = await _handler.getCommandParams(method, params, id);
			if (typeof intercepted === "object" && intercepted !== null && "method" in intercepted && "params" in intercepted) {
				finalMethod = (intercepted as any).method;
				finalParams = (intercepted as any).params;
			} else {
				finalParams = intercepted;
			}
		}
		const requestPromise = this.sendRequest(duid, finalMethod, finalParams, {
			priority: 1,
			timeout: method === "load_multi_map" ? 20000 : undefined
		});

		this._processResult(
			requestPromise,
			async (res: any) => {
				// Command success validation for set_ commands
				if (method.startsWith("set_")) {
					const data = (res && typeof res === "object" && "data" in res) ? res.data : res;
					const isOk = Array.isArray(data) && data.length === 1 && data[0] === "ok";

					if (!isOk) {
						this.adapter.rLog("System", duid, "Error", "Command", undefined, `Command ${method} returned unexpected result: ${JSON.stringify(data)} (Expected: ["ok"])`, "error");
					}
				}

				await _handler?.onCommandResult?.(method, finalMethod, res, finalParams);

				// Status refresh after command is done in resolvePendingRequest.
			},
			`command-${method}-${duid}`,
			duid
		);
	}

	public resolvePendingRequest(messageID: number, result: unknown, protocol?: unknown, duid?: string, connectionType: string = "Unknown", version?: string): void {
		const req = this.adapter.pendingRequests.get(messageID);
		if (req) {
			const reqDuid = (req as any).duid || (duid || "unknown");
			const method = (req as any).method || "";

			// Log response details; for get_clean_summary / service.get_record_list / get_photo show payload size only
			const reduceLog = method === "get_clean_summary" || method === "service.get_record_list" || method === "get_photo";
			let extraInfo = "";
			if (Buffer.isBuffer(result)) {
				extraInfo = `Buffer (${result.length}b)`;
			} else if (typeof result === "object" && result !== null) {
				const resAny = result as any;
				if (resAny.buffer && Buffer.isBuffer(resAny.buffer)) {
					const bboxStr = (method === "get_photo" || reduceLog) ? "" : (resAny.bbox ? ` | BBox: [${resAny.bbox.x},${resAny.bbox.y},${resAny.bbox.w},${resAny.bbox.h}]` : "");
					extraInfo = `[Binary] Payload: ${(resAny.buffer.length / 1024).toFixed(1)} KB${bboxStr}`;
				} else if (resAny.map && Buffer.isBuffer(resAny.map)) {
					extraInfo = `[Binary] Map: ${(resAny.map.length / 1024).toFixed(1)} KB`;
				} else {
					const json = JSON.stringify(result);
					extraInfo = reduceLog
						? `Payload (${json.length < 1024 ? `${json.length}b` : `${(json.length / 1024).toFixed(1)} KB`})`
						: json;
				}
			} else {
				const str = String(result);
				extraInfo = reduceLog ? `Payload (${str.length}b)` : str;
			}

			if (protocol) {
				const now = Date.now();
				const totalDuration = req instanceof RoborockRequest ? now - req.creationTime : 0;
				const execDuration = req instanceof RoborockRequest ? now - req.startTime : 0;
				const queueDuration = req instanceof RoborockRequest ? req.startTime - req.creationTime : 0;
				const qSize = req instanceof RoborockRequest ? req.manager.queue.size : 0;

				const durationStr = totalDuration > 0 ? `Total: ${totalDuration}ms (Queue: ${queueDuration}ms, Exec: ${execDuration}ms, qSize: ${qSize})` : "";
				const reqVersion = (req as any).version || version || "1.0";
				const logLevel = requestsHandler.getLogLevelForMethod(method);
				// Do not show internal request ID for B01 301 map responses (get_clean_record_map / get_map_v1).
				const logMsgId = (reqVersion === "B01" && (method === "get_clean_record_map" || method === "get_map_v1")) ? undefined : messageID;

				this.adapter.rLog(connectionType as any, reqDuid, "<-", reqVersion, String(protocol), `${method}: ${extraInfo} | ${durationStr}`, logLevel, logMsgId);
			}

			// Add to finished set to prevent race conditions
			this.finishedRequests.add(messageID);
			this.adapter.setTimeout(() => {
				this.finishedRequests.delete(messageID);
			}, 60000);

			if (typeof (req as any).resolve === "function") {
				// Special Handling for Map Requests via TCP
				// If we get ["ok"] via TCP, it's just an ACK. The real data comes via MQTT.
				// We must NOT resolve the promise yet.
				if ((method === "get_map_v1" || method === "get_clean_record_map") &&
					Array.isArray(result) && result.length === 1 && result[0] === "ok") {
					// TCP ACK received. Keeping request pending for MQTT data...
					// Important: Do NOT delete from pendingRequests yet!
					this.finishedRequests.delete(messageID); // Also remove from finished set so we can process the real response later
					return;
				}

				(req as any).resolve(result, version);
			} else {
				if (req instanceof RoborockRequest) {
					// Same check for RoborockRequest
					if ((method === "get_map_v1" || method === "get_clean_record_map") &&
						Array.isArray(result) && result.length === 1 && result[0] === "ok") {
						this.finishedRequests.delete(messageID);
						return;
					}

					req.resolve(result, version);
				}
			}

			const isPollMethod = requestsHandler.POLL_METHODS.some((m) => method.includes(m)) || method.startsWith("service.get");
			if (!isPollMethod) {
				const handler = this.adapter.deviceManager?.deviceFeatureHandlers?.get(reqDuid);
				if (handler) {
					handler.updateStatus().catch((e: unknown) => {
						this.adapter.rLog("System", reqDuid, "Error", "Command", undefined, `Status update after ${method}: ${(e as Error).message}`, "error");
					});
				}
			}

			this.adapter.pendingRequests.delete(messageID);
		}
	}

	public rejectPendingTcpRequests(duid: string, reason: string): number {
		let rejected = 0;

		for (const req of Array.from(this.adapter.pendingRequests.values())) {
			if (!(req instanceof RoborockRequest)) continue;
			if (req.duid !== duid || req.sentConnectionType !== "TCP") continue;

			req.reject(new Error(`TCP network session reset for ${duid}: ${reason}`));
			rejected += 1;
		}

		if (rejected > 0) {
			this.adapter.rLog("TCP", duid, "Warn", undefined, undefined, `Rejected ${rejected} pending TCP request(s): ${reason}`, "warn");
		}

		return rejected;
	}

	isRequestRecentlyFinished(messageID: number): boolean {
		return this.finishedRequests.has(messageID);
	}

	clearQueue() {
		this.adapter.local_api.clearLocalDevicedTimeout();
		this.adapter.mqtt_api.clearIntervals();

		// Clear global queue
		this.globalManager.clear();
		this.mapManager.clear();
		this.b01MapManager.clear();

		// Reject pending requests
		this.adapter.pendingRequests.forEach((req) => {
			req.reject(new Error("Queue cleared (adapter stopped or disconnected)"));
		});
		this.adapter.pendingRequests.clear();
	}

	/** Returns true if there is any pending get_photo request for the given duid (used for continuation chunks without ROBOROCK header). */
	public hasPendingPhotoRequest(duid: string): boolean {
		for (const req of this.adapter.pendingRequests.values()) {
			const r = req as RoborockRequest;
			if (r?.method === "get_photo" && r.duid === duid) return true;
		}
		return false;
	}

	/** Returns true if there is any pending map request (get_map_v1 / get_clean_record_map) for the given duid. */
	public hasPendingMapRequest(duid: string): boolean {
		for (const req of this.adapter.pendingRequests.values()) {
			const r = req as RoborockRequest & PendingMapEntry;
			if ((r?.method === "get_map_v1" || r?.method === "get_clean_record_map") && r.duid === duid) return true;
		}
		return false;
	}

	/** Returns the pending map request for duid if exactly one exists (for B01 payload without ID in header). */
	public getPendingMapRequest(duid: string): RoborockRequest | PendingMapEntry | undefined {
		let found: RoborockRequest | PendingMapEntry | undefined;
		for (const req of this.adapter.pendingRequests.values()) {
			const r = req as RoborockRequest & PendingMapEntry;
			if ((r?.method === "get_map_v1" || r?.method === "get_clean_record_map") && r.duid === duid) {
				if (found) return undefined; // more than one, don't guess
				found = r;
			}
		}
		return found;
	}

	/**
	 * Extracts the global Request ID from binary headers and returns the corresponding pending request.
	 * Checks offset 8 (ROBOROCK header LSB) and offset 16 (Map header/Protocol 30x full ID).
	 * For headerless Type 0 streams uses DUID context when ID is not in payload.
	 */
	public getPendingBinaryRequest(payloadBuf: Buffer, duid: string): RoborockRequest | PendingMapEntry | undefined {
		if (payloadBuf.length < 4) return undefined;

		try {
			const id8 = payloadBuf.length >= 12 ? payloadBuf.readUInt32LE(8) : -1;
			const id16 = payloadBuf.length >= 18 ? payloadBuf.readUInt16LE(16) : -1;

			// 1. Photo first: Explicit ID Check - Offset 8 (ROBOROCK header ID field)
			if (payloadBuf.length >= 12 && payloadBuf.subarray(0, 8).toString("ascii").startsWith("ROBOROCK")) {
				const match8 = this.adapter.pendingRequests.get(id8);
				if (match8 && match8.duid === duid) {
					return match8;
				}
			}

			// 2. Map: Explicit ID Check - Offset 16 (Map header / Universal 30x Protocol ID)
			if (payloadBuf.length >= 18) {
				const match16 = this.adapter.pendingRequests.get(id16);
				if (match16 && match16.duid === duid) {
					return match16;
				}
			}

			// 3. Map: B01 payload starts with "B01" and exactly one pending map request for this duid => assign to it
			if (payloadBuf.length >= 3 && payloadBuf.subarray(0, 3).toString("ascii") === "B01") {
				const pendingMap = this.getPendingMapRequest(duid);
				if (pendingMap) return pendingMap;
			}
			return undefined;
		} catch (e: unknown) {
			this.adapter.rLog("System", duid, "Warn", undefined, undefined, `Failed to extract ID from binary payload: ${this.adapter.errorMessage(e)}`, "warn");
			return undefined;
		}
	}
}
