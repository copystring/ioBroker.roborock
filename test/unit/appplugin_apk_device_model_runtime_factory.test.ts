import { describe, expect, it, vi, beforeEach } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import type { ApkAppPluginDeviceModelContext } from "../../src/apppluginHost/apkAppPluginDeviceSessionRuntime";
import type { ApkAppPluginDeviceNativeRuntimeEnvironment } from "../../src/apppluginHost/apkAppPluginDeviceNativeRuntimeEnvironment";
import { ApkAppPluginModelRuntime } from "../../src/apppluginHost/apkAppPluginModelRuntime";
import type { ApkAppPluginHostContract } from "../../src/apppluginHost/apkContract";

const {
	bindingMock,
	compositionMock,
	nativeEnvironmentConstructorMock,
	resolverMock,
} = vi.hoisted(() => ({
	bindingMock: vi.fn(),
	compositionMock: vi.fn(),
	nativeEnvironmentConstructorMock: vi.fn(),
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

vi.mock("../../src/apppluginHost/apkAppPluginDeviceNativeRuntimeEnvironment", async importOriginal => ({
	...await importOriginal<typeof import("../../src/apppluginHost/apkAppPluginDeviceNativeRuntimeEnvironment")>(),
	ApkAppPluginDeviceNativeRuntimeEnvironment: class {
		public constructor(options: unknown) {
			return nativeEnvironmentConstructorMock(options);
		}
	},
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
	nativeEnvironmentConstructorMock.mockReset();
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
		createSession: (uiManager: unknown) => {
			options.createModules(uiManager);
			options.onCompositionCreated?.({ session: applicationSession });
			return applicationSession;
		},
		textLayoutBackend: options.textLayoutBackend,
		dispose: options.dispose,
	}));
});

function context(
	bundlePath: string,
	deviceId = "generic-device",
	model = "generic.model",
	activeTime = 1,
): ApkAppPluginDeviceModelContext {
	return {
		authenticatedHttpPorts: {},
		session: {
			bundle: { bundlePath },
			descriptor: { device: { activeTime, deviceId, model } },
		},
	} as unknown as ApkAppPluginDeviceModelContext;
}

function nativeRuntime() {
	const sharedNativeModules = { marker: "shared" };
	const runtime = {
		attachComposition: vi.fn(),
		constantSources: vi.fn(() => [{ DeviceInfo: {} }]),
		createSharedNativeModules: vi.fn(() => sharedNativeModules),
		dispose: vi.fn(async () => undefined),
	} as unknown as ApkAppPluginDeviceNativeRuntimeEnvironment;
	return { runtime, sharedNativeModules };
}

function hostProvider(native: ReturnType<typeof nativeRuntime>) {
	const release = vi.fn(async () => undefined);
	const lease = {
		composition: {
			bootstrapPath: "C:\\adapter-data\\bridge.js",
			textLayoutBackend: {
				intrinsicWidth: () => { throw new Error("Kein Text erwartet"); },
				layout: () => { throw new Error("Kein Text erwartet"); },
			},
		},
		dataDirectory: "C:\\adapter-data\\runtime",
		initialState: { marker: "initial-state" },
		ports: { marker: "ports" },
		release,
	};
	const provider = { acquire: vi.fn(async () => lease) };
	nativeEnvironmentConstructorMock.mockReturnValue(native.runtime);
	return { lease, provider, release };
}

describe("APK AppPlugin device model runtime factory", () => {
	it("locks bundle and executable paths to the device session and packaged resolver", async () => {
		const native = nativeRuntime();
		const host = hostProvider(native);
		const factory = createApkAppPluginDeviceModelRuntimeFactory({
			contract,
			hostProvider: host.provider,
		});
		const deviceContext = context("C:\\adapter-data\\plugins\\generic\\index.android.bundle");

		const runtime = await factory({
			activeTime: 1,
			context: deviceContext,
			deviceId: "generic-device",
			model: "generic.model",
		});

		expect(runtime).toBeInstanceOf(ApkAppPluginModelRuntime);
		expect(resolverMock).toHaveBeenCalledOnce();
		expect(resolverMock).toHaveBeenCalledWith();
		expect(host.provider.acquire).toHaveBeenCalledWith(
			expect.objectContaining({ context: deviceContext, deviceId: "generic-device" }),
			expect.objectContaining({ target: "win32-x64" }),
		);
		expect(nativeEnvironmentConstructorMock).toHaveBeenCalledWith({
			context: deviceContext,
			contract,
			dataDirectory: host.lease.dataDirectory,
			initialState: host.lease.initialState,
			ports: host.lease.ports,
		});
		expect(compositionMock).toHaveBeenCalledWith(expect.objectContaining({
			bootstrapPath: "C:\\adapter-data\\bridge.js",
			bundlePath: "C:\\adapter-data\\plugins\\generic\\index.android.bundle",
			constantSources: [{ DeviceInfo: {} }],
			contract,
			hostExecutablePath: "C:\\adapter\\native\\roborock-hermes-appplugin-host.exe",
		}));
		expect(native.runtime.createSharedNativeModules).toHaveBeenCalledOnce();
		expect(bindingMock).toHaveBeenCalledWith(native.sharedNativeModules);
		expect(native.runtime.attachComposition).toHaveBeenCalledWith({ session: applicationSession });

		await runtime.stop();
		expect(native.runtime.dispose).toHaveBeenCalledOnce();
		expect(host.release).toHaveBeenCalledOnce();
	});

	it("fails before composing modules when the packaged host is unavailable", async () => {
		resolverMock.mockImplementationOnce(() => {
			throw new Error("Native-Artefakt fehlt");
		});
		const hostProvider = { acquire: vi.fn() };
		const factory = createApkAppPluginDeviceModelRuntimeFactory({
			contract,
			hostProvider,
		});

		await expect(factory({
			activeTime: 1,
			context: context("C:\\plugin\\index.android.bundle", "device", "model"),
			deviceId: "device",
			model: "model",
		})).rejects.toThrow(/Native-Artefakt fehlt/u);
		expect(hostProvider.acquire).not.toHaveBeenCalled();
		expect(compositionMock).not.toHaveBeenCalled();
	});

	it("rejects a request that does not match the resolved APK device context", async () => {
		const hostProvider = { acquire: vi.fn() };
		const factory = createApkAppPluginDeviceModelRuntimeFactory({
			contract,
			hostProvider,
		});

		await expect(factory({
			activeTime: 1,
			context: context("C:\\plugin\\index.android.bundle", "other-device"),
			deviceId: "device",
			model: "generic.model",
		})).rejects.toThrow(/stimmt nicht/u);
		expect(resolverMock).not.toHaveBeenCalled();
		expect(hostProvider.acquire).not.toHaveBeenCalled();
	});

	it("releases acquired host resources when native environment construction fails", async () => {
		const native = nativeRuntime();
		const host = hostProvider(native);
		nativeEnvironmentConstructorMock.mockImplementationOnce(() => {
			throw new Error("Ungültiger Plattformzustand");
		});
		const factory = createApkAppPluginDeviceModelRuntimeFactory({
			contract,
			hostProvider: host.provider,
		});

		await expect(factory({
			activeTime: 1,
			context: context("C:\\plugin\\index.android.bundle"),
			deviceId: "generic-device",
			model: "generic.model",
		})).rejects.toThrow(/Ungültiger Plattformzustand/u);
		expect(host.release).toHaveBeenCalledOnce();
		expect(compositionMock).not.toHaveBeenCalled();
	});

	it("releases host resources when native environment disposal throws synchronously", async () => {
		const native = nativeRuntime();
		const dispose = vi.fn(() => { throw new Error("Native Dispose fehlgeschlagen"); });
		Object.assign(native.runtime, { dispose });
		const host = hostProvider(native);
		const factory = createApkAppPluginDeviceModelRuntimeFactory({
			contract,
			hostProvider: host.provider,
		});
		const runtime = await factory({
			activeTime: 1,
			context: context("C:\\plugin\\index.android.bundle"),
			deviceId: "generic-device",
			model: "generic.model",
		});

		await expect(runtime.stop()).rejects.toThrow(/nicht sauber beendet/u);
		expect(dispose).toHaveBeenCalledOnce();
		expect(host.release).toHaveBeenCalledOnce();
	});
});
