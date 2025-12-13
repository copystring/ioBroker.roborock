// src/www/coords.ts

// The true physical scale (50mm/pixel) used by Roborock
const MM_PER_PIXEL = 50;

interface Point {
	x: number;
	y: number;
}

// Map parameters required for the calculations
interface MapParams {
	scaleFactor: number; // Config scale (e.g., 8) - used for visual scaling only
	left: number; // Unscaled Pixel Offset X
	topMap: number; // Unscaled Pixel Offset Y
	imageHeight: number; // Unscaled Pixel Height
}

/**
 * Converts LOCAL "world" pixel coordinates (px, Y-down) back to ROBOT coordinates (mm).
 * Used for Click-Tests, GoTo, and Zones.
 */
export function localCoordsToRobotCoords(localPoint: Point, params: MapParams): Point {
	if (!params) return { x: 0, y: 0 };

	// X-Axis: (Unscaled Pixel X + Offset X) * 50
	const robotX = Math.round((localPoint.x / params.scaleFactor + params.left) * MM_PER_PIXEL);

	// Y-Axis (Inverted Logic):
	// y = H - (C - RobotY)*S
	// RobotY = C - (H - y)/S = Top + y/S
	// Note: C includes H/S which cancels out H/S

	const robotY = Math.round((params.topMap + localPoint.y / params.scaleFactor) * MM_PER_PIXEL);

	return { x: robotX, y: robotY };
}

/**
 * Converts ROBOT coordinates (mm) to LOCAL "world" pixel coordinates (px, Y-down).
 * This is used to DRAW things on the map.
 */
export function robotCoordsToLocalCoords(robotPoint: Point, params: MapParams): Point {
	if (!params) return { x: 0, y: 0 };

	// X-Axis: (mm / 50 - Offset px) * scale
	const worldX = (robotPoint.x / MM_PER_PIXEL - params.left) * params.scaleFactor;

	// Y-Axis (Inverted Logic to match Backend): H_scaled - ((H_unscaled + Top - Y_mm/50) * scale)
	// This matches mapCreator.ts: dimensions.height - ...
	const unscaledY = params.imageHeight / params.scaleFactor + params.topMap - robotPoint.y / MM_PER_PIXEL;
	const worldY = params.imageHeight - unscaledY * params.scaleFactor;

	return { x: worldX, y: worldY };
}
