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
	 */
	ensureRsaKeys() {
		if (rsaKeys) return rsaKeys;
		const kp = forge.pki.rsa.generateKeyPair(2048);
		rsaKeys = {
			public: {
				n: kp.publicKey.n.toString(16),
				e: kp.publicKey.e.toString(16),
			},
			private: {
				n: kp.privateKey.n.toString(16),
				e: kp.privateKey.e.toString(16),
				d: kp.privateKey.d.toString(16),
				p: kp.privateKey.p.toString(16),
				q: kp.privateKey.q.toString(16),
				dmp1: kp.privateKey.dP.toString(16),
				dmq1: kp.privateKey.dQ.toString(16),
				coeff: kp.privateKey.qInv.toString(16),
			},
		};
		return rsaKeys;
	},

	// ---------- V1 (AES-128-ECB) ----------

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
		// 1. Convert random number to 4-byte Big Endian Buffer
		const prefix = Buffer.alloc(4);
		prefix.writeUInt32BE(ivInput);

		// 2. Append the B01 salt (Confirmed via test_salt.js: 5wwh... is correct with Raw derivation)
		const suffix = Buffer.from("5wwh9ikChRjASpMU8cxg7o1d2E", "utf8");

		// 3. MD5 hash (Raw buffer -> 16 bytes)
		const hash = crypto.createHash("md5").update(Buffer.concat([prefix, suffix])).digest();
		return hash;
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
};
