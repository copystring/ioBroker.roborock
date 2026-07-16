import { describe, expect, it, vi } from "vitest";

import {
	ApkLayoutEventRuntime,
	type ApkUiManagerNodeSnapshot,
	type ApkYogaLayoutEntry,
} from "../../src/apppluginHost";

function node(
	tag: number,
	props: Readonly<Record<string, unknown>> = {},
	children: ApkUiManagerNodeSnapshot[] = [],
): ApkUiManagerNodeSnapshot {
	return { tag, viewName: tag === 1 ? "Root" : "RCTView", rootTag: 1, props, children };
}

function entry(tag: number, x: number, y: number, width: number, height: number): ApkYogaLayoutEntry {
	return { tag, box: { x, y, width, height } };
}

describe("APK topLayout event runtime", () => {
	it("uses Android absolute pixel rounding and emits only changed onLayout nodes", async () => {
		const callJsFunction = vi.fn(async () => undefined);
		const runtime = new ApkLayoutEventRuntime({ callJsFunction }, 3);
		const root = node(1, {}, [node(2, {}, [node(3, { onLayout: true })])]);
		const layouts = [
			entry(1, 0, 0, 100, 100),
			entry(2, 0.2, 0.2, 50, 50),
			entry(3, 0.2, 0.2, 10.2, 5.2),
		];

		const first = await runtime.dispatchChanged(root, layouts);
		expect(first).toEqual([{
			tag: 3,
			eventName: "topLayout",
			payload: {
				layout: { x: 1 / 3, y: 1 / 3, width: 31 / 3, height: 16 / 3 },
				target: 3,
			},
		}]);
		expect(callJsFunction).toHaveBeenCalledWith("RCTEventEmitter", "receiveEvent", [
			3,
			"topLayout",
			first[0].payload,
		]);

		expect(await runtime.dispatchChanged(root, layouts)).toEqual([]);
		expect(callJsFunction).toHaveBeenCalledTimes(1);

		await runtime.dispatchChanged(root, layouts.map(layout => layout.tag === 3
			? entry(3, 0.2, 0.2, 11.2, 5.2)
			: layout));
		expect(callJsFunction).toHaveBeenCalledTimes(2);
	});

	it("rejects non-boolean onLayout props before dispatch", async () => {
		const runtime = new ApkLayoutEventRuntime({ callJsFunction: vi.fn(async () => undefined) }, 1);
		const root = node(1, {}, [node(2, { onLayout: "yes" })]);

		await expect(runtime.dispatchChanged(root, [entry(1, 0, 0, 100, 100), entry(2, 0, 0, 10, 10)]))
			.rejects.toThrow(/onLayout/u);
	});
});
