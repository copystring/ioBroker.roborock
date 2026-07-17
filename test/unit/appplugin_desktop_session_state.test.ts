import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { describe, expect, it } from "vitest";

import { ApkDarkModeRuntime } from "../../src/apppluginHost/apkDarkModeRuntime";
import { ApkI18nManagerRuntime } from "../../src/apppluginHost/apkI18nManagerRuntime";
import { ApkLocalizationRuntime } from "../../src/apppluginHost/apkLocalizationRuntime";
import type { ApkAppPluginHostContract } from "../../src/apppluginHost/apkContract";
import { ApkNativeModuleDispatcher } from "../../src/apppluginHost/apkNativeModuleDispatcher";
import { StrictApkNativeModuleRegistry } from "../../src/apppluginHost/strictNativeModuleRegistry";
import {
	DEFAULT_APPPLUGIN_DESKTOP_SESSION_STATE,
	isRtlAppLanguage,
	readAppPluginDesktopSessionState,
	resolveAppPluginIsRtl,
	selectedAppLanguageIsRtl,
	updateAppPluginDesktopSessionState,
	writeAppPluginDesktopSessionState,
} from "../../scripts/lib/appPluginDesktopSessionState";

describe("gemeinsamer APK/AppPlugin-Sitzungszustand", () => {
	it("migriert den bisherigen Sprachzustand ohne Theme- oder RTL-Verlust", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-session-state-"));
		const statePath = path.join(root, "session.json");
		fs.writeFileSync(statePath, JSON.stringify({
			version: 1,
			language: "en",
			localeIdentifier: "en",
			restartRequested: true,
		}), "utf8");

		expect(readAppPluginDesktopSessionState(statePath)).toEqual({
			...DEFAULT_APPPLUGIN_DESKTOP_SESSION_STATE,
			language: "en",
			localeIdentifier: "en",
			systemLocaleIdentifier: "en",
			restartRequested: true,
		});
	});

	it("bewahrt Theme, cardStyle, RTL und fontScale über einen Locale-Neustart", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-session-state-"));
		const statePath = path.join(root, "session.json");
		writeAppPluginDesktopSessionState(statePath, {
			...DEFAULT_APPPLUGIN_DESKTOP_SESSION_STATE,
			colorModel: "dark",
			systemColorScheme: "dark",
			cardStyle: 3,
			fontScale: 1.25,
		});

		const restarted = updateAppPluginDesktopSessionState(statePath, {
			language: "ar",
			localeIdentifier: "ar",
			restartRequested: true,
		});

		expect(restarted).toMatchObject({
			language: "ar",
			colorModel: "dark",
			systemColorScheme: "dark",
			cardStyle: 3,
			allowRTL: true,
			doLeftAndRightSwapInRTL: true,
			fontScale: 1.25,
			restartRequested: true,
		});
		expect(resolveAppPluginIsRtl(restarted)).toBe(true);
	});

	it("spiegelt AppPlugin-ausgelöste native Setter in denselben Zustand zurück", async () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-session-state-"));
		const statePath = path.join(root, "session.json");
		writeAppPluginDesktopSessionState(statePath, { ...DEFAULT_APPPLUGIN_DESKTOP_SESSION_STATE });
		const update = (patch: Parameters<typeof updateAppPluginDesktopSessionState>[1]): void => {
			updateAppPluginDesktopSessionState(statePath, patch);
		};
		const darkMode = new ApkDarkModeRuntime({
			storedColorModel: "default",
			systemColorScheme: "light",
			onStateChange: state => update({
				colorModel: state.colorModel,
				systemColorScheme: state.systemColorScheme,
				cardStyle: state.cardStyle,
			}),
		});
		const i18n = new ApkI18nManagerRuntime({
			allowRTL: true,
			forceRTL: false,
			doLeftAndRightSwapInRTL: true,
		}, preferences => update(preferences));
		const localization = new ApkLocalizationRuntime({
			language: "de",
			localeIdentifier: "de_DE",
			systemLocaleIdentifier: "de_DE",
			emitDeviceEvent: () => undefined,
			onStateChange: state => update({
				language: state.language,
				localeIdentifier: state.localeIdentifier,
			}),
		});
		const contract = JSON.parse(fs.readFileSync(
			path.join(process.cwd(), "src", "apppluginHost", "generated", "apk-appplugin-host-contract.json"),
			"utf8",
		)) as ApkAppPluginHostContract;
		const registry = new StrictApkNativeModuleRegistry(contract);
		const register = (moduleName: string, implementation: Record<string, unknown>): void => {
			const module = contract.nativeModules.find(candidate => candidate.moduleName === moduleName);
			if (!module) throw new Error(`APK-Modul ${moduleName} fehlt im generierten Vertrag`);
			registry.register(module.javaClass, implementation);
		};
		register("RRPluginDarkMode", darkMode as unknown as Record<string, unknown>);
		register("I18nManager", {
			allowRTL: i18n.allowRTL,
			forceRTL: i18n.forceRTL,
			swapLeftAndRightInRTL: i18n.swapLeftAndRightInRTL,
		});
		register("ReactLocalization", localization as unknown as Record<string, unknown>);
		const appPluginNativeBridge = new ApkNativeModuleDispatcher(contract, registry);

		appPluginNativeBridge.invoke("RRPluginDarkMode", "setColorModel", ["dark"]);
		appPluginNativeBridge.invoke("RRPluginDarkMode", "setCardStyle", [4]);
		appPluginNativeBridge.invoke("I18nManager", "forceRTL", [true]);
		await appPluginNativeBridge.invoke("ReactLocalization", "setLanguage", ["he"]);

		expect(readAppPluginDesktopSessionState(statePath)).toMatchObject({
			language: "he",
			localeIdentifier: "he",
			colorModel: "dark",
			cardStyle: 4,
			forceRTL: true,
		});
	});

	it("erkennt die RTL-Sprachen der APK und lässt LTR-Fallbacks unverändert", () => {
		expect(isRtlAppLanguage("ar")).toBe(true);
		expect(isRtlAppLanguage("he")).toBe(true);
		expect(isRtlAppLanguage("es-LA")).toBe(false);
		expect(resolveAppPluginIsRtl({
			language: "ar",
			systemLocaleIdentifier: "de_DE",
			allowRTL: false,
			forceRTL: false,
		})).toBe(false);
		expect(resolveAppPluginIsRtl({
			language: "de",
			systemLocaleIdentifier: "de_DE",
			allowRTL: false,
			forceRTL: true,
		})).toBe(true);
		expect(selectedAppLanguageIsRtl("default", "ar_SA")).toBe(true);
		expect(selectedAppLanguageIsRtl("es-LA", "ar_SA")).toBe(false);
	});
});
