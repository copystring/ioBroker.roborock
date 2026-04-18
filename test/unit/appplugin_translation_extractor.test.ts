import { execFileSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const repoRoot = path.resolve(__dirname, "..", "..");
const scriptPath = path.join(repoRoot, "scripts", "extract_appplugin_translations.js");
const appPluginsRoot = path.join(repoRoot, ".AppPlugins");

const extractor = require(scriptPath) as {
	detectBundleKind: (bundlePath: string) => { kind: string; reason: string };
	discoverPluginInstances: (rootDir: string, pluginFilter?: string) => Array<{
		instanceId: string;
		instanceDir: string;
		modelName: string;
		instanceName: string;
		bundlePath: string | null;
		beautifiedBundlePath: string | null;
		jsModulesDir: string | null;
		metroSplitDir: string | null;
		decompiledDir: string | null;
		rawDir: string | null;
	}>;
	processPluginInstance: (
		instance: {
			instanceId: string;
			instanceDir: string;
			modelName: string;
			instanceName: string;
			bundlePath: string | null;
			beautifiedBundlePath: string | null;
			jsModulesDir: string | null;
			metroSplitDir: string | null;
			decompiledDir: string | null;
			rawDir: string | null;
		},
		options: { quiet?: boolean; noWrite?: boolean },
	) => {
		translations: Map<string, Record<string, string>>;
		issues: string[];
		bundleKind: { kind: string; reason: string };
		moduleStrategy: string;
	};
	extractLanguagePropertyObjectLiteral: (code: string, language: string) => string | null;
	extractTranslationObjectLiteral: (code: string) => string | null;
	findMetroModuleByIdInBundle: (
		bundleText: string,
		moduleId: number,
		sourceLabel: string,
	) => {
		id: number;
		deps: number[];
		code: string;
	} | null;
	parseObjectLiteral: (objectLiteral: string) => Record<string, string> | null;
};

const tempDirs: string[] = [];

function registerTempDir(): string {
	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rr-appplugin-translations-"));
	tempDirs.push(tempDir);
	return tempDir;
}

function runExtractorForPlugin(pluginName: string, outputPath: string, extraArgs: string[] = []): void {
	execFileSync(process.execPath, [scriptPath, "--plugin", pluginName, "--out", outputPath, ...extraArgs], {
		cwd: repoRoot,
		stdio: "pipe",
	});
}

function ensureDir(dirPath: string): void {
	fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath: string): any {
	return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function escapeRegex(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractValueFromMetroBundle(bundlePath: string, key: string): string {
	const source = fs.readFileSync(bundlePath, "utf8");
	const match = source.match(new RegExp(`${escapeRegex(key)}:"([^"]*)"`, "u"));
	expect(match, `Expected to find ${key} in ${bundlePath}`).not.toBeNull();
	return match![1].replace(/\\n/g, "\n");
}

function extractValueFromSplitModule(modulePath: string, key: string): string {
	const source = fs.readFileSync(modulePath, "utf8");
	const match = source.match(new RegExp(`'${escapeRegex(key)}': '([^']*)'`, "u"));
	expect(match, `Expected to find ${key} in ${modulePath}`).not.toBeNull();
	return match![1];
}

function extractValueFromMetroModule(bundlePath: string, moduleId: number, key: string): string {
	const source = fs.readFileSync(bundlePath, "utf8");
	const moduleEntry = extractor.findMetroModuleByIdInBundle(source, moduleId, bundlePath);
	expect(moduleEntry, `Expected to find Metro module ${moduleId} in ${bundlePath}`).not.toBeNull();

	const literal =
		extractor.extractTranslationObjectLiteral(moduleEntry!.code) ||
		extractor.extractLanguagePropertyObjectLiteral(moduleEntry!.code, moduleId === 1600 ? "de" : "en");
	expect(literal, `Expected Metro module ${moduleId} to expose a translation object`).not.toBeNull();

	const parsed = extractor.parseObjectLiteral(literal!);
	expect(parsed).not.toBeNull();
	expect(parsed[key], `Expected to find ${key} in Metro module ${moduleId}`).toBeTypeOf("string");
	return parsed[key];
}

afterEach(() => {
	for (const tempDir of tempDirs.splice(0)) {
		fs.rmSync(tempDir, { recursive: true, force: true });
	}
});

describe("extract_appplugin_translations", () => {
	it("detects Metro text bundles and Hermes bytecode bundles correctly", () => {
		const metroBundle = path.join(
			appPluginsRoot,
			"Qrevo Curv",
			"2e158bfb3b5d454d8d9b6d8fb6136308",
			"index.android.bundle",
		);
		const hermesBundle = path.join(
			appPluginsRoot,
			"Saros Z70",
			"4d3ae9e297c84a7e80a23ffe4f78a59e",
			"index.android.bundle",
		);

		expect(extractor.detectBundleKind(metroBundle)).toMatchObject({
			kind: "metro-js",
			reason: expect.stringContaining("Metro"),
		});
		expect(extractor.detectBundleKind(hermesBundle)).toMatchObject({
			kind: "hermes-bytecode",
			reason: expect.stringContaining("Hermes"),
		});
	});

	it("discovers AppPlugin instances recursively without relying on a fixed model/instance depth", () => {
		const tempRoot = registerTempDir();
		const nestedInstanceDir = path.join(tempRoot, "Weird", "Depth", "abc123");
		const extractedInstanceDir = path.join(tempRoot, "StandaloneExtracted");

		ensureDir(path.join(nestedInstanceDir, "js_modules"));
		fs.writeFileSync(
			path.join(nestedInstanceDir, "js_modules", "module_0001.js"),
			"// moduleId: 1\n// deps: []\n\nmodule.exports = {};",
			"utf8",
		);

		ensureDir(path.join(extractedInstanceDir, "index.android.bundle.decompiled"));
		fs.writeFileSync(path.join(extractedInstanceDir, "index.android.bundle"), "__d(function(){},0,[]);", "utf8");
		fs.writeFileSync(
			path.join(extractedInstanceDir, "index.android.bundle.decompiled", "1.js"),
			"module.exports = {};",
			"utf8",
		);

		const instances = extractor.discoverPluginInstances(tempRoot);

		expect(instances.map((instance) => instance.instanceId)).toEqual([
			"StandaloneExtracted",
			"Weird/Depth/abc123",
		]);
		expect(instances[0]).toMatchObject({
			modelName: "StandaloneExtracted",
			instanceName: "StandaloneExtracted",
			decompiledDir: expect.stringContaining("index.android.bundle.decompiled"),
		});
		expect(instances[1]).toMatchObject({
			modelName: "Weird",
			instanceName: "Depth/abc123",
			jsModulesDir: expect.stringContaining("js_modules"),
		});
	});

	it("extracts Qrevo Curv translations through the CLI and matches the original Metro bundle", () => {
		const outputDir = registerTempDir();
		const bundlePath = path.join(
			appPluginsRoot,
			"Qrevo Curv",
			"2e158bfb3b5d454d8d9b6d8fb6136308",
			"index.android.bundle",
		);

		runExtractorForPlugin("Qrevo Curv", outputDir);
		const instance = extractor.discoverPluginInstances(appPluginsRoot, "Qrevo Curv")[0];
		const result = extractor.processPluginInstance(instance, { quiet: true, noWrite: true });

		const en = readJson(path.join(outputDir, "en.json"));

		expect(en.default_room_name).toBe(extractValueFromMetroBundle(bundlePath, "default_room_name"));
		expect(en.recover_map_hint).toBe(extractValueFromMetroBundle(bundlePath, "recover_map_hint"));
		expect(result.bundleKind.kind).toBe("metro-js");
		expect(result.moduleStrategy).toBe("metro_bundle_split");
		expect(fs.existsSync(path.join(outputDir, "meta.json"))).toBe(false);
	});

	it("extracts Q10 X5+ translations from a direct Metro bundle and matches the original source", () => {
		const outputDir = registerTempDir();
		const bundlePath = path.join(
			appPluginsRoot,
			"Q10 X5+",
			"019bdf41f583723bb937ccc99bbd7541",
			"index.android.bundle",
		);
		const instanceId = "Q10 X5+/019bdf41f583723bb937ccc99bbd7541";

		runExtractorForPlugin(instanceId, outputDir);
		const instance = extractor.discoverPluginInstances(appPluginsRoot, instanceId)[0];
		const result = extractor.processPluginInstance(instance, { quiet: true, noWrite: true });

		const en = readJson(path.join(outputDir, "en.json"));
		const de = readJson(path.join(outputDir, "de.json"));

		expect(en.device_ctrl_charge).toBe(extractValueFromMetroModule(bundlePath, 1598, "device_ctrl_charge"));
		expect(en.device_state_remoting).toBe(
			extractValueFromMetroModule(bundlePath, 1598, "device_state_remoting"),
		);
		expect(de.device_ctrl_charge).toBe(extractValueFromMetroModule(bundlePath, 1600, "device_ctrl_charge"));
		expect(result.bundleKind.kind).toBe("metro-js");
		expect(result.moduleStrategy).toBe("metro_bundle_split");
		expect(result.issues).toEqual([]);
	});

	it("extracts Saros Z70 translations through the CLI and matches the split Hermes module", { timeout: 15000 }, () => {
		const outputDir = registerTempDir();
		const zhModulePath = path.join(
			appPluginsRoot,
			"Saros Z70",
			"4d3ae9e297c84a7e80a23ffe4f78a59e",
			"js_modules",
			"module_0480.js",
		);

		runExtractorForPlugin("Saros Z70", outputDir);
		const instance = extractor.discoverPluginInstances(appPluginsRoot, "Saros Z70")[0];
		const result = extractor.processPluginInstance(instance, { quiet: true, noWrite: true });

		const zhCn = readJson(path.join(outputDir, "zh-CN.json"));

		expect(zhCn.default_room_name).toBe(extractValueFromSplitModule(zhModulePath, "default_room_name"));
		expect(zhCn.recover_map_hint).toBe(extractValueFromSplitModule(zhModulePath, "recover_map_hint"));
		expect(result.bundleKind.kind).toBe("hermes-bytecode");
		expect(result.moduleStrategy).toBe("js_modules");
	});

	it("can merge extracted AppPlugin translations into the runtime roborock_strings.json format", () => {
		const tempRoot = registerTempDir();
		const runtimeFile = path.join(tempRoot, "roborock_strings.json");

		fs.writeFileSync(
			runtimeFile,
			JSON.stringify(
				{
					en: {
						existing_key: "Existing value",
						default_room_name: "Keep existing runtime value",
					},
					de: {
						existing_key: "Vorhandener Wert",
					},
				},
				null,
				2,
			),
			"utf8",
		);

		runExtractorForPlugin("Q10 X5+", runtimeFile);

		const runtime = readJson(runtimeFile);

		expect(runtime.en.existing_key).toBe("Existing value");
		expect(runtime.en.default_room_name).toBe("Keep existing runtime value");
		expect(runtime.en.device_ctrl_charge).toBeTypeOf("string");
		expect(runtime.de.existing_key).toBe("Vorhandener Wert");
		expect(runtime.de.device_ctrl_charge).toBeTypeOf("string");
		expect(fs.existsSync(path.join(tempRoot, "meta.json"))).toBe(false);
		expect(fs.existsSync(path.join(tempRoot, "appplugin_translation_meta.json"))).toBe(false);
	});

	it("reports unsupported raw Hermes bundles instead of pretending extraction succeeded", () => {
		const tempRoot = registerTempDir();
		const instanceDir = path.join(tempRoot, "Model B", "raw-only");
		ensureDir(instanceDir);
		fs.writeFileSync(
			path.join(instanceDir, "index.android.bundle"),
			Buffer.concat([Buffer.from("c61fbc03c103191f", "hex"), Buffer.alloc(64)]),
		);

		const instance = extractor.discoverPluginInstances(tempRoot)[0];
		expect(instance).toBeDefined();

		const result = extractor.processPluginInstance(instance, { quiet: true, noWrite: true });

		expect(result.bundleKind.kind).toBe("hermes-bytecode");
		expect(result.translations.size).toBe(0);
		expect(result.issues).toContain(
			"Hermes bytecode bundle detected without a normalized JS surface (js_modules / decompiled / split bundle)",
		);
	});
});
