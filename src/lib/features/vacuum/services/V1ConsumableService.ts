import type { FeatureDependencies } from "../../baseDeviceFeatures";
import type { VacuumProfile } from "../v1VacuumFeatures";
import { VACUUM_CONSTANTS } from "../vacuumConstants";

export class V1ConsumableService {
	private adapter: FeatureDependencies["adapter"];

	constructor(
		private deps: FeatureDependencies,
		private duid: string,
		private profile: VacuumProfile
	) {
		this.adapter = deps.adapter;
	}

	public async updateConsumables(data?: any): Promise<void> {
		let resultObj: Record<string, any> | undefined;

		if (data) {
			resultObj = data;
		} else {
			try {
				const result = await this.deps.adapter.requestsHandler.sendRequest(this.duid, "get_consumable", []);
				if (Array.isArray(result) && result.length > 0 && typeof result[0] === "object") {
					resultObj = result[0];
				} else if (typeof result === "object" && result !== null) {
					resultObj = result as Record<string, any>;
				}
			} catch (e: any) {
				this.adapter.rLog("System", this.duid, "Warn", undefined, undefined, `Failed to update consumables: ${e.message}`, "warn");
			}
		}

		if (resultObj) {
			await this.processConsumables(resultObj);
		}
	}

	protected async processConsumables(resultObj: Record<string, any>): Promise<void> {
		await this.deps.ensureFolder(`Devices.${this.duid}.consumables`);
		await this.deps.ensureFolder(`Devices.${this.duid}.resetConsumables`);

		for (const key in resultObj) {
			if (!key.endsWith("_work_time") && !key.endsWith("_work_times") && !key.endsWith("_dirty_time")) {
				continue;
			}
			let val = resultObj[key];

			// Consumable name normalization (longest suffix first to avoid "strainers")
			const deviceName = key.replace(/(_work_times|_work_time|_dirty_time)$/, "");
			const translationKey = VACUUM_CONSTANTS.consumableTranslationKeys[deviceName as keyof typeof VACUUM_CONSTANTS.consumableTranslationKeys];
			const localizedName = translationKey ? this.adapter.translationManager.get(translationKey, deviceName) : deviceName;

			let unit = "";
			let suffix = "";
			if (key.endsWith("_work_times")) {
				unit = "cycles";
				suffix = " cycles";
			} else if (key.endsWith("_work_time") || key.endsWith("_dirty_time")) {
				const fullLifeHoursMap: Record<string, number> = this.profile.consumableLifeHours || {
					"main_brush": 300,
					"side_brush": 200,
					"filter": 150,
					"filter_element": 150,
					"sensor": 30,
					"strainer": 150,
					"cleaning_brush": 300
				};

				const totalSeconds = (fullLifeHoursMap[deviceName] || 0) * 3600;

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
			await this.adapter.setStateChanged(`Devices.${this.duid}.consumables.${key}`, { val: val, ack: true });

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
}
