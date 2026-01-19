# Roborock Encryption Specification

> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.

<!-- Source: src/lib/map/b01/MapDecryptor.ts -->
### B01 Map Decryption

Decrypts a Roborock B01 map using a multi-layer "Russian Doll" unwrapping process.

@see docs/map/B01_Map_Protocol.md for the full technical specification.
@see test/unit/b01_map_specification.test.ts for the executable specification.

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