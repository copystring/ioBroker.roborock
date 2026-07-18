export type ApkOrientation =
	| "PORTRAIT"
	| "PORTRAIT-UPSIDEDOWN"
	| "LANDSCAPE-LEFT"
	| "LANDSCAPE-RIGHT"
	| "UNKNOWN";

type ApkOrientationCallback = (...arguments_: unknown[]) => void;

/**
 * Reproduces OrientationModule.getOrientation() from the inspected APK.
 * Android reads this value from Display.getRotation(); the embedding host must
 * therefore provide its current display orientation.
 */
export class ApkOrientationRuntime {
	public constructor(private currentOrientation: ApkOrientation) {}

	public readonly getOrientation = (callback: ApkOrientationCallback): void => {
		callback(this.currentOrientation);
	};

	public updateOrientation(orientation: ApkOrientation): void {
		this.currentOrientation = orientation;
	}
}
