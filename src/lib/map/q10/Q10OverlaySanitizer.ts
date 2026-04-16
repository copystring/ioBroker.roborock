import type { B01MapHeader } from "../b01/types";
import type { Q10SourceArea, Q10SourceData } from "./types";

function isFiniteNumber(value: number | undefined): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

function hasStructurallyValidPoints(area: Q10SourceArea): boolean {
	if (!area?.points?.length) return false;

	return area.points.every((point) => isFiniteNumber(point?.x) && isFiniteNumber(point?.y));
}

function isStructurallyValidArea(area: Q10SourceArea): boolean {
	if (!hasStructurallyValidPoints(area)) return false;

	if (area.type === "virtualWall") {
		return area.points.length === 2;
	}

	return area.points.length >= 3;
}

function filterOverlayAreas(areas: Q10SourceArea[]): Q10SourceArea[] {
	return areas.filter((area) => isStructurallyValidArea(area));
}

/**
 * The original Q10 app stores parsed overlay geometry directly on the live map
 * model. It does not apply map-bounds plausibility heuristics here.
 *
 * This sanitizer is intentionally minimal and only strips structurally invalid
 * data that would break later processing (missing / non-finite points, wrong
 * point count for line-vs-area geometry).
 */
export function sanitizeQ10SourceOverlayAreas(header: B01MapHeader, source: Q10SourceData): Q10SourceData {
	void header;

	const virtualWalls = filterOverlayAreas(source.virtualWalls);
	const forbidAreas = filterOverlayAreas(source.forbidAreas);
	const mopAreas = filterOverlayAreas(source.mopAreas);
	const thresholdAreas = filterOverlayAreas(source.thresholdAreas);
	const eraseAreas = filterOverlayAreas(source.eraseAreas);
	const carpetAreas = filterOverlayAreas(source.carpetAreas);

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
