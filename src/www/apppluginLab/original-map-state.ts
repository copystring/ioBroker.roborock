export interface MapPoint {
	x: number;
	y: number;
}

export interface MapTransformState {
	scale: number;
	translateX: number;
	translateY: number;
}

export interface MapBounds {
	width: number;
	height: number;
}

export interface MapRectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}

export type RectangleHandle = "northWest" | "northEast" | "southEast" | "southWest";

export const ORIGINAL_SC_MAP_LIMITS = {
	minScale: 1,
	maxScale: 8,
	zoomFactor: 0.015,
	maxCleanZones: 5,
	maxVirtualAreas: 10,
	maxVirtualWalls: 10,
	virtualAreaDefaultSize: 128,
	virtualAreaMinSize: 104,
	virtualWallDefaultWidth: 96,
	virtualWallMinWidth: 60,
} as const;

export function clamp(value: number, minimum: number, maximum: number): number {
	return Math.min(maximum, Math.max(minimum, value));
}

export function clampMapTransform(state: MapTransformState, bounds: MapBounds): MapTransformState {
	const scale = clamp(state.scale, ORIGINAL_SC_MAP_LIMITS.minScale, ORIGINAL_SC_MAP_LIMITS.maxScale);
	return {
		scale,
		translateX: clamp(state.translateX, bounds.width * (1 - scale), 0),
		translateY: clamp(state.translateY, bounds.height * (1 - scale), 0),
	};
}

export function zoomMapAt(
	state: MapTransformState,
	targetScale: number,
	focus: MapPoint,
	bounds: MapBounds,
): MapTransformState {
	const scale = clamp(targetScale, ORIGINAL_SC_MAP_LIMITS.minScale, ORIGINAL_SC_MAP_LIMITS.maxScale);
	const mapX = (focus.x - state.translateX) / state.scale;
	const mapY = (focus.y - state.translateY) / state.scale;
	return clampMapTransform({
		scale,
		translateX: focus.x - mapX * scale,
		translateY: focus.y - mapY * scale,
	}, bounds);
}

export function panMapBy(
	state: MapTransformState,
	delta: MapPoint,
	bounds: MapBounds,
): MapTransformState {
	return clampMapTransform({
		...state,
		translateX: state.translateX + delta.x,
		translateY: state.translateY + delta.y,
	}, bounds);
}

export function viewportToMapPoint(state: MapTransformState, point: MapPoint): MapPoint {
	return {
		x: (point.x - state.translateX) / state.scale,
		y: (point.y - state.translateY) / state.scale,
	};
}

export function normalizeRectangle(start: MapPoint, end: MapPoint, bounds: MapBounds): MapRectangle {
	const x1 = clamp(Math.min(start.x, end.x), 0, bounds.width);
	const y1 = clamp(Math.min(start.y, end.y), 0, bounds.height);
	const x2 = clamp(Math.max(start.x, end.x), 0, bounds.width);
	const y2 = clamp(Math.max(start.y, end.y), 0, bounds.height);
	return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
}

export function moveRectangle(rectangle: MapRectangle, delta: MapPoint, bounds: MapBounds): MapRectangle {
	return {
		...rectangle,
		x: clamp(rectangle.x + delta.x, 0, bounds.width - rectangle.width),
		y: clamp(rectangle.y + delta.y, 0, bounds.height - rectangle.height),
	};
}

export function resizeRectangle(
	rectangle: MapRectangle,
	handle: RectangleHandle,
	point: MapPoint,
	bounds: MapBounds,
	minimumSize: number,
): MapRectangle {
	let left = rectangle.x;
	let top = rectangle.y;
	let right = rectangle.x + rectangle.width;
	let bottom = rectangle.y + rectangle.height;
	if (handle === "northWest" || handle === "southWest") left = clamp(point.x, 0, right - minimumSize);
	if (handle === "northEast" || handle === "southEast") right = clamp(point.x, left + minimumSize, bounds.width);
	if (handle === "northWest" || handle === "northEast") top = clamp(point.y, 0, bottom - minimumSize);
	if (handle === "southWest" || handle === "southEast") bottom = clamp(point.y, top + minimumSize, bounds.height);
	return { x: left, y: top, width: right - left, height: bottom - top };
}
