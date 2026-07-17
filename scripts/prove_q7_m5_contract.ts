import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
	compareQ7FullScenePng,
	jsonRecord,
	sha256File,
} from "./lib/q7FullSceneEvidence";

type JsonRecord = Record<string, unknown>;

const repositoryRoot = process.cwd();
const fixtureDirectory = path.join(repositoryRoot, "test", "fixtures", "appplugin");
const l5BundlePath = path.join(
	repositoryRoot,
	".AppPlugins",
	"Q7 L5",
	"019a00a9af4b7b8e894080040a2793a5",
	"index.android.bundle",
);
const m5BundlePath = path.join(
	repositoryRoot,
	".AppPlugins",
	"Q7 M5",
	"019b4e09d7ce7c6abedbb789d2be681d",
	"index.android.bundle",
);
const l5SemanticPath = path.join(fixtureDirectory, "q7-l5-full-scene-golden.json");
const m5SemanticPath = path.join(fixtureDirectory, "q7-m5-full-scene-golden.json");
const l5VisualPath = path.join(fixtureDirectory, "q7-l5-full-scene-golden.png");
const m5VisualPath = path.join(fixtureDirectory, "q7-m5-full-scene-golden.png");
const outputPath = path.join(
	repositoryRoot,
	"artifacts",
	"appplugin-poc",
	"runtime-probes",
	"q7-m5-contract-proof.json",
);

function readEvidence(filePath: string): JsonRecord {
	return jsonRecord(JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown, path.basename(filePath));
}

function normalizedRuntime(evidence: JsonRecord): JsonRecord {
	const runtime = structuredClone(jsonRecord(evidence.runtime, "Evidence-Runtime"));
	runtime.bundleSha256 = "<variant-specific-bundle>";
	return runtime;
}

function mapWithoutColoredViews(evidence: JsonRecord): JsonRecord {
	const map = structuredClone(jsonRecord(evidence.map, "Evidence-Karte"));
	delete map.coloredViews;
	return map;
}

function coloredViewLayoutGroups(evidence: JsonRecord): Map<string, string[]> {
	const map = jsonRecord(evidence.map, "Evidence-Karte");
	const groups = new Map<string, string[]>();
	for (const value of (Array.isArray(map.coloredViews) ? map.coloredViews : [])) {
		const view = jsonRecord(value, "Farbige View");
		const style = Object.fromEntries(
			Object.entries(view).filter(([key]) => key !== "layout" && key !== "measurement"),
		);
		const styleKey = JSON.stringify(style);
		const layouts = groups.get(styleKey) ?? [];
		layouts.push(JSON.stringify({ layout: view.layout, measurement: view.measurement }));
		groups.set(styleKey, layouts);
	}
	for (const layouts of groups.values()) layouts.sort((left, right) => left.localeCompare(right));
	return groups;
}

function compareColoredViewLayouts(l5Evidence: JsonRecord, m5Evidence: JsonRecord): number {
	const l5Groups = coloredViewLayoutGroups(l5Evidence);
	const m5Groups = coloredViewLayoutGroups(m5Evidence);
	assert.deepStrictEqual(
		[...m5Groups.keys()].sort(),
		[...l5Groups.keys()].sort(),
		"Die AppPlugin-Varianten verwenden unterschiedliche farbige View-Typen/-Stile",
	);
	let differingLayoutCount = 0;
	for (const [style, l5Layouts] of l5Groups) {
		const m5Layouts = m5Groups.get(style);
		assert.ok(m5Layouts, `M5-Layoutgruppe fehlt: ${style}`);
		assert.equal(m5Layouts.length, l5Layouts.length, `M5-Layoutanzahl weicht ab: ${style}`);
		for (let index = 0; index < l5Layouts.length; index += 1) {
			if (l5Layouts[index] !== m5Layouts[index]) differingLayoutCount += 1;
		}
	}
	return differingLayoutCount;
}

async function main(): Promise<void> {
	for (const requiredPath of [
		l5BundlePath,
		m5BundlePath,
		l5SemanticPath,
		m5SemanticPath,
		l5VisualPath,
		m5VisualPath,
	]) {
		if (!fs.existsSync(requiredPath)) throw new Error(`Q7-M5-Vertragsdatei fehlt: ${requiredPath}`);
	}

	const l5Evidence = readEvidence(l5SemanticPath);
	const m5Evidence = readEvidence(m5SemanticPath);
	const l5Runtime = jsonRecord(l5Evidence.runtime, "L5-Runtime");
	const m5Runtime = jsonRecord(m5Evidence.runtime, "M5-Runtime");
	const l5BundleSha256 = sha256File(l5BundlePath);
	const m5BundleSha256 = sha256File(m5BundlePath);
	assert.equal(l5Runtime.bundleSha256, l5BundleSha256, "L5-Golden gehört nicht zum unveränderten L5-Bundle");
	assert.equal(m5Runtime.bundleSha256, m5BundleSha256, "M5-Golden gehört nicht zum unveränderten M5-Bundle");
	assert.notEqual(l5BundleSha256, m5BundleSha256, "L5 und M5 müssen tatsächlich unterschiedliche Bundles sein");

	assert.equal(m5Evidence.version, 3);
	assert.equal(l5Evidence.version, 3);
	assert.deepStrictEqual(normalizedRuntime(m5Evidence), normalizedRuntime(l5Evidence));
	assert.deepStrictEqual(m5Evidence.hostContract, l5Evidence.hostContract);
	assert.deepStrictEqual(m5Evidence.scene, l5Evidence.scene);
	assert.deepStrictEqual(mapWithoutColoredViews(m5Evidence), mapWithoutColoredViews(l5Evidence));
	const bundleSpecificColoredViewLayoutCount = compareColoredViewLayouts(l5Evidence, m5Evidence);
	assert.equal(
		bundleSpecificColoredViewLayoutCount,
		2,
		"Erwartet werden genau die zwei originalen, variantenspezifischen Virtual-Wall-Layouts",
	);

	const visual = await compareQ7FullScenePng(m5VisualPath, l5VisualPath);
	assert.equal(visual.differingPixelCount, 984);
	assert.equal(visual.significantPixelCount, 984);
	assert.deepStrictEqual(visual.differingBounds, { x: 119, y: 492, width: 82, height: 28 });
	assert.deepStrictEqual(visual.significantBounds, { x: 119, y: 492, width: 82, height: 28 });

	const proof = {
		version: 1,
		status: "passed",
		generatedAt: new Date().toISOString(),
		appPluginFirst: true,
		bundles: {
			l5: { sha256: l5BundleSha256, unchanged: true },
			m5: { sha256: m5BundleSha256, unchanged: true },
		},
		semantic: {
			runtimeExactExceptBundleSha256: true,
			hostContractExact: true,
			mapAndSceneExactExceptColoredViewLayouts: true,
			coloredViewStyleInventoryExact: true,
			bundleSpecificColoredViewLayoutCount,
			l5GoldenSha256: sha256File(l5SemanticPath),
			m5GoldenSha256: sha256File(m5SemanticPath),
		},
		visual,
	};
	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, `${JSON.stringify(proof, null, 2)}\n`, "utf8");
	process.stdout.write(`${JSON.stringify(proof)}\n`);
}

void main().catch(error => {
	process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
	process.exitCode = 1;
});
