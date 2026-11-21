import {
	getZeoOneAppPluginName, getZeoOneAppPluginText, RAW_DP_LABELS,
	RAW_DP_PROGRAM_CONTEXT_TRANSLATION_KEYS, RAW_DP_TRANSLATION_KEYS,
	RAW_DP_VALUE_LABELS, RAW_DP_VALUE_TRANSLATION_KEYS,
} from "./zeoOneAppPluginTranslations";

/** Presentation only: original numeric values and state IDs remain unchanged. */
export function getZeoOneDpMetadata(dp: string, language?: string, location?: string): Partial<ioBroker.StateCommon> {
	const key = RAW_DP_TRANSLATION_KEYS[dp];
	const name = key ? getZeoOneAppPluginName(key) : RAW_DP_LABELS[dp] ?? dp;
	const states: Record<string, string> = {};
	for (const [value, translationKey] of Object.entries(RAW_DP_VALUE_TRANSLATION_KEYS[dp] ?? {})) {
		states[value] = getZeoOneAppPluginText(translationKey, language);
	}
	if (dp === "205") {
		states["1"] = getZeoOneAppPluginText(RAW_DP_PROGRAM_CONTEXT_TRANSLATION_KEYS["1"][location === "tw" ? "h1OverseasTaiwan" : "h1Overseas"], language);
		states["23"] = getZeoOneAppPluginText(RAW_DP_PROGRAM_CONTEXT_TRANSLATION_KEYS["23"].h1Overseas, language);
	}
	const unitKey = { "208": "wash_rince_unit", "209": "wash_rotation_speed_unit", "233": "soak_unit_minute" }[dp];
	for (const [value, literal] of Object.entries(RAW_DP_VALUE_LABELS[dp] ?? {})) {
		states[value] = unitKey ? `${literal} ${getZeoOneAppPluginText(unitKey, language)}` : literal;
	}
	return Object.keys(states).length ? { name, states } : { name };
}

/** Match labels to an existing alias's unchanged values (numbers, tokens or booleans). */
export function getZeoOneAliasStates(
	metadata: Partial<ioBroker.StateCommon>, values: Record<string, string | number | boolean | null>,
): Record<string, string> | undefined {
	const labels = metadata.states as Record<string, string> | undefined;
	if (!labels) return undefined;
	const result: Record<string, string> = {};
	for (const [raw, alias] of Object.entries(values)) {
		if (alias !== null && labels[raw] !== undefined) result[String(alias)] = labels[raw];
	}
	return Object.keys(result).length ? result : undefined;
}
