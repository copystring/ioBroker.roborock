import { afterEach, describe, expect, it, vi } from "vitest";

import {
	APK_HOST_SERVICE_PROTOCOL,
	APK_HOST_SERVICE_PROTOCOL_VERSION,
	ApkHostServiceClient,
	ApkHostServiceError,
	ApkHostServicePublicError,
	ApkHostServiceRouter,
	fromApkHostServiceWireValue,
	parseApkHostServiceMessage,
	serializeApkHostServiceMessage,
	toApkHostServiceWireValue,
	type ApkHostServiceRequest,
	type ApkHostServiceResponse,
} from "../../src/apppluginHost/apkHostServiceProtocol";

function request(overrides: Partial<ApkHostServiceRequest> = {}): ApkHostServiceRequest {
	return {
		protocol: APK_HOST_SERVICE_PROTOCOL,
		version: APK_HOST_SERVICE_PROTOCOL_VERSION,
		type: "request",
		requestId: 7,
		operation: "http.user.get",
		payload: { path: "/user/devices", params: null },
		...overrides,
	};
}

function success(requestId: number, value: ApkHostServiceResponse & { ok: true }["value"]): ApkHostServiceResponse {
	return {
		protocol: APK_HOST_SERVICE_PROTOCOL,
		version: APK_HOST_SERVICE_PROTOCOL_VERSION,
		type: "response",
		requestId,
		ok: true,
		value,
	};
}

afterEach(() => {
	vi.useRealTimers();
});

describe("APK host service protocol", () => {
	it("round-trips allowlisted service requests without credentials in the envelope", () => {
		const original = request();
		const serialized = serializeApkHostServiceMessage(original);

		expect(parseApkHostServiceMessage(serialized)).toEqual(original);
		expect(serialized).not.toMatch(/authorization|token|secret/iu);
	});

	it("carries prepared binary image parts without sharing file-system paths", () => {
		const source = { filename: "room.jpg", bytes: Buffer.from([0, 1, 2, 255]), optional: undefined };
		const wire = toApkHostServiceWireValue(source);

		expect(wire).toEqual({
			filename: "room.jpg",
			bytes: { $apkType: "bytes", base64: "AAEC/w==" },
			optional: { $apkType: "undefined" },
		});
		expect(fromApkHostServiceWireValue(wire)).toEqual(source);
		expect(() => toApkHostServiceWireValue({ self: null as unknown })).not.toThrow();
		const cyclic: { self?: unknown } = {};
		cyclic.self = cyclic;
		expect(() => toApkHostServiceWireValue(cyclic)).toThrow(/Zyklischer/u);
	});

	it("rejects unknown operations, unsafe keys and oversized messages", () => {
		expect(() => parseApkHostServiceMessage(JSON.stringify({
			...request(),
			operation: "http.arbitrary.fetch",
		}))).toThrow(/Unbekannter/u);
		expect(() => serializeApkHostServiceMessage(request({
			payload: JSON.parse('{"__proto__":"blocked"}') as never,
		}))).toThrow(/Unsicherer/u);
		expect(() => serializeApkHostServiceMessage(request({ payload: "12345" }), {
			maxLineBytes: 64,
		})).toThrow(/überschreitet/u);
	});

	it("rejects deeply nested or excessively broad payloads before dispatch", () => {
		const deep = { child: { child: { child: null } } };
		expect(() => serializeApkHostServiceMessage(request({ payload: deep }), { maxDepth: 2 }))
			.toThrow(/Tiefe/u);
		expect(() => serializeApkHostServiceMessage(request({ payload: [1, 2, 3] }), { maxNodes: 3 }))
			.toThrow(/Knoten/u);
	});

	it("correlates concurrent responses out of order and ignores duplicates", async () => {
		const sent: ApkHostServiceRequest[] = [];
		const client = new ApkHostServiceClient(message => sent.push(message), { initialRequestId: 41 });
		const first = client.request("http.iot.get", { path: "/first" });
		const second = client.request("http.user.get", { path: "/second" });

		expect(sent.map(message => message.requestId)).toEqual([41, 42]);
		expect(client.accept(success(42, "owner"))).toBe(true);
		expect(client.accept(success(41, "first-result"))).toBe(true);
		expect(client.accept(success(41, "duplicate"))).toBe(false);
		await expect(first).resolves.toBe("first-result");
		await expect(second).resolves.toBe("owner");
		expect(client.pendingRequestCount).toBe(0);
	});

	it("bounds parallel work and times out pending requests exactly once", async () => {
		vi.useFakeTimers();
		const client = new ApkHostServiceClient(() => undefined, {
			maxPendingRequests: 1,
			timeoutMilliseconds: 500,
		});
		const pending = client.request("http.iot.get", { path: "/slow" });
		const overloaded = client.request("http.iot.get", { path: "/second" });

		await expect(overloaded).rejects.toMatchObject({ code: "overloaded" });
		vi.advanceTimersByTime(500);
		await expect(pending).rejects.toMatchObject({ code: "timeout" });
		expect(client.pendingRequestCount).toBe(0);
	});

	it("sanitizes transport failures and closes every pending request", async () => {
		const transportFailure = new ApkHostServiceClient(() => {
			throw new Error("Authorization: Bearer secret-value");
		});
		const failed = transportFailure.request("http.headers.get", null);
		await expect(failed).rejects.toMatchObject({
			code: "transport",
			message: "APK-Host-Diensttransport ist fehlgeschlagen: Error",
		});

		const client = new ApkHostServiceClient(() => undefined);
		const pending = client.request("http.iot.get", null);
		client.close();
		client.close();
		await expect(pending).rejects.toMatchObject({ code: "closed" });
		await expect(client.request("http.iot.get", null)).rejects.toMatchObject({ code: "closed" });
	});

	it("routes only registered APK services and preserves safe public errors", async () => {
		const router = new ApkHostServiceRouter({
			"http.user.get": payload => {
				expect(payload).toEqual({ path: "/user/profile" });
				return "profile";
			},
			"http.iot.get": () => {
				throw new ApkHostServicePublicError("unavailable", "IoT-Sitzung fehlt");
			},
		});

		await expect(router.handle(request({
			operation: "http.user.get",
			payload: { path: "/user/profile" },
		}))).resolves.toMatchObject({ ok: true, value: "profile" });
		await expect(router.handle(request({ operation: "http.iot.get" }))).resolves.toMatchObject({
			ok: false,
			error: { code: "unavailable", message: "IoT-Sitzung fehlt" },
		});
		await expect(router.handle(request({ operation: "http.mall.get" }))).resolves.toMatchObject({
			ok: false,
			error: { code: "unavailable", message: "APK-Host-Dienst ist nicht verbunden" },
		});
	});

	it("does not expose unexpected handler errors to the AppPlugin", async () => {
		const router = new ApkHostServiceRouter({
			"http.user.get": () => {
				throw new Error("Authorization=secret; https://private-host/user");
			},
		});
		const response = await router.handle(request());

		expect(response).toMatchObject({
			ok: false,
			error: { code: "internal", message: "APK-Host-Dienst ist intern fehlgeschlagen" },
		});
		expect(JSON.stringify(response)).not.toMatch(/secret|private-host/iu);
	});

	it("wraps signed request IDs without colliding with pending work", async () => {
		const sent: ApkHostServiceRequest[] = [];
		const client = new ApkHostServiceClient(message => sent.push(message), {
			initialRequestId: 0x7fff_ffff,
		});
		const last = client.request("http.headers.get", null);
		const wrapped = client.request("http.headers.get", null);

		expect(sent.map(message => message.requestId)).toEqual([0x7fff_ffff, 1]);
		client.accept(success(0x7fff_ffff, {}));
		client.accept(success(1, {}));
		await expect(last).resolves.toEqual({});
		await expect(wrapped).resolves.toEqual({});
	});

	it("propagates only validated remote error codes", async () => {
		const sent: ApkHostServiceRequest[] = [];
		const client = new ApkHostServiceClient(message => sent.push(message));
		const result = client.request("http.user.get", null);
		client.accept({
			protocol: APK_HOST_SERVICE_PROTOCOL,
			version: APK_HOST_SERVICE_PROTOCOL_VERSION,
			type: "response",
			requestId: sent[0]!.requestId,
			ok: false,
			error: { code: "unavailable", message: "Keine Sitzung" },
		});

		await expect(result).rejects.toBeInstanceOf(ApkHostServiceError);
		await expect(result).rejects.toMatchObject({ code: "unavailable", message: "Keine Sitzung" });
	});
});
