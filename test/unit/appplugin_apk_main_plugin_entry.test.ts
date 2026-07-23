import { describe, expect, it } from "vitest";

import {
	APK_SCENE_PRODUCT_TAG,
	resolveApkMainPluginDeviceAcquisition,
	type ApkAppPluginHomeDataContext,
} from "../../src/apppluginHost";

function homeData(): ApkAppPluginHomeDataContext {
	return {
		deviceJsonStrings: [
			JSON.stringify({
				duid: "vacuum-1",
				model: "roborock.vacuum.generic",
				productId: "7",
			}),
			JSON.stringify({
				duid: "mower-1",
				model: "roborock.mower.generic",
				productId: 8,
			}),
		],
		productJsonStrings: [
			JSON.stringify({
				id: 7,
				model: "roborock.vacuum.generic",
				productTags: [{
					name: APK_SCENE_PRODUCT_TAG,
					pluginLevel: 3,
					requirePlugin: true,
				}, {
					name: APK_SCENE_PRODUCT_TAG,
					pluginLevel: 5,
					requirePlugin: true,
				}],
			}),
			JSON.stringify({
				id: "8",
				model: "roborock.mower.generic",
				productTags: [],
			}),
		],
	};
}

describe("APK main-plugin entry resolution", () => {
	it("uses the HomeData product model and numeric V5 package ID without inventing a normal-click level", () => {
		expect(resolveApkMainPluginDeviceAcquisition(
			homeData(),
			"mower-1",
		)).toEqual({
			model: "roborock.mower.generic",
			productId: 8,
		});
	});

	it("uses only the exact required tag for a tagged APK entry point", () => {
		expect(resolveApkMainPluginDeviceAcquisition(
			homeData(),
			"vacuum-1",
			{ kind: "product-tag", tagName: APK_SCENE_PRODUCT_TAG },
		)).toEqual({
			model: "roborock.vacuum.generic",
			productId: 7,
			requiredPluginLevel: 5,
		});
	});

	it("fails closed for missing products, non-plugin tags and invalid levels", () => {
		const context = homeData();
		expect(() => resolveApkMainPluginDeviceAcquisition({
			...context,
			productJsonStrings: [],
		}, "vacuum-1")).toThrow("kein zugeordnetes Produkt");
		expect(() => resolveApkMainPluginDeviceAcquisition({
			...context,
			productJsonStrings: [JSON.stringify({
				id: 7,
				model: "roborock.vacuum.generic",
				productTags: [{
					name: APK_SCENE_PRODUCT_TAG,
					pluginLevel: 4,
					requirePlugin: false,
				}],
			})],
		}, "vacuum-1", {
			kind: "product-tag",
			tagName: APK_SCENE_PRODUCT_TAG,
		})).toThrow("fordert keinen Plugin-Einstieg");
		expect(() => resolveApkMainPluginDeviceAcquisition({
			...context,
			productJsonStrings: [JSON.stringify({
				id: 7,
				model: "roborock.vacuum.generic",
				productTags: [{
					name: APK_SCENE_PRODUCT_TAG,
					pluginLevel: -1,
					requirePlugin: true,
				}],
			})],
		}, "vacuum-1", {
			kind: "product-tag",
			tagName: APK_SCENE_PRODUCT_TAG,
		})).toThrow("kein gültiges pluginLevel");
	});
});
