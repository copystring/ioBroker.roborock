import { describe, expect, it } from "vitest";

import { classifyApkNativeInvocationRejections } from "../../src/apppluginHost";

describe("APK native invocation diagnostics", () => {
	it("separates APK contract, external service, expected domain and unexpected failures", () => {
		expect(classifyApkNativeInvocationRejections([
			{
				moduleName: "MissingModule",
				methodName: "missing",
				error: { name: "MissingApkNativeMethodError", message: "missing" },
			},
			{
				moduleName: "RRPluginHttpTurboModule",
				methodName: "iotGet",
				error: { name: "ApkHostServiceUnavailableError", message: "offline" },
			},
			{
				moduleName: "RRPluginSDK",
				methodName: "getFirmwareUpdateState",
				error: { name: "Error", message: "data is null" },
			},
			{
				moduleName: "RRPluginSDK",
				methodName: "readFileListAtPath",
				error: { name: "Error", message: "filePath not exists or is not a directory" },
			},
			{
				moduleName: "UIManager",
				methodName: "measure",
				error: { name: "Error", message: "boom" },
			},
		])).toEqual({
			missingNativeCalls: ["MissingModule.missing"],
			unavailableHostServices: ["RRPluginHttpTurboModule.iotGet"],
			expectedDomainRejections: [
				"RRPluginSDK.getFirmwareUpdateState",
				"RRPluginSDK.readFileListAtPath",
			],
			unexpectedRejections: ["UIManager.measure"],
		});
	});

	it("does not hide a different firmware failure behind the APK empty-state rule", () => {
		expect(classifyApkNativeInvocationRejections([{
			moduleName: "RRPluginSDK",
			methodName: "getFirmwareUpdateState",
			error: { name: "Error", message: "transport failed" },
		}]).unexpectedRejections).toEqual(["RRPluginSDK.getFirmwareUpdateState"]);
	});

	it("does not hide a different file-list failure behind the APK missing-directory rule", () => {
		expect(classifyApkNativeInvocationRejections([{
			moduleName: "RRPluginSDK",
			methodName: "readFileListAtPath",
			error: { name: "Error", message: "permission denied" },
		}]).unexpectedRejections).toEqual(["RRPluginSDK.readFileListAtPath"]);
	});
});
