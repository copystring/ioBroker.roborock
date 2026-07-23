import { describe, expect, it, vi } from "vitest";

import type { Roborock } from "../../src/main";
import {
	ApkDeviceIngressRouter,
	type ApkAppPluginDeviceModelContext,
	type ApkAppPluginModelRuntimeRequest,
	type ApkDeviceIngress,
	type ApkHermesHostArtifact,
} from "../../src/apppluginHost";
import {
	createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory,
} from "../../src/lib/appplugin/IoBrokerReadOnlyAppPluginDeviceHost";

function adapter() {
	const buildRoborockMessage = vi.fn(async () => Buffer.from("wire-frame"));
	const sendMessageChecked = vi.fn(async () => undefined);
	const ensureEndpoint = vi.fn(async () => "endpoint-1");
	const value = {
		http_api: {
			getDevices: () => [{ duid: "device-1", online: true }],
		},
		local_api: {
			isConnected: () => false,
			localDevices: {},
			sendMessageChecked: vi.fn(async () => undefined),
		},
		mqtt_api: {
			ensureEndpoint,
			isConnected: () => true,
			sendMessageChecked,
		},
		nonce: Buffer.from("00112233445566778899aabbccddeeff", "hex"),
		requestsHandler: { messageParser: { buildRoborockMessage } },
		getDeviceProtocolVersion: vi.fn(async () => "1.0"),
		rLog: vi.fn(),
	};
	return { buildRoborockMessage, ensureEndpoint, sendMessageChecked, value: value as unknown as Roborock };
}

function request(deviceId = "device-1"): ApkAppPluginModelRuntimeRequest<ApkAppPluginDeviceModelContext> {
	return {
		activeTime: 17,
		deviceId,
		model: "roborock.generic.model",
		context: {
			session: {
				descriptor: {
					device: {
						deviceId,
						firmwareVersion: "02.01.00",
					},
					host: { clientId: "client-1" },
				},
			},
		} as unknown as ApkAppPluginDeviceModelContext,
	};
}

function ingress(): ApkDeviceIngress {
	return {
		acceptBlobSegment: vi.fn(),
		acceptJsonDps: vi.fn(() => ({ eventEmitted: true, rpcAccepted: true })),
		acceptProtobufDps: vi.fn(),
	} as unknown as ApkDeviceIngress;
}

describe("ioBroker read-only AppPlugin device host", () => {
	it("composes an APK host that sends only an AppPlugin-generated allowed read", async () => {
		const fixture = adapter();
		const router = new ApkDeviceIngressRouter();
		const factory = createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory({
			adapter: fixture.value,
			allowedMethods: ["get_status"],
			ingressRouter: router,
			language: "de",
			localeIdentifier: "de_DE",
		});
		const lease = await factory(request(), { target: "win32-x64" } as ApkHermesHostArtifact);

		expect(fixture.ensureEndpoint).toHaveBeenCalledOnce();
		expect(lease.initialState).toMatchObject({
			localization: { language: "de", localeIdentifier: "de_DE", isRTL: false },
			network: { isInternetReachable: true },
		});
		expect(lease.ports.rpc).toMatchObject({
			endpoint: "endpoint-1",
			nonce: "00112233445566778899aabbccddeeff",
		});

		await lease.ports.rpc.transport.sendJson({
			id: 41,
			method: "get_status",
			params: [],
		}, "automatic");

		const [deviceId, protocol, timestamp, serializedEnvelope, protocolVersion]
			= fixture.buildRoborockMessage.mock.calls[0] ?? [];
		expect({ deviceId, protocol, protocolVersion }).toEqual({
			deviceId: "device-1",
			protocol: 101,
			protocolVersion: "1.0",
		});
		const envelope = JSON.parse(String(serializedEnvelope)) as {
			dps: Record<string, string>;
			t: number;
		};
		expect(envelope.t).toBe(timestamp);
		expect(JSON.parse(envelope.dps["101"] ?? "null")).toEqual({
			id: 41,
			method: "get_status",
			params: [],
		});
		expect(fixture.sendMessageChecked).toHaveBeenCalledWith("device-1", Buffer.from("wire-frame"));
		await expect(lease.ports.rpc.transport.sendJson({
			id: 42,
			method: "app_start",
			params: [],
		}, "automatic")).rejects.toThrow(/Read-only-Richtlinie blockiert/u);
		expect(fixture.sendMessageChecked).toHaveBeenCalledOnce();

		await lease.release();
		expect(lease.ports.hasActivity()).toBe(false);
		await expect(lease.ports.rpc.transport.sendJson({
			id: 43,
			method: "get_status",
			params: [],
		}, "automatic")).rejects.toThrow(/Read-only-Richtlinie blockiert/u);
		expect(fixture.sendMessageChecked).toHaveBeenCalledOnce();
	});

	it("binds responses to one generation and removes the binding on release", async () => {
		const fixture = adapter();
		const router = new ApkDeviceIngressRouter();
		const factory = createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory({
			adapter: fixture.value,
			allowedMethods: [],
			ingressRouter: router,
		});
		const lease = await factory(request(), { target: "win32-x64" } as ApkHermesHostArtifact);
		const deviceIngress = ingress();
		const detach = lease.attachDeviceIngress?.(deviceIngress);

		expect(router.activeDeviceCount).toBe(1);
		expect(router.acceptJsonDps("device-1", "1.0", "{}"))
			.toEqual({ eventEmitted: true, rpcAccepted: true });
		expect(() => lease.attachDeviceIngress?.(deviceIngress)).toThrow(/bereits einen aktiven Ingress/u);

		detach?.();
		expect(router.activeDeviceCount).toBe(0);
		lease.attachDeviceIngress?.(deviceIngress);
		await lease.release();
		expect(router.activeDeviceCount).toBe(0);
		expect(() => lease.attachDeviceIngress?.(deviceIngress)).toThrow(/bereits freigegeben/u);
	});

	it("keeps wire targets and ingress ownership isolated for two devices sharing one model", async () => {
		const fixture = adapter();
		const router = new ApkDeviceIngressRouter();
		const factory = createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory({
			adapter: fixture.value,
			allowedMethods: ["get_status"],
			ingressRouter: router,
		});
		const artifact = { target: "win32-x64" } as ApkHermesHostArtifact;
		const first = await factory(request("device-1"), artifact);
		const second = await factory(request("device-2"), artifact);
		const firstIngress = ingress();
		const secondIngress = ingress();
		first.attachDeviceIngress?.(firstIngress);
		second.attachDeviceIngress?.(secondIngress);

		await first.ports.rpc.transport.sendJson({
			id: 51,
			method: "get_status",
			params: [],
		}, "automatic");
		await second.ports.rpc.transport.sendJson({
			id: 52,
			method: "get_status",
			params: [],
		}, "automatic");

		expect(fixture.buildRoborockMessage.mock.calls.map(call => call[0]))
			.toEqual(["device-1", "device-2"]);
		expect(router.activeDeviceCount).toBe(2);
		expect(router.acceptJsonDps("device-1", "1.0", "{}"))
			.toEqual({ eventEmitted: true, rpcAccepted: true });
		expect(firstIngress.acceptJsonDps).toHaveBeenCalledOnce();
		expect(secondIngress.acceptJsonDps).not.toHaveBeenCalled();

		await first.release();
		expect(router.activeDeviceCount).toBe(1);
		expect(router.acceptJsonDps("device-2", "L01", "{}"))
			.toEqual({ eventEmitted: true, rpcAccepted: true });
		expect(secondIngress.acceptJsonDps).toHaveBeenCalledOnce();

		await second.release();
		expect(router.activeDeviceCount).toBe(0);
	});

	it("rejects invalid display metrics before acquiring an endpoint", async () => {
		const fixture = adapter();
		const factory = createIoBrokerReadOnlyAppPluginDeviceHostLeaseFactory({
			adapter: fixture.value,
			allowedMethods: ["get_status"],
			display: { width: 0 },
			ingressRouter: new ApkDeviceIngressRouter(),
		});
		await expect(factory(request(), { target: "win32-x64" } as ApkHermesHostArtifact))
			.rejects.toThrow(/Fensterbreite/u);
		expect(fixture.ensureEndpoint).not.toHaveBeenCalled();
	});
});
