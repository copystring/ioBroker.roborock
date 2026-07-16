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

	public constructor(initial: ApkI18nManagerPreferences) {
		this.#preferences = { ...initial };
	}

	public readonly allowRTL = (allow: boolean): void => {
		this.#preferences.allowRTL = allow;
	};

	public readonly forceRTL = (force: boolean): void => {
		this.#preferences.forceRTL = force;
	};

	public readonly swapLeftAndRightInRTL = (swap: boolean): void => {
		this.#preferences.doLeftAndRightSwapInRTL = swap;
	};

	public snapshot(): Readonly<ApkI18nManagerPreferences> {
		return { ...this.#preferences };
	}
}
