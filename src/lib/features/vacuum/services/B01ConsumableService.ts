import type { FeatureDependencies } from "../../baseDeviceFeatures";
import { VACUUM_CONSTANTS } from "../vacuumConstants";

export class B01ConsumableService {
	constructor(
		private deps: FeatureDependencies,
		private duid: string
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
				for (let i = 0; i < props.length; i++) {
					const key = props[i];
					const mappedKey = this.PROP_MAP[key] || key;
					resultObj[mappedKey] = result[i];
				}
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

		for (const key in resultObj) {
			if (!key.endsWith("_work_time") && !key.endsWith("_work_times") && !key.endsWith("_dirty_time")) {
				continue;
			}
			let val = resultObj[key] as number;

			// Consumable name normalization
			const deviceName = key.replace(/(_work_times|_work_time|_dirty_time)$/, "");
			const translationKey = VACUUM_CONSTANTS.consumableTranslationKeys[deviceName as keyof typeof VACUUM_CONSTANTS.consumableTranslationKeys];
			const localizedName = translationKey ? this.deps.adapter.translationManager.get(translationKey, deviceName) : deviceName;

			let unit = "";
			let suffix = "";
			if (key.endsWith("_work_times")) {
				unit = "cycles";
				suffix = " cycles";
			} else if (key.endsWith("_work_time") || key.endsWith("_dirty_time")) {
				const totalSeconds = this.getConsumableLifeSpan(deviceName) * 3600;

				if (totalSeconds > 0) {
					// Convert seconds used to remaining hours
					val = Math.max(0, Math.round((totalSeconds - val) / 3600));
					unit = "h";
					suffix = " remaining time";
				} else {
					unit = "s";
					suffix = " work time";
				}
			}

			// Create/Update the raw state exactly as it comes from the robot (but converted to h if applicable)
			await this.deps.ensureState(`Devices.${this.duid}.consumables.${key}`, {
				name: `${localizedName}${suffix}`,
				type: "number",
				role: "value",
				unit: unit,
				write: false
			});
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.consumables.${key}`, { val: val, ack: true });

			// Reset Button
			const resetKey = `reset_${deviceName}`;
			await this.deps.ensureState(`Devices.${this.duid}.resetConsumables.${resetKey}`, {
				name: `Reset ${localizedName}`,
				type: "boolean",
				role: "button",
				write: true,
				def: false
			}, { resetParam: key });
		}
	}

	private getConsumableLifeSpan(deviceName: string): number {
		switch (deviceName) {
			case "main_brush": return 300;
			case "side_brush": return 200;
			case "filter":
			case "filter_element": return 150;
			case "sensor": return 30;
			case "strainer": return 150;
			case "cleaning_brush": return 300;
			default: return 0;
		}
	}
}
