import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { describe, expect, it } from "vitest";
import { MapDecryptor } from "../../src/lib/map/b01/MapDecryptor";
import { Q10_PRIMARY_SAMPLE } from "./q10RepresentativeFixture";
import { Q10_FIXTURE_DEFAULTS } from "./q10FixtureDefaults";

const { probeMetroBundleUiContract } = require("../../scripts/lib/appplugin_ui_contract_probe.js");

const repositoryRoot = path.resolve(__dirname, "..", "..");
const q10BundlePath = path.join(
	repositoryRoot,
	".AppPlugins",
	"Q10 X5+",
	"019bdf41f583723bb937ccc99bbd7541",
	"index.android.bundle",
);
const q10It = fs.existsSync(q10BundlePath) ? it : it.skip;

describe("original Q10 AppPlugin history-map event path", () => {
	q10It("parses the representative type-3 history map without pretending it is a live map", async () => {
		const decrypted = MapDecryptor.decrypt(
			Buffer.from(Q10_PRIMARY_SAMPLE),
			Q10_FIXTURE_DEFAULTS.sn,
			Q10_FIXTURE_DEFAULTS.model,
			"q10-test-duid",
			undefined,
			Q10_FIXTURE_DEFAULTS.localKey,
		);
		expect(decrypted).not.toBeNull();

		const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "roborock-appplugin-q10-"));
		const pngOutputPath = path.join(temporaryDirectory, "map.png");
		try {
			expect(decrypted![0]).toBe(3);
			const blob = decrypted!.toString("base64");
			const result = await probeMetroBundleUiContract(q10BundlePath, {
				deviceModel: Q10_FIXTURE_DEFAULTS.model,
				durationMs: 1_500,
				pngOutputPath,
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
			expect(result.reportedExceptions).toEqual([]);
			expect(result.timerErrors).toEqual([]);
			expect(result.deviceEventErrors).toEqual([]);
			expect(result.layoutEventErrors).toEqual([]);
			expect(result.backgroundWorkerErrors).toEqual([]);
			expect(result.emittedLayoutEventCount).toBeGreaterThan(0);
			expect(result.emittedDeviceEvents).toEqual([
				"RRDeviceDpsUpdateEvent",
				"RRDeviceBlobPayloadUpdateEvent",
			]);
			expect(result.createdViewManagers).toContain("SkiaPictureView");

			const packageMapCall = result.backgroundWorkerCalls.find(
				(call: { kind: string; functionName?: string }) => call.kind === "call" && call.functionName === "packageMap",
			);
			expect(packageMapCall?.result).toMatchObject({
				success: true,
				width: 124,
				height: 238,
				roomIDs: [2, 1, 3, 4, 5],
			});
			expect(result.capturedSkiaImages).toEqual([]);
			expect(result.pngArtifact).toBeUndefined();
			expect(fs.existsSync(pngOutputPath)).toBe(false);
		} finally {
			fs.rmSync(temporaryDirectory, { recursive: true, force: true });
		}
	}, 30_000);
});
