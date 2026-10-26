import { describe, expect, it, vi } from "vitest";

import { socketHandler } from "../../src/lib/socketHandler";

function createAdapter(deviceHandlers: Map<string, { updateStatus: () => Promise<void> }>) {
	return {
		deviceFeatureHandlers: deviceHandlers,
		rLog: vi.fn(),
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
		const updateStatus = vi.fn().mockResolvedValue(undefined);
		const adapter = createAdapter(new Map([["duid-1", { updateStatus }]]));
		const handler = new socketHandler(adapter as never);
		const message = createMessage({ duid: "duid-1" });

		await handler.handleMessage(message);

		expect(updateStatus).toHaveBeenCalledOnce();
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
			{ error: "Invalid message: 'refresh_status' requires a 'duid'." },
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
});
