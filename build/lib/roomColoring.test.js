"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const roomColoring_1 = require("./roomColoring");
describe("roomColoring", () => {
    const options = {
        oneBased: true, // Roborock usually starts IDs at 1
    };
    it("should assign different colors to neighbors", () => {
        // Scenario: [1] -- [2] -- [3]
        const maxBlockNum = 32;
        const neighborInfo = new Array(maxBlockNum * maxBlockNum).fill(0);
        const pointsCount = new Array(maxBlockNum).fill(0);
        // Setup Neighbors
        const setNeighbor = (a, b) => {
            neighborInfo[a * maxBlockNum + b] = 1;
            neighborInfo[b * maxBlockNum + a] = 1;
        };
        setNeighbor(1, 2);
        setNeighbor(2, 3);
        // Setup Existence & Size
        neighborInfo[1 * maxBlockNum + 1] = 1;
        neighborInfo[2 * maxBlockNum + 2] = 1;
        neighborInfo[3 * maxBlockNum + 3] = 1;
        pointsCount[1] = 100;
        pointsCount[2] = 100;
        pointsCount[3] = 100;
        const data = { maxBlockNum, neighborInfo, pointsCount };
        const result = (0, roomColoring_1.assignRoborockRoomColorsToHex)(data, options);
        const c1 = result.colorBucket[1];
        const c2 = result.colorBucket[2];
        const c3 = result.colorBucket[3];
        (0, chai_1.expect)(c1).to.not.equal(0);
        (0, chai_1.expect)(c2).to.not.equal(0);
        (0, chai_1.expect)(c3).to.not.equal(0);
        (0, chai_1.expect)(c1).to.not.equal(c2, "Neighbors 1 and 2 must differ");
        (0, chai_1.expect)(c2).to.not.equal(c3, "Neighbors 2 and 3 must differ");
    });
    it("should use the default background color for unused rooms", () => {
        const maxBlockNum = 32;
        const neighborInfo = new Array(maxBlockNum * maxBlockNum).fill(0);
        const pointsCount = new Array(maxBlockNum).fill(0);
        const data = { maxBlockNum, neighborInfo, pointsCount };
        const result = (0, roomColoring_1.assignRoborockRoomColorsToHex)(data, options);
        // Unused room 5 should be the background color (Index 0)
        (0, chai_1.expect)(result.colorHex[5]).to.equal(roomColoring_1.ROBOROCK_PALETTE[0]);
    });
});
//# sourceMappingURL=roomColoring.test.js.map