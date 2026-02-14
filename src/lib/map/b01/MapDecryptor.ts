import * as crypto from "crypto";
import { cryptoEngine } from "../../cryptoEngine";
import * as MapHelper from "../MapHelper";

export class MapDecryptor {
	/**
	 * @doc:Encryption.md
	 * ### B01 Map Decryption
	 *
	 * Decrypts a Roborock B01 map using a multi-layer "Russian Doll" unwrapping process.
	 *
	 * @see docs/map/B01_Map_Protocol.md for the full technical specification.
	 * @see test/unit/b01_map_specification.test.ts for the executable specification.
	 */
	static decrypt(buf: Buffer, serial: string, model: string, _duid: string, adapter?: any, localKey?: string): Buffer | null {
		MapDecryptor.logDebug(adapter, `Decrypting Block. Serial: ${serial}, Model: ${model}, Len: ${buf.length}`);

		if (MapDecryptor.isLikelyProtobuf(buf)) {
			MapDecryptor.logDebug(adapter, "Input appears to be already decrypted (Protobuf). Returning as-is.");
			return buf;
		}

		let current = buf;

		// 1. Layer 1: Protocol Wrapper (B01 AES-CBC)
		current = MapDecryptor.unwrapLayerCBC(current, localKey, adapter);

		// 2. Layer 2: Transport Decoding (Base64)
		current = MapDecryptor.unwrapBase64(current, adapter);

		// 3. Layer 3: Map Data Encryption (AES-ECB)
		current = MapDecryptor.unwrapLayerECB(current, serial, model, adapter);

		// 4. Layer 4: Post-Cipher Transport Decoding (Hex-ASCII)
		current = MapDecryptor.unwrapHex(current, adapter);

		// 5. Layer 5: Decompression (ZLIB/GZIP)
		current = MapDecryptor.unwrapDecompression(current, adapter);

		return current;
	}

	private static unwrapBase64(current: Buffer, adapter?: any): Buffer {
		const checkStr = current.subarray(0, Math.min(current.length, 100)).toString("utf8");
		if (/^[A-Za-z0-9+/= \r\n]+$/.test(checkStr)) {
			try {
				const decoded = Buffer.from(current.toString("utf8"), "base64");
				if (decoded.length > 0 && decoded.length !== current.length) {
					MapDecryptor.logDebug(adapter, "Layer 2: Base64-decoded applied.");
					return decoded;
				}
			} catch {}
		}
		return current;
	}

	private static unwrapHex(current: Buffer, adapter?: any): Buffer {
		const checkStr = current.subarray(0, Math.min(current.length, 100)).toString("utf8");
		if (/^[0-9a-fA-F]+$/.test(checkStr.substring(0, 10)) && (checkStr.startsWith("78") || checkStr.startsWith("1f"))) {
			try {
				const decoded = Buffer.from(current.toString("utf8"), "hex");
				if (decoded.length > 0 && decoded.length !== current.length) {
					MapDecryptor.logDebug(adapter, "Layer 4: Hex-decoded applied.");
					return decoded;
				}
			} catch {}
		}
		return current;
	}

	private static unwrapLayerCBC(current: Buffer, localKey: string | undefined, adapter?: any): Buffer {
		if (current.length > 19 && current.toString("ascii", 0, 3) === "B01") {
			try {
				const ivSeed = current.readUInt32BE(7);
				const payloadLen = current.readUInt16BE(17);
				const payload = current.subarray(19, 19 + payloadLen);

				if (localKey) {
					const derivedIV = cryptoEngine.deriveB01IV(ivSeed);
					const decrypted = MapDecryptor.decryptCBC(payload, localKey, derivedIV);
					if (decrypted) {
						MapDecryptor.logDebug(adapter, `Layer 1: CBC Decrypted. New Len=${decrypted.length}`);
						return decrypted;
					}
				}
			} catch (e: any) {
				MapDecryptor.logDebug(adapter, `Layer 1: CBC Decryption failed: ${e.message}`, "warn");
			}
		}
		return current;
	}

	private static unwrapLayerECB(current: Buffer, serial: string, model: string, adapter?: any): Buffer {
		if (serial && model && current.length % 16 === 0) {
			try {
				const mapKey = MapDecryptor.deriveMapKey(serial, model);
				const decrypted = MapDecryptor.decryptECB(current, mapKey);
				// Roborock specific signature check: ZLIB(0x78), GZIP(0x1f), or ASCII-Hex equivalents ("78", "1f")
				if (decrypted && decrypted.length > 0 && (decrypted[0] === 0x78 || decrypted[0] === 0x1f || (decrypted[0] === 0x37 && decrypted[1] === 0x38) || (decrypted[0] === 0x31 && decrypted[1] === 0x66))) {
					MapDecryptor.logDebug(adapter, `Layer 3: ECB Decrypted. New Len=${decrypted.length}`);
					return decrypted;
				}
			} catch (e: any) {
				MapDecryptor.logDebug(adapter, `Layer 3: ECB Decryption failed: ${e.message}`, "warn");
			}
		}
		return current;
	}

	private static unwrapDecompression(current: Buffer, adapter?: any): Buffer {
		const decompressed = MapHelper.decompress(current);
		if (decompressed !== current) {
			MapDecryptor.logDebug(adapter, `Layer 5: Decompressed SUCCESS. New Len=${decompressed.length}`);
		} else if (!MapDecryptor.isSignatureMatch(decompressed)) {
			MapDecryptor.logDebug(adapter, "Layer 5: Decompression skipped (no known signature found).", "warn");
		}
		return decompressed;
	}

	private static deriveMapKey(serial: string, model: string): Buffer {
		const modelSuffix = model.includes(".") ? (model.split(".").pop() as string) : model;

		// Standard key derivation

		let p = modelSuffix;
		while (p.length < 16) p += "0";
		const key = Buffer.from(p.substring(0, 16), "utf8");

		const inputStr = `${serial}+${modelSuffix}+${serial}`;
		const inputBuf = Buffer.from(inputStr, "utf8");

		// Apply PKCS7 padding

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
