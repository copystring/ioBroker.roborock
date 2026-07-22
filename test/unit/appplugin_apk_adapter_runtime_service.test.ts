import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import type { ApkAppPluginModelRuntime } from "../../src/apppluginHost/apkAppPluginModelRuntime";
import type { ApkAppPluginManagedModelRuntime } from "../../src/apppluginHost/apkAppPluginSessionSupervisor";

const { modelFactoryBuilderMock } = vi.hoisted(() => ({
	modelFactoryBuilderMock: vi.fn(),
}));

vi.mock("../../src/apppluginHost/apkAppPluginDeviceModelRuntimeFactory", async importOriginal => ({
	...await importOriginal<typeof import("../../src/apppluginHost/apkAppPluginDeviceModelRuntimeFactory")>(),
	createApkAppPluginDeviceModelRuntimeFactory: modelFactoryBuilderMock,
}));

import {
	ApkAppPluginAdapterRuntimeService,
	ApkAppPluginAuthenticatedAccountRuntime,
	type ApkAppPluginDevicePackageRepository,
	type ApkAppPluginHostContract,
	type ApkAppPluginShutdownHostProvider,
	type ApkInstalledMainPluginPackage,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;
const temporaryDirectories: string[] = [];

beforeEach(() => {
	modelFactoryBuilderMock.mockReset();
});

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { force: true, recursive: true });
	}
});

function installedPackage(): ApkInstalledMainPluginPackage {
	const activeDirectory = mkdtempSync(path.join(tmpdir(), "roborock-adapter-runtime-"));
	temporaryDirectories.push(activeDirectory);
	const bundlePath = path.join(activeDirectory, "index.android.bundle");
	writeFileSync(bundlePath, "var originalBundle = true;", "utf8");
	const rawDirectory = path.join(activeDirectory, "raw");
	mkdirSync(rawDirectory);
	writeFileSync(path.join(rawDirectory, "projects_comroborocktanos_project.json"), JSON.stringify({
		models: "roborock.generic.model",
		versionCode: 7,
	}), "utf8");
	return {
		activeDirectory,
		bundlePath,
		installation: { downloadVersion: 7, pluginLevel: 4 },
		model: "roborock.generic.model",
	};
}

function account() {
	const call = async () => "{}";
	return new ApkAppPluginAuthenticatedAccountRuntime({
		cloudBootstrap: {
			account: { countryCode: "DE", serverCode: "eu" },
			homeData: {
				deviceJsonStrings: [JSON.stringify({
					duid: "device-1",
					productId: 7,
					model: "roborock.generic.model",
					activeTime: 10,
					timeZone: "Europe/Berlin",
					pv: "1.0",
				})],
				productJsonStrings: [JSON.stringify({ id: 7, model: "roborock.generic.model" })],
			},
			userId: "user-1",
		},
		httpPorts: {
			iot: { delete: call, get: call, post: call, postJson: call, put: call, putJson: call },
			user: { delete: call, get: call, post: call, postJson: call, put: call, putJson: call },
		},
		productRepository: { userRoles: [] },
	});
}

function packages(installed: ApkInstalledMainPluginPackage): ApkAppPluginDevicePackageRepository {
	return {
		acquire: vi.fn(async () => { throw new Error("Keine Paketakquisition erwartet"); }),
		getInstallationContext: () => ({
			mainPluginDownloadVersions: { [installed.model]: installed.installation.downloadVersion },
		}),
		getInstalledPackage: model => model === installed.model ? installed : undefined,
	};
}

function hostProvider(shutdown: () => Promise<void>): ApkAppPluginShutdownHostProvider {
	return {
		acquire: vi.fn(async () => { throw new Error("Gemockte Modell-Factory erwartet keine Hostakquisition"); }),
		shutdown,
	};
}

function service(
	runtime: ApkAppPluginManagedModelRuntime,
	provider: ApkAppPluginShutdownHostProvider,
): ApkAppPluginAdapterRuntimeService {
	modelFactoryBuilderMock.mockReturnValue(async () => runtime as ApkAppPluginModelRuntime);
	return new ApkAppPluginAdapterRuntimeService({
		account: account(),
		contract,
		host: {
			androidRelease: "15",
			clientId: "client-1",
			memoryMiB: 512,
			mobileModel: "ioBroker",
		},
		hostProvider: provider,
		packages: packages(installedPackage()),
	});
}

describe("APK AppPlugin adapter runtime service", () => {
	it("stops model runtimes before the adapter-wide host provider", async () => {
		const order: string[] = [];
		const runtime = {
			start: vi.fn(async () => undefined),
			stop: vi.fn(async () => { order.push("runtime-stop"); }),
		};
		const providerShutdown = vi.fn(async () => { order.push("provider-shutdown"); });
		const provider = hostProvider(providerShutdown);
		const adapterRuntime = service(runtime, provider);
		const lease = await adapterRuntime.openDevice({
			deviceProperties: { featureSet: 1 },
			targetDuid: "device-1",
		});

		expect(adapterRuntime.status()).toEqual([
			expect.objectContaining({ activeLeases: 1, deviceId: "device-1", state: "running" }),
		]);
		expect(modelFactoryBuilderMock).toHaveBeenCalledWith({ contract, hostProvider: provider });
		await adapterRuntime.shutdown();
		await adapterRuntime.shutdown();

		expect(order).toEqual(["runtime-stop", "provider-shutdown"]);
		expect(runtime.stop).toHaveBeenCalledOnce();
		expect(providerShutdown).toHaveBeenCalledOnce();
		await lease.release();
		await expect(adapterRuntime.openDevice({ deviceProperties: {}, targetDuid: "device-1" }))
			.rejects.toThrow(/bereits beendet/u);
	});

	it("still shuts down host resources when a model runtime fails to stop", async () => {
		const order: string[] = [];
		const runtime = {
			start: vi.fn(async () => undefined),
			stop: vi.fn(async () => {
				order.push("runtime-stop");
				throw new Error("runtime stop failed");
			}),
		};
		const providerShutdown = vi.fn(async () => {
			order.push("provider-shutdown");
			throw new Error("provider shutdown failed");
		});
		const adapterRuntime = service(runtime, hostProvider(providerShutdown));
		await adapterRuntime.openDevice({ deviceProperties: {}, targetDuid: "device-1" });

		const shutdown = adapterRuntime.shutdown();
		await expect(shutdown).rejects.toMatchObject({
			message: expect.stringMatching(/nicht sauber beendet/u),
			errors: expect.arrayContaining([
				expect.objectContaining({
					message: expect.stringMatching(/AppPlugin-Runtime/u),
					errors: [expect.objectContaining({ message: "runtime stop failed" })],
				}),
				expect.objectContaining({ message: "provider shutdown failed" }),
			]),
		});
		expect(order).toEqual(["runtime-stop", "provider-shutdown"]);
		expect(providerShutdown).toHaveBeenCalledOnce();
	});
});
