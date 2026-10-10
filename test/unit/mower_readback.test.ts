import { describe, expect, it, vi } from "vitest";
import { waitForMowerReadback } from "../../src/lib/mower/MowerReadback";

function stream() {
	const listeners = new Set<(message: unknown) => void>();
	return {
		listeners,
		subscribe: (listener: (message: unknown) => void) => { listeners.add(listener); return () => listeners.delete(listener); },
		emit: (value: unknown) => { for (const listener of listeners) listener(value); },
	};
}
const parse = (value: unknown): number | undefined => typeof value === "number" ? value : undefined;

describe("mower semantic readback", () => {
	it("waits past an acknowledgement for device data and detaches on success", async () => {
		const events = stream();
		const result = waitForMowerReadback(async () => ({ id: 1, result: "ok" }), parse, events.subscribe, new AbortController().signal);
		await Promise.resolve();
		expect(events.listeners.size).toBe(1);
		events.emit(0);
		await expect(result).resolves.toBe(0);
		expect(events.listeners.size).toBe(0);
	});
	it("registers before sending and accepts a synchronous response event", async () => {
		const events = stream();
		const result = waitForMowerReadback(async () => { events.emit(7); return { id: 1 }; }, parse, events.subscribe, new AbortController().signal);
		await expect(result).resolves.toBe(7);
	});
	it("does not authorise a mutation when an independent event arrives but its query fails", async () => {
		const events = stream();
		const result = waitForMowerReadback(async () => { events.emit(7); throw new Error("query failed"); }, parse, events.subscribe, new AbortController().signal);
		await expect(result).rejects.toThrow("query failed");
		expect(events.listeners.size).toBe(0);
	});
	it("accepts a decoded RPC result and cleans up on failure, cancellation and timeout", async () => {
		const objectParser = (message: any) => message?.plans;
		const events = stream();
		await expect(waitForMowerReadback(async () => ({ id: 1, result: '{"plans":[]}' }), objectParser, events.subscribe, new AbortController().signal)).resolves.toEqual([]);
		await expect(waitForMowerReadback(async () => { throw new Error("offline"); }, parse, events.subscribe, new AbortController().signal)).rejects.toThrow("offline");
		const controller = new AbortController();
		const cancelled = waitForMowerReadback(() => new Promise(() => {}), parse, events.subscribe, controller.signal);
		controller.abort();
		await expect(cancelled).rejects.toThrow("cancelled");
		vi.useFakeTimers();
		try {
			const timed = waitForMowerReadback(async () => ({ id: 1 }), parse, events.subscribe, new AbortController().signal, 20);
			const rejected = expect(timed).rejects.toThrow("timed out");
			await vi.advanceTimersByTimeAsync(20);
			await rejected;
		} finally { vi.useRealTimers(); }
		expect(events.listeners.size).toBe(0);
	});
});
