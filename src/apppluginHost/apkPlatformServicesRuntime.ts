export interface ApkToastRequest {
	message: string;
	duration: number;
	gravity?: number;
	xOffset?: number;
	yOffset?: number;
}

export type ApkVibrationRequest =
	| Readonly<{ type: "cancel" }>
	| Readonly<{ type: "duration"; durationMs: number }>
	| Readonly<{ type: "pattern"; patternMs: readonly number[]; repeat: number }>;

export interface ApkPlatformServicesPort {
	androidId: string;
	readClipboardText(): string | Promise<string>;
	writeClipboardText(value: string): void | Promise<void>;
	invokeDefaultBackPressHandler(): void;
	showToast(request: Readonly<ApkToastRequest>): void;
	vibrate(request: ApkVibrationRequest): void;
}

function finiteInteger(value: number, name: string): number {
	if (!Number.isFinite(value)) throw new Error(`${name} muss eine endliche Zahl sein`);
	return Math.trunc(value);
}

/**
 * Cross-platform host implementation of the Android platform services exposed
 * by the inspected APK. Its public methods preserve the APK/React-Native
 * contract; only the operating-system effects are delegated to an injected
 * ioBroker/desktop host port.
 */
export class ApkPlatformServicesRuntime {
	public constructor(private readonly port: ApkPlatformServicesPort) {
		if (port.androidId.length === 0) throw new Error("androidId darf nicht leer sein");
	}

	public getAndroidID(): string {
		return this.port.androidId;
	}

	public async getString(): Promise<string> {
		const value = await this.port.readClipboardText();
		return typeof value === "string" ? value : String(value ?? "");
	}

	public async setString(value: string): Promise<void> {
		await this.port.writeClipboardText(String(value));
	}

	public invokeDefaultBackPressHandler(): void {
		this.port.invokeDefaultBackPressHandler();
	}

	public show(message: string, duration: number): void {
		this.port.showToast({
			message: String(message),
			duration: finiteInteger(duration, "duration"),
		});
	}

	public showWithGravity(message: string, duration: number, gravity: number): void {
		this.port.showToast({
			message: String(message),
			duration: finiteInteger(duration, "duration"),
			gravity: finiteInteger(gravity, "gravity"),
		});
	}

	public showWithGravityAndOffset(
		message: string,
		duration: number,
		gravity: number,
		xOffset: number,
		yOffset: number,
	): void {
		this.port.showToast({
			message: String(message),
			duration: finiteInteger(duration, "duration"),
			gravity: finiteInteger(gravity, "gravity"),
			xOffset: finiteInteger(xOffset, "xOffset"),
			yOffset: finiteInteger(yOffset, "yOffset"),
		});
	}

	public cancel(): void {
		this.port.vibrate({ type: "cancel" });
	}

	public vibrate(duration: number): void {
		this.port.vibrate({
			type: "duration",
			durationMs: finiteInteger(duration, "duration"),
		});
	}

	public vibrateByPattern(pattern: readonly unknown[], repeat: number): void {
		if (!Array.isArray(pattern)) throw new Error("pattern muss ein Array sein");
		this.port.vibrate({
			type: "pattern",
			patternMs: pattern.map((value, index) =>
				finiteInteger(Number(value), `pattern[${index}]`),
			),
			repeat: finiteInteger(repeat, "repeat"),
		});
	}
}
