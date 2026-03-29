import * as crypto from "node:crypto";
import { cryptoEngine } from "../../cryptoEngine";
import * as MapHelper from "../MapHelper";

export class MapDecryptor {
	/**
	 * @doc:Encryption.md
	 * ### B01 Map Decryption
	 *
	 * B01 map decryption. Follows the spec derived from the test fixture and docs; the original app
	 * (see .cursorrules) handles 301 in o00O00OO.OooO0O0 → o00OO000.OooO00o.OooOooo / OooOooO, but the
	 * exact layer implementation is not visible in the decompiled APK.
	 *
	 * Data flow: MQTT frame → messageParser.decodeMsg() reads
	 * payloadLen (uint16 at offset 16), takes payload = frame.subarray(19, 19+payloadLen), then
	 * decryptB01(payload, localKey, random) → data.payload. For 301 that buffer is passed to
	 * getB01MapBuffer → decryptB01Payload → this decrypt(). So buf here is the inner payload after
	 * outer B01 CBC only; no 301-specific header is stripped (unlike PhotoManager P301 dataSkip).
	 * If buf starts with "B01", unwrapLayerCBC slices inner payload using payloadLen at buf[17..18].
	 *
	 * @see docs/map/B01_Map_Protocol.md
	 * @see test/unit/b01_map_specification.test.ts
	 */
	static decrypt(buf: Buffer, serial: string, model: string, _duid: string, _adapter?: any, localKey?: string): Buffer | null {
		if (MapDecryptor.isLikelyProtobuf(buf)) return buf;

		let current = buf;

		// 1. Layer 1: Protocol Wrapper (B01 AES-CBC); payload size from header (offset 17)
		current = MapDecryptor.unwrapLayerCBC(current, localKey);

		// 2. Layer 2: Transport Decoding (Base64)
		current = MapDecryptor.unwrapBase64(current);

		// 3. Layer 3: Map Data Encryption (AES-ECB)
		current = MapDecryptor.unwrapLayerECB(current, serial, model);

		// 4. Layer 4: Post-Cipher Transport Decoding (Hex-ASCII)
		current = MapDecryptor.unwrapHex(current);

		// 5. Layer 5: Decompression (ZLIB/GZIP)
		current = MapDecryptor.unwrapDecompression(current);

		const validB01Map = current && MapDecryptor.isB01MapProtobuf(current);
		return validB01Map ? current : null;
	}

	private static unwrapBase64(current: Buffer): Buffer {
		const checkStr = current.subarray(0, Math.min(current.length, 100)).toString("utf8");
		if (/^[A-Za-z0-9+/= \r\n]+$/.test(checkStr)) {
			try {
				const decoded = Buffer.from(current.toString("utf8"), "base64");
				if (decoded.length > 0 && decoded.length !== current.length) return decoded;
			} catch {}
		}
		return current;
	}

	private static unwrapHex(current: Buffer): Buffer {
		const checkStr = current.subarray(0, Math.min(current.length, 100)).toString("utf8");
		if (/^[0-9a-fA-F]+$/.test(checkStr.substring(0, 10)) && (checkStr.startsWith("78") || checkStr.startsWith("1f"))) {
			try {
				const decoded = Buffer.from(current.toString("utf8"), "hex");
				if (decoded.length > 0 && decoded.length !== current.length) return decoded;
			} catch {}
		}
		return current;
	}

	private static unwrapLayerCBC(current: Buffer, localKey: string | undefined): Buffer {
		if (current.length > 19 && current.toString("ascii", 0, 3) === "B01") {
			try {
				const ivSeed = current.readUInt32BE(7);
				const payloadLen = current.readUInt16BE(17);
				const payload = current.subarray(19, 19 + payloadLen);

				if (localKey) {
					const derivedIV = cryptoEngine.deriveB01IV(ivSeed);
					const decrypted = MapDecryptor.decryptCBC(payload, localKey, derivedIV);
					if (decrypted) return decrypted;
				}
			} catch (e: any) {
				MapDecryptor.logDebug(undefined, `Layer 1: CBC Decryption failed: ${e.message}`, "warn");
			}
		}
		return current;
	}

	private static unwrapLayerECB(current: Buffer, serial: string, model: string): Buffer {
		if (!serial || !model || current.length % 16 !== 0) return current;
		try {
			const mapKey = MapDecryptor.deriveMapKey(serial, model);
			const decrypted = MapDecryptor.decryptECB(current, mapKey);
			// After ECB: zlib (0x78) or gzip (0x1f), or hex-ASCII "78"/"1f" (0x37 0x38 / 0x31 0x66)
			if (decrypted && decrypted.length > 0 && (decrypted[0] === 0x78 || decrypted[0] === 0x1f || (decrypted[0] === 0x37 && decrypted[1] === 0x38) || (decrypted[0] === 0x31 && decrypted[1] === 0x66))) return decrypted;
		} catch (e: any) {
			MapDecryptor.logDebug(undefined, `Layer 3: ECB failed: ${e.message}`, "warn");
		}
		return current;
	}

	private static unwrapDecompression(current: Buffer): Buffer {
		return MapHelper.decompress(current);
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
		const decipher = crypto.createDecipheriv("aes-128-ecb", key, null);
		decipher.setAutoPadding(true);
		return Buffer.concat([decipher.update(encrypted), decipher.final()]);
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

	/** True if decrypted payload is a B01 history/cleaning map (08 15 12...), not live (08 00 12...). */
	public static isHistoryMap(buf: Buffer): boolean {
		return buf != null && buf.length >= 3 && buf[0] === 0x08 && buf[1] === 0x15 && buf[2] === 0x12;
	}

	/** True only if buf is a B01 map protobuf: 08 00 12 (live) or 08 15 12 (history). Rejects other protobufs (e.g. 0a ...). */
	public static isB01MapProtobuf(buf: Buffer): boolean {
		return buf != null && buf.length >= 3 && buf[0] === 0x08 && buf[2] === 0x12 && (buf[1] === 0x00 || buf[1] === 0x15);
	}

	/**
	 * Runs Layers 2–5 (Base64 → ECB → Hex → Decompress) on a buffer that is already
	 * the concatenated output of Layer 1 (e.g. from multiple B01 chunks decrypted separately).
	 * Use for chunked B01 streams where each chunk has its own B01 header and IV.
	 */
	static decryptFromLayer2(
		layer1Concatenated: Buffer,
		serial: string,
		model: string,
		_duid: string,
		_adapter?: any,
		_localKey?: string
	): Buffer | null {
		void _duid;
		void _adapter;
		void _localKey;
		if (MapDecryptor.isLikelyProtobuf(layer1Concatenated)) return layer1Concatenated;
		let current = layer1Concatenated;
		current = MapDecryptor.unwrapBase64(current);
		current = MapDecryptor.unwrapLayerECB(current, serial, model);
		current = MapDecryptor.unwrapHex(current);
		current = MapDecryptor.unwrapDecompression(current);
		return current && MapDecryptor.isB01MapProtobuf(current) ? current : null;
	}

	/** Decrypts only Layer 1 (B01 AES-CBC wrapper). Returns inner payload (e.g. base64 or binary). */
	static decryptLayer1Only(buf: Buffer, localKey: string | undefined): Buffer | null {
		if (buf.length <= 19 || buf.toString("ascii", 0, 3) !== "B01") return null;
		try {
			const payloadLen = buf.readUInt16BE(17);
			if (19 + payloadLen > buf.length) return null;
			const payload = buf.subarray(19, 19 + payloadLen);
			if (!localKey) return null;
			const ivSeed = buf.readUInt32BE(7);
			const derivedIV = cryptoEngine.deriveB01IV(ivSeed);
			const decrypted = MapDecryptor.decryptCBC(payload, localKey, derivedIV);
			return decrypted;
		} catch {
			return null;
		}
	}

	private static logDebug(adapter: any, msg: string, level: "debug" | "warn" | "error" = "debug"): void {
		if (adapter && (level === "warn" || level === "error")) {
			if (typeof adapter.rLog === "function") {
				adapter.rLog("System", null, level === "warn" ? "Warn" : "Error", "B01Decrypt", undefined, msg, level);
			} else if (adapter.log) {
				if (level === "warn") adapter.log.warn(`B01Decrypt: ${msg}`);
				else adapter.log.error(`B01Decrypt: ${msg}`);
			}
		}
	}
}
