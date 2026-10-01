import { buildMowerButton, buildMowerInfoRequest, buildMowerSettingsRequest, buildMowerRainfallRequest, buildMowerNotDisturbRequest, isSourceSupportedMower, type MowerCommand, type MowerRainfallSetting, type MowerNotDisturbSetting } from "./mowerContract";
import type { MowerRpcTransport, MowerRpcResponse } from "./MowerRpcTransport";
import { MowerStatusStore, type MowerStatusSnapshot } from "./MowerStatusStore";

/** Source-derived device behavior; transport wiring remains separate from the vacuum handlers. */
export class MowerSession {
	private readonly status = new MowerStatusStore();
	private lastRequestId = 0;
	private closed = false;
	private readonly lifetime = new AbortController();

	constructor(
		private readonly duid: string,
		model: string,
		category: string | null,
		private readonly rpc: Pick<MowerRpcTransport, "request">,
		private readonly now: () => number = Date.now,
	) {
		if (!duid || !isSourceSupportedMower(model, category)) throw new Error("Unsupported mower session");
	}

	/** A resolved result confirms only RPC acknowledgement, not completion of the movement. */
	public command(command: MowerCommand): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerButton(command, this.nextId()), this.lifetime.signal);
	}

	/** Status remains unchanged until a separate ROBOT_STATUS_UPDATE arrives. */
	public requestStatus(): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerInfoRequest(this.nextId()), this.lifetime.signal);
	}

	public requestSettings(): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerSettingsRequest(this.nextId()), this.lifetime.signal);
	}

	public setRainfall(setting: MowerRainfallSetting): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerRainfallRequest(setting, this.nextId()), this.lifetime.signal);
	}

	public setNotDisturb(setting: MowerNotDisturbSetting): Promise<MowerRpcResponse> {
		this.assertOpen();
		return this.rpc.request(this.duid, buildMowerNotDisturbRequest(setting, this.nextId()), this.lifetime.signal);
	}

	public acceptRobotMessage(message: unknown): boolean {
		return !this.closed && this.status.acceptRobotMessage(message);
	}

	public getStatus(): MowerStatusSnapshot | undefined {
		return this.status.getSnapshot();
	}

	public close(): void {
		this.closed = true;
		this.lifetime.abort();
	}

	private assertOpen(): void {
		if (this.closed) throw new Error("Mower session closed");
	}

	private nextId(): number {
		const timestamp = this.now();
		if (!Number.isSafeInteger(timestamp) || timestamp <= 0) throw new Error("Invalid mower request clock");
		// Preserve timestamp semantics while avoiding duplicate ids within the same millisecond.
		const id = Math.max(timestamp, this.lastRequestId + 1);
		if (!Number.isSafeInteger(id)) throw new Error("Mower protobuf id exhausted");
		this.lastRequestId = id;
		return id;
	}
}
