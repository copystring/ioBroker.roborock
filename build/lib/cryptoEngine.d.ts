/**
 * Cryptographic engine compatible with various Roborock protocol versions.
 * Supports legacy 1.0, A01 (AES-CBC), L01 (AES-GCM), and B01 modes.
 */
export declare const cryptoEngine: {
    /**
     * Generates an RSA keypair if one does not already exist.
     */
    ensureRsaKeys(): {
        public: {
            n: string;
            e: string;
        };
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
    };
    encryptV1(payload: Buffer | string, localKey: string, ts: number): Buffer;
    decryptV1(payload: Buffer, localKey: string, ts: number): Buffer;
    encryptA01(payload: Buffer | string, localKey: string, random: number): Buffer;
    decryptA01(payload: Buffer, localKey: string, random: number): Buffer;
    encryptL01(payload: Buffer | string, localKey: string, ts: number, seq: number, random: number, connectNonce: number, ackNonce?: number): Buffer;
    decryptL01(payload: Buffer, localKey: string, ts: number, seq: number, random: number, connectNonce: number, ackNonce?: number): Buffer;
    /**
     * Encrypts a payload for the B01 protocol using AES-128-CBC.
     * The IV is derived from the random seed and a static salt.
     */
    encryptB01(payload: Buffer | string, localKey: string, ivInput: number): Buffer;
    /**
     * Decrypts a B01 payload.
     */
    decryptB01(payload: Buffer, localKey: string, ivInput: number): Buffer;
    /**
     * Derives the initial vector (IV) specifically for B01 protocol encryption.
     * Computes MD5(hex(random) + salt) and extracts the middle 16 bytes.
     * Salt source: librrcodec.so (hardcoded)
     */
    deriveB01IV(ivInput: number): Buffer;
    encryptPassword(password: string, k: string): string;
};
