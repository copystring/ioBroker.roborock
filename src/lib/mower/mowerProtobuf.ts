import * as protobuf from "protobufjs";
import type { MowerRequest } from "./mowerContract";
import { MOWER_SCHEDULE_PROTO } from "./mowerScheduleContract";

// Minimal source-derived wire projection. Unknown RobotMsg fields are skipped, not reinterpreted.
const root = protobuf.parse(`
syntax = "proto3";
${MOWER_SCHEDULE_PROTO}
message RainFall { bool enable = 2; float delay_time = 3; }
message TimePoint { uint32 hour = 1; uint32 minute = 2; }
message TimeSlot { TimePoint start = 1; TimePoint end = 2; }
message NotDisturb { bool enable = 1; repeated TimeSlot time = 2; }
message HeightMotorParameter { uint32 max = 1; uint32 min = 2; uint32 step = 3; }
message RemoteCmd { int32 type = 1; uint32 main_cutter_height = 5; }
message MowerBoundary { int32 id = 1; string name = 5; }
message MowerMap { repeated MowerBoundary boundaries = 10; string name = 17; }
message UserModeConfig { RainFall rainfall_config = 1; NotDisturb not_disturb_config = 2; }
message RemoteMsg { uint64 id = 1; int32 type = 2; int32 app_button = 5; MowerMap modify_map = 8; RemoteCmd remote_cmd = 13; NotDisturb not_disturb_config = 17; RainFall rainfall_config = 18; MowingPlan mowing_plan = 21; }
message Battery { uint32 percent = 2; }
message HardwareMsg { Battery battery = 1; }
message MowProgress { float mow_all_area = 9; float expected_time = 10; float cur_mow_progress = 11; }
message NavTaskProgress { uint32 percent = 3; float area = 4; float percentage = 6; float expected_time = 7; }
message Navigation { NavTaskProgress nav_task_progress = 15; }
message RobotTask { int32 working_state = 1; int32 robot_detail_state = 2; }
message CheckResults { repeated int32 ignorable = 1; repeated int32 recoverable = 2; repeated int32 unrecoverable = 3; repeated int32 critical = 4; repeated int32 to_dock = 5; repeated int32 debounce = 6; }
message RobotMsg {
 uint64 id = 1; int32 type = 2; Battery battery = 10; Navigation navigation = 12; HardwareMsg hardware = 13;
 string map_name = 5; repeated string map_names = 6;
 MowProgress mow_progress = 29;
 int32 fsm_charge_state = 19; CheckResults fsm_errors = 46; repeated int32 user_errors = 52;
 UserModeConfig user_mode_config = 34;
 MowAreasConfig preference_config = 33;
 HeightMotorParameter height_motor_parameter = 39;
 MowSchedule mow_schedule = 41; string time_zone = 42;
 CheckResults scheduler_errors = 62; CheckResults charge_errors = 63; RobotTask robot_task = 71;
}
message RobotToAppMsg { bytes result = 5; }
message AppToRobotMsg { int64 t = 1; string dp = 2; int32 id = 3; string endpoint = 4; string nonce = 5; bytes method = 6; }
`, { keepCase: true }).root;
const remoteMsg = root.lookupType("RemoteMsg");
const robotMsg = root.lookupType("RobotMsg");
const robotToAppMsg = root.lookupType("RobotToAppMsg");
const appToRobotMsg = root.lookupType("AppToRobotMsg");
const buttonValues = { MOW_GLOBAL: 14, MOW_EDGE: 15, MOW_SELECT: 16, MOW_PAUSE: 20, MOW_RESUME: 22, MOW_END: 24, CHARGE: 5 } as const;

export interface MowerPbRequestContext {
	timestampSeconds?: number;
	correlationId: number;
	endpoint: string;
	/** Explicit AES key string supplied by the native request owner; no key derivation is inferred here. */
	nonce: string;
	dp?: string;
}

/** Build only the source-proven PB envelope. MQTT/BLE framing and blob ownership remain separate. */
export function encodeMowerPbRequest(request: MowerRequest, context: MowerPbRequestContext): Buffer {
	if (context.timestampSeconds !== undefined && (!Number.isSafeInteger(context.timestampSeconds) || context.timestampSeconds <= 0)) throw new Error("Invalid mower PB timestamp");
	if (!Number.isInteger(context.correlationId) || context.correlationId < -0x80000000 || context.correlationId > 0x7fffffff) throw new Error("Invalid mower PB correlation ID");
	if (!/^[\x20-\x7e]{8}$/.test(context.endpoint) || !/^[0-9a-fA-F]{32}$/.test(context.nonce)) throw new Error("Invalid mower PB endpoint or nonce");
	if (context.dp !== undefined && typeof context.dp !== "string") throw new Error("Invalid mower PB datapoint");
	const fields = { ...(context.timestampSeconds === undefined ? {} : { t: context.timestampSeconds }), id: context.correlationId, endpoint: context.endpoint, nonce: context.nonce, ...(context.dp === undefined ? {} : { dp: context.dp }), method: encodeMowerRemoteMessage(request) };
	return Buffer.concat([Buffer.from("PB", "ascii"), Buffer.from(appToRobotMsg.encode(appToRobotMsg.fromObject(fields)).finish())]);
}

/** Encode the same RemoteMsg as the JSON path; this is not the SDK's outer PB RPC envelope. */
export function encodeMowerRemoteMessage(request: MowerRequest): Buffer {
	const fields: Record<string, unknown> = { id: request.id };
	if (request.type === "APP_BUTTON") {
		if (!Object.hasOwn(buttonValues, request.app_button)) throw new Error("Unsupported mower protobuf button");
		fields.type = 6;
		fields.app_button = buttonValues[request.app_button];
		if ("modify_map" in request) fields.modify_map = request.modify_map;
	} else if (request.type === "GET_FULL_MAP") {
		fields.type = 2;
		fields.modify_map = request.modify_map;
	} else if (request.type === "GET_MAP_NAMES") {
		fields.type = 11;
	} else if (request.type === "GET_ROBOT_INFO") {
		fields.type = 66;
	} else if (request.type === "GET_USER_MODE_CONFIG") {
		fields.type = 29;
	} else if (request.type === "SET_RAINFALL") {
		fields.type = 28;
		fields.rainfall_config = request.rainfall_config;
	} else if (request.type === "SET_NOT_DISTURB") {
		fields.type = 27;
		fields.not_disturb_config = request.not_disturb_config;
	} else if (request.type === "GET_HEIGHT_MOTOR_PARAMETER") {
		fields.type = 34;
	} else if (request.type === "GET_MOW_PREFERENCE_CONFIG") {
		fields.type = 26;
	} else if (request.type === "REMOTE_CMD") {
		fields.type = 17;
		fields.remote_cmd = { type: 3, main_cutter_height: request.remote_cmd.main_cutter_height };
	} else if (["GET_MOW_SCHEDULE", "CREATE_MOWING_PLAN", "CHANGE_MOWING_PLAN", "DELETE_MOWING_PLAN", "DELETE_MOW_SCHEDULE", "GET_ROBOT_TIME_ZONE"].includes(request.type)) {
		const values: Record<string, number> = { CREATE_MOWING_PLAN: 36, CHANGE_MOWING_PLAN: 37, DELETE_MOWING_PLAN: 38, GET_MOW_SCHEDULE: 39, DELETE_MOW_SCHEDULE: 40, GET_ROBOT_TIME_ZONE: 41 };
		fields.type = values[request.type];
		if ("mowing_plan" in request) fields.mowing_plan = request.mowing_plan;
	} else {
		throw new Error("Unsupported mower protobuf request");
	}
	if (!/^[1-9][0-9]{0,19}$/.test(request.id) || BigInt(request.id) > 0xffffffffffffffffn) throw new Error("Invalid mower protobuf id");
	return Buffer.from(remoteMsg.encode(remoteMsg.fromObject(fields)).finish());
}

/** Decode the known status fields from the manufacturer's raw RobotMsg push payload. */
export function decodeMowerRobotMessage(bytes: Uint8Array): Record<string, unknown> {
	return robotMsg.toObject(robotMsg.decode(bytes), { longs: String, defaults: false }) as Record<string, unknown>;
}

/** MQTT protocol 702 carries ASCII PB followed by RobotToAppMsg; the event decodes only result. */
export function decodeMowerPbPush(payload: Uint8Array): Record<string, unknown> | undefined {
	if (payload.length < 2 || payload[0] !== 0x50 || payload[1] !== 0x42) return undefined;
	const envelope = robotToAppMsg.decode(payload.subarray(2)) as protobuf.Message & { result?: Uint8Array };
	if (!envelope.result?.length) return undefined;
	return decodeMowerRobotMessage(envelope.result);
}
