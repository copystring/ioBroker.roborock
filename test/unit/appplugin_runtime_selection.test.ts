import { describe, expect, it, vi } from "vitest";

import {
	chooseAppPluginRuntimePort,
	parseAppPluginRuntimePort,
} from "../../src/www/apppluginRuntime/runtime-selection";

describe("AppPlugin desktop runtime selection", () => {
	it("keeps an explicitly requested runtime without silently replacing it", async () => {
		const isReady = vi.fn(async () => false);

		await expect(chooseAppPluginRuntimePort(4197, [4174, 4175], isReady)).resolves.toEqual({
			port: 4197,
			source: "explicit",
		});
		expect(isReady).not.toHaveBeenCalled();
	});

	it("selects the first reachable configured runtime when the URL has no runtime", async () => {
		const isReady = vi.fn(async (port: number) => port === 4175);

		await expect(chooseAppPluginRuntimePort(null, [4174, 4175], isReady)).resolves.toEqual({
			port: 4175,
			source: "first-ready",
		});
		expect(isReady).toHaveBeenCalledTimes(2);
	});

	it("returns a visible disconnected default when no configured runtime is reachable", async () => {
		await expect(chooseAppPluginRuntimePort(null, [4174, 4175], async () => false)).resolves.toEqual({
			port: 4174,
			source: "unavailable-default",
		});
	});

	it("rejects malformed and out-of-range runtime ports", () => {
		expect(parseAppPluginRuntimePort(null)).toBeNull();
		expect(parseAppPluginRuntimePort("4175")).toBe(4175);
		expect(() => parseAppPluginRuntimePort("not-a-port")).toThrow("Ungültiger lokaler AppPlugin-Runtime-Port");
		expect(() => parseAppPluginRuntimePort("65536")).toThrow("Ungültiger lokaler AppPlugin-Runtime-Port");
	});
});
