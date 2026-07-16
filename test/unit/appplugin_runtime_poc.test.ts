import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const { MetroSplitRuntime, MissingMetroModuleError } = require("../../scripts/lib/metro_split_runtime.js");
const { runQ10AppPluginProof } = require("../../scripts/lib/q10_appplugin_poc.js");

const tempDirs: string[] = [];

function createSplit(modules: Array<{ id: number; deps: number[]; source: string }>): string {
	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rr-metro-runtime-"));
	tempDirs.push(tempDir);
	const moduleDir = path.join(tempDir, "modules");
	fs.mkdirSync(moduleDir);
	const manifest = modules.map(({ id, deps }) => ({ moduleId: id, deps, file: `module_${id}.js` }));
	fs.writeFileSync(path.join(tempDir, "modules.json"), JSON.stringify(manifest), "utf8");
	for (const module of modules) {
		fs.writeFileSync(path.join(moduleDir, `module_${module.id}.js`), module.source, "utf8");
	}
	return tempDir;
}

afterEach(() => {
	for (const tempDir of tempDirs.splice(0)) {
		fs.rmSync(tempDir, { recursive: true, force: true });
	}
});

describe("MetroSplitRuntime", () => {
	it("executes original Metro factory shape and resolves its dependency map", () => {
		const splitDir = createSplit([
			{ id: 10, deps: [], source: "(function(g,r,i,a,m,e,d){ e.value = 41; })" },
			{ id: 11, deps: [10], source: "(function(g,r,i,a,m,e,d){ e.answer = r(d[0]).value + 1; })" }
		]);
		const runtime = new MetroSplitRuntime({ splitDir });

		expect(runtime.require(11)).toEqual({ answer: 42 });
		expect(runtime.trace.filter((entry: { type: string }) => entry.type === "module")).toHaveLength(2);
	});

	it("reports host-provided Metro modules as an explicit missing capability", () => {
		const splitDir = createSplit([
			{ id: 11, deps: [1], source: "(function(g,r,i,a,m,e,d){ e.answer = r(d[0]); })" }
		]);
		const runtime = new MetroSplitRuntime({ splitDir });

		expect(() => runtime.require(11)).toThrow(MissingMetroModuleError);
		expect(() => runtime.require(11)).toThrow(/not listed in modules\.json.*Load stack: 11/u);
	});
});

const repoRoot = path.resolve(__dirname, "..", "..");
const q10SplitDir = path.join(repoRoot, ".AppPlugins", "Q10", "019bdf41f583723bb937ccc99bbd7541", "metro_bundle_split");
const originalPluginIt = fs.existsSync(path.join(q10SplitDir, "modules", "module_0940.js")) ? it : it.skip;

describe("Q10 original AppPlugin proof", () => {
	originalPluginIt("executes command and room-color modules through the headless bridge", async () => {
		const proof = await runQ10AppPluginProof({ repoRoot });

		expect(proof.capturedDps).toEqual([
			{ "201": { cmd: 1 } },
			{
				"201": {
					cmd: 2,
					clean_paramters: {
						room_id_list: [16, 17],
						clean_count: 1,
						fan_level: 2,
						water_level: 2
					}
				}
			},
			{ "202": 5 }
		]);
		expect(proof.invokedPluginCommands).toEqual(["startClean", "startElectoralClean", "goCharge"]);
		expect(proof.palettes.lightTheme.normal.map((color: { hex: string }) => color.hex)).toEqual([
			"#bcdafcff",
			"#fae59eff",
			"#fac6b6ff",
			"#73ebe6ff"
		]);
		expect(proof.hostErrors).toEqual([]);
		expect(proof.loadedOriginalModules).toEqual(expect.arrayContaining([940, 952, 981]));
	});
});
