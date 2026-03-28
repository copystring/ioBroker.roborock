import { DeviceModelConfig, FeatureDependencies } from "../../baseDeviceFeatures";
import { B01BaseVacuumFeatures } from "./B01BaseVacuumFeatures";

export class Q7VacuumFeatures extends B01BaseVacuumFeatures {
	constructor(
		dependencies: FeatureDependencies,
		duid: string,
		robotModel: string,
		config: DeviceModelConfig,
		profile?: unknown
	) {
		super(dependencies, duid, robotModel, config, profile, "Q7");
	}
}
