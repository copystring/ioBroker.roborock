import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const translationsDirectory = path.join(process.cwd(), "admin", "i18n");

describe("admin translation keys", () => {
    const englishKeys = Object.keys(readTranslations("en.json")).sort();
    const languageFiles = fs.readdirSync(translationsDirectory).filter(file => file.endsWith(".json"));

    it.each(languageFiles)("%s has the same keys as English", file => {
        expect(Object.keys(readTranslations(file)).sort()).toEqual(englishKeys);
    });
});

function readTranslations(file: string): Record<string, string> {
    const content = fs.readFileSync(path.join(translationsDirectory, file), "utf8");
    return JSON.parse(content) as Record<string, string>;
}
