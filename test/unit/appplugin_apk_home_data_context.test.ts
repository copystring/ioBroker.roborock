import { describe, expect, it } from "vitest";

import {
	createApkAppPluginCloudBootstrapContext,
	createApkAppPluginHomeDataContext,
} from "../../src/apppluginHost/apkHomeDataContext";

describe("APK AppPlugin HomeData context", () => {
	it("keeps owned/shared device order and selects distinct products by productId", () => {
		const owned = {
			duid: "owned",
			localKey: "synthetic-owned-key",
			productId: "7",
			featureSet: "123",
			newFeatureSet: "0f",
		};
		const shared = {
			duid: "shared",
			localKey: "synthetic-shared-key",
			productId: 7,
		};
		const other = {
			duid: "other",
			productId: "8",
		};
		const product7 = {
			id: 7,
			model: "roborock.vacuum.synthetic",
			productTags: [{ name: "synthetic" }],
		};
		const product8 = {
			id: 8,
			model: "roborock.wm.synthetic",
		};

		const result = createApkAppPluginHomeDataContext({
			products: [product7, product8],
			devices: [owned],
			receivedDevices: [shared, other],
		});

		expect(result).toEqual({
			deviceJsonStrings: [
				JSON.stringify(owned),
				JSON.stringify(shared),
				JSON.stringify(other),
			],
			productJsonStrings: [
				JSON.stringify(product7),
				JSON.stringify(product8),
			],
		});
	});

	it("returns device JSON even when the product catalog is unavailable", () => {
		const device = { duid: "device", productId: "missing-product" };

		expect(createApkAppPluginHomeDataContext({
			devices: [device],
			receivedDevices: [],
		})).toEqual({
			deviceJsonStrings: [JSON.stringify(device)],
			productJsonStrings: [],
		});
	});

	it("does not invent HomeData when no home object exists", () => {
		expect(createApkAppPluginHomeDataContext(undefined)).toBeUndefined();
		expect(createApkAppPluginHomeDataContext(null)).toBeUndefined();
	});

	it("binds the exact V4 rruid, country and region without using transport IDs", () => {
		const context = createApkAppPluginCloudBootstrapContext(
			{
				products: [{ id: "product-a", model: "roborock.mower.test" }],
				devices: [{ duid: "one", productId: "product-a" }],
				receivedDevices: [],
			},
			{
				data: {
					categoryDetailList: [{
					productList: [{ id: 90210, model: "roborock.mower.test" }],
					}],
				},
			},
			{
				rruid: "rr-user",
				country: "DE",
				region: "eu",
				rriot: { u: "transport-user-must-not-be-used" },
			},
		);
		expect(context).toEqual({
			userId: "rr-user",
			account: { countryCode: "DE", serverCode: "eu" },
			homeData: {
				deviceJsonStrings: [JSON.stringify({ duid: "one", productId: "product-a" })],
				productJsonStrings: [JSON.stringify({
					id: "product-a",
					model: "roborock.mower.test",
				})],
			},
			packageProducts: [{ id: 90210, model: "roborock.mower.test" }],
		});
		expect(createApkAppPluginCloudBootstrapContext({}, {}, {
			rriot: { u: "transport-only" },
		})).toBeUndefined();
	});
});
