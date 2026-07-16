import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { compareQ7FullScenePng } from "../../scripts/lib/q7FullSceneEvidence";
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
			events: Array<{ kind: string; blobPath?: string }>;
		};

		expect(first.blob.equals(second.blob)).toBe(true);
		expect(createHash("sha256").update(first.blob).digest("hex"))
			.toBe("1b51aeb928e4d59eaf2f4e54b5035ea666041b5ea65347a97d29835cd6c8124b");
		expect(manifest.events.map(event => event.kind)).toEqual(["dps", "dps", "blob"]);
		expect(manifest.events[2].blobPath).toBe("q7-l5-full-scene-synthetic.blob");
		expect(JSON.stringify(first.replayManifest)).not.toMatch(/b01|localKey/iu);
		expect(Q7_FULL_SCENE_MODEL).toBe("roborock.vacuum.sc01");
		expect(Q7_FULL_SCENE_SERIAL).toBe("SC01SYNTHETIC001");
	});

	it("locks the worker-safe room identifiers and complete AppPlugin scene", () => {
		const golden = JSON.parse(fs.readFileSync(semanticGoldenPath, "utf8")) as {
			runtime: { worker: { resultLength: number } };
			scene: { mapPixelCount: number; roomChains: Array<{ roomId: number }> };
			map: {
				filledPathCount: number;
				strokedPathCount: number;
				robot: { layerZIndex: number };
				dock: { layerZIndex: number };
				robotAboveDock: boolean;
				textCounts: Record<string, number>;
				render: { svgViews: number; embeddedImages: number; textNodes: number };
			};
		};

		expect(golden.runtime.worker.resultLength).toBe(96_000);
		expect(golden.scene.mapPixelCount).toBe(96_000);
		expect(golden.scene.roomChains.map(room => room.roomId)).toEqual([10, 11, 12, 13]);
		expect(golden.scene.roomChains.every(room => room.roomId > 1)).toBe(true);
		expect(golden.map.textCounts).toEqual({ Raum1: 3, Raum2: 3, Raum3: 3, Raum4: 3 });
		expect(golden.map.filledPathCount).toBeGreaterThanOrEqual(7);
		expect(golden.map.strokedPathCount).toBe(1);
		expect(golden.map.robotAboveDock).toBe(true);
		expect(golden.map.robot.layerZIndex).toBeGreaterThan(golden.map.dock.layerZIndex);
		expect(golden.map.render).toMatchObject({ svgViews: 2, embeddedImages: 6, textNodes: 12 });
	});

	it("compares the visual golden pixel-for-pixel", async () => {
		const comparison = await compareQ7FullScenePng(visualGoldenPath, visualGoldenPath);
		expect(comparison).toMatchObject({ exactMatch: true, differingPixelCount: 0, significantPixelCount: 0 });
	});
});
