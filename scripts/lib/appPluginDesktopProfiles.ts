import * as fs from "node:fs";
import * as path from "node:path";

export const APPPLUGIN_DESKTOP_PROFILES = ["q7", "q7-m5", "q10"] as const;
export const APPPLUGIN_MAP_FAMILIES = ["scmap", "yx", "v1", "tanos", "tanos-hybrid", "unknown"] as const;

export type AppPluginDesktopProfile = typeof APPPLUGIN_DESKTOP_PROFILES[number];
export type AppPluginMapFamily = typeof APPPLUGIN_MAP_FAMILIES[number];

export type AppPluginDesktopSupervisorDecision =
	| Readonly<{
		action: "exit";
		exitCode: number;
	}>
	| Readonly<{
		action: "restart";
		consecutiveUnexpectedFailures: number;
		delayMs: number;
		reason: "session-state" | "unexpected-failure";
	}>
	| Readonly<{
		action: "switch";
		profile: AppPluginDesktopProfile;
	}>;

export interface AppPluginDesktopProfileDefinition {
	id: AppPluginDesktopProfile;
	mapFamily: AppPluginMapFamily;
	mapProtocol: string;
	label: string;
}

export const APPPLUGIN_DESKTOP_PROFILE_DEFINITIONS: Readonly<
	Record<AppPluginDesktopProfile, Readonly<AppPluginDesktopProfileDefinition>>
> = Object.freeze({
	q7: Object.freeze({ id: "q7", mapFamily: "scmap", mapProtocol: "SC01", label: "Q7 L5 · SC01" }),
	"q7-m5": Object.freeze({ id: "q7-m5", mapFamily: "scmap", mapProtocol: "SC01", label: "Q7 M5 · SC01" }),
	q10: Object.freeze({ id: "q10", mapFamily: "yx", mapProtocol: "B01", label: "Q10 X5+ · B01" }),
});

interface ProfileSwitchRequest {
	version: 1;
	profile: AppPluginDesktopProfile;
}

export function parseAppPluginDesktopProfile(value: unknown): AppPluginDesktopProfile | undefined {
	return typeof value === "string" && APPPLUGIN_DESKTOP_PROFILES.includes(value as AppPluginDesktopProfile)
		? value as AppPluginDesktopProfile
		: undefined;
}

export function parseAppPluginMapFamily(value: unknown): AppPluginMapFamily | undefined {
	return typeof value === "string" && APPPLUGIN_MAP_FAMILIES.includes(value as AppPluginMapFamily)
		? value as AppPluginMapFamily
		: undefined;
}

export function writeAppPluginDesktopProfileSwitch(
	filePath: string,
	profile: AppPluginDesktopProfile,
): void {
	const request: ProfileSwitchRequest = { version: 1, profile };
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	const temporaryPath = `${filePath}.${process.pid}.tmp`;
	fs.writeFileSync(temporaryPath, `${JSON.stringify(request, null, 2)}\n`, "utf8");
	fs.renameSync(temporaryPath, filePath);
}

export function consumeAppPluginDesktopProfileSwitch(filePath: string): AppPluginDesktopProfile | undefined {
	if (!fs.existsSync(filePath)) return undefined;
	try {
		const request = JSON.parse(fs.readFileSync(filePath, "utf8")) as Partial<ProfileSwitchRequest>;
		if (request.version !== 1) throw new Error("Unbekannte Profilwechsel-Version");
		const profile = parseAppPluginDesktopProfile(request.profile);
		if (!profile) throw new Error("Unbekanntes AppPlugin-Profil");
		return profile;
	} finally {
		fs.rmSync(filePath, { force: true });
	}
}

export function clearAppPluginDesktopProfileSwitch(filePath: string): void {
	fs.rmSync(filePath, { force: true });
}

/**
 * Keeps the single-port supervisor deterministic. An explicit profile switch
 * wins even when the old AppPlugin reports a fatal error while it is closing.
 * Unexpected startup failures are retried with a small bounded backoff, while
 * a runtime that was stable for at least 30 seconds starts a fresh retry
 * budget.
 */
export function decideAppPluginDesktopSupervisorAction(options: Readonly<{
	exitCode: number;
	nextProfile?: AppPluginDesktopProfile;
	restartRequested: boolean;
	runDurationMs: number;
	consecutiveUnexpectedFailures: number;
	maxUnexpectedFailures?: number;
}>): AppPluginDesktopSupervisorDecision {
	if (!Number.isSafeInteger(options.exitCode) || options.exitCode < 0) {
		throw new Error("exitCode muss eine nichtnegative ganze Zahl sein");
	}
	if (!Number.isFinite(options.runDurationMs) || options.runDurationMs < 0) {
		throw new Error("runDurationMs muss eine nichtnegative endliche Zahl sein");
	}
	if (!Number.isSafeInteger(options.consecutiveUnexpectedFailures)
		|| options.consecutiveUnexpectedFailures < 0) {
		throw new Error("consecutiveUnexpectedFailures muss eine nichtnegative ganze Zahl sein");
	}
	const maximum = options.maxUnexpectedFailures ?? 3;
	if (!Number.isSafeInteger(maximum) || maximum < 0) {
		throw new Error("maxUnexpectedFailures muss eine nichtnegative ganze Zahl sein");
	}
	if (options.nextProfile) return { action: "switch", profile: options.nextProfile };
	if (options.exitCode === 0 && options.restartRequested) {
		return {
			action: "restart",
			consecutiveUnexpectedFailures: 0,
			delayMs: 0,
			reason: "session-state",
		};
	}
	if (options.exitCode !== 0) {
		const previousFailures = options.runDurationMs >= 30_000
			? 0
			: options.consecutiveUnexpectedFailures;
		const nextFailures = previousFailures + 1;
		if (nextFailures <= maximum) {
			return {
				action: "restart",
				consecutiveUnexpectedFailures: nextFailures,
				delayMs: Math.min(1_000, 100 * (2 ** (nextFailures - 1))),
				reason: "unexpected-failure",
			};
		}
	}
	return { action: "exit", exitCode: options.exitCode };
}
