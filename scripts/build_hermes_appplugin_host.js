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
		} else if (args[index] === "--stage-dir" && args[index + 1]) {
			options.stageDir = path.resolve(args[++index]);
		} else if (args[index] === "--fetch") {
			options.fetch = true;
		} else if (args[index] === "--check") {
			options.check = true;
		} else if (args[index] === "--help" || args[index] === "-h") {
			options.help = true;
		} else {
			throw new Error(`Unknown argument: ${args[index]}`);
		}
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

function stageHostBinary(hostBinary, stageRoot) {
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
	};
	const manifestPath = path.join(targetDirectory, "artifact.json");
	fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
	return { executablePath, manifestPath, target };
}

function environmentReport(options) {
	const sourceRepositoryDetails = sourceRepository(options.sourceDir);
	const sourceCommit = sourceRepositoryDetails?.commit;
	return {
		platform: process.platform,
		architecture: process.arch,
		cmake: commandVersion("cmake"),
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
		console.log("Usage: node scripts/build_hermes_appplugin_host.js [--check] [--fetch] [--source <dir>] [--build-dir <dir>] [--configuration <name>] [--stage-dir <dir>]");
		return;
	}

	if (options.fetch && !fs.existsSync(options.sourceDir)) fetchHermes(options.sourceDir);
	const report = environmentReport(options);
	if (options.check) {
		console.log(JSON.stringify(report, null, 2));
		if (
			!report.cmake
			|| !report.git
			|| !report.sourceExists
			|| !report.sourceRepositoryMatches
			|| !report.sourceClean
			|| !report.commitMatches
		) process.exitCode = 1;
		return;
	}

	if (!report.cmake) throw new Error("CMake 3.18 or newer is required");
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
	run("cmake", [
		"--build", options.buildDir,
		"--config", options.configuration,
		"--target", "roborock-hermes-appplugin-host",
		"--parallel",
	]);

	const hostBinary = hostBinaryPath(options.buildDir);
	const hostStats = fs.statSync(hostBinary);
	if (!hostStats.isFile() || hostStats.size < 1) {
		throw new Error(`Build completed but the deterministic host output is invalid: ${hostBinary}`);
	}
	const stagedArtifact = options.stageDir ? stageHostBinary(hostBinary, options.stageDir) : undefined;
	console.log(JSON.stringify({ ...report, hostBinary, stagedArtifact }, null, 2));
}

try {
	main();
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
}
