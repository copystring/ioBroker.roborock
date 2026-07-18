import * as fs from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

const repositoryRoot = path.resolve(__dirname, "..", "..");
const canonicalPagePath = path.join(repositoryRoot, "www", "appplugin-desktop.html");
const legacyPagePath = path.join(repositoryRoot, "www", "appplugin-lab.html");
const packagePath = path.join(repositoryRoot, "package.json");

describe("AppPlugin map evidence contract", () => {
	it("exposes one canonical AppPlugin page and redirects the retired laboratory alias", () => {
		const canonicalHtml = fs.readFileSync(canonicalPagePath, "utf8");
		const legacyHtml = fs.readFileSync(legacyPagePath, "utf8");

		expect(canonicalHtml).toContain('<link rel="canonical" href="./appplugin-desktop.html"');
		expect(canonicalHtml).toContain('id="runtimeProfile"');
		expect(legacyHtml).toContain('new URL("./appplugin-desktop.html", window.location.href)');
		expect(legacyHtml).toContain("target.search = window.location.search");
		expect(legacyHtml).toContain("target.hash = window.location.hash");
		expect(legacyHtml).toContain("window.location.replace(target)");
		expect(legacyHtml).not.toContain("appplugin-lab.js");
	});

	it("builds the existing adapter UI and the single canonical AppPlugin UI", () => {
		const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8")) as {
			scripts: Record<string, string>;
		};
		expect(packageJson.scripts["build:www"]).toContain("src/www/map.ts");
		expect(packageJson.scripts["build:www"]).toContain("npm run poc:appplugin-desktop");
		expect(packageJson.scripts["build:www"]).not.toContain("src/www/appplugin-lab.ts");
		expect(packageJson.scripts["poc:appplugin-q10-history-boundary"]).toContain(
			"scripts/prove_q10_history_boundary.ts"
		);
		expect(packageJson.scripts["poc:appplugin-map-fixture"]).toBeUndefined();
		expect(packageJson.scripts["poc:appplugin-render-scene"]).toBeUndefined();
	});
});
