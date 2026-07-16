import * as fs from "node:fs";
import * as path from "node:path";

import { describe, expect, it, vi } from "vitest";

import {
	createApkBridgeBootstrap,
	createApkRemoteModuleDefinitions,
} from "../../src/apppluginHost/apkBridgeBootstrap";
import type { ApkAppPluginHostContract } from "../../src/apppluginHost/apkContract";
import { ApkNativeModuleDispatcher } from "../../src/apppluginHost/apkNativeModuleDispatcher";
import {
	MissingApkNativeMethodError,
	StrictApkNativeModuleRegistry,
} from "../../src/apppluginHost/strictNativeModuleRegistry";

function loadContract(): ApkAppPluginHostContract {
	return JSON.parse(fs.readFileSync(
		path.resolve(__dirname, "../../src/apppluginHost/generated/apk-appplugin-host-contract.json"),
		"utf8",
	)) as ApkAppPluginHostContract;
}

describe("APK-derived Hermes bridge bootstrap", () => {
	it("derives module, method, Promise and sync metadata from the generated APK contract", () => {
		const contract = loadContract();
		const definitions = createApkRemoteModuleDefinitions(contract);
		const pluginSdk = definitions.find(definition => definition.moduleName === "RRPluginSDK");
		expect(pluginSdk).toBeDefined();
		expect(pluginSdk?.constants).toBeNull();
		expect(pluginSdk?.methods).toEqual(expect.arrayContaining([
			"callMethod",
			"callMethodPb",
			"getMapData",
			"getMapDataByPb",
			"getRobotBlobByPb",
			"getRobotData",
		]));
		const apkModule = contract.nativeModules.find(module =>
			module.installedByHost && module.moduleName === "RRPluginSDK"
		);
		if (!apkModule || !pluginSdk) throw new Error("RRPluginSDK fehlt im APK-Vertrag");
		const expectedPromiseNames = apkModule.methods
			.filter(method => method.parameters.includes("Promise"))
			.map(method => method.name);
		expect(pluginSdk.promiseMethodIndices.map(index => pluginSdk.methods[index]))
			.toEqual(expectedPromiseNames);
	});

	it("contains only strict native hooks and no Phase-0 constants or fallback methods", () => {
		const source = createApkBridgeBootstrap(loadContract(), {
			RRPluginSDK: { apiLevel: 10010 },
		});
		expect(source).toContain("__apkNativeInvoke");
		expect(source).toContain("__apkNativeFlushQueue");
		expect(source).toContain("__apkUnmarshalHostValue");
		expect(source).toContain("__apkSettleHostPromise");
		expect(source).toContain("__apkEmitDeviceEvent");
		expect(source).toContain("__apkRunApplication");
		expect(source).toContain('"AppRegistry", "runApplication"');
		expect(source).toContain('"RCTDeviceEventEmitter", "emit"');
		expect(source).toContain("return new Promise(function apkNativePromise");
		expect(source).toContain('"RRPluginSDK",{"apiLevel":10010}');
		expect(source).not.toContain("phase0");
		expect(source).not.toContain("capturedFallbackCall");
		expect(source).not.toContain("phase0-owner");
		expect(source).not.toContain("Object.preventExtensions");
	});

	it("dispatches only APK-declared methods to explicitly registered implementations", () => {
		const contract = loadContract();
		const registry = new StrictApkNativeModuleRegistry(contract);
		const pluginSdk = contract.nativeModules.find(module =>
			module.installedByHost && module.moduleName === "RRPluginSDK"
		);
		if (!pluginSdk) throw new Error("RRPluginSDK fehlt im APK-Vertrag");
		const callMethod = vi.fn((method: string) => `called:${method}`);
		registry.register(pluginSdk.javaClass, { callMethod });
		const dispatcher = new ApkNativeModuleDispatcher(contract, registry);

		expect(dispatcher.invoke("RRPluginSDK", "callMethod", ["get_status", [], null, vi.fn()]))
			.toBe("called:get_status");
		expect(callMethod).toHaveBeenCalledOnce();
		expect(() => dispatcher.invoke("RRPluginSDK", "inventedMethod", []))
			.toThrowError(MissingApkNativeMethodError);
		expect(() => dispatcher.invoke("RRPluginSDK", "getMapData", []))
			.toThrowError(MissingApkNativeMethodError);
	});
});
