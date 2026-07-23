import type {
	ApkAppPluginAccountContext,
	ApkAppPluginHomeDataContext,
} from "./apkAppPluginSessionDescriptor";

export interface ApkAppPluginCloudBootstrapContext {
	readonly userId: string;
	readonly account?: ApkAppPluginAccountContext;
	readonly homeData: ApkAppPluginHomeDataContext;
	/** Numeric V5 products are used only to acquire a signed plugin package. */
	readonly packageProducts?: readonly ApkAppPluginPackageProduct[];
}

export interface ApkAppPluginPackageProduct {
	readonly id: number;
	readonly model: string;
}

interface DeviceEntry {
	readonly raw: Readonly<Record<string, unknown>>;
	readonly productId?: string;
}

function record(value: unknown): Readonly<Record<string, unknown>> | undefined {
	return value !== null && typeof value === "object" && !Array.isArray(value)
		? value as Readonly<Record<string, unknown>>
		: undefined;
}

function array(value: unknown): readonly unknown[] {
	return Array.isArray(value) ? value : [];
}

function identifier(value: unknown): string | undefined {
	if (typeof value === "string" && value.length > 0) return value;
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
	return undefined;
}

function serializeRawJson(value: Readonly<Record<string, unknown>>, label: string): string {
	try {
		return JSON.stringify(value);
	} catch (error) {
		throw new Error(`${label} konnte nicht als JSON serialisiert werden`, { cause: error });
	}
}

function deviceEntries(homeData: Readonly<Record<string, unknown>>): DeviceEntry[] {
	return [
		...array(homeData.devices),
		...array(homeData.receivedDevices),
	]
		.map(record)
		.filter((value): value is Readonly<Record<string, unknown>> => value !== undefined)
		.map(raw => ({
			raw,
			productId: identifier(raw.productId),
		}));
}

function homeProductEntries(homeData: Readonly<Record<string, unknown>>): ReadonlyMap<string, Readonly<Record<string, unknown>>> {
	const products = new Map<string, Readonly<Record<string, unknown>>>();
	for (const productValue of array(homeData.products)) {
		const product = record(productValue);
		const id = identifier(product?.id);
		if (product && id && !products.has(id)) products.set(id, product);
	}
	return products;
}

function packageProductEntries(productResponse: unknown): readonly ApkAppPluginPackageProduct[] {
	const response = record(productResponse);
	const data = record(response?.data) ?? response;
	const products = new Map<string, ApkAppPluginPackageProduct>();
	for (const detailValue of array(data?.categoryDetailList)) {
		const detail = record(detailValue);
		for (const productValue of array(detail?.productList)) {
			const product = record(productValue);
			const id = Number(product?.id);
			const model = product?.model;
			if (
				Number.isSafeInteger(id)
				&& id > 0
				&& typeof model === "string"
				&& model.length > 0
				&& !products.has(model)
			) {
				products.set(model, Object.freeze({ id, model }));
			}
		}
	}
	return Object.freeze([...products.values()]);
}

/**
 * Reproduces the raw-data boundary used by the APK's DevicesUseCase:
 *
 * - owned devices first, followed by received/shared devices;
 * - each device is exposed as its HomeData JSON object;
 * - product JSON is looked up by each device's productId;
 * - duplicate product JSON strings preserve their first occurrence.
 *
 * The returned strings may contain device credentials because the official APK
 * also keeps the complete device JSON. Callers must keep this context in memory,
 * transfer it only through the bounded process pipe and never log or persist it.
 */
export function createApkAppPluginHomeDataContext(
	homeData: unknown,
): ApkAppPluginHomeDataContext | undefined {
	const homeDataRecord = record(homeData);
	if (!homeDataRecord) return undefined;

	const devices = deviceEntries(homeDataRecord);
	const products = homeProductEntries(homeDataRecord);
	const productJsonStrings: string[] = [];
	const seenProductJson = new Set<string>();
	for (const device of devices) {
		if (!device.productId) continue;
		const product = products.get(device.productId);
		if (!product) continue;
		const json = serializeRawJson(product, `Produkt ${device.productId}`);
		if (seenProductJson.has(json)) continue;
		seenProductJson.add(json);
		productJsonStrings.push(json);
	}

	return {
		deviceJsonStrings: devices.map((device, index) =>
			serializeRawJson(device.raw, `HomeData-Gerät ${index}`)),
		productJsonStrings,
	};
}

/**
 * Selects the account values used by PluginSDKModule from the V4 login result.
 * `rruid` is the exact source of RRPluginSDK.userId in the inspected APK.
 */
export function createApkAppPluginCloudBootstrapContext(
	homeData: unknown,
	productResponse: unknown,
	loginResult: unknown,
): ApkAppPluginCloudBootstrapContext | undefined {
	const context = createApkAppPluginHomeDataContext(homeData);
	const login = record(loginResult);
	const userId = login?.rruid;
	if (!context || typeof userId !== "string") return undefined;
	const countryCode = login?.country;
	const serverCode = login?.region;
	return {
		userId,
		account: typeof countryCode === "string"
			&& countryCode.length > 0
			&& typeof serverCode === "string"
			&& serverCode.length > 0
			? { countryCode, serverCode }
			: undefined,
		homeData: context,
		packageProducts: packageProductEntries(productResponse),
	};
}
