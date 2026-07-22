import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkNativeModuleBindingBuilder,
	ApkUiManagerRuntime,
	createApkAppPluginNativeModelRuntimeComposition,
	createApkAppPluginNativeRuntimeComposition,
	type ApkAndroidTextLayoutBackend,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;
const temporaryDirectories: string[] = [];
const textLayoutBackend: ApkAndroidTextLayoutBackend = {
	intrinsicWidth: () => { throw new Error("Kein Text erwartet"); },
	layout: () => { throw new Error("Kein Text erwartet"); },
};

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { recursive: true, force: true });
	}
});

function bootstrapPath(): string {
	const directory = mkdtempSync(path.join(tmpdir(), "roborock-native-composition-"));
	temporaryDirectories.push(directory);
	return path.join(directory, "apk-bridge-bootstrap.js");
}

describe("APK AppPlugin native runtime composition", () => {
	it("binds named APK modules and the shared UIManager into one Hermes composition", () => {
		const modules = new ApkNativeModuleBindingBuilder();
		modules.register("DeviceInfo", {});
		modules.register("Clipboard", {
			getString: () => "Küche",
			setString: () => undefined,
		});
		const uiManager = new ApkUiManagerRuntime(contract);
		const outputPath = bootstrapPath();
		const onNativeInvocation = vi.fn();

		const composition = createApkAppPluginNativeRuntimeComposition({
			contract,
			constantSources: [{ Clipboard: { value: "original" } }],
			uiManager,
			modules: modules.bindings(),
			bootstrapSuffix: "\n/* probe suffix */\n",
			bootstrapPath: outputPath,
			bundlePath: process.execPath,
			hostExecutablePath: process.execPath,
			onNativeInvocation,
		});

		expect(composition.registry.get("UIManager")).toBe(uiManager);
		expect(composition.dispatcher.invoke("Clipboard", "getString", [])).toBe("Küche");
		expect(onNativeInvocation).toHaveBeenCalledWith("Clipboard", "getString", []);
		expect(composition.definitions.find(module => module.moduleName === "Clipboard")?.constants)
			.toEqual({ value: "original" });
		expect(composition.implementationCoverage.registeredModuleCount).toBe(3);
		expect(readFileSync(outputPath, "utf8")).toBe(composition.bootstrapSource);
		expect(composition.bootstrapSource).toContain("/* probe suffix */");
	});

	it("rejects duplicate, reserved and non-APK module bindings centrally", () => {
		const modules = new ApkNativeModuleBindingBuilder();
		expect(() => modules.register("", {})).toThrow(/nicht leer/u);
		modules.register("DeviceInfo", {});
		expect(() => modules.register("DeviceInfo", {})).toThrow(/doppelt/u);
		expect(() => modules.register("UIManager", {})).toThrow(/Modell-Runtime/u);
		expect(() => createApkAppPluginNativeRuntimeComposition({
			contract,
			constantSources: [{ Clipboard: {} }, { Clipboard: {} }],
			uiManager: new ApkUiManagerRuntime(contract),
			modules: [],
			bootstrapPath: bootstrapPath(),
			bundlePath: process.execPath,
			hostExecutablePath: process.execPath,
		})).toThrow(/Doppelte APK-Konstanten/u);
		expect(() => createApkAppPluginNativeRuntimeComposition({
			contract,
			constantSources: [],
			uiManager: new ApkUiManagerRuntime(contract),
			modules: [
				{ moduleName: "DeviceInfo", implementation: {} },
				{ moduleName: "DeviceInfo", implementation: {} },
			],
			bootstrapPath: bootstrapPath(),
			bundlePath: process.execPath,
			hostExecutablePath: process.execPath,
		})).toThrow(/doppelt/u);

		expect(() => createApkAppPluginNativeRuntimeComposition({
			contract,
			constantSources: [],
			uiManager: new ApkUiManagerRuntime(contract),
			modules: [{ moduleName: "ErfundenesModul", implementation: {} }],
			bootstrapPath: bootstrapPath(),
			bundlePath: process.execPath,
			hostExecutablePath: process.execPath,
		})).toThrow(/kein effektives Native Module/u);
	});

	it("hands the model runtime's exact UIManager to module and session composition", () => {
		let observedUiManager: ApkUiManagerRuntime | undefined;
		let composedUiManager: unknown;
		const onCompositionCreated = vi.fn(composition => {
			composedUiManager = composition.registry.get("UIManager");
		});
		const modelComposition = createApkAppPluginNativeModelRuntimeComposition({
			contract,
			constantSources: [],
			textLayoutBackend,
			createModules: uiManager => {
				observedUiManager = uiManager;
				return [{ moduleName: "DeviceInfo", implementation: {} }];
			},
			onCompositionCreated,
			bootstrapPath: bootstrapPath(),
			bundlePath: process.execPath,
			hostExecutablePath: process.execPath,
		});
		const modelUiManager = new ApkUiManagerRuntime(contract);

		const session = modelComposition.createSession(modelUiManager);

		expect(session.state).toBe("idle");
		expect(observedUiManager).toBe(modelUiManager);
		expect(composedUiManager).toBe(modelUiManager);
		expect(onCompositionCreated).toHaveBeenCalledOnce();
	});
});
