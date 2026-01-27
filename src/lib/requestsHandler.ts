import PQueue from "p-queue";
import type { Roborock } from "../main";
import type { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import { MapBuilder } from "./map/v1/MapBuilder";
import { MapParser } from "./map/v1/MapParser";
import { messageParser } from "./messageParser";


const REQUEST_TIMEOUT = 10000;

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

class RoborockRequest {
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
	creationTime: number; // For detailed lifecycle tracking
	startTime: number;
	timeoutTimer: ioBroker.Timeout | undefined;

	timeout: number;
	manager: RequestManager;
	queueName: string;

	constructor(handler: requestsHandler, duid: string, method: string, params: unknown, messageID: number, manager: RequestManager, queueName: string, version = "1.0", timeout = REQUEST_TIMEOUT) {
		this.handler = handler;
		this.adapter = handler.adapter;
		this.duid = duid;
		this.method = method;
		this.params = params;
		this.messageID = messageID;
		this.version = version;
		this.creationTime = Date.now();
		this.startTime = Date.now();
		this.timeout = timeout;
		this.manager = manager;
		this.queueName = queueName;

		this.promise = new Promise((resolve, reject) => {
			this.resolvePromise = resolve;
			this.rejectPromise = reject;
		});
		// Prevent unhandled rejections if we reject before anyone awaits it
		this.promise.catch(() => { });
	}

	async send(signal?: AbortSignal) {
		const queueDuration = Date.now() - this.creationTime;

		// Lifecycle Log: Started (Silly level as it is now combined with network log)
		this.adapter.rLog("System", this.duid, "Debug", "Lifecycle", undefined, `[Task ${this.messageID}] start (${this.method}) | waited: ${queueDuration}ms`, "silly");

		if (signal?.aborted) throw new Error("Aborted");

		// Register in pendingRequests immediately to ensure we can cleanup if anything fails
		this.adapter.pendingRequests.set(this.messageID, this);

		// Handle Manual Cancellation
		if (signal) {
			signal.addEventListener("abort", () => {
				this.reject(new Error(`Task ${this.messageID} was cancelled manually.`));
			}, { once: true });
		}

		const remoteConnection = await this.handler.isCloudDevice(this.duid);
		let protocol = 101;
		const version = await this.adapter.getDeviceProtocolVersion(this.duid);
		const timestamp = Math.floor(Date.now() / 1000);

		if (!this.handler.isCloudRequest(this.duid, this.method, version)) {
			protocol = 4;
		}

		const payload = await this.handler.messageParser.buildPayload(protocol, this.messageID, this.method, this.params, version);

		const mqttConnectionState = this.adapter.mqtt_api.isConnected();
		// Connection inference
		const connectionType = (mqttConnectionState && (await this.handler.isCloudRequest(this.duid, this.method, version))) ? "MQTT" : "TCP";

		const logParams = this.params ? ` | Params: ${JSON.stringify(this.params)}` : "";

		const logLevel = requestsHandler.getLogLevelForMethod(this.method);
		const qSize = this.manager.queue.size;

		if (connectionType === "MQTT") {
			// Log Message (Method + Params) + Performance data
			this.adapter.rLog("MQTT", this.duid, "->", `${version}`, protocol, `${this.method}${logParams} | qSize: ${qSize} | waited: ${queueDuration}ms`, logLevel, this.messageID);
		} else {
			this.adapter.rLog("TCP", this.duid, "->", `${version}`, protocol, `${this.method}${logParams} | qSize: ${qSize} | waited: ${queueDuration}ms`, "debug", this.messageID);
		}
		const roborockMessage = await this.handler.messageParser.buildRoborockMessage(this.duid, protocol, timestamp, payload, version, this.messageID);

		// mqttConnectionState is already defined above
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

		if (!mqttConnectionState && remoteConnection) {
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

		// --- Start Precision Timer NOW ---
		// We start the timer only when the message is about to touch the wire.
		this.startTime = Date.now();
		this.timeoutTimer = this.adapter.setTimeout(() => {
			const runDuration = Date.now() - this.startTime;
			this.adapter.rLog("System", this.duid, "Debug", "Lifecycle", undefined, `[Task ${this.messageID}] TIMEOUT (${this.method}) after ${runDuration}ms | limit: ${this.timeout}ms`, "debug");
			this.reject(new Error(`Task ${this.messageID} timed out after ${this.timeout}ms.`));
		}, this.timeout);

		// Send
		if (this.handler.isCloudRequest(this.duid, this.method, version) || !localConnectionState) {
			this.adapter.mqtt_api.sendMessage(this.duid, roborockMessage);
		} else {
			const lengthBuffer = Buffer.alloc(4);
			lengthBuffer.writeUInt32BE(roborockMessage.length, 0);
			const fullMessage = Buffer.concat([lengthBuffer, roborockMessage] as Uint8Array[]);
			this.adapter.local_api.sendMessage(this.duid, fullMessage);
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
	private globalManager: RequestManager; // For commands (High Concurrency)
	private mapManager: RequestManager; // For maps (Low Concurrency)
	messageParser: messageParser;
	mapParser: MapParser;
	mapCreator: MapBuilder;
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
		this.mapManager = new RequestManager(2, REQUEST_TIMEOUT); // Serialized map queue (prevent saturation)
		this.messageParser = new messageParser(this.adapter);
		this.mapParser = new MapParser(this.adapter);
		this.mapCreator = new MapBuilder(this.adapter);
		this.scheduleMqttReset();
	}


	private static readonly POLL_METHODS = [
		"get_prop",
		"get_status",
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

	public static getLogLevelForMethod(method: string): "info" | "debug" {
		const m = method.toLowerCase();
		const isPoll = requestsHandler.POLL_METHODS.some(pollMethod => m.includes(pollMethod)) || m.startsWith("service.get");
		return isPoll ? "debug" : "info";
	}

	private scheduleMqttReset() {
		if (this.mqttResetInterval) this.adapter.clearInterval(this.mqttResetInterval);
		this.mqttResetInterval = this.adapter.setInterval(() => {
			this.adapter.rLog("System", null, "Debug", "N/A", undefined, "Resetting MQTT message ID counter", "debug");
			this.idCounter = 300;
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
			} catch (e: any) {
				const errorMsg = e?.message || e?.toString() || "";
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
		let manager = this.globalManager;
		let queueName = "CommandQueue";

		if (method === "get_map_v1" || method === "get_clean_record_map") {
			manager = this.mapManager;
			queueName = "MapQueue";
		}


		const priority = options.priority ?? RequestPriority.NORMAL;
		let timeout = options.timeout ?? REQUEST_TIMEOUT;


		// Map and room-related requests need more time (especially on slow connections or when robot is busy), so we give them 20s.
		if (method.includes("map") || method.includes("room") || method === "get_clean_record_map") {
			timeout = 20000;
		}

		const version = await this.adapter.getDeviceProtocolVersion(duid);

		const attempt = async (retryCount: number): Promise<unknown> => {
			let messageID: number;

			if (method === "get_photo") {
				this.photoIdCounter = this.photoIdCounter >= 250 ? 1 : this.photoIdCounter + 1;
				messageID = this.photoIdCounter;
			} else {
				// Detect version to determine ID strategy
				if (version === "B01") {
					// B01 uses timestamp-based IDs (e.g. 1766102306357)
					messageID = Date.now();
					// Ensure uniqueness if multiple requests happen in same ms
					if (messageID <= this.lastB01Id) {
						messageID = this.lastB01Id + 1;
					}
					this.lastB01Id = messageID;
				} else {
					// Legacy/Standard uses sequential small integer
					const minId = (this.adapter.instance * 20000) + 300;
					const maxId = (this.adapter.instance * 20000) + 20000;
					this.idCounter = this.idCounter > maxId ? minId : this.idCounter + 1;
					messageID = this.idCounter;
				}
			}


			const req = new RoborockRequest(this, duid, method, params, messageID, manager, queueName, version, timeout);
			const taskId = `req_${messageID}_${Date.now()}`;

			try {
				this.adapter.rLog("System", duid, "Debug", "Queue", undefined, `[Task ${messageID}] queue (${method}) | ${queueName}: ${manager.queue.size} | pend: ${manager.queue.pending}`, "silly");
				const result = await manager.add(taskId, (signal) => req.send(signal), priority);

				if (Array.isArray(result) && result[0] === "retry" && retryCount < 3) {
					this.adapter.rLog("System", duid, "Debug", "Retry", undefined, `[sendRequest] Received 'retry' for ${method} on ${duid}. Retrying (${retryCount + 1}/3)...`, "debug");
					await new Promise((resolve) => setTimeout(resolve, 1000));
					return attempt(retryCount + 1);
				}
				return result;
			} catch (error) {
				throw error;
			}
		};

		return attempt(0);
	}

	async command(_handler: BaseDeviceFeatures, duid: string, method: string, params?: unknown, id?: string) {
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
		const requestPromise = this.sendRequest(duid, finalMethod, finalParams, { priority: 1, timeout: method === "load_multi_map" ? 20000 : undefined });

		this._processResult(
			requestPromise,
			async () => {
				// Command success
			},
			`command-${method}-${duid}`,
			duid
		);
	}



	async isCloudDevice(duid: string): Promise<boolean> {
		if (this.adapter.local_api && this.adapter.local_api.isConnected(duid)) {
			return false;
		}
		return true;
	}

	isCloudRequest(_duid: string, method: string, version?: string): boolean {
		// Some methods should always go via cloud
		if (["get_network_info"].includes(method)) {
			return true;
		}

		// B01 protocol is cloud-only (MQTT)
		if (version === "B01") {
			return true;
		}

		// A01 is also local-capable
		if (version === "A01") {
			return false;
		}

		// For L01/1.0, favor Cloud to avoid potential local ID mismatch issues issues observed in past versions.
		// TODO: Re-evaluate local preference for L01 once stable.
		if (version === "L01" || version === "1.0") {
			return true;
		}

		return false;
	}

	public resolvePendingRequest(messageID: number, result: unknown, protocol?: unknown, duid?: string, connectionType: string = "Unknown", version?: string): void {
		const req = this.adapter.pendingRequests.get(messageID);
		if (req) {
			if (protocol) {
				const reqDuid = (req as any).duid || (duid || "unknown");

				// resolvePendingRequest caller usually knows protocol (from MQTT/Local).
				// We can just log what we have.
				let extraInfo = "";
				if (Buffer.isBuffer(result)) {
					extraInfo = `Buffer (${result.length}b)`;
				} else if (typeof result === "object" && result !== null) {
					const str = JSON.stringify(result);
					extraInfo = str.length > 200 ? str.substring(0, 200) + "..." : str;
				} else {
					extraInfo = String(result);
				}

				const now = Date.now();
				const totalDuration = req instanceof RoborockRequest ? now - req.creationTime : 0;
				const execDuration = req instanceof RoborockRequest ? now - req.startTime : 0;
				const queueDuration = req instanceof RoborockRequest ? req.startTime - req.creationTime : 0;
				const qSize = req instanceof RoborockRequest ? req.manager.queue.size : 0;

				const durationStr = totalDuration > 0 ? `Total: ${totalDuration}ms (Queue: ${queueDuration}ms, Exec: ${execDuration}ms, qSize: ${qSize})` : "";
				const method = (req as any).method || "";
				const reqVersion = (req as any).version || version || "1.0";
				const logLevel = requestsHandler.getLogLevelForMethod(method);

				this.adapter.rLog(connectionType as any, reqDuid, "<-", reqVersion, String(protocol), `${method}: ${extraInfo} | ${durationStr}`, logLevel, messageID);
			}

			// Add to finished set to prevent race conditions
			this.finishedRequests.add(messageID);
			this.adapter.setTimeout(() => {
				this.finishedRequests.delete(messageID);
			}, 60000);

			if (typeof (req as any).resolve === "function") {
				(req as any).resolve(result, version);
			} else {
				// Fallback for cases where resolve is not a method (rare in current codebase)
				if (req instanceof RoborockRequest) {
					req.resolve(result, version);
				}
			}
			this.adapter.pendingRequests.delete(messageID);
		} else {
			if (!this.finishedRequests.has(messageID)) {
				this.adapter.rLog("System", duid || null, "<-", String(protocol), messageID, `ID not found in Map (timed out/finished)`, "debug");
			}
		}
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

		// Reject pending requests
		this.adapter.pendingRequests.forEach((req) => {
			if (req instanceof RoborockRequest) {
				req.reject(new Error("Queue cleared (adapter stopped or disconnected)"));
			} else {
				// Legacy fallback
				if (req.timeout) this.adapter.clearTimeout(req.timeout);
				// Reject or delete
				if (typeof req.reject === "function") {
					req.reject(new Error("Queue cleared (adapter stopped or disconnected)"));
				}
			}
		});
		this.adapter.pendingRequests.clear();
	}
}
