import { decodeMowerRpcResult } from "./mowerJsonMessage";
import type { MowerRpcResponse } from "./MowerRpcTransport";

/** Await device data from either the RPC result or the independent RobotMsg stream.
 * An acknowledgement alone cannot authorise a mutation based on previously cached data.
 */
export function waitForMowerReadback<T>(
	send: () => Promise<MowerRpcResponse>,
	parse: (message: unknown) => T | undefined,
	subscribe: (listener: (message: unknown) => void) => () => void,
	signal: AbortSignal,
	timeoutMs = 10_000,
): Promise<T> {
	if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return Promise.reject(new Error("Invalid mower readback timeout"));
	if (signal.aborted) return Promise.reject(new Error("Mower readback cancelled"));
	return new Promise<T>((resolve, reject) => {
		let settled = false;
		let sending = false;
		let acknowledged = false;
		let received = false;
		let readback: T | undefined;
		let detach = () => {};
		const finish = (value?: T, error?: unknown) => {
			if (settled) return;
			settled = true;
			clearTimeout(timer);
			detach();
			signal.removeEventListener("abort", cancel);
			if (error !== undefined) reject(error instanceof Error ? error : new Error("Mower readback failed"));
			else resolve(value!);
		};
		const accept = (message: unknown) => {
			if (!sending || settled) return;
			try {
				const value = parse(message);
				if (value !== undefined) {
					received = true;
					readback = value;
					if (acknowledged) finish(value);
				}
			} catch (error) {
				finish(undefined, error);
			}
		};
		const cancel = () => finish(undefined, new Error("Mower readback cancelled"));
		const timer = setTimeout(() => finish(undefined, new Error("Mower device readback timed out")), timeoutMs);
		try {
			detach = subscribe(accept);
		} catch (error) {
			finish(undefined, error);
			return;
		}
		signal.addEventListener("abort", cancel, { once: true });
		if (signal.aborted) {
			cancel();
			return;
		}
		try {
			sending = true;
			void send().then(response => {
				acknowledged = true;
				accept(decodeMowerRpcResult(response));
				if (received) finish(readback);
			}, error => finish(undefined, error));
		} catch (error) {
			finish(undefined, error);
		}
	});
}
