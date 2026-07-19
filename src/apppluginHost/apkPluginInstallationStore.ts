import type { ApkAppPluginInstallationContext } from "./apkAppPluginSessionDescriptor";

export interface ApkMainPluginInstallation {
	readonly downloadVersion: number;
	readonly pluginLevel: number;
}

function modelKey(model: string): string {
	if (typeof model !== "string" || model.trim().length === 0) {
		throw new Error("AppPlugin-Modell darf nicht leer sein");
	}
	return model;
}

function nonNegativeInteger(value: number, name: string): number {
	if (!Number.isSafeInteger(value) || value < 0) {
		throw new Error(`${name} muss eine nichtnegative ganze Zahl sein`);
	}
	return value;
}

/**
 * APK-derived installation commit boundary for main AppPlugins.
 *
 * The Android app first stores `<model>_tmp` and `<model>_pl_tmp`. Only its
 * package-success callback promotes those values to `<model>` and
 * `<model>_pl`; failed or abandoned downloads never become visible through
 * RRDevicesModule.getDeviceMainPluginDownloadVersion().
 *
 * Persistence belongs to the future product-runtime integration. This class
 * deliberately owns only the state invariant and exposes serializable,
 * credential-free snapshots.
 */
export class ApkMainPluginInstallationStore {
	readonly #installed = new Map<string, ApkMainPluginInstallation>();
	readonly #pending = new Map<string, ApkMainPluginInstallation>();

	public constructor(
		initial?: Readonly<Record<string, ApkMainPluginInstallation>>,
	) {
		for (const [model, installation] of Object.entries(initial ?? {})) {
			this.#installed.set(modelKey(model), this.#validate(installation));
		}
	}

	public stage(
		model: string,
		downloadVersion: number,
		pluginLevel: number,
	): void {
		this.#pending.set(modelKey(model), this.#validate({
			downloadVersion,
			pluginLevel,
		}));
	}

	public commit(model: string): ApkMainPluginInstallation {
		const key = modelKey(model);
		const pending = this.#pending.get(key);
		if (!pending) {
			throw new Error(`Für ${key} ist keine AppPlugin-Installation vorgemerkt`);
		}
		this.#installed.set(key, pending);
		this.#pending.delete(key);
		return { ...pending };
	}

	public abort(model: string): void {
		this.#pending.delete(modelKey(model));
	}

	public getInstalled(model: string): ApkMainPluginInstallation | undefined {
		const installed = this.#installed.get(modelKey(model));
		return installed ? { ...installed } : undefined;
	}

	public getDownloadVersion(model: string): number {
		return this.#installed.get(modelKey(model))?.downloadVersion ?? 0;
	}

	public hasPending(model: string): boolean {
		return this.#pending.has(modelKey(model));
	}

	public toSessionContext(): ApkAppPluginInstallationContext {
		return {
			mainPluginDownloadVersions: Object.fromEntries(
				[...this.#installed.entries()]
					.sort(([left], [right]) => left.localeCompare(right))
					.map(([model, installation]) => [model, installation.downloadVersion]),
			),
		};
	}

	#validate(installation: ApkMainPluginInstallation): ApkMainPluginInstallation {
		return {
			downloadVersion: nonNegativeInteger(
				installation.downloadVersion,
				"AppPlugin-Downloadversion",
			),
			pluginLevel: nonNegativeInteger(
				installation.pluginLevel,
				"AppPlugin-Level",
			),
		};
	}
}
