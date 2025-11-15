//
// coords.test.ts
//
import { describe, it } from "vitest";
import { expect } from "chai";
import { localCoordsToRobotCoords, robotCoordsToLocalCoords } from "./coords";
// --- Mock-Daten (basierend auf deinen Logs) ---
const MOCK_PARAMS = {
    scaleFactor: 8, // Dein Wert aus der Config (angenommen)
    left: 284, // aus map.IMAGE.position.left
    topMap: 364, // aus map.IMAGE.position.top
    imageHeight: 2880, // aus map.IMAGE.dimensions.height
    mapMaxY: 0 // Wird nicht mehr verwendet, aber benötigt vom Interface
};
// Deine bekannten Test-Werte aus dem Log
const KNOWN_WORLD_PIXEL = { x: 1744.85, y: 1672.19 };
const KNOWN_ROBOT_COORDS = { x: 25105, y: 25749 };
// --- Die Tests ---
describe("Koordinaten-Umrechnung (mit Chai)", () => {
    it("sollte Pixel korrekt in Roboter-Koordinaten umwandeln (Statisch)", () => {
        const calculated = localCoordsToRobotCoords(KNOWN_WORLD_PIXEL, MOCK_PARAMS);
        expect(calculated.x).to.equal(KNOWN_ROBOT_COORDS.x);
        expect(calculated.y).to.equal(KNOWN_ROBOT_COORDS.y);
    });
    it("sollte Roboter-Koordinaten korrekt in Pixel umwandeln (Statisch)", () => {
        const calculated = robotCoordsToLocalCoords(KNOWN_ROBOT_COORDS, MOCK_PARAMS);
        // Toleranz von 1 Pixel wegen Rundungsdifferenzen
        expect(calculated.x).to.be.closeTo(KNOWN_WORLD_PIXEL.x, 1);
        expect(calculated.y).to.be.closeTo(KNOWN_WORLD_PIXEL.y, 1);
    });
    it("sollte ein perfekter Round-Trip sein", () => {
        // Nimm einen sauberen Startwert
        const startPixel = { x: 1800, y: 1700 };
        // Pixel -> Roboter -> Pixel
        const robotCoords = localCoordsToRobotCoords(startPixel, MOCK_PARAMS);
        const pixelCoords = robotCoordsToLocalCoords(robotCoords, MOCK_PARAMS);
        // Muss wieder nahe am Startwert sein (Toleranz 1 Pixel)
        expect(pixelCoords.x).to.be.closeTo(startPixel.x, 1);
        expect(pixelCoords.y).to.be.closeTo(startPixel.y, 1);
    });
});
//# sourceMappingURL=coords.test.js.map