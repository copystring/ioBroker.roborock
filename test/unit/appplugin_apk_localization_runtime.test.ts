import { describe, expect, it, vi } from "vitest";

import {
	APK_SUPPORTED_APP_LANGUAGES,
	ApkLocalizationRuntime,
} from "../../src/apppluginHost/apkLocalizationRuntime";

describe("APK ReactLocalization runtime", () => {
	it("exports the language set used by the original APK", () => {
		expect(APK_SUPPORTED_APP_LANGUAGES).toHaveLength(30);
		expect(APK_SUPPORTED_APP_LANGUAGES).toEqual(expect.arrayContaining([
			"zh-Hans",
			"de",
			"es-LA",
			"ar",
			"da",
		]));
	});

	it("keeps getLanguage, setLanguage, and langDidChange on one state", async () => {
		const emitDeviceEvent = vi.fn();
		const runtime = new ApkLocalizationRuntime({
			language: "de",
			localeIdentifier: "de_DE",
			emitDeviceEvent,
		});
		const callback = vi.fn();

		runtime.getLanguage(callback);
		expect(callback).toHaveBeenCalledWith(0, "de");
		expect(await runtime.setLanguage("zh-Hans")).toBe(true);
		expect(emitDeviceEvent).toHaveBeenCalledWith("langDidChange", "zh-Hans");
		expect(runtime.snapshot()).toMatchObject({
			language: "zh-Hans",
			localeIdentifier: "zh_Hans",
		});
	});

	it("returns to the original system locale for the APK default language", async () => {
		const runtime = new ApkLocalizationRuntime({
			language: "de",
			localeIdentifier: "de_DE",
			emitDeviceEvent: vi.fn(),
		});

		await runtime.setLanguage("fr");
		expect(runtime.snapshot().localeIdentifier).toBe("fr");
		await runtime.setLanguage("default");
		expect(runtime.snapshot()).toMatchObject({ language: "default", localeIdentifier: "de_DE" });
	});

	it("rejects malformed language tags before mutating the shared state", async () => {
		const runtime = new ApkLocalizationRuntime({
			language: "de",
			localeIdentifier: "de_DE",
			emitDeviceEvent: vi.fn(),
		});

		await expect(runtime.setLanguage("not_a_locale"))
			.rejects.toThrow("Ungültiger Android-Sprachcode");
		expect(runtime.snapshot().language).toBe("de");
	});
});
