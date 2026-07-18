import * as fs from "node:fs";
import * as path from "node:path";

import { createApkBridgeBootstrap } from "../src/apppluginHost/apkBridgeBootstrap";
import {
	createApkDeviceInfoConstants,
	createApkGestureHandlerConstants,
	createApkLocalizationConstants,
	createApkPluginSdkConstants,
	createApkSafeAreaConstants,
	mergeApkNativeModuleConstants,
} from "../src/apppluginHost/apkCoreRuntimeConstants";
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
const conformanceDisplay = {
	width: 1_080,
	height: 2_400,
	scale: 3,
	fontScale: 1,
	densityDpi: 480,
};
const conformanceConstants = mergeApkNativeModuleConstants(
	createApkDeviceInfoConstants(conformanceDisplay, conformanceDisplay),
	createApkSafeAreaConstants({
		insets: { top: 0, right: 0, bottom: 0, left: 0 },
		frame: { x: 0, y: 0, width: 360, height: 800 },
	}),
	createApkLocalizationConstants({
		language: "en",
		localeIdentifier: "en-US",
		isRTL: false,
		doLeftAndRightSwapInRTL: true,
	}),
	createApkGestureHandlerConstants(),
	createApkPluginSdkConstants(contract as ApkAppPluginHostContract, {
		userId: "conformance-user",
		basePath: "file:///conformance-appplugin/",
		deviceId: "conformance-device",
		deviceSN: "",
		ownerId: "conformance-owner",
		deviceModel: "conformance.model",
		mobileModel: "ioBroker AppPlugin Conformance Host",
		androidRelease: "APK contract 4.54.02",
		deviceName: null,
		storageBasePath: "conformance-storage",
		activeTime: 0,
		robotTimeZone: 0,
		iotType: 2,
		memoryMiB: 1024,
		clientId: "conformance-client",
	}),
);
const source = [
	"// GENERATED from the APK host contract with explicit conformance-fixture display and locale inputs.",
	"// Do not edit this JavaScript directly.",
	createApkBridgeBootstrap(contract as ApkAppPluginHostContract, conformanceConstants),
].join("\n");
fs.writeFileSync(outputPath, source, "utf8");
process.stdout.write(`${JSON.stringify({ contractPath, outputPath, bytes: Buffer.byteLength(source) })}\n`);
