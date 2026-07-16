#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const {
	buildMapInventory,
	renderMapInventoryMarkdown
} = require("./lib/appplugin_map_inventory.js");

function parseArgs(args) {
	const options = { rootDir: path.resolve(".AppPlugins") };
	for (let index = 0; index < args.length; index++) {
		if (args[index] === "--root" && args[index + 1]) {
			options.rootDir = path.resolve(args[++index]);
		} else if (args[index] === "--json" && args[index + 1]) {
			options.jsonPath = path.resolve(args[++index]);
		} else if (args[index] === "--markdown" && args[index + 1]) {
			options.markdownPath = path.resolve(args[++index]);
		} else if (args[index] === "--hermes-host" && args[index + 1]) {
			options.hermesHostExecutable = path.resolve(args[++index]);
		} else if (args[index] === "--no-runtime") {
			options.runRuntime = false;
		} else if (args[index] === "--help" || args[index] === "-h") {
			options.help = true;
		} else {
			throw new Error(`Unknown argument: ${args[index]}`);
		}
	}
	return options;
}

function writeOutput(targetPath, content) {
	fs.mkdirSync(path.dirname(targetPath), { recursive: true });
	fs.writeFileSync(targetPath, content, "utf8");
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	if (options.help) {
		console.log("Usage: node scripts/appplugin_map_matrix.js [--root <.AppPlugins>] [--json <file>] [--markdown <file>] [--hermes-host <binary>] [--no-runtime]");
		return 0;
	}

	const inventory = await buildMapInventory(options.rootDir, {
		hermesHostExecutable: options.hermesHostExecutable ?? process.env.HERMES_HOST_EXECUTABLE,
		runRuntime: options.runRuntime
	});
	const json = `${JSON.stringify(inventory, null, 2)}\n`;
	if (options.jsonPath) writeOutput(options.jsonPath, json);
	if (options.markdownPath) writeOutput(options.markdownPath, `${renderMapInventoryMarkdown(inventory)}\n`);
	if (!options.jsonPath && !options.markdownPath) process.stdout.write(json);

	const hasCoverageFailure = inventory.summary.failedArchiveSources > 0
		|| inventory.summary.unmatchedArchiveSources > 0
		|| inventory.summary.unresolvedMapFamilies > 0
		|| inventory.packages.some(plugin => plugin.coverageStatus === "missing-bundle" || plugin.coverageStatus === "incomplete" || plugin.coverageStatus === "archive-only");
	return hasCoverageFailure ? 1 : 0;
}

main().then(exitCode => {
	process.exit(exitCode);
}).catch(error => {
	console.error(error instanceof Error ? error.stack : error);
	process.exit(1);
});
