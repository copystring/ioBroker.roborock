import { describe, expect, it, vi } from "vitest";

import { ApkOrientationRuntime } from "../../src/apppluginHost";

describe("APK Orientation runtime", () => {
	it("returns the host display rotation exactly like OrientationModule.getOrientation", () => {
		const runtime = new ApkOrientationRuntime("PORTRAIT");
		const callback = vi.fn();

		expect(runtime.constants()).toEqual({ initialOrientation: "PORTRAIT" });
		runtime.getOrientation(callback);
		expect(callback).toHaveBeenLastCalledWith("PORTRAIT");

		runtime.updateOrientation("LANDSCAPE-RIGHT");
		runtime.getOrientation(callback);
		expect(callback).toHaveBeenLastCalledWith("LANDSCAPE-RIGHT");
	});

	it("mirrors the APK lock methods, Android request codes and event order", () => {
		const events: Array<{ eventName: string; payload: Readonly<Record<string, unknown>> }> = [];
		const requests: Array<{ orientation: string; androidRequestedOrientation: number }> = [];
		const runtime = new ApkOrientationRuntime("PORTRAIT", {
			emitDeviceEvent: (eventName, payload) => events.push({ eventName, payload }),
			requestHostOrientation: (orientation, androidRequestedOrientation) =>
				requests.push({ orientation, androidRequestedOrientation }),
		});

		runtime.lockToLandscapeRight();
		expect(runtime.isLocked()).toBe(true);
		expect(requests).toEqual([{
			orientation: "LANDSCAPE-RIGHT",
			androidRequestedOrientation: 8,
		}]);
		expect(events).toEqual([
			{ eventName: "orientationDidChange", payload: { orientation: "LANDSCAPE-RIGHT" } },
			{ eventName: "lockDidChange", payload: { orientation: "LANDSCAPE-RIGHT" } },
		]);

		runtime.unlockAllOrientations();
		expect(runtime.isLocked()).toBe(false);
		expect(requests.at(-1)).toEqual({
			orientation: "UNLOCKED",
			androidRequestedOrientation: 4,
		});
		expect(events.slice(-2)).toEqual([
			{ eventName: "orientationDidChange", payload: { orientation: "LANDSCAPE-RIGHT" } },
			{ eventName: "lockDidChange", payload: { orientation: "UNKNOWN" } },
		]);
	});

	it("reports physical orientation and auto-rotate state through the APK callbacks", () => {
		const events: Array<{ eventName: string; payload: Readonly<Record<string, unknown>> }> = [];
		const runtime = new ApkOrientationRuntime("PORTRAIT", {
			emitDeviceEvent: (eventName, payload) => events.push({ eventName, payload }),
		});
		const callback = vi.fn();

		runtime.getDeviceOrientation(callback);
		expect(callback).toHaveBeenLastCalledWith("");
		runtime.updateDeviceOrientation("LANDSCAPE-LEFT");
		runtime.updateDeviceOrientation("LANDSCAPE-LEFT");
		runtime.getDeviceOrientation(callback);
		expect(callback).toHaveBeenLastCalledWith("LANDSCAPE-LEFT");
		expect(events).toEqual([{
			eventName: "deviceOrientationDidChange",
			payload: { deviceOrientation: "LANDSCAPE-LEFT" },
		}]);

		runtime.getAutoRotateState(callback);
		expect(callback).toHaveBeenLastCalledWith(false);
		runtime.setAutoRotateEnabled(true);
		runtime.getAutoRotateState(callback);
		expect(callback).toHaveBeenLastCalledWith(true);
	});

	it("keeps addListener and removeListeners empty like the inspected APK", () => {
		const runtime = new ApkOrientationRuntime("PORTRAIT");
		expect(runtime.addListener("orientationDidChange")).toBeUndefined();
		expect(runtime.removeListeners(1)).toBeUndefined();
	});
});
