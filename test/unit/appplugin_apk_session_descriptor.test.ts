import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	apkPluginSdkContextFromSession,
	inspectApkAppPluginSessionCompatibility,
	parseApkAppPluginProjectMetadata,
	parseApkAppPluginSessionDescriptor,
	resolveApkAppPluginSession,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;
const temporaryDirectories: string[] = [];

function pluginRoot(bundle: Buffer | string = Buffer.from([0xc6, 0x1f, 0xbc, 0x03, 0, 0, 0, 0])): string {
	const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-session-"));
	temporaryDirectories.push(root);
	fs.writeFileSync(path.join(root, "index.android.bundle"), bundle);
	return root;
}

function descriptor(root = pluginRoot()) {
	return parseApkAppPluginSessionDescriptor({
		version: 1,
		pluginRoot: root,
		package: {
			models: ["roborock.vacuum.sc01"],
			versionCode: 42,
			minSdkApiLevel: 10010,
			packagePath: "com.roborock.test",
		},
		device: {
			userId: "user-1",
			ownerId: "owner-1",
			deviceId: "device-1",
			deviceSN: "sn-1",
			model: "roborock.vacuum.sc01",
			name: "Q7",
			firmwareVersion: "4.3.5",
			protocolVersion: "B01",
			deviceProperties: { feature: "A", dockType: 3 },
			activeTime: 123,
			robotTimeZone: 3_600_000,
			iotType: 2,
		},
		host: {
			mobileModel: "ioBroker AppPlugin Host",
			androidRelease: "APK contract 4.54.02",
			clientId: "client-1",
			memoryMiB: 4096,
			iotOriginDevId: "origin-1",
		},
		account: {
			countryCode: "DE",
			serverCode: "eu",
		},
	});
}

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		fs.rmSync(directory, { recursive: true, force: true });
	}
});

describe("APK AppPlugin session descriptor", () => {
	it("resolves an unchanged Hermes bundle from a device-class-neutral descriptor", () => {
		const resolved = resolveApkAppPluginSession(descriptor(), contract);
		expect(resolved.compatibility).toMatchObject({
			status: "compatible",
			hostApiLevel: 10042,
			bundleKind: "hermes-bytecode",
			issues: [],
		});
		expect(path.basename(resolved.bundle.bundlePath)).toBe("index.android.bundle");
	});

	it("fails closed for model, API and bundle incompatibilities", () => {
		const mismatch = descriptor();
		mismatch.device.model = "roborock.washer.test";
		mismatch.package.minSdkApiLevel = 10043;
		fs.writeFileSync(path.join(mismatch.pluginRoot, "index.android.bundle"), "not a bundle");
		expect(inspectApkAppPluginSessionCompatibility(mismatch, contract)).toMatchObject({
			status: "incompatible",
			issues: [
				{ code: "bundle-format-unknown" },
				{ code: "device-model-mismatch" },
				{ code: "host-api-too-old" },
			],
		});
		expect(() => resolveApkAppPluginSession(mismatch, contract)).toThrow(/inkompatibel/u);
	});

	it("keeps dynamic HomeData properties out of the static APK RRPluginSDK context", () => {
		const source = descriptor();
		expect(apkPluginSdkContextFromSession(source, "file:///plugin/", "C:/storage"))
			.toMatchObject({
				deviceModel: "roborock.vacuum.sc01",
				robotTimeZone: 3_600_000,
			});
		expect(apkPluginSdkContextFromSession(source, "file:///plugin/", "C:/storage"))
			.not.toHaveProperty("deviceExtra");
		expect(source.device.deviceProperties).toEqual({ feature: "A", dockType: 3 });
		expect(source.device.protocolVersion).toBe("B01");
		expect(source.account).toEqual({ countryCode: "DE", serverCode: "eu" });
	});

	it("requires the HomeData protocol instead of inferring it from the model", () => {
		const source = JSON.parse(JSON.stringify(descriptor())) as {
			device: Record<string, unknown>;
			[key: string]: unknown;
		};
		delete source.device.protocolVersion;
		expect(() => parseApkAppPluginSessionDescriptor(source)).toThrow(/device\.protocolVersion/u);
	});

	it("migrates legacy descriptor deviceExtra into the dynamic property store", () => {
		const source = JSON.parse(JSON.stringify(descriptor())) as {
			device: Record<string, unknown>;
			[key: string]: unknown;
		};
		source.device.deviceExtra = source.device.deviceProperties;
		delete source.device.deviceProperties;
		expect(parseApkAppPluginSessionDescriptor(source).device.deviceProperties)
			.toEqual({ feature: "A", dockType: 3 });
	});

	it.each([
		"roborock.washer.test",
		"roborock.mower.test",
	])("does not constrain the generic runtime to vacuum models (%s)", model => {
		const source = descriptor();
		source.device.model = model;
		source.package.models = [model];
		expect(resolveApkAppPluginSession(source, contract).compatibility.status).toBe("compatible");
	});

	it("parses project.json metadata without introducing a device-class mapping", () => {
		expect(parseApkAppPluginProjectMetadata({
			models: "roborock.vacuum.t4v2, roborock.vacuum.t4v3",
			developer_id: "258089735",
			version_code: 2145,
			min_sdk_api_level: 10010,
			package_path: "com.roborock.tanos",
		})).toEqual({
			models: ["roborock.vacuum.t4v2", "roborock.vacuum.t4v3"],
			developerId: "258089735",
			versionCode: 2145,
			minSdkApiLevel: 10010,
			packagePath: "com.roborock.tanos",
			productId: undefined,
		});
	});
});
