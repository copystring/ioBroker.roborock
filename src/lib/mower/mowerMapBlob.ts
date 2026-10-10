import { createDecipheriv } from "node:crypto";
import { gunzipSync } from "node:zlib";

const DEFAULT_MAX_MAP_BYTES = 16 * 1024 * 1024;

/**
 * Decodes the version-prefixed payload assembled by the manufacturer's blob callback.
 * Chunk ordering, transfer headers and key derivation belong to the transport layer.
 */
export function decodeMowerMapBlob(blob: Buffer, key?: Buffer, maxDecodedBytes = DEFAULT_MAX_MAP_BYTES): Buffer {
	if (!Number.isSafeInteger(maxDecodedBytes) || maxDecodedBytes <= 0) throw new Error("Invalid mower map size limit");
	if (blob.length < 2) throw new Error("Empty mower map blob");
	// Bound ciphertext and compressed input before allocating a decrypted copy.
	if (blob.length > maxDecodedBytes * 2 + 1024) throw new Error("Mower map blob exceeds size limit");
	const version = blob[0];
	const content = blob.subarray(1);
	if (version === 2) {
		if (content.length > maxDecodedBytes) throw new Error("Mower map exceeds size limit");
		return Buffer.from(content);
	}
	if (version === 0) return gunzipMap(content, maxDecodedBytes);
	if (version !== 1) throw new Error(`Unsupported mower map blob version ${version}`);
	if (!key || ![16, 24, 32].includes(key.length)) throw new Error("Mower map blob requires an explicit AES key");
	if (content.length === 0 || content.length % 16 !== 0) throw new Error("Invalid encrypted mower map blob");
	const decipher = createDecipheriv(`aes-${key.length * 8}-cbc`, key, Buffer.alloc(16));
	const compressed = Buffer.concat([decipher.update(content), decipher.final()]);
	return gunzipMap(compressed, maxDecodedBytes);
}

function gunzipMap(data: Buffer, maxDecodedBytes: number): Buffer {
	try {
		return gunzipSync(data, { maxOutputLength: maxDecodedBytes });
	} catch (error) {
		if (error instanceof Error && (error as NodeJS.ErrnoException).code === "ERR_BUFFER_TOO_LARGE") {
			throw new Error("Mower map exceeds size limit", { cause: error });
		}
		throw error;
	}
}
