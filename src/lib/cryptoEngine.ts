import * as crypto from "crypto";
import forge from "node-forge";

// Salt from librrcodec.so (encrypted via com.roborock.iotsdk.appsecret)
const SALT = "TXdfu$jyZ#TZHsg4";

// Lazy RSA keypair generation
let rsaKeys: {
	public: { n: string; e: string };
	private: {
		n: string;
		e: string;
		d: string;
		p: string;
		q: string;
		dmp1: string;
		dmq1: string;
		coeff: string;
	};
} | null = null;

function encodeTimestamp(ts: number): string {
	const hex = ts.toString(16).padStart(8, "0").split("");
	return [5, 6, 3, 7, 1, 2, 0, 4].map((idx) => hex[idx]).join("");
}

function md5bin(str: string): Buffer {
	return crypto.createHash("md5").update(str).digest();
}

function md5hex(str: string): string {
	return crypto.createHash("md5").update(str).digest("hex");
}

function toBuffer(input: string | Buffer): Buffer {
	return Buffer.isBuffer(input) ? input : Buffer.from(input, "utf-8");
}

/**
 * Cryptographic engine compatible with various Roborock protocol versions.
 * Supports legacy 1.0, A01 (AES-CBC), L01 (AES-GCM), and B01 modes.
 */
export const cryptoEngine = {
	/**
	 * Generates an RSA keypair if one does not already exist.
	 * 1024 bits are required for the Roborock photo protocol to fit the 128-byte block.
	 */
	ensureRsaKeys() {
		if (rsaKeys) return rsaKeys;
		// Standard 1024-bit key generation as per original code
		const kp = forge.pki.rsa.generateKeyPair(1024);

		const padHex = (hex: string): string => (hex.length % 2 === 1 ? "0" + hex : hex);

		rsaKeys = {
			public: {
				n: padHex(kp.publicKey.n.toString(16)),
				e: kp.publicKey.e.toString(16),
			},
			private: {
				n: padHex(kp.privateKey.n.toString(16)),
				e: kp.privateKey.e.toString(16),
				d: padHex(kp.privateKey.d.toString(16)),
				p: padHex(kp.privateKey.p.toString(16)),
				q: padHex(kp.privateKey.q.toString(16)),
				dmp1: padHex(kp.privateKey.dP.toString(16)),
				dmq1: padHex(kp.privateKey.dQ.toString(16)),
				coeff: padHex(kp.privateKey.qInv.toString(16)),
			},
		};
		return rsaKeys;
	},

	/**
	 * Decrypts data using RSA private key (PKCS#1 v1.5 padding).
	 */
	decryptRSA(ciphertext: Buffer): Buffer {
		const keys = this.ensureRsaKeys();
		const privateKey = forge.pki.setRsaPrivateKey(
			new forge.jsbn.BigInteger(keys.private.n, 16),
			new forge.jsbn.BigInteger(keys.private.e, 16),
			new forge.jsbn.BigInteger(keys.private.d, 16),
			new forge.jsbn.BigInteger(keys.private.p, 16),
			new forge.jsbn.BigInteger(keys.private.q, 16),
			new forge.jsbn.BigInteger(keys.private.dmp1, 16),
			new forge.jsbn.BigInteger(keys.private.dmq1, 16),
			new forge.jsbn.BigInteger(keys.private.coeff, 16)
		);

		let decryptedRawStr: string | null = null;

		try {
			// Use 'RAW' to bypass node-forge's strict checks and debug the actual decrypted content
			decryptedRawStr = privateKey.decrypt(ciphertext.toString("binary"), "RAW");
			const buf = Buffer.from(decryptedRawStr, "binary");

			// Manual PKCS#1 v1.5 Unpadding (Block Type 2)
			// Expected: 00 02 [padding...] 00 [data]

			let offset = 0;
			// Strict check for 128 bytes (1024 bits)
			if (buf.length === 128) {
				if (buf[0] === 0x00 && buf[1] === 0x02) {
					offset = 2;
				} else if (buf[0] === 0x02) {
					// Tolerate missing leading zero if library stripped it (treating as number)
					offset = 1;
				} else {
					throw new Error(`Invalid PKCS#1 header. Bytes: ${buf.subarray(0, 4).toString("hex")}`);
				}
			} else if (buf.length === 127 && buf[0] === 0x02) {
				// Tolerate missing leading zero
				offset = 1;
			} else {
				throw new Error(`Unexpected block length: ${buf.length}`);
			}

			// Scan for 0x00 separator
			let separatorIndex = -1;
			for (let i = offset; i < buf.length; i++) {
				if (buf[i] === 0x00) {
					separatorIndex = i;
					break;
				}
			}

			if (separatorIndex === -1) {
				throw new Error("Invalid PKCS#1 padding: No separator 0x00 found");
			}

			// Data is after the separator
			return buf.subarray(separatorIndex + 1);
		} catch (e: any) {
			throw new Error(`RSA Decrypt failed: ${e.message}`);
		}
	},

	/**
	 * Decrypts data using AES-128-CBC without auto-padding (manual unpadding or structured data).
	 */
	decryptAES_CBC(ciphertext: Buffer, key: Buffer, iv: Buffer): Buffer {
		const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
		decipher.setAutoPadding(true);
		return Buffer.concat([decipher.update(ciphertext as Uint8Array), decipher.final()]);
	},

	// ---------- V1 (AES-128-ECB) ----------

	/**
	 * Encrypts a payload using Protocol V1 (AES-128-ECB).
	 * @see test/unit/crypto_specification.test.ts for the technical specification.
	 */
	encryptV1(payload: Buffer | string, localKey: string, ts: number): Buffer {
		const key = md5bin(encodeTimestamp(ts) + localKey + SALT);
		const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
		return Buffer.concat([cipher.update(toBuffer(payload) as Uint8Array), cipher.final()]);
	},

	decryptV1(payload: Buffer, localKey: string, ts: number): Buffer {
		const key = md5bin(encodeTimestamp(ts) + localKey + SALT);
		const decipher = crypto.createDecipheriv("aes-128-ecb", key, null);
		return Buffer.concat([decipher.update(payload as Uint8Array), decipher.final()]);
	},

	// ---------- A01 (AES-128-CBC) ----------

	/**
	 * Encrypts a payload using Protocol A01 (AES-128-CBC).
	 * @see test/unit/crypto_specification.test.ts for the technical specification.
	 * @param random A 32-bit random integer from the packet header.
	 */
	encryptA01(payload: Buffer | string, localKey: string, random: number): Buffer {
		const randomHex = (random >>> 0).toString(16).padStart(8, "0");
		const ivHex = md5hex(randomHex + "726f626f726f636b2d67a6d6da").substring(8, 24);

		const key = Buffer.from(localKey, "utf-8");
		const iv = Buffer.from(ivHex, "utf-8");
		const buf = toBuffer(payload);

		// PKCS7 Padding
		const pad = 16 - (buf.length % 16);
		const padded = Buffer.concat([buf, Buffer.alloc(pad, pad)] as Uint8Array[]);

		const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
		return Buffer.concat([cipher.update(padded as Uint8Array), cipher.final()]);
	},

	decryptA01(payload: Buffer, localKey: string, random: number): Buffer {
		const randomHex = (random >>> 0).toString(16).padStart(8, "0");
		const ivHex = md5hex(randomHex + "726f626f726f636b2d67a6d6da").substring(8, 24);

		const key = Buffer.from(localKey, "utf-8");
		const iv = Buffer.from(ivHex, "utf-8");

		const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
		return Buffer.concat([decipher.update(payload as Uint8Array), decipher.final()]);
	},

	// ---------- L01 (AES-256-GCM) ----------

	/**
	 * Encrypts a payload using Protocol L01 (AES-256-GCM).
	 * @see test/unit/crypto_specification.test.ts for the technical specification.
	 */
	encryptL01(payload: Buffer | string, localKey: string, ts: number, seq: number, random: number, connectNonce: number, ackNonce?: number): Buffer {
		if (!connectNonce || ackNonce == null) throw new Error("Missing nonces for L01");

		const key = crypto
			.createHash("sha256")
			.update(encodeTimestamp(ts) + localKey + SALT)
			.digest();

		const digestInput = Buffer.alloc(12);
		digestInput.writeUInt32BE(seq >>> 0, 0);
		digestInput.writeUInt32BE(random >>> 0, 4);
		digestInput.writeUInt32BE(ts >>> 0, 8);
		const iv = crypto.createHash("sha256").update(digestInput).digest().subarray(0, 12);

		const aad = Buffer.alloc(20);
		aad.writeUInt32BE(seq >>> 0, 0);
		aad.writeUInt32BE(connectNonce >>> 0, 4);
		aad.writeUInt32BE(ackNonce >>> 0, 8);
		aad.writeUInt32BE(random >>> 0, 12);
		aad.writeUInt32BE(ts >>> 0, 16);

		const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
		cipher.setAAD(aad);

		const buf = toBuffer(payload);
		const ciphertext = Buffer.concat([cipher.update(buf as Uint8Array), cipher.final()]);
		const tag = cipher.getAuthTag();

		return Buffer.concat([ciphertext, tag]);
	},

	decryptL01(payload: Buffer, localKey: string, ts: number, seq: number, random: number, connectNonce: number, ackNonce?: number): Buffer {
		if (!connectNonce || ackNonce == null) throw new Error("Missing nonces for L01");

		const key = crypto
			.createHash("sha256")
			.update(encodeTimestamp(ts) + localKey + SALT)
			.digest();

		const digestInput = Buffer.alloc(12);
		digestInput.writeUInt32BE(seq >>> 0, 0);
		digestInput.writeUInt32BE(random >>> 0, 4);
		digestInput.writeUInt32BE(ts >>> 0, 8);
		const iv = crypto.createHash("sha256").update(digestInput).digest().subarray(0, 12);

		const aad = Buffer.alloc(20);
		aad.writeUInt32BE(seq >>> 0, 0);
		aad.writeUInt32BE(connectNonce >>> 0, 4);
		aad.writeUInt32BE(ackNonce >>> 0, 8);
		aad.writeUInt32BE(random >>> 0, 12);
		aad.writeUInt32BE(ts >>> 0, 16);

		const tag = payload.subarray(payload.length - 16);
		const ciphertext = payload.subarray(0, payload.length - 16);

		const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
		decipher.setAAD(aad);
		decipher.setAuthTag(tag);

		return Buffer.concat([decipher.update(ciphertext as Uint8Array), decipher.final()]);
	},

	// ---------- B01 (AES-128-CBC with custom IV) ----------

	/**
	 * Encrypts a payload for the B01 protocol using AES-128-CBC.
	 * The IV is derived from the random seed and a static salt.
	 */
	encryptB01(payload: Buffer | string, localKey: string, ivInput: number): Buffer {
		const key = toBuffer(localKey);
		const iv = this.deriveB01IV(ivInput);

		const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
		cipher.setAutoPadding(true);

		const data = Buffer.isBuffer(payload) ? payload : Buffer.from(payload, "utf8");
		return Buffer.concat([cipher.update(data), cipher.final()]);
	},

	/**
	 * Decrypts a B01 payload.
	 */
	decryptB01(payload: Buffer, localKey: string, ivInput: number): Buffer {
		const key = toBuffer(localKey);
		const iv = this.deriveB01IV(ivInput);

		const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
		decipher.setAutoPadding(true);

		return Buffer.concat([decipher.update(payload as Uint8Array), decipher.final()]);
	},

	/**
	 * Derives the initial vector (IV) specifically for B01 protocol encryption.
	 * Computes MD5(hex(random) + salt) and extracts the middle 16 bytes.
	 * Salt source: librrcodec.so (hardcoded)
	 */
	deriveB01IV(ivInput: number): Buffer {
		const salt = "5wwh9ikChRjASpMU8cxg7o1d2E";
		const randomBuffer = Buffer.alloc(4);
		randomBuffer.writeUInt32BE(ivInput, 0); // Use Big-Endian per protocol specification

		const rStr = randomBuffer.toString("hex").toLowerCase();
		const hash = crypto.createHash("md5").update(rStr + salt).digest("hex");
		const ivStr = hash.substring(9, 25);
		return Buffer.from(ivStr, "utf8");
	},
	// ---------- Password Encryption (Login V4) ----------

	encryptPassword(password: string, k: string): string {
		const derivedKey = k.slice(4) + k.slice(0, 4);
		const cipher = crypto.createCipheriv("aes-128-ecb", Buffer.from(derivedKey, "utf-8"), null);
		cipher.setAutoPadding(true);
		let encrypted = cipher.update(password, "utf8", "base64");
		encrypted += cipher.final("base64");
		return encrypted;
	},

	/**
	 * Specialized for Roborock photos:
	 * 1. Brute-force searches for an RSA-encrypted block (128 bytes) within the payload.
	 * 2. Decrypts it to retrieve the AES Key and IV.
	 * 3. Decrypts the remaining payload using AES-128-CBC.
	 */
	decryptPhotoPayload(encryptedData: Buffer): Buffer {
		for (let offset = 0; offset < 256; offset++) {
			if (offset + 128 > encryptedData.length) break;

			try {
				const block = encryptedData.subarray(offset, offset + 128);
				let decryptedKeyBlock: Buffer | null = null;

				// 1. Try Standard Decryption
				try {
					decryptedKeyBlock = this.decryptRSA(block);
				} catch {
					// Silent fail during brute force
				}

				// 2. Try Reversed Decryption (Fallback for some models)
				if (!decryptedKeyBlock) {
					const reversedBlock = Buffer.from(block).reverse();
					try {
						decryptedKeyBlock = this.decryptRSA(reversedBlock);
					} catch {
						// Silent fail
					}
				}

				if (decryptedKeyBlock && decryptedKeyBlock.length >= 32) {
					const aesIv = decryptedKeyBlock.subarray(0, 16);
					const aesKey = decryptedKeyBlock.subarray(16, 48);
					const encryptedPayload = encryptedData.subarray(offset + 128);

					return this.decryptAES_CBC(encryptedPayload, aesKey, aesIv);
				}
			} catch {
				// Unexpected error in logic, skip offset
			}
		}

		throw new Error("RSA Search Failed: Could not find valid RSA block in photo payload.");
	},
};
