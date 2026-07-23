import type { ApkAndroidTextLayoutBackend } from "./apkAndroidTextMeasureRuntime";
import type {
	ApkAppPluginManagedModelRuntimeFactory,
	ApkAppPluginModelRuntimeRequest,
} from "./apkAppPluginSessionSupervisor";
import type { ApkAppPluginHostContract } from "./apkContract";
import {
	ApkPointerInputBridge,
	type ApkNativePointerObserver,
} from "./apkPointerInputBridge";
import { ApkTextInputRuntime } from "./apkTextInputRuntime";
import {
	type ApkJavaScriptModuleCaller,
	ApkTouchEventDispatcher,
	ApkTouchEventRuntime,
} from "./apkTouchEventRuntime";
import {
	ApkUiExecutionRuntime,
	type ApkUiExecutionRuntimeOptions,
} from "./apkUiExecutionRuntime";
import {
	ApkUiManagerRuntime,
	type ApkUiManagerRootRuntime,
} from "./apkUiManagerRuntime";

export const APK_APPPLUGIN_APP_REGISTRY_KEY = "App";

export type ApkAppPluginModelRuntimeState =
	| "idle"
	| "starting"
	| "running"
	| "stopping"
	| "stopped"
	| "failed";

/**
 * Narrow process boundary required by the model runtime. ApkHermesHostSession
 * implements it directly; the interface keeps lifecycle tests binary-free.
 */
export interface ApkAppPluginApplicationSession extends ApkJavaScriptModuleCaller {
	readonly state?: string;
	start(): Promise<void>;
	stop(): Promise<void>;
	runApplication(appKey: string, parameters: Readonly<Record<string, unknown>>): Promise<void>;
	unmountApplication(rootTag: number): Promise<void>;
	waitForRuntimeBoundaryIdle(maxRounds?: number): Promise<number>;
}

export interface ApkAppPluginModelRuntimeComposition {
	contract: ApkAppPluginHostContract;
	textLayoutBackend: ApkAndroidTextLayoutBackend;
	/**
	 * Receives the one shared UIManager before the native registry and Hermes
	 * session are built. This prevents a session from accidentally registering a
	 * different UIManager than the roots exposed to the desktop host.
	 */
	createSession(uiManager: ApkUiManagerRuntime): ApkAppPluginApplicationSession;
	prepareStop?(): void | Promise<void>;
	dispose?(): void | Promise<void>;
}

export type ApkAppPluginRootOpenOptions = Readonly<{
	initialProps: Readonly<Record<string, unknown>>;
	width: number;
	height: number;
	density: number;
	fontScale: number;
	androidApiLevel?: number;
	direction?: "ltr" | "rtl";
	doLeftAndRightSwapInRTL?: boolean;
	safeAreaInsets?: ApkUiExecutionRuntimeOptions["safeAreaInsets"];
	nativePointerObserver?: ApkNativePointerObserver;
	afterLayoutEvents?: () => Promise<void>;
}>;

export interface ApkAppPluginRootLease {
	readonly rootTag: number;
	readonly uiManager: Readonly<ApkUiManagerRootRuntime>;
	readonly uiExecution: ApkUiExecutionRuntime;
	readonly pointerInput: ApkPointerInputBridge;
	readonly textInput: ApkTextInputRuntime;
	release(): Promise<void>;
}

interface RootSlot {
	readonly rootTag: number;
	readonly uiManager: Readonly<ApkUiManagerRootRuntime>;
	readonly uiExecution: ApkUiExecutionRuntime;
	readonly pointerInput: ApkPointerInputBridge;
	readonly textInput: ApkTextInputRuntime;
	close?: Promise<void>;
}

/**
 * Category-neutral owner of one APK-style React runtime per device model.
 * Product semantics remain inside the unchanged AppPlugin bundle.
 */
export class ApkAppPluginModelRuntime {
	readonly #uiManager: ApkUiManagerRuntime;
	readonly #session: ApkAppPluginApplicationSession;
	readonly #roots = new Map<number, RootSlot>();
	#operations: Promise<void> = Promise.resolve();
	#state: ApkAppPluginModelRuntimeState = "idle";
	#stopRequested = false;
	#stop?: Promise<void>;
	#disposed = false;

	public constructor(private readonly composition: Readonly<ApkAppPluginModelRuntimeComposition>) {
		this.#uiManager = new ApkUiManagerRuntime(composition.contract);
		this.#session = composition.createSession(this.#uiManager);
	}

	public get state(): ApkAppPluginModelRuntimeState {
		return this.#state;
	}

	public get session(): ApkAppPluginApplicationSession {
		return this.#session;
	}

	public get uiManager(): ApkUiManagerRuntime {
		return this.#uiManager;
	}

	public start(): Promise<void> {
		return this.#enqueue(async () => {
			if (this.#state === "running") return;
			if (this.#state !== "idle" || this.#stopRequested) {
				throw new Error(`AppPlugin-Modell-Runtime kann aus Zustand ${this.#state} nicht starten`);
			}
			this.#state = "starting";
			try {
				await this.#session.start();
				this.#state = "running";
			} catch (error) {
				this.#state = "failed";
				throw error;
			}
		});
	}

	public openRoot(options: ApkAppPluginRootOpenOptions): Promise<ApkAppPluginRootLease> {
		if (this.#stopRequested) {
			return Promise.reject(new Error("AppPlugin-Modell-Runtime wird bereits beendet"));
		}
		return this.#enqueue(async () => {
			if (this.#state !== "running" || this.#stopRequested) {
				throw new Error("Ein AppPlugin-Root benötigt eine laufende Modell-Runtime");
			}
			const rootTag = this.#uiManager.addRootView();
			const rootManager = this.#uiManager.root(rootTag);
			let slot: RootSlot | undefined;
			try {
				const uiExecution = new ApkUiExecutionRuntime({
					uiManager: rootManager,
					jsModuleCaller: this.#session,
					textLayoutBackend: this.composition.textLayoutBackend,
					width: options.width,
					height: options.height,
					density: options.density,
					fontScale: options.fontScale,
					androidApiLevel: options.androidApiLevel,
					direction: options.direction,
					doLeftAndRightSwapInRTL: options.doLeftAndRightSwapInRTL,
					safeAreaInsets: options.safeAreaInsets,
					afterLayoutEvents: options.afterLayoutEvents
						?? (async () => {
							await this.#session.waitForRuntimeBoundaryIdle();
						}),
				});
				const pointerInput = new ApkPointerInputBridge(
					uiExecution.hitTestRuntime(),
					new ApkTouchEventDispatcher(new ApkTouchEventRuntime(), this.#session),
					options.nativePointerObserver,
				);
				const textInput = new ApkTextInputRuntime(rootManager, this.#session);
				slot = { rootTag, uiManager: rootManager, uiExecution, pointerInput, textInput };
				this.#roots.set(rootTag, slot);
				await this.#session.runApplication(APK_APPPLUGIN_APP_REGISTRY_KEY, {
					rootTag,
					initialProps: { ...options.initialProps },
				});
			} catch (error) {
				this.#roots.delete(rootTag);
				this.#removeNativeRoot(rootTag);
				if (this.#session.state === "failed") this.#state = "failed";
				throw error;
			}
			if (!slot) throw new Error("AppPlugin-Root wurde nicht aufgebaut");
			if (this.#stopRequested) {
				await this.#closeRoot(slot);
				throw new Error("AppPlugin-Modell-Runtime wurde während des Root-Starts beendet");
			}
			let release: Promise<void> | undefined;
			return Object.freeze({
				rootTag,
				uiManager: slot.uiManager,
				uiExecution: slot.uiExecution,
				pointerInput: slot.pointerInput,
				textInput: slot.textInput,
				release: () => release ??= this.#enqueue(async () => this.#closeRoot(slot)),
			});
		});
	}

	public stop(): Promise<void> {
		if (this.#stop) return this.#stop;
		this.#stopRequested = true;
		this.#stop = this.#enqueue(async () => {
			const errors: unknown[] = [];
			const stopSession = this.#state !== "idle" && this.#state !== "stopped";
			if (this.#state === "running") {
				this.#state = "stopping";
				for (const slot of [...this.#roots.values()]) {
					try {
						await this.#closeRoot(slot);
					} catch (error) {
						errors.push(error);
					}
				}
			} else {
				for (const slot of [...this.#roots.values()]) {
					this.#roots.delete(slot.rootTag);
					this.#removeNativeRoot(slot.rootTag);
				}
			}
			if (stopSession && this.composition.prepareStop) {
				try {
					await this.composition.prepareStop();
					await this.#session.waitForRuntimeBoundaryIdle();
				} catch (error) {
					errors.push(error);
				}
			}
			if (stopSession) {
				try {
					await this.#session.stop();
				} catch (error) {
					errors.push(error);
				}
			}
			try {
				await this.#dispose();
			} catch (error) {
				errors.push(error);
			}
			this.#state = errors.length === 0 ? "stopped" : "failed";
			if (errors.length > 0) {
				throw new AggregateError(errors, "AppPlugin-Modell-Runtime konnte nicht sauber beendet werden");
			}
		});
		return this.#stop;
	}

	#enqueue<T>(operation: () => Promise<T>): Promise<T> {
		const result = this.#operations.then(operation);
		this.#operations = result.then(() => undefined, () => undefined);
		return result;
	}

	#closeRoot(slot: RootSlot): Promise<void> {
		if (slot.close) return slot.close;
		if (!this.#roots.has(slot.rootTag)) return Promise.resolve();
		slot.close = (async () => {
			try {
				await this.#session.unmountApplication(slot.rootTag);
			} finally {
				this.#roots.delete(slot.rootTag);
				this.#removeNativeRoot(slot.rootTag);
			}
		})();
		return slot.close;
	}

	#removeNativeRoot(rootTag: number): void {
		if (this.#uiManager.hasRootView(rootTag)) this.#uiManager.removeRootView(rootTag);
	}

	async #dispose(): Promise<void> {
		if (this.#disposed) return;
		this.#disposed = true;
		await this.composition.dispose?.();
	}
}

export type ApkAppPluginModelRuntimeCompositionFactory<TContext = unknown> = (
	request: Readonly<ApkAppPluginModelRuntimeRequest<TContext>>,
) => ApkAppPluginModelRuntimeComposition | Promise<ApkAppPluginModelRuntimeComposition>;

/** Creates the concrete factory consumed by ApkAppPluginSessionSupervisor. */
export function createApkAppPluginModelRuntimeFactory<TContext = unknown>(
	compose: ApkAppPluginModelRuntimeCompositionFactory<TContext>,
): ApkAppPluginManagedModelRuntimeFactory<ApkAppPluginModelRuntime, TContext> {
	return async request => new ApkAppPluginModelRuntime(await compose(request));
}
