
import { beforeEach, describe, expect, it, vi } from "vitest";
import { B01MapService } from "../../../src/lib/features/vacuum/services/B01MapService";

describe("B01MapService", () => {
    let service: B01MapService;
    let mockAdapter: any;
    let mockDeps: any;
    let mockLocales: any;
    const duid = "test_duid";

    beforeEach(() => {
        vi.clearAllMocks();

        mockAdapter = {
            requestsHandler: {
                sendRequest: vi.fn(),
            },
            rLog: vi.fn(),
            pendingRequests: new Map(),
            setTimeout: vi.fn(),
            getStateAsync: vi.fn(),
            ensureState: vi.fn(),
            ensureFolder: vi.fn(),
            setStateChanged: vi.fn(),
            log: { debug: vi.fn() },
            language: "en"
        };

        mockDeps = {
            adapter: mockAdapter,
            ensureFolder: vi.fn(),
            ensureState: vi.fn(),
        };

        mockLocales = {
            getText: vi.fn(() => "Floor"),
        };

        service = new B01MapService(mockDeps as any, duid, mockLocales as any);
    });

    describe("updateMap", () => {
        it("should send upload_by_maptype request and register pending handler", async () => {
            await service.updateMap();

            expect(mockAdapter.requestsHandler.sendRequest).toHaveBeenCalledWith(duid, "service.upload_by_maptype", { force: 1, map_type: 0 });
            expect(mockAdapter.pendingRequests.size).toBe(1);
        });

        it("should handle request failure gracefully", async () => {
            mockAdapter.requestsHandler.sendRequest.mockRejectedValue(new Error("Network Error"));
            await service.updateMap();
            expect(mockAdapter.rLog).toHaveBeenCalledWith("System", duid, "Warn", undefined, undefined, expect.stringContaining("Failed"), "warn");
        });
    });

    describe("updateCleanSummary", () => {
        it("should fetch record list and process summary", async () => {
            const mockData = {
                total_time: 3600,
                total_area: 1000000,
                total_count: 1,
                record_list: []
            };
            mockAdapter.requestsHandler.sendRequest.mockResolvedValue(mockData);
            await service.updateCleanSummary();

            expect(mockAdapter.requestsHandler.sendRequest).toHaveBeenCalledWith(
                duid,
                "service.get_record_list",
                {},
                expect.objectContaining({ priority: -10 })
            );
            expect(mockDeps.ensureFolder).toHaveBeenCalledWith(`Devices.${duid}.cleaningInfo.records`);
        });
    });

    describe("updateRoomMapping", () => {
        it("should create room states based on map status", async () => {
			// Mock map_status
            mockAdapter.getStateAsync.mockResolvedValueOnce({ val: 2 }); // Floor 2

            const rooms = [{ id: 10, name: "Kitchen" }, { id: 11, name: "Living Room" }];
            await service.updateRoomMapping(rooms);

            expect(mockDeps.ensureFolder).toHaveBeenCalledWith(`Devices.${duid}.floors.2`, expect.stringContaining("Floor 2"));
            expect(mockDeps.ensureState).toHaveBeenCalledWith(`Devices.${duid}.floors.2.10`, expect.objectContaining({ name: "Kitchen" }));
            expect(mockDeps.ensureState).toHaveBeenCalledWith(`Devices.${duid}.floors.2.11`, expect.objectContaining({ name: "Living Room" }));
        });

		it("should handle missing mappedRooms gracefully", async () => {
			await service.updateRoomMapping(undefined);
			expect(mockDeps.ensureFolder).not.toHaveBeenCalled();
		});
    });
});
