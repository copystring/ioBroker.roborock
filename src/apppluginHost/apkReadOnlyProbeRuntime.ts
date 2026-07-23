import type {
	ApkAppPluginDeviceOpenRequest,
} from "./apkAppPluginDeviceSessionRuntime";
import type { ApkAppPluginModelRuntime } from "./apkAppPluginModelRuntime";
import type { ApkAppPluginModelRuntimeLease } from "./apkAppPluginSessionSupervisor";
import type {
	ApkJsonDeviceIngressObservation,
	ApkDeviceIngressRouter,
} from "./apkDeviceIngressRouter";

export interface ApkReadOnlyProbeSession {
	openDevice(
		request: Readonly<ApkAppPluginDeviceOpenRequest>,
	): Promise<ApkAppPluginModelRuntimeLease<ApkAppPluginModelRuntime>>;
	shutdown(): Promise<void>;
}

export interface ApkReadOnlyProbeRootOptions {
	readonly androidApiLevel?: number;
	readonly density: number;
	readonly direction?: "ltr" | "rtl";
	readonly doLeftAndRightSwapInRTL?: boolean;
	readonly fontScale: number;
	readonly height: number;
	readonly initialProps: Readonly<Record<string, unknown>>;
	readonly safeAreaInsets?: Readonly<{
		bottom: number;
		left: number;
		right: number;
		top: number;
	}>;
	readonly width: number;
}

export interface ApkReadOnlyProbeRequest extends ApkAppPluginDeviceOpenRequest {
	readonly describeDiagnostics?: () => string;
	readonly root: Readonly<ApkReadOnlyProbeRootOptions>;
	readonly signal?: AbortSignal;
	readonly timeoutMilliseconds?: number;
}

export interface ApkReadOnlyProbeResult {
	readonly activeTime: number;
	readonly deviceId: string;
	readonly elapsedMilliseconds: number;
	readonly model: string;
	readonly parsedDps: unknown;
	readonly protocolVersion: string;
	readonly serializedDps: string;
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

/**
 * Runs one bounded original-bundle root and succeeds only after the APK broker
 * correlates a real wire response with a request from that exact generation.
 * The supplied session is always shut down, including timeout and abort paths.
 */
export async function runApkReadOnlyProbeSession(
	session: ApkReadOnlyProbeSession,
	ingressRouter: ApkDeviceIngressRouter,
	request: Readonly<ApkReadOnlyProbeRequest>,
): Promise<ApkReadOnlyProbeResult> {
	const timeoutMilliseconds = positiveInteger(
		request.timeoutMilliseconds ?? 15_000,
		"AppPlugin-Probe-Timeout",
	);
	const startedAt = Date.now();
	const observation = deferred<ApkJsonDeviceIngressObservation>();
	const terminalFailure = deferred<never>();
	let expectedActiveTime: number | undefined;
	let modelLease: ApkAppPluginModelRuntimeLease<ApkAppPluginModelRuntime> | undefined;
	let rootLease: Awaited<ReturnType<ApkAppPluginModelRuntime["openRoot"]>> | undefined;
	let result: ApkReadOnlyProbeResult | undefined;
	let primaryError: unknown;
	let finished = false;
	let observationResolved = false;

	const unsubscribe = ingressRouter.subscribeJson(value => {
		if (finished
			|| observationResolved
			|| value.deviceId !== request.targetDuid
			|| value.activeTime !== expectedActiveTime
			|| !value.result.rpcAccepted) return;
		observationResolved = true;
		observation.resolve(value);
	});
	const timeout = setTimeout(() => {
		if (finished) return;
		finished = true;
		const diagnostics = request.describeDiagnostics?.().trim();
		terminalFailure.reject(new Error([
			`AppPlugin-Read-only-Probe erhielt innerhalb von ${timeoutMilliseconds} ms keine korrelierte Antwort`,
			diagnostics ? `Diagnose: ${diagnostics}` : undefined,
		].filter(Boolean).join("; ")));
	}, timeoutMilliseconds);
	const abort = (): void => {
		if (finished) return;
		finished = true;
		terminalFailure.reject(request.signal?.reason ?? new Error("AppPlugin-Read-only-Probe wurde abgebrochen"));
	};
	request.signal?.addEventListener("abort", abort, { once: true });
	if (request.signal?.aborted) abort();
	void terminalFailure.promise.catch(() => undefined);

	try {
		modelLease = await Promise.race([
			session.openDevice({
				deviceProperties: request.deviceProperties,
				targetDuid: request.targetDuid,
				timestampMs: request.timestampMs,
			}),
			terminalFailure.promise,
		]);
		expectedActiveTime = modelLease.activeTime;
		rootLease = await Promise.race([
			modelLease.runtime.openRoot({ ...request.root }),
			terminalFailure.promise,
		]);
		const accepted = await Promise.race([
			observation.promise,
			terminalFailure.promise,
		]);
		result = Object.freeze({
			activeTime: accepted.activeTime,
			deviceId: accepted.deviceId,
			elapsedMilliseconds: Date.now() - startedAt,
			model: modelLease.model,
			parsedDps: parseDps(accepted.serializedDps),
			protocolVersion: accepted.protocolVersion,
			serializedDps: accepted.serializedDps,
		});
		finished = true;
	} catch (error) {
		primaryError = error;
	}

	finished = true;
	clearTimeout(timeout);
	request.signal?.removeEventListener("abort", abort);
	unsubscribe();
	const cleanupErrors: unknown[] = [];
	for (const operation of [
		...(rootLease ? [() => rootLease.release()] : []),
		...(modelLease ? [() => modelLease.release()] : []),
		() => session.shutdown(),
	]) {
		try {
			await operation();
		} catch (error) {
			cleanupErrors.push(error);
		}
	}
	if (primaryError !== undefined) {
		if (cleanupErrors.length > 0) {
			throw new AggregateError(
				[primaryError, ...cleanupErrors],
				"AppPlugin-Read-only-Probe und ihr Cleanup sind fehlgeschlagen",
			);
		}
		throw primaryError;
	}
	if (cleanupErrors.length > 0) {
		throw new AggregateError(cleanupErrors, "AppPlugin-Read-only-Probe konnte nicht sauber beendet werden");
	}
	if (!result) throw new Error("AppPlugin-Read-only-Probe endete ohne Ergebnis");
	return result;
}
