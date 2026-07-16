import { describe, expect, it, vi } from "vitest";

import { ApkPointerInputBridge } from "../../src/apppluginHost/apkPointerInputBridge";
import { ApkTouchEventDispatcher, ApkTouchEventRuntime } from "../../src/apppluginHost/apkTouchEventRuntime";
import { ApkUiHitTestRuntime } from "../../src/apppluginHost/apkUiHitTestRuntime";
import type { ApkUiManagerNodeSnapshot } from "../../src/apppluginHost/apkUiManagerRuntime";

const tree: ApkUiManagerNodeSnapshot = {
	tag: 1,
	viewName: "Root",
	rootTag: 1,
	props: {},
	children: [
		{
			tag: 3,
			viewName: "RCTView",
			rootTag: 1,
			props: {},
			children: []
		}
	]
};

function createBridge() {
	let currentTree = tree;
	const hitTest = new ApkUiHitTestRuntime(() => currentTree);
	hitTest.setLayout(1, { x: 0, y: 0, width: 300, height: 200 });
	hitTest.setLayout(3, { x: 40, y: 20, width: 100, height: 80 });
	const callJsFunction = vi.fn(async () => undefined);
	const bridge = new ApkPointerInputBridge(
		hitTest,
		new ApkTouchEventDispatcher(new ApkTouchEventRuntime(), { callJsFunction })
	);
	return {
		bridge,
		callJsFunction,
		replaceTree: (replacement: ApkUiManagerNodeSnapshot): void => {
			currentTree = replacement;
		}
	};
}

describe("APK pointer input bridge", () => {
	it("routes a PC pointer through APK hit testing and RCTEventEmitter", async () => {
		const { bridge, callJsFunction } = createBridge();

		const down = await bridge.pointerDown(0, 70, 50, 100);
		await bridge.pointerMove(0, 80, 55, 110);
		const up = await bridge.pointerUp(0, 80, 55, 120);

		expect(down.touches[0]).toMatchObject({
			targetSurface: 1,
			target: 3,
			pageX: 70,
			pageY: 50,
			locationX: 30,
			locationY: 30
		});
		expect(up.changedIndices).toEqual([0]);
		expect(bridge.activePointerIds()).toEqual([]);
		expect(callJsFunction).toHaveBeenNthCalledWith(1, "RCTEventEmitter", "receiveTouches", [
			"topTouchStart",
			expect.any(Array),
			[0]
		]);
		expect(callJsFunction).toHaveBeenNthCalledWith(3, "RCTEventEmitter", "receiveTouches", [
			"topTouchEnd",
			expect.any(Array),
			[0]
		]);
	});

	it("keeps every pointer on the first APK touch target for pinch gestures", async () => {
		const { bridge } = createBridge();

		await bridge.pointerDown(7, 70, 50, 100);
		const secondDown = await bridge.pointerDown(8, 250, 150, 110);

		expect(secondDown.touches.map(touch => touch.target)).toEqual([3, 3]);
		expect(secondDown.changedIndices).toEqual([1]);
		await bridge.cancel(120);
		expect(bridge.activePointerIds()).toEqual([]);
	});

	it("preserves the APK gesture target when React replaces its native view", async () => {
		const withoutTarget: ApkUiManagerNodeSnapshot = {
			...tree,
			children: []
		};
		const ended = createBridge();
		await ended.bridge.pointerDown(11, 70, 50, 100);
		ended.replaceTree(withoutTarget);
		const up = await ended.bridge.pointerUp(11, 70, 50, 110);
		expect(up.touches[0]).toMatchObject({
			targetSurface: 1,
			target: 3,
			locationX: 70,
			locationY: 50
		});
		expect(ended.bridge.activePointerIds()).toEqual([]);

		const cancelled = createBridge();
		await cancelled.bridge.pointerDown(12, 70, 50, 120);
		cancelled.replaceTree(withoutTarget);
		const cancel = await cancelled.bridge.cancel(130);
		expect(cancel.touches[0]).toMatchObject({
			targetSurface: 1,
			target: 3,
			locationX: 30,
			locationY: 30
		});
		expect(cancelled.bridge.activePointerIds()).toEqual([]);
	});
});
