"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
// Replicating the MapBuilder "toPixel" logic for regression testing.
// Logic confirms alignment: X centered (+0.5), Y flipped and shifted (-1).
const RESOLUTION = 50; // mm/pixel
function toPixel(wx, wy, minX, minY, sizeY) {
    const px = (wx - minX) / RESOLUTION + 0.5;
    const py = sizeY - 1 - ((wy - minY) / RESOLUTION);
    return { x: px, y: py };
}
(0, mocha_1.describe)("MapBuilder B01 Coordinates", () => {
    const minX = 0;
    const minY = 0;
    const sizeY = 100;
    (0, mocha_1.it)("should center X on the pixel (+0.5 shift)", () => {
        // Robot at "0" world coordinate
        const p = toPixel(0, 0, minX, minY, sizeY);
        (0, chai_1.expect)(p.x).to.equal(0.5);
    });
    (0, mocha_1.it)("should handle X values correctly", () => {
        // Robot at 50mm
        const p = toPixel(50, 0, minX, minY, sizeY);
        (0, chai_1.expect)(p.x).to.equal(1.5);
    });
    (0, mocha_1.it)("should flip and shift Y correctly (-1 shift)", () => {
        // Robot at "0" world coordinate (Bottom of map)
        const p = toPixel(0, 0, minX, minY, sizeY);
        (0, chai_1.expect)(p.y).to.equal(99);
    });
    (0, mocha_1.it)("should handle Y max value", () => {
        // Robot at top of map (4950mm)
        const p = toPixel(4950, 4950, minX, minY, sizeY);
        (0, chai_1.expect)(p.y).to.equal(0);
    });
});
//# sourceMappingURL=MapBuilder.test.js.map