import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createCanvas, loadImage } from "@napi-rs/canvas";

import type { ApkNativeViewHierarchySnapshot } from "./apkNativeViewHierarchyRuntime";
import type { ApkUiManagerNodeSnapshot } from "./apkUiManagerRuntime";

interface RenderDiagnostics {
	renderedNativeViews: number;
	svgViews: number;
	svgDefinitions: number;
	svgLinearGradients: number;
	svgRadialGradients: number;
	svgGroups: number;
	svgPaths: number;
	svgLines: number;
	svgCircles: number;
	svgRects: number;
	embeddedImages: number;
	textNodes: number;
}

export interface ApkNativeUiSnapshotRenderOptions {
	shadowRoot: ApkUiManagerNodeSnapshot;
	nativeHierarchy: Readonly<ApkNativeViewHierarchySnapshot>;
	width: number;
	height: number;
	/** Optional native React tag whose unchanged AppPlugin subtree becomes the output viewport. */
	rootTag?: number;
	/** Optional host viewport crop; rendering and geometry remain AppPlugin-owned. */
	viewport?: Readonly<{ x: number; y: number; width: number; height: number }>;
	/** Android's ordered system-font fallback chain used by CanvasKit and native text. */
	fontPaths?: readonly string[];
	/** @deprecated Use fontPaths. Kept for existing proof scripts. */
	fontPath?: string;
	direction?: "ltr" | "rtl";
}

export interface ApkNativeUiSvgArtifact {
	svg: string;
	diagnostics: Readonly<RenderDiagnostics>;
}

export interface ApkNativeUiPngArtifact extends Readonly<RenderDiagnostics> {
	outputPath: string;
	svgOutputPath: string;
	width: number;
	height: number;
	bytes: number;
	sha256: string;
	contentBounds?: Readonly<{ x: number; y: number; width: number; height: number }>;
}

interface NativeLayoutBox {
	x: number;
	y: number;
	width: number;
	height: number;
	transform?: Readonly<{
		a: number;
		b: number;
		c: number;
		d: number;
		tx: number;
		ty: number;
	}>;
}

interface MutableDiagnostics extends RenderDiagnostics {}

function finitePositive(value: number, name: string): number {
	if (!Number.isFinite(value) || value <= 0) throw new Error(`${name} muss positiv und endlich sein`);
	return value;
}

function finite(value: unknown, fallback = 0): number {
	return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function escapeXml(value: unknown): string {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

/** Converts React Native's signed Android ARGB integer to a CSS color. */
export function apkArgbToCss(value: unknown): string | undefined {
	if (typeof value !== "number" || !Number.isInteger(value)) return undefined;
	const unsigned = value >>> 0;
	const alpha = (unsigned >>> 24) / 255;
	const red = (unsigned >>> 16) & 0xff;
	const green = (unsigned >>> 8) & 0xff;
	const blue = unsigned & 0xff;
	if (alpha === 0) return "none";
	if (alpha === 1) return `rgb(${red} ${green} ${blue})`;
	return `rgb(${red} ${green} ${blue} / ${Number(alpha.toFixed(6))})`;
}

function indexTree(root: ApkUiManagerNodeSnapshot): Map<number, ApkUiManagerNodeSnapshot> {
	const result = new Map<number, ApkUiManagerNodeSnapshot>();
	const visit = (node: ApkUiManagerNodeSnapshot): void => {
		if (result.has(node.tag)) throw new Error(`React-Tag ${node.tag} ist im Shadow Tree doppelt`);
		result.set(node.tag, node);
		for (const child of node.children) visit(child);
	};
	visit(root);
	return result;
}

function indexLayouts(
	hierarchy: Readonly<ApkNativeViewHierarchySnapshot>,
): Map<number, Readonly<NativeLayoutBox>> {
	const result = new Map<number, Readonly<NativeLayoutBox>>();
	for (const entry of hierarchy.layouts) {
		if (result.has(entry.tag)) throw new Error(`Native Layout für React-Tag ${entry.tag} ist doppelt`);
		result.set(entry.tag, entry.box);
	}
	return result;
}

function findNativeNode(
	root: ApkUiManagerNodeSnapshot,
	tag: number,
): ApkUiManagerNodeSnapshot | undefined {
	if (root.tag === tag) return root;
	for (const child of root.children) {
		const match = findNativeNode(child, tag);
		if (match) return match;
	}
	return undefined;
}

function dataUri(uri: unknown): string | undefined {
	if (typeof uri !== "string" || uri.length === 0) return undefined;
	if (uri.startsWith("data:")) return uri;
	if (!uri.startsWith("file:")) {
		throw new Error(`Der APK-Snapshot rendert keine nichtlokale Bildquelle: ${uri}`);
	}
	const filePath = fileURLToPath(uri);
	const extension = path.extname(filePath).toLowerCase();
	const mime = new Map([
		[".png", "image/png"],
		[".jpg", "image/jpeg"],
		[".jpeg", "image/jpeg"],
		[".webp", "image/webp"],
		[".gif", "image/gif"],
		[".svg", "image/svg+xml"],
	]).get(extension);
	if (!mime) throw new Error(`Unbekanntes APK-Bildformat: ${filePath}`);
	return `data:${mime};base64,${fs.readFileSync(filePath).toString("base64")}`;
}

function imageUri(props: Readonly<Record<string, unknown>>): string | undefined {
	const sources = props.src;
	if (!Array.isArray(sources)) return undefined;
	for (const source of sources) {
		if (source && typeof source === "object" && !Array.isArray(source)) {
			const uri = dataUri((source as Readonly<Record<string, unknown>>).uri);
			if (uri) return uri;
		}
	}
	return undefined;
}

function rawText(node: ApkUiManagerNodeSnapshot): string {
	if (node.viewName === "RCTRawText") return typeof node.props.text === "string" ? node.props.text : "";
	return node.children.map(rawText).join("");
}

/** Android TextDirectionHeuristics.FIRSTSTRONG_LTR used by ReactTextView. */
function apkTextDirection(text: string, fallback: "ltr" | "rtl"): "ltr" | "rtl" {
	for (const character of text) {
		if (/[\u0590-\u05ff\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u.test(character)) return "rtl";
		if (/\p{L}|\p{N}/u.test(character)) return "ltr";
	}
	return fallback;
}

function nativeChildren(node: ApkUiManagerNodeSnapshot): ApkUiManagerNodeSnapshot[] {
	return node.children
		.map((child, index) => ({ child, index, zIndex: finite(child.props.zIndex) }))
		.sort((left, right) => left.zIndex - right.zIndex || left.index - right.index)
		.map(entry => entry.child);
}

function transformAttribute(layout: Readonly<NativeLayoutBox>): string {
	const transform = layout.transform;
	if (!transform) return `translate(${layout.x} ${layout.y})`;
	return `matrix(${transform.a} ${transform.b} ${transform.c} ${transform.d} ${layout.x + transform.tx} ${layout.y + transform.ty})`;
}

function radius(props: Readonly<Record<string, unknown>>, corner: string): number {
	return Math.max(0, finite(props[corner], finite(props.borderRadius)));
}

function roundedRectPath(width: number, height: number, props: Readonly<Record<string, unknown>>): string {
	const topLeft = Math.min(radius(props, "borderTopLeftRadius"), width / 2, height / 2);
	const topRight = Math.min(radius(props, "borderTopRightRadius"), width / 2, height / 2);
	const bottomRight = Math.min(radius(props, "borderBottomRightRadius"), width / 2, height / 2);
	const bottomLeft = Math.min(radius(props, "borderBottomLeftRadius"), width / 2, height / 2);
	return [
		`M${topLeft} 0`, `H${width - topRight}`, `Q${width} 0 ${width} ${topRight}`,
		`V${height - bottomRight}`, `Q${width} ${height} ${width - bottomRight} ${height}`,
		`H${bottomLeft}`, `Q0 ${height} 0 ${height - bottomLeft}`,
		`V${topLeft}`, `Q0 0 ${topLeft} 0`, "Z",
	].join(" ");
}

function brushColor(value: unknown, context: string): string {
	if (value === null || value === undefined) return "none";
	if (typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${context} besitzt keinen APK-kompatiblen RNSVG-Brush`);
	}
	const brush = value as Readonly<Record<string, unknown>>;
	if (brush.type === 1) {
		if (typeof brush.brushRef !== "string" || brush.brushRef.length === 0) {
			throw new Error(`${context} besitzt keine RNSVG-Brush-Referenz`);
		}
		return `url(#${escapeXml(brush.brushRef)})`;
	}
	if (brush.type !== 0) throw new Error(`${context} verwendet den noch nicht nachgebildeten RNSVG-Brush-Typ ${String(brush.type)}`);
	const color = apkArgbToCss(brush.payload);
	if (!color) throw new Error(`${context} besitzt keine ARGB-Farbe`);
	return color;
}

function lineCap(value: unknown): string | undefined {
	if (value === 0) return "butt";
	if (value === 1) return "round";
	if (value === 2) return "square";
	return undefined;
}

function lineJoin(value: unknown): string | undefined {
	if (value === 0) return "miter";
	if (value === 1) return "round";
	if (value === 2) return "bevel";
	return undefined;
}

function svgLength(value: unknown, context: string): string {
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
	if (typeof value === "string" && value.trim().length > 0) return value.trim();
	throw new Error(`${context} besitzt keine gültige SVG-Länge`);
}

function optionalSvgLengthAttribute(name: string, value: unknown, context: string): string {
	return value === null || value === undefined
		? ""
		: ` ${name}="${escapeXml(svgLength(value, context))}"`;
}

function dashArrayAttribute(value: unknown, context: string): string {
	if (value === null || value === undefined) return "";
	if (typeof value === "string" && value.trim().length > 0) {
		return ` stroke-dasharray="${escapeXml(value.trim())}"`;
	}
	if (Array.isArray(value) && value.every(item =>
		typeof item === "number" && Number.isFinite(item)
		|| typeof item === "string" && item.trim().length > 0)) {
		return ` stroke-dasharray="${value.map(item => escapeXml(item)).join(" ")}"`;
	}
	throw new Error(`${context} besitzt kein gültiges strokeDasharray`);
}

function optionalNumberAttribute(name: string, value: unknown): string {
	return typeof value === "number" && Number.isFinite(value)
		? ` ${name}="${value}"`
		: "";
}

function virtualTransformAttribute(props: Readonly<Record<string, unknown>>, context: string): string {
	if (Array.isArray(props.matrix)) {
		if (props.matrix.length !== 6
			|| props.matrix.some(value => typeof value !== "number" || !Number.isFinite(value))) {
			throw new Error(`${context}.matrix muss aus sechs endlichen Zahlen bestehen`);
		}
		return ` transform="matrix(${props.matrix.join(" ")})"`;
	}
	if (typeof props.transform === "string" && props.transform.trim().length > 0) {
		return ` transform="${escapeXml(props.transform.trim())}"`;
	}
	return "";
}

function gradientStops(value: unknown, context: string): string {
	if (!Array.isArray(value) || value.length < 4 || value.length % 2 !== 0) {
		throw new Error(`${context} besitzt keine gültigen RNSVG-Farbstopps`);
	}
	const stops: string[] = [];
	for (let index = 0; index < value.length; index += 2) {
		const offset = value[index];
		const color = apkArgbToCss(value[index + 1]);
		if (typeof offset !== "number" || !Number.isFinite(offset) || !color) {
			throw new Error(`${context} besitzt einen ungültigen RNSVG-Farbstopp`);
		}
		stops.push(`<stop offset="${offset}" stop-color="${color}"/>`);
	}
	return stops.join("");
}

function gradientTransformAttribute(value: unknown, context: string): string {
	if (value === null || value === undefined) return "";
	if (!Array.isArray(value) || value.length !== 6
		|| value.some(item => typeof item !== "number" || !Number.isFinite(item))) {
		throw new Error(`${context} besitzt keine gültige RNSVG-Gradientenmatrix`);
	}
	return ` gradientTransform="matrix(${value.join(" ")})"`;
}

function radialGradientTransformAttribute(
	props: Readonly<Record<string, unknown>>,
	context: string,
): string {
	const base = props.gradientTransform;
	if (base !== null && base !== undefined) return gradientTransformAttribute(base, context);
	const { cx, cy, rx, ry } = props;
	if (typeof cx === "number" && Number.isFinite(cx)
		&& typeof cy === "number" && Number.isFinite(cy)
		&& typeof rx === "number" && Number.isFinite(rx) && rx !== 0
		&& typeof ry === "number" && Number.isFinite(ry) && ry !== rx) {
		return ` gradientTransform="translate(${cx} ${cy}) scale(1 ${ry / rx}) translate(${-cx} ${-cy})"`;
	}
	return "";
}

function renderableAttributes(
	node: ApkUiManagerNodeSnapshot,
	options: Readonly<{ includeFill: boolean }>,
): string {
	const context = `${node.viewName} ${node.tag}`;
	const fill = options.includeFill ? ` fill="${brushColor(node.props.fill, `${context}.fill`)}"` : "";
	const stroke = ` stroke="${brushColor(node.props.stroke, `${context}.stroke`)}"`;
	const width = ` stroke-width="${finite(node.props.strokeWidth, 1)}"`;
	const dash = dashArrayAttribute(node.props.strokeDasharray, `${context}.strokeDasharray`);
	const cap = lineCap(node.props.strokeLinecap);
	const join = lineJoin(node.props.strokeLinejoin);
	return fill + stroke + width + dash
		+ (cap ? ` stroke-linecap="${cap}"` : "")
		+ (join ? ` stroke-linejoin="${join}"` : "")
		+ optionalNumberAttribute("fill-opacity", node.props.fillOpacity)
		+ optionalNumberAttribute("stroke-opacity", node.props.strokeOpacity)
		+ optionalNumberAttribute("stroke-dashoffset", node.props.strokeDashoffset)
		+ optionalNumberAttribute("stroke-miterlimit", node.props.strokeMiterlimit)
		+ virtualTransformAttribute(node.props, context);
}

class SnapshotSvgRenderer {
	readonly #shadowByTag: ReadonlyMap<number, ApkUiManagerNodeSnapshot>;
	readonly #layouts: ReadonlyMap<number, Readonly<NativeLayoutBox>>;
	readonly #definitions: string[] = [];
	readonly #diagnostics: MutableDiagnostics = {
		renderedNativeViews: 0,
		svgViews: 0,
		svgDefinitions: 0,
		svgLinearGradients: 0,
		svgRadialGradients: 0,
		svgGroups: 0,
		svgPaths: 0,
		svgLines: 0,
		svgCircles: 0,
		svgRects: 0,
		embeddedImages: 0,
		textNodes: 0,
	};

	public constructor(private readonly options: Readonly<ApkNativeUiSnapshotRenderOptions>) {
		this.#shadowByTag = indexTree(options.shadowRoot);
		this.#layouts = indexLayouts(options.nativeHierarchy);
	}

	public render(): ApkNativeUiSvgArtifact {
		const renderRoot = this.options.rootTag === undefined
			? this.options.nativeHierarchy.root
			: findNativeNode(this.options.nativeHierarchy.root, this.options.rootTag);
		if (!renderRoot) throw new Error(`Native React-Tag ${this.options.rootTag} existiert nicht`);
		const rootLayout = this.#layouts.get(renderRoot.tag);
		if (!rootLayout) throw new Error(`Native Layout für React-Tag ${renderRoot.tag} fehlt`);
		const viewport = this.options.viewport ?? (this.options.rootTag === undefined
			? { x: 0, y: 0, width: this.options.width, height: this.options.height }
			: rootLayout);
		if (viewport.width <= 0 || viewport.height <= 0) {
			throw new Error(`Viewport von React-Tag ${renderRoot.tag} muss positiv sein`);
		}
		const body = this.#native(renderRoot);
		const font = this.#fontDefinition();
		const definitions = [font, ...this.#definitions].filter(Boolean).join("");
		const svg = [
			`<svg xmlns="http://www.w3.org/2000/svg" width="${this.options.width}" height="${this.options.height}" viewBox="${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}">`,
			`<defs>${definitions}</defs>`, body, "</svg>",
		].join("");
		return { svg, diagnostics: Object.freeze({ ...this.#diagnostics }) };
	}

	#fontDefinition(): string {
		const legacyFontPath = (this.options as { fontPath?: string }).fontPath;
		const configuredPaths = this.options.fontPaths?.length
			? this.options.fontPaths
			: legacyFontPath ? [legacyFontPath] : [];
		const text = rawText(this.options.shadowRoot);
		const needsArabic = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u.test(text);
		const needsHebrew = /[\u0590-\u05ff]/u.test(text);
		const paths = configuredPaths.filter((fontPath, index) => index === 0
			|| needsArabic && /arabic|naskh|kufi/iu.test(path.basename(fontPath))
			|| needsHebrew && /hebrew/iu.test(path.basename(fontPath)));
		if (!paths.length) return "";
		const definitions = paths.map((fontPath, index) => {
			const encoded = fs.readFileSync(fontPath).toString("base64");
			return `@font-face{font-family:ApkSystemFont${index};src:url(data:font/ttf;base64,${encoded}) format('truetype')}`;
		}).join("");
		const families = paths.map((_fontPath, index) => `ApkSystemFont${index}`).join(",");
		return `<style>${definitions}text{font-family:${families},Roboto,sans-serif}</style>`;
	}

	#native(node: ApkUiManagerNodeSnapshot): string {
		const layout = this.#layouts.get(node.tag);
		if (!layout) throw new Error(`Native Layout für React-Tag ${node.tag} fehlt`);
		this.#diagnostics.renderedNativeViews += 1;
		const opacity = finite(node.props.opacity, 1);
		const content = node.viewName === "RNSVGSvgViewAndroid"
			? this.#svgView(node, layout)
			: [this.#nativeSelf(node, layout), ...nativeChildren(node).map(child => this.#native(child))].join("");
		const clipId = node.props.overflow === "hidden" ? this.#clip(node, layout) : undefined;
		const clipped = clipId ? `<g clip-path="url(#${clipId})">${content}</g>` : content;
		return `<g data-react-tag="${node.tag}" data-view-name="${escapeXml(node.viewName)}" transform="${transformAttribute(layout)}"${opacity === 1 ? "" : ` opacity="${opacity}"`}>${clipped}</g>`;
	}

	#clip(node: ApkUiManagerNodeSnapshot, layout: Readonly<NativeLayoutBox>): string {
		const id = `apk-clip-${node.tag}`;
		this.#definitions.push(`<clipPath id="${id}"><path d="${roundedRectPath(layout.width, layout.height, node.props)}"/></clipPath>`);
		return id;
	}

	#nativeSelf(node: ApkUiManagerNodeSnapshot, layout: Readonly<NativeLayoutBox>): string {
		if (node.viewName === "RCTImageView") return this.#image(node, layout);
		if (node.viewName === "RCTText") return this.#text(node, layout);
		const background = apkArgbToCss(node.props.backgroundColor);
		const borderWidth = Math.max(0, finite(node.props.borderWidth));
		const border = apkArgbToCss(node.props.borderColor);
		if (!background && (!border || borderWidth === 0)) return "";
		const dash = node.props.borderStyle === "dashed" && borderWidth > 0
			? ` stroke-dasharray="${borderWidth * 3} ${borderWidth * 3}"`
			: "";
		return `<path d="${roundedRectPath(layout.width, layout.height, node.props)}" fill="${background ?? "none"}" stroke="${border ?? "none"}" stroke-width="${borderWidth}"${dash}/>`;
	}

	#image(node: ApkUiManagerNodeSnapshot, layout: Readonly<NativeLayoutBox>): string {
		const uri = imageUri(node.props);
		if (!uri) return "";
		this.#diagnostics.embeddedImages += 1;
		const resizeMode = node.props.resizeMode;
		const aspect = resizeMode === "stretch" ? "none"
			: resizeMode === "cover" ? "xMidYMid slice"
				: "xMidYMid meet";
		return `<image width="${layout.width}" height="${layout.height}" href="${uri}" preserveAspectRatio="${aspect}"/>`;
	}

	#text(node: ApkUiManagerNodeSnapshot, layout: Readonly<NativeLayoutBox>): string {
		const shadow = this.#shadowByTag.get(node.tag);
		if (!shadow) throw new Error(`Shadow-Text für React-Tag ${node.tag} fehlt`);
		const text = rawText(shadow);
		if (!text) return "";
		this.#diagnostics.textNodes += 1;
		const fontSize = Math.max(1, finite(node.props.fontSize, 14));
		const color = apkArgbToCss(node.props.color) ?? "rgb(0 0 0)";
		const layoutDirection = this.options.direction ?? "ltr";
		const textDirection = apkTextDirection(text, layoutDirection);
		const alignment = node.props.textAlign;
		const alignsRight = alignment === "right" || (alignment !== "left" && alignment !== "center" && layoutDirection === "rtl");
		const x = alignment === "center" ? layout.width / 2 : alignsRight ? layout.width : 0;
		const anchor = alignment === "center"
			? "middle"
			: alignsRight
				? textDirection === "rtl" ? "start" : "end"
				: textDirection === "rtl" ? "end" : "start";
		const y = Math.min(layout.height, fontSize);
		const filter = this.#textShadow(node);
		const fontWeight = String(node.props.fontWeight ?? "400");
		return `<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}" font-weight="${escapeXml(fontWeight)}" text-anchor="${anchor}" direction="${textDirection}" unicode-bidi="plaintext"${filter ? ` filter="url(#${filter})"` : ""}>${escapeXml(text)}</text>`;
	}

	#textShadow(node: ApkUiManagerNodeSnapshot): string | undefined {
		const color = apkArgbToCss(node.props.textShadowColor);
		const radius = Math.max(0, finite(node.props.textShadowRadius));
		if (!color || color === "none" || radius === 0) return undefined;
		const offset = node.props.textShadowOffset;
		const record = offset && typeof offset === "object" && !Array.isArray(offset)
			? offset as Readonly<Record<string, unknown>>
			: {};
		const id = `apk-text-shadow-${node.tag}`;
		this.#definitions.push(`<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur in="SourceAlpha" stdDeviation="${radius}" result="blur"/><feOffset in="blur" dx="${finite(record.width)}" dy="${finite(record.height)}" result="offset"/><feFlood flood-color="${color}" result="color"/><feComposite in="color" in2="offset" operator="in" result="shadow"/><feMerge><feMergeNode in="shadow"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`);
		return id;
	}

	#svgView(node: ApkUiManagerNodeSnapshot, layout: Readonly<NativeLayoutBox>): string {
		const shadow = this.#shadowByTag.get(node.tag);
		if (!shadow) throw new Error(`Virtueller SVG-Baum für React-Tag ${node.tag} fehlt`);
		this.#diagnostics.svgViews += 1;
		const minX = finite(node.props.minX);
		const minY = finite(node.props.minY);
		const viewBoxWidth = finite(node.props.vbWidth, layout.width);
		const viewBoxHeight = finite(node.props.vbHeight, layout.height);
		const align = typeof node.props.align === "string" ? node.props.align : "xMidYMid";
		const meetOrSlice = finite(node.props.meetOrSlice);
		const preserve = align === "none" ? "none" : `${align} ${meetOrSlice === 1 ? "slice" : "meet"}`;
		const children = shadow.children.map(child => this.#virtualSvg(child)).join("");
		return `<svg width="${layout.width}" height="${layout.height}" viewBox="${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}" preserveAspectRatio="${escapeXml(preserve)}">${children}</svg>`;
	}

	#virtualSvg(node: ApkUiManagerNodeSnapshot): string {
		if (node.viewName === "RNSVGDefs") {
			this.#diagnostics.svgDefinitions += 1;
			return `<defs data-react-tag="${node.tag}">${node.children.map(child =>
				this.#virtualSvg(child)).join("")}</defs>`;
		}
		if (node.viewName === "RNSVGLinearGradient") {
			this.#diagnostics.svgLinearGradients += 1;
			const context = `RNSVGLinearGradient ${node.tag}`;
			const name = node.props.name;
			if (typeof name !== "string" || name.length === 0) {
				throw new Error(`${context} besitzt keinen Namen`);
			}
			const units = finite(node.props.gradientUnits) === 1 ? "userSpaceOnUse" : "objectBoundingBox";
			return `<linearGradient data-react-tag="${node.tag}" id="${escapeXml(name)}" x1="${escapeXml(svgLength(node.props.x1, `${context}.x1`))}" y1="${escapeXml(svgLength(node.props.y1, `${context}.y1`))}" x2="${escapeXml(svgLength(node.props.x2, `${context}.x2`))}" y2="${escapeXml(svgLength(node.props.y2, `${context}.y2`))}" gradientUnits="${units}"${gradientTransformAttribute(node.props.gradientTransform, `${context}.gradientTransform`)}>${gradientStops(node.props.gradient, `${context}.gradient`)}</linearGradient>`;
		}
		if (node.viewName === "RNSVGRadialGradient") {
			this.#diagnostics.svgRadialGradients += 1;
			const context = `RNSVGRadialGradient ${node.tag}`;
			const name = node.props.name;
			if (typeof name !== "string" || name.length === 0) {
				throw new Error(`${context} besitzt keinen Namen`);
			}
			const units = finite(node.props.gradientUnits) === 1 ? "userSpaceOnUse" : "objectBoundingBox";
			return `<radialGradient data-react-tag="${node.tag}" id="${escapeXml(name)}" cx="${escapeXml(svgLength(node.props.cx, `${context}.cx`))}" cy="${escapeXml(svgLength(node.props.cy, `${context}.cy`))}" r="${escapeXml(svgLength(node.props.rx, `${context}.rx`))}" fx="${escapeXml(svgLength(node.props.fx, `${context}.fx`))}" fy="${escapeXml(svgLength(node.props.fy, `${context}.fy`))}" gradientUnits="${units}"${radialGradientTransformAttribute(node.props, `${context}.gradientTransform`)}>${gradientStops(node.props.gradient, `${context}.gradient`)}</radialGradient>`;
		}
		if (node.viewName === "RNSVGGroup") {
			this.#diagnostics.svgGroups += 1;
			return `<g${virtualTransformAttribute(node.props, `RNSVGGroup ${node.tag}`)}>${node.children.map(child =>
				this.#virtualSvg(child)).join("")}</g>`;
		}
		if (node.viewName === "RNSVGPath") {
			this.#diagnostics.svgPaths += 1;
			const d = node.props.d;
			if (typeof d !== "string") throw new Error(`RNSVGPath ${node.tag} besitzt keine Pfadgeometrie`);
			return `<path data-react-tag="${node.tag}" d="${escapeXml(d)}"${renderableAttributes(node, { includeFill: true })}/>`;
		}
		if (node.viewName === "RNSVGLine") {
			this.#diagnostics.svgLines += 1;
			return `<line data-react-tag="${node.tag}" x1="${escapeXml(svgLength(node.props.x1, `RNSVGLine ${node.tag}.x1`))}" y1="${escapeXml(svgLength(node.props.y1, `RNSVGLine ${node.tag}.y1`))}" x2="${escapeXml(svgLength(node.props.x2, `RNSVGLine ${node.tag}.x2`))}" y2="${escapeXml(svgLength(node.props.y2, `RNSVGLine ${node.tag}.y2`))}" fill="none"${renderableAttributes(node, { includeFill: false })}/>`;
		}
		if (node.viewName === "RNSVGCircle") {
			this.#diagnostics.svgCircles += 1;
			return `<circle data-react-tag="${node.tag}" cx="${escapeXml(svgLength(node.props.cx, `RNSVGCircle ${node.tag}.cx`))}" cy="${escapeXml(svgLength(node.props.cy, `RNSVGCircle ${node.tag}.cy`))}" r="${escapeXml(svgLength(node.props.r, `RNSVGCircle ${node.tag}.r`))}"${renderableAttributes(node, { includeFill: true })}/>`;
		}
		if (node.viewName === "RNSVGRect") {
			this.#diagnostics.svgRects += 1;
			const context = `RNSVGRect ${node.tag}`;
			return `<rect data-react-tag="${node.tag}" x="${escapeXml(svgLength(node.props.x ?? 0, `${context}.x`))}" y="${escapeXml(svgLength(node.props.y ?? 0, `${context}.y`))}" width="${escapeXml(svgLength(node.props.width, `${context}.width`))}" height="${escapeXml(svgLength(node.props.height, `${context}.height`))}"${optionalSvgLengthAttribute("rx", node.props.rx, `${context}.rx`)}${optionalSvgLengthAttribute("ry", node.props.ry, `${context}.ry`)}${renderableAttributes(node, { includeFill: true })}/>`;
		}
		throw new Error(`Der unveränderte AppPlugin-Baum verwendet den noch nicht nachgebildeten SVG-Typ ${node.viewName}`);
	}
}

export function renderApkNativeUiSnapshotToSvg(
	options: Readonly<ApkNativeUiSnapshotRenderOptions>,
): ApkNativeUiSvgArtifact {
	finitePositive(options.width, "Snapshot-Breite");
	finitePositive(options.height, "Snapshot-Höhe");
	return new SnapshotSvgRenderer(options).render();
}

function alphaContentBounds(
	data: Uint8ClampedArray,
	width: number,
	height: number,
): Readonly<{ x: number; y: number; width: number; height: number }> | undefined {
	let left = width;
	let top = height;
	let right = -1;
	let bottom = -1;
	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			if (data[(y * width + x) * 4 + 3] === 0) continue;
			left = Math.min(left, x);
			top = Math.min(top, y);
			right = Math.max(right, x);
			bottom = Math.max(bottom, y);
		}
	}
	return right < left || bottom < top
		? undefined
		: Object.freeze({ x: left, y: top, width: right - left + 1, height: bottom - top + 1 });
}
export async function exportApkNativeUiSnapshotPng(
	options: Readonly<ApkNativeUiSnapshotRenderOptions>,
	outputPath: string,
): Promise<Readonly<ApkNativeUiPngArtifact>> {
	const rendered = renderApkNativeUiSnapshotToSvg(options);
	const absoluteOutputPath = path.resolve(outputPath);
	const svgOutputPath = absoluteOutputPath.replace(/\.png$/iu, ".svg");
	fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
	fs.writeFileSync(svgOutputPath, rendered.svg);
	const image = await loadImage(Buffer.from(rendered.svg));
	const canvas = createCanvas(options.width, options.height);
	const context = canvas.getContext("2d");
	context.clearRect(0, 0, options.width, options.height);
	context.drawImage(image, 0, 0, options.width, options.height);
	const contentBounds = alphaContentBounds(
		context.getImageData(0, 0, options.width, options.height).data,
		options.width,
		options.height,
	);
	const png = await canvas.encode("png");
	fs.writeFileSync(absoluteOutputPath, png);
	return Object.freeze({
		outputPath: absoluteOutputPath,
		svgOutputPath,
		width: options.width,
		height: options.height,
		bytes: png.byteLength,
		sha256: crypto.createHash("sha256").update(png).digest("hex"),
		contentBounds,
		...rendered.diagnostics,
	});
}
