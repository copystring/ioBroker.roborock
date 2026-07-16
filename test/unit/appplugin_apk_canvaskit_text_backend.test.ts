import * as path from "node:path";
import { MeasureMode } from "yoga-layout/sync";
import { afterEach, describe, expect, it } from "vitest";

import {
	ApkAndroidTextMeasureRuntime,
	createApkCanvasKitTextLayoutBackend,
	type ApkUiManagerNodeSnapshot,
} from "../../src/apppluginHost";
import { createCanvasKitSkiaHost, type CanvasKitSkiaHost } from "../../src/lib/appplugin/CanvasKitSkiaHost";

let host: CanvasKitSkiaHost | undefined;

afterEach(() => {
	host?.dispose();
	host = undefined;
});

describe("APK CanvasKit Android text backend", () => {
	it("shapes Roboto text through the same CanvasKit instance as the AppPlugin", async () => {
		host = await createCanvasKitSkiaHost({
			bundleRoot: path.resolve(__dirname, "..", ".."),
			width: 360,
			height: 800,
		});
		const textNode: ApkUiManagerNodeSnapshot = {
			tag: 2,
			viewName: "RCTText",
			rootTag: 1,
			props: { fontSize: 12, fontWeight: "600", allowFontScaling: false, numberOfLines: 1 },
			children: [{
				tag: 3,
				viewName: "RCTRawText",
				rootTag: 1,
				props: { text: "Räume" },
				children: [],
			}],
		};
		const runtime = new ApkAndroidTextMeasureRuntime({
			density: 3,
			fontScale: 1,
			backend: createApkCanvasKitTextLayoutBackend(host.api),
		});

		const measured = runtime.measure({
			node: textNode,
			text: "Räume",
			width: 240,
			widthMode: MeasureMode.AtMost,
			height: 0,
			heightMode: MeasureMode.Undefined,
		});

		expect(measured.width).toBeGreaterThan(0);
		expect(measured.width).toBeLessThanOrEqual(240);
		expect(measured.height).toBeGreaterThan(0);
		expect(host.getDiagnostics().fontPaths).not.toHaveLength(0);
	});
});
