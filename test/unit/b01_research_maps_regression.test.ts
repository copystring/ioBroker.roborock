import { describe, expect, it } from "vitest";
import { B01ChunkAssembler } from "../../src/lib/B01ChunkAssembler";
import { MapDecryptor } from "../../src/lib/map/b01/MapDecryptor";
import { MapParser } from "../../src/lib/map/b01/MapParser";
import { DUMP_LIVE_B64, KARTE_1_B64, KARTE_2_B64 } from "./b01_research_maps_regression.fixtures";

type B01Frame = {
	offset: number;
	seq: number;
	proto: number;
	payloadLen: number;
	frame: Buffer;
};

type DeviceCreds = {
	duid: string;
	sn: string;
	model: string;
	localKey: string;
};

/** Base64-encoded JSON of { duid, sn, model, localKey } for the B01 test device (karte_1, karte_2, dump_live). Not secret, but avoids plain-text exposure in repo. */
const B01_TEST_CREDS_B64 = "eyJkdWlkIjoiNVVpUGF5UlROM0g2MFVscE1TYVRMZCIsInNuIjoiUkNPTVRQNTIyMTY1NzQiLCJtb2RlbCI6InJvYm9yb2NrLnZhY3V1bS5zYzA1IiwibG9jYWxLZXkiOiJCdXlWVFpGRE5NRzlGRnZSIn0=";

function getB01TestCreds(): DeviceCreds {
	const json = Buffer.from(B01_TEST_CREDS_B64, "base64").toString("utf8");
	const o = JSON.parse(json) as DeviceCreds;
	if (!o.duid || !o.sn || !o.model || !o.localKey) throw new Error("Invalid B01 test creds");
	return o;
}

/** Run when embedded fixtures are present (b01_research_maps_regression.fixtures.ts). */
const hasEmbeddedFixtures = Boolean(KARTE_1_B64 && KARTE_2_B64 && DUMP_LIVE_B64);
const describeResearch = hasEmbeddedFixtures ? describe : describe.skip;

const historyMapTypePrefix = Buffer.from([0x08, 0x15, 0x12]);
const liveMapTypePrefix = Buffer.from([0x08, 0x00, 0x12]);

function extractB01Frames(buf: Buffer): B01Frame[] {
	const out: B01Frame[] = [];
	for (let i = 0; i <= buf.length - 23; i++) {
		if (buf.toString("ascii", i, i + 3) !== "B01") continue;
		const payloadLen = buf.readUInt16BE(i + 17);
		const totalLen = 19 + payloadLen + 4;
		if (payloadLen <= 0 || i + totalLen > buf.length) continue;
		out.push({
			offset: i,
			seq: buf.readUInt32BE(i + 3),
			proto: buf.readUInt16BE(i + 15),
			payloadLen,
			frame: Buffer.from(buf.subarray(i, i + totalLen)),
		});
		i += totalLen - 1;
	}
	return out;
}

function hexLinesFromB64(b64: string): string[] {
	if (!b64) return [];
	const text = Buffer.from(b64, "base64").toString("utf8");
	return text
		.split(/\r?\n/)
		.map((l) => l.trim())
		.filter((l) => l.length > 0 && /^[0-9a-fA-F]+$/.test(l) && l.length % 2 === 0);
}

function extractB01FramesFromHexLines(hexLines: string[]): B01Frame[] {
	const all: B01Frame[] = [];
	for (const line of hexLines) {
		const packet = Buffer.from(line, "hex");
		all.push(...extractB01Frames(packet));
	}
	return all;
}

/**
 * B01 research regression: what is tested?
 *
 * - No PNG is compared. Only the pipeline: raw data → decrypt → protobuf → parse.
 * - Asserted:
 *   1. Decryption yields valid B01 protobuf (type prefix, isB01MapProtobuf).
 *   2. MapParser produces consistent B01MapData: header (sizeX/sizeY) and mapGrid match (sizeX*sizeY === mapGrid.length).
 *   3. Chunked (karte_2): B01ChunkAssembler correctly merges two chunks into one map.
 * - This catches regressions in Decryptor, Parser, or Assembler; PNG generation (MapBuilder etc.) is out of scope.
 */
function assertMapDataConsistent(mapData: { header: { sizeX: number; sizeY: number }; mapGrid: Buffer }): void {
	expect(mapData.header.sizeX).toBeGreaterThan(0);
	expect(mapData.header.sizeY).toBeGreaterThan(0);
	expect(mapData.mapGrid.length).toBe(mapData.header.sizeX * mapData.header.sizeY);
}

describeResearch("B01 research regression: live + history + chunked", () => {
	it("karte_1 (history non-chunked) decrypts and parses", async () => {
		const creds = getB01TestCreds();
		const hexLines = hexLinesFromB64(KARTE_1_B64);
		expect(hexLines.length).toBeGreaterThan(0);

		const frames = extractB01FramesFromHexLines(hexLines).filter((f) => (f.proto === 300 || f.proto === 301) && f.payloadLen > 500);
		const single = frames.find((f) => f.proto === 301 && f.seq === 1);
		expect(single).toBeDefined();

		const decrypted = MapDecryptor.decrypt(single!.frame, creds.sn, creds.model, creds.duid, undefined, creds.localKey, 21);
		expect(decrypted).not.toBeNull();
		expect(MapDecryptor.isB01MapProtobuf(decrypted!)).toBe(true);
		expect(decrypted!.subarray(0, 3).equals(historyMapTypePrefix)).toBe(true);

		const parser = new MapParser({ rLog: () => {}, log: { debug: () => {}, warn: () => {}, error: () => {} } } as any);
		const mapData = parser.parseProtobuf(decrypted!, creds.duid, "B01History");
		expect(mapData.mapGrid.length).toBeGreaterThan(0);
		assertMapDataConsistent(mapData);
	});

	it("karte_2 (history chunked 300+301) assembles and decrypts", async () => {
		const creds = getB01TestCreds();
		const hexLines = hexLinesFromB64(KARTE_2_B64);
		expect(hexLines.length).toBeGreaterThan(0);

		const frames = extractB01FramesFromHexLines(hexLines).filter((f) => (f.proto === 300 || f.proto === 301) && f.payloadLen > 500);
		const chunk1 = frames.find((f) => f.proto === 300 && f.seq === 1);
		const chunk2 = frames.find((f) => f.proto === 301 && f.seq === 2);
		expect(chunk1).toBeDefined();
		expect(chunk2).toBeDefined();

		const layer1Chunk1 = MapDecryptor.decryptLayer1Only(chunk1!.frame, creds.localKey);
		const layer1Chunk2 = MapDecryptor.decryptLayer1Only(chunk2!.frame, creds.localKey);
		expect(layer1Chunk1).not.toBeNull();
		expect(layer1Chunk2).not.toBeNull();

		const mockAdapter = {
			pendingRequests: new Map<number, any>([
				[1, { duid: creds.duid, method: "get_clean_record_map" }],
			]),
			http_api: {
				getDevices: () => [{ duid: creds.duid, sn: creds.sn }],
				getRobotModel: () => creds.model,
				getMatchedLocalKeys: () => new Map<string, string>([[creds.duid, creds.localKey]]),
			},
			setTimeout: setTimeout,
			clearTimeout: clearTimeout,
			rLog: () => {},
		};

		const assembler = new B01ChunkAssembler(mockAdapter as any);
		const first = await assembler.process(creds.duid, {
			protocol: 300,
			seq: 1,
			payload: layer1Chunk1!,
			payloadLen: chunk1!.payloadLen,
		});
		expect(first.type).toBe("map_chunk_buffered");

		const second = await assembler.process(creds.duid, {
			protocol: 301,
			seq: 2,
			payload: layer1Chunk2!,
			payloadLen: chunk2!.payloadLen,
		});
		expect(second.type).toBe("map");
		if (second.type === "map") {
			expect(MapDecryptor.isB01MapProtobuf(second.payload)).toBe(true);
			expect(second.payload.subarray(0, 3).equals(historyMapTypePrefix)).toBe(true);
			const mapData = new MapParser({ rLog: () => {}, log: { debug: () => {}, warn: () => {}, error: () => {} } } as any).parseProtobuf(second.payload, creds.duid, "B01History");
			assertMapDataConsistent(mapData);
		}
	});

	it("dump_live (live map) decrypts and parses", () => {
		const dumpJson = Buffer.from(DUMP_LIVE_B64, "base64").toString("utf8");
		const dump = JSON.parse(dumpJson) as {
			meta: { serial: string; model: string; duid: string };
			rawPayloadHex: string;
		};

		const creds = getB01TestCreds();
		expect(dump.meta.duid).toBe(creds.duid);
		const rawPayload = Buffer.from(dump.rawPayloadHex, "hex");

		const decrypted = MapDecryptor.decrypt(rawPayload, dump.meta.serial, dump.meta.model, dump.meta.duid, undefined, creds.localKey, 0);
		expect(decrypted).not.toBeNull();
		expect(MapDecryptor.isB01MapProtobuf(decrypted!)).toBe(true);
		expect(decrypted!.subarray(0, 3).equals(liveMapTypePrefix)).toBe(true);

		const parser = new MapParser({ rLog: () => {}, log: { debug: () => {}, warn: () => {}, error: () => {} } } as any);
		const mapData = parser.parseProtobuf(decrypted!, dump.meta.duid, "B01");
		expect(mapData.mapGrid.length).toBeGreaterThan(0);
		assertMapDataConsistent(mapData);
	});
});
