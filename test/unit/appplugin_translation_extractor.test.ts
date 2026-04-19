import { execFileSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const repoRoot = path.resolve(__dirname, "..", "..");
const scriptPath = path.join(repoRoot, "scripts", "extract_appplugin_translations.js");

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

function ensureDir(dirPath: string): void {
	fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath: string): any {
	return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function buildDictionary(entries: Record<string, string>): Record<string, string> {
	const filler: Record<string, string> = {};
	for (let index = 1; index <= 8; index++) {
		filler[`filler_key_${index}`] = `filler value ${index}`;
	}
	return {
		...filler,
		...entries,
	};
}

function toJsonObjectLiteral(dictionary: Record<string, string>): string {
	return JSON.stringify(dictionary, null, 2);
}

function createMetroBundleModule(moduleId: number, deps: number[], body: string): string {
	return `__d(function(g,r,i,a,m,e,d){\n${body}\n}, ${moduleId}, ${JSON.stringify(deps)});`;
}

function writeMetroPluginFixture(options: {
	rootDir: string;
	modelName: string;
	instanceName: string;
	languages: Array<{ language: string; moduleId: number; dictionary: Record<string, string> }>;
	bundleKind?: "metro-js" | "hermes-bytecode";
	useJsModules?: boolean;
}): {
	rootDir: string;
	instanceDir: string;
	instanceId: string;
	bundlePath: string;
	modulePaths: Record<string, string>;
} {
	const { rootDir, modelName, instanceName, languages, bundleKind = "metro-js", useJsModules = false } = options;
	const instanceDir = path.join(rootDir, modelName, instanceName);
	const instanceId = `${modelName}/${instanceName}`.replace(/\\/g, "/");
	ensureDir(instanceDir);

	const bundlePath = path.join(instanceDir, "index.android.bundle");
	if (bundleKind === "hermes-bytecode") {
		fs.writeFileSync(bundlePath, Buffer.concat([Buffer.from("c61fbc03c103191f", "hex"), Buffer.alloc(64)]));
	} else {
		const registryEntries = [
			`${languages[0]?.language ?? "en"}: lang0`,
			`${languages[1]?.language ?? "de"}: lang1`,
			"fr: lang0",
			"es: lang0",
			"it: lang0",
		];
		const registryModule = createMetroBundleModule(
			5000,
			languages.slice(0, 2).map((entry) => entry.moduleId),
			[
				"var lang0 = r(d[0]);",
				"var lang1 = r(d[1]);",
				`var allLangs={ ${registryEntries.join(", ")} };`,
				"m.exports = allLangs;",
			].join("\n"),
		);
		const metroModules = languages.map((entry) =>
			createMetroBundleModule(
				entry.moduleId,
				[],
				`m.exports = ${toJsonObjectLiteral(entry.dictionary)};`,
			),
		);
		fs.writeFileSync(
			bundlePath,
			[
				"var __BUNDLE_START_TIME__ = Date.now();",
				...metroModules,
				registryModule,
				"",
			].join("\n"),
			"utf8",
		);
	}

	const modulePaths: Record<string, string> = {};
	if (useJsModules) {
		const jsModulesDir = path.join(instanceDir, "js_modules");
		ensureDir(jsModulesDir);
		for (const entry of languages) {
			const filePath = path.join(jsModulesDir, `module_${String(entry.moduleId).padStart(4, "0")}.js`);
			fs.writeFileSync(
				filePath,
				[
					`// moduleId: ${entry.moduleId}`,
					"// deps: []",
					"",
					`module.exports = ${JSON.stringify({ [entry.language]: entry.dictionary }, null, 2)};`,
					"",
				].join("\n"),
				"utf8",
			);
			modulePaths[entry.language] = filePath;
		}
	}

	return {
		rootDir,
		instanceDir,
		instanceId,
		bundlePath,
		modulePaths,
	};
}

function runExtractorForPlugin(rootDir: string, pluginName: string, outputPath: string, extraArgs: string[] = []): void {
	execFileSync(
		process.execPath,
		[scriptPath, "--root", rootDir, "--plugin", pluginName, "--out", outputPath, ...extraArgs],
		{
			cwd: repoRoot,
			stdio: "pipe",
		},
	);
}

function extractValueFromMetroModule(bundlePath: string, moduleId: number, key: string, language: string): string {
	const source = fs.readFileSync(bundlePath, "utf8");
	const moduleEntry = extractor.findMetroModuleByIdInBundle(source, moduleId, bundlePath);
	expect(moduleEntry, `Expected to find Metro module ${moduleId} in ${bundlePath}`).not.toBeNull();

	const literal =
		extractor.extractTranslationObjectLiteral(moduleEntry!.code) ||
		extractor.extractLanguagePropertyObjectLiteral(moduleEntry!.code, language);
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
		const tempRoot = registerTempDir();
		const metroFixture = writeMetroPluginFixture({
			rootDir: tempRoot,
			modelName: "Qrevo Curv",
			instanceName: "2e158bfb3b5d454d8d9b6d8fb6136308",
			languages: [
				{
					language: "en",
					moduleId: 101,
					dictionary: buildDictionary({
						default_room_name: "Room",
						recover_map_hint: "Recover map hint",
					}),
				},
				{
					language: "de",
					moduleId: 102,
					dictionary: buildDictionary({
						default_room_name: "Raum",
						recover_map_hint: "Kartenhinweis",
					}),
				},
			],
		});
		const hermesFixture = writeMetroPluginFixture({
			rootDir: tempRoot,
			modelName: "Saros Z70",
			instanceName: "4d3ae9e297c84a7e80a23ffe4f78a59e",
			bundleKind: "hermes-bytecode",
			useJsModules: true,
			languages: [
				{
					language: "zh-CN",
					moduleId: 480,
					dictionary: buildDictionary({
						default_room_name: "房间",
						recover_map_hint: "恢复地图后需要重新配置。",
					}),
				},
			],
		});

		expect(extractor.detectBundleKind(metroFixture.bundlePath)).toMatchObject({
			kind: "metro-js",
			reason: expect.stringContaining("Metro"),
		});
		expect(extractor.detectBundleKind(hermesFixture.bundlePath)).toMatchObject({
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
		const tempRoot = registerTempDir();
		const outputDir = registerTempDir();
		const fixture = writeMetroPluginFixture({
			rootDir: tempRoot,
			modelName: "Qrevo Curv",
			instanceName: "2e158bfb3b5d454d8d9b6d8fb6136308",
			languages: [
				{
					language: "en",
					moduleId: 101,
					dictionary: buildDictionary({
						default_room_name: "Room",
						recover_map_hint: "After restore you must recreate schedules.",
					}),
				},
				{
					language: "de",
					moduleId: 102,
					dictionary: buildDictionary({
						default_room_name: "Raum",
						recover_map_hint: "Nach der Wiederherstellung müssen Zeitpläne neu angelegt werden.",
					}),
				},
			],
		});

		runExtractorForPlugin(tempRoot, "Qrevo Curv", outputDir);
		const instance = extractor.discoverPluginInstances(tempRoot, "Qrevo Curv")[0];
		const result = extractor.processPluginInstance(instance, { quiet: true, noWrite: true });

		const en = readJson(path.join(outputDir, "en.json"));

		expect(en.default_room_name).toBe(
			extractValueFromMetroModule(fixture.bundlePath, 101, "default_room_name", "en"),
		);
		expect(en.recover_map_hint).toBe(
			extractValueFromMetroModule(fixture.bundlePath, 101, "recover_map_hint", "en"),
		);
		expect(result.bundleKind.kind).toBe("metro-js");
		expect(result.moduleStrategy).toBe("metro_bundle");
		expect(fs.existsSync(path.join(outputDir, "meta.json"))).toBe(false);
	});

	it("extracts Q10 X5+ translations from a direct Metro bundle and matches the original source", () => {
		const tempRoot = registerTempDir();
		const outputDir = registerTempDir();
		const fixture = writeMetroPluginFixture({
			rootDir: tempRoot,
			modelName: "Q10 X5+",
			instanceName: "019bdf41f583723bb937ccc99bbd7541",
			languages: [
				{
					language: "en",
					moduleId: 1598,
					dictionary: buildDictionary({
						device_ctrl_charge: "Charge",
						device_state_remoting: "Remote control",
					}),
				},
				{
					language: "de",
					moduleId: 1600,
					dictionary: buildDictionary({
						device_ctrl_charge: "Laden",
						device_state_remoting: "Fernsteuerung",
					}),
				},
			],
		});
		const instanceId = "Q10 X5+/019bdf41f583723bb937ccc99bbd7541";

		runExtractorForPlugin(tempRoot, instanceId, outputDir);
		const instance = extractor.discoverPluginInstances(tempRoot, instanceId)[0];
		const result = extractor.processPluginInstance(instance, { quiet: true, noWrite: true });

		const en = readJson(path.join(outputDir, "en.json"));
		const de = readJson(path.join(outputDir, "de.json"));

		expect(en.device_ctrl_charge).toBe(
			extractValueFromMetroModule(fixture.bundlePath, 1598, "device_ctrl_charge", "en"),
		);
		expect(en.device_state_remoting).toBe(
			extractValueFromMetroModule(fixture.bundlePath, 1598, "device_state_remoting", "en"),
		);
		expect(de.device_ctrl_charge).toBe(
			extractValueFromMetroModule(fixture.bundlePath, 1600, "device_ctrl_charge", "de"),
		);
		expect(result.bundleKind.kind).toBe("metro-js");
		expect(result.moduleStrategy).toBe("metro_bundle");
		expect(result.issues).toEqual([]);
	});

	it("extracts Saros Z70 translations through the CLI and matches the split Hermes module", { timeout: 15000 }, () => {
		const tempRoot = registerTempDir();
		const outputDir = registerTempDir();
		const fixture = writeMetroPluginFixture({
			rootDir: tempRoot,
			modelName: "Saros Z70",
			instanceName: "4d3ae9e297c84a7e80a23ffe4f78a59e",
			bundleKind: "hermes-bytecode",
			useJsModules: true,
			languages: [
				{
					language: "zh-CN",
					moduleId: 480,
					dictionary: buildDictionary({
						default_room_name: "房间",
						recover_map_hint: "恢复地图后，相关配置需要重新设置。",
					}),
				},
			],
		});

		runExtractorForPlugin(tempRoot, "Saros Z70", outputDir);
		const instance = extractor.discoverPluginInstances(tempRoot, "Saros Z70")[0];
		const result = extractor.processPluginInstance(instance, { quiet: true, noWrite: true });

		const zhCn = readJson(path.join(outputDir, "zh-CN.json"));

		expect(zhCn.default_room_name).toBe("房间");
		expect(zhCn.recover_map_hint).toBe("恢复地图后，相关配置需要重新设置。");
		expect(fs.readFileSync(fixture.modulePaths["zh-CN"], "utf8")).toContain('"default_room_name": "房间"');
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

		writeMetroPluginFixture({
			rootDir: tempRoot,
			modelName: "Q10 X5+",
			instanceName: "019bdf41f583723bb937ccc99bbd7541",
			languages: [
				{
					language: "en",
					moduleId: 1598,
					dictionary: buildDictionary({
						device_ctrl_charge: "Charge",
						device_state_remoting: "Remote control",
					}),
				},
				{
					language: "de",
					moduleId: 1600,
					dictionary: buildDictionary({
						device_ctrl_charge: "Laden",
						device_state_remoting: "Fernsteuerung",
					}),
				},
			],
		});

		runExtractorForPlugin(tempRoot, "Q10 X5+", runtimeFile);

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
