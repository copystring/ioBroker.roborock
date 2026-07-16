import { describe, expect, it, vi } from "vitest";

import { ApkDeviceFirmwareRuntime } from "../../src/apppluginHost";

describe("APK device firmware runtime", () => {
	it("preserves the APK's listener no-ops and non-resolving progress callback", () => {
		const runtime = new ApkDeviceFirmwareRuntime();
		const callback = vi.fn();

		expect(() => runtime.addListener("RRDeviceOTAStatusUpdateEvent")).not.toThrow();
		expect(() => runtime.removeListeners(1)).not.toThrow();
		expect(() => runtime.checkProgress(callback)).not.toThrow();
		expect(callback).not.toHaveBeenCalled();
	});

	it("rejects a missing checkProgress callback instead of hiding a bridge mismatch", () => {
		const runtime = new ApkDeviceFirmwareRuntime();
		expect(() => runtime.checkProgress(undefined as never)).toThrow(/benötigt einen Callback/u);
	});
});