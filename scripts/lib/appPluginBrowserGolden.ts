import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { pathToFileURL } from "node:url";

import { loadImage } from "@napi-rs/canvas";

export function sha256(value: Uint8Array | string): string {
	return createHash("sha256").update(value).digest("hex");
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

export async function renderAppPluginSvgPng(
	svg: string,
	width: number,
	height: number,
	purpose: string,
): Promise<Buffer> {
	if (!Number.isSafeInteger(width) || width < 1 || !Number.isSafeInteger(height) || height < 1) {
		throw new Error("Browser-Golden benötigt positive ganzzahlige Abmessungen");
	}
	const safePurpose = purpose.replaceAll(/[^a-z0-9-]/giu, "-");
	const directory = fs.mkdtempSync(path.join(os.tmpdir(), `appplugin-${safePurpose}-golden-`));
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
