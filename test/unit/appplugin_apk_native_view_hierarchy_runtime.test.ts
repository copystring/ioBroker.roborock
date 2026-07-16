import { describe, expect, it } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkNativeViewHierarchyRuntime,
	ApkUiHitTestRuntime,
	ApkUiManagerRuntime,
	ApkYogaLayoutRuntime,
	isApkLayoutOnlyAndCollapsable,
	type ApkAppPluginHostContract,
	type ApkUiManagerNodeSnapshot,
	type ApkYogaLayoutEntry,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;

function layoutMap(entries: readonly { tag: number; box: Readonly<{ x: number; y: number; width: number; height: number }> }[]): Map<number, Readonly<{ x: number; y: number; width: number; height: number }>> {
	return new Map(entries.map(entry => [entry.tag, entry.box]));
}

describe("APK native view hierarchy runtime", () => {
	it("implements the APK's conditional layout-only props", () => {
		expect(isApkLayoutOnlyAndCollapsable(null)).toBe(true);
		expect(isApkLayoutOnlyAndCollapsable({ width: 100, flex: 1, pointerEvents: "box-none" })).toBe(true);
		expect(isApkLayoutOnlyAndCollapsable({ collapsable: false })).toBe(false);
		expect(isApkLayoutOnlyAndCollapsable({ pointerEvents: "box-only" })).toBe(false);
		expect(isApkLayoutOnlyAndCollapsable({ opacity: 1 })).toBe(true);
		expect(isApkLayoutOnlyAndCollapsable({ opacity: 0.5 })).toBe(false);
		expect(isApkLayoutOnlyAndCollapsable({ borderLeftColor: 0, borderLeftWidth: 0 })).toBe(true);
		expect(isApkLayoutOnlyAndCollapsable({ borderLeftColor: 0xff00ff })).toBe(false);
		expect(isApkLayoutOnlyAndCollapsable({ borderRadius: 10, borderWidth: 0 })).toBe(true);
		expect(isApkLayoutOnlyAndCollapsable({ borderRadius: 10, backgroundColor: 0 })).toBe(false);
		expect(isApkLayoutOnlyAndCollapsable({ borderRadius: 10, backgroundColor: 0xff000000 })).toBe(false);
		expect(isApkLayoutOnlyAndCollapsable({ overflow: "visible" })).toBe(true);
		expect(isApkLayoutOnlyAndCollapsable({ overflow: "hidden" })).toBe(false);
	});

	it("removes layout-only RCTViews while preserving rounded native offsets", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		ui.createView(2, "RCTView", 1, {
			position: "absolute",
			left: 10.4,
			top: 20.4,
			width: 50,
			height: 50,
		});
		ui.createView(3, "RCTView", 1, {
			backgroundColor: 0xff000000,
			width: 20,
			height: 20,
			marginLeft: 5.4,
			marginTop: 6.4,
		});
		ui.setChildren(2, [3]);
		ui.setChildren(1, [2]);
		const yoga = new ApkYogaLayoutRuntime({ width: 100, height: 100 }).calculate(ui.snapshot());
		const hierarchy = new ApkNativeViewHierarchyRuntime(1);
		const native = hierarchy.rebuild(ui.snapshot(), yoga, ui.operations());

		expect(native.collapsedTags).toEqual([2]);
		expect(native.root.children.map(child => child.tag)).toEqual([3]);
		expect(layoutMap(native.layouts).get(3)).toEqual({
			x: 15,
			y: 26,
			width: 20,
			height: 20,
			enabled: undefined,
		});

		const hitTest = new ApkUiHitTestRuntime(() => hierarchy.snapshot().root);
		hierarchy.applyToHitTest(hitTest);
		expect(hitTest.findTouchTarget(16, 27)).toMatchObject({
			target: 3,
			locationX: 1,
			locationY: 1,
		});
	});

	it("rounds every collapsed shadow offset like Android instead of rounding only the sum", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		ui.createView(2, "RCTView", 1, { width: 30, height: 30 });
		ui.createView(3, "SkiaPictureView", 1, { width: 10.4, height: 10.4 });
		ui.setChildren(2, [3]);
		ui.setChildren(1, [2]);
		const layouts: ApkYogaLayoutEntry[] = [
			{ tag: 1, box: { x: 0, y: 0, width: 100, height: 100 } },
			{ tag: 2, box: { x: 0.6, y: 0.6, width: 30, height: 30 } },
			{ tag: 3, box: { x: 0.6, y: 0.6, width: 10.4, height: 10.4 } },
		];
		const native = new ApkNativeViewHierarchyRuntime(1).rebuild(ui.snapshot(), layouts, ui.operations());

		expect(layoutMap(native.layouts).get(3)).toEqual({
			x: 2,
			y: 2,
			width: 11,
			height: 11,
			enabled: undefined,
		});
	});

	it("never collapses a view again after the APK made it native", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		ui.createView(2, "RCTView", 1, { width: 40, height: 30 });
		ui.updateView(2, "RCTView", { backgroundColor: 0xff000000 });
		ui.updateView(2, "RCTView", { backgroundColor: null, opacity: 1 });
		ui.setChildren(1, [2]);
		const yoga = new ApkYogaLayoutRuntime({ width: 100, height: 100 }).calculate(ui.snapshot());
		const native = new ApkNativeViewHierarchyRuntime(1).rebuild(ui.snapshot(), yoga, ui.operations());

		expect(native.collapsedTags).toEqual([]);
		expect(native.root.children.map(child => child.tag)).toEqual([2]);
	});

	it("keeps native descendant order across collapsed wrappers", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		ui.createView(2, "RCTView", 1, { flexDirection: "row" });
		ui.createView(3, "SkiaPictureView", 1, { width: 10, height: 10 });
		ui.createView(4, "SkiaPictureView", 1, { width: 10, height: 10 });
		ui.createView(5, "SkiaPictureView", 1, { width: 10, height: 10 });
		ui.setChildren(2, [3, 4]);
		ui.setChildren(1, [2, 5]);
		const yoga = new ApkYogaLayoutRuntime({ width: 100, height: 100 }).calculate(ui.snapshot());
		const native = new ApkNativeViewHierarchyRuntime(1).rebuild(ui.snapshot(), yoga, ui.operations());

		expect(native.root.children.map(child => child.tag)).toEqual([3, 4, 5]);
	});

	it("removes raw text and internal SVG nodes from the ordinary native hit-test tree", () => {
		const rawText: ApkUiManagerNodeSnapshot = {
			tag: 2,
			viewName: "RCTRawText",
			rootTag: 1,
			props: { text: "Roborock" },
			children: [],
		};
		const svgPath: ApkUiManagerNodeSnapshot = {
			tag: 3,
			viewName: "RNSVGPath",
			rootTag: 1,
			props: {},
			children: [],
		};
		const root: ApkUiManagerNodeSnapshot = {
			tag: 1,
			viewName: "Root",
			rootTag: 1,
			props: {},
			children: [rawText, svgPath],
		};
		const native = new ApkNativeViewHierarchyRuntime(1).rebuild(
			root,
			[{ tag: 1, box: { x: 0, y: 0, width: 100, height: 100 } }],
			[],
		);
		expect(native.virtualTags).toEqual([2, 3]);
		expect(native.root).toMatchObject({ tag: 1, children: [] });
	});

	it("measures transformed native bounds with APK physical-pixel rounding", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		ui.createView(2, "RCTView", 1, { backgroundColor: 0xff000000 });
		ui.createView(3, "RCTView", 1, { backgroundColor: 0xff000000, transform: [{ scale: 2 }] });
		ui.setChildren(2, [3]);
		ui.setChildren(1, [2]);
		const layouts: ApkYogaLayoutEntry[] = [
			{ tag: 1, box: { x: 0, y: 0, width: 100, height: 100 } },
			{ tag: 2, box: { x: 10, y: 20, width: 50, height: 50 } },
			{ tag: 3, box: { x: 5, y: 6, width: 10, height: 20 } },
		];
		const hierarchy = new ApkNativeViewHierarchyRuntime(1, 2);
		hierarchy.rebuild(ui.snapshot(), layouts, ui.operations());

		expect(hierarchy.measure(3)).toEqual({ x: 10, y: 16, width: 20, height: 40 });
		expect(hierarchy.measure(99)).toBeUndefined();
	});
});
