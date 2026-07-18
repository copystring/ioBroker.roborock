import * as path from "node:path";

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
	const decrypted = MapDecryptor.decrypt(
		Buffer.from(Q10_PRIMARY_SAMPLE),
		Q10_FIXTURE_DEFAULTS.sn,
		Q10_FIXTURE_DEFAULTS.model,
		"q10-history-boundary",
		undefined,
		Q10_FIXTURE_DEFAULTS.localKey,
	);
	if (!decrypted) throw new Error("Die repräsentative Q10-Fixture konnte nicht entschlüsselt werden.");
	if (decrypted[0] !== 3) {
		throw new Error(`Die repräsentative Q10-Fixture muss unverändert Blob-Typ 3 tragen, ist aber ${decrypted[0]}.`);
	}
	const result = await probeMetroBundleUiContract(bundlePath, {
		deviceModel: Q10_FIXTURE_DEFAULTS.model,
		durationMs: 1_500,
		deviceEvents: [
			{
				afterMs: 250,
				eventType: "RRDeviceDpsUpdateEvent",
				payload: { dps: { 101: { 6: 0 } } },
			},
			{
				afterMs: 350,
				eventType: "RRDeviceBlobPayloadUpdateEvent",
				payload: { blob: decrypted.toString("base64") },
			},
		],
	});
	const packageMapCall = result.backgroundWorkerCalls.find(
		(call: { kind: string; functionName?: string }) =>
			call.kind === "call" && call.functionName === "packageMap",
	);
	const failures = {
		runError: result.runError,
		reportedExceptions: result.reportedExceptions,
		timerErrors: result.timerErrors,
		deviceEventErrors: result.deviceEventErrors,
		layoutEventErrors: result.layoutEventErrors,
		backgroundWorkerErrors: result.backgroundWorkerErrors,
	};
	const proof = {
		schemaVersion: 1,
		bundlePath,
		bundleUnchanged: result.unchanged,
		inputBlobType: decrypted[0],
		workerFunction: packageMapCall?.functionName,
		workerResult: packageMapCall?.result,
		liveHomeRasterProduced: result.capturedSkiaImages.length > 0,
		pngProduced: Boolean(result.pngArtifact),
		failures,
	};
	console.log(JSON.stringify(proof, null, 2));

	if (Object.values(failures).some(value => Array.isArray(value) ? value.length > 0 : Boolean(value))) {
		throw new Error("Der originale Q10-Historienlauf enthält Laufzeitfehler.");
	}
	if (!result.unchanged) throw new Error("Das originale Q10-Bundle wurde verändert.");
	if (!packageMapCall || (packageMapCall.result as { success?: boolean } | undefined)?.success !== true) {
		throw new Error("Der originale Q10-Historienworker lieferte kein erfolgreiches Kartenmodell.");
	}
	if (result.capturedSkiaImages.length > 0 || result.pngArtifact) {
		throw new Error("Ein Typ-3-Historienblob darf nicht als belegte Live-Home-Karte gewertet werden.");
	}
}

void main();
