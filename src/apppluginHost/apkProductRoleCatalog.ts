export interface ApkProductRoleProduct {
	readonly prodModel: string;
	readonly catCode: string;
}

export interface ApkProductRoleDefinition {
	readonly role: string;
	readonly products: readonly ApkProductRoleProduct[];
}

export const APK_PRODUCT_USER_ROLES_PATH = "/api/v1/user/roles";

export interface ApkProductRoleHttpClient {
	get(path: string): Promise<Readonly<{ data: unknown }>>;
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmptyString(value: unknown, label: string): string {
	if (typeof value !== "string" || value.length === 0) {
		throw new Error(`${label} muss ein nichtleerer String sein`);
	}
	return value;
}

/**
 * Validates the payload returned by the APK product repository's
 * `/api/v1/user/roles` endpoint without adding device-family knowledge.
 */
export function parseApkProductRoleDefinitions(
	value: unknown,
	label = "productRoles",
): ApkProductRoleDefinition[] {
	if (!Array.isArray(value)) throw new Error(`${label} muss ein Array sein`);
	return value.map((roleValue, roleIndex) => {
		if (!isRecord(roleValue)) {
			throw new Error(`${label}[${roleIndex}] muss ein Objekt sein`);
		}
		if (!Array.isArray(roleValue.products)) {
			throw new Error(`${label}[${roleIndex}].products muss ein Array sein`);
		}
		return {
			role: nonEmptyString(roleValue.role, `${label}[${roleIndex}].role`),
			products: roleValue.products.map((productValue, productIndex) => {
				if (!isRecord(productValue)) {
					throw new Error(
						`${label}[${roleIndex}].products[${productIndex}] muss ein Objekt sein`,
					);
				}
				return {
					prodModel: nonEmptyString(
						productValue.prodModel,
						`${label}[${roleIndex}].products[${productIndex}].prodModel`,
					),
					catCode: nonEmptyString(
						productValue.catCode,
						`${label}[${roleIndex}].products[${productIndex}].catCode`,
					),
				};
			}),
		};
	});
}

/**
 * The APK's Retrofit adapter returns the role list directly. The adapter's
 * existing Axios client sees Roborock's outer `data` envelope, so both sides
 * of that single transport boundary are accepted explicitly.
 */
export function parseApkProductRoleApiResponse(value: unknown): ApkProductRoleDefinition[] {
	if (Array.isArray(value)) return parseApkProductRoleDefinitions(value);
	if (isRecord(value) && Array.isArray(value.data)) {
		return parseApkProductRoleDefinitions(value.data);
	}
	throw new Error("Produktrollen-Antwort enthält keine Rollenliste");
}

export async function loadApkProductRoleDefinitions(
	client: ApkProductRoleHttpClient,
): Promise<ApkProductRoleDefinition[]> {
	const response = await client.get(APK_PRODUCT_USER_ROLES_PATH);
	return parseApkProductRoleApiResponse(response.data);
}

/**
 * Local equivalent of the APK's ProductLocalSource role/category/model map.
 * The API response is indexed once; every RRPluginSDK.getUserRole call is a
 * synchronous local lookup. A model entry of `all` applies to every model.
 */
export class ApkProductRoleCatalog {
	readonly #roleCategoryModels = new Map<string, ReadonlyMap<string, readonly string[]>>();

	public constructor(definitions: readonly ApkProductRoleDefinition[] = []) {
		for (const definition of parseApkProductRoleDefinitions(definitions)) {
			const categoryModels = new Map<string, string[]>();
			for (const product of definition.products) {
				const models = categoryModels.get(product.catCode) ?? [];
				models.push(product.prodModel);
				categoryModels.set(product.catCode, models);
			}
			// ProductLocalSource is role-keyed. Repeated role records therefore
			// replace the previous value without changing insertion order.
			this.#roleCategoryModels.set(definition.role, categoryModels);
		}
	}

	public getUserRole(model: string, code: string): string {
		const roles: string[] = [];
		for (const [role, categoryModels] of this.#roleCategoryModels) {
			const models = categoryModels.get(code);
			if (models?.includes("all") || models?.includes(model)) roles.push(role);
		}
		return roles.join(",");
	}
}
