import type { RoborockLocales } from "../../../roborock_locales";
import { FeatureDependencies } from "../../baseDeviceFeatures";
import { VACUUM_CONSTANTS } from "../vacuumConstants";

export class B01ConsumableService {
	constructor(
		private deps: FeatureDependencies,
		private duid: string,
		private locales: RoborockLocales
	) {}

	private readonly PROP_MAP: Record<string, string> = {
		main_brush: "main_brush_work_time",
		side_brush: "side_brush_work_time",
		hypa: "filter_work_time",
		main_sensor: "sensor_dirty_time",
		filter_element: "filter_element_work_time"
	};

	public async updateConsumables(data?: unknown): Promise<void> {
		let resultObj: Record<string, any> | undefined;

		if (data) {
			resultObj = data as Record<string, any>;
		} else {
			const props = VACUUM_CONSTANTS.b01SettingsProps;
			const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "prop.get", { property: props });

			if (Array.isArray(result) && result.length === props.length) {
				resultObj = {};
				props.forEach((key: string, index: number) => {
					const mappedKey = this.PROP_MAP[key] || key;
					resultObj![mappedKey] = result[index];
				});
			} else if (typeof result === "object" && result !== null) {
				resultObj = result as Record<string, any>;
			}
		}

		if (resultObj) {
			await this.processConsumables(resultObj);
		}
	}

	protected async processConsumables(resultObj: Record<string, unknown>): Promise<void> {
		await this.deps.ensureFolder(`Devices.${this.duid}.consumables`);
		await this.deps.ensureFolder(`Devices.${this.duid}.resetConsumables`);

		const consumableKeys = [
			"main_brush_work_time", "side_brush_work_time", "filter_work_time",
			"filter_element_work_time", "sensor_dirty_time", "strainer_work_times",
			"cleaning_brush_work_times", "dust_collection_work_times"
		];

		for (const key in resultObj) {
			const val = resultObj[key];

			// Only process strictly known consumable keys
			if (consumableKeys.includes(key)) {
				const common = this.getCommonDeviceStates(key) || {
					name: this.locales.getNameAll(key) || key,
					type: typeof val as ioBroker.CommonType,
					role: "value",
					write: false
				};

				const deviceName = key.replace("_work_time", "").replace("_dirty_time", "");
				await this.deps.ensureState(`Devices.${this.duid}.consumables.${deviceName}`, { ...common, unit: "%" });

				const totalTime = this.getConsumableLifeSpan(deviceName) * 3600;

				if (totalTime > 0) {
					const percent = Math.max(0, Math.min(100, Math.round(100 - ((val as number) / totalTime) * 100)));
					await this.deps.adapter.setStateChanged(`Devices.${this.duid}.consumables.${deviceName}`, { val: percent, ack: true });
				}

				// Reset button
				const resetKey = key.replace("_work_time", "").replace("_dirty_time", "");
				await this.deps.ensureState(`Devices.${this.duid}.resetConsumables.${resetKey}`, { name: `Reset ${resetKey}`, type: "boolean", role: "button", write: true, def: false });
			}
		}
	}

	private getConsumableLifeSpan(deviceName: string): number {
		switch (deviceName) {
			case "main_brush": return 300;
			case "side_brush": return 200;
			case "filter":
			case "filter_element": return 150;
			case "sensor": return 30;
			default: return 0;
		}
	}

	// Helper to mimic the base class lookup, or we can inject it.
	// For now, simpler to implement a direct lookup or rely on constants.
	private getCommonDeviceStates(key: string): Partial<ioBroker.StateCommon> | undefined {
		// Simplified implementation tapping into VACUUM_CONSTANTS directly
		if (VACUUM_CONSTANTS.consumables[key as keyof typeof VACUUM_CONSTANTS.consumables]) {
			return VACUUM_CONSTANTS.consumables[key as keyof typeof VACUUM_CONSTANTS.consumables];
		}
		return undefined;
	}
}
