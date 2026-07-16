import * as path from "node:path";
import { MapDecryptor } from "../src/lib/map/b01/MapDecryptor";
import { Q10_PRIMARY_SAMPLE } from "../test/unit/q10RepresentativeFixture";
import { Q10_FIXTURE_DEFAULTS } from "../test/unit/q10FixtureDefaults";

const { probeMetroBundleUiContract } = require("./lib/appplugin_ui_contract_probe.js");

type SkiaCall = {
	capability: string;
	args: unknown[];
};

async function main(): Promise<void> {
	const repositoryRoot = process.cwd();
	const bundlePath = path.join(
		repositoryRoot,
		".AppPlugins",
		"Q10 X5+",
		"019bdf41f583723bb937ccc99bbd7541",
		"index.android.bundle",
	);
	const decrypted = MapDecryptor.decrypt(
		Buffer.from(Q10_PRIMARY_SAMPLE),
		Q10_FIXTURE_DEFAULTS.sn,
		Q10_FIXTURE_DEFAULTS.model,
		"q10-skia-contract",
		undefined,
		Q10_FIXTURE_DEFAULTS.localKey,
	);
	if (!decrypted) throw new Error("Die repräsentative Q10-Fixture konnte nicht entschlüsselt werden.");

	const blob = Buffer.concat([Buffer.from([1]), decrypted.subarray(1)]).toString("base64");
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
				payload: { blob },
			},
		],
	});
	if (result.runError) throw new Error(result.runError);

	const calls = result.skiaCalls as SkiaCall[];
	const byCapability = new Map<string, { count: number; examples: unknown[][] }>();
	for (const call of calls) {
		const entry = byCapability.get(call.capability) ?? { count: 0, examples: [] };
		entry.count++;
		if (entry.examples.length < 3) entry.examples.push(call.args);
		byCapability.set(call.capability, entry);
	}

	console.log(JSON.stringify({
		schemaVersion: 1,
		bundlePath,
		bundleUnchanged: result.unchanged,
		createdViewManagers: result.createdViewManagers,
		capturedImages: result.capturedSkiaImages,
		totalCalls: calls.length,
		capabilities: Object.fromEntries([...byCapability.entries()].sort(
			(left, right) => right[1].count - left[1].count || left[0].localeCompare(right[0]),
		)),
	}, null, 2));
}

void main();
