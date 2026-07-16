import { describe, expect, it } from "vitest";

import {
	findApkInteractiveSurfaceRoot,
	selectApkServedSurfaceRoot,
} from "../../src/apppluginHost/apkInteractiveSurfaceRoot";
import type { ApkNativeViewHierarchySnapshot } from "../../src/apppluginHost/apkNativeViewHierarchyRuntime";

const responderProps = {
	overflow: "hidden",
	onStartShouldSetResponder: true,
	onMoveShouldSetResponder: true,
	onResponderGrant: true,
	onResponderMove: true,
	onResponderRelease: true,
};

describe("APK interactive surface root", () => {
	it("selects the largest clipped APK responder without knowing a map tag", () => {
		const hierarchy: ApkNativeViewHierarchySnapshot = {
			root: {
				tag: 1,
				viewName: "Root",
				rootTag: 1,
				props: {},
				children: [
					{ tag: 7, viewName: "RCTView", rootTag: 1, props: responderProps, children: [] },
					{ tag: 73, viewName: "RCTView", rootTag: 1, props: responderProps, children: [] },
				],
			},
			layouts: [
				{ tag: 1, box: { x: 0, y: 0, width: 360, height: 800 } },
				{ tag: 7, box: { x: 0, y: 0, width: 48, height: 48 } },
				{ tag: 73, box: { x: 0, y: 0, width: 360, height: 800 } },
			],
		};

		expect(findApkInteractiveSurfaceRoot(hierarchy)).toEqual({
			tag: 73,
			viewName: "RCTView",
			width: 360,
			height: 800,
			area: 288_000,
			responderContractCount: 5,
		});
	});

	it("fails closed instead of inventing a host-owned map fallback", () => {
		const hierarchy: ApkNativeViewHierarchySnapshot = {
			root: { tag: 1, viewName: "Root", rootTag: 1, props: {}, children: [] },
			layouts: [{ tag: 1, box: { x: 0, y: 0, width: 360, height: 800 } }],
		};

		expect(() => findApkInteractiveSurfaceRoot(hierarchy)).toThrow(/keine native interaktive Hauptfläche/u);
	});

	it("lets an explicit full-root request override automatic map-surface discovery", () => {
		const hierarchy: ApkNativeViewHierarchySnapshot = {
			root: {
				tag: 1,
				viewName: "Root",
				rootTag: 1,
				props: {},
				children: [{ tag: 73, viewName: "RCTView", rootTag: 1, props: responderProps, children: [] }],
			},
			layouts: [
				{ tag: 1, box: { x: 0, y: 0, width: 360, height: 800 } },
				{ tag: 73, box: { x: 0, y: 0, width: 300, height: 320 } },
			],
		};

		expect(selectApkServedSurfaceRoot(hierarchy, {
			fullRootTag: 1,
			fallbackWidth: 360,
			fallbackHeight: 800,
		})).toEqual({
			tag: 1,
			viewName: "Root",
			width: 360,
			height: 800,
			area: 288_000,
			responderContractCount: 0,
		});
	});
});