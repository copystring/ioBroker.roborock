export type ApkProductAgreementsByModel = Readonly<Record<string, unknown>>;

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function values(value: unknown): readonly unknown[] {
	return Array.isArray(value) ? value : [];
}

function cloneJsonValue(value: unknown, label: string): unknown {
	if (
		value === null
		|| typeof value === "string"
		|| typeof value === "boolean"
	) {
		return value;
	}
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (Array.isArray(value)) {
		return Object.freeze(value.map((entry, index) =>
			cloneJsonValue(entry, `${label}[${index}]`)));
	}
	if (isRecord(value)) {
		return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, entry]) => [
			key,
			cloneJsonValue(entry, `${label}.${key}`),
		])));
	}
	throw new Error(`${label} muss ein JSON-Wert sein`);
}

export function parseApkProductAgreementsByModel(
	value: unknown,
	label = "productRepository.agreementsByModel",
): ApkProductAgreementsByModel {
	if (!isRecord(value)) throw new Error(`${label} muss ein Objekt sein`);
	return Object.freeze(Object.fromEntries(Object.entries(value).map(([model, agreements]) => {
		if (model.trim().length === 0) throw new Error(`${label} enthält ein leeres Modell`);
		return [model, cloneJsonValue(agreements, `${label}.${model}`)];
	})));
}

/**
 * Reproduces the product-agreement cache populated by
 * ProductRepository.refreshProduct() in the inspected APK. Every V5 product is
 * indexed by its exact model and keeps its raw `agreements` JSON value.
 */
export function createApkProductAgreementsByModel(
	productResponse: unknown,
): ApkProductAgreementsByModel {
	const response = isRecord(productResponse) ? productResponse : undefined;
	const data = isRecord(response?.data) ? response.data : response;
	const agreementsByModel: Record<string, unknown> = {};

	for (const detailValue of values(data?.categoryDetailList)) {
		const detail = isRecord(detailValue) ? detailValue : undefined;
		for (const productValue of values(detail?.productList)) {
			if (!isRecord(productValue)) continue;
			const model = productValue.model;
			if (typeof model !== "string" || model.length === 0) continue;
			agreementsByModel[model] = Object.prototype.hasOwnProperty.call(
				productValue,
				"agreements",
			)
				? productValue.agreements
				: null;
		}
	}

	return parseApkProductAgreementsByModel(agreementsByModel);
}
