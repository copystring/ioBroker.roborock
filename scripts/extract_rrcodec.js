#!/usr/bin/env node

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const JSZip = require("jszip");

async function findCodecEntries(archivePath) {
	const archive = await JSZip.loadAsync(fs.readFileSync(archivePath));
	const entries = [];
	for (const [entryPath, entry] of Object.entries(archive.files)) {
		if (!entry.dir && /(^|\/)lib\/[^/]+\/librrcodec\.so$/u.test(entryPath)) {
			const content = await entry.async("nodebuffer");
			entries.push({
				entryPath,
				content,
				abi: entryPath.split("/").at(-2),
				sha256: crypto.createHash("sha256").update(content).digest("hex")
			});
		}
	}
	return entries;
}

async function extractCodec(archivePath, outputDir) {
	const entries = await findCodecEntries(archivePath);
	if (entries.length === 0) {
		throw new Error(`No librrcodec.so found in ${archivePath}`);
	}
	fs.mkdirSync(outputDir, { recursive: true });
	for (const entry of entries) {
		const targetPath = path.join(outputDir, entry.abi, "librrcodec.so");
		fs.mkdirSync(path.dirname(targetPath), { recursive: true });
		fs.writeFileSync(targetPath, entry.content);
		entry.targetPath = targetPath;
		delete entry.content;
	}
	return entries;
}

function parseArgs(args) {
	const archivePath = args[0] ? path.resolve(args[0]) : undefined;
	let outputDir;
	for (let index = 1; index < args.length; index++) {
		if (args[index] === "--out" && args[index + 1]) {
			outputDir = path.resolve(args[++index]);
		} else {
			throw new Error(`Unknown argument: ${args[index]}`);
		}
	}
	return { archivePath, outputDir };
}

async function main() {
	const { archivePath, outputDir } = parseArgs(process.argv.slice(2));
	if (!archivePath) {
		console.log("Usage: node scripts/extract_rrcodec.js <app.apk> [--out <directory>]");
		return;
	}
	const result = outputDir ? await extractCodec(archivePath, outputDir) : await findCodecEntries(archivePath);
	console.log(
		JSON.stringify(
			result.map(({ content, ...entry }) => ({
				...entry,
				size: content?.length ?? fs.statSync(entry.targetPath).size
			})),
			null,
			2
		)
	);
}

if (require.main === module) {
	main().catch((error) => {
		console.error(error instanceof Error ? error.stack : error);
		process.exitCode = 1;
	});
}

module.exports = {
	extractCodec,
	findCodecEntries
};
