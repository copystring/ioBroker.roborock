export type ApkPluginAnalyticsEvent =
	| Readonly<{
		method: "eventCommonV2WithEventIDDict";
		eventId: string;
		eventProp: string;
		parameters: Readonly<Record<string, unknown>>;
	}>
	| Readonly<{
		method: "eventCommonWithEventIDDict";
		eventId: string;
		parameters: Readonly<Record<string, unknown>>;
	}>
	| Readonly<{
		method: "eventRecordView";
		fromView: string;
		toView: string;
		stayMillisecond: number;
		parameters: Readonly<Record<string, unknown>>;
	}>
	| Readonly<{
		method: "eventStatusWithParamDic";
		parameters: Readonly<Record<string, unknown>>;
	}>;

export interface ApkPluginAnalyticsRuntimeOptions {
	firmwareVersion?: string;
	pluginVersion: string | number;
	productModel: string;
	emit: (event: ApkPluginAnalyticsEvent) => void;
}

/**
 * Mirrors PluginSDKModule's four tracking entrypoints. The Android APK adds
 * the same firmware/plugin/product fields before forwarding to its tracking
 * SDK; the ioBroker host exposes that final event to its own telemetry port.
 */
export class ApkPluginAnalyticsRuntime {
	public constructor(private readonly options: ApkPluginAnalyticsRuntimeOptions) {}

	public eventCommonV2WithEventIDDict(
		eventId: string,
		eventProp: string,
		parameters: Readonly<Record<string, unknown>> | null,
	): void {
		this.options.emit(Object.freeze({
			method: "eventCommonV2WithEventIDDict",
			eventId,
			eventProp,
			parameters: this.#commonParameters(parameters),
		}));
	}

	public eventCommonWithEventIDDict(
		eventId: string,
		parameters: Readonly<Record<string, unknown>> | null,
	): void {
		this.options.emit(Object.freeze({
			method: "eventCommonWithEventIDDict",
			eventId,
			parameters: this.#commonParameters(parameters),
		}));
	}

	public eventRecordView(
		fromView: string,
		toView: string,
		stayMillisecond: number,
		parameters: Readonly<Record<string, unknown>> | null,
	): void {
		this.options.emit(Object.freeze({
			method: "eventRecordView",
			fromView,
			toView,
			stayMillisecond,
			parameters: this.#commonParameters(parameters),
		}));
	}

	public eventStatusWithParamDic(
		parameters: Readonly<Record<string, unknown>> | null,
	): void {
		this.options.emit(Object.freeze({
			method: "eventStatusWithParamDic",
			parameters: this.#commonParameters(parameters),
		}));
	}

	#commonParameters(
		parameters: Readonly<Record<string, unknown>> | null,
	): Readonly<Record<string, unknown>> {
		return Object.freeze({
			...(parameters ?? {}),
			firmwareV: this.options.firmwareVersion || "unKnown",
			pluginV: String(this.options.pluginVersion),
			productModel: this.options.productModel,
		});
	}
}
