import * as fs from "node:fs";
import * as path from "node:path";

import type {
	ApkPluginDarkColorScheme,
	ApkStoredColorModel,
} from "../../src/apppluginHost/apkDarkModeRuntime";

export interface AppPluginDesktopSessionState {
	version: 2;
	language: string;
	localeIdentifier: string;
	systemLocaleIdentifier: string;
	colorModel: ApkStoredColorModel;
	systemColorScheme: ApkPluginDarkColorScheme;
	cardStyle: number;
	allowRTL: boolean;
	forceRTL: boolean;
	doLeftAndRightSwapInRTL: boolean;
	fontScale: number;
	restartRequested: boolean;
}

interface LegacyDesktopSessionState {
	version: 1;
	language: string;
	localeIdentifier: string;
	restartRequested: boolean;
}

export const DEFAULT_APPPLUGIN_DESKTOP_SESSION_STATE: Readonly<AppPluginDesktopSessionState> = Object.freeze({
	version: 2,
	language: "de",
	localeIdentifier: "de_DE",
	systemLocaleIdentifier: "de_DE",
	colorModel: "default",
	systemColorScheme: "light",
	cardStyle: 0,
	allowRTL: true,
	forceRTL: false,
	doLeftAndRightSwapInRTL: true,
	fontScale: 1,
	restartRequested: false,
});

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isColorModel(value: unknown): value is ApkStoredColorModel {
	return value === "default" || value === "light" || value === "dark";
}

function isColorScheme(value: unknown): value is ApkPluginDarkColorScheme {
	return value === "light" || value === "dark";
}

function isNonEmptyString(value: unknown): value is string {
	return typeof value === "string" && value.length > 0;
}

function isFinitePositiveNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function migrateLegacyState(state: LegacyDesktopSessionState): AppPluginDesktopSessionState {
	return {
		...DEFAULT_APPPLUGIN_DESKTOP_SESSION_STATE,
		language: state.language,
		localeIdentifier: state.localeIdentifier,
		systemLocaleIdentifier: state.localeIdentifier,
		restartRequested: state.restartRequested,
	};
}

export function parseAppPluginDesktopSessionState(value: unknown): AppPluginDesktopSessionState {
	if (!isRecord(value)) throw new Error("Desktop-AppPlugin-Sitzungszustand muss ein JSON-Objekt sein");
	if (value.version === 1
		&& isNonEmptyString(value.language)
		&& isNonEmptyString(value.localeIdentifier)
		&& typeof value.restartRequested === "boolean") {
		return migrateLegacyState(value as unknown as LegacyDesktopSessionState);
	}
	if (value.version !== 2
		|| !isNonEmptyString(value.language)
		|| !isNonEmptyString(value.localeIdentifier)
		|| !isNonEmptyString(value.systemLocaleIdentifier)
		|| !isColorModel(value.colorModel)
		|| !isColorScheme(value.systemColorScheme)
		|| typeof value.cardStyle !== "number" || !Number.isSafeInteger(value.cardStyle)
		|| typeof value.allowRTL !== "boolean"
		|| typeof value.forceRTL !== "boolean"
		|| typeof value.doLeftAndRightSwapInRTL !== "boolean"
		|| !isFinitePositiveNumber(value.fontScale)
		|| typeof value.restartRequested !== "boolean") {
		throw new Error("Desktop-AppPlugin-Sitzungszustand verletzt den APK-Zustandsvertrag v2");
	}
	return value as unknown as AppPluginDesktopSessionState;
}

export function readAppPluginDesktopSessionState(filePath: string): AppPluginDesktopSessionState {
	if (!fs.existsSync(filePath)) return { ...DEFAULT_APPPLUGIN_DESKTOP_SESSION_STATE };
	try {
		return parseAppPluginDesktopSessionState(JSON.parse(fs.readFileSync(filePath, "utf8")));
	} catch (error) {
		throw new Error(
			`Ungültiger Desktop-AppPlugin-Sitzungszustand: ${filePath}: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}

export function writeAppPluginDesktopSessionState(
	filePath: string,
	state: AppPluginDesktopSessionState,
): void {
	const validated = parseAppPluginDesktopSessionState(state);
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, `${JSON.stringify(validated, null, 2)}\n`, "utf8");
}

export function updateAppPluginDesktopSessionState(
	filePath: string,
	patch: Partial<Omit<AppPluginDesktopSessionState, "version">>,
): AppPluginDesktopSessionState {
	const next = parseAppPluginDesktopSessionState({
		...readAppPluginDesktopSessionState(filePath),
		...patch,
		version: 2,
	});
	writeAppPluginDesktopSessionState(filePath, next);
	return next;
}

export function isRtlAppLanguage(language: string): boolean {
	if (language === "default" || language === "null") return false;
	const baseLanguage = new Intl.Locale(language.replaceAll("_", "-")).language;
	return baseLanguage === "ar" || baseLanguage === "fa" || baseLanguage === "he" || baseLanguage === "ur";
}

export function selectedAppLanguageIsRtl(
	language: string,
	systemLocaleIdentifier: string,
): boolean {
	return isRtlAppLanguage(language === "default" || language === "null" ? systemLocaleIdentifier : language);
}

export function resolveAppPluginIsRtl(
	state: Pick<AppPluginDesktopSessionState, "allowRTL" | "forceRTL" | "language" | "systemLocaleIdentifier">,
): boolean {
	return state.forceRTL || (state.allowRTL && selectedAppLanguageIsRtl(state.language, state.systemLocaleIdentifier));
}
