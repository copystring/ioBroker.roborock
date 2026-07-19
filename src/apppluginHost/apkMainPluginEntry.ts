import type {
	ApkAppPluginHomeDataContext,
} from "./apkAppPluginSessionDescriptor";
import {
	type ApkHomeDataJsonRecord,
	resolveApkHomeDataDeviceProduct,
} from "./apkHomeDataLookup";

export const APK_SCENE_PRODUCT_TAG = "scene_2.0";

export type ApkMainPluginEntry =
	| { readonly kind: "device" }
	| {
		readonly kind: "product-tag";
		readonly tagName: string;
	};

export interface ApkMainPluginDeviceAcquisitionRequest {
	readonly model: string;
	readonly productId: number;
	readonly requiredPluginLevel?: number;
}

function nonEmptyString(value: unknown, label: string): string {
	if (typeof value !== "string" || value.length === 0) {
		throw new Error(`${label} muss ein nichtleerer String sein`);
	}
	return value;
}

function positiveProductId(value: unknown): number {
	const productId = typeof value === "string" && /^[0-9]+$/u.test(value)
		? Number(value)
		: value;
	if (
		typeof productId !== "number"
		|| !Number.isSafeInteger(productId)
		|| productId <= 0
	) {
		throw new Error("Das HomeData-Produkt besitzt keine positive numerische APK-Produkt-ID");
	}
	return productId;
}

function nonNegativePluginLevel(value: unknown, tagName: string): number {
	if (
		typeof value !== "number"
		|| !Number.isSafeInteger(value)
		|| value < 0
	) {
		throw new Error(`ProductTag ${tagName} besitzt kein gültiges pluginLevel`);
	}
	return value;
}

function productTag(
	product: ApkHomeDataJsonRecord,
	tagName: string,
): ApkHomeDataJsonRecord {
	if (!Array.isArray(product.productTags)) {
		throw new Error(`HomeData-Produkt besitzt keinen ProductTag ${tagName}`);
	}
	let match: ApkHomeDataJsonRecord | undefined;
	for (const value of product.productTags) {
		if (
			value !== null
			&& typeof value === "object"
			&& !Array.isArray(value)
			&& (value as Readonly<Record<string, unknown>>).name === tagName
		) {
			// ProductEntity builds a name-keyed map and therefore keeps the
			// final duplicate, matching Kotlin's linkedHashMap assignment.
			match = value as ApkHomeDataJsonRecord;
		}
	}
	if (!match) {
		throw new Error(`HomeData-Produkt besitzt keinen ProductTag ${tagName}`);
	}
	return match;
}

/**
 * Reproduces the APK inputs to DeviceManipulator's main-plugin acquisition.
 *
 * A normal device click passes no least plugin level. Special entry points,
 * such as Scene_CommandList, pass the level of their exact required
 * ProductTag. Product tags are never merged or guessed across entry points.
 */
export function resolveApkMainPluginDeviceAcquisition(
	homeData: ApkAppPluginHomeDataContext,
	targetDuid: string,
	entry: ApkMainPluginEntry = { kind: "device" },
): ApkMainPluginDeviceAcquisitionRequest {
	const { device, product, productId } = resolveApkHomeDataDeviceProduct(
		homeData,
		nonEmptyString(targetDuid, "targetDuid"),
	);
	if (!product || !productId) {
		throw new Error(`HomeData-Gerät ${targetDuid} besitzt kein zugeordnetes V5-Produkt`);
	}
	const model = nonEmptyString(
		device.model,
		`HomeData-Gerät ${targetDuid}.model`,
	);
	nonEmptyString(
		product.model,
		`HomeData-Produkt ${productId}.model`,
	);
	const base = {
		model,
		productId: positiveProductId(product.id),
	};
	if (entry.kind === "device") {
		return base;
	}
	const tagName = nonEmptyString(entry.tagName, "ProductTag-Name");
	const tag = productTag(product, tagName);
	if (tag.requirePlugin !== true) {
		throw new Error(`ProductTag ${tagName} fordert keinen Plugin-Einstieg`);
	}
	return {
		...base,
		requiredPluginLevel: nonNegativePluginLevel(tag.pluginLevel, tagName),
	};
}
