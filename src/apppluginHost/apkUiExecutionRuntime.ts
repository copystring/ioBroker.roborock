import type { ApkAndroidTextLayoutBackend } from "./apkAndroidTextMeasureRuntime";
import { ApkAndroidTextMeasureRuntime } from "./apkAndroidTextMeasureRuntime";
import { ApkLayoutEventRuntime, type ApkLayoutEventDispatch } from "./apkLayoutEventRuntime";
import {
	ApkNativeViewHierarchyRuntime,
	type ApkNativeViewHierarchySnapshot,
} from "./apkNativeViewHierarchyRuntime";
import type { ApkJavaScriptModuleCaller } from "./apkTouchEventRuntime";
import { ApkUiHitTestRuntime } from "./apkUiHitTestRuntime";
import type { ApkUiManagerRuntime } from "./apkUiManagerRuntime";
import { ApkYogaLayoutRuntime, type ApkYogaLayoutEntry } from "./apkYogaLayoutRuntime";

export interface ApkUiExecutionRuntimeOptions {
	uiManager: ApkUiManagerRuntime;
	jsModuleCaller: ApkJavaScriptModuleCaller;
	textLayoutBackend: ApkAndroidTextLayoutBackend;
	width: number;
	height: number;
	density: number;
	fontScale: number;
	androidApiLevel?: number;
	direction?: "ltr" | "rtl";
	doLeftAndRightSwapInRTL?: boolean;
	/** Lets Hermes flush React work caused by topLayout before the next convergence round. */
	afterLayoutEvents?: () => Promise<void>;
}

export interface ApkUiExecutionRound {
	round: number;
	operationCountBefore: number;
	operationCountAfter: number;
	layoutEvents: readonly Readonly<ApkLayoutEventDispatch>[];
}

export interface ApkUiExecutionResult {
	stable: true;
	rounds: readonly Readonly<ApkUiExecutionRound>[];
	layouts: readonly Readonly<ApkYogaLayoutEntry>[];
	nativeHierarchy: Readonly<ApkNativeViewHierarchySnapshot>;
}

function positiveFinite(value: number, name: string): number {
	if (!Number.isFinite(value) || value <= 0) throw new Error(`${name} muss positiv und endlich sein`);
	return value;
}

/**
 * Executes the APK's legacy shadow-tree pipeline in its real order:
 * physical-pixel Yoga -> native hierarchy optimizer -> topLayout -> repeat.
 */
export class ApkUiExecutionRuntime {
	readonly #nativeHierarchy: ApkNativeViewHierarchyRuntime;
	readonly #hitTest: ApkUiHitTestRuntime;
	readonly #layoutEvents: ApkLayoutEventRuntime;
	readonly #yoga: ApkYogaLayoutRuntime;

	public constructor(private readonly options: Readonly<ApkUiExecutionRuntimeOptions>) {
		const density = positiveFinite(options.density, "Display-Dichte");
		const text = new ApkAndroidTextMeasureRuntime({
			density,
			fontScale: positiveFinite(options.fontScale, "Schriftdichte"),
			backend: options.textLayoutBackend,
			androidApiLevel: options.androidApiLevel,
			direction: options.direction,
		});
		this.#nativeHierarchy = new ApkNativeViewHierarchyRuntime(options.uiManager.snapshot().tag, density);
		this.#hitTest = new ApkUiHitTestRuntime(() => this.#nativeHierarchy.snapshot().root);
		this.#layoutEvents = new ApkLayoutEventRuntime(options.jsModuleCaller, density);
		this.#yoga = new ApkYogaLayoutRuntime({
			width: positiveFinite(options.width, "UI-Breite"),
			height: positiveFinite(options.height, "UI-Höhe"),
			density,
			direction: options.direction,
			doLeftAndRightSwapInRTL: options.doLeftAndRightSwapInRTL,
			measureNode: text.measureNode,
		});
	}

	public hitTestRuntime(): ApkUiHitTestRuntime {
		return this.#hitTest;
	}

	public nativeHierarchyRuntime(): ApkNativeViewHierarchyRuntime {
		return this.#nativeHierarchy;
	}

	public async stabilize(maxRounds = 8): Promise<Readonly<ApkUiExecutionResult>> {
		if (!Number.isSafeInteger(maxRounds) || maxRounds < 1) throw new Error("maxRounds muss eine positive ganze Zahl sein");
		const rounds: ApkUiExecutionRound[] = [];
		let latestLayouts: readonly Readonly<ApkYogaLayoutEntry>[] = [];
		let latestNative: Readonly<ApkNativeViewHierarchySnapshot> | undefined;
		for (let round = 1; round <= maxRounds; round += 1) {
			const operationCountBefore = this.options.uiManager.operations().length;
			const shadowRoot = this.options.uiManager.snapshot();
			latestLayouts = this.#yoga.calculate(shadowRoot);
			latestNative = this.#nativeHierarchy.rebuild(
				shadowRoot,
				latestLayouts,
				this.options.uiManager.operations(),
			);
			const measurementCallbacks = this.options.uiManager.flushNativeMeasurements(
				tag => this.#nativeHierarchy.measure(tag),
			);
			if (measurementCallbacks > 0) await this.options.afterLayoutEvents?.();
			this.#nativeHierarchy.applyToHitTest(this.#hitTest);
			const layoutEvents = await this.#layoutEvents.dispatchChanged(shadowRoot, latestLayouts);
			if (layoutEvents.length > 0) await this.options.afterLayoutEvents?.();
			const operationCountAfter = this.options.uiManager.operations().length;
			rounds.push({ round, operationCountBefore, operationCountAfter, layoutEvents });
			if (
				layoutEvents.length === 0
				&& operationCountAfter === operationCountBefore
				&& this.options.uiManager.pendingNativeMeasurementCount() === 0
			) {
				return Object.freeze({
					stable: true,
					rounds: Object.freeze(rounds.map(entry => Object.freeze({ ...entry }))),
					layouts: latestLayouts,
					nativeHierarchy: latestNative,
				});
			}
		}
		throw new Error(`APK-UI-Layout konvergierte nicht innerhalb von ${maxRounds} Runden`);
	}
}
