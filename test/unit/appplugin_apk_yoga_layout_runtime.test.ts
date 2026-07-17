import { describe, expect, it, vi } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	APK_YOGA_RUNTIME_PROFILE,
	ApkUiHitTestRuntime,
	ApkUiManagerRuntime,
	ApkYogaLayoutRuntime,
	type ApkAppPluginHostContract,
	type ApkUiManagerNodeSnapshot,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;

function node(
	tag: number,
	viewName: string,
	props: Readonly<Record<string, unknown>> = {},
	children: ApkUiManagerNodeSnapshot[] = [],
): ApkUiManagerNodeSnapshot {
	return { tag, viewName, rootTag: 1, props, children };
}

function layouts(entries: ReturnType<ApkYogaLayoutRuntime["calculate"]>): Map<number, Readonly<{ x: number; y: number; width: number; height: number }>> {
	return new Map(entries.map(entry => [entry.tag, entry.box]));
}

describe("APK Yoga layout runtime", () => {
	it("pins the APK Yoga-2 compatibility profile", () => {
		expect(APK_YOGA_RUNTIME_PROFILE).toEqual({
			packageName: "yoga-layout",
			packageVersion: "2.0.1",
			useWebDefaults: false,
			pointScaleFactor: 0,
			errata: "all",
		});
	});

	it("calculates flex rows and gaps with the APK configuration", () => {
		const root = node(1, "Root", {}, [
			node(2, "RCTView", { width: "100%", height: "100%", flexDirection: "row", columnGap: 10 }, [
				node(3, "RCTView", { width: 100, height: 50 }),
				node(4, "RCTView", { flex: 1, height: 50 }),
			]),
		]);
		const result = layouts(new ApkYogaLayoutRuntime({ width: 300, height: 200 }).calculate(root));

		expect(result.get(1)).toEqual({ x: 0, y: 0, width: 300, height: 200 });
		expect(result.get(2)).toEqual({ x: 0, y: 0, width: 300, height: 200 });
		expect(result.get(3)).toEqual({ x: 0, y: 0, width: 100, height: 50 });
		expect(result.get(4)).toEqual({ x: 110, y: 0, width: 190, height: 50 });
	});

	it("resolves absolute percentage-independent edges like React Native Yoga", () => {
		const root = node(1, "Root", {}, [
			node(2, "RCTView", { width: "100%", height: "100%" }, [
				node(3, "RCTView", { position: "absolute", left: 10, right: 20, top: 5, height: 30 }),
			]),
		]);
		const result = layouts(new ApkYogaLayoutRuntime({ width: 300, height: 200 }).calculate(root));

		expect(result.get(3)).toEqual({ x: 10, y: 5, width: 270, height: 30 });
	});

	it("maps physical left/right styles through the APK I18nUtil preference in RTL", () => {
		const root = node(1, "Root", {}, [
			node(2, "RCTView", { width: "100%", height: "100%" }, [
				node(3, "RCTView", { position: "absolute", left: 10, top: 5, width: 40, height: 30 }),
			]),
		]);

		const swapped = layouts(new ApkYogaLayoutRuntime({
			width: 300,
			height: 200,
			direction: "rtl",
			doLeftAndRightSwapInRTL: true,
		}).calculate(root));
		const physical = layouts(new ApkYogaLayoutRuntime({
			width: 300,
			height: 200,
			direction: "rtl",
			doLeftAndRightSwapInRTL: false,
		}).calculate(root));

		expect(swapped.get(3)).toEqual({ x: 250, y: 5, width: 40, height: 30 });
		expect(physical.get(3)).toEqual({ x: 10, y: 5, width: 40, height: 30 });
	});

	it("sizes modal content to the Android dialog viewport outside the ordinary parent layout", () => {
		const root = node(1, "Root", {}, [
			node(2, "RCTView", { width: 40, height: 30 }, [
				node(3, "RCTModalHostView", { position: "absolute" }, [
					node(4, "RCTView", { flex: 1 }, [
						node(5, "RCTView", {
							position: "absolute",
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							paddingBottom: 46,
							justifyContent: "flex-end",
						}),
					]),
				]),
			]),
		]);
		const result = layouts(new ApkYogaLayoutRuntime({ width: 360, height: 720 }).calculate(root));

		expect(result.get(3)).toEqual({ x: 0, y: 0, width: 360, height: 720 });
		expect(result.get(4)).toEqual({ x: 0, y: 0, width: 360, height: 720 });
		expect(result.get(5)).toEqual({ x: 0, y: 0, width: 360, height: 720 });
	});
	it("applies calculated boxes to the native hit-test runtime", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		ui.createView(2, "RCTView", 1, { width: 200, height: 100 });
		ui.createView(3, "SkiaPictureView", 1, { width: 80, height: 60, marginLeft: 15, marginTop: 10 });
		ui.setChildren(2, [3]);
		ui.setChildren(1, [2]);
		const hitTest = new ApkUiHitTestRuntime(() => ui.snapshot());

		new ApkYogaLayoutRuntime({ width: 300, height: 200 }).calculateAndApply(ui.snapshot(), hitTest);

		expect(hitTest.findTouchTarget(20, 20)).toMatchObject({
			target: 3,
			locationX: 5,
			locationY: 10,
		});
	});

	it("keeps Android text measurement as an explicit host contract", () => {
		const text = node(2, "RCTText", {}, [node(3, "RCTRawText", { text: "Roborock" })]);
		const root = node(1, "Root", { alignItems: "flex-start" }, [text]);
		expect(() => new ApkYogaLayoutRuntime({ width: 300, height: 200 }).calculate(root))
			.toThrow(/APK-Textmessung/u);

		const measureNode = vi.fn(() => ({ width: 72, height: 18 }));
		const result = layouts(new ApkYogaLayoutRuntime({ width: 300, height: 200, measureNode }).calculate(root));
		expect(result.get(2)).toEqual({ x: 0, y: 0, width: 72, height: 18 });
		expect(result.has(3)).toBe(false);
		expect(measureNode).toHaveBeenCalledWith(expect.objectContaining({
			node: text,
			text: "Roborock",
		}));
	});
});
