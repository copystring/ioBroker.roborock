import type { Roborock } from "../main";

type Refresh = {
	promise: Promise<void>;
	dp: string;
	published: boolean;
	processed: boolean;
	finish: (error?: unknown) => void;
};

/** A01 ID_QUERY replies have no request ID; only newly received operating state can satisfy a refresh. */
export class A01StatusRefresh {
	private readonly pending = new Map<string, Refresh>();

	constructor(private readonly adapter: Roborock) {}

	public refresh(duid: string, signal?: AbortSignal): Promise<void> {
		if (signal?.aborted) return Promise.reject(signal.reason);
		const existing = this.pending.get(duid);
		if (existing) return existing.promise;
		// DP meanings follow python-roborock's RoborockZeoProtocol / RoborockDyadDataProtocol.
		const category = this.adapter.http_api.getProductCategory(duid);
		const dp = category === "roborock.wm" ? "203" : category === "roborock.wetdryvac" ? "201" : undefined;
		if (!dp) return Promise.reject(new Error(`refresh_status is not supported for A01 category ${category ?? "unknown"}`));

		let resolve!: () => void;
		let reject!: (error: unknown) => void;
		const promise = new Promise<void>((res, rej) => {
			resolve = res;
			reject = rej;
		});
		const publishAbort = new AbortController();
		const onAbort = () => pending.finish(signal?.reason ?? new Error("A01 status refresh aborted"));
		const pending: Refresh = {
			promise, dp, published: false, processed: false,
			finish: (error?: unknown) => {
				if (this.pending.get(duid) !== pending) return;
				this.pending.delete(duid);
				this.adapter.clearTimeout(timer);
				signal?.removeEventListener("abort", onAbort);
				publishAbort.abort(error);
				if (error !== undefined) reject(error);
				else resolve();
			},
		};
		this.pending.set(duid, pending);
		const timer = this.adapter.setTimeout(() => pending.finish(new Error("Timed out waiting for fresh A01 status")), 10_000);
		signal?.addEventListener("abort", onAbort, { once: true });
		void this.publishQuery(duid, Number(dp), publishAbort.signal).then(() => {
			pending.published = true;
			if (pending.processed) pending.finish();
		}, error => pending.finish(error));
		return promise;
	}

	private async publishQuery(duid: string, dp: number, signal: AbortSignal): Promise<void> {
		signal.throwIfAborted();
		const timestamp = Math.floor(Date.now() / 1000);
		const payload = JSON.stringify({ dps: { "10000": [dp] }, t: timestamp });
		const frame = await this.adapter.requestsHandler.messageParser.buildRoborockMessage(duid, 101, timestamp, payload, "A01");
		signal.throwIfAborted();
		if (!frame) throw new Error("Failed to build A01 status query");
		await this.adapter.mqtt_api.sendMessage(duid, frame, signal);
	}

	/** Capture the operation before any asynchronous state processing, never after it. */
	public capture(duid: string): (response: { dps?: Record<string, unknown> }) => Promise<void> {
		const pending = this.pending.get(duid);
		return async response => {
			const value = response?.dps?.[pending?.dp ?? ""];
			const matching = pending && typeof value === "number" && Number.isFinite(value);
			try {
				await this.adapter.processA01(duid, response);
				if (matching) {
					pending.processed = true;
					if (pending.published) pending.finish();
				}
			} catch (error) {
				if (matching) pending.finish(error);
				throw error;
			}
		};
	}
}
