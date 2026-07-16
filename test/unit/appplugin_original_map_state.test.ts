import { describe, expect, it } from "vitest";
import {
	clampMapTransform,
	moveRectangle,
	normalizeRectangle,
	ORIGINAL_SC_MAP_LIMITS,
	resizeRectangle,
	viewportToMapPoint,
	zoomMapAt,
} from "../../src/www/apppluginLab/original-map-state";

const bounds = { width: 970, height: 1025 };

describe("original SCMap interaction invariants", () => {
	it("uses the zoom limits and factor found in the original AppPlugin", () => {
		expect(ORIGINAL_SC_MAP_LIMITS).toMatchObject({ minScale: 1, maxScale: 8, zoomFactor: 0.015 });
		expect(clampMapTransform({ scale: 20, translateX: -20_000, translateY: 20 }, bounds)).toEqual({
			scale: 8,
			translateX: -6_790,
			translateY: 0,
		});
	});

	it("keeps the map coordinate below the pinch focus stable", () => {
		const focus = { x: 420, y: 360 };
		const zoomed = zoomMapAt({ scale: 1, translateX: 0, translateY: 0 }, 3.5, focus, bounds);
		expect(viewportToMapPoint(zoomed, focus)).toEqual(focus);
	});

	it("normalizes, moves and resizes editable zones inside map bounds", () => {
		const rectangle = normalizeRectangle({ x: 400, y: 300 }, { x: 200, y: 100 }, bounds);
		expect(rectangle).toEqual({ x: 200, y: 100, width: 200, height: 200 });
		expect(moveRectangle(rectangle, { x: -500, y: 1_000 }, bounds)).toEqual({ x: 0, y: 825, width: 200, height: 200 });
		expect(resizeRectangle(rectangle, "northWest", { x: 390, y: 290 }, bounds, 104)).toEqual({
			x: 296,
			y: 196,
			width: 104,
			height: 104,
		});
	});

});
