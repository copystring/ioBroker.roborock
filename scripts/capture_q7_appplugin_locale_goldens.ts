import * as fs from "node:fs";
import * as path from "node:path";

import { renderAppPluginSvgPng, sha256 } from "./lib/appPluginBrowserGolden";
import {
	createAppPluginDesktopClient,
	ensureAppPluginDesktopProfile,
	setAppPluginDesktopLanguage,
	type AppPluginDesktopClient,
} from "./lib/appPluginDesktopClient";

interface RuntimeHealth {
	status: "appplugin-session-ready";
	sessionId: string;
	profileLabel: string;
	bundleKind: string;
	bundleSha256: string;
	productFallbackAllowed: false;
	language: string;
	localeIdentifier: string;
	systemLocaleIdentifier: string;
	isRTL: boolean;
	doLeftAndRightSwapInRTL: boolean;
	colorModel: "dark" | "default" | "light";
	systemColorScheme?: "dark" | "light";
	colorScheme: "dark" | "light";
	cardStyle: number;
	viewport: { width: number; height: number };
}

interface RuntimeState {
	revision: number;
	rawText: unknown[];
}

interface PointerResponse {
	frameChanged: boolean;
	targets: number[];
}

interface LocaleCase {
	id: string;
	language: string;
	fallbackKind: "none" | "regional" | "system";
	expectedRTL: boolean;
}

const CASES: readonly LocaleCase[] = [
	{ id: "ar-rtl", language: "ar", fallbackKind: "none", expectedRTL: true },
	{ id: "es-la-regional-fallback", language: "es-LA", fallbackKind: "regional", expectedRTL: false },
	{ id: "system-fallback", language: "default", fallbackKind: "system", expectedRTL: false },
];

function parseArgs(args: readonly string[]): { baseUrl: string; updateGolden: boolean } {
	let baseUrl = "http://127.0.0.1:4173";
	let updateGolden = false;
	for (let index = 0; index < args.length; index += 1) {
		if (args[index] === "--base-url" && args[index + 1]) baseUrl = args[++index];
		else if (args[index] === "--update-golden") updateGolden = true;
		else throw new Error(`Unbekannte oder unvollständige Option: ${args[index]}`);
	}
	return { baseUrl: baseUrl.replace(/\/$/u, ""), updateGolden };
}

async function fetchHealth(client: AppPluginDesktopClient): Promise<RuntimeHealth> {
	const health = await client.readJson<RuntimeHealth>("/health?view=full", { cache: "no-store" });
	if (health.status !== "appplugin-session-ready" || health.productFallbackAllowed !== false) {
		throw new Error("Locale-Golden stammt nicht aus einer unveränderten AppPlugin-Sitzung");
	}
	return health;
}

async function switchLanguage(client: AppPluginDesktopClient, language: string): Promise<RuntimeHealth> {
	const before = await fetchHealth(client);
	if (before.language === language) return before;
	await setAppPluginDesktopLanguage(client.baseUrl, language);
	return fetchHealth(client);
}

async function tap(client: AppPluginDesktopClient, pointerId: number, x: number, y: number): Promise<PointerResponse> {
	const timeMs = Date.now();
	const response = await client.fetch("/pointer-sequence?view=full", {
		method: "POST",
		headers: { "Content-Type": "application/json", Origin: client.baseUrl },
		body: JSON.stringify({
			pointers: [
				{ kind: "down", pointerId, x, y, timeMs },
				{ kind: "up", pointerId, x, y, timeMs: timeMs + 80 },
			],
		}),
	});
	const payload = await response.json() as PointerResponse & { error?: string };
	if (!response.ok || payload.error) throw new Error(payload.error ?? `RTL-Pointer antwortet mit HTTP ${response.status}`);
	return payload;
}

async function verifyRtlInteraction(client: AppPluginDesktopClient, before: RuntimeState) {
	const modePoint = { x: 160, y: 645 } as const;
	const roomPoint = { x: 260, y: 260 } as const;
	const mode = await tap(client, 701, modePoint.x, modePoint.y);
	const room = await tap(client, 702, roomPoint.x, roomPoint.y);
	const afterResponse = await client.fetch("/state", { cache: "no-store" });
	if (!afterResponse.ok) throw new Error(`RTL-Zustand antwortet mit HTTP ${afterResponse.status}`);
	const after = await afterResponse.json() as RuntimeState;
	const beforeText = new Set(before.rawText.map(String));
	const addedRawText = after.rawText.map(String).filter(text => !beforeText.has(text));
	if (!mode.frameChanged || !room.frameChanged || mode.targets.length === 0 || room.targets.length === 0
		|| after.revision <= before.revision || addedRawText.length === 0) {
		throw new Error("Arabischer RTL-Modus und Raumauswahl wurden nicht vollständig vom unveränderten AppPlugin ausgeführt");
	}
	return {
		mode: { ...modePoint, frameChanged: mode.frameChanged, targets: mode.targets },
		room: { ...roomPoint, frameChanged: room.frameChanged, targets: room.targets },
		addedRawText,
	};
}

async function captureCase(client: AppPluginDesktopClient, localeCase: LocaleCase, fixtureDirectory: string) {
	const health = await switchLanguage(client, localeCase.language);
	if (health.isRTL !== localeCase.expectedRTL) {
		throw new Error(`${localeCase.language} meldet isRTL=${health.isRTL} statt ${localeCase.expectedRTL}`);
	}
	const [frameResponse, stateResponse] = await Promise.all([
		client.fetch(`/frame.svg?view=full&locale=${encodeURIComponent(localeCase.language)}`, { cache: "no-store" }),
		client.fetch("/state", { cache: "no-store" }),
	]);
	if (!frameResponse.ok || !stateResponse.ok) throw new Error(`Locale-Capture ${localeCase.id} konnte nicht gelesen werden`);
	const svg = await frameResponse.text();
	const state = await stateResponse.json() as RuntimeState;
	const width = Math.round(health.viewport.width);
	const height = Math.round(health.viewport.height);
	const png = await renderAppPluginSvgPng(svg, width, height, `locale-${localeCase.id}`);
	const rtlInteraction = localeCase.expectedRTL ? await verifyRtlInteraction(client, state) : undefined;
	return {
		png,
		pngFile: `q7-l5-locale-${localeCase.id}-golden.png`,
			evidence: {
			id: localeCase.id,
			language: health.language,
			localeIdentifier: health.localeIdentifier,
			systemLocaleIdentifier: health.systemLocaleIdentifier,
			fallbackKind: localeCase.fallbackKind,
			isRTL: health.isRTL,
			doLeftAndRightSwapInRTL: health.doLeftAndRightSwapInRTL,
			profileLabel: health.profileLabel,
			bundleKind: health.bundleKind,
			bundleSha256: health.bundleSha256,
			productFallbackAllowed: health.productFallbackAllowed,
				view: "full",
				renderer: "chromium-headless",
			width,
			height,
			colorModel: health.colorModel,
			colorScheme: health.colorScheme,
			cardStyle: health.cardStyle,
				rawText: state.rawText,
				rawTextSha256: sha256(JSON.stringify(state.rawText)),
				rtlInteraction,
			pngSha256: sha256(png),
			pngFile: path.relative(process.cwd(), path.join(fixtureDirectory, `q7-l5-locale-${localeCase.id}-golden.png`))
				.replaceAll("\\", "/"),
		},
	};
}

async function main(): Promise<void> {
	const options = parseArgs(process.argv.slice(2));
	await ensureAppPluginDesktopProfile(options.baseUrl, "q7");
	const client = await createAppPluginDesktopClient(options.baseUrl);
	const fixtureDirectory = path.join(process.cwd(), "test", "fixtures", "appplugin");
	const manifestPath = path.join(fixtureDirectory, "q7-l5-locale-goldens.json");
	const initialHealth = await fetchHealth(client);
	const captures = [];
	try {
		if (initialHealth.language === CASES[0].language) await switchLanguage(client, "en");
		for (const localeCase of CASES) captures.push(await captureCase(client, localeCase, fixtureDirectory));
	} finally {
		await switchLanguage(client, initialHealth.language);
	}
	const manifest = {
		schemaVersion: 2,
		source: "unchanged-q7-l5-appplugin-session",
		cases: captures.map(capture => capture.evidence),
	};
	if (options.updateGolden) {
		fs.mkdirSync(fixtureDirectory, { recursive: true });
		for (const capture of captures) fs.writeFileSync(path.join(fixtureDirectory, capture.pngFile), capture.png);
		fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
		process.stdout.write(`${JSON.stringify({ status: "locale-goldens-updated", manifestPath, cases: manifest.cases })}\n`);
		return;
	}
	const expected = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as typeof manifest;
	if (JSON.stringify(expected) !== JSON.stringify(manifest)) {
		const diagnosticsDirectory = path.join(process.cwd(), "artifacts", "appplugin-poc", "locale-golden-mismatch");
		fs.mkdirSync(diagnosticsDirectory, { recursive: true });
		fs.writeFileSync(path.join(diagnosticsDirectory, "expected.json"), `${JSON.stringify(expected, null, 2)}\n`, "utf8");
		fs.writeFileSync(path.join(diagnosticsDirectory, "actual.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
		for (const capture of captures) {
			fs.writeFileSync(path.join(diagnosticsDirectory, capture.pngFile.replace(/\.png$/u, "-actual.png")), capture.png);
		}
		throw new Error(`Locale-Golden-Manifest weicht von der AppPlugin-Ausgabe ab; Diagnose: ${diagnosticsDirectory}`);
	}
	for (const capture of captures) {
		const expectedPng = fs.readFileSync(path.join(fixtureDirectory, capture.pngFile));
		if (!expectedPng.equals(capture.png)) throw new Error(`Bild-Golden ${capture.pngFile} weicht pixelgenau ab`);
	}
	process.stdout.write(`${JSON.stringify({ status: "locale-goldens-match", cases: manifest.cases.length })}\n`);
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
