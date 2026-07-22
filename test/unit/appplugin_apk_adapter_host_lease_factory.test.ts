import {
	existsSync,
	mkdtempSync,
	mkdirSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkAppPluginDeviceNativeRuntimeEnvironment,
	ApkUiManagerRuntime,
	createApkAppPluginAdapterHostLeaseFactory,
	type ApkAndroidTextLayoutBackend,
	type ApkAppPluginAdapterDeviceRuntimePorts,
	type ApkAppPluginAdapterSkiaHost,
	type ApkAppPluginDeviceModelContext,
	type ApkAppPluginDeviceNativeRuntimeInitialState,
	type ApkAppPluginHostContract,
	type ApkAppPluginModelRuntimeRequest,
	type ApkHermesHostArtifact,
	type ApkHermesSkiaRuntime,
} from "../../src/apppluginHost";
import { createCanvasKitSkiaHost } from "../../src/lib/appplugin/CanvasKitSkiaHost";

const contract = contractJson as ApkAppPluginHostContract;
const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { force: true, recursive: true });
	}
});

function temporaryRoot(prefix: string): string {
	const directory = mkdtempSync(path.join(tmpdir(), prefix));
	temporaryDirectories.push(directory);
	return directory;
}

function context(root: string): ApkAppPluginDeviceModelContext {
	const pluginRoot = path.join(root, "plugin");
	mkdirSync(pluginRoot, { recursive: true });
	const bundlePath = path.join(pluginRoot, "index.android.bundle");
	writeFileSync(bundlePath, "var originalBundle = true;", "utf8");
	const call = async () => "{}";
	return {
		authenticatedHttpPorts: {
			iot: { delete: call, get: call, post: call, postJson: call, put: call, putJson: call },
			user: { delete: call, get: call, post: call, postJson: call, put: call, putJson: call },
		},
		session: {
			bundle: { bundlePath },
			descriptor: {
				version: 1,
				pluginRoot,
				package: { models: ["roborock.generic.model"], versionCode: 7 },
				device: {
					userId: "user-1",
					ownerId: "owner-1",
					deviceId: "device-1",
					deviceSN: "serial-1",
					model: "roborock.generic.model",
					name: "Gerät",
					firmwareVersion: "02.01.00",
					protocolVersion: "1.0",
					deviceProperties: { featureSet: 1 },
					activeTime: 10,
					robotTimeZone: 2,
					iotType: 1,
				},
				host: {
					mobileModel: "ioBroker",
					androidRelease: "15",
					clientId: "client-1",
					memoryMiB: 512,
				},
				account: { countryCode: "DE", serverCode: "eu" },
				homeData: { deviceJsonStrings: [], productJsonStrings: [] },
				installation: { mainPluginDownloadVersions: { "roborock.generic.model": 7 } },
				productRepository: { userRoles: [] },
			},
		},
	} as unknown as ApkAppPluginDeviceModelContext;
}

function request(root: string): ApkAppPluginModelRuntimeRequest<ApkAppPluginDeviceModelContext> {
	return {
		activeTime: 10,
		context: context(root),
		deviceId: "device-1",
		model: "roborock.generic.model",
	};
}

function artifact(): ApkHermesHostArtifact {
	return { target: "win32-x64" } as unknown as ApkHermesHostArtifact;
}

function initialState(): ApkAppPluginDeviceNativeRuntimeInitialState {
	return {
		appState: "active",
		darkMode: {
			storedColorModel: "default",
			systemColorScheme: "light",
			cardStyle: 0,
		},
		localization: {
			language: "de",
			localeIdentifier: "de_DE",
			systemLocaleIdentifier: "de_DE",
			isRTL: false,
			allowRTL: true,
			forceRTL: false,
			doLeftAndRightSwapInRTL: true,
		},
		network: {
			type: "wifi",
			isInternetReachable: true,
			isWifiEnabled: true,
			details: { strength: 100 },
		},
		orientation: {
			current: "PORTRAIT",
			autoRotateEnabled: true,
			device: "PORTRAIT",
		},
		platform: {
			apiLevel: 35,
			serial: "host-serial",
			fingerprint: "iobroker/appplugin",
			manufacturer: "ioBroker",
			brand: "ioBroker",
			isTesting: false,
			uiMode: "desk",
		},
		safeArea: {
			insets: { top: 0, right: 0, bottom: 0, left: 0 },
			frame: { x: 0, y: 0, width: 1200, height: 800 },
		},
		screenMetrics: {
			width: 1200, height: 800, scale: 1, fontScale: 1, densityDpi: 96,
		},
		windowMetrics: {
			width: 1200, height: 800, scale: 1, fontScale: 1, densityDpi: 96,
		},
	};
}

function devicePorts(): ApkAppPluginAdapterDeviceRuntimePorts {
	return {
		appSys: {
			networkReachable: () => true,
			writeLog: vi.fn(),
		},
		deviceTransport: {
			connectLocalDeviceIfNeeded: () => 1,
			deviceOnline: async () => true,
			loadShadowDps: async () => "{}",
			publishDps: vi.fn(async () => undefined),
		},
		hasActivity: () => true,
		http: {},
		intent: {
			initialUrl: () => null,
			canOpenUrl: async () => false,
			openUrl: async () => undefined,
			openApplicationSettings: async () => undefined,
			canSendIntent: async () => false,
			sendIntent: async () => undefined,
		},
		permissions: {
			isBluetoothEnabled: () => false,
			isLocationEnabled: () => false,
			isWifiEnabled: () => true,
		},
		platformServices: {
			androidId: "adapter-installation-id",
			readClipboardText: async () => "",
			writeClipboardText: async () => undefined,
			invokeDefaultBackPressHandler: vi.fn(),
			showToast: vi.fn(),
			vibrate: vi.fn(),
		},
		rpc: {
			endpoint: "endpoint-1",
			nonce: "nonce-1",
			transport: {
				sendJson: vi.fn(async () => undefined),
				sendProtobuf: vi.fn(async () => undefined),
			},
		},
		sdkEnvironment: {
			loadOtaInfo: async () => null,
			loadAgreementAndPolicy: async () => ({
				privacyProtocol: { version: null, langUrl: null },
				userAgreement: { version: null, langUrl: null },
			}),
			loadPluginAgreements: async () => [],
		},
		emitAnalytics: vi.fn(),
		reportException: vi.fn(),
	};
}

function fakeSkiaHost(dispose = vi.fn()): ApkAppPluginAdapterSkiaHost {
	return {
		api: { marker: "skia-api" },
		viewApi: { marker: "skia-view-api" },
		setViewOrder: vi.fn(),
		exportLatestPng: vi.fn(),
		getDiagnostics: vi.fn(),
		dispose,
	} as unknown as ApkAppPluginAdapterSkiaHost;
}

function textBackend(): ApkAndroidTextLayoutBackend {
	return {
		intrinsicWidth: vi.fn(() => 0),
		layout: vi.fn(() => ({ height: 0, lineCount: 0, width: 0 })),
	};
}

describe("APK AppPlugin adapter host lease factory", () => {
	it("owns runtime paths and Skia while preserving generic adapter device ports", async () => {
		const root = temporaryRoot("roborock-adapter-host-");
		const requested = request(root);
		const state = initialState();
		const ports = devicePorts();
		const releaseDeviceHost = vi.fn(async () => undefined);
		const acquireDeviceHost = vi.fn(async () => ({
			initialState: state,
			ports,
			release: releaseDeviceHost,
		}));
		const disposeSkia = vi.fn();
		const skiaHost = fakeSkiaHost(disposeSkia);
		const createSkiaHost = vi.fn(async () => skiaHost);
		const skiaRuntime = { invoke: vi.fn() } as unknown as ApkHermesSkiaRuntime;
		const backend = textBackend();
		const factory = createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: root,
			acquireDeviceHost,
			composition: {
				maxHeapMegabytes: 192,
				...({
					bootstrapPath: "C:\\nicht-erlaubt.js",
					bootstrapSuffix: "globalThis.__probe = true;",
				} as unknown as object),
			},
			createLeaseId: () => "lease-1",
			createSkiaHost,
			createSkiaRuntime: host => {
				expect(host).toBe(skiaHost);
				return skiaRuntime;
			},
			createTextLayoutBackend: api => {
				expect(api).toBe(skiaHost.api);
				return backend;
			},
		});

		const lease = await factory(requested, artifact());

		expect(acquireDeviceHost).toHaveBeenCalledWith(requested, expect.objectContaining({ target: "win32-x64" }));
		expect(createSkiaHost).toHaveBeenCalledWith({
			bundleRoot: path.dirname(requested.context.session.bundle.bundlePath),
			fontPaths: undefined,
			height: 800,
			width: 1200,
		});
		expect(lease.initialState).not.toBe(state);
		expect(lease.ports.deviceTransport).toBe(ports.deviceTransport);
		expect(lease.ports.installSkia()).toBe(true);
		expect(lease.composition).toMatchObject({
			maxHeapMegabytes: 192,
			skiaRuntime,
			textLayoutBackend: backend,
		});
		expect(lease.composition.bootstrapPath).not.toBe("C:\\nicht-erlaubt.js");
		expect(lease.composition).not.toHaveProperty("bootstrapSuffix");
		expect(lease.composition.bootstrapPath).toContain(path.join("appplugin-runtime", "sessions"));
		expect(lease.dataDirectory).toBe(realPath(path.join(root, "appplugin-runtime", "state")));
		const leaseDirectory = path.dirname(lease.composition.bootstrapPath);
		expect(existsSync(leaseDirectory)).toBe(true);

		await lease.release();
		await lease.release();
		expect(disposeSkia).toHaveBeenCalledOnce();
		expect(releaseDeviceHost).toHaveBeenCalledOnce();
		expect(existsSync(leaseDirectory)).toBe(false);
	});

	it("cleans every acquired resource if composition construction fails", async () => {
		const root = temporaryRoot("roborock-adapter-host-failure-");
		const releaseDeviceHost = vi.fn(async () => undefined);
		const disposeSkia = vi.fn();
		const factory = createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: root,
			acquireDeviceHost: async () => ({
				initialState: initialState(),
				ports: devicePorts(),
				release: releaseDeviceHost,
			}),
			createLeaseId: () => "failed-lease",
			createSkiaHost: async () => fakeSkiaHost(disposeSkia),
			createTextLayoutBackend: () => { throw new Error("Textbackend fehlgeschlagen"); },
		});

		await expect(factory(request(root), artifact())).rejects.toThrow(/Textbackend fehlgeschlagen/u);
		expect(disposeSkia).toHaveBeenCalledOnce();
		expect(releaseDeviceHost).toHaveBeenCalledOnce();
	});

	it("aggregates independent Skia and adapter cleanup failures", async () => {
		const root = temporaryRoot("roborock-adapter-host-cleanup-");
		const releaseDeviceHost = vi.fn(async () => { throw new Error("Gerätehost blieb offen"); });
		const disposeSkia = vi.fn(() => { throw new Error("Skia blieb offen"); });
		const factory = createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: root,
			acquireDeviceHost: async () => ({
				initialState: initialState(),
				ports: devicePorts(),
				release: releaseDeviceHost,
			}),
			createSkiaHost: async () => fakeSkiaHost(disposeSkia),
			createTextLayoutBackend: () => textBackend(),
		});
		const lease = await factory(request(root), artifact());

		const release = lease.release();
		await expect(release).rejects.toMatchObject({
			message: expect.stringMatching(/nicht sauber freigegeben/u),
			errors: expect.arrayContaining([
				expect.objectContaining({ message: "Skia blieb offen" }),
				expect.objectContaining({ message: "Gerätehost blieb offen" }),
			]),
		});
		await expect(lease.release()).rejects.toBeInstanceOf(AggregateError);
		expect(disposeSkia).toHaveBeenCalledOnce();
		expect(releaseDeviceHost).toHaveBeenCalledOnce();
	});

	it("rejects invalid display metrics after releasing the acquired adapter ports", async () => {
		const root = temporaryRoot("roborock-adapter-host-metrics-");
		const state = initialState();
		state.windowMetrics.width = 0;
		const releaseDeviceHost = vi.fn(async () => undefined);
		const createSkiaHost = vi.fn(async () => fakeSkiaHost());
		const factory = createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: root,
			acquireDeviceHost: async () => ({
				initialState: state,
				ports: devicePorts(),
				release: releaseDeviceHost,
			}),
			createSkiaHost,
		});

		await expect(factory(request(root), artifact())).rejects.toThrow(/Fensterbreite/u);
		expect(releaseDeviceHost).toHaveBeenCalledOnce();
		expect(createSkiaHost).not.toHaveBeenCalled();
	});

	it("creates a real CanvasKit lease accepted by the productive native environment", async () => {
		const root = temporaryRoot("roborock-adapter-host-real-");
		const requested = request(root);
		const releaseDeviceHost = vi.fn(async () => undefined);
		const factory = createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: root,
			acquireDeviceHost: async () => ({
				initialState: initialState(),
				ports: devicePorts(),
				release: releaseDeviceHost,
			}),
			createSkiaHost: options => createCanvasKitSkiaHost({
				...options,
				fontPaths: options.fontPaths ? [...options.fontPaths] : undefined,
			}),
		});
		const lease = await factory(requested, artifact());
		const environment = new ApkAppPluginDeviceNativeRuntimeEnvironment({
			context: requested.context,
			contract,
			dataDirectory: lease.dataDirectory,
			initialState: lease.initialState,
			ports: lease.ports,
		});

		const modules = environment.createSharedNativeModules(new ApkUiManagerRuntime(contract));
		expect(modules.skiaModule.install()).toBe(true);
		expect(environment.constantSources().length).toBeGreaterThan(5);

		await environment.dispose();
		await lease.release();
		expect(releaseDeviceHost).toHaveBeenCalledOnce();
	});

	it("rejects a relative instance data directory before acquiring device resources", () => {
		const acquireDeviceHost = vi.fn();
		expect(() => createApkAppPluginAdapterHostLeaseFactory({
			instanceDataDirectory: "relative/data",
			acquireDeviceHost,
			createSkiaHost: vi.fn(),
		})).toThrow(/muss absolut sein/u);
		expect(acquireDeviceHost).not.toHaveBeenCalled();
	});
});

function realPath(value: string): string {
	return path.resolve(value);
}
