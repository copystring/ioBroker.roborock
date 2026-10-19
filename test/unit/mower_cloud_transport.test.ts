import { afterEach, describe, expect, it, vi } from "vitest";
import { messageParser } from "../../src/lib/messageParser";
import { createMowerCloudTransport, type MowerCloudDependencies } from "../../src/lib/mower/mowerCloudTransport";
import { buildMowerButton } from "../../src/lib/mower/mowerContract";

function dependencies(): MowerCloudDependencies {
	return {
		getModel: () => "roborock.mower.a266", getCategory: () => "roborock.mower",
		getProtocol: async () => "L01", isConnected: () => true,
		isDeviceOnline: () => true,
		buildFrame: async () => Buffer.from("frame"), publishFrame: async () => {},
	};
}

afterEach(() => vi.useRealTimers());

describe("manufacturer mower MQTT frame contract", () => {
	it.each(["REMOTE_CMD", "GET_FULL_MAP"])("rejects native-only %s requests before cloud encoding", async type => {
		const buildFrame = vi.fn(async () => Buffer.from("frame"));
		const publishFrame = vi.fn(async () => {});
		const transport = createMowerCloudTransport({ ...dependencies(), buildFrame, publishFrame });
		await expect(transport.request("s108", { id: "100", type })).rejects.toThrow("native BLE or blob transport");
		expect(buildFrame).not.toHaveBeenCalled();
		expect(publishFrame).not.toHaveBeenCalled();
		transport.stop();
	});
	it("uses the existing 1.0 codec for an L01 mower without a TCP handshake or endpoint", async () => {
		const parser = new messageParser({
			http_api: { getMatchedLocalKeys: () => new Map([["s108", "0011223344556677"]]) },
			local_api: { localDevices: {} }, rLog: vi.fn(),
		} as never);
		let sent: Buffer | undefined;
		const transport = createMowerCloudTransport({ ...dependencies(),
			buildFrame: parser.buildRoborockMessage.bind(parser),
			publishFrame: async (_duid, frame) => { sent = frame; },
		});
		const params = buildMowerButton("pause", 1700000000000);
		const pending = transport.request("s108", params);
		await vi.waitFor(() => expect(sent).toBeDefined());
		const [decoded] = parser.decodeMsg(sent!, "s108");
		expect(decoded.version).toBe("1.0");
		expect(decoded.protocol).toBe(101);
		const payload = JSON.parse(decoded.payload.toString("utf8"));
		expect(Object.keys(payload.dps)).toEqual(["101"]);
		expect(JSON.parse(payload.dps["101"])).toEqual({ id: 1, method: "remote_pb", params });
		expect(payload.t).toBe(decoded.timestamp);
		transport.acceptDps("s108", { "102": { id: 1, result: "ok" } });
		await pending;
	});

	it.each([
		{ getModel: () => "roborock.vacuum.a288" },
		{ getModel: () => "roborock.mower.unknown" },
		{ getCategory: () => "robot.vacuum.cleaner" },
		{ getProtocol: async () => "B01" },
		{ getProtocol: async () => null },
		{ isConnected: () => false },
		{ isDeviceOnline: () => false },
	])("rejects unsupported identity/protocol or a disconnected broker before encoding", async overrides => {
		const buildFrame = vi.fn(async () => Buffer.from("frame"));
		const publishFrame = vi.fn(async () => {});
		const transport = createMowerCloudTransport({ ...dependencies(), buildFrame, publishFrame, ...overrides });
		await expect(transport.request("s108", {})).rejects.toThrow();
		expect(buildFrame).not.toHaveBeenCalled();
		expect(publishFrame).not.toHaveBeenCalled();
	});

	it("rejects encoding failure without silently succeeding", async () => {
		const publishFrame = vi.fn(async () => {});
		const transport = createMowerCloudTransport({ ...dependencies(), buildFrame: async () => false, publishFrame });
		await expect(transport.request("s108", {})).rejects.toThrow("encoded");
		expect(publishFrame).not.toHaveBeenCalled();
	});

	it("rejects a device protocol reclassification while encoding", async () => {
		let pv = "L01";
		const publishFrame = vi.fn(async () => {});
		const transport = createMowerCloudTransport({ ...dependencies(), publishFrame,
			getProtocol: async () => pv,
			buildFrame: async () => { pv = "B01"; return Buffer.from("frame"); },
		});
		await expect(transport.request("s108", {})).rejects.toThrow("protocol changed");
		expect(publishFrame).not.toHaveBeenCalled();
	});

	it.each(["identity", "connection", "online"])("rechecks %s after asynchronous encoding", async change => {
		let valid = true;
		const publishFrame = vi.fn(async () => {});
		const transport = createMowerCloudTransport({ ...dependencies(), publishFrame,
			getModel: () => valid || change !== "identity" ? "roborock.mower.a266" : "roborock.vacuum.a288",
			isConnected: () => valid || change !== "connection",
			isDeviceOnline: () => valid || change !== "online",
			buildFrame: async () => { valid = false; return Buffer.from("frame"); },
		});
		await expect(transport.request("s108", {})).rejects.toThrow("changed");
		expect(publishFrame).not.toHaveBeenCalled();
	});

	it.each(["stop", "timeout"])("does not publish if %s occurs while encoding is still pending", async reason => {
		vi.useFakeTimers();
		let finishEncoding: (frame: Buffer) => void;
		const publishFrame = vi.fn(async () => {});
		const transport = createMowerCloudTransport({ ...dependencies(), publishFrame,
			buildFrame: () => new Promise(resolve => { finishEncoding = resolve; }),
		});
		const pending = transport.request("s108", {});
		const rejected = expect(pending).rejects.toThrow(reason === "stop" ? "stopped" : "timed out");
		await Promise.resolve();
		if (reason === "stop") transport.stop();
		else await vi.advanceTimersByTimeAsync(10_000);
		await rejected;
		finishEncoding!(Buffer.from("frame"));
		await vi.advanceTimersByTimeAsync(0);
		expect(publishFrame).not.toHaveBeenCalled();
	});
});
