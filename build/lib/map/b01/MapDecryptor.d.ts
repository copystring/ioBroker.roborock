export declare class MapDecryptor {
    /**
     * Decrypts B01 Map Buffer using the full verified pipeline (Layer 1 CBC -> L2 Base64 -> L3 ECB -> L4 HexBin -> L5 Decompress).
     * Returns the raw Protobuf buffer if successful, or null/original if failed.
     */
    static decrypt(buf: Buffer, serial: string, model: string, _duid: string, adapter?: any, localKey?: string): Buffer | null;
    private static deriveMapKey;
    private static decryptECB;
    private static decryptCBC;
    static isSignatureMatch(buf: Buffer): boolean;
    static isLikelyProtobuf(buf: Buffer): boolean;
    private static isPlaintext;
    private static logDebug;
}
