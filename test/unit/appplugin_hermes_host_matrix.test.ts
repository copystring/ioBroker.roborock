import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import * as path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import artifactContract from "../../src/apppluginHost/generated/hermes-host-artifact-contract.json";

interface VerifiedArtifact {
	readonly target: string;
}

const { validatePackageResult, verifyMatrix } = require("../../scripts/verify_hermes_host_matrix.js") as {
	validatePackageResult(result: unknown): readonly string[];
	verifyMatrix(nativeRoot: string, executeCurrent?: boolean): readonly VerifiedArtifact[];
};
const { parseArgs: parseBuildArgs } = require("../../scripts/build_hermes_appplugin_host.js") as {
	parseArgs(args: readonly string[]): Readonly<Record<string, unknown>>;
};

const temporaryDirectories: string[] = [];

afterEach(() => {
	for (const directory of temporaryDirectories.splice(0)) {
		rmSync(directory, { force: true, recursive: true });
	}
});

function sha256(bytes: Buffer): string {
	return createHash("sha256").update(bytes).digest("hex");
}

function executableName(target: string): string {
	return target.startsWith("win32-")
		? "roborock-hermes-appplugin-host.exe"
		: "roborock-hermes-appplugin-host";
}

function matrixFixture(): { nativeRoot: string; targetDirectories: Readonly<Record<string, string>> } {
	const nativeRoot = mkdtempSync(path.join(tmpdir(), "roborock-hermes-matrix-"));
	temporaryDirectories.push(nativeRoot);
	const targetDirectories: Record<string, string> = {};
	for (const target of artifactContract.supportedTargets) {
		const targetDirectory = path.join(nativeRoot, target);
		targetDirectories[target] = targetDirectory;
		mkdirSync(targetDirectory);
		const executable = executableName(target);
		const executableBytes = Buffer.from(`verified host fixture for ${target}`, "utf8");
		writeFileSync(path.join(targetDirectory, executable), executableBytes);
		writeFileSync(path.join(targetDirectory, "artifact.json"), `${JSON.stringify({
			schemaVersion: artifactContract.schemaVersion,
			target,
			executable,
			sha256: sha256(executableBytes),
			size: executableBytes.length,
			hermesCommit: artifactContract.hermesCommit,
			hbcVersion: artifactContract.hbcVersion,
			protocolVersion: artifactContract.protocolVersion,
			build: {
				target,
				sourceRepository: "https://github.com/facebook/hermes.git",
				sourceRef: "v0.13.0",
				sourceCommit: artifactContract.hermesCommit,
				sourceClean: true,
				cmake: `cmake version ${artifactContract.build.cmakeVersion}`,
				compiler: target.startsWith("win32-")
					? `clang version ${artifactContract.build.windows.clangVersion}`
					: "fixture compiler 1.0",
				toolchainRelease: target.startsWith("win32-")
					? artifactContract.build.windows.llvmMingwRelease
					: undefined,
				generator: "fixture generator",
				configuration: "Release",
				jobs: 1,
				dependencies: {
					tool: target.startsWith("win32-") ? "llvm-readobj --coff-imports" : "fixture dependency reader",
					entries: target.startsWith("win32-") ? ["KERNEL32.dll"] : ["system-runtime"],
				},
				smoke: {
					bundleSha256: "a".repeat(64),
					bytecodeAccepted: true,
					bootstrapCompleted: true,
					evaluationCompleted: true,
					smokeMarker: `hbc-${artifactContract.hbcVersion}`,
				},
			},
		}, null, 2)}\n`, "utf8");
	}
	return { nativeRoot, targetDirectories };
}

function replaceManifest(targetDirectory: string, mutate: (manifest: Record<string, any>) => void): void {
	const manifestPath = path.join(targetDirectory, "artifact.json");
	const manifest = require(manifestPath) as Record<string, any>;
	mutate(manifest);
	writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

describe("Hermes host build matrix verifier", () => {
	it("does not allow an untested binary to enter a staging directory", () => {
		expect(() => parseBuildArgs(["--stage-dir", path.join(tmpdir(), "unsafe-stage")]))
			.toThrow(/requires --smoke/u);
		expect(() => parseBuildArgs(["--jobs", "0"])).toThrow(/integer between 1 and 64/u);
	});

	it("accepts only a complete, smoke-tested six-target matrix", () => {
		const fixture = matrixFixture();
		const artifacts = verifyMatrix(fixture.nativeRoot);

		expect(artifacts.map(({ target }) => target)).toEqual(artifactContract.supportedTargets);
	});

	it("rejects an incomplete matrix", () => {
		const fixture = matrixFixture();
		rmSync(fixture.targetDirectories["darwin-arm64"], { recursive: true });

		expect(() => verifyMatrix(fixture.nativeRoot)).toThrow(/matrix.*entries differ/u);
	});

	it("rejects unexpected files instead of silently packaging them", () => {
		const fixture = matrixFixture();
		writeFileSync(path.join(fixture.targetDirectories["linux-x64"], "untracked-library.so"), "unexpected");

		expect(() => verifyMatrix(fixture.nativeRoot)).toThrow(/linux-x64 artifact entries differ/u);
	});

	it("rejects a host whose bytes differ from its manifest", () => {
		const fixture = matrixFixture();
		writeFileSync(
			path.join(fixture.targetDirectories["win32-arm64"], executableName("win32-arm64")),
			"modified host bytes with a different size",
		);

		expect(() => verifyMatrix(fixture.nativeRoot)).toThrow(/win32-arm64 executable size differs/u);
	});

	it("rejects compile-only artifacts without a successful HBC smoke test", () => {
		const fixture = matrixFixture();
		replaceManifest(fixture.targetDirectories["darwin-x64"], (manifest) => {
			manifest.build.smoke.evaluationCompleted = false;
		});

		expect(() => verifyMatrix(fixture.nativeRoot)).toThrow(/evaluationCompleted must be true/u);
	});

	it("rejects an accidentally dynamic Hermes or Windows compiler runtime", () => {
		const fixture = matrixFixture();
		replaceManifest(fixture.targetDirectories["win32-x64"], (manifest) => {
			manifest.build.dependencies.entries.push("libc++.dll");
		});

		expect(() => verifyMatrix(fixture.nativeRoot)).toThrow(/forbidden dynamic dependencies.*libc\+\+\.dll/u);
	});

	it("requires exactly both packaged files for every supported target", () => {
		const files = artifactContract.supportedTargets.flatMap((target) => [
			{ path: `src/apppluginHost/native/${target}/artifact.json` },
			{ path: `src/apppluginHost/native/${target}/${executableName(target)}` },
		]);

		expect(validatePackageResult([{ files }])).toHaveLength(12);
		files.pop();
		expect(() => validatePackageResult([{ files }])).toThrow(/npm package Hermes host entries differ/u);
	});
});
