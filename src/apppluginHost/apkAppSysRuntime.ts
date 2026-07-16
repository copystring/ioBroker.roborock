export interface ApkAppSysLogEntry {
	level: "debug" | "error" | "info" | "log" | "warn";
	tag: string | null;
	message: string | null;
}

export interface ApkAppSysRuntimeOptions {
	networkReachable: () => boolean;
	writeLog: (entry: ApkAppSysLogEntry) => void;
}

export class ApkAppSysRuntime {
	public constructor(private readonly options: ApkAppSysRuntimeOptions) {}

	public readonly addListener = (_eventName: string | null): void => undefined;

	public readonly removeListeners = (_count: number | null): void => undefined;

	public readonly debug = (tag: string | null, message: string | null): void =>
		this.#log("debug", tag, message);

	public readonly error = (tag: string | null, message: string | null): void =>
		this.#log("error", tag, message);

	public readonly info = (tag: string | null, message: string | null): void =>
		this.#log("info", tag, message);

	public readonly log = (tag: string | null, message: string | null): void =>
		this.#log("log", tag, message);

	public readonly warn = (tag: string | null, message: string | null): void =>
		this.#log("warn", tag, message);

	public readonly getAppBuildConfig = (): Readonly<Record<string, unknown>> => ({
		versionName: "4.54.02",
		versionCode: "100820",
		testMode: false,
	});

	public readonly getNetworkReachable = (): Readonly<Record<string, boolean>> => ({
		isReachable: this.options.networkReachable(),
	});

	/**
	 * The APK method logs the request but never settles its Promise. Keeping
	 * this Promise pending preserves that observable behavior.
	 */
	public readonly keepWindowPrivacyMode = (enabled: boolean): Promise<never> => {
		this.#log("debug", "RRAppSysTurboModule", `keepWindowPrivacyMode:${enabled}`);
		return new Promise<never>(() => undefined);
	};

	public readonly openCameraScan = (): never => {
		throw new Error("unknown error");
	};

	#log(level: ApkAppSysLogEntry["level"], tag: string | null, message: string | null): void {
		this.options.writeLog({ level, tag, message });
	}
}
