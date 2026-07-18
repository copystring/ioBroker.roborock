import type { ApkNativeViewHierarchyRuntime } from "./apkNativeViewHierarchyRuntime";
import type { ApkJavaScriptModuleCaller } from "./apkTouchEventRuntime";
import type { ApkUiHitTestRuntime } from "./apkUiHitTestRuntime";
import type { ApkUiManagerNodeSnapshot } from "./apkUiManagerRuntime";

const scrollViewAxes = new Map<string, "horizontal" | "vertical">([
	["AndroidHorizontalScrollView", "horizontal"],
	["RCTScrollView", "vertical"],
]);

export type ApkScrollEventName =
	| "topScrollBeginDrag"
	| "topScrollEndDrag"
	| "topScroll";

export interface ApkScrollDispatch {
	tag: number;
	eventName: ApkScrollEventName;
	offsetX: number;
	offsetY: number;
	maxOffsetX: number;
	maxOffsetY: number;
	changed: boolean;
}

interface ScrollCandidate {
	tag: number;
	axis: "horizontal" | "vertical";
}

interface PointerScrollGesture {
	candidates: readonly ScrollCandidate[];
	startX: number;
	startY: number;
	lastX: number;
	lastY: number;
	lastTimestamp: number;
	active?: ScrollCandidate;
	velocityX: number;
	velocityY: number;
}

interface ScrollMetrics {
	tag: number;
	offsetX: number;
	offsetY: number;
	maxOffsetX: number;
	maxOffsetY: number;
	contentWidth: number;
	contentHeight: number;
	viewportWidth: number;
	viewportHeight: number;
}

function finite(value: number, name: string): number {
	if (!Number.isFinite(value)) throw new Error(`${name} muss eine endliche Zahl sein`);
	return value;
}

function clamp(value: number, minimum: number, maximum: number): number {
	return Math.min(maximum, Math.max(minimum, value));
}

/**
 * Reproduces the native Android ScrollView layer used by the APK's
 * RCTScrollView and AndroidHorizontalScrollView managers. AppPlugin code keeps
 * ownership of the menu and its callbacks; this host only supplies native
 * clipping, offsets, hit testing and the original topScroll event shape.
 */
export class ApkScrollViewRuntime {
	readonly #gestures = new Map<number, PointerScrollGesture>();
	readonly #lastScrollDispatchTime = new Map<number, number>();
	readonly #density: number;
	readonly #touchSlop: number;

	public constructor(
		private readonly hierarchy: ApkNativeViewHierarchyRuntime,
		private readonly hitTest: ApkUiHitTestRuntime,
		private readonly jsModuleCaller: ApkJavaScriptModuleCaller,
		density = 1,
		touchSlop = 8,
	) {
		this.#density = finite(density, "Display-Dichte");
		this.#touchSlop = finite(touchSlop, "ScrollView-Touch-Slop");
		if (this.#density <= 0) throw new Error("Display-Dichte muss positiv sein");
		if (this.#touchSlop < 0) throw new Error("ScrollView-Touch-Slop darf nicht negativ sein");
	}

	public synchronize(): void {
		let changed = false;
		for (const node of this.#scrollNodes(this.hierarchy.snapshot().root)) {
			const metrics = this.#metrics(node.tag);
			const nextX = clamp(metrics.offsetX, 0, metrics.maxOffsetX);
			const nextY = clamp(metrics.offsetY, 0, metrics.maxOffsetY);
			changed = this.hierarchy.setScrollOffset(node.tag, nextX, nextY) || changed;
		}
		if (changed) this.hierarchy.applyToHitTest(this.hitTest);
	}

	public async pointerDown(
		identifier: number,
		pageX: number,
		pageY: number,
		timestamp: number,
		targetTag: number,
	): Promise<void> {
		this.#validatePointer(identifier, pageX, pageY, timestamp);
		const path = this.#findPath(this.hierarchy.snapshot().root, targetTag);
		const candidates = (path ?? [])
			.flatMap(node => {
				const axis = scrollViewAxes.get(node.viewName);
				if (!axis || node.props.scrollEnabled === false) return [];
				const metrics = this.#metrics(node.tag);
				return axis === "vertical" && metrics.maxOffsetY > 0
					|| axis === "horizontal" && metrics.maxOffsetX > 0
					? [{ tag: node.tag, axis }]
					: [];
			});
		this.#gestures.set(identifier, {
			candidates,
			startX: pageX,
			startY: pageY,
			lastX: pageX,
			lastY: pageY,
			lastTimestamp: timestamp,
			velocityX: 0,
			velocityY: 0,
		});
	}

	public async pointerMove(
		identifier: number,
		pageX: number,
		pageY: number,
		timestamp: number,
	): Promise<void> {
		this.#validatePointer(identifier, pageX, pageY, timestamp);
		const gesture = this.#gestures.get(identifier);
		if (!gesture) return;
		if (timestamp < gesture.lastTimestamp) throw new Error("ScrollView-Zeitstempel ist rückläufig");
		if (!gesture.active) {
			const totalX = pageX - gesture.startX;
			const totalY = pageY - gesture.startY;
			if (Math.max(Math.abs(totalX), Math.abs(totalY)) <= this.#touchSlop) return;
			const axis = Math.abs(totalX) > Math.abs(totalY) ? "horizontal" : "vertical";
			gesture.active = [...gesture.candidates].reverse().find(candidate => candidate.axis === axis);
			if (!gesture.active) return;
			await this.#emit(gesture.active.tag, "topScrollBeginDrag", timestamp, 0, 0, true);
		}
		const elapsed = Math.max(1, timestamp - gesture.lastTimestamp);
		const metrics = this.#metrics(gesture.active.tag);
		const deltaX = gesture.active.axis === "horizontal" ? pageX - gesture.lastX : 0;
		const deltaY = gesture.active.axis === "vertical" ? pageY - gesture.lastY : 0;
		const nextX = clamp(metrics.offsetX - deltaX, 0, metrics.maxOffsetX);
		const nextY = clamp(metrics.offsetY - deltaY, 0, metrics.maxOffsetY);
		gesture.velocityX = (nextX - metrics.offsetX) * this.#density / elapsed;
		gesture.velocityY = (nextY - metrics.offsetY) * this.#density / elapsed;
		const changed = this.#setOffset(gesture.active.tag, nextX, nextY);
		gesture.lastX = pageX;
		gesture.lastY = pageY;
		gesture.lastTimestamp = timestamp;
		if (changed) {
			await this.#emit(
				gesture.active.tag,
				"topScroll",
				timestamp,
				gesture.velocityX,
				gesture.velocityY,
			);
		}
	}

	public async pointerUp(
		identifier: number,
		pageX: number,
		pageY: number,
		timestamp: number,
	): Promise<void> {
		this.#validatePointer(identifier, pageX, pageY, timestamp);
		const gesture = this.#gestures.get(identifier);
		if (!gesture) return;
		try {
			if (gesture.active) {
				await this.#emit(
					gesture.active.tag,
					"topScrollEndDrag",
					timestamp,
					gesture.velocityX,
					gesture.velocityY,
					true,
				);
			}
		} finally {
			this.#gestures.delete(identifier);
		}
	}

	public cancel(): void {
		this.#gestures.clear();
	}

	public async wheel(
		pageX: number,
		pageY: number,
		deltaX: number,
		deltaY: number,
		timestamp: number,
	): Promise<Readonly<ApkScrollDispatch> | undefined> {
		for (const [name, value] of Object.entries({ pageX, pageY, deltaX, deltaY, timestamp })) {
			finite(value, name);
		}
		const hit = this.hitTest.findTouchTarget(pageX, pageY);
		const path = this.#findPath(this.hierarchy.snapshot().root, hit.target) ?? [];
		const preferredAxis = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
		const node = [...path].reverse().find(candidate =>
			scrollViewAxes.get(candidate.viewName) === preferredAxis
			&& candidate.props.scrollEnabled !== false,
		);
		if (!node) return undefined;
		const metrics = this.#metrics(node.tag);
		const nextX = clamp(metrics.offsetX + (preferredAxis === "horizontal" ? deltaX : 0), 0, metrics.maxOffsetX);
		const nextY = clamp(metrics.offsetY + (preferredAxis === "vertical" ? deltaY : 0), 0, metrics.maxOffsetY);
		const changed = this.#setOffset(node.tag, nextX, nextY);
		if (changed) await this.#emit(node.tag, "topScroll", timestamp, 0, 0);
		const next = this.#metrics(node.tag);
		return Object.freeze({
			tag: node.tag,
			eventName: "topScroll",
			offsetX: next.offsetX,
			offsetY: next.offsetY,
			maxOffsetX: next.maxOffsetX,
			maxOffsetY: next.maxOffsetY,
			changed,
		});
	}

	#setOffset(tag: number, x: number, y: number): boolean {
		const changed = this.hierarchy.setScrollOffset(tag, x, y);
		if (changed) this.hierarchy.applyToHitTest(this.hitTest);
		return changed;
	}

	async #emit(
		tag: number,
		eventName: ApkScrollEventName,
		timestamp: number,
		velocityX: number,
		velocityY: number,
		force = false,
	): Promise<void> {
		const node = this.#findNode(this.hierarchy.snapshot().root, tag);
		if (!node) return;
		const throttle = typeof node.props.scrollEventThrottle === "number"
			? node.props.scrollEventThrottle
			: 0;
		const previous = this.#lastScrollDispatchTime.get(tag) ?? Number.NEGATIVE_INFINITY;
		if (!force && throttle >= Math.max(17, timestamp - previous)) return;
		const metrics = this.#metrics(tag);
		await this.jsModuleCaller.callJsFunction("RCTEventEmitter", "receiveEvent", [
			tag,
			eventName,
			{
				contentInset: { top: 0, bottom: 0, left: 0, right: 0 },
				contentOffset: { x: metrics.offsetX, y: metrics.offsetY },
				contentSize: { width: metrics.contentWidth, height: metrics.contentHeight },
				layoutMeasurement: { width: metrics.viewportWidth, height: metrics.viewportHeight },
				velocity: { x: velocityX, y: velocityY },
				target: tag,
				responderIgnoreScroll: true,
			},
		]);
		this.#lastScrollDispatchTime.set(tag, timestamp);
	}

	#metrics(tag: number): ScrollMetrics {
		const snapshot = this.hierarchy.snapshot();
		const node = this.#findNode(snapshot.root, tag);
		if (!node || !scrollViewAxes.has(node.viewName)) {
			throw new Error(`React-Tag ${tag} ist keine APK-ScrollView`);
		}
		const layouts = new Map(snapshot.layouts.map(entry => [entry.tag, entry.box]));
		const viewport = layouts.get(tag);
		if (!viewport) throw new Error(`Layout der APK-ScrollView ${tag} fehlt`);
		const content = node.children[0] ? layouts.get(node.children[0].tag) : undefined;
		const contentWidth = content?.width ?? 0;
		const contentHeight = content?.height ?? 0;
		return {
			tag,
			offsetX: viewport.scrollX ?? 0,
			offsetY: viewport.scrollY ?? 0,
			maxOffsetX: Math.max(0, contentWidth - viewport.width),
			maxOffsetY: Math.max(0, contentHeight - viewport.height),
			contentWidth,
			contentHeight,
			viewportWidth: viewport.width,
			viewportHeight: viewport.height,
		};
	}

	#scrollNodes(root: ApkUiManagerNodeSnapshot): ApkUiManagerNodeSnapshot[] {
		const nodes: ApkUiManagerNodeSnapshot[] = [];
		const visit = (node: ApkUiManagerNodeSnapshot): void => {
			if (scrollViewAxes.has(node.viewName)) nodes.push(node);
			for (const child of node.children) visit(child);
		};
		visit(root);
		return nodes;
	}

	#findNode(node: ApkUiManagerNodeSnapshot, tag: number): ApkUiManagerNodeSnapshot | undefined {
		if (node.tag === tag) return node;
		for (const child of node.children) {
			const found = this.#findNode(child, tag);
			if (found) return found;
		}
		return undefined;
	}

	#findPath(
		node: ApkUiManagerNodeSnapshot,
		tag: number,
	): ApkUiManagerNodeSnapshot[] | undefined {
		if (node.tag === tag) return [node];
		for (const child of node.children) {
			const path = this.#findPath(child, tag);
			if (path) return [node, ...path];
		}
		return undefined;
	}

	#validatePointer(identifier: number, x: number, y: number, timestamp: number): void {
		if (!Number.isSafeInteger(identifier) || identifier < 0) {
			throw new Error("ScrollView-Zeigerkennung muss eine nichtnegative ganze Zahl sein");
		}
		finite(x, "ScrollView-x");
		finite(y, "ScrollView-y");
		if (finite(timestamp, "ScrollView-Zeitstempel") < 0) {
			throw new Error("ScrollView-Zeitstempel darf nicht negativ sein");
		}
	}
}
