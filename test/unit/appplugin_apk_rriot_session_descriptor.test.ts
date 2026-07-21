import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
	apkTimeZoneOffsetMilliseconds,
	createApkRriotDeviceContext,
	createApkRriotSessionDescriptor,
	type ApkAppPluginHomeDataContext,
} from "../../src/apppluginHost";

const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		fs.rmSync(directory, { recursive: true, force: true });
	}
});

function homeData(): ApkAppPluginHomeDataContext {
	return {
		deviceJsonStrings: [
			JSON.stringify({
				duid: "vacuum-1",
				productId: "7",
				name: "Oben",
				sn: "serial-1",
				activeTime: 1_700_000_000,
				timeZone: "Europe/Berlin",
				fv: "02.34",
				pv: "B01",
				localKey: "must-stay-inside-raw-home-data",
			}),
			JSON.stringify({
				duid: "mower-1",
				productId: 8,
				name: "Garten",
				activeTime: 1_710_000_000,
				timeZone: "Australia/Adelaide",
				fv: "03.00",
				pv: "A01",
			}),
		],
		productJsonStrings: [
			JSON.stringify({ id: 7, model: "roborock.vacuum.test" }),
			JSON.stringify({ id: "8", model: "roborock.mower.test" }),
		],
	};
}

describe("APK Rriot session descriptor", () => {
	it("derives the APK RRPluginSDK device values without a vacuum profile", () => {
		const device = createApkRriotDeviceContext({
			homeData: homeData(),
			targetDuid: "mower-1",
			userId: "rr-user",
			deviceProperties: { dockType: 4 },
			timestampMs: Date.UTC(2026, 0, 15, 12),
		});
		expect(device).toEqual({
			userId: "rr-user",
			ownerId: "rr-user",
			deviceId: "mower-1",
			deviceSN: "",
			model: "roborock.mower.test",
			name: "Garten",
			firmwareVersion: "03.00",
			protocolVersion: "A01",
			deviceProperties: { dockType: 4 },
			activeTime: 1_710_000_000,
			robotTimeZone: 10.5 * 60 * 60 * 1_000,
			iotType: 2,
		});
	});

	it("builds a validated descriptor and preserves the complete multi-device HomeData", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "appplugin-rriot-session-"));
		temporaryDirectories.push(root);
		fs.writeFileSync(path.join(root, "index.android.bundle"), "fixture");
		const context = homeData();
		const descriptor = createApkRriotSessionDescriptor({
			pluginRoot: root,
			package: { models: ["internal.plugin.family"], versionCode: 42 },
			homeData: context,
			installation: {
				mainPluginDownloadVersions: { "roborock.vacuum.test": 42 },
			},
			productRepository: {
				userRoles: [{
					role: "owner",
					products: [{
						prodModel: "roborock.vacuum.test",
						catCode: "robot.vacuum.cleaner",
					}],
				}],
			},
			targetDuid: "vacuum-1",
			userId: "rr-user",
			host: {
				mobileModel: "ioBroker",
				androidRelease: "APK contract",
				clientId: "client",
				memoryMiB: 512,
			},
			account: { countryCode: "DE", serverCode: "eu" },
			deviceProperties: {},
			timestampMs: Date.UTC(2026, 6, 15, 12),
		});
		expect(descriptor.package.models).toEqual([
			"internal.plugin.family",
			"roborock.vacuum.test",
		]);
		expect(descriptor.device.robotTimeZone).toBe(2 * 60 * 60 * 1_000);
		expect(descriptor.homeData).toEqual(context);
		expect(descriptor.installation?.mainPluginDownloadVersions).toEqual({
			"roborock.vacuum.test": 42,
		});
		expect(descriptor.productRepository?.userRoles[0]?.role).toBe("owner");
	});

	it("matches Android's GMT fallback and rejects ambiguous or incomplete HomeData", () => {
		expect(apkTimeZoneOffsetMilliseconds("not/a-zone", Date.UTC(2026, 0, 1))).toBe(0);
		const context = homeData();
		expect(() => createApkRriotDeviceContext({
			homeData: {
				...context,
				deviceJsonStrings: [
					...context.deviceJsonStrings,
					context.deviceJsonStrings[0],
				],
			},
			targetDuid: "vacuum-1",
			userId: "user",
			deviceProperties: {},
		})).toThrow("DUID vacuum-1 mehrfach");
		expect(() => createApkRriotDeviceContext({
			homeData: {
				deviceJsonStrings: [JSON.stringify({
					duid: "unknown",
					activeTime: 0,
					timeZone: "UTC",
					pv: "1.0",
				})],
				productJsonStrings: [],
			},
			targetDuid: "unknown",
			userId: "user",
			deviceProperties: {},
		})).toThrow("kein auflösbares Modell");
	});
});
