import type { Roborock } from "../main";
import type { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import { MapParser } from "./map/v1/MapParser";
import { MapBuilder } from "./map/v1/MapBuilder";
import PQueue from "p-queue";
import { messageParser } from "./messageParser";

type AbortSignalWithStatic = typeof AbortSignal & {
	any?(signals: AbortSignal[]): AbortSignal;
	timeout?(ms: number): AbortSignal;
};

const REQUEST_TIMEOUT = 30000;

export enum RequestPriority {
	LOW = -10,
	NORMAL = 0,
	HIGH = 10
}

// ============================================================
// AbortSignal polyfill for Node < 20
// ============================================================
function anySignal(signals: AbortSignal[]): AbortSignal {
	if ((AbortSignal as AbortSignalWithStatic).any) {
		return (AbortSignal as AbortSignalWithStatic).any!(signals);
	}
	const controller = new AbortController();
	for (const signal of signals) {
		if (signal.aborted) {
			controller.abort(signal.reason);
			return controller.signal;
		}
		signal.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
	}
	return controller.signal;
}

function timeoutSignal(ms: number): AbortSignal {
	if ((AbortSignal as AbortSignalWithStatic).timeout) {
		return (AbortSignal as AbortSignalWithStatic).timeout!(ms);
	}
	const controller = new AbortController();
	setTimeout(() => controller.abort(new Error("Timeout")), ms);
	return controller.signal;
}

// ============================================================
// RequestManager Class
// ============================================================
class RequestManager {
	queue: PQueue;
	timeoutMs: number;
	tasks: Map<string, AbortController>;
	private activeBackgroundTasks = 0;
	private readonly MAX_BACKGROUND = 10; // Reserve slots for normal/high priority

	constructor(concurrency = 20, timeoutMs = 30000) {
		this.queue = new PQueue({ concurrency });
		this.timeoutMs = timeoutMs;
		this.tasks = new Map();
	}

	async add<T>(id: string, taskFunction: (signal: AbortSignal) => Promise<T>, priority = RequestPriority.NORMAL): Promise<T> {
		const manualController = new AbortController();
		this.tasks.set(id, manualController);

		const isBackground = priority <= RequestPriority.LOW;
		if (isBackground) {
			while (this.activeBackgroundTasks >= this.MAX_BACKGROUND) {
				// Wait for a slot to free up. Check every 100ms.
				// This happens OUTSIDE the queue.add to avoid blocking all slots.
				await new Promise(resolve => setTimeout(resolve, 100));
				if (manualController.signal.aborted) throw new Error("CANCELLED_BY_USER");
			}
			this.activeBackgroundTasks++;
		}

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
			if (isBackground) {
				this.activeBackgroundTasks--;
			}
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
	startTime: number;

	constructor(handler: requestsHandler, duid: string, method: string, params: unknown, messageID: number) {
		this.handler = handler;
		this.adapter = handler.adapter;
		this.duid = duid;
		this.method = method;
		this.params = params;
		this.messageID = messageID;
		this.startTime = Date.now();

		this.promise = new Promise((resolve, reject) => {
			this.resolvePromise = resolve;
			this.rejectPromise = reject;
		});
	}

	async send(signal?: AbortSignal) {
		if (signal?.aborted) throw new Error("Aborted");

		const remoteConnection = await this.handler.isCloudDevice(this.duid);
		let protocol = 101;
		const version = await this.adapter.getDeviceProtocolVersion(this.duid);
		const timestamp = Math.floor(Date.now() / 1000);

		if (!this.handler.isCloudRequest(this.duid, this.method, version)) {
			protocol = 4;
		}

		// --- Start precision 30s timeout NOW (at dispatch) ---
		const tSignal = timeoutSignal(REQUEST_TIMEOUT);
		const combinedSignal = signal ? anySignal([signal, tSignal]) : tSignal;

		combinedSignal.addEventListener("abort", () => {
			// Check if it was a timeout or manual cancel
			if (tSignal.aborted) {
				this.rejectPromise(new Error(`Task ${this.messageID} timed out after ${REQUEST_TIMEOUT}ms.`));
			} else if (signal?.aborted) {
				this.rejectPromise(new Error(`Task ${this.messageID} was cancelled manually.`));
			} else {
				this.rejectPromise(new Error("Aborted"));
			}
		}, { once: true });


		const payload = await this.handler.messageParser.buildPayload(protocol, this.messageID, this.method, this.params, version);
		const isMapRequest = this.method.includes("map");

		const mqttConnectionState = this.adapter.mqtt_api.isConnected();
		// Connection inference
		const connectionType = (mqttConnectionState && (await this.handler.isCloudRequest(this.duid, this.method, version))) ? "MQTT" : "TCP";

		const logPayload = (isMapRequest && payload.length > 500) || payload.length > 5000 ? payload.substring(0, 500) + `... [truncated ${payload.length - 500} chars]` : payload;

		if (connectionType === "MQTT") {
			// Log Request (Method + inner JSON potentially)
			this.adapter.rLog("MQTT", this.duid, "->", `${version}`, protocol, `Request (ID: ${this.messageID}) ${this.method}: ${logPayload}`, "info");
		} else {
			this.adapter.rLog("TCP", this.duid, "->", `${version}`, protocol, `Send ${this.method} (ID: ${this.messageID}) | ${logPayload}`, "debug");
		}
		const roborockMessage = await this.handler.messageParser.buildRoborockMessage(this.duid, protocol, timestamp, payload, version, this.messageID);

		// mqttConnectionState is already defined above
		const localConnectionState = this.adapter.local_api.isConnected(this.duid);

		if (!roborockMessage) {
			const errorMsg = "Failed to build buildRoborockMessage!";
			this.adapter.catchError(errorMsg, "function sendRequest", this.duid);
			this.rejectPromise(new Error(errorMsg));
			return this.promise;
		}

		if (version == "A01") {
			this.adapter.mqtt_api.sendMessage(this.duid, roborockMessage);
			this.resolvePromise(null);
			return this.promise;
		}

		if (!mqttConnectionState && remoteConnection) {
			const errorMsg = `Cloud connection not available. Not sending for method ${this.method} request!`;
			this.adapter.rLog("System", this.duid, "Debug", "N/A", undefined, errorMsg, "debug");
			this.rejectPromise(new Error(errorMsg));
			return this.promise;
		} else if (!localConnectionState && !mqttConnectionState && this.method != "get_network_info") {
			const errorMsg = `Adapter locally or remotely not connected to robot ${this.duid}. Sending request for ${this.method} not possible!`;
			this.adapter.rLog("System", this.duid, "Debug", "N/A", undefined, errorMsg, "debug");
			this.rejectPromise(new Error(errorMsg));
			return this.promise;
		}

		// Register in pendingRequests
		this.adapter.pendingRequests.set(this.messageID, this);

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
		this.adapter.pendingRequests.delete(this.messageID);
		// Return an object if version is present, otherwise just the result
		if (version) {
			this.resolvePromise({ data: result, version: version });
		} else {
			this.resolvePromise(result);
		}
	}

	reject(reason: unknown) {
		this.adapter.pendingRequests.delete(this.messageID);
		this.rejectPromise(reason);
	}
}

export class requestsHandler {
	adapter: Roborock;
	idCounter: number;
	photoIdCounter: number;
	lastB01Id: number; // For B01 timestamp-based IDs
	private globalManager: RequestManager;
	messageParser: messageParser;
	mapParser: MapParser;
	mapCreator: MapBuilder;
	mqttResetInterval: ioBroker.Interval | undefined = undefined;

	public startupFinished: boolean = false;
	private startupPromises: Promise<void>[] = [];
	private finishedRequests: Set<number> = new Set();

	constructor(adapter: Roborock) {
		this.adapter = adapter;
		// Offset ID by instance to avoid collisions
		this.idCounter = (this.adapter.instance * 20000) + 300;
		this.photoIdCounter = 0;
		this.lastB01Id = 0;
		this.globalManager = new RequestManager(10, REQUEST_TIMEOUT);
		this.messageParser = new messageParser(this.adapter);
		this.mapParser = new MapParser(this.adapter);
		this.mapCreator = new MapBuilder(this.adapter);
		this.scheduleMqttReset();
	}


	private scheduleMqttReset() {
		if (this.mqttResetInterval) this.adapter.clearInterval(this.mqttResetInterval);
		this.mqttResetInterval = this.adapter.setInterval(() => {
			this.adapter.rLog("System", null, "Debug", "N/A", undefined, "Resetting MQTT message ID counter", "debug");
			this.idCounter = 300;
		}, 24 * 60 * 60 * 1000); // 24h
	}

	async waitForStartup() {
		this.adapter.rLog("System", null, "Info", "Startup", undefined, `[Startup] Waiting for ${this.startupPromises.length} initial requests to finish...`, "info");

		await Promise.all(this.startupPromises);

		this.startupFinished = true;
		this.startupPromises = [];
		this.adapter.rLog("System", null, "Info", "Startup", undefined, "[Startup] All initial requests finished. Adapter is ready.", "info");
	}

	public _processResult<T>(requestPromise: Promise<T>, callback: (result: T) => Promise<void>, identifier: string, duid: string, alwaysBackground: boolean = false): void {
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
						// Standardized Timeout Log
						this.adapter.rLog("System", duid, "Warn", "Timeout", undefined, `Request ${identifier} timed out after 30000ms. ID: ${reqId}`, "warn");
					}
				} else {
					this.adapter.catchError(e, `Processing-${identifier}`, duid);
				}
			}
		};

		const promise = executionWrapper();

		if (alwaysBackground) {
			promise.catch(() => {});
		} else if (!this.startupFinished) {
			this.startupPromises.push(promise);
		} else {
			promise.catch(() => {});
		}
	}

	async sendRequest(duid: string, method: string, params: unknown, options: { priority?: number } = {}) {
		const manager = this.globalManager;
		const priority = options.priority ?? RequestPriority.NORMAL;

		const attempt = async (retryCount: number): Promise<unknown> => {
			let messageID: number;

			if (method === "get_photo") {
				this.photoIdCounter = this.photoIdCounter >= 250 ? 1 : this.photoIdCounter + 1;
				messageID = this.photoIdCounter;
			} else {
				// Detect version to determine ID strategy
				const version = await this.adapter.getDeviceProtocolVersion(duid);
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

			const req = new RoborockRequest(this, duid, method, params, messageID);
			const taskId = `req_${messageID}_${Date.now()}`;

			try {
				this.adapter.rLog("System", duid, "Debug", "Queue", undefined, `Queuing task ${taskId} (Method: ${method})`, "debug");
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

	async command(_handler: BaseDeviceFeatures, duid: string, method: string, params?: unknown) {
		let finalParams = params;
		let finalMethod = method;

		if (_handler) {
			const intercepted = await _handler.getCommandParams(method, params);
			if (typeof intercepted === "object" && intercepted !== null && "method" in intercepted && "params" in intercepted) {
				finalMethod = (intercepted as any).method;
				finalParams = (intercepted as any).params;
			} else {
				finalParams = intercepted;
			}
		}
		const requestPromise = this.sendRequest(duid, finalMethod, finalParams, { priority: 1 });

		this._processResult(
			requestPromise,
			async () => {
				// Command success
			},
			`command-${method}-${duid}`,
			duid
		);
	}



	isCloudDevice(_duid: string): Promise<boolean> {
		void _duid;
		return Promise.resolve(true);
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
					extraInfo = `Buffer Len: ${result.length}`;
				} else if (typeof result === "object") {
					extraInfo = "Object";
				} else {
					extraInfo = String(result);
				}

				const duration = req instanceof RoborockRequest ? Date.now() - req.startTime : 0;
				const durationStr = duration > 0 ? `Duration: ${duration}ms` : "";

				this.adapter.rLog(connectionType as any, reqDuid, "<-", String(protocol), messageID, `Received response. ${extraInfo}. ${durationStr} (Detected: ${version || "Any"})`, "debug");
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
				this.adapter.rLog("System", duid || null, "<-", String(protocol), messageID, `Request not found in pending requests`, "debug");
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
