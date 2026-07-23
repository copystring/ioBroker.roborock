import type { ApkAuthenticatedHttpAdapterPorts } from "./apkAxiosRestfulHttpService";
import type {
	ApkAppPluginAccountContext,
	ApkAppPluginHomeDataContext,
	ApkAppPluginProductRepositoryContext,
	ApkAppPluginSessionDescriptor,
} from "./apkAppPluginSessionDescriptor";
import type { ApkAppPluginCloudBootstrapContext } from "./apkHomeDataContext";
import { resolveApkHomeDataDeviceProduct } from "./apkHomeDataLookup";
import {
	parseApkProductRoleDefinitions,
} from "./apkProductRoleCatalog";
import {
	createApkRriotSessionDescriptor,
	type ApkRriotSessionDescriptorInput,
} from "./apkRriotSessionDescriptor";
import {
	resolveApkMainPluginDeviceAcquisition,
	type ApkMainPluginDeviceAcquisitionRequest,
	type ApkMainPluginEntry,
} from "./apkMainPluginEntry";

export interface ApkAppPluginAuthenticatedAccountRuntimeOptions {
	readonly cloudBootstrap: ApkAppPluginCloudBootstrapContext;
	readonly httpPorts: ApkAuthenticatedHttpAdapterPorts;
	readonly productRepository: ApkAppPluginProductRepositoryContext;
}

export type ApkAuthenticatedAppPluginSessionInput = Omit<
	ApkRriotSessionDescriptorInput,
	"account" | "homeData" | "productRepository" | "userId"
>;

export interface ApkAppPluginAuthenticatedAccountSummary {
	readonly countryCode: string;
	readonly deviceCount: number;
	readonly productCount: number;
	readonly roleCount: number;
	readonly serverCode: string;
	readonly userId: string;
}

function nonEmptyString(value: unknown, label: string): string {
	if (typeof value !== "string" || value.trim().length === 0) {
		throw new Error(`${label} muss ein nichtleerer String sein`);
	}
	return value;
}

function cloneAccount(account: ApkAppPluginAccountContext | undefined): ApkAppPluginAccountContext {
	if (!account) {
		throw new Error("Der angemeldeten AppPlugin-Sitzung fehlen Land oder Serverregion");
	}
	return Object.freeze({
		countryCode: nonEmptyString(account.countryCode, "account.countryCode"),
		serverCode: nonEmptyString(account.serverCode, "account.serverCode"),
	});
}

function cloneJsonStrings(values: readonly string[], label: string): readonly string[] {
	if (!Array.isArray(values)) throw new Error(`${label} muss ein Array sein`);
	return Object.freeze(values.map((value, index) => {
		const json = nonEmptyString(value, `${label}[${index}]`);
		let parsed: unknown;
		try {
			parsed = JSON.parse(json);
		} catch (error) {
			throw new Error(`${label}[${index}] enthält kein gültiges JSON`, { cause: error });
		}
		if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
			throw new Error(`${label}[${index}] enthält kein JSON-Objekt`);
		}
		return json;
	}));
}

function cloneHomeData(homeData: ApkAppPluginHomeDataContext): ApkAppPluginHomeDataContext {
	const deviceJsonStrings = cloneJsonStrings(homeData.deviceJsonStrings, "homeData.deviceJsonStrings");
	if (deviceJsonStrings.length === 0) {
		throw new Error("Die angemeldete AppPlugin-Sitzung enthält kein HomeData-Gerät");
	}
	return Object.freeze({
		deviceJsonStrings,
		productJsonStrings: cloneJsonStrings(
			homeData.productJsonStrings,
			"homeData.productJsonStrings",
		),
	});
}

/**
 * Immutable post-login boundary shared by all device-class-neutral AppPlugin
 * runtimes of one account generation.
 *
 * Cloud credentials stay captured by the authenticated adapter HTTP ports.
 * Only APK-visible account fields and raw HomeData cross into a device session.
 */
export class ApkAppPluginAuthenticatedAccountRuntime {
	readonly #account: ApkAppPluginAccountContext;
	readonly #homeData: ApkAppPluginHomeDataContext;
	readonly #httpPorts: ApkAuthenticatedHttpAdapterPorts;
	readonly #packageProductIdsByModel: ReadonlyMap<string, number>;
	readonly #productRepository: ApkAppPluginProductRepositoryContext;
	readonly #userId: string;

	public constructor(options: Readonly<ApkAppPluginAuthenticatedAccountRuntimeOptions>) {
		this.#userId = nonEmptyString(options.cloudBootstrap.userId, "cloudBootstrap.userId");
		this.#account = cloneAccount(options.cloudBootstrap.account);
		this.#homeData = cloneHomeData(options.cloudBootstrap.homeData);
		const packageProductIdsByModel = new Map<string, number>();
		for (const product of options.cloudBootstrap.packageProducts ?? []) {
			const model = nonEmptyString(product.model, "packageProducts.model");
			if (!Number.isSafeInteger(product.id) || product.id <= 0) {
				throw new Error(`V5-Paketprodukt ${model} besitzt keine positive numerische ID`);
			}
			const existing = packageProductIdsByModel.get(model);
			if (existing !== undefined && existing !== product.id) {
				throw new Error(`V5-Paketkatalog enthält widersprüchliche IDs für ${model}`);
			}
			packageProductIdsByModel.set(model, product.id);
		}
		this.#packageProductIdsByModel = packageProductIdsByModel;
		this.#productRepository = Object.freeze({
			userRoles: Object.freeze(parseApkProductRoleDefinitions(
				options.productRepository.userRoles,
				"productRepository.userRoles",
			)),
		});
		if (!options.httpPorts?.iot || !options.httpPorts.user) {
			throw new Error("Der angemeldeten AppPlugin-Sitzung fehlen User- oder IoT-HTTP-Ports");
		}
		this.#httpPorts = options.httpPorts;
	}

	public authenticatedHttpPorts(): ApkAuthenticatedHttpAdapterPorts {
		return this.#httpPorts;
	}

	public summary(): Readonly<ApkAppPluginAuthenticatedAccountSummary> {
		return Object.freeze({
			countryCode: this.#account.countryCode,
			deviceCount: this.#homeData.deviceJsonStrings.length,
			productCount: this.#homeData.productJsonStrings.length,
			roleCount: this.#productRepository.userRoles.length,
			serverCode: this.#account.serverCode,
			userId: this.#userId,
		});
	}

	public createSessionDescriptor(
		input: Readonly<ApkAuthenticatedAppPluginSessionInput>,
	): ApkAppPluginSessionDescriptor {
		const resolved = resolveApkHomeDataDeviceProduct(this.#homeData, input.targetDuid);
		if (!resolved.product) {
			throw new Error(
				`HomeData-Gerät ${input.targetDuid} besitzt kein zugeordnetes Produkt`,
			);
		}
		return createApkRriotSessionDescriptor({
			...input,
			account: this.#account,
			homeData: this.#homeData,
			productRepository: this.#productRepository,
			userId: this.#userId,
		});
	}

	/** Resolves the APK's package request without exposing the captured HomeData. */
	public resolveDevicePackage(
		targetDuid: string,
		entry: ApkMainPluginEntry = { kind: "device" },
	): ApkMainPluginDeviceAcquisitionRequest {
		const resolved = resolveApkHomeDataDeviceProduct(this.#homeData, targetDuid);
		if (!resolved.product || !resolved.productId) {
			throw new Error(`HomeData-Gerät ${targetDuid} besitzt kein zugeordnetes Produkt`);
		}
		const model = nonEmptyString(
			resolved.product.model,
			`HomeData-Produkt ${resolved.productId}.model`,
		);
		const packageProductId = this.#packageProductIdsByModel.get(model);
		if (packageProductId === undefined) {
			throw new Error(`V5-Paketkatalog enthält das Gerätemodell ${model} nicht`);
		}
		return resolveApkMainPluginDeviceAcquisition(
			this.#homeData,
			targetDuid,
			entry,
			packageProductId,
		);
	}
}
