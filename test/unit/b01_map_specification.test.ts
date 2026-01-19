
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { beforeAll, describe, expect, it } from "vitest";
import * as zlib from "zlib";
import { cryptoEngine } from "../../src/lib/cryptoEngine";
import { MapDecryptor } from "../../src/lib/map/b01/MapDecryptor";

/**
 * @doc:map/B01_Map_Protocol.md
 * ### Roborock B01 Map Protocol Specification
 *
 * This test suite serves as the official, living documentation for the Roborock B01 map protocol.
 * The protocol uses a multi-layer "Russian Doll" encryption scheme where the following layers
 * MUST be unwrapped in sequential order to reveal the Protobuf data.
 *
 * ### Decryption Chain:
 *
 * #### Layer 1: Protocol Wrapper (AES-128-CBC)
 * - **Algorithm**: AES-128-CBC.
 * - **Key**: The device's `localKey`.
 * - **Format**: `B01` (3 bytes) + `IV Seed` (4 bytes) + `Payload Length` (2 bytes) + `Payload`.
 * - **IV**: Derived from `IV Seed` using `cryptoEngine.deriveB01IV(seed)`.
 *
 * #### Layer 2: Transport Decoding (Base64)
 * - **Format**: The CBC-decrypted payload is delivered as a Base64 string.
 * - **Action**: Decode to binary using `Buffer.from(payload, 'base64')`.
 *
 * #### Layer 3: Map Data Encryption (AES-128-ECB)
 * - **Algorithm**: AES-128-ECB (No padding).
 * - **Key**: A special `MapKey` derived from the device's Serial Number and Model.
 *
 * #### Layer 4: Post-Cipher Transport Decoding (Hex-ASCII)
 * - **Format**: The ECB-decrypted payload is a Hex-ASCII string (e.g., "789ced...").
 * - **Action**: Convert Hex string to binary to reveal the ZLIB stream.
 *
 * #### Layer 5: Compression (ZLIB)
 * - **Algorithm**: ZLIB Decompression.
 * - **Signature**: `0x78 0x9c`.
 *
 * ### Resulting Data Structure:
 * The output is a **Protobuf Protocol Buffer** (Schema: `SCMap`).
 * Key fields in the decoded `RobotMap` message:
 *
 * ```protobuf
 * syntax = "proto3";
 * package SCMap;
 *
 * message RobotMap {
 *     MapHeadInfo mapHead = 3;       // Size, Resolution, Min/Max
 *     MapDataInfo mapData = 4;       // The raw pixel grid (often compressed)
 *     DevicePoseDataInfo chargeStation = 7;
 *     DeviceCurrentPoseInfo currentPose = 8;
 *     repeated RoomDataInfo roomDataInfo = 12; // Room IDs and Names
 * }
 * ```
 */
describe("Roborock B01 Map Protocol Specification", () => {

    // Credentials verified through deep debugging
    const credentials = {
        token: "l2xfVQ2fy2jhLV1H",
        sn: "RCEMBP52401666",
        duid: "3nidEgYQWYOJjCyAYUolQX",
        model: "roborock.vacuum.sc01"
    };

    const fixturePath = path.join(__dirname, "../fixtures/b01_raw_map.txt");
    const rawInput = Buffer.from(fs.readFileSync(fixturePath, "utf8").trim(), "hex");


    // Helper to get raw payload
    const getPayload = () => {
        const ivSeed = rawInput.readUInt32BE(7);
        const payloadLen = rawInput.readUInt16BE(17);
        return {
            ivSeed,
            payload: rawInput.subarray(19, 19 + payloadLen)
        };
    };

    // Helper for Layer 1 Decryption
    const decryptLayer1 = () => {
        const { ivSeed, payload } = getPayload();
        const iv = cryptoEngine.deriveB01IV(ivSeed);
        const decipher = crypto.createDecipheriv("aes-128-cbc", Buffer.from(credentials.token, "utf8"), iv);
        return Buffer.concat([decipher.update(payload), decipher.final()]);
    };

    // Helper for Layer 2 Decoding
    const decodeLayer2 = (layer1Output: Buffer) => {
        return Buffer.from(layer1Output.toString("utf8"), "base64");
    };

    // Helper for Layer 3 Decryption
    const decryptLayer3 = (layer2Output: Buffer) => {
        const modelSuffix = "sc01";
        let p = modelSuffix;
        while (p.length < 16) p += "0";
        const key = Buffer.from(p.substring(0, 16), "utf8");
        const inputStr = `${credentials.sn}+${modelSuffix}+${credentials.sn}`;
        const inputBuf = Buffer.from(inputStr, "utf8");
        const z = 16 - (inputBuf.length % 16);
        const paddedInput = Buffer.concat([inputBuf, Buffer.alloc(z, z)]);
        const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
        cipher.setAutoPadding(false);
        const mapKeyEnc = Buffer.concat([cipher.update(paddedInput), cipher.final()]);
        const hash = crypto.hash("md5", mapKeyEnc.toString("base64"));
        const mapKey = Buffer.from(hash.substring(8, 24).toLowerCase(), "utf8");

        const decipherECB = crypto.createDecipheriv("aes-128-ecb", mapKey, null);
        decipherECB.setAutoPadding(false);
        return Buffer.concat([decipherECB.update(layer2Output), decipherECB.final()]);
    };

    let layer1Output: Buffer;
    let layer2Output: Buffer;
    let layer3Output: Buffer;

    beforeAll(() => {
        layer1Output = decryptLayer1();
        layer2Output = decodeLayer2(layer1Output);
        layer3Output = decryptLayer3(layer2Output);
    });

    it("Layer 1: The B01 container MUST be decrypted using AES-128-CBC with the device token", () => {
        expect(layer1Output.length).toBeGreaterThan(0);
        const isBase64 = /^[A-Za-z0-9+/= \r\n]+$/.test(layer1Output.toString("utf8").substring(0, 100));
        expect(isBase64).toBe(true);
    });

    it("Layer 2: The CBC-decrypted payload MUST be Base64 decoded", () => {
        expect(layer2Output.length).toBeGreaterThan(0);
        expect(layer2Output.length).toBeLessThan(layer1Output.length);
    });

    it("Layer 3: The decoded binary block MUST be decrypted with AES-128-ECB using the Model-derived MapKey", () => {
        const decASCII = layer3Output.toString("utf8");
        expect(decASCII.startsWith("789c")).toBe(true);
    });

    it("Layer 4 & 5: The ECB-decrypted Hex string MUST be decoded and ZLIB decompressed", () => {
        // PROOF: Is Hex-decode necessary?
        // Try to decompress Layer 3 output directly (should FAIL)
        expect(() => zlib.inflateSync(layer3Output)).toThrow();

        // Now decode Hex and decompress (should SUCCEED)
        const hexStr = layer3Output.toString("utf8");
        const binZlib = Buffer.from(hexStr, "hex");
        const decompressed = zlib.inflateSync(binZlib);

        expect(decompressed.length).toBeGreaterThan(0);
    });

    it("Layer 6: The output of ZLIB decompression is a valid Protobuf (B01 format)", () => {
        // Use the full MapDecryptor to verify the end-to-end flow
        const decrypted = MapDecryptor.decrypt(rawInput, credentials.sn, credentials.model, credentials.duid, undefined, credentials.token);

        expect(decrypted).not.toBeNull();
        expect(MapDecryptor.isLikelyProtobuf(decrypted!)).toBe(true);
    });
});
