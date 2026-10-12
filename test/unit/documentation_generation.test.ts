import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { expect, it } from "vitest";

it("regenerates owned books while preserving authored source contracts and guides", () => {
	const fixture = mkdtempSync(join(tmpdir(), "roborock-docs-"));
	try {
		for (const dir of ["scripts", "src", "test", "docs/mower"]) mkdirSync(join(fixture, dir), { recursive: true });
		copyFileSync(resolve("scripts/generate-docs.js"), join(fixture, "scripts/generate-docs.js"));
		const contract = "# Source contract\n\nVerified protocol evidence.\n";
		writeFileSync(join(fixture, "docs/mower/SourceContract.md"), contract);
		writeFileSync(join(fixture, "docs/Old.md"), "> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.\n");
		writeFileSync(join(fixture, "src/sample.ts"), "/**\n * @doc:New.md\n * Current contract.\n */\n");
		execFileSync(process.execPath, [join(fixture, "scripts/generate-docs.js")]);
		expect(readFileSync(join(fixture, "docs/mower/SourceContract.md"), "utf8")).toBe(contract);
		expect(existsSync(join(fixture, "docs/Old.md"))).toBe(false);
		expect(readFileSync(join(fixture, "docs/New.md"), "utf8")).toContain("Current contract.");
	} finally { rmSync(fixture, { recursive: true, force: true }); }
});
