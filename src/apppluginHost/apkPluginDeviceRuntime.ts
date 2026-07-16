export type ApkPluginDeviceCallback = (...arguments_: unknown[]) => void;

export interface ApkPluginDeviceTransport {
	loadShadowDps(): Promise<string | null>;
	publishDps(dps: Readonly<Record<string, unknown>>): Promise<void>;
}

export interface ApkPluginDeviceRuntimeOptions {
	hasActivity(): boolean;
	transport: ApkPluginDeviceTransport;
}

function isReadableMap(value: unknown): value is Readonly<Record<string, unknown>> {
	return value !== null && typeof value === "object" && !Array.isArray(value) && !ArrayBuffer.isView(value);
}

/**
 * APK-derived RRPluginDevice DPS boundary. The transport is injected by the
 * host; this module contains no device-model mapping or ioBroker command code.
 */
export class ApkPluginDeviceRuntime {
	public constructor(private readonly options: ApkPluginDeviceRuntimeOptions) {}

	public addListener(_eventName: string | null): void {}

	public removeListeners(_count: number | null): void {}

	public async loadDps(): Promise<string | null> {
		if (!this.options.hasActivity()) throw new Error("activity is null");
		return this.options.transport.loadShadowDps();
	}

	public publishDps(dps: unknown, callback: ApkPluginDeviceCallback): void {
		if (!this.options.hasActivity()) {
			callback(false, { error: "null" });
			return;
		}
		if (!isReadableMap(dps)) {
			callback(false);
			return;
		}
		void this.options.transport.publishDps(structuredClone(dps)).then(
			() => callback(true),
			() => callback(false),
		);
	}
}
