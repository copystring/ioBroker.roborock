//
// coords.ts
//

interface Point {
	x: number;
	y: number;
}

// Map parameters required for the calculations
interface MapParams {
	scaleFactor: number;
	left: number;
	topMap: number;
	mapMaxY: number;
	imageHeight: number;
}

export function localCoordsToRobotCoords(imagePoint: Point, params: MapParams): Point {
	const point: Point = { x: 0, y: 0 };

	point.x = Math.round((imagePoint.x / params.scaleFactor + params.left) * 50.0);
	point.y = Math.round((params.imageHeight / params.scaleFactor + params.topMap - imagePoint.y / params.scaleFactor) * 50.0);

	return point;
}

export function robotCoordsToLocalCoords(robotPoint: Point, params: MapParams): Point {
	const point: Point = { x: 0, y: 0 };

	point.x = Math.round((robotPoint.x / 50.0 - params.left) * params.scaleFactor);
	point.y = Math.round((params.imageHeight / params.scaleFactor + params.topMap - robotPoint.y / 50.0) * params.scaleFactor);
	return point;
}
