#!/usr/bin/env node

const { createHash } = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const esbuild = require("esbuild");

const repositoryRoot = path.resolve(__dirname, "..");
const outputPath = path.join(repositoryRoot, "www", "appplugin-desktop.js");
const htmlPath = path.join(repositoryRoot, "www", "appplugin-desktop.html");

async function main() {
	await esbuild.build({
		entryPoints: [path.join(repositoryRoot, "src", "www", "appplugin-desktop.ts")],
		bundle: true,
		minify: true,
		sourcemap: true,
		format: "esm",
		outfile: outputPath,
	});
	const assetVersion = createHash("sha256").update(fs.readFileSync(outputPath)).digest("hex").slice(0, 12);
	const html = fs.readFileSync(htmlPath, "utf8");
	const scriptSource = /src="\.\/appplugin-desktop\.js\?v=[^"]+"/u;
	if (!scriptSource.test(html)) throw new Error("AppPlugin-Desktop-Scriptquelle besitzt keinen Cache-Schlüssel");
	fs.writeFileSync(htmlPath, html.replace(scriptSource, `src="./appplugin-desktop.js?v=${assetVersion}"`), "utf8");
	console.log(`Built www/appplugin-desktop.js (cache ${assetVersion})`);
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
