import errorCodeDataset from "../../../../lib/protocols/roborock_error_codes.json";

interface ErrorCodeDefinition {
	types: string[];
	titleKeys: string[];
	subtitleKeys: string[];
	descriptionKeys: string[];
	detailKeys: string[];
	labelKeys: string[];
	fallback: string;
}

interface ErrorCodeDataset {
	codes: Record<string, ErrorCodeDefinition>;
}

interface TranslationLookup {
	get(key: string, defaultVal?: string): string;
}

const ERROR_CODE_DEFINITIONS = (errorCodeDataset as ErrorCodeDataset).codes;

/**
 * Codes retained for compatibility with the adapter's established device states.
 * They must win over equally numbered AppPlugin UI messages in every protocol.
 */
const LEGACY_ERROR_STATE_OVERRIDES: Record<string, string> = {
	"254": "Bin full",
};

export const ADAPTER_ERROR_MAPPING: Record<number, string> = Object.fromEntries(
	Object.entries(ERROR_CODE_DEFINITIONS)
		.filter(([code, definition]) => definition.labelKeys.length > 0 && !(code in LEGACY_ERROR_STATE_OVERRIDES))
		.map(([code, definition]) => [Number(code), definition.labelKeys[0]]),
);

export const ADAPTER_ERRORS_EN: Record<string, string> = Object.fromEntries(
	[...Object.entries(ERROR_CODE_DEFINITIONS).map(([code, definition]) => [code, definition.fallback]), ...Object.entries(LEGACY_ERROR_STATE_OVERRIDES)],
);

/** Resolves the shared AppPlugin namespace used by error_code and dock_error_status. */
export function getLocalizedErrorStates(translationLookup: TranslationLookup): Record<string, string> {
	return {
		...Object.fromEntries(
			Object.entries(ERROR_CODE_DEFINITIONS).map(([code, definition]) => {
				for (const key of definition.labelKeys) {
					const translated = translationLookup.get(key, "");
					if (translated && translated !== key) return [code, translated];
				}
				return [code, definition.fallback];
			}),
		),
		...LEGACY_ERROR_STATE_OVERRIDES,
	};
}
