export type ApkStatusBarStyle = "default" | "light-content" | "dark-content" | null;

export interface ApkStatusBarState {
	color: number;
	animated: boolean;
	hidden: boolean;
	style: ApkStatusBarStyle;
	translucent: boolean;
}

export interface ApkStatusBarRuntimeOptions {
	onChange?: (state: Readonly<ApkStatusBarState>) => void;
}

function booleanValue(value: boolean, property: string): boolean {
	if (typeof value !== "boolean") throw new Error(`${property} muss boolesch sein`);
	return value;
}

/**
 * Reproduces the stateful boundary of the APK's StatusBarManager. Android
 * applies these values to the current Activity; a desktop host can consume the
 * same state for its own shell or deliberately leave the callback unset.
 */
export class ApkStatusBarRuntime {
	#state: ApkStatusBarState = {
		color: 0,
		animated: false,
		hidden: false,
		style: null,
		translucent: false,
	};

	public constructor(private readonly options: Readonly<ApkStatusBarRuntimeOptions> = {}) {}

	public readonly setColor = (color: number, animated: boolean): void => {
		if (!Number.isFinite(color)) throw new Error("Statusleistenfarbe muss eine endliche Zahl sein");
		this.#update({ color: Math.trunc(color), animated: booleanValue(animated, "animated") });
	};

	public readonly setHidden = (hidden: boolean): void => {
		this.#update({ hidden: booleanValue(hidden, "hidden") });
	};

	public readonly setStyle = (style: string | null): void => {
		if (style !== null && style !== "default" && style !== "light-content" && style !== "dark-content") {
			throw new Error(`Unbekannter APK-Statusleistenstil: ${String(style)}`);
		}
		this.#update({ style });
	};

	public readonly setTranslucent = (translucent: boolean): void => {
		this.#update({ translucent: booleanValue(translucent, "translucent") });
	};

	public snapshot(): Readonly<ApkStatusBarState> {
		return Object.freeze({ ...this.#state });
	}

	#update(patch: Partial<ApkStatusBarState>): void {
		this.#state = { ...this.#state, ...patch };
		this.options.onChange?.(this.snapshot());
	}
}
