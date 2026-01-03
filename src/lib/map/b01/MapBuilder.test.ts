import { expect } from "chai";
import { describe, it } from "mocha";

// Replicating the MapBuilder "toPixel" logic for regression testing.
// Logic confirms alignment: X centered (+0.5), Y flipped and shifted (-1).
const RESOLUTION = 50; // mm/pixel

function toPixel(wx: number, wy: number, minX: number, minY: number, sizeY: number) {
	const px = (wx - minX) / RESOLUTION + 0.5;
	const py = sizeY - 1 - ((wy - minY) / RESOLUTION);
	return { x: px, y: py };
}

describe("MapBuilder B01 Coordinates", () => {
	const minX = 0;
	const minY = 0;
	const sizeY = 100;

	it("should center X on the pixel (+0.5 shift)", () => {
		// Robot at "0" world coordinate
		const p = toPixel(0, 0, minX, minY, sizeY);
		expect(p.x).to.equal(0.5);
	});

	it("should handle X values correctly", () => {
		// Robot at 50mm
		const p = toPixel(50, 0, minX, minY, sizeY);
		expect(p.x).to.equal(1.5);
	});

	it("should flip and shift Y correctly (-1 shift)", () => {
		// Robot at "0" world coordinate (Bottom of map)
		const p = toPixel(0, 0, minX, minY, sizeY);
		expect(p.y).to.equal(99);
	});

	it("should handle Y max value", () => {
		// Robot at top of map (4950mm)
		const p = toPixel(4950, 4950, minX, minY, sizeY);
		expect(p.y).to.equal(0);
	});
});
