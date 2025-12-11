import { ProductV5Response, CardSpecData } from "./apiTypes";
import { Feature } from "./features/features.enum";
export declare class ProductHelper {
    /**
     * Retrieves the CardSpec for a given product model.
     * @param productInfo The full V5 product response
     * @param model The model identifier (e.g. "roborock.vacuum.a70")
     */
    static getCardSpec(productInfo: ProductV5Response, model: string): CardSpecData | null;
    /**
     * Deduces features based on Product Tags and CardSpec.
     */
    static deduceFeatures(productInfo: ProductV5Response, model: string): Set<Feature>;
    private static hasStateValue;
    private static hasStateDescription;
    /**
     * Returns a map of state values to their translated labels for a given state (e.g. 'fan_power').
     */
    static getStateDefinitions(productInfo: ProductV5Response, model: string, stateName: string, lang?: string): Record<number, string> | null;
}
