
import * as fs from "fs";
import * as path from "path";
import { describe, expect, it, vi } from "vitest";
import { MapBuilder } from "../../src/lib/map/b01/MapBuilder";
import { MapDecryptor } from "../../src/lib/map/b01/MapDecryptor";
import { MapParser } from "../../src/lib/map/b01/MapParser";

// Mock dependencies
const mockAdapter = {
	rLog: vi.fn(),
	log: { debug: vi.fn(), warn: vi.fn(), error: vi.fn() }
};

describe("B01 Map Generation (Hex Input -> PNG)", () => {

	it("should decrypt and parse B01 map data correctly", async () => {
		const encryptedPath = path.join(__dirname, "../fixtures/b01_raw_map.txt");

		if (!fs.existsSync(encryptedPath)) {
			console.warn("Skipping B01 Map Generation test: No fixture data found.");
			return;
		}

		// Read HEX string and convert to Buffer
		const rawHex = fs.readFileSync(encryptedPath, "utf8").trim();
		const rawInput = Buffer.from(rawHex, "hex");

		const sn = "RCEMBP52401666";
		const duid = "3nidEgYQWYOJjCyAYUolQX";
		const model = "roborock.vacuum.sc01";
		const token = "l2xfVQ2fy2jhLV1H";

		const decrypted = MapDecryptor.decrypt(rawInput, sn, model, duid, mockAdapter, token);

		expect(decrypted).not.toBeNull();
		expect(decrypted?.length).toBeGreaterThan(0);

		// Parse Map
		const parser = new MapParser(mockAdapter);
		const mapData = parser.parseProtobuf(decrypted!, duid, "ws");

		// Generate PNG
		if (mapData) {
			const builder = new MapBuilder(mockAdapter);
			const outputDir = path.join(__dirname, "../../.test-output");
			if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
			const outputPngPath = path.join(outputDir, "generated_map_test.png");

			const pngBuffer = await builder.buildMap(mapData, "roborock.vacuum.sc01", "duid", undefined);

			fs.writeFileSync(outputPngPath, pngBuffer);
			console.log(`[Test] PNG generated at ${outputPngPath} (Size: ${pngBuffer.length} bytes)`);

			expect(pngBuffer.length).toBeGreaterThan(1000);
			const header = pngBuffer.subarray(0, 8).toString("hex");
			expect(header).toBe("89504e470d0a1a0a"); // PNG Signature
		}
	});
});
