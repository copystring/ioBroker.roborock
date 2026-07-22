import * as zlib from "node:zlib";

import { describe, expect, it, vi } from "vitest";

import { ApkBlobTransferAssembler, type ApkBlobTransferSegment } from "../../src/apppluginHost/apkBlobTransferAssembler";
import { ApkDeviceIngress } from "../../src/apppluginHost/apkDeviceIngress";
import { ApkPluginDeviceEventBridge } from "../../src/apppluginHost/apkDeviceEvents";
import {
	ApkRpcRequestBroker,
	type ApkJsonRpcRequest,
	type ApkProtobufRpcRequest,
	type ApkRpcRoute,
	type ApkRpcTransport,
} from "../../src/apppluginHost/apkRpcRequestBroker";

class RecordingTransport implements ApkRpcTransport {
	public async sendJson(_request: ApkJsonRpcRequest, _route: ApkRpcRoute): Promise<void> {}
	public async sendProtobuf(_request: ApkProtobufRpcRequest, _route: ApkRpcRoute): Promise<void> {}
}

const duid = "rr-device";
const endpoint = "ENDPOINT";
const nonce = "00112233445566778899AABBCCDDEEFF";

function createIngress(initialMessageId: number) {
	const broker = new ApkRpcRequestBroker(new RecordingTransport(), endpoint, nonce, { initialMessageId });
	const events = new ApkPluginDeviceEventBridge();
	const ingress = new ApkDeviceIngress(
		duid,
		new ApkBlobTransferAssembler(duid, endpoint),
		broker,
		events,
	);
	return { broker, events, ingress };
}

function robotToAppMessage(id: number, type: 0 | 1 | 2, result: Uint8Array): Buffer {
	if (id < 0 || id > 0x7f || result.length > 0x7f) throw new Error("Testwert ist zu groß");
	return Buffer.concat([
		Buffer.from([0x18, id, 0x20, type, 0x2a, result.length]),
		Buffer.from(result),
	]);
}

function blobSegment(overrides: Partial<ApkBlobTransferSegment>): ApkBlobTransferSegment {
	return {
		duid,
		pv: "B01",
		nonce: 1,
		sequenceId: 1,
		isFirst: true,
		isLast: true,
		data: Buffer.alloc(0),
		...overrides,
	};
}

describe("APK device ingress composition", () => {
	it("offers JSON DPS independently to RRPluginDevice events and the guarded RPC table", () => {
		const { broker, events, ingress } = createIngress(9);
		const callback = vi.fn();
		const event = vi.fn();
		broker.callJson("get_status", {}, "automatic", callback);
		events.addListener("RRDeviceDpsUpdateEvent", event);
		const payload = '{"102":{"id":9,"result":"ok"}}';

		expect(ingress.acceptJsonDps("other-device", "1.0", payload)).toEqual({
			eventEmitted: false,
			rpcAccepted: false,
		});
		expect(ingress.acceptJsonDps(duid, "B01", payload)).toEqual({
			eventEmitted: true,
			rpcAccepted: false,
		});
		expect(callback).not.toHaveBeenCalled();
		expect(ingress.acceptJsonDps(duid, "1.0", payload)).toEqual({
			eventEmitted: true,
			rpcAccepted: true,
		});
		expect(event).toHaveBeenCalledTimes(2);
		expect(callback).toHaveBeenCalledWith(true, { id: 9, result: "ok" });
		broker.close();
	});

	it("keeps the wire event untouched while unwrapping string dps.102 only for the RPC table", () => {
		const { broker, events, ingress } = createIngress(12);
		const callback = vi.fn();
		const event = vi.fn();
		broker.callJson("get_status", [], "automatic", callback);
		events.addListener("RRDeviceDpsUpdateEvent", event);
		const payload = JSON.stringify({
			"102": JSON.stringify({ id: 12, result: { battery: 91 } }),
		});

		expect(ingress.acceptJsonDps(duid, "1.0", payload)).toEqual({
			eventEmitted: true,
			rpcAccepted: true,
		});
		expect(event).toHaveBeenCalledWith({ dps: payload });
		expect(callback).toHaveBeenCalledWith(true, { id: 12, result: { battery: 91 } });
		broker.close();
	});

	it("emits only RobotToAppMsg.result and resolves only positive RPC messages", () => {
		const { broker, events, ingress } = createIngress(10);
		const callback = vi.fn();
		const event = vi.fn();
		broker.callProtobuf(Buffer.from("request"), "automatic", callback);
		events.addListener("RRDeviceDpsPbUpdateEvent", event);

		ingress.acceptProtobufDps(duid, "1.0", robotToAppMessage(10, 2, Buffer.from("broadcast")));
		expect(event).toHaveBeenLastCalledWith(Buffer.from("broadcast").toString("base64"));
		expect(callback).not.toHaveBeenCalled();
		expect(ingress.acceptProtobufDps(
			duid,
			"L01",
			robotToAppMessage(10, 1, Buffer.from("response")),
		)).toEqual({ eventEmitted: true, rpcAccepted: true });
		expect(event).toHaveBeenLastCalledWith(Buffer.from("response").toString("base64"));
		expect(callback).toHaveBeenCalledWith(true, { pbResult: Buffer.from("response").toString("base64") });
		broker.close();
	});

	it("sends B01 bytes to the bundle event and completed RPC blobs to their callback table", () => {
		const { broker, events, ingress } = createIngress(20);
		const blobEvent = vi.fn();
		const rpcCallback = vi.fn();
		events.addListener("RRDeviceBlobPayloadUpdateEvent", blobEvent);
		broker.callBlobJson("get_map", {}, "automatic", rpcCallback);

		expect(ingress.acceptBlobSegment(blobSegment({ data: Buffer.from("b01-map") }))).toMatchObject({
			kind: "b01-payload",
		});
		expect(blobEvent).toHaveBeenCalledWith({ blob: Buffer.from("b01-map").toString("base64") });

		const map = Buffer.from("rpc-map");
		const compressed = zlib.gzipSync(map);
		const packet = Buffer.alloc(24 + compressed.length);
		packet.write(endpoint, 0, "ascii");
		packet[15] = 0;
		packet.writeInt32LE(20, 16);
		compressed.copy(packet, 24);
		expect(ingress.acceptBlobSegment(blobSegment({
			pv: "1.0",
			nonce: 2,
			data: packet,
		}))).toMatchObject({ kind: "rpc-response", messageId: 20, protocolVersion: 0 });
		expect(rpcCallback).toHaveBeenCalledWith(true, map.toString("base64"));
		expect(blobEvent).toHaveBeenCalledTimes(1);
		broker.close();
	});
});
