import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import JSZip from "jszip";

import {
	parseApkAppPluginProjectMetadata,
	type ApkAppPluginPackageMetadata,
} from "../../src/apppluginHost/apkAppPluginSessionDescriptor";
import { parseAppPluginDesktopProfile } from "./appPluginDesktopProfiles";

const HERMES_MAGIC = Buffer.from([0xc6, 0x1f, 0xbc, 0x03]);
const ARCHIVE_MARKER = ".appplugin-archive.json";

export type AppPluginDesktopBundleKind = "hermes-bytecode" | "javascript-source";
export type AppPluginDesktopRuntimeMode = "fixture-replay" | "bundle-audit";
export type AppPluginDesktopModelSource =
	| "home-data-fixture"
	| "apk-home-data"
	| "appplugin-project"
	| "audit-placeholder";

export interface AppPluginDesktopCatalogEntry {
	id: string;
	label: string;
	aliases: string[];
	bundleKind: AppPluginDesktopBundleKind;
	bundleSha256: string;
	runtimeMode: AppPluginDesktopRuntimeMode;
	modelSource: AppPluginDesktopModelSource;
	availability: "available" | "failed";
	failure?: string;
	warning?: string;
}

export interface DiscoveredAppPluginDesktopBundle {
	aliases: string[];
	pluginRoot: string;
	bundleKind: AppPluginDesktopBundleKind;
	bundleSha256: string;
	packageMetadata?: ApkAppPluginPackageMetadata;
	sourceKind: "extracted" | "archive-cache";
}

export interface AppPluginDesktopBundleDiscoveryOptions {
	repositoryRoot: string;
	appPluginRoot?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function catalogString(value: unknown, name: string): string {
	if (typeof value !== "string" || value.trim().length === 0) {
		throw new Error(`${name} darf nicht leer sein`);
	}
	return value;
}

export function parseAppPluginDesktopCatalog(value: unknown): AppPluginDesktopCatalogEntry[] {
	if (!isRecord(value) || value.version !== 1 || !Array.isArray(value.entries)) {
		throw new Error("AppPlugin-Katalog benötigt version 1 und entries");
	}
	const ids = new Set<string>();
	return value.entries.map((rawEntry, index) => {
		if (!isRecord(rawEntry)) throw new Error(`entries[${index}] muss ein Objekt sein`);
		const id = parseAppPluginDesktopProfile(rawEntry.id);
		if (!id || ids.has(id)) throw new Error(`entries[${index}].id ist ungültig oder doppelt`);
		ids.add(id);
		if (!Array.isArray(rawEntry.aliases) || rawEntry.aliases.length === 0) {
			throw new Error(`entries[${index}].aliases muss mindestens einen Namen enthalten`);
		}
		const bundleKind = rawEntry.bundleKind;
		if (bundleKind !== "hermes-bytecode" && bundleKind !== "javascript-source") {
			throw new Error(`entries[${index}].bundleKind ist unbekannt`);
		}
		const runtimeMode = rawEntry.runtimeMode;
		if (runtimeMode !== "fixture-replay" && runtimeMode !== "bundle-audit") {
			throw new Error(`entries[${index}].runtimeMode ist unbekannt`);
		}
		const modelSource = rawEntry.modelSource;
		if (modelSource !== "home-data-fixture"
			&& modelSource !== "apk-home-data"
			&& modelSource !== "appplugin-project"
			&& modelSource !== "audit-placeholder") {
			throw new Error(`entries[${index}].modelSource ist unbekannt`);
		}
		const bundleSha256 = catalogString(rawEntry.bundleSha256, `entries[${index}].bundleSha256`);
		if (!/^[a-f0-9]{64}$/u.test(bundleSha256)) {
			throw new Error(`entries[${index}].bundleSha256 ist kein SHA-256`);
		}
		const availability = rawEntry.availability ?? "available";
		if (availability !== "available" && availability !== "failed") {
			throw new Error(`entries[${index}].availability ist unbekannt`);
		}
		return {
			id,
			label: catalogString(rawEntry.label, `entries[${index}].label`),
			aliases: [...new Set(rawEntry.aliases.map((alias, aliasIndex) =>
				catalogString(alias, `entries[${index}].aliases[${aliasIndex}]`),
			))],
			bundleKind,
			bundleSha256,
			runtimeMode,
			modelSource,
			availability,
			failure: rawEntry.failure === undefined
				? undefined
				: catalogString(rawEntry.failure, `entries[${index}].failure`),
			warning: rawEntry.warning === undefined
				? undefined
				: catalogString(rawEntry.warning, `entries[${index}].warning`),
		};
	});
}

export function readAppPluginDesktopCatalog(filePath: string): AppPluginDesktopCatalogEntry[] {
	return parseAppPluginDesktopCatalog(
		JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown,
	);
}

function sha256(bytes: Buffer): string {
	return createHash("sha256").update(bytes).digest("hex");
}

function defaultAppPluginRoot(): string {
	return process.env.ROBOROCK_APPPLUGIN_ROOT
		?? path.join(os.homedir(), "Desktop", "roborock_reverse_engineering", "App Plugins");
}

function findFiles(root: string, predicate: (filePath: string) => boolean): string[] {
	if (!fs.existsSync(root)) return [];
	const pending = [root];
	const matches: string[] = [];
	while (pending.length > 0) {
		const current = pending.pop()!;
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const entryPath = path.join(current, entry.name);
			if (entry.isDirectory()) pending.push(entryPath);
			else if (entry.isFile() && predicate(entryPath)) matches.push(entryPath);
		}
	}
	return matches.sort((left, right) => left.localeCompare(right));
}

function detectBundleKind(bytes: Buffer, bundlePath: string): AppPluginDesktopBundleKind {
	if (bytes.subarray(0, HERMES_MAGIC.length).equals(HERMES_MAGIC)) return "hermes-bytecode";
	if (/^\s*(?:var|global|__d\()/u.test(bytes.subarray(0, 256).toString("utf8"))) {
		return "javascript-source";
	}
	throw new Error(`Unbekanntes AppPlugin-Bundleformat: ${bundlePath}`);
}

function safeArchiveEntryPath(entryName: string): string | undefined {
	const normalized = entryName.replaceAll("\\", "/").replace(/^\.\/+/u, "");
	if (normalized.length === 0 || normalized.endsWith("/")) return undefined;
	if (normalized.startsWith("/") || /^[A-Za-z]:\//u.test(normalized)) {
		throw new Error(`AppPlugin-ZIP enthält einen absoluten Pfad: ${entryName}`);
	}
	const segments = normalized.split("/");
	if (segments.some(segment => segment === ".." || segment.length === 0)) {
		throw new Error(`AppPlugin-ZIP enthält einen unsicheren Pfad: ${entryName}`);
	}
	return path.join(...segments);
}

async function extractArchiveToCache(
	archivePath: string,
	cacheRoot: string,
): Promise<string> {
	const archiveBytes = fs.readFileSync(archivePath);
	const archiveSha256 = sha256(archiveBytes);
	const stableRoot = path.join(cacheRoot, archiveSha256);
	const stableMarker = path.join(stableRoot, ARCHIVE_MARKER);
	if (fs.existsSync(stableMarker)) return stableRoot;

	const extractionRoot = fs.mkdtempSync(path.join(cacheRoot, `${archiveSha256}-`));
	const archive = await JSZip.loadAsync(archiveBytes);
	for (const entry of Object.values(archive.files)) {
		const relativePath = safeArchiveEntryPath(entry.name);
		if (!relativePath || entry.dir) continue;
		const targetPath = path.join(extractionRoot, relativePath);
		fs.mkdirSync(path.dirname(targetPath), { recursive: true });
		fs.writeFileSync(targetPath, await entry.async("nodebuffer"));
	}
	fs.writeFileSync(
		path.join(extractionRoot, ARCHIVE_MARKER),
		`${JSON.stringify({ version: 1, archiveSha256, archiveName: path.basename(archivePath) }, null, 2)}\n`,
		"utf8",
	);
	if (!fs.existsSync(stableRoot)) {
		fs.renameSync(extractionRoot, stableRoot);
		return stableRoot;
	}
	return extractionRoot;
}

function readProjectMetadata(pluginRoot: string): ApkAppPluginPackageMetadata | undefined {
	const candidates = findFiles(
		pluginRoot,
		filePath => /(?:^|[\\/])(?:[^\\/]*_)?project\.json$/iu.test(filePath),
	);
	for (const candidate of candidates) {
		try {
			return parseApkAppPluginProjectMetadata(
				JSON.parse(fs.readFileSync(candidate, "utf8")) as unknown,
			);
		} catch {
			// Other project.json files are possible assets; only the APK package
			// contract with a valid models field is authoritative here.
		}
	}
	return undefined;
}

async function bundleRootsForPackage(packageRoot: string, cacheRoot: string): Promise<Array<{
	pluginRoot: string;
	sourceKind: "extracted" | "archive-cache";
}>> {
	const extracted = findFiles(packageRoot, filePath => path.basename(filePath) === "index.android.bundle")
		.map(bundlePath => ({ pluginRoot: path.dirname(bundlePath), sourceKind: "extracted" as const }));
	if (extracted.length > 0) return extracted;

	const archives = findFiles(packageRoot, filePath => path.extname(filePath).toLowerCase() === ".zip");
	const roots = [];
	for (const archivePath of archives) {
		const extractedRoot = await extractArchiveToCache(archivePath, cacheRoot);
		for (const bundlePath of findFiles(
			extractedRoot,
			filePath => path.basename(filePath) === "index.android.bundle",
		)) {
			roots.push({ pluginRoot: path.dirname(bundlePath), sourceKind: "archive-cache" as const });
		}
	}
	return roots;
}

/**
 * Mirrors the APK package boundary: ZIP packages are unpacked as a whole, but
 * index.android.bundle itself is never rewritten or decompiled. Equal bundle
 * hashes are one runtime with multiple product aliases.
 */
export async function discoverAppPluginDesktopBundles(
	options: AppPluginDesktopBundleDiscoveryOptions,
): Promise<DiscoveredAppPluginDesktopBundle[]> {
	const appPluginRoot = path.resolve(options.appPluginRoot ?? defaultAppPluginRoot());
	if (!fs.existsSync(appPluginRoot)) return [];
	const cacheRoot = path.join(
		options.repositoryRoot,
		"artifacts",
		"appplugin-poc",
		"plugin-cache",
	);
	fs.mkdirSync(cacheRoot, { recursive: true });
	const byHash = new Map<string, DiscoveredAppPluginDesktopBundle>();
	const packageDirectories = fs.readdirSync(appPluginRoot, { withFileTypes: true })
		.filter(entry => entry.isDirectory())
		.sort((left, right) => left.name.localeCompare(right.name));

	for (const packageDirectory of packageDirectories) {
		const packageRoot = path.join(appPluginRoot, packageDirectory.name);
		for (const source of await bundleRootsForPackage(packageRoot, cacheRoot)) {
			const bundlePath = path.join(source.pluginRoot, "index.android.bundle");
			const bytes = fs.readFileSync(bundlePath);
			const bundleSha256 = sha256(bytes);
			const existing = byHash.get(bundleSha256);
			if (existing) {
				if (!existing.aliases.includes(packageDirectory.name)) {
					existing.aliases.push(packageDirectory.name);
					existing.aliases.sort((left, right) => left.localeCompare(right));
				}
				continue;
			}
			byHash.set(bundleSha256, {
				aliases: [packageDirectory.name],
				pluginRoot: source.pluginRoot,
				bundleKind: detectBundleKind(bytes, bundlePath),
				bundleSha256,
				packageMetadata: readProjectMetadata(source.pluginRoot),
				sourceKind: source.sourceKind,
			});
		}
	}
	return [...byHash.values()].sort((left, right) =>
		left.aliases[0].localeCompare(right.aliases[0]));
}

export function appPluginDesktopCatalogId(bundleSha256: string): string {
	const id = parseAppPluginDesktopProfile(`plugin-${bundleSha256.slice(0, 16)}`);
	if (!id) throw new Error("Bundle-Hash konnte nicht in eine sichere Katalog-ID umgewandelt werden");
	return id;
}

/**
 * project.json can name an internal package family while HomeData supplies the
 * concrete device model used by the APK session. Both are valid aliases; the
 * package metadata must not be treated as an exclusive compatibility list.
 */
export function withAppPluginDeviceModel(
	packageMetadata: ApkAppPluginPackageMetadata | undefined,
	deviceModel: string,
): ApkAppPluginPackageMetadata {
	return packageMetadata
		? {
			...packageMetadata,
			models: [...new Set([...packageMetadata.models, deviceModel])],
		}
		: { models: [deviceModel] };
}
