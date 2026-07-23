import { mkdirSync, writeFileSync } from "node:fs";
import * as path from "node:path";

import {
	type ApkAppPluginSessionDescriptor,
} from "../src/apppluginHost";
import { runAppPluginProductHostProof } from "./lib/appPluginProductHostProof";

async function main(): Promise<void> {
	const repositoryRoot = process.cwd();
	const pluginRoot = path.join(
		repositoryRoot,
		".AppPlugins",
		"Q10 X5+",
		"019bdf41f583723bb937ccc99bbd7541",
	);
	const model = "roborock.vacuum.ss09";
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
			deviceId: "q10-product-host-proof",
			deviceSN: "q10-product-host-proof",
			model,
			name: "Q10 Produktpfad-Nachweis",
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
			clientId: "q10-product-host-proof",
			memoryMiB: 512,
			iotOriginDevId: "q10-product-host",
		},
		account: { countryCode: "DE", serverCode: "eu" },
		homeData: { deviceJsonStrings: [], productJsonStrings: [] },
		installation: { mainPluginDownloadVersions: { [model]: 0 } },
		productRepository: { agreementsByModel: {}, userRoles: [] },
	};
	const outputPath = path.join(
		repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"runtime-probes",
		"q10-product-host-proof.json",
	);
	const report = await runAppPluginProductHostProof({
		descriptor,
		instanceDataDirectory: path.join(
			repositoryRoot,
			"artifacts",
			"appplugin-poc",
			"product-host-state",
		),
		nativeRootPath: path.join(repositoryRoot, "src", "apppluginHost", "native"),
	});
	if (!report.bundleUnchanged || !report.cleanupComplete) {
		throw new Error("Q10-Produktpfad verletzte Bundle- oder Cleanup-Invariante");
	}
	mkdirSync(path.dirname(outputPath), { recursive: true });
	writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
	process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
