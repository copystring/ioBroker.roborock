import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildQ7FullSceneFixture, Q7_FULL_SCENE_MODEL, Q7_FULL_SCENE_SERIAL } from "../../scripts/lib/q7FullSceneFixture";

const fixtureDirectory = path.join(process.cwd(), "test", "fixtures", "appplugin");
const semanticGoldenPath = path.join(fixtureDirectory, "q7-l5-full-scene-golden.json");
const visualGoldenPath = path.join(fixtureDirectory, "q7-l5-full-scene-golden.png");

describe("Q7 AppPlugin full-scene gate", () => {
	it("builds the privacy-safe direct AppPlugin blob deterministically", () => {
		const first = buildQ7FullSceneFixture();
		const second = buildQ7FullSceneFixture();
		const manifest = first.replayManifest as {
			deviceContext: { firmwareVersion: string };
			shadowDps: Record<string, string>;
			events: Array<{ kind: string; blobPath?: string }>;
			publishResponses: Array<{ events: Array<{ kind: string; blobPath?: string }> }>;
		};

		expect(first.blob.equals(second.blob)).toBe(true);
		expect(createHash("sha256").update(first.blob).digest("hex"))
			.toBe("1b51aeb928e4d59eaf2f4e54b5035ea666041b5ea65347a97d29835cd6c8124b");
		expect(Object.keys(manifest.shadowDps)).toEqual(["10001"]);
		expect(JSON.parse(manifest.shadowDps["10001"])).toMatchObject({
			method: "prop.get",
			data: { current_map_id: 424_242, map_save: 1 },
		});
		expect(manifest.events.map(event => event.kind)).toEqual(["dps", "dps"]);
		expect(manifest.publishResponses).toHaveLength(1);
		expect(manifest.publishResponses[0].events).toEqual([{
			kind: "blob",
			blobPath: "q7-l5-full-scene-synthetic.blob",
			waitBeforeMs: 750,
			waitAfterMs: 1_500,
		}]);
		expect(JSON.stringify(first.replayManifest)).not.toMatch(/b01|localKey/iu);
		expect(Q7_FULL_SCENE_MODEL).toBe("roborock.vacuum.sc01");
		expect(Q7_FULL_SCENE_SERIAL).toBe("SC01SYNTHETIC001");
	});

	it("locks the worker-safe room identifiers and complete AppPlugin scene", () => {
		const golden = JSON.parse(fs.readFileSync(semanticGoldenPath, "utf8")) as {
			version: number;
			runtime: { worker: { resultLength: number } };
			hostContract: {
				nativeMethods: Array<{ moduleName: string; methodName: string; argumentCounts: number[] }>;
				uiManagerMethods: string[];
				viewManagers: string[];
			};
			scene: { mapPixelCount: number; roomChains: Array<{ roomId: number }> };
			map: {
				filledPathCount: number;
				strokedPathCount: number;
				dock: {
					layerZIndex: number;
					imageMeasurement: { width: number; height: number };
					layerMeasurement: { width: number; height: number };
				};
				robot: {
					layerZIndex: number;
					imageMeasurement: { width: number; height: number };
					layerMeasurement: { width: number; height: number };
				};
				robotAboveDock: boolean;
				robotAnimation: { measurement: { width: number; height: number } };
				textCounts: Record<string, number>;
				render: { svgViews: number; embeddedImages: number; textNodes: number };
			};
		};

		expect(golden.version).toBe(3);
		expect(golden.runtime.worker.resultLength).toBe(96_000);
		expect(golden.hostContract.nativeMethods).toEqual(expect.arrayContaining([
			expect.objectContaining({ moduleName: "RRPluginDevice" }),
			expect.objectContaining({ moduleName: "RRPluginSDK" }),
		]));
		expect(golden.hostContract.uiManagerMethods).toEqual(expect.arrayContaining([
			"createView",
			"setChildren",
			"updateView",
		]));
		expect(golden.hostContract.viewManagers).toEqual(expect.arrayContaining([
			"RCTImageView",
			"RNSVGSvgViewAndroid",
			"RRPAGAnimationView",
		]));
		expect(golden.scene.mapPixelCount).toBe(96_000);
		expect(golden.scene.roomChains.map(room => room.roomId)).toEqual([10, 11, 12, 13]);
		expect(golden.scene.roomChains.every(room => room.roomId > 1)).toBe(true);
		expect(golden.map.textCounts).toEqual({ Raum1: 3, Raum2: 3, Raum3: 3, Raum4: 3 });
		expect(golden.map.filledPathCount).toBeGreaterThanOrEqual(7);
		expect(golden.map.strokedPathCount).toBe(1);
		expect(golden.map.robotAboveDock).toBe(true);
		expect(golden.map.robot.layerZIndex).toBeGreaterThan(golden.map.dock.layerZIndex);
		expect(golden.map.robot.imageMeasurement).toMatchObject({ width: 18, height: 18 });
		expect(golden.map.robot.layerMeasurement).toMatchObject({ width: 40, height: 40 });
		expect(golden.map.dock.imageMeasurement).toMatchObject({ width: 13, height: 18 });
		expect(golden.map.dock.layerMeasurement).toMatchObject({ width: 20, height: 20 });
		expect(golden.map.robotAnimation.measurement).toMatchObject({ width: 26, height: 28 });
		expect(golden.map.render).toMatchObject({ svgViews: 2, embeddedImages: 6, textNodes: 12 });
	});

	it("validates the committed host-regression PNG without comparing the file to itself", () => {
		const png = fs.readFileSync(visualGoldenPath);
		expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
		expect(png.readUInt32BE(16)).toBe(360);
		expect(png.readUInt32BE(20)).toBe(800);
		expect(png.byteLength).toBeGreaterThan(4_000);
	});
});
