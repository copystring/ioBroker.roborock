export const APK_HOST_SERVICE_PROTOCOL = "roborock-appplugin-service";
export const APK_HOST_SERVICE_PROTOCOL_VERSION = 1;

export const APK_HOST_SERVICE_OPERATIONS = [
	"http.headers.get",
	"http.iot.delete",
	"http.iot.get",
	"http.iot.post",
	"http.iot.postJson",
	"http.iot.put",
	"http.iot.putJson",
	"http.mall.get",
	"http.mall.postJson",
	"http.user.delete",
	"http.user.get",
	"http.user.post",
	"http.user.postImages",
	"http.user.postJson",
	"http.user.put",
	"http.user.putJson",
] as const;

export type ApkHostServiceOperation = typeof APK_HOST_SERVICE_OPERATIONS[number];

export type ApkHostServiceWireValue =
	| null
	| boolean
	| number
	| string
	| ApkHostServiceWireValue[]
	| { [key: string]: ApkHostServiceWireValue };

export interface ApkHostServiceRequest {
	protocol: typeof APK_HOST_SERVICE_PROTOCOL;
	version: typeof APK_HOST_SERVICE_PROTOCOL_VERSION;
	type: "request";
	requestId: number;
	operation: ApkHostServiceOperation;
	payload: ApkHostServiceWireValue;
}

export type ApkHostServiceErrorCode =
	| "closed"
	| "internal"
	| "invalid-request"
	| "overloaded"
	| "timeout"
	| "transport"
	| "unavailable";

export type ApkHostServiceResponse =
	| {
		protocol: typeof APK_HOST_SERVICE_PROTOCOL;
		version: typeof APK_HOST_SERVICE_PROTOCOL_VERSION;
		type: "response";
		requestId: number;
		ok: true;
		value: ApkHostServiceWireValue;
	}
	| {
		protocol: typeof APK_HOST_SERVICE_PROTOCOL;
		version: typeof APK_HOST_SERVICE_PROTOCOL_VERSION;
		type: "response";
		requestId: number;
		ok: false;
		error: {
			code: ApkHostServiceErrorCode;
			message: string;
		};
	};

export type ApkHostServiceMessage = ApkHostServiceRequest | ApkHostServiceResponse;

export interface ApkHostServiceProtocolLimits {
	maxDepth?: number;
	maxLineBytes?: number;
	maxNodes?: number;
	maxStringBytes?: number;
}

export interface ApkHostServiceResolvedProtocolLimits {
	maxDepth: number;
	maxLineBytes: number;
	maxNodes: number;
	maxStringBytes: number;
}

export const APK_HOST_SERVICE_DEFAULT_PROTOCOL_LIMITS: Readonly<ApkHostServiceResolvedProtocolLimits> = Object.freeze({
	maxDepth: 32,
	maxLineBytes: 32 * 1024 * 1024,
	maxNodes: 100_000,
	maxStringBytes: 16 * 1024 * 1024,
});
export const APK_HOST_SERVICE_DEFAULT_MAX_PENDING_REQUESTS = 32;
export const APK_HOST_SERVICE_DEFAULT_TIMEOUT_MILLISECONDS = 10_000;

const SERVICE_OPERATION_SET = new Set<string>(APK_HOST_SERVICE_OPERATIONS);
const ERROR_CODE_SET = new Set<ApkHostServiceErrorCode>([
	"closed",
	"internal",
	"invalid-request",
	"overloaded",
	"timeout",
	"transport",
	"unavailable",
]);

function positiveInteger(value: number | undefined, fallback: number, name: string): number {
	const resolved = value ?? fallback;
	if (!Number.isSafeInteger(resolved) || resolved < 1) {
		throw new Error(`${name} muss eine positive ganze Zahl sein`);
	}
	return resolved;
}

function resolveLimits(limits: ApkHostServiceProtocolLimits = {}): ApkHostServiceResolvedProtocolLimits {
	return {
		maxDepth: positiveInteger(
			limits.maxDepth,
			APK_HOST_SERVICE_DEFAULT_PROTOCOL_LIMITS.maxDepth,
			"maxDepth",
		),
		maxLineBytes: positiveInteger(
			limits.maxLineBytes,
			APK_HOST_SERVICE_DEFAULT_PROTOCOL_LIMITS.maxLineBytes,
			"maxLineBytes",
		),
		maxNodes: positiveInteger(
			limits.maxNodes,
			APK_HOST_SERVICE_DEFAULT_PROTOCOL_LIMITS.maxNodes,
			"maxNodes",
		),
		maxStringBytes: positiveInteger(
			limits.maxStringBytes,
			APK_HOST_SERVICE_DEFAULT_PROTOCOL_LIMITS.maxStringBytes,
			"maxStringBytes",
		),
	};
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function toApkHostServiceWireValue(
	value: unknown,
	seen = new Set<object>(),
): ApkHostServiceWireValue {
	if (value === undefined) return { $apkType: "undefined" };
	if (value === null || typeof value === "boolean" || typeof value === "string") return value;
	if (typeof value === "number") {
		if (!Number.isFinite(value)) throw new Error("APK-Host-Dienstwert enthält keine endliche Zahl");
		return value;
	}
	if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
		return { $apkType: "bytes", base64: Buffer.from(value).toString("base64") };
	}
	if (typeof value !== "object") {
		throw new Error(`Nicht serialisierbarer APK-Host-Dienstwert: ${typeof value}`);
	}
	if (seen.has(value)) throw new Error("Zyklischer APK-Host-Dienstwert");
	seen.add(value);
	try {
		if (Array.isArray(value)) return value.map(item => toApkHostServiceWireValue(item, seen));
		return Object.fromEntries(Object.entries(value).map(([key, item]) => [
			key,
			toApkHostServiceWireValue(item, seen),
		]));
	} finally {
		seen.delete(value);
	}
}

export function fromApkHostServiceWireValue(value: ApkHostServiceWireValue): unknown {
	if (Array.isArray(value)) return value.map(fromApkHostServiceWireValue);
	if (!isRecord(value)) return value;
	if (value.$apkType === "undefined") return undefined;
	if (value.$apkType === "bytes" && typeof value.base64 === "string") return Buffer.from(value.base64, "base64");
	return Object.fromEntries(Object.entries(value).map(([key, item]) => [
		key,
		fromApkHostServiceWireValue(item as ApkHostServiceWireValue),
	]));
}

function assertRequestId(value: unknown): asserts value is number {
	if (!Number.isSafeInteger(value) || Number(value) < 1 || Number(value) > 0x7fff_ffff) {
		throw new Error("Ungültige APK-Host-Dienst-Anfrage-ID");
	}
}

function assertWireValue(
	value: unknown,
	limits: ApkHostServiceResolvedProtocolLimits,
): asserts value is ApkHostServiceWireValue {
	let nodes = 0;
	const visit = (candidate: unknown, depth: number): void => {
		nodes += 1;
		if (nodes > limits.maxNodes) throw new Error(`APK-Host-Dienstwert überschreitet ${limits.maxNodes} Knoten`);
		if (depth > limits.maxDepth) throw new Error(`APK-Host-Dienstwert überschreitet Tiefe ${limits.maxDepth}`);
		if (candidate === null || typeof candidate === "boolean") return;
		if (typeof candidate === "number") {
			if (!Number.isFinite(candidate)) throw new Error("APK-Host-Dienstwert enthält keine endliche Zahl");
			return;
		}
		if (typeof candidate === "string") {
			if (Buffer.byteLength(candidate, "utf8") > limits.maxStringBytes) {
				throw new Error(`APK-Host-Dienstzeichenfolge überschreitet ${limits.maxStringBytes} Bytes`);
			}
			return;
		}
		if (Array.isArray(candidate)) {
			for (const item of candidate) visit(item, depth + 1);
			return;
		}
		if (!isRecord(candidate)) throw new Error(`Nicht serialisierbarer APK-Host-Dienstwert: ${typeof candidate}`);
		for (const [key, item] of Object.entries(candidate)) {
			if (key === "__proto__" || key === "constructor" || key === "prototype") {
				throw new Error(`Unsicherer APK-Host-Dienstschlüssel: ${key}`);
			}
			if (Buffer.byteLength(key, "utf8") > limits.maxStringBytes) {
				throw new Error(`APK-Host-Dienstschlüssel überschreitet ${limits.maxStringBytes} Bytes`);
			}
			visit(item, depth + 1);
		}
	};
	visit(value, 0);
}

function assertEnvelope(value: unknown): asserts value is Record<string, unknown> & {
	protocol: typeof APK_HOST_SERVICE_PROTOCOL;
	version: typeof APK_HOST_SERVICE_PROTOCOL_VERSION;
	type: string;
} {
	if (!isRecord(value)
		|| value.protocol !== APK_HOST_SERVICE_PROTOCOL
		|| value.version !== APK_HOST_SERVICE_PROTOCOL_VERSION
		|| typeof value.type !== "string") {
		throw new Error("Ungültige APK-Host-Dienst-Protokollnachricht");
	}
}

function assertMessage(
	value: unknown,
	limits: ApkHostServiceResolvedProtocolLimits,
): asserts value is ApkHostServiceMessage {
	assertEnvelope(value);
	assertRequestId(value.requestId);
	if (value.type === "request") {
		if (typeof value.operation !== "string" || !SERVICE_OPERATION_SET.has(value.operation)) {
			throw new Error(`Unbekannter APK-Host-Dienstaufruf: ${String(value.operation)}`);
		}
		if (!("payload" in value)) throw new Error("APK-Host-Dienstanfrage enthält keine Nutzlast");
		assertWireValue(value.payload, limits);
		return;
	}
	if (value.type === "response") {
		if (value.ok === true) {
			if (!("value" in value)) throw new Error("APK-Host-Dienstantwort enthält keinen Wert");
			assertWireValue(value.value, limits);
			return;
		}
		if (value.ok === false && isRecord(value.error)
			&& typeof value.error.code === "string" && ERROR_CODE_SET.has(value.error.code as ApkHostServiceErrorCode)
			&& typeof value.error.message === "string" && Buffer.byteLength(value.error.message, "utf8") <= 512) {
			return;
		}
		throw new Error("Ungültiger APK-Host-Dienstfehler");
	}
	throw new Error(`Unbekannter APK-Host-Dienstnachrichtentyp: ${value.type}`);
}

export function parseApkHostServiceMessage(
	line: string,
	limits: ApkHostServiceProtocolLimits = {},
): ApkHostServiceMessage {
	const resolvedLimits = resolveLimits(limits);
	if (Buffer.byteLength(line, "utf8") > resolvedLimits.maxLineBytes) {
		throw new Error(`APK-Host-Dienstnachricht überschreitet ${resolvedLimits.maxLineBytes} Bytes`);
	}
	let value: unknown;
	try {
		value = JSON.parse(line);
	} catch {
		throw new Error("APK-Host-Dienst schrieb ungültiges JSON");
	}
	assertMessage(value, resolvedLimits);
	return value;
}

export function serializeApkHostServiceMessage(
	message: ApkHostServiceMessage,
	limits: ApkHostServiceProtocolLimits = {},
): string {
	const resolvedLimits = resolveLimits(limits);
	assertMessage(message, resolvedLimits);
	const line = JSON.stringify(message);
	if (Buffer.byteLength(line, "utf8") > resolvedLimits.maxLineBytes) {
		throw new Error(`APK-Host-Dienstnachricht überschreitet ${resolvedLimits.maxLineBytes} Bytes`);
	}
	return line;
}

export class ApkHostServiceError extends Error {
	public override readonly name = "ApkHostServiceError";

	public constructor(
		public readonly code: ApkHostServiceErrorCode,
		message: string,
	) {
		super(message);
	}
}

export class ApkHostServicePublicError extends Error {
	public override readonly name = "ApkHostServicePublicError";

	public constructor(
		public readonly code: Exclude<ApkHostServiceErrorCode, "internal" | "transport">,
		message: string,
	) {
		super(message);
		if (Buffer.byteLength(message, "utf8") > 512) {
			throw new Error("Öffentliche APK-Host-Dienstfehlermeldung überschreitet 512 Bytes");
		}
	}
}

export type ApkHostServiceRequestSink = (request: ApkHostServiceRequest) => void | Promise<void>;

export interface ApkHostServiceClientOptions extends ApkHostServiceProtocolLimits {
	initialRequestId?: number;
	maxPendingRequests?: number;
	timeoutMilliseconds?: number;
	setTimer?: (callback: () => void, timeoutMilliseconds: number) => ReturnType<typeof setTimeout>;
	clearTimer?: (timer: ReturnType<typeof setTimeout>) => void;
}

interface PendingHostServiceRequest {
	resolve(value: ApkHostServiceWireValue): void;
	reject(error: Error): void;
	timer: ReturnType<typeof setTimeout>;
}

export class ApkHostServiceClient {
	readonly #pending = new Map<number, PendingHostServiceRequest>();
	readonly #limits: ApkHostServiceProtocolLimits;
	readonly #maxPendingRequests: number;
	readonly #timeoutMilliseconds: number;
	readonly #setTimer: NonNullable<ApkHostServiceClientOptions["setTimer"]>;
	readonly #clearTimer: NonNullable<ApkHostServiceClientOptions["clearTimer"]>;
	#nextRequestId: number;
	#closed = false;

	public constructor(
		private readonly sink: ApkHostServiceRequestSink,
		options: ApkHostServiceClientOptions = {},
	) {
		this.#limits = options;
		this.#maxPendingRequests = positiveInteger(
			options.maxPendingRequests,
			APK_HOST_SERVICE_DEFAULT_MAX_PENDING_REQUESTS,
			"maxPendingRequests",
		);
		this.#timeoutMilliseconds = positiveInteger(
			options.timeoutMilliseconds,
			APK_HOST_SERVICE_DEFAULT_TIMEOUT_MILLISECONDS,
			"timeoutMilliseconds",
		);
		this.#nextRequestId = positiveInteger(options.initialRequestId, 1, "initialRequestId");
		if (this.#nextRequestId > 0x7fff_ffff) throw new Error("initialRequestId überschreitet 2147483647");
		this.#setTimer = options.setTimer ?? setTimeout;
		this.#clearTimer = options.clearTimer ?? clearTimeout;
	}

	public get pendingRequestCount(): number {
		return this.#pending.size;
	}

	public request(
		operation: ApkHostServiceOperation,
		payload: ApkHostServiceWireValue,
	): Promise<ApkHostServiceWireValue> {
		if (this.#closed) return Promise.reject(new ApkHostServiceError("closed", "APK-Host-Dienstkanal ist geschlossen"));
		if (!SERVICE_OPERATION_SET.has(operation)) {
			return Promise.reject(new ApkHostServiceError("invalid-request", `Unbekannter APK-Host-Dienstaufruf: ${operation}`));
		}
		if (this.#pending.size >= this.#maxPendingRequests) {
			return Promise.reject(new ApkHostServiceError("overloaded", "Zu viele gleichzeitige APK-Host-Dienstaufrufe"));
		}
		const requestId = this.#allocateRequestId();
		const request: ApkHostServiceRequest = {
			protocol: APK_HOST_SERVICE_PROTOCOL,
			version: APK_HOST_SERVICE_PROTOCOL_VERSION,
			type: "request",
			requestId,
			operation,
			payload,
		};
		try {
			serializeApkHostServiceMessage(request, this.#limits);
		} catch (error) {
			return Promise.reject(new ApkHostServiceError(
				"invalid-request",
				error instanceof Error ? error.message : String(error),
			));
		}
		return new Promise((resolve, reject) => {
			const timer = this.#setTimer(() => {
				const pending = this.#take(requestId);
				pending?.reject(new ApkHostServiceError("timeout", "APK-Host-Dienstaufruf hat das Zeitlimit überschritten"));
			}, this.#timeoutMilliseconds);
			this.#pending.set(requestId, { resolve, reject, timer });
			try {
				void Promise.resolve(this.sink(request)).catch(error => this.#rejectTransport(requestId, error));
			} catch (error) {
				this.#rejectTransport(requestId, error);
			}
		});
	}

	public accept(response: ApkHostServiceResponse): boolean {
		serializeApkHostServiceMessage(response, this.#limits);
		const pending = this.#take(response.requestId);
		if (!pending) return false;
		if (response.ok) pending.resolve(response.value);
		else pending.reject(new ApkHostServiceError(response.error.code, response.error.message));
		return true;
	}

	public close(): void {
		if (this.#closed) return;
		this.#closed = true;
		for (const requestId of [...this.#pending.keys()]) {
			const pending = this.#take(requestId);
			pending?.reject(new ApkHostServiceError("closed", "APK-Host-Dienstkanal wurde geschlossen"));
		}
	}

	#allocateRequestId(): number {
		for (let attempts = 0; attempts < 0x7fff_ffff; attempts += 1) {
			const requestId = this.#nextRequestId;
			this.#nextRequestId = requestId === 0x7fff_ffff ? 1 : requestId + 1;
			if (!this.#pending.has(requestId)) return requestId;
		}
		throw new ApkHostServiceError("overloaded", "Keine freie APK-Host-Dienst-Anfrage-ID verfügbar");
	}

	#take(requestId: number): PendingHostServiceRequest | undefined {
		const pending = this.#pending.get(requestId);
		if (!pending) return undefined;
		this.#pending.delete(requestId);
		this.#clearTimer(pending.timer);
		return pending;
	}

	#rejectTransport(requestId: number, error: unknown): void {
		const pending = this.#take(requestId);
		if (!pending) return;
		pending.reject(new ApkHostServiceError(
			"transport",
			`APK-Host-Diensttransport ist fehlgeschlagen: ${error instanceof Error ? error.name : "Error"}`,
		));
	}
}

export type ApkHostServiceHandler = (
	payload: ApkHostServiceWireValue,
) => ApkHostServiceWireValue | Promise<ApkHostServiceWireValue>;

export type ApkHostServiceHandlers = Partial<Readonly<Record<ApkHostServiceOperation, ApkHostServiceHandler>>>;

/**
 * Adapter-side allowlisted service router. Unknown handler failures are never
 * reflected verbatim to the AppPlugin so tokens, URLs and transport internals
 * cannot leak across the process boundary.
 */
export class ApkHostServiceRouter {
	public constructor(
		private readonly handlers: ApkHostServiceHandlers,
		private readonly limits: ApkHostServiceProtocolLimits = {},
	) {}

	public async handle(request: ApkHostServiceRequest): Promise<ApkHostServiceResponse> {
		serializeApkHostServiceMessage(request, this.limits);
		const handler = this.handlers[request.operation];
		if (!handler) return this.#error(request.requestId, "unavailable", "APK-Host-Dienst ist nicht verbunden");
		try {
			const value = await handler(request.payload);
			const response: ApkHostServiceResponse = {
				protocol: APK_HOST_SERVICE_PROTOCOL,
				version: APK_HOST_SERVICE_PROTOCOL_VERSION,
				type: "response",
				requestId: request.requestId,
				ok: true,
				value,
			};
			serializeApkHostServiceMessage(response, this.limits);
			return response;
		} catch (error) {
			if (error instanceof ApkHostServicePublicError) {
				return this.#error(request.requestId, error.code, error.message);
			}
			return this.#error(request.requestId, "internal", "APK-Host-Dienst ist intern fehlgeschlagen");
		}
	}

	#error(requestId: number, code: ApkHostServiceErrorCode, message: string): ApkHostServiceResponse {
		return {
			protocol: APK_HOST_SERVICE_PROTOCOL,
			version: APK_HOST_SERVICE_PROTOCOL_VERSION,
			type: "response",
			requestId,
			ok: false,
			error: { code, message },
		};
	}
}
