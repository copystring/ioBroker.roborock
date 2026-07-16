import Yoga, {
	Align,
	Direction,
	Display,
	Edge,
	Errata,
	FlexDirection,
	Gutter,
	Justify,
	MeasureMode,
	Overflow,
	PositionType,
	Wrap,
	type Node as YogaNode
} from "yoga-layout/sync";

import type { ApkUiHitTestRuntime, ApkUiLayoutBox } from "./apkUiHitTestRuntime";
import type { ApkUiManagerNodeSnapshot } from "./apkUiManagerRuntime";

export const APK_YOGA_RUNTIME_PROFILE = Object.freeze({
	packageName: "yoga-layout",
	packageVersion: "2.0.1",
	useWebDefaults: false,
	pointScaleFactor: 0,
	errata: "all"
} as const);

export interface ApkYogaMeasureRequest {
	node: ApkUiManagerNodeSnapshot;
	text: string;
	/** Physical Android pixels, matching ReactTextShadowNode's Yoga callback. */
	width: number;
	widthMode: MeasureMode;
	/** Physical Android pixels, matching ReactTextShadowNode's Yoga callback. */
	height: number;
	heightMode: MeasureMode;
}

export interface ApkYogaMeasureSize {
	/** Physical Android pixels. */
	width: number;
	/** Physical Android pixels. */
	height: number;
}

export type ApkYogaMeasureNode = (request: Readonly<ApkYogaMeasureRequest>) => Readonly<ApkYogaMeasureSize>;

export interface ApkYogaLayoutRuntimeOptions {
	/** Logical Android DIP exposed to JavaScript. */
	width: number;
	/** Logical Android DIP exposed to JavaScript. */
	height: number;
	/** Android display density. Yoga itself runs in physical pixels like the APK. */
	density?: number;
	direction?: "ltr" | "rtl";
	measureNode?: ApkYogaMeasureNode;
}

export interface ApkYogaLayoutEntry {
	tag: number;
	/** Logical Android DIP exposed to JavaScript and the web host. */
	box: Readonly<ApkUiLayoutBox>;
}

type YogaLength = number | "auto" | `${number}%`;

const alignValues: Readonly<Record<string, Align>> = {
	auto: Align.Auto,
	"flex-start": Align.FlexStart,
	center: Align.Center,
	"flex-end": Align.FlexEnd,
	stretch: Align.Stretch,
	baseline: Align.Baseline,
	"space-between": Align.SpaceBetween,
	"space-around": Align.SpaceAround
};

const justifyValues: Readonly<Record<string, Justify>> = {
	"flex-start": Justify.FlexStart,
	center: Justify.Center,
	"flex-end": Justify.FlexEnd,
	"space-between": Justify.SpaceBetween,
	"space-around": Justify.SpaceAround,
	"space-evenly": Justify.SpaceEvenly
};

const flexDirectionValues: Readonly<Record<string, FlexDirection>> = {
	column: FlexDirection.Column,
	"column-reverse": FlexDirection.ColumnReverse,
	row: FlexDirection.Row,
	"row-reverse": FlexDirection.RowReverse
};

const wrapValues: Readonly<Record<string, Wrap>> = {
	nowrap: Wrap.NoWrap,
	wrap: Wrap.Wrap,
	"wrap-reverse": Wrap.WrapReverse
};

const edgeProps = [
	["margin", Edge.All],
	["marginVertical", Edge.Vertical],
	["marginHorizontal", Edge.Horizontal],
	["marginLeft", Edge.Left],
	["marginTop", Edge.Top],
	["marginRight", Edge.Right],
	["marginBottom", Edge.Bottom],
	["marginStart", Edge.Start],
	["marginEnd", Edge.End]
] as const;

const paddingProps = [
	["padding", Edge.All],
	["paddingVertical", Edge.Vertical],
	["paddingHorizontal", Edge.Horizontal],
	["paddingLeft", Edge.Left],
	["paddingTop", Edge.Top],
	["paddingRight", Edge.Right],
	["paddingBottom", Edge.Bottom],
	["paddingStart", Edge.Start],
	["paddingEnd", Edge.End]
] as const;

const positionProps = [
	["left", Edge.Left],
	["top", Edge.Top],
	["right", Edge.Right],
	["bottom", Edge.Bottom],
	["start", Edge.Start],
	["end", Edge.End]
] as const;

const borderProps = [
	["borderWidth", Edge.All],
	["borderLeftWidth", Edge.Left],
	["borderTopWidth", Edge.Top],
	["borderRightWidth", Edge.Right],
	["borderBottomWidth", Edge.Bottom],
	["borderStartWidth", Edge.Start],
	["borderEndWidth", Edge.End]
] as const;

function finiteNumber(value: unknown, name: string): number | undefined {
	if (value === undefined || value === null) return undefined;
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new Error(`${name} muss eine endliche Zahl sein`);
	}
	return value;
}

function yogaLength(value: unknown, name: string, allowAuto: boolean): YogaLength | undefined {
	if (value === undefined || value === null) return undefined;
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (allowAuto && value === "auto") return value;
	if (typeof value === "string" && /^-?(?:\d+(?:\.\d+)?|\.\d+)%$/u.test(value)) {
		return value as `${number}%`;
	}
	throw new Error(`${name} besitzt keinen APK-kompatiblen Yoga-Wert: ${String(value)}`);
}

function physicalYogaLength(value: YogaLength, density: number): YogaLength {
	return typeof value === "number" ? value * density : value;
}

function enumValue<T>(value: unknown, name: string, values: Readonly<Record<string, T>>): T | undefined {
	if (value === undefined || value === null) return undefined;
	if (typeof value !== "string" || values[value] === undefined) {
		throw new Error(`${name} besitzt einen unbekannten Yoga-Wert: ${String(value)}`);
	}
	return values[value];
}

function rawText(node: ApkUiManagerNodeSnapshot): string {
	if (node.viewName === "RCTRawText") {
		const value = node.props.text;
		return typeof value === "string" ? value : "";
	}
	return node.children.map(rawText).join("");
}

function isVirtualYogaNode(node: ApkUiManagerNodeSnapshot): boolean {
	return (
		node.viewName === "RCTRawText" || (node.viewName.startsWith("RNSVG") && node.viewName !== "RNSVGSvgViewAndroid")
	);
}

function yogaChildren(node: ApkUiManagerNodeSnapshot): readonly ApkUiManagerNodeSnapshot[] {
	if (node.viewName === "RCTText" || node.viewName === "RNSVGSvgViewAndroid") return [];
	return node.children.filter(child => !isVirtualYogaNode(child));
}

function setDimension(
	node: YogaNode,
	props: Readonly<Record<string, unknown>>,
	property: "width" | "height" | "minWidth" | "minHeight" | "maxWidth" | "maxHeight" | "flexBasis",
	density: number
): void {
	const logicalValue = yogaLength(
		props[property],
		property,
		property === "width" || property === "height" || property === "flexBasis"
	);
	if (logicalValue === undefined) return;
	const value = physicalYogaLength(logicalValue, density);
	switch (property) {
		case "width":
			node.setWidth(value);
			break;
		case "height":
			node.setHeight(value);
			break;
		case "minWidth":
			node.setMinWidth(value as number | `${number}%`);
			break;
		case "minHeight":
			node.setMinHeight(value as number | `${number}%`);
			break;
		case "maxWidth":
			node.setMaxWidth(value as number | `${number}%`);
			break;
		case "maxHeight":
			node.setMaxHeight(value as number | `${number}%`);
			break;
		case "flexBasis":
			node.setFlexBasis(value);
			break;
	}
}

function setMargin(node: YogaNode, edge: Edge, value: YogaLength): void {
	node.setMargin(edge, value);
}

function setPadding(node: YogaNode, edge: Edge, value: YogaLength): void {
	if (value === "auto") throw new Error("Yoga-Padding unterstützt keinen auto-Wert");
	node.setPadding(edge, value);
}

function setPosition(node: YogaNode, edge: Edge, value: YogaLength): void {
	if (value === "auto") throw new Error("Yoga-Positionen unterstützen keinen auto-Wert");
	node.setPosition(edge, value);
}

function applyYogaStyle(node: YogaNode, snapshot: ApkUiManagerNodeSnapshot, density: number): void {
	const props = snapshot.props;
	for (const property of [
		"width",
		"height",
		"minWidth",
		"minHeight",
		"maxWidth",
		"maxHeight",
		"flexBasis"
	] as const) {
		setDimension(node, props, property, density);
	}
	const flex = finiteNumber(props.flex, "flex");
	if (flex !== undefined) node.setFlex(flex);
	const flexGrow = finiteNumber(props.flexGrow, "flexGrow");
	if (flexGrow !== undefined) node.setFlexGrow(flexGrow);
	const flexShrink = finiteNumber(props.flexShrink, "flexShrink");
	if (flexShrink !== undefined) node.setFlexShrink(flexShrink);
	const aspectRatio = finiteNumber(props.aspectRatio, "aspectRatio");
	if (aspectRatio !== undefined) node.setAspectRatio(aspectRatio);

	const flexDirection = enumValue(props.flexDirection, "flexDirection", flexDirectionValues);
	if (flexDirection !== undefined) node.setFlexDirection(flexDirection);
	const flexWrap = enumValue(props.flexWrap, "flexWrap", wrapValues);
	if (flexWrap !== undefined) node.setFlexWrap(flexWrap);
	const justifyContent = enumValue(props.justifyContent, "justifyContent", justifyValues);
	if (justifyContent !== undefined) node.setJustifyContent(justifyContent);
	const alignItems = enumValue(props.alignItems, "alignItems", alignValues);
	if (alignItems !== undefined) node.setAlignItems(alignItems);
	const alignSelf = enumValue(props.alignSelf, "alignSelf", alignValues);
	if (alignSelf !== undefined) node.setAlignSelf(alignSelf);
	const alignContent = enumValue(props.alignContent, "alignContent", alignValues);
	if (alignContent !== undefined) node.setAlignContent(alignContent);

	if (props.position !== undefined && props.position !== null) {
		if (props.position === "absolute") node.setPositionType(PositionType.Absolute);
		else if (props.position === "relative") node.setPositionType(PositionType.Relative);
		else throw new Error(`position besitzt einen unbekannten Yoga-Wert: ${String(props.position)}`);
	}
	if (props.display !== undefined && props.display !== null) {
		if (props.display === "none") node.setDisplay(Display.None);
		else if (props.display === "flex") node.setDisplay(Display.Flex);
		else throw new Error(`display besitzt einen unbekannten Yoga-Wert: ${String(props.display)}`);
	}
	if (props.overflow !== undefined && props.overflow !== null) {
		if (props.overflow === "visible") node.setOverflow(Overflow.Visible);
		else if (props.overflow === "hidden") node.setOverflow(Overflow.Hidden);
		else if (props.overflow === "scroll") node.setOverflow(Overflow.Scroll);
		else throw new Error(`overflow besitzt einen unbekannten Yoga-Wert: ${String(props.overflow)}`);
	}

	for (const [property, edge] of edgeProps) {
		const value = yogaLength(props[property], property, true);
		if (value !== undefined) setMargin(node, edge, physicalYogaLength(value, density));
	}
	for (const [property, edge] of paddingProps) {
		const value = yogaLength(props[property], property, false);
		if (value !== undefined) setPadding(node, edge, physicalYogaLength(value, density));
	}
	for (const [property, edge] of positionProps) {
		const value = yogaLength(props[property], property, false);
		if (value !== undefined) setPosition(node, edge, physicalYogaLength(value, density));
	}
	for (const [property, edge] of borderProps) {
		const value = finiteNumber(props[property], property);
		if (value !== undefined) node.setBorder(edge, value * density);
	}

	for (const [property, gutter] of [
		["gap", Gutter.All],
		["rowGap", Gutter.Row],
		["columnGap", Gutter.Column]
	] as const) {
		const value = finiteNumber(props[property], property);
		if (value !== undefined) node.setGap(gutter, value * density);
	}
}

function direction(value: "ltr" | "rtl" | undefined): Direction {
	return value === "rtl" ? Direction.RTL : Direction.LTR;
}

/** Exact Yoga-2 flex calculation used by the APK, with logical DIP at the host boundary. */
export class ApkYogaLayoutRuntime {
	readonly #width: number;
	readonly #height: number;
	readonly #density: number;
	readonly #direction: Direction;

	public constructor(private readonly options: Readonly<ApkYogaLayoutRuntimeOptions>) {
		this.#width = finiteNumber(options.width, "width") as number;
		this.#height = finiteNumber(options.height, "height") as number;
		this.#density = finiteNumber(options.density ?? 1, "density") as number;
		if (this.#width <= 0 || this.#height <= 0) throw new Error("Yoga-Viewport muss positiv sein");
		if (this.#density <= 0) throw new Error("Yoga-Dichte muss positiv sein");
		this.#direction = direction(options.direction);
	}

	public calculate(root: ApkUiManagerNodeSnapshot): readonly Readonly<ApkYogaLayoutEntry>[] {
		const config = Yoga.Config.create();
		config.setUseWebDefaults(APK_YOGA_RUNTIME_PROFILE.useWebDefaults);
		config.setPointScaleFactor(APK_YOGA_RUNTIME_PROFILE.pointScaleFactor);
		config.setErrata(Errata.All);
		const nodes = new Map<number, YogaNode>();
		let yogaRoot: YogaNode | undefined;
		try {
			yogaRoot = this.#createNode(root, config, nodes);
			const physicalWidth = this.#width * this.#density;
			const physicalHeight = this.#height * this.#density;
			yogaRoot.setWidth(physicalWidth);
			yogaRoot.setHeight(physicalHeight);
			yogaRoot.calculateLayout(physicalWidth, physicalHeight, this.#direction);
			return Object.freeze(
				[...nodes.entries()].map(([tag, node]) => {
					const layout = node.getComputedLayout();
					return Object.freeze({
						tag,
						box: Object.freeze({
							x: layout.left / this.#density,
							y: layout.top / this.#density,
							width: layout.width / this.#density,
							height: layout.height / this.#density
						})
					});
				})
			);
		} finally {
			if (yogaRoot) yogaRoot.freeRecursive();
			config.free();
		}
	}

	public calculateAndApply(
		root: ApkUiManagerNodeSnapshot,
		hitTestRuntime: ApkUiHitTestRuntime
	): readonly Readonly<ApkYogaLayoutEntry>[] {
		const entries = this.calculate(root);
		for (const entry of entries) hitTestRuntime.setLayout(entry.tag, entry.box);
		return entries;
	}

	#createNode(
		snapshot: ApkUiManagerNodeSnapshot,
		config: ReturnType<typeof Yoga.Config.create>,
		nodes: Map<number, YogaNode>
	): YogaNode {
		const node = Yoga.Node.createWithConfig(config);
		nodes.set(snapshot.tag, node);
		applyYogaStyle(node, snapshot, this.#density);
		if (snapshot.viewName === "RCTText") {
			if (
				!this.options.measureNode &&
				(snapshot.props.width === undefined || snapshot.props.height === undefined)
			) {
				throw new Error(`RCTText ${snapshot.tag} benötigt die noch nicht konfigurierte APK-Textmessung`);
			}
			if (this.options.measureNode) {
				const text = rawText(snapshot);
				node.setMeasureFunc((width, widthMode, height, heightMode) => {
					const result = this.options.measureNode?.({
						node: snapshot,
						text,
						width,
						widthMode,
						height,
						heightMode
					});
					if (!result)
						throw new Error(`APK-Textmessung lieferte für React-Tag ${snapshot.tag} kein Ergebnis`);
					const measuredWidth = finiteNumber(result.width, "gemessene Textbreite") as number;
					const measuredHeight = finiteNumber(result.height, "gemessene Texthöhe") as number;
					if (measuredWidth < 0 || measuredHeight < 0)
						throw new Error("Textmesswerte dürfen nicht negativ sein");
					return { width: measuredWidth, height: measuredHeight };
				});
			}
			return node;
		}
		const children = yogaChildren(snapshot);
		for (const [index, child] of children.entries()) {
			const yogaChild = this.#createNode(child, config, nodes);
			node.insertChild(yogaChild, index);
		}
		return node;
	}
}
