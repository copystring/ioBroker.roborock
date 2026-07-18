export interface ApkTimingRuntimeOptions {
	emitTimers(timerIds: readonly number[]): void | Promise<void>;
	nowWallClockMs?(): number;
	onError?(error: Error): void;
}

interface ScheduledTimer {
	id: number;
	delayMs: number;
	dueAtWallClockMs: number;
	repeats: boolean;
	handle: NodeJS.Timeout;
}

export interface ApkScheduledTimerSnapshot {
	id: number;
	delayMs: number;
	remainingMs: number;
	repeats: boolean;
}

function javaInt(value: number, name: string): number {
	if (!Number.isFinite(value)) throw new Error(`${name} muss endlich sein`);
	return Math.trunc(value);
}

const MAX_NODE_TIMER_DELAY_MS = 0x7fff_ffff;
const MIN_REPEATING_TIMER_DELAY_MS = 16;

/**
 * Reproduces TimingModule's observable create/delete timer boundary. Timer
 * callbacks return through JSTimers.callTimers, just as in the Android host.
 */
export class ApkTimingRuntime {
	readonly #timers = new Map<number, ScheduledTimer>();
	readonly #nowWallClockMs: () => number;
	#sendIdleEvents = false;

	public constructor(private readonly options: ApkTimingRuntimeOptions) {
		this.#nowWallClockMs = options.nowWallClockMs ?? Date.now;
	}

	public createTimer(
		timerIdValue: number,
		durationValue: number,
		jsSchedulingTimeValue: number,
		repeats: boolean,
	): void {
		const timerId = javaInt(timerIdValue, "timerId");
		const durationMs = javaInt(durationValue, "duration");
		const jsSchedulingTimeMs = javaInt(jsSchedulingTimeValue, "jsSchedulingTime");
		const delayMs = Math.max(
			repeats ? MIN_REPEATING_TIMER_DELAY_MS : 0,
			jsSchedulingTimeMs - this.#nowWallClockMs() + durationMs,
		);
		this.deleteTimer(timerId);
		if (durationMs === 0 && !repeats) {
			this.#emit([timerId]);
			return;
		}
		this.#schedule(timerId, delayMs, repeats);
	}

	public deleteTimer(timerIdValue: number): void {
		const timerId = javaInt(timerIdValue, "timerId");
		const timer = this.#timers.get(timerId);
		if (!timer) return;
		clearTimeout(timer.handle);
		this.#timers.delete(timerId);
	}

	public setSendIdleEvents(sendIdleEvents: boolean): void {
		this.#sendIdleEvents = sendIdleEvents;
	}

	public sendIdleEvents(): boolean {
		return this.#sendIdleEvents;
	}

	public activeTimerIds(): number[] {
		return [...this.#timers.keys()].sort((left, right) => left - right);
	}

	public activeTimers(): ApkScheduledTimerSnapshot[] {
		const nowWallClockMs = this.#nowWallClockMs();
		return [...this.#timers.values()]
			.map(timer => ({
				id: timer.id,
				delayMs: timer.delayMs,
				remainingMs: Math.max(0, timer.dueAtWallClockMs - nowWallClockMs),
				repeats: timer.repeats,
			}))
			.sort((left, right) => left.id - right.id);
	}

	public nextOneShotDelayMs(maximumDelayMs: number): number | undefined {
		if (!Number.isFinite(maximumDelayMs) || maximumDelayMs < 0) {
			throw new Error("maximumDelayMs muss eine nichtnegative endliche Zahl sein");
		}
		const delays = this.activeTimers()
			.filter(timer => !timer.repeats && timer.remainingMs <= maximumDelayMs)
			.map(timer => timer.remainingMs);
		return delays.length === 0 ? undefined : Math.min(...delays);
	}

	public dispose(): void {
		for (const timer of this.#timers.values()) clearTimeout(timer.handle);
		this.#timers.clear();
	}

	#schedule(
		timerId: number,
		delayMs: number,
		repeats: boolean,
		dueAtWallClockMs = this.#nowWallClockMs() + delayMs,
	): void {
		const remainingMs = Math.max(0, dueAtWallClockMs - this.#nowWallClockMs());
		const armedDelayMs = Math.min(remainingMs, MAX_NODE_TIMER_DELAY_MS);
		const handle = setTimeout(() => {
			const timer = this.#timers.get(timerId);
			if (!timer || timer.handle !== handle) return;
			if (this.#nowWallClockMs() < dueAtWallClockMs) {
				this.#schedule(timerId, delayMs, repeats, dueAtWallClockMs);
				return;
			}
			if (repeats) this.#schedule(timerId, delayMs, true);
			else this.#timers.delete(timerId);
			this.#emit([timerId]);
		}, armedDelayMs);
		handle.unref();
		this.#timers.set(timerId, {
			id: timerId,
			delayMs,
			dueAtWallClockMs,
			repeats,
			handle,
		});
	}

	#emit(timerIds: readonly number[]): void {
		try {
			const result = this.options.emitTimers(timerIds);
			if (result instanceof Promise) result.catch(error => this.#report(error));
		} catch (error) {
			this.#report(error);
		}
	}

	#report(error: unknown): void {
		this.options.onError?.(error instanceof Error ? error : new Error(String(error)));
	}
}
