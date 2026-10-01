import statusEnums from "./statusEnums.json";

export interface MowerStatusSnapshot {
	messageId?: string;
	battery?: number;
	batteryBroadcast?: number;
	rainEnabled?: boolean;
	rainDelayHours?: number;
	dndEnabled?: boolean;
	dndWindows?: string;
	mowingProgress?: number;
	navigationProgress?: number;
	totalArea?: number;
	expectedDuration?: number;
	mowedArea?: number | null;
	remainingTime?: number | null;
	detailState?: number;
	workingState?: number;
	chargeState?: number;
	fsmErrors?: string;
	userErrors?: string;
	schedulerErrors?: string;
	chargeErrors?: string;
}

function record(value: unknown): Record<string, unknown> | undefined {
	return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

function messageId(value: unknown): bigint | undefined {
	if (typeof value === "number" && Number.isSafeInteger(value) && value > 0) return BigInt(value);
	if (typeof value === "string" && /^[1-9][0-9]{0,19}$/.test(value)) {
		const id = BigInt(value);
		return id <= 0xffffffffffffffffn ? id : undefined;
	}
	return undefined;
}

function int32(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= -0x80000000 && value <= 0x7fffffff;
}

function enumValue(value: unknown, symbols: Record<string, number>): number | undefined {
	if (int32(value)) return value;
	if (typeof value === "string" && Object.hasOwn(symbols, value)) return symbols[value];
	return undefined;
}

function errorList(value: unknown): value is Array<number | string> {
	return Array.isArray(value) && value.every(code => int32(code) || (typeof code === "string" && /^[A-Za-z_][A-Za-z_0-9]*$/.test(code)));
}

function checkResults(value: unknown): string | undefined {
	const checks = record(value);
	if (!checks) return undefined;
	const result: Record<string, Array<number | string>> = {};
	for (const category of ["ignorable", "recoverable", "unrecoverable", "critical", "to_dock", "debounce"]) {
		if (!Object.hasOwn(checks, category)) continue;
		const codes = checks[category];
		if (!errorList(codes)) return undefined;
		result[category] = codes;
	}
	return JSON.stringify(result);
}

function finite(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

function firstFinite(...values: unknown[]): number | undefined {
	return values.find(finite) as number | undefined;
}

function timePoint(value: unknown): string | undefined {
	const point = record(value);
	if (!point) return undefined;
	const hour = Object.hasOwn(point, "hour") ? point.hour : 0;
	const minute = Object.hasOwn(point, "minute") ? point.minute : 0;
	if (typeof hour !== "number" || !Number.isInteger(hour) || hour < 0 || hour > 23 || typeof minute !== "number" || !Number.isInteger(minute) || minute < 0 || minute > 59) return undefined;
	return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function timeWindows(value: unknown): string | undefined {
	if (!Array.isArray(value)) return undefined;
	const windows: Array<{ start: string; end: string }> = [];
	for (const slot of value) {
		const fields = record(slot);
		const start = timePoint(fields?.start);
		const end = timePoint(fields?.end);
		if (start === undefined || end === undefined) return undefined;
		windows.push({ start, end });
	}
	return JSON.stringify(windows);
}

/** One store per device. Input is a decoded RobotMsg, never a DP 102 transport ACK. */
export class MowerStatusStore {
	private lastId = 0n;
	private snapshot: MowerStatusSnapshot | undefined;

	public acceptRobotMessage(value: unknown): boolean {
		const message = record(value);
		if (message?.type === 25 || message?.type === "USER_MODE_CONFIG") {
			const mode = record(message.user_mode_config);
			const rain = record(mode?.rainfall_config);
			const dnd = record(mode?.not_disturb_config);
			if (!rain && !dnd) return false;
			const next = { ...this.snapshot };
			let accepted = false;
			if (rain) {
			// A present RainFall has source-proven proto3 defaults false/0. A missing
			// container is unknown; malformed explicit values never overwrite readback.
				const enable = Object.hasOwn(rain, "enable") ? rain.enable : false;
				const delay = Object.hasOwn(rain, "delay_time") ? rain.delay_time : 0;
				if (typeof enable === "boolean") {
					next.rainEnabled = enable;
					accepted = true;
				}
				if (typeof delay === "number" && Number.isFinite(delay) && delay >= 0) {
					next.rainDelayHours = delay;
					accepted = true;
				}
			}
			if (dnd) {
				const enabled = Object.hasOwn(dnd, "enable") ? dnd.enable : false;
				if (typeof enabled === "boolean") {
					next.dndEnabled = enabled;
					accepted = true;
				}
				const windows = timeWindows(Object.hasOwn(dnd, "time") ? dnd.time : []);
				if (windows !== undefined) {
					next.dndWindows = windows;
					accepted = true;
				}
			}
			if (accepted) this.snapshot = next;
			return accepted;
		}
		if (message?.type === 79 || message?.type === "BATTERY_PERCENT") {
			const battery = record(record(message.hardware)?.battery)?.percent;
			if (typeof battery !== "number" || !Number.isInteger(battery) || battery < 0 || battery > 100) return false;
			// Source listener has no ID gate for sideband battery. Keep its stream separate:
			// the app's two UI-projection override cannot be mapped to adapter status frames.
			this.snapshot = { ...this.snapshot, batteryBroadcast: battery };
			return true;
		}
		// RobotMsg.Type.ROBOT_STATUS_UPDATE = 38; fromObject also accepts its JSON enum name.
		if (!message || (message.type !== 38 && message.type !== "ROBOT_STATUS_UPDATE")) return false;
		const id = messageId(message.id);
		// The original plugin accepts only newer ROBOT_STATUS_UPDATE messages.
		if (id === undefined || id <= this.lastId) return false;
		const hardware = record(message.hardware);
		const battery = record(hardware?.battery)?.percent;
		const next: MowerStatusSnapshot = { ...this.snapshot, messageId: id.toString() };
		// Missing or malformed values are not an empty battery. Never apply protobuf defaults here.
		if (typeof battery === "number" && Number.isInteger(battery) && battery >= 0 && battery <= 100) next.battery = battery;
		const mow = record(message.mow_progress);
		const nav = record(record(message.navigation)?.nav_task_progress);
		const progress = firstFinite(mow?.cur_mow_progress);
		const navigationProgress = firstFinite(nav?.percentage, nav?.percent);
		const area = firstFinite(mow?.mow_all_area, nav?.area);
		const duration = firstFinite(mow?.expected_time, nav?.expected_time);
		const validProgress = progress !== undefined && progress >= 0 && progress <= 100;
		const validArea = area !== undefined && area >= 0;
		const validDuration = duration !== undefined && duration >= 0;
		if (validProgress) next.mowingProgress = progress;
		if (navigationProgress !== undefined && navigationProgress >= 0 && navigationProgress <= 100) next.navigationProgress = navigationProgress;
		if (validArea) next.totalArea = area;
		if (validDuration) next.expectedDuration = duration;
		// Derive only from fields in this message, never combine a new task's progress
		// with an area or duration retained from an earlier partial message.
		if (next.mowedArea !== undefined) next.mowedArea = null;
		if (next.remainingTime !== undefined) next.remainingTime = null;
		if (validProgress && validArea) {
			const mowed = Math.ceil(area * progress / 100);
			if (Number.isFinite(mowed)) next.mowedArea = mowed;
		}
		if (validProgress && validDuration) {
			const remaining = duration * (100 - progress) / 100;
			if (Number.isFinite(remaining)) next.remainingTime = remaining;
		}
		const task = record(message.robot_task);
		for (const [field, raw, symbols] of [["detailState", task?.robot_detail_state, statusEnums.RobotDetailStateType], ["workingState", task?.working_state, statusEnums.FsmStateType], ["chargeState", message.fsm_charge_state, statusEnums.FsmStateType]] as const) {
			const value = enumValue(raw, symbols);
			if (value !== undefined) next[field] = value;
		}
		for (const [field, raw] of [["fsmErrors", message.fsm_errors], ["schedulerErrors", message.scheduler_errors], ["chargeErrors", message.charge_errors]] as const) {
			const value = checkResults(raw);
			if (value !== undefined) next[field] = value;
		}
		if (errorList(message.user_errors)) next.userErrors = JSON.stringify(message.user_errors);
		this.lastId = id;
		this.snapshot = next;
		return true;
	}

	public getSnapshot(): MowerStatusSnapshot | undefined {
		return this.snapshot ? { ...this.snapshot } : undefined;
	}
}
