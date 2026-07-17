import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

import { loadImage } from "@napi-rs/canvas";
import { describe, expect, it } from "vitest";

interface LocaleGoldenCase {
	id: string;
	language: string;
	localeIdentifier: string;
	systemLocaleIdentifier: string;
	fallbackKind: "none" | "regional" | "system";
	isRTL: boolean;
	doLeftAndRightSwapInRTL: boolean;
	bundleSha256: string;
	productFallbackAllowed: false;
	view: "full";
	width: number;
	height: number;
	rawText: unknown[];
	rawTextSha256: string;
	rtlInteraction?: {
		mode: { frameChanged: boolean; targets: number[] };
		room: { frameChanged: boolean; targets: number[] };
		addedRawText: string[];
	};
	pngSha256: string;
	pngFile: string;
}

const manifestPath = path.join(process.cwd(), "test", "fixtures", "appplugin", "q7-l5-locale-goldens.json");

describe("Q7 AppPlugin Locale-Bild-Goldens", () => {
	it("sichert Arabisch/RTL sowie regionale und System-Fallbacks aus demselben Originalbundle", () => {
		const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as {
			schemaVersion: number;
			source: string;
			cases: LocaleGoldenCase[];
		};
		expect(manifest).toMatchObject({ schemaVersion: 2, source: "unchanged-q7-l5-appplugin-session" });
		expect(manifest.cases.map(entry => ({
			id: entry.id,
			language: entry.language,
			fallbackKind: entry.fallbackKind,
			isRTL: entry.isRTL,
		}))).toEqual([
			{ id: "ar-rtl", language: "ar", fallbackKind: "none", isRTL: true },
			{ id: "es-la-regional-fallback", language: "es-LA", fallbackKind: "regional", isRTL: false },
			{ id: "system-fallback", language: "default", fallbackKind: "system", isRTL: false },
		]);
		expect(new Set(manifest.cases.map(entry => entry.bundleSha256)).size).toBe(1);
		expect(manifest.cases.every(entry => entry.productFallbackAllowed === false && entry.view === "full")).toBe(true);
		expect(manifest.cases[0]).toMatchObject({ localeIdentifier: "ar", doLeftAndRightSwapInRTL: true });
		expect(manifest.cases[0].rtlInteraction).toMatchObject({
			mode: { frameChanged: true, targets: expect.any(Array) },
			room: { frameChanged: true, targets: expect.any(Array) },
			addedRawText: expect.arrayContaining(["تم تحديد 1 غرفة (غرف)"]),
		});
		expect(manifest.cases[2]).toMatchObject({ localeIdentifier: "de_DE", systemLocaleIdentifier: "de_DE" });
	});

	it("bindet jedes PNG und seinen sichtbaren AppPlugin-Text kryptografisch an das Manifest", async () => {
		const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as { cases: LocaleGoldenCase[] };
		for (const entry of manifest.cases) {
			const png = fs.readFileSync(path.join(process.cwd(), entry.pngFile));
			expect(createHash("sha256").update(png).digest("hex")).toBe(entry.pngSha256);
			expect(createHash("sha256").update(JSON.stringify(entry.rawText)).digest("hex")).toBe(entry.rawTextSha256);
			expect(entry.rawText.length).toBeGreaterThan(0);
			const image = await loadImage(png);
			expect({ width: image.width, height: image.height }).toEqual({ width: entry.width, height: entry.height });
		}
	});
});
