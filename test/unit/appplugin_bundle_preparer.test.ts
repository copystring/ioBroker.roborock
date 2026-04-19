import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const repoRoot = path.resolve(__dirname, "..", "..");
const prepareScriptPath = path.join(repoRoot, "scripts", "prepare_appplugin_bundles.js");

const preparer = require(prepareScriptPath) as {
	detectJsSurfaceKind: (filePath: string) => { kind: string; reason: string };
	ensureHermesDecompilerAvailable: () => { ok: boolean; error?: string };
	preparePluginInstances: (
		rootDir: string,
		options?: {
			plugin?: string;
			quiet?: boolean;
			force?: boolean;
			noWrite?: boolean;
			hermesDecompilerCmd?: string;
		},
	) => Array<{
		instanceId: string;
		action: string;
		outputDir: string | null;
		issues: string[];
		bundleKind: { kind: string; reason: string };
	}>;
};

const tempDirs: string[] = [];

function registerTempDir(): string {
	const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rr-appplugin-prepare-"));
	tempDirs.push(tempDir);
	return tempDir;
}

function ensureDir(dirPath: string): void {
	fs.mkdirSync(dirPath, { recursive: true });
}

afterEach(() => {
	for (const tempDir of tempDirs.splice(0)) {
		fs.rmSync(tempDir, { recursive: true, force: true });
	}
	delete process.env.ROBOROCK_APPPLUGINS_NO_AUTO_INSTALL;
});

describe("prepare_appplugin_bundles", () => {
	it("splits direct Metro bundles into metro_bundle_split/modules", () => {
		const tempRoot = registerTempDir();
		const instanceDir = path.join(tempRoot, "Model A", "abc123");
		const outputDir = path.join(instanceDir, "metro_bundle_split", "modules");
		ensureDir(instanceDir);

		fs.writeFileSync(
			path.join(instanceDir, "index.android.bundle"),
			[
				"var __BUNDLE_START_TIME__ = Date.now();",
				"__d(function(g,r,i,a,m,e,d){ e.answer = 1; }, 0, []);",
				'__d(function(g,r,i,a,m,e,d){ m.exports = { hello: "world" }; }, 1, [0]);',
				"",
			].join("\n"),
			"utf8",
		);

		const firstRun = preparer.preparePluginInstances(tempRoot, { quiet: true });
		expect(firstRun).toHaveLength(1);
		expect(firstRun[0]).toMatchObject({
			instanceId: "Model A/abc123",
			action: "split-metro-bundle",
			outputDir,
			issues: [],
			bundleKind: { kind: "metro-js" },
		});
		expect(fs.existsSync(path.join(outputDir, "module_0000.js"))).toBe(true);
		expect(fs.existsSync(path.join(outputDir, "module_0001.js"))).toBe(true);
		expect(fs.readFileSync(path.join(outputDir, "module_0001.js"), "utf8")).toContain("Metro module 1");

		const secondRun = preparer.preparePluginInstances(tempRoot, { quiet: true });
		expect(secondRun[0].action).toBe("skip-existing-metro-split");
	});

	it("detects decompiled Hermes JS surfaces", () => {
		const tempRoot = registerTempDir();
		const filePath = path.join(tempRoot, "index.android.bundle.js");
		fs.writeFileSync(
			filePath,
			[
				"r1 = r0.__d;",
				"r2 = function(g, r, i, a, m, e, d) {",
				"    e.en = {",
				"        hello: 'world'",
				"    };",
				"}",
				"r3 = 1;",
				"r4 = [];",
				"r5 = r1.bind(r0)(r2, r3, r4);",
				"",
			].join("\n"),
			"utf8",
		);

		expect(preparer.detectJsSurfaceKind(filePath)).toMatchObject({
			kind: "hermes-decompiled-js",
		});
	});

	it("reports invalid Hermes bundles cleanly when automatic decompilation cannot recover them", () => {
		process.env.ROBOROCK_APPPLUGINS_NO_AUTO_INSTALL = "1";
		const tempRoot = registerTempDir();
		const instanceDir = path.join(tempRoot, "Model B", "raw-only");
		ensureDir(instanceDir);

		fs.writeFileSync(
			path.join(instanceDir, "index.android.bundle"),
			Buffer.concat([Buffer.from("c61fbc03c103191f", "hex"), Buffer.alloc(64)]),
		);

		const results = preparer.preparePluginInstances(tempRoot, { quiet: true });
		expect(results).toHaveLength(1);
		expect(results[0]).toMatchObject({
			instanceId: "Model B/raw-only",
			action: "unsupported-hermes-bytecode",
			bundleKind: { kind: "hermes-bytecode" },
		});
		expect(results[0].issues.join("\n")).toMatch(/auto-install disabled|Hermes decompiler failed|no usable JS surface/i);
	});

	it("can disable automatic Hermes tool installation explicitly", () => {
		process.env.ROBOROCK_APPPLUGINS_NO_AUTO_INSTALL = "1";
		const result = preparer.ensureHermesDecompilerAvailable();
		if (result.ok) {
			expect(result.ok).toBe(true);
			return;
		}

		expect(result.error).toMatch(/auto-install disabled/i);
	});
});
