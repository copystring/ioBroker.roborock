import { EventEmitter } from "node:events";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as mqtt from "mqtt";
import type { Roborock } from "../main";
import { mqtt_api } from "./mqttApi";

vi.mock("mqtt", () => ({ connect: vi.fn() }));

class TestClient extends EventEmitter {
	connected = false;
	subscribe = vi.fn<(_topic: string, acknowledge: (error: Error | null) => void) => void>();
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
