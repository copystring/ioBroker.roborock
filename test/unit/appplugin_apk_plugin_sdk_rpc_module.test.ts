import { describe, expect, it, vi } from "vitest";

import { encodeApkAppToRobotMessage } from "../../src/apppluginHost/apkAppToRobotMessage";
import { ApkPluginSdkRpcModule } from "../../src/apppluginHost/apkPluginSdkRpcModule";
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

	public async sendJson(request: ApkJsonRpcRequest, route: ApkRpcRoute): Promise<void> {
		this.json.push({ request, route });
	}

	public async sendProtobuf(request: ApkProtobufRpcRequest, route: ApkRpcRoute): Promise<void> {
		this.protobuf.push({ request, route });
	}
}

function createHost(available = true, initialMessageId = 100) {
	const transport = new RecordingTransport();
	const broker = new ApkRpcRequestBroker(transport, "ENDPOINT", "00112233445566778899AABBCCDDEEFF", {
		initialMessageId,
	});
	const bluetooth = vi.fn();
	const strategyState = {
		isInternetReachable: vi.fn(() => true),
		isLocalDeviceConnected: vi.fn(() => false),
		isBluetoothCommunicated: vi.fn(() => false),
		callBluetoothProtobuf: bluetooth,
	};
	const module = new ApkPluginSdkRpcModule(
		broker,
		{ hasRnActivity: () => available },
		strategyState,
	);
	return { bluetooth, broker, module, strategyState, transport };
}

describe("APK AppToRobotMsg protobuf envelope", () => {
	it("uses the APK field numbers and omits default-valued fields", () => {
		expect(encodeApkAppToRobotMessage({ id: 5, method: Buffer.from("req") }).toString("hex"))
			.toBe("18053203726571");
		expect(encodeApkAppToRobotMessage({
			id: 6,
			endpoint: "E",
			nonce: "N",
			method: Buffer.from("m"),
		}).toString("hex")).toBe("18062201452a014e32016d");
		expect(encodeApkAppToRobotMessage({ id: 0, method: Buffer.alloc(0) })).toEqual(Buffer.alloc(0));
	});

	it("builds distinct normal and blob envelopes in the broker", () => {
		const { broker, transport } = createHost(true, 5);
		broker.callProtobuf(Buffer.from("req"), "local", vi.fn());
		broker.callBlobProtobuf(Buffer.from("map"), "cloud", vi.fn());

		expect(transport.protobuf[0]).toMatchObject({
			route: "local",
			request: { kind: "normal", id: 5 },
		});
		expect(Buffer.from(transport.protobuf[0].request.appToRobotMessage).toString("hex"))
			.toBe("18053203726571");
		expect(transport.protobuf[1]).toMatchObject({
			route: "cloud",
			request: { kind: "blob", id: 6 },
		});
		expect(Buffer.from(transport.protobuf[1].request.appToRobotMessage).toString("hex"))
			.toBe("18062208454e44504f494e542a20303031313232333334343535363637373838393941414242434344444545464632036d6170");
		broker.close();
	});
});

describe("APK RRPluginSDK RPC module", () => {
	it("routes Array and Map callMethod arguments exactly and rejects unsupported Dynamic types", () => {
		const { broker, module, transport } = createHost();
		const unsupported = vi.fn();
		module.callMethod("auto", [1, 2], null, vi.fn());
		module.callMethodFromCloud("cloud", { room: 3 }, null, vi.fn());
		module.callMethodFromLocal("local", { fan: 101 }, null, vi.fn());
		module.callMethod("invalid", "not-a-dynamic-map", null, unsupported);

		expect(transport.json.map(({ request, route }) => ({ method: request.method, params: request.params, route })))
			.toEqual([
				{ method: "auto", params: [1, 2], route: "automatic" },
				{ method: "cloud", params: { room: 3 }, route: "cloud" },
				{ method: "local", params: { fan: 101 }, route: "local" },
			]);
		expect(unsupported).toHaveBeenCalledWith(false);
		broker.close();
	});

	it("uses the normal protobuf table for all callMethodPb aliases", () => {
		const { broker, module, transport } = createHost();
		const payload = Buffer.from([8, 42, 18, 1, 7]).toString("base64");
		module.callMethodPb(payload, vi.fn());
		module.callMethodPbV2(payload, "1.0", vi.fn());
		module.callMethodPbFromCloud(payload, vi.fn());
		module.callMethodPbFromCloudV2(payload, "b01", vi.fn());
		module.callMethodPbFromLocal(payload, vi.fn());
		module.callMethodPbFromLocalV2(payload, "a01", vi.fn());

		expect(transport.protobuf.map(({ request, route }) => ({ kind: request.kind, route }))).toEqual([
			{ kind: "normal", route: "automatic" },
			{ kind: "normal", route: "automatic" },
			{ kind: "normal", route: "cloud" },
			{ kind: "normal", route: "cloud" },
			{ kind: "normal", route: "local" },
			{ kind: "normal", route: "local" },
		]);
		for (const { request } of transport.protobuf) {
			expect(Buffer.from(request.payload)).toEqual(Buffer.from([8, 42, 18, 1, 7]));
		}
		broker.close();
	});

	it("reproduces the APK strategy routing without model-specific command knowledge", () => {
		const { bluetooth, broker, module, strategyState, transport } = createHost();
		const payload = Buffer.from("request").toString("base64");

		module.callMethodPbWithStrategy("NETWORK_ONLY", payload, "1.0", vi.fn());
		module.callMethodPbWithStrategy("NETWORK_FIRST", payload, "1.0", vi.fn());
		strategyState.isLocalDeviceConnected.mockReturnValue(true);
		module.callMethodPbWithStrategy("LAN_BLE_FIRST", payload, "1.0", vi.fn());
		strategyState.isLocalDeviceConnected.mockReturnValue(false);
		module.callMethodPbWithStrategy("BLUETOOTH_ONLY", payload, "1.0", vi.fn());

		expect(transport.protobuf.map(entry => entry.route)).toEqual(["automatic", "automatic", "local"]);
		expect(bluetooth).toHaveBeenCalledTimes(1);
		expect(Buffer.from(bluetooth.mock.calls[0][0])).toEqual(Buffer.from("request"));
		broker.close();
	});

	it("uses the APK Bluetooth fallback branches when no network path is available", () => {
		const { bluetooth, broker, module, strategyState, transport } = createHost();
		const payload = Buffer.from("request").toString("base64");
		strategyState.isInternetReachable.mockReturnValue(false);

		module.callMethodPbWithStrategy("NETWORK_FIRST", payload, "1.0", vi.fn());
		module.callMethodPbWithStrategy("BLUETOOTH_FIRST", payload, "1.0", vi.fn());
		strategyState.isBluetoothCommunicated.mockReturnValue(true);
		module.callMethodPbWithStrategy("LAN_BLE_FIRST", payload, "1.0", vi.fn());

		expect(bluetooth).toHaveBeenCalledTimes(2);
		expect(transport.protobuf.map(entry => entry.route)).toEqual(["cloud"]);
		broker.close();
	});

	it("reports the APK Bluetooth communication state without model inference", async () => {
		const { broker, module, strategyState } = createHost();
		await expect(module.blueIsConnected("ignored-by-apk")).resolves.toBe(false);
		strategyState.isBluetoothCommunicated.mockReturnValue(true);
		await expect(module.blueIsConnected()).resolves.toBe(true);
		expect(strategyState.isBluetoothCommunicated).toHaveBeenCalledTimes(2);
		broker.close();

		const unavailable = createHost(false);
		await expect(unavailable.module.blueIsConnected()).rejects.toThrow("no activity");
		unavailable.broker.close();
	});

	it("delegates map and robot data to the APK blob request paths", () => {
		const { broker, module, transport } = createHost();
		const payload = Buffer.from("remote-message").toString("base64");
		module.getMapData("get_map", { map: 0 }, vi.fn());
		module.getRobotData("get_robot_data", { type: 1 }, vi.fn());
		module.getMapDataByPb(payload, vi.fn());
		module.getMapDataByPbV2(payload, "1.0", vi.fn());
		module.getRobotBlobByPb(payload, vi.fn());
		module.getRobotBlobByPbV2(payload, "b01", vi.fn());

		expect(transport.json).toHaveLength(2);
		expect(transport.json.every(entry => entry.route === "automatic" && entry.request.security !== undefined)).toBe(true);
		expect(transport.protobuf).toHaveLength(4);
		expect(transport.protobuf.every(entry => entry.route === "cloud" && entry.request.kind === "blob")).toBe(true);
		broker.close();
	});

	it("returns the APK activity-null callback before decoding or routing", () => {
		const { broker, module, transport } = createHost(false);
		const callbacks = [vi.fn(), vi.fn(), vi.fn(), vi.fn()];
		module.callMethod("status", {}, null, callbacks[0]);
		module.callMethodPb("not base64", callbacks[1]);
		module.getMapData("get_map", {}, callbacks[2]);
		module.getRobotBlobByPb("not base64", callbacks[3]);

		for (const callback of callbacks) expect(callback).toHaveBeenCalledWith(false, { error: "null" });
		expect(transport.json).toHaveLength(0);
		expect(transport.protobuf).toHaveLength(0);
		broker.close();
	});
});
