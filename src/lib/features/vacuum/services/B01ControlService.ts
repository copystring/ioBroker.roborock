export class B01ControlService {
	constructor() {}

	public getCommandParams(method: string, params?: unknown): unknown {
		switch (method) {
			case "app_start":
				return {
					method: "service.set_room_clean",
					params: { "clean_type": 0, "ctrl_value": 1, "room_ids": [] }
				};

			case "app_pause":
				return {
					method: "service.set_room_clean",
					params: { "clean_type": 0, "ctrl_value": 2, "room_ids": [] }
				};

			case "app_charge":
				return {
					method: "service.start_recharge",
					params: {}
				};

			case "find_me":
				return {
					method: "service.find_device",
					params: {}
				};

			case "clean_path_preference":
				return {
					method: "service.set_preference_type",
					params: { "prefer_type": params }
				};

			case "update_map":
				return {
					method: "service.upload_by_maptype",
					params: { "force": 1, "map_type": 0 }
				};

				// Props (wind, water, etc.) validation could also go here in future

			default:
				// Handle Consumable Resets
				if (method === "reset_consumable" || method.startsWith("reset_")) {
					const resetTarget = method === "reset_consumable" ? (Array.isArray(params) ? params[0] : params) : method;
					if (resetTarget === "reset_main_brush" || resetTarget === 1) {
						return { method: "service.reset_consumable", params: { "consumable": 1 } };
					}
					if (resetTarget === "reset_side_brush" || resetTarget === 2) {
						return { method: "service.reset_consumable", params: { "consumable": 2 } };
					}
					if (resetTarget === "reset_filter" || resetTarget === 3) {
						return { method: "service.reset_consumable", params: { "consumable": 3 } };
					}
					if (resetTarget === "reset_sensor" || resetTarget === 4) {
						return { method: "service.reset_consumable", params: { "consumable": 4 } };
					}
				}

				// Consistency: Wrap simple parameters in an array so messageParser can consistently use params[0] for B01 status props.
				return Array.isArray(params) ? params : [params];
		}
	}
}
