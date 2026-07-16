#!/usr/bin/env node

const path = require("node:path");
const { probeMetroBundleUiContract } = require("./lib/appplugin_ui_contract_probe.js");

function parseArgs(args) {
	const options = { durationMs: 750 };
	for (let index = 0; index < args.length; index++) {
		if (args[index] === "--bundle" && args[index + 1]) {
			options.bundlePath = path.resolve(args[++index]);
		} else if (args[index] === "--duration" && args[index + 1]) {
			options.durationMs = Number.parseInt(args[++index], 10);
		} else if (args[index] === "--model" && args[index + 1]) {
			options.deviceModel = args[++index];
		} else if (args[index] === "--help" || args[index] === "-h") {
			options.help = true;
		} else {
			throw new Error(`Unknown or incomplete argument: ${args[index]}`);
		}
	}
	return options;
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	if (options.help) {
		console.log("Usage: node scripts/appplugin_ui_probe.js --bundle <index.android.bundle> [--duration <ms>] [--model <model>]");
		return;
	}
	if (!options.bundlePath) throw new Error("--bundle is required");
	if (!Number.isFinite(options.durationMs) || options.durationMs < 1) throw new Error("--duration must be a positive integer");

	const result = await probeMetroBundleUiContract(options.bundlePath, options);
	console.log(JSON.stringify(result, null, 2));
	if (result.runError
		|| result.reportedExceptions.length > 0
		|| result.timerErrors.length > 0
		|| !result.unchanged
		|| !result.appKeys.includes("App")
		|| result.uiOperationCount === 0) {
		process.exitCode = 1;
	}
	process.exit(process.exitCode ?? 0);
}

main().catch(error => {
	console.error(error instanceof Error ? error.stack : error);
	process.exit(1);
});
