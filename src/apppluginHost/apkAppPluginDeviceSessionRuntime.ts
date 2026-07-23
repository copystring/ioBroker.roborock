import type { ApkAuthenticatedHttpAdapterPorts } from "./apkAxiosRestfulHttpService";
import { ApkAppPluginAuthenticatedAccountRuntime } from "./apkAppPluginAuthenticatedAccountRuntime";
import {
	resolveApkAppPluginSession,
	type ApkAppPluginHostIdentity,
	type ResolvedApkAppPluginSession,
} from "./apkAppPluginSessionDescriptor";
import {
	ApkAppPluginSessionSupervisor,
	type ApkAppPluginManagedModelRuntime,
	type ApkAppPluginManagedModelRuntimeFactory,
	type ApkAppPluginModelRuntimeLease,
	type ApkAppPluginModelRuntimeStatus,
} from "./apkAppPluginSessionSupervisor";
import type { ApkAppPluginHostContract } from "./apkContract";
import type { ApkMainPluginEntry } from "./apkMainPluginEntry";
import type {
	ApkAppPluginPackageRuntime,
	ApkInstalledMainPluginPackage,
} from "./apkPluginPackageRuntime";
import { apkMainPluginPackageKey } from "./apkPluginPackageInstaller";

export interface ApkAppPluginDeviceModelContext {
	readonly authenticatedHttpPorts: ApkAuthenticatedHttpAdapterPorts;
	readonly session: ResolvedApkAppPluginSession;
}

export interface ApkAppPluginDeviceOpenRequest {
	readonly deviceProperties: Readonly<Record<string, unknown>>;
	readonly targetDuid: string;
	readonly timestampMs?: number;
}

export interface ApkAppPluginDevicePackageRequest {
	readonly entry?: ApkMainPluginEntry;
	readonly signal?: AbortSignal;
	readonly targetDuid: string;
}

export interface ApkAppPluginDevicePackageRepository {
	acquire(request: {
		readonly model: string;
		readonly productId: number;
		readonly requiredPluginLevel?: number;
		readonly signal?: AbortSignal;
	}): ReturnType<ApkAppPluginPackageRuntime["acquire"]>;
	getInstallationContext(): ReturnType<ApkAppPluginPackageRuntime["getInstallationContext"]>;
	getInstalledPackage(model: string): ApkInstalledMainPluginPackage | undefined;
}

export interface ApkAppPluginDeviceSessionRuntimeOptions<
	TRuntime extends ApkAppPluginManagedModelRuntime,
> {
	readonly account: ApkAppPluginAuthenticatedAccountRuntime;
	readonly contract: ApkAppPluginHostContract;
	readonly factory: ApkAppPluginManagedModelRuntimeFactory<
		TRuntime,
		ApkAppPluginDeviceModelContext
	>;
	readonly host: ApkAppPluginHostIdentity;
	readonly packages: ApkAppPluginDevicePackageRepository;
}

function cloneHost(host: ApkAppPluginHostIdentity): ApkAppPluginHostIdentity {
	if (typeof host.clientId !== "string" || host.clientId.length === 0) {
		throw new Error("Die AppPlugin-Hostidentität benötigt eine Client-ID");
	}
	return Object.freeze({ ...host });
}

/**
 * Productive, device-class-neutral composition boundary between the signed-in
 * account, installed original package and the bounded APK model-host cache.
 * It starts no process until openDevice() obtains a model lease.
 */
export class ApkAppPluginDeviceSessionRuntime<
	TRuntime extends ApkAppPluginManagedModelRuntime = ApkAppPluginManagedModelRuntime,
> {
	readonly #account: ApkAppPluginAuthenticatedAccountRuntime;
	readonly #contract: ApkAppPluginHostContract;
	readonly #host: ApkAppPluginHostIdentity;
	readonly #modelOperations = new Map<string, Promise<void>>();
	readonly #packages: ApkAppPluginDevicePackageRepository;
	readonly #supervisor: ApkAppPluginSessionSupervisor<TRuntime, ApkAppPluginDeviceModelContext>;
	#shutdown?: Promise<void>;
	#shutdownRequested = false;

	public constructor(options: Readonly<ApkAppPluginDeviceSessionRuntimeOptions<TRuntime>>) {
		this.#account = options.account;
		this.#contract = options.contract;
		this.#host = cloneHost(options.host);
		this.#packages = options.packages;
		this.#supervisor = new ApkAppPluginSessionSupervisor(options.factory);
	}

	public async openDevice(
		request: Readonly<ApkAppPluginDeviceOpenRequest>,
	): Promise<ApkAppPluginModelRuntimeLease<TRuntime>> {
		if (this.#shutdownRequested) {
			throw new Error("Die AppPlugin-Gerätelaufzeit wurde bereits beendet");
		}
		const packageRequest = this.#account.resolveDevicePackage(request.targetDuid);
		return this.#withModelOperation(packageRequest.model, async () => {
			this.#assertRunning();
			const installed = this.#packages.getInstalledPackage(packageRequest.model);
			if (!installed) {
				throw new Error(
					`Für ${packageRequest.model} ist kein signiertes AppPlugin-Paket aktiviert`,
				);
			}
			const descriptor = this.#account.createSessionDescriptor({
				deviceProperties: request.deviceProperties,
				host: this.#host,
				installation: this.#packages.getInstallationContext(),
				package: {
					models: [installed.model],
					versionCode: installed.installation.downloadVersion,
				},
				pluginRoot: installed.activeDirectory,
				targetDuid: request.targetDuid,
				timestampMs: request.timestampMs,
			});
			const session = resolveApkAppPluginSession(descriptor, this.#contract);
			return this.#supervisor.open({
				activeTime: descriptor.device.activeTime,
				context: Object.freeze({
					authenticatedHttpPorts: this.#account.authenticatedHttpPorts(),
					session,
				}),
				deviceId: descriptor.device.deviceId,
				model: descriptor.device.model,
			});
		});
	}

	/**
	 * Replaces a package only after an inactive cached host has been stopped.
	 * Active model roots reject the replacement before any network operation.
	 */
	public async acquirePackageForDevice(
		request: Readonly<ApkAppPluginDevicePackageRequest>,
	): ReturnType<ApkAppPluginPackageRuntime["acquire"]> {
		if (this.#shutdownRequested) {
			throw new Error("Die AppPlugin-Gerätelaufzeit wurde bereits beendet");
		}
		const packageRequest = this.#account.resolveDevicePackage(
			request.targetDuid,
			request.entry,
		);
		return this.#withModelOperation(packageRequest.model, async () => {
			this.#assertRunning();
			await this.#supervisor.invalidate(packageRequest.model);
			return this.#packages.acquire({
				...packageRequest,
				signal: request.signal,
			});
		});
	}

	public status(): readonly ApkAppPluginModelRuntimeStatus[] {
		return this.#supervisor.status();
	}

	/**
	 * Stops one inactive cached model runtime without touching its installed
	 * package. A persistent UI session uses this after releasing its root and
	 * model lease so another device of the same model cannot inherit stale
	 * device identity or activeTime.
	 */
	public async invalidateModel(modelValue: string): Promise<void> {
		if (this.#shutdownRequested) {
			throw new Error("Die AppPlugin-Gerätelaufzeit wurde bereits beendet");
		}
		const model = apkMainPluginPackageKey(modelValue);
		return this.#withModelOperation(model, async () => {
			this.#assertRunning();
			await this.#supervisor.invalidate(model);
		});
	}

	public shutdown(): Promise<void> {
		if (this.#shutdown) return this.#shutdown;
		this.#shutdownRequested = true;
		this.#shutdown = (async () => {
			await Promise.allSettled([...this.#modelOperations.values()]);
			await this.#supervisor.shutdown();
		})();
		return this.#shutdown;
	}

	#assertRunning(): void {
		if (this.#shutdownRequested) {
			throw new Error("Die AppPlugin-Gerätelaufzeit wurde bereits beendet");
		}
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
