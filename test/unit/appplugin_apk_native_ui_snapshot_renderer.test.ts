import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { createCanvas, loadImage } from "@napi-rs/canvas";
import { describe, expect, it } from "vitest";

import {
	apkArgbToCss,
	exportApkNativeUiSnapshotPng,
	renderApkNativeUiSnapshotToSvg,
} from "../../src/apppluginHost/apkNativeUiSnapshotRenderer";
import type { ApkNativeViewHierarchySnapshot } from "../../src/apppluginHost/apkNativeViewHierarchyRuntime";
import type { ApkUiManagerNodeSnapshot } from "../../src/apppluginHost/apkUiManagerRuntime";

const pathNode: ApkUiManagerNodeSnapshot = {
	tag: 5,
	viewName: "RNSVGPath",
	rootTag: 1,
	props: { fill: { type: 0, payload: -65536 }, d: "M0 0 H10 V10 H0 Z" },
	children: [],
};
const groupNode: ApkUiManagerNodeSnapshot = {
	tag: 4,
	viewName: "RNSVGGroup",
	rootTag: 1,
	props: {},
	children: [pathNode],
};
const svgShadow: ApkUiManagerNodeSnapshot = {
	tag: 3,
	viewName: "RNSVGSvgViewAndroid",
	rootTag: 1,
	props: { minX: 0, minY: 0, vbWidth: 10, vbHeight: 10, align: "xMidYMid", meetOrSlice: 0 },
	children: [groupNode],
};
const shadowRoot: ApkUiManagerNodeSnapshot = {
	tag: 1,
	viewName: "Root",
	rootTag: 1,
	props: {},
	children: [{
		tag: 2,
		viewName: "RCTView",
		rootTag: 1,
		props: { overflow: "hidden" },
		children: [svgShadow],
	}],
};
const nativeHierarchy: ApkNativeViewHierarchySnapshot = {
	root: {
		tag: 1,
		viewName: "Root",
		rootTag: 1,
		props: {},
		children: [{
			tag: 2,
			viewName: "RCTView",
			rootTag: 1,
			props: { overflow: "hidden" },
			children: [{ ...svgShadow, children: [] }],
		}],
	},
	layouts: [
		{ tag: 1, box: { x: 0, y: 0, width: 20, height: 20 } },
		{ tag: 2, box: { x: 0, y: 0, width: 20, height: 20 } },
		{ tag: 3, box: { x: 5, y: 5, width: 10, height: 10 } },
	],
	collapsedTags: [],
	virtualTags: [4, 5],
};

describe("APK-native UI snapshot renderer", () => {
	it("preserves the AppPlugin SVG path behind the native SvgView boundary", () => {
		const result = renderApkNativeUiSnapshotToSvg({ shadowRoot, nativeHierarchy, width: 20, height: 20 });

		expect(result.svg).toContain('viewBox="0 0 10 10"');
		expect(result.svg).toContain('d="M0 0 H10 V10 H0 Z"');
		expect(result.svg).toContain('fill="rgb(255 0 0)"');
		expect(result.diagnostics).toMatchObject({ svgViews: 1, svgGroups: 1, svgPaths: 1 });
	});

	it("preserves AppPlugin split lines and draggable endpoint circles", () => {
		const line = {
			tag: 6,
			viewName: "RNSVGLine",
			rootTag: 1,
			props: {
				x1: 2,
				y1: 3,
				x2: 8,
				y2: 9,
				stroke: { type: 0, payload: -65536 },
				strokeWidth: 1.5,
				strokeDasharray: ["0.5", "0.5"],
			},
			children: [],
		} satisfies ApkUiManagerNodeSnapshot;
		const circle = {
			tag: 7,
			viewName: "RNSVGCircle",
			rootTag: 1,
			props: {
				cx: 2,
				cy: 3,
				r: 4,
				fill: { type: 0, payload: -16745729 },
				stroke: { type: 0, payload: -1 },
				strokeWidth: 1.5,
			},
			children: [],
		} satisfies ApkUiManagerNodeSnapshot;
		const splitSvg = {
			...svgShadow,
			children: [{ ...groupNode, children: [line, circle] }],
		};
		const splitRoot = {
			...shadowRoot,
			children: [{ ...shadowRoot.children[0], children: [splitSvg] }],
		};
		const splitHierarchy: ApkNativeViewHierarchySnapshot = {
			...nativeHierarchy,
			root: {
				...nativeHierarchy.root,
				children: [{ ...nativeHierarchy.root.children[0], children: [{ ...splitSvg, children: [] }] }],
			},
			virtualTags: [4, 6, 7],
		};

		const result = renderApkNativeUiSnapshotToSvg({
			shadowRoot: splitRoot,
			nativeHierarchy: splitHierarchy,
			width: 20,
			height: 20,
		});

		expect(result.svg).toContain('data-react-tag="6" x1="2" y1="3" x2="8" y2="9"');
		expect(result.svg).toContain('stroke-dasharray="0.5 0.5"');
		expect(result.svg).toContain('data-react-tag="7" cx="2" cy="3" r="4"');
		expect(result.svg).toContain('fill="rgb(0 122 255)"');
		expect(result.diagnostics).toMatchObject({ svgLines: 1, svgCircles: 1 });
	});
	it("crops an unchanged AppPlugin native subtree without rebuilding its children", () => {
		const hierarchyWithOffset: ApkNativeViewHierarchySnapshot = {
			...nativeHierarchy,
			layouts: nativeHierarchy.layouts.map(entry =>
				entry.tag === 2
					? { ...entry, box: { ...entry.box, x: 2, y: 3, width: 16, height: 14 } }
					: entry,
			),
		};
		const result = renderApkNativeUiSnapshotToSvg({
			shadowRoot,
			nativeHierarchy: hierarchyWithOffset,
			width: 160,
			height: 140,
			rootTag: 2,
		});

		expect(result.svg).toContain('width="160" height="140" viewBox="2 3 16 14"');
		expect(result.svg).toContain('data-react-tag="2"');
		expect(result.svg).not.toContain('data-react-tag="1"');
		expect(result.svg).toContain('data-react-tag="5"');
	});

	it("uses the AppPlugin zIndex when composing robot and station", () => {
		const dock = {
			tag: 7,
			viewName: "RCTView",
			rootTag: 1,
			props: { zIndex: 400, backgroundColor: -16776961 },
			children: [],
		} satisfies ApkUiManagerNodeSnapshot;
		const robot = {
			tag: 9,
			viewName: "RCTView",
			rootTag: 1,
			props: { zIndex: 490, backgroundColor: -65536 },
			children: [],
		} satisfies ApkUiManagerNodeSnapshot;
		const root = {
			tag: 1,
			viewName: "Root",
			rootTag: 1,
			props: {},
			children: [robot, dock],
		} satisfies ApkUiManagerNodeSnapshot;
		const hierarchy: ApkNativeViewHierarchySnapshot = {
			root,
			layouts: [
				{ tag: 1, box: { x: 0, y: 0, width: 20, height: 20 } },
				{ tag: 7, box: { x: 4, y: 4, width: 12, height: 12 } },
				{ tag: 9, box: { x: 4, y: 4, width: 12, height: 12 } },
			],
			collapsedTags: [],
			virtualTags: [],
		};
		const result = renderApkNativeUiSnapshotToSvg({
			shadowRoot: root,
			nativeHierarchy: hierarchy,
			width: 20,
			height: 20,
		});

		expect(result.svg.indexOf('data-react-tag="7"')).toBeLessThan(
			result.svg.indexOf('data-react-tag="9"'),
		);
	});

	it("rasterizes the unchanged virtual SVG tree to PNG", async () => {
		const directory = fs.mkdtempSync(path.join(os.tmpdir(), "apk-ui-snapshot-"));
		const outputPath = path.join(directory, "snapshot.png");

		const artifact = await exportApkNativeUiSnapshotPng(
			{ shadowRoot, nativeHierarchy, width: 20, height: 20 },
			outputPath,
		);

		expect(fs.readFileSync(outputPath).subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
		expect(artifact.bytes).toBeGreaterThan(50);
		expect(artifact.contentBounds).toEqual({ x: 5, y: 5, width: 10, height: 10 });
		expect(fs.existsSync(artifact.svgOutputPath)).toBe(true);
		const image = await loadImage(outputPath);
		const canvas = createCanvas(20, 20);
		const context = canvas.getContext("2d");
		context.drawImage(image, 0, 0);
		expect([...context.getImageData(10, 10, 1, 1).data]).toEqual([255, 0, 0, 255]);
	});

	it("converts signed Android ARGB without discarding alpha", () => {
		expect(apkArgbToCss(-65536)).toBe("rgb(255 0 0)");
		expect(apkArgbToCss(0x80ff0000)).toBe("rgb(255 0 0 / 0.501961)");
		expect(apkArgbToCss(0x00ffffff)).toBe("none");
	});
});
