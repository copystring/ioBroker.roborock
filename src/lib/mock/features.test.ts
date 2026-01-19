
import { beforeEach, describe, expect, it } from "vitest";
import { Feature } from "../features/features.enum";
import { V1VacuumFeatures } from "../features/vacuum/v1VacuumFeatures";
import { MockAdapter } from "./MockAdapter";
import { MockRobot } from "./MockRobot";

// We need a concrete implementation of abstract V1VacuumFeatures to test it
class TestVacuumFeatures extends V1VacuumFeatures {
	public getDescriptor(): any { return {}; }
	public getDynamicFeatures(): Set<Feature> { return new Set(); }
	public async detectAndApplyRuntimeFeatures(): Promise<boolean> { return false; }

	// Abstract getters implementation - minimal valid return for test
	public getCommonConsumable(): any { return {}; }
	public isResetableConsumable(): boolean { return false; }
	public getCommonDeviceStates(): any { return {}; }
	public getCommonCleaningRecords(): any { return {}; }
	public getFirmwareFeatureName(): string { return ""; }
	public getCommonCleaningInfo(): any { return {}; }

	// Expose protected method for testing
	// Expose protected method for testing
	public async publicApplyFeature(feature: Feature): Promise<boolean> {
		return this.applyFeature(feature);
	}

	// Override updateConsumables to use our manual logic for testing "smart" behavior
	// Since we cannot easily intercept the "requestAndProcess" which calls helper methods,
	// we will simulate the behavior of requestAndProcess -> processing loop here.
	// The REAL implementation uses requestAndProcess.
	// The REAL implementation of updateConsumables takes NO arguments.
	// So we must match that signature.
	public async updateConsumables(): Promise<void> {
		// We cheat here for the test: we assume the test setup put the data where we can find it
		// OR we can't easily test this without mocking sendRequest.
		// Let's assume the test will mock the RESPONSE of sendRequest.
		// So calling super() is actually what we want, IF the dep injection worked.
		return super.updateConsumables();
	}
}

describe("Features - State Creation", () => {
	let mockAdapter: MockAdapter;
	let mockRobot: MockRobot;

	beforeEach(() => {
		mockAdapter = new MockAdapter();
		mockRobot = new MockRobot();
	});

	it("should create dockingStationStatus states only when supported", async () => {
		const deps = {
			adapter: mockAdapter as any,
			log: {
				info: console.log,
				warn: console.warn,
				error: console.error,
				debug: console.log,
				silly: console.log,
			} as any,
			http_api: {} as any,
			config: {} as any,
			ensureFolder: async (path: string) => mockAdapter.setObjectNotExistsAsync(path, { type: "folder" } as any),
			ensureState: async (id: string, common: any) => mockAdapter.setObjectNotExistsAsync(id, { type: "state", common } as any),
		};

		// Double-ensure setState is present even if class binding fails
		if (!deps.adapter.setState) {
			deps.adapter.setState = mockAdapter.setState;
		}

		const features = new TestVacuumFeatures(deps as any, mockRobot.duid, mockRobot.model, { staticFeatures: [] } as any);

		// 1. Initial State: No DSS features applied
		const dssFolder = `Devices.${mockRobot.duid}.dockingStationStatus`;
		const cleanFluid = `Devices.${mockRobot.duid}.dockingStationStatus.cleanFluidStatus`;
		expect(mockAdapter.objects).to.not.have.property(dssFolder);

		// 2. Simulate DSS detection (e.g. via runtime status having 'dss')
		// We simulate the feature application logic which would happen in detectAndApplyRuntimeFeatures
		await features.publicApplyFeature(Feature.DockingStationStatus);

		// This should fail currently because implementation is missing
		expect(mockAdapter.objects, "dockingStationStatus folder missing after feature applied").to.have.property(dssFolder);
		expect(mockAdapter.objects, "cleanFluidStatus state missing after feature applied").to.have.property(cleanFluid);
	});

	it("should dynamically create resetConsumables states based on data", async () => {
		// In this test, we need to mock the sendRequest to return our consumable data
		const mockConsumableData = {
			main_brush_work_time: 3600,
			filter_work_time: 1200,
			side_brush_work_time: 1800, // Added for new test case
			unknown_consumable: 999
		};

		const deps = {
			adapter: mockAdapter as any,
			log: {
				info: console.log,
				warn: console.warn,
				error: console.error,
				debug: console.debug,
				silly: () => {},
			} as any,
			http_api: {} as any,
			config: {} as any,
			ensureFolder: async (path: string) => mockAdapter.setObjectNotExistsAsync(path, { type: "folder" } as any),
			ensureState: async (id: string, common: any) => mockAdapter.setObjectNotExistsAsync(id, { type: "state", common } as any),
		};

		// Patch the adapter request handler to return our data
		deps.adapter.requestsHandler = {
			sendRequest: async (_duid: string, method: string) => {
				if (method === "get_consumable") return mockConsumableData;
				return {};
			}
		};
		// Ensure setState is present
		if (!deps.adapter.setState) {
			deps.adapter.setState = mockAdapter.setState;
		}
		const features = new TestVacuumFeatures(deps as any, mockRobot.duid, mockRobot.model, { staticFeatures: [] } as any);

		// 1. Initial: No reset buttons
		const resetMainBrush = `Devices.${mockRobot.duid}.resetConsumables.main_brush_work_time`;
		expect(mockAdapter.objects).to.not.have.property(resetMainBrush);

		// 2. Apply Consumables Feature
		await features.publicApplyFeature(Feature.ResetConsumables);

		// 3. Trigger update
		await features.updateConsumables();

		// 4. Verification
		// Check for RESET buttons - Main Key Checks
		// We know resetConsumables contains: main_brush_work_time, side_brush_work_time, filter_work_time, etc.
		const duid = mockRobot.duid; // Use duid from mockRobot
		const resetMainBrushPath = `Devices.${duid}.resetConsumables.main_brush`;
		const resetSideBrush = `Devices.${duid}.resetConsumables.side_brush`;
		const resetFilter = `Devices.${duid}.resetConsumables.filter`;
		const resetUnknown = `Devices.${duid}.resetConsumables.unknown_consumable`;

		expect(mockAdapter.objects).to.have.property(resetMainBrushPath);
		expect(mockAdapter.objects).to.have.property(resetSideBrush);
		expect(mockAdapter.objects).to.have.property(resetFilter);
		// Should NOT create reset button for unknown consumable (only work_time/dirty_time suffixes)
		expect(mockAdapter.objects).to.not.have.property(resetUnknown);

		// Verify object properties for a created button
		const btnObj = mockAdapter.objects[resetMainBrushPath];
		expect(btnObj.common.role).to.equal("button");
		expect(btnObj.common.type).to.equal("boolean");
		expect(btnObj.common.write).to.equal(true);
	});
});

