import type { AxiosInstance, AxiosRequestConfig } from "axios";

import type {
	ApkPluginHttpJson,
	ApkPluginHttpMap,
	ApkPluginRestfulHttpService,
} from "./apkPluginHttpRuntime";

type RestMethod = "DELETE" | "GET" | "POST" | "PUT";

function scalarEntries(params: ApkPluginHttpMap | null): Array<[string, string]> {
	const entries: Array<[string, string]> = [];
	for (const [key, value] of Object.entries(params ?? {})) {
		if (value === null || value === undefined || typeof value === "object") {
			throw new Error(`HTTP-Parameter ${key} muss ein skalarer Wert sein`);
		}
		entries.push([key, String(value)]);
	}
	return entries;
}

function queryParams(params: ApkPluginHttpMap | null): Readonly<Record<string, string>> | undefined {
	if (params === null) return undefined;
	return Object.fromEntries(scalarEntries(params));
}

function formBody(params: ApkPluginHttpMap | null): string {
	const body = new URLSearchParams(scalarEntries(params));
	return body.toString();
}

/**
 * Axios equivalent of the APK's Retrofit IRestfulApi response-body methods.
 * Authentication, origin and request interceptors remain owned by the supplied
 * client. The service only selects the same verb, query/form/JSON shape and
 * returns ResponseBody.string() semantics to RRPluginHttpTurboModule.
 */
export class ApkAxiosRestfulHttpService implements ApkPluginRestfulHttpService {
	public constructor(private readonly client: Pick<AxiosInstance, "request">) {}

	public async delete(path: string, params: ApkPluginHttpMap | null): Promise<string> {
		return this.#request({ method: "DELETE", url: path, params: queryParams(params) });
	}

	public async get(path: string, params: ApkPluginHttpMap | null): Promise<string> {
		return this.#request({ method: "GET", url: path, params: queryParams(params) });
	}

	public post(path: string, params: ApkPluginHttpMap | null): Promise<string> {
		return this.#formRequest("POST", path, params);
	}

	public postJson(path: string, data: ApkPluginHttpJson): Promise<string> {
		return this.#jsonRequest("POST", path, data);
	}

	public put(path: string, params: ApkPluginHttpMap | null): Promise<string> {
		return this.#formRequest("PUT", path, params);
	}

	public putJson(path: string, data: ApkPluginHttpMap | null): Promise<string> {
		return this.#jsonRequest("PUT", path, data);
	}

	async #formRequest(
		method: Extract<RestMethod, "POST" | "PUT">,
		path: string,
		params: ApkPluginHttpMap | null,
	): Promise<string> {
		return this.#request({
			method,
			url: path,
			data: formBody(params),
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});
	}

	#jsonRequest(
		method: Extract<RestMethod, "POST" | "PUT">,
		path: string,
		data: ApkPluginHttpJson,
	): Promise<string> {
		return this.#request({
			method,
			url: path,
			data,
			headers: { "Content-Type": "application/json" },
		});
	}

	async #request(config: AxiosRequestConfig): Promise<string> {
		const response = await this.client.request({
			...config,
			responseType: "text",
			transformResponse: [(value: unknown) => value],
		});
		if (typeof response.data !== "string") {
			throw new Error("APK-HTTP-Repository lieferte keinen Rohtext");
		}
		return response.data;
	}
}

export interface ApkAuthenticatedHttpAdapterPorts {
	readonly iot: ApkPluginRestfulHttpService;
	readonly user: ApkPluginRestfulHttpService;
}

export function createApkAuthenticatedHttpAdapterPorts(
	iotClient: Pick<AxiosInstance, "request">,
	userClient: Pick<AxiosInstance, "request">,
): ApkAuthenticatedHttpAdapterPorts {
	return {
		iot: new ApkAxiosRestfulHttpService(iotClient),
		user: new ApkAxiosRestfulHttpService(userClient),
	};
}
