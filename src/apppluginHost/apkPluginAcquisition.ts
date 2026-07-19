import type { AxiosInstance } from "axios";
import {
	mkdir,
	open,
	rename,
	rm,
	stat,
} from "node:fs/promises";
import * as path from "node:path";

import {
	ApkMainPluginPackageInstaller,
	type ApkMainPluginPackageInstallResult,
} from "./apkPluginPackageInstaller";

export const APK_MAIN_PLUGIN_ENDPOINT = "api/v1/appplugin";
export const APK_MAIN_PLUGIN_REQUEST_API_LEVEL = 10042;
export const APK_MAIN_PLUGIN_MINIMUM_RUNTIME_API_LEVEL = 10028;
export const APK_MAIN_PLUGIN_TYPE = 2;
export const APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE = -21023;
export const APK_MAIN_PLUGIN_URL_ERROR_CODE = -21024;

const MEBIBYTE = 1024 * 1024;
const DEFAULT_MAX_DOWNLOAD_BYTES = 128 * MEBIBYTE;
const DEFAULT_DOWNLOAD_TIMEOUT_MS = 60_000;

export interface ApkMainPluginVersionRequestBody {
	readonly apilevel: typeof APK_MAIN_PLUGIN_REQUEST_API_LEVEL;
	readonly productids: readonly [number];
	readonly type: typeof APK_MAIN_PLUGIN_TYPE;
}

export interface ApkMainPluginVersionMetadata {
	readonly apiLevel: number;
	readonly pluginLevel: number;
	readonly productId: number;
	readonly url: string;
	readonly version: number;
}

export interface ApkMainPluginVersionTransport {
	queryMainPluginVersion(
		body: ApkMainPluginVersionRequestBody,
	): Promise<unknown>;
}

/**
 * Uses the already authenticated APK/login API client for metadata only.
 *
 * The package URL is intentionally not fetched through this Axios instance:
 * the APK's DownloadCacheUtil creates a separate OkHttp request containing
 * only its Range header, so forwarding the cloud Authorization token to the
 * artifact host would be both inaccurate and a credential leak.
 */
export class ApkAxiosMainPluginVersionTransport
implements ApkMainPluginVersionTransport {
	readonly #client: Pick<AxiosInstance, "post">;

	public constructor(client: Pick<AxiosInstance, "post">) {
		this.#client = client;
	}

	public async queryMainPluginVersion(
		body: ApkMainPluginVersionRequestBody,
	): Promise<unknown> {
		const response = await this.#client.post(APK_MAIN_PLUGIN_ENDPOINT, body);
		return response.data;
	}
}

export class ApkMainPluginResolutionError extends Error {
	public constructor(
		message: string,
		public readonly apkErrorCode?: number,
	) {
		super(message);
		this.name = "ApkMainPluginResolutionError";
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function safeInteger(value: unknown, field: string): number {
	const parsed = typeof value === "string" && /^\d+$/u.test(value)
		? Number.parseInt(value, 10)
		: value;
	if (
		typeof parsed !== "number"
		|| !Number.isSafeInteger(parsed)
		|| parsed < 0
	) {
		throw new ApkMainPluginResolutionError(
			`Die AppPlugin-Antwort enthält kein gültiges Feld ${field}`,
			APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE,
		);
	}
	return parsed;
}

function positiveProductId(value: number): number {
	if (!Number.isSafeInteger(value) || value <= 0) {
		throw new Error("Die AppPlugin-Produkt-ID muss eine positive ganze Zahl sein");
	}
	return value;
}

function requiredPluginLevel(value: number): number {
	if (!Number.isSafeInteger(value) || value < 0) {
		throw new Error("Das erforderliche AppPlugin-Level muss eine nichtnegative ganze Zahl sein");
	}
	return value;
}

function packageUrl(value: unknown): string {
	if (typeof value !== "string" || value.length === 0) {
		throw new ApkMainPluginResolutionError(
			"Die AppPlugin-Antwort enthält keine Download-URL",
			APK_MAIN_PLUGIN_URL_ERROR_CODE,
		);
	}
	let parsed: URL;
	try {
		parsed = new URL(value);
	} catch {
		throw new ApkMainPluginResolutionError(
			"Die AppPlugin-Antwort enthält keine gültige HTTP-Download-URL",
			APK_MAIN_PLUGIN_URL_ERROR_CODE,
		);
	}
	if (
		(parsed.protocol !== "http:" && parsed.protocol !== "https:")
		|| parsed.username.length > 0
		|| parsed.password.length > 0
	) {
		throw new ApkMainPluginResolutionError(
			"Die AppPlugin-Antwort enthält keine zulässige HTTP-Download-URL",
			APK_MAIN_PLUGIN_URL_ERROR_CODE,
		);
	}
	return parsed.toString();
}

function responseEntries(response: unknown): readonly unknown[] {
	if (!isRecord(response)) {
		throw new ApkMainPluginResolutionError("Die AppPlugin-Metadatenantwort ist ungültig");
	}
	const code = typeof response.code === "string"
		? Number.parseInt(response.code, 10)
		: response.code;
	if (code !== 200) {
		throw new ApkMainPluginResolutionError(
			`Die AppPlugin-Metadatenabfrage ist mit Code ${String(response.code)} fehlgeschlagen`,
		);
	}
	if (!Array.isArray(response.data) || response.data.length === 0) {
		throw new ApkMainPluginResolutionError(
			"Für das Produkt wurde kein kompatibles AppPlugin geliefert",
			APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE,
		);
	}
	return response.data;
}

/**
 * Resolves one main-plugin package exactly through the APK's product-id query.
 */
export class ApkMainPluginVersionResolver {
	readonly #transport: ApkMainPluginVersionTransport;

	public constructor(transport: ApkMainPluginVersionTransport) {
		this.#transport = transport;
	}

	public async resolve(request: {
		readonly productId: number;
		readonly requiredPluginLevel?: number;
	}): Promise<ApkMainPluginVersionMetadata> {
		const productId = positiveProductId(request.productId);
		const minimumPluginLevel = requiredPluginLevel(
			request.requiredPluginLevel ?? 0,
		);
		const response = await this.#transport.queryMainPluginVersion({
			apilevel: APK_MAIN_PLUGIN_REQUEST_API_LEVEL,
			productids: [productId],
			type: APK_MAIN_PLUGIN_TYPE,
		});
		const first = responseEntries(response)[0];
		if (!isRecord(first)) {
			throw new ApkMainPluginResolutionError(
				"Die AppPlugin-Versionsantwort ist ungültig",
				APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE,
			);
		}
		const resolvedProductId = safeInteger(first.productid, "productid");
		const pluginLevel = safeInteger(first.pluginLevel, "pluginLevel");
		const apiLevel = safeInteger(first.apilevel, "apilevel");
		const version = safeInteger(first.version, "version");
		if (resolvedProductId !== productId) {
			throw new ApkMainPluginResolutionError(
				"Die AppPlugin-Antwort gehört nicht zur angefragten Produkt-ID",
				APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE,
			);
		}
		if (
			pluginLevel < minimumPluginLevel
			|| apiLevel < APK_MAIN_PLUGIN_MINIMUM_RUNTIME_API_LEVEL
		) {
			throw new ApkMainPluginResolutionError(
				"Das gelieferte AppPlugin ist mit dem APK-Host nicht kompatibel",
				APK_MAIN_PLUGIN_INCOMPATIBLE_ERROR_CODE,
			);
		}
		return {
			apiLevel,
			pluginLevel,
			productId: resolvedProductId,
			url: packageUrl(first.url),
			version,
		};
	}
}

export interface ApkPluginArtifactDownloadRequest {
	readonly destinationPath: string;
	readonly signal?: AbortSignal;
	readonly url: string;
}

export interface ApkPluginArtifactDownloadResult {
	readonly destinationPath: string;
	readonly downloadedBytes: number;
	readonly resumedBytes: number;
}

type ApkPluginFetch = (
	input: string | URL,
	init?: RequestInit,
) => Promise<Response>;

export class ApkPluginDownloadLimitError extends Error {
	public constructor(message: string) {
		super(message);
		this.name = "ApkPluginDownloadLimitError";
	}
}

function positiveOption(value: number, name: string): number {
	if (!Number.isSafeInteger(value) || value <= 0) {
		throw new Error(`${name} muss eine positive ganze Zahl sein`);
	}
	return value;
}

function contentLength(response: Response): number | undefined {
	const value = response.headers.get("content-length");
	if (value === null || !/^\d+$/u.test(value)) {
		return undefined;
	}
	const parsed = Number.parseInt(value, 10);
	return Number.isSafeInteger(parsed) ? parsed : undefined;
}

function assertRangeResponse(response: Response, expectedStart: number): void {
	const value = response.headers.get("content-range");
	const match = value?.match(/^bytes (\d+)-(\d+)\/(?:\d+|\*)$/iu);
	if (
		!match
		|| Number.parseInt(match[1], 10) !== expectedStart
		|| Number.parseInt(match[2], 10) < expectedStart
	) {
		throw new Error("Der AppPlugin-Download lieferte einen widersprüchlichen Byte-Bereich");
	}
}

/**
 * Bounded APK-style artifact download with `.temp` resume state.
 */
export class ApkPluginArtifactDownloader {
	readonly #fetch: ApkPluginFetch;
	readonly #maxBytes: number;
	readonly #timeoutMs: number;
	readonly #inFlight = new Set<string>();

	public constructor(options: {
		readonly fetch?: ApkPluginFetch;
		readonly maxBytes?: number;
		readonly timeoutMs?: number;
	} = {}) {
		this.#fetch = options.fetch ?? globalThis.fetch;
		this.#maxBytes = positiveOption(
			options.maxBytes ?? DEFAULT_MAX_DOWNLOAD_BYTES,
			"Maximale AppPlugin-Downloadgröße",
		);
		this.#timeoutMs = positiveOption(
			options.timeoutMs ?? DEFAULT_DOWNLOAD_TIMEOUT_MS,
			"AppPlugin-Download-Timeout",
		);
	}

	public async download(
		request: ApkPluginArtifactDownloadRequest,
	): Promise<ApkPluginArtifactDownloadResult> {
		const url = packageUrl(request.url);
		if (
			typeof request.destinationPath !== "string"
			|| request.destinationPath.trim().length === 0
		) {
			throw new Error("Der AppPlugin-Downloadpfad darf nicht leer sein");
		}
		const destinationPath = path.resolve(request.destinationPath);
		if (this.#inFlight.has(destinationPath)) {
			throw new Error(`Für ${destinationPath} läuft bereits ein AppPlugin-Download`);
		}
		this.#inFlight.add(destinationPath);
		try {
			await mkdir(path.dirname(destinationPath), { recursive: true });
			return await this.#downloadAttempt(
				url,
				destinationPath,
				request.signal,
				false,
			);
		} finally {
			this.#inFlight.delete(destinationPath);
		}
	}

	async #downloadAttempt(
		url: string,
		destinationPath: string,
		externalSignal: AbortSignal | undefined,
		restarted: boolean,
	): Promise<ApkPluginArtifactDownloadResult> {
		const temporaryPath = `${destinationPath}.temp`;
		const temporaryStats = await stat(temporaryPath).catch(error => {
			if ((error as NodeJS.ErrnoException).code === "ENOENT") {
				return undefined;
			}
			throw error;
		});
		if (temporaryStats && !temporaryStats.isFile()) {
			throw new Error("Der temporäre AppPlugin-Download ist keine Datei");
		}
		const existingBytes = temporaryStats?.size ?? 0;
		if (existingBytes > this.#maxBytes) {
			await rm(temporaryPath, { force: true });
			throw new ApkPluginDownloadLimitError(
				"Der temporäre AppPlugin-Download überschreitet die Größenbegrenzung",
			);
		}
		const timeoutSignal = AbortSignal.timeout(this.#timeoutMs);
		const signal = externalSignal
			? AbortSignal.any([externalSignal, timeoutSignal])
			: timeoutSignal;
		const headers = existingBytes > 0
			? { Range: `bytes=${existingBytes}-` }
			: undefined;
		const response = await this.#fetch(url, {
			headers,
			redirect: "follow",
			signal,
		});
		if (response.status === 416 && existingBytes > 0 && !restarted) {
			await response.body?.cancel();
			await rm(temporaryPath, { force: true });
			return this.#downloadAttempt(url, destinationPath, externalSignal, true);
		}
		if (!response.ok || !response.body) {
			await response.body?.cancel();
			throw new Error(`Der AppPlugin-Download ist mit HTTP ${response.status} fehlgeschlagen`);
		}
		if (response.url.length > 0) {
			packageUrl(response.url);
		}
		const append = existingBytes > 0 && response.status === 206;
		if (response.status === 206) {
			assertRangeResponse(response, append ? existingBytes : 0);
		}
		const resumedBytes = append ? existingBytes : 0;
		const advertisedBytes = contentLength(response);
		if (
			advertisedBytes !== undefined
			&& resumedBytes + advertisedBytes > this.#maxBytes
		) {
			await response.body.cancel();
			await rm(temporaryPath, { force: true });
			throw new ApkPluginDownloadLimitError(
				"Der AppPlugin-Download überschreitet die angekündigte Größenbegrenzung",
			);
		}

		const handle = await open(temporaryPath, append ? "a" : "w", 0o600);
		const reader = response.body.getReader();
		let downloadedBytes = resumedBytes;
		let limitExceeded = false;
		try {
			while (true) {
				const chunk = await reader.read();
				if (chunk.done) {
					break;
				}
				if (downloadedBytes + chunk.value.byteLength > this.#maxBytes) {
					limitExceeded = true;
					throw new ApkPluginDownloadLimitError(
						"Der AppPlugin-Download überschreitet die Größenbegrenzung",
					);
				}
				await handle.write(chunk.value);
				downloadedBytes += chunk.value.byteLength;
			}
			await handle.sync();
		} finally {
			await handle.close();
			if (limitExceeded) {
				await reader.cancel().catch(() => undefined);
				await rm(temporaryPath, { force: true });
			}
			reader.releaseLock();
		}
		await rm(destinationPath, { force: true });
		await rename(temporaryPath, destinationPath);
		return {
			destinationPath,
			downloadedBytes,
			resumedBytes,
		};
	}
}

export interface ApkMainPluginAcquisitionResult {
	readonly download: ApkPluginArtifactDownloadResult;
	readonly installation: ApkMainPluginPackageInstallResult;
	readonly metadata: ApkMainPluginVersionMetadata;
}

/**
 * End-to-end main-plugin acquisition without interpreting plugin contents.
 */
export class ApkMainPluginAcquisitionService {
	readonly #resolver: ApkMainPluginVersionResolver;
	readonly #downloader: ApkPluginArtifactDownloader;
	readonly #installer: ApkMainPluginPackageInstaller;
	readonly #downloadRoot: string;

	public constructor(options: {
		readonly resolver: ApkMainPluginVersionResolver;
		readonly downloader: ApkPluginArtifactDownloader;
		readonly installer: ApkMainPluginPackageInstaller;
		readonly downloadRoot: string;
	}) {
		this.#resolver = options.resolver;
		this.#downloader = options.downloader;
		this.#installer = options.installer;
		this.#downloadRoot = path.resolve(options.downloadRoot);
	}

	public async acquire(request: {
		readonly model: string;
		readonly productId: number;
		readonly requiredPluginLevel?: number;
		readonly signal?: AbortSignal;
	}): Promise<ApkMainPluginAcquisitionResult> {
		const metadata = await this.#resolver.resolve(request);
		const archivePath = path.join(
			this.#downloadRoot,
			`${metadata.productId}.zip`,
		);
		const download = await this.#downloader.download({
			destinationPath: archivePath,
			signal: request.signal,
			url: metadata.url,
		});
		try {
			const installation = await this.#installer.install({
				archivePath,
				downloadVersion: metadata.version,
				model: request.model,
				pluginLevel: metadata.pluginLevel,
			});
			return {
				download,
				installation,
				metadata,
			};
		} finally {
			// DownloadListener removes both accepted and rejected signed ZIPs.
			await rm(archivePath, { force: true }).catch(() => undefined);
		}
	}
}
