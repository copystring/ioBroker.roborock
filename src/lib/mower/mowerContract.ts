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
} | {
	id: string;
	type: "GET_USER_MODE_CONFIG";
} | {
	id: string;
	type: "SET_RAINFALL";
	rainfall_config: { enable: boolean; delay_time: number };
} | {
	id: string;
	type: "SET_NOT_DISTURB";
	not_disturb_config: { enable: boolean; time: Array<{ start: { hour: number; minute: number }; end: { hour: number; minute: number } }> };
};

export interface MowerRainfallSetting { enable: boolean; delayHours: 0 | 3 | 8; }
export interface MowerNotDisturbSetting { enable: boolean; start: string; end: string; }

export function parseMowerNotDisturbSetting(value: unknown): MowerNotDisturbSetting {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Not-disturb setting requires enable, start and end");
	const fields = value as Record<string, unknown>;
	const validTime = (time: unknown): time is string => typeof time === "string" && /^(?:[01][0-9]|2[0-3]):[0-5][05]$|^24:00$/.test(time);
	if (Object.keys(fields).length !== 3 || !Object.hasOwn(fields, "enable") || !Object.hasOwn(fields, "start") || !Object.hasOwn(fields, "end") || typeof fields.enable !== "boolean" || !validTime(fields.start) || !validTime(fields.end)) {
		throw new Error("Not-disturb setting requires boolean enable and HH:MM start/end in five-minute steps");
	}
	return { enable: fields.enable, start: fields.start === "24:00" ? "00:00" : fields.start, end: fields.end === "24:00" ? "00:00" : fields.end };
}

export function buildMowerNotDisturbRequest(setting: MowerNotDisturbSetting, timestamp: number): MowerRequest {
	const validated = parseMowerNotDisturbSetting(setting);
	const point = (time: string) => ({ hour: Number(time.slice(0, 2)), minute: Number(time.slice(3, 5)) });
	return { id: requestId(timestamp), type: "SET_NOT_DISTURB", not_disturb_config: { enable: validated.enable, time: [{ start: point(validated.start), end: point(validated.end) }] } };
}

export function parseMowerRainfallSetting(value: unknown): MowerRainfallSetting {
	if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Rainfall setting must contain enable and delayHours");
	const fields = value as Record<string, unknown>;
	if (Object.keys(fields).length !== 2 || !Object.hasOwn(fields, "enable") || !Object.hasOwn(fields, "delayHours") || typeof fields.enable !== "boolean" || (fields.delayHours !== 0 && fields.delayHours !== 3 && fields.delayHours !== 8)) {
		throw new Error("Rainfall setting requires boolean enable and delayHours of 0, 3 or 8");
	}
	return { enable: fields.enable, delayHours: fields.delayHours };
}

export function buildMowerRainfallRequest(setting: MowerRainfallSetting, timestamp: number): MowerRequest {
	const validated = parseMowerRainfallSetting(setting);
	return { id: requestId(timestamp), type: "SET_RAINFALL", rainfall_config: { enable: validated.enable, delay_time: validated.delayHours } };
}

export function buildMowerSettingsRequest(timestamp: number): MowerRequest {
	return { id: requestId(timestamp), type: "GET_USER_MODE_CONFIG" };
}

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
