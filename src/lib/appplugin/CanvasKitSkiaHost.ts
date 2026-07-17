import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as nodePath from "node:path";
import CanvasKitInit, {
	type AnimatedImage,
	type Canvas,
	type Color,
	type ColorFilter,
	type Font,
	type FontMgr,
	type Image,
	type ImageFilter,
	type InputMatrix,
	type InputRect,
	type InputRRect,
	type Paint,
	type Paragraph,
	type ParagraphBuilder,
	type ParagraphStyle,
	type Path,
	type PathBuilder,
	type PathEffect,
	type SkPicture,
	type TextStyle,
	type Typeface,
	type TypefaceFontProvider,
} from "canvaskit-wasm";

interface RefHost<T> {
	readonly ref: T;
}

interface NumericEnumValue {
	readonly value: number;
}

interface RectLike {
	x: number;
	y: number;
	width: number;
	height: number;
}

interface RRectLike {
	readonly rect: unknown;
	readonly rx: number;
	readonly ry: number;
}

interface FontStyleLike {
	weight?: number;
	width?: number;
	slant?: number;
}

export interface CanvasKitSkiaHostOptions {
	bundleRoot: string;
	width: number;
	height: number;
	fontPaths?: string[];
}

interface PictureDrawImageRectDiagnostic {
	imageWidth: number;
	imageHeight: number;
	source: number[];
	destination: number[];
	paintAlpha: number;
}

export interface CanvasKitSkiaHostDiagnostics {
	canvasKitVersion: string;
	fontPaths: string[];
	loadedAssets: string[];
	unsupportedCapabilities: string[];
	pictureUpdates: number;
	viewIds: number[];
	compositionOrder: number[];
	pictureViews: Array<{
		viewId: number;
		approximateBytesUsed: number;
		cullRect: number[];
		drawImageRects: PictureDrawImageRectDiagnostic[];
		drawAtlasCount: number;
	}>;
}

export interface CanvasKitSkiaPngArtifact {
	outputPath: string;
	width: number;
	height: number;
	sha256: string;
	bytes: number;
}

export interface CanvasKitSkiaHost {
	readonly api: Record<string, unknown>;
	readonly viewApi: Record<string, unknown>;
	setViewOrder(viewIds: number[]): void;
	exportLatestPng(outputPath: string, viewId?: number): CanvasKitSkiaPngArtifact;
	getDiagnostics(): CanvasKitSkiaHostDiagnostics;
	dispose(): void;
}

function isRefHost(value: unknown): value is RefHost<unknown> {
	return typeof value === "object" && value !== null && "ref" in value;
}

function unwrap<T>(value: unknown): T {
	return (isRefHost(value) ? value.ref : value) as T;
}

function isRectLike(value: unknown): value is RectLike {
	if (typeof value !== "object" || value === null) return false;
	const candidate = value as Partial<RectLike>;
	return [candidate.x, candidate.y, candidate.width, candidate.height].every(item => typeof item === "number");
}

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
	return Uint8Array.from(buffer).buffer;
}

function numericEnum(group: unknown): Record<string, number> {
	if ((typeof group !== "object" && typeof group !== "function") || group === null) return {};
	return Object.fromEntries(Object.entries(group).flatMap(([key, value]) =>
		typeof value === "object" && value !== null && "value" in value
			? [[key, Number((value as NumericEnumValue).value)]]
			: [],
	));
}

function enumByValue<T extends NumericEnumValue>(group: unknown, value: unknown, fallback?: T): T {
	if (typeof value === "object" && value !== null && "value" in value) return value as T;
	if ((typeof group === "object" || typeof group === "function") && group !== null) {
		for (const candidate of Object.values(group)) {
			if (typeof candidate === "object" && candidate !== null && "value" in candidate
				&& Number((candidate as NumericEnumValue).value) === Number(value)) {
				return candidate as T;
			}
		}
	}
	if (fallback) return fallback;
	const available = (typeof group === "object" || typeof group === "function") && group !== null
		? Object.entries(group).flatMap(([key, candidate]) =>
			typeof candidate === "object" && candidate !== null && "value" in candidate
				? [`${key}=${String((candidate as NumericEnumValue).value)}`]
				: [],
		).join(", ")
		: "";
	throw new Error(`Unbekannter Skia-Enumwert: ${String(value)}; verfügbar: ${available}`);
}

function defaultFontCandidates(): string[] {
	const candidates: string[] = [];
	if (process.env.WINDIR) {
		const windowsFonts = nodePath.join(process.env.WINDIR, "Fonts");
		candidates.push(
			nodePath.join(windowsFonts, "Roboto-Regular.ttf"),
			nodePath.join(windowsFonts, "NotoSansArabic-Regular.ttf"),
			nodePath.join(windowsFonts, "NotoSansHebrew-Regular.ttf"),
		);
	}
	candidates.push(
		"/usr/share/fonts/truetype/roboto/Roboto-Regular.ttf",
		"/usr/share/fonts/truetype/roboto/unhinted/RobotoTTF/Roboto-Regular.ttf",
		"/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf",
		"/usr/share/fonts/truetype/noto/NotoSansArabic-Regular.ttf",
		"/usr/share/fonts/truetype/noto/NotoSansHebrew-Regular.ttf",
		"/usr/share/fonts/opentype/noto/NotoSans-Regular.ttf",
		"/usr/share/fonts/opentype/noto/NotoSansArabic-Regular.ttf",
		"/usr/share/fonts/opentype/noto/NotoSansHebrew-Regular.ttf",
		"/Library/Fonts/Roboto-Regular.ttf",
		"/Library/Fonts/NotoSansArabic-Regular.ttf",
		"/Library/Fonts/NotoSansHebrew-Regular.ttf",
		"/System/Library/Fonts/Supplemental/Arial.ttf",
	);
	return candidates;
}

function resolveFontPaths(explicitPaths: string[] | undefined): string[] {
	const candidates = explicitPaths?.length ? explicitPaths : defaultFontCandidates();
	return [...new Set(candidates.map(candidate => nodePath.resolve(candidate)).filter(candidate => fs.existsSync(candidate)))];
}

export async function createCanvasKitSkiaHost(options: CanvasKitSkiaHostOptions): Promise<CanvasKitSkiaHost> {
	const bundleRoot = nodePath.resolve(options.bundleRoot);
	const canvasKitWasmPath = require.resolve("canvaskit-wasm/bin/canvaskit.wasm");
	const canvasKit = await CanvasKitInit({ locateFile: () => canvasKitWasmPath });
	const fontPaths = resolveFontPaths(options.fontPaths);
	if (!fontPaths.length) {
		throw new Error("Für den originalen AppPlugin-Textpfad wurde keine kompatible Schrift gefunden.");
	}
	const fontBuffers = fontPaths.map(fontPath => fs.readFileSync(fontPath));
	const systemFontManager = canvasKit.FontMgr.FromData(...fontBuffers.map(toArrayBuffer));
	if (!systemFontManager) throw new Error("CanvasKit konnte die konfigurierte Schrift nicht laden.");

	const loadedAssets = new Set<string>();
	const unsupportedCapabilities = new Set<string>();
	const viewPictures = new Map<number, PictureHost>();
	let latestPicture: PictureHost | undefined;
	let pictureUpdates = 0;
	let compositionOrder: number[] = [];
	const ownedPictures = new Set<PictureHost>();

	function color(value: unknown): Color {
		if (value instanceof Float32Array && value.length === 4) return value;
		if (Array.isArray(value) && value.length === 4) return Float32Array.from(value.map(Number));
		if (typeof value === "string") return canvasKit.parseColorString(value);
		if (typeof value === "number") {
			const packed = value >>> 0;
			return canvasKit.Color(
				packed >>> 16 & 0xff,
				packed >>> 8 & 0xff,
				packed & 0xff,
				(packed >>> 24 & 0xff) / 255,
			);
		}
		throw new Error(`Nicht unterstützter Skia-Farbwert: ${String(value)}`);
	}

	function rect(value: unknown): InputRect {
		const unwrapped = unwrap<unknown>(value);
		if (isRectLike(unwrapped)) {
			return canvasKit.XYWHRect(unwrapped.x, unwrapped.y, unwrapped.width, unwrapped.height);
		}
		if (Array.isArray(unwrapped) || ArrayBuffer.isView(unwrapped)) return unwrapped as InputRect;
		throw new Error("Ungültiges Skia-Rechteck.");
	}

	function rrect(value: unknown): InputRRect {
		const unwrapped = unwrap<unknown>(value);
		if (typeof unwrapped === "object" && unwrapped !== null && "rect" in unwrapped) {
			const candidate = unwrapped as RRectLike;
			return canvasKit.RRectXY(rect(candidate.rect), candidate.rx, candidate.ry);
		}
		if (Array.isArray(unwrapped) || ArrayBuffer.isView(unwrapped)) return unwrapped as InputRRect;
		throw new Error(`Ungültiges abgerundetes Skia-Rechteck: ${String(value)}`);
	}

	function matrix(value: unknown): number[] {
		const unwrapped = unwrap<unknown>(value);
		if (!Array.isArray(unwrapped) && !ArrayBuffer.isView(unwrapped)) {
			throw new Error("Ungültige Skia-Transformationsmatrix.");
		}
		const numbers = Array.from(unwrapped as ArrayLike<number>, Number);
		return numbers.length === 16
			? [numbers[0], numbers[1], numbers[3], numbers[4], numbers[5], numbers[7], numbers[12], numbers[13], numbers[15]]
			: numbers;
	}

	function flattenRects(values: unknown[]): number[] {
		return values.flatMap(value => Array.from(rect(value) as ArrayLike<number>, Number));
	}

	function flattenRsxforms(values: unknown[]): number[] {
		return values.flatMap(value => {
			const unwrapped = unwrap<unknown>(value);
			if (!Array.isArray(unwrapped) && !ArrayBuffer.isView(unwrapped)) {
				throw new Error("Ungültige RSXform-Transformation.");
			}
			return Array.from(unwrapped as ArrayLike<number>, Number);
		});
	}

	function convertFontStyle(style: unknown): FontStyleLike {
		const candidate = typeof style === "object" && style !== null ? style as FontStyleLike : {};
		return {
			weight: candidate.weight ?? 400,
			width: candidate.width ?? 5,
			slant: enumByValue(canvasKit.FontSlant, candidate.slant ?? 0, canvasKit.FontSlant.Upright).value,
		};
	}

	function convertTextStyle(style: unknown): TextStyle {
		if (typeof style !== "object" || style === null) return new canvasKit.TextStyle({});
		const source = style as Record<string, unknown>;
		const converted: Record<string, unknown> = { ...source };
		if (source.color !== undefined) converted.color = color(source.color);
		if (source.foregroundColor !== undefined) converted.foregroundColor = color(source.foregroundColor);
		if (source.backgroundColor !== undefined) converted.backgroundColor = color(source.backgroundColor);
		const fontStyle = convertFontStyle(source.fontStyle);
		if (typeof source.fontWeight === "number") fontStyle.weight = source.fontWeight;
		converted.fontStyle = {
			weight: enumByValue(canvasKit.FontWeight, fontStyle.weight ?? 400, canvasKit.FontWeight.Normal),
			width: enumByValue(canvasKit.FontWidth, fontStyle.width ?? 5, canvasKit.FontWidth.Normal),
			slant: enumByValue(canvasKit.FontSlant, fontStyle.slant ?? 0, canvasKit.FontSlant.Upright),
		};
		if (typeof source.decorationStyle === "number") {
			converted.decorationStyle = enumByValue(canvasKit.DecorationStyle, source.decorationStyle);
		}
		return new canvasKit.TextStyle(converted as TextStyle);
	}

	function convertParagraphStyle(style: unknown): ParagraphStyle {
		if (typeof style !== "object" || style === null) return new canvasKit.ParagraphStyle({});
		const source = style as Record<string, unknown>;
		const converted: Record<string, unknown> = { ...source };
		if (typeof source.textAlign === "number") converted.textAlign = enumByValue(canvasKit.TextAlign, source.textAlign);
		if (typeof source.textDirection === "number") converted.textDirection = enumByValue(canvasKit.TextDirection, source.textDirection);
		converted.textStyle = convertTextStyle(source.textStyle);
		return new canvasKit.ParagraphStyle(converted as ParagraphStyle);
	}

	function resolveAsset(uri: string): string {
		if (!uri.startsWith("file://")) throw new Error(`Nur lokale AppPlugin-Assets sind erlaubt: ${uri}`);
		const relativePath = decodeURIComponent(uri.slice("file://".length)).replaceAll("/", nodePath.sep);
		const absolutePath = nodePath.resolve(bundleRoot, relativePath);
		const relative = nodePath.relative(bundleRoot, absolutePath);
		if (relative.startsWith("..") || nodePath.isAbsolute(relative)) {
			throw new Error(`AppPlugin-Asset verlässt das Plugin-Verzeichnis: ${uri}`);
		}
		if (!fs.existsSync(absolutePath)) throw new Error(`AppPlugin-Asset fehlt: ${relativePath}`);
		loadedAssets.add(relative.replaceAll(nodePath.sep, "/"));
		return absolutePath;
	}

	class DisposableHost<T extends { delete(): void }> implements RefHost<T> {
		public constructor(
			public readonly ref: T,
			public readonly __typename__: string,
		) {}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class DataHost {
		public readonly __typename__ = "Data";
		public constructor(public readonly bytes: Uint8Array) {}
		public dispose(): void {}
	}

	class ImageHost implements RefHost<Image> {
		public readonly __typename__ = "Image";
		public constructor(public readonly ref: Image) {}
		public width(): number {
			return this.ref.width();
		}
		public height(): number {
			return this.ref.height();
		}
		public getImageInfo(): ReturnType<Image["getImageInfo"]> {
			return this.ref.getImageInfo();
		}
		public makeShaderOptions(tx: number, ty: number, fm: number, mm: number, localMatrix?: unknown): unknown {
			return new DisposableHost(
				this.ref.makeShaderOptions(
					enumByValue(canvasKit.TileMode, tx),
					enumByValue(canvasKit.TileMode, ty),
					enumByValue(canvasKit.FilterMode, fm),
					enumByValue(canvasKit.MipmapMode, mm),
					localMatrix === undefined ? undefined : matrix(localMatrix),
				),
				"Shader",
			);
		}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class AnimatedImageHost implements RefHost<AnimatedImage> {
		public readonly __typename__ = "AnimatedImage";
		public constructor(public readonly ref: AnimatedImage) {}
		public currentFrameDuration(): number {
			return this.ref.currentFrameDuration();
		}
		public decodeNextFrame(): number {
			return this.ref.decodeNextFrame();
		}
		public getFrameCount(): number {
			return this.ref.getFrameCount();
		}
		public getRepetitionCount(): number {
			return this.ref.getRepetitionCount();
		}
		public height(): number {
			return this.ref.height();
		}
		public width(): number {
			return this.ref.width();
		}
		public makeImageAtCurrentFrame(): ImageHost | null {
			const image = this.ref.makeImageAtCurrentFrame();
			return image ? new ImageHost(image) : null;
		}
		public reset(): void {
			this.ref.reset();
		}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class PaintHost implements RefHost<Paint> {
		public readonly __typename__ = "Paint";
		public constructor(public readonly ref: Paint = new canvasKit.Paint()) {}
		public copy(): PaintHost {
			return new PaintHost(this.ref.copy());
		}
		public getAlphaf(): number {
			return this.ref.getColor()[3];
		}
		public setAlphaf(value: number): void {
			this.ref.setAlphaf(value);
		}
		public setAntiAlias(value: boolean): void {
			this.ref.setAntiAlias(value);
		}
		public setBlendMode(value: number): void {
			this.ref.setBlendMode(enumByValue(canvasKit.BlendMode, value));
		}
		public setColor(value: unknown): void {
			this.ref.setColor(color(value));
		}
		public setColorFilter(value: unknown): void {
			this.ref.setColorFilter(unwrap(value));
		}
		public setDither(value: boolean): void {
			this.ref.setDither(value);
		}
		public setImageFilter(value: unknown): void {
			this.ref.setImageFilter(unwrap(value));
		}
		public setMaskFilter(value: unknown): void {
			this.ref.setMaskFilter(unwrap(value));
		}
		public setPathEffect(value: unknown): void {
			this.ref.setPathEffect(unwrap(value));
		}
		public setShader(value: unknown): void {
			this.ref.setShader(value == null ? null : unwrap(value));
		}
		public setStrokeCap(value: number): void {
			this.ref.setStrokeCap(enumByValue(canvasKit.StrokeCap, value));
		}
		public setStrokeJoin(value: number): void {
			this.ref.setStrokeJoin(enumByValue(canvasKit.StrokeJoin, value));
		}
		public setStrokeMiter(value: number): void {
			this.ref.setStrokeMiter(value);
		}
		public setStrokeWidth(value: number): void {
			this.ref.setStrokeWidth(value);
		}
		public setStyle(value: number): void {
			this.ref.setStyle(enumByValue(canvasKit.PaintStyle, value));
		}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class MatrixHost implements RefHost<InputMatrix> {
		public readonly __typename__ = "Matrix";
		public readonly ref: number[] = Array.from(canvasKit.Matrix.identity());
		private preMultiply(next: number[]): this {
			this.ref.splice(0, this.ref.length, ...Array.from(canvasKit.Matrix.multiply(this.ref, next)));
			return this;
		}
		public concat(value: unknown): this {
			return this.preMultiply(matrix(value));
		}
		public translate(x: number, y: number): this {
			return this.preMultiply(canvasKit.Matrix.translated(x, y));
		}
		public scale(x: number, y = x): this {
			return this.preMultiply(canvasKit.Matrix.scaled(x, y));
		}
		public rotate(radians: number): this {
			return this.preMultiply(canvasKit.Matrix.rotated(radians));
		}
		public skew(x: number, y: number): this {
			return this.preMultiply(canvasKit.Matrix.skewed(x, y));
		}
		public identity(): this {
			this.ref.splice(0, this.ref.length, ...Array.from(canvasKit.Matrix.identity()));
			return this;
		}
		public get(): number[] {
			return [...this.ref];
		}
		public dispose(): void {}
	}

	class PathHost implements RefHost<Path> {
		public readonly __typename__ = "Path";
		private builder: PathBuilder;
		public constructor(initial?: Path) {
			this.builder = new canvasKit.PathBuilder();
			if (initial) this.builder.addPath(initial);
		}
		public get ref(): Path {
			return this.builder.snapshot();
		}
		public moveTo(x: number, y: number): this {
			this.builder.moveTo(x, y);
			return this;
		}
		public lineTo(x: number, y: number): this {
			this.builder.lineTo(x, y);
			return this;
		}
		public quadTo(x1: number, y1: number, x2: number, y2: number): this {
			this.builder.quadTo(x1, y1, x2, y2);
			return this;
		}
		public cubicTo(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): this {
			this.builder.cubicTo(x1, y1, x2, y2, x3, y3);
			return this;
		}
		public close(): this {
			this.builder.close();
			return this;
		}
		public addCircle(x: number, y: number, radius: number): this {
			this.builder.addCircle(x, y, radius);
			return this;
		}
		public addArc(value: unknown, start: number, sweep: number): this {
			this.builder.addArc(rect(value), start, sweep);
			return this;
		}
		public addRect(value: unknown): this {
			this.builder.addRect(rect(value));
			return this;
		}
		public addRRect(value: unknown): this {
			this.builder.addRRect(rrect(value));
			return this;
		}
		public addPath(value: unknown, transform?: unknown): this {
			const source = unwrap<Path>(value);
			if (transform === undefined) this.builder.addPath(source);
			else this.builder.addPath(source, matrix(transform));
			return this;
		}
		public countPoints(): number {
			return this.builder.countPoints();
		}
		public copy(): PathHost {
			return new PathHost(this.ref);
		}
		public trim(start: number, end: number, complement: boolean): boolean {
			const trimmed = this.ref.makeTrimmed(start, end, complement);
			if (!trimmed) return false;
			this.builder.delete();
			this.builder = new canvasKit.PathBuilder();
			this.builder.addPath(trimmed);
			trimmed.delete();
			return true;
		}
		public reset(): void {
			this.builder.delete();
			this.builder = new canvasKit.PathBuilder();
		}
		public dispose(): void {
			this.builder.delete();
		}
	}

	class TypefaceHost implements RefHost<Typeface> {
		public readonly __typename__ = "Typeface";
		public constructor(
			public readonly ref: Typeface,
			public readonly bytes?: Uint8Array,
		) {}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class TypefaceFontProviderHost implements RefHost<TypefaceFontProvider> {
		public constructor(public readonly ref: TypefaceFontProvider) {}
		public countFamilies(): number {
			return this.ref.countFamilies();
		}
		public getFamilyName(index: number): string {
			return this.ref.getFamilyName(index);
		}
		public matchFamilyStyle(family: string, style: FontStyleLike): TypefaceHost {
			const typeface = this.ref.matchFamilyStyle(family, {
				weight: enumByValue(canvasKit.FontWeight, style.weight ?? 400, canvasKit.FontWeight.Normal),
				width: enumByValue(canvasKit.FontWidth, style.width ?? 5, canvasKit.FontWidth.Normal),
				slant: enumByValue(canvasKit.FontSlant, style.slant ?? 0, canvasKit.FontSlant.Upright),
			});
			if (!typeface) throw new Error(`AppPlugin-Schriftfamilie konnte nicht aufgelöst werden: ${family}`);
			return new TypefaceHost(typeface);
		}
		public registerFont(typeface: unknown, family: string): void {
			const host = typeface as TypefaceHost;
			if (!host.bytes) throw new Error(`Für die AppPlugin-Schrift ${family} fehlen die Quelldaten.`);
			this.ref.registerFont(host.bytes, family);
		}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class FontManagerHost implements RefHost<FontMgr> {
		public constructor(public readonly ref: FontMgr) {}
		public countFamilies(): number {
			return this.ref.countFamilies();
		}
		public getFamilyName(index: number): string {
			return this.ref.getFamilyName(index);
		}
		public matchFamilyStyle(family: string, style: FontStyleLike): TypefaceHost {
			const typeface = this.ref.matchFamilyStyle(family, {
				weight: enumByValue(canvasKit.FontWeight, style.weight ?? 400, canvasKit.FontWeight.Normal),
				width: enumByValue(canvasKit.FontWidth, style.width ?? 5, canvasKit.FontWidth.Normal),
				slant: enumByValue(canvasKit.FontSlant, style.slant ?? 0, canvasKit.FontSlant.Upright),
			});
			if (!typeface) throw new Error(`Schriftfamilie konnte nicht aufgelöst werden: ${family}`);
			return new TypefaceHost(typeface);
		}
	}

	class FontHost implements RefHost<Font> {
		public readonly __typename__ = "Font";
		public readonly ref: Font;
		public constructor(typeface: unknown, size: number) {
			this.ref = new canvasKit.Font(typeface == null ? null : unwrap<Typeface>(typeface), size);
		}
		public getMetrics(): ReturnType<Font["getMetrics"]> {
			return this.ref.getMetrics();
		}
		public measureText(text: string): { width: number } {
			const glyphs = this.ref.getGlyphIDs(text);
			const widths = this.ref.getGlyphWidths(glyphs);
			return { width: Array.from(widths).reduce((sum, width) => sum + width, 0) };
		}
		public getGlyphIDs(text: string): Uint16Array {
			return this.ref.getGlyphIDs(text);
		}
		public getGlyphWidths(glyphs: Uint16Array): Float32Array {
			return this.ref.getGlyphWidths(glyphs);
		}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class ParagraphHost implements RefHost<Paragraph> {
		public readonly __typename__ = "Paragraph";
		public constructor(public readonly ref: Paragraph) {}
		public layout(width: number): void {
			this.ref.layout(width);
		}
		public getHeight(): number {
			return this.ref.getHeight();
		}
		public getMaxIntrinsicWidth(): number {
			return this.ref.getMaxIntrinsicWidth();
		}
		public paint(canvas: unknown, x: number, y: number): void {
			unwrap<Canvas>(canvas).drawParagraph(this.ref, x, y);
		}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class ParagraphBuilderHost implements RefHost<ParagraphBuilder> {
		public constructor(public readonly ref: ParagraphBuilder) {}
		public pushStyle(style: unknown): this {
			this.ref.pushStyle(convertTextStyle(style));
			return this;
		}
		public addText(text: string): this {
			this.ref.addText(text);
			return this;
		}
		public pop(): this {
			this.ref.pop();
			return this;
		}
		public build(): ParagraphHost {
			return new ParagraphHost(this.ref.build());
		}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class CanvasHost implements RefHost<Canvas> {
		public readonly __typename__ = "Canvas";
		public constructor(
			public readonly ref: Canvas,
			private readonly drawImageRects: PictureDrawImageRectDiagnostic[],
			private readonly incrementDrawAtlas: () => void,
		) {}
		public save(): number {
			return this.ref.save();
		}
		public saveLayer(paint?: unknown): number {
			return this.ref.saveLayer(paint == null ? undefined : unwrap<Paint>(paint));
		}
		public restore(): void {
			this.ref.restore();
		}
		public concat(value: unknown): void {
			this.ref.concat(matrix(value));
		}
		public clipRect(value: unknown, operation: number, antiAlias: boolean): void {
			this.ref.clipRect(rect(value), enumByValue(canvasKit.ClipOp, operation), antiAlias);
		}
		public clipRRect(value: unknown, operation: number, antiAlias: boolean): void {
			this.ref.clipRRect(rrect(value), enumByValue(canvasKit.ClipOp, operation), antiAlias);
		}
		public clipPath(value: unknown, operation: number, antiAlias: boolean): void {
			this.ref.clipPath(unwrap<Path>(value), enumByValue(canvasKit.ClipOp, operation), antiAlias);
		}
		public drawCircle(cx: number, cy: number, radius: number, paint: unknown): void {
			this.ref.drawCircle(cx, cy, radius, unwrap<Paint>(paint));
		}
		public drawRect(value: unknown, paint: unknown): void {
			this.ref.drawRect(rect(value), unwrap<Paint>(paint));
		}
		public drawRRect(value: unknown, paint: unknown): void {
			this.ref.drawRRect(rrect(value), unwrap<Paint>(paint));
		}
		public drawDRRect(outer: unknown, inner: unknown, paint: unknown): void {
			this.ref.drawDRRect(rrect(outer), rrect(inner), unwrap<Paint>(paint));
		}
		public drawOval(value: unknown, paint: unknown): void {
			this.ref.drawOval(rect(value), unwrap<Paint>(paint));
		}
		public drawPath(value: unknown, paint: unknown): void {
			this.ref.drawPath(unwrap<Path>(value), unwrap<Paint>(paint));
		}
		public drawLine(x1: number, y1: number, x2: number, y2: number, paint: unknown): void {
			this.ref.drawLine(x1, y1, x2, y2, unwrap<Paint>(paint));
		}
		public drawImageRect(image: unknown, source: unknown, destination: unknown, paint: unknown): void {
			const imageRef = unwrap<Image>(image);
			const paintRef = unwrap<Paint>(paint);
			const sourceRect = rect(source);
			const destinationRect = rect(destination);
			this.drawImageRects.push({
				imageWidth: imageRef.width(),
				imageHeight: imageRef.height(),
				source: Array.from(sourceRect as ArrayLike<number>),
				destination: Array.from(destinationRect as ArrayLike<number>),
				paintAlpha: paintRef.getColor()[3],
			});
			this.ref.drawImageRect(imageRef, sourceRect, destinationRect, paintRef);
		}
		public drawAtlas(
			image: unknown,
			sprites: unknown[],
			transforms: unknown[],
			paint: unknown,
			blendMode?: number | null,
			colors?: unknown[] | null,
		): void {
			this.incrementDrawAtlas();
			const convertedColors = colors?.map(item => color(item));
			this.ref.drawAtlas(
				unwrap<Image>(image),
				flattenRects(sprites),
				flattenRsxforms(transforms),
				unwrap<Paint>(paint),
				blendMode == null ? null : enumByValue(canvasKit.BlendMode, blendMode),
				convertedColors ? convertedColors.flatMap(item => Array.from(item)) : null,
			);
		}
		public drawText(text: string, x: number, y: number, paint: unknown, font: unknown): void {
			this.ref.drawText(text, x, y, unwrap<Paint>(paint), unwrap<Font>(font));
		}
		public drawPicture(picture: unknown): void {
			this.ref.drawPicture(unwrap<SkPicture>(picture));
		}
	}

	class PictureHost implements RefHost<SkPicture> {
		public readonly __typename__ = "Picture";
		public constructor(
			public readonly ref: SkPicture,
			public readonly drawImageRects: PictureDrawImageRectDiagnostic[],
			public readonly drawAtlasCount: number,
		) {}
		public dispose(): void {
			this.ref.delete();
		}
	}

	class PictureRecorderHost {
		private readonly recorder = new canvasKit.PictureRecorder();
		private readonly drawImageRects: PictureDrawImageRectDiagnostic[] = [];
		private drawAtlasCount = 0;
		public beginRecording(bounds?: unknown): CanvasHost {
			return new CanvasHost(
				this.recorder.beginRecording(
					bounds === undefined ? canvasKit.XYWHRect(0, 0, options.width, options.height) : rect(bounds),
				),
				this.drawImageRects,
				() => this.drawAtlasCount++,
			);
		}
		public finishRecordingAsPicture(): PictureHost {
			const picture = new PictureHost(
				this.recorder.finishRecordingAsPicture(),
				this.drawImageRects.map(entry => ({ ...entry })),
				this.drawAtlasCount,
			);
			ownedPictures.add(picture);
			return picture;
		}
		public dispose(): void {
			this.recorder.delete();
		}
	}

	const systemFontHost = new FontManagerHost(systemFontManager);
	const baseApi: Record<string, unknown> = {
		Color: (value: unknown) => color(value),
		Point: (x: number, y: number) => ({ x, y }),
		XYWHRect: (x: number, y: number, width: number, height: number): RectLike => ({ x, y, width, height }),
		RRectXY: (value: unknown, rx: number, ry: number): RRectLike => ({ rect: value, rx, ry }),
		RSXform: (scos: number, ssin: number, tx: number, ty: number) => [scos, ssin, tx, ty],
		RSXformFromRadians: (
			scale: number,
			radians: number,
			x: number,
			y: number,
			originX: number,
			originY: number,
		) => {
			const scos = scale * Math.cos(radians);
			const ssin = scale * Math.sin(radians);
			return [scos, ssin, x - scos * originX + ssin * originY, y - ssin * originX - scos * originY];
		},
		Paint: () => new PaintHost(),
		Matrix: () => new MatrixHost(),
		Font: (typeface: unknown, size: number) => new FontHost(typeface, size),
		PictureRecorder: () => new PictureRecorderHost(),
		Path: {
			Make: () => new PathHost(),
		},
		Data: {
			fromBytes: (value: Uint8Array | ArrayBuffer) =>
				new DataHost(value instanceof Uint8Array ? new Uint8Array(value) : new Uint8Array(value)),
			fromURI: async (uri: string) => new DataHost(fs.readFileSync(resolveAsset(uri))),
		},
		SVG: {
			MakeFromData: (_data: unknown) => {
				unsupportedCapabilities.add("SkiaApi.SVG.MakeFromData");
				return null;
			},
		},
		AnimatedImage: {
			MakeAnimatedImageFromEncoded: (data: unknown) => {
				const image = canvasKit.MakeAnimatedImageFromEncoded(unwrap<DataHost>(data).bytes);
				return image ? new AnimatedImageHost(image) : null;
			},
		},
		Image: {
			MakeImage: (info: Record<string, unknown>, data: unknown, rowBytes: number) => {
				const image = canvasKit.MakeImage({
					width: Number(info.width),
					height: Number(info.height),
					alphaType: enumByValue(canvasKit.AlphaType, info.alphaType, canvasKit.AlphaType.Premul),
					colorType: enumByValue(canvasKit.ColorType, info.colorType, canvasKit.ColorType.RGBA_8888),
					colorSpace: canvasKit.ColorSpace.SRGB,
				}, unwrap<DataHost>(data).bytes, rowBytes);
				if (!image) throw new Error("CanvasKit konnte das RGBA-Bild nicht erzeugen.");
				return new ImageHost(image);
			},
			MakeImageFromEncoded: (data: unknown) => {
				const image = canvasKit.MakeImageFromEncoded(unwrap<DataHost>(data).bytes);
				return image ? new ImageHost(image) : null;
			},
		},
		Typeface: {
			MakeFreeTypeFaceFromData: (data: unknown) => {
				const bytes = Uint8Array.from(unwrap<DataHost>(data).bytes);
				const typeface = canvasKit.Typeface.MakeFreeTypeFaceFromData(bytes.buffer);
				return typeface ? new TypefaceHost(typeface, bytes) : null;
			},
		},
		TypefaceFontProvider: {
			Make: () => new TypefaceFontProviderHost(canvasKit.TypefaceFontProvider.Make()),
		},
		FontMgr: {
			System: () => systemFontHost,
		},
		ParagraphBuilder: {
			Make: (style: unknown, fontManager: unknown) => new ParagraphBuilderHost(
				canvasKit.ParagraphBuilder.Make(convertParagraphStyle(style), unwrap<FontMgr>(fontManager)),
			),
			MakeFromFontProvider: (style: unknown, fontManager: unknown) => new ParagraphBuilderHost(
				canvasKit.ParagraphBuilder.MakeFromFontProvider(
					convertParagraphStyle(style),
					unwrap<TypefaceFontProvider>(fontManager),
				),
			),
		},
		ColorFilter: {
			MakeCompose: (outer: unknown, inner: unknown) => new DisposableHost<ColorFilter>(
				canvasKit.ColorFilter.MakeCompose(unwrap<ColorFilter>(outer), unwrap<ColorFilter>(inner)),
				"ColorFilter",
			),
		},
		ImageFilter: {
			MakeCompose: (outer: unknown, inner: unknown) => new DisposableHost<ImageFilter>(
				canvasKit.ImageFilter.MakeCompose(
					outer == null ? null : unwrap<ImageFilter>(outer),
					inner == null ? null : unwrap<ImageFilter>(inner),
				),
				"ImageFilter",
			),
			MakeDropShadow: (
				dx: number,
				dy: number,
				sigmaX: number,
				sigmaY: number,
				shadowColor: unknown,
				input: unknown,
			) => new DisposableHost<ImageFilter>(canvasKit.ImageFilter.MakeDropShadow(
				dx,
				dy,
				sigmaX,
				sigmaY,
				color(shadowColor),
				input == null ? null : unwrap<ImageFilter>(input),
			), "ImageFilter"),
			MakeDropShadowOnly: (
				dx: number,
				dy: number,
				sigmaX: number,
				sigmaY: number,
				shadowColor: unknown,
				input: unknown,
			) => new DisposableHost<ImageFilter>(canvasKit.ImageFilter.MakeDropShadowOnly(
				dx,
				dy,
				sigmaX,
				sigmaY,
				color(shadowColor),
				input == null ? null : unwrap<ImageFilter>(input),
			), "ImageFilter"),
		},
		PathEffect: {
			MakeCompose: (outer: unknown, inner: unknown) => {
				unsupportedCapabilities.add("SkiaApi.PathEffect.MakeCompose");
				return outer ?? inner;
			},
			MakeSum: (first: unknown, second: unknown) => {
				unsupportedCapabilities.add("SkiaApi.PathEffect.MakeSum");
				return first ?? second;
			},
			MakeDash: (intervals: number[], phase = 0) => new DisposableHost<PathEffect>(
				canvasKit.PathEffect.MakeDash(intervals, phase),
				"PathEffect",
			),
		},
		MaskFilter: {
			MakeBlur: (style: number, sigma: number, respectCTM: boolean) => {
				const filter = canvasKit.MaskFilter.MakeBlur(
					enumByValue(canvasKit.BlurStyle, style),
					sigma,
					respectCTM,
				);
				return filter ? new DisposableHost(filter, "MaskFilter") : null;
			},
		},
		PaintStyle: numericEnum(canvasKit.PaintStyle),
		StrokeCap: numericEnum(canvasKit.StrokeCap),
		StrokeJoin: numericEnum(canvasKit.StrokeJoin),
		BlendMode: numericEnum(canvasKit.BlendMode),
		ClipOp: numericEnum(canvasKit.ClipOp),
		BlurStyle: numericEnum(canvasKit.BlurStyle),
		FilterMode: numericEnum(canvasKit.FilterMode),
		MipmapMode: numericEnum(canvasKit.MipmapMode),
		AlphaType: numericEnum(canvasKit.AlphaType),
		ColorType: numericEnum(canvasKit.ColorType),
		TextAlign: numericEnum(canvasKit.TextAlign),
		TextDirection: numericEnum(canvasKit.TextDirection),
		FontSlant: numericEnum(canvasKit.FontSlant),
	};

	const api = new Proxy(baseApi, {
		get(target, property, receiver) {
			if (typeof property === "symbol" || Reflect.has(target, property)) return Reflect.get(target, property, receiver);
			const capability = `SkiaApi.${String(property)}`;
			unsupportedCapabilities.add(capability);
			return undefined;
		},
	});

	const viewApi: Record<string, unknown> = {
		setJsiProperty(viewId: number, property: string, value: unknown) {
			if (property !== "picture" || value == null) return;
			const picture = value as PictureHost;
			const previous = viewPictures.get(viewId);
			if (previous && previous !== picture) {
				ownedPictures.delete(previous);
				previous.dispose();
			}
			viewPictures.set(viewId, picture);
			latestPicture = picture;
			pictureUpdates++;
		},
		requestRedraw: (_viewId: number) => undefined,
		makeImageSnapshot: (_viewId: number) => null,
		makeImageSnapshotAsync: async (_viewId: number) => null,
	};

	return {
		api,
		viewApi,
		setViewOrder(viewIds: number[]): void {
			compositionOrder = [...new Set(viewIds.filter(viewId => Number.isInteger(viewId)))];
		},
		exportLatestPng(outputPath: string, viewId?: number): CanvasKitSkiaPngArtifact {
			const orderedViewIds = [
				...compositionOrder.filter(viewId => viewPictures.has(viewId)),
				...[...viewPictures.keys()]
					.filter(viewId => !compositionOrder.includes(viewId))
					.sort((left, right) => left - right),
			];
			const renderPictures = viewId === undefined
				? orderedViewIds.map(orderedViewId => viewPictures.get(orderedViewId)!).filter(Boolean)
				: [viewPictures.get(viewId)].filter((picture): picture is PictureHost => picture !== undefined);
			if (!renderPictures.length && viewId === undefined && latestPicture) renderPictures.push(latestPicture);
			if (!renderPictures.length) throw new Error("Das AppPlugin hat noch kein Skia-Picture geliefert.");
			const surface = canvasKit.MakeSurface(options.width, options.height);
			if (!surface) throw new Error("CanvasKit konnte keine Offscreen-Fläche erzeugen.");
			const canvas = surface.getCanvas();
			canvas.clear(canvasKit.TRANSPARENT);
			for (const renderPicture of renderPictures) canvas.drawPicture(renderPicture.ref);
			surface.flush();
			const image = surface.makeImageSnapshot();
			const png = image.encodeToBytes(canvasKit.ImageFormat.PNG, 100);
			if (!png) {
				image.delete();
				surface.delete();
				throw new Error("CanvasKit konnte das AppPlugin-Picture nicht als PNG kodieren.");
			}
			const absoluteOutputPath = nodePath.resolve(outputPath);
			fs.mkdirSync(nodePath.dirname(absoluteOutputPath), { recursive: true });
			fs.writeFileSync(absoluteOutputPath, png);
			image.delete();
			surface.delete();
			return {
				outputPath: absoluteOutputPath,
				width: options.width,
				height: options.height,
				sha256: crypto.createHash("sha256").update(png).digest("hex"),
				bytes: png.byteLength,
			};
		},
		getDiagnostics: () => ({
			canvasKitVersion: "0.41.1",
			fontPaths: [...fontPaths],
			loadedAssets: [...loadedAssets].sort(),
			unsupportedCapabilities: [...unsupportedCapabilities].sort(),
			pictureUpdates,
			viewIds: [...viewPictures.keys()].sort((left, right) => left - right),
			compositionOrder: [...compositionOrder],
			pictureViews: [...viewPictures.entries()]
				.map(([viewId, picture]) => ({
					viewId,
					approximateBytesUsed: picture.ref.approximateBytesUsed(),
					cullRect: Array.from(picture.ref.cullRect()),
					drawImageRects: picture.drawImageRects.map(entry => ({ ...entry })),
					drawAtlasCount: picture.drawAtlasCount,
				}))
				.sort((left, right) => left.viewId - right.viewId),
		}),
		dispose(): void {
			for (const picture of ownedPictures) picture.dispose();
			ownedPictures.clear();
			viewPictures.clear();
			systemFontManager.delete();
		},
	};
}
