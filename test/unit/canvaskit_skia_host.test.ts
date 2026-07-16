import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { afterEach, describe, expect, it } from "vitest";

import { createCanvasKitSkiaHost, type CanvasKitSkiaHost } from "../../src/lib/appplugin/CanvasKitSkiaHost";

const temporaryFiles: string[] = [];
let host: CanvasKitSkiaHost | undefined;

afterEach(() => {
	host?.dispose();
	host = undefined;
	for (const temporaryFile of temporaryFiles.splice(0)) {
		fs.rmSync(temporaryFile, { force: true });
	}
});

describe("CanvasKit AppPlugin Skia host", () => {
	it("exports the exact picture supplied through the original SkiaViewApi boundary", async () => {
		host = await createCanvasKitSkiaHost({
			bundleRoot: path.resolve(__dirname, "..", ".."),
			width: 64,
			height: 64,
		});
		const api = host.api as Record<string, any>;
		const recorder = api.PictureRecorder();
		const canvas = recorder.beginRecording(api.XYWHRect(0, 0, 64, 64));
		const paint = api.Paint();
		paint.setAntiAlias(true);
		paint.setColor(api.Color("#ff0000"));
		canvas.drawCircle(32, 32, 20, paint);
		const picture = recorder.finishRecordingAsPicture();
		(host.viewApi.setJsiProperty as (viewId: number, property: string, value: unknown) => void)(
			17,
			"picture",
			picture,
		);

		const outputPath = path.join(os.tmpdir(), `roborock-skia-host-${process.pid}-${Date.now()}.png`);
		temporaryFiles.push(outputPath);
		const artifact = host.exportLatestPng(outputPath);
		const png = fs.readFileSync(outputPath);

		expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
		expect(artifact).toMatchObject({ outputPath, width: 64, height: 64, bytes: png.byteLength });
		expect(artifact.sha256).toMatch(/^[a-f0-9]{64}$/);
		expect(host.getDiagnostics()).toMatchObject({
			pictureUpdates: 1,
			viewIds: [17],
			unsupportedCapabilities: [],
		});
	});

	it("keeps raster image pixels alive inside a recorded picture", async () => {
		host = await createCanvasKitSkiaHost({
			bundleRoot: path.resolve(__dirname, "..", ".."),
			width: 16,
			height: 16,
		});
		const api = host.api as Record<string, any>;
		const pixels = new Uint8Array(4 * 4 * 4);
		for (let offset = 0; offset < pixels.length; offset += 4) {
			pixels.set([255, 0, 0, 255], offset);
		}
		const data = api.Data.fromBytes(pixels);
		const image = api.Image.MakeImage({
			width: 4,
			height: 4,
			alphaType: api.AlphaType.Premul,
			colorType: api.ColorType.RGBA_8888,
		}, data, 16);
		const recorder = api.PictureRecorder();
		const canvas = recorder.beginRecording(api.XYWHRect(0, 0, 16, 16));
		const paint = api.Paint();
		canvas.drawImageRect(image, api.XYWHRect(0, 0, 4, 4), api.XYWHRect(0, 0, 16, 16), paint);
		const picture = recorder.finishRecordingAsPicture();
		image.dispose();
		(host.viewApi.setJsiProperty as (viewId: number, property: string, value: unknown) => void)(
			18,
			"picture",
			picture,
		);

		const outputPath = path.join(os.tmpdir(), `roborock-skia-image-${process.pid}-${Date.now()}.png`);
		temporaryFiles.push(outputPath);
		host.exportLatestPng(outputPath);
		const renderedImage = await loadImage(outputPath);
		const renderedCanvas = createCanvas(16, 16);
		const context = renderedCanvas.getContext("2d");
		context.drawImage(renderedImage, 0, 0);
		expect([...context.getImageData(8, 8, 1, 1).data]).toEqual([255, 0, 0, 255]);
	});
});
