
import { beforeEach, describe, expect, it } from "vitest";
import { B01ControlService } from "../../../src/lib/features/vacuum/services/B01ControlService";

describe("B01ControlService", () => {
	let service: B01ControlService;

	beforeEach(() => {
		service = new B01ControlService();
	});

	it("should map app_start to service.set_room_clean with value 1", () => {
		const result = service.getCommandParams("app_start");
		expect(result).toEqual({
			method: "service.set_room_clean",
			params: { clean_type: 0, ctrl_value: 1, room_ids: [] }
		});
	});

	it("should map app_pause to service.set_room_clean with value 2", () => {
		const result = service.getCommandParams("app_pause");
		expect(result).toEqual({
			method: "service.set_room_clean",
			params: { clean_type: 0, ctrl_value: 2, room_ids: [] }
		});
	});

	it("should map app_charge to service.start_recharge", () => {
		const result = service.getCommandParams("app_charge");
		expect(result).toEqual({
			method: "service.start_recharge",
			params: {}
		});
	});

	it("should map find_me to service.find_device", () => {
		const result = service.getCommandParams("find_me");
		expect(result).toEqual({
			method: "service.find_device",
			params: {}
		});
	});

    it("should map clean_path_preference to service.set_preference_type", () => {
        const result = service.getCommandParams("clean_path_preference", 1);
        expect(result).toEqual({
            method: "service.set_preference_type",
            params: { prefer_type: 1 }
        });
    });

	it("should map update_map to service.upload_by_maptype", () => {
		const result = service.getCommandParams("update_map");
		expect(result).toEqual({
			method: "service.upload_by_maptype",
			params: { force: 1, map_type: 0 }
		});
	});

	it("should map reset_main_brush to service.reset_consumable 1", () => {
		const result = service.getCommandParams("reset_main_brush");
		expect(result).toEqual({ method: "service.reset_consumable", params: { consumable: 1 } });
	});

	it("should map reset_consumable with param 1 to service.reset_consumable 1", () => {
		const result = service.getCommandParams("reset_consumable", 1);
		expect(result).toEqual({ method: "service.reset_consumable", params: { consumable: 1 } });
	});

	it("should map reset_side_brush to service.reset_consumable 2", () => {
		const result = service.getCommandParams("reset_side_brush");
		expect(result).toEqual({ method: "service.reset_consumable", params: { consumable: 2 } });
	});

	it("should map reset_filter to service.reset_consumable 3", () => {
		const result = service.getCommandParams("reset_filter");
		expect(result).toEqual({ method: "service.reset_consumable", params: { consumable: 3 } });
	});

	it("should map reset_sensor to service.reset_consumable 4", () => {
		const result = service.getCommandParams("reset_sensor");
		expect(result).toEqual({ method: "service.reset_consumable", params: { consumable: 4 } });
	});

	it("should return original params for unknown methods", () => {
		const result = service.getCommandParams("unknown_method", { foo: "bar" });
		expect(result).toEqual({ foo: "bar" });
	});
});
