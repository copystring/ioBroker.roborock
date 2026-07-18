import type { ApkUiAffineTransform, ApkUiHitTestRuntime, ApkUiLayoutBox } from "./apkUiHitTestRuntime";
import type {
	ApkNativeMeasuredBox,
	ApkUiManagerNodeSnapshot,
	ApkUiManagerOperation,
} from "./apkUiManagerRuntime";
import { createApkViewAffineTransform } from "./apkViewTransformRuntime";
import type { ApkYogaLayoutEntry } from "./apkYogaLayoutRuntime";

export const APK_LAYOUT_ONLY_PROPS = new Set([
	"alignSelf",
	"alignItems",
	"collapsable",
	"flex",
	"flexBasis",
	"flexDirection",
	"flexGrow",
	"rowGap",
	"columnGap",
	"gap",
	"flexShrink",
	"flexWrap",
	"justifyContent",
	"alignContent",
	"display",
	"position",
	"right",
	"top",
	"bottom",
	"left",
	"start",
	"end",
	"width",
	"height",
	"minWidth",
	"maxWidth",
	"minHeight",
	"maxHeight",
	"margin",
	"marginVertical",
	"marginHorizontal",
	"marginLeft",
	"marginRight",
	"marginTop",
	"marginBottom",
	"marginStart",
	"marginEnd",
	"padding",
	"paddingVertical",
	"paddingHorizontal",
	"paddingLeft",
	"paddingRight",
	"paddingTop",
	"paddingBottom",
	"paddingStart",
	"paddingEnd",
] as const);

const transparentBorderColorProps = new Set([
	"borderLeftColor",
	"borderRightColor",
	"borderTopColor",
	"borderBottomColor",
	"borderBlockColor",
	"borderBlockEndColor",
	"borderBlockStartColor",
]);

const zeroBorderWidthProps = new Set([
	"borderWidth",
	"borderLeftWidth",
	"borderTopWidth",
	"borderRightWidth",
	"borderBottomWidth",
]);

interface ShadowPixelMetrics {
	x: number;
	y: number;
	width: number;
	height: number;
}

type NativeDisposition = "layout-only" | "native";

export interface ApkNativeViewLayoutEntry {
	tag: number;
	box: Readonly<ApkUiLayoutBox>;
}

export interface ApkNativeViewHierarchySnapshot {
	root: ApkUiManagerNodeSnapshot;
	layouts: readonly Readonly<ApkNativeViewLayoutEntry>[];
	collapsedTags: readonly number[];
	virtualTags: readonly number[];
}

function propsRecord(value: unknown, context: string): Readonly<Record<string, unknown>> | null {
	if (value === null || value === undefined) return null;
	if (typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${context} muss ein Props-Objekt oder null sein`);
	}
	return value as Readonly<Record<string, unknown>>;
}

function finiteNumber(value: unknown, property: string): number {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new Error(`${property} muss für die APK-Hierarchie eine endliche Zahl sein`);
	}
	return value;
}

function nullableDefaultNumber(value: unknown, defaultValue: number, property: string): number {
	return value === null || value === undefined ? defaultValue : finiteNumber(value, property);
}

/** Reproduces ViewProps.isLayoutOnly from the React-Native runtime embedded in the APK. */
export function isApkLayoutOnlyProp(
	props: Readonly<Record<string, unknown>>,
	property: string,
): boolean {
	if (APK_LAYOUT_ONLY_PROPS.has(property as never)) return true;
	const value = props[property];
	if (property === "pointerEvents") return value === "auto" || value === "box-none";
	if (property === "opacity") return nullableDefaultNumber(value, 1, property) === 1;
	if (property === "borderRadius") {
		if (Object.hasOwn(props, "backgroundColor")) {
			const backgroundColor = props.backgroundColor;
			if (backgroundColor !== null && backgroundColor !== undefined) {
				if (typeof backgroundColor !== "number" || !Number.isInteger(backgroundColor)) return false;
				if (backgroundColor !== 0) return false;
			}
		}
		if (Object.hasOwn(props, "borderWidth")
			&& nullableDefaultNumber(props.borderWidth, 0, "borderWidth") !== 0) return false;
		return true;
	}
	if (transparentBorderColorProps.has(property)) {
		return typeof value === "number" && Number.isInteger(value) && value === 0;
	}
	if (zeroBorderWidthProps.has(property)) {
		return nullableDefaultNumber(value, 0, property) === 0;
	}
	if (property === "overflow") return value === null || value === undefined || value === "visible";
	return false;
}

/** Reproduces NativeViewHierarchyOptimizer.isLayoutOnlyAndCollapsable. */
export function isApkLayoutOnlyAndCollapsable(
	props: Readonly<Record<string, unknown>> | null | undefined,
): boolean {
	if (!props) return true;
	if (Object.hasOwn(props, "collapsable")) {
		const collapsable = props.collapsable;
		if (collapsable !== null && collapsable !== undefined && typeof collapsable !== "boolean") {
			throw new Error("collapsable muss ein boolescher Wert sein");
		}
		if (collapsable === false) return false;
	}
	return Object.keys(props).every(property => isApkLayoutOnlyProp(props, property));
}

function isCompoundVirtualNode(node: ApkUiManagerNodeSnapshot): boolean {
	return node.viewName === "RCTRawText"
		|| node.viewName === "RCTVirtualText"
		|| node.viewName.startsWith("RNSVG") && node.viewName !== "RNSVGSvgViewAndroid";
}

function cloneNativeNode(
	node: ApkUiManagerNodeSnapshot,
	children: ApkUiManagerNodeSnapshot[],
): ApkUiManagerNodeSnapshot {
	return {
		tag: node.tag,
		viewName: node.viewName,
		rootTag: node.rootTag,
		props: Object.freeze({ ...node.props }),
		children,
	};
}

function operationTag(operation: ApkUiManagerOperation, index: number): number {
	const tag = operation.arguments[index];
	if (!Number.isSafeInteger(tag) || (tag as number) < 1) {
		throw new Error(`UIManager.${operation.method} enthält keinen gültigen React-Tag`);
	}
	return tag as number;
}

function operationViewName(operation: ApkUiManagerOperation, index: number): string {
	const viewName = operation.arguments[index];
	if (typeof viewName !== "string" || viewName.length === 0) {
		throw new Error(`UIManager.${operation.method} enthält keinen gültigen ViewManager-Namen`);
	}
	return viewName;
}

function yogaLayoutMap(entries: readonly Readonly<ApkYogaLayoutEntry>[]): Map<number, Readonly<ApkUiLayoutBox>> {
	const result = new Map<number, Readonly<ApkUiLayoutBox>>();
	for (const entry of entries) {
		if (result.has(entry.tag)) throw new Error(`Yoga-Layout für React-Tag ${entry.tag} ist doppelt vorhanden`);
		result.set(entry.tag, entry.box);
	}
	return result;
}

/**
 * Reproduces the APK's legacy NativeViewHierarchyOptimizer over the UIManager
 * shadow tree. Layout-only RCTViews disappear from the native tree, but their
 * rounded offsets remain part of the nearest native descendant's frame.
 */
export class ApkNativeViewHierarchyRuntime {
	readonly #dispositions = new Map<number, NativeDisposition>();
	readonly #viewNames = new Map<number, string>();
	readonly #scrollOffsets = new Map<number, Readonly<{ x: number; y: number }>>();
	readonly #density: number;
	#operationCursor = 0;
	#snapshot?: Readonly<ApkNativeViewHierarchySnapshot>;
	readonly #appliedHitTestTags = new Set<number>();
	#visualMutationRevision = 0;

	public constructor(private readonly rootTag: number, density = 1) {
		if (!Number.isSafeInteger(rootTag) || rootTag < 1) {
			throw new Error("Root-Tag muss eine positive ganze Zahl sein");
		}
		this.#density = finiteNumber(density, "Display-Dichte");
		if (this.#density <= 0) throw new Error("Display-Dichte muss positiv sein");
	}

	public synchronize(operations: readonly ApkUiManagerOperation[]): void {
		if (operations.length < this.#operationCursor) {
			throw new Error("Der UIManager-Operationsstrom darf nicht rückwärts laufen");
		}
		for (let index = this.#operationCursor; index < operations.length; index += 1) {
			this.#observe(operations[index]);
		}
		this.#operationCursor = operations.length;
	}

	public rebuild(
		shadowRoot: ApkUiManagerNodeSnapshot,
		yogaLayouts: readonly Readonly<ApkYogaLayoutEntry>[],
		operations: readonly ApkUiManagerOperation[],
	): Readonly<ApkNativeViewHierarchySnapshot> {
		this.synchronize(operations);
		if (shadowRoot.tag !== this.rootTag || shadowRoot.rootTag !== this.rootTag) {
			throw new Error(`Shadow Tree gehört nicht zu Root-Tag ${this.rootTag}`);
		}
		const yoga = yogaLayoutMap(yogaLayouts);
		const metrics = new Map<number, ShadowPixelMetrics>();
		this.#measureShadowPixels(shadowRoot, yoga, metrics, 0, 0);
		const nativeLayouts: ApkNativeViewLayoutEntry[] = [];
		const collapsedTags: number[] = [];
		const virtualTags: number[] = [];
		const roots = this.#materialize(
			shadowRoot,
			metrics,
			nativeLayouts,
			collapsedTags,
			virtualTags,
			0,
			0,
			true,
		);
		if (roots.length !== 1 || roots[0].tag !== this.rootTag) {
			throw new Error("Die APK-native Hierarchie besitzt keine eindeutige Root-View");
		}
		const currentTags = new Set(nativeLayouts.map(entry => entry.tag));
		for (const tag of this.#scrollOffsets.keys()) {
			if (!currentTags.has(tag)) this.#scrollOffsets.delete(tag);
		}
		this.#snapshot = Object.freeze({
			root: roots[0],
			layouts: Object.freeze(nativeLayouts.map(entry => Object.freeze({
				tag: entry.tag,
				box: Object.freeze({
					...entry.box,
					...(this.#scrollOffsets.has(entry.tag)
						? {
							scrollX: this.#scrollOffsets.get(entry.tag)?.x,
							scrollY: this.#scrollOffsets.get(entry.tag)?.y,
						}
						: {}),
				}),
			}))),
			collapsedTags: Object.freeze([...collapsedTags]),
			virtualTags: Object.freeze([...virtualTags]),
		});
		return this.#snapshot;
	}

	public snapshot(): Readonly<ApkNativeViewHierarchySnapshot> {
		if (!this.#snapshot) throw new Error("Die APK-native Hierarchie wurde noch nicht aufgebaut");
		return this.#snapshot;
	}

	public visualMutationRevision(): number {
		return this.#visualMutationRevision;
	}

	public setScrollOffset(tag: number, x: number, y: number): boolean {
		if (!Number.isSafeInteger(tag) || tag < 1) throw new Error("Scroll-Tag muss eine positive ganze Zahl sein");
		finiteNumber(x, "scrollX");
		finiteNumber(y, "scrollY");
		const snapshot = this.snapshot();
		if (!snapshot.layouts.some(entry => entry.tag === tag)) {
			throw new Error(`Native ScrollView mit React-Tag ${tag} existiert nicht`);
		}
		const previous = this.#scrollOffsets.get(tag) ?? { x: 0, y: 0 };
		if (previous.x === x && previous.y === y) return false;
		this.#scrollOffsets.set(tag, Object.freeze({ x, y }));
		this.#snapshot = Object.freeze({
			...snapshot,
			layouts: Object.freeze(snapshot.layouts.map(entry => entry.tag === tag
				? Object.freeze({
					tag: entry.tag,
					box: Object.freeze({ ...entry.box, scrollX: x, scrollY: y }),
				})
				: entry)),
		});
		this.#visualMutationRevision += 1;
		return true;
	}

	public applyToHitTest(hitTest: ApkUiHitTestRuntime): void {
		const snapshot = this.snapshot();
		const currentTags = new Set(snapshot.layouts.map(entry => entry.tag));
		for (const tag of this.#appliedHitTestTags) {
			if (!currentTags.has(tag)) hitTest.removeLayout(tag);
		}
		for (const entry of snapshot.layouts) hitTest.setLayout(entry.tag, entry.box);
		this.#appliedHitTestTags.clear();
		for (const tag of currentTags) this.#appliedHitTestTags.add(tag);
	}

	public measure(tag: number): Readonly<ApkNativeMeasuredBox> | undefined {
		const snapshot = this.snapshot();
		const path = this.#findNativePath(snapshot.root, tag);
		if (!path) return undefined;
		const layouts = new Map(snapshot.layouts.map(entry => [entry.tag, entry.box]));
		let matrix: ApkUiAffineTransform = { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 };
		for (let index = 0; index < path.length; index += 1) {
			const box = layouts.get(path[index].tag);
			if (!box) return undefined;
			const parentBox = index > 0 ? layouts.get(path[index - 1].tag) : undefined;
			const transform = box.transform ?? { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 };
			matrix = this.#multiply(matrix, {
				...transform,
				tx: box.x - (parentBox?.scrollX ?? 0) + transform.tx,
				ty: box.y - (parentBox?.scrollY ?? 0) + transform.ty,
			});
		}
		const target = layouts.get(tag);
		const root = layouts.get(snapshot.root.tag);
		if (!target || !root) return undefined;
		const bounds = this.#transformedBounds(matrix, target.width, target.height);
		const rootTransform = root.transform ?? { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 };
		const rootBounds = this.#transformedBounds({
			...rootTransform,
			tx: root.x + rootTransform.tx,
			ty: root.y + rootTransform.ty,
		}, root.width, root.height);
		const left = this.#roundToPixel(bounds.left) - this.#roundToPixel(rootBounds.left);
		const top = this.#roundToPixel(bounds.top) - this.#roundToPixel(rootBounds.top);
		const right = this.#roundToPixel(bounds.right) - this.#roundToPixel(rootBounds.left);
		const bottom = this.#roundToPixel(bounds.bottom) - this.#roundToPixel(rootBounds.top);
		return Object.freeze({ x: left, y: top, width: right - left, height: bottom - top });
	}

	#observe(operation: ApkUiManagerOperation): void {
		if (operation.method === "createView") {
			const tag = operationTag(operation, 0);
			const viewName = operationViewName(operation, 1);
			const props = propsRecord(operation.arguments[3], `UIManager.createView(${tag})`);
			this.#viewNames.set(tag, viewName);
			this.#dispositions.set(tag, viewName === "RCTView" && isApkLayoutOnlyAndCollapsable(props)
				? "layout-only"
				: "native");
			return;
		}
		if (operation.method !== "updateView") return;
		const tag = operationTag(operation, 0);
		const viewName = operationViewName(operation, 1);
		const knownViewName = this.#viewNames.get(tag);
		if (knownViewName !== viewName) {
			throw new Error(`UIManager.updateView für React-Tag ${tag} passt nicht zu ${String(knownViewName)}`);
		}
		if (this.#dispositions.get(tag) !== "layout-only") return;
		const props = propsRecord(operation.arguments[2], `UIManager.updateView(${tag})`);
		if (!isApkLayoutOnlyAndCollapsable(props)) this.#dispositions.set(tag, "native");
	}

	#measureShadowPixels(
		node: ApkUiManagerNodeSnapshot,
		yoga: ReadonlyMap<number, Readonly<ApkUiLayoutBox>>,
		metrics: Map<number, ShadowPixelMetrics>,
		absoluteParentX: number,
		absoluteParentY: number,
	): void {
		if (isCompoundVirtualNode(node)) return;
		const box = yoga.get(node.tag);
		if (!box) throw new Error(`Für Shadow-Tag ${node.tag} fehlt das Yoga-Layout`);
		const absoluteLeft = absoluteParentX + box.x;
		const absoluteTop = absoluteParentY + box.y;
		metrics.set(node.tag, {
			x: this.#roundToPixel(box.x),
			y: this.#roundToPixel(box.y),
			width: this.#roundToPixel(absoluteLeft + box.width) - this.#roundToPixel(absoluteLeft),
			height: this.#roundToPixel(absoluteTop + box.height) - this.#roundToPixel(absoluteTop),
		});
		for (const child of node.children) {
			this.#measureShadowPixels(child, yoga, metrics, absoluteLeft, absoluteTop);
		}
	}

	#materialize(
		node: ApkUiManagerNodeSnapshot,
		metrics: ReadonlyMap<number, ShadowPixelMetrics>,
		nativeLayouts: ApkNativeViewLayoutEntry[],
		collapsedTags: number[],
		virtualTags: number[],
		carriedX: number,
		carriedY: number,
		isRoot: boolean,
	): ApkUiManagerNodeSnapshot[] {
		if (isCompoundVirtualNode(node)) {
			virtualTags.push(node.tag);
			return [];
		}
		const pixel = metrics.get(node.tag);
		if (!pixel) throw new Error(`Für Shadow-Tag ${node.tag} fehlen gerundete APK-Pixelwerte`);
		const disposition = isRoot ? "native" : this.#disposition(node);
		const x = carriedX + pixel.x;
		const y = carriedY + pixel.y;
		if (disposition === "layout-only") {
			collapsedTags.push(node.tag);
			return node.children.flatMap(child => this.#materialize(
				child,
				metrics,
				nativeLayouts,
				collapsedTags,
				virtualTags,
				x,
				y,
				false,
			));
		}
		const children = node.children.flatMap(child => this.#materialize(
			child,
			metrics,
			nativeLayouts,
			collapsedTags,
			virtualTags,
			0,
			0,
			false,
		));
		const enabled = node.props.enabled;
		if (enabled !== undefined && enabled !== null && typeof enabled !== "boolean") {
			throw new Error(`enabled von React-Tag ${node.tag} muss boolesch sein`);
		}
		const transform = createApkViewAffineTransform(
			node.props.transform,
			pixel.width,
			pixel.height,
			node.props.transformOrigin,
		);
		nativeLayouts.push({
			tag: node.tag,
			box: {
				x,
				y,
				width: pixel.width,
				height: pixel.height,
				enabled: enabled as boolean | undefined,
				transform,
			},
		});
		return [cloneNativeNode(node, children)];
	}

	#disposition(node: ApkUiManagerNodeSnapshot): NativeDisposition {
		const disposition = this.#dispositions.get(node.tag);
		const viewName = this.#viewNames.get(node.tag);
		if (!disposition || viewName !== node.viewName) {
			throw new Error(`createView-Lebenszyklus für React-Tag ${node.tag} wurde nicht beobachtet`);
		}
		return disposition;
	}

	#findNativePath(
		node: ApkUiManagerNodeSnapshot,
		tag: number,
	): ApkUiManagerNodeSnapshot[] | undefined {
		if (node.tag === tag) return [node];
		for (const child of node.children) {
			const childPath = this.#findNativePath(child, tag);
			if (childPath) return [node, ...childPath];
		}
		return undefined;
	}

	#multiply(
		left: Readonly<ApkUiAffineTransform>,
		right: Readonly<ApkUiAffineTransform>,
	): ApkUiAffineTransform {
		return {
			a: left.a * right.a + left.c * right.b,
			b: left.b * right.a + left.d * right.b,
			c: left.a * right.c + left.c * right.d,
			d: left.b * right.c + left.d * right.d,
			tx: left.a * right.tx + left.c * right.ty + left.tx,
			ty: left.b * right.tx + left.d * right.ty + left.ty,
		};
	}

	#transformedBounds(
		matrix: Readonly<ApkUiAffineTransform>,
		width: number,
		height: number,
	): Readonly<{ left: number; top: number; right: number; bottom: number }> {
		const points = [
			{ x: 0, y: 0 },
			{ x: width, y: 0 },
			{ x: 0, y: height },
			{ x: width, y: height },
		].map(point => ({
			x: matrix.a * point.x + matrix.c * point.y + matrix.tx,
			y: matrix.b * point.x + matrix.d * point.y + matrix.ty,
		}));
		return {
			left: Math.min(...points.map(point => point.x)),
			top: Math.min(...points.map(point => point.y)),
			right: Math.max(...points.map(point => point.x)),
			bottom: Math.max(...points.map(point => point.y)),
		};
	}

	#roundToPixel(value: number): number {
		return Math.round(value * this.#density) / this.#density;
	}
}
