// --- CONSTANTS from original Roborock modules ---

export const SUBTITLE_STATUS = {
	SLEEP: 1,
	IDEL: 2,
	DUSTING: 3,
	CLEANNING: 4,
	RECHARGING: 5,
	CHARGE_FULL: 6,
	PAUSE: 7,
	UPGRADING: 8,
	BREAK_CHARGING: 9,
	BREAK_RECHARGING: 10,
	WORKING_DUSTING: 11,
	WORKING_SLEEP: 12,
	RELOCTION: 13,
	SELF_CHECK: 14,
	REMOTE_CONTROL: 15,
	BUILD_MAP: 16,
	CLEAN_REPEAT: 17,
	RECLEAN: 18,
	WAIT_INSTRUCTION: 19
};

export const SCCleanType = {
	clean: 0,
	mop: 1,
	both: 2
};

export const CleanModeType = {
	ALL: 0,
	ROOM_NORMAL: 1,
	ROOM: 2,
	ALL_CUSTOM: 3,
	AREA_CUSTOM: 4
};

export const SC_MAP_COLORS = {
	LEVEL_1: ["#1FE6DB", "#97C9FF", "#FFDD63", "#FFA88A"],
	LEVEL_2: ["#73EBE6", "#BCDAFC", "#FAE59E", "#FAC6B6"],
	LEVEL_3: ["#73EBE649", "#BCDAFC49", "FAE59E49", "#FAC6B649"],
	ROOM_ICON_BG: ["#054E46", "#0E3C6D", "#533D00", "#7E1E29"], // Darker backgrounds for icons
	ROOM_ICON_BORDER: ["#00322D", "#052950", "#2D2100", "#5B0C15"]
};

export const JOB_STATUS = {
	CHARGING: 8,
	CLEANING: 5,
	ZONED_CLEANING: 6,
	SPOT_CLEANING: 11,
	PAUSED: 10,
	ERROR: 12,
	SLEEP: 0,
	IDLE: 2,
	RETURNING: 6
};

// Map room types (Definitive map from SCRoomType in output.js)
export const ROOM_TYPE_MAP: Record<number, string> = {
	2001: "bedroom",
	2002: "dinnerroom",
	2003: "restroom",
	2004: "corridor",
	2005: "kitchen",
	2006: "livingroom",
	2007: "balcony",
	2008: "study",
	2009: "entryway",
	2010: "masterbedrrom", // Source typo preserved
	2011: "guestbedrrom",  // Source typo preserved
	0: "other"
};

export const APP_COLORS = {
	virtualStrokeColor: "#FF0000",
	virtualFillColor: "rgba(255, 0, 0, 0.1)",
	zoneStrokeColor: "#007AFF",
	zoneFillColor: "rgba(0, 0, 0, 0.15)",
	zoneBorderColor: "#0000004D",
	circleColor: "#007AFF",
	eraseStrokeColor: "#FF9500",
	eraseFillColor: "#FF95004D",
	forbiddenStrokeColor: "#FF3B30",
	forbiddenFillColor: "rgba(255, 59, 48, 0.2)"
};

export const PALETTE = {
	WALL: "#6B7174",
	FLOOR: "#C4D7F9",
	OBSTACLE: "#666666",
	UNKNOWN: "#EBEBF5",
	CARPET: "#FFFFFF7F",
	ROOMS: { default: "#C4D7F9" }
};
