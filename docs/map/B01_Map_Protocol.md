# Roborock B01  Map  Protocol Specification

> **Auto-Generated**: This document is generated from the source code/tests to ensure 1:1 accuracy with the implementation.

<!-- Source: test/unit/b01_map_specification.test.ts -->
### Roborock B01 Map Protocol Specification

This test suite serves as the official, living documentation for the Roborock B01 map protocol.
The protocol uses a multi-layer "Russian Doll" encryption scheme where the following layers
MUST be unwrapped in sequential order to reveal the Protobuf data.

### Decryption Chain:

#### Layer 1: Protocol Wrapper (AES-128-CBC)
- **Algorithm**: AES-128-CBC.
- **Key**: The device's `localKey`.
- **Format**: `B01` (3 bytes) + `IV Seed` (4 bytes) + `Payload Length` (2 bytes) + `Payload`.
- **IV**: Derived from `IV Seed` using `cryptoEngine.deriveB01IV(seed)`.

#### Layer 2: Transport Decoding (Base64)
- **Format**: The CBC-decrypted payload is delivered as a Base64 string.
- **Action**: Decode to binary using `Buffer.from(payload, 'base64')`.

#### Layer 3: Map Data Encryption (AES-128-ECB)
- **Algorithm**: AES-128-ECB (No padding).
- **Key**: A special `MapKey` derived from the device's Serial Number and Model.

#### Layer 4: Post-Cipher Transport Decoding (Hex-ASCII)
- **Format**: The ECB-decrypted payload is a Hex-ASCII string (e.g., "789ced...").
- **Action**: Convert Hex string to binary to reveal the ZLIB stream.

#### Layer 5: Compression (ZLIB)
- **Algorithm**: ZLIB Decompression.
- **Signature**: `0x78 0x9c`.

### Resulting Data Structure:
The output is a **Protobuf Protocol Buffer** (Schema: `SCMap`).
Key fields in the decoded `RobotMap` message:

```protobuf
syntax = "proto3";
package SCMap;

message RobotMap {
    MapHeadInfo mapHead = 3;       // Size, Resolution, Min/Max
    MapDataInfo mapData = 4;       // The raw pixel grid (often compressed)
    DevicePoseDataInfo chargeStation = 7;
    DeviceCurrentPoseInfo currentPose = 8;
    repeated RoomDataInfo roomDataInfo = 12; // Room IDs and Names
}
```