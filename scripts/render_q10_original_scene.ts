import * as path from "node:path";

import { createCanvasKitSkiaHost } from "../src/lib/appplugin/CanvasKitSkiaHost";
import { MapDecryptor } from "../src/lib/map/b01/MapDecryptor";
import { Q10_FIXTURE_DEFAULTS } from "../test/unit/q10FixtureDefaults";
import { Q10_PRIMARY_SAMPLE } from "../test/unit/q10RepresentativeFixture";

const { probeMetroBundleUiContract } = require("./lib/appplugin_ui_contract_probe.js");

async function main(): Promise<void> {
	const repositoryRoot = process.cwd();
	const bundleRoot = path.join(
		repositoryRoot,
		".AppPlugins",
		"Q10 X5+",
		"019bdf41f583723bb937ccc99bbd7541",
	);
	const bundlePath = path.join(bundleRoot, "index.android.bundle");
	const outputPath = path.join(repositoryRoot, "artifacts", "appplugin-poc", "q10-original-full-scene.png");
	const decrypted = MapDecryptor.decrypt(
		Buffer.from(Q10_PRIMARY_SAMPLE),
		Q10_FIXTURE_DEFAULTS.sn,
		Q10_FIXTURE_DEFAULTS.model,
		"q10-original-scene",
		undefined,
		Q10_FIXTURE_DEFAULTS.localKey,
	);
	if (!decrypted) throw new Error("Die repräsentative Q10-Fixture konnte nicht entschlüsselt werden.");

	const host = await createCanvasKitSkiaHost({ bundleRoot, width: 360, height: 640 });
	try {
		const blob = Buffer.concat([Buffer.from([1]), decrypted.subarray(1)]).toString("base64");
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

		const individualPictureArtifacts = result.skiaHostDiagnostics.viewIds.map((viewId: number) =>
			host.exportLatestPng(
				path.join(repositoryRoot, "artifacts", "appplugin-poc", `q10-original-view-${viewId}.png`),
				viewId,
			),
		);
		const failures = {
			pngArtifactError: result.pngArtifactError,
			runError: result.runError,
			reportedExceptions: result.reportedExceptions,
			reportedExceptionDetails: result.reportedExceptionDetails,
			timerErrors: result.timerErrors,
			deviceEventErrors: result.deviceEventErrors,
			layoutEventErrors: result.layoutEventErrors,
			backgroundWorkerErrors: result.backgroundWorkerErrors,
		};
		console.log(JSON.stringify({
			schemaVersion: 1,
			bundlePath,
			bundleUnchanged: result.unchanged,
			createdViewManagers: result.createdViewManagers,
			pngArtifact: result.pngArtifact,
			individualPictureArtifacts,
			skiaHostDiagnostics: result.skiaHostDiagnostics,
			failures,
		}, null, 2));

		if (Object.values(failures).some(value => Array.isArray(value) ? value.length > 0 : Boolean(value))) {
			throw new Error("Der originale Q10-Szenenlauf enthält Laufzeitfehler.");
		}
		if (result.skiaHostDiagnostics?.unsupportedCapabilities.length) {
			throw new Error("Der Skia-Host deckt noch nicht alle vom Original verwendeten Fähigkeiten ab.");
		}
	} finally {
		host.dispose();
	}
}

void main();
