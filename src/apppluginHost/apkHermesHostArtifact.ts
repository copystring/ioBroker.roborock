import { createHash } from "node:crypto";
import {
	accessSync,
	constants as fsConstants,
	fstatSync,
	lstatSync,
	openSync,
	readFileSync,
	readSync,
	realpathSync,
	closeSync,
} from "node:fs";
import * as path from "node:path";

import artifactContractJson from "./generated/hermes-host-artifact-contract.json";

interface ApkHermesHostArtifactContract {
	readonly schemaVersion: number;
	readonly hermesCommit: string;
	readonly hbcVersion: number;
	readonly protocolVersion: number;
	readonly build: {
		readonly cmakeVersion: string;
		readonly windows: {
			readonly llvmMingwRelease: string;
			readonly clangVersion: string;
		};
	};
	readonly supportedTargets: readonly string[];
}

const artifactContract = artifactContractJson as Readonly<ApkHermesHostArtifactContract>;

export const APK_HERMES_HOST_ARTIFACT_SCHEMA_VERSION = artifactContract.schemaVersion;
export const APK_HERMES_HOST_COMMIT = artifactContract.hermesCommit;
export const APK_HERMES_HOST_HBC_VERSION = artifactContract.hbcVersion;
export const APK_HERMES_HOST_PROTOCOL_VERSION = artifactContract.protocolVersion;

const MAX_MANIFEST_BYTES = 64 * 1024;
const MAX_HOST_BYTES = 256 * 1024 * 1024;
const SHA256_PATTERN = /^[a-f0-9]{64}$/u;

export type ApkHermesHostPlatform = "win32" | "linux" | "darwin";
export type ApkHermesHostArchitecture = "x64" | "arm64";
export type ApkHermesHostTarget = `${ApkHermesHostPlatform}-${ApkHermesHostArchitecture}`;

export interface ApkHermesHostArtifactManifest {
	readonly schemaVersion: number;
	readonly target: ApkHermesHostTarget;
	readonly executable: string;
	readonly sha256: string;
	readonly size: number;
	readonly hermesCommit: string;
	readonly hbcVersion: number;
	readonly protocolVersion: number;
}

export interface ApkHermesHostArtifact extends ApkHermesHostArtifactManifest {
	readonly executablePath: string;
	readonly manifestPath: string;
}

export interface ResolveApkHermesHostArtifactOptions {
	readonly architecture?: NodeJS.Architecture;
	readonly nativeRootPath?: string;
	readonly platform?: NodeJS.Platform;
}

function objectValue(value: unknown, label: string): Record<string, unknown> {
	if (typeof value !== "object" || value === null || Array.isArray(value)) {
		throw new Error(`${label} muss ein JSON-Objekt sein`);
	}
	return value as Record<string, unknown>;
}

function targetFor(platform: NodeJS.Platform, architecture: NodeJS.Architecture): ApkHermesHostTarget {
	if (
		(platform !== "win32" && platform !== "linux" && platform !== "darwin")
		|| (architecture !== "x64" && architecture !== "arm64")
	) {
		throw new Error(`Für ${platform}-${architecture} wird kein Hermes-AppPlugin-Host ausgeliefert`);
	}
	const target = `${platform}-${architecture}` as ApkHermesHostTarget;
	if (!artifactContract.supportedTargets.includes(target)) {
		throw new Error(`Für ${target} wird kein Hermes-AppPlugin-Host ausgeliefert`);
	}
	return target;
}

function executableName(platform: ApkHermesHostPlatform): string {
	return platform === "win32"
		? "roborock-hermes-appplugin-host.exe"
		: "roborock-hermes-appplugin-host";
}

function parseManifest(
	manifestPath: string,
	target: ApkHermesHostTarget,
	expectedExecutable: string,
): ApkHermesHostArtifactManifest {
	const manifestStats = lstatSync(manifestPath);
	if (!manifestStats.isFile() || manifestStats.isSymbolicLink()) {
		throw new Error(`Hermes-Hostmanifest ist keine reguläre Datei: ${manifestPath}`);
	}
	if (manifestStats.size < 2 || manifestStats.size > MAX_MANIFEST_BYTES) {
		throw new Error(`Hermes-Hostmanifest besitzt eine ungültige Größe: ${manifestStats.size} Bytes`);
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(readFileSync(manifestPath, "utf8")) as unknown;
	} catch (error) {
		throw new Error(`Hermes-Hostmanifest ist kein gültiges JSON: ${manifestPath}`, { cause: error });
	}
	const value = objectValue(parsed, "Hermes-Hostmanifest");
	if (value.schemaVersion !== APK_HERMES_HOST_ARTIFACT_SCHEMA_VERSION) {
		throw new Error(`Unbekannte Hermes-Hostmanifestschema-Version: ${String(value.schemaVersion)}`);
	}
	if (value.target !== target) {
		throw new Error(`Hermes-Hostmanifest gilt für ${String(value.target)} statt ${target}`);
	}
	if (value.executable !== expectedExecutable) {
		throw new Error(`Hermes-Hostmanifest nennt eine unerwartete Programmdatei: ${String(value.executable)}`);
	}
	if (typeof value.sha256 !== "string" || !SHA256_PATTERN.test(value.sha256)) {
		throw new Error("Hermes-Hostmanifest enthält keinen gültigen SHA-256-Wert");
	}
	if (!Number.isSafeInteger(value.size) || (value.size as number) < 1 || (value.size as number) > MAX_HOST_BYTES) {
		throw new Error(`Hermes-Hostmanifest enthält eine ungültige Dateigröße: ${String(value.size)}`);
	}
	if (value.hermesCommit !== APK_HERMES_HOST_COMMIT) {
		throw new Error(`Hermes-Host wurde nicht aus dem festgelegten Hermes-Commit gebaut: ${String(value.hermesCommit)}`);
	}
	if (value.hbcVersion !== APK_HERMES_HOST_HBC_VERSION) {
		throw new Error(`Hermes-Host unterstützt nicht die erwartete HBC-Version ${APK_HERMES_HOST_HBC_VERSION}`);
	}
	if (value.protocolVersion !== APK_HERMES_HOST_PROTOCOL_VERSION) {
		throw new Error(`Hermes-Host verwendet nicht die erwartete Protokollversion ${APK_HERMES_HOST_PROTOCOL_VERSION}`);
	}
	return Object.freeze({
		schemaVersion: APK_HERMES_HOST_ARTIFACT_SCHEMA_VERSION,
		target,
		executable: expectedExecutable,
		sha256: value.sha256,
		size: value.size as number,
		hermesCommit: APK_HERMES_HOST_COMMIT,
		hbcVersion: APK_HERMES_HOST_HBC_VERSION,
		protocolVersion: APK_HERMES_HOST_PROTOCOL_VERSION,
	});
}

function isContainedPath(rootPath: string, candidatePath: string): boolean {
	const relative = path.relative(rootPath, candidatePath);
	return relative.length > 0 && !path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`);
}

function sha256RegularFile(filePath: string, expectedSize: number): string {
	const descriptor = openSync(filePath, "r");
	try {
		const pathBefore = lstatSync(filePath);
		const before = fstatSync(descriptor);
		if (!pathBefore.isFile() || pathBefore.isSymbolicLink() || !before.isFile()) {
			throw new Error(`Hermes-Host ist keine reguläre Datei: ${filePath}`);
		}
		if (pathBefore.dev !== before.dev || pathBefore.ino !== before.ino) {
			throw new Error("Hermes-Host wurde vor der Integritätsprüfung ausgetauscht");
		}
		if (before.size !== expectedSize) {
			throw new Error(`Hermes-Hostgröße ${before.size} stimmt nicht mit dem Manifest ${expectedSize} überein`);
		}
		const hash = createHash("sha256");
		const buffer = Buffer.allocUnsafe(64 * 1024);
		let position = 0;
		for (;;) {
			const bytesRead = readSync(descriptor, buffer, 0, buffer.length, position);
			if (bytesRead === 0) break;
			hash.update(buffer.subarray(0, bytesRead));
			position += bytesRead;
			if (position > expectedSize) {
				throw new Error("Hermes-Host wurde während der Integritätsprüfung vergrößert");
			}
		}
		const descriptorAfter = fstatSync(descriptor);
		const pathAfter = lstatSync(filePath);
		if (
			descriptorAfter.dev !== before.dev
			|| descriptorAfter.ino !== before.ino
			|| descriptorAfter.size !== before.size
			|| descriptorAfter.mtimeMs !== before.mtimeMs
			|| pathAfter.dev !== before.dev
			|| pathAfter.ino !== before.ino
			|| pathAfter.size !== before.size
			|| pathAfter.mtimeMs !== before.mtimeMs
			|| position !== expectedSize
		) {
			throw new Error("Hermes-Host wurde während der Integritätsprüfung verändert");
		}
		return hash.digest("hex");
	} finally {
		closeSync(descriptor);
	}
}

/**
 * Resolves only a packaged, version-pinned host for the current Node platform.
 * AppPlugin model, device and command semantics deliberately do not participate
 * in artifact selection.
 */
export function resolveApkHermesHostArtifact(
	options: Readonly<ResolveApkHermesHostArtifactOptions> = {},
): Readonly<ApkHermesHostArtifact> {
	const platform = options.platform ?? process.platform;
	const architecture = options.architecture ?? process.arch;
	const target = targetFor(platform, architecture);
	const nativeRootPath = path.resolve(options.nativeRootPath ?? path.join(__dirname, "native"));
	const targetDirectory = path.join(nativeRootPath, target);
	const expectedExecutable = executableName(platform as ApkHermesHostPlatform);
	const manifestPath = path.join(targetDirectory, "artifact.json");
	const manifest = parseManifest(manifestPath, target, expectedExecutable);
	const executablePath = path.join(targetDirectory, expectedExecutable);
	const realRootPath = realpathSync.native(nativeRootPath);
	const realExecutablePath = realpathSync.native(executablePath);
	if (!isContainedPath(realRootPath, realExecutablePath)) {
		throw new Error(`Hermes-Host liegt außerhalb des ausgelieferten Native-Verzeichnisses: ${realExecutablePath}`);
	}
	accessSync(realExecutablePath, fsConstants.R_OK);
	if (platform !== "win32") accessSync(realExecutablePath, fsConstants.X_OK);
	const actualSha256 = sha256RegularFile(realExecutablePath, manifest.size);
	if (actualSha256 !== manifest.sha256) {
		throw new Error(`Hermes-Hostintegrität stimmt nicht mit dem Manifest überein: ${target}`);
	}
	return Object.freeze({
		...manifest,
		executablePath: realExecutablePath,
		manifestPath: realpathSync.native(manifestPath),
	});
}
