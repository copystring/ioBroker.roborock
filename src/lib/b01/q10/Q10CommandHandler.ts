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

	private async forwardToGenericB01Control(
		handler: Q10CommandFeatureHandler,
		duid: string,
		method: string,
		params?: unknown
	): Promise<void> {
		const intercepted = await handler.getCommandParams(method, params);
		let finalMethod = method;
		let finalParams = intercepted;

		if (typeof intercepted === "object" && intercepted !== null && "method" in intercepted && "params" in intercepted) {
			finalMethod = String((intercepted as { method: unknown }).method);
			finalParams = (intercepted as { params: unknown }).params;
		}

		this.requestHandler.adapter.rLog(
			"System",
			duid,
			"Debug",
			"B01",
			undefined,
			`Q10 command ${method}: using generic B01 control path (${finalMethod})`,
			"debug"
		);

		const requestPromise = this.requestHandler.sendRequest(duid, finalMethod, finalParams, { priority: 1 });
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

		// The Q10 accepts DP writes for settings, but the basic control buttons still
		// behave correctly only through the established generic B01 control RPC path.
		if (Q10_GENERIC_CONTROL_COMMANDS.has(method)) {
			await this.forwardToGenericB01Control(handler, duid, method, params);
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
