import { MeasureMode } from "yoga-layout/sync";
import { describe, expect, it, vi } from "vitest";

import {
	ApkYogaLayoutRuntime,
	type ApkUiManagerNodeSnapshot,
} from "../../src/apppluginHost";

function node(
	tag: number,
	viewName: string,
	props: Readonly<Record<string, unknown>> = {},
	children: ApkUiManagerNodeSnapshot[] = [],
): ApkUiManagerNodeSnapshot {
	return { tag, viewName, rootTag: 1, props, children };
}

describe("APK Yoga physical-pixel execution", () => {
	it("scales DIP styles into physical Yoga pixels and returns logical layouts", () => {
		const measureNode = vi.fn(() => ({ width: 108, height: 54 }));
		const root = node(1, "Root", {}, [
			node(2, "RCTView", { width: 100, height: 50, padding: 5, alignItems: "flex-start" }, [
				node(3, "RCTText", {}, [node(4, "RCTRawText", { text: "Roborock" })]),
			]),
		]);

		const layouts = new Map(new ApkYogaLayoutRuntime({
			width: 360,
			height: 800,
			density: 3,
			measureNode,
		}).calculate(root).map(entry => [entry.tag, entry.box]));

		expect(layouts.get(1)).toEqual({ x: 0, y: 0, width: 360, height: 800 });
		expect(layouts.get(2)).toEqual({ x: 0, y: 0, width: 100, height: 50 });
		expect(layouts.get(3)).toEqual({ x: 5, y: 5, width: 36, height: 18 });
		expect(measureNode).toHaveBeenCalledWith(expect.objectContaining({
			text: "Roborock",
			width: 270,
			widthMode: MeasureMode.AtMost,
		}));
	});
});
