export type ApkRobotToAppMessageType = "UNKNOWN" | "RPC" | "BROADCAST" | "UNRECOGNIZED";

export interface ApkRobotToAppMessage {
	id: number;
	type: ApkRobotToAppMessageType;
	result: Buffer;
}

interface VarintRead {
	value: bigint;
	nextOffset: number;
}

function readVarint(bytes: Uint8Array, offset: number): VarintRead {
	let value = 0n;
	let shift = 0n;
	for (let index = offset; index < bytes.length && index < offset + 10; index += 1) {
		const byte = bytes[index];
		value |= BigInt(byte & 0x7f) << shift;
		if ((byte & 0x80) === 0) return { value, nextOffset: index + 1 };
		shift += 7n;
	}
	throw new Error("Invalid RobotToAppMsg protobuf varint");
}

function toSafeLength(value: bigint, remaining: number): number {
	if (value < 0n || value > BigInt(remaining) || value > BigInt(Number.MAX_SAFE_INTEGER)) {
		throw new Error("Invalid RobotToAppMsg protobuf length");
	}
	return Number(value);
}

function skipField(bytes: Uint8Array, wireType: number, offset: number): number {
	switch (wireType) {
		case 0:
			return readVarint(bytes, offset).nextOffset;
		case 1:
			if (offset + 8 > bytes.length) throw new Error("Truncated RobotToAppMsg fixed64 field");
			return offset + 8;
		case 2: {
			const length = readVarint(bytes, offset);
			const size = toSafeLength(length.value, bytes.length - length.nextOffset);
			return length.nextOffset + size;
		}
		case 5:
			if (offset + 4 > bytes.length) throw new Error("Truncated RobotToAppMsg fixed32 field");
			return offset + 4;
		default:
			throw new Error(`Unsupported RobotToAppMsg protobuf wire type: ${wireType}`);
	}
}

function decodeType(value: bigint): ApkRobotToAppMessageType {
	if (value === 0n) return "UNKNOWN";
	if (value === 1n) return "RPC";
	if (value === 2n) return "BROADCAST";
	return "UNRECOGNIZED";
}

/** Decodes the APK MessageProto.RobotToAppMsg fields used by both listeners. */
export function decodeApkRobotToAppMessage(payload: Uint8Array): ApkRobotToAppMessage {
	const bytes = Buffer.from(payload);
	let offset = 0;
	let id = 0;
	let type: ApkRobotToAppMessageType = "UNKNOWN";
	let result = Buffer.alloc(0);
	while (offset < bytes.length) {
		const tag = readVarint(bytes, offset);
		offset = tag.nextOffset;
		const fieldNumber = Number(tag.value >> 3n);
		const wireType = Number(tag.value & 7n);
		if (fieldNumber === 0) throw new Error("Invalid RobotToAppMsg field number 0");
		if ((fieldNumber === 3 || fieldNumber === 4) && wireType === 0) {
			const value = readVarint(bytes, offset);
			offset = value.nextOffset;
			if (fieldNumber === 3) id = Number(BigInt.asIntN(32, value.value));
			else type = decodeType(value.value);
			continue;
		}
		if (fieldNumber === 5 && wireType === 2) {
			const length = readVarint(bytes, offset);
			const size = toSafeLength(length.value, bytes.length - length.nextOffset);
			result = Buffer.from(bytes.subarray(length.nextOffset, length.nextOffset + size));
			offset = length.nextOffset + size;
			continue;
		}
		offset = skipField(bytes, wireType, offset);
	}
	return { id, type, result };
}
