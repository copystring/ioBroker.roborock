/** The manufacturer's height readbacks use the common cloud request path; setting height uses BLE. */
export interface MowerHeightParameters { min: number; max: number; step: number; }
export interface MowerHeightPreference { global?: number; custom: Array<{ areaId: number; height: number }>; }
export type MowerHeightRequest =
	| { id: string; type: "GET_HEIGHT_MOTOR_PARAMETER" }
	| { id: string; type: "GET_MOW_PREFERENCE_CONFIG" }
	| { id: string; type: "REMOTE_CMD"; remote_cmd: { type: "MAIN_CUTTER_HEIGHT"; main_cutter_height: number } };

/** An actual connected BLE SDK bridge must implement this port. It must never fall back to cloud RPC. */
export interface MowerHeightBleProvider {
	isConnected(duid: string): boolean;
	callMethod(duid: string, request: Extract<MowerHeightRequest, { type: "REMOTE_CMD" }>, signal: AbortSignal): Promise<unknown>;
}

function record(value: unknown): Record<string, unknown> | undefined {
	return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

function uint32(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 0xffffffff;
}

function requestId(timestamp: number): string {
	if (!Number.isSafeInteger(timestamp) || timestamp <= 0) throw new Error("Invalid mower protobuf id");
	return String(timestamp);
}

/** RobotMsg.Type.HEIGHT_MOTOR_PARAMETER=30; field 39 contains device-specific mm bounds. */
export function readMowerHeightParameters(value: unknown): MowerHeightParameters | undefined {
	const message = record(value);
	if (message?.type !== 30 && message?.type !== "HEIGHT_MOTOR_PARAMETER") return undefined;
	const parameter = record(message.height_motor_parameter);
	if (!parameter) return undefined;
	const min = Object.hasOwn(parameter, "min") ? parameter.min : 0;
	const max = Object.hasOwn(parameter, "max") ? parameter.max : 0;
	const step = Object.hasOwn(parameter, "step") ? parameter.step : 0;
	if (!uint32(min) || !uint32(max) || !uint32(step) || max < min || step === 0) return undefined;
	return { min, max, step };
}

/** RobotMsg.Type.MOW_PREFERENCE_CONFIG=24; preserve unknown areas instead of guessing a global target. */
export function readMowerHeightPreference(value: unknown): MowerHeightPreference | undefined {
	const message = record(value);
	if (message?.type !== 24 && message?.type !== "MOW_PREFERENCE_CONFIG") return undefined;
	const preference = record(message.preference_config);
	if (!preference) return undefined;
	const global = record(preference.global);
	const custom = Object.hasOwn(preference, "custom") ? preference.custom : [];
	const result: MowerHeightPreference = { custom: [] };
	if (global) {
		const height = Object.hasOwn(global, "height") ? global.height : 0;
		if (!uint32(height)) return undefined;
		result.global = height;
	}
	if (!Array.isArray(custom)) return undefined;
	const seen = new Set<number>();
	for (const item of custom) {
		const area = record(item);
		if (!area) return undefined;
		const areaId = Object.hasOwn(area, "area_id") ? area.area_id : 0;
		if (!uint32(areaId) || seen.has(areaId)) return undefined;
		seen.add(areaId);
		const height = Object.hasOwn(area, "height") ? area.height : 0;
		if (!uint32(height)) return undefined;
		result.custom.push({ areaId, height });
	}
	return result;
}

export function validateMowerCuttingHeight(value: unknown, parameters: MowerHeightParameters): number {
	if (!uint32(parameters.min) || !uint32(parameters.max) || !uint32(parameters.step)
		|| parameters.max < parameters.min || parameters.step === 0) throw new Error("Missing valid device height parameters");
	if (!uint32(value) || value < parameters.min || value > parameters.max || (value - parameters.min) % parameters.step !== 0) {
		throw new Error("Cutting height is outside the device range or step");
	}
	return value;
}

export function buildMowerHeightParametersRequest(timestamp: number): MowerHeightRequest {
	return { id: requestId(timestamp), type: "GET_HEIGHT_MOTOR_PARAMETER" };
}

export function buildMowerHeightPreferenceRequest(timestamp: number): MowerHeightRequest {
	return { id: requestId(timestamp), type: "GET_MOW_PREFERENCE_CONFIG" };
}

export function buildMowerCuttingHeightRequest(value: unknown, parameters: MowerHeightParameters, timestamp: number): Extract<MowerHeightRequest, { type: "REMOTE_CMD" }> {
	const height = validateMowerCuttingHeight(value, parameters);
	return { id: requestId(timestamp), type: "REMOTE_CMD", remote_cmd: { type: "MAIN_CUTTER_HEIGHT", main_cutter_height: height } };
}

/** Fail closed when BLE is unavailable or the session is stopping. */
export async function sendMowerCuttingHeight(
	duid: string,
	value: unknown,
	parameters: MowerHeightParameters,
	timestamp: number,
	provider: MowerHeightBleProvider | undefined,
	signal: AbortSignal,
): Promise<unknown> {
	const request = buildMowerCuttingHeightRequest(value, parameters, timestamp);
	if (signal.aborted) throw new Error("Mower session stopped");
	if (!provider || !provider.isConnected(duid)) throw new Error("Mower BLE connection unavailable");
	return provider.callMethod(duid, request, signal);
}
