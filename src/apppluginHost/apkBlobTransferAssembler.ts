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
	pv: string;
	expectedSegments: number;
	segments: Map<number, ApkBlobTransferSegment>;
	byteLength: number;
	lastUpdatedAt: number;
}

const MAX_BLOB_SEGMENTS_PER_GROUP = 8_192;
const MAX_BLOB_SEGMENT_BYTES = 8 * 1024 * 1024;
const MAX_BLOB_GROUP_BYTES = 64 * 1024 * 1024;

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
		private readonly maximumGroups = 4,
		private readonly groupTimeoutMs = 30_000,
		private readonly now: () => number = Date.now,
	) {
		if (!Number.isSafeInteger(maximumGroups) || maximumGroups < 1) {
			throw new Error("Maximale Blob-Gruppenanzahl muss positiv sein");
		}
		if (!Number.isFinite(groupTimeoutMs) || groupTimeoutMs <= 0) {
			throw new Error("Blob-Gruppen-Timeout muss positiv und endlich sein");
		}
	}

	public accept(segment: ApkBlobTransferSegment): ApkAssembledBlobPayload | undefined {
		if (segment.duid !== this.duid) return undefined;
		if (typeof segment.pv !== "string" || segment.pv.length === 0) {
			throw new Error("Blob-Protokollversion darf nicht leer sein");
		}
		if (!Number.isSafeInteger(segment.nonce) || segment.nonce < 0) {
			throw new Error("Blob-Nonce muss eine nichtnegative ganze Zahl sein");
		}
		if (!Number.isSafeInteger(segment.sequenceId)
			|| segment.sequenceId < 1
			|| segment.sequenceId > MAX_BLOB_SEGMENTS_PER_GROUP) {
			throw new Error(`Blob-Sequenz muss zwischen 1 und ${MAX_BLOB_SEGMENTS_PER_GROUP} liegen`);
		}
		if (typeof segment.isFirst !== "boolean" || typeof segment.isLast !== "boolean") {
			throw new Error("Blob-Segmentmarkierungen müssen boolesch sein");
		}
		if (segment.isFirst !== (segment.sequenceId === 1)) {
			throw new Error("Nur Blob-Sequenz 1 darf als erstes Segment markiert sein");
		}
		if (!(segment.data instanceof Uint8Array) || segment.data.byteLength > MAX_BLOB_SEGMENT_BYTES) {
			throw new Error(`Blob-Segment überschreitet ${MAX_BLOB_SEGMENT_BYTES} Bytes`);
		}
		const now = this.now();
		for (const [nonce, pending] of this.#groups) {
			if (now - pending.lastUpdatedAt >= this.groupTimeoutMs) this.#groups.delete(nonce);
		}

		let group = this.#groups.get(segment.nonce);
		if (group) {
			if (group.pv !== segment.pv) {
				throw new Error(`Blob-Nonce ${segment.nonce} mischt Protokolle ${group.pv} und ${segment.pv}`);
			}
			this.#groups.delete(segment.nonce);
		} else {
			group = {
				nonce: segment.nonce,
				pv: segment.pv,
				expectedSegments: 0,
				segments: new Map(),
				byteLength: 0,
				lastUpdatedAt: now,
			};
		}
		group.lastUpdatedAt = now;
		this.#groups.set(segment.nonce, group);

		const duplicate = group.segments.get(segment.sequenceId);
		if (duplicate) {
			const exactDuplicate = duplicate.isFirst === segment.isFirst
				&& duplicate.isLast === segment.isLast
				&& Buffer.from(duplicate.data).equals(Buffer.from(segment.data));
			if (!exactDuplicate) {
				throw new Error(`Blob-Nonce ${segment.nonce} besitzt widersprüchliche Sequenz ${segment.sequenceId}`);
			}
			return undefined;
		}
		if (segment.isLast) {
			if (group.expectedSegments > 0 && group.expectedSegments !== segment.sequenceId) {
				throw new Error(`Blob-Nonce ${segment.nonce} besitzt widersprüchliche letzte Segmente`);
			}
			if ([...group.segments.keys()].some(sequenceId => sequenceId > segment.sequenceId)) {
				throw new Error(`Blob-Nonce ${segment.nonce} besitzt Segmente hinter dem letzten Segment`);
			}
			group.expectedSegments = segment.sequenceId;
		}
		if (group.expectedSegments > 0 && segment.sequenceId > group.expectedSegments) {
			throw new Error(`Blob-Sequenz ${segment.sequenceId} liegt hinter dem letzten Segment ${group.expectedSegments}`);
		}
		if (group.byteLength + segment.data.byteLength > MAX_BLOB_GROUP_BYTES) {
			this.#groups.delete(segment.nonce);
			throw new Error(`Blob-Nonce ${segment.nonce} überschreitet ${MAX_BLOB_GROUP_BYTES} Bytes`);
		}
		group.segments.set(segment.sequenceId, {
			...segment,
			data: Buffer.from(segment.data),
		});
		group.byteLength += segment.data.byteLength;

		while (this.#groups.size > this.maximumGroups) {
			const oldestNonce = this.#groups.keys().next().value as number | undefined;
			if (oldestNonce === undefined) break;
			this.#groups.delete(oldestNonce);
		}

		if (group.expectedSegments <= 0 || group.expectedSegments !== group.segments.size) return undefined;
		for (let sequenceId = 1; sequenceId <= group.expectedSegments; sequenceId += 1) {
			if (!group.segments.has(sequenceId)) return undefined;
		}
		this.#groups.delete(group.nonce);
		const segments = [...group.segments.values()].sort((left, right) => left.sequenceId - right.sequenceId);
		if (group.pv === "B01") {
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
