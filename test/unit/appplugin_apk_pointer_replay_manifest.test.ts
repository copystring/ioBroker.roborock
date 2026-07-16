import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { loadApkPointerReplayManifest } from "../../scripts/lib/apkPointerReplayManifest";

describe("APK pointer replay manifest", () => {
	it("loads a versioned multi-pointer gesture without adding map semantics", () => {
		const directory = fs.mkdtempSync(path.join(os.tmpdir(), "apk-pointer-replay-"));
		const filePath = path.join(directory, "pinch.json");
		fs.writeFileSync(filePath, JSON.stringify({
			version: 1,
			events: [
				{ kind: "down", pointerId: 0, x: 100, y: 200, timeMs: 0 },
				{ kind: "down", pointerId: 1, x: 200, y: 200, timeMs: 10 },
				{ kind: "move", pointerId: 1, x: 240, y: 200, timeMs: 20, waitAfterMs: 16 },
				{ kind: "up", pointerId: 1, x: 240, y: 200, timeMs: 30 },
				{ kind: "up", pointerId: 0, x: 100, y: 200, timeMs: 40 },
			],
		}));

		const manifest = loadApkPointerReplayManifest(filePath);

		expect(manifest.events).toHaveLength(5);
		expect(manifest.events[2]).toMatchObject({ kind: "move", waitAfterMs: 16 });
		expect(manifest.manifestPath).toBe(path.resolve(filePath));
	});

	it("rejects coordinates that the APK could not dispatch", () => {
		const directory = fs.mkdtempSync(path.join(os.tmpdir(), "apk-pointer-replay-"));
		const filePath = path.join(directory, "invalid.json");
		fs.writeFileSync(filePath, JSON.stringify({
			version: 1,
			events: [{ kind: "down", pointerId: 0, x: "100", y: 200, timeMs: 0 }],
		}));

		expect(() => loadApkPointerReplayManifest(filePath)).toThrow("event[0].x");
	});
});