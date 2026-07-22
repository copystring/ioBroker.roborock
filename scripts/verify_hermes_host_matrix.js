#!/usr/bin/env node

const childProcess = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const repositoryRoot = path.resolve(__dirname, "..");
const contractPath = path.join(
	repositoryRoot,
	"src",
	"apppluginHost",
	"generated",
	"hermes-host-artifact-contract.json",
);
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const HERMES_REPOSITORY = "https://github.com/facebook/hermes.git";
const HERMES_REF = "v0.13.0";
const MAX_MANIFEST_BYTES = 64 * 1024;
const MAX_HOST_BYTES = 256 * 1024 * 1024;
const SHA256_PATTERN = /^[a-f0-9]{64}$/u;

function parseArgs(args) {
	const options = {
		nativeRoot: path.join(repositoryRoot, "src", "apppluginHost", "native"),
	};
	for (let index = 0; index < args.length; index++) {
		if (args[index] === "--native-root" && args[index + 1]) {
			options.nativeRoot = path.resolve(args[++index]);
		} else if (args[index] === "--execute-current") {
			options.executeCurrent = true;
		} else if (args[index] === "--verify-package") {
			options.verifyPackage = true;
		} else if (args[index] === "--help" || args[index] === "-h") {
			options.help = true;
		} else {
			throw new Error(`Unknown argument: ${args[index]}`);
		}
	}
	return options;
}

function objectValue(value, label) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) {
		throw new Error(`${label} must be a JSON object`);
	}
	return value;
}

function nonEmptyString(value, label) {
	if (typeof value !== "string" || value.trim().length === 0) {
		throw new Error(`${label} must be a non-empty string`);
	}
	return value;
}

function assertExactEntries(directory, expectedEntries, label) {
	const actualEntries = fs.readdirSync(directory).sort();
	const expected = [...expectedEntries].sort();
	if (JSON.stringify(actualEntries) !== JSON.stringify(expected)) {
		throw new Error(`${label} entries differ: expected ${expected.join(", ")}; found ${actualEntries.join(", ")}`);
	}
}

function regularFile(filePath, label, maximumBytes) {
	const stats = fs.lstatSync(filePath);
	if (!stats.isFile() || stats.isSymbolicLink()) {
		throw new Error(`${label} must be a regular, non-symbolic file: ${filePath}`);
	}
	if (stats.size < 1 || stats.size > maximumBytes) {
		throw new Error(`${label} has an invalid size of ${stats.size} bytes: ${filePath}`);
	}
	return stats;
}

function regularDirectory(directoryPath, label) {
	const stats = fs.lstatSync(directoryPath);
	if (!stats.isDirectory() || stats.isSymbolicLink()) {
		throw new Error(`${label} must be a regular, non-symbolic directory: ${directoryPath}`);
	}
	return stats;
}

function isContainedPath(rootPath, candidatePath) {
	const relative = path.relative(rootPath, candidatePath);
	return relative.length > 0
		&& !path.isAbsolute(relative)
		&& relative !== ".."
		&& !relative.startsWith(`..${path.sep}`);
}

function sha256File(filePath) {
	return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function expectedExecutable(target) {
	return target.startsWith("win32-")
		? "roborock-hermes-appplugin-host.exe"
		: "roborock-hermes-appplugin-host";
}

function validateSmoke(smoke, target) {
	const value = objectValue(smoke, `${target} build.smoke`);
	if (typeof value.bundleSha256 !== "string" || !SHA256_PATTERN.test(value.bundleSha256)) {
		throw new Error(`${target} build.smoke.bundleSha256 must be a lowercase SHA-256 value`);
	}
	for (const field of ["bytecodeAccepted", "bootstrapCompleted", "evaluationCompleted"]) {
		if (value[field] !== true) throw new Error(`${target} build.smoke.${field} must be true`);
	}
	if (value.smokeMarker !== `hbc-${contract.hbcVersion}`) {
		throw new Error(`${target} build.smoke.smokeMarker does not prove HBC ${contract.hbcVersion}`);
	}
	return value;
}

function validateBuild(build, target) {
	const value = objectValue(build, `${target} build`);
	if (value.target !== target) throw new Error(`${target} build.target differs from its directory`);
	if (value.sourceRepository !== HERMES_REPOSITORY) {
		throw new Error(`${target} was not built from the pinned Hermes repository`);
	}
	if (value.sourceRef !== HERMES_REF) throw new Error(`${target} was not built from ${HERMES_REF}`);
	if (value.sourceCommit !== contract.hermesCommit || value.sourceClean !== true) {
		throw new Error(`${target} was not built from a clean pinned Hermes checkout`);
	}
	if (value.cmake !== `cmake version ${contract.build.cmakeVersion}`) {
		throw new Error(`${target} was not built with CMake ${contract.build.cmakeVersion}`);
	}
	const compiler = nonEmptyString(value.compiler, `${target} build.compiler`);
	if (target.startsWith("win32-")) {
		if (value.toolchainRelease !== contract.build.windows.llvmMingwRelease) {
			throw new Error(`${target} was not built with LLVM-MinGW ${contract.build.windows.llvmMingwRelease}`);
		}
		if (!compiler.includes(`clang version ${contract.build.windows.clangVersion}`)) {
			throw new Error(`${target} was not built with Clang ${contract.build.windows.clangVersion}`);
		}
	}
	nonEmptyString(value.generator, `${target} build.generator`);
	if (value.configuration !== "Release") throw new Error(`${target} was not built in Release mode`);
	if (!Number.isSafeInteger(value.jobs) || value.jobs < 1 || value.jobs > 64) {
		throw new Error(`${target} build.jobs is invalid`);
	}
	const dependencies = objectValue(value.dependencies, `${target} build.dependencies`);
	nonEmptyString(dependencies.tool, `${target} build.dependencies.tool`);
	if (
		!Array.isArray(dependencies.entries)
		|| dependencies.entries.length === 0
		|| dependencies.entries.some((entry) => typeof entry !== "string" || entry.length === 0)
	) {
		throw new Error(`${target} build.dependencies.entries must contain inspected library names`);
	}
	const forbiddenPattern = target.startsWith("win32-")
		? /(?:libc\+\+|libunwind|libgcc|libstdc\+\+|libwinpthread|libhermes)/iu
		: /(?:^|[/\\])libhermes(?:\.|$)/iu;
	const forbidden = dependencies.entries.filter((entry) => forbiddenPattern.test(entry));
	if (forbidden.length > 0) {
		throw new Error(`${target} contains forbidden dynamic dependencies: ${forbidden.join(", ")}`);
	}
	validateSmoke(value.smoke, target);
	return value;
}

function validateTarget(nativeRoot, target) {
	const targetDirectory = path.join(nativeRoot, target);
	regularDirectory(targetDirectory, `${target} artifact directory`);
	const realNativeRoot = fs.realpathSync(nativeRoot);
	const realTargetDirectory = fs.realpathSync(targetDirectory);
	if (!isContainedPath(realNativeRoot, realTargetDirectory)) {
		throw new Error(`${target} artifact directory escapes the native root`);
	}
	const executable = expectedExecutable(target);
	assertExactEntries(targetDirectory, ["artifact.json", executable], `${target} artifact`);
	const manifestPath = path.join(targetDirectory, "artifact.json");
	const manifestStats = regularFile(manifestPath, `${target} manifest`, MAX_MANIFEST_BYTES);
	if (manifestStats.size < 2) throw new Error(`${target} manifest is empty`);
	let manifest;
	try {
		manifest = objectValue(JSON.parse(fs.readFileSync(manifestPath, "utf8")), `${target} manifest`);
	} catch (error) {
		throw new Error(`${target} manifest is not valid JSON`, { cause: error });
	}
	if (manifest.schemaVersion !== contract.schemaVersion) throw new Error(`${target} schemaVersion differs`);
	if (manifest.target !== target) throw new Error(`${target} manifest target differs`);
	if (manifest.executable !== executable) throw new Error(`${target} executable name differs`);
	if (manifest.hermesCommit !== contract.hermesCommit) throw new Error(`${target} Hermes commit differs`);
	if (manifest.hbcVersion !== contract.hbcVersion) throw new Error(`${target} HBC version differs`);
	if (manifest.protocolVersion !== contract.protocolVersion) throw new Error(`${target} protocol version differs`);
	if (typeof manifest.sha256 !== "string" || !SHA256_PATTERN.test(manifest.sha256)) {
		throw new Error(`${target} manifest SHA-256 is invalid`);
	}
	if (!Number.isSafeInteger(manifest.size) || manifest.size < 1 || manifest.size > MAX_HOST_BYTES) {
		throw new Error(`${target} manifest size is invalid`);
	}
	validateBuild(manifest.build, target);
	const executablePath = path.join(targetDirectory, executable);
	const executableStats = regularFile(executablePath, `${target} executable`, MAX_HOST_BYTES);
	if (executableStats.size !== manifest.size) throw new Error(`${target} executable size differs from its manifest`);
	if (sha256File(executablePath) !== manifest.sha256) throw new Error(`${target} executable SHA-256 differs from its manifest`);
	return Object.freeze({ target, executablePath, manifestPath, sha256: manifest.sha256, size: manifest.size });
}

function executeCurrentArtifact(artifacts) {
	const target = `${process.platform}-${process.arch}`;
	const artifact = artifacts.find((candidate) => candidate.target === target);
	if (!artifact) throw new Error(`The matrix has no artifact executable on this runner for ${target}`);
	const execution = childProcess.spawnSync(artifact.executablePath, ["--help"], {
		encoding: "utf8",
		windowsHide: true,
	});
	if (execution.error) throw execution.error;
	if (execution.status !== 0) {
		throw new Error(`${target} executable failed to start with exit code ${execution.status}`);
	}
}

function validatePackageResult(packResult) {
	if (!Array.isArray(packResult) || packResult.length !== 1 || !Array.isArray(packResult[0]?.files)) {
		throw new Error("npm pack --dry-run returned an unexpected result");
	}
	const prefix = "src/apppluginHost/native/";
	const actual = packResult[0].files
		.map((entry) => entry?.path)
		.filter((entryPath) => typeof entryPath === "string" && entryPath.startsWith(prefix))
		.sort();
	const expected = contract.supportedTargets.flatMap((target) => {
		const executable = expectedExecutable(target);
		return [`${prefix}${target}/artifact.json`, `${prefix}${target}/${executable}`];
	}).sort();
	if (JSON.stringify(actual) !== JSON.stringify(expected)) {
		throw new Error(`npm package Hermes host entries differ: expected ${expected.join(", ")}; found ${actual.join(", ")}`);
	}
	return Object.freeze(actual);
}

function verifyPackageContents() {
	const command = process.platform === "win32" ? "npm.cmd" : "npm";
	const execution = childProcess.spawnSync(command, ["pack", "--json", "--dry-run", "--ignore-scripts"], {
		cwd: repositoryRoot,
		encoding: "utf8",
		windowsHide: true,
	});
	if (execution.error) throw execution.error;
	if (execution.status !== 0) {
		throw new Error(`npm pack --dry-run failed with exit code ${execution.status}: ${execution.stderr ?? ""}`);
	}
	let packResult;
	try {
		packResult = JSON.parse(execution.stdout);
	} catch (error) {
		throw new Error("npm pack --dry-run did not return JSON", { cause: error });
	}
	return validatePackageResult(packResult);
}

function verifyMatrix(nativeRoot, executeCurrent = false) {
	regularDirectory(nativeRoot, "Native root");
	assertExactEntries(nativeRoot, contract.supportedTargets, "Hermes host matrix");
	const artifacts = contract.supportedTargets.map((target) => validateTarget(nativeRoot, target));
	if (executeCurrent) executeCurrentArtifact(artifacts);
	return Object.freeze(artifacts);
}

function main() {
	const options = parseArgs(process.argv.slice(2));
	if (options.help) {
		console.log("Usage: node scripts/verify_hermes_host_matrix.js [--native-root <dir>] [--execute-current] [--verify-package]");
		return;
	}
	const artifacts = verifyMatrix(options.nativeRoot, options.executeCurrent === true);
	const packageEntries = options.verifyPackage ? verifyPackageContents() : undefined;
	console.log(JSON.stringify({ nativeRoot: options.nativeRoot, artifacts, packageEntries }, null, 2));
}

if (require.main === module) {
	try {
		main();
	} catch (error) {
		console.error(error instanceof Error ? error.message : error);
		process.exitCode = 1;
	}
}

module.exports = { parseArgs, validatePackageResult, validateTarget, verifyMatrix, verifyPackageContents };
