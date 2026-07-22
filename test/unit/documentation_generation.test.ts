import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

const { AUTO_GENERATED_MARKER, clearDocs } = require("../../scripts/generate-docs.js");
const {
	generateTrackerDocumentation,
	loadTracker,
	renderTracker,
	validateTracker
} = require("../../scripts/appplugin_rework_tracker.js");

describe("documentation generation cleanup", () => {
	it("replaces generated Markdown without deleting maintained user or developer docs", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "roborock-docs-"));
		try {
			const nested = path.join(root, "map");
			const media = path.join(root, "_media");
			fs.mkdirSync(nested);
			fs.mkdirSync(media);
			fs.writeFileSync(path.join(root, "README.md"), "# Index\n");
			fs.writeFileSync(path.join(root, "manual.md"), "# Maintained manually\n");
			fs.writeFileSync(path.join(nested, "manual.md"), "# Protocol research\n");
			fs.writeFileSync(path.join(root, "generated.md"), `# Generated\n\n${AUTO_GENERATED_MARKER}\n`);
			fs.writeFileSync(path.join(nested, "generated.md"), `# Generated\n\n${AUTO_GENERATED_MARKER}\n`);
			fs.writeFileSync(path.join(media, "map.png"), Buffer.from([1, 2, 3]));

			clearDocs(root);

			expect(fs.existsSync(path.join(root, "README.md"))).toBe(true);
			expect(fs.existsSync(path.join(root, "manual.md"))).toBe(true);
			expect(fs.existsSync(path.join(nested, "manual.md"))).toBe(true);
			expect(fs.existsSync(path.join(media, "map.png"))).toBe(true);
			expect(fs.existsSync(path.join(root, "generated.md"))).toBe(false);
			expect(fs.existsSync(path.join(nested, "generated.md"))).toBe(false);
		} finally {
			fs.rmSync(root, { recursive: true, force: true });
		}
	});
});

describe("AppPlugin rework tracking", () => {
	const trackerPath = path.join(__dirname, "../../docs/appplugin-rework-tracker.json");

	it("validates the checked-in source of truth and renders every task", () => {
		const tracker = loadTracker(trackerPath);
		const rendered = renderTracker(tracker);

		expect(tracker.currentPhase).toBe("0C");
		expect(tracker.items.length).toBeGreaterThan(50);
		expect(rendered).toContain(AUTO_GENERATED_MARKER);
		expect(rendered).toContain("## Aktueller Fokus");
		expect(rendered).toContain("## Vollständige Aufgabenmatrix");
		for (const item of tracker.items) expect(rendered).toContain(`\`${item.id}\``);
	});

	it("rejects status claims without their required evidence", () => {
		const tracker = loadTracker(trackerPath);
		const invalid = structuredClone(tracker);
		invalid.items.find((item: { id: string }) => item.id === "P0A-ARCHITECTURE-BOUNDARY").evidence = [];

		expect(() => validateTracker(invalid)).toThrow(/completed item P0A-ARCHITECTURE-BOUNDARY needs evidence/);
	});

	it("rejects dependency cycles", () => {
		const tracker = loadTracker(trackerPath);
		const invalid = structuredClone(tracker);
		invalid.items.find((item: { id: string }) => item.id === "P0A-ARCHITECTURE-BOUNDARY").dependsOn = [
			"P0A-TRACKER"
		];

		expect(() => validateTracker(invalid)).toThrow(/dependency cycle/);
	});

	it("writes the deterministic status page to a selectable output", () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), "roborock-rework-status-"));
		try {
			const output = path.join(root, "APPPLUGIN_REWORK_STATUS.md");
			generateTrackerDocumentation(trackerPath, output);

			expect(fs.readFileSync(output, "utf8")).toBe(renderTracker(loadTracker(trackerPath)));
		} finally {
			fs.rmSync(root, { recursive: true, force: true });
		}
	});
});
