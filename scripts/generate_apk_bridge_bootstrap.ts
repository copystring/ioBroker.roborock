import * as fs from "node:fs";
import * as path from "node:path";

import { createApkBridgeBootstrap } from "../src/apppluginHost/apkBridgeBootstrap";
import {
	assertApkAppPluginHostContract,
	type ApkAppPluginHostContract,
} from "../src/apppluginHost/apkContract";

const repositoryRoot = path.resolve(process.cwd());
const contractPath = path.join(
	repositoryRoot,
	"src",
	"apppluginHost",
	"generated",
	"apk-appplugin-host-contract.json",
);
const outputPath = path.join(
	repositoryRoot,
	"tools",
	"hermes-appplugin-host",
	"bridge_bootstrap.js",
);

const contract: unknown = JSON.parse(fs.readFileSync(contractPath, "utf8"));
assertApkAppPluginHostContract(contract);
const source = [
	"// GENERATED from the APK host contract. Do not edit this JavaScript directly.",
	createApkBridgeBootstrap(contract as ApkAppPluginHostContract),
].join("\n");
fs.writeFileSync(outputPath, source, "utf8");
process.stdout.write(`${JSON.stringify({ contractPath, outputPath, bytes: Buffer.byteLength(source) })}\n`);
