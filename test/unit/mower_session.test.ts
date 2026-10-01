import { describe, expect, it, vi } from "vitest";
import { MowerSession } from "../../src/lib/mower/MowerSession";
import { MowerRpcTransport, type MowerRpcEnvelope } from "../../src/lib/mower/MowerRpcTransport";

describe("mower session command / ACK / semantic status lifecycle", () => {
	it("runs the source command through RPC without creating an optimistic device state", async () => {
		const sent: Array<{ duid: string; rpc: MowerRpcEnvelope }> = [];
		const rpc = new MowerRpcTransport({ publish: async (duid, envelope) => { sent.push({ duid, rpc: envelope }); } });
		const session = new MowerSession("s108", "roborock.mower.a266", "roborock.mower", rpc, () => 1700000000000);
		const command = session.command("start");
		expect(sent).toEqual([{ duid: "s108", rpc: { id: 1, method: "remote_pb", params: { id: "1700000000000", type: "APP_BUTTON", app_button: "MOW_GLOBAL" } } }]);
		expect(session.getStatus()).toBeUndefined();
		rpc.acceptDps("s108", { "102": { id: 1, result: "ok" } });
		await expect(command).resolves.toEqual({ id: 1, result: "ok" });
		expect(session.getStatus()).toBeUndefined();
		expect(session.acceptRobotMessage({ id: "1700000000001", type: "ROBOT_STATUS_UPDATE", hardware: { battery: { percent: 85 } } })).toBe(true);
		expect(session.getStatus()).toEqual({ messageId: "1700000000001", battery: 85 });
		const statusRequest = session.requestStatus();
		expect(sent[1].rpc.params).toEqual({ id: "1700000000001", type: "GET_ROBOT_INFO" });
		rpc.acceptDps("s108", { "102": { id: 2, result: "ok" } });
		await statusRequest;
		expect(session.getStatus()?.battery).toBe(85);
	});

	it("uses distinct protobuf ids for rapid commands and a backwards clock", async () => {
		const request = vi.fn(async () => ({ id: 1, result: "ok" }));
		const now = vi.fn().mockReturnValueOnce(100).mockReturnValueOnce(100).mockReturnValueOnce(99);
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request }, now);
		await session.command("pause");
		await session.command("resume");
		await session.command("stop");
		expect(request.mock.calls.map(call => call[1].id)).toEqual(["100", "101", "102"]);
	});

	it("rejects unknown models and invalid clocks before sending", () => {
		const request = vi.fn(async () => ({ id: 1 }));
		expect(() => new MowerSession("unknown", "roborock.mower.unknown", "roborock.mower", { request })).toThrow("Unsupported");
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request }, () => NaN);
		expect(() => session.requestStatus()).toThrow("clock");
		expect(request).not.toHaveBeenCalled();
	});

	it("rejects commands and ignores incoming status after closing a session", async () => {
		const request = vi.fn(async () => ({ id: 1 }));
		const session = new MowerSession("s108", "roborock.mower.a266", null, { request });
		session.close();
		expect(() => session.command("charge")).toThrow("closed");
		expect(session.acceptRobotMessage({ id: 1, type: 38 })).toBe(false);
		expect(request).not.toHaveBeenCalled();
	});

	it("cancels a pending request when its session closes and ignores its late ACK", async () => {
		const rpc = new MowerRpcTransport({ publish: async () => {} });
		const session = new MowerSession("s108", "roborock.mower.a266", null, rpc);
		const pending = session.command("start");
		const rejected = expect(pending).rejects.toThrow("cancelled");
		session.close();
		await rejected;
		expect(rpc.acceptDps("s108", { "102": { id: 1, result: "ok" } })).toBe(false);
	});
});
