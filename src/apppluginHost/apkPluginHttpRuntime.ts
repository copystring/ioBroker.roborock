import { ApkHostServiceUnavailableError } from "./apkPluginSdkEnvironmentRuntime";

export type ApkPluginHttpMap = Readonly<Record<string, unknown>>;
export type ApkPluginHttpJson = ApkPluginHttpMap | string | null;

export interface ApkPluginRestfulHttpService {
	delete(path: string, params: ApkPluginHttpMap | null): Promise<string>;
	get(path: string, params: ApkPluginHttpMap | null): Promise<string>;
	post(path: string, params: ApkPluginHttpMap | null): Promise<string>;
	postJson(path: string, data: ApkPluginHttpJson): Promise<string>;
	put(path: string, params: ApkPluginHttpMap | null): Promise<string>;
	putJson(path: string, data: ApkPluginHttpMap | null): Promise<string>;
}

export interface ApkPluginIotHttpService extends ApkPluginRestfulHttpService {}

export interface ApkPluginUserHttpService extends ApkPluginRestfulHttpService {
	postImages(
		path: string,
		params: ApkPluginHttpMap | null,
		images: readonly unknown[],
	): Promise<string>;
}

export interface ApkPluginMallProductHttpService {
	get(
		path: string,
		params: ApkPluginHttpMap | null,
		headers: Readonly<Record<string, string>>,
	): Promise<string>;
	postJson(
		path: string,
		data: string | null,
		headers: Readonly<Record<string, string>>,
	): Promise<string>;
}

export interface ApkPluginHttpRuntimeOptions {
	iot?: ApkPluginIotHttpService;
	user?: ApkPluginUserHttpService;
	mallProduct?: ApkPluginMallProductHttpService;
	loadHttpHeaders?(): Readonly<Record<string, string>> | Promise<Readonly<Record<string, string>>>;
	prepareUserImages?(references: readonly string[]): Promise<readonly unknown[]>;
	nowMilliseconds?(): number;
}

function isReadableMap(value: unknown): value is ApkPluginHttpMap {
	return value !== null && typeof value === "object" && !Array.isArray(value) && !ArrayBuffer.isView(value);
}

function readableMapOrNull(value: unknown): ApkPluginHttpMap | null {
	return isReadableMap(value) ? value : null;
}

function stringReferences(value: unknown): string[] {
	if (!Array.isArray(value)) return [];
	return value.filter((item): item is string => typeof item === "string");
}

function neverSettles(): Promise<never> {
	return new Promise<never>(() => undefined);
}

/**
 * APK-derived RRPluginHttpTurboModule.
 *
 * APK 4.54.02 installs separate REST repositories for RRSDK user requests,
 * IoT requests and mall-product requests. This runtime preserves that split
 * and only translates the React-Native argument shapes. Authentication,
 * region selection, Android image preparation and transport remain explicit
 * host services; no endpoint or product behavior is copied from an AppPlugin.
 */
export class ApkPluginHttpRuntime {
	public readonly name = "RRPluginHttpTurboModule";

	#timestampOffsetSeconds: number | undefined;

	public constructor(private readonly options: ApkPluginHttpRuntimeOptions = {}) {}

	/**
	 * The three account methods in the inspected APK only log their invocation
	 * and never resolve or reject the supplied React-Native promise.
	 */
	public accountGet(_path: string, _params: unknown, _options: unknown): Promise<never> {
		return neverSettles();
	}

	public accountPost(_path: string, _params: unknown, _options: unknown): Promise<never> {
		return neverSettles();
	}

	public accountPostJson(_path: string, _data: unknown, _options: unknown): Promise<never> {
		return neverSettles();
	}

	public async getHttpHeaders(): Promise<Record<string, string>> {
		if (!this.options.loadHttpHeaders) throw new ApkHostServiceUnavailableError("http-headers");
		return { ...await this.options.loadHttpHeaders() };
	}

	public async getTimestamp(): Promise<number> {
		const localSeconds = Math.floor(this.#nowMilliseconds() / 1000);
		return this.#timestampOffsetSeconds === undefined
			? localSeconds
			: localSeconds - this.#timestampOffsetSeconds;
	}

	public async updateTimestamp(timestampSeconds: number): Promise<""> {
		if (timestampSeconds > 0) {
			this.#timestampOffsetSeconds = Math.floor(this.#nowMilliseconds() / 1000)
				- Math.trunc(timestampSeconds);
		}
		return "";
	}

	public async iotDelete(path: string, params: unknown): Promise<string> {
		return this.#iot().delete(path, readableMapOrNull(params));
	}

	public async iotGet(path: string, params: unknown, _options: unknown): Promise<string> {
		return this.#iot().get(path, readableMapOrNull(params));
	}

	public async iotPost(path: string, params: unknown, _options: unknown): Promise<string> {
		return this.#iot().post(path, readableMapOrNull(params));
	}

	public async iotPostJson(path: string, data: unknown, _options: unknown): Promise<string> {
		return this.#iot().postJson(path, readableMapOrNull(data));
	}

	public async iotPut(path: string, params: unknown, _options: unknown): Promise<string> {
		return this.#iot().put(path, readableMapOrNull(params));
	}

	public async iotPutJson(path: string, data: unknown, _options: unknown): Promise<string> {
		return this.#iot().putJson(path, readableMapOrNull(data));
	}

	public async mallProductGetV2(
		path: string,
		businessId: string,
		params: unknown,
		_header: unknown,
	): Promise<string> {
		return this.#mallProduct().get(
			path,
			readableMapOrNull(params),
			{ "X-BusinessId": businessId },
		);
	}

	public async mallProductPostJsonV2(
		path: string,
		businessId: string,
		data: unknown,
		_header: unknown,
	): Promise<string> {
		return this.#mallProduct().postJson(
			path,
			typeof data === "string" ? data : null,
			{ "X-BusinessId": businessId },
		);
	}

	public async userDelete(path: string, params: unknown): Promise<string> {
		return this.#user().delete(path, readableMapOrNull(params));
	}

	public async userGet(path: string, params: unknown, _options: unknown): Promise<string> {
		return this.#user().get(path, readableMapOrNull(params));
	}

	public async userPost(path: string, params: unknown, _options: unknown): Promise<string> {
		return this.#user().post(path, readableMapOrNull(params));
	}

	public async userPostImages(
		path: string,
		images: unknown,
		params: unknown,
		_options: unknown,
	): Promise<string> {
		const references = stringReferences(images);
		let preparedImages: readonly unknown[] = [];
		if (references.length > 0) {
			if (!this.options.prepareUserImages) {
				throw new ApkHostServiceUnavailableError("user-image-preparation");
			}
			preparedImages = await this.options.prepareUserImages(references);
		}
		return this.#user().postImages(path, readableMapOrNull(params), preparedImages);
	}

	public async userPostJson(path: string, data: unknown, _options: unknown): Promise<string> {
		return this.#user().postJson(path, readableMapOrNull(data));
	}

	public async userPostJsonV2(path: string, data: unknown, _options: unknown): Promise<string> {
		return this.#user().postJson(path, typeof data === "string" ? data : null);
	}

	public async userPut(path: string, params: unknown, _options: unknown): Promise<string> {
		return this.#user().put(path, readableMapOrNull(params));
	}

	public async userPutJson(path: string, data: unknown, _options: unknown): Promise<string> {
		return this.#user().putJson(path, readableMapOrNull(data));
	}

	#iot(): ApkPluginIotHttpService {
		if (!this.options.iot) throw new ApkHostServiceUnavailableError("iot-http");
		return this.options.iot;
	}

	#user(): ApkPluginUserHttpService {
		if (!this.options.user) throw new ApkHostServiceUnavailableError("user-http");
		return this.options.user;
	}

	#mallProduct(): ApkPluginMallProductHttpService {
		if (!this.options.mallProduct) throw new ApkHostServiceUnavailableError("mall-product-http");
		return this.options.mallProduct;
	}

	#nowMilliseconds(): number {
		return this.options.nowMilliseconds?.() ?? Date.now();
	}
}
