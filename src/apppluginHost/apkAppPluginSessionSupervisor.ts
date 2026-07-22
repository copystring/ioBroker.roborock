import { apkMainPluginPackageKey } from "./apkPluginPackageInstaller";

/**
 * The APK's `com.roborock.smart.react.o0000O00` keeps production React hosts
 * in an access-ordered model cache and evicts entries above three. A visible
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

export interface ApkAppPluginModelRuntimeRequest<TContext = unknown> {
	readonly activeTime: number;
	readonly context: TContext;
	readonly deviceId: string;
	readonly model: string;
}

export type ApkAppPluginManagedModelRuntimeFactory<
	TRuntime extends ApkAppPluginManagedModelRuntime = ApkAppPluginManagedModelRuntime,
	TContext = unknown,
> = (
	request: Readonly<ApkAppPluginModelRuntimeRequest<TContext>>,
) => TRuntime | Promise<TRuntime>;

export interface ApkAppPluginModelRuntimeStatus {
	readonly activeTime: number;
	readonly activeLeases: number;
	readonly deviceId: string;
	readonly model: string;
	readonly state: ApkAppPluginManagedRuntimeState;
}

interface RuntimeSlot<
	TRuntime extends ApkAppPluginManagedModelRuntime,
	TContext,
> {
	activeLeases: number;
	lastAccess: number;
	request: Readonly<ApkAppPluginModelRuntimeRequest<TContext>>;
	runtime?: TRuntime;
	start: Promise<TRuntime>;
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

export interface ApkAppPluginModelRuntimeLease<
	TRuntime extends ApkAppPluginManagedModelRuntime = ApkAppPluginManagedModelRuntime,
> {
	readonly activeTime: number;
	readonly deviceId: string;
	readonly model: string;
	readonly runtime: TRuntime;
	release(): Promise<void>;
}

function runtimeRequest<TContext>(
	value: Readonly<ApkAppPluginModelRuntimeRequest<TContext>>,
): Readonly<ApkAppPluginModelRuntimeRequest<TContext>> {
	const model = apkMainPluginPackageKey(value.model);
	if (typeof value.deviceId !== "string" || value.deviceId.trim().length === 0) {
		throw new Error("Die AppPlugin-Geräte-ID darf nicht leer sein");
	}
	if (!Number.isFinite(value.activeTime) || value.activeTime < 0) {
		throw new Error("Die AppPlugin-Aktivierungszeit muss eine nichtnegative Zahl sein");
	}
	return Object.freeze({
		activeTime: value.activeTime,
		context: value.context,
		deviceId: value.deviceId,
		model,
	});
}

function sameDeviceContext<TContext>(
	left: Readonly<ApkAppPluginModelRuntimeRequest<TContext>>,
	right: Readonly<ApkAppPluginModelRuntimeRequest<TContext>>,
): boolean {
	return left.deviceId === right.deviceId && left.activeTime === right.activeTime;
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
export class ApkAppPluginSessionSupervisor<
	TRuntime extends ApkAppPluginManagedModelRuntime = ApkAppPluginManagedModelRuntime,
	TContext = unknown,
> {
	readonly #slots = new Map<string, RuntimeSlot<TRuntime, TContext>>();
	readonly #modelOperations = new Map<string, Promise<void>>();
	#accessRevision = 0;
	#shutdownRequested = false;
	#shutdown?: Promise<void>;

	public constructor(
		private readonly factory: ApkAppPluginManagedModelRuntimeFactory<TRuntime, TContext>,
		private readonly cacheLimit = APK_APPPLUGIN_MODEL_RUNTIME_CACHE_LIMIT,
	) {
		if (!Number.isSafeInteger(cacheLimit) || cacheLimit < 1) {
			throw new Error("Das AppPlugin-Runtime-Cachelimit muss eine positive ganze Zahl sein");
		}
	}

	public async open(
		requestValue: Readonly<ApkAppPluginModelRuntimeRequest<TContext>>,
	): Promise<ApkAppPluginModelRuntimeLease<TRuntime>> {
		const request = runtimeRequest(requestValue);
		const slot = await this.#withModelOperation(request.model, async () => {
			if (this.#shutdownRequested) {
				throw new Error("Der AppPlugin-Sitzungssupervisor wurde bereits beendet");
			}
			let selected = this.#slots.get(request.model);
			if (selected && !sameDeviceContext(selected.request, request)) {
				if (selected.activeLeases > 0) {
					throw new Error(
						`AppPlugin-Modell ${request.model} ist noch für Gerät ${selected.request.deviceId} geöffnet`,
					);
				}
				this.#slots.delete(request.model);
				await this.#stopSlot(selected);
				selected = undefined;
				if (this.#shutdownRequested) {
					throw new Error("Der AppPlugin-Sitzungssupervisor wurde während des Gerätewechsels beendet");
				}
			}
			if (!selected) {
				selected = this.#createSlot(request);
				this.#slots.set(request.model, selected);
			}
			selected.lastAccess = ++this.#accessRevision;
			selected.activeLeases += 1;
			return selected;
		});
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
				activeTime: slot.request.activeTime,
				deviceId: slot.request.deviceId,
				model: slot.request.model,
				runtime,
				release: async () => {
					if (released) return;
					released = true;
					await this.#releaseReservation(slot);
					await this.#evictOverflow();
				},
			};
		} catch (error) {
			await this.#releaseReservation(slot);
			throw error;
		}
	}

	public status(): readonly ApkAppPluginModelRuntimeStatus[] {
		return [...this.#slots.values()]
			.sort((left, right) => right.lastAccess - left.lastAccess)
			.map(slot => ({
				activeTime: slot.request.activeTime,
				activeLeases: slot.activeLeases,
				deviceId: slot.request.deviceId,
				model: slot.request.model,
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

	#createSlot(
		request: Readonly<ApkAppPluginModelRuntimeRequest<TContext>>,
	): RuntimeSlot<TRuntime, TContext> {
		const started = deferred<TRuntime>();
		const slot: RuntimeSlot<TRuntime, TContext> = {
			activeLeases: 0,
			lastAccess: ++this.#accessRevision,
			request,
			start: started.promise,
			state: "starting",
		};
		void (async () => {
			let runtime: TRuntime | undefined;
			try {
				runtime = await this.factory(request);
				slot.runtime = runtime;
				await runtime.start();
				slot.state = "running";
				started.resolve(runtime);
			} catch (error) {
				slot.state = "failed";
				if (this.#slots.get(request.model) === slot) this.#slots.delete(request.model);
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
		const evictions: RuntimeSlot<TRuntime, TContext>[] = [];
		while (this.#slots.size > this.cacheLimit) {
			const candidate = [...this.#slots.values()]
				.filter(slot => slot.activeLeases === 0 && slot.state === "running")
				.sort((left, right) => left.lastAccess - right.lastAccess)[0];
			if (!candidate) break;
			this.#slots.delete(candidate.request.model);
			evictions.push(candidate);
		}
		const results = await Promise.allSettled(evictions.map(slot => this.#stopSlot(slot)));
		const failure = results.find(
			(result): result is PromiseRejectedResult => result.status === "rejected",
		);
		if (failure) throw failure.reason;
	}

	async #stopSlot(slot: RuntimeSlot<TRuntime, TContext>): Promise<void> {
		try {
			await slot.start;
		} catch {
			return;
		}
		await this.#stopRuntime(slot);
	}

	#stopRuntime(slot: RuntimeSlot<TRuntime, TContext>): Promise<void> {
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

	#releaseReservation(slot: RuntimeSlot<TRuntime, TContext>): Promise<void> {
		return this.#withModelOperation(slot.request.model, async () => {
			if (slot.activeLeases > 0) slot.activeLeases -= 1;
		});
	}

	async #withModelOperation<T>(model: string, operation: () => Promise<T>): Promise<T> {
		const previous = this.#modelOperations.get(model) ?? Promise.resolve();
		const result = previous.catch(() => undefined).then(operation);
		const tail = result.then(() => undefined, () => undefined);
		this.#modelOperations.set(model, tail);
		try {
			return await result;
		} finally {
			if (this.#modelOperations.get(model) === tail) {
				this.#modelOperations.delete(model);
			}
		}
	}
}
