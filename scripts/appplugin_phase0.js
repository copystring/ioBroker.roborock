#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { runBundleConformance, runBundleMatrix } = require("./lib/appplugin_bundle_inventory.js");

function parseArgs(args) {
	const options = {};
	for (let index = 0; index < args.length; index++) {
		if (args[index] === "--bundle" && args[index + 1]) {
			options.bundlePath = path.resolve(args[++index]);
		} else if (args[index] === "--root" && args[index + 1]) {
			options.rootDir = path.resolve(args[++index]);
		} else if (args[index] === "--hermes" && args[index + 1]) {
			options.hermesExecutable = path.resolve(args[++index]);
		} else if (args[index] === "--hermes-host" && args[index + 1]) {
			options.hermesHostExecutable = path.resolve(args[++index]);
		} else if (args[index] === "--runtime-library-directory" && args[index + 1]) {
			options.runtimeLibraryDirectory = path.resolve(args[++index]);
		} else if (args[index] === "--help" || args[index] === "-h") {
			options.help = true;
		} else {
			throw new Error(`Unknown argument: ${args[index]}`);
		}
	}
	return options;
}

function main() {
	const options = parseArgs(process.argv.slice(2));
	if (options.help || (!options.bundlePath && !options.rootDir)) {
		return {
			exitCode: 0,
			output: "Usage: node scripts/appplugin_phase0.js (--bundle <index.android.bundle> | --root <.AppPlugins>) [--hermes <stock executable> | --hermes-host <phase0 host> [--runtime-library-directory <directory>]]"
		};
	}
	if (options.bundlePath && options.rootDir) throw new Error("Use either --bundle or --root, not both");

	const runtimeOptions = {
		hermesExecutable: options.hermesExecutable ?? process.env.HERMES_EXECUTABLE,
		hermesHostExecutable: options.hermesHostExecutable ?? process.env.HERMES_HOST_EXECUTABLE,
		runtimeLibraryDirectory: options.runtimeLibraryDirectory
			?? process.env.HERMES_RUNTIME_LIBRARY_DIRECTORY,
	};
	const result = options.bundlePath
		? runBundleConformance(options.bundlePath, runtimeOptions)
		: runBundleMatrix(options.rootDir, runtimeOptions);
	const failed = options.bundlePath
		? result.status === "failed"
			|| result.status === "host-unavailable"
			|| result.status === "host-incompatible"
			|| result.status === "runtime-failed"
			|| result.apkContractCoverage?.status === "incomplete"
		: result.summary.failed > 0
			|| result.summary.hostUnavailable > 0
			|| result.summary.hostIncompatible > 0
			|| result.summary.runtimeFailed > 0
			|| result.summary.contractIncomplete > 0;
	return {
		exitCode: failed ? 1 : 0,
		output: JSON.stringify(result, null, 2)
	};
}

try {
	const result = main();
	fs.writeSync(process.stdout.fd, `${result.output}\n`);
	process.exit(result.exitCode);
} catch (error) {
	fs.writeSync(process.stderr.fd, `${error instanceof Error ? error.stack : error}\n`);
	process.exit(1);
}
