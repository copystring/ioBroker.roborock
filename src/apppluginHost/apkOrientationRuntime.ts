export type ApkOrientation =
	| "PORTRAIT"
	| "PORTRAIT-UPSIDEDOWN"
	| "LANDSCAPE-LEFT"
	| "LANDSCAPE-RIGHT"
	| "UNKNOWN";

type ApkOrientationCallback = (...arguments_: unknown[]) => void;

export type ApkOrientationEventName =
	| "deviceOrientationDidChange"
	| "lockDidChange"
	| "orientationDidChange";

export interface ApkOrientationRuntimeOptions {
	autoRotateEnabled?: boolean;
	deviceOrientation?: ApkOrientation | "";
	emitDeviceEvent?: (
		eventName: ApkOrientationEventName,
		payload: Readonly<Record<string, unknown>>,
	) => void;
	requestHostOrientation?: (
		orientation: ApkOrientation | "UNLOCKED",
		androidRequestedOrientation: number,
	) => void;
}

/**
 * Reproduces the complete React-method surface of OrientationModule from the
 * inspected APK. Android obtains physical rotation and auto-rotate state from
 * the OS; a desktop host supplies those values and receives lock requests
 * through explicit ports instead of inventing device behavior.
 */
export class ApkOrientationRuntime {
	readonly #emitDeviceEvent: NonNullable<ApkOrientationRuntimeOptions["emitDeviceEvent"]>;
	readonly #requestHostOrientation: NonNullable<ApkOrientationRuntimeOptions["requestHostOrientation"]>;
	#autoRotateEnabled: boolean;
	#currentOrientation: ApkOrientation;
	#lastDeviceOrientation: ApkOrientation | "";
	#lastOrientation = "";
	#locked = false;

	public constructor(
		currentOrientation: ApkOrientation,
		options: Readonly<ApkOrientationRuntimeOptions> = {},
	) {
		this.#currentOrientation = currentOrientation;
		this.#lastDeviceOrientation = options.deviceOrientation ?? "";
		this.#autoRotateEnabled = options.autoRotateEnabled ?? false;
		this.#emitDeviceEvent = options.emitDeviceEvent ?? (() => undefined);
		this.#requestHostOrientation = options.requestHostOrientation ?? (() => undefined);
	}

	/** Mirrors OrientationModule.getConstants(). */
	public constants(): Readonly<Record<string, ApkOrientation>> {
		return Object.freeze({ initialOrientation: this.#currentOrientation });
	}

	/** React Native listener bookkeeping is intentionally empty in the APK. */
	public readonly addListener = (_eventName: string): void => undefined;

	public readonly getAutoRotateState = (callback: ApkOrientationCallback): void => {
		callback(this.#autoRotateEnabled);
	};

	public readonly getDeviceOrientation = (callback: ApkOrientationCallback): void => {
		callback(this.#lastDeviceOrientation);
	};

	public readonly getOrientation = (callback: ApkOrientationCallback): void => {
		callback(this.#currentOrientation);
	};

	public readonly lockToLandscape = (): void => this.#lock("LANDSCAPE-LEFT", 6);

	public readonly lockToLandscapeLeft = (): void => this.#lock("LANDSCAPE-LEFT", 0);

	public readonly lockToLandscapeRight = (): void => this.#lock("LANDSCAPE-RIGHT", 8);

	public readonly lockToPortrait = (): void => this.#lock("PORTRAIT", 1);

	public readonly lockToPortraitUpsideDown = (): void => this.#lock("PORTRAIT-UPSIDEDOWN", 9);

	/** React Native listener bookkeeping is intentionally empty in the APK. */
	public readonly removeListeners = (_count: number): void => undefined;

	public readonly unlockAllOrientations = (): void => {
		this.#requestHostOrientation("UNLOCKED", 4);
		this.#locked = false;
		this.#lastOrientation = this.#currentOrientation;
		this.#emit("orientationDidChange", "orientation", this.#lastOrientation);
		this.#emit("lockDidChange", "orientation", "UNKNOWN");
	};

	public updateOrientation(orientation: ApkOrientation): void {
		this.#currentOrientation = orientation;
		if (this.#lastOrientation === orientation) return;
		this.#lastOrientation = orientation;
		this.#emit("orientationDidChange", "orientation", orientation);
	}

	public updateDeviceOrientation(orientation: ApkOrientation): void {
		if (this.#lastDeviceOrientation === orientation) return;
		this.#lastDeviceOrientation = orientation;
		this.#emit("deviceOrientationDidChange", "deviceOrientation", orientation);
	}

	public setAutoRotateEnabled(enabled: boolean): void {
		this.#autoRotateEnabled = enabled;
	}

	public isLocked(): boolean {
		return this.#locked;
	}

	#lock(orientation: ApkOrientation, androidRequestedOrientation: number): void {
		this.#requestHostOrientation(orientation, androidRequestedOrientation);
		this.#locked = true;
		this.#currentOrientation = orientation;
		this.#lastOrientation = orientation;
		this.#emit("orientationDidChange", "orientation", orientation);
		this.#emit("lockDidChange", "orientation", orientation);
	}

	#emit(eventName: ApkOrientationEventName, key: string, value: string): void {
		this.#emitDeviceEvent(eventName, Object.freeze({ [key]: value }));
	}
}
