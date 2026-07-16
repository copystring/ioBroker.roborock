#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..");
const DEFAULT_ROOT = path.join(REPO_ROOT, ".AppPlugins");
const DEFAULT_OUTPUT = path.join(REPO_ROOT, "lib", "protocols", "roborock_error_codes.json");
const DEFAULT_TRANSLATIONS = path.join(REPO_ROOT, "lib", "protocols", "roborock_strings.json");
const FIELD_NAMES = ["titleKeys", "subtitleKeys", "descriptionKeys", "detailKeys"];

function parseArgs(argv) {
	const options = { root: DEFAULT_ROOT, out: DEFAULT_OUTPUT, translations: DEFAULT_TRANSLATIONS, plugin: null };
	for (let index = 0; index < argv.length; index++) {
		const arg = argv[index];
		if (arg === "--root" && argv[index + 1]) options.root = path.resolve(argv[++index]);
		else if (arg === "--out" && argv[index + 1]) options.out = path.resolve(argv[++index]);
		else if (arg === "--translations" && argv[index + 1]) options.translations = path.resolve(argv[++index]);
		else if (arg === "--plugin" && argv[index + 1]) options.plugin = argv[++index].toLowerCase();
		else throw new Error(`Unknown or incomplete argument: ${arg}`);
	}
	return options;
}

function walkFiles(rootDir) {
	const files = [];
	const pending = [rootDir];
	while (pending.length > 0) {
		const current = pending.pop();
		for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
			const fullPath = path.join(current, entry.name);
			if (entry.isDirectory()) pending.push(fullPath);
			else if (entry.isFile() && (entry.name === "index.android.bundle" || /^module_\d+\.js$/.test(entry.name))) files.push(fullPath);
		}
	}
	return files.sort();
}

function splitTopLevelFields(body) {
	const fields = [];
	let current = "";
	let quote = null;
	let escaped = false;
	let depth = 0;
	for (const char of body) {
		if (escaped) {
			current += char;
			escaped = false;
			continue;
		}
		if (char === "\\" && quote) {
			current += char;
			escaped = true;
			continue;
		}
		if (quote) {
			current += char;
			if (char === quote) quote = null;
			continue;
		}
		if (char === "'" || char === '"' || char === "`") {
			quote = char;
			current += char;
			continue;
		}
		if (char === "(" || char === "[" || char === "{") depth++;
		if (char === ")" || char === "]" || char === "}") depth--;
		if (char === "," && depth === 0) {
			fields.push(current.trim());
			current = "";
		} else current += char;
	}
	fields.push(current.trim());
	return fields;
}

function extractTranslationKeys(expression) {
	const keys = [];
	for (const match of expression.matchAll(/(?:^|[^\w$])[$A-Za-z_][\w$]*\.([A-Za-z_][\w]*)/g)) {
		if (match[1] !== "DMM" && !keys.includes(match[1])) keys.push(match[1]);
	}
	return keys;
}

function parseErrorEntries(source) {
	const entries = [];
	const pattern = /(?:(?<=\{)|(?<=,))(\d+):\[(.*?)\](?=,\d+:|\}\})/gs;
	for (const match of source.matchAll(pattern)) {
		const fields = splitTopLevelFields(match[2]);
		const typeMatch = fields[0]?.match(/^['"]([^'"]*)['"]$/);
		if (!typeMatch || fields.length < 2) continue;
		entries.push({ code: Number(match[1]), type: typeMatch[1], fields: fields.slice(1, 5).map(extractTranslationKeys) });
	}
	return entries;
}

function parseReminderEntries(source) {
	const entries = [];
	const pattern = /(?:^|[,\{])error(\d+):\[(.*?)\](?=,[A-Za-z_]|\}\})/gs;
	for (const match of source.matchAll(pattern)) {
		const fields = splitTopLevelFields(match[2]);
		entries.push({
			code: Number(match[1]),
			type: "Reminder",
			fields: [extractTranslationKeys(fields[0] || ""), [], extractTranslationKeys(fields[1] || ""), []],
		});
	}
	return entries;
}

function mergeUnique(target, values) {
	for (const value of values) if (!target.includes(value)) target.push(value);
}

function selectLabelKeys(code, definition) {
	if (code >= 100 && code < 600 && definition.detailKeys.length > 0) return [...definition.detailKeys].reverse();
	return [...definition.titleKeys].reverse();
}

function buildErrorCodeDataset(rootDir, translationsPath, pluginFilter = null) {
	const sources = [];
	const definitions = new Map();
	for (const filePath of walkFiles(rootDir)) {
		const relativeSource = path.relative(rootDir, filePath).split(path.sep).join("/");
		if (pluginFilter && !relativeSource.toLowerCase().includes(pluginFilter)) continue;
		let source;
		try {
			source = fs.readFileSync(filePath, "utf8");
		} catch {
			continue;
		}
		if (!source.includes("collecting_dusk_error32_title") && !source.includes("error_clear_waterbox_hoare_title")) continue;
		const entries = [...parseErrorEntries(source), ...parseReminderEntries(source)];
		if (entries.length === 0) continue;
		sources.push(relativeSource);
		for (const entry of entries) {
			let definition = definitions.get(entry.code);
			if (!definition) {
				definition = { types: [], titleKeys: [], subtitleKeys: [], descriptionKeys: [], detailKeys: [] };
				definitions.set(entry.code, definition);
			}
			mergeUnique(definition.types, [entry.type]);
			entry.fields.forEach((keys, index) => mergeUnique(definition[FIELD_NAMES[index]], keys));
		}
	}

	const translations = JSON.parse(fs.readFileSync(translationsPath, "utf8"));
	const english = translations.en || {};
	const codes = {};
	for (const code of [...definitions.keys()].sort((left, right) => left - right)) {
		const definition = definitions.get(code);
		const labelKeys = selectLabelKeys(code, definition);
		const fallback = labelKeys.map((key) => english[key]).find((value) => typeof value === "string" && value.length > 0)
			|| (code === 0 ? "No error" : definition.types[0] || `Error ${code}`);
		codes[String(code)] = { ...definition, labelKeys, fallback };
	}
	return {
		_meta: {
			description: "Roborock AppPlugin error definitions. Translation keys resolve through roborock_strings.json.",
			pluginFilter,
			sources: [...new Set(sources)].sort(),
		},
		codes,
	};
}

function main() {
	const options = parseArgs(process.argv.slice(2));
	const dataset = buildErrorCodeDataset(options.root, options.translations, options.plugin);
	fs.mkdirSync(path.dirname(options.out), { recursive: true });
	fs.writeFileSync(options.out, `${JSON.stringify(dataset, null, 2)}\n`, "utf8");
	console.log(`Wrote ${Object.keys(dataset.codes).length} error codes from ${dataset._meta.sources.length} AppPlugin sources to ${options.out}`);
}

if (require.main === module) main();

module.exports = { buildErrorCodeDataset, extractTranslationKeys, parseErrorEntries, parseReminderEntries, splitTopLevelFields };
