import { MeasureMode } from "yoga-layout/sync";
import { describe, expect, it, vi } from "vitest";

import {
	ApkAndroidTextMeasureRuntime,
	type ApkAndroidTextLayoutBackend,
	type ApkUiManagerNodeSnapshot,
	type ApkYogaMeasureRequest,
} from "../../src/apppluginHost";

function node(
	tag: number,
	viewName: string,
	props: Readonly<Record<string, unknown>> = {},
	children: ApkUiManagerNodeSnapshot[] = [],
): ApkUiManagerNodeSnapshot {
	return { tag, viewName, rootTag: 1, props, children };
}

function request(
	textNode: ApkUiManagerNodeSnapshot,
	overrides: Partial<ApkYogaMeasureRequest> = {},
): ApkYogaMeasureRequest {
	return {
		node: textNode,
		text: "",
		width: 90,
		widthMode: MeasureMode.AtMost,
		height: 0,
		heightMode: MeasureMode.Undefined,
		...overrides,
	};
}

describe("APK Android text measurement runtime", () => {
	it("applies RN font scaling, line height and Android-11 width rounding", () => {
		const layout = vi.fn(() => ({ lines: [{ width: 45.2, bottom: 33 }], height: 33 }));
		const backend: ApkAndroidTextLayoutBackend = { intrinsicWidth: () => 45.2, layout };
		const textNode = node(2, "RCTText", {
			fontSize: 10,
			lineHeight: 11,
			allowFontScaling: false,
		}, [node(3, "RCTRawText", { text: "Roborock" })]);
		const runtime = new ApkAndroidTextMeasureRuntime({ density: 3, fontScale: 1.2, backend, androidApiLevel: 34 });

		expect(runtime.measure(request(textNode))).toEqual({ width: 46, height: 33 });
		expect(layout).toHaveBeenCalledWith(expect.objectContaining({
			widthPx: 46,
			includeFontPadding: true,
			runs: [expect.objectContaining({
				text: "Roborock",
				fontSizePx: 30,
				lineHeightPx: 33,
			})],
		}));
		expect(runtime.measure(request(textNode, {
			widthMode: MeasureMode.Exactly,
			height: 60,
			heightMode: MeasureMode.Exactly,
		}))).toEqual({ width: 90, height: 60 });
	});

	it("uses only the visible numberOfLines for measured width and height", () => {
		const backend: ApkAndroidTextLayoutBackend = {
			intrinsicWidth: () => 80,
			layout: () => ({
				lines: [
					{ width: 40, bottom: 20 },
					{ width: 70, bottom: 40 },
				],
				height: 40,
			}),
		};
		const textNode = node(2, "RCTText", { numberOfLines: 1 }, [
			node(3, "RCTRawText", { text: "Erste Zeile\nZweite Zeile" }),
		]);

		expect(new ApkAndroidTextMeasureRuntime({ density: 1, fontScale: 1, backend })
			.measure(request(textNode, { width: 100 }))).toEqual({ width: 40, height: 20 });
	});

	it("inherits nested text attributes and transforms the original raw text", () => {
		const layout = vi.fn(() => ({ lines: [{ width: 50, bottom: 20 }], height: 20 }));
		const backend: ApkAndroidTextLayoutBackend = { intrinsicWidth: () => 50, layout };
		const textNode = node(2, "RCTText", { fontSize: 12, allowFontScaling: false }, [
			node(3, "RCTText", { fontWeight: "600", textTransform: "uppercase" }, [
				node(4, "RCTRawText", { text: "Räume" }),
			]),
		]);

		new ApkAndroidTextMeasureRuntime({ density: 3, fontScale: 1, backend }).measure(request(textNode));
		expect(layout).toHaveBeenCalledWith(expect.objectContaining({
			runs: [expect.objectContaining({ text: "RÄUME", fontSizePx: 36, fontWeight: 600 })],
		}));
	});

	it("repeats layout while adjustsFontSizeToFit exceeds the APK limits", () => {
		const sizes: number[] = [];
		const backend: ApkAndroidTextLayoutBackend = {
			intrinsicWidth: () => 100,
			layout: layoutRequest => {
				const size = layoutRequest.runs[0].fontSizePx;
				sizes.push(size);
				return size > 24
					? { lines: [{ width: 60, bottom: 30 }, { width: 40, bottom: 60 }], height: 60 }
					: { lines: [{ width: 55, bottom: 28 }], height: 28 };
			},
		};
		const textNode = node(2, "RCTText", {
			fontSize: 10,
			allowFontScaling: false,
			adjustsFontSizeToFit: true,
			numberOfLines: 1,
			minimumFontScale: 0.5,
		}, [node(3, "RCTRawText", { text: "Langer Text" })]);

		expect(new ApkAndroidTextMeasureRuntime({ density: 3, fontScale: 1, backend })
			.measure(request(textNode, { width: 60 }))).toEqual({ width: 55, height: 28 });
		expect(sizes).toEqual([30, 27, 24]);
	});

	it("keeps inline native views as an explicit APK span gate", () => {
		const backend: ApkAndroidTextLayoutBackend = {
			intrinsicWidth: () => 0,
			layout: () => ({ lines: [{ width: 0, bottom: 0 }], height: 0 }),
		};
		const textNode = node(2, "RCTText", {}, [node(3, "RCTImageView")]);

		expect(() => new ApkAndroidTextMeasureRuntime({ density: 1, fontScale: 1, backend })
			.measure(request(textNode))).toThrow(/Inline-View/u);
	});
});
