/** Read-only Zeo One DP labels from com.roborock.wm/Zeo One/output/798.js. */
export const ZEO_ONE_STATUS_LABELS: Record<string, { alias: string; values: Record<number, string> }> = {
	"203": { alias: "status_name", values: {
		1: "Standby",
		2: "Checking",
		3: "Soaking",
		4: "Washing",
		5: "Rinsing",
		6: "Dewatering",
		7: "Drying",
		8: "Cooling",
		9: "Appointment",
		10: "Complete",
		11: "Updating",
		12: "SmartHosting",
		13: "SmartHostingWaiting",
	} },
	"204": { alias: "mode_name", values: {
		1: "Wash",
		2: "WashAndDry",
		3: "Dry",
	} },
	"205": { alias: "program_name", values: {
		1: "Mixed",
		2: "Quick",
		3: "Sterilization",
		4: "Wool",
		5: "Air",
		6: "CloudProgram",
		7: "HomeTextile",
		8: "Down",
		9: "Silk",
		10: "RinseAndDehydrate",
		11: "Dehydrate",
		12: "SelfClean",
		13: "Baby",
		14: "MitesRemoval",
		15: "Sports",
		16: "Night",
		17: "New",
		18: "Shirt",
		19: "ChemicalFiber",
		20: "Underwear",
		21: "Soft",
		22: "Strong",
		23: "CottonOrLinen",
		24: "Season",
		25: "Warm",
		26: "Bra",
		27: "Underpants",
		28: "Boiling",
		29: "Soaking",
		30: "Socks",
		31: "Towel",
		32: "MitesRemoval2",
		33: "Eco",
		34: "TwentyDegrees",
		35: "TShirt",
		36: "Dirt",
		37: "SmallThings",
		39: "Mixing",
	} },
};

/** Numeric read-only interpretations supported by the a102 AppPlugin. */
export const ZEO_ONE_NUMERIC_STATES: Record<string, {
	alias: string;
	unit?: string;
	values?: Record<number, number | null>;
	max?: number;
}> = {
	// Level 1 is the plugin's "Normal"/cold setting, not a measured 0 °C.
	"207": { alias: "temperature_celsius", unit: "°C", values: { 1: null, 2: 30, 3: 40, 4: 60, 5: 90, 6: 20 } },
	"208": { alias: "rinse_cycles", max: 5 },
	"209": { alias: "spin_speed_rpm", unit: "rpm", values: { 1: 0, 2: 400, 3: 600, 4: 800, 5: 1000, 6: 1200, 7: 1400 } },
	"217": { alias: "preset_minutes", unit: "min" },
	"218": { alias: "time_left_minutes", unit: "min" },
	"224": { alias: "self_clean_times" },
};

export const ZEO_ONE_BOOLEAN_STATES: Record<string, string> = {
	"206": "child_lock",
	"211": "auto_detergent",
	"212": "auto_softener",
	"223": "sound",
	"226": "detergent_empty",
	"227": "softener_empty",
	"232": "remote_control_authorized",
};

export const ZEO_ONE_DRYING_MODES: Record<number, string> = {
	0: "None",
	1: "Quick",
	2: "Iron",
	3: "Store",
};
