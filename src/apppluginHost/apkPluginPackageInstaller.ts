import { createPublicKey, verify as verifySignature, type KeyObject } from "node:crypto";
import { createWriteStream } from "node:fs";
import {
	access,
	constants,
	mkdir,
	readFile,
	rename,
	rm,
	stat,
} from "node:fs/promises";
import * as path from "node:path";
import { type TransformCallback, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

import JSZip, { type JSZipObject } from "jszip";

import {
	ApkMainPluginInstallationStore,
	type ApkMainPluginInstallation,
	type ApkMainPluginInstallationPersistence,
} from "./apkPluginInstallationStore";

const APK_RSA_SIGNATURE_BYTES = 256;
const MEBIBYTE = 1024 * 1024;

export const APK_PLUGIN_SIGNING_PUBLIC_KEY_SPKI_BASE64 =
	"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvQxqqxB+QmLlknnjfdpD"
	+ "opiWpugFRgYn182bM0vNs4NZzxfx6W9NoSTIYE6wR084ieyV1s1kDAGPTYIlpmDO"
	+ "mBuFyMrEO1qpLp+Kl9/pAYGpDAFxJjfZFWm5IiTZ3+7yf4SPm9xFIN0xWB+A86Lq"
	+ "Dpe3aDq2yMo7HvduePNzjmdW9druNInP13Br3n6j6sL7AHDrIFVkBI/RUHoASpRK"
	+ "L2yns9bJPG80mYZp6lo3MDzAUbV+1uVuptUTbv8J77nl46iKAg80SnmHlBmEA/zk"
	+ "l8A0xCCmtq+uSml1uQNXp+Hzdd6LLmyyPxZtiKdSkfDQGGnV6XPtPAb0AOLgatE5"
	+ "RwIDAQAB";

export interface ApkPluginPackageSignatureVerifier {
	verifyAppendedArchive(signedArchive: Buffer): boolean;
	verifyDetachedFile(payload: Buffer, signature: Buffer): boolean;
	archivePayload(signedArchive: Buffer): Buffer;
}

/**
 * APK-derived package signature verifier.
 *
 * Main AppPlugin downloads append a fixed 256-byte SHA256withRSA signature to
 * the ZIP. Category bundles use the same public key with a detached `.sign`
 * file. The public key is copied from the APK's DownloadListener; it is not a
 * credential and cannot create valid signatures.
 */
export class ApkRsaPluginPackageSignatureVerifier
implements ApkPluginPackageSignatureVerifier {
	readonly #publicKey: KeyObject;
	readonly #signatureBytes: number;

	public constructor(
		publicKey: KeyObject = createPublicKey({
			key: Buffer.from(APK_PLUGIN_SIGNING_PUBLIC_KEY_SPKI_BASE64, "base64"),
			format: "der",
			type: "spki",
		}),
		signatureBytes = APK_RSA_SIGNATURE_BYTES,
	) {
		if (!Number.isSafeInteger(signatureBytes) || signatureBytes <= 0) {
			throw new Error("Die AppPlugin-Signaturlänge muss positiv sein");
		}
		this.#publicKey = publicKey;
		this.#signatureBytes = signatureBytes;
	}

	public verifyAppendedArchive(signedArchive: Buffer): boolean {
		if (signedArchive.length <= this.#signatureBytes) {
			return false;
		}
		const payloadEnd = signedArchive.length - this.#signatureBytes;
		return this.verifyDetachedFile(
			signedArchive.subarray(0, payloadEnd),
			signedArchive.subarray(payloadEnd),
		);
	}

	public verifyDetachedFile(payload: Buffer, signature: Buffer): boolean {
		if (signature.length !== this.#signatureBytes) {
			return false;
		}
		return verifySignature("sha256", payload, this.#publicKey, signature);
	}

	public archivePayload(signedArchive: Buffer): Buffer {
		if (signedArchive.length <= this.#signatureBytes) {
			throw new Error("Das AppPlugin-Paket enthält keine angehängte Signatur");
		}
		return signedArchive.subarray(0, signedArchive.length - this.#signatureBytes);
	}
}

export interface ApkMainPluginPackageInstallRequest {
	readonly model: string;
	readonly archivePath: string;
	readonly downloadVersion: number;
	readonly pluginLevel: number;
}

export interface ApkMainPluginPackageInstallResult {
	readonly model: string;
	readonly activeDirectory: string;
	readonly bundlePath: string;
	readonly installation: ApkMainPluginInstallation;
}

export interface ApkPluginPackageInstallerLimits {
	readonly maxArchiveBytes: number;
	readonly maxEntries: number;
	readonly maxEntryBytes: number;
	readonly maxExtractedBytes: number;
}

export const APK_PLUGIN_DEFAULT_INSTALLER_LIMITS: Readonly<ApkPluginPackageInstallerLimits> = Object.freeze({
	maxArchiveBytes: 128 * MEBIBYTE,
	maxEntries: 4096,
	maxEntryBytes: 128 * MEBIBYTE,
	maxExtractedBytes: 512 * MEBIBYTE,
});

interface PackagePaths {
	readonly active: string;
	readonly staging: string;
	readonly ready: string;
	readonly rollback: string;
}

export function apkMainPluginPackageKey(value: string): string {
	if (
		typeof value !== "string"
		|| value.length === 0
		|| value.trim() !== value
		|| value === "."
		|| value === ".."
		|| /[<>:"/\\|?*\0]/u.test(value)
		|| /[. ]$/u.test(value)
	) {
		throw new Error("Das AppPlugin-Modell ist kein sicherer Verzeichnisname");
	}
	return value;
}

function positiveLimit(value: number, name: string): number {
	if (!Number.isSafeInteger(value) || value <= 0) {
		throw new Error(`${name} muss eine positive ganze Zahl sein`);
	}
	return value;
}

function normalizedLimits(
	limits?: Partial<ApkPluginPackageInstallerLimits>,
): ApkPluginPackageInstallerLimits {
	const merged = { ...APK_PLUGIN_DEFAULT_INSTALLER_LIMITS, ...limits };
	return {
		maxArchiveBytes: positiveLimit(merged.maxArchiveBytes, "Maximale Paketgröße"),
		maxEntries: positiveLimit(merged.maxEntries, "Maximale Dateianzahl"),
		maxEntryBytes: positiveLimit(merged.maxEntryBytes, "Maximale Dateigröße"),
		maxExtractedBytes: positiveLimit(
			merged.maxExtractedBytes,
			"Maximale entpackte Paketgröße",
		),
	};
}

function entryOriginalName(entry: JSZipObject): string {
	return (
		entry as JSZipObject & { readonly unsafeOriginalName?: string }
	).unsafeOriginalName ?? entry.name;
}

function safeArchiveEntryName(entry: JSZipObject): string {
	const originalName = entryOriginalName(entry);
	const normalizedName = entry.dir && originalName.endsWith("/")
		? originalName.slice(0, -1)
		: originalName;
	if (
		normalizedName.length === 0
		|| normalizedName.includes("\\")
		|| normalizedName.startsWith("/")
		|| /^[A-Za-z]:/u.test(normalizedName)
	) {
		throw new Error(`Unsicherer AppPlugin-Archivpfad: ${originalName}`);
	}
	const segments = normalizedName.split("/");
	if (segments.some(segment => segment === ".." || segment === "." || segment.length === 0)) {
		throw new Error(`Unsicherer AppPlugin-Archivpfad: ${originalName}`);
	}
	return normalizedName;
}

function unixMode(entry: JSZipObject): number | undefined {
	if (typeof entry.unixPermissions === "number") {
		return entry.unixPermissions;
	}
	if (typeof entry.unixPermissions === "string") {
		const parsed = Number.parseInt(entry.unixPermissions, 8);
		return Number.isNaN(parsed) ? undefined : parsed;
	}
	return undefined;
}

function assertRegularArchiveEntry(entry: JSZipObject): void {
	const mode = unixMode(entry);
	if (mode !== undefined && (mode & 0o170000) === 0o120000) {
		throw new Error(`Symbolischer Link im AppPlugin-Paket: ${entryOriginalName(entry)}`);
	}
}

async function exists(filePath: string): Promise<boolean> {
	try {
		await access(filePath, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}

async function removeTree(filePath: string): Promise<void> {
	await rm(filePath, { force: true, recursive: true });
}

/**
 * Installs a signed main AppPlugin package without interpreting its contents.
 *
 * The APK's `_tmp` -> `_READY` -> active directory lifecycle is retained. The
 * ioBroker host additionally uses a model-specific rollback directory because
 * it may activate multiple models concurrently, while Android uses one global
 * `plugin_v3/tmp` directory during an interactive device launch.
 */
export class ApkMainPluginPackageInstaller {
	readonly #pluginRoot: string;
	readonly #installationStore: ApkMainPluginInstallationStore;
	readonly #installationPersistence?: ApkMainPluginInstallationPersistence;
	readonly #signatureVerifier: ApkPluginPackageSignatureVerifier;
	readonly #limits: ApkPluginPackageInstallerLimits;
	readonly #inFlight = new Set<string>();

	public constructor(options: {
		readonly pluginRoot: string;
		readonly installationStore: ApkMainPluginInstallationStore;
		readonly installationPersistence?: ApkMainPluginInstallationPersistence;
		readonly signatureVerifier?: ApkPluginPackageSignatureVerifier;
		readonly limits?: Partial<ApkPluginPackageInstallerLimits>;
	}) {
		this.#pluginRoot = path.resolve(options.pluginRoot);
		this.#installationStore = options.installationStore;
		this.#installationPersistence = options.installationPersistence;
		this.#signatureVerifier = options.signatureVerifier
			?? new ApkRsaPluginPackageSignatureVerifier();
		this.#limits = normalizedLimits(options.limits);
	}

	public async install(
		request: ApkMainPluginPackageInstallRequest,
	): Promise<ApkMainPluginPackageInstallResult> {
		const model = apkMainPluginPackageKey(request.model);
		if (this.#inFlight.has(model)) {
			throw new Error(`Für ${model} läuft bereits eine AppPlugin-Installation`);
		}
		this.#inFlight.add(model);
		this.#installationStore.stage(
			model,
			request.downloadVersion,
			request.pluginLevel,
		);
		const paths = this.#paths(model);
		let readyCreated = false;
		try {
			const signedArchive = await this.#readBoundedArchive(request.archivePath);
			if (!this.#signatureVerifier.verifyAppendedArchive(signedArchive)) {
				throw new Error("Die RSA-Signatur des AppPlugin-Pakets ist ungültig");
			}
			const archivePayload = this.#archivePayload(signedArchive);
			await mkdir(this.#pluginRoot, { recursive: true });
			await removeTree(paths.staging);
			await removeTree(paths.ready);
			await this.#extract(archivePayload, paths.staging);
			await this.#assertBundle(paths.staging);
			await rename(paths.staging, paths.ready);
			readyCreated = true;
			return await this.#activate(model, paths);
		} catch (error) {
			this.#installationStore.abort(model);
			await removeTree(paths.staging);
			if (readyCreated) {
				await removeTree(paths.ready);
			}
			throw error;
		} finally {
			this.#inFlight.delete(model);
		}
	}

	public async verifyDetachedBundle(
		bundlePath: string,
		signaturePath = `${bundlePath}.sign`,
	): Promise<boolean> {
		try {
			const [payload, signature] = await Promise.all([
				this.#readBoundedFile(
					bundlePath,
					this.#limits.maxEntryBytes,
					"Das AppPlugin-Bundle",
				),
				this.#readBoundedFile(
					signaturePath,
					APK_RSA_SIGNATURE_BYTES,
					"Die AppPlugin-Bundle-Signatur",
				),
			]);
			return this.#signatureVerifier.verifyDetachedFile(payload, signature);
		} catch {
			return false;
		}
	}

	async #activate(
		model: string,
		paths: PackagePaths,
	): Promise<ApkMainPluginPackageInstallResult> {
		await this.#recoverRollback(paths);
		await removeTree(paths.rollback);
		const hadActivePackage = await exists(paths.active);
		if (hadActivePackage) {
			await rename(paths.active, paths.rollback);
		}
		let promoted = false;
		let installation: ApkMainPluginInstallation;
		try {
			await rename(paths.ready, paths.active);
			promoted = true;
			installation = this.#installationPersistence
				? await this.#installationStore.commitPersisted(
					model,
					this.#installationPersistence,
				)
				: this.#installationStore.commit(model);
		} catch (error) {
			if (promoted) {
				await removeTree(paths.active);
			}
			if (hadActivePackage && await exists(paths.rollback)) {
				await rename(paths.rollback, paths.active);
			}
			throw error;
		}
		// Cleanup is deliberately outside the rollback block: after the package
		// and metadata commit succeeded, a stale backup is harmless and must not
		// invalidate the now-consistent active installation.
		await removeTree(paths.rollback).catch(() => undefined);
		return {
			model,
			activeDirectory: paths.active,
			bundlePath: path.join(paths.active, "index.android.bundle"),
			installation,
		};
	}

	async #assertBundle(directory: string): Promise<void> {
		const bundlePath = path.join(directory, "index.android.bundle");
		const bundleStats = await stat(bundlePath).catch(() => undefined);
		if (!bundleStats?.isFile()) {
			throw new Error("Das signierte AppPlugin-Paket enthält kein index.android.bundle");
		}
	}

	#archivePayload(signedArchive: Buffer): Buffer {
		return this.#signatureVerifier.archivePayload(signedArchive);
	}

	async #extract(archivePayload: Buffer, destination: string): Promise<void> {
		const archive = await JSZip.loadAsync(archivePayload, {
			checkCRC32: true,
			createFolders: true,
		});
		const entries = Object.values(archive.files);
		if (entries.length > this.#limits.maxEntries) {
			throw new Error("Das AppPlugin-Paket enthält zu viele Dateien");
		}
		let extractedBytes = 0;
		for (const entry of entries) {
			assertRegularArchiveEntry(entry);
			const entryName = safeArchiveEntryName(entry);
			const target = path.resolve(destination, ...entryName.split("/"));
			const relative = path.relative(destination, target);
			if (relative.startsWith("..") || path.isAbsolute(relative)) {
				throw new Error(`AppPlugin-Archivpfad verlässt das Ziel: ${entryName}`);
			}
			if (entry.dir) {
				await mkdir(target, { recursive: true });
				continue;
			}
			await mkdir(path.dirname(target), { recursive: true });
			let entryBytes = 0;
			const limiter = new Transform({
				transform: (chunk: Buffer, _encoding: BufferEncoding, callback: TransformCallback) => {
					entryBytes += chunk.length;
					extractedBytes += chunk.length;
					if (entryBytes > this.#limits.maxEntryBytes) {
						callback(new Error(
							`AppPlugin-Datei überschreitet das Größenlimit: ${entryName}`,
						));
						return;
					}
					if (extractedBytes > this.#limits.maxExtractedBytes) {
						callback(new Error(
							"Das entpackte AppPlugin-Paket überschreitet das Größenlimit",
						));
						return;
					}
					callback(null, chunk);
				},
			});
			await pipeline(
				entry.nodeStream("nodebuffer"),
				limiter,
				createWriteStream(target, {
					flags: "wx",
					mode: 0o600,
				}),
			);
		}
	}

	#paths(model: string): PackagePaths {
		return {
			active: path.join(this.#pluginRoot, model),
			staging: path.join(this.#pluginRoot, `${model}_tmp`),
			ready: path.join(this.#pluginRoot, `${model}_READY`),
			rollback: path.join(this.#pluginRoot, `.rollback-${model}`),
		};
	}

	async #readBoundedArchive(archivePath: string): Promise<Buffer> {
		return this.#readBoundedFile(
			archivePath,
			this.#limits.maxArchiveBytes,
			"Das AppPlugin-Paket",
		);
	}

	async #readBoundedFile(
		filePath: string,
		maxBytes: number,
		label: string,
	): Promise<Buffer> {
		const fileStats = await stat(filePath);
		if (!fileStats.isFile()) {
			throw new Error(`${label} ist keine Datei`);
		}
		if (fileStats.size > maxBytes) {
			throw new Error(`${label} überschreitet das Größenlimit`);
		}
		return readFile(filePath);
	}

	async #recoverRollback(paths: PackagePaths): Promise<void> {
		const [activeExists, rollbackExists] = await Promise.all([
			exists(paths.active),
			exists(paths.rollback),
		]);
		if (!activeExists && rollbackExists) {
			await rename(paths.rollback, paths.active);
		}
	}
}
