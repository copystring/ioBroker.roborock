import { describe, expect, it, vi } from "vitest";
import { http_api } from "../../src/lib/httpApi";

describe("IoT device shadow", () => {
	it("requests an encoded known device and returns the raw response body", async () => {
		const api = new http_api({} as any);
		const duid = "device/with space";
		api.homeData = { devices: [{ duid }], receivedDevices: [] } as any;
		const body = { success: false, result: { arbitrary: [1, 2] } };
		const get = vi.fn().mockResolvedValue({ data: body });
		api.realApi = { get } as any;

		await expect(api.getDeviceShadow(duid)).resolves.toBe(body);
		expect(get).toHaveBeenCalledExactlyOnceWith("devices/device%2Fwith%20space/shadow");
	});

	it("does not request an unknown device or proceed without the IoT API", async () => {
		const api = new http_api({} as any);
		api.homeData = { devices: [{ duid: "known" }], receivedDevices: [] } as any;
		const get = vi.fn();
		api.realApi = { get } as any;

		await expect(api.getDeviceShadow("unknown")).rejects.toThrow("Device not found");
		expect(get).not.toHaveBeenCalled();
		api.realApi = null;
		await expect(api.getDeviceShadow("known")).rejects.toThrow("realApi is not initialized");
	});
});
