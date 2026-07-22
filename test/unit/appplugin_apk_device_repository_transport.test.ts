import { describe, expect, it, vi } from "vitest";

import {
	ApkDeviceRepositoryTransport,
	createApkDeviceRepositoryRuntimePorts,
	type ApkDeviceRepositoryPort,
} from "../../src/apppluginHost/apkDeviceRepositoryTransport";
import type {
	ApkJsonRpcRequest,
	ApkProtobufRpcRequest,
} from "../../src/apppluginHost/apkRpcRequestBroker";

function repositoryPort(): ApkDeviceRepositoryPort & {
	readonly connectLocalDeviceIfNeeded: ReturnType<typeof vi.fn>;
	readonly deviceOnline: ReturnType<typeof vi.fn>;
	readonly loadShadowDps: ReturnType<typeof vi.fn>;
	readonly publishDps: ReturnType<typeof vi.fn>;
	readonly sendDpsLocal: ReturnType<typeof vi.fn>;
	readonly publishDpsMqtt: ReturnType<typeof vi.fn>;
	readonly publishDpsProtobuf: ReturnType<typeof vi.fn>;
	readonly sendDpsProtobufLocal: ReturnType<typeof vi.fn>;
	readonly publishDpsProtobufMqtt: ReturnType<typeof vi.fn>;
} {
	return {
		connectLocalDeviceIfNeeded: vi.fn(() => 1),
		deviceOnline: vi.fn(async () => true),
		loadShadowDps: vi.fn(async () => "{\"102\":{}}"),
		publishDps: vi.fn(async () => undefined),
		sendDpsLocal: vi.fn(async () => undefined),
		publishDpsMqtt: vi.fn(async () => undefined),
		publishDpsProtobuf: vi.fn(async () => undefined),
		sendDpsProtobufLocal: vi.fn(async () => undefined),
		publishDpsProtobufMqtt: vi.fn(async () => undefined),
	};
}

const jsonRequest: ApkJsonRpcRequest = {
	id: 17,
	method: "app_start",
	params: { rooms: [16, 18], repeat: 2 },
};

const protobufRequest: ApkProtobufRpcRequest = {
	kind: "normal",
	id: 18,
	payload: Buffer.from("bundle-method"),
	appToRobotMessage: Buffer.from([0x18, 0x12, 0x32, 0x03, 0x72, 0x65, 0x71]),
};

describe("APK device repository transport", () => {
	it("routes unchanged JSON RPC envelopes through the three APK repository paths", async () => {
		const repository = repositoryPort();
		const transport = new ApkDeviceRepositoryTransport(repository);

		await transport.sendJson(jsonRequest, "automatic");
		await transport.sendJson(jsonRequest, "local");
		await transport.sendJson(jsonRequest, "cloud");

		const expected = {
			"101": JSON.stringify(jsonRequest),
		};
		expect(repository.publishDps).toHaveBeenCalledOnce();
		expect(repository.publishDps).toHaveBeenCalledWith(expected);
		expect(repository.sendDpsLocal).toHaveBeenCalledOnce();
		expect(repository.sendDpsLocal).toHaveBeenCalledWith(expected);
		expect(repository.publishDpsMqtt).toHaveBeenCalledOnce();
		expect(repository.publishDpsMqtt).toHaveBeenCalledWith(expected);
	});

	it("routes the broker-owned AppToRobot protobuf without rebuilding bundle payloads", async () => {
		const repository = repositoryPort();
		const transport = new ApkDeviceRepositoryTransport(repository);

		await transport.sendProtobuf(protobufRequest, "automatic");
		await transport.sendProtobuf(protobufRequest, "local");
		await transport.sendProtobuf(protobufRequest, "cloud");

		for (const call of [
			repository.publishDpsProtobuf,
			repository.sendDpsProtobufLocal,
			repository.publishDpsProtobufMqtt,
		]) {
			expect(call).toHaveBeenCalledOnce();
			expect(Buffer.from(call.mock.calls[0][0])).toEqual(Buffer.from(protobufRequest.appToRobotMessage));
			expect(call.mock.calls[0][0]).not.toBe(protobufRequest.appToRobotMessage);
		}
	});

	it("keeps RRPluginDevice raw DPS separate from RPC envelope construction", async () => {
		const repository = repositoryPort();
		const transport = new ApkDeviceRepositoryTransport(repository);
		const dps = { "10000": { method: "vendor.future.command", params: { value: 7 } } };

		await transport.publishDps(dps);

		expect(repository.publishDps).toHaveBeenCalledWith(dps);
		expect(repository.sendDpsLocal).not.toHaveBeenCalled();
		expect(repository.publishDpsMqtt).not.toHaveBeenCalled();
	});

	it("delegates connection, online and shadow state without product assumptions", async () => {
		const repository = repositoryPort();
		const transport = new ApkDeviceRepositoryTransport(repository);

		expect(transport.connectLocalDeviceIfNeeded(8)).toBe(1);
		await expect(transport.deviceOnline()).resolves.toBe(true);
		await expect(transport.loadShadowDps()).resolves.toBe("{\"102\":{}}");
		expect(repository.connectLocalDeviceIfNeeded).toHaveBeenCalledWith(8);
	});

	it("provides one shared transport instance for RRPluginDevice and RRRpcManager", () => {
		const ports = createApkDeviceRepositoryRuntimePorts(repositoryPort());

		expect(ports.deviceTransport).toBe(ports.rpcTransport);
		expect(Object.isFrozen(ports)).toBe(true);
	});

	it("propagates repository failures to the broker instead of inventing success", async () => {
		const repository = repositoryPort();
		repository.publishDpsMqtt.mockRejectedValueOnce(new Error("mqtt unavailable"));
		const transport = new ApkDeviceRepositoryTransport(repository);

		await expect(transport.sendJson(jsonRequest, "cloud")).rejects.toThrow("mqtt unavailable");
	});
});
