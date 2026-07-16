import type { ApkJavaScriptModuleCaller } from "./apkTouchEventRuntime";
import type { ApkUiManagerNodeSnapshot } from "./apkUiManagerRuntime";
import type { ApkYogaLayoutEntry } from "./apkYogaLayoutRuntime";

export interface ApkLayoutEventFrame {
	tag: number;
	xPx: number;
	yPx: number;
	widthPx: number;
	heightPx: number;
}

export interface ApkLayoutEventDispatch {
	tag: number;
	eventName: "topLayout";
	payload: Readonly<{
		layout: Readonly<{ x: number; y: number; width: number; height: number }>;
		target: number;
	}>;
}

function finitePositive(value: number, name: string): number {
	if (!Number.isFinite(value) || value <= 0) throw new Error(`${name} muss positiv und endlich sein`);
	return value;
}

function layoutMap(entries: readonly Readonly<ApkYogaLayoutEntry>[]): Map<number, ApkYogaLayoutEntry["box"]> {
	const result = new Map<number, ApkYogaLayoutEntry["box"]>();
	for (const entry of entries) {
		if (result.has(entry.tag)) throw new Error(`Yoga-Layout für React-Tag ${entry.tag} ist doppelt vorhanden`);
		result.set(entry.tag, entry.box);
	}
	return result;
}

function sameFrame(left: Readonly<ApkLayoutEventFrame> | undefined, right: Readonly<ApkLayoutEventFrame>): boolean {
	return left?.xPx === right.xPx
		&& left.yPx === right.yPx
		&& left.widthPx === right.widthPx
		&& left.heightPx === right.heightPx;
}

/** Reproduces the APK's OnLayoutEvent payload and changed-layout filtering. */
export class ApkLayoutEventRuntime {
	readonly #density: number;
	readonly #frames = new Map<number, ApkLayoutEventFrame>();

	public constructor(
		private readonly jsModuleCaller: ApkJavaScriptModuleCaller,
		density: number,
	) {
		this.#density = finitePositive(density, "Display-Dichte");
	}

	public async dispatchChanged(
		root: ApkUiManagerNodeSnapshot,
		layouts: readonly Readonly<ApkYogaLayoutEntry>[],
	): Promise<readonly Readonly<ApkLayoutEventDispatch>[]> {
		const yoga = layoutMap(layouts);
		const nextFrames = new Map<number, ApkLayoutEventFrame>();
		const dispatches: ApkLayoutEventDispatch[] = [];
		this.#collect(root, yoga, nextFrames, dispatches, 0, 0);
		this.#frames.clear();
		for (const [tag, frame] of nextFrames) this.#frames.set(tag, frame);
		for (const dispatch of dispatches) {
			await this.jsModuleCaller.callJsFunction("RCTEventEmitter", "receiveEvent", [
				dispatch.tag,
				dispatch.eventName,
				dispatch.payload,
			]);
		}
		return Object.freeze(dispatches.map(dispatch => Object.freeze(dispatch)));
	}

	public frames(): readonly Readonly<ApkLayoutEventFrame>[] {
		return Object.freeze([...this.#frames.values()].map(frame => Object.freeze({ ...frame })));
	}

	#collect(
		node: ApkUiManagerNodeSnapshot,
		yoga: ReadonlyMap<number, ApkYogaLayoutEntry["box"]>,
		nextFrames: Map<number, ApkLayoutEventFrame>,
		dispatches: ApkLayoutEventDispatch[],
		absoluteParentX: number,
		absoluteParentY: number,
	): void {
		const box = yoga.get(node.tag);
		if (!box) return;
		const absoluteLeft = absoluteParentX + box.x;
		const absoluteTop = absoluteParentY + box.y;
		const frame: ApkLayoutEventFrame = {
			tag: node.tag,
			xPx: Math.round(box.x * this.#density),
			yPx: Math.round(box.y * this.#density),
			widthPx: Math.round((absoluteLeft + box.width) * this.#density) - Math.round(absoluteLeft * this.#density),
			heightPx: Math.round((absoluteTop + box.height) * this.#density) - Math.round(absoluteTop * this.#density),
		};
		nextFrames.set(node.tag, frame);
		const onLayout = node.props.onLayout;
		if (onLayout !== undefined && onLayout !== null && typeof onLayout !== "boolean") {
			throw new Error(`onLayout von React-Tag ${node.tag} muss boolesch sein`);
		}
		if (onLayout === true && !sameFrame(this.#frames.get(node.tag), frame)) {
			const payload = Object.freeze({
				layout: Object.freeze({
					x: frame.xPx / this.#density,
					y: frame.yPx / this.#density,
					width: frame.widthPx / this.#density,
					height: frame.heightPx / this.#density,
				}),
				target: node.tag,
			});
			dispatches.push({ tag: node.tag, eventName: "topLayout", payload });
		}
		for (const child of node.children) {
			this.#collect(child, yoga, nextFrames, dispatches, absoluteLeft, absoluteTop);
		}
	}
}
