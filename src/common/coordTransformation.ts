
export interface TransformationParams {
    x: number;      // Input X (robot coord in mm)
    y: number;      // Input Y (robot coord in mm)
    minX: number;   // Map offset X (in mm)
    minY: number;   // Map offset Y (in mm)
    sizeY: number;  // Map Height (in grid/pixel units)
    resolution: number; // mm per pixel (usually 50)
    scale: number;  // Visual scale factor (e.g. 1, 3, 8)
}

/**
 * Transforms Robot Coordinate (mm) to Visual Pixel Coordinate
 * Matches logic from MapBuilder.ts (Backend)
 */
export function robotToPixel(params: TransformationParams): { x: number, y: number } {
	const { x, y, minX, minY, sizeY, resolution, scale } = params;

	// Calculate unscaled grid coordinates (with 0.5 centering from MapBuilder)
	// Formula: (wx - minX) / res + 0.5
	const px = (x - minX) / resolution + 0.5;

	// Formula: sizeY - ((wy - minY) / res) - 0.5
	const py = sizeY - ((y - minY) / resolution) - 0.5;

	// Apply visual scale
	return {
		x: px * scale,
		y: py * scale
	};
}

export interface InverseTransformationParams {
    x: number;      // Visual Pixel X
    y: number;      // Visual Pixel Y
    minX: number;   // Map offset X (in mm)
    minY: number;   // Map offset Y (in mm)
    sizeY: number;  // Map Height (in grid/pixel units)
    resolution: number; // mm per pixel
    scale: number;  // Visual scale factor
}

/**
 * Transforms Visual Pixel Coordinate to Robot Coordinate (mm)
 * Inverse of robotToPixel
 */
export function pixelToRobot(params: InverseTransformationParams): { x: number, y: number } {
	const { x, y, minX, minY, sizeY, resolution, scale } = params;

	const px_unscaled = x / scale;
	const py_unscaled = y / scale;

	// Inverse X: px = (robX - minX) / res + 0.5
	// robX = (px - 0.5) * res + minX
	const robotX = (px_unscaled - 0.5) * resolution + minX;

	// Inverse Y: py = sizeY - ((robY - minY) / res) - 0.5
	// py + 0.5 = sizeY - ((robY - minY) / res)
	// ((robY - minY) / res) = sizeY - (py + 0.5)
	// robY - minY = (sizeY - py - 0.5) * res
	// robY = (sizeY - py - 0.5) * res + minY
	const robotY = (sizeY - py_unscaled - 0.5) * resolution + minY;

	return { x: robotX, y: robotY };
}

// -----------------------------------------------------------------------------
// Frontend Helpers (formerly coords.ts)
// -----------------------------------------------------------------------------

// The true physical scale (50mm/pixel) used by Roborock
const MM_PER_PIXEL = 50;

export const VISUAL_BLOCK_SIZE = 3;

interface Point {
    x: number;
    y: number;
}

// Map parameters required for the calculations
export interface MapParams {
    scaleFactor: number; // Config scale (e.g., 8) - used for visual scaling only
    left: number; // Unscaled Pixel Offset X
    topMap: number; // Unscaled Pixel Offset Y
    imageHeight: number; // Unscaled Pixel Height
    mapMaxY?: number; // Fallback height from content scan
}

/**
 * Converts LOCAL "world" pixel coordinates (px, Y-down) back to ROBOT coordinates (mm).
 * Used for Click-Tests, GoTo, and Zones.
 */
export function localCoordsToRobotCoords(localPoint: Point, params: MapParams): Point {
	if (!params) return { x: 0, y: 0 };

	const height = (params.imageHeight || params.mapMaxY || 1024) / params.scaleFactor;

	// params.left/topMap are in Grid Units (Pixels). Shared Lib expects mm.
	// Convert: mm = pixels * 50
	const minX_mm = params.left * MM_PER_PIXEL;
	const minY_mm = params.topMap * MM_PER_PIXEL;

	const result = pixelToRobot({
		x: localPoint.x,
		y: localPoint.y,
		minX: minX_mm,
		minY: minY_mm,
		sizeY: height,
		resolution: MM_PER_PIXEL,
		scale: params.scaleFactor // e.g. 3
	});

	return { x: Math.round(result.x), y: Math.round(result.y) };
}

/**
 * Converts ROBOT coordinates (mm) to LOCAL "world" pixel coordinates (px, Y-down).
 * This is used to DRAW things on the map.
 */
export function robotCoordsToLocalCoords(robotPoint: Point, params: MapParams): Point {
	if (!params) return { x: 0, y: 0 };

	const height = (params.imageHeight || params.mapMaxY || 1024) / VISUAL_BLOCK_SIZE;

	const minX_mm = params.left * MM_PER_PIXEL;
	const minY_mm = params.topMap * MM_PER_PIXEL;

	return robotToPixel({
		x: robotPoint.x,
		y: robotPoint.y,
		minX: minX_mm,
		minY: minY_mm,
		sizeY: height,
		resolution: MM_PER_PIXEL,
		scale: VISUAL_BLOCK_SIZE // params.scaleFactor might be 3, check VISUAL_BLOCK_SIZE
	});
}
