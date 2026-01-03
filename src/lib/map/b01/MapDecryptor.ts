import * as crypto from "crypto";
import * as MapHelper from "../MapHelper";
import { cryptoEngine } from "../../cryptoEngine";

export class MapDecryptor {

	/**
     * Decrypts B01 Map Buffer using the full verified pipeline (Layer 1 CBC -> L2 Base64 -> L3 ECB -> L4 HexBin -> L5 Decompress).
     * Returns the raw Protobuf buffer if successful, or null/original if failed.
     */
	static decrypt(buf: Buffer, serial: string, model: string, _duid: string, adapter?: any, localKey?: string): Buffer | null {
		MapDecryptor.logDebug(adapter, `Decrypting Block. Serial: ${serial}, Model: ${model}, Len: ${buf.length}`);

		if (MapDecryptor.isLikelyProtobuf(buf)) {
			MapDecryptor.logDebug(adapter, "Input appears to be already decrypted (Protobuf). Returning as-is.");
			return buf;
		}

		let current = buf;

		// 1. Layer 1: Outer Roborock Wrapper (B01Header + CBC)
		if (current.length > 19 && current.toString("ascii", 0, 3) === "B01") {
			try {
				const ivSeed = current.readUInt32BE(7);
				const payloadLen = current.readUInt16BE(17);
				const payload = current.subarray(19, 19 + payloadLen);

				if (localKey) {
					const derivedIV = cryptoEngine.deriveB01IV(ivSeed);
					const decryptedCBC = MapDecryptor.decryptCBC(payload, localKey, derivedIV);
					if (decryptedCBC) {
						current = decryptedCBC;
						MapDecryptor.logDebug(adapter, `Layer 1 Decrypted (CBC). Len=${current.length}. Header: ${current.subarray(0, 16).toString("hex")}`);
					}
				} else {
					MapDecryptor.logDebug(adapter, "Layer 1 detected but no LocalKey provided. Skipping CBC.");
				}
			} catch (e: any) {
				MapDecryptor.logDebug(adapter, `Layer 1 Decryption failed: ${e.message}`, "warn");
			}
		}

		// 2. Layer 2: Intermediate Base64 Wrap
		try {
			// Check if buffer contains only safe Base64 ASCII characters
			// We check the first 1000 characters to be reasonably sure, or the whole buffer if small.
			const checkLen = Math.min(current.length, 4096);
			let isBase64 = true;
			for (let i = 0; i < checkLen; i++) {
				const byte = current[i];
				// A-Z, a-z, 0-9, +, /, =, whitespace
				if (
					(byte >= 65 && byte <= 90) || // A-Z
					(byte >= 97 && byte <= 122) || // a-z
					(byte >= 48 && byte <= 57) || // 0-9
					byte === 43 || byte === 47 || byte === 61 || // + / =
					byte === 10 || byte === 13 || byte === 32 // \n \r space
				) {
					continue;
				}
				isBase64 = false;
				break;
			}

			if (isBase64 && current.length > 0) {
				const asStr = current.toString("utf8");
				const decoded = Buffer.from(asStr, "base64");
				// Verify it actually decoded to something different
				if (decoded.length > 0 && decoded.length !== current.length) {
					current = decoded;
					MapDecryptor.logDebug(adapter, `Layer 2: Base64 decoding applied. New Len=${current.length}. Header: ${current.subarray(0, 8).toString("hex")}`);
				}
			}
		} catch (e: any) {
			MapDecryptor.logDebug(adapter, `Layer 2 Base64 check failed: ${e.message}`, "warn");
		}

		// 3. Layer 3: Inner Cipher (ECB) with MapKey
		if (serial && model) {
			try {
				// Safety: ECB requires 16-byte alignment
				if (current.length % 16 === 0) {
					const mapKey = MapDecryptor.deriveMapKey(serial, model);
					const innerDecrypted = MapDecryptor.decryptECB(current, mapKey);
					if (innerDecrypted && innerDecrypted.length > 0) {
						current = innerDecrypted;
						MapDecryptor.logDebug(adapter, `Layer 3 Decrypted (ECB). Len=${current.length}. Header: ${current.subarray(0, 16).toString("hex")}`);
					}
				} else {
					// It's not 16-byte aligned
					MapDecryptor.logDebug(adapter, `Skipping Layer 3 ECB: Data length ${current.length} is not a multiple of 16. Header: ${current.subarray(0, 8).toString("hex")}...`, "warn");
				}
			} catch (e: any) {
				MapDecryptor.logDebug(adapter, `Layer 3 Decryption failed: ${e.message}`, "warn");
			}
		} else {
			MapDecryptor.logDebug(adapter, "Missing Serial or Model, skipping Layer 3 ECB.", "warn");
		}

		// 4. Layer 4: Hex-in-ASCII conversion
		const checkStr = current.subarray(0, 10).toString("utf8");
		if (/^[0-9a-fA-F]+$/.test(checkStr) && checkStr.startsWith("78")) {
			try {
				const hexDecoded = Buffer.from(current.toString("utf8"), "hex");
				if (hexDecoded.length > 0) {
					current = hexDecoded;
					MapDecryptor.logDebug(adapter, `Layer 4 Hex->Bin conversion applied.`);
				}
			} catch {}
		}

		// 5. Layer 5: Decompression (GZIP/ZLIB)
		const decompressed = MapHelper.decompress(current);
		if (decompressed === current && !MapDecryptor.isSignatureMatch(decompressed)) {
			MapDecryptor.logDebug(adapter, `Decompression skipped/failed. No known signature (Gzip/Zlib/Protobuf) found. Header: ${current.subarray(0, 8).toString("hex")}`, "warn");
		}
		current = decompressed;

		// Verification
		if (MapDecryptor.isPlaintext(current)) {
			return current;
		}

		return current;
	}

	private static deriveMapKey(serial: string, model: string): Buffer {
		const modelSuffix = model.includes(".") ? (model.split(".").pop() as string) : model;

		// Standard key derivation
		// let p=x; while(p.length<16)p+="0";
		let p = modelSuffix;
		while (p.length < 16) p += "0";
		const key = Buffer.from(p.substring(0, 16), "utf8");

		const inputStr = `${serial}+${modelSuffix}+${serial}`;
		const inputBuf = Buffer.from(inputStr, "utf8");

		// Apply PKCS7 padding
		// const z=16-(Buffer.byteLength(t)%16),e=Buffer.concat([c.update(Buffer.concat([Buffer.from(t),Buffer.alloc(z,z)])),c.final()]);
		const z = 16 - (inputBuf.length % 16);
		const paddedInput = Buffer.concat([inputBuf, Buffer.alloc(z, z)]);

		const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
		cipher.setAutoPadding(false);

		let encrypted = cipher.update(paddedInput);
		encrypted = Buffer.concat([encrypted, cipher.final()]);

		const hash = crypto.createHash("md5").update(encrypted.toString("base64")).digest("hex");
		return Buffer.from(hash.substring(8, 24).toLowerCase(), "utf8");
	}

	private static decryptECB(encrypted: Buffer, key: Buffer): Buffer {
		// Log key and input start
		const decipher = crypto.createDecipheriv("aes-128-ecb", key, null);
		decipher.setAutoPadding(true);
		const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
		return result;
	}

	private static decryptCBC(encrypted: Buffer, key: string | Buffer, iv: Buffer): Buffer | null {
		try {
			const keyBuf = typeof key === "string" ? Buffer.from(key, "utf8") : key;
			const decipher = crypto.createDecipheriv("aes-128-cbc", keyBuf, iv);
			decipher.setAutoPadding(true);
			return Buffer.concat([decipher.update(encrypted), decipher.final()]);
		} catch {
			return null;
		}
	}

	public static isSignatureMatch(buf: Buffer): boolean {
		return MapHelper.isSignatureMatch(buf);
	}

	public static isLikelyProtobuf(buf: Buffer): boolean {
		return MapHelper.isLikelyProtobuf(buf);
	}

	private static isPlaintext(buf: Buffer): boolean {
		return this.isSignatureMatch(buf);
	}

	private static logDebug(adapter: any, msg: string, level: "debug" | "warn" | "error" = "debug"): void {
		if (adapter) {
			if (typeof adapter.rLog === "function") {
				adapter.rLog("System", null, level === "warn" ? "Warn" : level === "error" ? "Error" : "Debug", "B01Decrypt", undefined, msg, level);
			} else if (adapter.log) {
				if (level === "warn") adapter.log.warn(`[B01Decrypt] ${msg}`);
				else if (level === "error") adapter.log.error(`[B01Decrypt] ${msg}`);
				else adapter.log.debug(`[B01Decrypt] ${msg}`);
			}
		}
	}
}
