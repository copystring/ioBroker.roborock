import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkAppPluginAuthenticatedAccountRuntime,
	ApkAppPluginDeviceSessionRuntime,
	type ApkAppPluginDevicePackageRepository,
	type ApkAppPluginHostContract,
	type ApkAppPluginManagedModelRuntime,
	type ApkAuthenticatedHttpAdapterPorts,
	type ApkInstalledMainPluginPackage,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;
const temporaryDirectories: string[] = [];

function deferred() {
	let resolve!: () => void;
	const promise = new Promise<void>(resolvePromise => {
		resolve = resolvePromise;
	});
	return { promise, resolve };
}

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { force: true, recursive: true });
	}
});

function installedPackage(model: string): ApkInstalledMainPluginPackage {
	const activeDirectory = mkdtempSync(path.join(tmpdir(), "roborock-device-session-"));
	temporaryDirectories.push(activeDirectory);
	const bundlePath = path.join(activeDirectory, "index.android.bundle");
	writeFileSync(bundlePath, "var unchangedOriginalBundle = true;", "utf8");
	const rawDirectory = path.join(activeDirectory, "raw");
	mkdirSync(rawDirectory);
	writeFileSync(path.join(rawDirectory, "projects_comroborocktanos_project.json"), JSON.stringify({
		models: "generic.main.plugin",
		versionCode: 7,
	}), "utf8");
	return {
		activeDirectory,
		bundlePath,
		installation: { downloadVersion: 7, pluginLevel: 4 },
		model,
	};
}

function httpPorts(): ApkAuthenticatedHttpAdapterPorts {
	const call = async () => "{}";
	return {
		iot: { delete: call, get: call, post: call, postJson: call, put: call, putJson: call },
		user: { delete: call, get: call, post: call, postJson: call, put: call, putJson: call },
	};
}

function account(ports = httpPorts()): ApkAppPluginAuthenticatedAccountRuntime {
	return new ApkAppPluginAuthenticatedAccountRuntime({
		cloudBootstrap: {
			account: { countryCode: "DE", serverCode: "eu" },
			homeData: {
				deviceJsonStrings: [
					JSON.stringify({
						duid: "vacuum-1",
						productId: 7,
						model: "roborock.vacuum.same",
						activeTime: 10,
						timeZone: "Europe/Berlin",
						pv: "B01",
					}),
					JSON.stringify({
						duid: "mower-1",
						productId: 8,
						model: "roborock.mower.a01",
						activeTime: 20,
						timeZone: "UTC",
						pv: "A01",
					}),
				],
				productJsonStrings: [
					JSON.stringify({ id: 7, model: "roborock.vacuum.same" }),
					JSON.stringify({ id: 8, model: "roborock.mower.a01" }),
				],
			},
			userId: "rr-user",
		},
		httpPorts: ports,
		productRepository: { userRoles: [] },
	});
}

function packageRepository(
	packages: readonly ApkInstalledMainPluginPackage[],
): ApkAppPluginDevicePackageRepository & { acquire: ReturnType<typeof vi.fn> } {
	const byModel = new Map(packages.map(value => [value.model, value]));
	const acquire = vi.fn(async request => {
		const installed = byModel.get(request.model);
		if (!installed) throw new Error("Paketfixture fehlt");
		return {
			download: { destinationPath: "download.zip", downloadedBytes: 1, resumedBytes: 0 },
			installation: installed,
			metadata: {
				apiLevel: 10042,
				pluginLevel: installed.installation.pluginLevel,
				productId: request.productId,
				url: "https://cdn.example.test/plugin.zip",
				version: installed.installation.downloadVersion,
			},
		};
	});
	return {
		acquire,
		getInstallationContext: () => ({
			mainPluginDownloadVersions: Object.fromEntries(packages.map(value => [
				value.model,
				value.installation.downloadVersion,
			])),
		}),
		getInstalledPackage: model => byModel.get(model),
	};
}

function managedRuntime() {
	return {
		start: vi.fn(async () => undefined),
		stop: vi.fn(async () => undefined),
	} satisfies ApkAppPluginManagedModelRuntime;
}

function host() {
	return {
		androidRelease: "APK 4.54.02 contract",
		clientId: "adapter-client-id",
		memoryMiB: 256,
		mobileModel: "ioBroker",
	};
}

describe("APK AppPlugin device session runtime", () => {
	it("opens the unchanged installed bundle with the exact generic account device", async () => {
		const ports = httpPorts();
		const mowerPackage = installedPackage("roborock.mower.a01");
		const packages = packageRepository([mowerPackage]);
		const managed = managedRuntime();
		const factory = vi.fn(() => managed);
		const runtime = new ApkAppPluginDeviceSessionRuntime({
			account: account(ports),
			contract,
			factory,
			host: host(),
			packages,
		});

		const lease = await runtime.openDevice({
			deviceProperties: { dockType: 3 },
			targetDuid: "mower-1",
			timestampMs: 1_700_000_000_000,
		});

		expect(lease).toMatchObject({
			activeTime: 20,
			deviceId: "mower-1",
			model: "roborock.mower.a01",
		});
		expect(factory).toHaveBeenCalledOnce();
		const request = factory.mock.calls[0][0];
		expect(request.context.authenticatedHttpPorts).toBe(ports);
		expect(request.context.session.descriptor.device).toMatchObject({
			deviceId: "mower-1",
			model: "roborock.mower.a01",
			protocolVersion: "A01",
			deviceProperties: { dockType: 3 },
		});
		expect(request.context.session.bundle.bytes.toString("utf8"))
			.toBe("var unchangedOriginalBundle = true;");
		expect(request.context.session.descriptor.package.models)
			.toContain("roborock.mower.a01");

		await lease.release();
		await runtime.shutdown();
		expect(managed.stop).toHaveBeenCalledOnce();
	});

	it("fails closed when no signed package is installed", async () => {
		const factory = vi.fn(() => managedRuntime());
		const runtime = new ApkAppPluginDeviceSessionRuntime({
			account: account(),
			contract,
			factory,
			host: host(),
			packages: packageRepository([]),
		});

		await expect(runtime.openDevice({ deviceProperties: {}, targetDuid: "vacuum-1" }))
			.rejects.toThrow(/kein signiertes AppPlugin-Paket aktiviert/u);
		expect(factory).not.toHaveBeenCalled();
		await runtime.shutdown();
	});

	it("stops an inactive host before replacing its package", async () => {
		const mowerPackage = installedPackage("roborock.mower.a01");
		const packages = packageRepository([mowerPackage]);
		const managed = managedRuntime();
		const runtime = new ApkAppPluginDeviceSessionRuntime({
			account: account(),
			contract,
			factory: () => managed,
			host: host(),
			packages,
		});
		const lease = await runtime.openDevice({ deviceProperties: {}, targetDuid: "mower-1" });
		await lease.release();

		await runtime.acquirePackageForDevice({ targetDuid: "mower-1" });

		expect(managed.stop).toHaveBeenCalledOnce();
		expect(packages.acquire).toHaveBeenCalledWith({
			model: "roborock.mower.a01",
			productId: 8,
			signal: undefined,
		});
		await runtime.shutdown();
	});

	it("rejects package replacement before network access while a root lease is active", async () => {
		const mowerPackage = installedPackage("roborock.mower.a01");
		const packages = packageRepository([mowerPackage]);
		const runtime = new ApkAppPluginDeviceSessionRuntime({
			account: account(),
			contract,
			factory: () => managedRuntime(),
			host: host(),
			packages,
		});
		const lease = await runtime.openDevice({ deviceProperties: {}, targetDuid: "mower-1" });

		await expect(runtime.acquirePackageForDevice({ targetDuid: "mower-1" }))
			.rejects.toThrow(/aktive Sitzungen/u);
		expect(packages.acquire).not.toHaveBeenCalled();

		await lease.release();
		await runtime.shutdown();
	});

	it("does not open an old bundle while replacement for the same model is running", async () => {
		const mowerPackage = installedPackage("roborock.mower.a01");
		const packages = packageRepository([mowerPackage]);
		const acquisitionGate = deferred();
		packages.acquire.mockImplementationOnce(async request => {
			await acquisitionGate.promise;
			return {
				download: { destinationPath: "download.zip", downloadedBytes: 1, resumedBytes: 0 },
				installation: mowerPackage,
				metadata: {
					apiLevel: 10042,
					pluginLevel: 4,
					productId: request.productId,
					url: "https://cdn.example.test/plugin.zip",
					version: 7,
				},
			};
		});
		const factory = vi.fn(() => managedRuntime());
		const runtime = new ApkAppPluginDeviceSessionRuntime({
			account: account(),
			contract,
			factory,
			host: host(),
			packages,
		});

		const acquisition = runtime.acquirePackageForDevice({ targetDuid: "mower-1" });
		await vi.waitFor(() => expect(packages.acquire).toHaveBeenCalledOnce());
		const opening = runtime.openDevice({ deviceProperties: {}, targetDuid: "mower-1" });
		await Promise.resolve();
		expect(factory).not.toHaveBeenCalled();

		acquisitionGate.resolve();
		await acquisition;
		const lease = await opening;
		expect(factory).toHaveBeenCalledOnce();
		await lease.release();
		await runtime.shutdown();
	});
});
