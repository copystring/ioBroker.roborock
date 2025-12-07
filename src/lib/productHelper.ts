import { ProductV5Response, CardSpecData } from "./apiTypes";
import { Feature } from "./features/features.enum";

export class ProductHelper {
	/**
     * Retrieves the CardSpec for a given product model.
     * @param productInfo The full V5 product response
     * @param model The model identifier (e.g. "roborock.vacuum.a70")
     */
	public static getCardSpec(productInfo: ProductV5Response, model: string): CardSpecData | null {
		if (!productInfo?.data?.categoryDetailList) return null;

		// Try to find matching category by code
		const categoryDetail = productInfo.data.categoryDetailList.find(c => c.category.code === model);

		if (categoryDetail && categoryDetail.category.cardspec) {
			try {
				const parsed = JSON.parse(categoryDetail.category.cardspec) as CardSpecData;
				return parsed;
			} catch (e) {
				console.error(`Failed to parse cardspec for ${model}:`, e);
				return null;
			}
		}
		return null;
	}

	/**
     * Deduces features based on Product Tags and CardSpec.
     */
	public static deduceFeatures(productInfo: ProductV5Response, model: string): Set<Feature> {
		const features = new Set<Feature>();

		// 1. Tag-based deduction
		const productItem = productInfo.data.productList.find(p => p.model === model);
		if (productItem && productItem.productTags) {
			for (const tag of productItem.productTags) {
				switch (tag.name) {
					case "OfflineMap":
						// features.add(Feature.OfflineMap); // If exists
						break;
					case "camera_landing":
						features.add(Feature.Camera);
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
				features.add(Feature.MopWash);
			}

			// AutoEmpty: Check for state 121 value 22 ("Emptying")
			if (ProductHelper.hasStateValue(cardSpec, "state", 22) || ProductHelper.hasStateDescription(cardSpec, "state", "Emptying")) {
				features.add(Feature.AutoEmptyDock);
			}

			// MopDry: Check for 'dry_status' (136) or state 121 value 26 ("Drying")
			if (ProductHelper.hasStateValue(cardSpec, "state", 26) || cardSpec.data["dry_status"]) {
				features.add(Feature.MopDry);
			}

			// WaterBox
			if (cardSpec.data["water_box_mode"] || cardSpec.data["water_box_custom_mode"]) {
				features.add(Feature.WaterBox);
			}
		}

		return features;
	}

	private static hasStateValue(cardSpec: CardSpecData, stateName: string, valueToCheck: number): boolean {
		const item = cardSpec.data[stateName];
		if (!item?.value) return false;
		return item.value.some(v => v.value.includes(valueToCheck));
	}

	private static hasStateDescription(cardSpec: CardSpecData, stateName: string, descriptionSnippet: string): boolean {
		const item = cardSpec.data[stateName];
		if (!item?.value) return false;
		// Check English description
		return item.value.some(v => v.desc?.en?.toLowerCase().includes(descriptionSnippet.toLowerCase()));
	}

	/**
     * Returns a map of state values to their translated labels for a given state (e.g. 'fan_power').
     */
	public static getStateDefinitions(productInfo: ProductV5Response, model: string, stateName: string, lang: string = "en"): Record<number, string> | null {
		const cardSpec = ProductHelper.getCardSpec(productInfo, model);
		if (!cardSpec || !cardSpec.data[stateName]) return null;

		const item = cardSpec.data[stateName];
		if (!item?.value) return null;

		const result: Record<number, string> = {};
		for (const v of item.value) {
			const label = v.desc?.[lang] || v.desc?.["en"] || "Unknown";
			for (const val of v.value) {
				result[val] = label;
			}
		}
		return result;
	}
}
