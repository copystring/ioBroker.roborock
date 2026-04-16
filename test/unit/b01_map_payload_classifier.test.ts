import { describe, expect, it, vi } from "vitest";
import { B01MapPipeline } from "../../src/lib/map/b01/B01MapPipeline";
import { MapDecryptor } from "../../src/lib/map/b01/MapDecryptor";
import { classifyB01MapPayload } from "../../src/lib/map/b01/B01MapPayloadClassifier";
import { parseQ10PathOnlyToSourcePoints, parseQ10YxMapToB01 } from "../../src/lib/map/q10/Q10YxMapParser";
import { createQ10MockAdapter } from "./q10TestSupport";
import { Q10_FIXTURE_DEFAULTS } from "./q10FixtureDefaults";

const Q10_DUID = "q10-test-duid";
const { model: Q10_MODEL, sn: Q10_SN } = Q10_FIXTURE_DEFAULTS;

function createSyntheticQ10RawPayload(options: { tail?: Buffer; width?: number; height?: number; version?: number } = {}): Buffer {
	const width = options.width ?? 16;
	const height = options.height ?? 16;
	const version = options.version ?? 1;
	const tail = options.tail ?? Buffer.alloc(0);
	const pixLen = width * height;
	const payload = Buffer.alloc(1 + 28 + pixLen + tail.length, 0);

	// Original Q10 live payloads are typically parsed from offset 1.
	payload[0] = 1;
	payload[1] = version;
	payload.writeUInt32BE(1, 2);
	payload[6] = 0;
	payload.writeUInt16BE(width, 7);
	payload.writeUInt16BE(height, 9);
	payload.writeUInt16BE(0, 11);
	payload.writeUInt16BE(height * 5, 13);
	payload.writeUInt16BE(5, 15);
	payload.writeUInt16BE(0xffff, 17);
	payload.writeUInt16BE(0xffff, 19);
	payload.writeUInt16BE(0xffff, 21);
	payload.writeUInt32BE(pixLen, 23);
	payload.writeUInt16BE(0, 27);
	payload.fill(1, 29, 29 + pixLen);

	if (tail.length > 0) {
		tail.copy(payload, 29 + pixLen);
	}

	return payload;
}

function createSyntheticQ10RoomPayload(roomName: string): Buffer {
	const width = 16;
	const height = 16;
	const pixDataLen = width * height;
	const roomNameBytes = Buffer.from(roomName, "utf8");
	const roomNameData = Buffer.alloc(20, 0);
	roomNameData[0] = Math.min(roomNameBytes.length, 19);
	roomNameBytes.copy(roomNameData, 1, 0, Math.min(roomNameBytes.length, 19));

	const roomData = Buffer.alloc(2 + 26 + 20 + 1, 0);
	roomData[0] = 0; // region_id
	roomData[1] = 1; // region count
	roomData.writeUInt16BE(1, 2); // roomID
	roomData[4] = 1; // roomType
	roomData.writeUInt16BE(1, 5); // cleanOrder
	roomData.writeUInt16BE(1, 7); // cleanCount
	roomData[28] = roomNameData[0];
	roomNameData.subarray(1).copy(roomData, 29);

	const pixLen = pixDataLen + roomData.length;
	const payload = Buffer.alloc(1 + 28 + pixLen, 0);

	// Real Q10 payloads often start at offset 1, which is also the parser's preferred path.
	payload[0] = 1;
	payload[1] = 1;
	payload.writeUInt32BE(1, 2);
	payload[6] = 0;
	payload.writeUInt16BE(width, 7);
	payload.writeUInt16BE(height, 9);
	payload.writeUInt16BE(0, 11);
	payload.writeUInt16BE(height * 5, 13);
	payload.writeUInt16BE(5, 15);
	payload.writeUInt16BE(0xffff, 17);
	payload.writeUInt16BE(0xffff, 19);
	payload.writeUInt16BE(0xffff, 21);
	payload.writeUInt32BE(pixLen, 23);
	payload.writeUInt16BE(0, 27);
	payload.fill(1, 29, 29 + pixDataLen);
	roomData.copy(payload, 29 + pixDataLen);

	return payload;
}

function createSyntheticQ10PathPayload(options: { wrapped?: boolean } = {}): Buffer {
	const body = Buffer.alloc(13 + 8, 0);
	body[0] = 1;
	body.writeUInt16BE(0, 1);
	body[3] = 0;
	body[4] = 0;
	body.writeUInt32BE(2, 5);
	body.writeUInt16BE(0, 9);
	body.writeUInt16BE(0, 11);
	body.writeInt16BE(200, 13);
	body.writeInt16BE(400, 15);
	body.writeInt16BE(300, 17);
	body.writeInt16BE(500, 19);

	if (!options.wrapped) return body;

	return Buffer.concat([Buffer.from([2]), body]);
}

describe("B01 Map Payload Classifier", () => {
	it("should keep a valid Q10 live map even when an optional edit-tail block is malformed", () => {
		const malformedTail = Buffer.from([
			0x00,
			0x00, 0x00, 0x00, 0x00,
			0x00, 0x00,
			0x00,
			0x00,
			0x01,
			0x00, 0x00,
			0x00,
			0x02,
			0x00, 0x00, 0x00, 0x02,
			0x00, 0x00,
			0x00, 0x03,
			0x01, 0x01, 0x00
		]);
		const payload = createSyntheticQ10RawPayload({ tail: malformedTail });

		const parsed = parseQ10YxMapToB01(payload);

		expect(parsed).not.toBeNull();
		expect(parsed?.header.sizeX).toBe(16);
		expect(parsed?.header.sizeY).toBe(16);
		expect(parsed?.mapGrid.length).toBe(256);
	});

	it("should classify parser-recognized Q10 live payloads as B01 live maps", () => {
		const payload = createSyntheticQ10RawPayload();

		const classification = classifyB01MapPayload(payload);

		expect(classification.isMapPayload).toBe(true);
		expect(classification.variant).toBe("q10");
		expect(classification.kind).toBe("live");
		expect(classification.isLiveMapCandidate).toBe(true);
		expect(classification.q10?.payloadShape).toBe("map");
		expect(classification.q10?.mapData?.sourceFormat).toBe("q10-raw");
	});

	it("should parse the canonical original Q10 path-only payload shape without the blob prefix", () => {
		const payload = createSyntheticQ10PathPayload();

		const pathPoints = parseQ10PathOnlyToSourcePoints(payload);
		const classification = classifyB01MapPayload(payload);

		expect(pathPoints).toHaveLength(2);
		expect(pathPoints?.[0]?.x).toBe(10);
		expect(pathPoints?.[0]?.y).toBe(20);
		expect(classification.variant).toBe("q10");
		expect(classification.kind).toBe("live");
		expect(classification.q10?.pathPoints).toHaveLength(2);
	});

	it("should unwrap raw Q10 path-only transport payloads before parsing them like the original app", () => {
		const payload = createSyntheticQ10PathPayload({ wrapped: true });

		const pathPoints = parseQ10PathOnlyToSourcePoints(payload);
		const classification = classifyB01MapPayload(payload);

		expect(pathPoints).toHaveLength(2);
		expect(classification.variant).toBe("q10");
		expect(classification.kind).toBe("live");
		expect(classification.q10?.pathPoints).toHaveLength(2);
	});

	it("should classify Q10 history blob type 3 as a B01 history map payload", () => {
		const payload = Buffer.alloc(32, 0);
		payload[0] = 3;

		const classification = classifyB01MapPayload(payload);

		expect(classification.isMapPayload).toBe(true);
		expect(classification.variant).toBe("q10");
		expect(classification.kind).toBe("history");
		expect(classification.isLiveMapCandidate).toBe(false);
		expect(classification.q10?.payloadShape).toBe("blob");
		expect(classification.q10?.blobType).toBe(3);
	});

	it("should not classify an unparsed Q10 live blob marker as a live map candidate", () => {
		const payload = Buffer.alloc(32, 0);
		payload[0] = 2;

		const classification = classifyB01MapPayload(payload);

		expect(classification.isMapPayload).toBe(true);
		expect(classification.variant).toBe("q10");
		expect(classification.kind).toBe("other");
		expect(classification.isLiveMapCandidate).toBe(false);
		expect(classification.q10?.blobType).toBe(2);
		expect(classification.q10?.pathPoints).toBeNull();
		expect(classification.q10?.mapData).toBeNull();
	});

	it("should keep the raw Q10 room name from roomNameDataStr instead of remapping it to a local label", () => {
		const payload = createSyntheticQ10RoomPayload("rr_master_room");

		const parsed = parseQ10YxMapToB01(payload);

		expect(parsed?.q10SourceData?.rooms[0]?.roomName).toBe("rr_master_room");
		expect(parsed?.rooms?.[0]?.roomName).toBe("rr_master_room");
	});

	it("should resolve parser-recognized live payloads through the B01 map pipeline without depending on legacy Q10 heuristics", () => {
		const payload = createSyntheticQ10RawPayload();
		const adapter = createQ10MockAdapter({ duid: Q10_DUID });
		const pipeline = new B01MapPipeline(adapter as any);
		const mapHeuristicSpy = vi.spyOn(MapDecryptor, "isLikelyQ10MapPayload").mockReturnValue(false);
		const blobHeuristicSpy = vi.spyOn(MapDecryptor, "isLikelyQ10BlobPayload").mockReturnValue(false);
		const decryptSpy = vi.spyOn(MapDecryptor, "decrypt").mockReturnValue(null);

		try {
			const result = pipeline.resolve(
				payload,
				"B01",
				Q10_MODEL,
				Q10_SN,
				Q10_DUID,
				"B01"
			);

			expect(result).not.toBeNull();
			expect(result?.variant).toBe("q10");
			expect(result?.mapData?.sourceFormat).toBe("q10-raw");
			expect(decryptSpy).not.toHaveBeenCalled();
		} finally {
			mapHeuristicSpy.mockRestore();
			blobHeuristicSpy.mockRestore();
			decryptSpy.mockRestore();
		}
	});
});
