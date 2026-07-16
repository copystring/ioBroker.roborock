import { describe, expect, it } from "vitest";

import contractJson from "../../src/apppluginHost/generated/apk-appplugin-host-contract.json";
import {
	ApkNativeViewHierarchyRuntime,
	ApkUiManagerRuntime,
	type ApkAppPluginHostContract,
} from "../../src/apppluginHost";

const contract = contractJson as ApkAppPluginHostContract;

describe("APK native density and transform integration", () => {
	it("rounds logical frames on the physical density grid and attaches the Android pivot matrix", () => {
		const ui = new ApkUiManagerRuntime(contract, 1);
		ui.createView(2, "RCTView", 1, {
			backgroundColor: 0xff000000,
			transform: [{ rotate: "90deg" }],
		});
		ui.setChildren(1, [2]);
		const native = new ApkNativeViewHierarchyRuntime(1, 3).rebuild(
			ui.snapshot(),
			[
				{ tag: 1, box: { x: 0, y: 0, width: 100, height: 100 } },
				{ tag: 2, box: { x: 0.2, y: 0.2, width: 10, height: 20 } },
			],
			ui.operations(),
		);
		const box = native.layouts.find(entry => entry.tag === 2)?.box;
		expect(box).toMatchObject({
			x: 1 / 3,
			y: 1 / 3,
			width: 10,
			height: 20,
			transform: { a: 0, b: 1, c: -1, d: 0, tx: 15, ty: 5 },
		});
	});
});
