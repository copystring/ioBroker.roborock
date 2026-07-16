import { describe, expect, it, vi } from "vitest";

import {
	ApkTouchEventDispatcher,
	ApkTouchEventRuntime,
	type ApkTouchPoint,
} from "../../src/apppluginHost";

function touch(
	identifier: number,
	timestamp: number,
	pageX: number,
	pageY: number,
	overrides: Partial<ApkTouchPoint> = {},
): ApkTouchPoint {
	return {
		identifier,
		targetSurface: 1,
		target: 41,
		timestamp,
		pageX,
		pageY,
		locationX: pageX - 10,
		locationY: pageY - 20,
		...overrides,
	};
}

describe("APK touch event runtime", () => {
	it("reproduces single-pointer start, move and end payloads", () => {
		const runtime = new ApkTouchEventRuntime();
		const started = runtime.dispatch({
			eventName: "topTouchStart",
			touches: [touch(3, 100, 120, 240)],
			changedIdentifier: 3,
		});

		expect(started).toEqual({
			eventName: "topTouchStart",
			touches: [{
				identifier: 3,
				targetSurface: 1,
				target: 41,
				timestamp: 100,
				pageX: 120,
				pageY: 240,
				locationX: 110,
				locationY: 220,
			}],
			changedIndices: [0],
		});

		const moved = runtime.dispatch({
			eventName: "topTouchMove",
			touches: [touch(3, 110, 130, 250)],
		});
		expect(moved.changedIndices).toEqual([0]);
		expect(runtime.activeTouches()[0]).toMatchObject({ pageX: 130, pageY: 250, timestamp: 110 });

		const ended = runtime.dispatch({
			eventName: "topTouchEnd",
			touches: [touch(3, 120, 130, 250)],
			changedIdentifier: 3,
		});
		expect(ended.changedIndices).toEqual([0]);
		expect(runtime.activeTouches()).toEqual([]);
	});

	it("keeps Android pointer ordering and marks every pointer for move and cancel", () => {
		const runtime = new ApkTouchEventRuntime();
		runtime.dispatch({
			eventName: "topTouchStart",
			touches: [touch(7, 10, 20, 30)],
			changedIdentifier: 7,
		});

		const secondStart = runtime.dispatch({
			eventName: "topTouchStart",
			touches: [touch(7, 20, 21, 31), touch(9, 20, 80, 90)],
			changedIdentifier: 9,
		});
		expect(secondStart.changedIndices).toEqual([1]);

		const moved = runtime.dispatch({
			eventName: "topTouchMove",
			touches: [touch(7, 30, 22, 32), touch(9, 30, 84, 94)],
		});
		expect(moved.changedIndices).toEqual([0, 1]);

		const secondEnd = runtime.dispatch({
			eventName: "topTouchEnd",
			touches: [touch(7, 40, 23, 33), touch(9, 40, 84, 94)],
			changedIdentifier: 9,
		});
		expect(secondEnd.changedIndices).toEqual([1]);
		expect(runtime.activeTouches().map(point => point.identifier)).toEqual([7]);

		const cancelled = runtime.dispatch({
			eventName: "topTouchCancel",
			touches: [touch(7, 50, 23, 33)],
		});
		expect(cancelled.changedIndices).toEqual([0]);
		expect(runtime.activeTouches()).toEqual([]);
	});

	it("rejects broken pointer and target invariants without changing active state", () => {
		const runtime = new ApkTouchEventRuntime();
		runtime.dispatch({
			eventName: "topTouchStart",
			touches: [touch(1, 100, 10, 20)],
			changedIdentifier: 1,
		});

		expect(() => runtime.dispatch({
			eventName: "topTouchMove",
			touches: [touch(1, 99, 11, 21)],
		})).toThrow(/rückläufig/u);
		expect(() => runtime.dispatch({
			eventName: "topTouchMove",
			touches: [touch(1, 110, 11, 21, { target: 42 })],
		})).toThrow(/darf sich nicht ändern/u);
		expect(() => runtime.dispatch({
			eventName: "topTouchStart",
			touches: [touch(1, 110, 11, 21), touch(1, 110, 30, 40)],
			changedIdentifier: 2,
		})).toThrow(/Doppelte Touch-Kennung/u);

		expect(runtime.activeTouches()).toEqual([touch(1, 100, 10, 20)]);
	});

	it("calls the unchanged RCTEventEmitter receiveTouches boundary", async () => {
		const callJsFunction = vi.fn(async () => undefined);
		const dispatcher = new ApkTouchEventDispatcher(
			new ApkTouchEventRuntime(),
			{ callJsFunction },
		);
		const result = await dispatcher.dispatch({
			eventName: "topTouchStart",
			touches: [touch(0, 123, 120, 240)],
			changedIdentifier: 0,
		});

		expect(callJsFunction).toHaveBeenCalledTimes(1);
		expect(callJsFunction).toHaveBeenCalledWith("RCTEventEmitter", "receiveTouches", [
			"topTouchStart",
			[{ ...touch(0, 123, 120, 240) }],
			[0],
		]);
		expect(result.changedIndices).toEqual([0]);
	});
});
