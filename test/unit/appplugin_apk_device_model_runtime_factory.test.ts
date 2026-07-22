import { describe, expect, it, vi, beforeEach } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import type { ApkAppPluginDeviceModelContext } from "../../src/apppluginHost/apkAppPluginDeviceSessionRuntime";
import { ApkAppPluginModelRuntime } from "../../src/apppluginHost/apkAppPluginModelRuntime";
import type { ApkAppPluginSharedNativeModuleRuntimes } from "../../src/apppluginHost/apkAppPluginSharedNativeModules";
import type { ApkAppPluginHostContract } from "../../src/apppluginHost/apkContract";

const { bindingMock, compositionMock, resolverMock } = vi.hoisted(() => ({
	bindingMock: vi.fn(),
	compositionMock: vi.fn(),
	resolverMock: vi.fn(),
}));

vi.mock("../../src/apppluginHost/apkHermesHostArtifact", async importOriginal => ({
	...await importOriginal<typeof import("../../src/apppluginHost/apkHermesHostArtifact")>(),
	resolveApkHermesHostArtifact: resolverMock,
}));

vi.mock("../../src/apppluginHost/apkAppPluginNativeRuntimeComposition", async importOriginal => ({
	...await importOriginal<typeof import("../../src/apppluginHost/apkAppPluginNativeRuntimeComposition")>(),
	createApkAppPluginNativeModelRuntimeComposition: compositionMock,
}));

vi.mock("../../src/apppluginHost/apkAppPluginSharedNativeModules", async importOriginal => ({
	...await importOriginal<typeof import("../../src/apppluginHost/apkAppPluginSharedNativeModules")>(),
	createApkAppPluginSharedNativeModuleBindings: bindingMock,
}));

import { createApkAppPluginDeviceModelRuntimeFactory } from "../../src/apppluginHost/apkAppPluginDeviceModelRuntimeFactory";

const contract = contractJson as ApkAppPluginHostContract;
const applicationSession = {
	start: vi.fn(async () => undefined),
	stop: vi.fn(async () => undefined),
	runApplication: vi.fn(async () => undefined),
	unmountApplication: vi.fn(async () => undefined),
	waitForRuntimeBoundaryIdle: vi.fn(async () => 0),
	callJavaScriptModule: vi.fn(async () => undefined),
};

beforeEach(() => {
	resolverMock.mockReset();
	compositionMock.mockReset();
	bindingMock.mockReset();
	bindingMock.mockReturnValue([{ moduleName: "DeviceInfo", implementation: {} }]);
	resolverMock.mockReturnValue({
		executable: "roborock-hermes-appplugin-host.exe",
		executablePath: "C:\\adapter\\native\\roborock-hermes-appplugin-host.exe",
		hbcVersion: 96,
		hermesCommit: "4b3bf912cc0f705b51b71ce1a5b8bd79b93a451b",
		manifestPath: "C:\\adapter\\native\\artifact.json",
		protocolVersion: 1,
		schemaVersion: 1,
		sha256: "1".repeat(64),
		size: 100,
		target: "win32-x64",
	});
	compositionMock.mockImplementation(options => ({
		contract: options.contract,
		createSession: () => applicationSession,
		textLayoutBackend: options.textLayoutBackend,
	}));
});

function context(bundlePath: string): ApkAppPluginDeviceModelContext {
	return {
		authenticatedHttpPorts: {},
		session: { bundle: { bundlePath } },
	} as unknown as ApkAppPluginDeviceModelContext;
}

describe("APK AppPlugin device model runtime factory", () => {
	it("locks bundle and executable paths to the device session and packaged resolver", async () => {
		const sharedNativeModules = { marker: "shared" } as unknown as ApkAppPluginSharedNativeModuleRuntimes;
		const createSharedNativeModules = vi.fn(() => sharedNativeModules);
		const createCompositionOptions = vi.fn(() => ({
			bootstrapPath: "C:\\adapter-data\\bridge.js",
			constantSources: [],
			createSharedNativeModules,
			textLayoutBackend: {
				intrinsicWidth: () => { throw new Error("Kein Text erwartet"); },
				layout: () => { throw new Error("Kein Text erwartet"); },
			},
		}));
		const factory = createApkAppPluginDeviceModelRuntimeFactory({
			contract,
			createCompositionOptions,
		});

		const runtime = await factory({
			activeTime: 1,
			context: context("C:\\adapter-data\\plugins\\generic\\index.android.bundle"),
			deviceId: "generic-device",
			model: "generic.model",
		});

		expect(runtime).toBeInstanceOf(ApkAppPluginModelRuntime);
		expect(resolverMock).toHaveBeenCalledOnce();
		expect(resolverMock).toHaveBeenCalledWith();
		expect(createCompositionOptions).toHaveBeenCalledOnce();
		expect(compositionMock).toHaveBeenCalledWith(expect.objectContaining({
			bundlePath: "C:\\adapter-data\\plugins\\generic\\index.android.bundle",
			contract,
			hostExecutablePath: "C:\\adapter\\native\\roborock-hermes-appplugin-host.exe",
		}));
		const compositionOptions = compositionMock.mock.calls[0]?.[0] as {
			createModules(uiManager: unknown): unknown;
		};
		const uiManager = { marker: "ui-manager" };
		expect(compositionOptions.createModules(uiManager)).toEqual([
			{ moduleName: "DeviceInfo", implementation: {} },
		]);
		expect(createSharedNativeModules).toHaveBeenCalledWith(uiManager);
		expect(bindingMock).toHaveBeenCalledWith(sharedNativeModules);
	});

	it("fails before composing modules when the packaged host is unavailable", () => {
		resolverMock.mockImplementationOnce(() => {
			throw new Error("Native-Artefakt fehlt");
		});
		const createCompositionOptions = vi.fn();
		const factory = createApkAppPluginDeviceModelRuntimeFactory({
			contract,
			createCompositionOptions,
		});

		expect(() => factory({
			activeTime: 1,
			context: context("C:\\plugin\\index.android.bundle"),
			deviceId: "device",
			model: "model",
		})).toThrow(/Native-Artefakt fehlt/u);
		expect(createCompositionOptions).not.toHaveBeenCalled();
		expect(compositionMock).not.toHaveBeenCalled();
	});
});
