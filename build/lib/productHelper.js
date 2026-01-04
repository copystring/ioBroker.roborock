"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHelper = void 0;
const features_enum_1 = require("./features/features.enum");
class ProductHelper {
    /**
     * Retrieves the CardSpec for a given product model.
     * @param productInfo The full V5 product response
     * @param model The model identifier (e.g. "roborock.vacuum.a70")
     */
    static getCardSpec(productInfo, model) {
        if (!productInfo?.data?.categoryDetailList)
            return null;
        // Try to find matching category by code
        const categoryDetail = productInfo.data.categoryDetailList.find(c => c.category.code === model);
        if (categoryDetail && categoryDetail.category.cardspec) {
            try {
                const parsed = JSON.parse(categoryDetail.category.cardspec);
                return parsed;
            }
            catch (e) {
                console.error(`Failed to parse cardspec for ${model}:`, e);
                return null;
            }
        }
        return null;
    }
    /**
     * Deduces features based on Product Tags and CardSpec.
     */
    static deduceFeatures(productInfo, model) {
        const features = new Set();
        // 1. Tag-based deduction
        let productItem;
        if (productInfo.data.categoryDetailList) {
            for (const cat of productInfo.data.categoryDetailList) {
                if (cat.productList) {
                    productItem = cat.productList.find(p => p.model === model);
                    if (productItem)
                        break;
                }
            }
        }
        if (productItem && productItem.productTags) {
            for (const tag of productItem.productTags) {
                switch (tag.name) {
                    case "OfflineMap":
                        // features.add(Feature.OfflineMap); // If exists
                        break;
                    case "camera_landing":
                        features.add(features_enum_1.Feature.Camera);
                        break;
                    // Add more tag mappings as discovered
                }
            }
        }
        // 2. CardSpec-based deduction
        const cardSpec = ProductHelper.getCardSpec(productInfo, model);
        if (cardSpec && cardSpec.data) {
            // Check for Mop Wash (Look for 'wash_status' or description in state)
            // Strategy: Check if specific states exist or if specific values exist in 'state' (121)
            // MopWash: Check for state 121 value 23 ("Washing the mop")
            if (ProductHelper.hasStateValue(cardSpec, "state", 23) || ProductHelper.hasStateDescription(cardSpec, "state", "Washing the mop")) {
                features.add(features_enum_1.Feature.MopWash);
            }
            // AutoEmpty: Check for state 121 value 22 ("Emptying")
            if (ProductHelper.hasStateValue(cardSpec, "state", 22) || ProductHelper.hasStateDescription(cardSpec, "state", "Emptying")) {
                features.add(features_enum_1.Feature.AutoEmptyDock);
            }
            // MopDry: Check for 'dry_status' (136) or state 121 value 26 ("Drying")
            if (ProductHelper.hasStateValue(cardSpec, "state", 26) || cardSpec.data["dry_status"]) {
                features.add(features_enum_1.Feature.MopDry);
            }
            // WaterBox
            if (cardSpec.data["water_box_mode"] || cardSpec.data["water_box_custom_mode"]) {
                features.add(features_enum_1.Feature.WaterBox);
            }
        }
        return features;
    }
    static hasStateValue(cardSpec, stateName, valueToCheck) {
        const item = cardSpec.data[stateName];
        if (!item?.value)
            return false;
        return item.value.some(v => v.value.includes(valueToCheck));
    }
    static hasStateDescription(cardSpec, stateName, descriptionSnippet) {
        const item = cardSpec.data[stateName];
        if (!item?.value)
            return false;
        // Check English description
        return item.value.some(v => v.desc?.en?.toLowerCase().includes(descriptionSnippet.toLowerCase()));
    }
    /**
     * Returns a map of state values to their translated labels for a given state (e.g. 'fan_power').
     */
    static getStateDefinitions(productInfo, model, stateName, lang = "en") {
        const cardSpec = ProductHelper.getCardSpec(productInfo, model);
        if (!cardSpec || !cardSpec.data[stateName])
            return null;
        const item = cardSpec.data[stateName];
        if (!item?.value)
            return null;
        const result = {};
        for (const v of item.value) {
            const label = v.desc?.[lang] || v.desc?.["en"] || "Unknown";
            for (const val of v.value) {
                result[val] = label;
            }
        }
        return result;
    }
}
exports.ProductHelper = ProductHelper;
//# sourceMappingURL=productHelper.js.map