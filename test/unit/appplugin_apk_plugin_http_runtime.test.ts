import { describe, expect, it, vi } from "vitest";

import { ApkPluginHttpRuntime } from "../../src/apppluginHost/apkPluginHttpRuntime";

describe("APK RRPluginHttpTurboModule runtime", () => {
	it("delegates iotGet to the host IoT service with the APK argument shape", async () => {
		const get = vi.fn(async () => "{\"result\":\"ok\"}");
		const runtime = new ApkPluginHttpRuntime({ iot: { get } });

		await expect(runtime.iotGet("ota/firmware/device/updatev2?lang=de", { channel: "release" }, null))
			.resolves.toBe("{\"result\":\"ok\"}");
		expect(get).toHaveBeenCalledWith(
			"ota/firmware/device/updatev2?lang=de",
			{ channel: "release" },
		);
	});

	it("does not fabricate a response when the APK IoT service is absent", async () => {
		const runtime = new ApkPluginHttpRuntime();
		await expect(runtime.iotGet("path", {}, null)).rejects.toMatchObject({
			name: "ApkHostServiceUnavailableError",
			serviceName: "iot-http",
		});
	});
});
