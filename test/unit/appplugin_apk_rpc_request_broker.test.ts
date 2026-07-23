import * as zlib from "node:zlib";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
	ApkRpcRequestBroker,
	type ApkJsonRpcRequest,
	type ApkProtobufRpcRequest,
	type ApkRpcRoute,
	type ApkRpcTransport,
} from "../../src/apppluginHost/apkRpcRequestBroker";

class RecordingTransport implements ApkRpcTransport {
	public readonly json: Array<{ request: ApkJsonRpcRequest; route: ApkRpcRoute }> = [];
	public readonly protobuf: Array<{ request: ApkProtobufRpcRequest; route: ApkRpcRoute }> = [];
	public nextError: unknown;

	public async sendJson(request: ApkJsonRpcRequest, route: ApkRpcRoute): Promise<void> {
		this.json.push({ request, route });
		if (this.nextError !== undefined) throw this.nextError;
	}

	public async sendProtobuf(request: ApkProtobufRpcRequest, route: ApkRpcRoute): Promise<void> {
		this.protobuf.push({ request, route });
		if (this.nextError !== undefined) throw this.nextError;
	}
}

afterEach(() => {
	vi.useRealTimers();
});

describe("APK RRRpcManager request broker", () => {
	it("keeps normal and blob pending tables separate", () => {
		const transport = new RecordingTransport();
		const broker = new ApkRpcRequestBroker(transport, "ENDPOINT", "00112233445566778899AABBCCDDEEFF", {
			initialMessageId: 100,
		});
		const normalCallback = vi.fn();
		const blobCallback = vi.fn();
		const normalId = broker.callJson("get_status", { retries: 1 }, "automatic", normalCallback);
		const blobId = broker.callBlobJson("get_map", { map: 0 }, "cloud", blobCallback);

		expect(normalId).toBe(100);
		expect(blobId).toBe(101);
		expect(transport.json).toEqual([
			{ request: { id: 100, method: "get_status", params: { retries: 1 } }, route: "automatic" },
			{
				request: {
					id: 101,
					method: "get_map",
					security: { endpoint: "ENDPOINT", nonce: "00112233445566778899AABBCCDDEEFF" },
					params: { map: 0 },
				},
				route: "cloud",
			},
		]);
		expect(broker.acceptJsonDps({ "102": { id: blobId, result: "not-the-blob" } })).toBe(true);
		expect(blobCallback).not.toHaveBeenCalled();
		expect(broker.acceptJsonDps({ "102": { id: normalId, result: "ok" } })).toBe(true);
		expect(normalCallback).toHaveBeenCalledWith(true, { id: normalId, result: "ok" });
		expect(broker.pendingNormalRequestCount).toBe(0);
		expect(broker.pendingBlobRequestCount).toBe(1);
		broker.close();
	});

	it("reports the exact AppPlugin method correlated to a JSON response", () => {
		const broker = new ApkRpcRequestBroker(
			new RecordingTransport(),
			"ENDPOINT",
			"00112233445566778899AABBCCDDEEFF",
			{ initialMessageId: 17 },
		);
		broker.callJson("app_get_status", [], "automatic", vi.fn());

		expect(broker.acceptJsonDpsWithMetadata({
			"102": { id: 17, result: { state: 8 } },
		})).toEqual({ method: "app_get_status", params: [] });
		expect(broker.pendingNormalRequestCount).toBe(0);
		broker.close();
	});

	it("returns protobuf results in the APK pbResult wrapper", () => {
		const transport = new RecordingTransport();
		const broker = new ApkRpcRequestBroker(transport, "ENDPOINT", "00112233445566778899AABBCCDDEEFF", {
			initialMessageId: 5,
		});
		const callback = vi.fn();
		broker.callJson("protobuf_method", [], "local", callback);
		expect(broker.acceptProtobufRpc(5, Buffer.from("result"))).toBe(true);
		expect(callback).toHaveBeenCalledWith(true, { pbResult: "cmVzdWx0" });
	});

	it("decodes completed version-0 blob responses before invoking the bundle callback", () => {
		const transport = new RecordingTransport();
		const nonce = "00112233445566778899AABBCCDDEEFF";
		const broker = new ApkRpcRequestBroker(transport, "ENDPOINT", nonce, { initialMessageId: 9 });
		const callback = vi.fn();
		broker.callBlobJson("get_map", {}, "automatic", callback);
		const map = Buffer.from("original-map-bytes");

		expect(broker.acceptBlobResponse({
			kind: "rpc-response",
			duid: "rr-device",
			messageId: 9,
			protocolVersion: 0,
			encodedResponse: Buffer.concat([Buffer.from([0]), zlib.gzipSync(map)]),
		})).toBe(true);
		expect(callback).toHaveBeenCalledWith(true, map.toString("base64"));
		expect(broker.pendingBlobRequestCount).toBe(0);
	});

	it("uses the APK ten-second timeout and removes the pending request", () => {
		vi.useFakeTimers();
		const broker = new ApkRpcRequestBroker(
			new RecordingTransport(),
			"ENDPOINT",
			"00112233445566778899AABBCCDDEEFF",
			{ initialMessageId: 1 },
		);
		const callback = vi.fn();
		broker.callJson("slow", {}, "automatic", callback);
		vi.advanceTimersByTime(9_999);
		expect(callback).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(callback).toHaveBeenCalledWith(false, { error: "timeout" });
		expect(broker.pendingNormalRequestCount).toBe(0);
	});

	it("propagates the APK transport-error string and clears its timeout", async () => {
		vi.useFakeTimers();
		const transport = new RecordingTransport();
		transport.nextError = { code: "om.err.device.removed", message: "device is null" };
		const broker = new ApkRpcRequestBroker(transport, "ENDPOINT", "00112233445566778899AABBCCDDEEFF", {
			initialMessageId: 1,
		});
		const callback = vi.fn();
		broker.callBlobProtobuf(Buffer.from("request"), "cloud", callback);
		await vi.runAllTicks();
		await Promise.resolve();

		expect(callback).toHaveBeenCalledWith(false, {
			error: "om.err.device.removed[device is null]",
		});
		expect(broker.pendingBlobRequestCount).toBe(0);
		vi.advanceTimersByTime(10_000);
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("wraps message IDs at the signed Java-int boundary without colliding across tables", () => {
		const transport = new RecordingTransport();
		const broker = new ApkRpcRequestBroker(
			transport,
			"ENDPOINT",
			"00112233445566778899AABBCCDDEEFF",
			{ initialMessageId: 0x7fff_ffff },
		);
		const first = vi.fn();
		const second = vi.fn();
		const third = vi.fn();

		expect(broker.callJson("last", {}, "automatic", first)).toBe(0x7fff_ffff);
		expect(broker.callBlobJson("wrapped", {}, "automatic", second)).toBe(1);
		expect(broker.callProtobuf(Buffer.from("next"), "automatic", third)).toBe(2);
		expect(new Set(transport.json.map(entry => entry.request.id))).toEqual(new Set([0x7fff_ffff, 1]));
		expect(transport.protobuf[0]?.request.id).toBe(2);
		broker.close();
	});

	it("closes every pending callback exactly once and rejects future allocation", () => {
		vi.useFakeTimers();
		const broker = new ApkRpcRequestBroker(
			new RecordingTransport(),
			"ENDPOINT",
			"00112233445566778899AABBCCDDEEFF",
			{ initialMessageId: 10 },
		);
		const normal = vi.fn();
		const blob = vi.fn();
		broker.callJson("normal", {}, "automatic", normal);
		broker.callBlobJson("blob", {}, "automatic", blob);

		broker.close();
		broker.close();
		expect(normal).toHaveBeenCalledOnce();
		expect(normal).toHaveBeenCalledWith(false, { error: "closed" });
		expect(blob).toHaveBeenCalledOnce();
		expect(blob).toHaveBeenCalledWith(false, { error: "closed" });
		expect(broker.pendingNormalRequestCount).toBe(0);
		expect(broker.pendingBlobRequestCount).toBe(0);
		vi.advanceTimersByTime(10_000);
		expect(normal).toHaveBeenCalledOnce();
		expect(blob).toHaveBeenCalledOnce();
		expect(() => broker.callJson("after-close", {}, "automatic", vi.fn())).toThrow(/geschlossen/u);
	});

	it("preserves the APK automatic/local/cloud tri-state", () => {
		expect(ApkRpcRequestBroker.routeToApkBoolean("automatic")).toBeNull();
		expect(ApkRpcRequestBroker.routeToApkBoolean("local")).toBe(true);
		expect(ApkRpcRequestBroker.routeToApkBoolean("cloud")).toBe(false);
	});
});
