import { apkMainPluginPackageKey } from "./apkPluginPackageInstaller";

/**
 * The APK's `AbstractC5374o0000O00` keeps production React hosts in an
 * access-ordered model cache and evicts entries above three. A visible
 * activity temporarily owns a root, while the model runtime may remain cached.
 */
export const APK_APPPLUGIN_MODEL_RUNTIME_CACHE_LIMIT = 3;

export type ApkAppPluginManagedRuntimeState =
	| "starting"
	| "running"
	| "stopping"
	| "stopped"
	| "failed";

export interface ApkAppPluginManagedModelRuntime {
	start(): Promise<void>;
	stop(): Promise<void>;
}

export type ApkAppPluginManagedModelRuntimeFactory = (
	model: string,
) => ApkAppPluginManagedModelRuntime | Promise<ApkAppPluginManagedModelRuntime>;

export interface ApkAppPluginModelRuntimeStatus {
	readonly activeLeases: number;
	readonly model: string;
	readonly state: ApkAppPluginManagedRuntimeState;
}

interface RuntimeSlot {
	activeLeases: number;
	lastAccess: number;
	model: string;
	runtime?: ApkAppPluginManagedModelRuntime;
	start: Promise<ApkAppPluginManagedModelRuntime>;
	state: ApkAppPluginManagedRuntimeState;
	stop?: Promise<void>;
}

interface Deferred<T> {
	readonly promise: Promise<T>;
	reject(error: unknown): void;
	resolve(value: T): void;
}

function deferred<T>(): Deferred<T> {
	let resolve!: (value: T) => void;
	let reject!: (error: unknown) => void;
	const promise = new Promise<T>((resolvePromise, rejectPromise) => {
		resolve = resolvePromise;
		reject = rejectPromise;
	});
	return { promise, reject, resolve };
}

export interface ApkAppPluginModelRuntimeLease {
	readonly model: string;
	readonly runtime: ApkAppPluginManagedModelRuntime;
	release(): Promise<void>;
}

/**
 * Owns model runtimes and their bounded lifecycle without knowing any vacuum,
 * mower, washer, map or command semantics.
 *
 * `open` returns an explicit lease. Releasing a lease detaches ownership but
 * intentionally keeps the runtime eligible for APK-compatible LRU reuse.
 * Adapter shutdown stops every runtime, including leased and still-starting
 * ones, and rejects all future opens.
 */
export class ApkAppPluginSessionSupervisor {
	readonly #slots = new Map<string, RuntimeSlot>();
	#accessRevision = 0;
	#shutdownRequested = false;
	#shutdown?: Promise<void>;

	public constructor(
		private readonly factory: ApkAppPluginManagedModelRuntimeFactory,
		private readonly cacheLimit = APK_APPPLUGIN_MODEL_RUNTIME_CACHE_LIMIT,
	) {
		if (!Number.isSafeInteger(cacheLimit) || cacheLimit < 1) {
			throw new Error("Das AppPlugin-Runtime-Cachelimit muss eine positive ganze Zahl sein");
		}
	}

	public async open(modelValue: string): Promise<ApkAppPluginModelRuntimeLease> {
		if (this.#shutdownRequested) {
			throw new Error("Der AppPlugin-Sitzungssupervisor wurde bereits beendet");
		}
		const model = apkMainPluginPackageKey(modelValue);
		let slot = this.#slots.get(model);
		if (!slot) {
			slot = this.#createSlot(model);
			this.#slots.set(model, slot);
		}
		slot.lastAccess = ++this.#accessRevision;
		slot.activeLeases += 1;
		try {
			const runtime = await slot.start;
			if (this.#shutdownRequested || slot.state !== "running") {
				throw new Error("Der AppPlugin-Sitzungssupervisor wurde während des Starts beendet");
			}
			await this.#evictOverflow();
			if (this.#shutdownRequested || slot.state !== "running") {
				throw new Error("Der AppPlugin-Sitzungssupervisor wurde während des Öffnens beendet");
			}
			let released = false;
			return {
				model,
				runtime,
				release: async () => {
					if (released) return;
					released = true;
					slot.activeLeases -= 1;
					await this.#evictOverflow();
				},
			};
		} catch (error) {
			slot.activeLeases -= 1;
			throw error;
		}
	}

	public status(): readonly ApkAppPluginModelRuntimeStatus[] {
		return [...this.#slots.values()]
			.sort((left, right) => right.lastAccess - left.lastAccess)
			.map(slot => ({
				activeLeases: slot.activeLeases,
				model: slot.model,
				state: slot.state,
			}));
	}

	/**
	 * Drops one inactive cached model, for example after package replacement.
	 */
	public async invalidate(modelValue: string): Promise<void> {
		const model = apkMainPluginPackageKey(modelValue);
		const slot = this.#slots.get(model);
		if (!slot) return;
		if (slot.activeLeases > 0) {
			throw new Error(`AppPlugin-Runtime ${model} besitzt noch aktive Sitzungen`);
		}
		this.#slots.delete(model);
		await this.#stopSlot(slot);
	}

	public shutdown(): Promise<void> {
		if (this.#shutdown) return this.#shutdown;
		this.#shutdownRequested = true;
		const slots = [...this.#slots.values()];
		this.#slots.clear();
		this.#shutdown = (async () => {
			const results = await Promise.allSettled(slots.map(slot => this.#stopSlot(slot)));
			const errors = results
				.filter((result): result is PromiseRejectedResult => result.status === "rejected")
				.map(result => result.reason);
			if (errors.length > 0) {
				throw new AggregateError(errors, "Mindestens eine AppPlugin-Runtime konnte nicht sauber beendet werden");
			}
		})();
		return this.#shutdown;
	}

	#createSlot(model: string): RuntimeSlot {
		const started = deferred<ApkAppPluginManagedModelRuntime>();
		const slot: RuntimeSlot = {
			activeLeases: 0,
			lastAccess: ++this.#accessRevision,
			model,
			start: started.promise,
			state: "starting",
		};
		void (async () => {
			let runtime: ApkAppPluginManagedModelRuntime | undefined;
			try {
				runtime = await this.factory(model);
				slot.runtime = runtime;
				await runtime.start();
				slot.state = "running";
				started.resolve(runtime);
			} catch (error) {
				slot.state = "failed";
				if (this.#slots.get(model) === slot) this.#slots.delete(model);
				if (runtime && !slot.stop) {
					try {
						await this.#stopRuntime(slot);
					} catch {
						// The original start failure remains the public cause.
					}
				}
				started.reject(error);
			}
		})();
		return slot;
	}

	async #evictOverflow(): Promise<void> {
		const evictions: RuntimeSlot[] = [];
		while (this.#slots.size > this.cacheLimit) {
			const candidate = [...this.#slots.values()]
				.filter(slot => slot.activeLeases === 0 && slot.state === "running")
				.sort((left, right) => left.lastAccess - right.lastAccess)[0];
			if (!candidate) break;
			this.#slots.delete(candidate.model);
			evictions.push(candidate);
		}
		const results = await Promise.allSettled(evictions.map(slot => this.#stopSlot(slot)));
		const failure = results.find(
			(result): result is PromiseRejectedResult => result.status === "rejected",
		);
		if (failure) throw failure.reason;
	}

	async #stopSlot(slot: RuntimeSlot): Promise<void> {
		try {
			await slot.start;
		} catch {
			return;
		}
		await this.#stopRuntime(slot);
	}

	#stopRuntime(slot: RuntimeSlot): Promise<void> {
		if (slot.stop) return slot.stop;
		if (!slot.runtime) return Promise.resolve();
		slot.state = "stopping";
		slot.stop = slot.runtime.stop().then(
			() => {
				slot.state = "stopped";
			},
			error => {
				slot.state = "failed";
				throw error;
			},
		);
		return slot.stop;
	}
}
