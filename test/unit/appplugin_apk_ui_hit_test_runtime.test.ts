import { describe, expect, it } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkUiHitTestRuntime,
	ApkUiManagerRuntime,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;

function nestedTree(
	parentProps: Readonly<Record<string, unknown>> = {},
	childProps: Readonly<Record<string, unknown>> = {},
): Readonly<{ ui: ApkUiManagerRuntime; hitTest: ApkUiHitTestRuntime }> {
	const ui = new ApkUiManagerRuntime(contract, 1);
	ui.createView(2, "RCTView", 1, parentProps);
	ui.createView(3, "SkiaPictureView", 1, childProps);
	ui.setChildren(2, [3]);
	ui.setChildren(1, [2]);
	const hitTest = new ApkUiHitTestRuntime(() => ui.snapshot());
	hitTest.setLayout(1, { x: 0, y: 0, width: 300, height: 500 });
	hitTest.setLayout(2, { x: 10, y: 20, width: 200, height: 300 });
	hitTest.setLayout(3, { x: 5, y: 7, width: 100, height: 120 });
	return { ui, hitTest };
}

describe("APK UI hit test runtime", () => {
	it("selects the deepest native view and preserves target-local coordinates", () => {
		const { hitTest } = nestedTree();
		expect(hitTest.findTouchTarget(20, 35)).toEqual({
			targetSurface: 1,
			target: 3,
			pageX: 20,
			pageY: 35,
			locationX: 5,
			locationY: 8,
		});
		expect(hitTest.createTouchPoint(7, 1234, 20, 35)).toEqual({
			identifier: 7,
			timestamp: 1234,
			targetSurface: 1,
			target: 3,
			pageX: 20,
			pageY: 35,
			locationX: 5,
			locationY: 8,
		});
	});

	it("implements APK pointerEvents self/child rules", () => {
		const boxOnly = nestedTree({ pointerEvents: "box-only" }).hitTest;
		expect(boxOnly.findTouchTarget(20, 35).target).toBe(2);

		const boxNone = nestedTree({ pointerEvents: "box-none" }).hitTest;
		expect(boxNone.findTouchTarget(20, 35).target).toBe(3);
		expect(boxNone.findTouchTarget(180, 280).target).toBe(1);

		const disabled = nestedTree({}, { pointerEvents: "box-only" }).hitTest;
		disabled.setLayout(3, { x: 5, y: 7, width: 100, height: 120, enabled: false });
		expect(disabled.findTouchTarget(20, 35).target).toBe(2);
	});

	it("uses reverse native Z order and zIndex like ReactViewGroup", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		ui.createView(2, "RCTView", 1, { zIndex: 10 });
		ui.createView(3, "RCTView", 1, { zIndex: 20 });
		ui.setChildren(1, [2, 3]);
		const hitTest = new ApkUiHitTestRuntime(() => ui.snapshot());
		hitTest.setLayout(1, { x: 0, y: 0, width: 100, height: 100 });
		hitTest.setLayout(2, { x: 0, y: 0, width: 100, height: 100 });
		hitTest.setLayout(3, { x: 0, y: 0, width: 100, height: 100 });

		expect(hitTest.findTouchTarget(50, 50).target).toBe(3);
		ui.updateView(2, "RCTView", { zIndex: 30 });
		expect(hitTest.findTouchTarget(50, 50).target).toBe(2);
	});

	it("respects hitSlop, overflow clipping, scroll and inverse transforms", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		ui.createView(2, "RCTView", 1, { pointerEvents: "box-none", overflow: "visible" });
		ui.createView(3, "RCTView", 1, { hitSlop: { left: 5 } });
		ui.setChildren(2, [3]);
		ui.setChildren(1, [2]);
		const hitTest = new ApkUiHitTestRuntime(() => ui.snapshot());
		hitTest.setLayout(1, { x: 0, y: 0, width: 200, height: 200 });
		hitTest.setLayout(2, { x: 10, y: 10, width: 40, height: 40, scrollX: 5 });
		hitTest.setLayout(3, {
			x: 45,
			y: 0,
			width: 20,
			height: 20,
			transform: { a: 2, b: 0, c: 0, d: 2, tx: 0, ty: 0 },
		});

		const visibleOverflow = hitTest.findTouchTarget(53, 20);
		expect(visibleOverflow.target).toBe(3);
		expect(visibleOverflow.locationX).toBe(1.5);
		expect(visibleOverflow.locationY).toBe(5);

		ui.updateView(2, "RCTView", { overflow: "hidden" });
		expect(hitTest.findTouchTarget(53, 20).target).toBe(1);
	});

	it("reuses the original gesture target for later pointer coordinates", () => {
		const { hitTest } = nestedTree();
		const first = hitTest.createTouchPoint(0, 10, 20, 35);
		const moved = hitTest.createTouchPoint(0, 20, 30, 45, first.target);

		expect(moved).toMatchObject({
			target: 3,
			targetSurface: 1,
			locationX: 15,
			locationY: 18,
		});
	});

	it("fails explicitly when native layout data is missing", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		const hitTest = new ApkUiHitTestRuntime(() => ui.snapshot());
		expect(() => hitTest.findTouchTarget(10, 10)).toThrow(/native APK-Layout/u);
	});
});
