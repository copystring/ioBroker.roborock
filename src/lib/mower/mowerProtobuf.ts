import * as protobuf from "protobufjs";
import type { MowerRequest } from "./mowerContract";

// Minimal source-derived wire projection. Unknown RobotMsg fields are skipped, not reinterpreted.
const root = protobuf.parse(`
syntax = "proto3";
message RainFall { bool enable = 2; float delay_time = 3; }
message UserModeConfig { RainFall rainfall_config = 1; }
message RemoteMsg { uint64 id = 1; int32 type = 2; int32 app_button = 5; RainFall rainfall_config = 18; }
message Battery { uint32 percent = 2; }
message HardwareMsg { Battery battery = 1; }
message MowProgress { float mow_all_area = 9; float expected_time = 10; float cur_mow_progress = 11; }
message NavTaskProgress { uint32 percent = 3; float area = 4; float percentage = 6; float expected_time = 7; }
message Navigation { NavTaskProgress nav_task_progress = 15; }
message RobotTask { int32 working_state = 1; int32 robot_detail_state = 2; }
message CheckResults { repeated int32 ignorable = 1; repeated int32 recoverable = 2; repeated int32 unrecoverable = 3; repeated int32 critical = 4; repeated int32 to_dock = 5; repeated int32 debounce = 6; }
message RobotMsg {
 uint64 id = 1; int32 type = 2; Battery battery = 10; Navigation navigation = 12; HardwareMsg hardware = 13;
 MowProgress mow_progress = 29;
 int32 fsm_charge_state = 19; CheckResults fsm_errors = 46; repeated int32 user_errors = 52;
 UserModeConfig user_mode_config = 34;
 CheckResults scheduler_errors = 62; CheckResults charge_errors = 63; RobotTask robot_task = 71;
}
message RobotToAppMsg { bytes result = 5; }
`, { keepCase: true }).root;
const remoteMsg = root.lookupType("RemoteMsg");
const robotMsg = root.lookupType("RobotMsg");
const robotToAppMsg = root.lookupType("RobotToAppMsg");
const buttonValues = { MOW_GLOBAL: 14, MOW_PAUSE: 20, MOW_RESUME: 22, MOW_END: 24, CHARGE: 5 } as const;

/** Encode the same RemoteMsg as the JSON path; this is not the SDK's outer PB RPC envelope. */
export function encodeMowerRemoteMessage(request: MowerRequest): Buffer {
	const fields: Record<string, unknown> = { id: request.id };
	if (request.type === "APP_BUTTON") {
		if (!Object.hasOwn(buttonValues, request.app_button)) throw new Error("Unsupported mower protobuf button");
		fields.type = 6;
		fields.app_button = buttonValues[request.app_button];
	} else if (request.type === "GET_ROBOT_INFO") {
		fields.type = 66;
	} else if (request.type === "GET_USER_MODE_CONFIG") {
		fields.type = 29;
	} else if (request.type === "SET_RAINFALL") {
		fields.type = 28;
		fields.rainfall_config = request.rainfall_config;
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
