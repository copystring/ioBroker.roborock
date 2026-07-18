import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

import { loadImage } from "@napi-rs/canvas";
import { describe, expect, it } from "vitest";

interface ThemeGoldenCase {
	id: string;
	scene: "home" | "settings";
	mode: "dark" | "light" | "system";
	systemColorScheme: "dark" | "light";
	colorModel: "dark" | "default" | "light";
	colorScheme: "dark" | "light";
	deviceModel: string;
	bundleKind: string;
	bundleSha256: string;
	productFallbackAllowed: false;
	view: "full";
	renderer: "chromium-headless";
	width: number;
	height: number;
	pngSha256: string;
	pngFile: string;
}

const fixtureDirectory = path.join(process.cwd(), "test", "fixtures", "appplugin");
const themeManifests = [
	{
		path: path.join(fixtureDirectory, "q7-l5-theme-goldens.json"),
		source: "unchanged-q7-l5-appplugin-session",
		bundleSha256: "9dfd8cc4c3020fe8e2428b3be4ca237b65ba536a4730addcfc29300885361a35",
	},
	{
		path: path.join(fixtureDirectory, "q7-m5-theme-goldens.json"),
		source: "unchanged-q7-m5-appplugin-session",
		bundleSha256: "c4136ce753609838415d14264c39e661792c83949f3e9e86d9c463b9bbd19205",
	},
] as const;
const actorManifests = [
	{
		path: path.join(fixtureDirectory, "q7-l5-actor-scaling-golden.json"),
		source: "unchanged-q7-l5-appplugin-session",
		bundleSha256: "9dfd8cc4c3020fe8e2428b3be4ca237b65ba536a4730addcfc29300885361a35",
	},
	{
		path: path.join(fixtureDirectory, "q7-m5-actor-scaling-golden.json"),
		source: "unchanged-q7-m5-appplugin-session",
		bundleSha256: "c4136ce753609838415d14264c39e661792c83949f3e9e86d9c463b9bbd19205",
	},
] as const;

function sha256(value: Uint8Array): string {
	return createHash("sha256").update(value).digest("hex");
}

describe("Q7 AppPlugin Theme- und Akteur-Hostregressionsgoldens", () => {
	it("beweist Hell, Dunkel und beide Systemmodi in derselben unveränderten AppPlugin-Sitzung", () => {
		for (const expectedManifest of themeManifests) {
			const manifest = JSON.parse(fs.readFileSync(expectedManifest.path, "utf8")) as {
				schemaVersion: number;
				source: string;
				sameSession: boolean;
				cases: ThemeGoldenCase[];
			};
			expect(manifest).toMatchObject({
				schemaVersion: 1,
				source: expectedManifest.source,
				sameSession: true,
			});
			expect(manifest.cases.map(entry => entry.id)).toEqual([
				"home-light",
				"home-dark",
				"settings-light",
				"settings-dark",
				"settings-system-dark",
				"settings-system-light",
			]);
			expect(new Set(manifest.cases.map(entry => entry.bundleSha256))).toEqual(
				new Set([expectedManifest.bundleSha256]),
			);
			expect(manifest.cases.every(entry =>
				entry.deviceModel === "roborock.vacuum.sc01"
				&& entry.bundleKind === "hermes-bytecode"
				&& entry.productFallbackAllowed === false
				&& entry.view === "full"
				&& entry.renderer === "chromium-headless")).toBe(true);

			const cases = new Map(manifest.cases.map(entry => [entry.id, entry]));
			expect(cases.get("home-light")!.pngSha256).not.toBe(cases.get("home-dark")!.pngSha256);
			expect(cases.get("settings-light")!.pngSha256).not.toBe(cases.get("settings-dark")!.pngSha256);
			expect(cases.get("settings-system-dark")).toMatchObject({ colorModel: "default", colorScheme: "dark" });
			expect(cases.get("settings-system-light")).toMatchObject({ colorModel: "default", colorScheme: "light" });
			expect(cases.get("settings-system-dark")!.pngSha256).toBe(cases.get("settings-dark")!.pngSha256);
			expect(cases.get("settings-system-light")!.pngSha256).toBe(cases.get("settings-light")!.pngSha256);
		}
	});

	it("bindet alle Theme-PNGs kryptografisch und geometrisch an das Manifest", async () => {
		for (const expectedManifest of themeManifests) {
			const manifest = JSON.parse(fs.readFileSync(expectedManifest.path, "utf8")) as { cases: ThemeGoldenCase[] };
			for (const entry of manifest.cases) {
				const png = fs.readFileSync(path.join(process.cwd(), entry.pngFile));
				expect(sha256(png)).toBe(entry.pngSha256);
				const image = await loadImage(png);
				expect({ width: image.width, height: image.height }).toEqual({
					width: entry.width,
					height: entry.height,
				});
			}
		}
	});

	it("bewahrt die bundle-eigenen Roboter- und Stationsfaktoren bei gemeinsamer Karten-Skalierung", () => {
		const contracts: unknown[] = [];
		for (const expectedManifest of actorManifests) {
			const manifest = JSON.parse(fs.readFileSync(expectedManifest.path, "utf8")) as {
				schemaVersion: number;
				source: string;
				deviceModel: string;
				bundleKind: string;
				bundleSha256: string;
				productFallbackAllowed: false;
				apkTransportConnectedBeforeRunApplication: boolean;
				mapRequestAnswered: boolean;
				originalConstants: Record<string, number>;
				zoomContract: {
					zoomInMapScaleDelta: number;
					zoomOutMapScaleDelta: number;
					actorsTrackMapScale: boolean;
					normalizedGeometry: Record<string, number>;
				};
			};
			expect(manifest).toMatchObject({
				schemaVersion: 2,
				source: expectedManifest.source,
				deviceModel: "roborock.vacuum.sc01",
				bundleKind: "hermes-bytecode",
				bundleSha256: expectedManifest.bundleSha256,
				productFallbackAllowed: false,
				apkTransportConnectedBeforeRunApplication: true,
				mapRequestAnswered: true,
				originalConstants: {
					mapChildScale: 0.32,
					robotOuterMultiplier: 0.5,
					robotImageDivisor: 0.18,
					robotZIndex: 490,
					stationZIndex: 400,
				},
				zoomContract: {
					zoomInMapScaleDelta: 0.6,
					zoomOutMapScaleDelta: -0.6,
					actorsTrackMapScale: true,
					normalizedGeometry: {
						mapScaleYPerX: 1,
						robotWidthPerMapScale: 9.102222,
						robotHeightPerMapScale: 9.102222,
						stationWidthPerMapScale: 7.028606,
						stationHeightPerMapScale: 9.189066,
						centerDistancePerMapScale: 0.16,
					},
				},
			});
			expect(manifest.originalConstants.robotZIndex)
				.toBeGreaterThan(manifest.originalConstants.stationZIndex);
			contracts.push({
				originalConstants: manifest.originalConstants,
				zoomContract: manifest.zoomContract,
			});
		}
		expect(contracts[1]).toStrictEqual(contracts[0]);
	});
});
