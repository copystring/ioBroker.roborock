export type ApkPluginDarkColorScheme = "dark" | "light";
export type ApkStoredColorModel = "dark" | "default" | "light";

export interface ApkDarkModeRuntimeOptions {
	storedColorModel: ApkStoredColorModel;
	systemColorScheme: ApkPluginDarkColorScheme;
	initialCardStyle?: number;
	emitDeviceEvent?(eventName: "themeDidChange", payload: { colorScheme: ApkPluginDarkColorScheme }): void;
	applyActivityStyle?(isDark: boolean): void;
	requestColorModel?(mode: ApkStoredColorModel): void;
	onStateChange?(state: ApkDarkModeSnapshot): void;
}

export interface ApkDarkModeSnapshot {
	colorModel: ApkStoredColorModel;
	systemColorScheme: ApkPluginDarkColorScheme;
	cardStyle: number;
}

/** Reproduces the observable RRPluginDarkMode state used by AppPlugins. */
export class ApkDarkModeRuntime {
	#storedColorModel: ApkStoredColorModel;
	#systemColorScheme: ApkPluginDarkColorScheme;
	#cardStyle: number;

	public constructor(private readonly options: ApkDarkModeRuntimeOptions) {
		this.#storedColorModel = options.storedColorModel;
		this.#systemColorScheme = options.systemColorScheme;
		this.#cardStyle = Math.trunc(options.initialCardStyle ?? 0);
	}

	public addListener(_eventName: string | null): void {}

	public removeListeners(_count: number | null): void {}

	public getColorScheme(): ApkPluginDarkColorScheme {
		return this.#storedColorModel === "default"
			? this.#systemColorScheme
			: this.#storedColorModel;
	}

	public getColorModel(): ApkStoredColorModel {
		return this.#storedColorModel;
	}

	public getCardStyle(): number {
		return this.#cardStyle;
	}

	public setCardStyle(style: number): void {
		if (!Number.isFinite(style)) throw new Error("cardStyle muss endlich sein");
		this.#cardStyle = Math.trunc(style);
		this.options.onStateChange?.(this.snapshot());
	}

	public setColorModel(mode: string): void {
		const normalized = mode === "light" ? "light" : mode === "dark" ? "dark" : "default";
		this.#storedColorModel = normalized;
		this.options.requestColorModel?.(normalized);
		this.options.onStateChange?.(this.snapshot());
	}

	public setStyle(isDark: boolean): void {
		this.options.applyActivityStyle?.(isDark);
	}

	public updateSystemColorScheme(colorScheme: ApkPluginDarkColorScheme): void {
		if (colorScheme === this.#systemColorScheme) return;
		this.#systemColorScheme = colorScheme;
		this.options.onStateChange?.(this.snapshot());
		this.setStyle(colorScheme === "dark");
		this.options.emitDeviceEvent?.("themeDidChange", { colorScheme });
	}

	public constants(): { colorScheme: ApkPluginDarkColorScheme } {
		return { colorScheme: this.getColorScheme() };
	}

	public snapshot(): ApkDarkModeSnapshot {
		return {
			colorModel: this.#storedColorModel,
			systemColorScheme: this.#systemColorScheme,
			cardStyle: this.#cardStyle,
		};
	}
}
