/** The existing device handlers and transport decoder implement vacuum semantics only. */
export function isLegacyVacuumDevice(model: string | null | undefined, category: string | null | undefined): boolean {
	if (!model) return false;
	const vacuumModel = model.startsWith("roborock.vacuum.");
	const vacuumCategory = category === "robot.vacuum.cleaner" || category === "roborock.vacuum";
	// An explicit non-vacuum category always wins, including conflicting product data.
	if (category && !vacuumCategory) return false;
	// A conflicting Roborock device class must not acquire vacuum controls.
	if (model.startsWith("roborock.") && !vacuumModel) return false;
	// A known vacuum model remains usable when the product category is unavailable.
	return vacuumModel || vacuumCategory;
}

export interface LegacyDeviceCatalog {
	getRobotModel(duid: string): string | null;
	getProductCategory(duid: string): string | null;
}

export function isLegacyVacuumDuid(catalog: LegacyDeviceCatalog, duid: string): boolean {
	return isLegacyVacuumDevice(catalog.getRobotModel(duid), catalog.getProductCategory(duid));
}
