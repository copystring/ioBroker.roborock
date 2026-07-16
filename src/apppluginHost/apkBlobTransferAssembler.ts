export interface ApkBlobTransferSegment {
	duid: string;
	pv: string;
	nonce: number;
	sequenceId: number;
	isFirst: boolean;
	isLast: boolean;
	data: Uint8Array;
}

export interface ApkB01BlobPayload {
	kind: "b01-payload";
	duid: string;
	payload: Buffer;
}

export interface ApkRpcBlobPayload {
	kind: "rpc-response";
	duid: string;
	messageId: number;
	protocolVersion: 0 | 1 | 2;
	encodedResponse: Buffer;
}

export type ApkAssembledBlobPayload = ApkB01BlobPayload | ApkRpcBlobPayload;

interface SegmentGroup {
	nonce: number;
	expectedSegments: number;
	segments: Map<number, ApkBlobTransferSegment>;
}

function readInt32LittleEndian(data: Uint8Array, offset: number): number | undefined {
	if (offset < 0 || offset + 4 > data.length) return undefined;
	return Buffer.from(data.buffer, data.byteOffset, data.byteLength).readInt32LE(offset);
}

function startsWithAscii(data: Uint8Array, expected: string): boolean {
	if (data.length < expected.length) return false;
	return Buffer.from(data.buffer, data.byteOffset, expected.length).toString("ascii") === expected;
}

/**
 * Reproduces the four-slot, nonce-keyed transfer assembly in the APK's
 * RRRpcManager. It deliberately returns bytes only; AppPlugin parsing stays
 * on the other side of the React-Native boundary.
 */
export class ApkBlobTransferAssembler {
	readonly #groups = new Map<number, SegmentGroup>();

	public constructor(
		private readonly duid: string,
		private readonly endpoint: string,
	) {}

	public accept(segment: ApkBlobTransferSegment): ApkAssembledBlobPayload | undefined {
		if (segment.duid !== this.duid) return undefined;

		let group = this.#groups.get(segment.nonce);
		if (group) {
			this.#groups.delete(segment.nonce);
		} else {
			group = { nonce: segment.nonce, expectedSegments: 0, segments: new Map() };
		}
		this.#groups.set(segment.nonce, group);

		if (group.segments.has(segment.sequenceId)) return undefined;
		if (segment.isLast) group.expectedSegments = segment.sequenceId;
		group.segments.set(segment.sequenceId, {
			...segment,
			data: Buffer.from(segment.data),
		});

		while (this.#groups.size > 4) {
			const oldestNonce = this.#groups.keys().next().value as number | undefined;
			if (oldestNonce === undefined) break;
			this.#groups.delete(oldestNonce);
		}

		if (group.expectedSegments <= 0 || group.expectedSegments !== group.segments.size) return undefined;
		this.#groups.delete(group.nonce);
		const segments = [...group.segments.values()].sort((left, right) => left.sequenceId - right.sequenceId);
		if (segment.pv === "B01") {
			return {
				kind: "b01-payload",
				duid: this.duid,
				payload: Buffer.concat(segments.map(item => Buffer.from(item.data))),
			};
		}

		const first = segments[0];
		if (!first?.isFirst) return undefined;
		let version: number;
		let messageId: number | undefined;
		if (startsWithAscii(first.data, "ROBOROCK")) {
			version = 2;
			messageId = readInt32LittleEndian(first.data, 8);
		} else {
			if (first.data.length <= 15 || !startsWithAscii(first.data, this.endpoint)) return undefined;
			version = first.data[15];
			messageId = version === 0 || version === 1 ? readInt32LittleEndian(first.data, 16) : undefined;
		}
		if ((version !== 0 && version !== 1 && version !== 2) || messageId === undefined) return undefined;

		const firstPayload = version === 2 ? Buffer.from(first.data) : Buffer.from(first.data).subarray(24);
		return {
			kind: "rpc-response",
			duid: this.duid,
			messageId,
			protocolVersion: version,
			encodedResponse: Buffer.concat([
				Buffer.from([version]),
				firstPayload,
				...segments.slice(1).map(item => Buffer.from(item.data)),
			]),
		};
	}
}
