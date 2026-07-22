import type { ApkPluginDeviceTransport } from "./apkPluginDeviceRuntime";
import type {
	ApkJsonRpcRequest,
	ApkProtobufRpcRequest,
	ApkRpcRoute,
	ApkRpcTransport,
} from "./apkRpcRequestBroker";

export interface ApkDeviceRepositoryPort {
	connectLocalDeviceIfNeeded(timeoutSeconds: number): number;
	deviceOnline(): Promise<boolean>;
	loadShadowDps(): Promise<string | null>;
	publishDps(dps: Readonly<Record<string, unknown>>): Promise<void>;
	sendDpsLocal(dps: Readonly<Record<string, unknown>>): Promise<void>;
	publishDpsMqtt(dps: Readonly<Record<string, unknown>>): Promise<void>;
	publishDpsProtobuf(payload: Uint8Array): Promise<void>;
	sendDpsProtobufLocal(payload: Uint8Array): Promise<void>;
	publishDpsProtobufMqtt(payload: Uint8Array): Promise<void>;
}

export interface ApkDeviceRepositoryRuntimePorts {
	readonly deviceTransport: ApkPluginDeviceTransport;
	readonly rpcTransport: ApkRpcTransport;
}

function jsonDps(request: Readonly<ApkJsonRpcRequest>): Readonly<Record<string, unknown>> {
	return Object.freeze({ "101": JSON.stringify(request) });
}

function immutableBytes(value: Uint8Array): Uint8Array {
	return Buffer.from(value);
}

/**
 * Mirrors the generic routing in the APK's RRRpcManager/o00oOoo boundary.
 *
 * JSON requests are serialized unchanged into dps.101. The nullable Android
 * route is represented by automatic/local/cloud and selects the matching
 * device-repository method. Protobuf uses the already encoded AppToRobotMsg;
 * no command names, product variants or parameters are interpreted here.
 */
export class ApkDeviceRepositoryTransport
implements ApkPluginDeviceTransport, ApkRpcTransport {
	public constructor(private readonly repository: ApkDeviceRepositoryPort) {}

	public connectLocalDeviceIfNeeded(timeoutSeconds: number): number {
		return this.repository.connectLocalDeviceIfNeeded(timeoutSeconds);
	}

	public deviceOnline(): Promise<boolean> {
		return this.repository.deviceOnline();
	}

	public loadShadowDps(): Promise<string | null> {
		return this.repository.loadShadowDps();
	}

	public publishDps(dps: Readonly<Record<string, unknown>>): Promise<void> {
		return this.repository.publishDps(structuredClone(dps));
	}

	public sendJson(request: ApkJsonRpcRequest, route: ApkRpcRoute): Promise<void> {
		const dps = jsonDps(structuredClone(request));
		switch (route) {
			case "automatic":
				return this.repository.publishDps(dps);
			case "local":
				return this.repository.sendDpsLocal(dps);
			case "cloud":
				return this.repository.publishDpsMqtt(dps);
		}
	}

	public sendProtobuf(request: ApkProtobufRpcRequest, route: ApkRpcRoute): Promise<void> {
		const payload = immutableBytes(request.appToRobotMessage);
		switch (route) {
			case "automatic":
				return this.repository.publishDpsProtobuf(payload);
			case "local":
				return this.repository.sendDpsProtobufLocal(payload);
			case "cloud":
				return this.repository.publishDpsProtobufMqtt(payload);
		}
	}
}

export function createApkDeviceRepositoryRuntimePorts(
	repository: ApkDeviceRepositoryPort,
): Readonly<ApkDeviceRepositoryRuntimePorts> {
	const transport = new ApkDeviceRepositoryTransport(repository);
	return Object.freeze({
		deviceTransport: transport,
		rpcTransport: transport,
	});
}
