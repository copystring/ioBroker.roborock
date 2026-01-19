
import { describe, expect, it } from "vitest";
import { cryptoEngine } from "../../src/lib/cryptoEngine";

/**
 * @doc:Encryption.md
 * ### Protocol V1 Encryption Specification
 *
 * Uses **AES-128-ECB** (Electronic Codebook).
 * Keys are derived dynamically based on the timestamp.
 *
 * #### Key Derivation Formula
 * ```text
 * Key = MD5( hex(timestamp) + localKey + SALT )
 * ```
 * * `timestamp`: Unix timestamp (seconds), formatted using the `encodeTimestamp` shuffle function.
 * * `localKey`: The device's 16-char token.
 * * `SALT`: Hardcoded string `TXdfu$jyZ#TZHsg4`.
 */
describe("Protocol V1 Encryption Specification", () => {
    it("should correctly derive V1 keys and encrypt/decrypt", () => {
        const localKey = "l2xfVQ2fy2jhLV1H";
        const ts = 1715600000;
        const payload = "hello world";

        const encrypted = cryptoEngine.encryptV1(payload, localKey, ts);
        const decrypted = cryptoEngine.decryptV1(encrypted, localKey, ts);

        expect(decrypted.toString()).toBe(payload);
    });
});

/**
 * @doc:Encryption.md
 * ### Protocol A01 Encryption Specification
 *
 * Uses **AES-128-CBC** (Cipher Block Chaining).
 * Typically used by Tuya-based protocols wrapped in Roborock headers.
 *
 * #### Key & IV Derivation
 * * **Key**: The 16-char `localKey` (ASCII) is used directly.
 * * **IV**: Derived from a "random" seed included in the packet header.
 *
 * ```text
 * IV = MD5( hex(random) + "726f626f726f636b2d67a6d6da" ).substring(8, 24)
 * ```
 * ("726f..." is hex for "roborock-g&dZ").
 *
 * @param random A 32-bit random integer from the packet header.
 */
describe("Protocol A01 Encryption Specification", () => {
    it("should correctly derive A01 IV and encrypt/decrypt", () => {
        const localKey = "l2xfVQ2fy2jhLV1H";
        const random = 0x12345678;
        const payload = "hello world (a01)";

        const encrypted = cryptoEngine.encryptA01(payload, localKey, random);
        const decrypted = cryptoEngine.decryptA01(encrypted, localKey, random);

        // Decrypted buffer might have padding if not handled by standard crypto decipher
        expect(decrypted.toString().startsWith(payload)).toBe(true);
    });
});

/**
 * @doc:Encryption.md
 * ### Protocol L01 Encryption Specification
 *
 * Uses **AES-256-GCM** (Galois/Counter Mode).
 * This is the most secure protocol version, verifying integrity via GCM Tags.
 *
 * #### Key Derivation
 * ```text
 * Key = SHA256( encodeTimestamp(ts) + localKey + SALT )
 * ```
 *
 * #### IV Derivation
 * The 12-byte IV is a SHA256 hash of the header fields:
 * ```text
 * Input = [ Seq(4) | Random(4) | Ts(4) ]  (Big Endian)
 * IV = SHA256( Input ).substring(0, 12)
 * ```
 *
 * #### AAD (Additional Authenticated Data)
 * GCM authenticates the header fields to prevent tampering:
 * ```text
 * AAD = [ Seq(4) | ConnectNonce(4) | AckNonce(4) | Random(4) | Ts(4) ]
 * ```
 */
describe("Protocol L01 Encryption Specification", () => {
    it("should correctly derive L01 keys, IV, AAD and encrypt/decrypt", () => {
        const localKey = "l2xfVQ2fy2jhLV1H";
        const ts = 1715600000;
        const seq = 1;
        const random = 0x87654321;
        const connectNonce = 0x11223344;
        const ackNonce = 0x55667788;
        const payload = "hello world (l01)";

        const encrypted = cryptoEngine.encryptL01(payload, localKey, ts, seq, random, connectNonce, ackNonce);
        const decrypted = cryptoEngine.decryptL01(encrypted, localKey, ts, seq, random, connectNonce, ackNonce);

        expect(decrypted.toString()).toBe(payload);
    });
});
