import type { B01DeviceStatus, B01MapData } from "../b01/types";
import { isB01DockAnchoredState } from "../b01/B01StateSemantics";
import { normalizeRoborockRoomDisplayName } from "../../roomNameNormalizer";
import { buildQ10Verification } from "./Q10Verification";
import type {
	Q10CreatorArea,
	Q10CreatorData,
	Q10CreatorLine,
	Q10CreatorObstacle,
	Q10CreatorPathPoint,
	Q10CreatorRoomModel,
	Q10CreatorRoomTangentInfo,
	Q10CreatorSelfIdentifiedCarpet,
	Q10CreatorSuspectedPoint,
	Q10DevicePoint,
	Q10DevicePose,
	Q10MapArrPoint,
	Q10MapPixelPoint,
	Q10SourceArea,
	Q10SourceData,
	Q10SourcePathPoint,
	Q10SourceRoom
} from "./types";

const ROOM_COLOR_COUNT = 4;
const ROOM_OTHER_MATERIAL = 3;
const Q10_DOCK_ANCHORED_OFFSET = 3.5;

interface RoomStat {
	roomID: number;
	count: number;
	sumX: number;
	sumY: number;
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;
	pixelIndices: number[];
}

interface RoomBorderEdge {
	id: number;
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	startKey: string;
	endKey: string;
}

function devicePointToPixel(source: Q10SourceData, point: Q10DevicePoint): Q10MapPixelPoint {
	return {
		// Q10 overlay coordinates are device-relative and need the app's
		// devicePointToOrigMap transform to land in map-array space.
		x: source.xMin + point.x,
		y: source.yMin - point.y
	};
}

function rotateVector(x: number, y: number, degrees: number): { x: number; y: number } {
	const radians = (degrees * Math.PI) / 180;
	const cos = Math.cos(radians);
	const sin = Math.sin(radians);
	return {
		x: x * cos - y * sin,
		y: x * sin + y * cos
	};
}

function shouldAnchorRobotToDock(deviceStatus?: B01DeviceStatus): boolean {
	return isB01DockAnchoredState(deviceStatus?.deviceState);
}

function mapArrPointToPixel(point: Q10MapArrPoint): Q10MapPixelPoint {
	return {
		x: point.x,
		y: point.y
	};
}

function sourceAreaToCreator(source: Q10SourceData, area: Q10SourceArea): Q10CreatorArea {
	return {
		id: area.id,
		type: area.type,
		areaType: area.areaType,
		name: area.name,
		points: area.points.map((point) => devicePointToPixel(source, point))
	};
}

function sourceLineToCreator(source: Q10SourceData, area: Q10SourceArea): Q10CreatorLine | null {
	if (area.points.length < 2) return null;
	return {
		id: area.id,
		type: "virtualWall",
		points: [
			devicePointToPixel(source, area.points[0]),
			devicePointToPixel(source, area.points[1])
		]
	};
}

function mapSourceAreas(source: Q10SourceData, areas: Q10SourceArea[]): Q10CreatorArea[] {
	return areas.map((area) => sourceAreaToCreator(source, area));
}

function mapSourceLines(source: Q10SourceData, areas: Q10SourceArea[]): Q10CreatorLine[] {
	return areas
		.map((area) => sourceLineToCreator(source, area))
		.filter((area): area is Q10CreatorLine => area !== null);
}

function isRoomValue(value: number): boolean {
	return value > 1 && value < 127;
}

function analyzeRoomStatsFromGrid(mapGrid: Buffer, width: number, height: number): Map<number, RoomStat> {
	const stats = new Map<number, RoomStat>();

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const value = mapGrid[y * width + x];
			if (!isRoomValue(value)) continue;

			const existing = stats.get(value) ?? {
				roomID: value,
				count: 0,
				sumX: 0,
				sumY: 0,
				minX: x,
				minY: y,
				maxX: x,
				maxY: y,
				pixelIndices: []
			};

			existing.count += 1;
			existing.sumX += x + 0.5;
			existing.sumY += y + 0.5;
			existing.minX = Math.min(existing.minX, x);
			existing.minY = Math.min(existing.minY, y);
			existing.maxX = Math.max(existing.maxX, x);
			existing.maxY = Math.max(existing.maxY, y);
			existing.pixelIndices.push(y * width + x);

			stats.set(value, existing);
		}
	}

	return stats;
}

function analyzeRoomStats(mapData: B01MapData, mapGrid = mapData.mapGrid): Map<number, RoomStat> {
	return analyzeRoomStatsFromGrid(mapGrid, mapData.header.sizeX, mapData.header.sizeY);
}

function getLineInterpolation(start: Q10MapPixelPoint, end: Q10MapPixelPoint): Q10MapPixelPoint[] {
	const result: Q10MapPixelPoint[] = [{ x: start.x, y: start.y }];
	const distance = Math.hypot(start.x - end.x, start.y - end.y);
	if (distance > 1) {
		const step = 1 / distance;
		let ratio = 0;
		let previous = start;
		for (let index = 0; index < distance; index++) {
			ratio += step;
			const point = {
				x: start.x + (end.x - start.x) * ratio,
				y: start.y + (end.y - start.y) * ratio
			};
			if (point.x !== previous.x || point.y !== previous.y) {
				result.push(point);
				previous = point;
			}
		}
	}
	result.push({ x: end.x, y: end.y });
	return result;
}

function getPointMapValue(point: Q10MapPixelPoint, mapGrid: Buffer, width: number, height: number): number {
	if (point.x < 0 || point.x >= width) return -9999;
	if (point.y < 0 || point.y >= height) return -9999;
	const x = Math.floor(point.x);
	const y = Math.floor(point.y);
	const index = y * width + x;
	if (index >= 0 && index < mapGrid.length) return mapGrid[index] ?? -9999;
	return -9999;
}

function getRoomCrossPoints(
	start: Q10MapPixelPoint,
	end: Q10MapPixelPoint,
	roomGridValue: number,
	mapGrid: Buffer,
	width: number,
	height: number
): Q10MapPixelPoint[] {
	const linePoints = getLineInterpolation(start, end);
	const result: Q10MapPixelPoint[] = [];

	for (let index = 0; index < linePoints.length; index++) {
		const point = linePoints[index]!;
		const roomValue = getPointMapValue(point, mapGrid, width, height);
		if (roomValue !== roomGridValue) continue;

		if (index > 0 && index < linePoints.length - 1) {
			const lastRoomValue = getPointMapValue(linePoints[index - 1]!, mapGrid, width, height);
			const nextRoomValue = getPointMapValue(linePoints[index + 1]!, mapGrid, width, height);
			if (lastRoomValue === roomGridValue && nextRoomValue === roomGridValue) continue;
		}

		if (!result.some((existing) => existing.x === point.x && existing.y === point.y)) {
			result.push(point);
		}
	}

	return result;
}

function fixRoomCrossPoints(points: Q10MapPixelPoint[]): Q10MapPixelPoint[] {
	if (points.length < 4) return points;

	const remaining = points.slice();
	const results: Q10MapPixelPoint[] = [];
	while (remaining.length >= 4) {
		const point1 = remaining[1]!;
		const point2 = remaining[2]!;
		const distance = Math.hypot(point1.x - point2.x, point1.y - point2.y);
		if (distance < 10) {
			remaining.splice(1, 2);
		} else {
			results.push(remaining[0]!, remaining[1]!);
			remaining.splice(0, 2);
		}
	}
	return results.concat(remaining);
}

function computeRoomLabelCenter(
	mapGrid: Buffer,
	mapWidth: number,
	mapHeight: number,
	roomGridValue: number,
	stat: RoomStat
): Q10MapPixelPoint {
	if (!stat.pixelIndices.length) {
		return {
			x: (stat.minX + stat.maxX) / 2,
			y: (stat.minY + stat.maxY) / 2
		};
	}

	let centerX = (stat.maxX + stat.minX) / 2;
	let centerY = (stat.maxY + stat.minY) / 2;

	let widthCrossPoints = getRoomCrossPoints(
		{ x: stat.minX - 1, y: centerY },
		{ x: stat.maxX + 1, y: centerY },
		roomGridValue,
		mapGrid,
		mapWidth,
		mapHeight
	);
	widthCrossPoints = fixRoomCrossPoints(widthCrossPoints);
	if (widthCrossPoints.length >= 2) {
		const point1 = widthCrossPoints[0]!;
		const point2 = widthCrossPoints[widthCrossPoints.length - 1]!;
		centerX = (point2.x + point1.x) / 2;
	}

	let heightCrossPoints = getRoomCrossPoints(
		{ x: centerX, y: stat.minY - 1 },
		{ x: centerX, y: stat.maxY + 1 },
		roomGridValue,
		mapGrid,
		mapWidth,
		mapHeight
	);
	heightCrossPoints = fixRoomCrossPoints(heightCrossPoints);
	if (heightCrossPoints.length >= 2) {
		const point1 = heightCrossPoints[0]!;
		const point2 = heightCrossPoints[heightCrossPoints.length - 1]!;
		centerY = (point2.y + point1.y) / 2;
		const centerRoomValue = getPointMapValue({ x: centerX, y: centerY }, mapGrid, mapWidth, mapHeight);
		if (centerRoomValue !== roomGridValue) {
			let maxSegmentIndex = 0;
			let maxDistance = 0;
			for (let index = 0; index < heightCrossPoints.length / 2; index++) {
				if (index * 2 + 1 > heightCrossPoints.length - 1) break;
				const start = heightCrossPoints[index * 2]!;
				const end = heightCrossPoints[index * 2 + 1]!;
				const distance = Math.hypot(start.x - end.x, start.y - end.y);
				if (distance > maxDistance) {
					maxDistance = distance;
					maxSegmentIndex = index;
				}
			}
			const start = heightCrossPoints[maxSegmentIndex * 2]!;
			const end = heightCrossPoints[maxSegmentIndex * 2 + 1]!;
			centerY = (end.y + start.y) / 2;
		}
	}

	return { x: centerX, y: centerY };
}

function polygonSignedArea(points: Q10MapPixelPoint[]): number {
	let area = 0;
	for (let index = 0; index < points.length; index++) {
		const current = points[index];
		const next = points[(index + 1) % points.length];
		area += current.x * next.y - next.x * current.y;
	}
	return area / 2;
}

function buildRoomBorderLoops(mapWidth: number, stat: RoomStat): Q10MapPixelPoint[][] {
	if (!stat.pixelIndices.length) return [];

	const occupied = new Set<number>(stat.pixelIndices);
	const edges: RoomBorderEdge[] = [];
	let nextEdgeId = 0;
	const pushEdge = (startX: number, startY: number, endX: number, endY: number): void => {
		edges.push({
			id: nextEdgeId++,
			startX,
			startY,
			endX,
			endY,
			startKey: `${startX},${startY}`,
			endKey: `${endX},${endY}`
		});
	};

	for (const pixelIndex of stat.pixelIndices) {
		const x = pixelIndex % mapWidth;
		const y = Math.floor(pixelIndex / mapWidth);
		const topIndex = pixelIndex - mapWidth;
		const rightIndex = pixelIndex + 1;
		const bottomIndex = pixelIndex + mapWidth;
		const leftIndex = pixelIndex - 1;

		if (y === 0 || !occupied.has(topIndex)) pushEdge(x, y, x + 1, y);
		if (x === mapWidth - 1 || !occupied.has(rightIndex)) pushEdge(x + 1, y, x + 1, y + 1);
		if (!occupied.has(bottomIndex)) pushEdge(x + 1, y + 1, x, y + 1);
		if (x === 0 || !occupied.has(leftIndex)) pushEdge(x, y + 1, x, y);
	}

	const outgoing = new Map<string, number[]>();
	for (const edge of edges) {
		const list = outgoing.get(edge.startKey) ?? [];
		list.push(edge.id);
		outgoing.set(edge.startKey, list);
	}

	const used = new Set<number>();
	const loops: Q10MapPixelPoint[][] = [];

	for (const edge of edges) {
		if (used.has(edge.id)) continue;

		const loop: Q10MapPixelPoint[] = [];
		const startKey = edge.startKey;
		let currentEdge = edge;

		while (true) {
			used.add(currentEdge.id);
			if (loop.length === 0) {
				loop.push({ x: currentEdge.startX, y: currentEdge.startY });
			}
			loop.push({ x: currentEdge.endX, y: currentEdge.endY });
			if (currentEdge.endKey === startKey) break;

			const nextCandidates = outgoing.get(currentEdge.endKey) ?? [];
			const nextEdgeId = nextCandidates.find((candidateId) => !used.has(candidateId));
			if (nextEdgeId === undefined) break;
			currentEdge = edges[nextEdgeId]!;
		}

		if (loop.length > 1) {
			const first = loop[0]!;
			const last = loop[loop.length - 1]!;
			if (first.x === last.x && first.y === last.y) loop.pop();
		}
		if (loop.length >= 3) loops.push(loop);
	}

	loops.sort((leftLoop, rightLoop) => Math.abs(polygonSignedArea(rightLoop)) - Math.abs(polygonSignedArea(leftLoop)));
	return loops;
}

function pointInPolygon(pointX: number, pointY: number, points: Q10MapPixelPoint[]): boolean {
	let inside = false;
	for (let index = 0, previous = points.length - 1; index < points.length; previous = index++) {
		const current = points[index]!;
		const prev = points[previous]!;
		const intersects =
			(current.y > pointY) !== (prev.y > pointY) &&
			pointX < ((prev.x - current.x) * (pointY - current.y)) / (prev.y - current.y) + current.x;
		if (intersects) inside = !inside;
	}
	return inside;
}

function buildClipEraseMapGrid(mapData: B01MapData, source: Q10SourceData): Buffer | undefined {
	if (!source.eraseAreas.length) return undefined;

	const width = mapData.header.sizeX;
	const height = mapData.header.sizeY;
	const clipEraseGrid = Buffer.from(mapData.mapGrid);
	const eraseAreas = mapSourceAreas(source, source.eraseAreas);

	for (const area of eraseAreas) {
		if (area.points.length < 3) continue;
		const xs = area.points.map((point) => point.x);
		const ys = area.points.map((point) => point.y);
		const startX = Math.max(0, Math.floor(Math.min(...xs)));
		const endX = Math.min(width - 1, Math.ceil(Math.max(...xs)));
		const startY = Math.max(0, Math.floor(Math.min(...ys)));
		const endY = Math.min(height - 1, Math.ceil(Math.max(...ys)));

		for (let y = startY; y <= endY; y++) {
			for (let x = startX; x <= endX; x++) {
				const index = y * width + x;
				if (!isRoomValue(clipEraseGrid[index] ?? 0)) continue;
				if (pointInPolygon(x + 0.5, y + 0.5, area.points)) {
					clipEraseGrid[index] = 1;
				}
			}
		}
	}

	return clipEraseGrid;
}

function buildRoomTangentInfo(mapGrid: Buffer, width: number, height: number): Q10CreatorRoomTangentInfo[] {
	const tangents = new Set<string>();

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const current = mapGrid[y * width + x] ?? 0;
			if (!isRoomValue(current)) continue;

			if (x + 1 < width) {
				const right = mapGrid[y * width + x + 1] ?? 0;
				if (isRoomValue(right) && right !== current) {
					const roomID1 = Math.min(current, right);
					const roomID2 = Math.max(current, right);
					tangents.add(`${roomID1}:${roomID2}`);
				}
			}

			if (y + 1 < height) {
				const bottom = mapGrid[(y + 1) * width + x] ?? 0;
				if (isRoomValue(bottom) && bottom !== current) {
					const roomID1 = Math.min(current, bottom);
					const roomID2 = Math.max(current, bottom);
					tangents.add(`${roomID1}:${roomID2}`);
				}
			}
		}
	}

	return Array.from(tangents)
		.map((entry) => {
			const [roomID1, roomID2] = entry.split(":").map((value) => Number(value));
			return { roomID1, roomID2, tangent: 1 as const };
		})
		.sort((left, right) => left.roomID1 - right.roomID1 || left.roomID2 - right.roomID2);
}

function findAdjacentRegions(mapGrid: Buffer, width: number, height: number, roomGridValues: number[]): number[][] {
	const roomIndexByGridValue = new Map<number, number>();
	roomGridValues.forEach((roomGridValue, index) => roomIndexByGridValue.set(roomGridValue, index));
	const roomNeighborInfo = roomGridValues.map((roomGridValue) => [roomGridValue, new Set<number>()] as const);

	for (let index = 0; index < mapGrid.length; index++) {
		const regionId = mapGrid[index];
		const roomIndex = roomIndexByGridValue.get(regionId);
		if (roomIndex == null) continue;

		const x = index % width;
		const y = Math.floor(index / width);
		const roomNeighbors = roomNeighborInfo[roomIndex]?.[1];
		if (!roomNeighbors) continue;

		for (let neighborY = y - 2; neighborY < y + 2; neighborY++) {
			for (let neighborX = x - 2; neighborX < x + 2; neighborX++) {
				if (neighborY === y || neighborX === x) continue;
				if (neighborY < 0 || neighborY >= height || neighborX < 0 || neighborX >= width) continue;

				const nextRoomId = mapGrid[width * neighborY + neighborX] ?? 0;
				if (nextRoomId === regionId || !roomIndexByGridValue.has(nextRoomId)) continue;
				roomNeighbors.add(nextRoomId);
			}
		}
	}

	const matrix = Array.from({ length: roomGridValues.length }, () => new Array(roomGridValues.length).fill(0));
	for (let row = 0; row < roomGridValues.length; row++) {
		const roomNeighbors = roomNeighborInfo[row]?.[1];
		if (!roomNeighbors) continue;
		for (const neighbor of roomNeighbors) {
			const col = roomIndexByGridValue.get(neighbor);
			if (col != null) matrix[row][col] = 1;
		}
	}

	return matrix;
}

function reColoringMap(nextArea: number, color: number, colorPlan: number[], matrix: number[][]): number[] {
	colorPlan[nextArea] = color;
	if (nextArea === colorPlan.length - 1) return Array.from(colorPlan);

	const candidateArea = nextArea + 1;
	const availableColors = [0, 1, 2, 3];
	for (let index = 0; index < matrix.length; index++) {
		if (matrix[candidateArea]?.[index] > 0 && colorPlan[index] >= 0) {
			const colorIndex = availableColors.indexOf(colorPlan[index]!);
			if (colorIndex !== -1) availableColors.splice(colorIndex, 1);
		}
	}

	for (const availableColor of availableColors) {
		const result = reColoringMap(candidateArea, availableColor, Array.from(colorPlan), matrix);
		if (result.every((entry) => entry !== -1)) return result;
	}

	return Array.from(colorPlan);
}

function buildRoomColorPlan(
	roomGridValues: number[],
	matrix: number[][],
	roomCounts: ReadonlyMap<number, number>
): Map<number, number> {
	const roomColorMap = new Map<number, number>();
	if (!roomGridValues.length) return roomColorMap;

	let maxRoomIndex = -1;
	let maxRoomCount = -1;
	for (let index = 0; index < roomGridValues.length; index++) {
		const count = roomCounts.get(roomGridValues[index]!) ?? 0;
		if (count > maxRoomCount) {
			maxRoomCount = count;
			maxRoomIndex = index;
		}
	}

	if (roomGridValues.length <= ROOM_COLOR_COUNT) {
		let colorIndex = 1;
		for (let index = 0; index < roomGridValues.length; index++) {
			roomColorMap.set(roomGridValues[index]!, index === maxRoomIndex ? 0 : colorIndex++);
		}
		return roomColorMap;
	}

	const colorPlan = reColoringMap(0, 0, new Array(roomGridValues.length).fill(-1), matrix).map((value) => value === -1 ? 3 : value);
	const usedColors = Array.from(new Set(colorPlan));
	const unusedColors = [0, 1, 2, 3].filter((color) => !usedColors.includes(color));

	if (usedColors.length < ROOM_COLOR_COUNT) {
		for (const unusedColor of unusedColors) {
			for (const usedColor of usedColors) {
				let seen = 0;
				let filled = false;
				for (let index = 0; index < colorPlan.length; index++) {
					if (colorPlan[index] === usedColor) seen++;
					if (seen > 1) {
						colorPlan[index] = unusedColor;
						filled = true;
						break;
					}
				}
				if (filled) break;
			}
		}
	}

	for (let index = 0; index < roomGridValues.length; index++) {
		roomColorMap.set(roomGridValues[index]!, colorPlan[index] ?? 0);
	}

	const maxRoomColorId = roomColorMap.get(roomGridValues[maxRoomIndex]!) ?? 0;
	if (maxRoomColorId === 0) return roomColorMap;

	for (const roomGridValue of roomGridValues) {
		const currentColorId = roomColorMap.get(roomGridValue) ?? 0;
		if (currentColorId === 0) roomColorMap.set(roomGridValue, maxRoomColorId);
		else if (currentColorId === maxRoomColorId) roomColorMap.set(roomGridValue, 0);
	}

	return roomColorMap;
}

function parseSerializedRoomColorPlan(
	planStr: string | undefined,
	logicalRoomIdByGridValue: ReadonlyMap<number, number>
): Map<number, number> | null {
	if (!planStr?.trim()) return null;

	try {
		const plan = JSON.parse(planStr) as Array<{ roomID?: unknown; colorID?: unknown }>;
		if (!Array.isArray(plan) || !plan.length) return null;

		const gridValueByRoomId = new Map<number, number>();
		for (const [gridValue, roomId] of logicalRoomIdByGridValue.entries()) {
			gridValueByRoomId.set(roomId, gridValue);
		}

		const colorMap = new Map<number, number>();
		for (const entry of plan) {
			const roomID = Number(entry?.roomID);
			const colorID = Number(entry?.colorID);
			if (!Number.isInteger(roomID) || !Number.isInteger(colorID)) continue;
			if (colorID < 0 || colorID >= ROOM_COLOR_COUNT) continue;
			const gridValue = gridValueByRoomId.get(roomID);
			if (gridValue == null) continue;
			colorMap.set(gridValue, colorID);
		}

		return colorMap.size ? colorMap : null;
	} catch {
		return null;
	}
}

function serializeRoomColorPlan(roomModels: ReadonlyArray<Q10CreatorRoomModel>): string {
	return JSON.stringify(
		roomModels.map((room) => ({
			roomID: room.roomID,
			colorID: room.colorID
		}))
	);
}

function buildRoomModels(
	mapData: B01MapData,
	source: Q10SourceData,
	getDefaultRoomName?: () => string | undefined,
	mapGrid = mapData.mapGrid
): Q10CreatorRoomModel[] {
	const roomMeta = new Map<number, Q10SourceRoom>();
	for (const room of source.rooms) roomMeta.set(room.roomID, room);
	const logicalRoomIdByGridValue = new Map<number, number>();
	for (const room of mapData.rooms ?? []) {
		if (room.gridValue != null) logicalRoomIdByGridValue.set(room.gridValue, room.roomId);
	}

	const mapWidth = mapData.header.sizeX;
	const stats = analyzeRoomStats(mapData, mapGrid);
	const roomGridValues = Array.from(stats.keys());
	const roomCounts = new Map<number, number>();
	for (const [roomGridValue, stat] of stats) roomCounts.set(roomGridValue, stat.count);
	const roomColorPlan =
		parseSerializedRoomColorPlan(source.tempRoomColorPlanStr, logicalRoomIdByGridValue) ??
		buildRoomColorPlan(
			roomGridValues,
			findAdjacentRegions(mapGrid, mapData.header.sizeX, mapData.header.sizeY, roomGridValues),
			roomCounts
		);

	return roomGridValues.map((gridValue, index) => {
		const stat = stats.get(gridValue);
		if (!stat) {
			throw new Error(`Missing room stats for Q10 grid value ${gridValue}`);
		}
		const logicalRoomID = logicalRoomIdByGridValue.get(gridValue) ?? (gridValue - 1);
		const meta = roomMeta.get(logicalRoomID);
		const centerPoint = computeRoomLabelCenter(
			mapGrid,
			mapWidth,
			mapData.header.sizeY,
			gridValue,
			stat
		);
		const borderArr = buildRoomBorderLoops(mapWidth, stat);

		return {
			roomID: logicalRoomID,
			gridValue,
			roomName: normalizeRoborockRoomDisplayName(meta?.roomName, getDefaultRoomName),
			roomType: meta?.roomType ?? 0,
			roomMaterial: meta?.roomMaterial ?? ROOM_OTHER_MATERIAL,
			cleanOrder: meta?.cleanOrder ?? 0,
			cleanCount: meta?.cleanCount ?? 0,
			funLevel: meta?.funLevel ?? -1,
			waterLevel: meta?.waterLevel ?? -1,
			cleanType: meta?.cleanType ?? -1,
			cleanLine: meta?.cleanLine ?? 0,
			colorID: roomColorPlan.get(gridValue) ?? (index % ROOM_COLOR_COUNT),
			centerPoint,
			transCenterPoint: centerPoint,
			borderArr,
			borderEdge: {
				left: stat.minX,
				top: stat.minY,
				right: stat.maxX + 1,
				bottom: stat.maxY + 1
			},
			bounds: {
				left: stat.minX,
				top: stat.minY,
				right: stat.maxX + 1,
				bottom: stat.maxY + 1
			}
		};
	});
}

function buildObstaclePixels(
	source: Q10SourceData,
	entries: { point: Q10DevicePoint; type?: "obstacle" | "skip" }[],
	type: "obstacle" | "skip"
): Q10CreatorObstacle[] {
	return entries.map((entry) => ({
		type,
		point: devicePointToPixel(source, entry.point)
	}));
}

function buildSuspectedPixels(source: Q10SourceData): Q10CreatorSuspectedPoint[] {
	return source.suspectedPoints.map((entry) => ({
		type: entry.type,
		point: devicePointToPixel(source, entry.point)
	}));
}

function q10PathTypeToHistoryUpdate(type: number | undefined): number {
	if (type === 0) return 6;
	if (type === 1) return 4;
	if (type === 2 || type === 4) return 5;
	return 0;
}

function buildPathPixels(source: Q10SourceData): Q10CreatorPathPoint[] {
	return source.pathPoints.map((point: Q10SourcePathPoint) => ({
		...devicePointToPixel(source, point),
		type: point.type,
		update: point.update ?? q10PathTypeToHistoryUpdate(point.type)
	}));
}

function buildMaterialPathGroup(polygons: Q10MapArrPoint[][] | undefined): Q10MapPixelPoint[][] {
	if (!polygons?.length) return [];
	return polygons.map((polygon) => polygon.map((point) => mapArrPointToPixel(point)));
}

function buildSelfIdentifiedCarpets(data: B01MapData): Q10CreatorSelfIdentifiedCarpet[] {
	if (!data.carpetGrid?.length) return [];

	const width = data.header.sizeX;
	const height = data.header.sizeY;
	const visited = new Uint8Array(width * height);
	const queueX = new Int32Array(width * height);
	const queueY = new Int32Array(width * height);
	const carpets: Q10CreatorSelfIdentifiedCarpet[] = [];
	let nextId = 1;
	const isCarpetCell = (index: number): boolean => (((data.carpetGrid?.[index] ?? 0) & 0x3f) !== 0);

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const startIndex = y * width + x;
			if (visited[startIndex] || !isCarpetCell(startIndex)) continue;

			let head = 0;
			let tail = 0;
			let left = x;
			let top = y;
			let right = x;
			let bottom = y;
			const indices: number[] = [];

			visited[startIndex] = 1;
			queueX[tail] = x;
			queueY[tail] = y;
			tail++;

			while (head < tail) {
				const currentX = queueX[head];
				const currentY = queueY[head];
				head++;
				indices.push(currentY * width + currentX);

				left = Math.min(left, currentX);
				top = Math.min(top, currentY);
				right = Math.max(right, currentX);
				bottom = Math.max(bottom, currentY);

				const neighbors = [
					[currentX - 1, currentY],
					[currentX + 1, currentY],
					[currentX, currentY - 1],
					[currentX, currentY + 1]
				] as const;

				for (const [nextX, nextY] of neighbors) {
					if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue;
					const nextIndex = nextY * width + nextX;
					if (visited[nextIndex] || !isCarpetCell(nextIndex)) continue;
					visited[nextIndex] = 1;
					queueX[tail] = nextX;
					queueY[tail] = nextY;
					tail++;
				}
			}

			const carpetID = nextId++;
			const localWidth = right - left + 1;
			const localHeight = bottom - top + 1;
			const mask = Buffer.alloc(localWidth * localHeight);
			for (const index of indices) {
				const localX = (index % width) - left;
				const localY = Math.floor(index / width) - top;
				mask[localY * localWidth + localX] = data.carpetGrid[index] & 0x3f;
			}
			carpets.push({
				id: carpetID,
				carpetID,
				left,
				top,
				right: right + 1,
				bottom: bottom + 1,
				width: localWidth,
				height: localHeight,
				lt: { x: left, y: top },
				rb: { x: right + 1, y: bottom + 1 },
				mask
			});
		}
	}

	return carpets;
}

function withVerification(mapData: B01MapData, q10CreatorData: Q10CreatorData): B01MapData {
	const nextMapData = { ...mapData, q10CreatorData };
	return {
		...nextMapData,
		q10Verification: buildQ10Verification(nextMapData)
	};
}

export class Q10MapCreator {
	constructor(
		private readonly deps?: {
			translationManager?: {
				get: (key: string, defaultVal?: string) => string;
			};
		}
	) {}

	private getDefaultRoomName(): string | undefined {
		return this.deps?.translationManager?.get("default_room_name");
	}

	private applyRuntimePose(
		mapData: B01MapData,
		source: Q10SourceData,
		creatorData: Q10CreatorData,
		deviceStatus?: B01DeviceStatus
	): { nextMapData: B01MapData; nextSource: Q10SourceData; nextCreatorData: Q10CreatorData } {
		if (
			!creatorData.chargerPixel ||
			!source.chargePosition ||
			!shouldAnchorRobotToDock(deviceStatus)
		) {
			return {
				nextMapData: mapData,
				nextSource: source,
				nextCreatorData: creatorData
			};
		}

		const chargerPhi = source.chargePosition.phi ?? creatorData.chargerPixel.phi ?? 0;
		const offset = rotateVector(Q10_DOCK_ANCHORED_OFFSET, 0, chargerPhi);
		const robotDevicePose: Q10DevicePose = {
			x: source.chargePosition.x + offset.x,
			y: source.chargePosition.y + offset.y,
			phi: chargerPhi
		};
		const robotPixel = devicePointToPixel(source, robotDevicePose);
		const robotWorld = {
			x: mapData.header.minX + robotDevicePose.x,
			y: mapData.header.maxY - robotDevicePose.y,
			phi: chargerPhi
		};

		return {
			nextMapData: {
				...mapData,
				robotPos: robotWorld
			},
			nextSource: {
				...source,
				robotPosition: robotDevicePose
			},
			nextCreatorData: {
				...creatorData,
				robotPixel: {
					...robotPixel,
					phi: chargerPhi
				}
			}
		};
	}

	public create(mapData: B01MapData, deviceStatus?: B01DeviceStatus): B01MapData {
		if (!mapData?.header || !mapData.mapGrid?.length) return mapData;

		const source = mapData.q10SourceData;
		if (!source) {
			throw new Error("Q10 source data missing. Refusing synthetic creator fallback.");
		}

		const roomModels = buildRoomModels(mapData, source, () => this.getDefaultRoomName());
		const clipEraseMapGrid = buildClipEraseMapGrid(mapData, source);
		const clipEraseRoomModels = clipEraseMapGrid ? buildRoomModels(mapData, source, () => this.getDefaultRoomName(), clipEraseMapGrid) : [];
		const roomTangentInfo = buildRoomTangentInfo(mapData.mapGrid, mapData.header.sizeX, mapData.header.sizeY);
		const clipEraseRoomTangentInfo = clipEraseMapGrid
			? buildRoomTangentInfo(clipEraseMapGrid, mapData.header.sizeX, mapData.header.sizeY)
			: [];
		const roomMaterialRoomIds = {
			ceramicTile: roomModels.filter((room) => room.roomMaterial === 2).map((room) => room.gridValue),
			horizontalFloorBoard: roomModels.filter((room) => room.roomMaterial === 0).map((room) => room.gridValue),
			verticalFloorBoard: roomModels.filter((room) => room.roomMaterial === 1).map((room) => room.gridValue),
			other: roomModels
				.filter((room) => room.roomMaterial !== 0 && room.roomMaterial !== 1 && room.roomMaterial !== 2)
				.map((room) => room.gridValue)
		};

		const nextSource: Q10SourceData = {
			...source
		};

		const q10CreatorData: Q10CreatorData = {
			q10Detected: true,
			mapRate: nextSource.mapRate,
			mapWidth: nextSource.mapWidth,
			mapHeight: nextSource.mapHeight,
			roomModels,
			clipEraseRoomModels,
			eraseAreas: mapSourceAreas(nextSource, nextSource.eraseAreas),
			virtualWalls: mapSourceLines(nextSource, nextSource.virtualWalls),
			forbidAreas: mapSourceAreas(nextSource, nextSource.forbidAreas),
			mopAreas: mapSourceAreas(nextSource, nextSource.mopAreas),
			thresholdAreas: mapSourceAreas(nextSource, nextSource.thresholdAreas),
			carpetAreas: mapSourceAreas(nextSource, nextSource.carpetAreas),
			pathPixels: buildPathPixels(nextSource),
			obstaclePixels: buildObstaclePixels(nextSource, nextSource.obstacles, "obstacle"),
			skipPixels: buildObstaclePixels(nextSource, nextSource.skipPoints, "skip"),
			suspectedPoints: buildSuspectedPixels(nextSource),
			selfIdentifiedCarpets: buildSelfIdentifiedCarpets(mapData),
			roomTangentInfo,
			clipEraseRoomTangentInfo,
			clipEraseMapGrid,
			materialPaths: {
				ceramicTile: buildMaterialPathGroup(nextSource.mapCeramicTilePath),
				horizontalFloorBoard: buildMaterialPathGroup(nextSource.mapHorizontalFloorBoardPath),
				verticalFloorBoard: buildMaterialPathGroup(nextSource.mapVerticalFloorBoardPath)
			},
			roomMaterialRoomIds
		};

		if (!nextSource.tempRoomColorPlanStr) {
			nextSource.tempRoomColorPlanStr = serializeRoomColorPlan(roomModels);
		}
		if (clipEraseRoomModels.length && !nextSource.tempClipEraseRoomColorPlanStr) {
			nextSource.tempClipEraseRoomColorPlanStr = serializeRoomColorPlan(clipEraseRoomModels);
		}

		if (nextSource.chargePosition) {
			q10CreatorData.chargerPixel = {
				...devicePointToPixel(nextSource, nextSource.chargePosition),
				phi: nextSource.chargePosition.phi
			};
		}

		if (nextSource.robotPosition) {
			q10CreatorData.robotPixel = {
				...devicePointToPixel(nextSource, nextSource.robotPosition),
				phi: nextSource.robotPosition.phi
			};
		}

		const { nextMapData, nextSource: runtimeSource, nextCreatorData } =
			this.applyRuntimePose(mapData, nextSource, q10CreatorData, deviceStatus);

		return withVerification({
			...nextMapData,
			q10SourceData: runtimeSource
		}, nextCreatorData);
	}
}
