import { B01Area, B01Carpet, B01MapData, B01Point, B01RoomInfo } from "./types";

const Q10_HEADER_LENGTH = 28;
const Q10_OUTSIDE = 0;
const Q10_FLOOR = 1;
const Q10_WALL = 128;

interface Q10Header {
	version: number;
	mapId: number;
	type: number;
	width: number;
	height: number;
	xMinTop: number;
	yTop: number;
	resolution: number;
	chargeXRaw: number;
	chargeYRaw: number;
	chargerDirection: number;
	pixLen: number;
	pixLzLen: number;
	dataOffset: number;
}

interface Q10RoomMeta {
	roomId: number;
	roomName: string;
	roomType: number;
	cleanOrder: number;
	cleanCount: number;
	cleanType: number;
	funLevel: number;
	waterLevel: number;
	material: number;
	cleanLine: number;
}

interface Q10PathPoint {
	x: number;
	y: number;
	type: number;
}

interface ParsedPathSection {
	points: Q10PathPoint[];
	nextOffset: number;
}

interface ParsedAreaSection {
	areas: B01Area[];
	nextOffset: number;
}

interface ParsedCarpetSection {
	carpets: B01Carpet[];
	nextOffset: number;
}

interface ParsedPointSection {
	points: B01Point[];
	nextOffset: number;
}

export class Q10MapParser {
	static isLikelyPayload(buf: Buffer): boolean {
		if (!buf || buf.length < Q10_HEADER_LENGTH) return false;
		if (buf.toString("ascii", 0, 3) === "B01") return false;
		if (buf[0] !== 0 && buf[0] !== 1 && buf[0] !== 2) return false;

		const width = Q10MapParser.readUIntBE(buf, 6, 2);
		const height = Q10MapParser.readUIntBE(buf, 8, 2);
		const resolutionRaw = Q10MapParser.readUIntBE(buf, 14, 2);
		const pixLen = Q10MapParser.readUIntBE(buf, 22, 4);
		const pixLzLen = Q10MapParser.readUIntBE(buf, 26, 2);
		const encodedPixLength = pixLzLen === 0 ? pixLen : pixLzLen;
		const minRasterBytes = buf[0] === 0 ? Math.ceil((width * height) / 4) : width * height;

		if (width < 8 || height < 8 || width > 4096 || height > 4096) return false;
		if (resolutionRaw < 1 || resolutionRaw > 500) return false;
		if (pixLen < minRasterBytes || pixLen > width * height * 32) return false;
		if (encodedPixLength <= 0 || Q10_HEADER_LENGTH + encodedPixLength > buf.length) return false;

		return true;
	}

	static parse(buf: Buffer): B01MapData | null {
		const header = Q10MapParser.parseHeader(buf);
		if (!header) return null;

		const encodedPixLength = header.pixLzLen === 0 ? header.pixLen : header.pixLzLen;
		const encodedPix = buf.subarray(header.dataOffset, header.dataOffset + encodedPixLength);
		const decompressedPix = header.pixLzLen === 0
			? Buffer.from(encodedPix)
			: Q10MapParser.decompressLz4Block(encodedPix, header.pixLen);

		if (!decompressedPix || decompressedPix.length !== header.pixLen) return null;

		const totalCells = header.width * header.height;
		const rawTopDownMap = new Uint16Array(totalCells);
		const roomIdsInGrid = new Set<number>();
		const rasterLength = Q10MapParser.decodeRaster(header.version, decompressedPix, header, rawTopDownMap, roomIdsInGrid);
		if (rasterLength === null) return null;

		const roomMetaById = new Map<number, Q10RoomMeta>();
		if (header.version !== 0 && rasterLength < decompressedPix.length) {
			for (const room of Q10MapParser.parseRoomData(decompressedPix.subarray(rasterLength))) {
				roomMetaById.set(room.roomId, room);
				roomIdsInGrid.add(room.roomId);
			}
		}

		const roomIds = Array.from(roomIdsInGrid).filter(roomId => roomId > 0).sort((a, b) => a - b);
		const roomGridValues = new Map<number, number>();
		const rooms: B01RoomInfo[] = roomIds.map((roomId, index) => {
			const meta = roomMetaById.get(roomId);
			const gridValue = roomId + 2;
			roomGridValues.set(roomId, gridValue);
			return {
				roomId,
				roomName: meta?.roomName || `Room ${roomId}`,
				roomTypeId: meta?.roomType ?? 0,
				colorId: (index % 4) + 1,
				gridValue,
				cleanOrder: meta?.cleanOrder,
				cleanCount: meta?.cleanCount,
				cleanType: meta?.cleanType,
				funLevel: meta?.funLevel,
				waterLevel: meta?.waterLevel,
				material: meta?.material,
				cleanLine: meta?.cleanLine
			};
		});

		const normalizedGrid = Q10MapParser.normalizeMapGrid(rawTopDownMap, header, roomGridValues);
		const normalizedHeader = Q10MapParser.normalizeHeader(header);
		Q10MapParser.assignRoomLabelPositions(normalizedGrid, normalizedHeader, rooms);

		let offset = header.dataOffset + encodedPixLength;

		const eraseAreas = Q10MapParser.parseEraseAreas(buf, offset, header);
		offset = eraseAreas.nextOffset;

		const carpetRaster = Q10MapParser.parseCarpetRaster(buf, offset);
		offset = carpetRaster.nextOffset;

		const obstacles = Q10MapParser.parseObstaclePoints(buf, offset, header, 0.2);
		offset = obstacles.nextOffset;

		const skipCleanPoints = Q10MapParser.parseObstaclePoints(buf, offset, header, 1);
		offset = skipCleanPoints.nextOffset;

		const pathSection = Q10MapParser.parsePathSection(buf, offset, header);
		offset = pathSection.nextOffset;

		const virtualWalls = Q10MapParser.parseVirtualWalls(buf, offset, header);
		offset = virtualWalls.nextOffset;

		const forbidSection = Q10MapParser.parseForbidAreas(buf, offset, header);
		offset = forbidSection.nextOffset;

		const carpetAreas = Q10MapParser.parseCarpetAreas(buf, offset, header);

		const history = pathSection.points.map(point => ({ x: point.x, y: point.y, update: 5 }));
		const robotPos = Q10MapParser.deriveRobotPosition(pathSection.points);
		const chargerPos = Q10MapParser.deriveChargerPosition(header);

		return {
			sourceFormat: "q10-raw",
			header: normalizedHeader,
			mapGrid: normalizedGrid,
			history,
			chargerPos,
			robotPos,
			rooms,
			virtualWalls: virtualWalls.areas,
			carpetInfo: carpetAreas.carpets,
			recmForbitZone: forbidSection.forbiddenAreas,
			eraseAreas: eraseAreas.areas,
			obstacles: obstacles.points,
			skipCleanPoints: skipCleanPoints.points,
			thresholds: forbidSection.thresholds,
			hasCarpetRaster: carpetRaster.hasCarpet
		};
	}

	static decompressLz4Block(src: Uint8Array, dstSize: number): Uint8Array {
		const dst = new Uint8Array(dstSize);
		const minMatch = 4;
		const hasCopyWithin = dst.copyWithin !== undefined && dst.fill !== undefined;
		let srcIndex = 0;
		let dstIndex = 0;

		while (srcIndex < src.length) {
			const token = src[srcIndex++];
			let literalCount = token >> 4;

			if (literalCount === 0x0f) {
				while (srcIndex < src.length) {
					const extension = src[srcIndex++];
					literalCount += extension;
					if (extension !== 0xff) break;
				}
			}

			if (srcIndex + literalCount > src.length || dstIndex + literalCount > dst.length) {
				throw new Error("Invalid LZ4 literal block");
			}

			dst.set(src.subarray(srcIndex, srcIndex + literalCount), dstIndex);
			srcIndex += literalCount;
			dstIndex += literalCount;

			if (srcIndex >= src.length) break;
			if (srcIndex + 2 > src.length) throw new Error("Invalid LZ4 match offset");

			let matchLength = token & 0x0f;
			const matchOffset = src[srcIndex++] | (src[srcIndex++] << 8);
			if (matchOffset <= 0 || matchOffset > dstIndex) throw new Error("Invalid LZ4 match distance");

			if (matchLength === 0x0f) {
				while (srcIndex < src.length) {
					const extension = src[srcIndex++];
					matchLength += extension;
					if (extension !== 0xff) break;
				}
			}
			matchLength += minMatch;

			if (dstIndex + matchLength > dst.length) throw new Error("Invalid LZ4 match length");

			if (hasCopyWithin && matchOffset === 1) {
				dst.fill(dst[dstIndex - 1] | 0, dstIndex, dstIndex + matchLength);
				dstIndex += matchLength;
				continue;
			}

			if (hasCopyWithin && matchOffset > matchLength && matchLength > 31) {
				dst.copyWithin(dstIndex, dstIndex - matchOffset, dstIndex - matchOffset + matchLength);
				dstIndex += matchLength;
				continue;
			}

			let copyIndex = dstIndex - matchOffset;
			const copyEnd = copyIndex + matchLength;
			while (copyIndex < copyEnd) {
				dst[dstIndex++] = dst[copyIndex++] | 0;
			}
		}

		return dst;
	}

	private static parseHeader(buf: Buffer): Q10Header | null {
		if (!Q10MapParser.isLikelyPayload(buf)) return null;

		return {
			version: Q10MapParser.readUIntBE(buf, 0, 1),
			mapId: Q10MapParser.readUIntBE(buf, 1, 4),
			type: Q10MapParser.readUIntBE(buf, 5, 1),
			width: Q10MapParser.readUIntBE(buf, 6, 2),
			height: Q10MapParser.readUIntBE(buf, 8, 2),
			xMinTop: Q10MapParser.readUIntBE(buf, 10, 2) / 10,
			yTop: Q10MapParser.readUIntBE(buf, 12, 2) / 10,
			resolution: Q10MapParser.readUIntBE(buf, 14, 2) / 100,
			chargeXRaw: Q10MapParser.readUIntBE(buf, 16, 2),
			chargeYRaw: Q10MapParser.readUIntBE(buf, 18, 2),
			chargerDirection: Q10MapParser.readUIntBE(buf, 20, 2) === 0xffff ? 0 : Q10MapParser.readUIntBE(buf, 20, 2),
			pixLen: Q10MapParser.readUIntBE(buf, 22, 4),
			pixLzLen: Q10MapParser.readUIntBE(buf, 26, 2),
			dataOffset: Q10_HEADER_LENGTH
		};
	}

	private static decodeRaster(
		version: number,
		decompressedPix: Uint8Array,
		header: Q10Header,
		rawTopDownMap: Uint16Array,
		roomIdsInGrid: Set<number>
	): number | null {
		const totalCells = header.width * header.height;
		if (version === 0) {
			const packedLength = Math.ceil(totalCells / 4);
			if (packedLength > decompressedPix.length) return null;
			let targetIndex = 0;
			for (let sourceIndex = 0; sourceIndex < packedLength && targetIndex < totalCells; sourceIndex++) {
				const value = decompressedPix[sourceIndex];
				const packed = [
					(value & 0b11000000) >> 6,
					(value & 0b00110000) >> 4,
					(value & 0b00001100) >> 2,
					value & 0b00000011
				];
				for (const cell of packed) {
					if (targetIndex >= totalCells) break;
					rawTopDownMap[targetIndex++] = Q10MapParser.decodeTwoBitCell(cell);
				}
			}
			return packedLength;
		}

		if (totalCells > decompressedPix.length) return null;

		for (let index = 0; index < totalCells; index++) {
			const value = decompressedPix[index];
			if (version === 1) {
				const roomId = (value & 0b11111100) >> 2;
				if (roomId > 0 && roomId < 33) {
					rawTopDownMap[index] = roomId;
					roomIdsInGrid.add(roomId);
				} else {
					rawTopDownMap[index] = Q10MapParser.decodeTwoBitCell(value & 0b00000011);
				}
				continue;
			}

			const roomId = (value & 0b11111000) >> 3;
			if (roomId > 0 && roomId < 27) {
				rawTopDownMap[index] = roomId;
				roomIdsInGrid.add(roomId);
				continue;
			}

			rawTopDownMap[index] = Q10MapParser.decodeThreeBitCell(value & 0b00000111);
		}

		return totalCells;
	}

	private static decodeTwoBitCell(value: number): number {
		if (value === 0b01) return Q10_WALL;
		if (value === 0b11) return Q10_OUTSIDE;
		return Q10_FLOOR;
	}

	private static decodeThreeBitCell(value: number): number {
		if (value === 0b000) return Q10_OUTSIDE;
		if (value === 0b001) return Q10_WALL;
		return Q10_FLOOR;
	}

	private static normalizeHeader(header: Q10Header): B01MapData["header"] {
		const minY = header.yTop - (header.height * header.resolution);
		return {
			viewId: header.mapId,
			sizeX: header.width,
			sizeY: header.height,
			minX: header.xMinTop,
			minY,
			maxX: header.xMinTop + (header.width * header.resolution),
			maxY: minY + (header.height * header.resolution),
			resolution: header.resolution
		};
	}

	private static normalizeMapGrid(rawTopDownMap: Uint16Array, header: Q10Header, roomGridValues: Map<number, number>): Buffer {
		const normalized = Buffer.alloc(header.width * header.height);

		for (let y = 0; y < header.height; y++) {
			for (let x = 0; x < header.width; x++) {
				const topDownIndex = (y * header.width) + x;
				const normalizedIndex = ((header.height - 1 - y) * header.width) + x;
				const value = rawTopDownMap[topDownIndex];

				if (value === Q10_OUTSIDE) {
					normalized[normalizedIndex] = 0;
				} else if (value === Q10_WALL) {
					normalized[normalizedIndex] = 128;
				} else if (value === Q10_FLOOR) {
					normalized[normalizedIndex] = 1;
				} else {
					normalized[normalizedIndex] = roomGridValues.get(value) ?? 1;
				}
			}
		}

		return normalized;
	}

	private static parseRoomData(roomData: Uint8Array): Q10RoomMeta[] {
		if (!roomData || roomData.length < 2) return [];

		let offset = 1;
		const roomCount = Q10MapParser.readUIntBE(roomData, offset, 1);
		offset += 1;

		const rooms: Q10RoomMeta[] = [];
		for (let index = 0; index < roomCount; index++) {
			if (offset + 47 > roomData.length) break;

			const roomProperties = roomData.subarray(offset, offset + 26);
			offset += 26;

			let propertyOffset = 0;
			const roomId = Q10MapParser.readUIntBE(roomProperties, propertyOffset, 2);
			propertyOffset += 2;
			const roomType = Q10MapParser.readUIntBE(roomProperties, propertyOffset, 1);
			propertyOffset += 1;

			let cleanOrder = Q10MapParser.readUIntBE(roomProperties, propertyOffset, 2);
			if (cleanOrder === 0xffff) cleanOrder = -1;
			propertyOffset += 2;

			const cleanCount = Q10MapParser.readUIntBE(roomProperties, propertyOffset, 2);
			propertyOffset += 2;

			let cleanType = Q10MapParser.readUIntBE(roomProperties, propertyOffset, 1);
			if (cleanType === 0xff) cleanType = -1;
			propertyOffset += 1;

			let funLevel = Q10MapParser.readUIntBE(roomProperties, propertyOffset, 1);
			if (funLevel === 0xff) funLevel = -1;
			propertyOffset += 1;

			let waterLevel = Q10MapParser.readUIntBE(roomProperties, propertyOffset, 1);
			if (waterLevel === 0xff) waterLevel = -1;
			propertyOffset += 1;

			const material = Q10MapParser.readUIntBE(roomProperties, propertyOffset, 1);
			propertyOffset += 1;

			let cleanLine = Q10MapParser.readUIntBE(roomProperties, propertyOffset, 1);
			if (cleanLine < 0 || cleanLine > 2) cleanLine = 0;

			const roomNameData = roomData.subarray(offset, offset + 20);
			offset += 20;

			const verticesCount = Q10MapParser.readUIntBE(roomData, offset, 1);
			offset += 1 + (verticesCount * 4);

			if (roomId <= 0) continue;

			rooms.push({
				roomId,
				roomName: Q10MapParser.decodeRoomName(roomNameData) || `Room ${roomId}`,
				roomType,
				cleanOrder,
				cleanCount,
				cleanType,
				funLevel,
				waterLevel,
				material,
				cleanLine
			});
		}

		return rooms;
	}

	private static parseEraseAreas(buf: Buffer, start: number, header: Q10Header): ParsedAreaSection {
		if (start >= buf.length) return { areas: [], nextOffset: start };

		const count = Q10MapParser.readUIntBE(buf, start, 1);
		start += 1;
		if (count === 0) return { areas: [], nextOffset: start };
		if (start >= buf.length) return { areas: [], nextOffset: start };

		start += 1; // polygon count (currently always rectangle)
		const expectedLength = count * 16;
		if (start + expectedLength > buf.length) return { areas: [], nextOffset: start };

		const areas: B01Area[] = [];
		for (let index = 0; index < count; index++) {
			const points = Q10MapParser.parsePointArray(buf.subarray(start, start + 16), header, 1);
			start += 16;
			areas.push({ points, area_type: 0 });
		}

		return { areas, nextOffset: start };
	}

	private static parseCarpetRaster(buf: Buffer, start: number): { hasCarpet: boolean; nextOffset: number } {
		if (start + 6 > buf.length) return { hasCarpet: false, nextOffset: start };

		const pixLen = Q10MapParser.readUIntBE(buf, start, 4);
		start += 4;
		const pixLzLen = Q10MapParser.readUIntBE(buf, start, 2);
		start += 2;

		if (pixLen === 0) return { hasCarpet: false, nextOffset: start };

		const encodedLength = pixLzLen === 0 ? pixLen : pixLzLen;
		if (start + encodedLength > buf.length) return { hasCarpet: false, nextOffset: start };

		let data = buf.subarray(start, start + encodedLength);
		start += encodedLength;

		if (pixLzLen !== 0) {
			try {
				data = Buffer.from(Q10MapParser.decompressLz4Block(data, pixLen));
			} catch {
				return { hasCarpet: false, nextOffset: start };
			}
		}

		let hasCarpet = false;
		for (let index = 0; index < data.length; index++) {
			if ((data[index] & 0x3f) > 0) {
				hasCarpet = true;
				break;
			}
		}

		return { hasCarpet, nextOffset: start };
	}

	private static parseObstaclePoints(buf: Buffer, start: number, header: Q10Header, scaleMultiplier: number): ParsedPointSection {
		if (start >= buf.length) return { points: [], nextOffset: start };

		const count = Q10MapParser.readUIntBE(buf, start, 1);
		start += 1;
		if (start + (count * 4) > buf.length) return { points: [], nextOffset: start };

		const points: B01Point[] = [];
		for (let index = 0; index < count; index++) {
			const x = Q10MapParser.readInt16BE(buf, start) / 10 * scaleMultiplier;
			const y = Q10MapParser.readInt16BE(buf, start + 2) / 10 * scaleMultiplier;
			start += 4;
			points.push(Q10MapParser.devicePointToAbsolute({ x, y }, header));
		}

		return { points, nextOffset: start };
	}

	private static parsePathSection(buf: Buffer, start: number, header: Q10Header): ParsedPathSection {
		if (start + 13 > buf.length) return { points: [], nextOffset: start };

		let offset = start;
		const coordinateVersion = Q10MapParser.readUIntBE(buf, offset, 1);
		offset += 1;
		offset += 2; // reserved / map id fragment
		offset += 1;
		const pathTypeMode = Q10MapParser.readUIntBE(buf, offset, 1);
		offset += 1;
		const pointCount = Q10MapParser.readUIntBE(buf, offset, 4);
		offset += 4;
		offset += 2;
		const compressedLength = Q10MapParser.readUIntBE(buf, offset, 2);
		offset += 2;

		const rawPointBytes = pointCount * 4;
		const encodedLength = compressedLength === 0 ? rawPointBytes : compressedLength;
		if (pointCount <= 0 || offset + encodedLength > buf.length) return { points: [], nextOffset: start };

		let pointData = buf.subarray(offset, offset + encodedLength);
		offset += encodedLength;

		if (compressedLength !== 0) {
			try {
				pointData = Buffer.from(Q10MapParser.decompressLz4Block(pointData, rawPointBytes));
			} catch {
				return { points: [], nextOffset: start };
			}
		}

		if (pointData.length < rawPointBytes) return { points: [], nextOffset: start };

		const points: Q10PathPoint[] = [];
		for (let index = 0; index < pointCount; index++) {
			const pointOffset = index * 4;
			const xByte1 = pointData[pointOffset];
			const xByte2 = pointData[pointOffset + 1];
			const yByte1 = pointData[pointOffset + 2];
			const yByte2 = pointData[pointOffset + 3];

			let x = Q10MapParser.byte2ToShort(xByte1, xByte2);
			let y = Q10MapParser.byte2ToShort(yByte1, yByte2);

			if (coordinateVersion === 1) {
				x /= 5;
				y /= 5;
			} else {
				x /= 10;
				y /= 10;
			}

			let type = 0;
			if (pathTypeMode === 2) {
				type = ((xByte2 & 0x03) << 2) + (yByte2 & 0x03);
			}

			const absolute = Q10MapParser.devicePointToAbsolute({ x, y }, header);
			points.push({ x: absolute.x, y: absolute.y, type });
		}

		return { points, nextOffset: offset };
	}

	private static parseVirtualWalls(buf: Buffer, start: number, header: Q10Header): ParsedAreaSection {
		if (start >= buf.length) return { areas: [], nextOffset: start };

		const count = Q10MapParser.readUIntBE(buf, start, 1);
		const totalLength = 1 + (count * 8);
		if (start + totalLength > buf.length) return { areas: [], nextOffset: start };

		const areas: B01Area[] = [];
		start += 1;
		for (let index = 0; index < count; index++) {
			const points = Q10MapParser.parsePointArray(buf.subarray(start, start + 8), header, 1);
			start += 8;
			areas.push({ points, area_type: 1 });
		}

		return { areas, nextOffset: start };
	}

	private static parseForbidAreas(
		buf: Buffer,
		start: number,
		header: Q10Header
	): { forbiddenAreas: B01Area[]; thresholds: B01Area[]; nextOffset: number } {
		if (start + 2 > buf.length) return { forbiddenAreas: [], thresholds: [], nextOffset: start };

		const count = Q10MapParser.readUIntBE(buf, start + 1, 1);
		const totalLength = 2 + (count * 38);
		if (start + totalLength > buf.length) return { forbiddenAreas: [], thresholds: [], nextOffset: start };

		const forbiddenAreas: B01Area[] = [];
		const thresholds: B01Area[] = [];
		start += 2;

		for (let index = 0; index < count; index++) {
			const block = buf.subarray(start, start + 38);
			start += 38;

			const areaType = Q10MapParser.readUIntBE(block, 0, 1);
			const points = Q10MapParser.parsePointArray(block.subarray(2, 18), header, 1);
			const nameLength = Q10MapParser.readUIntBE(block, 18, 1);
			const name = nameLength > 0 && nameLength <= 19
				? Q10MapParser.decodeUtf8(block.subarray(19, 19 + nameLength))
				: undefined;
			const area: B01Area = { points, name, area_type: areaType };

			if (areaType === 3) {
				thresholds.push(area);
			} else {
				forbiddenAreas.push(area);
			}
		}

		return { forbiddenAreas, thresholds, nextOffset: start };
	}

	private static parseCarpetAreas(buf: Buffer, start: number, header: Q10Header): ParsedCarpetSection {
		if (start >= buf.length) return { carpets: [], nextOffset: start };

		const count = Q10MapParser.readUIntBE(buf, start, 1);
		const totalLength = 1 + (count * 20);
		if (start + totalLength > buf.length) return { carpets: [], nextOffset: start };

		const carpets: B01Carpet[] = [];
		start += 1;
		for (let index = 0; index < count; index++) {
			const block = buf.subarray(start, start + 20);
			start += 20;
			const id = Q10MapParser.readUIntBE(block, 0, 2);
			const points = Q10MapParser.parsePointArray(block.subarray(4, 20), header, 1);
			carpets.push({ id, points });
		}

		return { carpets, nextOffset: start };
	}

	private static parsePointArray(raw: Uint8Array, header: Q10Header, scaleMultiplier: number): B01Point[] {
		const points: B01Point[] = [];
		for (let offset = 0; offset + 3 < raw.length; offset += 4) {
			const x = Q10MapParser.byte2ToShort(raw[offset], raw[offset + 1]) / 10 * scaleMultiplier;
			const y = Q10MapParser.byte2ToShort(raw[offset + 2], raw[offset + 3]) / 10 * scaleMultiplier;
			points.push(Q10MapParser.devicePointToAbsolute({ x, y }, header));
		}
		return points;
	}

	private static deriveRobotPosition(pathPoints: Q10PathPoint[]): B01MapData["robotPos"] | undefined {
		if (pathPoints.length === 0) return undefined;

		const lastPoint = pathPoints[pathPoints.length - 1];
		const previousPoint = pathPoints.length > 1 ? pathPoints[pathPoints.length - 2] : undefined;
		let phi = 0;

		if (previousPoint) {
			const dx = lastPoint.x - previousPoint.x;
			const dy = lastPoint.y - previousPoint.y;
			if (dx !== 0 || dy !== 0) {
				phi = Math.atan2(dy, dx) * (180 / Math.PI);
			}
		}

		return { x: lastPoint.x, y: lastPoint.y, phi };
	}

	private static deriveChargerPosition(header: Q10Header): B01MapData["chargerPos"] | undefined {
		if (header.chargeXRaw === 0 || header.chargeYRaw === 0) return undefined;

		const absolute = Q10MapParser.devicePointToAbsolute({
			x: header.chargeXRaw / 10 - header.xMinTop,
			y: header.yTop - (header.chargeYRaw / 10)
		}, header);

		return {
			x: absolute.x,
			y: absolute.y,
			phi: -header.chargerDirection
		};
	}

	private static assignRoomLabelPositions(mapGrid: Buffer, header: B01MapData["header"], rooms: B01RoomInfo[]): void {
		const width = header.sizeX;
		const height = header.sizeY;

		for (const room of rooms) {
			if (!room.gridValue) continue;

			const visited = new Uint8Array(mapGrid.length);
			let bestCount = 0;
			let bestCenter: { x: number; y: number } | undefined;

			for (let startIndex = 0; startIndex < mapGrid.length; startIndex++) {
				if (visited[startIndex] === 1 || mapGrid[startIndex] !== room.gridValue) continue;

				const queue = [startIndex];
				visited[startIndex] = 1;
				let queueIndex = 0;
				let componentCount = 0;
				let sumX = 0;
				let sumY = 0;

				while (queueIndex < queue.length) {
					const currentIndex = queue[queueIndex++];
					const x = currentIndex % width;
					const y = Math.floor(currentIndex / width);

					componentCount += 1;
					sumX += x;
					sumY += y;

					for (const neighbor of Q10MapParser.getNeighbors(currentIndex, x, y, width, height)) {
						if (visited[neighbor] === 1 || mapGrid[neighbor] !== room.gridValue) continue;
						visited[neighbor] = 1;
						queue.push(neighbor);
					}
				}

				if (componentCount > bestCount) {
					bestCount = componentCount;
					bestCenter = {
						x: header.minX + (((sumX / componentCount) + 0.5) * header.resolution),
						y: header.minY + (((sumY / componentCount) + 0.5) * header.resolution)
					};
				}
			}

			if (bestCenter) {
				room.labelPos = bestCenter;
			}
		}
	}

	private static getNeighbors(index: number, x: number, y: number, width: number, height: number): number[] {
		const neighbors: number[] = [];
		if (x > 0) neighbors.push(index - 1);
		if (x + 1 < width) neighbors.push(index + 1);
		if (y > 0) neighbors.push(index - width);
		if (y + 1 < height) neighbors.push(index + width);
		return neighbors;
	}

	private static devicePointToAbsolute(point: B01Point, header: Q10Header): B01Point {
		return {
			x: header.xMinTop + point.x,
			y: header.yTop - point.y
		};
	}

	private static decodeRoomName(roomNameData: Uint8Array): string {
		let nameLength = Q10MapParser.readUIntBE(roomNameData, 0, 1);
		let decoded = "";

		while (!decoded && nameLength > 0 && nameLength <= 19) {
			decoded = Q10MapParser.decodeUtf8(roomNameData.subarray(1, 1 + nameLength)).trim();
			nameLength -= 1;
		}

		return decoded;
	}

	private static decodeUtf8(bytes: Uint8Array): string {
		try {
			return new TextDecoder("utf-8").decode(bytes);
		} catch {
			return Buffer.from(bytes).toString("utf8");
		}
	}

	private static byte2ToShort(byte1: number, byte2: number): number {
		const value = (byte1 << 8) | byte2;
		return value & 0x8000 ? value - 0x10000 : value;
	}

	private static readUIntBE(buf: Uint8Array, offset: number, length: number): number {
		if (offset + length > buf.length) return 0;
		let result = 0;
		for (let index = 0; index < length; index++) {
			const shift = 8 * (length - index - 1);
			result += (buf[offset + index] & 0xff) << shift;
		}
		return result >>> 0;
	}

	private static readInt16BE(buf: Uint8Array, offset: number): number {
		if (offset + 2 > buf.length) return 0;
		return Q10MapParser.byte2ToShort(buf[offset], buf[offset + 1]);
	}
}
