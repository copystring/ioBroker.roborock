import { describe, expect, it, vi } from "vitest";

vi.mock("@iobroker/adapter-core", () => ({
	Adapter: class MockAdapter {}
}));

vi.mock("go2rtc-static", () => ({
	default: ""
}));

describe("command state handling", () => {
	it("ignores stale command states that are no longer registered", async () => {
		const { Roborock } = await import("../../src/main");
		const commandSpy = vi.fn().mockResolvedValue(undefined);
		const handler = {
			protocolVersion: "1.0",
			hasCommandFolder: vi.fn().mockReturnValue(true),
			getCommandSpec: vi.fn().mockReturnValue(undefined)
		};
		const adapter = Object.assign(Object.create(Roborock.prototype), {
			deviceFeatureHandlers: new Map([["duid1", handler]]),
			requestsHandler: { command: commandSpy },
			rLog: vi.fn(),
			catchError: vi.fn()
		});

		await adapter.onStateChange("roborock.0.Devices.duid1.commands.app_start_dust_collection", {
			val: true,
			ack: false
		});

		expect(handler.getCommandSpec).toHaveBeenCalledWith("commands", "app_start_dust_collection");
		expect(commandSpy).not.toHaveBeenCalled();
		expect(adapter.catchError).not.toHaveBeenCalled();
	});
});
