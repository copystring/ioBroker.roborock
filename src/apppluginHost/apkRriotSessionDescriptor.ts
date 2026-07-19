import {
	parseApkAppPluginSessionDescriptor,
	type ApkAppPluginAccountContext,
	type ApkAppPluginDeviceContext,
	type ApkAppPluginHomeDataContext,
	type ApkAppPluginHostIdentity,
	type ApkAppPluginInstallationContext,
	type ApkAppPluginPackageMetadata,
	type ApkAppPluginSessionDescriptor,
} from "./apkAppPluginSessionDescriptor";

interface JsonRecord {
	[key: string]: unknown;
}

export interface ApkRriotSessionDescriptorInput {
	readonly pluginRoot: string;
	readonly package: ApkAppPluginPackageMetadata;
	readonly homeData: ApkAppPluginHomeDataContext;
	readonly installation?: ApkAppPluginInstallationContext;
	readonly targetDuid: string;
	readonly userId: string;
	readonly host: ApkAppPluginHostIdentity;
	readonly account?: ApkAppPluginAccountContext;
	/**
	 * Dynamic SDK values returned by getDeviceExtraInfoForKey(). These are not
	 * the static RRPluginSDK deviceExtra constant, which is always empty.
	 */
	readonly deviceProperties: Readonly<Record<string, unknown>>;
	readonly timestampMs?: number;
	readonly baseDirectory?: string;
}

function record(value: unknown, label: string): JsonRecord {
	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`${label} muss ein JSON-Objekt sein`);
	}
	return value as JsonRecord;
}

function parseJsonRecord(value: string, label: string): JsonRecord {
	let parsed: unknown;
	try {
		parsed = JSON.parse(value) as unknown;
	} catch {
		throw new Error(`${label} ist kein gültiges JSON`);
	}
	return record(parsed, label);
}

function nonEmptyString(value: unknown, label: string): string {
	if (typeof value !== "string" || value.length === 0) {
		throw new Error(`${label} muss ein nichtleerer String sein`);
	}
	return value;
}

function optionalString(value: unknown): string | undefined {
	return typeof value === "string" && value.length > 0 ? value : undefined;
}

function identifier(value: unknown): string | undefined {
	if (typeof value === "string" && value.length > 0) return value;
	if (typeof value === "number" && Number.isFinite(value)) return String(value);
	return undefined;
}

function nonNegativeFiniteNumber(value: unknown, label: string): number {
	if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
		throw new Error(`${label} muss eine nichtnegative endliche Zahl sein`);
	}
	return value;
}

function productById(
	productJsonStrings: readonly string[],
): ReadonlyMap<string, JsonRecord> {
	const products = new Map<string, JsonRecord>();
	for (const [index, json] of productJsonStrings.entries()) {
		const product = parseJsonRecord(json, `HomeData-Produkt ${index}`);
		const id = identifier(product.id);
		if (!id) continue;
		const existing = products.get(id);
		if (existing && JSON.stringify(existing) !== JSON.stringify(product)) {
			throw new Error(`HomeData enthält widersprüchliche Produkte für ID ${id}`);
		}
		products.set(id, product);
	}
	return products;
}

function targetDevice(
	deviceJsonStrings: readonly string[],
	targetDuid: string,
): JsonRecord {
	const matches = deviceJsonStrings
		.map((json, index) => parseJsonRecord(json, `HomeData-Gerät ${index}`))
		.filter(device => device.duid === targetDuid);
	if (matches.length === 0) {
		throw new Error(`HomeData enthält kein Gerät mit DUID ${targetDuid}`);
	}
	if (matches.length > 1) {
		throw new Error(`HomeData enthält die DUID ${targetDuid} mehrfach`);
	}
	return matches[0];
}

/**
 * Mirrors java.util.TimeZone.getTimeZone(id).getOffset(timestamp) for an IANA
 * zone. Android falls back to GMT for an unknown ID; the desktop host does the
 * same instead of substituting the PC's local zone.
 */
export function apkTimeZoneOffsetMilliseconds(
	timeZone: string,
	timestampMs: number,
): number {
	if (!Number.isFinite(timestampMs)) throw new Error("Zeitstempel muss eine endliche Zahl sein");
	const wholeSecond = Math.trunc(timestampMs / 1_000) * 1_000;
	let formatter: Intl.DateTimeFormat;
	try {
		formatter = new Intl.DateTimeFormat("en-US", {
			timeZone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hourCycle: "h23",
		});
	} catch {
		return 0;
	}
	const parts = Object.fromEntries(
		formatter.formatToParts(new Date(wholeSecond))
			.filter(part => part.type !== "literal")
			.map(part => [part.type, Number(part.value)]),
	) as Record<string, number>;
	return Date.UTC(
		parts.year,
		parts.month - 1,
		parts.day,
		parts.hour,
		parts.minute,
		parts.second,
	) - wholeSecond;
}

export function associateApkPackageWithDeviceModel(
	packageMetadata: ApkAppPluginPackageMetadata,
	deviceModel: string,
): ApkAppPluginPackageMetadata {
	return {
		...packageMetadata,
		models: [...new Set([...packageMetadata.models, deviceModel])],
	};
}

export function createApkRriotDeviceContext(
	input: Pick<
		ApkRriotSessionDescriptorInput,
		"homeData" | "targetDuid" | "userId" | "deviceProperties" | "timestampMs"
	>,
): ApkAppPluginDeviceContext {
	const duid = nonEmptyString(input.targetDuid, "targetDuid");
	const device = targetDevice(input.homeData.deviceJsonStrings, duid);
	const products = productById(input.homeData.productJsonStrings);
	const productId = identifier(device.productId);
	const product = productId ? products.get(productId) : undefined;
	const model = optionalString(device.model) ?? optionalString(product?.model);
	if (!model) {
		throw new Error(`HomeData-Gerät ${duid} besitzt kein auflösbares Modell`);
	}
	const timeZone = nonEmptyString(device.timeZone, `HomeData-Gerät ${duid}.timeZone`);
	const name = device.name === undefined || device.name === null
		? null
		: nonEmptyString(device.name, `HomeData-Gerät ${duid}.name`);
	return {
		userId: input.userId,
		ownerId: input.userId,
		deviceId: duid,
		deviceSN: optionalString(device.sn) ?? "",
		model,
		name,
		firmwareVersion: optionalString(device.fv),
		protocolVersion: nonEmptyString(device.pv, `HomeData-Gerät ${duid}.pv`),
		deviceProperties: { ...input.deviceProperties },
		activeTime: nonNegativeFiniteNumber(
			device.activeTime,
			`HomeData-Gerät ${duid}.activeTime`,
		),
		robotTimeZone: apkTimeZoneOffsetMilliseconds(
			timeZone,
			input.timestampMs ?? Date.now(),
		),
		iotType: 2,
	};
}

export function createApkRriotSessionDescriptor(
	input: ApkRriotSessionDescriptorInput,
): ApkAppPluginSessionDescriptor {
	const device = createApkRriotDeviceContext(input);
	return parseApkAppPluginSessionDescriptor({
		version: 1,
		pluginRoot: input.pluginRoot,
		package: associateApkPackageWithDeviceModel(input.package, device.model),
		device,
		host: input.host,
		account: input.account,
		homeData: input.homeData,
		installation: input.installation,
	}, input.baseDirectory ?? process.cwd());
}
