import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { loadApkInteractionReplayManifest } from "../../scripts/lib/apkInteractionReplayManifest";

describe("APK interaction replay manifest", () => {
	it("combines fixture-scoped APK pointer and AndroidTextInput events without domain commands", () => {
		const directory = fs.mkdtempSync(path.join(os.tmpdir(), "apk-interaction-replay-"));
		const filePath = path.join(directory, "rename-input.json");
		fs.writeFileSync(filePath, JSON.stringify({
			version: 1,
			viewport: { width: 360, height: 800 },
			events: [
				{ kind: "down", pointerId: 0, x: 180, y: 634, timeMs: 1000 },
				{ kind: "up", pointerId: 0, x: 180, y: 634, timeMs: 1040, waitAfterMs: 300 },
				{ kind: "tap-visible-text", text: "Raum1", timeMs: 1100, waitAfterMs: 200 },
				{
					kind: "assert",
					rawTextIncludes: ["Name"],
					rawTextObservedIncludes: ["Bereit"],
					activeTextInputCount: 1,
					activeTextInputTextsInclude: ["Raum1"],
					activeTextInputMaxLengthsInclude: [20],
				},
				{ kind: "text-input", text: "Büro", waitAfterMs: 100 },
			],
		}));

		const manifest = loadApkInteractionReplayManifest(filePath);

		expect(manifest.viewport).toEqual({ width: 360, height: 800 });
		expect(manifest.events).toEqual([
			expect.objectContaining({ kind: "down", x: 180, y: 634 }),
			expect.objectContaining({ kind: "up", waitAfterMs: 300 }),
			{
				kind: "tap-visible-text",
				text: "Raum1",
				occurrence: 0,
				pointerId: 0,
				timeMs: 1100,
				waitAfterMs: 200,
			},
			{
				kind: "assert",
				rawTextIncludes: ["Name"],
				rawTextObservedIncludes: ["Bereit"],
				activeTextInputCount: 1,
				activeTextInputTextsInclude: ["Raum1"],
				activeTextInputMaxLengthsInclude: [20],
				waitAfterMs: 0,
			},
			{ kind: "text-input", text: "Büro", waitAfterMs: 100 },
		]);
	});

	it("rejects missing fixture geometry and semantic command shortcuts", () => {
		const directory = fs.mkdtempSync(path.join(os.tmpdir(), "apk-interaction-replay-"));
		const filePath = path.join(directory, "invalid.json");
		fs.writeFileSync(filePath, JSON.stringify({ version: 1, events: [] }));
		expect(() => loadApkInteractionReplayManifest(filePath)).toThrow(/Fixture-Viewport/u);

		fs.writeFileSync(filePath, JSON.stringify({
			version: 1,
			viewport: { width: 360, height: 800 },
			events: [{ kind: "rename-room", roomName: "Büro" }],
		}));
		expect(() => loadApkInteractionReplayManifest(filePath)).toThrow(/kind ist ungültig/u);

		fs.writeFileSync(filePath, JSON.stringify({
			version: 1,
			viewport: { width: 360, height: 800 },
			events: [{ kind: "assert" }],
		}));
		expect(() => loadApkInteractionReplayManifest(filePath)).toThrow(/mindestens eine Assertion/u);

		fs.writeFileSync(filePath, JSON.stringify({
			version: 1,
			viewport: { width: 360, height: 800 },
			events: [{ kind: "assert", activeTextInputMaxLengthsInclude: [-1] }],
		}));
		expect(() => loadApkInteractionReplayManifest(filePath)).toThrow(/nichtnegativer Ganzzahlen/u);
	});
});
