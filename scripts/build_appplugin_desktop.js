#!/usr/bin/env node

const path = require("node:path");
const esbuild = require("esbuild");

const repositoryRoot = path.resolve(__dirname, "..");

async function main() {
	await esbuild.build({
		entryPoints: [path.join(repositoryRoot, "src", "www", "appplugin-desktop.ts")],
		bundle: true,
		minify: true,
		sourcemap: true,
		format: "esm",
		outfile: path.join(repositoryRoot, "www", "appplugin-desktop.js"),
	});
	console.log("Built www/appplugin-desktop.js");
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
