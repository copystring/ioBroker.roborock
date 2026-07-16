import type { ApkTouchPoint } from "./apkTouchEventRuntime";
import type { ApkUiManagerNodeSnapshot } from "./apkUiManagerRuntime";

export type ApkPointerEvents = "auto" | "none" | "box-none" | "box-only";

export interface ApkUiAffineTransform {
	a: number;
	b: number;
	c: number;
	d: number;
	tx: number;
	ty: number;
}

/** Layout values use the same density-independent coordinate space delivered to JavaScript. */
export interface ApkUiLayoutBox {
	x: number;
	y: number;
	width: number;
	height: number;
	scrollX?: number;
	scrollY?: number;
	clipChildren?: boolean;
	enabled?: boolean;
	transform?: Readonly<ApkUiAffineTransform>;
}

export interface ApkUiTouchTarget {
	targetSurface: number;
	target: number;
	pageX: number;
	pageY: number;
	locationX: number;
	locationY: number;
}

interface HitResult {
	node: ApkUiManagerNodeSnapshot;
	localX: number;
	localY: number;
}

interface HitSlop {
	left: number;
	top: number;
	right: number;
	bottom: number;
}

function finite(value: number, name: string): void {
	if (!Number.isFinite(value)) throw new Error(`${name} muss eine endliche Zahl sein`);
}

function cloneLayout(box: Readonly<ApkUiLayoutBox>): ApkUiLayoutBox {
	return {
		x: box.x,
		y: box.y,
		width: box.width,
		height: box.height,
		scrollX: box.scrollX,
		scrollY: box.scrollY,
		clipChildren: box.clipChildren,
		enabled: box.enabled,
		transform: box.transform ? { ...box.transform } : undefined,
	};
}

function pointerEvents(node: ApkUiManagerNodeSnapshot, enabled: boolean): ApkPointerEvents {
	const raw = node.props.pointerEvents;
	let value: ApkPointerEvents;
	if (raw === undefined || raw === null) value = "auto";
	else if (typeof raw === "string") {
		const normalized = raw.toLowerCase().replaceAll("_", "-");
		if (!["auto", "none", "box-none", "box-only"].includes(normalized)) {
			throw new Error(`Ungültige pointerEvents von React-Tag ${node.tag}: ${raw}`);
		}
		value = normalized as ApkPointerEvents;
	} else {
		throw new Error(`pointerEvents von React-Tag ${node.tag} muss eine Zeichenfolge sein`);
	}
	if (enabled) return value;
	if (value === "auto") return "box-none";
	if (value === "box-only") return "none";
	return value;
}

function canBeTouchTarget(value: ApkPointerEvents): boolean {
	return value === "auto" || value === "box-only";
}

function canChildrenBeTouchTarget(value: ApkPointerEvents): boolean {
	return value === "auto" || value === "box-none";
}

function readHitSlop(node: ApkUiManagerNodeSnapshot): HitSlop | undefined {
	const value = node.props.hitSlop;
	if (value === undefined || value === null) return undefined;
	if (typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`hitSlop von React-Tag ${node.tag} muss ein Kantenobjekt sein`);
	}
	const record = value as Record<string, unknown>;
	const result: HitSlop = { left: 0, top: 0, right: 0, bottom: 0 };
	for (const key of ["left", "top", "right", "bottom"] as const) {
		const edge = record[key];
		if (edge === undefined) continue;
		if (typeof edge !== "number" || !Number.isFinite(edge)) {
			throw new Error(`hitSlop.${key} von React-Tag ${node.tag} muss eine endliche Zahl sein`);
		}
		result[key] = edge;
	}
	return result;
}

function isPointInside(
	node: ApkUiManagerNodeSnapshot,
	box: Readonly<ApkUiLayoutBox>,
	x: number,
	y: number,
): boolean {
	const hitSlop = readHitSlop(node);
	if (hitSlop) {
		return x >= -hitSlop.left && x < box.width + hitSlop.right
			&& y >= -hitSlop.top && y < box.height + hitSlop.bottom;
	}
	return x >= 0 && x < box.width && y >= 0 && y < box.height;
}

function zIndex(node: ApkUiManagerNodeSnapshot): number {
	const value = node.props.zIndex;
	if (value === undefined || value === null) return 0;
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new Error(`zIndex von React-Tag ${node.tag} muss eine endliche Zahl sein`);
	}
	return value;
}

function inverseTransform(
	transform: Readonly<ApkUiAffineTransform> | undefined,
	x: number,
	y: number,
): Readonly<{ x: number; y: number }> {
	if (!transform) return { x, y };
	const determinant = transform.a * transform.d - transform.b * transform.c;
	if (!Number.isFinite(determinant) || determinant === 0) {
		throw new Error("Die View-Transformation ist nicht invertierbar");
	}
	const translatedX = x - transform.tx;
	const translatedY = y - transform.ty;
	return {
		x: (transform.d * translatedX - transform.c * translatedY) / determinant,
		y: (-transform.b * translatedX + transform.a * translatedY) / determinant,
	};
}

/**
 * Reproduces com.facebook.react.uimanager.o0Oo0oo from the APK over the
 * host-side native view tree. Layout calculation itself is intentionally a
 * separate concern; this class consumes measured native layout boxes.
 */
export class ApkUiHitTestRuntime {
	readonly #layouts = new Map<number, ApkUiLayoutBox>();

	public constructor(private readonly snapshotProvider: () => ApkUiManagerNodeSnapshot) {}

	public setLayout(tag: number, box: Readonly<ApkUiLayoutBox>): void {
		if (!Number.isSafeInteger(tag) || tag < 1) throw new Error("React-Tag muss eine positive ganze Zahl sein");
		for (const [name, value] of Object.entries({
			x: box.x,
			y: box.y,
			width: box.width,
			height: box.height,
			scrollX: box.scrollX ?? 0,
			scrollY: box.scrollY ?? 0,
		})) finite(value, name);
		if (box.width < 0 || box.height < 0) throw new Error("Layoutbreite und -höhe dürfen nicht negativ sein");
		if (box.transform) {
			for (const [name, value] of Object.entries(box.transform)) finite(value, `transform.${name}`);
			inverseTransform(box.transform, 0, 0);
		}
		this.#layouts.set(tag, cloneLayout(box));
	}

	public removeLayout(tag: number): void {
		this.#layouts.delete(tag);
	}

	public layout(tag: number): Readonly<ApkUiLayoutBox> | undefined {
		const box = this.#layouts.get(tag);
		return box ? Object.freeze(cloneLayout(box)) : undefined;
	}

	public findTouchTarget(pageX: number, pageY: number): Readonly<ApkUiTouchTarget> {
		finite(pageX, "pageX");
		finite(pageY, "pageY");
		const root = this.snapshotProvider();
		const rootLayout = this.#layout(root.tag);
		if (rootLayout.x !== 0 || rootLayout.y !== 0) {
			throw new Error("Das Root-Layout muss im eigenen Koordinatensystem bei 0,0 beginnen");
		}
		const hit = this.#hit(root, pageX, pageY) ?? { node: root, localX: pageX, localY: pageY };
		return Object.freeze({
			targetSurface: root.tag,
			target: hit.node.tag,
			pageX,
			pageY,
			locationX: hit.localX,
			locationY: hit.localY,
		});
	}

	public localCoordinates(targetTag: number, pageX: number, pageY: number): Readonly<{ x: number; y: number }> {
		finite(pageX, "pageX");
		finite(pageY, "pageY");
		const root = this.snapshotProvider();
		const path = this.#findPath(root, targetTag);
		if (!path) throw new Error(`React-Tag ${targetTag} existiert nicht im aktuellen UI-Baum`);
		let x = pageX;
		let y = pageY;
		for (let index = 1; index < path.length; index += 1) {
			const parent = path[index - 1];
			const child = path[index];
			const parentLayout = this.#layout(parent.tag);
			const childLayout = this.#layout(child.tag);
			const transformed = inverseTransform(
				childLayout.transform,
				x + (parentLayout.scrollX ?? 0) - childLayout.x,
				y + (parentLayout.scrollY ?? 0) - childLayout.y,
			);
			x = transformed.x;
			y = transformed.y;
		}
		return Object.freeze({ x, y });
	}

	public createTouchPoint(
		identifier: number,
		timestamp: number,
		pageX: number,
		pageY: number,
		targetTag?: number,
	): Readonly<ApkTouchPoint> {
		const target = targetTag === undefined
			? this.findTouchTarget(pageX, pageY)
			: (() => {
				const root = this.snapshotProvider();
				const local = this.localCoordinates(targetTag, pageX, pageY);
				return {
					targetSurface: root.tag,
					target: targetTag,
					pageX,
					pageY,
					locationX: local.x,
					locationY: local.y,
				};
			})();
		return Object.freeze({ identifier, timestamp, ...target });
	}

	#hit(node: ApkUiManagerNodeSnapshot, localX: number, localY: number): HitResult | undefined {
		const box = this.#layout(node.tag);
		const events = pointerEvents(node, box.enabled !== false);
		if (events === "none") return undefined;
		const inside = isPointInside(node, box, localX, localY);

		if (canChildrenBeTouchTarget(events)) {
			const overflow = node.props.overflow;
			const clipsOverflow = overflow === "hidden" || overflow === "scroll";
			if (inside || (!clipsOverflow && box.clipChildren !== true)) {
				const orderedChildren = node.children
					.map((child, index) => ({ child, index, zIndex: zIndex(child) }))
					.sort((left, right) => left.zIndex - right.zIndex || left.index - right.index);
				for (let index = orderedChildren.length - 1; index >= 0; index -= 1) {
					const child = orderedChildren[index].child;
					const childLayout = this.#layout(child.tag);
					const transformed = inverseTransform(
						childLayout.transform,
						localX + (box.scrollX ?? 0) - childLayout.x,
						localY + (box.scrollY ?? 0) - childLayout.y,
					);
					const hit = this.#hit(child, transformed.x, transformed.y);
					if (hit) return hit;
				}
			}
		}

		return canBeTouchTarget(events) && inside ? { node, localX, localY } : undefined;
	}

	#layout(tag: number): ApkUiLayoutBox {
		const box = this.#layouts.get(tag);
		if (!box) throw new Error(`Für React-Tag ${tag} fehlt das native APK-Layout`);
		return box;
	}

	#findPath(
		node: ApkUiManagerNodeSnapshot,
		targetTag: number,
	): ApkUiManagerNodeSnapshot[] | undefined {
		if (node.tag === targetTag) return [node];
		for (const child of node.children) {
			const childPath = this.#findPath(child, targetTag);
			if (childPath) return [node, ...childPath];
		}
		return undefined;
	}
}
