import type {
	ApkAppPluginHomeDataContext,
} from "./apkAppPluginSessionDescriptor";

export type ApkHomeDataJsonRecord = Readonly<Record<string, unknown>>;

export interface ApkHomeDataDeviceProduct {
	readonly device: ApkHomeDataJsonRecord;
	readonly product?: ApkHomeDataJsonRecord;
	readonly productId?: string;
}

function record(value: unknown, label: string): ApkHomeDataJsonRecord {
	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${label} muss ein JSON-Objekt sein`);
	}
	return value as ApkHomeDataJsonRecord;
}

function parseJsonRecord(value: string, label: string): ApkHomeDataJsonRecord {
	let parsed: unknown;
	try {
		parsed = JSON.parse(value) as unknown;
	} catch {
		throw new Error(`${label} ist kein gültiges JSON`);
	}
	return record(parsed, label);
}

export function apkHomeDataIdentifier(value: unknown): string | undefined {
	if (typeof value === "string" && value.length > 0) return value;
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
	return undefined;
}

function productById(
	productJsonStrings: readonly string[],
): ReadonlyMap<string, ApkHomeDataJsonRecord> {
	const products = new Map<string, ApkHomeDataJsonRecord>();
	for (const [index, json] of productJsonStrings.entries()) {
		const product = parseJsonRecord(json, `HomeData-Produkt ${index}`);
		const id = apkHomeDataIdentifier(product.id);
		if (!id) continue;
		const existing = products.get(id);
		if (existing && JSON.stringify(existing) !== JSON.stringify(product)) {
			throw new Error(`HomeData enthält widersprüchliche Produkte für ID ${id}`);
		}
		products.set(id, product);
	}
	return products;
}

/**
 * Resolves the exact device/product pair used by the APK's DeviceManipulator.
 *
 * The records may contain credentials and therefore remain an internal
 * in-memory boundary. Callers must never log or persist them.
 */
export function resolveApkHomeDataDeviceProduct(
	homeData: ApkAppPluginHomeDataContext,
	targetDuid: string,
): ApkHomeDataDeviceProduct {
	const matches = homeData.deviceJsonStrings
		.map((json, index) => parseJsonRecord(json, `HomeData-Gerät ${index}`))
		.filter(device => device.duid === targetDuid);
	if (matches.length === 0) {
		throw new Error(`HomeData enthält kein Gerät mit DUID ${targetDuid}`);
	}
	if (matches.length > 1) {
		throw new Error(`HomeData enthält die DUID ${targetDuid} mehrfach`);
	}
	const device = matches[0];
	const productId = apkHomeDataIdentifier(device.productId);
	return {
		device,
		product: productId
			? productById(homeData.productJsonStrings).get(productId)
			: undefined,
		productId,
	};
}
