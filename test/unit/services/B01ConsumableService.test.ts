
import { beforeEach, describe, expect, it, vi } from "vitest";
import { B01ConsumableService } from "../../../src/lib/features/vacuum/services/B01ConsumableService";
import { VACUUM_CONSTANTS } from "../../../src/lib/features/vacuum/vacuumConstants";

// Mock Dependencies
const mockAdapter = {
    requestsHandler: {
        sendRequest: vi.fn(),
    },
    setStateChanged: vi.fn(),
};

const mockDeps = {
    adapter: mockAdapter,
    ensureFolder: vi.fn(),
    ensureState: vi.fn(),
    log: {
        warn: vi.fn(),
        error: vi.fn(),
        debug: vi.fn(),
    }
};

const mockLocales = {
    getNameAll: vi.fn((key) => `Localized ${key}`),
};

describe("B01ConsumableService", () => {
    let service: B01ConsumableService;
    const duid = "test_duid";

    beforeEach(() => {
        vi.clearAllMocks();
        service = new B01ConsumableService(mockDeps as any, duid, mockLocales as any);
    });

    it("should fetch consumables from API if no data provided", async () => {
        // Mock API response
        mockAdapter.requestsHandler.sendRequest.mockResolvedValue([
            100, // volume (ignored)
            // ... lots of props ...
        ]);

        // We expect it to call prop.get
        await service.updateConsumables();
        expect(mockAdapter.requestsHandler.sendRequest).toHaveBeenCalledWith(duid, "prop.get", expect.objectContaining({ property: VACUUM_CONSTANTS.b01SettingsProps }));
    });

    it("should handle array response from API and map states", async () => {
        // Construct mock response matching b01SettingsProps order
        const props = VACUUM_CONSTANTS.b01SettingsProps;
        const mainBrushIndex = props.indexOf("main_brush");
        const sideBrushIndex = props.indexOf("side_brush");

		expect(mainBrushIndex, "main_brush should exist").not.toBe(-1);
		expect(sideBrushIndex, "side_brush should exist").not.toBe(-1);

        // Create array of correct length filled with dummy data
        const mockArray = new Array(props.length).fill(0);
        if (mainBrushIndex !== -1) mockArray[mainBrushIndex] = 3600 * 150; // 50%
        if (sideBrushIndex !== -1) mockArray[sideBrushIndex] = 3600 * 200; // 0% (full usage)

        mockAdapter.requestsHandler.sendRequest.mockResolvedValue(mockArray);

        await service.updateConsumables();

        // Expect folder creation
        expect(mockDeps.ensureFolder).toHaveBeenCalledWith(`Devices.${duid}.consumables`);

        // Expect State Calculation
        expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush`, { val: 50, ack: true });
        expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.side_brush`, { val: 0, ack: true });
    });

    it("should process consumable work times and calculate percent", async () => {
        const data = {
            main_brush_work_time: 3600 * 150, // 150 hours used
            // main_brush total life is 300 hours
            // So expected percent = 100 - (150/300)*100 = 50%
        };

        await service.updateConsumables(data);

        // Expect folder creation
        expect(mockDeps.ensureFolder).toHaveBeenCalledWith(`Devices.${duid}.consumables`);

        // Expect State Calculation
        expect(mockDeps.ensureState).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush`, expect.objectContaining({ unit: "%" }));
        expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush`, { val: 50, ack: true });

        // Expect Reset Button
        expect(mockDeps.ensureState).toHaveBeenCalledWith(`Devices.${duid}.resetConsumables.main_brush`, expect.objectContaining({ role: "button" }));
    });

    it("should ignore unrelated settings", async () => {
        const data = {
            volume: 100,
            net_status: {},
        };
        await service.updateConsumables(data);

        // precise check: ensureState should NOT be called for volume (as we decided to exclude it in this strict service)
        // Note: The legacy code mixed them, but our new service is strict.
        expect(mockDeps.ensureState).not.toHaveBeenCalledWith(`Devices.${duid}.consumables.volume`, expect.anything());
    });

    it("should handle full usage (0%) correctly", async () => {
        const data = {
            filter_work_time: 3600 * 150, // 150 hours used (max is 150 for filter)
        };
        await service.updateConsumables(data);
        expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.filter`, { val: 0, ack: true });
    });

    it("should handle new usage (100%) correctly", async () => {
        const data = {
            side_brush_work_time: 0,
        };
        await service.updateConsumables(data);
        expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.side_brush`, { val: 100, ack: true });
    });
});
