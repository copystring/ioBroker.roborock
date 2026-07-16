export type ApkColorScheme = "light" | "dark";
export type ApkRequestedColorSchemeMode = -1 | 1 | 2;

export interface ApkAppearanceRuntimeOptions {
	initialColorScheme: ApkColorScheme;
	requestColorScheme: (mode: ApkRequestedColorSchemeMode) => void;
	emitDeviceEvent: (eventName: "appearanceChanged", payload: { colorScheme: ApkColorScheme }) => void;
}

/**
 * Reproduces AppearanceModule from the APK. setColorScheme only requests the
 * Android/AppCompat mode; the observable scheme changes when the host applies
 * the corresponding configuration through onConfigurationChanged().
 */
export class ApkAppearanceRuntime {
	#colorScheme: ApkColorScheme;

	public constructor(private readonly options: ApkAppearanceRuntimeOptions) {
		this.#colorScheme = options.initialColorScheme;
	}

	public readonly addListener = (_eventName: string): void => undefined;

	public readonly removeListeners = (_count: number): void => undefined;

	public readonly getColorScheme = (): ApkColorScheme => this.#colorScheme;

	public readonly setColorScheme = (colorScheme: string): void => {
		if (colorScheme === "dark") {
			this.options.requestColorScheme(2);
			return;
		}
		if (colorScheme === "light") {
			this.options.requestColorScheme(1);
			return;
		}
		if (colorScheme === "unspecified") this.options.requestColorScheme(-1);
	};

	public onConfigurationChanged(colorScheme: ApkColorScheme): void {
		if (this.#colorScheme === colorScheme) return;
		this.#colorScheme = colorScheme;
		this.options.emitDeviceEvent("appearanceChanged", { colorScheme });
	}
}
