/**
 * Product boundary for AppPlugin localization.
 *
 * The host supplies locale state exactly like the APK. Translation lookup and
 * room naming stay inside the unchanged, model-specific AppPlugin. Plugins
 * that ship original raw localization JSON may expose those files directly;
 * the host must never maintain a copied subset of their strings.
 */
export const APPPLUGIN_LOCALIZATION_POLICY = Object.freeze({
	owner: "unchanged-model-appplugin",
	hostInputs: ["language", "localeIdentifier"],
	allowedSources: ["running-bundle", "original-appplugin-raw-file"],
	manualCatalogAllowed: false,
	fallbackOwner: "ioBroker-shell-only",
} as const);

export interface AppPluginLocalizationBridge {
	readonly locale: string;
	setLocale(language: string, localeIdentifier: string): Promise<void>;
	translate(key: string, replacements?: Readonly<Record<string, string | number>>): Promise<string>;
}

/**
 * Rejects a host-side translation implementation before it can accidentally
 * become the product fallback.
 */
export function assertAppPluginLocalizationBridge(
	bridge: AppPluginLocalizationBridge | undefined,
): asserts bridge is AppPluginLocalizationBridge {
	if (!bridge) {
		throw new Error(
			"AppPlugin-Übersetzungen benötigen den laufenden Bundle-Host; ein manueller Host-Katalog ist unzulässig.",
		);
	}
}