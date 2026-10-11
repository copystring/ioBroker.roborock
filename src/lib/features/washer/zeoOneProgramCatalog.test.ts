import { describe, expect, it } from "vitest";
import { buildZeoOneSavedProgram, getZeoOneProgramCatalog, zeoOneProgramCatalog } from "./zeoOneProgramCatalog";

describe("Zeo One saved program catalog", () => {
	it("uses the default-region Mixed Wash chart defaults and never starts", () => {
		const payload = buildZeoOneSavedProgram({ mode: 1, program: 1 });
		expect(payload).toEqual({ "204": 1, "205": 1, "207": 2, "208": 2, "209": 5, "221": 1 });
		expect(payload).not.toHaveProperty("200");
	});

	it("rejects explicit settings absent from the original chart", () => {
		expect(() => buildZeoOneSavedProgram({ mode: 1, program: 1, temperatureLevel: 5 })).toThrow(
			"Unsupported Zeo One program option: temperatureLevel",
		);
	});

	it("uses the country-specific chart and falls back for unknown locations", () => {
		expect(() => buildZeoOneSavedProgram({ mode: 1, program: 1, spinLevel: 7 }, "us")).toThrow(
			"Unsupported Zeo One program option: spinLevel",
		);
		expect(buildZeoOneSavedProgram({ mode: 1, program: 1, spinLevel: 7 }, "kr")["209"]).toBe(7);
	});

	it("maps drying chart level 1 to DP value 2 and applies a non-null default", () => {
		expect(buildZeoOneSavedProgram({ mode: 3, program: 1, dryingLevel: 1 })["210"]).toBe(2);
		expect(buildZeoOneSavedProgram({ mode: 3, program: 1 })["210"]).toBe(1);
	});

	it("uses the full original HomePageModes chart, excludes CloudProgram, and retains is_in_app metadata", () => {
		expect(buildZeoOneSavedProgram({ mode: 1, program: 33 })["205"]).toBe(33);
		expect(() => buildZeoOneSavedProgram({ mode: 1, program: 6 })).toThrow(
			"Unsupported Zeo One program for mode and region",
		);
		const wool = zeoOneProgramCatalog.default.find((program) => program.mode === 1 && program.program === 4);
		expect(wool?.isInApp).toBe(false);
		expect(buildZeoOneSavedProgram({ mode: 1, program: 4 })["205"]).toBe(4);
		expect(getZeoOneProgramCatalog("jp")).toBe(zeoOneProgramCatalog.jp);
		expect(getZeoOneProgramCatalog("unknown")).toBe(zeoOneProgramCatalog.default);
	});

	it("rejects unknown input fields", () => {
		expect(() => buildZeoOneSavedProgram({ mode: 1, program: 1, soak: 0 })).toThrow(
			"Unknown Zeo One program field: soak",
		);
	});
});
