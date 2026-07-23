import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
	type ApkAppPluginSessionDescriptor,
} from "../../src/apppluginHost";
import { runAppPluginProductHostProof } from "../../scripts/lib/appPluginProductHostProof";

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
});
