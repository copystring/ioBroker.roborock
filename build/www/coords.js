"use strict";
//
// coords.ts
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.localCoordsToRobotCoords = localCoordsToRobotCoords;
exports.robotCoordsToLocalCoords = robotCoordsToLocalCoords;
function localCoordsToRobotCoords(imagePoint, params) {
    const point = { x: 0, y: 0 };
    point.x = Math.round((imagePoint.x / params.scaleFactor + params.left) * 50.0);
    point.y = Math.round((params.imageHeight / params.scaleFactor + params.topMap - imagePoint.y / params.scaleFactor) * 50.0);
    return point;
}
function robotCoordsToLocalCoords(robotPoint, params) {
    const point = { x: 0, y: 0 };
    point.x = Math.round((robotPoint.x / 50.0 - params.left) * params.scaleFactor);
    point.y = Math.round((params.imageHeight / params.scaleFactor + params.topMap - robotPoint.y / 50.0) * params.scaleFactor);
    return point;
}
//# sourceMappingURL=coords.js.map