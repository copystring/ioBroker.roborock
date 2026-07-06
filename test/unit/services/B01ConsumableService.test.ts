import { beforeEach, describe, expect, it, vi } from "vitest";
import { B01ConsumableService } from "../../../src/lib/features/vacuum/services/B01ConsumableService";
import { VACUUM_CONSTANTS } from "../../../src/lib/features/vacuum/vacuumConstants";

// Mock Dependencies
const mockAdapter = {
	requestsHandler: {
		sendRequest: vi.fn(),
	},
	setStateChanged: vi.fn(),
	translationManager: {
		get: vi.fn((key, def) => def || key),
	}
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

describe("B01ConsumableService", () => {
	let service: B01ConsumableService;
	const duid = "test_duid";

	beforeEach(() => {
		vi.clearAllMocks();
		service = new B01ConsumableService(mockDeps as any, duid);
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

	it("should handle array response from API and map states with remaining hours", async () => {
		// Construct mock response matching b01SettingsProps order
		const props = VACUUM_CONSTANTS.b01SettingsProps;
		const mainBrushIndex = props.indexOf("main_brush");
		const sideBrushIndex = props.indexOf("side_brush");

		expect(mainBrushIndex, "main_brush should exist").not.toBe(-1);
		expect(sideBrushIndex, "side_brush should exist").not.toBe(-1);

		// Create array of correct length filled with dummy data
		const mockArray = new Array(props.length).fill(0);
		// main_brush life: 300h. Used: 150h (9000min). Remaining: 150h.
		if (mainBrushIndex !== -1) mockArray[mainBrushIndex] = 60 * 150;
		// side_brush life: 200h. Used: 200h (12000min). Remaining: 0h.
		if (sideBrushIndex !== -1) mockArray[sideBrushIndex] = 60 * 200;

		mockAdapter.requestsHandler.sendRequest.mockResolvedValue(mockArray);

		await service.updateConsumables();

		// Expect folder creation
		expect(mockDeps.ensureFolder).toHaveBeenCalledWith(`Devices.${duid}.consumables`);

		// Expect State Calculation (Remaining Hours)
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush_work_time`, { val: 150, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.side_brush_work_time`, { val: 0, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush_life`, { val: 50, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.side_brush_life`, { val: 0, ack: true });
	});

	it("should process consumable used minutes and calculate remaining hours", async () => {
		const data = {
			main_brush_work_time: 60 * 150, // 150 hours used
			// main_brush total life is 300 hours
			// So expected remaining = 300 - 150 = 150 hours
		};

		await service.updateConsumables(data);

		// Expect folder creation
		expect(mockDeps.ensureFolder).toHaveBeenCalledWith(`Devices.${duid}.consumables`);

		// Expect State Calculation (Remaining Hours)
		expect(mockDeps.ensureState).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush_work_time`, expect.objectContaining({ unit: "h" }));
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush_work_time`, { val: 150, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush_life`, { val: 50, ack: true });

		// Expect Reset Button
		expect(mockDeps.ensureState).toHaveBeenCalledWith(`Devices.${duid}.resetConsumables.reset_main_brush`, expect.objectContaining({ role: "button" }), expect.anything());
	});

	it("should ignore unrelated settings", async () => {
		const data = {
			volume: 100,
			net_status: {},
		};
		await service.updateConsumables(data);

		// precise check: ensureState should NOT be called for volume
		expect(mockDeps.ensureState).not.toHaveBeenCalledWith(`Devices.${duid}.consumables.volume`, expect.anything());
	});

	it("should handle full usage (0h remaining) correctly", async () => {
		const data = {
			filter_work_time: 60 * 150, // 150 hours used (max is 150 for filter)
		};
		await service.updateConsumables(data);
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.filter_work_time`, { val: 0, ack: true });
	});

	it("should handle new usage (full life remaining) correctly", async () => {
		const data = {
			side_brush_work_time: 0,
		};
		await service.updateConsumables(data);
		// side_brush life: 200h. Used: 0. Remaining: 200h.
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.side_brush_work_time`, { val: 200, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.side_brush_life`, { val: 100, ack: true });
	});

	it("should match Q7 app values when the robot reports 303 used minutes", async () => {
		await service.updateConsumables({
			main_brush_work_time: 303,
			side_brush_work_time: 303,
			filter_work_time: 303,
		});

		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush_work_time`, { val: 295, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.side_brush_work_time`, { val: 195, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.filter_work_time`, { val: 145, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush_life`, { val: 99, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.side_brush_life`, { val: 98, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.filter_life`, { val: 97, ack: true });
	});

	it("should keep treating oversized work-time counters as seconds", async () => {
		await service.updateConsumables({
			main_brush_work_time: 73044,
		});

		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush_work_time`, { val: 280, ack: true });
		expect(mockAdapter.setStateChanged).toHaveBeenCalledWith(`Devices.${duid}.consumables.main_brush_life`, { val: 94, ack: true });
	});
});
