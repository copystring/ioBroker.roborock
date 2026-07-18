import { ApkHostServiceUnavailableError } from "./apkPluginSdkEnvironmentRuntime";

export interface ApkPluginIotHttpService {
	get(path: string, params: Readonly<Record<string, unknown>> | null): Promise<string>;
}

export interface ApkPluginHttpRuntimeOptions {
	iot?: ApkPluginIotHttpService;
}

function isReadableMap(value: unknown): value is Readonly<Record<string, unknown>> {
	return value !== null && typeof value === "object" && !Array.isArray(value) && !ArrayBuffer.isView(value);
}

/**
 * APK-derived RRPluginHttpTurboModule slice.
 *
 * The Android module delegates iotGet(path, params, options) to the APK IoT
 * REST client and resolves the returned response string. Authentication,
 * region selection and network policy remain host services; no AppPlugin or
 * product-specific endpoint logic is copied here.
 */
export class ApkPluginHttpRuntime {
	public readonly name = "RRPluginHttpTurboModule";

	public constructor(private readonly options: ApkPluginHttpRuntimeOptions = {}) {}

	public async iotGet(
		path: string,
		params: unknown,
		_options: unknown,
	): Promise<string> {
		if (!this.options.iot) throw new ApkHostServiceUnavailableError("iot-http");
		return this.options.iot.get(path, isReadableMap(params) ? params : null);
	}
}
