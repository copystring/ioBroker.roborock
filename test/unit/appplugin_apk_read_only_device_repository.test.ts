import { describe, expect, it, vi } from "vitest";

import {
	ApkReadOnlyDeviceRepository,
	createApkReadOnlyMethodAuthorizer,
	type ApkReadOnlyDeviceWirePort,
} from "../../src/apppluginHost/apkReadOnlyDeviceRepository";

function wire(overrides: Partial<ApkReadOnlyDeviceWirePort> = {}) {
	return {
		connectLocalDeviceIfNeeded: vi.fn(() => 1),
		deviceOnline: vi.fn(async () => true),
		isCloudConnected: vi.fn(() => true),
		isLocalConnected: vi.fn(() => false),
		loadShadowDps: vi.fn(async () => null),
		sendJsonDps: vi.fn(async () => undefined),
		...overrides,
	} satisfies ApkReadOnlyDeviceWirePort;
}

function request(method = "get_status") {
	return Object.freeze({
		"101": JSON.stringify({ id: 41, method, params: [] }),
	});
}

describe("APK read-only device repository", () => {
	it("sends an explicitly allowed AppPlugin request unchanged over the selected APK route", async () => {
		const localWire = wire({ isLocalConnected: vi.fn(() => true) });
		const repository = new ApkReadOnlyDeviceRepository(
			localWire,
			createApkReadOnlyMethodAuthorizer(["get_status"]),
		);
		const dps = request();

		await repository.publishDps(dps);
		await repository.publishDpsMqtt(dps);

		expect(localWire.sendJsonDps).toHaveBeenNthCalledWith(1, "local", dps);
		expect(localWire.sendJsonDps).toHaveBeenNthCalledWith(2, "cloud", dps);
	});

	it("fails closed before the wire for writes, arbitrary DPS and opaque protobuf", async () => {
		const transport = wire();
		const repository = new ApkReadOnlyDeviceRepository(
			transport,
			createApkReadOnlyMethodAuthorizer(["get_status"]),
		);

		await expect(repository.publishDpsMqtt(request("app_start"))).rejects.toThrow(/blockiert/u);
		await expect(repository.publishDpsMqtt({ "121": 8 })).rejects.toThrow(/ausschließlich/u);
		await expect(repository.publishDpsProtobuf(Buffer.from("opaque"))).rejects.toThrow(/Protobuf/u);
		expect(transport.sendJsonDps).not.toHaveBeenCalled();
	});

	it("does not silently fall back when the AppPlugin explicitly selects an unavailable route", async () => {
		const transport = wire({ isCloudConnected: vi.fn(() => false) });
		const repository = new ApkReadOnlyDeviceRepository(
			transport,
			createApkReadOnlyMethodAuthorizer(["get_status"]),
		);

		await expect(repository.publishDpsMqtt(request())).rejects.toThrow(/nicht verbunden/u);
		expect(transport.sendJsonDps).not.toHaveBeenCalled();
	});
});
