import { expect } from "chai";
import { BaseDeviceFeatures } from "../baseDeviceFeatures";
import "./index"; // Register all models
import { BaseVacuumFeatures } from "./baseVacuumFeatures";

// Mock dependencies
const mockDependencies: any = {
	adapter: {
		log: {
			debug: () => {},
			info: () => {},
			warn: () => {},
			error: () => {},
			silly: () => {},
		},
		config: {},
		ensureState: () => Promise.resolve(),
		ensureFolder: () => Promise.resolve(),
	},
	log: {
		debug: () => {},
		info: () => {},
		warn: () => {},
		error: () => {},
		silly: () => {},
	},
};

describe("BaseVacuumFeatures - Model Configuration Integrity", () => {
	const registeredModels = BaseDeviceFeatures.getRegisteredModels();

	it("should have registered models", () => {
		expect(registeredModels.length).to.be.greaterThan(0);
	});

	it("should have valid configuration for all registered models", () => {
		const errors: string[] = [];
		registeredModels.forEach((modelId) => {
			try {
				const ModelClass = BaseDeviceFeatures.getRegisteredModelClass(modelId);
				expect(ModelClass).to.not.be.undefined;
				// @ts-ignore
				const instance = new ModelClass(mockDependencies, "test_duid");

				// 1. Instance Check
				expect(instance).to.be.instanceOf(BaseVacuumFeatures);

				// 2. Static Features Check
				// Access protected config via any
				const config = (instance as any).config;
				expect(config).to.exist;
				expect(config.staticFeatures).to.be.an("array");

				// 3. Duplicate Features Check
				const features = config.staticFeatures;
				const uniqueFeatures = new Set(features);
				if (features.length !== uniqueFeatures.size) {
					throw new Error(`Duplicate features found: ${features.filter((item: any, index: number) => features.indexOf(item) !== index)}`);
				}

				// 4. Profile Check
				const profile = (instance as any).profile;
				expect(profile).to.exist;
				expect(profile.mappings).to.exist;
				expect(profile.features).to.exist;
			} catch (e: any) {
				errors.push(`Model ${modelId}: ${e.message}`);
			}
		});

		if (errors.length > 0) {
			throw new Error(`Model configuration errors:\n${errors.join("\n")}`);
		}
	});
});
