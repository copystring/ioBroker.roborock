import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { compareQ7FullScenePng } from "../../scripts/lib/q7FullSceneEvidence";

type JsonRecord = Record<string, unknown>;

const repositoryRoot = process.cwd();
const fixtureDirectory = path.join(repositoryRoot, "test", "fixtures", "appplugin");
const l5SemanticPath = path.join(fixtureDirectory, "q7-l5-full-scene-golden.json");
const m5SemanticPath = path.join(fixtureDirectory, "q7-m5-full-scene-golden.json");
const l5VisualPath = path.join(fixtureDirectory, "q7-l5-full-scene-golden.png");
const m5VisualPath = path.join(fixtureDirectory, "q7-m5-full-scene-golden.png");

function readEvidence(filePath: string): JsonRecord {
	return JSON.parse(fs.readFileSync(filePath, "utf8")) as JsonRecord;
}

function normalizedRuntime(evidence: JsonRecord): JsonRecord {
	const runtime = structuredClone(evidence.runtime as JsonRecord);
	runtime.bundleSha256 = "<variant-specific-bundle>";
	return runtime;
}

function mapWithoutColoredViews(evidence: JsonRecord): JsonRecord {
	const map = structuredClone(evidence.map as JsonRecord);
	delete map.coloredViews;
	return map;
}

function coloredViews(evidence: JsonRecord): JsonRecord[] {
	const views = (evidence.map as JsonRecord).coloredViews;
	if (!Array.isArray(views)) throw new Error("Farbige AppPlugin-Views fehlen");
	return views as JsonRecord[];
}

function coloredViewStyles(evidence: JsonRecord): string[] {
	return coloredViews(evidence)
		.map(view => JSON.stringify(Object.fromEntries(
			Object.entries(view).filter(([key]) => key !== "layout" && key !== "measurement"),
		)))
		.sort((left, right) => left.localeCompare(right));
}

describe("Q7 M5 AppPlugin host-contract gate", () => {
	it("keeps the M5 scene and host contract equal to L5 except for the bundle identity", () => {
		const l5 = readEvidence(l5SemanticPath);
		const m5 = readEvidence(m5SemanticPath);

		expect((l5.runtime as JsonRecord).bundleSha256)
			.toBe("9dfd8cc4c3020fe8e2428b3be4ca237b65ba536a4730addcfc29300885361a35");
		expect((m5.runtime as JsonRecord).bundleSha256)
			.toBe("c4136ce753609838415d14264c39e661792c83949f3e9e86d9c463b9bbd19205");
		expect(m5.version).toBe(3);
		expect(l5.version).toBe(3);
		expect(normalizedRuntime(m5)).toStrictEqual(normalizedRuntime(l5));
		expect(m5.hostContract).toStrictEqual(l5.hostContract);
		expect(m5.scene).toStrictEqual(l5.scene);
		expect(mapWithoutColoredViews(m5)).toStrictEqual(mapWithoutColoredViews(l5));
		expect(coloredViewStyles(m5)).toStrictEqual(coloredViewStyles(l5));
		expect(coloredViews(m5).filter((view, index) =>
			JSON.stringify(view) !== JSON.stringify(coloredViews(l5)[index]))).toHaveLength(2);
		const virtualWall = (evidence: JsonRecord): JsonRecord => {
			const view = coloredViews(evidence).find(candidate =>
				candidate.backgroundColor === 872_364_848 && candidate.borderColor === -50_384);
			if (!view) throw new Error("Virtual-Wall-AppPlugin-View fehlt");
			return view;
		};
		expect(virtualWall(l5).measurement).toEqual({ x: 120, y: 515, width: 80, height: 4 });
		expect(virtualWall(m5).measurement).toEqual({ x: 120, y: 493, width: 80, height: 4 });
	});

	it("locks the bundle-specific host render of the virtual wall instead of hiding it behind a tolerance", async () => {
		const comparison = await compareQ7FullScenePng(m5VisualPath, l5VisualPath);

		expect(comparison.differingPixelCount).toBe(984);
		expect(comparison.significantPixelCount).toBe(984);
		expect(comparison.differingBounds).toEqual({ x: 119, y: 492, width: 82, height: 28 });
		expect(comparison.significantBounds).toEqual({ x: 119, y: 492, width: 82, height: 28 });
	});
});
