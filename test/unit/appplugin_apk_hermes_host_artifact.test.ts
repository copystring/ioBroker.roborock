import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
	APK_HERMES_HOST_ARTIFACT_SCHEMA_VERSION,
	APK_HERMES_HOST_COMMIT,
	APK_HERMES_HOST_HBC_VERSION,
	APK_HERMES_HOST_PROTOCOL_VERSION,
	resolveApkHermesHostArtifact,
	type ApkHermesHostArchitecture,
	type ApkHermesHostPlatform,
	type ApkHermesHostTarget,
} from "../../src/apppluginHost";

const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { force: true, recursive: true });
	}
});

function sha256(bytes: Buffer): string {
	return createHash("sha256").update(bytes).digest("hex");
}

function artifactFixture(
	platform: ApkHermesHostPlatform,
	architecture: ApkHermesHostArchitecture,
	overrides: Readonly<Record<string, unknown>> = {},
): { nativeRootPath: string; executablePath: string; manifestPath: string; target: ApkHermesHostTarget } {
	const nativeRootPath = mkdtempSync(path.join(tmpdir(), "roborock-hermes-artifact-"));
	temporaryDirectories.push(nativeRootPath);
	const target = `${platform}-${architecture}` as ApkHermesHostTarget;
	const targetDirectory = path.join(nativeRootPath, target);
	mkdirSync(targetDirectory);
	const executable = platform === "win32"
		? "roborock-hermes-appplugin-host.exe"
		: "roborock-hermes-appplugin-host";
	const executablePath = path.join(targetDirectory, executable);
	const bytes = Buffer.from(`host fixture for ${target}`, "utf8");
	writeFileSync(executablePath, bytes);
	chmodSync(executablePath, 0o755);
	const manifestPath = path.join(targetDirectory, "artifact.json");
	writeFileSync(manifestPath, `${JSON.stringify({
		schemaVersion: APK_HERMES_HOST_ARTIFACT_SCHEMA_VERSION,
		target,
		executable,
		sha256: sha256(bytes),
		size: bytes.length,
		hermesCommit: APK_HERMES_HOST_COMMIT,
		hbcVersion: APK_HERMES_HOST_HBC_VERSION,
		protocolVersion: APK_HERMES_HOST_PROTOCOL_VERSION,
		...overrides,
	})}\n`, "utf8");
	return { nativeRootPath, executablePath, manifestPath, target };
}

describe("APK Hermes host artifact resolver", () => {
	it.each([
		["win32", "x64"],
		["win32", "arm64"],
		["linux", "x64"],
		["linux", "arm64"],
		["darwin", "x64"],
		["darwin", "arm64"],
	] as const)("resolves and verifies the packaged %s-%s host", (platform, architecture) => {
		const fixture = artifactFixture(platform, architecture);
		const artifact = resolveApkHermesHostArtifact({
			architecture,
			nativeRootPath: fixture.nativeRootPath,
			platform,
		});

		expect(artifact).toMatchObject({
			target: fixture.target,
			executablePath: path.resolve(fixture.executablePath),
			manifestPath: path.resolve(fixture.manifestPath),
		});
		expect(Object.isFrozen(artifact)).toBe(true);
	});

	it("rejects platforms and architectures with no packaged target", () => {
		expect(() => resolveApkHermesHostArtifact({ platform: "linux", architecture: "arm" }))
			.toThrow(/linux-arm.*kein Hermes-AppPlugin-Host/u);
		expect(() => resolveApkHermesHostArtifact({ platform: "freebsd", architecture: "x64" }))
			.toThrow(/freebsd-x64.*kein Hermes-AppPlugin-Host/u);
	});

	it("fails closed when the binary changed after staging", () => {
		const fixture = artifactFixture("win32", "x64");
		writeFileSync(fixture.executablePath, "modified binary with different bytes", "utf8");

		expect(() => resolveApkHermesHostArtifact({
			architecture: "x64",
			nativeRootPath: fixture.nativeRootPath,
			platform: "win32",
		})).toThrow(/größe|integrität/u);
	});

	it("rejects a host built from a different Hermes revision", () => {
		const fixture = artifactFixture("linux", "arm64", { hermesCommit: "0".repeat(40) });

		expect(() => resolveApkHermesHostArtifact({
			architecture: "arm64",
			nativeRootPath: fixture.nativeRootPath,
			platform: "linux",
		})).toThrow(/nicht aus dem festgelegten Hermes-Commit/u);
	});

	it("does not accept an executable path supplied by the manifest", () => {
		const fixture = artifactFixture("darwin", "arm64", { executable: "../../outside" });

		expect(() => resolveApkHermesHostArtifact({
			architecture: "arm64",
			nativeRootPath: fixture.nativeRootPath,
			platform: "darwin",
		})).toThrow(/unerwartete Programmdatei/u);
	});

	it("requires the manifest instead of trusting an executable by name", () => {
		const fixture = artifactFixture("win32", "x64");
		rmSync(fixture.manifestPath);

		expect(() => resolveApkHermesHostArtifact({
			architecture: "x64",
			nativeRootPath: fixture.nativeRootPath,
			platform: "win32",
		})).toThrow();
	});

});
