import { describe, expect, it, vi } from "vitest";

import {
	ApkDevicesRuntime,
	ApkHostServiceUnavailableError,
} from "../../src/apppluginHost";

function homeData() {
	return {
		deviceJsonStrings: [JSON.stringify({
			duid: "device-1",
			featureSet: "33",
			newFeatureSet: "00ff",
		})],
		productJsonStrings: [JSON.stringify({ rrPid: "product-1" })],
		pluginDownloadVersions: { "roborock.vacuum.sc01": 42 },
	};
}

describe("APK RRDevicesModule runtime", () => {
	it("returns unchanged raw HomeData and product JSON strings", async () => {
		const source = homeData();
		const runtime = new ApkDevicesRuntime({
			hasActivity: () => true,
			homeData: source,
			resolveRpc: () => undefined,
		});
		await expect(runtime.getDeviceListInfo()).resolves.toEqual(source.deviceJsonStrings);
		await expect(runtime.getAllDeviceProductRaw()).resolves.toEqual(source.productJsonStrings);
		await expect(runtime.getConnectedRawProductModels()).resolves.toEqual(source.productJsonStrings);
		await expect(runtime.getDeviceMainPluginDownloadVersion("roborock.vacuum.sc01"))
			.resolves.toBe(42);
	});

	it("keeps absent HomeData visible as a missing APK host service", async () => {
		const runtime = new ApkDevicesRuntime({
			hasActivity: () => true,
			resolveRpc: () => undefined,
		});
		await expect(runtime.getDeviceListInfo()).rejects.toEqual(
			expect.objectContaining<Partial<ApkHostServiceUnavailableError>>({
				serviceName: "home-data",
			}),
		);
	});

	it("routes per-device calls through the shared APK RPC module", () => {
		const callback = vi.fn();
		const callMethodFromLocal = vi.fn();
		const runtime = new ApkDevicesRuntime({
			hasActivity: () => true,
			homeData: homeData(),
			resolveRpc: did => did === "device-1"
				? { callMethodFromLocal } as never
				: undefined,
		});
		runtime.callMethodFromLocal("device-1", "app_start", [1], callback);
		expect(callMethodFromLocal).toHaveBeenCalledWith("app_start", [1], undefined, callback);
	});

	it("publishes raw DPS only through the injected multi-device transport", async () => {
		const publishDps = vi.fn(async () => undefined);
		const callback = vi.fn();
		const runtime = new ApkDevicesRuntime({
			hasActivity: () => true,
			homeData: homeData(),
			resolveRpc: () => undefined,
			publishDps,
		});
		runtime.publishDps("device-1", { "121": 1 }, callback);
		await vi.waitFor(() => expect(callback).toHaveBeenCalledWith(true));
		expect(publishDps).toHaveBeenCalledWith("device-1", { "121": 1 });
	});
});
