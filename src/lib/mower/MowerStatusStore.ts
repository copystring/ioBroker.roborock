import statusEnums from "./statusEnums.json";

export interface MowerStatusSnapshot {
	messageId: string;
	battery?: number;
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

/** One store per device. Input is a decoded RobotMsg, never a DP 102 transport ACK. */
export class MowerStatusStore {
	private lastId = 0n;
	private snapshot: MowerStatusSnapshot | undefined;

	public acceptRobotMessage(value: unknown): boolean {
		const message = record(value);
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
