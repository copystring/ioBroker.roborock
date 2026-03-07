# Roborock Encryption Specification

> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.

<!-- Source: src/lib/map/b01/MapDecryptor.ts -->
### B01 Map Decryption

B01 map decryption. Follows the spec derived from the test fixture and docs; the original app
(see .cursorrules) handles 301 in o00O00OO.OooO0O0 → o00OO000.OooO00o.OooOooo / OooOooO, but the
exact layer implementation is not visible in the decompiled APK.

Data flow: MQTT frame → messageParser.decodeMsg() reads
payloadLen (uint16 at offset 16), takes payload = frame.subarray(19, 19+payloadLen), then
decryptB01(payload, localKey, random) → data.payload. For 301 that buffer is passed to
getB01MapBuffer → decryptB01Payload → this decrypt(). So buf here is the inner payload after
outer B01 CBC only; no 301-specific header is stripped (unlike PhotoManager P301 dataSkip).
If buf starts with "B01", unwrapLayerCBC slices inner payload using payloadLen at buf[17..18].

@see docs/map/B01_Map_Protocol.md
@see test/unit/b01_map_specification.test.ts

---

<!-- Source: test/unit/crypto_specification.test.ts -->
### Protocol V1 Encryption Specification

Uses **AES-128-ECB** (Electronic Codebook).
Keys are derived dynamically based on the timestamp.

#### Key Derivation Formula
```text
Key = MD5( hex(timestamp) + localKey + SALT )
```
* `timestamp`: Unix timestamp (seconds), formatted using the `encodeTimestamp` shuffle function.
* `localKey`: The device's 16-char token.
* `SALT`: Hardcoded string `TXdfu$jyZ#TZHsg4`.

---

<!-- Source: test/unit/crypto_specification.test.ts -->
### Protocol A01 Encryption Specification

Uses **AES-128-CBC** (Cipher Block Chaining).
Typically used by Tuya-based protocols wrapped in Roborock headers.

#### Key & IV Derivation
* **Key**: The 16-char `localKey` (ASCII) is used directly.
* **IV**: Derived from a "random" seed included in the packet header.

```text
IV = MD5( hex(random) + "726f626f726f636b2d67a6d6da" ).substring(8, 24)
```
("726f..." is hex for "roborock-g&dZ").

---

<!-- Source: test/unit/crypto_specification.test.ts -->
### Protocol L01 Encryption Specification

Uses **AES-256-GCM** (Galois/Counter Mode).
This is the most secure protocol version, verifying integrity via GCM Tags.

#### Key Derivation
```text
Key = SHA256( encodeTimestamp(ts) + localKey + SALT )
```

#### IV Derivation
The 12-byte IV is a SHA256 hash of the header fields:
```text
Input = [ Seq(4) | Random(4) | Ts(4) ]  (Big Endian)
IV = SHA256( Input ).substring(0, 12)
```

#### AAD (Additional Authenticated Data)
GCM authenticates the header fields to prevent tampering:
```text
AAD = [ Seq(4) | ConnectNonce(4) | AckNonce(4) | Random(4) | Ts(4) ]
```