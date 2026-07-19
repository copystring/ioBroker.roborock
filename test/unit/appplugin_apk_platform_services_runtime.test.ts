import { describe, expect, it, vi } from "vitest";

import {
	ApkPlatformServicesRuntime,
	type ApkToastRequest,
	type ApkVibrationRequest,
} from "../../src/apppluginHost/apkPlatformServicesRuntime";

describe("APK platform services runtime", () => {
	it("delegates clipboard, Android ID and back navigation through the host port", async () => {
		let clipboard = "aus der Zwischenablage";
		const invokeDefaultBackPressHandler = vi.fn();
		const runtime = new ApkPlatformServicesRuntime({
			androidId: "android-test-id",
			readClipboardText: () => clipboard,
			writeClipboardText: value => {
				clipboard = value;
			},
			invokeDefaultBackPressHandler,
			showToast: vi.fn(),
			vibrate: vi.fn(),
		});

		expect(runtime.getAndroidID()).toBe("android-test-id");
		expect(await runtime.getString()).toBe("aus der Zwischenablage");
		await runtime.setString("neu");
		expect(await runtime.getString()).toBe("neu");
		runtime.invokeDefaultBackPressHandler();
		expect(invokeDefaultBackPressHandler).toHaveBeenCalledOnce();
	});

	it("preserves the APK integer conversion for toasts and vibration", () => {
		const toasts: ApkToastRequest[] = [];
		const vibrations: ApkVibrationRequest[] = [];
		const runtime = new ApkPlatformServicesRuntime({
			androidId: "android-test-id",
			readClipboardText: () => "",
			writeClipboardText: () => undefined,
			invokeDefaultBackPressHandler: () => undefined,
			showToast: request => toasts.push(request),
			vibrate: request => vibrations.push(request),
		});

		runtime.show("kurz", 1.9);
		runtime.showWithGravity("oben", 0, 49.8);
		runtime.showWithGravityAndOffset("versetzt", 1, 81, 12.9, -4.9);
		runtime.cancel();
		runtime.vibrate(125.9);
		runtime.vibrateByPattern([0, 20.8, 40], -1.8);

		expect(toasts).toEqual([
			{ message: "kurz", duration: 1 },
			{ message: "oben", duration: 0, gravity: 49 },
			{ message: "versetzt", duration: 1, gravity: 81, xOffset: 12, yOffset: -4 },
		]);
		expect(vibrations).toEqual([
			{ type: "cancel" },
			{ type: "duration", durationMs: 125 },
			{ type: "pattern", patternMs: [0, 20, 40], repeat: -1 },
		]);
	});

	it("rejects invalid host identity and non-finite Android arguments", () => {
		const port = {
			androidId: "",
			readClipboardText: () => "",
			writeClipboardText: () => undefined,
			invokeDefaultBackPressHandler: () => undefined,
			showToast: () => undefined,
			vibrate: () => undefined,
		};
		expect(() => new ApkPlatformServicesRuntime(port)).toThrow(/androidId/u);

		const runtime = new ApkPlatformServicesRuntime({ ...port, androidId: "valid" });
		expect(() => runtime.vibrate(Number.NaN)).toThrow(/endliche Zahl/u);
		expect(() => runtime.vibrateByPattern([0, Number.POSITIVE_INFINITY], -1))
			.toThrow(/pattern\[1\]/u);
	});
});
