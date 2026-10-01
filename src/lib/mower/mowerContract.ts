/** Source: original shared RockMow bundle, RemoteMsg.toJSON, not the vacuum RPC contract. */
export const MOWER_BUTTONS = {
	start: "MOW_GLOBAL",
	pause: "MOW_PAUSE",
	resume: "MOW_RESUME",
	stop: "MOW_END",
	charge: "CHARGE",
} as const;

export type MowerCommand = keyof typeof MOWER_BUTTONS;
export type MowerRequest = {
	id: string;
	type: "APP_BUTTON";
	app_button: typeof MOWER_BUTTONS[MowerCommand];
} | {
	id: string;
	type: "GET_ROBOT_INFO";
};

export function isSourceSupportedMower(model: string | null | undefined, category: string | null | undefined): boolean {
	// a266 is explicitly mapped to butchart_pro in the original bundle. Do not infer other models.
	return model === "roborock.mower.a266" && (!category || category === "roborock.mower");
}

function requestId(timestamp: number): string {
	if (!Number.isSafeInteger(timestamp) || timestamp <= 0) throw new Error("Invalid mower protobuf id");
	return String(timestamp);
}

export function buildMowerButton(command: MowerCommand, timestamp: number): MowerRequest {
	if (!Object.hasOwn(MOWER_BUTTONS, command)) throw new Error("Unsupported mower command");
	// protobufjs toJSONOptions use longs:String and enums:String, without defaults.
	return { id: requestId(timestamp), type: "APP_BUTTON", app_button: MOWER_BUTTONS[command] };
}

export function buildMowerInfoRequest(timestamp: number): MowerRequest {
	return { id: requestId(timestamp), type: "GET_ROBOT_INFO" };
}
