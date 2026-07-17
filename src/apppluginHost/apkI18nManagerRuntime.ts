export interface ApkI18nManagerPreferences {
	allowRTL: boolean;
	forceRTL: boolean;
	doLeftAndRightSwapInRTL: boolean;
}

/**
 * Reproduces the preference mutations of the APK I18nManagerModule.
 * Exported locale constants are created separately from the current host
 * configuration by createApkLocalizationConstants().
 */
export class ApkI18nManagerRuntime {
	#preferences: ApkI18nManagerPreferences;

	public constructor(
		initial: ApkI18nManagerPreferences,
		private readonly onChange?: (preferences: Readonly<ApkI18nManagerPreferences>) => void,
	) {
		this.#preferences = { ...initial };
	}

	public readonly allowRTL = (allow: boolean): void => {
		this.#preferences.allowRTL = allow;
		this.onChange?.(this.snapshot());
	};

	public readonly forceRTL = (force: boolean): void => {
		this.#preferences.forceRTL = force;
		this.onChange?.(this.snapshot());
	};

	public readonly swapLeftAndRightInRTL = (swap: boolean): void => {
		this.#preferences.doLeftAndRightSwapInRTL = swap;
		this.onChange?.(this.snapshot());
	};

	public snapshot(): Readonly<ApkI18nManagerPreferences> {
		return { ...this.#preferences };
	}
}
