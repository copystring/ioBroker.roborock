import { describe, expect, it } from "vitest";
import { local_api } from "./localApi";
import { messageParser } from "./messageParser";
import { MockAdapter } from "./mock/MockAdapter";

describe("local_api transport sequence", () => {
	it("sends app-style TCP connect without consuming the app-frame sequence", async () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const parser = new messageParser(adapter);
		const sentMessages: Buffer[] = [];

		adapter.http_api = { getMatchedLocalKeys: () => new Map([[duid, "0011223344556677"]]) };
		adapter.local_api = api;
		adapter.requestsHandler = { messageParser: parser };
		api.sendMessage = (_duid: string, message: Buffer) => {
			sentMessages.push(message);
		};
		api.localDevices[duid] = {
			ip: "127.0.0.1",
			version: "L01",
			connectNonce: 123456,
			ackNonce: 654321,
		};

		parser.resetTransportSequence(duid);

		await api.sendHello(duid, 123456, "L01");
		const appFrame = await parser.buildRoborockMessage(
			duid,
			4,
			Math.floor(Date.now() / 1000),
			JSON.stringify({ dps: { 101: JSON.stringify({ id: 301, method: "get_status", params: [] }) }, t: 1 }),
			"L01"
		);

		expect(sentMessages).to.have.length(1);
		expect(sentMessages[0].readUInt32BE(0)).to.equal(21);
		expect(sentMessages[0].readUInt32BE(4 + 3)).to.equal(0);
		expect(sentMessages[0].readUInt32BE(4 + 17)).to.equal(10);
		expect(appFrame).to.be.instanceOf(Buffer);
		expect((appFrame as Buffer).readUInt32BE(3)).to.equal(1);
	});

	it("sends app-style TCP ping and puback control frames", () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const sentMessages: Buffer[] = [];

		api.sendMessage = (_duid: string, message: Buffer) => {
			sentMessages.push(message);
		};
		api.localDevices[duid] = {
			ip: "127.0.0.1",
			version: "1.0",
			ackNonce: 654321,
		};
		api.deviceSockets[duid] = {
			connected: true,
			pingOutstanding: 0,
		} as any;

		api.sendPing(duid);
		(api as any).sendPubAck(duid, 42, "1.0");

		expect(sentMessages).to.have.length(2);
		expect(sentMessages[0].readUInt32BE(0)).to.equal(17);
		expect(sentMessages[0].subarray(4, 7).toString()).to.equal("1.0");
		expect(sentMessages[0].readUInt32BE(4 + 3)).to.equal(0);
		expect(sentMessages[0].readUInt32BE(4 + 7)).to.equal(0);
		expect(sentMessages[0].readUInt32BE(4 + 11)).to.equal(0);
		expect(sentMessages[0].readUInt16BE(4 + 15)).to.equal(2);
		expect(sentMessages[1].readUInt32BE(0)).to.equal(17);
		expect(sentMessages[1].subarray(4, 7).toString()).to.equal("1.0");
		expect(sentMessages[1].readUInt32BE(4 + 3)).to.equal(42);
		expect(sentMessages[1].readUInt32BE(4 + 7)).to.equal(0);
		expect(sentMessages[1].readUInt32BE(4 + 11)).to.equal(0);
		expect(sentMessages[1].readUInt16BE(4 + 15)).to.equal(5);
		expect((api.deviceSockets[duid] as any).pingOutstanding).to.equal(1);
	});

	it("sends app-style TCP ping only after inbound or outbound activity is idle", () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const sentMessages: Buffer[] = [];
		const now = Date.now();

		api.sendMessage = (_duid: string, message: Buffer) => {
			sentMessages.push(message);
		};
		api.localDevices[duid] = {
			ip: "127.0.0.1",
			version: "1.0",
			ackNonce: 654321,
		};
		api.deviceSockets[duid] = {
			connected: true,
			lastReceivedAt: now,
			lastSentAt: now,
			pingOutstanding: 0,
		} as any;

		(api as any).checkTcpActivity(duid);
		expect(sentMessages).to.have.length(0);

		(api.deviceSockets[duid] as any).lastReceivedAt = now - 9_000;
		(api.deviceSockets[duid] as any).lastSentAt = now;
		(api as any).checkTcpActivity(duid);
		expect(sentMessages).to.have.length(1);
		expect(sentMessages[0].readUInt16BE(4 + 15)).to.equal(2);
	});

	it("times out an outstanding ping when inbound activity stays idle", () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		let reconnects = 0;
		const sentMessages: Buffer[] = [];
		const now = Date.now();

		api.sendMessage = (_duid: string, message: Buffer) => {
			sentMessages.push(message);
		};
		api.scheduleReconnect = () => {
			reconnects += 1;
		};
		api.localDevices[duid] = {
			ip: "127.0.0.1",
			version: "1.0",
			ackNonce: 654321,
		};
		api.deviceSockets[duid] = {
			connected: true,
			lastReceivedAt: now - 8_000,
			lastSentAt: now - 1_000,
			lastPingAt: now - 1_000,
			pingOutstanding: 1,
		} as any;

		(api as any).checkTcpActivity(duid);
		expect(reconnects).to.equal(0);
		expect(sentMessages).to.have.length(0);

		(api.deviceSockets[duid] as any).lastReceivedAt = now - 9_000;
		(api as any).checkTcpActivity(duid);
		expect(reconnects).to.equal(1);
		expect(sentMessages).to.have.length(0);
	});

	it("resolves local protocol 4 responses from dps 102, dps 101, or direct payloads", () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const resolved: Array<{ id: number; result: unknown; protocol: unknown; connectionType: string }> = [];

		adapter.requestsHandler = {
			resolvePendingRequest: (id: number, result: unknown, protocol: unknown, _duid: string, connectionType: string) => {
				resolved.push({ id, result, protocol, connectionType });
			},
		};

		(api as any).resolveLocalProtocol4Payload(duid, "1.0", 4, { dps: { "102": { id: 301, result: ["ok"] } } });
		(api as any).resolveLocalProtocol4Payload(duid, "1.0", 4, { dps: { "101": JSON.stringify({ id: 302, result: ["done"] }) } });
		(api as any).resolveLocalProtocol4Payload(duid, "1.0", 4, { id: 303, error: { code: -1 } });

		expect(resolved).to.deep.equal([
			{ id: 301, result: ["ok"], protocol: "4", connectionType: "TCP" },
			{ id: 302, result: ["done"], protocol: "4", connectionType: "TCP" },
			{ id: 303, result: { code: -1 }, protocol: "4", connectionType: "TCP" },
		]);
	});

	it("does not treat trailing partial TCP frame bytes as complete", () => {
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const frame = Buffer.alloc(4 + 17);

		frame.writeUInt32BE(17, 0);
		frame.write("1.0", 4);
		frame.writeUInt16BE(3, 4 + 15);

		expect(api.checkComplete(frame)).to.equal(true);
		expect(api.checkComplete(frame.subarray(0, frame.length - 1))).to.equal(false);
		expect(api.checkComplete(Buffer.concat([frame, Buffer.from([0x00, 0x00])]))).to.equal(false);
		expect(api.checkComplete(Buffer.from([0x00, 0x00, 0x11]))).to.equal(false);
	});
});
