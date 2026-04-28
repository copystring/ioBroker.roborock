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
