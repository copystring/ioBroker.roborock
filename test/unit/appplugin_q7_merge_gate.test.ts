import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const repositoryRoot = process.cwd();
const fixtureDirectory = path.join(repositoryRoot, "test", "fixtures", "appplugin");
const scenarios = [
	"selection",
	"success",
	"multi-success",
	"non-adjacent",
	"single-room",
	"device-error",
	"device-timeout",
	"cancel",
] as const;

function loadFixture(scenario: typeof scenarios[number]): Record<string, unknown> {
	return JSON.parse(fs.readFileSync(
		path.join(fixtureDirectory, `q7-l5-room-merge-${scenario}.json`),
		"utf8",
	)) as Record<string, unknown>;
}

describe("Q7 AppPlugin room-merge gate", () => {
	it("keeps every replay capture-only and free of host-built merge payloads", () => {
		for (const scenario of scenarios) {
			const fixture = loadFixture(scenario);
			const serialized = JSON.stringify(fixture);
			expect(fixture).toMatchObject({ version: 1, viewport: { width: 360, height: 800 } });
			expect(serialized).not.toMatch(/service\.arrange_room|publishDps|room_ids|roomMatrix|localKey|b01/iu);
			expect(fixture.events).toEqual(expect.arrayContaining([
				expect.objectContaining({ kind: "assert", rawTextIncludes: expect.arrayContaining(["Zusammenführen"]) }),
			]));
		}
	});

	it("locks minimum count, connected-set validation, multi-room support, failures, and discard", () => {
		const assertedTexts = (scenario: typeof scenarios[number]): string[] =>
			(loadFixture(scenario).events as Array<Record<string, unknown>>)
				.filter(event => event.kind === "assert")
				.flatMap(event => event.rawTextIncludes as string[] ?? []);

		expect(assertedTexts("non-adjacent")).toContain("Wähle einen benachbarten Bereich aus");
		expect(assertedTexts("single-room")).toContain("Wähle einen benachbarten Bereich aus");
		expect(assertedTexts("device-error")).toContain("Zusammenführen fehlgeschlagen");
		expect(assertedTexts("device-timeout")).toContain("Zeitüberschreitung bei Vorgang");
		expect(assertedTexts("cancel")).toEqual(expect.arrayContaining([
			"Änderungen verwerfen?",
			"Abbrechen",
			"Verwerfen",
		]));
	});

	it("exposes one reproducible gate command for all eight fresh AppPlugin sessions", () => {
		const scripts = (JSON.parse(fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8")) as {
			scripts: Record<string, string>;
		}).scripts;
		const command = scripts["poc:appplugin-q7-merge-proof"];
		expect(command).toContain("scripts/prove_q7_appplugin_merge.ts");
		for (const scenario of scenarios) expect(command).toContain(`q7-l5-room-merge-${scenario}.json`);
	});
});
