import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (file: string): string => readFileSync(file, "utf8");

describe("Admin map delivery", () => {
	it("loads map resources from the adapter file storage", () => {
		const page = read("admin/tab.html");
		expect(page).toContain('<base href="../../files/roborock/">');
		const base = new URL("../../files/roborock/", "https://example.test/adapter/roborock/tab.html");
		expect(new URL("app.js", base).pathname).toBe("/files/roborock/app.js");
		expect(new URL("assets/model/icon.png", base).pathname).toBe("/files/roborock/assets/model/icon.png");
	});

	it("uses the local Admin tab without requiring a web instance", () => {
		const { common } = JSON.parse(read("io-package.json"));
		expect(common.adminTab.link).toBeUndefined();
		expect(common.dependencies.some((dependency: Record<string, string>) => "web" in dependency)).toBe(false);
		expect(common.localLinks).toBeUndefined();
	});
});
