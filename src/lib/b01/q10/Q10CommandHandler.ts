import type { BaseDeviceFeatures } from "../../features/baseDeviceFeatures";
import type { requestsHandler } from "../../requestsHandler";

type Q10CommandFeatureHandler = Pick<BaseDeviceFeatures, "updateMap">;

export class Q10CommandHandler {
	constructor(private readonly requestHandler: requestsHandler) {}

	public async handleCommand(
		handler: Q10CommandFeatureHandler,
		duid: string,
		method: string,
		params?: unknown
	): Promise<void> {
		if (method === "update_map") {
			this.requestHandler._processResult(handler.updateMap(), async () => {}, `command-${method}-${duid}`, duid);
			return;
		}

		const scalarParam = Array.isArray(params) ? params[0] : params;
		let dps: Record<string, unknown> | null = null;

		switch (method) {
			case "app_start":
				dps = { "201": { cmd: 1 } };
				break;
			case "app_charge":
				dps = { "202": 5 };
				break;
			case "app_pause":
				dps = { "204": 0 };
				break;
			case "app_stop":
				dps = { "206": 0 };
				break;
			case "wind":
			case "fan_power":
				if (typeof scalarParam !== "number" || !Number.isFinite(scalarParam)) {
					throw new Error(`Unsupported Q10 payload for ${method}: expected finite number, got ${JSON.stringify(params)}`);
				}
				dps = { "123": scalarParam };
				break;
			case "water":
			case "water_box_mode":
				if (typeof scalarParam !== "number" || !Number.isFinite(scalarParam)) {
					throw new Error(`Unsupported Q10 payload for ${method}: expected finite number, got ${JSON.stringify(params)}`);
				}
				dps = { "124": scalarParam };
				break;
			case "clean_path_preference": {
				const value = typeof scalarParam === "string" || typeof scalarParam === "number" ? Number(scalarParam) : Number.NaN;
				if (!Number.isInteger(value) || value < 0 || value > 2) {
					throw new Error(`Unsupported Q10 payload for ${method}: expected integer 0..2, got ${JSON.stringify(params)}`);
				}
				dps = { "101": { "78": value } };
				break;
			}
			default:
				throw new Error(`Unsupported Q10 command '${method}'. No source-verified DP mapping is implemented; refusing generic fallback.`);
		}

		await this.requestHandler.publishB01Dp(duid, dps);
		this.requestHandler._processResult(Promise.resolve(undefined), async () => {}, `command-${method}-${duid}`, duid);
	}
}
