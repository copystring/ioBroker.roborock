import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Roborock } from "../main";
import { mqtt_api } from "./mqttApi";
import { RoborockRequest, requestsHandler } from "./requestsHandler";

function setup(version: string) {
	let acknowledge: ((error?: Error | null) => void) | undefined;
	const publish = vi.fn((_topic: string, _message: Buffer, _options: { qos: number }, callback: (error?: Error | null) => void) => {
		acknowledge = callback;
	});
	const adapter = {
		instance: 0,
		pendingRequests: new Map<number, RoborockRequest>(),
		b01MapResponseQueue: new Map(),
		getDeviceProtocolVersion: async () => version,
		getStateAsync: async () => ({ val: "test-endpoint" }),
		http_api: {
			get_rriot: () => ({ u: "user" }),
			getMatchedLocalKeys: () => new Map([["robot", "1234567890123456"]]),
		},
		local_api: { isConnected: () => false },
		rLog: vi.fn(),
		catchError: vi.fn(),
		setTimeout, clearTimeout, setInterval: vi.fn(), clearInterval: vi.fn(),
		mqtt_api: undefined as unknown as mqtt_api,
	};
	const api = new mqtt_api(adapter as unknown as Roborock);
	adapter.mqtt_api = api;
	api.connected = true;
	api.client = { publish };
	const handler = new requestsHandler(adapter as unknown as Roborock);
	const req = new RoborockRequest(handler, "robot", "get_status", [], handler["globalManager"], "TestQueue", version, 20000);
	return { adapter, req, handler, publish, acknowledge: (error?: Error | null) => {
		if (!acknowledge) throw new Error("No publish pending");
		acknowledge(error);
	} };
}

describe("RoborockRequest MQTT publish failures", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	it.each(["A01", "1.0", "B01"])("propagates the %s publish error and releases the request without an unhandled rejection", async (version) => {
		const { adapter, req, publish, acknowledge } = setup(version);
		const error = Object.assign(new Error("Broker denied publish"), { code: 135 });
		const outcome = req.send().then(value => ({ value }), error => ({ error }));
		await vi.advanceTimersByTimeAsync(0);
		expect(publish).toHaveBeenCalledTimes(1);
		acknowledge(error);
		await vi.advanceTimersByTimeAsync(0);
		expect(adapter.pendingRequests.size).toBe(0);
		expect(vi.getTimerCount()).toBe(0);
		const result = await outcome;
		expect("error" in result && result.error).toBe(error);
	});

	it.each(["abort", "request timeout", "queue clear"])("settles promptly before PUBACK on %s", async mode => {
		const { adapter, req, publish } = setup("1.0");
		const controller = new AbortController();
		req.timeout = 100;
		let settled = false;
		const outcome = req.send(controller.signal).catch(error => {
			settled = true;
			return error;
		});
		await vi.advanceTimersByTimeAsync(0);
		expect(publish).toHaveBeenCalledOnce();
		if (mode === "abort") controller.abort();
		else if (mode === "queue clear") req.reject(new Error("Queue cleared"));
		else await vi.advanceTimersByTimeAsync(100);
		await vi.advanceTimersByTimeAsync(0);
		expect(settled).toBe(true);
		expect(adapter.pendingRequests.size).toBe(0);
		expect(vi.getTimerCount()).toBe(0);
		await outcome;
	});

	it.each(["1.0", "B01"])("does not let an early %s reply mask a publish failure or timeout", async version => {
		for (const failure of ["error", "timeout"]) {
			const { adapter, req, acknowledge } = setup(version);
			const outcome = req.send().then(value => ({ value }), error => ({ error }));
			await vi.advanceTimersByTimeAsync(0);
			req.resolve([{ state: 3 }]);
			if (failure === "error") acknowledge(new Error("publish failed"));
			else await vi.advanceTimersByTimeAsync(10_000);
			expect(await outcome).toHaveProperty("error");
			expect(adapter.pendingRequests.size).toBe(0);
			expect(vi.getTimerCount()).toBe(0);
		}
	});

	it("accepts an early reply only after publish success", async () => {
		const { req, acknowledge } = setup("1.0");
		let done = false;
		const outcome = req.send().then(value => {
			done = true;
			return value;
		});
		await vi.advanceTimersByTimeAsync(0);
		req.resolve([{ state: 3 }]);
		expect(done).toBe(false);
		acknowledge();
		await expect(outcome).resolves.toEqual([{ state: 3 }]);
	});

	it.each(["queued", "in flight"])("cancels a real %s refresh request without retries or retained tasks", async mode => {
		const { adapter, handler, publish } = setup("1.0");
		const manager = handler["globalManager"];
		if (mode === "queued") manager.queue.pause();
		const controller = new AbortController();
		const outcome = handler.sendRequest("robot", "get_prop", ["get_status"], { signal: controller.signal, retries: 0 }).catch(error => error);
		await vi.advanceTimersByTimeAsync(0);
		controller.abort(new Error("stopped"));
		await vi.advanceTimersByTimeAsync(0);
		expect(await outcome).toBeInstanceOf(Error);
		expect(adapter.pendingRequests.size).toBe(0);
		expect(manager.tasks.size).toBe(0);
		expect(manager.queue.size).toBe(0);
		expect(vi.getTimerCount()).toBe(0);
		if (mode === "queued") expect(publish).not.toHaveBeenCalled();
	});

	it("keeps A01 pending until the broker acknowledges and then resolves without a device reply", async () => {
		const { adapter, req, acknowledge } = setup("A01");
		let settled = false;
		const outcome = req.send().then(value => {
			settled = true;
			return value;
		});
		await vi.advanceTimersByTimeAsync(0);
		expect(settled).toBe(false);
		expect(adapter.pendingRequests.size).toBe(1);
		acknowledge();
		await expect(outcome).resolves.toBeNull();
		expect(adapter.pendingRequests.size).toBe(0);
		expect(vi.getTimerCount()).toBe(0);
	});

	it.each(["1.0", "B01"])("still waits for the %s device reply after a successful publish", async (version) => {
		const { adapter, req, acknowledge } = setup(version);
		let settled = false;
		const outcome = req.send().then(value => {
			settled = true;
			return value;
		});
		await vi.advanceTimersByTimeAsync(0);
		acknowledge();
		await vi.advanceTimersByTimeAsync(0);
		expect(settled).toBe(false);
		expect(adapter.pendingRequests.size).toBe(1);
		expect(vi.getTimerCount()).toBe(1);
		req.resolve(["ok"]);
		await expect(outcome).resolves.toEqual(["ok"]);
		expect(adapter.pendingRequests.size).toBe(0);
		expect(vi.getTimerCount()).toBe(0);
	});

	it.each(["A01", "1.0", "B01"])("releases the %s request when the publish acknowledgement times out", async (version) => {
		const { adapter, req, acknowledge } = setup(version);
		const outcome = req.send().then(value => ({ value }), error => ({ error }));
		await vi.advanceTimersByTimeAsync(10000);
		expect(adapter.pendingRequests.size).toBe(0);
		expect(vi.getTimerCount()).toBe(0);
		expect(await outcome).toMatchObject({ error: { code: "ETIMEDOUT" } });
		acknowledge();
		expect(adapter.pendingRequests.size).toBe(0);
		expect(vi.getTimerCount()).toBe(0);
	});
});
