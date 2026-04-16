import { describe, expect, it } from "vitest";
import { normalizeRoborockRoomDisplayName } from "../../src/lib/roomNameNormalizer";
import { TranslationManager } from "../../src/lib/translationManager";

describe("normalizeRoborockRoomDisplayName", () => {
	const createTranslate = (language: string) => {
		const adapter = {
			language,
			rLog: () => {}
		} as any;
		const translationManager = new TranslationManager(adapter);
		translationManager.init();
		return (key: string, fallback?: string): string => translationManager.get(key, fallback);
	};

	it("should localize internal rr room type tokens", () => {
		const translate = createTranslate("de");

		expect(
			normalizeRoborockRoomDisplayName("rr_corridor", () => translate("default_room_name", "Room"), translate)
		).toBe(translate("map_edit_zone_tag_vestibule", "Corridor"));
		expect(
			normalizeRoborockRoomDisplayName("rr_restaurant", () => translate("default_room_name", "Room"), translate)
		).toBe(translate("map_edit_zone_tag_diningroom", "Dining room"));
		expect(
			normalizeRoborockRoomDisplayName("rr_living_room", () => translate("default_room_name", "Room"), translate)
		).toBe(translate("map_edit_zone_tag_livingroom", "Living room"));
	});

	it("should keep custom room names untouched", () => {
		const translate = createTranslate("de");

		expect(
			normalizeRoborockRoomDisplayName("Kuche links", () => translate("default_room_name", "Room"), translate)
		).toBe("Kuche links");
	});

	it("should normalize default room placeholders like room2", () => {
		const translate = createTranslate("de");

		expect(
			normalizeRoborockRoomDisplayName("room2", () => translate("default_room_name", "Room"), translate)
		).toBe(`${translate("default_room_name", "Room")}2`);
	});

	it("should fall back to room type when the raw room name is empty", () => {
		const translate = createTranslate("de");

		expect(
			normalizeRoborockRoomDisplayName("", () => translate("default_room_name", "Room"), translate, 9)
		).toBe(translate("map_edit_zone_tag_entryway", "Entrance hall"));
	});

	it("should localize room tokens through the real translation bundle for other languages too", () => {
		const translate = createTranslate("en");

		expect(
			normalizeRoborockRoomDisplayName("rr_corridor", () => translate("default_room_name", "Room"), translate)
		).toBe(translate("map_edit_zone_tag_vestibule", "Corridor"));
		expect(
			normalizeRoborockRoomDisplayName("room2", () => translate("default_room_name", "Room"), translate)
		).toBe(`${translate("default_room_name", "Room")}2`);
	});
});
