import { describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkNativeViewHierarchyRuntime,
	ApkScrollViewRuntime,
	ApkUiHitTestRuntime,
	ApkUiManagerRuntime,
	ApkYogaLayoutRuntime,
	renderApkNativeUiSnapshotToSvg,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;

function createScrollableView() {
	const ui = new ApkUiManagerRuntime(contract, 1);
	ui.createView(2, "RCTScrollView", 1, {
		overflow: "scroll",
		scrollEventThrottle: 0,
		width: 100,
		height: 100,
	});
	ui.createView(3, "RCTView", 1, {
		collapsable: false,
		width: 100,
		height: 300,
	});
	ui.createView(4, "RCTView", 1, {
		backgroundColor: 0xff00ff00,
		position: "absolute",
		left: 10,
		top: 50,
		width: 80,
		height: 40,
	});
	ui.setChildren(3, [4]);
	ui.setChildren(2, [3]);
	ui.setChildren(1, [2]);
	const yoga = new ApkYogaLayoutRuntime({ width: 100, height: 100 }).calculate(ui.snapshot());
	const hierarchy = new ApkNativeViewHierarchyRuntime(1);
	hierarchy.rebuild(ui.snapshot(), yoga, ui.operations());
	const hitTest = new ApkUiHitTestRuntime(() => hierarchy.snapshot().root);
	hierarchy.applyToHitTest(hitTest);
	const callJsFunction = vi.fn(async () => undefined);
	const scroll = new ApkScrollViewRuntime(hierarchy, hitTest, { callJsFunction });
	return { ui, hierarchy, hitTest, callJsFunction, scroll };
}

describe("APK ScrollView runtime", () => {
	it("intercepts a vertical drag, clamps the native offset and emits the APK event shape", async () => {
		const { hierarchy, hitTest, callJsFunction, scroll } = createScrollableView();
		const target = hitTest.findTouchTarget(20, 70);

		await scroll.pointerDown(7, 20, 70, 100, target.target);
		await scroll.pointerMove(7, 20, 20, 120);
		await scroll.pointerUp(7, 20, 20, 140);

		const scrollLayout = hierarchy.snapshot().layouts.find(entry => entry.tag === 2)?.box;
		expect(scrollLayout).toMatchObject({ scrollX: 0, scrollY: 50 });
		expect(hitTest.findTouchTarget(20, 20).target).toBe(4);
		expect(callJsFunction).toHaveBeenNthCalledWith(1, "RCTEventEmitter", "receiveEvent", [
			2,
			"topScrollBeginDrag",
			expect.objectContaining({
				contentOffset: { x: 0, y: 0 },
				contentSize: { width: 100, height: 300 },
				layoutMeasurement: { width: 100, height: 100 },
				target: 2,
				responderIgnoreScroll: true,
			}),
		]);
		expect(callJsFunction).toHaveBeenNthCalledWith(2, "RCTEventEmitter", "receiveEvent", [
			2,
			"topScroll",
			expect.objectContaining({ contentOffset: { x: 0, y: 50 } }),
		]);
		expect(callJsFunction).toHaveBeenNthCalledWith(3, "RCTEventEmitter", "receiveEvent", [
			2,
			"topScrollEndDrag",
			expect.objectContaining({ contentOffset: { x: 0, y: 50 } }),
		]);
	});

	it("uses the original ScrollView for a PC wheel and renders clipped translated content", async () => {
		const { ui, hierarchy, scroll } = createScrollableView();
		const dispatch = await scroll.wheel(20, 70, 0, 1_000, 100);
		const artifact = renderApkNativeUiSnapshotToSvg({
			shadowRoot: ui.snapshot(),
			nativeHierarchy: hierarchy.snapshot(),
			width: 100,
			height: 100,
		});

		expect(dispatch).toMatchObject({
			tag: 2,
			offsetY: 200,
			maxOffsetY: 200,
			changed: true,
		});
		expect(artifact.svg).toContain('data-apk-scroll-content="2" transform="translate(0 -200)"');
		expect(artifact.svg).toContain('clip-path="url(#apk-clip-2)"');
		expect(hierarchy.visualMutationRevision()).toBe(1);
	});
});
