import {
	ApkHostServicePublicError,
	fromApkHostServiceWireValue,
	toApkHostServiceWireValue,
	type ApkHostServiceHandler,
	type ApkHostServiceHandlers,
	type ApkHostServiceWireValue,
} from "./apkHostServiceProtocol";
import type {
	ApkPluginHttpMap,
	ApkPluginHttpRuntimeOptions,
	ApkPluginMallProductHttpService,
	ApkPluginRestfulHttpService,
	ApkPluginUserHttpService,
} from "./apkPluginHttpRuntime";

export interface ApkHostServiceAdapterHandlerOptions {
	iot?: ApkPluginRestfulHttpService;
	user?: ApkPluginUserHttpService;
	mallProduct?: ApkPluginMallProductHttpService;
	loadHttpHeaders?(): Readonly<Record<string, string>> | Promise<Readonly<Record<string, string>>>;
}

function invalid(message: string): never {
	throw new ApkHostServicePublicError("invalid-request", message);
}

function payloadRecord(value: ApkHostServiceWireValue, operation: string): Record<string, unknown> {
	const decoded = fromApkHostServiceWireValue(value);
	if (decoded === null || typeof decoded !== "object" || Array.isArray(decoded) || Buffer.isBuffer(decoded)) {
		return invalid(`${operation} benötigt eine Objektnutzlast`);
	}
	return decoded as Record<string, unknown>;
}

function boundedText(value: unknown, name: string, maximumBytes: number): string {
	if (typeof value !== "string" || value.length === 0 || Buffer.byteLength(value, "utf8") > maximumBytes) {
		return invalid(`${name} ist ungültig`);
	}
	if (/[\u0000-\u001f\u007f]/u.test(value)) return invalid(`${name} enthält Steuerzeichen`);
	return value;
}

function repositoryPath(value: unknown): string {
	const path = boundedText(value, "Repository-Pfad", 4096);
	if (/^[a-z][a-z\d+.-]*:/iu.test(path) || path.startsWith("//") || path.includes("\\")) {
		return invalid("Repository-Pfad darf keinen Ursprung überschreiben");
	}
	return path;
}

function mapOrNull(value: unknown, name: string): ApkPluginHttpMap | null {
	if (value === null) return null;
	if (typeof value !== "object" || Array.isArray(value) || Buffer.isBuffer(value)) {
		return invalid(`${name} muss ein Objekt oder null sein`);
	}
	return value as ApkPluginHttpMap;
}

function restPayload(
	payload: ApkHostServiceWireValue,
	operation: string,
): { path: string; value: unknown } {
	const record = payloadRecord(payload, operation);
	return { path: repositoryPath(record.path), value: record.value };
}

function response(value: unknown): ApkHostServiceWireValue {
	return toApkHostServiceWireValue(value);
}

function restHandlers(
	repository: "http.iot" | "http.user",
	service: ApkPluginRestfulHttpService,
): ApkHostServiceHandlers {
	const handler = (
		operation: "delete" | "get" | "post" | "postJson" | "put" | "putJson",
	): ApkHostServiceHandler => async payload => {
		const name = `${repository}.${operation}`;
		const request = restPayload(payload, name);
		if (operation === "postJson") {
			const data = request.value === null || typeof request.value === "string"
				? request.value
				: mapOrNull(request.value, "JSON-Nutzlast");
			return response(await service.postJson(request.path, data));
		}
		const params = mapOrNull(request.value, "Parameter");
		return response(await service[operation](request.path, params));
	};
	return {
		[`${repository}.delete`]: handler("delete"),
		[`${repository}.get`]: handler("get"),
		[`${repository}.post`]: handler("post"),
		[`${repository}.postJson`]: handler("postJson"),
		[`${repository}.put`]: handler("put"),
		[`${repository}.putJson`]: handler("putJson"),
	};
}

/**
 * Adapter-side implementation of the APK repository boundary. Paths may be
 * relative or root-relative, but can never replace the authenticated client's
 * configured origin. Mall headers are reconstructed from the single APK
 * business-id input instead of accepting arbitrary AppPlugin headers.
 */
export function createApkHostServiceAdapterHandlers(
	options: ApkHostServiceAdapterHandlerOptions,
): ApkHostServiceHandlers {
	const handlers: Partial<Record<string, ApkHostServiceHandler>> = {};
	if (options.iot) Object.assign(handlers, restHandlers("http.iot", options.iot));
	if (options.user) {
		Object.assign(handlers, restHandlers("http.user", options.user));
		handlers["http.user.postImages"] = async payload => {
			const record = payloadRecord(payload, "http.user.postImages");
			const path = repositoryPath(record.path);
			const params = mapOrNull(record.params, "Bildparameter");
			if (!Array.isArray(record.images)) return invalid("Vorbereitete Bilder müssen eine Liste sein");
			return response(await options.user!.postImages(path, params, record.images));
		};
	}
	if (options.mallProduct) {
		handlers["http.mall.get"] = async payload => {
			const record = payloadRecord(payload, "http.mall.get");
			const businessId = boundedText(record.businessId, "Business-ID", 256);
			return response(await options.mallProduct!.get(
				repositoryPath(record.path),
				mapOrNull(record.params, "Mall-Parameter"),
				{ "X-BusinessId": businessId },
			));
		};
		handlers["http.mall.postJson"] = async payload => {
			const record = payloadRecord(payload, "http.mall.postJson");
			const businessId = boundedText(record.businessId, "Business-ID", 256);
			const data = record.data === null || typeof record.data === "string" ? record.data : null;
			return response(await options.mallProduct!.postJson(
				repositoryPath(record.path),
				data,
				{ "X-BusinessId": businessId },
			));
		};
	}
	if (options.loadHttpHeaders) {
		handlers["http.headers.get"] = async payload => {
			if (payload !== null) return invalid("http.headers.get akzeptiert keine Nutzlast");
			return response(await options.loadHttpHeaders!());
		};
	}
	return handlers as ApkHostServiceHandlers;
}

export type ApkHostServiceHttpAdapterPorts = Pick<
	ApkPluginHttpRuntimeOptions,
	"iot" | "loadHttpHeaders" | "mallProduct" | "user"
>;
