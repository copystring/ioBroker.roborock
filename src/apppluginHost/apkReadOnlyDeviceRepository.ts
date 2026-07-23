import type { ApkDeviceRepositoryPort } from "./apkDeviceRepositoryTransport";
import type { ApkJsonRpcRequest } from "./apkRpcRequestBroker";

export type ApkDeviceWireRoute = "cloud" | "local";

export interface ApkReadOnlyDeviceWirePort {
	connectLocalDeviceIfNeeded(timeoutSeconds: number): number;
	deviceOnline(): Promise<boolean>;
	isCloudConnected(): boolean;
	isLocalConnected(): boolean;
	loadShadowDps(): Promise<string | null>;
	sendJsonDps(route: ApkDeviceWireRoute, dps: Readonly<Record<string, unknown>>): Promise<void>;
}

export type ApkReadOnlyJsonRpcAuthorizer = (
	request: Readonly<ApkJsonRpcRequest>,
) => boolean | Promise<boolean>;

export type ApkReadOnlyDeviceTransportObservation = Readonly<
	| { operation: "connect-local"; status: number; timeoutSeconds: number }
	| { online: boolean; operation: "device-online" }
	| { available: boolean; operation: "load-shadow" }
	| {
		method: string;
		operation: "json-rpc";
		outcome: "attempted" | "authorized" | "blocked" | "sent";
		route: ApkDeviceWireRoute;
	}
	| { operation: "protobuf-rpc"; route: "automatic" | ApkDeviceWireRoute }
>;

export type ApkReadOnlyDeviceTransportObserver = (
	observation: ApkReadOnlyDeviceTransportObservation,
) => void;

function parseJsonRpcRequest(dps: Readonly<Record<string, unknown>>): ApkJsonRpcRequest {
	const keys = Object.keys(dps);
	if (keys.length !== 1 || keys[0] !== "101" || typeof dps["101"] !== "string") {
		throw new Error("Read-only-AppPlugin-Transport akzeptiert ausschließlich ein serialisiertes dps.101-RPC");
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(dps["101"]);
	} catch {
		throw new Error("Read-only-AppPlugin-dps.101 enthält kein gültiges JSON");
	}
	if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
		throw new Error("Read-only-AppPlugin-dps.101 muss ein RPC-Objekt enthalten");
	}
	const request = parsed as Record<string, unknown>;
	if (!Number.isSafeInteger(request.id) || Number(request.id) <= 0) {
		throw new Error("Read-only-AppPlugin-RPC benötigt eine positive ganzzahlige ID");
	}
	if (typeof request.method !== "string" || request.method.trim().length === 0) {
		throw new Error("Read-only-AppPlugin-RPC benötigt einen Methodennamen");
	}
	return structuredClone(request) as unknown as ApkJsonRpcRequest;
}

/**
 * Fail-closed safety boundary for the first real device probes.
 *
 * It does not know products, features or command mappings. The unchanged
 * AppPlugin still creates the complete request; an external probe policy only
 * decides whether that exact JSON RPC may leave the adapter. Arbitrary DPS and
 * opaque protobuf calls are blocked because their write safety cannot be
 * established at this boundary.
 */
export class ApkReadOnlyDeviceRepository implements ApkDeviceRepositoryPort {
	public constructor(
		private readonly wire: ApkReadOnlyDeviceWirePort,
		private readonly authorizeJsonRpc: ApkReadOnlyJsonRpcAuthorizer,
		private readonly observe?: ApkReadOnlyDeviceTransportObserver,
	) {}

	public connectLocalDeviceIfNeeded(timeoutSeconds: number): number {
		const status = this.wire.connectLocalDeviceIfNeeded(timeoutSeconds);
		this.observe?.({ operation: "connect-local", status, timeoutSeconds });
		return status;
	}

	public async deviceOnline(): Promise<boolean> {
		const online = await this.wire.deviceOnline();
		this.observe?.({ online, operation: "device-online" });
		return online;
	}

	public async loadShadowDps(): Promise<string | null> {
		const dps = await this.wire.loadShadowDps();
		this.observe?.({ available: dps !== null, operation: "load-shadow" });
		return dps;
	}

	public async publishDps(dps: Readonly<Record<string, unknown>>): Promise<void> {
		const route: ApkDeviceWireRoute = this.wire.isLocalConnected() ? "local" : "cloud";
		await this.#sendAuthorizedJson(route, dps);
	}

	public sendDpsLocal(dps: Readonly<Record<string, unknown>>): Promise<void> {
		return this.#sendAuthorizedJson("local", dps);
	}

	public publishDpsMqtt(dps: Readonly<Record<string, unknown>>): Promise<void> {
		return this.#sendAuthorizedJson("cloud", dps);
	}

	public publishDpsProtobuf(_payload: Uint8Array): Promise<void> {
		this.observe?.({ operation: "protobuf-rpc", route: "automatic" });
		return Promise.reject(new Error("Read-only-AppPlugin-Test blockiert nicht klassifizierbare Protobuf-RPCs"));
	}

	public sendDpsProtobufLocal(_payload: Uint8Array): Promise<void> {
		this.observe?.({ operation: "protobuf-rpc", route: "local" });
		return Promise.reject(new Error("Read-only-AppPlugin-Test blockiert nicht klassifizierbare lokale Protobuf-RPCs"));
	}

	public publishDpsProtobufMqtt(_payload: Uint8Array): Promise<void> {
		this.observe?.({ operation: "protobuf-rpc", route: "cloud" });
		return Promise.reject(new Error("Read-only-AppPlugin-Test blockiert nicht klassifizierbare MQTT-Protobuf-RPCs"));
	}

	async #sendAuthorizedJson(
		route: ApkDeviceWireRoute,
		dps: Readonly<Record<string, unknown>>,
	): Promise<void> {
		if (route === "local" && !this.wire.isLocalConnected()) {
			throw new Error("Lokaler Read-only-AppPlugin-Transport ist nicht verbunden");
		}
		if (route === "cloud" && !this.wire.isCloudConnected()) {
			throw new Error("MQTT-Read-only-AppPlugin-Transport ist nicht verbunden");
		}
		const request = parseJsonRpcRequest(dps);
		this.observe?.({ method: request.method, operation: "json-rpc", outcome: "attempted", route });
		if (!await this.authorizeJsonRpc(request)) {
			this.observe?.({ method: request.method, operation: "json-rpc", outcome: "blocked", route });
			throw new Error(`AppPlugin-RPC ${request.method} wurde von der Read-only-Richtlinie blockiert`);
		}
		this.observe?.({ method: request.method, operation: "json-rpc", outcome: "authorized", route });
		await this.wire.sendJsonDps(route, structuredClone(dps));
		this.observe?.({ method: request.method, operation: "json-rpc", outcome: "sent", route });
	}
}

/** Creates an explicit probe allow-list without embedding device knowledge. */
export function createApkReadOnlyMethodAuthorizer(
	allowedMethods: ReadonlySet<string> | readonly string[],
): ApkReadOnlyJsonRpcAuthorizer {
	const allowed = new Set([...allowedMethods].map(method => method.trim()).filter(Boolean));
	return request => allowed.has(request.method);
}
