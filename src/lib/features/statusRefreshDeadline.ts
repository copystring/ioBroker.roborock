import type { Roborock } from "../../main";

/** Bound the whole refresh, including queueing and state writes, and cancel its request on every terminal path. */
export async function withStatusRefreshDeadline(adapter: Roborock, signal: AbortSignal | undefined, action: (signal: AbortSignal) => Promise<void>): Promise<void> {
	signal?.throwIfAborted();
	const controller = new AbortController();
	const onAbort = () => controller.abort(signal?.reason);
	signal?.addEventListener("abort", onAbort, { once: true });
	const timer = adapter.setTimeout(() => controller.abort(new Error("Status refresh timed out after 10000ms")), 10_000);
	let rejectAbort!: (error: unknown) => void;
	const aborted = new Promise<never>((_resolve, reject) => {
		rejectAbort = reject;
	});
	const onInnerAbort = () => rejectAbort(controller.signal.reason);
	controller.signal.addEventListener("abort", onInnerAbort, { once: true });
	try {
		await Promise.race([action(controller.signal), aborted]);
	} finally {
		adapter.clearTimeout(timer);
		signal?.removeEventListener("abort", onAbort);
		controller.signal.removeEventListener("abort", onInnerAbort);
		controller.abort();
	}
}
