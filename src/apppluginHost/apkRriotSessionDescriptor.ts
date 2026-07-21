import {
	parseApkAppPluginSessionDescriptor,
	type ApkAppPluginAccountContext,
	type ApkAppPluginDeviceContext,
	type ApkAppPluginHomeDataContext,
	type ApkAppPluginHostIdentity,
	type ApkAppPluginInstallationContext,
	type ApkAppPluginProductRepositoryContext,
	type ApkAppPluginPackageMetadata,
	type ApkAppPluginSessionDescriptor,
} from "./apkAppPluginSessionDescriptor";
import {
	resolveApkHomeDataDeviceProduct,
} from "./apkHomeDataLookup";

export interface ApkRriotSessionDescriptorInput {
	readonly pluginRoot: string;
	readonly package: ApkAppPluginPackageMetadata;
	readonly homeData: ApkAppPluginHomeDataContext;
	readonly installation?: ApkAppPluginInstallationContext;
	readonly productRepository?: ApkAppPluginProductRepositoryContext;
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

function nonEmptyString(value: unknown, label: string): string {
	if (typeof value !== "string" || value.length === 0) {
		throw new Error(`${label} muss ein nichtleerer String sein`);
	}
	return value;
}

function optionalString(value: unknown): string | undefined {
	return typeof value === "string" && value.length > 0 ? value : undefined;
}

function nonNegativeFiniteNumber(value: unknown, label: string): number {
	if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
		throw new Error(`${label} muss eine nichtnegative endliche Zahl sein`);
	}
	return value;
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
	const { device, product } = resolveApkHomeDataDeviceProduct(
		input.homeData,
		duid,
	);
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
		productRepository: input.productRepository,
	}, input.baseDirectory ?? process.cwd());
}
