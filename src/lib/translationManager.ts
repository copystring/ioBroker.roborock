import * as fs from "fs";
import * as path from "path";
import type { Roborock } from "../main";

export class TranslationManager {
	private adapter: Roborock;
	private translations: Record<string, Record<string, string>> = {};
	private currentLanguage: string = "en";

	constructor(adapter: Roborock) {
		this.adapter = adapter;
	}

	public init() {
		const systemLang = (this.adapter.language || "en").toString().toLowerCase();
		this.currentLanguage = this.resolveLanguage(systemLang);

		this.adapter.rLog("System", null, "Info", undefined, undefined, `[Translation] System language="${this.adapter.language}" normalized="${systemLang}" selected="${this.currentLanguage}"`, "info");

		this.loadTranslations();
	}

	private loadTranslations() {
		const jsonPath = path.join(__dirname, "..", "..", "lib", "protocols", "roborock_strings.json");
		this.adapter.rLog("System", null, "Debug", undefined, undefined, `[Translation] Loading translations from ${jsonPath}`, "debug");

		try {
			if (fs.existsSync(jsonPath)) {
				const data = fs.readFileSync(jsonPath, "utf8");
				const rawTranslations = JSON.parse(data);

				// Re-index all keys to lowercase to ensure case-insensitive lookups
				this.translations = {};
				for (const [lang, keys] of Object.entries(rawTranslations)) {
					this.translations[lang] = {};
					for (const [key, val] of Object.entries(keys as Record<string, string>)) {
						this.translations[lang][key.toLowerCase()] = val;
					}
				}

				const langCount = Object.keys(this.translations).length;
				const currentKeys = this.translations[this.currentLanguage] ? Object.keys(this.translations[this.currentLanguage]).length : 0;

				this.adapter.rLog("System", null, "Info", undefined, undefined, `[Translation] Loaded ${langCount} languages. Current language "${this.currentLanguage}" has ${currentKeys} keys.`, "info");
			} else {
				this.adapter.rLog("System", null, "Error", undefined, undefined, `[Translation] File not found at ${jsonPath}`, "error");
			}
		} catch (e: unknown) {
			this.adapter.rLog("System", null, "Error", undefined, undefined, `[Translation] Failed to load translations: ${e instanceof Error ? e.message : String(e)}`, "error");
		}
	}

	private resolveLanguage(lang: string): string {
		const LANGUAGE_MAP: Record<string, string> = {
			"zh-cn": "zh-hans",
			"zh-tw": "zh-hant",
			"zh-hk": "zh-hk",
			"de-de": "de",
			"en-us": "en",
			"en-gb": "en"
		};

		if (LANGUAGE_MAP[lang]) {
			return LANGUAGE_MAP[lang];
		}

		if (lang.includes("-")) {
			const base = lang.split("-")[0];
			if (LANGUAGE_MAP[base]) return LANGUAGE_MAP[base];
			return base;
		}

		return lang;
	}

	public get(key: string, defaultVal?: string): string {
		const lookupKey = key.toLowerCase();

		// Try exact match in loaded Roborock translations
		if (this.translations[this.currentLanguage] && this.translations[this.currentLanguage][lookupKey]) {
			return this.translations[this.currentLanguage][lookupKey];
		}

		// Try English fallback in loaded Roborock translations
		if (this.currentLanguage !== "en" && this.translations["en"] && this.translations["en"][lookupKey]) {
			return this.translations["en"][lookupKey];
		}

		// Return defaultVal or key if translation completely missing
		return defaultVal !== undefined ? defaultVal : key;
	}
}
