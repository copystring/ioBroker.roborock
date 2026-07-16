export const APK_SUPPORTED_APP_LANGUAGES = Object.freeze([
	"zh-Hans",
	"en",
	"ja",
	"de",
	"fr",
	"es",
	"zh-Hant",
	"it",
	"ko",
	"id",
	"pl",
	"ro",
	"th",
	"uk",
	"vi",
	"ru",
	"he",
	"pt",
	"ms",
	"tr",
	"es-LA",
	"ar",
	"cs",
	"sk",
	"hu",
	"nb",
	"sv",
	"fi",
	"nl",
	"da",
] as const);

export interface ApkLocalizationSnapshot {
	language: string;
	localeIdentifier: string;
	availableLanguages: readonly string[];
}

export interface ApkLocalizationRuntimeOptions {
	language: string;
	localeIdentifier: string;
	emitDeviceEvent: (eventName: "langDidChange", payload: string) => void | Promise<void>;
}

function assertLanguage(language: string): void {
	if (language.length === 0) throw new Error("language darf nicht leer sein");
	if (language === "default" || language === "null") return;
	try {
		new Intl.Locale(language);
	} catch {
		throw new Error(`Ungültiger Android-Sprachcode: ${language}`);
	}
}

function localeIdentifierForLanguage(language: string, systemLocaleIdentifier: string): string {
	if (language === "default" || language === "null") return systemLocaleIdentifier;
	return new Intl.Locale(language).baseName.replaceAll("-", "_");
}

/**
 * Reproduces the mutable part of the APK's ReactNativeLocalization module.
 * Translation lookup deliberately remains inside the unchanged AppPlugin.
 */
export class ApkLocalizationRuntime {
	readonly #systemLocaleIdentifier: string;
	#language: string;
	#localeIdentifier: string;

	public constructor(private readonly options: ApkLocalizationRuntimeOptions) {
		assertLanguage(options.language);
		if (options.localeIdentifier.length === 0) throw new Error("localeIdentifier darf nicht leer sein");
		this.#language = options.language;
		this.#localeIdentifier = options.localeIdentifier;
		this.#systemLocaleIdentifier = options.localeIdentifier;
	}

	public getLanguage(callback: (...arguments_: unknown[]) => void): void {
		callback(0, this.#language);
	}

	public async setLanguage(language: string): Promise<boolean> {
		assertLanguage(language);
		this.#language = language;
		this.#localeIdentifier = localeIdentifierForLanguage(language, this.#systemLocaleIdentifier);
		await this.options.emitDeviceEvent("langDidChange", language);
		return true;
	}

	public snapshot(): ApkLocalizationSnapshot {
		return {
			language: this.#language,
			localeIdentifier: this.#localeIdentifier,
			availableLanguages: APK_SUPPORTED_APP_LANGUAGES,
		};
	}
}
