import * as protobuf from "protobufjs";
import type { MowerRequest } from "./mowerContract";

// Minimal source-derived wire projection. Unknown RobotMsg fields are skipped, not reinterpreted.
const root = protobuf.parse(`
syntax = "proto3";
message RemoteMsg { uint64 id = 1; int32 type = 2; int32 app_button = 5; }
message Battery { uint32 percent = 2; }
message HardwareMsg { Battery battery = 1; }
message RobotMsg { uint64 id = 1; int32 type = 2; Battery battery = 10; HardwareMsg hardware = 13; }
`, { keepCase: true }).root;
const remoteMsg = root.lookupType("RemoteMsg");
const robotMsg = root.lookupType("RobotMsg");
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
