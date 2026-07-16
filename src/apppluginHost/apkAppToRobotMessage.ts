export interface ApkAppToRobotMessage {
	id: number;
	method: Uint8Array;
	endpoint?: string;
	nonce?: string;
}

function encodeUnsignedVarint(value: bigint): Buffer {
	if (value < 0n) throw new Error(`Unsupported protobuf varint value: ${value}`);
	const bytes: number[] = [];
	let remainder = value;
	do {
		let byte = Number(remainder & 0x7fn);
		remainder >>= 7n;
		if (remainder !== 0n) byte |= 0x80;
		bytes.push(byte);
	} while (remainder !== 0n);
	return Buffer.from(bytes);
}

function encodeVarint(value: number): Buffer {
	if (!Number.isSafeInteger(value) || value < 0) {
		throw new Error(`Unsupported protobuf varint value: ${value}`);
	}
	return encodeUnsignedVarint(BigInt(value));
}

function encodeInt32(value: number): Buffer {
	if (!Number.isInteger(value) || value < -0x8000_0000 || value > 0x7fff_ffff) {
		throw new Error(`Invalid protobuf int32 value: ${value}`);
	}
	return encodeUnsignedVarint(BigInt.asUintN(64, BigInt(value)));
}

function encodeLengthDelimited(fieldNumber: number, value: Uint8Array): Buffer {
	const bytes = Buffer.from(value);
	return Buffer.concat([
		encodeVarint((fieldNumber << 3) | 2),
		encodeVarint(bytes.length),
		bytes,
	]);
}

/**
 * Encodes the APK MessageProto.AppToRobotMsg fields used by RRRpcManager.
 *
 * Field numbers are taken from the generated APK protobuf class:
 * id=3, endpoint=4, nonce=5 and method=6. The normal protobuf path only
 * writes id/method; the blob protobuf path additionally writes endpoint/nonce.
 */
export function encodeApkAppToRobotMessage(message: ApkAppToRobotMessage): Buffer {
	if (!Number.isInteger(message.id) || message.id < -0x8000_0000 || message.id > 0x7fff_ffff) {
		throw new Error(`Invalid AppToRobotMsg id: ${message.id}`);
	}
	const fields: Buffer[] = [];
	if (message.id !== 0) {
		fields.push(encodeVarint((3 << 3) | 0), encodeInt32(message.id));
	}
	if (message.endpoint !== undefined && message.endpoint !== "") {
		fields.push(encodeLengthDelimited(4, Buffer.from(message.endpoint, "utf8")));
	}
	if (message.nonce !== undefined && message.nonce !== "") {
		fields.push(encodeLengthDelimited(5, Buffer.from(message.nonce, "utf8")));
	}
	if (message.method.length !== 0) {
		fields.push(encodeLengthDelimited(6, message.method));
	}
	return Buffer.concat(fields);
}
