import type { ApkAppPluginDeviceModelContext } from "./apkAppPluginDeviceSessionRuntime";
import type {
	ApkAppPluginDeviceNativeRuntimeInitialState,
	ApkAppPluginDeviceNativeRuntimePorts,
} from "./apkAppPluginDeviceNativeRuntimeEnvironment";
import type { ApkAppPluginNativeModelRuntimeCompositionOptions } from "./apkAppPluginNativeRuntimeComposition";
import type { ApkAppPluginModelRuntimeRequest } from "./apkAppPluginSessionSupervisor";
import type { ApkHermesHostArtifact } from "./apkHermesHostArtifact";
import type { ApkDeviceIngress } from "./apkDeviceIngress";

export type ApkAppPluginDeviceHostCompositionOptions = Omit<
	ApkAppPluginNativeModelRuntimeCompositionOptions,
	| "bundlePath"
	| "constantSources"
	| "contract"
	| "createModules"
	| "dispose"
	| "hostExecutablePath"
	| "onCompositionCreated"
>;

export interface ApkAppPluginDeviceRuntimeHostLease {
	readonly attachDeviceIngress?: (ingress: ApkDeviceIngress) => () => void | Promise<void>;
	readonly composition: Readonly<ApkAppPluginDeviceHostCompositionOptions>;
	readonly dataDirectory: string;
	readonly initialState: ApkAppPluginDeviceNativeRuntimeInitialState;
	readonly ports: ApkAppPluginDeviceNativeRuntimePorts;
	release(): void | Promise<void>;
}

/**
 * Supplies only host-owned resources for one verified APK device session.
 * It cannot replace the resolved bundle, device/account context, APK contract
 * or packaged Hermes executable selected by the production factory.
 */
export interface ApkAppPluginDeviceRuntimeHostProvider {
	acquire(
		request: Readonly<ApkAppPluginModelRuntimeRequest<ApkAppPluginDeviceModelContext>>,
		artifact: Readonly<ApkHermesHostArtifact>,
	): Readonly<ApkAppPluginDeviceRuntimeHostLease>
		| Promise<Readonly<ApkAppPluginDeviceRuntimeHostLease>>;
}

export type ApkAppPluginDeviceRuntimeHostLeaseFactory = (
	request: Readonly<ApkAppPluginModelRuntimeRequest<ApkAppPluginDeviceModelContext>>,
	artifact: Readonly<ApkHermesHostArtifact>,
) => Readonly<ApkAppPluginDeviceRuntimeHostLease>
	| Promise<Readonly<ApkAppPluginDeviceRuntimeHostLease>>;

export type ApkAppPluginDeviceRuntimeHostProviderState = "running" | "stopping" | "stopped";

interface ManagedHostLease extends ApkAppPluginDeviceRuntimeHostLease {
	readonly release: () => Promise<void>;
}

function deferred(): { readonly promise: Promise<void>; readonly resolve: () => void } {
	let resolve!: () => void;
	const promise = new Promise<void>(resolvePromise => {
		resolve = resolvePromise;
	});
	return { promise, resolve };
}

/**
 * Adapter-wide owner for device-scoped host ports and their resources.
 * Acquisitions and releases are race-safe, releases are idempotent, and
 * shutdown rejects new work before draining pending and active leases.
 */
export class ApkAppPluginManagedDeviceRuntimeHostProvider
implements ApkAppPluginDeviceRuntimeHostProvider {
	readonly #activeLeases = new Set<ManagedHostLease>();
	readonly #pendingAcquisitions = new Set<Promise<void>>();
	readonly #shutdownErrors: unknown[] = [];
	#shutdown?: Promise<void>;
	#state: ApkAppPluginDeviceRuntimeHostProviderState = "running";

	public constructor(private readonly acquireHostLease: ApkAppPluginDeviceRuntimeHostLeaseFactory) {}

	public get state(): ApkAppPluginDeviceRuntimeHostProviderState {
		return this.#state;
	}

	public get activeLeaseCount(): number {
		return this.#activeLeases.size;
	}

	public async acquire(
		request: Readonly<ApkAppPluginModelRuntimeRequest<ApkAppPluginDeviceModelContext>>,
		artifact: Readonly<ApkHermesHostArtifact>,
	): Promise<Readonly<ApkAppPluginDeviceRuntimeHostLease>> {
		if (this.#state !== "running") {
			throw new Error("Der AppPlugin-Hostprovider wird bereits beendet");
		}
		const pending = deferred();
		this.#pendingAcquisitions.add(pending.promise);
		try {
			const lease = await this.acquireHostLease(request, artifact);
			let release: Promise<void> | undefined;
			const managed = Object.freeze({
				...lease,
				release: (): Promise<void> => release ??= Promise.resolve()
					.then(() => lease.release())
					.finally(() => this.#activeLeases.delete(managed)),
			}) as ManagedHostLease;
			this.#activeLeases.add(managed);
			if (this.#state !== "running") {
				try {
					await managed.release();
				} catch (releaseError) {
					this.#shutdownErrors.push(releaseError);
					throw new AggregateError(
						[
							new Error("Der AppPlugin-Hostprovider wurde während der Ressourcenakquisition beendet"),
							releaseError,
						],
						"AppPlugin-Hostressourcen konnten nach parallelem Shutdown nicht sauber freigegeben werden",
					);
				}
				throw new Error("Der AppPlugin-Hostprovider wurde während der Ressourcenakquisition beendet");
			}
			return managed;
		} finally {
			pending.resolve();
			this.#pendingAcquisitions.delete(pending.promise);
		}
	}

	public shutdown(): Promise<void> {
		if (this.#shutdown) return this.#shutdown;
		this.#state = "stopping";
		this.#shutdown = (async () => {
			await Promise.allSettled([...this.#pendingAcquisitions]);
			const results = await Promise.allSettled(
				[...this.#activeLeases].map(lease => lease.release()),
			);
			this.#state = "stopped";
			const errors = [
				...this.#shutdownErrors,
				...results
					.filter((result): result is PromiseRejectedResult => result.status === "rejected")
					.map(result => result.reason),
			];
			if (errors.length > 0) {
				throw new AggregateError(errors, "AppPlugin-Hostprovider konnte nicht sauber beendet werden");
			}
		})();
		return this.#shutdown;
	}
}
