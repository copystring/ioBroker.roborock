import type { AppPluginDesktopProfile } from "./appPluginDesktopProfiles";
import {
	APPPLUGIN_SESSION_HEADER,
	APPPLUGIN_SESSION_META_NAME,
	isValidAppPluginSessionToken,
} from "./appPluginDesktopHttpSession";

interface AppPluginDesktopHealth {
	status: "appplugin-session-ready";
	sessionId: string;
	profileId: AppPluginDesktopProfile;
	availableProfiles: AppPluginDesktopProfile[];
	language: string;
}

export interface AppPluginDesktopClient {
	readonly baseUrl: string;
	readonly sessionToken: string;
	fetch(pathname: string, init?: RequestInit): Promise<Response>;
	readJson<T>(pathname: string, init?: RequestInit): Promise<T>;
}

export async function readAppPluginDesktopSessionToken(baseUrl: string): Promise<string> {
	const response = await fetch(`${baseUrl}/appplugin-desktop.html`, { cache: "no-store" });
	if (!response.ok) throw new Error(`AppPlugin-Desktop antwortet mit HTTP ${response.status}`);
	const html = await response.text();
	const escapedName = APPPLUGIN_SESSION_META_NAME.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
	const token = new RegExp(
		`<meta\\s+name=["']${escapedName}["']\\s+content=["']([^"']+)["']`,
		"iu",
	).exec(html)?.[1];
	if (!isValidAppPluginSessionToken(token)) {
		throw new Error("AppPlugin-Desktop liefert kein gültiges Sitzungstoken");
	}
	return token;
}

export async function fetchAppPluginDesktop(
	baseUrl: string,
	pathname: string,
	init: RequestInit = {},
	sessionToken?: string,
): Promise<Response> {
	const token = sessionToken ?? await readAppPluginDesktopSessionToken(baseUrl);
	const headers = new Headers(init.headers);
	headers.set(APPPLUGIN_SESSION_HEADER, token);
	return fetch(`${baseUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`, {
		...init,
		headers,
	});
}

export async function createAppPluginDesktopClient(baseUrl: string): Promise<AppPluginDesktopClient> {
	const normalizedBaseUrl = baseUrl.replace(/\/$/u, "");
	const sessionToken = await readAppPluginDesktopSessionToken(normalizedBaseUrl);
	const authenticatedFetch = (
		pathname: string,
		init: RequestInit = {},
	): Promise<Response> => fetchAppPluginDesktop(normalizedBaseUrl, pathname, init, sessionToken);
	return {
		baseUrl: normalizedBaseUrl,
		sessionToken,
		fetch: authenticatedFetch,
		async readJson<T>(pathname: string, init: RequestInit = {}): Promise<T> {
			const response = await authenticatedFetch(pathname, init);
			if (!response.ok) throw new Error(`${pathname} antwortet mit HTTP ${response.status}`);
			return response.json() as Promise<T>;
		},
	};
}

async function readHealth(baseUrl: string, sessionToken: string): Promise<AppPluginDesktopHealth> {
	const response = await fetchAppPluginDesktop(baseUrl, "/health", {
		cache: "no-store",
	}, sessionToken);
	if (!response.ok) throw new Error(`AppPlugin-Health antwortet mit HTTP ${response.status}`);
	const health = await response.json() as AppPluginDesktopHealth;
	if (health.status !== "appplugin-session-ready") {
		throw new Error("Der gemeinsame AppPlugin-Server ist nicht bereit");
	}
	return health;
}

async function waitForNewSession(
	baseUrl: string,
	sessionToken: string,
	previousSessionId: string,
	matches: (health: AppPluginDesktopHealth) => boolean,
	timeoutMs: number,
	description: string,
): Promise<void> {
	const deadline = Date.now() + timeoutMs;
	let lastError: unknown;
	while (Date.now() < deadline) {
		try {
			const health = await readHealth(baseUrl, sessionToken);
			if (health.sessionId !== previousSessionId && matches(health)) return;
		} catch (error) {
			lastError = error;
		}
		await new Promise<void>(resolve => setTimeout(resolve, 100));
	}
	throw new Error(
		`${description} wurde auf dem gemeinsamen Server nicht bereit: ${
			lastError instanceof Error ? lastError.message : "Zeitüberschreitung"
		}`,
	);
}

export async function ensureAppPluginDesktopProfile(
	baseUrl: string,
	profile: AppPluginDesktopProfile,
	timeoutMs = 60_000,
): Promise<void> {
	const sessionToken = await readAppPluginDesktopSessionToken(baseUrl);
	const before = await readHealth(baseUrl, sessionToken);
	if (before.profileId === profile) return;
	if (!before.availableProfiles.includes(profile)) {
		throw new Error(`Der gemeinsame AppPlugin-Server bietet Profil ${profile} nicht an`);
	}
	const response = await fetchAppPluginDesktop(baseUrl, "/profile", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Origin: baseUrl,
		},
		body: JSON.stringify({ profile }),
	}, sessionToken);
	const payload = await response.json() as {
		error?: string;
		sessionRestarting?: boolean;
	};
	if (!response.ok || payload.error || payload.sessionRestarting !== true) {
		throw new Error(payload.error ?? `Profilwechsel antwortet mit HTTP ${response.status}`);
	}
	await waitForNewSession(
		baseUrl,
		sessionToken,
		before.sessionId,
		health => health.profileId === profile,
		timeoutMs,
		`Profil ${profile}`,
	);
}

export async function setAppPluginDesktopLanguage(
	baseUrl: string,
	language: string,
	timeoutMs = 60_000,
): Promise<void> {
	if (!language) throw new Error("AppPlugin-Sprache darf nicht leer sein");
	const sessionToken = await readAppPluginDesktopSessionToken(baseUrl);
	const before = await readHealth(baseUrl, sessionToken);
	if (before.language === language) return;
	const response = await fetchAppPluginDesktop(baseUrl, "/locale", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Origin: baseUrl,
		},
		body: JSON.stringify({ language }),
	}, sessionToken);
	const payload = await response.json() as {
		error?: string;
		sessionRestarting?: boolean;
	};
	if (!response.ok || payload.error || payload.sessionRestarting !== true) {
		throw new Error(payload.error ?? `Sprachwechsel antwortet mit HTTP ${response.status}`);
	}
	await waitForNewSession(
		baseUrl,
		sessionToken,
		before.sessionId,
		health => health.language === language,
		timeoutMs,
		`Sprache ${language}`,
	);
}
