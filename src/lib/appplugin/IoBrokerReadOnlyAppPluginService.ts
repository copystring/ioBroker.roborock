import type {
	ApkAppPluginModelRuntime,
	ApkAppPluginModelRuntimeLease,
	ApkAppPluginModelRuntimeStatus,
	ApkAppPluginRootLease,
	ApkDeviceIngressRouter,
	ApkJsonDeviceIngressObservation,
	ApkReadOnlyProbeResult,
	ApkReadOnlyProbeRootOptions,
} from "../../apppluginHost";
import { isIoBrokerAppPluginStatusResponse } from "./IoBrokerReadOnlyAppPluginRuntime";

export type IoBrokerReadOnlyAppPluginServiceState =
	| "idle"
	| "starting"
	| "running"
	| "stopping"
	| "failed"
	| "stopped";

export interface IoBrokerReadOnlyAppPluginServiceStartRequest {
	readonly deviceProperties: Readonly<Record<string, unknown>>;
	readonly restart?: boolean;
	readonly targetDuid: string;
	readonly timestampMs?: number;
}

export interface IoBrokerReadOnlyAppPluginActiveSessionStatus {
	readonly activeTime: number;
	readonly deviceId: string;
	readonly latestResponse?: ApkReadOnlyProbeResult;
	readonly model: string;
	readonly rootTag: number;
	readonly startedAt: number;
}

export interface IoBrokerReadOnlyAppPluginServiceStatus {
	readonly active?: IoBrokerReadOnlyAppPluginActiveSessionStatus;
	readonly enabled: boolean;
	readonly models: readonly ApkAppPluginModelRuntimeStatus[];
	readonly state: IoBrokerReadOnlyAppPluginServiceState;
}

export interface IoBrokerReadOnlyAppPluginServiceRuntime {
	invalidateModel(model: string): Promise<void>;
	openDevice(request: Readonly<{
		deviceProperties: Readonly<Record<string, unknown>>;
		targetDuid: string;
		timestampMs?: number;
	}>): Promise<ApkAppPluginModelRuntimeLease<ApkAppPluginModelRuntime>>;
	shutdown(): Promise<void>;
	status(): readonly ApkAppPluginModelRuntimeStatus[];
}

interface ActiveSession {
	readonly activeTime: number;
	readonly deviceId: string;
	latestResponse?: ApkReadOnlyProbeResult;
	readonly model: string;
	readonly modelLease: ApkAppPluginModelRuntimeLease<ApkAppPluginModelRuntime>;
	readonly rootLease: ApkAppPluginRootLease;
	readonly startedAt: number;
}

interface PendingResponse {
	readonly activeTime: number;
	readonly deviceId: string;
	readonly model: string;
	readonly promise: Promise<ApkReadOnlyProbeResult>;
	readonly startedAt: number;
	reject(error: unknown): void;
	resolve(value: ApkReadOnlyProbeResult): void;
}

function positiveInteger(value: number, label: string): number {
	if (!Number.isSafeInteger(value) || value <= 0) {
		throw new Error(`${label} muss eine positive ganze Zahl sein`);
	}
	return value;
}

function parseDps(serializedDps: string): unknown {
	try {
		return JSON.parse(serializedDps);
	} catch {
		return serializedDps;
	}
}

function pendingResponse(
	deviceId: string,
	activeTime: number,
	model: string,
	startedAt: number,
): PendingResponse {
	let resolve!: (value: ApkReadOnlyProbeResult) => void;
	let reject!: (error: unknown) => void;
	const promise = new Promise<ApkReadOnlyProbeResult>((resolvePromise, rejectPromise) => {
		resolve = resolvePromise;
		reject = rejectPromise;
	});
	return { activeTime, deviceId, model, promise, reject, resolve, startedAt };
}

/**
 * Owns exactly one opt-in original-AppPlugin root across multiple read
 * requests. The unchanged bundle still chooses and serializes device RPCs;
 * this owner only enforces lifecycle, response correlation and cleanup.
 */
export class IoBrokerReadOnlyAppPluginService {
	readonly #root: Readonly<ApkReadOnlyProbeRootOptions>;
	readonly #runtime: IoBrokerReadOnlyAppPluginServiceRuntime;
	readonly #timeoutMilliseconds: number;
	readonly #unsubscribe: () => void;
	#active?: ActiveSession;
	#operation: Promise<void> = Promise.resolve();
	#pending?: PendingResponse;
	#shutdown?: Promise<void>;
	#shutdownRequested = false;
	#startController?: AbortController;
	#state: IoBrokerReadOnlyAppPluginServiceState = "idle";

	public constructor(
		runtime: IoBrokerReadOnlyAppPluginServiceRuntime,
		ingressRouter: Pick<ApkDeviceIngressRouter, "subscribeJson">,
		options: Readonly<{
			root: Readonly<ApkReadOnlyProbeRootOptions>;
			timeoutMilliseconds?: number;
		}>,
	) {
		this.#runtime = runtime;
		this.#root = Object.freeze({ ...options.root });
		this.#timeoutMilliseconds = positiveInteger(
			options.timeoutMilliseconds ?? 20_000,
			"AppPlugin-Dienst-Timeout",
		);
		this.#unsubscribe = ingressRouter.subscribeJson(
			observation => this.#acceptObservation(observation),
		);
	}

	public start(
		requestValue: Readonly<IoBrokerReadOnlyAppPluginServiceStartRequest>,
	): Promise<ApkReadOnlyProbeResult> {
		const targetDuid = requestValue.targetDuid.trim();
		if (targetDuid.length === 0) {
			return Promise.reject(new Error("AppPlugin-Dienst benötigt eine Geräte-ID"));
		}
		if (this.#shutdownRequested) {
			return Promise.reject(new Error("Der AppPlugin-Dienst wurde bereits beendet"));
		}
		if (requestValue.restart) this.#startController?.abort(
			new Error("Die AppPlugin-Sitzung wird neu gestartet"),
		);
		return this.#enqueue(async () => {
			if (this.#shutdownRequested) {
				throw new Error("Der AppPlugin-Dienst wurde bereits beendet");
			}
			if (
				!requestValue.restart
				&& this.#active?.deviceId === targetDuid
				&& this.#active.latestResponse
			) {
				return this.#active.latestResponse;
			}
			await this.#closeActive();
			return this.#open({
				...requestValue,
				targetDuid,
			});
		});
	}

	public stop(): Promise<void> {
		if (this.#shutdownRequested) return Promise.resolve();
		this.#startController?.abort(new Error("Die AppPlugin-Sitzung wurde gestoppt"));
		return this.#enqueue(async () => {
			await this.#closeActive();
			this.#state = "idle";
		});
	}

	public status(): IoBrokerReadOnlyAppPluginServiceStatus {
		const active = this.#active;
		return Object.freeze({
			active: active
				? Object.freeze({
					activeTime: active.activeTime,
					deviceId: active.deviceId,
					latestResponse: active.latestResponse,
					model: active.model,
					rootTag: active.rootLease.rootTag,
					startedAt: active.startedAt,
				})
				: undefined,
			enabled: this.#state === "starting"
				|| this.#state === "running"
				|| this.#state === "stopping",
			models: this.#runtime.status(),
			state: this.#state,
		});
	}

	public shutdown(): Promise<void> {
		if (this.#shutdown) return this.#shutdown;
		this.#shutdownRequested = true;
		this.#startController?.abort(new Error("Der Adapter wird beendet"));
		this.#shutdown = this.#enqueue(async () => {
			const errors: unknown[] = [];
			try {
				await this.#closeActive();
			} catch (error) {
				errors.push(error);
			}
			this.#unsubscribe();
			try {
				await this.#runtime.shutdown();
			} catch (error) {
				errors.push(error);
			}
			this.#state = errors.length === 0 ? "stopped" : "failed";
			if (errors.length > 0) {
				throw new AggregateError(
					errors,
					"Der langlebige AppPlugin-Dienst konnte nicht sauber beendet werden",
				);
			}
		});
		return this.#shutdown;
	}

	async #open(
		request: Readonly<IoBrokerReadOnlyAppPluginServiceStartRequest>,
	): Promise<ApkReadOnlyProbeResult> {
		this.#state = "starting";
		const startedAt = Date.now();
		const controller = new AbortController();
		this.#startController = controller;
		let modelLease: ApkAppPluginModelRuntimeLease<ApkAppPluginModelRuntime> | undefined;
		let rootLease: ApkAppPluginRootLease | undefined;
		let pending: PendingResponse | undefined;
		let timer: ReturnType<typeof setTimeout> | undefined;
		let abortListener: (() => void) | undefined;
		try {
			modelLease = await this.#runtime.openDevice({
				deviceProperties: request.deviceProperties,
				targetDuid: request.targetDuid,
				timestampMs: request.timestampMs,
			});
			pending = pendingResponse(
				modelLease.deviceId,
				modelLease.activeTime,
				modelLease.model,
				startedAt,
			);
			this.#pending = pending;
			rootLease = await modelLease.runtime.openRoot({ ...this.#root });
			const timeout = new Promise<never>((_resolve, reject) => {
				timer = setTimeout(
					() => reject(new Error(
						`AppPlugin-Dienst erhielt innerhalb von ${this.#timeoutMilliseconds} ms keine korrelierte Antwort`,
					)),
					this.#timeoutMilliseconds,
				);
			});
			const aborted = new Promise<never>((_resolve, reject) => {
				abortListener = () => reject(
					controller.signal.reason ?? new Error("AppPlugin-Dienststart wurde abgebrochen"),
				);
				controller.signal.addEventListener("abort", abortListener, { once: true });
				if (controller.signal.aborted) abortListener();
			});
			const response = await Promise.race([pending.promise, timeout, aborted]);
			const active: ActiveSession = {
				activeTime: modelLease.activeTime,
				deviceId: modelLease.deviceId,
				latestResponse: response,
				model: modelLease.model,
				modelLease,
				rootLease,
				startedAt,
			};
			this.#active = active;
			this.#state = "running";
			modelLease = undefined;
			rootLease = undefined;
			return response;
		} catch (primaryError) {
			this.#state = "failed";
			const cleanupErrors = await this.#releaseLeases(rootLease, modelLease);
			if (modelLease) {
				try {
					await this.#runtime.invalidateModel(modelLease.model);
				} catch (error) {
					cleanupErrors.push(error);
				}
			}
			if (cleanupErrors.length > 0) {
				throw new AggregateError(
					[primaryError, ...cleanupErrors],
					"AppPlugin-Dienststart und sein Cleanup sind fehlgeschlagen",
				);
			}
			throw primaryError;
		} finally {
			if (timer) clearTimeout(timer);
			if (abortListener) controller.signal.removeEventListener("abort", abortListener);
			if (this.#pending === pending) this.#pending = undefined;
			if (this.#startController === controller) this.#startController = undefined;
		}
	}

	#acceptObservation(observation: Readonly<ApkJsonDeviceIngressObservation>): void {
		if (!observation.result.rpcAccepted || !isIoBrokerAppPluginStatusResponse(observation.result)) {
			return;
		}
		const pending = this.#pending;
		const active = this.#active;
		const startedAt = active?.startedAt ?? pending?.startedAt ?? Date.now();
		const matchesPending = pending
			&& pending.deviceId === observation.deviceId
			&& pending.activeTime === observation.activeTime;
		const matchesActive = active
			&& active.deviceId === observation.deviceId
			&& active.activeTime === observation.activeTime;
		if (!matchesPending && !matchesActive) return;
		const result: ApkReadOnlyProbeResult = Object.freeze({
			activeTime: observation.activeTime,
			deviceId: observation.deviceId,
			elapsedMilliseconds: Math.max(0, Date.now() - startedAt),
			model: active?.model ?? pending?.model ?? "unknown",
			parsedDps: parseDps(observation.serializedDps),
			protocolVersion: observation.protocolVersion,
			rpcMethod: observation.result.rpcMethod,
			rpcParameters: observation.result.rpcParameters,
			serializedDps: observation.serializedDps,
		});
		if (matchesActive && active) active.latestResponse = result;
		if (matchesPending && pending) pending.resolve(result);
	}

	async #closeActive(): Promise<void> {
		const active = this.#active;
		if (!active) {
			if (this.#state !== "failed") this.#state = "idle";
			return;
		}
		this.#state = "stopping";
		this.#active = undefined;
		const errors = await this.#releaseLeases(active.rootLease, active.modelLease);
		try {
			await this.#runtime.invalidateModel(active.model);
		} catch (error) {
			errors.push(error);
		}
		if (errors.length > 0) {
			this.#state = "failed";
			throw new AggregateError(errors, "AppPlugin-Sitzung konnte nicht sauber geschlossen werden");
		}
		this.#state = "idle";
	}

	async #releaseLeases(
		rootLease?: ApkAppPluginRootLease,
		modelLease?: ApkAppPluginModelRuntimeLease<ApkAppPluginModelRuntime>,
	): Promise<unknown[]> {
		const errors: unknown[] = [];
		for (const operation of [
			...(rootLease ? [() => rootLease.release()] : []),
			...(modelLease ? [() => modelLease.release()] : []),
		]) {
			try {
				await operation();
			} catch (error) {
				errors.push(error);
			}
		}
		return errors;
	}

	#enqueue<T>(operation: () => Promise<T>): Promise<T> {
		const result = this.#operation.then(operation, operation);
		this.#operation = result.then(() => undefined, () => undefined);
		return result;
	}
}
