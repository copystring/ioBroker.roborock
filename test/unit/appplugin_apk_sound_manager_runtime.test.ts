import { describe, expect, it, vi } from "vitest";

import { ApkSoundManagerRuntime } from "../../src/apppluginHost";

describe("APK sound manager runtime", () => {
	it("routes Android's touch-sound request through an optional platform hook", () => {
		const playTouchSound = vi.fn();
		const runtime = new ApkSoundManagerRuntime({ playTouchSound });

		runtime.playTouchSound();
		runtime.playTouchSound();

		expect(playTouchSound).toHaveBeenCalledTimes(2);
		expect(runtime.touchSoundCount()).toBe(2);
	});

	it("remains a safe no-op when the backend has no platform audio service", () => {
		const runtime = new ApkSoundManagerRuntime();
		expect(() => runtime.playTouchSound()).not.toThrow();
		expect(runtime.touchSoundCount()).toBe(1);
	});
});