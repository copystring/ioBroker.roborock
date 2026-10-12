/** Wire fields reconstructed from the original RockMow plugin; timestamps are Unix seconds. */
export const MOWER_SCHEDULE_PROTO = `
message Week { int32 type = 1; }
message MowPreference {
 uint32 mow_times = 1; int32 effective = 2; int32 direction = 3; uint32 height = 4;
 uint32 keep_edge = 5; string area_name = 6; uint32 area_id = 7;
 int32 mode = 8; int32 direction_type = 9;
}
message MowAreasConfig { MowPreference global = 1; repeated MowPreference custom = 2; int32 mode = 3; }
message MowingPlan {
 uint32 id = 1; int32 type = 2; int32 status = 3; uint64 start = 4;
 uint64 end = 5; repeated Week days = 6; int32 mode = 7;
 MowAreasConfig config = 8; int32 fsm_state = 9;
}
message MowSchedule { repeated MowingPlan plans = 1; string time_zone = 2; }
`;

export interface MowerMowPreference {
	mow_times?: number;
	effective?: number;
	direction?: number;
	height?: number;
	keep_edge?: number;
	area_name?: string;
	area_id?: number;
	mode?: number;
	direction_type?: number;
}

export interface MowerAreasConfig {
	global?: MowerMowPreference;
	custom?: MowerMowPreference[];
	mode: 0 | 1 | 2;
}

export interface MowerWeeklyPlan {
	id: number;
	type: 2;
	status: 1 | 2;
	start: string;
	end: string;
	days: Array<{ type: number }>;
	mode: 0 | 1 | 2;
	config: MowerAreasConfig;
	fsm_state: 18 | 19 | 20;
}

export interface MowerReadbackPlan extends Record<string, unknown> {
	id: number;
}

export interface MowerScheduleReadback {
	plans: MowerReadbackPlan[];
	time_zone?: string;
}

export type MowerScheduleRequest =
	| { id: string; type: "GET_MOW_SCHEDULE" | "DELETE_MOW_SCHEDULE" | "GET_ROBOT_TIME_ZONE" }
	| { id: string; type: "CREATE_MOWING_PLAN" | "CHANGE_MOWING_PLAN"; mowing_plan: MowerWeeklyPlan }
	| { id: string; type: "DELETE_MOWING_PLAN"; mowing_plan: { id: number } };

const UINT64_MAX = 0xffffffffffffffffn;
const UINT32_MAX = 0xffffffff;

function object(value: unknown): Record<string, unknown> | undefined {
	return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

function uint32(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= UINT32_MAX;
}

function int32(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= -0x80000000 && value <= 0x7fffffff;
}

function epochSeconds(value: unknown): value is string {
	return typeof value === "string" && /^(?:0|[1-9][0-9]{0,19})$/.test(value) && BigInt(value) <= UINT64_MAX;
}

function preference(value: unknown): MowerMowPreference {
	const input = object(value);
	if (!input) throw new Error("Mower schedule preference must be an object");
	const unsigned = ["mow_times", "height", "keep_edge", "area_id"];
	const signed = ["effective", "direction", "mode", "direction_type"];
	const result: MowerMowPreference = {};
	for (const [key, field] of Object.entries(input)) {
		if (unsigned.includes(key) && uint32(field) || signed.includes(key) && int32(field) || key === "area_name" && typeof field === "string") {
			if (key === "effective" && ![0, 1, 2, 3].includes(field as number) || key === "direction_type" && ![0, 1, 2, 3].includes(field as number) || key === "mode" && ![0, 1, 2].includes(field as number)) throw new Error(`Invalid mower schedule preference enum: ${key}`);
			Object.assign(result, { [key]: field });
		} else {
			throw new Error(`Invalid mower schedule preference field: ${key}`);
		}
	}
	return result;
}

/** Preserve source preference messages while applying only explicitly supplied schedule overrides. */
export function prepareMowerSchedulePreferences(candidate: unknown, freshPreferenceConfig: unknown, existingPlan?: unknown): { plan: MowerWeeklyPlan; changedHeights: number[] } {
	const input = object(candidate);
	const config = object(input?.config);
	const fresh = object(freshPreferenceConfig);
	const oldConfig = object(object(existingPlan)?.config);
	if (!input || !config || !fresh) throw new Error("Mower schedule preference context is missing");
	const enumNumber = (value: unknown, names: readonly string[]): unknown => typeof value === "string" && names.includes(value) ? names.indexOf(value) : value;
	const normalize = (value: unknown): MowerMowPreference | undefined => {
		if (value === undefined) return undefined;
		const fields = object(value);
		if (!fields) throw new Error("Invalid mower schedule preference base");
		return preference({
			...fields,
			...(fields.effective === undefined ? {} : { effective: enumNumber(fields.effective, ["UNKNOWN", "DAILY", "EFFICIENT", "MANICURE"]) }),
			...(fields.direction_type === undefined ? {} : { direction_type: enumNumber(fields.direction_type, ["NONE", "CUSTOM", "NAV_EFFICIENT", "AUTO_DEFLECTION"]) }),
			...(fields.mode === undefined ? {} : { mode: enumNumber(fields.mode, ["NONE", "GLOBAL", "CUSTOM"]) }),
		});
	};
	const freshGlobal = normalize(fresh.global);
	const oldGlobal = normalize(oldConfig?.global);
	const freshCustom = Array.isArray(fresh.custom) ? fresh.custom.map(normalize) : [];
	const oldCustom = Array.isArray(oldConfig?.custom) ? oldConfig.custom.map(normalize) : [];
	const byId = (list: Array<MowerMowPreference | undefined>, id: number): MowerMowPreference | undefined => list.find(item => item !== undefined && (item.area_id ?? 0) === id);
	const changedHeights: number[] = [];
	const merge = (base: MowerMowPreference | undefined, override: unknown, areaId?: number): MowerMowPreference => {
		const explicit = normalize(override) ?? {};
		if (base === undefined) throw new Error("No mower preference base for schedule override");
		if (areaId !== undefined && explicit.area_id !== undefined && explicit.area_id !== areaId) throw new Error("Mower schedule area identity changed");
		const merged = preference({ ...base, ...explicit, ...(areaId === undefined ? {} : { area_id: areaId }) });
		if (explicit.height !== undefined && explicit.height !== (base.height ?? 0)) changedHeights.push(explicit.height);
		return merged;
	};
	const mode = enumNumber(config.mode, ["NONE", "GLOBAL", "CUSTOM"]);
	const preparedConfig: MowerAreasConfig = { mode: mode as 0 | 1 | 2 };
	if (mode === 1) {
		preparedConfig.global = merge(oldGlobal ?? oldCustom[0] ?? freshGlobal, config.global);
	} else if (mode === 2) {
		if (!Array.isArray(config.custom) || config.custom.length === 0) throw new Error("Mower schedule requires selected areas");
		preparedConfig.global = config.global === undefined ? oldGlobal ?? freshGlobal : merge(oldGlobal ?? freshGlobal, config.global);
		preparedConfig.custom = config.custom.map(value => {
			const entry = object(value);
			if (!entry || !uint32(entry.area_id)) throw new Error("Invalid mower schedule area identity");
			return merge(byId(oldCustom, entry.area_id) ?? byId(freshCustom, entry.area_id) ?? oldGlobal ?? freshGlobal, entry, entry.area_id);
		});
	} else {
		throw new Error("Unsupported mower schedule preference mode");
	}
	const plan = parseMowerWeeklyPlan({ ...input, mode: enumNumber(input.mode, ["NONE", "GLOBAL", "CUSTOM"]), config: preparedConfig });
	return { plan, changedHeights: [...new Set(changedHeights)] };
}

function areaConfig(value: unknown): MowerAreasConfig {
	const input = object(value);
	if (!input || ![0, 1, 2].includes(input.mode as number)) throw new Error("Invalid mower schedule area config");
	for (const key of Object.keys(input)) if (!["global", "custom", "mode"].includes(key)) throw new Error(`Unsupported mower schedule area config field: ${key}`);
	if (input.custom !== undefined && !Array.isArray(input.custom)) throw new Error("Invalid mower schedule custom areas");
	return {
		...(input.global === undefined ? {} : { global: preference(input.global) }),
		...(input.custom === undefined ? {} : { custom: input.custom.map(preference) }),
		mode: input.mode as 0 | 1 | 2,
	};
}

/** Validate an atomic weekly wire plan. Time conversion must happen outside this module. */
export function parseMowerWeeklyPlan(value: unknown): MowerWeeklyPlan {
	const plan = object(value);
	if (!plan || Object.keys(plan).some(key => !["id", "type", "status", "start", "end", "days", "mode", "config", "fsm_state"].includes(key)) ||
		!uint32(plan.id) || plan.type !== 2 || (plan.status !== 1 && plan.status !== 2) ||
		!epochSeconds(plan.start) || !epochSeconds(plan.end) || !Array.isArray(plan.days) || plan.days.length === 0 ||
		![0, 1, 2].includes(plan.mode as number) || ![18, 19, 20].includes(plan.fsm_state as number)) {
		throw new Error("Invalid mower weekly plan");
	}
	const days = plan.days.map((value: unknown) => {
		const day = object(value);
		if (!day || Object.keys(day).length !== 1 || !Number.isInteger(day.type) || (day.type as number) < 0 || (day.type as number) > 6) throw new Error("Invalid mower schedule weekday");
		return { type: day.type as number };
	});
	if (new Set(days.map(day => day.type)).size !== days.length) throw new Error("Duplicate mower schedule weekday");
	const config = areaConfig(plan.config);
	const duration = BigInt(plan.end) - BigInt(plan.start);
	if (duration < 900n || duration > 86400n) throw new Error("Mower weekly plan duration must be between 15 minutes and 24 hours");
	if (plan.fsm_state === 18 && (plan.mode !== 1 || config.mode !== 1 || !config.global || Object.keys(config.global).length === 0)) throw new Error("Global mower plan requires global preferences");
	if (plan.fsm_state === 20 && (plan.mode !== 2 || config.mode !== 2 || !config.custom?.length || config.custom.some(area => !uint32(area.area_id)))) throw new Error("Area mower plan requires selected areas");
	if (config.custom && new Set(config.custom.map(area => area.area_id)).size !== config.custom.length) throw new Error("Duplicate mower schedule area");
	if (plan.fsm_state === 19) throw new Error("Edge mower schedules are not supported by the source editor");
	return { id: plan.id, type: 2, status: plan.status, start: plan.start, end: plan.end, days, mode: plan.mode as 0 | 1 | 2, config, fsm_state: plan.fsm_state as 18 | 19 | 20 };
}

function requestId(timestamp: number): string {
	if (!Number.isSafeInteger(timestamp) || timestamp <= 0) throw new Error("Invalid mower schedule request id");
	return String(timestamp);
}

export function buildMowerScheduleRequest(action: "list" | "timezone" | "create" | "change" | "delete" | "deleteAll", timestamp: number, plan?: unknown): MowerScheduleRequest {
	const id = requestId(timestamp);
	if (!["list", "timezone", "create", "change", "delete", "deleteAll"].includes(action)) throw new Error("Unsupported mower schedule action");
	if (action === "list") return { id, type: "GET_MOW_SCHEDULE" };
	if (action === "timezone") return { id, type: "GET_ROBOT_TIME_ZONE" };
	if (action === "deleteAll") return { id, type: "DELETE_MOW_SCHEDULE" };
	if (action === "delete") {
		const candidate = object(plan);
		if (!candidate || Object.keys(candidate).length !== 1 || !uint32(candidate.id)) throw new Error("Delete mower schedule requires an existing plan id");
		return { id, type: "DELETE_MOWING_PLAN", mowing_plan: { id: candidate.id } };
	}
	const mowing_plan = parseMowerWeeklyPlan(plan);
	return { id, type: action === "create" ? "CREATE_MOWING_PLAN" : "CHANGE_MOWING_PLAN", mowing_plan };
}

/** Type 34 is the manufacturer's schedule response; DP 102 transport ACKs do not qualify. */
export function parseMowerScheduleReadback(value: unknown): MowerScheduleReadback | undefined {
	const message = object(value);
	if (!message || (message.type !== 34 && message.type !== "MOW_SCHEDULE")) return undefined;
	const schedule = object(message.mow_schedule);
	if (!schedule || (schedule.plans !== undefined && !Array.isArray(schedule.plans))) return undefined;
	const plans: MowerReadbackPlan[] = [];
	const ids = new Set<number>();
	// protobufjs omits an empty repeated field when toObject uses defaults:false.
	for (const value of schedule.plans ?? []) {
		const plan = object(value);
		if (!plan || (plan.id !== undefined && !uint32(plan.id))) return undefined;
		const id = plan.id === undefined ? 0 : plan.id as number;
		if (ids.has(id)) return undefined;
		ids.add(id);
		plans.push({ ...plan, id });
	}
	if (schedule.time_zone !== undefined && typeof schedule.time_zone !== "string") return undefined;
	return { plans, ...(schedule.time_zone === undefined ? {} : { time_zone: schedule.time_zone }) };
}

/** Compare active weekly intervals in a specified IANA time zone. Adjacent intervals do not overlap. */
export function findMowerScheduleOverlap(plan: MowerWeeklyPlan, readback: MowerScheduleReadback, timeZone: string): number | undefined {
	const enumValue = (value: unknown, names: readonly string[], defaultValue: number): number => {
		if (value === undefined) return defaultValue;
		if (typeof value === "number" && Number.isInteger(value) && value >= 0 && value < names.length) return value;
		if (typeof value === "string") {
			const index = names.indexOf(value);
			if (index !== -1) return index;
		}
		throw new Error("Unknown mower schedule enum in readback");
	};
	const weekday = (value: unknown): number => enumValue(value, ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"], 0);
	const status = (value: unknown): number => enumValue(value, ["UNKNOWN", "OPEN", "CLOSE", "INVALID"], 0);
	const type = (value: unknown): number => enumValue(value, ["NONE", "ONE_TIME", "WEEKLY"], 0);
	const formatter = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
	const clock = (seconds: string): number => {
		const timestamp = Number(seconds);
		if (!Number.isSafeInteger(timestamp) || !Number.isFinite(timestamp * 1000)) throw new Error("Mower schedule timestamp cannot be converted to local time");
		const date = new Date(timestamp * 1000);
		if (Number.isNaN(date.getTime())) throw new Error("Mower schedule timestamp is outside the supported date range");
		const parts = formatter.formatToParts(date);
		const hour = Number(parts.find(part => part.type === "hour")?.value);
		const minute = Number(parts.find(part => part.type === "minute")?.value);
		return hour * 3600 + minute * 60;
	};
	const intervals = (entry: Record<string, unknown>): Array<[number, number]> => {
		if (!epochSeconds(entry.start) || !epochSeconds(entry.end) || !Array.isArray(entry.days)) throw new Error("Incomplete existing mower schedule");
		const start = clock(entry.start);
		const end = clock(entry.end);
		const duration = end <= start ? end + 86400 - start : end - start;
		if (duration < 900) throw new Error("Invalid existing mower schedule duration");
		return entry.days.map(value => {
			const day = object(value);
			if (!day) throw new Error("Invalid existing mower schedule weekday");
			const from = weekday(day.type) * 86400 + start;
			return [from, from + duration];
		});
	};
	if (plan.status !== 1) return undefined;
	const current = intervals(plan as unknown as Record<string, unknown>);
	for (const existing of readback.plans) {
		if (existing.id === plan.id) continue;
		const existingStatus = status(existing.status);
		const existingType = type(existing.type);
		if (existingStatus !== 1) continue;
		if (existingType !== 2) throw new Error("Active non-weekly mower schedule cannot be checked for weekly overlap");
		for (const [start, end] of current) for (const [otherStart, otherEnd] of intervals(existing)) {
			for (const shift of [-604800, 0, 604800]) {
				if (start < otherEnd + shift && otherStart + shift < end) return existing.id;
			}
		}
	}
	return undefined;
}
