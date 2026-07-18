import { describe, expect, it, vi } from "vitest";

import { ApkOrientationRuntime } from "../../src/apppluginHost";

describe("APK Orientation runtime", () => {
	it("returns the host display rotation exactly like OrientationModule.getOrientation", () => {
		const runtime = new ApkOrientationRuntime("PORTRAIT");
		const callback = vi.fn();

		runtime.getOrientation(callback);
		expect(callback).toHaveBeenLastCalledWith("PORTRAIT");

		runtime.updateOrientation("LANDSCAPE-RIGHT");
		runtime.getOrientation(callback);
		expect(callback).toHaveBeenLastCalledWith("LANDSCAPE-RIGHT");
	});
});
