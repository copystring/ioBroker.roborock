"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoborockLocales = void 0;
class RoborockLocales {
    dataset;
    attributeMap = {};
    constructor(dataset) {
        this.dataset = dataset;
        // Merge attribute mappings from dataset if available
        if (this.dataset.attribute_mappings) {
            this.attributeMap = {
                ...this.attributeMap,
                ...this.dataset.attribute_mappings
            };
        }
    }
    isDatasetValid() {
        return !!this.dataset;
    }
    /**
     * Get translated text for a generic key.
     * @param key The translation key (e.g., "setting_consumable_mop")
     * @param language The language code (e.g., "en", "de")
     */
    getText(key, language = "en") {
        if (!this.isDatasetValid())
            return key;
        // Normalize ioBroker language codes to dataset keys
        let normalizedLang = language.toLowerCase();
        if (normalizedLang === "zh-cn")
            normalizedLang = "zh";
        if (normalizedLang === "zh-tw")
            normalizedLang = "zh-hant";
        // Try translations first
        // Look up using a case-insensitive check to handle zh-Hant vs zh-hant
        const datasetLangKey = Object.keys(this.dataset.translations || {}).find((k) => k.toLowerCase() === normalizedLang.toLowerCase());
        const langData = datasetLangKey ? this.dataset.translations?.[datasetLangKey] : null;
        if (langData && langData[key]) {
            return langData[key];
        }
        // Try general_translations
        const genData = this.dataset.general_translations?.[language];
        if (genData && genData[key]) {
            return genData[key];
        }
        // Fallback to English translations
        const enData = this.dataset.translations?.["en"];
        if (enData && enData[key]) {
            return enData[key];
        }
        // Fallback to English general_translations
        const enGenData = this.dataset.general_translations?.["en"];
        if (enGenData && enGenData[key]) {
            return enGenData[key];
        }
        return key; // Return key if not found
    }
    /**
     * Get all available translations for a key.
     */
    getTranslations(key) {
        const translations = {};
        if (!this.isDatasetValid())
            return translations;
        // Collect from regular translations
        if (this.dataset.translations) {
            for (const lang in this.dataset.translations) {
                const langDict = this.dataset.translations[lang];
                if (langDict && langDict[key]) {
                    translations[lang] = langDict[key];
                }
            }
        }
        // Collect from general translations if missing in specific language
        if (this.dataset.general_translations) {
            for (const lang in this.dataset.general_translations) {
                const langDict = this.dataset.general_translations[lang];
                if (langDict && langDict[key] && !translations[lang]) {
                    translations[lang] = langDict[key];
                }
            }
        }
        return translations;
    }
    /**
     * Get translated error text.
     * @param errorCode The error code
     * @param language The language code
     */
    getErrorText(errorCode, language = "en") {
        let normalizedLang = language.toLowerCase();
        if (normalizedLang === "zh-cn")
            normalizedLang = "zh";
        if (normalizedLang === "zh-tw")
            normalizedLang = "zh-hant";
        const codeStr = errorCode.toString();
        const fault = this.dataset.fault_codes?.[codeStr];
        if (fault) {
            const getTitle = (entry) => (typeof entry === "object" && entry !== null) ? entry.title : entry;
            const langTitle = getTitle(fault[normalizedLang]);
            if (langTitle && typeof langTitle === "string")
                return langTitle;
            const enTitle = getTitle(fault["en"]);
            if (enTitle && typeof enTitle === "string")
                return enTitle;
        }
        return `Error ${errorCode}`;
    }
    /**
     * Get the translation key for a given device attribute.
     * Returns undefined if no mapping is found.
     */
    getAttributeKey(attribute) {
        if (!this.isDatasetValid())
            return undefined;
        if (this.dataset.attribute_mappings) {
            return this.dataset.attribute_mappings[attribute];
        }
        return undefined;
    }
    /**
     * Get the translation key for a status code.
     */
    getStatusKey(statusCode) {
        if (this.dataset.status_map) {
            return this.dataset.status_map[statusCode.toString()];
        }
        return undefined;
    }
    getErrorCodes() {
        if (!this.dataset.fault_codes)
            return [];
        return Object.keys(this.dataset.fault_codes).map(k => parseInt(k)).filter(k => !isNaN(k) && k !== 0);
    }
    /**
     * Get the mapped value for Cloth State (Mop Mount).
     * Mirrors logic: if not 0, show warning.
     * @param value The cloth_state value
     * @param language The language code
     */
    getClothStateText(value, language = "en") {
        if (value === 0) {
            return this.getText("setting_consumable_mop", language) + ": " + this.getText("common_on", language);
        }
        else if (value === 1) {
            // Removed / Not Installed
            return this.getText("setting_consumable_change_tips7", language);
        }
        else {
            // 2 or other = Dirty / abnormal? Default to generic warning
            return this.getText("setting_consumable_change_tips7", language) + ` (${value})`;
        }
    }
    getWaterBoxModeText(value, language = "en") {
        switch (value) {
            case 200: return this.getText("home_clean_water_close", language);
            case 201: return this.getText("home_clean_water_low", language);
            case 202: return this.getText("home_clean_water_medium", language);
            case 203: return this.getText("home_clean_water_high", language);
            default: return this.getText("unknown", language) || `Water ${value}`;
        }
    }
    getFanPowerText(value, language = "en") {
        switch (value) {
            case 101: return this.getText("home_clean_wind_silence", language);
            case 102: return this.getText("home_clean_wind_standard", language);
            case 103: return this.getText("home_clean_wind_strong", language);
            case 104: return this.getText("home_clean_wind_super_strong", language);
            case 105: return this.getText("home_clean_wind_max", language);
            default: return this.getText("unknown", language) || `Fan ${value}`;
        }
    }
    getMopModeText(value, language = "en") {
        switch (value) {
            case 300: return this.getText("home_clean_route_standard", language);
            case 301: return this.getText("home_clean_route_carefully", language);
            case 302: return this.getText("home_clean_route_deep_plus", language);
            case 303: return this.getText("home_clean_route_custom", language);
            default: return this.getText("unknown", language) || `MopMode ${value}`;
        }
    }
    getName(attribute, language = "en") {
        const key = this.attributeMap[attribute];
        if (key) {
            return this.getText(key, language);
        }
        return undefined;
    }
    /**
     * Get all translations for an attribute name (for common.name object)
     */
    getNameAll(attribute) {
        const key = this.attributeMap[attribute];
        if (key) {
            const trans = this.getTranslations(key);
            if (Object.keys(trans).length > 0) {
                trans["en"] = trans["en"] || key;
                return trans;
            }
        }
        // If translation missing, return key (if mapped) or raw attribute name as fallback string.
        // This ensures we can use keys like 'water_tank' that are defined in words.js but not in the dataset.
        return key || attribute;
    }
}
exports.RoborockLocales = RoborockLocales;
//# sourceMappingURL=roborock_locales.js.map