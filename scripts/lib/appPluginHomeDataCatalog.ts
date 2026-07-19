import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

export interface AppPluginHomeDataRecord {
	name: string;
	model: string;
	featureSet?: string;
	newFeatureSet?: string;
	firmwareVersion?: string;
	protocolVersion?: string;
}

interface ProductSeed {
	id?: string;
	name: string;
	model: string;
}

interface DeviceSeed {
	productId: string;
	featureSet?: string;
	newFeatureSet?: string;
	firmwareVersion?: string;
	protocolVersion?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value: unknown): string | undefined {
	return typeof value === "string" && value.trim().length > 0
		? value.trim()
		: undefined;
}

function visitHomeData(
	value: unknown,
	products: ProductSeed[],
	devices: DeviceSeed[],
): void {
	if (Array.isArray(value)) {
		for (const item of value) visitHomeData(item, products, devices);
		return;
	}
	if (!isRecord(value)) return;

	const model = nonEmptyString(value.model);
	const name = nonEmptyString(value.name);
	if (model && name) {
		products.push({
			id: nonEmptyString(value.id) ?? nonEmptyString(value.rrPid) ?? nonEmptyString(value.productId),
			name,
			model,
		});
	}

	const productId = nonEmptyString(value.productId);
	const featureSet = nonEmptyString(value.featureSet);
	const newFeatureSet = nonEmptyString(value.newFeatureSet);
	const firmwareVersion = nonEmptyString(value.fv);
	const protocolVersion = nonEmptyString(value.pv);
	if (productId && (featureSet || newFeatureSet || firmwareVersion || protocolVersion)) {
		devices.push({
			productId,
			featureSet,
			newFeatureSet,
			firmwareVersion,
			protocolVersion,
		});
	}

	for (const child of Object.values(value)) visitHomeData(child, products, devices);
}

function jsonBodies(capture: string): unknown[] {
	const bodies: unknown[] = [];
	for (const line of capture.split(/\r?\n/u)) {
		const markerIndex = line.indexOf("[BODY]");
		if (markerIndex < 0) continue;
		const jsonStart = line.indexOf("{", markerIndex + "[BODY]".length);
		if (jsonStart < 0) continue;
		try {
			bodies.push(JSON.parse(line.slice(jsonStart)) as unknown);
		} catch {
			// HTTP logs may contain unrelated, truncated bodies. Only complete
			// JSON HomeData responses are relevant for this sanitized catalog.
		}
	}
	return bodies;
}

function recordScore(record: AppPluginHomeDataRecord): number {
	return [
		record.featureSet,
		record.newFeatureSet,
		record.firmwareVersion,
		record.protocolVersion,
	].filter(Boolean).length;
}

/**
 * Extracts only non-secret AppPlugin selection metadata from an original APK
 * HTTP capture. Device ids, serial numbers, local keys, account data and raw
 * device state never leave the source capture.
 */
export function parseAppPluginHomeDataCapture(capture: string): AppPluginHomeDataRecord[] {
	const products: ProductSeed[] = [];
	const devices: DeviceSeed[] = [];
	for (const body of jsonBodies(capture)) visitHomeData(body, products, devices);

	const productById = new Map(
		products
			.filter(product => product.id)
			.map(product => [product.id!, product] as const),
	);
	const records = new Map<string, AppPluginHomeDataRecord>();
	const addRecord = (record: AppPluginHomeDataRecord): void => {
		const key = `${normalizeAppPluginProductName(record.name)}\0${record.model.toLowerCase()}`;
		const existing = records.get(key);
		if (!existing || recordScore(record) > recordScore(existing)) records.set(key, record);
	};

	for (const product of products) {
		addRecord({ name: product.name, model: product.model });
	}
	for (const device of devices) {
		const product = productById.get(device.productId);
		if (!product) continue;
		addRecord({
			name: product.name,
			model: product.model,
			featureSet: device.featureSet,
			newFeatureSet: device.newFeatureSet,
			firmwareVersion: device.firmwareVersion,
			protocolVersion: device.protocolVersion,
		});
	}
	return [...records.values()].sort((left, right) =>
		left.name.localeCompare(right.name) || left.model.localeCompare(right.model));
}

export function normalizeAppPluginProductName(value: string): string {
	return value
		.normalize("NFKC")
		.toLocaleLowerCase("en-US")
		.replace(/[^\p{Letter}\p{Number}]+/gu, " ")
		.trim()
		.replace(/\s+/gu, " ")
		.replace(/^roborock\s+/u, "");
}

export function matchAppPluginHomeDataRecord(
	aliases: readonly string[],
	records: readonly AppPluginHomeDataRecord[],
): AppPluginHomeDataRecord | undefined {
	const aliasNames = new Set(aliases.map(normalizeAppPluginProductName));
	const matches = records.filter(record => aliasNames.has(normalizeAppPluginProductName(record.name)));
	const models = new Set(matches.map(record => record.model));
	return matches.length > 0 && models.size === 1
		? matches.sort((left, right) => recordScore(right) - recordScore(left))[0]
		: undefined;
}

function defaultHomeDataCapturePath(): string {
	return path.join(
		os.homedir(),
		"Desktop",
		"roborock_reverse_engineering",
		"frida_sniffing",
		"roborock_http.txt",
	);
}

function readCapturedText(sourcePath: string): string {
	const bytes = fs.readFileSync(sourcePath);
	if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
		return bytes.subarray(2).toString("utf16le");
	}
	if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
		const swapped = Buffer.allocUnsafe(bytes.length - 2);
		for (let index = 2; index + 1 < bytes.length; index += 2) {
			swapped[index - 2] = bytes[index + 1];
			swapped[index - 1] = bytes[index];
		}
		return swapped.toString("utf16le");
	}
	return bytes.toString("utf8").replace(/^\uFEFF/u, "");
}

export function readAppPluginHomeDataCatalog(
	sourcePaths = (process.env.ROBOROCK_HOMEDATA_SOURCES
		?.split(path.delimiter)
		.filter(Boolean) ?? [defaultHomeDataCapturePath()]),
): AppPluginHomeDataRecord[] {
	const records: AppPluginHomeDataRecord[] = [];
	for (const sourcePath of sourcePaths) {
		if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) continue;
		records.push(...parseAppPluginHomeDataCapture(readCapturedText(sourcePath)));
	}
	const unique = new Map<string, AppPluginHomeDataRecord>();
	for (const record of records) {
		const key = `${normalizeAppPluginProductName(record.name)}\0${record.model.toLowerCase()}`;
		const existing = unique.get(key);
		if (!existing || recordScore(record) > recordScore(existing)) unique.set(key, record);
	}
	return [...unique.values()];
}
