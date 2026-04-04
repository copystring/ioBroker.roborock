import type { B01MapHeader } from "../b01/types";
import type { Q10SourceArea, Q10SourceData } from "./types";

interface Q10MapPoint {
	x: number;
	y: number;
}

interface Q10MapBounds {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
}

function toMapPoint(source: Q10SourceData, point: { x: number; y: number }): Q10MapPoint {
	return {
		x: source.xMin + point.x,
		y: source.yMin - point.y
	};
}

function isFiniteMapPoint(point: Q10MapPoint): boolean {
	return Number.isFinite(point.x) && Number.isFinite(point.y);
}

function intersectsBounds(a: Q10MapBounds, b: Q10MapBounds): boolean {
	return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}

function isPlausibleOverlayArea(header: B01MapHeader, source: Q10SourceData, area: Q10SourceArea): boolean {
	if (!area?.points?.length) return false;

	const mapPoints = area.points.map((point) => toMapPoint(source, point));
	if (!mapPoints.every((point) => isFiniteMapPoint(point))) return false;
	const isVirtualWall = area.type === "virtualWall" && area.points.length === 2;

	const xs = mapPoints.map((point) => point.x);
	const ys = mapPoints.map((point) => point.y);
	const minPointX = Math.min(...xs);
	const maxPointX = Math.max(...xs);
	const minPointY = Math.min(...ys);
	const maxPointY = Math.max(...ys);

	const spanX = Math.max(1, source.mapWidth || Math.round((header.maxX - header.minX) / Math.max(header.resolution, 0.01)));
	const spanY = Math.max(1, source.mapHeight || Math.round((header.maxY - header.minY) / Math.max(header.resolution, 0.01)));
	const marginX = Math.max(4, spanX * 0.25);
	const marginY = Math.max(4, spanY * 0.25);
	const maxOverlaySpanX = isVirtualWall ? spanX * 3 : spanX + marginX * 2;
	const maxOverlaySpanY = isVirtualWall ? spanY * 3 : spanY + marginY * 2;

	if (maxPointX - minPointX > maxOverlaySpanX) return false;
	if (maxPointY - minPointY > maxOverlaySpanY) return false;

	const expandedMinX = -marginX;
	const expandedMaxX = spanX + marginX;
	const expandedMinY = -marginY;
	const expandedMaxY = spanY + marginY;

	return intersectsBounds(
		{
			minX: minPointX,
			maxX: maxPointX,
			minY: minPointY,
			maxY: maxPointY
		},
		{
			minX: expandedMinX,
			maxX: expandedMaxX,
			minY: expandedMinY,
			maxY: expandedMaxY
		}
	);
}

function filterOverlayAreas(header: B01MapHeader, source: Q10SourceData, areas: Q10SourceArea[]): Q10SourceArea[] {
	return areas.filter((area) => isPlausibleOverlayArea(header, source, area));
}

export function sanitizeQ10SourceOverlayAreas(header: B01MapHeader, source: Q10SourceData): Q10SourceData {
	const virtualWalls = filterOverlayAreas(header, source, source.virtualWalls);
	const forbidAreas = filterOverlayAreas(header, source, source.forbidAreas);
	const mopAreas = filterOverlayAreas(header, source, source.mopAreas);
	const thresholdAreas = filterOverlayAreas(header, source, source.thresholdAreas);
	const eraseAreas = filterOverlayAreas(header, source, source.eraseAreas);
	const carpetAreas = filterOverlayAreas(header, source, source.carpetAreas);

	const changed =
		virtualWalls.length !== source.virtualWalls.length ||
		forbidAreas.length !== source.forbidAreas.length ||
		mopAreas.length !== source.mopAreas.length ||
		thresholdAreas.length !== source.thresholdAreas.length ||
		eraseAreas.length !== source.eraseAreas.length ||
		carpetAreas.length !== source.carpetAreas.length;

	if (!changed) return source;

	return {
		...source,
		virtualWalls,
		forbidAreas,
		mopAreas,
		thresholdAreas,
		eraseAreas,
		carpetAreas
	};
}
