export interface ApkSoundManagerRuntimeOptions {
	/** Platform hook replacing Android AudioManager.playSoundEffect(0). */
	playTouchSound?: () => void;
}

/** Reproduces the APK SoundManager contract without assuming Android audio. */
export class ApkSoundManagerRuntime {
	#touchSoundCount = 0;

	public constructor(private readonly options: Readonly<ApkSoundManagerRuntimeOptions> = {}) {}

	public readonly playTouchSound = (): void => {
		this.#touchSoundCount += 1;
		this.options.playTouchSound?.();
	};

	public touchSoundCount(): number {
		return this.#touchSoundCount;
	}
}
