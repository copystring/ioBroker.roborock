import type { ApkRpcBlobPayload } from "./apkBlobTransferAssembler";
import { encodeApkAppToRobotMessage } from "./apkAppToRobotMessage";
import { decodeApkRpcBlobToBase64 } from "./apkRpcBlobCodec";

export type ApkRpcRoute = "automatic" | "local" | "cloud";
export type ApkReactCallback = (...arguments_: unknown[]) => void;

export interface ApkRpcTransportError {
	code: string;
	message: string;
}

export interface ApkJsonRpcRequest {
	id: number;
	method: string;
	params: Readonly<Record<string, unknown>> | readonly unknown[];
	security?: {
		endpoint: string;
		nonce: string;
	};
}

export interface ApkProtobufRpcRequest {
	kind: "normal" | "blob";
	id: number;
	payload: Uint8Array;
	appToRobotMessage: Uint8Array;
}

export interface ApkRpcTransport {
	sendJson(request: ApkJsonRpcRequest, route: ApkRpcRoute): Promise<void>;
	sendProtobuf(request: ApkProtobufRpcRequest, route: ApkRpcRoute): Promise<void>;
}

export interface ApkRpcBrokerOptions {
	timeoutMilliseconds?: number;
	initialMessageId?: number;
	setTimer?: (callback: () => void, timeoutMilliseconds: number) => ReturnType<typeof setTimeout>;
	clearTimer?: (timer: ReturnType<typeof setTimeout>) => void;
}

interface PendingRequest {
	callback: ApkReactCallback;
	timer: ReturnType<typeof setTimeout>;
}

function callbackError(callback: ApkReactCallback, error: string | null): void {
	callback(false, { error });
}

function routeToApkBoolean(route: ApkRpcRoute): boolean | null {
	if (route === "automatic") return null;
	return route === "local";
}

/**
 * Host-side equivalent of the APK RRRpcManager pending-call tables.
 *
 * Transport routing is kept tri-state because the APK distinguishes a null
 * route (SDK automatic), true (LAN) and false (MQTT/cloud).
 */
export class ApkRpcRequestBroker {
	readonly #normalRequests = new Map<number, PendingRequest>();
	readonly #blobRequests = new Map<number, PendingRequest>();
	readonly #timeoutMilliseconds: number;
	readonly #setTimer: NonNullable<ApkRpcBrokerOptions["setTimer"]>;
	readonly #clearTimer: NonNullable<ApkRpcBrokerOptions["clearTimer"]>;
	#nextMessageId: number;

	public constructor(
		private readonly transport: ApkRpcTransport,
		private readonly endpoint: string,
		private readonly nonce: string,
		options: ApkRpcBrokerOptions = {},
	) {
		this.#timeoutMilliseconds = options.timeoutMilliseconds ?? 10_000;
		this.#nextMessageId = options.initialMessageId ?? Math.trunc(Math.random() * 2_147_483_647) % 0x7cf;
		this.#setTimer = options.setTimer ?? setTimeout;
		this.#clearTimer = options.clearTimer ?? clearTimeout;
	}

	public get pendingNormalRequestCount(): number {
		return this.#normalRequests.size;
	}

	public get pendingBlobRequestCount(): number {
		return this.#blobRequests.size;
	}

	public callJson(
		method: string,
		params: Readonly<Record<string, unknown>> | readonly unknown[],
		route: ApkRpcRoute,
		callback: ApkReactCallback,
	): number {
		const id = this.#allocateMessageId();
		this.#register(this.#normalRequests, id, callback);
		void this.transport.sendJson({ id, method, params }, route).catch(error => {
			this.#rejectTransport(this.#normalRequests, id, error);
		});
		return id;
	}

	public callBlobJson(
		method: string,
		params: Readonly<Record<string, unknown>>,
		route: ApkRpcRoute,
		callback: ApkReactCallback,
	): number {
		const id = this.#allocateMessageId();
		this.#register(this.#blobRequests, id, callback);
		void this.transport.sendJson({
			id,
			method,
			security: { endpoint: this.endpoint, nonce: this.nonce },
			params,
		}, route).catch(error => {
			this.#rejectTransport(this.#blobRequests, id, error);
		});
		return id;
	}

	public callBlobProtobuf(
		payload: Uint8Array,
		route: ApkRpcRoute,
		callback: ApkReactCallback,
	): number {
		const id = this.#allocateMessageId();
		this.#register(this.#blobRequests, id, callback);
		const method = Buffer.from(payload);
		void this.transport.sendProtobuf({
			kind: "blob",
			id,
			payload: method,
			appToRobotMessage: encodeApkAppToRobotMessage({
				id,
				endpoint: this.endpoint,
				nonce: this.nonce,
				method,
			}),
		}, route).catch(error => {
			this.#rejectTransport(this.#blobRequests, id, error);
		});
		return id;
	}

	public callProtobuf(
		payload: Uint8Array,
		route: ApkRpcRoute,
		callback: ApkReactCallback,
	): number {
		const id = this.#allocateMessageId();
		this.#register(this.#normalRequests, id, callback);
		const method = Buffer.from(payload);
		void this.transport.sendProtobuf({
			kind: "normal",
			id,
			payload: method,
			appToRobotMessage: encodeApkAppToRobotMessage({ id, method }),
		}, route).catch(error => {
			this.#rejectTransport(this.#normalRequests, id, error);
		});
		return id;
	}

	public acceptJsonDps(dps: Readonly<Record<string, unknown>>): boolean {
		const response = dps["102"];
		if (!response || typeof response !== "object" || Array.isArray(response)) return false;
		const id = (response as Record<string, unknown>).id;
		if (typeof id !== "number" || !Number.isInteger(id)) return false;
		if (this.#blobRequests.has(id)) return true;
		const pending = this.#take(this.#normalRequests, id);
		if (!pending) return false;
		pending.callback(true, response);
		return true;
	}

	public acceptProtobufRpc(id: number, result: Uint8Array): boolean {
		if (id <= 0 || this.#blobRequests.has(id)) return false;
		const pending = this.#take(this.#normalRequests, id);
		if (!pending) return false;
		pending.callback(true, { pbResult: Buffer.from(result).toString("base64") });
		return true;
	}

	public acceptBlobResponse(response: ApkRpcBlobPayload): boolean {
		const pending = this.#take(this.#blobRequests, response.messageId);
		if (!pending) return false;
		try {
			pending.callback(true, decodeApkRpcBlobToBase64(response.encodedResponse, this.nonce));
		} catch (error) {
			const message = error instanceof Error && error.message.includes("GZIP") ? "" : null;
			callbackError(pending.callback, message);
		}
		return true;
	}

	public close(): void {
		for (const table of [this.#normalRequests, this.#blobRequests]) {
			for (const pending of table.values()) this.#clearTimer(pending.timer);
			table.clear();
		}
	}

	public static routeToApkBoolean(route: ApkRpcRoute): boolean | null {
		return routeToApkBoolean(route);
	}

	#allocateMessageId(): number {
		const id = this.#nextMessageId;
		this.#nextMessageId = id === 0x7fff_ffff ? -0x8000_0000 : id + 1;
		return id;
	}

	#register(table: Map<number, PendingRequest>, id: number, callback: ApkReactCallback): void {
		const timer = this.#setTimer(() => {
			const pending = this.#take(table, id);
			if (pending) callbackError(pending.callback, "timeout");
		}, this.#timeoutMilliseconds);
		table.set(id, { callback, timer });
	}

	#take(table: Map<number, PendingRequest>, id: number): PendingRequest | undefined {
		const pending = table.get(id);
		if (!pending) return undefined;
		table.delete(id);
		this.#clearTimer(pending.timer);
		return pending;
	}

	#rejectTransport(table: Map<number, PendingRequest>, id: number, error: unknown): void {
		const pending = this.#take(table, id);
		if (!pending) return;
		const transportError = error as Partial<ApkRpcTransportError> | undefined;
		const code = typeof transportError?.code === "string" ? transportError.code : "Error";
		const message = typeof transportError?.message === "string" ? transportError.message : String(error);
		callbackError(pending.callback, `${code}[${message}]`);
	}
}
