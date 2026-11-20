import { EventEmitter } from "node:events";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as mqtt from "mqtt";
import type { Roborock } from "../main";
import { mqtt_api } from "./mqttApi";

vi.mock("mqtt", () => ({ connect: vi.fn() }));

class TestClient extends EventEmitter {
	connected = false;
	subscribe = vi.fn<(_topic: string, acknowledge: (error: Error | null) => void) => void>();
	publish = vi.fn<(_topic: string, _message: Buffer, _options: { qos: number }, acknowledge: (error?: Error | null) => void) => void>();
	end = vi.fn();
	stream = { destroy: vi.fn() };
}

function start() {
	const client = new TestClient();
	vi.mocked(mqtt.connect).mockReturnValue(client);
	const changed = vi.fn();
	const adapter = {
		http_api: { get_rriot: () => ({ u: "test", s: "test", k: "test", r: { m: "mqtt://example.invalid" } }) },
		onMqttConnectionChange: changed, rLog: vi.fn(),
		setTimeout, clearTimeout, setInterval: vi.fn(), clearInterval: vi.fn(),
	};
	const api = new mqtt_api(adapter as unknown as Roborock);
	return { api, client, changed, ready: api.init() };
}

async function connect() {
	const started = start();
	started.client.emit("connect");
	started.client.subscribe.mock.calls[0][1](null);
	await started.ready;
	return started;
}

describe("MQTT publish acknowledgement", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.clearAllMocks();
	});
	afterEach(() => vi.useRealTimers());

	it.each(["missing client", "offline"])("rejects a publish with %s instead of silently succeeding", async (state) => {
		const { api, client } = await connect();
		if (state === "missing client") api.client = null;
		else client.emit("offline");

		await expect(api.sendMessage("robot", Buffer.from("command"))).rejects.toMatchObject({ code: "ECONNRESET" });
		expect(client.publish).not.toHaveBeenCalled();
		expect(vi.getTimerCount()).toBe(0);
		api.cleanup();
	});

	it("waits only for the QoS 1 publish callback and ignores duplicate callbacks", async () => {
		const { api, client } = await connect();
		const message = Buffer.from("command");
		let settled = false;
		const result = api.sendMessage("robot", message).then(() => {
			settled = true;
		});
		await Promise.resolve();
		expect(settled).toBe(false);
		expect(client.publish).toHaveBeenCalledWith("rr/m/i/test/" + api.mqttUser + "/robot", message, { qos: 1 }, expect.any(Function));
		client.publish.mock.calls[0][3](null);
		await result;
		expect(settled).toBe(true);
		expect(vi.getTimerCount()).toBe(0);
		client.publish.mock.calls[0][3](new Error("late failure"));
		expect(vi.getTimerCount()).toBe(0);
		api.cleanup();
	});

	it("preserves a broker publish error and clears the publish timeout", async () => {
		const { api, client } = await connect();
		const error = Object.assign(new Error("Publish rejected"), { code: 135 });
		const result = api.sendMessage("robot", Buffer.from("command"));
		const rejected = expect(result).rejects.toBe(error);
		client.publish.mock.calls[0][3](error);
		await rejected;
		client.publish.mock.calls[0][3](null);
		expect(vi.getTimerCount()).toBe(0);
		api.cleanup();
	});

	it("bounds a missing publish callback to 10000ms and ignores a late acknowledgement", async () => {
		const { api, client } = await connect();
		let settled = false;
		const result = api.sendMessage("robot", Buffer.from("command"));
		void result.catch(() => {
			settled = true;
		});
		const rejected = expect(result).rejects.toMatchObject({ code: "ETIMEDOUT" });
		await vi.advanceTimersByTimeAsync(9999);
		expect(settled).toBe(false);
		await vi.advanceTimersByTimeAsync(1);
		await rejected;
		client.publish.mock.calls[0][3](null);
		expect(vi.getTimerCount()).toBe(0);
		api.cleanup();
	});

	it("preserves a synchronous publish exception and clears the publish timeout", async () => {
		const { api, client } = await connect();
		const error = new Error("Publish threw");
		client.publish.mockImplementation(() => {
			throw error;
		});
		await expect(api.sendMessage("robot", Buffer.from("command"))).rejects.toBe(error);
		expect(vi.getTimerCount()).toBe(0);
		api.cleanup();
	});

	it("rejects outstanding publishes on cleanup without waiting for PUBACK", async () => {
		const { api } = await connect();
		const pending = expect(api.sendMessage("robot", Buffer.from("command"))).rejects.toThrow("stopped");
		api.cleanup();
		await vi.advanceTimersByTimeAsync(0);
		expect(vi.getTimerCount()).toBe(0);
		await pending;
	});

	it("clears the timeout when the publish callback runs synchronously", async () => {
		const { api, client } = await connect();
		client.publish.mockImplementation((_topic, _message, _options, acknowledge) => acknowledge());
		await expect(api.sendMessage("robot", Buffer.from("command"))).resolves.toBeUndefined();
		expect(vi.getTimerCount()).toBe(0);
		api.cleanup();
	});
});

describe("MQTT connection lifecycle", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.clearAllMocks();
	});
	afterEach(() => vi.useRealTimers());

	it("waits for SUBACK, reuses the client and ignores a stale acknowledgement across reconnects", async () => {
		const { api, client, changed, ready } = start();
		const second = api.init();
		client.emit("connect");
		client.emit("connect");
		expect(mqtt.connect).toHaveBeenCalledTimes(1);
		expect(client.subscribe).toHaveBeenCalledTimes(1);
		expect(api.isConnected()).toBe(false);
		client.subscribe.mock.calls[0][1](null);
		await Promise.all([ready, second]);
		expect(api.isConnected()).toBe(true);
		client.emit("close");
		client.emit("offline");
		client.emit("connect");
		client.emit("close");
		client.subscribe.mock.calls[1][1](null);
		expect(api.isConnected()).toBe(false);
		client.emit("connect");
		client.subscribe.mock.calls[2][1](null);
		expect(changed.mock.calls).toEqual([[true], [false], [true]]);
		expect(client.listenerCount("message")).toBe(1);
		expect(vi.getTimerCount()).toBe(0);
		api.cleanup();
		expect(client.end).toHaveBeenCalledTimes(1);
		expect(client.listenerCount("message")).toBe(0);
	});

	it.each(["connection", "subscription"])("rejects a stalled %s and releases the initial client", async (stage) => {
		const { api, client, ready } = start();
		if (stage === "subscription") client.emit("connect");
		const result = expect(ready).rejects.toMatchObject({ code: "ETIMEDOUT" });
		await vi.advanceTimersByTimeAsync(10000);
		await result;
		expect(client.end).toHaveBeenCalledTimes(1);
		client.subscribe.mock.calls[0]?.[1](null);
		expect(api.isConnected()).toBe(false);
		expect(vi.getTimerCount()).toBe(0);
	});

	it("preserves the broker's error and cancels the handshake timer", async () => {
		const { api, client, ready } = start();
		const error = Object.assign(new Error("Not authorized"), { code: 5 });
		client.emit("error", error);
		await expect(ready).rejects.toBe(error);
		expect(api.isConnected()).toBe(false);
		expect(client.end).toHaveBeenCalledTimes(1);
		expect(vi.getTimerCount()).toBe(0);
	});

	it("unblocks an in-flight subscription on cleanup and ignores its late callback", async () => {
		const { api, client, ready, changed } = start();
		client.emit("connect");
		api.cleanup();
		api.cleanup();
		await expect(ready).rejects.toThrow("MQTT client stopped");
		client.subscribe.mock.calls[0][1](null);
		expect(changed).not.toHaveBeenCalled();
		expect(client.end).toHaveBeenCalledTimes(1);
		expect(vi.getTimerCount()).toBe(0);
	});
});
