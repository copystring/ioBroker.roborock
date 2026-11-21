import { describe, expect, it } from "vitest";
import { bundleControlV1Schema } from "./bundleControlV1";

const suction = {
	schemaVersion: 1,
	source: { model: "roborock.vacuum.a147", bundleVersion: 6006, locale: "de" },
	id: null,
	idCandidate: { value: "CleanModeSettingView__localization_strings_Setting_CleanModePage_5", derivedFrom: ["view.name", "title.key"], status: "candidate", uniqueness: "not_verified" },
	view: { name: "CleanModeSettingView", evidence: "bundle_code" },
	title: { key: "localization_strings_Setting_CleanModePage_5", text: "Saugleistung", evidence: "bundle_code_and_translation" },
	placements: [{
		menuPath: [{ kind: "tab", text: "Saugen" }], valueType: "number",
		options: [{ value: 101, label: "Leise" }, { value: 102, label: "Normal" }, { value: 103, label: "Turbo" }, { value: 104, label: "Max." }, { value: 108, label: "MAX+" }],
		evidence: "offline_bundle_run_for_model_and_tab",
	}],
	value: { current: null, status: "not_measured" },
	action: { handler: "handleCleanModeChange", handlerEvidence: "bundle_code", deviceEffect: "not_verified", boundToCommand: false },
};

describe("bundle control schema v1", () => {
	it("accepts the Saros observation without changing it", () => {
		expect(bundleControlV1Schema.parse(suction)).toEqual(suction);
	});
	it.each([
		{ schemaVersion: 2 },
		{ id: suction.idCandidate.value },
		{ action: { ...suction.action, boundToCommand: true } },
		{ value: { current: 101, status: "not_measured" } },
		{ placements: [{ ...suction.placements[0], options: [{ value: "101", label: "Leise" }] }] },
		{ placements: [{ ...suction.placements[0], options: Array(2).fill(suction.placements[0].options[0]) }] },
	])("rejects inconsistent input %#", patch => {
		expect(bundleControlV1Schema.safeParse({ ...suction, ...patch }).success).toBe(false);
	});
});
