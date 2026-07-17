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

interface ActorEvidence {
	layerZIndex: number;
	layerScaleX: number;
	layerScaleY: number;
	imageScaleX: number;
	imageScaleY: number;
	bounds: { width: number; height: number };
}

interface SceneEvidence {
	mapScaleX: number;
	mapScaleY: number;
	robotAboveStation: boolean;
	centerDistance: number;
	robot: ActorEvidence;
	station: ActorEvidence;
}

const fixtureDirectory = path.join(process.cwd(), "test", "fixtures", "appplugin");
const themeManifestPath = path.join(fixtureDirectory, "q7-l5-theme-goldens.json");
const actorManifestPath = path.join(fixtureDirectory, "q7-l5-actor-scaling-golden.json");

function sha256(value: Uint8Array): string {
	return createHash("sha256").update(value).digest("hex");
}

describe("Q7 AppPlugin Theme- und Akteur-Goldens", () => {
	it("beweist Hell, Dunkel und beide Systemmodi in derselben unveränderten AppPlugin-Sitzung", () => {
		const manifest = JSON.parse(fs.readFileSync(themeManifestPath, "utf8")) as {
			schemaVersion: number;
			source: string;
			sameSession: boolean;
			cases: ThemeGoldenCase[];
		};
		expect(manifest).toMatchObject({
			schemaVersion: 1,
			source: "unchanged-q7-l5-appplugin-session",
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
		expect(new Set(manifest.cases.map(entry => entry.bundleSha256)).size).toBe(1);
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
	});

	it("bindet alle Theme-PNGs kryptografisch und geometrisch an das Manifest", async () => {
		const manifest = JSON.parse(fs.readFileSync(themeManifestPath, "utf8")) as { cases: ThemeGoldenCase[] };
		for (const entry of manifest.cases) {
			const png = fs.readFileSync(path.join(process.cwd(), entry.pngFile));
			expect(sha256(png)).toBe(entry.pngSha256);
			const image = await loadImage(png);
			expect({ width: image.width, height: image.height }).toEqual({ width: entry.width, height: entry.height });
		}
	});

	it("bewahrt die originalen Roboter- und Stationsfaktoren bei gemeinsamer Karten-Skalierung", async () => {
		const manifest = JSON.parse(fs.readFileSync(actorManifestPath, "utf8")) as {
			schemaVersion: number;
			source: string;
			deviceModel: string;
			bundleKind: string;
			productFallbackAllowed: false;
			apkTransportConnectedBeforeRunApplication: boolean;
			mapRequestMatchCount: number;
			originalConstants: {
				mapChildScale: number;
				robotOuterMultiplier: number;
				robotImageDivisor: number;
				robotZIndex: number;
				stationZIndex: number;
			};
			initial: SceneEvidence;
			zoomIn: SceneEvidence;
			zoomOut: SceneEvidence;
			pngSha256: string;
			pngFile: string;
		};
		expect(manifest).toMatchObject({
			schemaVersion: 1,
			source: "unchanged-q7-l5-appplugin-session",
			deviceModel: "roborock.vacuum.sc01",
			bundleKind: "hermes-bytecode",
			productFallbackAllowed: false,
			apkTransportConnectedBeforeRunApplication: true,
			mapRequestMatchCount: 1,
			originalConstants: {
				mapChildScale: 0.32,
				robotOuterMultiplier: 0.5,
				robotImageDivisor: 0.18,
				robotZIndex: 490,
				stationZIndex: 400,
			},
		});
		for (const scene of [manifest.initial, manifest.zoomIn, manifest.zoomOut]) {
			expect(scene.robotAboveStation).toBe(true);
			expect(scene.centerDistance).toBeLessThanOrEqual(1);
			expect(scene.robot.layerScaleX).toBeCloseTo(0.16, 8);
			expect(scene.robot.layerScaleY).toBeCloseTo(0.16, 8);
			expect(scene.robot.imageScaleX).toBeCloseTo(0.32 / 0.18, 5);
			expect(scene.robot.imageScaleY).toBeCloseTo(0.32 / 0.18, 5);
			expect(scene.station.layerScaleX).toBeCloseTo(0.32, 8);
			expect(scene.station.layerScaleY).toBeCloseTo(0.32, 8);
			expect(scene.robot.layerZIndex).toBeGreaterThan(scene.station.layerZIndex);
		}
		expect(manifest.zoomIn.mapScaleX).toBeGreaterThan(manifest.initial.mapScaleX);
		expect(manifest.zoomIn.robot.bounds.width).toBeGreaterThan(manifest.initial.robot.bounds.width);
		expect(manifest.zoomIn.station.bounds.height).toBeGreaterThan(manifest.initial.station.bounds.height);
		expect(manifest.zoomOut.mapScaleX).toBeLessThan(manifest.zoomIn.mapScaleX);
		expect(manifest.zoomOut.robot.bounds.width).toBeLessThan(manifest.zoomIn.robot.bounds.width);
		expect(manifest.zoomOut.station.bounds.height).toBeLessThan(manifest.zoomIn.station.bounds.height);

		const png = fs.readFileSync(path.join(process.cwd(), manifest.pngFile));
		expect(sha256(png)).toBe(manifest.pngSha256);
		const image = await loadImage(png);
		expect({ width: image.width, height: image.height }).toEqual({ width: 275, height: 287 });
	});
});
