import { isSourceSupportedMower } from "./mowerContract";
import { MowerRpcTransport } from "./MowerRpcTransport";

export interface MowerCloudDependencies {
	getModel: (duid: string) => string | null;
	getCategory: (duid: string) => string | null;
	getProtocol: (duid: string) => Promise<string | null>;
	isConnected: () => boolean;
	buildFrame: (duid: string, protocol: number, timestamp: number, payload: string, version: string, sequenceId: number) => Promise<Buffer | false>;
	publishFrame: (duid: string, frame: Buffer) => Promise<void>;
}

/** APK MQTT SDK normalizes L01 to 1.0 for JSON DP publishes; TCP L01 nonces are irrelevant here. */
export function createMowerCloudTransport(dependencies: MowerCloudDependencies): MowerRpcTransport {
	return new MowerRpcTransport({
		publish: async (duid, rpc, signal) => {
			const supported = () => isSourceSupportedMower(dependencies.getModel(duid), dependencies.getCategory(duid));
			if (!supported()) throw new Error("Unsupported mower cloud device");
			const pv = await dependencies.getProtocol(duid);
			signal.throwIfAborted();
			// The source-mapped device is verified as L01. Do not upgrade arbitrary protocols/classes.
			if (pv !== "L01" && pv !== "1.0") throw new Error("Unsupported mower device protocol");
			if (!dependencies.isConnected()) throw new Error("Mower MQTT connection unavailable");
			const timestamp = Math.floor(Date.now() / 1000);
			const payload = JSON.stringify({ dps: { "101": JSON.stringify(rpc) }, t: timestamp });
			const frame = await dependencies.buildFrame(duid, 101, timestamp, payload, "1.0", rpc.id);
			signal.throwIfAborted();
			if (!frame) throw new Error("Mower cloud frame could not be encoded");
			const currentPv = await dependencies.getProtocol(duid);
			signal.throwIfAborted();
			if (currentPv !== "L01" && currentPv !== "1.0") throw new Error("Mower device protocol changed before publish");
			if (!supported() || !dependencies.isConnected()) throw new Error("Mower cloud device or connection changed before publish");
			await dependencies.publishFrame(duid, frame);
		},
	});
}
