import { afterEach, describe, expect, it, vi } from "vitest";

import { ApkTimingRuntime } from "../../src/apppluginHost/apkTimingRuntime";

describe("APK Timing runtime", () => {
	afterEach(() => vi.useRealTimers());

	it("corrects for JS scheduling time and emits through JSTimers", async () => {
		vi.useFakeTimers();
		vi.setSystemTime(10_000);
		const emitTimers = vi.fn();
		const runtime = new ApkTimingRuntime({ emitTimers });

		runtime.createTimer(7, 200, 9_950, false);
		expect(runtime.activeTimerIds()).toEqual([7]);
		expect(runtime.activeTimers()).toEqual([{
			id: 7,
			delayMs: 150,
			remainingMs: 150,
			repeats: false,
		}]);
		expect(runtime.nextOneShotDelayMs(1_000)).toBe(150);
		await vi.advanceTimersByTimeAsync(149);
		expect(runtime.nextOneShotDelayMs(1_000)).toBe(1);
		expect(emitTimers).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(1);
		expect(emitTimers).toHaveBeenCalledWith([7]);
		expect(runtime.activeTimerIds()).toEqual([]);
		expect(runtime.nextOneShotDelayMs(1_000)).toBeUndefined();
	});

	it("fires zero-delay one-shot timers immediately and supports deletion", async () => {
		vi.useFakeTimers();
		vi.setSystemTime(20_000);
		const emitTimers = vi.fn();
		const runtime = new ApkTimingRuntime({ emitTimers });

		runtime.createTimer(1, 0, 20_000, false);
		expect(emitTimers).toHaveBeenCalledWith([1]);
		runtime.createTimer(2, 500, 20_000, false);
		runtime.deleteTimer(2);
		await vi.advanceTimersByTimeAsync(500);
		expect(emitTimers).toHaveBeenCalledTimes(1);
	});

	it("reschedules repeating timers with the APK-adjusted interval", async () => {
		vi.useFakeTimers();
		vi.setSystemTime(30_000);
		const emitTimers = vi.fn();
		const runtime = new ApkTimingRuntime({ emitTimers });

		runtime.createTimer(3, 100, 29_980, true);
		expect(runtime.nextOneShotDelayMs(1_000)).toBeUndefined();
		await vi.advanceTimersByTimeAsync(160);
		expect(emitTimers).toHaveBeenCalledTimes(2);
		runtime.dispose();
		expect(runtime.activeTimerIds()).toEqual([]);
	});

	it("clamps zero-delay repeating timers to one display frame", async () => {
		vi.useFakeTimers();
		vi.setSystemTime(40_000);
		const emitTimers = vi.fn();
		const runtime = new ApkTimingRuntime({ emitTimers });

		runtime.createTimer(4, 0, 40_000, true);
		expect(runtime.activeTimers()).toEqual([{
			id: 4,
			delayMs: 16,
			remainingMs: 16,
			repeats: true,
		}]);
		await vi.advanceTimersByTimeAsync(15);
		expect(emitTimers).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(1);
		expect(emitTimers).toHaveBeenCalledOnce();
		runtime.dispose();
	});

	it("chunks delays beyond Node's signed 32-bit timer boundary without firing early", async () => {
		vi.useFakeTimers();
		vi.setSystemTime(50_000);
		const emitTimers = vi.fn();
		const runtime = new ApkTimingRuntime({ emitTimers });
		const maximumNodeDelay = 0x7fff_ffff;

		runtime.createTimer(5, maximumNodeDelay + 1_000, 50_000, false);
		await vi.advanceTimersByTimeAsync(maximumNodeDelay);
		expect(emitTimers).not.toHaveBeenCalled();
		expect(runtime.activeTimers()[0]?.remainingMs).toBe(1_000);
		await vi.advanceTimersByTimeAsync(999);
		expect(emitTimers).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(1);
		expect(emitTimers).toHaveBeenCalledWith([5]);
	});

	it("rejects invalid one-shot settling bounds", () => {
		const runtime = new ApkTimingRuntime({ emitTimers: vi.fn() });

		expect(() => runtime.nextOneShotDelayMs(-1)).toThrow(/nichtnegative/);
		expect(() => runtime.nextOneShotDelayMs(Number.NaN)).toThrow(/endlich/);
	});
});
