import { describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	StrictApkNativeModuleRegistry,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";
import {
	ApkPluginHttpRuntime,
	type ApkPluginIotHttpService,
	type ApkPluginUserHttpService,
} from "../../src/apppluginHost/apkPluginHttpRuntime";

const contract = contractJson as ApkAppPluginHostContract;

function restfulService(): ApkPluginIotHttpService {
	return {
		delete: vi.fn(async () => "deleted"),
		get: vi.fn(async () => "{\"result\":\"ok\"}"),
		post: vi.fn(async () => "posted"),
		postJson: vi.fn(async () => "json-posted"),
		put: vi.fn(async () => "put"),
		putJson: vi.fn(async () => "json-put"),
	};
}

function userService(): ApkPluginUserHttpService {
	return {
		...restfulService(),
		postImages: vi.fn(async () => "images-posted"),
	};
}

describe("APK RRPluginHttpTurboModule runtime", () => {
	it("implements every method of the effective APK 4.54.02 HTTP module", () => {
		const httpModule = contract.nativeModules.find(module =>
			module.installedByHost && module.moduleName === "RRPluginHttpTurboModule",
		);
		expect(httpModule, "effective RRPluginHttpTurboModule contract").toBeDefined();
		expect(httpModule?.methods).toHaveLength(22);

		const registry = new StrictApkNativeModuleRegistry(contract);
		registry.register(
			httpModule!.javaClass,
			new ApkPluginHttpRuntime() as unknown as Record<string, unknown>,
		);

		expect(() => registry.assertImplements(["RRPluginHttpTurboModule"])).not.toThrow();
		expect(registry.implementationCoverage().modules).toContainEqual(expect.objectContaining({
			moduleName: "RRPluginHttpTurboModule",
			status: "complete",
			implementedMethods: httpModule!.methods.map(method => method.name),
			missingMethods: [],
		}));
	});

	it("delegates iotGet to the host IoT service with the APK argument shape", async () => {
		const iot = restfulService();
		const runtime = new ApkPluginHttpRuntime({ iot });

		await expect(runtime.iotGet("ota/firmware/device/updatev2?lang=de", { channel: "release" }, null))
			.resolves.toBe("{\"result\":\"ok\"}");
		expect(iot.get).toHaveBeenCalledWith(
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

	it("delegates userGet to the separate APK user service and ignores options like the APK", async () => {
		const user = userService();
		vi.mocked(user.get).mockResolvedValue("{\"result\":\"user\"}");
		const runtime = new ApkPluginHttpRuntime({ user });

		await expect(runtime.userGet("user/devices", { page: 2 }, { headers: { ignored: true } }))
			.resolves.toBe("{\"result\":\"user\"}");
		expect(user.get).toHaveBeenCalledWith("user/devices", { page: 2 });
	});

	it("does not route userGet through the IoT service or fabricate an offline response", async () => {
		const iot = restfulService();
		const runtime = new ApkPluginHttpRuntime({ iot });

		await expect(runtime.userGet("user/devices", null, null)).rejects.toMatchObject({
			name: "ApkHostServiceUnavailableError",
			serviceName: "user-http",
		});
		expect(iot.get).not.toHaveBeenCalled();
	});

	it("routes every IoT verb to the APK IoT repository and ignores config arguments", async () => {
		const iot = restfulService();
		const runtime = new ApkPluginHttpRuntime({ iot });
		const ignored = { headers: { wrong: true } };

		await expect(runtime.iotDelete("iot/delete", { id: 1 })).resolves.toBe("deleted");
		await expect(runtime.iotPost("iot/post", { id: 2 }, ignored)).resolves.toBe("posted");
		await expect(runtime.iotPostJson("iot/post-json", { id: 3 }, ignored)).resolves.toBe("json-posted");
		await expect(runtime.iotPut("iot/put", { id: 4 }, ignored)).resolves.toBe("put");
		await expect(runtime.iotPutJson("iot/put-json", { id: 5 }, ignored)).resolves.toBe("json-put");

		expect(iot.delete).toHaveBeenCalledWith("iot/delete", { id: 1 });
		expect(iot.post).toHaveBeenCalledWith("iot/post", { id: 2 });
		expect(iot.postJson).toHaveBeenCalledWith("iot/post-json", { id: 3 });
		expect(iot.put).toHaveBeenCalledWith("iot/put", { id: 4 });
		expect(iot.putJson).toHaveBeenCalledWith("iot/put-json", { id: 5 });
	});

	it("routes every user verb and both JSON shapes to the APK RRSDK repository", async () => {
		const user = userService();
		const runtime = new ApkPluginHttpRuntime({ user });
		const ignored = { headers: { wrong: true } };

		await expect(runtime.userDelete("user/delete", { id: 1 })).resolves.toBe("deleted");
		await expect(runtime.userPost("user/post", { id: 2 }, ignored)).resolves.toBe("posted");
		await expect(runtime.userPostJson("user/post-json", { id: 3 }, ignored)).resolves.toBe("json-posted");
		await expect(runtime.userPostJsonV2("user/post-json-v2", "{\"id\":4}", ignored))
			.resolves.toBe("json-posted");
		await expect(runtime.userPut("user/put", { id: 5 }, ignored)).resolves.toBe("put");
		await expect(runtime.userPutJson("user/put-json", { id: 6 }, ignored)).resolves.toBe("json-put");

		expect(user.delete).toHaveBeenCalledWith("user/delete", { id: 1 });
		expect(user.post).toHaveBeenCalledWith("user/post", { id: 2 });
		expect(user.postJson).toHaveBeenNthCalledWith(1, "user/post-json", { id: 3 });
		expect(user.postJson).toHaveBeenNthCalledWith(2, "user/post-json-v2", "{\"id\":4}");
		expect(user.put).toHaveBeenCalledWith("user/put", { id: 5 });
		expect(user.putJson).toHaveBeenCalledWith("user/put-json", { id: 6 });
	});

	it("constructs the APK X-BusinessId header and ignores the supplied mall header", async () => {
		const get = vi.fn(async () => "mall-get");
		const postJson = vi.fn(async () => "mall-post");
		const runtime = new ApkPluginHttpRuntime({ mallProduct: { get, postJson } });

		await expect(runtime.mallProductGetV2(
			"mall/product",
			"business-7",
			{ page: 2 },
			{ "X-Wrong": "ignored" },
		)).resolves.toBe("mall-get");
		await expect(runtime.mallProductPostJsonV2(
			"mall/product",
			"business-8",
			"{\"sku\":1}",
			{ "X-Wrong": "ignored" },
		)).resolves.toBe("mall-post");

		expect(get).toHaveBeenCalledWith(
			"mall/product",
			{ page: 2 },
			{ "X-BusinessId": "business-7" },
		);
		expect(postJson).toHaveBeenCalledWith(
			"mall/product",
			"{\"sku\":1}",
			{ "X-BusinessId": "business-8" },
		);
	});

	it("uses the Android image-preparation host boundary before multipart upload", async () => {
		const user = userService();
		const prepareUserImages = vi.fn(async () => [{ localUri: "prepared-a" }, { localUri: "prepared-b" }]);
		const runtime = new ApkPluginHttpRuntime({ user, prepareUserImages });

		await expect(runtime.userPostImages(
			"user/images",
			["/tmp/a.jpg", 42, "content://b"],
			{ device: "x" },
			null,
		)).resolves.toBe("images-posted");

		expect(prepareUserImages).toHaveBeenCalledWith(["/tmp/a.jpg", "content://b"]);
		expect(user.postImages).toHaveBeenCalledWith(
			"user/images",
			{ device: "x" },
			[{ localUri: "prepared-a" }, { localUri: "prepared-b" }],
		);
	});

	it("requires Android image preparation only when image references are present", async () => {
		const user = userService();
		const runtime = new ApkPluginHttpRuntime({ user });

		await expect(runtime.userPostImages("user/images", [], null, null))
			.resolves.toBe("images-posted");
		expect(user.postImages).toHaveBeenCalledWith("user/images", null, []);

		await expect(runtime.userPostImages("user/images", ["/tmp/a.jpg"], null, null))
			.rejects.toMatchObject({
				name: "ApkHostServiceUnavailableError",
				serviceName: "user-image-preparation",
			});
	});

	it("provides cloned host headers and never invents missing authenticated headers", async () => {
		const headers = { Authorization: "secret", "x-uid": "user" };
		const runtime = new ApkPluginHttpRuntime({ loadHttpHeaders: () => headers });

		const result = await runtime.getHttpHeaders();
		expect(result).toEqual(headers);
		expect(result).not.toBe(headers);
		await expect(new ApkPluginHttpRuntime().getHttpHeaders()).rejects.toMatchObject({
			serviceName: "http-headers",
		});
	});

	it("keeps the APK server timestamp offset and ignores non-positive updates", async () => {
		let now = 1_700_000_000_000;
		const runtime = new ApkPluginHttpRuntime({ nowMilliseconds: () => now });

		await expect(runtime.getTimestamp()).resolves.toBe(1_700_000_000);
		await expect(runtime.updateTimestamp(1_699_999_950)).resolves.toBe("");
		now += 5_000;
		await expect(runtime.getTimestamp()).resolves.toBe(1_699_999_955);
		await runtime.updateTimestamp(0);
		now += 1_000;
		await expect(runtime.getTimestamp()).resolves.toBe(1_699_999_956);
	});

	it("keeps the APK account methods pending instead of fabricating responses", async () => {
		const runtime = new ApkPluginHttpRuntime();
		const settlement = vi.fn();

		void runtime.accountGet("account", null, null).then(settlement, settlement);
		void runtime.accountPost("account", null, null).then(settlement, settlement);
		void runtime.accountPostJson("account", null, null).then(settlement, settlement);
		await Promise.resolve();

		expect(settlement).not.toHaveBeenCalled();
	});
});
