#!/usr/bin/env node

const childProcess = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const HERMES_REPOSITORY = "https://github.com/facebook/hermes.git";
const HERMES_REF = "v0.13.0";
const HERMES_COMMIT = "4b3bf912cc0f705b51b71ce1a5b8bd79b93a451b";
const repositoryRoot = path.resolve(__dirname, "..");
const hostSourceDir = path.join(repositoryRoot, "tools", "hermes-appplugin-host");

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

function currentCommit(sourceDir) {
	try {
		return run("git", ["-C", sourceDir, "rev-parse", "HEAD"], { capture: true });
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

function findHostBinary(buildDir) {
	const expectedName = process.platform === "win32"
		? "roborock-hermes-appplugin-host.exe"
		: "roborock-hermes-appplugin-host";
	const pending = [buildDir];
	while (pending.length > 0) {
		const current = pending.pop();
		if (!fs.existsSync(current)) continue;
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const entryPath = path.join(current, entry.name);
			if (entry.isDirectory() && entry.name !== "CMakeFiles") pending.push(entryPath);
			if (entry.isFile() && entry.name === expectedName) return entryPath;
		}
	}
	return undefined;
}

function environmentReport(options) {
	const sourceCommit = currentCommit(options.sourceDir);
	return {
		platform: process.platform,
		architecture: process.arch,
		cmake: commandVersion("cmake"),
		git: commandVersion("git"),
		sourceDir: options.sourceDir,
		sourceExists: fs.existsSync(path.join(options.sourceDir, "CMakeLists.txt")),
		sourceCommit,
		expectedHermesRef: HERMES_REF,
		expectedHermesCommit: HERMES_COMMIT,
		commitMatches: sourceCommit === HERMES_COMMIT,
	};
}

function main() {
	const options = parseArgs(process.argv.slice(2));
	if (options.help) {
		console.log("Usage: node scripts/build_hermes_appplugin_host.js [--check] [--fetch] [--source <dir>] [--build-dir <dir>] [--configuration <name>]");
		return;
	}

	if (options.fetch && !fs.existsSync(options.sourceDir)) fetchHermes(options.sourceDir);
	const report = environmentReport(options);
	if (options.check) {
		console.log(JSON.stringify(report, null, 2));
		if (!report.cmake || !report.git || !report.sourceExists || !report.commitMatches) process.exitCode = 1;
		return;
	}

	if (!report.cmake) throw new Error("CMake 3.18 or newer is required");
	if (!report.sourceExists) throw new Error(`Hermes source missing at ${options.sourceDir}; pass --source or --fetch`);
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

	const hostBinary = findHostBinary(options.buildDir);
	if (!hostBinary) throw new Error(`Build completed but host binary was not found below ${options.buildDir}`);
	console.log(JSON.stringify({ ...report, hostBinary }, null, 2));
}

try {
	main();
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
}
