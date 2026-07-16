import type { Paragraph } from "canvaskit-wasm";

import type {
	ApkAndroidTextLayoutBackend,
	ApkAndroidTextLayoutLine,
	ApkAndroidTextLayoutRequest,
	ApkAndroidTextLayoutResult,
	ApkAndroidTextRun,
} from "./apkAndroidTextMeasureRuntime";

interface ParagraphHost {
	readonly ref: Paragraph;
	dispose(): void;
}

interface ParagraphBuilderHost {
	pushStyle(style: Readonly<Record<string, unknown>>): this;
	addText(text: string): this;
	pop(): this;
	build(): ParagraphHost;
	dispose(): void;
}

interface NumericEnumGroup {
	readonly [name: string]: number;
}

interface CanvasKitTextApi {
	ParagraphBuilder: {
		Make(style: Readonly<Record<string, unknown>>, fontManager: unknown): ParagraphBuilderHost;
	};
	FontMgr: {
		System(): unknown;
	};
	TextAlign: NumericEnumGroup;
	TextDirection: NumericEnumGroup;
	FontSlant: NumericEnumGroup;
}

function textApi(api: Readonly<Record<string, unknown>>): CanvasKitTextApi {
	for (const name of ["ParagraphBuilder", "FontMgr", "TextAlign", "TextDirection", "FontSlant"]) {
		if (typeof api[name] !== "object" || api[name] === null) {
			throw new Error(`CanvasKit-Text-API ${name} fehlt`);
		}
	}
	return api as unknown as CanvasKitTextApi;
}

function enumValue(group: NumericEnumGroup, name: string): number {
	const value = group[name];
	if (typeof value !== "number") throw new Error(`CanvasKit-Enumwert ${name} fehlt`);
	return value;
}

function paragraphStyle(
	api: CanvasKitTextApi,
	request: Readonly<ApkAndroidTextLayoutRequest>,
): Readonly<Record<string, unknown>> {
	const alignName = {
		left: "Left",
		right: "Right",
		center: "Center",
		justify: "Justify",
	}[request.textAlign];
	return {
		textAlign: enumValue(api.TextAlign, alignName),
		textDirection: enumValue(api.TextDirection, request.direction === "rtl" ? "RTL" : "LTR"),
		applyRoundingHack: false,
	};
}

function runStyle(api: CanvasKitTextApi, run: Readonly<ApkAndroidTextRun>): Readonly<Record<string, unknown>> {
	const result: Record<string, unknown> = {
		fontFamilies: [run.fontFamily],
		fontSize: run.fontSizePx,
		fontWeight: run.fontWeight,
		fontStyle: {
			weight: run.fontWeight,
			slant: enumValue(api.FontSlant, run.fontStyle === "italic" ? "Italic" : "Upright"),
		},
	};
	if (run.letterSpacingPx !== undefined) result.letterSpacing = run.letterSpacingPx;
	if (run.lineHeightPx !== undefined) {
		result.heightMultiplier = run.lineHeightPx / run.fontSizePx;
		result.halfLeading = true;
	}
	return result;
}

function buildParagraph(
	api: CanvasKitTextApi,
	fontManager: unknown,
	runs: readonly Readonly<ApkAndroidTextRun>[],
	style: Readonly<Record<string, unknown>>,
): ParagraphHost {
	const builder = api.ParagraphBuilder.Make(style, fontManager);
	try {
		for (const run of runs) {
			builder.pushStyle(runStyle(api, run));
			builder.addText(run.text);
			builder.pop();
		}
		return builder.build();
	} finally {
		builder.dispose();
	}
}

function finiteNonNegative(value: number, name: string): number {
	if (!Number.isFinite(value) || value < 0) throw new Error(`${name} muss eine nichtnegative endliche Zahl sein`);
	return value;
}

/**
 * Uses the already loaded CanvasKit/Roboto host for cross-platform shaping.
 * React-Native/Android measurement semantics remain in ApkAndroidTextMeasureRuntime.
 */
export function createApkCanvasKitTextLayoutBackend(
	canvasKitApi: Readonly<Record<string, unknown>>,
): ApkAndroidTextLayoutBackend {
	const api = textApi(canvasKitApi);
	const fontManager = api.FontMgr.System();

	return Object.freeze({
		intrinsicWidth(runs: readonly Readonly<ApkAndroidTextRun>[]): number {
			const paragraph = buildParagraph(api, fontManager, runs, {});
			try {
				paragraph.ref.layout(10_000_000);
				return finiteNonNegative(paragraph.ref.getMaxIntrinsicWidth(), "intrinsische Textbreite");
			} finally {
				paragraph.dispose();
			}
		},
		layout(request: Readonly<ApkAndroidTextLayoutRequest>): Readonly<ApkAndroidTextLayoutResult> {
			const width = finiteNonNegative(request.widthPx, "Text-Layoutbreite");
			const paragraph = buildParagraph(api, fontManager, request.runs, paragraphStyle(api, request));
			try {
				paragraph.ref.layout(width);
				const height = finiteNonNegative(paragraph.ref.getHeight(), "Text-Layouthöhe");
				const metrics = paragraph.ref.getLineMetrics();
				let accumulatedBottom = 0;
				const lines: ApkAndroidTextLayoutLine[] = metrics.map((line, index) => {
					accumulatedBottom += Math.max(0, line.height);
					return Object.freeze({
						width: finiteNonNegative(line.width, `Textzeile ${index} Breite`),
						bottom: index === metrics.length - 1 ? height : accumulatedBottom,
						hardBreak: line.isHardBreak,
					});
				});
				if (lines.length === 0) lines.push(Object.freeze({ width: 0, bottom: height, hardBreak: false }));
				return Object.freeze({ lines: Object.freeze(lines), height });
			} finally {
				paragraph.dispose();
			}
		},
	});
}
