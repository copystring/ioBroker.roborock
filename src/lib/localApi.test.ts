import { describe, expect, it } from "vitest";
import { local_api } from "./localApi";
import { messageParser } from "./messageParser";
import { MockAdapter } from "./mock/MockAdapter";

describe("local_api transport sequence", () => {
	it("uses one L01 transport sequence for hello and app frames", async () => {
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
		expect(sentMessages[0].readUInt32BE(4 + 3)).to.equal(1);
		expect(appFrame).to.be.instanceOf(Buffer);
		expect((appFrame as Buffer).readUInt32BE(3)).to.equal(2);
	});
});
