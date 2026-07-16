import { MeasureMode } from "yoga-layout/sync";

import type { ApkUiManagerNodeSnapshot } from "./apkUiManagerRuntime";
import type { ApkYogaMeasureNode, ApkYogaMeasureRequest, ApkYogaMeasureSize } from "./apkYogaLayoutRuntime";

export const APK_ANDROID_TEXT_MEASURE_PROFILE = Object.freeze({
	reactNativeVersion: "0.73.6",
	defaultFontSizeSp: 14,
	defaultFontFamily: "Roboto",
	minimumAutoFitSizeDip: 4,
	widthCeilingFromAndroidApi: 30,
} as const);

export interface ApkAndroidTextRun {
	text: string;
	fontFamily: string;
	fontSizePx: number;
	fontWeight: number;
	fontStyle: "normal" | "italic";
	letterSpacingPx?: number;
	lineHeightPx?: number;
}

export interface ApkAndroidTextLayoutLine {
	width: number;
	/** Bottom edge in physical Android pixels, relative to the paragraph top. */
	bottom: number;
	hardBreak?: boolean;
}

export interface ApkAndroidTextLayoutRequest {
	runs: readonly Readonly<ApkAndroidTextRun>[];
	widthPx: number;
	includeFontPadding: boolean;
	textAlign: "left" | "right" | "center" | "justify";
	direction: "ltr" | "rtl";
}

export interface ApkAndroidTextLayoutResult {
	lines: readonly Readonly<ApkAndroidTextLayoutLine>[];
	height: number;
}

/**
 * Cross-platform shaping boundary. The runtime around it reproduces the APK's
 * ReactTextShadowNode rules; a backend supplies platform-independent glyph and
 * line metrics in physical Android pixels.
 */
export interface ApkAndroidTextLayoutBackend {
	intrinsicWidth(runs: readonly Readonly<ApkAndroidTextRun>[]): number;
	layout(request: Readonly<ApkAndroidTextLayoutRequest>): Readonly<ApkAndroidTextLayoutResult>;
}

export interface ApkAndroidTextMeasureRuntimeOptions {
	density: number;
	fontScale: number;
	backend: ApkAndroidTextLayoutBackend;
	androidApiLevel?: number;
	direction?: "ltr" | "rtl";
}

interface TextAttributes {
	allowFontScaling: boolean;
	fontSizeDip: number;
	fontFamily: string;
	fontWeight: number;
	fontStyle: "normal" | "italic";
	letterSpacingDip?: number;
	lineHeightDip?: number;
	maxFontSizeMultiplier?: number;
	textTransform: "none" | "uppercase" | "lowercase" | "capitalize";
}

function finiteNumber(value: unknown, name: string): number | undefined {
	if (value === undefined || value === null) return undefined;
	if (typeof value !== "number" || !Number.isFinite(value)) throw new Error(`${name} muss eine endliche Zahl sein`);
	return value;
}

function optionalBoolean(value: unknown, name: string): boolean | undefined {
	if (value === undefined || value === null) return undefined;
	if (typeof value !== "boolean") throw new Error(`${name} muss boolesch sein`);
	return value;
}

function positiveNumber(value: unknown, name: string): number | undefined {
	const result = finiteNumber(value, name);
	if (result !== undefined && result <= 0) throw new Error(`${name} muss positiv sein`);
	return result;
}

function fontWeight(value: unknown, inherited: number): number {
	if (value === undefined || value === null || value === "undefined") return inherited;
	if (value === "normal") return 400;
	if (value === "bold") return 700;
	const numeric = typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;
	if (!Number.isInteger(numeric) || numeric < 100 || numeric > 900 || numeric % 100 !== 0) {
		throw new Error(`fontWeight besitzt keinen React-Native-Wert: ${String(value)}`);
	}
	return numeric;
}

function fontStyle(value: unknown, inherited: TextAttributes["fontStyle"]): TextAttributes["fontStyle"] {
	if (value === undefined || value === null || value === "normal") return inherited;
	if (value === "italic") return value;
	throw new Error(`fontStyle besitzt keinen React-Native-Wert: ${String(value)}`);
}

function textTransform(value: unknown, inherited: TextAttributes["textTransform"]): TextAttributes["textTransform"] {
	if (value === undefined || value === null || value === "unset") return inherited;
	if (["none", "uppercase", "lowercase", "capitalize"].includes(String(value))) {
		return value as TextAttributes["textTransform"];
	}
	throw new Error(`textTransform besitzt keinen React-Native-Wert: ${String(value)}`);
}

function applyTextTransform(text: string, transform: TextAttributes["textTransform"]): string {
	switch (transform) {
		case "uppercase": return text.toLocaleUpperCase();
		case "lowercase": return text.toLocaleLowerCase();
		case "capitalize": return text.replace(/(^|\s)(\p{L})/gu, (_match, prefix: string, letter: string) =>
			`${prefix}${letter.toLocaleUpperCase()}`);
		default: return text;
	}
}

function inheritAttributes(parent: Readonly<TextAttributes>, props: Readonly<Record<string, unknown>>): TextAttributes {
	const allowFontScaling = optionalBoolean(props.allowFontScaling, "allowFontScaling") ?? parent.allowFontScaling;
	const maximum = finiteNumber(props.maxFontSizeMultiplier, "maxFontSizeMultiplier");
	if (maximum !== undefined && maximum !== 0 && maximum < 1) {
		throw new Error("maxFontSizeMultiplier muss 0 oder mindestens 1 sein");
	}
	const family = props.fontFamily;
	if (family !== undefined && family !== null && typeof family !== "string") {
		throw new Error("fontFamily muss eine Zeichenfolge sein");
	}
	return {
		allowFontScaling,
		fontSizeDip: positiveNumber(props.fontSize, "fontSize") ?? parent.fontSizeDip,
		fontFamily: typeof family === "string" && family.length > 0 ? family : parent.fontFamily,
		fontWeight: fontWeight(props.fontWeight, parent.fontWeight),
		fontStyle: fontStyle(props.fontStyle, parent.fontStyle),
		letterSpacingDip: finiteNumber(props.letterSpacing, "letterSpacing") ?? parent.letterSpacingDip,
		lineHeightDip: positiveNumber(props.lineHeight, "lineHeight") ?? parent.lineHeightDip,
		maxFontSizeMultiplier: maximum ?? parent.maxFontSizeMultiplier,
		textTransform: textTransform(props.textTransform, parent.textTransform),
	};
}

function physicalTextValue(
	valueDip: number,
	attributes: Readonly<TextAttributes>,
	density: number,
	fontScale: number,
): number {
	if (!attributes.allowFontScaling) return valueDip * density;
	let effectiveFontScale = fontScale;
	const maximum = attributes.maxFontSizeMultiplier;
	if (maximum !== undefined && maximum >= 1 && maximum < effectiveFontScale) effectiveFontScale = maximum;
	return valueDip * density * effectiveFontScale;
}

function createRun(
	text: string,
	attributes: Readonly<TextAttributes>,
	density: number,
	fontScale: number,
): ApkAndroidTextRun {
	return {
		text: applyTextTransform(text, attributes.textTransform),
		fontFamily: attributes.fontFamily,
		fontSizePx: Math.ceil(physicalTextValue(attributes.fontSizeDip, attributes, density, fontScale)),
		fontWeight: attributes.fontWeight,
		fontStyle: attributes.fontStyle,
		letterSpacingPx: attributes.letterSpacingDip === undefined
			? undefined
			: physicalTextValue(attributes.letterSpacingDip, attributes, density, fontScale),
		lineHeightPx: attributes.lineHeightDip === undefined
			? undefined
			: physicalTextValue(attributes.lineHeightDip, attributes, density, fontScale),
	};
}

function collectRuns(
	node: ApkUiManagerNodeSnapshot,
	attributes: Readonly<TextAttributes>,
	density: number,
	fontScale: number,
	result: ApkAndroidTextRun[],
): void {
	if (node.viewName === "RCTRawText") {
		const text = node.props.text;
		if (typeof text !== "string") throw new Error(`RCTRawText ${node.tag} besitzt keinen Text`);
		result.push(createRun(text, attributes, density, fontScale));
		return;
	}
	if (node.viewName !== "RCTText" && node.viewName !== "RCTVirtualText") {
		throw new Error(`Inline-View ${node.viewName} in RCTText ${node.tag} benötigt den noch nicht portierten APK-Spanpfad`);
	}
	const inherited = inheritAttributes(attributes, node.props);
	for (const child of node.children) collectRuns(child, inherited, density, fontScale, result);
}

function textAlignment(value: unknown): ApkAndroidTextLayoutRequest["textAlign"] {
	if (value === undefined || value === null || value === "auto" || value === "left") return "left";
	if (value === "right" || value === "center" || value === "justify") return value;
	throw new Error(`textAlign besitzt keinen React-Native-Wert: ${String(value)}`);
}

function maximumLines(value: unknown): number | undefined {
	if (value === undefined || value === null || value === 0) return undefined;
	if (!Number.isSafeInteger(value) || (value as number) < 1) throw new Error("numberOfLines muss eine positive ganze Zahl sein");
	return value as number;
}

function scaleRuns(
	runs: readonly Readonly<ApkAndroidTextRun>[],
	ratio: number,
	minimumFontSizePx: number,
): ApkAndroidTextRun[] {
	return runs.map(run => ({
		...run,
		fontSizePx: Math.max(run.fontSizePx * ratio, minimumFontSizePx),
		letterSpacingPx: run.letterSpacingPx === undefined ? undefined : run.letterSpacingPx * ratio,
		lineHeightPx: run.lineHeightPx === undefined ? undefined : run.lineHeightPx * ratio,
	}));
}

function requireLayout(result: Readonly<ApkAndroidTextLayoutResult>): Readonly<ApkAndroidTextLayoutResult> {
	if (!Number.isFinite(result.height) || result.height < 0) throw new Error("Text-Backend lieferte eine ungültige Höhe");
	if (result.lines.length === 0) throw new Error("Text-Backend muss mindestens eine Layoutzeile liefern");
	let previousBottom = 0;
	for (const line of result.lines) {
		if (!Number.isFinite(line.width) || line.width < 0 || !Number.isFinite(line.bottom) || line.bottom < previousBottom) {
			throw new Error("Text-Backend lieferte ungültige Zeilenmetriken");
		}
		previousBottom = line.bottom;
	}
	return result;
}

/** Port of the APK's RN-0.73.6 ReactTextShadowNode measure function. */
export class ApkAndroidTextMeasureRuntime {
	readonly #density: number;
	readonly #fontScale: number;
	readonly #androidApiLevel: number;
	readonly #direction: "ltr" | "rtl";

	public constructor(private readonly options: Readonly<ApkAndroidTextMeasureRuntimeOptions>) {
		this.#density = positiveNumber(options.density, "density") as number;
		this.#fontScale = positiveNumber(options.fontScale, "fontScale") as number;
		this.#androidApiLevel = finiteNumber(options.androidApiLevel ?? 34, "androidApiLevel") as number;
		if (!Number.isSafeInteger(this.#androidApiLevel) || this.#androidApiLevel < 24) {
			throw new Error("androidApiLevel muss mindestens 24 sein");
		}
		this.#direction = options.direction ?? "ltr";
	}

	public readonly measureNode: ApkYogaMeasureNode = (request): Readonly<ApkYogaMeasureSize> =>
		this.measure(request);

	public measure(request: Readonly<ApkYogaMeasureRequest>): Readonly<ApkYogaMeasureSize> {
		if (request.node.viewName !== "RCTText") throw new Error("APK-Textmessung erwartet einen RCTText-Knoten");
		const baseAttributes: TextAttributes = {
			allowFontScaling: true,
			fontSizeDip: APK_ANDROID_TEXT_MEASURE_PROFILE.defaultFontSizeSp,
			fontFamily: APK_ANDROID_TEXT_MEASURE_PROFILE.defaultFontFamily,
			fontWeight: 400,
			fontStyle: "normal",
			textTransform: "none",
		};
		const runs: ApkAndroidTextRun[] = [];
		collectRuns(request.node, baseAttributes, this.#density, this.#fontScale, runs);
		if (runs.length === 0) runs.push(createRun("", inheritAttributes(baseAttributes, request.node.props), this.#density, this.#fontScale));
		const rootAttributes = inheritAttributes(baseAttributes, request.node.props);
		const props = request.node.props;
		const includeFontPadding = optionalBoolean(props.includeFontPadding, "includeFontPadding") ?? true;
		const maxLines = maximumLines(props.numberOfLines);
		const alignment = textAlignment(props.textAlign);
		const intrinsicWidth = this.options.backend.intrinsicWidth(runs);
		if (!Number.isFinite(intrinsicWidth) || intrinsicWidth < 0) {
			throw new Error("Text-Backend lieferte eine ungültige intrinsische Breite");
		}
		const unconstrained = request.widthMode === MeasureMode.Undefined || request.width < 0;
		const layoutWidth = Math.max(0, Math.ceil(unconstrained || intrinsicWidth <= request.width
			? intrinsicWidth
			: request.width));
		const layoutRequest = (layoutRuns: readonly Readonly<ApkAndroidTextRun>[]) => requireLayout(
			this.options.backend.layout({
				runs: layoutRuns,
				widthPx: layoutWidth,
				includeFontPadding,
				textAlign: alignment,
				direction: this.#direction,
			}),
		);
		let effectiveRuns: readonly Readonly<ApkAndroidTextRun>[] = runs;
		let layout = layoutRequest(effectiveRuns);
		const adjustsFontSize = optionalBoolean(props.adjustsFontSizeToFit, "adjustsFontSizeToFit") ?? false;
		if (adjustsFontSize) {
			const initialSize = Math.ceil(physicalTextValue(
				rootAttributes.fontSizeDip,
				rootAttributes,
				this.#density,
				this.#fontScale,
			));
			const minimumScale = finiteNumber(props.minimumFontScale, "minimumFontScale") ?? 0;
			if (minimumScale < 0 || minimumScale > 1) throw new Error("minimumFontScale muss zwischen 0 und 1 liegen");
			const minimumSize = Math.max(
				initialSize * minimumScale,
				APK_ANDROID_TEXT_MEASURE_PROFILE.minimumAutoFitSizeDip * this.#density,
			);
			const decrement = Math.max(1, Math.trunc(this.#density));
			let currentSize = initialSize;
			while (currentSize > minimumSize && (
				maxLines !== undefined && layout.lines.length > maxLines
				|| request.heightMode !== MeasureMode.Undefined && layout.height > request.height
			)) {
				currentSize = Math.max(minimumSize, currentSize - decrement);
				effectiveRuns = scaleRuns(runs, currentSize / initialSize, minimumSize);
				layout = layoutRequest(effectiveRuns);
			}
		}
		const lineCount = maxLines === undefined ? layout.lines.length : Math.min(maxLines, layout.lines.length);
		const visibleLines = layout.lines.slice(0, lineCount);
		let measuredWidth: number;
		if (request.widthMode === MeasureMode.Exactly) measuredWidth = request.width;
		else {
			measuredWidth = Math.max(...visibleLines.map(line => line.width));
			if (request.widthMode === MeasureMode.AtMost) measuredWidth = Math.min(measuredWidth, request.width);
		}
		if (this.#androidApiLevel >= APK_ANDROID_TEXT_MEASURE_PROFILE.widthCeilingFromAndroidApi) {
			measuredWidth = Math.ceil(measuredWidth);
		}
		let measuredHeight = request.heightMode === MeasureMode.Exactly
			? request.height
			: visibleLines[visibleLines.length - 1].bottom;
		if (request.heightMode === MeasureMode.AtMost) measuredHeight = Math.min(measuredHeight, request.height);
		return Object.freeze({ width: measuredWidth, height: measuredHeight });
	}
}
