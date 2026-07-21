import { describe, expect, it, vi } from "vitest";

import {
	ApkHostServiceClient,
	ApkHostServiceRouter,
	createApkHostServiceAdapterHandlers,
	createApkHostServiceRuntimePorts,
	serializeApkHostServiceMessage,
	type ApkHostServiceRequest,
} from "../../src/apppluginHost";
import { ApkPluginHttpRuntime } from "../../src/apppluginHost/apkPluginHttpRuntime";

function recordingRestful() {
	return {
		delete: vi.fn(async () => "delete-result"),
		get: vi.fn(async () => "get-result"),
		post: vi.fn(async () => "post-result"),
		postJson: vi.fn(async () => "post-json-result"),
		put: vi.fn(async () => "put-result"),
		putJson: vi.fn(async () => "put-json-result"),
	};
}

function loopbackClient(router: ApkHostServiceRouter): ApkHostServiceClient {
	let client!: ApkHostServiceClient;
	client = new ApkHostServiceClient(async request => {
		// Exercise the same serialization boundary used by a process transport.
		const parsed = JSON.parse(serializeApkHostServiceMessage(request)) as ApkHostServiceRequest;
		const response = await router.handle(parsed);
		queueMicrotask(() => client.accept(response));
	});
	return client;
}

describe("APK host service adapter handlers", () => {
	it("connects runtime HTTP ports end to end while preserving repository separation", async () => {
		const iot = recordingRestful();
		const userRest = recordingRestful();
		const user = { ...userRest, postImages: vi.fn(async () => "images-result") };
		const mallProduct = {
			get: vi.fn(async () => "mall-get-result"),
			postJson: vi.fn(async () => "mall-post-result"),
		};
		const handlers = createApkHostServiceAdapterHandlers({
			iot,
			user: userRest,
			postUserImages: user.postImages,
			mallProduct,
			loadHttpHeaders: async () => ({ "x-app-name": "roborock" }),
		});
		const client = loopbackClient(new ApkHostServiceRouter(handlers));
		const ports = createApkHostServiceRuntimePorts(client);
		const runtime = new ApkPluginHttpRuntime({
			...ports.http,
			prepareUserImages: async () => [{ filename: "map.jpg", bytes: Buffer.from([1, 2, 3]) }],
		});

		await expect(runtime.iotGet("/iot/status", { id: 1 }, null)).resolves.toBe("get-result");
		await expect(runtime.userPostJsonV2("/user/raw", "{\"ok\":true}", null))
			.resolves.toBe("post-json-result");
		await expect(runtime.userPostImages("/user/images", ["content://map.jpg"], { room: 1 }, null))
			.resolves.toBe("images-result");
		await expect(runtime.mallProductGetV2("/mall/product", "shop", { id: "p1" }, null))
			.resolves.toBe("mall-get-result");
		await expect(runtime.getHttpHeaders()).resolves.toEqual({ "x-app-name": "roborock" });

		expect(iot.get).toHaveBeenCalledWith("/iot/status", { id: 1 });
		expect(userRest.postJson).toHaveBeenCalledWith("/user/raw", "{\"ok\":true}");
		expect(user.postImages).toHaveBeenCalledWith(
			"/user/images",
			{ room: 1 },
			[{ filename: "map.jpg", bytes: Buffer.from([1, 2, 3]) }],
		);
		expect(mallProduct.get).toHaveBeenCalledWith(
			"/mall/product",
			{ id: "p1" },
			{ "X-BusinessId": "shop" },
		);
	});

	it("prevents AppPlugin paths from overriding authenticated repository origins", async () => {
		const iot = recordingRestful();
		const client = loopbackClient(new ApkHostServiceRouter(createApkHostServiceAdapterHandlers({ iot })));
		const runtime = new ApkPluginHttpRuntime(createApkHostServiceRuntimePorts(client).http);

		await expect(runtime.iotGet("https://attacker.invalid/steal", null, null)).rejects.toMatchObject({
			code: "invalid-request",
			message: "Repository-Pfad darf keinen Ursprung überschreiben",
		});
		await expect(runtime.iotGet("//attacker.invalid/steal", null, null)).rejects.toMatchObject({
			code: "invalid-request",
		});
		expect(iot.get).not.toHaveBeenCalled();
	});

	it("reconstructs the only allowed mall header instead of forwarding arbitrary headers", async () => {
		const mallProduct = {
			get: vi.fn(async () => "ok"),
			postJson: vi.fn(async () => "ok"),
		};
		const handlers = createApkHostServiceAdapterHandlers({ mallProduct });
		const handler = handlers["http.mall.get"]!;

		await handler({
			path: "/mall",
			params: null,
			businessId: "business",
			headers: { Authorization: "must-not-pass" },
		});
		expect(mallProduct.get).toHaveBeenCalledWith(
			"/mall",
			null,
			{ "X-BusinessId": "business" },
		);
	});

	it("keeps ordinary user REST available when Android image preparation is absent", async () => {
		const user = recordingRestful();
		const client = loopbackClient(new ApkHostServiceRouter(
			createApkHostServiceAdapterHandlers({ user }),
		));
		const runtime = new ApkPluginHttpRuntime(createApkHostServiceRuntimePorts(client).http);

		await expect(runtime.userGet("/profile", null, null)).resolves.toBe("get-result");
		await expect(runtime.userPostImages("/images", [], null, null)).rejects.toMatchObject({
			code: "unavailable",
		});
		expect(user.get).toHaveBeenCalledWith("/profile", null);
	});
});
