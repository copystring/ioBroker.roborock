#!/usr/bin/env node

const childProcess = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const HERMES_REPOSITORY = "https://github.com/facebook/hermes.git";
const HERMES_REF = "v0.13.0";
const repositoryRoot = path.resolve(__dirname, "..");
const hostSourceDir = path.join(repositoryRoot, "tools", "hermes-appplugin-host");
const artifactContractPath = path.join(
	repositoryRoot,
	"src",
	"apppluginHost",
	"generated",
	"hermes-host-artifact-contract.json",
);
const artifactContract = JSON.parse(fs.readFileSync(artifactContractPath, "utf8"));
const HERMES_COMMIT = artifactContract.hermesCommit;

function parseArgs(args) {
	const options = {
		configuration: "Release",
		jobs: process.env.CMAKE_BUILD_PARALLEL_LEVEL
			? Number(process.env.CMAKE_BUILD_PARALLEL_LEVEL)
			: process.platform === "win32" ? 1 : 2,
		sourceDir: process.env.HERMES_SOURCE_DIR
			? path.resolve(process.env.HERMES_SOURCE_DIR)
			: path.join(hostSourceDir, ".cache", `hermes-${HERMES_COMMIT.slice(0, 12)}`),
		buildDir: path.join(hostSourceDir, ".build"),
	};
	for (let index = 0; index < args.length; index++) {
		if (args[index] === "--source" && args[index + 1]) {
			options.sourceDir = path.resolve(args[++index]);
		} else if (args[index] === "--build-dir" && args[index + 1]) {
			options.buildDir = path.resolve(args[++index]);
		} else if (args[index] === "--configuration" && args[index + 1]) {
			options.configuration = args[++index];
		} else if (args[index] === "--jobs" && args[index + 1]) {
			options.jobs = Number(args[++index]);
		} else if (args[index] === "--stage-dir" && args[index + 1]) {
			options.stageDir = path.resolve(args[++index]);
		} else if (args[index] === "--fetch") {
			options.fetch = true;
		} else if (args[index] === "--smoke") {
			options.smoke = true;
		} else if (args[index] === "--check") {
			options.check = true;
		} else if (args[index] === "--help" || args[index] === "-h") {
			options.help = true;
		} else {
			throw new Error(`Unknown argument: ${args[index]}`);
		}
	}
	if (!Number.isSafeInteger(options.jobs) || options.jobs < 1 || options.jobs > 64) {
		throw new Error(`--jobs must be an integer between 1 and 64, received ${String(options.jobs)}`);
	}
	if (options.stageDir && !options.smoke) {
		throw new Error("--stage-dir requires --smoke so unverified native artifacts cannot be packaged");
	}
	return options;
}

function run(command, args, options = {}) {
	const execution = childProcess.spawnSync(command, args, {
		cwd: options.cwd,
		encoding: "utf8",
		stdio: options.capture ? "pipe" : "inherit",
		windowsHide: true,
	});
	if (execution.error) throw execution.error;
	if (execution.status !== 0) {
		throw new Error(`${command} ${args.join(" ")} failed with exit code ${execution.status}`);
	}
	return (execution.stdout ?? "").trim();
}

function commandVersion(command) {
	const execution = childProcess.spawnSync(command, ["--version"], {
		encoding: "utf8",
		windowsHide: true,
	});
	if (execution.error || execution.status !== 0) return undefined;
	return (execution.stdout || execution.stderr || "").split(/\r?\n/u)[0].trim();
}

function cmakeCacheValue(buildDir, name) {
	const cachePath = path.join(buildDir, "CMakeCache.txt");
	if (!fs.existsSync(cachePath)) return undefined;
	const prefix = `${name}:`;
	const entry = fs.readFileSync(cachePath, "utf8")
		.split(/\r?\n/u)
		.find((line) => line.startsWith(prefix));
	if (!entry) return undefined;
	const separator = entry.indexOf("=");
	return separator < 0 ? undefined : entry.slice(separator + 1);
}

function prepareMingwInternalBytecodeSource(sourceDir, buildDir) {
	if (process.platform !== "win32") return undefined;
	const generator = cmakeCacheValue(buildDir, "CMAKE_GENERATOR");
	if (generator !== "MinGW Makefiles") return undefined;

	const internalBytecodeDirectory = path.join(sourceDir, "lib", "InternalBytecode");
	const sourceNames = [
		"00-header.js",
		"01-Promise.js",
		"02-AsyncFn.js",
		"03-ES6Class.js",
		"99-footer.js",
	];
	const sourcePaths = sourceNames.map((name) => path.join(internalBytecodeDirectory, name));
	for (const sourcePath of sourcePaths) {
		if (!fs.statSync(sourcePath).isFile()) {
			throw new Error(`Pinned Hermes internal bytecode input is missing: ${sourcePath}`);
		}
	}
	const outputPath = path.join(buildDir, "hermes", "lib", "InternalBytecode", "InternalBytecode.js");
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, Buffer.concat(sourcePaths.map((sourcePath) => fs.readFileSync(sourcePath))));
	return outputPath;
}

function sourceRepository(sourceDir) {
	try {
		const repositoryPath = path.resolve(run("git", ["-C", sourceDir, "rev-parse", "--show-toplevel"], {
			capture: true,
		}));
		const sourcePath = fs.realpathSync(sourceDir);
		const repositoryRealPath = fs.realpathSync(repositoryPath);
		const normalizedSource = process.platform === "win32" ? sourcePath.toLowerCase() : sourcePath;
		const normalizedRepository = process.platform === "win32"
			? repositoryRealPath.toLowerCase()
			: repositoryRealPath;
		if (normalizedSource !== normalizedRepository) return undefined;
		return {
			commit: run("git", ["-C", sourceDir, "rev-parse", "HEAD"], { capture: true }),
			clean: run("git", ["-C", sourceDir, "status", "--porcelain", "--untracked-files=no"], {
				capture: true,
			}).length === 0,
			repositoryPath: repositoryRealPath,
		};
	} catch {
		return undefined;
	}
}

function fetchHermes(sourceDir) {
	if (fs.existsSync(sourceDir)) {
		throw new Error(`Refusing to fetch into existing path: ${sourceDir}`);
	}
	fs.mkdirSync(path.dirname(sourceDir), { recursive: true });
	run("git", ["clone", "--filter=blob:none", "--no-checkout", HERMES_REPOSITORY, sourceDir]);
	run("git", ["-C", sourceDir, "fetch", "--depth", "1", "origin", HERMES_COMMIT]);
	run("git", ["-C", sourceDir, "checkout", "--detach", HERMES_COMMIT]);
}

function hostBinaryPath(buildDir) {
	const expectedName = process.platform === "win32"
		? "roborock-hermes-appplugin-host.exe"
		: "roborock-hermes-appplugin-host";
	return path.join(buildDir, "appplugin-host", expectedName);
}

function hermesCompilerPath(buildDir, configuration) {
	if (process.env.HERMESC_EXECUTABLE) return path.resolve(process.env.HERMESC_EXECUTABLE);
	const executable = process.platform === "win32" ? "hermesc.exe" : "hermesc";
	const candidates = [
		path.join(buildDir, "bin", executable),
		path.join(buildDir, "bin", configuration, executable),
	];
	const compiler = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
	if (!compiler) {
		throw new Error(`Matching hermesc output is missing; checked ${candidates.join(", ")}`);
	}
	return compiler;
}

function smokeHostBinary(hostBinary, buildDir, configuration) {
	const compiler = hermesCompilerPath(buildDir, configuration);
	const smokeDirectory = path.join(buildDir, "appplugin-host-smoke");
	const smokeSource = path.join(hostSourceDir, "smoke_bundle.js");
	const smokeBundle = path.join(smokeDirectory, "smoke.hbc");
	fs.mkdirSync(smokeDirectory, { recursive: true });
	run(compiler, ["-O", "-emit-binary", `-out=${smokeBundle}`, smokeSource]);
	run(hostBinary, ["--help"], { capture: true });
	const output = run(hostBinary, [
		"--bundle", smokeBundle,
		"--bootstrap", path.join(hostSourceDir, "bridge_bootstrap.js"),
	], { capture: true });
	const result = JSON.parse(output);
	if (
		result.hostProtocol !== artifactContract.protocolVersion
		|| result.bytecodeAccepted !== true
		|| result.bootstrapCompleted !== true
		|| result.evaluationCompleted !== true
		|| result.probe?.smokeMarker !== `hbc-${artifactContract.hbcVersion}`
	) {
		throw new Error(`Hermes AppPlugin host smoke test returned an invalid result: ${output}`);
	}
	return {
		bundleSha256: sha256File(smokeBundle),
		bytecodeAccepted: true,
		bootstrapCompleted: true,
		evaluationCompleted: true,
		smokeMarker: result.probe.smokeMarker,
	};
}

function inspectHostDependencies(hostBinary) {
	let tool;
	let output;
	let entries;
	if (process.platform === "win32") {
		tool = "llvm-readobj --coff-imports";
		output = run("llvm-readobj", ["--coff-imports", hostBinary], { capture: true });
		entries = [...output.matchAll(/^\s*Name:\s*(.+?)\s*$/gmu)].map((match) => match[1]);
	} else if (process.platform === "linux") {
		tool = "ldd";
		output = run("ldd", [hostBinary], { capture: true });
		entries = output.split(/\r?\n/u)
			.map((line) => line.trim().split(/\s+(?:=>\s+)?/u)[0])
			.filter((entry) => entry.length > 0);
	} else if (process.platform === "darwin") {
		tool = "otool -L";
		output = run("otool", ["-L", hostBinary], { capture: true });
		entries = output.split(/\r?\n/u)
			.slice(1)
			.map((line) => line.trim().split(/\s+/u)[0])
			.filter((entry) => entry.length > 0);
	} else {
		throw new Error(`Dependency inspection is not implemented for ${process.platform}`);
	}
	if (entries.length === 0) throw new Error(`${tool} returned no host dependencies`);
	const forbiddenPattern = process.platform === "win32"
		? /(?:libc\+\+|libunwind|libgcc|libstdc\+\+|libwinpthread|libhermes)/iu
		: /(?:^|[/\\])libhermes(?:\.|$)/iu;
	const forbidden = entries.filter((entry) => forbiddenPattern.test(entry));
	if (forbidden.length > 0) {
		throw new Error(`Hermes AppPlugin host has forbidden dynamic dependencies: ${forbidden.join(", ")}`);
	}
	return { tool, entries };
}

function hostTarget() {
	const target = `${process.platform}-${process.arch}`;
	if (!artifactContract.supportedTargets.includes(target)) {
		throw new Error(`No packaged Hermes AppPlugin host target is defined for ${target}`);
	}
	return target;
}

function sha256File(filePath) {
	return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function stageHostBinary(hostBinary, stageRoot, buildProvenance) {
	const target = hostTarget();
	const executable = process.platform === "win32"
		? "roborock-hermes-appplugin-host.exe"
		: "roborock-hermes-appplugin-host";
	const targetDirectory = path.join(stageRoot, target);
	const executablePath = path.join(targetDirectory, executable);
	fs.mkdirSync(targetDirectory, { recursive: true });
	fs.copyFileSync(hostBinary, executablePath);
	if (process.platform !== "win32") fs.chmodSync(executablePath, 0o755);
	const stats = fs.statSync(executablePath);
	const manifest = {
		schemaVersion: artifactContract.schemaVersion,
		target,
		executable,
		sha256: sha256File(executablePath),
		size: stats.size,
		hermesCommit: artifactContract.hermesCommit,
		hbcVersion: artifactContract.hbcVersion,
		protocolVersion: artifactContract.protocolVersion,
		build: buildProvenance,
	};
	const manifestPath = path.join(targetDirectory, "artifact.json");
	fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
	return { executablePath, manifestPath, target };
}

function environmentReport(options) {
	const sourceRepositoryDetails = sourceRepository(options.sourceDir);
	const sourceCommit = sourceRepositoryDetails?.commit;
	const cmake = commandVersion("cmake");
	return {
		platform: process.platform,
		architecture: process.arch,
		cmake,
		cmakeMatches: cmake === `cmake version ${artifactContract.build.cmakeVersion}`,
		git: commandVersion("git"),
		sourceDir: options.sourceDir,
		sourceExists: fs.existsSync(path.join(options.sourceDir, "CMakeLists.txt")),
		sourceRepositoryPath: sourceRepositoryDetails?.repositoryPath,
		sourceRepositoryMatches: sourceRepositoryDetails !== undefined,
		sourceClean: sourceRepositoryDetails?.clean ?? false,
		sourceCommit,
		expectedHermesRef: HERMES_REF,
		expectedHermesCommit: HERMES_COMMIT,
		commitMatches: sourceCommit === HERMES_COMMIT,
	};
}

function main() {
	const options = parseArgs(process.argv.slice(2));
	if (options.help) {
		console.log("Usage: node scripts/build_hermes_appplugin_host.js [--check] [--fetch] [--smoke] [--source <dir>] [--build-dir <dir>] [--configuration <name>] [--jobs <1..64>] [--stage-dir <dir>]");
		return;
	}

	if (options.fetch && !fs.existsSync(options.sourceDir)) fetchHermes(options.sourceDir);
	const report = environmentReport(options);
	if (options.check) {
		console.log(JSON.stringify(report, null, 2));
		if (
			!report.cmakeMatches
			|| !report.git
			|| !report.sourceExists
			|| !report.sourceRepositoryMatches
			|| !report.sourceClean
			|| !report.commitMatches
		) process.exitCode = 1;
		return;
	}

	const expectedCmake = `cmake version ${artifactContract.build.cmakeVersion}`;
	if (!report.cmakeMatches) {
		throw new Error(`${expectedCmake} is required, found ${report.cmake ?? "no CMake"}`);
	}
	if (!report.sourceExists) throw new Error(`Hermes source missing at ${options.sourceDir}; pass --source or --fetch`);
	if (!report.sourceRepositoryMatches) {
		throw new Error(`Hermes source must itself be a Git repository root: ${options.sourceDir}`);
	}
	if (!report.sourceClean) throw new Error(`Hermes source contains tracked modifications: ${options.sourceDir}`);
	if (!report.commitMatches) {
		throw new Error(`Hermes source must be pinned to ${HERMES_COMMIT}, found ${report.sourceCommit ?? "no Git commit"}`);
	}

	const configureArgs = [
		"-S", hostSourceDir,
		"-B", options.buildDir,
		`-DHERMES_SOURCE_DIR=${options.sourceDir}`,
		`-DCMAKE_BUILD_TYPE=${options.configuration}`,
	];
	if (process.env.HERMESC_EXECUTABLE) configureArgs.push(`-DHERMESC_EXECUTABLE=${path.resolve(process.env.HERMESC_EXECUTABLE)}`);
	run("cmake", configureArgs);
	const mingwInternalBytecodeSource = prepareMingwInternalBytecodeSource(options.sourceDir, options.buildDir);
	run("cmake", [
		"--build", options.buildDir,
		"--config", options.configuration,
		"--target", "roborock-hermes-appplugin-host",
		"--parallel", String(options.jobs),
	]);

	const hostBinary = hostBinaryPath(options.buildDir);
	const hostStats = fs.statSync(hostBinary);
	if (!hostStats.isFile() || hostStats.size < 1) {
		throw new Error(`Build completed but the deterministic host output is invalid: ${hostBinary}`);
	}
	const smoke = options.smoke
		? smokeHostBinary(hostBinary, options.buildDir, options.configuration)
		: undefined;
	const dependencies = inspectHostDependencies(hostBinary);
	const compiler = commandVersion(process.env.CXX || (process.platform === "win32" ? "cl" : "c++"));
	if (
		process.platform === "win32"
		&& !compiler?.includes(`clang version ${artifactContract.build.windows.clangVersion}`)
	) {
		throw new Error(`Windows hosts require LLVM-MinGW ${artifactContract.build.windows.llvmMingwRelease} with Clang ${artifactContract.build.windows.clangVersion}, found ${compiler ?? "no compiler"}`);
	}
	const buildProvenance = {
		target: hostTarget(),
		sourceRepository: HERMES_REPOSITORY,
		sourceRef: HERMES_REF,
		sourceCommit: report.sourceCommit,
		sourceClean: report.sourceClean,
		cmake: report.cmake,
		compiler,
		toolchainRelease: process.platform === "win32"
			? artifactContract.build.windows.llvmMingwRelease
			: undefined,
		generator: cmakeCacheValue(options.buildDir, "CMAKE_GENERATOR"),
		configuration: options.configuration,
		jobs: options.jobs,
		dependencies,
		smoke,
	};
	const stagedArtifact = options.stageDir
		? stageHostBinary(hostBinary, options.stageDir, buildProvenance)
		: undefined;
	console.log(JSON.stringify({ ...report, mingwInternalBytecodeSource, hostBinary, smoke, stagedArtifact }, null, 2));
}

if (require.main === module) {
	try {
		main();
	} catch (error) {
		console.error(error instanceof Error ? error.message : error);
		process.exitCode = 1;
	}
}

module.exports = { inspectHostDependencies, parseArgs };
