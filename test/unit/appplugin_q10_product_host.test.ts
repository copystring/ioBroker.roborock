import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
	type ApkAppPluginSessionDescriptor,
} from "../../src/apppluginHost";
import { MapDecryptor } from "../../src/lib/map/b01/MapDecryptor";
import { runAppPluginProductHostProof } from "../../scripts/lib/appPluginProductHostProof";
import { Q10_FIXTURE_DEFAULTS } from "./q10FixtureDefaults";
import { Q10_PRIMARY_SAMPLE } from "./q10RepresentativeFixture";

const repositoryRoot = path.resolve(__dirname, "..", "..");
const pluginRoot = path.join(
	repositoryRoot,
	".AppPlugins",
	"Q10 X5+",
	"019bdf41f583723bb937ccc99bbd7541",
);
const bundlePath = path.join(pluginRoot, "index.android.bundle");
const q10It = existsSync(bundlePath) ? it : it.skip;
const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { force: true, recursive: true });
	}
});

describe("Q10 unchanged AppPlugin through productive host composition", () => {
	q10It("mounts a Metro root without using the probe-only runtime graph", async () => {
		const model = "roborock.vacuum.ss09";
		const instanceDataDirectory = mkdtempSync(path.join(tmpdir(), "q10-product-host-"));
		temporaryDirectories.push(instanceDataDirectory);
		const descriptor: ApkAppPluginSessionDescriptor = {
			version: 1,
			pluginRoot,
			package: {
				models: [model],
				versionCode: 0,
			},
			device: {
				userId: "",
				ownerId: "",
				deviceId: "q10-product-host-test",
				deviceSN: "q10-product-host-test",
				model,
				name: "Q10 Produktpfad-Test",
				firmwareVersion: "02.01.00",
				protocolVersion: "B01",
				deviceProperties: {},
				activeTime: 1,
				robotTimeZone: 2,
				iotType: 2,
			},
			host: {
				mobileModel: "ioBroker AppPlugin Host",
				androidRelease: "15",
				clientId: "q10-product-host-test",
				memoryMiB: 512,
				iotOriginDevId: "q10-product-host",
			},
			account: { countryCode: "DE", serverCode: "eu" },
			homeData: { deviceJsonStrings: [], productJsonStrings: [] },
			installation: { mainPluginDownloadVersions: { [model]: 0 } },
			productRepository: { agreementsByModel: {}, userRoles: [] },
		};

		const report = await runAppPluginProductHostProof({
			descriptor,
			instanceDataDirectory,
			settleMilliseconds: 100,
		});

		expect(report).toMatchObject({
			pipeline: "productive-device-model-runtime",
			model,
			bundleKind: "javascript-source",
			bundleUnchanged: true,
			cleanupComplete: true,
		});
		expect(report.rootChildCount).toBeGreaterThan(0);
		expect(report.nodeCount).toBeGreaterThan(1);
		expect(report.operationCount).toBeGreaterThan(0);
		expect(report.nativeInvocationCount).toBeGreaterThan(0);
		expect(report.hostErrors).toEqual([]);
		expect(report.invocationRejections).toEqual([]);
	}, 30_000);

	q10It("replays the existing transport fixture through the productive ingress and original worker", async () => {
		const model = "roborock.vacuum.ss09";
		const instanceDataDirectory = mkdtempSync(path.join(tmpdir(), "q10-product-replay-"));
		temporaryDirectories.push(instanceDataDirectory);
		const decrypted = MapDecryptor.decrypt(
			Buffer.from(Q10_PRIMARY_SAMPLE),
			Q10_FIXTURE_DEFAULTS.sn,
			Q10_FIXTURE_DEFAULTS.model,
			"q10-product-replay-test",
			undefined,
			Q10_FIXTURE_DEFAULTS.localKey,
		);
		expect(decrypted).not.toBeNull();
		expect(decrypted![0]).toBe(3);
		const descriptor: ApkAppPluginSessionDescriptor = {
			version: 1,
			pluginRoot,
			package: {
				models: [model],
				versionCode: 0,
			},
			device: {
				userId: "",
				ownerId: "",
				deviceId: "q10-product-replay-test",
				deviceSN: Q10_FIXTURE_DEFAULTS.sn,
				model,
				name: "Q10 Produktpfad-Replay",
				firmwareVersion: "02.01.00",
				protocolVersion: "B01",
				deviceProperties: {},
				activeTime: 1,
				robotTimeZone: 2,
				iotType: 2,
			},
			host: {
				mobileModel: "ioBroker AppPlugin Host",
				androidRelease: "15",
				clientId: "q10-product-replay-test",
				memoryMiB: 512,
				iotOriginDevId: "q10-product-host",
			},
			account: { countryCode: "DE", serverCode: "eu" },
			homeData: { deviceJsonStrings: [], productJsonStrings: [] },
			installation: { mainPluginDownloadVersions: { [model]: 0 } },
			productRepository: { agreementsByModel: {}, userRoles: [] },
		};

		const report = await runAppPluginProductHostProof({
			agreementAndPolicy: {
				privacyProtocol: { version: "1", langUrl: "" },
				userAgreement: { version: "1", langUrl: "" },
			},
			descriptor,
			instanceDataDirectory,
			pluginAgreements: [
				{ type: "USER_AGREEMENT", version: 1, url: "" },
				{ type: "PRIVACY_POLICY", version: 1, url: "" },
			],
			replayEvents: [
				{
					kind: "dps",
					protocolVersion: "B01",
					dps: { 101: { 6: 0 } },
					waitBeforeMilliseconds: 250,
					waitAfterMilliseconds: 100,
				},
				{
					kind: "blob",
					protocolVersion: "B01",
					payload: decrypted!,
				},
			],
			settleMilliseconds: 1_000,
		});

		expect(report.bundleUnchanged).toBe(true);
		expect(report.replayResults).toMatchObject([
			{
				kind: "dps",
				ingress: { eventEmitted: true, rpcAccepted: false },
			},
			{
				kind: "blob",
				assembled: {
					kind: "b01-payload",
					duid: "q10-product-replay-test",
				},
			},
		]);
		const packageMap = report.workerDiagnostics.find(diagnostic =>
			diagnostic.kind === "call" && diagnostic.functionName === "packageMap"
		);
		expect(packageMap).toMatchObject({
			kind: "call",
			functionName: "packageMap",
			success: true,
			resultSummary: {
				type: "Object",
				fields: {
					success: { type: "boolean", value: true },
					width: { type: "number", value: 124 },
					height: { type: "number", value: 238 },
				},
			},
		});
		expect(report.workerDiagnostics.filter(diagnostic => !diagnostic.success)).toEqual([]);
		expect(report.hostErrors).toEqual([]);
		expect(report.invocationRejections).toEqual([]);
		expect(report.cleanupComplete).toBe(true);
	}, 30_000);
});
