export type ApkAppState = "active" | "background";
export type ApkAppStateCallback = (...arguments_: unknown[]) => void;

export interface ApkAppStateRuntimeOptions {
	initialState: ApkAppState;
	emitDeviceEvent?(eventName: "appStateDidChange" | "appStateFocusChange", payload: unknown): void;
}

/** Reproduces the observable AppStateModule contract from React Native. */
export class ApkAppStateRuntime {
	#state: ApkAppState;

	public constructor(private readonly options: ApkAppStateRuntimeOptions) {
		this.#state = options.initialState;
	}

	public addListener(_eventName: string): void {}

	public removeListeners(_count: number): void {}

	public getCurrentAppState(success: ApkAppStateCallback, _error: ApkAppStateCallback): void {
		success({ app_state: this.#state });
	}

	public setState(state: ApkAppState): void {
		if (state === this.#state) return;
		this.#state = state;
		this.options.emitDeviceEvent?.("appStateDidChange", { app_state: state });
	}

	public setWindowFocus(hasFocus: boolean): void {
		this.options.emitDeviceEvent?.("appStateFocusChange", hasFocus);
	}

	public constants(): { initialAppState: ApkAppState } {
		return { initialAppState: this.#state };
	}
}
