"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const baseDeviceFeatures_1 = require("../baseDeviceFeatures");
require("./index"); // Register all models
const baseVacuumFeatures_1 = require("./baseVacuumFeatures");
// Mock dependencies
const mockDependencies = {
    adapter: {
        log: {
            debug: () => { },
            info: () => { },
            warn: () => { },
            error: () => { },
            silly: () => { },
        },
        config: {},
        ensureState: () => Promise.resolve(),
        ensureFolder: () => Promise.resolve(),
    },
    log: {
        debug: () => { },
        info: () => { },
        warn: () => { },
        error: () => { },
        silly: () => { },
    },
};
describe("BaseVacuumFeatures - Model Configuration Integrity", () => {
    const registeredModels = baseDeviceFeatures_1.BaseDeviceFeatures.getRegisteredModels();
    it("should have registered models", () => {
        (0, chai_1.expect)(registeredModels.length).to.be.greaterThan(0);
    });
    it("should have valid configuration for all registered models", () => {
        const errors = [];
        registeredModels.forEach((modelId) => {
            try {
                const ModelClass = baseDeviceFeatures_1.BaseDeviceFeatures.getRegisteredModelClass(modelId);
                (0, chai_1.expect)(ModelClass).to.not.be.undefined;
                // @ts-ignore
                const instance = new ModelClass(mockDependencies, "test_duid");
                // 1. Instance Check
                (0, chai_1.expect)(instance).to.be.instanceOf(baseVacuumFeatures_1.BaseVacuumFeatures);
                // 2. Static Features Check
                // Access protected config via any
                const config = instance.config;
                (0, chai_1.expect)(config).to.exist;
                (0, chai_1.expect)(config.staticFeatures).to.be.an("array");
                // 3. Duplicate Features Check
                const features = config.staticFeatures;
                const uniqueFeatures = new Set(features);
                if (features.length !== uniqueFeatures.size) {
                    throw new Error(`Duplicate features found: ${features.filter((item, index) => features.indexOf(item) !== index)}`);
                }
                // 4. Profile Check
                const profile = instance.profile;
                (0, chai_1.expect)(profile).to.exist;
                (0, chai_1.expect)(profile.mappings).to.exist;
                (0, chai_1.expect)(profile.features).to.exist;
            }
            catch (e) {
                errors.push(`Model ${modelId}: ${e.message}`);
            }
        });
        if (errors.length > 0) {
            throw new Error(`Model configuration errors:\n${errors.join("\n")}`);
        }
    });
});
//# sourceMappingURL=baseVacuumFeatures.test.js.map