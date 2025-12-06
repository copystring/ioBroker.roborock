import type { Roborock } from "../main";
import type { BaseDeviceFeatures } from "./features/baseDeviceFeatures";
import { MapCreator } from "./mapCreator";
import { MapDataParser } from "./mapDataParser";
import PQueue from "p-queue";
import { messageParser } from "./messageParser";

type AbortSignalWithStatic = typeof AbortSignal & {
	any?(signals: AbortSignal[]): AbortSignal;
	timeout?(ms: number): AbortSignal;
};

const REQUEST_TIMEOUT = 30000;

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

	constructor(concurrency = 10, timeoutMs = 30000) {
		this.queue = new PQueue({ concurrency });
		this.timeoutMs = timeoutMs;
		this.tasks = new Map();
	}

	add<T>(id: string, taskFunction: (signal: AbortSignal) => Promise<T>, priority = 0): Promise<T> {
		const manualController = new AbortController();
		this.tasks.set(id, manualController);

		return this.queue.add(async () => {
			try {
				if (manualController.signal.aborted) {
					throw new Error("ADAPTER_STOPPED");
				}

				const tSignal = timeoutSignal(this.timeoutMs);
				const combinedSignal = anySignal([manualController.signal, tSignal]);

				const result = await taskFunction(combinedSignal);
				return result;
			} catch (error: unknown) {
				if (manualController.signal.aborted || (error instanceof Error && error.message === "CANCELLED_BY_USER")) {
					throw new Error(`Task ${id} was cancelled manually.`);
				} else if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
					throw new Error(`Task ${id} timed out after ${this.timeoutMs}ms.`);
				} else {
					throw error;
				}
			} finally {
				this.tasks.delete(id);
			}
		}, { priority });
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

	constructor(handler: requestsHandler, duid: string, method: string, params: unknown, messageID: number) {
		this.handler = handler;
		this.adapter = handler.adapter;
		this.duid = duid;
		this.method = method;
		this.params = params;
		this.messageID = messageID;

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

		if (!this.handler.isCloudRequest(this.duid, this.method)) {
			protocol = 4;
		}

		const payload = await this.handler.messageParser.buildPayload(protocol, this.messageID, this.method, this.params, version);
		const roborockMessage = await this.handler.messageParser.buildRoborockMessage(this.duid, protocol, timestamp, payload, version);

		const mqttConnectionState = this.adapter.mqtt_api.isConnected();
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

		this.adapter.log.debug(`duid: ${this.duid}, mqtt: ${mqttConnectionState}, local: ${localConnectionState}, remote: ${remoteConnection}`);

		if (!mqttConnectionState && remoteConnection) {
			const errorMsg = `Cloud connection not available. Not sending for method ${this.method} request!`;
			this.adapter.log.debug(errorMsg);
			this.rejectPromise(new Error(errorMsg));
			return this.promise;
		} else if (!localConnectionState && !mqttConnectionState && this.method != "get_network_info") {
			const errorMsg = `Adapter locally or remotely not connected to robot ${this.duid}. Sending request for ${this.method} not possible!`;
			this.adapter.log.debug(errorMsg);
			this.rejectPromise(new Error(errorMsg));
			return this.promise;
		}

		// Register in pendingRequests
		this.adapter.pendingRequests.set(this.messageID, this);

		// Handle AbortSignal
		if (signal) {
			signal.addEventListener("abort", () => {
				if (signal.reason) {
					this.rejectPromise(signal.reason);
				} else {
					this.rejectPromise(new Error("Aborted by RequestManager"));
				}
			}, { once: true });
		}

		// Send
		if (this.handler.isCloudRequest(this.duid, this.method) || !localConnectionState) {
			this.adapter.mqtt_api.sendMessage(this.duid, roborockMessage);
			this.adapter.log.debug(`Sent payload for ${this.duid} with ${payload} using cloud connection using version ${version}`);
		} else {
			const lengthBuffer = Buffer.alloc(4);
			lengthBuffer.writeUInt32BE(roborockMessage.length, 0);
			const fullMessage = Buffer.concat([lengthBuffer, roborockMessage]);
			this.adapter.local_api.sendMessage(this.duid, fullMessage);
			this.adapter.log.debug(`Sent payload for ${this.duid} with ${payload} using local connection using version ${version}`);
		}

		return this.promise;
	}

	resolve(result: unknown) {
		this.adapter.pendingRequests.delete(this.messageID);
		this.resolvePromise(result);
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
	private deviceManagers: Map<string, RequestManager>;
	messageParser: messageParser;
	mapParser: MapDataParser;
	mapCreator: MapCreator;
	mqttResetInterval: ioBroker.Interval | undefined = undefined;

	public startupFinished: boolean = false;
	private startupPromises: Promise<void>[] = [];

	constructor(adapter: Roborock) {
		this.adapter = adapter;
		// Offset ID by instance to avoid collisions
		this.idCounter = (this.adapter.instance * 20000) + 300;
		this.photoIdCounter = 0;
		this.deviceManagers = new Map();
		this.messageParser = new messageParser(this.adapter);
		this.mapParser = new MapDataParser(this.adapter);
		this.mapCreator = new MapCreator(this.adapter);
		this.scheduleMqttReset();
	}

	private scheduleMqttReset() {
		if (this.mqttResetInterval) this.adapter.clearInterval(this.mqttResetInterval);
		this.mqttResetInterval = this.adapter.setInterval(() => {
			this.adapter.log.debug("Resetting MQTT message ID counter");
			this.idCounter = 300;
		}, 24 * 60 * 60 * 1000); // 24h
	}

	async waitForStartup() {
		this.adapter.log.info(`[Startup] Waiting for ${this.startupPromises.length} initial requests to finish...`);

		await Promise.all(this.startupPromises);

		this.startupFinished = true;
		this.startupPromises = [];
		this.adapter.log.info("[Startup] All initial requests finished. Adapter is ready.");
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
						this.adapter.log.warn(`[${identifier}] Request cancelled (Adapter stopped). ID: ${reqId}`);
					} else {
						this.adapter.log.warn(`[${identifier}] Request timed out. ID: ${reqId}`);
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

	getManager(duid: string): RequestManager {
		if (!this.deviceManagers.has(duid)) {
			// Default concurrency and timeout
			this.deviceManagers.set(duid, new RequestManager(10, REQUEST_TIMEOUT));
		}
		return this.deviceManagers.get(duid)!;
	}

	async sendRequest(duid: string, method: string, params: unknown, options: { priority?: number } = {}) {
		const manager = this.getManager(duid);
		const priority = options.priority || 0;

		const attempt = async (retryCount: number): Promise<unknown> => {
			let messageID: number;

			if (method === "get_photo") {
				this.photoIdCounter = this.photoIdCounter >= 250 ? 1 : this.photoIdCounter + 1;
				messageID = this.photoIdCounter;
			} else {
				const minId = (this.adapter.instance * 20000) + 300;
				const maxId = (this.adapter.instance * 20000) + 20000;
				this.idCounter = this.idCounter > maxId ? minId : this.idCounter + 1;
				messageID = this.idCounter;
			}

			const req = new RoborockRequest(this, duid, method, params, messageID);
			const taskId = `req_${messageID}_${Date.now()}`;

			try {
				const result = await manager.add(taskId, (signal) => req.send(signal), priority);

				if (Array.isArray(result) && result[0] === "retry" && retryCount < 3) {
					this.adapter.log.debug(`[sendRequest] Received 'retry' for ${method} on ${duid}. Retrying (${retryCount + 1}/3)...`);
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
		const requestPromise = this.sendRequest(duid, method, params, { priority: 1 });

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

	isCloudRequest(_duid: string, _method: string): boolean {
		void _duid;
		void _method;
		// Force cloud request (Protocol 101) to fix ID mismatch
		return true;
	}

	resolvePendingRequest(messageID: number, result: unknown, protocol?: unknown) {
		const req = this.adapter.pendingRequests.get(messageID);
		if (req) {
			if (protocol) {
				this.adapter.log.debug(`[resolvePendingRequest] Received response for request ${messageID} with protocol ${protocol}`);
			}

			if (req instanceof RoborockRequest) {
				req.resolve(result);
			} else {
				// Legacy handling
				if (typeof req.resolve === "function") {
					req.resolve(result);
				}
			}
		}
	}

	clearQueue() {
		this.adapter.local_api.clearLocalDevicedTimeout();
		this.adapter.mqtt_api.clearIntervals();

		// Clear map queues
		this.deviceManagers.forEach((m) => m.clear());
		this.deviceManagers.clear();

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
