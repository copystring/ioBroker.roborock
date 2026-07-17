import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
	loadApkDeviceReplayManifest,
	matchesApkDeviceReplayPublish,
	resolveApkDeviceReplayFirmwareVersion,
} from "../../scripts/lib/apkDeviceReplayManifest";

describe("APK device replay manifest", () => {
	it("preserves event order and resolves transport paths relative to the manifest", () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-replay-"));
		const manifestPath = path.join(root, "sequence.json");
		writeFileSync(manifestPath, JSON.stringify({
			version: 1,
			deviceContext: { firmwareVersion: "02.24.90" },
			shadowDps: { 101: { 6: 0 } },
			events: [
				{ kind: "dps", dps: { 121: 8 }, waitBeforeMs: 3, waitAfterMs: 5 },
				{ kind: "b01-frame", framePath: "frames/map.bin" },
				{ kind: "blob", blobPath: "blobs/decrypted-map.bin", waitAfterMs: 9 },
			],
			publishResponses: [{
				match: {
					dpsKey: "10000",
					payload: { method: "service.upload_by_maptype", params: { map_type: 0 } },
				},
				events: [{ kind: "b01-frame", framePath: "frames/map.bin", waitBeforeMs: 6, waitAfterMs: 7 }],
				maximumMatches: 4,
			}],
		}));

		const manifest = loadApkDeviceReplayManifest(manifestPath);
		expect(manifest.deviceContext).toEqual({ firmwareVersion: "02.24.90" });
		expect(manifest.shadowDps).toEqual({ 101: { 6: 0 } });
		expect(manifest.events).toEqual([
			{ kind: "dps", dps: { 121: 8 }, waitBeforeMs: 3, waitAfterMs: 5 },
			{ kind: "b01-frame", framePath: path.join(root, "frames", "map.bin"), waitBeforeMs: 0, waitAfterMs: 0 },
			{ kind: "blob", blobPath: path.join(root, "blobs", "decrypted-map.bin"), waitBeforeMs: 0, waitAfterMs: 9 },
		]);
		expect(manifest.publishResponses).toEqual([{
			match: {
				dpsKey: "10000",
				payload: { method: "service.upload_by_maptype", params: { map_type: 0 } },
			},
			events: [{
				kind: "b01-frame",
				framePath: path.join(root, "frames", "map.bin"),
				waitBeforeMs: 6,
				waitAfterMs: 7,
			}],
			maximumMatches: 4,
		}]);
	});

	it("matches JSON object or serialized DPS payloads by structural subset", () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-replay-"));
		const manifestPath = path.join(root, "responses.json");
		writeFileSync(manifestPath, JSON.stringify({
			version: 1,
			events: [],
			publishResponses: [{
				match: {
					dpsKey: "10000",
					payload: { method: "service.upload_by_maptype", params: { map_type: 0 } },
				},
				events: [{ kind: "blob", blobPath: "map.bin" }],
			}],
		}));
		const [response] = loadApkDeviceReplayManifest(manifestPath).publishResponses;

		expect(matchesApkDeviceReplayPublish(response, {
			10000: {
				method: "service.upload_by_maptype",
				params: { map_type: 0, force: 1 },
				msgId: "42",
			},
		})).toBe(true);
		expect(matchesApkDeviceReplayPublish(response, {
			10000: JSON.stringify({
				method: "service.upload_by_maptype",
				params: { map_type: 0, force: 1 },
			}),
		})).toBe(true);
		expect(matchesApkDeviceReplayPublish(response, {
			10000: { method: "service.upload_by_maptype", params: { map_type: 1 } },
		})).toBe(false);
		expect(matchesApkDeviceReplayPublish(response, {
			10001: { method: "service.upload_by_maptype", params: { map_type: 0 } },
		})).toBe(false);
	});

	it("rejects invalid event payloads and unbounded waits", () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-replay-"));
		const manifestPath = path.join(root, "invalid.json");
		writeFileSync(manifestPath, JSON.stringify({
			version: 1,
			events: [{ kind: "dps", dps: [], waitAfterMs: 20_000 }],
		}));
		expect(() => loadApkDeviceReplayManifest(manifestPath)).toThrow();
		writeFileSync(manifestPath, JSON.stringify({
			version: 1,
			events: [{ kind: "dps", dps: {}, waitBeforeMs: 20_000 }],
		}));
		expect(() => loadApkDeviceReplayManifest(manifestPath)).toThrow();
	});
	it("requires and resolves the firmware context for B01 replay", () => {
		const root = mkdtempSync(path.join(tmpdir(), "apk-replay-"));
		const manifestPath = path.join(root, "b01.json");
		writeFileSync(manifestPath, JSON.stringify({
			version: 1,
			events: [{ kind: "b01-frame", framePath: "map.bin" }],
		}));
		expect(() => loadApkDeviceReplayManifest(manifestPath)).toThrow(/firmwareVersion/u);

		writeFileSync(manifestPath, JSON.stringify({
			version: 1,
			deviceContext: { firmwareVersion: "02.24.90" },
			events: [{ kind: "b01-frame", framePath: "map.bin" }],
		}));
		const manifest = loadApkDeviceReplayManifest(manifestPath);
		expect(resolveApkDeviceReplayFirmwareVersion(manifest)).toBe("02.24.90");
		expect(resolveApkDeviceReplayFirmwareVersion(manifest, "02.24.90")).toBe("02.24.90");
		expect(() => resolveApkDeviceReplayFirmwareVersion(manifest, "02.00.00"))
			.toThrow(/Firmware-Konflikt/u);
	});
});
