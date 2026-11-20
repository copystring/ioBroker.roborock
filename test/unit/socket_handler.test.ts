import { describe, expect, it, vi } from "vitest";

import { socketHandler } from "../../src/lib/socketHandler";

function createAdapter(deviceHandlers: Map<string, { refreshStatus: () => Promise<void> }>) {
	return {
		deviceFeatureHandlers: deviceHandlers,
		rLog: vi.fn(),
		getDeviceProtocolVersion: vi.fn().mockResolvedValue("1.0"),
		refreshDeviceStatus: async (duid: string) => {
			if (!duid || typeof duid !== "string") throw new Error("Invalid device ID");
			const feature = deviceHandlers.get(duid);
			if (!feature) throw new Error(`No handler for DUID ${duid}`);
			await feature.refreshStatus();
		},
		sendTo: vi.fn(),
		errorMessage: (error: unknown) => error instanceof Error ? error.message : String(error)
	};
}

function createMessage(message: Record<string, unknown>): ioBroker.Message {
	return {
		command: "refresh_status",
		message,
		from: "system.adapter.javascript.0",
		callback: { message: {}, id: 1, ack: false, time: Date.now() }
	} as ioBroker.Message;
}

describe("socketHandler refresh_status", () => {
	it("refreshes the requested device and responds with ok", async () => {
		const refreshStatus = vi.fn().mockResolvedValue(undefined);
		const adapter = createAdapter(new Map([["duid-1", { refreshStatus }]]));
		const handler = new socketHandler(adapter as never);
		const message = createMessage({ duid: "duid-1" });

		await handler.handleMessage(message);

		expect(refreshStatus).toHaveBeenCalledOnce();
		expect(adapter.sendTo).toHaveBeenCalledWith(
			message.from,
			message.command,
			{ result: "ok" },
			message.callback
		);
	});

	it("rejects requests without a device id", async () => {
		const adapter = createAdapter(new Map());
		const handler = new socketHandler(adapter as never);
		const message = createMessage({});

		await handler.handleMessage(message);

		expect(adapter.sendTo).toHaveBeenCalledWith(
			message.from,
			message.command,
			{ error: "Invalid device ID" },
			message.callback
		);
	});

	it("rejects requests for an unknown device", async () => {
		const adapter = createAdapter(new Map());
		const handler = new socketHandler(adapter as never);
		const message = createMessage({ duid: "unknown" });

		await handler.handleMessage(message);

		expect(adapter.sendTo).toHaveBeenCalledWith(
			message.from,
			message.command,
			{ error: "No handler for DUID unknown" },
			message.callback
		);
	});
	it("does not respond before refresh completes", async () => {
		let finish!: () => void;
		const refreshStatus = vi.fn(() => new Promise<void>(resolve => { finish = resolve; }));
		const adapter = createAdapter(new Map([["duid-1", { refreshStatus }]]));
		const handler = new socketHandler(adapter as never);
		const message = createMessage({ duid: "duid-1" });
		const pending = handler.handleMessage(message);
		await Promise.resolve();
		expect(adapter.sendTo).not.toHaveBeenCalled();
		finish();
		await pending;
		expect(adapter.sendTo).toHaveBeenCalledWith(message.from, message.command, { result: "ok" }, message.callback);
	});

	it("returns refresh errors instead of ok", async () => {
		const refreshStatus = vi.fn().mockRejectedValue(new Error("offline"));
		const adapter = createAdapter(new Map([["duid-1", { refreshStatus }]]));
		const handler = new socketHandler(adapter as never);
		const message = createMessage({ duid: "duid-1" });
		await handler.handleMessage(message);
		expect(adapter.sendTo).toHaveBeenCalledWith(message.from, message.command, { error: "offline" }, message.callback);
	});
});
