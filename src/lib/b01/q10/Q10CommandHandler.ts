import type { BaseDeviceFeatures } from "../../features/baseDeviceFeatures";
import type { requestsHandler } from "../../requestsHandler";

type Q10CommandFeatureHandler = Pick<BaseDeviceFeatures, "updateMap" | "getCommandParams">;

const Q10_NATIVE_DP_COMMANDS: Record<string, Record<string, unknown>> = {
	app_start: { "201": { cmd: 1 } },
	app_pause: { "204": 0 },
	app_stop: { "206": 0 },
	app_charge: { "202": 5 }
};

export class Q10CommandHandler {
	constructor(private readonly requestHandler: requestsHandler) {}

	private async publishNativeQ10DpCommand(
		duid: string,
		method: string,
		dps: Record<string, unknown>
	): Promise<void> {
		this.requestHandler.adapter.rLog(
			"System",
			duid,
			"Debug",
			"B01",
			undefined,
			`Q10 command ${method}: using source-verified Q10 DP path`,
			"debug"
		);

		await this.requestHandler.publishB01Dp(duid, dps);
		this.requestHandler._processResult(Promise.resolve(undefined), async () => {}, `command-${method}-${duid}`, duid);
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

		// Android sniffs show the Q10 uses write-only DPs 201/202/204/206 for the
		// basic control buttons. The older app_* RPC path times out on real devices.
		const commandDps = Q10_NATIVE_DP_COMMANDS[method];
		if (commandDps) {
			await this.publishNativeQ10DpCommand(duid, method, commandDps);
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
