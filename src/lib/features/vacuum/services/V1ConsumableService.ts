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
			const val = resultObj[key];

			const common = this.getCommonDeviceStates(key) || { name: key, type: typeof val as ioBroker.CommonType, role: "value", write: false };

			// Check for specific consumables
			if (["main_brush_work_time", "side_brush_work_time", "filter_work_time", "filter_element_work_time", "sensor_dirty_time", "strainer_work_times", "cleaning_brush_work_times"].includes(key)) {
				const deviceName = key.replace("_work_time", "").replace("_dirty_time", "").replace("_work_times", "");
				await this.deps.ensureState(`Devices.${this.duid}.consumables.${deviceName}`, { ...common, unit: "%" });

				const fullLifeHours = this.profile.consumableLifeHours || {
					"main_brush": 300,
					"side_brush": 200,
					"filter": 150,
					"filter_element": 150,
					"sensor": 30,
					"strainer": 150, // Default assumption
					"cleaning_brush": 300 // Default assumption
				};
				const totalTime = (fullLifeHours[deviceName] || 0) * 3600;

				if (totalTime > 0) {
					const percent = Math.round(100 - (val / totalTime) * 100);
					await this.adapter.setStateChanged(`Devices.${this.duid}.consumables.${deviceName}`, { val: percent, ack: true });
				}
			} else {
				// Only process if it looks like a consumable (has work_time or dirty_time) OR is in a whitelist
				// For now, to keep it simple but safe, we only process keys that are either work_time/dirty_time
				// or explicitly defined as consumables in constants.
				if (key.endsWith("_work_time") || key.endsWith("_dirty_time") || key.endsWith("_work_times") || VACUUM_CONSTANTS.consumables[key as keyof typeof VACUUM_CONSTANTS.consumables]) {
					await this.deps.ensureState(`Devices.${this.duid}.consumables.${key}`, common);
					await this.adapter.setStateChanged(`Devices.${this.duid}.consumables.${key}`, { val: val, ack: true });
				}
			}

			if (key.endsWith("_work_time") || key.endsWith("_dirty_time") || key.endsWith("_work_times")) {
				const resetKey = key.replace("_work_time", "").replace("_dirty_time", "").replace("_work_times", "");
				await this.deps.ensureState(`Devices.${this.duid}.resetConsumables.reset_${resetKey}`, {
					name: `Reset ${resetKey}`,
					type: "boolean",
					role: "button",
					write: true,
					def: false
				}, { resetParam: key });
			}
		}
	}

	public async updateConsumablesPercent(): Promise<void> {
		const device = this.deps.adapter.http_api.getDevices().find((d: any) => d.duid === this.duid);
		if (!device?.deviceStatus) return;
		const status = device.deviceStatus as Record<string, number>;

		const consumableMap: Record<string, string> = {
			"125": "main_brush_life",
			"126": "side_brush_life",
			"127": "filter_life",
		};

		for (const [attribute, value] of Object.entries(status)) {
			if (attribute === "125" || attribute === "126" || attribute === "127") {
				const val = value >= 0 && value <= 100 ? value : 0;
				const mappedName = consumableMap[attribute];
				const common = VACUUM_CONSTANTS.consumables[mappedName as keyof typeof VACUUM_CONSTANTS.consumables];

				await this.adapter.ensureState(`Devices.${this.duid}.consumables.${mappedName}`, common || {});
				await this.adapter.setStateChanged(`Devices.${this.duid}.consumables.${mappedName}`, { val, ack: true });
			}
		}
	}

	// Helper from V1VacuumFeatures but using CONSTANTS directly
	private getCommonDeviceStates(attribute: string | number): Partial<ioBroker.StateCommon> | undefined {
		const stateDef = VACUUM_CONSTANTS.deviceStates[attribute as keyof typeof VACUUM_CONSTANTS.deviceStates];
		if (!stateDef) return undefined;

		return { ...stateDef } as Partial<ioBroker.StateCommon>;
	}
}
