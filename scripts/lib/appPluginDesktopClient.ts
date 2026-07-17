import type { AppPluginDesktopProfile } from "./appPluginDesktopProfiles";

interface AppPluginDesktopHealth {
	status: "appplugin-session-ready";
	sessionId: string;
	profileId: AppPluginDesktopProfile;
	availableProfiles: AppPluginDesktopProfile[];
}

async function readHealth(baseUrl: string): Promise<AppPluginDesktopHealth> {
	const response = await fetch(`${baseUrl}/health`, { cache: "no-store" });
	if (!response.ok) throw new Error(`AppPlugin-Health antwortet mit HTTP ${response.status}`);
	const health = await response.json() as AppPluginDesktopHealth;
	if (health.status !== "appplugin-session-ready") {
		throw new Error("Der gemeinsame AppPlugin-Server ist nicht bereit");
	}
	return health;
}

export async function ensureAppPluginDesktopProfile(
	baseUrl: string,
	profile: AppPluginDesktopProfile,
	timeoutMs = 60_000,
): Promise<void> {
	const before = await readHealth(baseUrl);
	if (before.profileId === profile) return;
	if (!before.availableProfiles.includes(profile)) {
		throw new Error(`Der gemeinsame AppPlugin-Server bietet Profil ${profile} nicht an`);
	}
	const response = await fetch(`${baseUrl}/profile`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ profile }),
	});
	const payload = await response.json() as {
		error?: string;
		sessionRestarting?: boolean;
	};
	if (!response.ok || payload.error || payload.sessionRestarting !== true) {
		throw new Error(payload.error ?? `Profilwechsel antwortet mit HTTP ${response.status}`);
	}
	const deadline = Date.now() + timeoutMs;
	let lastError: unknown;
	while (Date.now() < deadline) {
		try {
			const health = await readHealth(baseUrl);
			if (health.profileId === profile && health.sessionId !== before.sessionId) return;
		} catch (error) {
			lastError = error;
		}
		await new Promise<void>(resolve => setTimeout(resolve, 100));
	}
	throw new Error(
		`Profil ${profile} wurde auf dem gemeinsamen Server nicht bereit: ${
			lastError instanceof Error ? lastError.message : "Zeitüberschreitung"
		}`,
	);
}
