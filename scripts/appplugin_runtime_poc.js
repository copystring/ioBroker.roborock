#!/usr/bin/env node

const path = require("node:path");
const { runQ10AppPluginProof } = require("./lib/q10_appplugin_poc.js");

function parseArgs(args) {
	const options = {};
	for (let index = 0; index < args.length; index++) {
		if (args[index] === "--split-dir" && args[index + 1]) {
			options.splitDir = path.resolve(args[++index]);
		} else if (args[index] === "--help" || args[index] === "-h") {
			options.help = true;
		} else {
			throw new Error(`Unknown argument: ${args[index]}`);
		}
	}
	return options;
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	if (options.help) {
		console.log("Usage: node scripts/appplugin_runtime_poc.js [--split-dir <metro_bundle_split>]");
		return;
	}

	const result = await runQ10AppPluginProof(options);
	console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
	console.error(error instanceof Error ? error.stack : error);
	process.exitCode = 1;
});
