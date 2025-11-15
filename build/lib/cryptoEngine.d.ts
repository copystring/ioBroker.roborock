export declare const cryptoEngine: {
    /**
     * Generate RSA keypair only when needed.
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
};
