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

describe("original Q10 AppPlugin map event path", () => {
	q10It("parses and rasterizes a representative map through the unmodified original bundle", async () => {
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
			const blob = Buffer.concat([Buffer.from([1]), decrypted!.subarray(1)]).toString("base64");
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
				touchEvents: [
					{ afterMs: 900, eventType: "topTouchStart", x: 180, y: 320 },
					{ afterMs: 950, eventType: "topTouchEnd", x: 180, y: 320 },
				],
			});

			expect(result.unchanged).toBe(true);
			expect(result.runError).toBeUndefined();
			expect(result.reportedExceptions).toEqual([]);
			expect(result.timerErrors).toEqual([]);
			expect(result.deviceEventErrors).toEqual([]);
			expect(result.layoutEventErrors).toEqual([]);
			expect(result.touchEventErrors).toEqual([]);
			expect(result.backgroundWorkerErrors).toEqual([]);
			expect(result.emittedLayoutEventCount).toBeGreaterThan(0);
			expect(result.emittedDeviceEvents).toEqual([
				"RRDeviceDpsUpdateEvent",
				"RRDeviceBlobPayloadUpdateEvent",
			]);
			expect(result.emittedTouchEvents.map(
				(event: { eventType: string }) => event.eventType,
			)).toEqual(["topTouchStart", "topTouchEnd"]);
			expect(result.uiOperations.some(
				(operation: { kind: string }) => operation.kind === "setJSResponder",
			)).toBe(true);
			expect(result.uiOperations.some(
				(operation: { kind: string }) => operation.kind === "clearJSResponder",
			)).toBe(true);
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
			expect(result.capturedSkiaImages[0]).toEqual({
				width: 124,
				height: 238,
				rowBytes: 496,
				sha256: "6459db5c982f23157041a10349d68acefd1329b5b7213d9fb5ca2c3db4aec491",
				byteLength: 118_048,
			});
			expect(result.pngArtifact).toMatchObject({
				outputPath: pngOutputPath,
				width: 124,
				height: 238,
				pngSha256: "81c1bbb5df710957629b714ec2d92509b9273c7e518881f46266574f1ca85bbc",
			});
			expect(fs.readFileSync(pngOutputPath).subarray(0, 8)).toEqual(
				Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
			);
		} finally {
			fs.rmSync(temporaryDirectory, { recursive: true, force: true });
		}
	}, 30_000);
});
