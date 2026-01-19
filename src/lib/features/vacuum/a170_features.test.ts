import sinon from "sinon";
import { beforeEach, describe, expect, it } from "vitest";
import { FeatureDependencies } from "../baseDeviceFeatures";
import { Feature } from "../features.enum";
import { A170Features } from "./a170_features";

describe("A170Features (Roborock Qrevo S5V)", () => {
	let features: A170Features;
	let mockDependencies: FeatureDependencies;

	beforeEach(() => {
		mockDependencies = {
			adapter: {
				config: {},
				log: {
					debug: sinon.stub(),
					info: sinon.stub(),
					warn: sinon.stub(),
					error: sinon.stub(),
					silly: sinon.stub(),
				},
				ensureState: sinon.stub(),
				ensureFolder: sinon.stub(),
				setStateChanged: sinon.stub(),
				getDeviceProtocolVersion: sinon.stub().resolves("1.0"),
				translations: {},
			} as any,
			config: {},
			http_api: {} as any,
			ensureState: sinon.stub(),
			ensureFolder: sinon.stub(),
			log: {
				debug: sinon.stub(),
				info: sinon.stub(),
				warn: sinon.stub(),
				error: sinon.stub(),
				silly: sinon.stub(),
			} as any,
		} as unknown as FeatureDependencies;

		features = new A170Features(mockDependencies, "test_duid");
	});

	it("should correctly initialize with default profile", () => {
		expect(features).to.be.instanceOf(A170Features);
		// Accessing protected profile via cast
		const profile = (features as any).profile;
		expect(profile.name).to.equal("Roborock Qrevo S5V (a170)");
		expect(profile.features.maxSuctionValue).to.equal(108);
	});

	it("should have correct static features", () => {
		const config = (features as any).config;
		expect(config.staticFeatures).to.include(Feature.MopWash);
		expect(config.staticFeatures).to.include(Feature.MopDry);
		expect(config.staticFeatures).to.include(Feature.AutoEmptyDock);
		expect(config.staticFeatures).to.include(Feature.WaterBox);
		expect(config.staticFeatures).to.include(Feature.AvoidCarpet);
		expect(config.staticFeatures).to.include(Feature.MopForbidden);
	});


	it("should process dock type 3 (Full Dock)", async () => {
		await features.processDockType(3);

		// Check hasFeature instead of internal appliedFeatures
		expect(features.hasFeature(Feature.AutoEmptyDock)).to.be.true;
		expect(features.hasFeature(Feature.MopWash)).to.be.true;
		expect(features.hasFeature(Feature.DockingStationStatus)).to.be.true;
	});
});
