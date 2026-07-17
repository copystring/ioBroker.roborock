import * as fs from "node:fs";
import * as path from "node:path";

export const APPPLUGIN_DESKTOP_PROFILES = ["q7", "q7-m5", "q10"] as const;

export type AppPluginDesktopProfile = typeof APPPLUGIN_DESKTOP_PROFILES[number];

interface ProfileSwitchRequest {
	version: 1;
	profile: AppPluginDesktopProfile;
}

export function parseAppPluginDesktopProfile(value: unknown): AppPluginDesktopProfile | undefined {
	return typeof value === "string" && APPPLUGIN_DESKTOP_PROFILES.includes(value as AppPluginDesktopProfile)
		? value as AppPluginDesktopProfile
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
