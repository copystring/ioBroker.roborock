import type { AxiosInstance } from "axios";
import * as path from "node:path";

import {
	ApkAxiosMainPluginVersionTransport,
	ApkMainPluginAcquisitionService,
	type ApkMainPluginAcquisitionResult,
	ApkMainPluginVersionResolver,
	ApkPluginArtifactDownloader,
} from "./apkPluginAcquisition";
import {
	ApkJsonMainPluginInstallationPersistence,
} from "./apkPluginInstallationPersistence";
import {
	ApkMainPluginInstallationStore,
	type ApkMainPluginInstallation,
} from "./apkPluginInstallationStore";
import {
	apkMainPluginPackageKey,
	ApkMainPluginPackageInstaller,
	type ApkPluginPackageSignatureVerifier,
} from "./apkPluginPackageInstaller";
import {
	type ApkMainPluginEntry,
	resolveApkMainPluginDeviceAcquisition,
} from "./apkMainPluginEntry";
import type {
	ApkAppPluginHomeDataContext,
} from "./apkAppPluginSessionDescriptor";

const RUNTIME_DIRECTORY = "appplugin-runtime";

type ApkPluginFetch = (
	input: string | URL,
	init?: RequestInit,
) => Promise<Response>;

export interface ApkAppPluginPackageRuntimeOptions {
	readonly artifactFetch?: ApkPluginFetch;
	readonly instanceDataDirectory: string;
	readonly maxDownloadBytes?: number;
	readonly metadataClient: Pick<AxiosInstance, "post">;
	readonly signatureVerifier?: ApkPluginPackageSignatureVerifier;
}

export interface ApkInstalledMainPluginPackage {
	readonly activeDirectory: string;
	readonly bundlePath: string;
	readonly installation: ApkMainPluginInstallation;
	readonly model: string;
}

/**
 * Instance-scoped composition root for the APK package lifecycle.
 *
 * Constructing this runtime performs no network request and starts no process.
 * A package is queried and downloaded only through an explicit `acquire` call.
 */
export class ApkAppPluginPackageRuntime {
	readonly #store: ApkMainPluginInstallationStore;
	readonly #service: ApkMainPluginAcquisitionService;
	readonly #pluginRoot: string;
	readonly #shutdownController = new AbortController();
	readonly #modelAcquisitionTails = new Map<string, Promise<void>>();
	#stopped = false;

	private constructor(
		store: ApkMainPluginInstallationStore,
		service: ApkMainPluginAcquisitionService,
		pluginRoot: string,
	) {
		this.#store = store;
		this.#service = service;
		this.#pluginRoot = pluginRoot;
	}

	public static async create(
		options: ApkAppPluginPackageRuntimeOptions,
	): Promise<ApkAppPluginPackageRuntime> {
		if (
			typeof options.instanceDataDirectory !== "string"
			|| options.instanceDataDirectory.trim().length === 0
		) {
			throw new Error("Das ioBroker-Instanzdatenverzeichnis darf nicht leer sein");
		}
		const runtimeRoot = path.join(
			path.resolve(options.instanceDataDirectory),
			RUNTIME_DIRECTORY,
		);
		const persistence = new ApkJsonMainPluginInstallationPersistence(
			path.join(runtimeRoot, "installations.json"),
		);
		const store = await persistence.loadStore();
		const pluginRoot = path.join(runtimeRoot, "plugin_v3");
		const installer = new ApkMainPluginPackageInstaller({
			installationPersistence: persistence,
			installationStore: store,
			pluginRoot,
			signatureVerifier: options.signatureVerifier,
		});
		const downloader = new ApkPluginArtifactDownloader({
			fetch: options.artifactFetch,
			maxBytes: options.maxDownloadBytes,
		});
		const resolver = new ApkMainPluginVersionResolver(
			new ApkAxiosMainPluginVersionTransport(options.metadataClient),
		);
		return new ApkAppPluginPackageRuntime(
			store,
			new ApkMainPluginAcquisitionService({
				downloadRoot: path.join(runtimeRoot, "downloads"),
				downloader,
				installer,
				resolver,
			}),
			pluginRoot,
		);
	}

	public async acquire(request: {
		readonly model: string;
		readonly productId: number;
		readonly requiredPluginLevel?: number;
		readonly signal?: AbortSignal;
	}): Promise<ApkMainPluginAcquisitionResult> {
		if (this.#stopped) {
			throw new Error("Die AppPlugin-Paketlaufzeit wurde bereits beendet");
		}
		const model = apkMainPluginPackageKey(request.model);
		const signal = request.signal
			? AbortSignal.any([request.signal, this.#shutdownController.signal])
			: this.#shutdownController.signal;
		const previous = this.#modelAcquisitionTails.get(model)
			?? Promise.resolve();
		const operation = previous
			.catch(() => undefined)
			.then(async () => {
				if (this.#stopped) {
					throw new Error("Die AppPlugin-Paketlaufzeit wurde bereits beendet");
				}
				return this.#service.acquire({
					...request,
					model,
					signal,
				});
			});
		const tail = operation.then(
			() => undefined,
			() => undefined,
		);
		this.#modelAcquisitionTails.set(model, tail);
		void tail.finally(() => {
			if (this.#modelAcquisitionTails.get(model) === tail) {
				this.#modelAcquisitionTails.delete(model);
			}
		});
		return operation;
	}

	/**
	 * Explicitly acquires the package selected by the APK's device/product
	 * association. This method is not called during adapter startup.
	 */
	public async acquireForDevice(request: {
		readonly entry?: ApkMainPluginEntry;
		readonly homeData: ApkAppPluginHomeDataContext;
		readonly signal?: AbortSignal;
		readonly targetDuid: string;
	}): Promise<ApkMainPluginAcquisitionResult> {
		const resolved = resolveApkMainPluginDeviceAcquisition(
			request.homeData,
			request.targetDuid,
			request.entry,
		);
		return this.acquire({
			...resolved,
			signal: request.signal,
		});
	}

	public getInstalled(model: string): ApkMainPluginInstallation | undefined {
		return this.#store.getInstalled(model);
	}

	/**
	 * Resolves the active original package directory from committed installation
	 * state. Bundle readability and compatibility are checked by the session
	 * resolver immediately before a model host is opened.
	 */
	public getInstalledPackage(modelValue: string): ApkInstalledMainPluginPackage | undefined {
		const model = apkMainPluginPackageKey(modelValue);
		const installation = this.#store.getInstalled(model);
		if (!installation) return undefined;
		const activeDirectory = path.join(this.#pluginRoot, model);
		return Object.freeze({
			activeDirectory,
			bundlePath: path.join(activeDirectory, "index.android.bundle"),
			installation: Object.freeze({ ...installation }),
			model,
		});
	}

	public getInstallationContext(): ReturnType<
		ApkMainPluginInstallationStore["toSessionContext"]
		> {
		return this.#store.toSessionContext();
	}

	/**
	 * Synchronously prevents new work and aborts active HTTP reads.
	 */
	public shutdown(): void {
		if (this.#stopped) {
			return;
		}
		this.#stopped = true;
		this.#shutdownController.abort(
			new Error("Die AppPlugin-Paketlaufzeit wird beendet"),
		);
	}
}
