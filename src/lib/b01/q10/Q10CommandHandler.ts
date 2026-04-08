import type { BaseDeviceFeatures } from "../../features/baseDeviceFeatures";
import type { requestsHandler } from "../../requestsHandler";

type Q10CommandFeatureHandler = Pick<BaseDeviceFeatures, "updateMap" | "getCommandParams">;

const Q10_GENERIC_CONTROL_COMMANDS = new Set([
	"app_start",
	"app_stop",
	"app_pause",
	"app_charge"
]);

export class Q10CommandHandler {
	constructor(private readonly requestHandler: requestsHandler) {}

	private async forwardToNativeB01Control(
		_handler: Q10CommandFeatureHandler,
		duid: string,
		method: string,
		params?: unknown
	): Promise<void> {
		const finalParams = Array.isArray(params) ? params : [];

		this.requestHandler.adapter.rLog(
			"System",
			duid,
			"Debug",
			"B01",
			undefined,
			`Q10 command ${method}: using native B01 app command path`,
			"debug"
		);

		const requestPromise = this.requestHandler.sendRequest(duid, method, finalParams, { priority: 1 });
		this.requestHandler._processResult(requestPromise, async () => {}, `command-${method}-${duid}`, duid);
	}

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

		// Q10 basic control buttons use the native app_* transport path. The generic
		// B01 service.set_room_clean/start_recharge RPC path times out on real devices.
		if (Q10_GENERIC_CONTROL_COMMANDS.has(method)) {
			await this.forwardToNativeB01Control(handler, duid, method, params);
			return;
		}

		const scalarParam = Array.isArray(params) ? params[0] : params;
		let dps: Record<string, unknown> | null = null;

		switch (method) {
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
