import { describe, it } from "vitest";
import { expect } from "chai";
import { localCoordsToRobotCoords, robotCoordsToLocalCoords, VISUAL_BLOCK_SIZE, GRID_CENTER_OFFSET } from "./coords";

// --- Mock Data (Scale = 3 matches reality) ---
const MOCK_PARAMS = {
	scaleFactor: 3,       // VISUAL_BLOCK_SIZE
	left: 284,            // map.IMAGE.position.left
	topMap: 364,          // map.IMAGE.position.top
	imageHeight: 2880,    // map.IMAGE.dimensions.height
	imageWidth: 2880,
	mapMaxY: 0
};

// Known Point: Robot @ (25105, 25749)
// Let's manually calculate expected WORLD pixel
// X = (25105 / 50 - 284) * 3 + 1.5
// X = (502.1 - 284) * 3 + 1.5 = 218.1 * 3 + 1.5 = 654.3 + 1.5 = 655.8
// Y = (364 + 2880 - 25749 / 50) * 3 - 1.5
// Y = (3244 - 514.98) * 3 - 1.5 = 2729.02 * 3 - 1.5 = 8187.06 - 1.5 = 8185.56

const KNOWN_ROBOT_COORDS = { x: 25105, y: 25749 };
const EXPECTED_WORLD_PIXEL = { x: 655.8, y: 8185.56 };

describe("Coordinate Conversion (Scale=3, Centered)", () => {

	it("should export constants", () => {
		expect(VISUAL_BLOCK_SIZE).to.equal(3);
		expect(GRID_CENTER_OFFSET).to.equal(1.5);
	});

	it("Robot -> Local: Should apply Scale=3 and Offsets (+1.5, -1.5)", () => {
		const calculated = robotCoordsToLocalCoords(KNOWN_ROBOT_COORDS, MOCK_PARAMS);
		expect(calculated.x).to.be.closeTo(EXPECTED_WORLD_PIXEL.x, 0.01);
		expect(calculated.y).to.be.closeTo(EXPECTED_WORLD_PIXEL.y, 0.01);
	});

	it("Local -> Robot: Should reverse correctly (Round Trip)", () => {
		// Start with World Pixel
		const startPixel = { x: 655.8, y: 8185.56 };

		// Pixel -> Robot
		const robotCoords = localCoordsToRobotCoords(startPixel, MOCK_PARAMS);
		// Robot -> Pixel
		const pixelCoords = robotCoordsToLocalCoords(robotCoords, MOCK_PARAMS);

		// Should be close (rounding errors in mm conversion are normal, so ~1-2px tolerance is fine)
		// Note: localCoordsToRobotCoords uses Math.round(), creating quantization.
		expect(pixelCoords.x).to.be.closeTo(startPixel.x, 3);
		expect(pixelCoords.y).to.be.closeTo(startPixel.y, 3);
	});

	it("Centering Logic: Should place a robot exactly in the center of a grid block", () => {
		// If robot is exactly at (left + 0) * 50 = left * 50, it is at Grid Index 0.
		// Result should be 0 * 3 + 1.5 = 1.5
		const originRobot = { x: MOCK_PARAMS.left * 50, y: 0 }; // Y is irrelevant for X-test
		const calculated = robotCoordsToLocalCoords(originRobot, MOCK_PARAMS);

		expect(calculated.x).to.equal(1.5);
	});
});
