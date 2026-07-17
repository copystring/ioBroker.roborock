import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

import { loadImage } from "@napi-rs/canvas";

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

function sha256(value: Uint8Array | string): string {
	return createHash("sha256").update(value).digest("hex");
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

async function fetchHealth(baseUrl: string): Promise<RuntimeHealth> {
	const response = await fetch(`${baseUrl}/health?view=full`, { cache: "no-store" });
	if (!response.ok) throw new Error(`AppPlugin-Health antwortet mit HTTP ${response.status}`);
	const health = await response.json() as RuntimeHealth;
	if (health.status !== "appplugin-session-ready" || health.productFallbackAllowed !== false) {
		throw new Error("Locale-Golden stammt nicht aus einer unveränderten AppPlugin-Sitzung");
	}
	return health;
}

async function waitForSession(
	baseUrl: string,
	previousSessionId: string,
	language: string,
): Promise<RuntimeHealth> {
	const deadline = Date.now() + 60_000;
	let lastError: unknown;
	while (Date.now() < deadline) {
		try {
			const health = await fetchHealth(baseUrl);
			if (health.sessionId !== previousSessionId && health.language === language) return health;
		} catch (error) {
			lastError = error;
		}
		await new Promise<void>(resolve => setTimeout(resolve, 100));
	}
	throw new Error(
		`AppPlugin-Sitzung für ${language} wurde nicht bereit: ${lastError instanceof Error ? lastError.message : "Zeitüberschreitung"}`,
	);
}

async function switchLanguage(baseUrl: string, language: string): Promise<RuntimeHealth> {
	const before = await fetchHealth(baseUrl);
	if (before.language === language) return before;
	const response = await fetch(`${baseUrl}/locale?view=full`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ language }),
	});
	const payload = await response.json() as { error?: string; sessionRestarting?: boolean };
	if (!response.ok || payload.error) {
		throw new Error(payload.error ?? `Sprach-Bridge antwortet mit HTTP ${response.status}`);
	}
	return payload.sessionRestarting
		? waitForSession(baseUrl, before.sessionId, language)
		: fetchHealth(baseUrl);
}

function browserCandidates(): string[] {
	const configured = process.env.APPPLUGIN_GOLDEN_BROWSER;
	if (configured) return [configured];
	if (process.platform === "win32") {
		const programFiles = process.env.ProgramFiles;
		const programFilesX86 = process.env["ProgramFiles(x86)"];
		return [
			programFilesX86 && path.join(programFilesX86, "Microsoft", "Edge", "Application", "msedge.exe"),
			programFiles && path.join(programFiles, "Microsoft", "Edge", "Application", "msedge.exe"),
			programFiles && path.join(programFiles, "Google", "Chrome", "Application", "chrome.exe"),
			programFilesX86 && path.join(programFilesX86, "Google", "Chrome", "Application", "chrome.exe"),
		].filter((candidate): candidate is string => Boolean(candidate && fs.existsSync(candidate)));
	}
	if (process.platform === "darwin") {
		return [
			"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
			"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
		].filter(candidate => fs.existsSync(candidate));
	}
	return ["google-chrome", "chromium", "chromium-browser", "microsoft-edge"];
}

function runHeadlessBrowser(executable: string, args: readonly string[]): Promise<void> {
	return new Promise((resolve, reject) => {
		const child = spawn(executable, args, { stdio: ["ignore", "ignore", "pipe"], windowsHide: true });
		let stderr = "";
		child.stderr.setEncoding("utf8");
		child.stderr.on("data", chunk => { stderr += String(chunk); });
		child.once("error", reject);
		child.once("exit", code => {
			if (code === 0) resolve();
			else reject(new Error(`${path.basename(executable)} beendete die Golden-Aufnahme mit ${code}: ${stderr.trim()}`));
		});
	});
}

async function renderSvgPng(svg: string, width: number, height: number): Promise<Buffer> {
	const directory = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-locale-golden-"));
	const htmlPath = path.join(directory, "frame.html");
	const outputPath = path.join(directory, "frame.png");
	const userDataPath = path.join(directory, "browser-profile");
	const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:${width}px;height:${height}px;overflow:hidden;background:transparent}svg{display:block;width:${width}px;height:${height}px}</style></head><body>${svg}</body></html>`;
	fs.writeFileSync(htmlPath, html, "utf8");
	try {
		const errors: string[] = [];
		for (const executable of browserCandidates()) {
			try {
				await runHeadlessBrowser(executable, [
					"--headless=new",
					"--disable-gpu",
					"--hide-scrollbars",
					"--no-first-run",
					"--no-default-browser-check",
					"--force-device-scale-factor=1",
					"--run-all-compositor-stages-before-draw",
					"--virtual-time-budget=1000",
					`--user-data-dir=${userDataPath}`,
					`--window-size=${width},${height}`,
					`--screenshot=${outputPath}`,
					pathToFileURL(htmlPath).href,
				]);
				const png = fs.readFileSync(outputPath);
				const image = await loadImage(png);
				if (image.width !== width || image.height !== height) {
					throw new Error(`Browser-Golden misst ${image.width}x${image.height} statt ${width}x${height}`);
				}
				return png;
			} catch (error) {
				errors.push(`${executable}: ${error instanceof Error ? error.message : String(error)}`);
			}
		}
		throw new Error(`Kein Chromium-Browser konnte das Bild-Golden rendern:\n${errors.join("\n")}`);
	} finally {
		fs.rmSync(directory, { recursive: true, force: true });
	}
}

async function tap(baseUrl: string, pointerId: number, x: number, y: number): Promise<PointerResponse> {
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
	const payload = await response.json() as PointerResponse & { error?: string };
	if (!response.ok || payload.error) throw new Error(payload.error ?? `RTL-Pointer antwortet mit HTTP ${response.status}`);
	return payload;
}

async function verifyRtlInteraction(baseUrl: string, before: RuntimeState) {
	const modePoint = { x: 160, y: 645 } as const;
	const roomPoint = { x: 260, y: 260 } as const;
	const mode = await tap(baseUrl, 701, modePoint.x, modePoint.y);
	const room = await tap(baseUrl, 702, roomPoint.x, roomPoint.y);
	const afterResponse = await fetch(`${baseUrl}/state`, { cache: "no-store" });
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

async function captureCase(baseUrl: string, localeCase: LocaleCase, fixtureDirectory: string) {
	const health = await switchLanguage(baseUrl, localeCase.language);
	if (health.isRTL !== localeCase.expectedRTL) {
		throw new Error(`${localeCase.language} meldet isRTL=${health.isRTL} statt ${localeCase.expectedRTL}`);
	}
	const [frameResponse, stateResponse] = await Promise.all([
		fetch(`${baseUrl}/frame.svg?view=full&locale=${encodeURIComponent(localeCase.language)}`, { cache: "no-store" }),
		fetch(`${baseUrl}/state`, { cache: "no-store" }),
	]);
	if (!frameResponse.ok || !stateResponse.ok) throw new Error(`Locale-Capture ${localeCase.id} konnte nicht gelesen werden`);
	const svg = await frameResponse.text();
	const state = await stateResponse.json() as RuntimeState;
	const width = Math.round(health.viewport.width);
	const height = Math.round(health.viewport.height);
	const png = await renderSvgPng(svg, width, height);
	const rtlInteraction = localeCase.expectedRTL ? await verifyRtlInteraction(baseUrl, state) : undefined;
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
	const fixtureDirectory = path.join(process.cwd(), "test", "fixtures", "appplugin");
	const manifestPath = path.join(fixtureDirectory, "q7-l5-locale-goldens.json");
	const initialHealth = await fetchHealth(options.baseUrl);
	const captures = [];
	try {
		if (initialHealth.language === CASES[0].language) await switchLanguage(options.baseUrl, "en");
		for (const localeCase of CASES) captures.push(await captureCase(options.baseUrl, localeCase, fixtureDirectory));
	} finally {
		await switchLanguage(options.baseUrl, initialHealth.language);
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
