import { describe, expect, it } from "vitest";
import { local_api } from "./localApi";
import { messageParser } from "./messageParser";
import { MockAdapter } from "./mock/MockAdapter";
import { RoborockRequest, requestsHandler } from "./requestsHandler";

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
			return true;
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
			return true;
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
			return true;
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

	it("keeps an outstanding ping open until the ping response deadline", () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		let reconnects = 0;
		const sentMessages: Buffer[] = [];
		const now = Date.now();

		api.sendMessage = (_duid: string, message: Buffer) => {
			sentMessages.push(message);
			return true;
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
			lastReceivedAt: now - 20_000,
			lastSentAt: now - 1_000,
			lastPingAt: now - 1_000,
			pingOutstanding: 1,
		} as any;

		(api as any).checkTcpActivity(duid);
		expect(reconnects).to.equal(0);
		expect(sentMessages).to.have.length(0);

		(api.deviceSockets[duid] as any).lastPingAt = now - 11_000;
		(api as any).checkTcpActivity(duid);
		expect(reconnects).to.equal(1);
		expect(sentMessages).to.have.length(0);
	});

	it("does not send another TCP ping while a previous ping is outstanding", () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		let reconnects = 0;
		const sentMessages: Buffer[] = [];
		const now = Date.now();

		api.sendMessage = (_duid: string, message: Buffer) => {
			sentMessages.push(message);
			return true;
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
			lastReceivedAt: now - 20_000,
			lastSentAt: now - 20_000,
			lastPingAt: now - 5_000,
			pingOutstanding: 1,
		} as any;

		(api as any).checkTcpActivity(duid);

		expect(reconnects).to.equal(0);
		expect(sentMessages).to.have.length(0);
	});

	it("rejects only pending TCP requests for the reset device", async () => {
		const adapter = new MockAdapter() as any;
		adapter.setInterval = () => undefined;
		const handler = new requestsHandler(adapter);
		const api = new local_api(adapter);
		const tcpReq = new RoborockRequest(handler, "duid-a", "get_prop", ["get_status"], {} as any, "TestQueue", "1.0");
		const mqttReq = new RoborockRequest(handler, "duid-a", "get_prop", ["get_status"], {} as any, "TestQueue", "1.0");
		const otherTcpReq = new RoborockRequest(handler, "duid-b", "get_prop", ["get_status"], {} as any, "TestQueue", "1.0");

		adapter.requestsHandler = handler;
		adapter.local_api = api;
		adapter.logLevel = "error";
		adapter.setTimeout = () => undefined;

		tcpReq.messageID = 1;
		tcpReq.sentConnectionType = "TCP";
		mqttReq.messageID = 2;
		mqttReq.sentConnectionType = "MQTT";
		otherTcpReq.messageID = 3;
		otherTcpReq.sentConnectionType = "TCP";

		adapter.pendingRequests.set(1, tcpReq);
		adapter.pendingRequests.set(2, mqttReq);
		adapter.pendingRequests.set(3, otherTcpReq);

		api.scheduleReconnect("duid-a", "connection error: read ECONNRESET", true);

		await expect(tcpReq.promise).rejects.toThrow(/TCP network session reset/);
		expect(adapter.pendingRequests.has(1)).to.equal(false);
		expect(adapter.pendingRequests.has(2)).to.equal(true);
		expect(adapter.pendingRequests.has(3)).to.equal(true);
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

	it("merges discovered endpoint changes without dropping other local devices", () => {
		const duid = "duid-a";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const attempts: Array<{ duid: string; suppressLog: boolean; timeoutMs: number | undefined }> = [];
		let destroyed = false;

		adapter.requestsHandler = {
			rejectPendingTcpRequests: () => 0,
		};
		api.initiateClient = async (attemptDuid: string, suppressLog?: boolean, timeoutMs?: number) => {
			attempts.push({ duid: attemptDuid, suppressLog: !!suppressLog, timeoutMs });
		};
		api.localDevices[duid] = {
			ip: "10.1.1.81",
			version: "1.0",
			connectNonce: 1,
			ackNonce: 2,
			staleSince: 100,
		};
		api.localDevices["duid-b"] = {
			ip: "10.1.1.82",
			version: "1.0",
		};
		api.deviceSockets[duid] = {
			connected: true,
			destroyed: false,
			removeAllListeners: () => {},
			destroy: () => {
				destroyed = true;
			},
		} as any;

		const changed = api.updateLocalEndpoint(duid, "10.1.1.89", "1.0", "udp");

		expect(changed).to.equal(true);
		expect(api.localDevices[duid].ip).to.equal("10.1.1.89");
		expect(api.localDevices[duid].connectNonce).to.equal(undefined);
		expect(api.localDevices[duid].ackNonce).to.equal(undefined);
		expect(api.localDevices[duid].staleSince).to.equal(undefined);
		expect(api.localDevices["duid-b"].ip).to.equal("10.1.1.82");
		expect(api.deviceSockets[duid]).to.equal(undefined);
		expect(destroyed).to.equal(true);
		expect(attempts).to.deep.equal([{ duid, suppressLog: true, timeoutMs: 5000 }]);
	});

	it("marks unreachable TCP endpoints stale and triggers endpoint refresh instead of reconnect looping", async () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		let scheduledReconnects = 0;
		let refreshes = 0;

		adapter.requestsHandler = {
			rejectPendingTcpRequests: () => 0,
		};
		api.localDevices[duid] = {
			ip: "10.1.1.81",
			version: "1.0",
		};
		(api as any)._performConnection = async () => {
			const err: any = new Error("connect EHOSTUNREACH 10.1.1.81:58867");
			err.code = "EHOSTUNREACH";
			throw err;
		};
		api.scheduleReconnect = () => {
			scheduledReconnects += 1;
		};
		api.refreshEndpoint = async () => {
			refreshes += 1;
			return false;
		};

		await api.initiateClient(duid);

		expect(scheduledReconnects).to.equal(0);
		expect(refreshes).to.equal(1);
		expect(api.localDevices[duid].staleSince).to.be.a("number");
	});

	it("clears stale endpoint state after a confirmed local TCP connection", async () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);

		api.cloudDevices.add(duid);
		api.localDevices[duid] = {
			ip: "10.1.1.81",
			version: "B01",
			staleSince: 100,
		};
		api.deviceSockets[duid] = {
			connected: true,
		} as any;

		await api.initiateClient(duid);

		expect(api.localDevices[duid].staleSince).to.equal(undefined);
		expect(api.localDevices[duid].lastSeenAt).to.be.a("number");
		expect(api.cloudDevices.has(duid)).to.equal(false);
	});

	it("refreshes stale endpoints from MQTT network info and reconnects to the new IP", async () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const requests: Array<{ method: string; params: unknown }> = [];
		const attempts: string[] = [];

		adapter.mqtt_api = { isConnected: () => true };
		adapter.requestsHandler = {
			sendRequest: async (_duid: string, method: string, params: unknown) => {
				requests.push({ method, params });
				return [{ ip: "10.1.1.89" }];
			},
			rejectPendingTcpRequests: () => 0,
		};
		adapter.getDeviceProtocolVersion = async () => "1.0";
		api.initiateClient = async (attemptDuid: string) => {
			attempts.push(attemptDuid);
		};
		api.localDevices[duid] = {
			ip: "10.1.1.81",
			version: "1.0",
			staleSince: 100,
		};

		await expect(api.refreshEndpoint(duid, "test", true)).resolves.to.equal(true);

		expect(requests).to.deep.equal([{ method: "get_network_info", params: [] }]);
		expect(api.localDevices[duid].ip).to.equal("10.1.1.89");
		expect(api.localDevices[duid].staleSince).to.equal(undefined);
		expect(attempts).to.deep.equal([duid]);
	});

	it("uses B01 network info method and accepts ipAdress spelling during endpoint refresh", async () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const requests: Array<{ method: string; params: unknown }> = [];

		adapter.mqtt_api = { isConnected: () => true };
		adapter.requestsHandler = {
			sendRequest: async (_duid: string, method: string, params: unknown) => {
				requests.push({ method, params });
				return { ipAdress: "10.1.1.90" };
			},
			rejectPendingTcpRequests: () => 0,
		};
		adapter.getDeviceProtocolVersion = async () => "B01";
		api.initiateClient = async () => {};
		api.localDevices[duid] = {
			ip: "10.1.1.81",
			version: "B01",
			staleSince: 100,
		};

		await expect(api.refreshEndpoint(duid, "test", true)).resolves.to.equal(true);

		expect(requests).to.deep.equal([{ method: "service.get_net_info", params: {} }]);
		expect(api.localDevices[duid].ip).to.equal("10.1.1.90");
	});

	it("promotes a B01 endpoint during pre-init probing with the B01 network info method", async () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const requests: Array<{ method: string; params: unknown; timeout: number | undefined }> = [];
		const promotions: Array<{ ip: string; timeoutMs: number | undefined; suppressLog: boolean | undefined }> = [];

		adapter.mqtt_api = { isConnected: () => true };
		adapter.requestsHandler = {
			sendRequest: async (_duid: string, method: string, params: unknown, options: { timeout?: number }) => {
				requests.push({ method, params, timeout: options.timeout });
				return { ip: "10.1.1.90" };
			},
			rejectPendingTcpRequests: () => 0,
		};
		adapter.getDeviceProtocolVersion = async () => "B01";
		api.checkAndPromoteLocalConnection = async (_duid: string, ip: string, timeoutMs?: number, suppressLog?: boolean) => {
			promotions.push({ ip, timeoutMs, suppressLog });
			return true;
		};

		await expect(api.probeLocalEndpointFromNetworkInfo(duid, "test", 1500, true, 3000)).resolves.to.equal(true);

		expect(requests).to.deep.equal([{ method: "service.get_net_info", params: {}, timeout: 3000 }]);
		expect(promotions).to.deep.equal([{ ip: "10.1.1.90", timeoutMs: 1500, suppressLog: true }]);
	});

	it("does not throttle the next endpoint refresh after MQTT was temporarily unavailable", async () => {
		const duid = "duid";
		const adapter = new MockAdapter() as any;
		const api = new local_api(adapter);
		const requests: string[] = [];
		let mqttConnected = false;

		adapter.mqtt_api = { isConnected: () => mqttConnected };
		adapter.requestsHandler = {
			sendRequest: async (_duid: string, method: string) => {
				requests.push(method);
				return [{ ip: "10.1.1.91" }];
			},
			rejectPendingTcpRequests: () => 0,
		};
		adapter.getDeviceProtocolVersion = async () => "1.0";
		api.initiateClient = async () => {};
		api.localDevices[duid] = {
			ip: "10.1.1.81",
			version: "1.0",
			staleSince: 100,
		};

		await expect(api.refreshEndpoint(duid, "mqtt down", false)).resolves.to.equal(false);
		mqttConnected = true;
		await expect(api.refreshEndpoint(duid, "mqtt back", false)).resolves.to.equal(true);

		expect(requests).to.deep.equal(["get_network_info"]);
		expect(api.localDevices[duid].ip).to.equal("10.1.1.91");
	});
});
