import type { FeatureDependencies } from "../../baseDeviceFeatures";
import { VACUUM_CONSTANTS } from "../vacuumConstants";

export class StationService {
	constructor(
		private deps: FeatureDependencies,
		private duid: string
	) {}

	public async initDockingStationStatus(): Promise<void> {
		await this.deps.ensureFolder(`Devices.${this.duid}.dockingStationStatus`);

		// Define status definitions with their respective translation keys for "Error/Maintenance" state (value 1)
		const statusDefinitions: Record<string, string> = {
			"cleanFluidStatus": "dock_info_clean_fluid_exception",
			"waterBoxFilterStatus": "dock_info_item_gone_exception",
			"dustBagStatus": "dock_info_dust_bag_exception",
			"dirtyWaterBoxStatus": "dock_info_dirty_water_box_exception1",
			"clearWaterBoxStatus": "dock_info_clear_water_box_exception1",
			"isUpdownWaterReady": "inner_error_name_152"
		};

		// Common states for 0 (Not Supported), 2 (OK), 3 (Unknown)
		const txtNotSupported = this.deps.adapter.translationManager.get("localization_strings_Setting_General_index_0", "Not supported");
		const txtOK = this.deps.adapter.translationManager.get("localization_strings_Main_Error_ErrorDetailPage_3", "OK");
		const txtUnknown = this.deps.adapter.translationManager.get("localization_strings_Setting_General_index_0", "Unknown");

		for (const [name, errorKey] of Object.entries(statusDefinitions)) {
			// If errorKey itself is not in translation, we use a generic native Roborock key as fallback.
			const commonFallbackKey = errorKey.includes("error_") ? "localization_strings_Main_Error_ErrorDetailPage_3" : "dust_collection_life12";
			const txtMaintenance = this.deps.adapter.translationManager.get(errorKey, this.deps.adapter.translationManager.get(commonFallbackKey));

			const states = {
				"0": txtNotSupported,
				"1": txtMaintenance,
				"2": txtOK,
				"3": txtUnknown
			};

			// Fetch localized name for the state itself
			const nameKey = VACUUM_CONSTANTS.dockingStationTranslationKeys[name as keyof typeof VACUUM_CONSTANTS.dockingStationTranslationKeys];
			const localizedName = nameKey ? this.deps.adapter.translationManager.get(nameKey, name) : name;

			await this.deps.ensureState(`Devices.${this.duid}.dockingStationStatus.${name}`, {
				name: localizedName,
				type: "number",
				role: "value",
				read: true,
				write: false,
				states: states
			});
		}
	}

	public async updateDockingStationStatus(dss: number): Promise<void> {
		const status = {
			cleanFluidStatus: ((dss >> 10) & 0b11),
			waterBoxFilterStatus: ((dss >> 8) & 0b11),
			dustBagStatus: ((dss >> 6) & 0b11),
			dirtyWaterBoxStatus: ((dss >> 4) & 0b11),
			clearWaterBoxStatus: ((dss >> 2) & 0b11),
			isUpdownWaterReady: (dss & 0b11),
		};

		for (const [name, val] of Object.entries(status)) {
			await this.deps.adapter.setStateChanged(`Devices.${this.duid}.dockingStationStatus.${name}`, { val, ack: true });
		}
	}
}
