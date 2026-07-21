import {
	ApkHostServiceClient,
	toApkHostServiceWireValue,
	type ApkHostServiceWireValue,
} from "./apkHostServiceProtocol";
import type {
	ApkPluginHttpRuntimeOptions,
	ApkPluginMallProductHttpService,
	ApkPluginRestfulHttpService,
	ApkPluginUserHttpService,
} from "./apkPluginHttpRuntime";

type RestOperation = "delete" | "get" | "post" | "postJson" | "put" | "putJson";

function stringResult(value: ApkHostServiceWireValue, operation: string): string {
	if (typeof value !== "string") {
		throw new Error(`APK-Host-Dienst ${operation} lieferte keine Zeichenfolge`);
	}
	return value;
}

function headerResult(value: ApkHostServiceWireValue): Readonly<Record<string, string>> {
	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		throw new Error("APK-Host-Dienst http.headers.get lieferte keine Headerabbildung");
	}
	const entries = Object.entries(value);
	if (!entries.every((entry): entry is [string, string] => typeof entry[1] === "string")) {
		throw new Error("APK-Host-Dienst http.headers.get lieferte einen ungültigen Headerwert");
	}
	return Object.fromEntries(entries);
}

function restfulService(
	client: ApkHostServiceClient,
	repository: "iot" | "user",
): ApkPluginRestfulHttpService {
	const call = async (
		operation: RestOperation,
		path: string,
		value: unknown,
	): Promise<string> => {
		const serviceOperation = `http.${repository}.${operation}` as const;
		const result = await client.request(serviceOperation, toApkHostServiceWireValue({ path, value }));
		return stringResult(result, serviceOperation);
	};
	return {
		delete: (path, params) => call("delete", path, params),
		get: (path, params) => call("get", path, params),
		post: (path, params) => call("post", path, params),
		postJson: (path, data) => call("postJson", path, data),
		put: (path, params) => call("put", path, params),
		putJson: (path, data) => call("putJson", path, data),
	};
}

export interface ApkHostServiceRuntimePorts {
	http: Pick<ApkPluginHttpRuntimeOptions, "iot" | "loadHttpHeaders" | "mallProduct" | "user">;
}

/**
 * Runtime-process ports backed by the authenticated adapter process. The
 * AppPlugin only sees APK repository operations and their public results; it
 * never receives ioBroker credentials, regional base URLs or Axios clients.
 */
export function createApkHostServiceRuntimePorts(client: ApkHostServiceClient): ApkHostServiceRuntimePorts {
	const userRest = restfulService(client, "user");
	const user: ApkPluginUserHttpService = {
		...userRest,
		postImages: async (path, params, images) => stringResult(
			await client.request("http.user.postImages", toApkHostServiceWireValue({ path, params, images })),
			"http.user.postImages",
		),
	};
	const mallProduct: ApkPluginMallProductHttpService = {
		get: async (path, params, headers) => stringResult(
			await client.request("http.mall.get", toApkHostServiceWireValue({
				path,
				params,
				businessId: headers["X-BusinessId"] ?? "",
			})),
			"http.mall.get",
		),
		postJson: async (path, data, headers) => stringResult(
			await client.request("http.mall.postJson", toApkHostServiceWireValue({
				path,
				data,
				businessId: headers["X-BusinessId"] ?? "",
			})),
			"http.mall.postJson",
		),
	};
	return {
		http: {
			iot: restfulService(client, "iot"),
			user,
			mallProduct,
			loadHttpHeaders: async () => headerResult(await client.request("http.headers.get", null)),
		},
	};
}
