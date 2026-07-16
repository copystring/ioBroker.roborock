import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const repositoryRoot = process.cwd();
const fixtureDirectory = path.join(repositoryRoot, "test", "fixtures", "appplugin");
const scenarios = [
	"line-visible",
	"success",
	"small-area",
	"device-error",
	"device-timeout",
	"invalid-line",
	"cancel",
] as const;

function loadFixture(scenario: typeof scenarios[number]): Record<string, unknown> {
	return JSON.parse(fs.readFileSync(
		path.join(fixtureDirectory, `q7-l5-room-split-${scenario}.json`),
		"utf8",
	)) as Record<string, unknown>;
}

describe("Q7 AppPlugin room-split gate", () => {
	it("keeps every replay capture-only and free of host-built split payloads", () => {
		for (const scenario of scenarios) {
			const fixture = loadFixture(scenario);
			const serialized = JSON.stringify(fixture);
			expect(fixture).toMatchObject({ version: 1, viewport: { width: 360, height: 800 } });
			expect(serialized).not.toMatch(/service\.split_room|publishDps|split_points|localKey|b01/iu);
			expect(fixture.events).toEqual(expect.arrayContaining([
				expect.objectContaining({ kind: "assert", rawTextIncludes: expect.arrayContaining(["Unterteilen"]) }),
			]));
		}
	});

	it("locks localized success, device-result, wall-boundary, and discard behavior", () => {
		const assertedTexts = (scenario: typeof scenarios[number]): string[] =>
			(loadFixture(scenario).events as Array<Record<string, unknown>>)
				.filter(event => event.kind === "assert")
				.flatMap(event => event.rawTextIncludes as string[] ?? []);

		expect(assertedTexts("small-area")).toContain("Teilen fehlgeschlagen. Geteilte Bereiche zu klein.");
		expect(assertedTexts("device-error")).toContain("Unterteilung fehlgeschlagen");
		expect(assertedTexts("device-timeout")).toContain("Zeitüberschreitung bei Vorgang");
		expect(assertedTexts("invalid-line")).toEqual(expect.arrayContaining([
			"Die beiden Enden der Trennlinie sollten möglichst nahe an den Wänden des Raums sein.",
			"Ziehe eine Linie durch den ausgewählten Raum.",
		]));
		expect(assertedTexts("cancel")).toEqual(expect.arrayContaining([
			"Änderungen verwerfen?",
			"Abbrechen",
			"Verwerfen",
		]));
	});

	it("exposes one reproducible gate command for all seven fresh AppPlugin sessions", () => {
		const scripts = (JSON.parse(fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8")) as {
			scripts: Record<string, string>;
		}).scripts;
		const command = scripts["poc:appplugin-q7-split-proof"];
		expect(command).toContain("scripts/prove_q7_appplugin_split.ts");
		for (const scenario of scenarios) expect(command).toContain(`q7-l5-room-split-${scenario}.json`);
	});
});