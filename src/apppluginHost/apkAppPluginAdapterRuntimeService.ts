import {
	ApkAppPluginDeviceSessionRuntime,
	type ApkAppPluginDeviceOpenRequest,
	type ApkAppPluginDevicePackageRequest,
	type ApkAppPluginDeviceSessionRuntimeOptions,
} from "./apkAppPluginDeviceSessionRuntime";
import { createApkAppPluginDeviceModelRuntimeFactory } from "./apkAppPluginDeviceModelRuntimeFactory";
import type { ApkAppPluginDeviceRuntimeHostProvider } from "./apkAppPluginDeviceRuntimeHostProvider";
import type { ApkAppPluginModelRuntime } from "./apkAppPluginModelRuntime";
import type {
	ApkAppPluginModelRuntimeLease,
	ApkAppPluginModelRuntimeStatus,
} from "./apkAppPluginSessionSupervisor";

export interface ApkAppPluginShutdownHostProvider extends ApkAppPluginDeviceRuntimeHostProvider {
	shutdown(): Promise<void>;
}

export interface ApkAppPluginAdapterRuntimeServiceOptions extends Omit<
	ApkAppPluginDeviceSessionRuntimeOptions<ApkAppPluginModelRuntime>,
	"factory"
> {
	readonly hostProvider: ApkAppPluginShutdownHostProvider;
}

/**
 * Single adapter lifecycle boundary for the authenticated device-session
 * runtime, model supervisor, productive native factory and host resources.
 * Adapter unload only needs to await shutdown(); the service enforces the
 * required order even when one model runtime fails to stop.
 */
export class ApkAppPluginAdapterRuntimeService {
	readonly #deviceSessions: ApkAppPluginDeviceSessionRuntime<ApkAppPluginModelRuntime>;
	readonly #hostProvider: ApkAppPluginShutdownHostProvider;
	#shutdown?: Promise<void>;

	public constructor(options: Readonly<ApkAppPluginAdapterRuntimeServiceOptions>) {
		this.#hostProvider = options.hostProvider;
		this.#deviceSessions = new ApkAppPluginDeviceSessionRuntime({
			account: options.account,
			contract: options.contract,
			factory: createApkAppPluginDeviceModelRuntimeFactory({
				contract: options.contract,
				hostProvider: options.hostProvider,
			}),
			host: options.host,
			packages: options.packages,
		});
	}

	public openDevice(
		request: Readonly<ApkAppPluginDeviceOpenRequest>,
	): Promise<ApkAppPluginModelRuntimeLease<ApkAppPluginModelRuntime>> {
		return this.#deviceSessions.openDevice(request);
	}

	public acquirePackageForDevice(
		request: Readonly<ApkAppPluginDevicePackageRequest>,
	): ReturnType<ApkAppPluginDeviceSessionRuntime["acquirePackageForDevice"]> {
		return this.#deviceSessions.acquirePackageForDevice(request);
	}

	public status(): readonly ApkAppPluginModelRuntimeStatus[] {
		return this.#deviceSessions.status();
	}

	public invalidateModel(model: string): Promise<void> {
		return this.#deviceSessions.invalidateModel(model);
	}

	public shutdown(): Promise<void> {
		if (this.#shutdown) return this.#shutdown;
		this.#shutdown = (async () => {
			const errors: unknown[] = [];
			try {
				await this.#deviceSessions.shutdown();
			} catch (error) {
				errors.push(error);
			}
			try {
				await this.#hostProvider.shutdown();
			} catch (error) {
				errors.push(error);
			}
			if (errors.length > 0) {
				throw new AggregateError(errors, "AppPlugin-Adapterlaufzeit konnte nicht sauber beendet werden");
			}
		})();
		return this.#shutdown;
	}
}
