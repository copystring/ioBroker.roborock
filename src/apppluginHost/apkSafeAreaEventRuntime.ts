import type { ApkJavaScriptModuleCaller } from "./apkTouchEventRuntime";
import type { ApkUiManagerNodeSnapshot } from "./apkUiManagerRuntime";
import type { ApkYogaLayoutEntry } from "./apkYogaLayoutRuntime";

export interface ApkSafeAreaInsets {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

export interface ApkSafeAreaEventDispatch {
	tag: number;
	eventName: "topInsetsChange";
	payload: Readonly<{
		insets: Readonly<ApkSafeAreaInsets>;
		frame: Readonly<{ x: number; y: number; width: number; height: number }>;
	}>;
}

interface ApkSafeAreaEventRuntimeOptions {
	width: number;
	height: number;
	insets?: Readonly<ApkSafeAreaInsets>;
}

function finite(value: number, name: string): number {
	if (!Number.isFinite(value)) throw new Error(`${name} muss endlich sein`);
	return value;
}

function nonNegative(value: number, name: string): number {
	if (finite(value, name) < 0) throw new Error(`${name} darf nicht negativ sein`);
	return value;
}

function layoutMap(
	layouts: readonly Readonly<ApkYogaLayoutEntry>[],
): ReadonlyMap<number, ApkYogaLayoutEntry["box"]> {
	return new Map(layouts.map(layout => [layout.tag, layout.box]));
}

/**
 * Reproduces SafeAreaProviderManager.addEventEmitters() and the provider's
 * topInsetsChange payload from the APK. Insets are host window measurements;
 * the AppPlugin remains the owner of the resulting React state and UI.
 */
export class ApkSafeAreaEventRuntime {
	readonly #frames = new Map<number, string>();
	readonly #windowWidth: number;
	readonly #windowHeight: number;
	readonly #windowInsets: Readonly<ApkSafeAreaInsets>;

	public constructor(
		private readonly jsModuleCaller: ApkJavaScriptModuleCaller,
		options: Readonly<ApkSafeAreaEventRuntimeOptions>,
	) {
		this.#windowWidth = nonNegative(options.width, "Safe-Area-Fensterbreite");
		this.#windowHeight = nonNegative(options.height, "Safe-Area-Fensterhöhe");
		if (this.#windowWidth === 0 || this.#windowHeight === 0) {
			throw new Error("Safe-Area-Fenstermaße müssen positiv sein");
		}
		const insets = options.insets ?? { top: 0, right: 0, bottom: 0, left: 0 };
		this.#windowInsets = Object.freeze({
			top: nonNegative(insets.top, "Safe-Area-Inset oben"),
			right: nonNegative(insets.right, "Safe-Area-Inset rechts"),
			bottom: nonNegative(insets.bottom, "Safe-Area-Inset unten"),
			left: nonNegative(insets.left, "Safe-Area-Inset links"),
		});
	}

	public async dispatchChanged(
		root: ApkUiManagerNodeSnapshot,
		layouts: readonly Readonly<ApkYogaLayoutEntry>[],
	): Promise<readonly Readonly<ApkSafeAreaEventDispatch>[]> {
		const nextFrames = new Map<number, string>();
		const dispatches: ApkSafeAreaEventDispatch[] = [];
		this.#collect(root, layoutMap(layouts), nextFrames, dispatches, 0, 0);
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

	public reset(): void {
		this.#frames.clear();
	}

	#collect(
		node: ApkUiManagerNodeSnapshot,
		layouts: ReadonlyMap<number, ApkYogaLayoutEntry["box"]>,
		nextFrames: Map<number, string>,
		dispatches: ApkSafeAreaEventDispatch[],
		absoluteParentX: number,
		absoluteParentY: number,
	): void {
		const box = layouts.get(node.tag);
		if (!box) return;
		const x = absoluteParentX + box.x;
		const y = absoluteParentY + box.y;
		if (node.viewName === "RNCSafeAreaProvider") {
			const frame = Object.freeze({ x, y, width: box.width, height: box.height });
			const insets = Object.freeze({
				top: Math.max(0, this.#windowInsets.top - y),
				right: Math.max(0, this.#windowInsets.right - (this.#windowWidth - x - box.width)),
				bottom: Math.max(0, this.#windowInsets.bottom - (this.#windowHeight - y - box.height)),
				left: Math.max(0, this.#windowInsets.left - x),
			});
			const signature = JSON.stringify({ insets, frame });
			nextFrames.set(node.tag, signature);
			if (this.#frames.get(node.tag) !== signature) {
				dispatches.push({
					tag: node.tag,
					eventName: "topInsetsChange",
					payload: Object.freeze({ insets, frame }),
				});
			}
		}
		for (const child of node.children) {
			this.#collect(child, layouts, nextFrames, dispatches, x, y);
		}
	}
}
