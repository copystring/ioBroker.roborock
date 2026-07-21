import { describe, expect, it } from "vitest";

import {
	APK_HOST_SERVICE_PROTOCOL,
	APK_HOST_SERVICE_PROTOCOL_VERSION,
	ApkHostServiceClient,
	createApkHostServiceRuntimePorts,
	fromApkHostServiceWireValue,
	type ApkHostServiceRequest,
	type ApkHostServiceResponse,
} from "../../src/apppluginHost";
import { ApkPluginHttpRuntime } from "../../src/apppluginHost/apkPluginHttpRuntime";

class LoopbackHostService {
	public readonly requests: ApkHostServiceRequest[] = [];
	public client!: ApkHostServiceClient;

	public send = (request: ApkHostServiceRequest): void => {
		this.requests.push(request);
		const payload = fromApkHostServiceWireValue(request.payload);
		let value: string | Record<string, string> = JSON.stringify({ operation: request.operation, payload });
		if (request.operation === "http.headers.get") value = { "x-app-name": "roborock", "x-region": "eu" };
		const response: ApkHostServiceResponse = {
			protocol: APK_HOST_SERVICE_PROTOCOL,
			version: APK_HOST_SERVICE_PROTOCOL_VERSION,
			type: "response",
			requestId: request.requestId,
			ok: true,
			value,
		};
		queueMicrotask(() => this.client.accept(response));
	};
}

describe("APK host service runtime ports", () => {
	it("maps every IoT and user REST operation to the authenticated process boundary", async () => {
		const loopback = new LoopbackHostService();
		loopback.client = new ApkHostServiceClient(loopback.send);
		const ports = createApkHostServiceRuntimePorts(loopback.client);
		const runtime = new ApkPluginHttpRuntime(ports.http);

		await runtime.iotDelete("/iot/delete", { id: 1 });
		await runtime.iotGet("/iot/get", null, null);
		await runtime.iotPost("/iot/post", { id: 2 }, null);
		await runtime.iotPostJson("/iot/post-json", { enabled: true }, null);
		await runtime.iotPut("/iot/put", { id: 3 }, null);
		await runtime.iotPutJson("/iot/put-json", { enabled: false }, null);
		await runtime.userDelete("/user/delete", { id: 4 });
		await runtime.userGet("/user/get", null, null);
		await runtime.userPost("/user/post", { id: 5 }, null);
		await runtime.userPostJson("/user/post-json", { enabled: true }, null);
		await runtime.userPostJsonV2("/user/post-json-v2", "{\"raw\":true}", null);
		await runtime.userPut("/user/put", { id: 6 }, null);
		await runtime.userPutJson("/user/put-json", { enabled: false }, null);

		expect(loopback.requests.map(request => request.operation)).toEqual([
			"http.iot.delete",
			"http.iot.get",
			"http.iot.post",
			"http.iot.postJson",
			"http.iot.put",
			"http.iot.putJson",
			"http.user.delete",
			"http.user.get",
			"http.user.post",
			"http.user.postJson",
			"http.user.postJson",
			"http.user.put",
			"http.user.putJson",
		]);
		expect(fromApkHostServiceWireValue(loopback.requests[10]!.payload)).toEqual({
			path: "/user/post-json-v2",
			value: "{\"raw\":true}",
		});
	});

	it("maps headers, mall and prepared images without credentials", async () => {
		const loopback = new LoopbackHostService();
		loopback.client = new ApkHostServiceClient(loopback.send);
		const ports = createApkHostServiceRuntimePorts(loopback.client);
		const runtime = new ApkPluginHttpRuntime({
			...ports.http,
			prepareUserImages: async () => [{
				filename: "room.jpg",
				mimeType: "image/jpeg",
				bytes: Buffer.from([1, 2, 3]),
			}],
		});

		await expect(runtime.getHttpHeaders()).resolves.toEqual({
			"x-app-name": "roborock",
			"x-region": "eu",
		});
		await runtime.mallProductGetV2("/mall/product", "shop", { id: "p1" }, null);
		await runtime.mallProductPostJsonV2("/mall/product", "shop", "{\"id\":\"p1\"}", null);
		await runtime.userPostImages("/user/images", ["content://room.jpg"], { room: 1 }, null);

		expect(loopback.requests.map(request => request.operation)).toEqual([
			"http.headers.get",
			"http.mall.get",
			"http.mall.postJson",
			"http.user.postImages",
		]);
		const imagePayload = fromApkHostServiceWireValue(loopback.requests[3]!.payload) as {
			images: Array<{ bytes: Buffer }>;
		};
		expect(imagePayload.images[0]!.bytes).toEqual(Buffer.from([1, 2, 3]));
		expect(JSON.stringify(loopback.requests)).not.toMatch(/authorization|bearer|token/iu);
	});

	it("fails closed when the adapter returns the wrong header result shape", async () => {
		let client!: ApkHostServiceClient;
		client = new ApkHostServiceClient(request => queueMicrotask(() => client.accept({
			protocol: APK_HOST_SERVICE_PROTOCOL,
			version: APK_HOST_SERVICE_PROTOCOL_VERSION,
			type: "response",
			requestId: request.requestId,
			ok: true,
			value: 42,
		})));
		const ports = createApkHostServiceRuntimePorts(client);

		await expect(ports.http.loadHttpHeaders!()).rejects.toThrow(/keine Headerabbildung/u);
	});
});
