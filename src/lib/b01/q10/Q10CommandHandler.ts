import type { BaseDeviceFeatures } from "../../features/baseDeviceFeatures";
import type { requestsHandler } from "../../requestsHandler";

type Q10CommandFeatureHandler = Pick<BaseDeviceFeatures, "updateMap" | "getCommandParams">;
type Q10SegmentCleanParams = number[];
type Q10AreaPoint = { x: number; y: number };
type Q10ZoneArea = { points: Q10AreaPoint[]; name: string };
type Q10ZoneCleanParams = { repeatCount: number; areas: Q10ZoneArea[] };

const Q10_NATIVE_DP_COMMANDS: Record<string, Record<string, unknown>> = {
	app_start: { "201": { cmd: 1 } },
	app_pause: { "204": 0 },
	app_stop: { "206": 0 },
	app_charge: { "202": 5 }
};

function isFiniteInteger(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value) && Number.isInteger(value);
}

function encodeSignedInt16Be(value: number): number[] {
	const buffer = Buffer.allocUnsafe(2);
	buffer.writeInt16BE(Math.trunc(value), 0);
	return [buffer[0]!, buffer[1]!];
}

function encodeQ10ZoneCleanParameters({ repeatCount, areas }: Q10ZoneCleanParams): string {
	const bytes: number[] = [1, repeatCount, areas.length];

	for (const area of areas) {
		bytes.push(area.points.length);

		for (const point of area.points) {
			const encodedX = encodeSignedInt16Be(10 * point.x);
			const encodedY = encodeSignedInt16Be(10 * point.y);
			bytes.push(encodedX[0]!, encodedX[1]!, encodedY[0]!, encodedY[1]!);
		}

		const nameBytes = Buffer.from(area.name, "utf8");
		bytes.push(nameBytes.length);
		bytes.push(...nameBytes);
		for (let padding = 0; padding < 19 - nameBytes.length; padding++) {
			bytes.push(0);
		}
	}

	return Buffer.from(bytes).toString("base64");
}

export class Q10CommandHandler {
	constructor(private readonly requestHandler: requestsHandler) {}

	private async resolveCommandParams(
		handler: Q10CommandFeatureHandler,
		method: string,
		params: unknown
	): Promise<unknown> {
		const intercepted = await handler.getCommandParams(method, params);
		if (
			typeof intercepted === "object"
			&& intercepted !== null
			&& "method" in intercepted
			&& "params" in intercepted
		) {
			const command = intercepted as { method: unknown; params: unknown };
			if (command.method !== method) {
				throw new Error(`Unsupported Q10 command remap for '${method}': ${JSON.stringify(command.method)}`);
			}
			return command.params;
		}
		return intercepted;
	}

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

		if (method === "app_segment_clean") {
			const resolved = await this.resolveCommandParams(handler, method, params);
			if (!Array.isArray(resolved) || resolved.length === 0 || !resolved.every(isFiniteInteger)) {
				throw new Error(`Unsupported Q10 payload for ${method}: expected non-empty room id array, got ${JSON.stringify(resolved)}`);
			}

			await this.publishNativeQ10DpCommand(duid, method, {
				"201": {
					cmd: 2,
					clean_paramters: resolved as Q10SegmentCleanParams
				}
			});
			return;
		}

		if (method === "app_zoned_clean") {
			const resolved = await this.resolveCommandParams(handler, method, params);
			if (
				typeof resolved !== "object"
				|| resolved === null
				|| !("repeatCount" in resolved)
				|| !("areas" in resolved)
			) {
				throw new Error(`Unsupported Q10 payload for ${method}: expected normalized area payload, got ${JSON.stringify(resolved)}`);
			}

			const normalized = resolved as Q10ZoneCleanParams;
			if (!isFiniteInteger(normalized.repeatCount) || normalized.repeatCount <= 0 || !Array.isArray(normalized.areas) || normalized.areas.length === 0) {
				throw new Error(`Unsupported Q10 payload for ${method}: expected non-empty zones with repeat count, got ${JSON.stringify(resolved)}`);
			}

			await this.publishNativeQ10DpCommand(duid, method, {
				"201": {
					cmd: 3,
					clean_paramters: encodeQ10ZoneCleanParameters(normalized)
				}
			});
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
