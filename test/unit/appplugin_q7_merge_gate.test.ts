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
			const events = fixture.events as Array<Record<string, unknown>>;
			expect(fixture).toMatchObject({ version: 1, viewport: { width: 360, height: 800 } });
			expect(serialized).not.toMatch(/service\.arrange_room|publishDps|room_ids|roomMatrix|localKey|b01/iu);
			expect(events).toEqual(expect.arrayContaining([
				expect.objectContaining({ kind: "assert", rawTextIncludes: expect.arrayContaining(["Zusammenführen"]) }),
			]));
			const onboardingIndex = events.findIndex(event =>
				event.kind === "assert"
				&& (event.rawTextIncludes as string[] | undefined)?.includes(
					"Du kannst mehrere benachbarte Räume zusammenführen",
				));
			const closeIndex = events.findIndex(event =>
				event.kind === "down" && event.x === 331 && event.y === 411);
			const firstRoomIndex = events.findIndex((event, index) =>
				index > closeIndex
				&& event.kind === "down"
				&& [108, 228, 308].includes(event.x as number));
			expect(onboardingIndex).toBeGreaterThan(-1);
			expect(closeIndex).toBeGreaterThan(onboardingIndex);
			expect(firstRoomIndex).toBeGreaterThan(closeIndex);
			expect([407, 463]).toContain(events[firstRoomIndex].y);
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

	it("exposes one shared eight-scenario suite for the L5 and M5 AppPlugins", () => {
		const scripts = (JSON.parse(fs.readFileSync(path.join(repositoryRoot, "package.json"), "utf8")) as {
			scripts: Record<string, string>;
		}).scripts;
		const suiteSource = fs.readFileSync(
			path.join(repositoryRoot, "scripts", "run_q7_appplugin_merge_suite.ts"),
			"utf8",
		);
		const l5Command = scripts["poc:appplugin-q7-merge-proof"];
		const m5Command = scripts["poc:appplugin-q7-m5-merge-proof"];
		for (const command of [l5Command, m5Command]) {
			expect(command).toContain("scripts/prove_q7_appplugin_merge.ts");
			expect(command).toContain("scripts/run_q7_appplugin_merge_suite.ts");
		}
		expect(l5Command).toContain("--profile l5");
		expect(m5Command).toContain("--profile m5");
		expect(suiteSource).toContain("unchanged Q7 L5 Hermes AppPlugin");
		expect(suiteSource).toContain("unchanged Q7 M5 Hermes AppPlugin");
		for (const scenario of scenarios) {
			expect(suiteSource).toContain(`fixtureSuffix: "${scenario}"`);
		}
	});
});
