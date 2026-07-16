type ApkDeviceFirmwareCallback = (...arguments_: unknown[]) => void;

/** Reproduces the React-facing methods of the APK's RRDeviceFirmwareModule. */
export class ApkDeviceFirmwareRuntime {
	public readonly addListener = (_eventName: string | null): void => undefined;

	/**
	 * The inspected APK validates the callback but does not invoke it. Preserve
	 * that observable contract instead of inventing firmware state in the host.
	 */
	public readonly checkProgress = (callback: ApkDeviceFirmwareCallback): void => {
		if (typeof callback !== "function") {
			throw new Error("RRPluginDeviceFirmware.checkProgress benötigt einen Callback");
		}
	};

	public readonly removeListeners = (_count: number | null): void => undefined;
}
