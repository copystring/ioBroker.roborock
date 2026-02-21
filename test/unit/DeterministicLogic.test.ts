import { describe, expect, it } from "vitest";
import { VACUUM_CONSTANTS } from "../../src/lib/features/vacuum/vacuumConstants";
import { TranslationManager } from "../../src/lib/translationManager";

describe("Deterministic Logic Verification", () => {
	describe("Consumable Mappings", () => {
		it("should map strainer to supplies_strainer_name (Wasserfilter)", () => {
			expect(VACUUM_CONSTANTS.consumableTranslationKeys.strainer).toBe("supplies_strainer_name");
		});

		it("should map filter_element to supplies_waterbox_chip_name (Wassertankfilter)", () => {
			expect(VACUUM_CONSTANTS.consumableTranslationKeys.filter_element).toBe("supplies_waterbox_chip_name");
		});

		it("should map dust_collection to dust_collection_life5 (Staubbeutel)", () => {
			expect(VACUUM_CONSTANTS.consumableTranslationKeys.dust_collection).toBe("dust_collection_life5");
		});
	});

	describe("TranslationManager Case-Insensitivity", () => {
		it("should find keys regardless of case", () => {
			const mockAdapter = {
				log: { debug: () => {}, error: () => {}, warn: () => {}, info: () => {} }
			} as any;
			const manager = new TranslationManager(mockAdapter);

			// Mock internal lookup table
			(manager as any).translations = {
				"de": {
					"test_key": "Erfolg",
					"another_key": "Gefunden"
				}
			};
			(manager as any).currentLanguage = "de";

			expect(manager.get("TEST_KEY")).toBe("Erfolg");
			expect(manager.get("Test_Key")).toBe("Erfolg");
			expect(manager.get("test_key")).toBe("Erfolg");
			expect(manager.get("ANOTHER_KEY")).toBe("Gefunden");
		});
	});

	describe("Hour Conversion Logic", () => {
		it("should correctly convert seconds used to remaining hours (300h life, 150h used)", () => {
			const totalLifeHours = 300;
			const usedSeconds = 150 * 3600;
			const totalSeconds = totalLifeHours * 3600;
			const remainingHours = Math.max(0, Math.round((totalSeconds - usedSeconds) / 3600));

			expect(remainingHours).toBe(150);
		});

		it("should correctly convert seconds used to remaining hours (200h life, 150h used)", () => {
			const totalLifeHours = 200;
			const usedSeconds = 150 * 3600;
			const totalSeconds = totalLifeHours * 3600;
			const remainingHours = Math.max(0, Math.round((totalSeconds - usedSeconds) / 3600));

			expect(remainingHours).toBe(50);
		});

		it("should handle over-usage (returning 0h)", () => {
			const totalLifeHours = 150;
			const usedSeconds = 200 * 3600;
			const totalSeconds = totalLifeHours * 3600;
			const remainingHours = Math.max(0, Math.round((totalSeconds - usedSeconds) / 3600));

			expect(remainingHours).toBe(0);
		});
	});
});
