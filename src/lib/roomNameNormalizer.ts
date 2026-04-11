const ROBOROCK_ROOM_TYPE_TOKENS: Record<string, { translationKey?: string; fallback: string }> = {
	rr_other: { fallback: "Room" },
	rr_master_room: { translationKey: "map_edit_zone_tag_masterbedroom", fallback: "Master bedroom" },
	rr_guest_bedroom: { translationKey: "map_edit_zone_tag_geustbedroom", fallback: "Guest bedroom" },
	rr_bedroom: { translationKey: "map_edit_zone_tag_bedroom", fallback: "Bedroom" },
	rr_living_room: { translationKey: "map_edit_zone_tag_livingroom", fallback: "Living room" },
	rr_restaurant: { translationKey: "map_edit_zone_tag_diningroom", fallback: "Dining room" },
	rr_kitchen: { translationKey: "map_edit_zone_tag_kitchen", fallback: "Kitchen" },
	rr_balcony: { translationKey: "map_edit_zone_tag_balcony", fallback: "Balcony" },
	rr_toilet: { translationKey: "map_edit_zone_tag_toilet", fallback: "Bathroom" },
	rr_entrance_hall: { translationKey: "map_edit_zone_tag_entryway", fallback: "Entrance hall" },
	rr_study: { translationKey: "map_edit_zone_tag_study", fallback: "Study" },
	rr_corridor: { translationKey: "map_edit_zone_tag_vestibule", fallback: "Corridor" }
};

const ROOM_TYPE_ID_TO_TOKEN: Record<number, keyof typeof ROBOROCK_ROOM_TYPE_TOKENS> = {
	0: "rr_other",
	1: "rr_master_room",
	2: "rr_guest_bedroom",
	3: "rr_bedroom",
	4: "rr_living_room",
	5: "rr_restaurant",
	6: "rr_kitchen",
	7: "rr_balcony",
	8: "rr_toilet",
	9: "rr_entrance_hall",
	10: "rr_study",
	11: "rr_corridor"
};

function localizeRoborockRoomTypeToken(
	roomName: string,
	getDefaultRoomName?: () => string | undefined,
	translate?: (key: string, fallback?: string) => string
): string | undefined {
	const token = roomName.trim().toLowerCase();
	if (!token) return undefined;

	if (token === "rr_other") {
		const defaultRoomName = getDefaultRoomName?.()?.trim();
		if (defaultRoomName) return defaultRoomName;
		return translate?.("default_room_name", "Room") ?? "Room";
	}

	const mapping = ROBOROCK_ROOM_TYPE_TOKENS[token];
	if (!mapping) return undefined;

	if (!mapping.translationKey) {
		return mapping.fallback;
	}

	return translate?.(mapping.translationKey, mapping.fallback) ?? mapping.fallback;
}

function localizeRoborockRoomTypeId(
	roomTypeId: number | undefined,
	getDefaultRoomName?: () => string | undefined,
	translate?: (key: string, fallback?: string) => string
): string | undefined {
	if (typeof roomTypeId !== "number" || !Number.isFinite(roomTypeId)) return undefined;
	const token = ROOM_TYPE_ID_TO_TOKEN[roomTypeId];
	if (!token) return undefined;
	return localizeRoborockRoomTypeToken(token, getDefaultRoomName, translate);
}

export function normalizeRoborockRoomDisplayName(
	roomName: string | undefined,
	getDefaultRoomName?: () => string | undefined,
	translate?: (key: string, fallback?: string) => string,
	roomTypeId?: number
): string {
	const trimmedRoomName = roomName?.trim() ?? "";
	if (!trimmedRoomName) {
		return localizeRoborockRoomTypeId(roomTypeId, getDefaultRoomName, translate) ?? "";
	}

	const localizedToken = localizeRoborockRoomTypeToken(trimmedRoomName, getDefaultRoomName, translate);
	if (localizedToken) return localizedToken;

	const match = /^room(\d{1,2})$/i.exec(trimmedRoomName);
	if (!match) return trimmedRoomName;

	const defaultRoomName = getDefaultRoomName?.()?.trim() ?? translate?.("default_room_name", "Room") ?? "";
	if (!defaultRoomName) return trimmedRoomName;

	return `${defaultRoomName}${match[1]}`;
}
