import { afterEach, describe, expect, it, vi } from "vitest";
import { MowerRpcTransport, type MowerRpcEnvelope } from "../../src/lib/mower/MowerRpcTransport";

afterEach(() => vi.useRealTimers());

describe("mower cloud RPC correlation", () => {
	it("cancels an offline device independently and allows new requests after a connection reset", async () => {
		vi.useFakeTimers();
		const transport = new MowerRpcTransport({ publish: async () => {} });
		const first = transport.request("a", {});
		const second = transport.request("b", {});
		const firstRejected = expect(first).rejects.toThrow("offline");
		transport.cancelPending("offline", "a");
		await firstRejected;
		expect(transport.acceptDps("a", { "102": { id: 1 } })).toBe(false);
		const secondRejected = expect(second).rejects.toThrow("reset");
		transport.cancelPending("reset");
		await secondRejected;
		expect(vi.getTimerCount()).toBe(0);
		const afterReconnect = transport.request("a", {});
		transport.acceptDps("a", { "102": { id: 3 } });
		await expect(afterReconnect).resolves.toEqual({ id: 3 });
		expect(vi.getTimerCount()).toBe(0);
	});

	it("matches device and RPC id, independently of the protobuf id", async () => {
		const publish = vi.fn(async () => {});
		const transport = new MowerRpcTransport({ publish });
		const params = { id: "1700000000000", type: "GET_ROBOT_INFO" };
		const response = transport.request("mower-a", params);
		const id = publish.mock.calls[0][1].id;
		expect(publish).toHaveBeenCalledWith("mower-a", { id, method: "remote_pb", params }, expect.any(AbortSignal));
		expect(transport.acceptDps("mower-b", { "102": { id, result: "ok" } })).toBe(false);
		expect(transport.acceptDps("mower-a", { "102": { id: 1700000000000, result: "ok" } })).toBe(false);
		expect(transport.acceptDps("mower-a", { "102": { id, result: "ok" } })).toBe(true);
		await expect(response).resolves.toEqual({ id, result: "ok" });
		expect(transport.acceptDps("mower-a", { "102": { id, result: "ok" } })).toBe(false);
	});

	it("registers before sending and returns the complete ACK object", async () => {
		let transport: MowerRpcTransport;
		transport = new MowerRpcTransport({ publish: async (duid, rpc) => {
			transport.acceptDps(duid, { "102": JSON.stringify({ id: rpc.id, result: { accepted: true }, extra: 7 }) });
		} });
		await expect(transport.request("mower", {})).resolves.toEqual({ id: 1, result: { accepted: true }, extra: 7 });
	});

	it("allows out of order ACKs without confusing status events with RPC responses", async () => {
		const frames: MowerRpcEnvelope[] = [];
		const transport = new MowerRpcTransport({ publish: async (_duid, rpc) => { frames.push(rpc); } });
		const first = transport.request("mower", {});
		const second = transport.request("mower", {});
		expect(transport.acceptDps("mower", { "104": { id: frames[0].id, result: "status" } })).toBe(false);
		transport.acceptDps("mower", { "102": { id: frames[1].id, result: "second" } });
		transport.acceptDps("mower", { "102": { id: frames[0].id, result: "first" } });
		await expect(second).resolves.toMatchObject({ result: "second" });
		await expect(first).resolves.toMatchObject({ result: "first" });
	});

	it("accepts a matching id-only DP 102 ACK as the APK does", async () => {
		const transport = new MowerRpcTransport({ publish: async () => {} });
		const pending = transport.request("mower", {});
		transport.acceptDps("mower", { "102": { id: 1 } });
		await expect(pending).resolves.toEqual({ id: 1 });
	});

	it("rejects an error ACK without reporting it as command success", async () => {
		const transport = new MowerRpcTransport({ publish: async () => {} });
		const request = transport.request("mower", {});
		const rejected = expect(request).rejects.toThrow("returned an error");
		transport.acceptDps("mower", { "102": { id: 1, error: { code: -1, message: "failure" } } });
		await rejected;
	});

	it("times out once, never retries a potentially executed control, and ignores late ACKs", async () => {
		vi.useFakeTimers();
		const publish = vi.fn(async () => {});
		const transport = new MowerRpcTransport({ publish }, 100);
		const request = transport.request("mower", {});
		const rejected = expect(request).rejects.toThrow("timed out");
		await vi.advanceTimersByTimeAsync(100);
		await rejected;
		expect(publish).toHaveBeenCalledOnce();
		expect(transport.acceptDps("mower", { "102": { id: 1, result: "ok" } })).toBe(false);
	});

	it("cleans up after publication failure, including a synchronous exception", async () => {
		vi.useFakeTimers();
		const failed = new MowerRpcTransport({ publish: async () => { throw new Error("offline"); } });
		await expect(failed.request("mower", {})).rejects.toThrow("offline");
		const thrown = new MowerRpcTransport({ publish: () => { throw new Error("stopped"); } });
		await expect(thrown.request("mower", {})).rejects.toThrow("stopped");
		expect(vi.getTimerCount()).toBe(0);
	});

	it("cancels every pending device on stop and blocks further publication", async () => {
		vi.useFakeTimers();
		const publish = vi.fn(async () => {});
		const transport = new MowerRpcTransport({ publish });
		const first = transport.request("a", {});
		const second = transport.request("b", {});
		const rejectedFirst = expect(first).rejects.toThrow("stopped");
		const rejectedSecond = expect(second).rejects.toThrow("stopped");
		transport.stop();
		await Promise.all([rejectedFirst, rejectedSecond]);
		await expect(transport.request("a", {})).rejects.toThrow("stopped");
		expect(publish).toHaveBeenCalledTimes(2);
		expect(vi.getTimerCount()).toBe(0);
	});

	it.each([null, [], "bad JSON", { id: "1", result: "ok" }, { id: 1.2, result: "ok" }, { id: 0, result: "ok" }])("ignores invalid DP 102 values: %j", (ack) => {
		const transport = new MowerRpcTransport({ publish: async () => {} });
		expect(transport.acceptDps("mower", { "102": ack })).toBe(false);
	});
});
