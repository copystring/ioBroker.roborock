import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { describe, expect, it } from "vitest";

import { createCanvasKitSkiaHost } from "../../src/lib/appplugin/CanvasKitSkiaHost";
import { MapDecryptor } from "../../src/lib/map/b01/MapDecryptor";
import { Q10_FIXTURE_DEFAULTS } from "./q10FixtureDefaults";
import { Q10_PRIMARY_SAMPLE } from "./q10RepresentativeFixture";

const { probeMetroBundleUiContract } = require("../../scripts/lib/appplugin_ui_contract_probe.js");

const repositoryRoot = path.resolve(__dirname, "..", "..");
const bundleRoot = path.join(
	repositoryRoot,
	".AppPlugins",
	"Q10 X5+",
	"019bdf41f583723bb937ccc99bbd7541",
);
const bundlePath = path.join(bundleRoot, "index.android.bundle");
const q10It = fs.existsSync(bundlePath) ? it : it.skip;

describe("original Q10 AppPlugin full-scene renderer", () => {
	q10It("renders the unmodified original Skia picture without SVG reconstruction", async () => {
		const decrypted = MapDecryptor.decrypt(
			Buffer.from(Q10_PRIMARY_SAMPLE),
			Q10_FIXTURE_DEFAULTS.sn,
			Q10_FIXTURE_DEFAULTS.model,
			"q10-full-scene-test",
			undefined,
			Q10_FIXTURE_DEFAULTS.localKey,
		);
		expect(decrypted).not.toBeNull();

		const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "roborock-q10-full-scene-"));
		const outputPath = path.join(temporaryDirectory, "scene.png");
		const host = await createCanvasKitSkiaHost({ bundleRoot, width: 360, height: 640 });
		try {
			const blob = Buffer.concat([Buffer.from([1]), decrypted!.subarray(1)]).toString("base64");
			const result = await probeMetroBundleUiContract(bundlePath, {
				deviceModel: Q10_FIXTURE_DEFAULTS.model,
				durationMs: 2_500,
				layoutWidth: 360,
				layoutHeight: 640,
				pngOutputPath: outputPath,
				skiaHost: host,
				deviceEvents: [
					{
						afterMs: 250,
						eventType: "RRDeviceDpsUpdateEvent",
						payload: { dps: { 101: { 6: 0 } } },
					},
					{
						afterMs: 350,
						eventType: "RRDeviceBlobPayloadUpdateEvent",
						payload: { blob },
					},
				],
			});

			expect(result.unchanged).toBe(true);
			expect(result.runError).toBeUndefined();
			expect(result.pngArtifactError).toBeUndefined();
			expect(result.reportedExceptions).toEqual([]);
			expect(result.timerErrors).toEqual([]);
			expect(result.deviceEventErrors).toEqual([]);
			expect(result.layoutEventErrors).toEqual([]);
			expect(result.backgroundWorkerErrors).toEqual([]);
			expect(result.skiaHostDiagnostics.unsupportedCapabilities).toEqual([]);
			expect(result.skiaHostDiagnostics.pictureUpdates).toBeGreaterThan(2);
			expect(result.skiaHostDiagnostics.pictureViews.some(
				(view: { drawImageRects: Array<{ imageWidth: number; imageHeight: number; destination: number[] }> }) =>
					view.drawImageRects.some(draw => draw.imageWidth === 124
						&& draw.imageHeight === 238
						&& draw.destination.every(Number.isFinite)),
			)).toBe(true);
			expect(result.pngArtifact).toMatchObject({ outputPath, width: 360, height: 640 });

			const renderedImage = await loadImage(outputPath);
			const canvas = createCanvas(renderedImage.width, renderedImage.height);
			const context = canvas.getContext("2d");
			context.drawImage(renderedImage, 0, 0);
			const pixels = context.getImageData(0, 0, renderedImage.width, renderedImage.height).data;
			let nonTransparentPixels = 0;
			for (let offset = 3; offset < pixels.length; offset += 4) {
				if (pixels[offset] > 0) nonTransparentPixels++;
			}
			expect(nonTransparentPixels).toBeGreaterThan(15_000);
		} finally {
			host.dispose();
			fs.rmSync(temporaryDirectory, { recursive: true, force: true });
		}
	}, 30_000);
});
