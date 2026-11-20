import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Roborock } from "../main";
import { A01StatusRefresh } from "./a01StatusRefresh";
import { mqtt_api } from "./mqttApi";
import { messageParser } from "./messageParser";

function deferred() {
	let resolve!: () => void;
	let reject!: (error: Error) => void;
	const promise = new Promise<void>((res, rej) => {
		resolve = res;
		reject = rej;
	});
	return { promise, resolve, reject };
}

function setup(category = "roborock.wm") {
	const broker = deferred();
	let frame: Buffer | undefined;
	const written: unknown[] = [];
	const adapter = {
		instance: 0,
		http_api: {
			getProductCategory: () => category,
			getMatchedLocalKeys: () => new Map([["device", "1234567890123456"]]),
		},
		setTimeout, clearTimeout, setInterval: vi.fn(), clearInterval: vi.fn(),
		rLog: vi.fn(),
		processA01: async (_duid: string, data: unknown) => {
			written.push(data);
		},
		mqtt_api: { sendMessage: vi.fn(async (_duid: string, message: Buffer, signal?: AbortSignal) => {
			frame = message;
			await new Promise<void>((resolve, reject) => {
				signal?.addEventListener("abort", () => reject(signal.reason), { once: true });
				broker.promise.then(resolve, reject);
			});
		}) },
		requestsHandler: { messageParser: undefined as unknown as messageParser },
		a01StatusRefresh: undefined as unknown as A01StatusRefresh,
	};
	adapter.requestsHandler.messageParser = new messageParser(adapter as unknown as Roborock);
	const service = new A01StatusRefresh(adapter as unknown as Roborock);
	adapter.a01StatusRefresh = service;
	const api = new mqtt_api(adapter as unknown as Roborock);
	const receive = (dps: unknown, protocol = 102, duid = "device") => api.handleDecodedMessage(duid, {
		version: "A01", protocol, payload: JSON.stringify({ dps }),
	});
	return { adapter, service, broker, receive, written, query: () => {
		if (!frame) throw new Error("No A01 frame published");
		const decoded = adapter.requestsHandler.messageParser.decodeMsg(frame, "device")[0];
		expect(decoded.version).toBe("A01");
		expect(decoded.protocol).toBe(101);
		return JSON.parse(decoded.payload.toString());
	} };
}

describe("A01 status refresh", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	it.each([["roborock.wm", "203"], ["roborock.wetdryvac", "201"]])("queries and processes %s operating state", async (category, dp) => {
		const { service, broker, receive, written, query } = setup(category);
		let done = false;
		const pending = service.refresh("device").then(() => {
			done = true;
		});
		await vi.advanceTimersByTimeAsync(0);
		expect(query().dps).toEqual({ "10000": [Number(dp)] });
		broker.resolve();
		await vi.advanceTimersByTimeAsync(0);
		expect(done).toBe(false);
		await receive({ [dp]: 0 });
		await pending;
		expect(written).toEqual([{ dps: { [dp]: 0 } }]);
		expect(vi.getTimerCount()).toBe(0);
	});

	it("requires both a successful write and PUBACK, including early replies", async () => {
		const { service, broker, receive, adapter } = setup();
		const write = deferred();
		adapter.processA01 = async () => write.promise;
		let done = false;
		const pending = service.refresh("device").then(() => {
			done = true;
		});
		await vi.advanceTimersByTimeAsync(0);
		const processing = receive({ "203": 4 }, 500);
		await vi.advanceTimersByTimeAsync(0);
		expect(done).toBe(false);
		write.resolve();
		await processing;
		await vi.advanceTimersByTimeAsync(0);
		expect(done).toBe(false);
		broker.resolve();
		await pending;
	});

	it("ignores unrelated, other-device and invalid state values", async () => {
		const { service, broker, receive } = setup();
		let done = false;
		const pending = service.refresh("device").then(() => {
			done = true;
		});
		broker.resolve();
		await receive({ "203": 4 }, 102, "other");
		for (const dps of [{ "201": 4 }, { "203": "4" }, { "203": null }, [], null]) await receive(dps);
		await vi.advanceTimersByTimeAsync(0);
		expect(done).toBe(false);
		await receive({ "203": 4 });
		await pending;
	});

	it("does not reuse a pre-refresh message still being written", async () => {
		const { service, broker, receive, adapter } = setup();
		const write = deferred();
		adapter.processA01 = async () => write.promise;
		const old = receive({ "203": 4 });
		let done = false;
		const pending = service.refresh("device").then(() => {
			done = true;
		});
		broker.resolve();
		write.resolve();
		await old;
		await vi.advanceTimersByTimeAsync(0);
		expect(done).toBe(false);
		await receive({ "203": 4 });
		await pending;
	});

	it("does not let a previous aborted operation complete the next refresh", async () => {
		const { service, broker, receive, adapter } = setup();
		const write = deferred();
		adapter.processA01 = async () => write.promise;
		const controller = new AbortController();
		const previous = service.refresh("device", controller.signal).catch(error => error);
		const processing = receive({ "203": 4 });
		controller.abort(new Error("stopped"));
		await previous;
		adapter.mqtt_api.sendMessage = vi.fn().mockResolvedValue(undefined);
		let done = false;
		const next = service.refresh("device").then(() => {
			done = true;
		});
		broker.resolve();
		write.resolve();
		await processing;
		await vi.advanceTimersByTimeAsync(0);
		expect(done).toBe(false);
		await receive({ "203": 4 });
		await next;
	});

	it("rejects an already aborted refresh without publishing or installing timers", async () => {
		const { service, adapter } = setup();
		const controller = new AbortController();
		controller.abort(new Error("stopped"));
		await expect(service.refresh("device", controller.signal)).rejects.toThrow("stopped");
		expect(adapter.mqtt_api.sendMessage).not.toHaveBeenCalled();
		expect(vi.getTimerCount()).toBe(0);
	});

	it.each(["publish", "write", "timeout", "abort"])("cleans up after %s failure and permits another refresh", async mode => {
		const { service, broker, receive, adapter } = setup();
		const controller = new AbortController();
		const pending = service.refresh("device", controller.signal);
		const assertion = expect(pending).rejects.toThrow();
		await vi.advanceTimersByTimeAsync(0);
		if (mode === "publish") broker.reject(new Error("publish failed"));
		else if (mode === "write") {
			adapter.processA01 = async () => {
				throw new Error("state write failed");
			};
			await receive({ "203": 4 });
		} else if (mode === "timeout") await vi.advanceTimersByTimeAsync(10_000);
		else controller.abort(new Error("stopped"));
		await assertion;
		expect(vi.getTimerCount()).toBe(0);
		adapter.processA01 = async () => {};
		adapter.mqtt_api.sendMessage = vi.fn().mockResolvedValue(undefined);
		const next = service.refresh("device");
		await vi.advanceTimersByTimeAsync(0);
		await receive({ "203": 4 });
		await next;
	});

	it("coalesces concurrent queries and rejects unsupported categories before publish", async () => {
		const { service, broker, receive, adapter } = setup();
		const first = service.refresh("device");
		const second = service.refresh("device");
		await vi.advanceTimersByTimeAsync(0);
		expect(adapter.mqtt_api.sendMessage).toHaveBeenCalledOnce();
		broker.resolve();
		await receive({ "203": 4 });
		await Promise.all([first, second]);
		const unknown = setup("roborock.mower");
		await expect(unknown.service.refresh("device")).rejects.toThrow("not supported");
		expect(unknown.adapter.mqtt_api.sendMessage).not.toHaveBeenCalled();
	});
});
