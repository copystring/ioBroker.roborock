interface Dataset {
    meta: {
        languages: string[];
        generated: string;
    };
    fault_codes: {
        [code: string]: {
            internal?: string;
            [lang: string]: {
                title: string;
                summary?: string;
            } | string | undefined;
        };
    };
    translations: {
        [lang: string]: {
            [key: string]: string;
        };
    };
    general_translations?: {
        [lang: string]: {
            [key: string]: string;
        };
    };
    attribute_mappings?: Record<string, string>;
    status_map?: Record<string, string>;
}
export declare class RoborockLocales {
    private dataset;
    private attributeMap;
    constructor(dataset: Dataset);
    private isDatasetValid;
    /**
     * Get translated text for a generic key.
     * @param key The translation key (e.g., "setting_consumable_mop")
     * @param language The language code (e.g., "en", "de")
     */
    getText(key: string, language?: string): string;
    /**
     * Get all available translations for a key.
     */
    getTranslations(key: string): Record<string, string>;
    /**
     * Get translated error text.
     * @param errorCode The error code
     * @param language The language code
     */
    getErrorText(errorCode: string | number, language?: string): string;
    /**
     * Get the translation key for a given device attribute.
     * Returns undefined if no mapping is found.
     */
    getAttributeKey(attribute: string): string | undefined;
    /**
     * Get the translation key for a status code.
     */
    getStatusKey(statusCode: string | number): string | undefined;
    getErrorCodes(): number[];
    /**
     * Get the mapped value for Cloth State (Mop Mount).
     * Mirrors logic: if not 0, show warning.
     * @param value The cloth_state value
     * @param language The language code
     */
    getClothStateText(value: number, language?: string): string;
    getWaterBoxModeText(value: number, language?: string): string;
    getFanPowerText(value: number, language?: string): string;
    getMopModeText(value: number, language?: string): string;
    getName(attribute: string, language?: string): string | undefined;
    /**
     * Get all translations for an attribute name (for common.name object)
     */
    getNameAll(attribute: string): ioBroker.StringOrTranslated;
}
export {};
