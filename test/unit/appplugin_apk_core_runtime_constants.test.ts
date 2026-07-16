import { describe, expect, it } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	createApkDeviceInfoConstants,
	createApkLocalizationConstants,
	createApkPluginSdkConstants,
	mergeApkNativeModuleConstants,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost/apkCoreRuntimeConstants";

const contract = contractJson as ApkAppPluginHostContract;

describe("APK core runtime constants", () => {
	it("reproduces the APK DeviceInfo Dimensions shape from host display metrics", () => {
		const constants = createApkDeviceInfoConstants(
			{ width: 1080, height: 2200, scale: 3, fontScale: 1, densityDpi: 480 },
			{ width: 1080, height: 2400, scale: 3, fontScale: 1, densityDpi: 480 },
		);
		expect(constants).toEqual({
			DeviceInfo: {
				Dimensions: {
					windowPhysicalPixels: {
						width: 1080,
						height: 2200,
						scale: 3,
						fontScale: 1,
						densityDpi: 480,
					},
					screenPhysicalPixels: {
						width: 1080,
						height: 2400,
						scale: 3,
						fontScale: 1,
						densityDpi: 480,
					},
				},
			},
		});
	});

	it("reproduces both APK localization constant maps", () => {
		expect(createApkLocalizationConstants({
			language: "de",
			localeIdentifier: "de_DE",
			isRTL: false,
			doLeftAndRightSwapInRTL: true,
		})).toEqual({
			I18nManager: {
				isRTL: false,
				doLeftAndRightSwapInRTL: true,
				localeIdentifier: "de_DE",
			},
			ReactLocalization: { language: "de" },
		});
	});


	it("reproduces RRPluginSDK constants with APK literals and explicit runtime context", () => {
		const constants = createApkPluginSdkConstants(contract, {
			userId: "u-1",
			basePath: "file:///plugin/Resources/",
			deviceId: "did-1",
			deviceSN: "sn-1",
			ownerId: "owner-1",
			deviceModel: "roborock.vacuum.test",
			mobileModel: "Pixel Test",
			androidRelease: "15",
			deviceName: "Testroboter",
			storageBasePath: "C:/runtime/device-data",
			activeTime: 1234,
			robotTimeZone: 7_200_000,
			iotType: 2,
			memoryMiB: 8192,
			iotOriginDevId: "origin-1",
			clientId: "client-1",
		});
		expect(constants).toEqual({
			RRPluginSDK: {
				userId: "u-1",
				apiLevel: 10042,
				basePath: "file:///plugin/Resources/",
				deviceExtra: {},
				deviceId: "did-1",
				deviceSN: "sn-1",
				ownerId: "owner-1",
				deviceModel: "roborock.vacuum.test",
				systemInfo: {
					mobileModel: "Pixel Test",
					sysVersion: "15",
					sysName: "Android",
				},
				devMode: false,
				mobileModel: "Pixel Test",
				deviceName: "Testroboter",
				storageBasePath: "C:/runtime/device-data",
				deviceNameChangedEvent: "deviceNameChange",
				audioPlayerDidFinishPlayingEvent: "playComplete",
				activeTime: 1234,
				robotTimeZone: 7_200_000,
				iotType: 2,
				appVersion: "4.54.02",
				userScope: "",
				deviceCategory: "",
				memory: 8192,
				iotOriginDevId: "origin-1",
				clientID: "client-1",
			},
		});
	});

	it("omits the APK-conditional iotOriginDevId and rejects incomplete host identity", () => {
		const context = {
			userId: "",
			basePath: "file:///plugin/Resources/",
			deviceId: "did-1",
			deviceSN: "",
			ownerId: "",
			deviceModel: "roborock.vacuum.test",
			mobileModel: "Runtime Probe",
			androidRelease: "15",
			deviceName: null,
			storageBasePath: "C:/runtime/device-data",
			activeTime: 0,
			robotTimeZone: 0,
			iotType: 2 as const,
			memoryMiB: 1024,
			clientId: "client-1",
		};
		expect(createApkPluginSdkConstants(contract, context).RRPluginSDK)
			.not.toHaveProperty("iotOriginDevId");
		expect(() => createApkPluginSdkConstants(contract, { ...context, deviceModel: "" }))
			.toThrow(/deviceModel/u);
	});

	it("rejects invalid metrics and duplicate module ownership", () => {
		expect(() => createApkDeviceInfoConstants(
			{ width: 0, height: 1, scale: 1, fontScale: 1, densityDpi: 160 },
			{ width: 1, height: 1, scale: 1, fontScale: 1, densityDpi: 160 },
		)).toThrow(/window\.width/u);
		expect(() => mergeApkNativeModuleConstants(
			{ DeviceInfo: {} },
			{ DeviceInfo: {} },
		)).toThrow(/Doppelte APK-Konstanten/u);
	});
});
