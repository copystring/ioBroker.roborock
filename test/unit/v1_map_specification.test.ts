
import { describe, it } from "vitest";

/**
 * @doc:map/V1_Map_Protocol.md
 * ### Roborock Map Protocol V1 Specification
 *
 * The map file is a custom binary format (little-endian), **NOT** standard Protobuf.
 * It consists of a **20-byte Main Header** followed by a sequence of **Typed Data Blocks**.
 *
 * #### 1. Main Header Structure (20 bytes)
 * | Offset | Size | Type     | Description |
 * | :--- | :--- | :--- | :--- |
 * | `0x00` | 2    | String   | Magic bytes "rr" (`0x72 0x72`) |
 * | `0x02` | 2    | UInt16   | Header Length (always 20? or block header size?) |
 * | `0x04` | 4    | UInt32   | **Data Length**: Total size of all blocks acting as payload |
 * | `0x08` | 2    | UInt16   | Major Version |
 * | `0x0A` | 2    | UInt16   | Minor Version |
 * | `0x0C` | 4    | UInt32   | Map Index (Map ID) |
 * | `0x10` | 4    | UInt32   | Map Sequence (Update number) |
 *
 * ### 2. Block Structure
 * After the 20-byte header, the file is a stream of blocks. Each block has a common header:
 *
 * | Relative Offset | Size | Type   | Description |
 * | :--- | :--- | :--- | :--- |
 * | `0x00` | 2 | UInt16 | **Type ID**: Determines the block content (Image, Path, etc.) |
 * | `0x02` | 2 | UInt16 | **Header Length** (`hlength`): Size of the block's specific header |
 * | `0x04` | 4 | UInt32 | **Data Length** (`length`): Size of the block's data payload |
 * | `0x08` | ... | Bytes  | **Payload**: `hlength` bytes of metadata + `length` bytes of data |
 *
 * ### 3. Checksum Verification
 * The file ends with a **SHA1 Checksum** of the preceding data.
 * * `Data` = [Header (20b)] + [Block Data]
 * * `Expected Checksum` = SHA1( `Data` )
 * The checksum itself is appended as the last 20 bytes of the file.
 */
describe("Roborock Map Protocol V1 Specification", () => {
    it("should document the V1 binary format", () => {
        // This is a documentation-only test block for now
    });
});
