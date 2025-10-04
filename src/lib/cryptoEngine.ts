import crypto from "crypto";
import forge from "node-forge";

// Salt from librrcodec.so (encrypted via com.roborock.iotsdk.appsecret)
const SALT = "TXdfu$jyZ#TZHsg4";

// Lazy RSA keypair for e.g. get_photo
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

// credits to rovo89 for the following code. Especially for version A01!
// credits to Kenny from discord from the Homey project for the L01 implementation!
export const cryptoEngine = {
	/**
	 * Generate RSA keypair only when needed.
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
		return Buffer.concat([cipher.update(toBuffer(payload)), cipher.final()]);
	},

	decryptV1(payload: Buffer, localKey: string, ts: number): Buffer {
		const key = md5bin(encodeTimestamp(ts) + localKey + SALT);
		const decipher = crypto.createDecipheriv("aes-128-ecb", key, null);
		return Buffer.concat([decipher.update(payload), decipher.final()]);
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
		const padded = Buffer.concat([buf, Buffer.alloc(pad, pad)]);

		const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
		return Buffer.concat([cipher.update(padded), cipher.final()]);
	},

	decryptA01(payload: Buffer, localKey: string, random: number): Buffer {
		const randomHex = (random >>> 0).toString(16).padStart(8, "0");
		const ivHex = md5hex(randomHex + "726f626f726f636b2d67a6d6da").substring(8, 24);

		const key = Buffer.from(localKey, "utf-8");
		const iv = Buffer.from(ivHex, "utf-8");

		const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
		return Buffer.concat([decipher.update(payload), decipher.final()]);
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
		const ciphertext = Buffer.concat([cipher.update(buf), cipher.final()]);
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
		digestInput.writeUInt32BE(seq >>> 0);
		digestInput.writeUInt32BE(ackNonce >>> 0, 4);
		digestInput.writeUInt32BE(ts >>> 0, 8);
		const iv = crypto.createHash("sha256").update(digestInput).digest().subarray(0, 12);

		const aad = Buffer.alloc(20);
		aad.writeUInt32BE(seq >>> 0);
		aad.writeUInt32BE(connectNonce >>> 0, 4);
		aad.writeUInt32BE(ackNonce >>> 0, 8);
		aad.writeUInt32BE(ackNonce >>> 0, 12);
		aad.writeUInt32BE(ts >>> 0, 16);

		const tag = payload.subarray(payload.length - 16);
		const ciphertext = payload.subarray(0, payload.length - 16);

		const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
		decipher.setAAD(aad);
		decipher.setAuthTag(tag);

		return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
	},
};
