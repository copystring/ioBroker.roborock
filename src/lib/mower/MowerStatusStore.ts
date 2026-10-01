export interface MowerStatusSnapshot {
	messageId: string;
	battery?: number;
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
		this.lastId = id;
		this.snapshot = next;
		return true;
	}

	public getSnapshot(): MowerStatusSnapshot | undefined {
		return this.snapshot ? { ...this.snapshot } : undefined;
	}
}
