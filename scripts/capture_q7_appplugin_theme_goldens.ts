import * as fs from "node:fs";
import * as path from "node:path";

import { renderAppPluginSvgPng, sha256 } from "./lib/appPluginBrowserGolden";

type ThemeMode = "dark" | "light" | "system";
type ColorScheme = "dark" | "light";

interface RuntimeHealth {
	status: "appplugin-session-ready";
	sessionId: string;
	deviceModel: string;
	profileLabel: string;
	frameRevision: number;
	bundleKind: string;
	bundleSha256: string;
	productFallbackAllowed: false;
	colorModel: "dark" | "default" | "light";
	systemColorScheme: ColorScheme;
	colorScheme: ColorScheme;
	cardStyle: number;
	themeSwitching: boolean;
	language: string;
	viewport: { width: number; height: number };
}

interface RuntimeState {
	rawText: unknown[];
	darkModeEvents: unknown[];
	appearanceEvents: unknown[];
	appliedActivityStyles: unknown[];
}

interface ThemeCase {
	id: string;
	mode: ThemeMode;
	systemColorScheme: ColorScheme;
	scene: "home" | "settings";
}

interface Capture {
	png: Buffer;
	fileName: string;
	evidence: Readonly<Record<string, unknown>>;
}

function writeDiagnostics(captures: readonly Capture[], reason: string): string {
	const directory = path.join(process.cwd(), "artifacts", "appplugin-poc", "theme-golden-diagnostics", reason);
	fs.mkdirSync(directory, { recursive: true });
	for (const item of captures) fs.writeFileSync(path.join(directory, item.fileName), item.png);
	return directory;
}

function parseArgs(args: readonly string[]): { baseUrl: string; updateGolden: boolean } {
	let baseUrl = "http://127.0.0.1:4174";
	let updateGolden = false;
	for (let index = 0; index < args.length; index += 1) {
		if (args[index] === "--base-url" && args[index + 1]) baseUrl = args[++index];
		else if (args[index] === "--update-golden") updateGolden = true;
		else throw new Error(`Unbekannte oder unvollständige Option: ${args[index]}`);
	}
	return { baseUrl: baseUrl.replace(/\/$/u, ""), updateGolden };
}

async function readJson<T>(url: string): Promise<T> {
	const response = await fetch(url, { cache: "no-store" });
	if (!response.ok) throw new Error(`${url} antwortet mit HTTP ${response.status}`);
	return response.json() as Promise<T>;
}

async function health(baseUrl: string): Promise<RuntimeHealth> {
	const value = await readJson<RuntimeHealth>(`${baseUrl}/health?view=full`);
	if (value.status !== "appplugin-session-ready"
		|| value.productFallbackAllowed !== false
		|| value.bundleKind !== "hermes-bytecode"
		|| value.themeSwitching !== true) {
		throw new Error("Theme-Golden stammt nicht aus einer unveränderten themefähigen Hermes-AppPlugin-Sitzung");
	}
	return value;
}

async function waitForStableFrame(baseUrl: string): Promise<RuntimeHealth> {
	const deadline = Date.now() + 3_000;
	const observationStartedAt = Date.now();
	let current = await health(baseUrl);
	let lastRevision = current.frameRevision;
	let unchangedSince = Date.now();
	while (Date.now() < deadline) {
		await new Promise<void>(resolve => setTimeout(resolve, 25));
		current = await health(baseUrl);
		if (current.frameRevision !== lastRevision) {
			lastRevision = current.frameRevision;
			unchangedSince = Date.now();
			continue;
		}
		// Das originale AppPlugin blendet Teile der Einstellungsseite über kurze
		// Timer ein. Erst ein ruhiger Frame verhindert Goldens aus Zwischenzuständen.
		if (Date.now() - observationStartedAt >= 750 && Date.now() - unchangedSince >= 250) return current;
	}
	throw new Error("Originaler AppPlugin-Frame wurde nach dem Theme-Wechsel nicht stabil");
}

async function setTheme(
	baseUrl: string,
	mode: ThemeMode,
	systemColorScheme: ColorScheme,
): Promise<RuntimeHealth> {
	const response = await fetch(`${baseUrl}/theme?view=full`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ mode, systemColorScheme }),
	});
	const payload = await response.json() as { error?: string };
	if (!response.ok || payload.error) throw new Error(payload.error ?? `Theme-Bridge antwortet mit HTTP ${response.status}`);
	return health(baseUrl);
}

async function tap(baseUrl: string, pointerId: number, x: number, y: number): Promise<void> {
	const timeMs = Date.now();
	const response = await fetch(`${baseUrl}/pointer-sequence?view=full`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			pointers: [
				{ kind: "down", pointerId, x, y, timeMs },
				{ kind: "up", pointerId, x, y, timeMs: timeMs + 80 },
			],
		}),
	});
	const payload = await response.json() as { error?: string; frameChanged?: boolean; targets?: number[] };
	if (!response.ok || payload.error || payload.frameChanged !== true || !payload.targets?.length) {
		throw new Error(payload.error ?? "Originaler AppPlugin-Einstellungstap wurde nicht vollständig ausgeführt");
	}
}

async function capture(baseUrl: string, themeCase: ThemeCase, sessionId: string): Promise<Capture> {
	await setTheme(baseUrl, themeCase.mode, themeCase.systemColorScheme);
	const currentHealth = await waitForStableFrame(baseUrl);
	if (currentHealth.sessionId !== sessionId) throw new Error("Theme-Wechsel hat die laufende AppPlugin-Sitzung unerwartet ersetzt");
	const expectedModel = themeCase.mode === "system" ? "default" : themeCase.mode;
	const expectedScheme = themeCase.mode === "system" ? themeCase.systemColorScheme : themeCase.mode;
	if (currentHealth.colorModel !== expectedModel || currentHealth.colorScheme !== expectedScheme) {
		throw new Error(
			`Theme-Zustand ${themeCase.id} ist ${currentHealth.colorModel}/${currentHealth.colorScheme} `
			+ `statt ${expectedModel}/${expectedScheme}`,
		);
	}
	const [frameResponse, state] = await Promise.all([
		fetch(`${baseUrl}/frame.svg?view=full&theme=${themeCase.id}`, { cache: "no-store" }),
		readJson<RuntimeState>(`${baseUrl}/state`),
	]);
	if (!frameResponse.ok) throw new Error(`Theme-Frame ${themeCase.id} antwortet mit HTTP ${frameResponse.status}`);
	const svg = await frameResponse.text();
	const width = Math.round(currentHealth.viewport.width);
	const height = Math.round(currentHealth.viewport.height);
	const png = await renderAppPluginSvgPng(svg, width, height, `theme-${themeCase.id}`);
	const fileName = `q7-l5-theme-${themeCase.id}-golden.png`;
	return {
		png,
		fileName,
		evidence: {
			id: themeCase.id,
			scene: themeCase.scene,
			mode: themeCase.mode,
			systemColorScheme: themeCase.systemColorScheme,
			colorModel: currentHealth.colorModel,
			colorScheme: currentHealth.colorScheme,
			cardStyle: currentHealth.cardStyle,
			profileLabel: currentHealth.profileLabel,
			deviceModel: currentHealth.deviceModel,
			bundleKind: currentHealth.bundleKind,
			bundleSha256: currentHealth.bundleSha256,
			productFallbackAllowed: currentHealth.productFallbackAllowed,
			language: currentHealth.language,
			view: "full",
			renderer: "chromium-headless",
			width,
			height,
			rawTextSha256: sha256(JSON.stringify(state.rawText)),
			pngSha256: sha256(png),
			pngFile: path.posix.join("test", "fixtures", "appplugin", fileName),
		},
	};
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	const fixtureDirectory = path.join(process.cwd(), "test", "fixtures", "appplugin");
	const manifestPath = path.join(fixtureDirectory, "q7-l5-theme-goldens.json");
	const initialHealth = await health(options.baseUrl);
	const initialState = await readJson<RuntimeState>(`${options.baseUrl}/state`);
	if (!initialState.rawText.map(String).includes("Roborock Q7")) {
		throw new Error("Theme-Golden benötigt die frische originale Q7-Startansicht");
	}
	const initialMode: ThemeMode = initialHealth.colorModel === "default" ? "system" : initialHealth.colorModel;
	const initialSystemScheme = initialHealth.systemColorScheme;
	const captures: Capture[] = [];
	try {
		captures.push(await capture(options.baseUrl, {
			id: "home-light",
			mode: "light",
			systemColorScheme: "light",
			scene: "home",
		}, initialHealth.sessionId));
		captures.push(await capture(options.baseUrl, {
			id: "home-dark",
			mode: "dark",
			systemColorScheme: "light",
			scene: "home",
		}, initialHealth.sessionId));
		await setTheme(options.baseUrl, "light", "light");
		await tap(options.baseUrl, 801, 319, 82);
		captures.push(await capture(options.baseUrl, {
			id: "settings-light",
			mode: "light",
			systemColorScheme: "light",
			scene: "settings",
		}, initialHealth.sessionId));
		captures.push(await capture(options.baseUrl, {
			id: "settings-dark",
			mode: "dark",
			systemColorScheme: "light",
			scene: "settings",
		}, initialHealth.sessionId));
		captures.push(await capture(options.baseUrl, {
			id: "settings-system-dark",
			mode: "system",
			systemColorScheme: "dark",
			scene: "settings",
		}, initialHealth.sessionId));
		await setTheme(options.baseUrl, "light", "light");
		captures.push(await capture(options.baseUrl, {
			id: "settings-system-light",
			mode: "system",
			systemColorScheme: "light",
			scene: "settings",
		}, initialHealth.sessionId));
	} finally {
		await setTheme(options.baseUrl, initialMode, initialSystemScheme);
	}

	const byId = new Map(captures.map(item => [String(item.evidence.id), item]));
	if (byId.get("home-light")!.png.equals(byId.get("home-dark")!.png)
		|| byId.get("settings-light")!.png.equals(byId.get("settings-dark")!.png)) {
		const directory = writeDiagnostics(captures, "explicit-light-dark");
		throw new Error(`Explizites Hell/Dunkel verändert die originalen AppPlugin-Pixel nicht; Diagnose: ${directory}`);
	}
	if (!byId.get("settings-dark")!.png.equals(byId.get("settings-system-dark")!.png)) {
		const directory = writeDiagnostics(captures, "system-dark");
		throw new Error(`System-Dunkel entspricht nicht pixelgenau dem originalen AppPlugin-Dunkelmodus; Diagnose: ${directory}`);
	}
	if (!byId.get("settings-light")!.png.equals(byId.get("settings-system-light")!.png)) {
		const directory = writeDiagnostics(captures, "system-light");
		throw new Error(`System-Hell entspricht nicht pixelgenau dem originalen AppPlugin-Hellmodus; Diagnose: ${directory}`);
	}
	const finalState = await readJson<RuntimeState>(`${options.baseUrl}/state`);
	if (finalState.darkModeEvents.length <= initialState.darkModeEvents.length
		|| finalState.appearanceEvents.length <= initialState.appearanceEvents.length
		|| finalState.appliedActivityStyles.length <= initialState.appliedActivityStyles.length) {
		throw new Error("Theme-Gate hat nicht alle APK-DarkMode-, Appearance- und Activity-Wege beobachtet");
	}
	const manifest = {
		schemaVersion: 1,
		source: "unchanged-q7-l5-appplugin-session",
		sameSession: true,
		cases: captures.map(item => item.evidence),
	};
	if (options.updateGolden) {
		fs.mkdirSync(fixtureDirectory, { recursive: true });
		for (const item of captures) fs.writeFileSync(path.join(fixtureDirectory, item.fileName), item.png);
		fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
		process.stdout.write(`${JSON.stringify({ status: "theme-goldens-updated", manifestPath, cases: manifest.cases.length })}\n`);
		return;
	}
	const expected = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as typeof manifest;
	if (JSON.stringify(expected) !== JSON.stringify(manifest)) {
		const directory = path.join(process.cwd(), "artifacts", "appplugin-poc", "theme-golden-mismatch");
		fs.mkdirSync(directory, { recursive: true });
		fs.writeFileSync(path.join(directory, "expected.json"), `${JSON.stringify(expected, null, 2)}\n`, "utf8");
		fs.writeFileSync(path.join(directory, "actual.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
		for (const item of captures) fs.writeFileSync(path.join(directory, item.fileName.replace(/\.png$/u, "-actual.png")), item.png);
		throw new Error(`Theme-Golden-Manifest weicht ab; Diagnose: ${directory}`);
	}
	for (const item of captures) {
		if (!fs.readFileSync(path.join(fixtureDirectory, item.fileName)).equals(item.png)) {
			throw new Error(`Bild-Golden ${item.fileName} weicht pixelgenau ab`);
		}
	}
	process.stdout.write(`${JSON.stringify({ status: "theme-goldens-match", cases: manifest.cases.length })}\n`);
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
