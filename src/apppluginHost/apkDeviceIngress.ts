import {
	ApkBlobTransferAssembler,
	type ApkAssembledBlobPayload,
	type ApkBlobTransferSegment,
} from "./apkBlobTransferAssembler";
import { ApkPluginDeviceEventBridge } from "./apkDeviceEvents";
import { decodeApkRobotToAppMessage, type ApkRobotToAppMessage } from "./apkRobotToAppMessage";
import { ApkRpcRequestBroker } from "./apkRpcRequestBroker";

export interface ApkDeviceIngressResult {
	eventEmitted: boolean;
	rpcAccepted: boolean;
}

function isApkRpcProtocol(protocolVersion: string): boolean {
	return protocolVersion === "L01" || protocolVersion === "1.0";
}

function normalizeJsonRpcDps(
	dps: Readonly<Record<string, unknown>>,
): Readonly<Record<string, unknown>> {
	if (typeof dps["102"] !== "string") return dps;
	try {
		const response = JSON.parse(dps["102"]);
		if (response !== null && typeof response === "object" && !Array.isArray(response)) {
			return { ...dps, "102": response };
		}
	} catch {
		// The untouched payload was already emitted to the AppPlugin event path.
	}
	return dps;
}

/**
 * Composes the APK's independent RRDeviceModule and RRRpcManager listeners.
 *
 * Device events are never consumed by an RPC callback. The same native input
 * is offered to both APK surfaces, while protocol/device/type guards remain on
 * the RRRpcManager side exactly where the APK applies them.
 */
export class ApkDeviceIngress {
	public constructor(
		private readonly duid: string,
		private readonly assembler: ApkBlobTransferAssembler,
		private readonly broker: ApkRpcRequestBroker,
		private readonly events: ApkPluginDeviceEventBridge,
	) {}

	public acceptJsonDps(
		duid: string,
		protocolVersion: string,
		serializedDps: string,
	): ApkDeviceIngressResult {
		if (duid !== this.duid) return { eventEmitted: false, rpcAccepted: false };
		this.events.emitDpsPayload(serializedDps);
		if (!isApkRpcProtocol(protocolVersion)) return { eventEmitted: true, rpcAccepted: false };
		let parsed: unknown;
		try {
			parsed = JSON.parse(serializedDps);
		} catch {
			return { eventEmitted: true, rpcAccepted: false };
		}
		const rpcAccepted = parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)
			? this.broker.acceptJsonDps(normalizeJsonRpcDps(parsed as Readonly<Record<string, unknown>>))
			: false;
		return { eventEmitted: true, rpcAccepted };
	}

	public acceptProtobufDps(
		duid: string,
		protocolVersion: string,
		serializedMessage: Uint8Array,
	): ApkDeviceIngressResult {
		if (duid !== this.duid) return { eventEmitted: false, rpcAccepted: false };
		const message = decodeApkRobotToAppMessage(serializedMessage);
		this.events.emitProtobufPayload(message.result);
		return {
			eventEmitted: true,
			rpcAccepted: this.#acceptProtobufRpc(protocolVersion, message),
		};
	}

	public acceptBlobSegment(segment: ApkBlobTransferSegment): ApkAssembledBlobPayload | undefined {
		const assembled = this.assembler.accept(segment);
		if (assembled?.kind === "b01-payload") this.events.emitBlobPayload(assembled.payload);
		else if (assembled?.kind === "rpc-response") this.broker.acceptBlobResponse(assembled);
		return assembled;
	}

	#acceptProtobufRpc(protocolVersion: string, message: ApkRobotToAppMessage): boolean {
		if (!isApkRpcProtocol(protocolVersion) || message.type !== "RPC" || message.id <= 0) return false;
		return this.broker.acceptProtobufRpc(message.id, message.result);
	}
}
