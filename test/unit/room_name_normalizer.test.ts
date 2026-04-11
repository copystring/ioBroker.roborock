import { describe, expect, it } from "vitest";
import { normalizeRoborockRoomDisplayName } from "../../src/lib/roomNameNormalizer";

describe("normalizeRoborockRoomDisplayName", () => {
	const translate = (key: string, fallback?: string): string => {
		const translations: Record<string, string> = {
			default_room_name: "Raum",
			map_edit_zone_tag_masterbedroom: "Hauptschlafzimmer",
			map_edit_zone_tag_geustbedroom: "Gastezimmer",
			map_edit_zone_tag_bedroom: "Schlafzimmer",
			map_edit_zone_tag_livingroom: "Wohnzimmer",
			map_edit_zone_tag_diningroom: "Esszimmer",
			map_edit_zone_tag_kitchen: "Kuche",
			map_edit_zone_tag_balcony: "Balkon",
			map_edit_zone_tag_toilet: "Badezimmer",
			map_edit_zone_tag_entryway: "Eingangsbereich",
			map_edit_zone_tag_vestibule: "Flur",
			map_edit_zone_tag_study: "Arbeitszimmer"
		};
		return translations[key] ?? fallback ?? key;
	};

	it("should localize internal rr room type tokens", () => {
		expect(
			normalizeRoborockRoomDisplayName("rr_corridor", () => "Raum", translate)
		).toBe("Flur");
		expect(
			normalizeRoborockRoomDisplayName("rr_restaurant", () => "Raum", translate)
		).toBe("Esszimmer");
		expect(
			normalizeRoborockRoomDisplayName("rr_living_room", () => "Raum", translate)
		).toBe("Wohnzimmer");
	});

	it("should keep custom room names untouched", () => {
		expect(
			normalizeRoborockRoomDisplayName("Kuche links", () => "Raum", translate)
		).toBe("Kuche links");
	});

	it("should normalize default room placeholders like room2", () => {
		expect(
			normalizeRoborockRoomDisplayName("room2", () => "Raum", translate)
		).toBe("Raum2");
	});

	it("should fall back to room type when the raw room name is empty", () => {
		expect(
			normalizeRoborockRoomDisplayName("", () => "Raum", translate, 9)
		).toBe("Eingangsbereich");
	});
});
