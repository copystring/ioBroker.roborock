/** The APK sends remote_pb as JSON RPC in DP 101 and correlates DP 102 by RPC id.
 * RobotMsg ids belong to a separate status stream. A transport ACK never changes device status.
 */
export interface MowerRpcEnvelope {
	id: number;
	method: "remote_pb";
	params: Record<string, unknown>;
}

export interface MowerRpcResponse {
	id: number;
	result?: unknown;
	error?: unknown;
}

interface PendingRpc {
	resolve: (response: MowerRpcResponse) => void;
	reject: (error: Error) => void;
	timer: ReturnType<typeof setTimeout>;
	controller: AbortController;
	detachSignal: () => void;
}

export interface MowerRpcDependencies {
	/** Must reject if the broker is unavailable; success means published, not executed. */
	publish: (duid: string, envelope: MowerRpcEnvelope, signal: AbortSignal) => Promise<void>;
}

/** Dedicated cloud transport, independent of the vacuum RPC decoder and its retry policy. */
export class MowerRpcTransport {
	private readonly pending = new Map<string, Map<number, PendingRpc>>();
	private nextId = 0;
	private stopped = false;

	constructor(private readonly dependencies: MowerRpcDependencies, private readonly timeoutMs = 10_000) {
		if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new Error("Invalid mower RPC timeout");
	}

	public async request(duid: string, params: Record<string, unknown>, signal?: AbortSignal): Promise<MowerRpcResponse> {
		if (this.stopped) throw new Error("Mower transport stopped");
		if (signal?.aborted) throw new Error("Mower request cancelled");
		if (!duid) throw new Error("Missing mower device id");
		// The JSON RPC id is independent of the protobuf timestamp id in params.
		const id = ++this.nextId;
		if (id > 0x7fffffff) throw new Error("Mower RPC id exhausted");
		let requests = this.pending.get(duid);
		if (!requests) {
			requests = new Map();
			this.pending.set(duid, requests);
		}
		const controller = new AbortController();
		const response = new Promise<MowerRpcResponse>((resolve, reject) => {
			const cancel = () => this.take(duid, id)?.reject(new Error("Mower request cancelled"));
			const timer = setTimeout(() => {
				this.take(duid, id)?.reject(new Error("Mower RPC acknowledgement timed out"));
			}, this.timeoutMs);
			requests.set(id, { resolve, reject, timer, controller, detachSignal: () => signal?.removeEventListener("abort", cancel) });
			signal?.addEventListener("abort", cancel, { once: true });
		});
		// Register before publishing: a synchronous broker callback can already contain the ACK.
		// Do not resend on timeout: a lost ACK does not prove a movement command was not executed.
		try {
			const published = this.dependencies.publish(duid, { id, method: "remote_pb", params }, controller.signal);
			void published.catch((error: unknown) => {
				this.take(duid, id)?.reject(error instanceof Error ? error : new Error("Mower RPC publish failed"));
			});
		} catch (error: unknown) {
			this.take(duid, id)?.reject(error instanceof Error ? error : new Error("Mower RPC publish failed"));
		}
		return response;
	}

	/** Accept only the manufacturer's DP 102 envelope, never an arbitrary RobotMsg with an id. */
	public acceptDps(duid: string, dps: Record<string, unknown>): boolean {
		let response = dps["102"];
		if (typeof response === "string") {
			try {
				response = JSON.parse(response);
			} catch {
				return false;
			}
		}
		if (!response || typeof response !== "object" || Array.isArray(response)) return false;
		const ack = response as Record<string, unknown>;
		if (typeof ack.id !== "number" || !Number.isSafeInteger(ack.id) || ack.id <= 0) return false;
		const pending = this.take(duid, ack.id);
		if (!pending) return false;
		if (ack.error != null) pending.reject(new Error("Mower RPC returned an error"));
		else pending.resolve(ack as unknown as MowerRpcResponse);
		return true;
	}

	public stop(): void {
		this.stopped = true;
		this.cancelPending("Mower transport stopped");
	}

	public cancelPending(reason: string, deviceId?: string): void {
		for (const [duid, requests] of this.pending) {
			if (deviceId !== undefined && duid !== deviceId) continue;
			for (const id of requests.keys()) this.take(duid, id)?.reject(new Error(reason));
		}
	}

	private take(duid: string, id: number): PendingRpc | undefined {
		const requests = this.pending.get(duid);
		const pending = requests?.get(id);
		if (!pending) return undefined;
		clearTimeout(pending.timer);
		pending.detachSignal();
		pending.controller.abort();
		requests!.delete(id);
		if (requests!.size === 0) this.pending.delete(duid);
		return pending;
	}
}
