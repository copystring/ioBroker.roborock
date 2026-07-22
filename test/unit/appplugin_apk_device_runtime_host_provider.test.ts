import { describe, expect, it, vi } from "vitest";

import {
	ApkAppPluginManagedDeviceRuntimeHostProvider,
	type ApkAppPluginDeviceModelContext,
	type ApkAppPluginDeviceRuntimeHostLease,
	type ApkAppPluginModelRuntimeRequest,
	type ApkHermesHostArtifact,
} from "../../src/apppluginHost";

function deferred<T>() {
	let resolve!: (value: T) => void;
	const promise = new Promise<T>(resolvePromise => {
		resolve = resolvePromise;
	});
	return { promise, resolve };
}

function request(deviceId = "device-1") {
	return {
		activeTime: 1,
		context: {},
		deviceId,
		model: "roborock.generic.model",
	} as unknown as ApkAppPluginModelRuntimeRequest<ApkAppPluginDeviceModelContext>;
}

function artifact() {
	return { target: "win32-x64" } as unknown as ApkHermesHostArtifact;
}

function hostLease(release = vi.fn(async () => undefined)) {
	return {
		composition: {},
		dataDirectory: "C:\\adapter-data\\appplugin",
		initialState: {},
		ports: {},
		release,
	} as unknown as ApkAppPluginDeviceRuntimeHostLease;
}

describe("APK AppPlugin managed device runtime host provider", () => {
	it("tracks device-scoped resources and makes their release idempotent", async () => {
		const rawRelease = vi.fn(async () => undefined);
		const rawLease = hostLease(rawRelease);
		const acquireHostLease = vi.fn(async () => rawLease);
		const provider = new ApkAppPluginManagedDeviceRuntimeHostProvider(acquireHostLease);

		const lease = await provider.acquire(request(), artifact());

		expect(provider.state).toBe("running");
		expect(provider.activeLeaseCount).toBe(1);
		expect(acquireHostLease).toHaveBeenCalledWith(
			expect.objectContaining({ deviceId: "device-1" }),
			expect.objectContaining({ target: "win32-x64" }),
		);
		await lease.release();
		await lease.release();
		expect(rawRelease).toHaveBeenCalledOnce();
		expect(provider.activeLeaseCount).toBe(0);

		await provider.shutdown();
		expect(provider.state).toBe("stopped");
	});

	it("closes an acquisition that finishes concurrently with shutdown", async () => {
		const acquisitionGate = deferred<ApkAppPluginDeviceRuntimeHostLease>();
		const rawRelease = vi.fn(async () => undefined);
		const provider = new ApkAppPluginManagedDeviceRuntimeHostProvider(
			async () => acquisitionGate.promise,
		);
		const acquisition = provider.acquire(request(), artifact());
		await Promise.resolve();

		const shutdown = provider.shutdown();
		expect(provider.state).toBe("stopping");
		acquisitionGate.resolve(hostLease(rawRelease));

		await expect(acquisition).rejects.toThrow(/während der Ressourcenakquisition beendet/u);
		await shutdown;
		expect(rawRelease).toHaveBeenCalledOnce();
		expect(provider.activeLeaseCount).toBe(0);
		expect(provider.state).toBe("stopped");
	});

	it("reports cleanup failure from an acquisition that races with shutdown", async () => {
		const acquisitionGate = deferred<ApkAppPluginDeviceRuntimeHostLease>();
		const rawRelease = vi.fn(async () => { throw new Error("racing release failed"); });
		const provider = new ApkAppPluginManagedDeviceRuntimeHostProvider(
			async () => acquisitionGate.promise,
		);
		const acquisition = provider.acquire(request(), artifact());
		await Promise.resolve();
		const shutdown = provider.shutdown();
		acquisitionGate.resolve(hostLease(rawRelease));

		await expect(acquisition).rejects.toThrow(/nicht sauber freigegeben/u);
		await expect(shutdown).rejects.toThrow(/nicht sauber beendet/u);
		expect(rawRelease).toHaveBeenCalledOnce();
		expect(provider.activeLeaseCount).toBe(0);
		expect(provider.state).toBe("stopped");
	});

	it("releases every active lease during shutdown and aggregates cleanup failures", async () => {
		const firstRelease = vi.fn(async () => { throw new Error("first release failed"); });
		const secondRelease = vi.fn(async () => undefined);
		const leases = [hostLease(firstRelease), hostLease(secondRelease)];
		const provider = new ApkAppPluginManagedDeviceRuntimeHostProvider(async () => {
			const lease = leases.shift();
			if (!lease) throw new Error("Hostlease-Fixture fehlt");
			return lease;
		});
		await provider.acquire(request("device-1"), artifact());
		await provider.acquire(request("device-2"), artifact());

		await expect(provider.shutdown()).rejects.toThrow(/nicht sauber beendet/u);
		expect(firstRelease).toHaveBeenCalledOnce();
		expect(secondRelease).toHaveBeenCalledOnce();
		expect(provider.activeLeaseCount).toBe(0);
		expect(provider.state).toBe("stopped");
		await expect(provider.acquire(request("device-3"), artifact()))
			.rejects.toThrow(/bereits beendet/u);
	});
});
