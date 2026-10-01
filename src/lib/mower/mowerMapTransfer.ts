const DEFAULT_MAX_BLOB_BYTES = 16 * 1024 * 1024;
const DEFAULT_MAX_CHUNKS = 1024;

export interface MowerMapChunk {
	readonly nonce: number;
	readonly sequenceId: number;
	/** Derived from MQTT protocol 301. */
	readonly isLast: boolean;
	/** Already decrypted MQTT payload, as delivered by TransferDataBean. */
	readonly data: Buffer;
}

/** Reassembles one native blob response without handling MQTT or publishing an RPC. */
export class MowerMapTransfer {
	private readonly chunks = new Map<number, MowerMapChunk>();
	private finalSequence: number | undefined;
	private byteCount = 0;
	private finished = false;
	private aborted = false;

	public constructor(
		private readonly expectedNonce: number,
		private readonly expectedCorrelationId: number,
		private readonly endpoint: string,
		private readonly maxBlobBytes = DEFAULT_MAX_BLOB_BYTES,
		private readonly maxChunks = DEFAULT_MAX_CHUNKS,
		private readonly signal?: AbortSignal,
	) {
		if (!Number.isInteger(expectedNonce) || expectedNonce < 0 || expectedNonce > 0xffffffff) throw new Error("Invalid mower transfer nonce");
		if (!Number.isInteger(expectedCorrelationId) || expectedCorrelationId < -2147483648 || expectedCorrelationId > 2147483647) throw new Error("Invalid mower transfer correlation ID");
		if (!/^[\x20-\x7e]{8}$/.test(endpoint)) throw new Error("Invalid mower transfer endpoint");
		if (!Number.isSafeInteger(maxBlobBytes) || maxBlobBytes <= 0 || !Number.isSafeInteger(maxChunks) || maxChunks <= 0) throw new Error("Invalid mower transfer limits");
	}

	/** Returns the version-prefixed native callback payload when every chunk has arrived. */
	public push(chunk: MowerMapChunk): Buffer | undefined {
		if (this.aborted || this.signal?.aborted) throw new Error("Mower map transfer aborted");
		if (this.finished) throw new Error("Mower map transfer already complete");
		if (chunk.nonce !== this.expectedNonce) throw new Error("Wrong mower map transfer nonce");
		if (!Number.isSafeInteger(chunk.sequenceId) || chunk.sequenceId < 1 || chunk.sequenceId > this.maxChunks) throw new Error("Invalid mower map chunk sequence");
		if (!Buffer.isBuffer(chunk.data) || chunk.data.length === 0) throw new Error("Invalid mower map chunk data");
		const previous = this.chunks.get(chunk.sequenceId);
		if (previous) {
			if (previous.isLast !== chunk.isLast || !previous.data.equals(chunk.data)) throw new Error("Conflicting mower map chunk duplicate");
			return undefined;
		}
		if (this.finalSequence !== undefined && chunk.sequenceId > this.finalSequence) throw new Error("Mower map chunk follows final sequence");
		if (chunk.isLast) {
			if (this.finalSequence !== undefined || [...this.chunks.keys()].some(id => id > chunk.sequenceId)) throw new Error("Conflicting mower map final sequence");
			this.finalSequence = chunk.sequenceId;
		}
		this.byteCount += chunk.data.length;
		if (this.byteCount > this.maxBlobBytes || this.chunks.size >= this.maxChunks) {
			this.abort();
			throw new Error("Mower map transfer exceeds limits");
		}
		this.chunks.set(chunk.sequenceId, { ...chunk, data: Buffer.from(chunk.data) });
		if (this.finalSequence === undefined || this.chunks.size !== this.finalSequence) return undefined;
		for (let id = 1; id <= this.finalSequence; id++) if (!this.chunks.has(id)) return undefined;
		let result: Buffer;
		try {
			result = this.assemble();
		} catch (error) {
			this.abort();
			throw error;
		}
		this.finished = true;
		this.chunks.clear();
		return result;
	}

	public abort(): void {
		this.aborted = true;
		this.chunks.clear();
	}

	private assemble(): Buffer {
		const first = this.chunks.get(1)?.data;
		if (!first || first.length < 12) throw new Error("Invalid mower map first chunk");
		const version = first.subarray(0, 8).toString("ascii") === "ROBOROCK" ? 2 : first[15];
		const headerLength = version === 2 ? 12 : 24;
		if ((version !== 0 && version !== 1 && version !== 2) || first.length < headerLength) throw new Error("Unsupported mower map transfer header");
		if (version !== 2 && first.subarray(0, 8).toString("ascii") !== this.endpoint) throw new Error("Wrong mower map transfer endpoint");
		const idOffset = version === 2 ? 8 : 16;
		if (first.readInt32LE(idOffset) !== this.expectedCorrelationId) throw new Error("Wrong mower map transfer correlation ID");
		// The manufacturer's v2 path retains its ROBOROCK header; v0/1 remove 24 bytes.
		const parts = [Buffer.from([version]), version === 2 ? first : first.subarray(24)];
		for (let id = 2; id <= this.finalSequence!; id++) parts.push(this.chunks.get(id)!.data);
		return Buffer.concat(parts);
	}
}
