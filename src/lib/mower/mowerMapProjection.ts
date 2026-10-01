import * as protobuf from "protobufjs";
import type { MowerBoundary } from "./MowerMapStore";

const DEFAULT_MAX_MAP_BYTES = 16 * 1024 * 1024;

// Only the fields required to bind area commands to a named map. protobufjs
// skips unknown geometry fields while reading the manufacturer's rock.common.Map.
const mapType = protobuf.parse(`
syntax = "proto3";
message Boundary { int32 id = 1; string name = 5; }
message Map { repeated Boundary boundaries = 10; string name = 17; }
`, { keepCase: true }).root.lookupType("Map");

export interface MowerMapProjection {
	name: string;
	boundaries: MowerBoundary[];
}

/** Decode the uncompressed native callback bytes: ASCII "pb" + rock.common.Map. */
export function decodeMowerMapProjection(bytes: Uint8Array, maxMapBytes = DEFAULT_MAX_MAP_BYTES): MowerMapProjection {
	if (!Number.isSafeInteger(maxMapBytes) || maxMapBytes <= 0) throw new Error("Invalid mower map size limit");
	if (bytes.length > maxMapBytes) throw new Error("Mower map exceeds size limit");
	if (bytes.length < 3 || bytes[0] !== 0x70 || bytes[1] !== 0x62) throw new Error("Invalid mower map magic");
	const decoded = mapType.toObject(mapType.decode(bytes.subarray(2)), { defaults: true }) as Record<string, unknown>;
	if (typeof decoded.name !== "string" || !Array.isArray(decoded.boundaries)) throw new Error("Invalid mower map projection");
	const boundaries = decoded.boundaries.map(item => {
		if (!item || typeof item !== "object") throw new Error("Invalid mower boundary");
		const boundary = item as Record<string, unknown>;
		if (!Number.isInteger(boundary.id) || typeof boundary.name !== "string") throw new Error("Invalid mower boundary");
		return { id: boundary.id as number, name: boundary.name };
	});
	return { name: decoded.name, boundaries };
}
